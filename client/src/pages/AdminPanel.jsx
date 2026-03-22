import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/SectionReveal';

const STORAGE_KEY = 'portfolio_admin_inbox_key';

function AdminPanel() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [draftKey, setDraftKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiBaseUrl = process.env.REACT_APP_API_URL;

  const stats = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const todayCount = messages.filter((msg) => new Date(msg.createdAt) >= start).length;
    const unreadCount = messages.filter((msg) => !msg.isRead).length;

    return {
      total: messages.length,
      unread: unreadCount,
      today: todayCount,
    };
  }, [messages]);

  const recentMessages = useMemo(() => messages.slice(0, 5), [messages]);

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

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-slate-100 md:text-5xl">Admin Panel</h1>
            <p className="text-slate-400">Private dashboard for portfolio management.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fetchMessages()}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-slate-500"
            >
              Refresh
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
            </div>

            <button
              type="button"
              onClick={unlockDashboard}
              className="self-end rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
            >
              {loading ? 'Unlocking...' : 'Unlock Dashboard'}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </SectionReveal>

        <SectionReveal className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Messages" value={stats.total} tone="cyan" />
          <StatCard label="Unread Messages" value={stats.unread} tone="amber" />
          <StatCard label="Today" value={stats.today} tone="emerald" />
        </SectionReveal>

        <SectionReveal>
          <div className="glass-card rounded-xl border border-slate-700/70 p-5">
            <h2 className="mb-4 text-xl font-semibold text-slate-100">Recent Messages</h2>

            {recentMessages.length === 0 ? (
              <p className="text-slate-400">No messages found yet.</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className="rounded-lg border border-slate-700/70 bg-slate-950/50 p-4 transition-all hover:border-slate-600"
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
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
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
  };

  return (
    <div className="glass-card rounded-xl border border-slate-700/70 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-3xl font-bold ${toneClassMap[tone] || 'text-slate-100'}`}>{value}</p>
    </div>
  );
}

export default AdminPanel;
