import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/SectionReveal';

const STORAGE_KEY = 'portfolio_admin_inbox_key';

function AdminPanel() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [draftKey, setDraftKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState('');
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const apiBaseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (adminKey) {
      fetchMessages(adminKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const todayCount = messages.filter((msg) => new Date(msg.createdAt) >= start).length;
    const unreadCount = messages.filter((msg) => !msg.isRead).length;
    const readCount = Math.max(messages.length - unreadCount, 0);

    return {
      total: messages.length,
      unread: unreadCount,
      read: readCount,
      today: todayCount,
    };
  }, [messages]);

  const filteredMessages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return messages.filter((msg) => {
      const statusMatch =
        filter === 'all' ||
        (filter === 'unread' && !msg.isRead) ||
        (filter === 'read' && msg.isRead);

      if (!statusMatch) return false;

      if (!normalizedSearch) return true;

      const combined = `${msg.name || ''} ${msg.email || ''} ${msg.subject || ''} ${msg.message || ''}`.toLowerCase();
      return combined.includes(normalizedSearch);
    });
  }, [messages, search, filter]);

  const selectedMessage = useMemo(
    () => filteredMessages.find((msg) => msg._id === selectedId) || filteredMessages[0] || null,
    [filteredMessages, selectedId]
  );

  const fetchMessages = async (keyToUse = adminKey) => {
    if (!apiBaseUrl) {
      setError('REACT_APP_API_URL is not configured.');
      return;
    }

    if (!keyToUse.trim()) {
      setError('Please enter admin key.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${apiBaseUrl}/api/contact`, {
        headers: {
          'x-admin-key': keyToUse.trim(),
        },
      });

      const data = Array.isArray(response.data) ? response.data : [];
      setMessages(data);
      setLastSyncedAt(new Date());
      setSelectedId((prev) => prev || data[0]?._id || '');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const unlockDashboard = async () => {
    const key = draftKey.trim();
    setAdminKey(key);
    localStorage.setItem(STORAGE_KEY, key);
    await fetchMessages(key);
  };

  const handleSignOut = () => {
    setAdminKey('');
    setDraftKey('');
    setMessages([]);
    setSelectedId('');
    localStorage.removeItem(STORAGE_KEY);
  };

  const markAsRead = async (id) => {
    if (!apiBaseUrl || !adminKey) return;

    setActionLoadingId(id);
    setError('');

    try {
      await axios.patch(
        `${apiBaseUrl}/api/contact/${id}/read`,
        {},
        {
          headers: {
            'x-admin-key': adminKey,
          },
        }
      );

      setMessages((prev) => prev.map((msg) => (msg._id === id ? { ...msg, isRead: true } : msg)));
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to mark message as read.');
    } finally {
      setActionLoadingId('');
    }
  };

  const deleteMessage = async (id) => {
    if (!apiBaseUrl || !adminKey) return;

    setActionLoadingId(id);
    setError('');

    try {
      await axios.delete(`${apiBaseUrl}/api/contact/${id}`, {
        headers: {
          'x-admin-key': adminKey,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (selectedId === id) {
        setSelectedId('');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete message.');
    } finally {
      setActionLoadingId('');
    }
  };

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-slate-100 md:text-5xl">Admin Panel</h1>
            <p className="text-slate-400">Private dashboard for contact inbox and message operations.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fetchMessages()}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-slate-500"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-300 transition-all hover:bg-rose-500/20"
            >
              Sign Out
            </button>
            <Link
              to="/admin/inbox"
              className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
            >
              Open Inbox
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal className="mb-8 glass-card rounded-xl border border-slate-700/70 p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <label htmlFor="adminDashboardKey" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Admin Key
              </label>
              <input
                id="adminDashboardKey"
                type="password"
                value={draftKey}
                onChange={(event) => setDraftKey(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition-all focus:border-cyan-400"
                placeholder="Enter ADMIN_INBOX_KEY"
              />
              <p className="mt-2 text-xs text-slate-500">
                Status: {adminKey ? <span className="text-emerald-300">Unlocked</span> : <span className="text-amber-300">Locked</span>}
              </p>
            </div>

            <button
              type="button"
              onClick={unlockDashboard}
              className="self-end rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
            >
              {loading ? 'Unlocking...' : 'Unlock Dashboard'}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, subject..."
              className="min-w-[230px] flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-400"
            />

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-300 outline-none focus:border-cyan-400"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </SectionReveal>

        <SectionReveal className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Messages" value={stats.total} tone="cyan" />
          <StatCard label="Unread Messages" value={stats.unread} tone="amber" />
          <StatCard label="Read Messages" value={stats.read} tone="slate" />
          <StatCard label="Today" value={stats.today} tone="emerald" />
        </SectionReveal>

        <SectionReveal>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <div className="glass-card rounded-xl border border-slate-700/70 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-100">Inbox</h2>
                <p className="text-xs text-slate-500">
                  {lastSyncedAt ? `Synced: ${lastSyncedAt.toLocaleTimeString()}` : 'Not synced yet'}
                </p>
              </div>

              {filteredMessages.length === 0 ? (
                <p className="text-slate-400">No messages found for current filter.</p>
              ) : (
                <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                  {filteredMessages.map((msg) => (
                    <button
                      key={msg._id}
                      type="button"
                      onClick={() => setSelectedId(msg._id)}
                      className={`w-full rounded-lg border p-4 text-left transition-all ${
                        selectedMessage?._id === msg._id
                          ? 'border-cyan-400/40 bg-cyan-500/5'
                          : 'border-slate-700/70 bg-slate-950/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="font-medium text-slate-100">{msg.name}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            msg.isRead
                              ? 'border border-slate-600 text-slate-400'
                              : 'border border-cyan-400/50 text-cyan-300'
                          }`}
                        >
                          {msg.isRead ? 'Read' : 'Unread'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{msg.subject || 'No subject'}</p>
                      <p className="mt-1 text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card rounded-xl border border-slate-700/70 p-5">
              <h2 className="mb-4 text-xl font-semibold text-slate-100">Message Detail</h2>
              {!selectedMessage ? (
                <p className="text-slate-400">Select a message to view details.</p>
              ) : (
                <>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-300"><span className="text-slate-500">Name:</span> {selectedMessage.name}</p>
                    <p className="text-slate-300"><span className="text-slate-500">Email:</span> {selectedMessage.email}</p>
                    <p className="text-slate-300"><span className="text-slate-500">Subject:</span> {selectedMessage.subject || 'No subject'}</p>
                    <p className="text-slate-300"><span className="text-slate-500">Received:</span> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="my-4 rounded-lg border border-slate-700/70 bg-slate-950/60 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!selectedMessage.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(selectedMessage._id)}
                        disabled={actionLoadingId === selectedMessage._id}
                        className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20 disabled:opacity-60"
                      >
                        {actionLoadingId === selectedMessage._id ? 'Updating...' : 'Mark as Read'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteMessage(selectedMessage._id)}
                      disabled={actionLoadingId === selectedMessage._id}
                      className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-500/20 disabled:opacity-60"
                    >
                      {actionLoadingId === selectedMessage._id ? 'Deleting...' : 'Delete Message'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }) {
  const toneClassMap = {
    cyan: 'border-cyan-400/30 text-cyan-300',
    amber: 'border-amber-400/30 text-amber-300',
    emerald: 'border-emerald-400/30 text-emerald-300',
    slate: 'border-slate-500/40 text-slate-200',
  };

  return (
    <div className="glass-card rounded-xl border border-slate-700/70 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-3xl font-bold ${toneClassMap[tone] || 'text-slate-100'}`}>{value}</p>
    </div>
  );
}

export default AdminPanel;
