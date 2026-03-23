import React, { useMemo, useState } from 'react';
import axios from 'axios';
import SectionReveal from '../components/SectionReveal';

const STORAGE_KEY = 'portfolio_admin_inbox_key';

function AdminInbox() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [draftKey, setDraftKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [panelRole, setPanelRole] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const apiBaseUrl = process.env.REACT_APP_API_URL;
  const canDelete = panelRole === 'admin';

  const filteredMessages = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return messages;

    return messages.filter((msg) => {
      const body = `${msg?.name || ''} ${msg?.email || ''} ${msg?.subject || ''} ${msg?.message || ''}`.toLowerCase();
      return body.includes(q);
    });
  }, [messages, search]);

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
      const headers = {
        'x-admin-key': keyToUse.trim(),
      };
      const response = await axios.get(`${apiBaseUrl}/api/contact`, { headers });
      setPanelRole(response?.headers?.['x-panel-role'] || 'admin');
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      const status = err?.response?.status;
      const serverMessage = err?.response?.data?.message;

      if (serverMessage) {
        setError(serverMessage);
      } else if (status === 401 || status === 403) {
        setError('Invalid panel key. Please check ADMIN_INBOX_KEY or MODERATOR_INBOX_KEY.');
      } else if (status === 503) {
        setError('Admin inbox is unavailable: database is not connected.');
      } else {
        setError('Failed to load inbox messages.');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveKeyAndLoad = async () => {
    const key = draftKey.trim();
    setAdminKey(key);
    localStorage.setItem(STORAGE_KEY, key);
    await fetchMessages(key);
  };

  const markAsRead = async (id) => {
    if (!apiBaseUrl || !adminKey) return;

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
      setError(err?.response?.data?.message || 'Failed to mark as read.');
    }
  };

  const deleteMessage = async (id) => {
    if (!apiBaseUrl || !adminKey) return;

    try {
      await axios.delete(`${apiBaseUrl}/api/contact/${id}`, {
        headers: {
          'x-admin-key': adminKey,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete message.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-slate-100 md:text-5xl">Admin Inbox</h1>
          <p className="text-slate-400">Private message center for contact form submissions.</p>
        </SectionReveal>

        <SectionReveal className="mb-8 glass-card rounded-xl border border-slate-700/70 p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <label htmlFor="adminKey" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Panel Key (Admin / Moderator)
              </label>
              <input
                id="adminKey"
                type="password"
                value={draftKey}
                onChange={(e) => setDraftKey(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition-all focus:border-cyan-400"
                placeholder="Enter ADMIN_INBOX_KEY or MODERATOR_INBOX_KEY"
              />
              {panelRole && (
                <p className="mt-2 text-xs text-slate-500">
                  Role: <span className="font-semibold text-cyan-300">{panelRole}</span>
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={saveKeyAndLoad}
              className="self-end rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
            >
              {loading ? 'Loading...' : 'Unlock Inbox'}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fetchMessages()}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-all hover:border-slate-500"
            >
              Refresh
            </button>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, subject..."
              className="min-w-[240px] flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-400"
            />
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </SectionReveal>

        <SectionReveal>
          <div className="grid gap-4">
            {filteredMessages.length === 0 ? (
              <div className="glass-card rounded-xl border border-slate-700/70 p-5 text-slate-400">
                No messages yet.
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <article
                  key={msg._id}
                  className={`glass-card rounded-xl border p-5 transition-all ${
                    msg.isRead ? 'border-slate-700/70' : 'border-cyan-400/40'
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-100">{msg.name}</h2>
                      <p className="text-sm text-slate-400">{msg.email}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        msg.isRead
                          ? 'border border-slate-600 text-slate-400'
                          : 'border border-cyan-400/50 text-cyan-300'
                      }`}
                    >
                      {msg.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>

                  <p className="mb-2 text-sm font-semibold text-slate-300">{msg.subject || 'No subject'}</p>
                  <p className="mb-4 whitespace-pre-wrap text-sm text-slate-400">{msg.message}</p>
                  <p className="mb-4 text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>

                  <div className="flex flex-wrap gap-2">
                    {!msg.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(msg._id)}
                        className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20"
                      >
                        Mark as Read
                      </button>
                    )}
                    {canDelete ? (
                      <button
                        type="button"
                        onClick={() => deleteMessage(msg._id)}
                        className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-500">
                        Delete is admin-only
                      </span>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}

export default AdminInbox;
