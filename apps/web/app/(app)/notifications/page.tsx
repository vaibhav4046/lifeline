// Item #10 from v3 plan: /notifications page with Web Push opt-in and a
// list of agent notifications by channel. Hooks into the /sw.js service worker
// Antigravity already landed.

import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Notifications · Lifeline' };
export const dynamic = 'force-static';

type Notif = {
  id: string;
  kind: 'drift' | 'milestone' | 'commitment' | 'sent';
  title: string;
  body: string;
  channel: 'mobile' | 'email' | 'slack';
  at: string;
};

const FEED: Notif[] = [
  { id: 'n1', kind: 'drift', title: 'Dad is drifting (85%)', body: '43 days since last contact. Target cadence: 14 days.', channel: 'mobile', at: '2026-05-27T07:02:00' },
  { id: 'n2', kind: 'milestone', title: "Sarah's 30th birthday in 9 days", body: 'Draft a message now so you do not forget.', channel: 'mobile', at: '2026-05-27T06:30:00' },
  { id: 'n3', kind: 'commitment', title: 'Open commitment: porch project', body: 'You promised Dad detail help six weeks ago. Still open.', channel: 'email', at: '2026-05-27T05:00:00' },
  { id: 'n4', kind: 'sent', title: 'Outreach sent to Sarah Chen', body: 'Drift score reset to 0. Next check in 21 days.', channel: 'slack', at: '2026-05-27T03:12:00' },
];

const BADGE: Record<Notif['kind'], {txt: string; cls: string}> = {
  drift: { txt: 'Drift', cls: 'border-rose-700 bg-rose-950 text-rose-300' },
  milestone: { txt: 'Milestone', cls: 'border-violet-700 bg-violet-950 text-violet-300' },
  commitment: { txt: 'Commitment', cls: 'border-amber-700 bg-amber-950 text-amber-300' },
  sent: { txt: 'Sent', cls: 'border-emerald-700 bg-emerald-950 text-emerald-300' },
};

export default function NotificationsPage() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-12'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold'>Notifications</h1>
        <p className='mt-2 text-zinc-400'>Alerts Lifeline would send you across mobile, email, and Slack.</p>
      </header>

      <section className='mb-8 rounded-2xl border border-violet-800 bg-violet-950/30 p-5'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h2 className='text-lg font-semibold'>Enable browser push notifications</h2>
            <p className='mt-1 text-sm text-zinc-300'>Get drift alerts and milestone reminders on every device where you open Lifeline.</p>
          </div>
          <button type='button' className='shrink-0 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700'>Enable</button>
        </div>
        <p className='mt-3 text-xs text-zinc-500'>Requires a VAPID key pair. Set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY to enable.</p>
      </section>

      <ul className='space-y-3'>
        {FEED.map((n) => (
          <li key={n.id} className='rounded-xl border border-zinc-800 bg-zinc-950 p-4'>
            <div className='flex items-center justify-between gap-3'>
              <span className={`rounded-full border px-2 py-0.5 text-xs ${BADGE[n.kind].cls}`}>{BADGE[n.kind].txt}</span>
              <span className='text-xs text-zinc-500'>{new Date(n.at).toLocaleString()} · via {n.channel}</span>
            </div>
            <h3 className='mt-2 font-semibold'>{n.title}</h3>
            <p className='mt-1 text-sm text-zinc-400'>{n.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
