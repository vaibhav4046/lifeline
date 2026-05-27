// apps/web/app/(app)/settings/connections/page.tsx
// Item #8 from v3 plan: /settings/connections with cards for every MCP/OAuth integration.
// Each card renders Connect / Disconnect based on whether env vars are set.

import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Connections · Lifeline' };
export const dynamic = 'force-static';

type Integration = {
  id: string;
  name: string;
  description: string;
  envVars: string[];
  scopes: string[];
  oauthStartPath: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
};

function envSet(names: string[]): boolean {
  return names.every((n) => Boolean(process.env[n]));
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Read metadata and message snippets to build your relationship graph.',
    envVars: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    scopes: ['gmail.readonly'],
    oauthStartPath: '/api/auth/signin/google',
    status: 'disconnected',
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Ingest event titles and attendees to enrich interaction context.',
    envVars: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    scopes: ['calendar.readonly'],
    oauthStartPath: '/api/auth/signin/google',
    status: 'disconnected',
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Mirror relationship notes and commitments to your Notion workspace.',
    envVars: ['NOTION_CLIENT_ID', 'NOTION_CLIENT_SECRET'],
    scopes: ['read_content', 'insert_content'],
    oauthStartPath: '/api/auth/connect/notion',
    status: 'disconnected',
  },
  {
    id: 'instagram',
    name: 'Instagram DMs',
    description: 'Via Meta Graph Business API. Read DMs with people you track.',
    envVars: ['META_APP_ID', 'META_APP_SECRET'],
    scopes: ['instagram_basic', 'instagram_manage_messages'],
    oauthStartPath: '/api/auth/connect/instagram',
    status: 'disconnected',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Send drafts via WhatsApp Business Cloud API. Business verification required.',
    envVars: ['WHATSAPP_APP_ID', 'WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN'],
    scopes: ['whatsapp_business_messaging'],
    oauthStartPath: '/api/auth/connect/whatsapp',
    status: 'disconnected',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Read DMs with teammates to track cross-team relationships.',
    envVars: ['SLACK_CLIENT_ID', 'SLACK_CLIENT_SECRET'],
    scopes: ['im:history', 'users:read'],
    oauthStartPath: '/api/auth/connect/slack',
    status: 'disconnected',
  },
];

export default function ConnectionsPage() {
  const cards = INTEGRATIONS.map((i) => ({ ...i, configured: envSet(i.envVars) }));

  return (
    <main className='mx-auto max-w-5xl px-6 py-12'>
      <header className='mb-10'>
        <h1 className='text-3xl font-bold tracking-tight'>Connections</h1>
        <p className='mt-2 text-zinc-400'>Connect your communication channels. Lifeline never sends without your approval.</p>
      </header>

      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {cards.map((c) => (
          <li key={c.id} className='rounded-2xl border border-zinc-800 bg-zinc-950 p-5'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <h2 className='text-lg font-semibold'>{c.name}</h2>
                <p className='mt-1 text-sm text-zinc-400'>{c.description}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-2 py-1 text-xs ${c.configured ? 'border-emerald-700 bg-emerald-950 text-emerald-300' : 'border-zinc-700 bg-zinc-900 text-zinc-400'}`}>
                {c.configured ? 'Configured' : 'Not configured'}
              </span>
            </div>

            <dl className='mt-4 space-y-1 text-xs text-zinc-500'>
              <div><dt className='inline font-medium text-zinc-400'>Scopes: </dt><dd className='inline'>{c.scopes.join(', ')}</dd></div>
              <div><dt className='inline font-medium text-zinc-400'>Env: </dt><dd className='inline font-mono'>{c.envVars.join(', ')}</dd></div>
            </dl>

            <div className='mt-5'>
              {c.configured ? (
                <a href={c.oauthStartPath} className='inline-flex items-center rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700'>Connect</a>
              ) : (
                <span className='inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm text-zinc-500'>Add {c.envVars[0]} in Vercel to enable</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
