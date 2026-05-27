# Lifeline — Hackathon Pitch

> The autonomous personal relationship agent that remembers everyone you've ever cared about — and helps you stay close to them.

**Built for the Google Cloud Rapid Agent Hackathon — MongoDB Partner Track.**

🚀 Live demo: https://web-vaibhav4046s-projects.vercel.app

## Why we win the MongoDB bucket

1. **Atlas Vector Search** powers semantic recall of shared history. When the agent drafts a message to Dad, it vector-searches interactions for 'porch' + 'knee' + 'Mariners' and gets the 3 most relevant snippets without loading the entire history.
2. **Time Series collections** store `interactions` with granularity hours + metaField personId. Drift scores & communication velocity are computed via aggregation pipelines on the fly.
3. **Change Streams** on `interactions` trigger a listener that updates the `signals` collection in real-time. No polling.

## The 7-step agent loop

```
ingest → extract → graph → monitor → plan → draft → approve → learn
```

Every step logs to the `actions` collection for full audit-trail transparency. The 'Why did the agent plan this?' expandable on every draft surfaces the input → reasoning → output chain.

## License

MIT — engineered by Vaibhav Lalwani, June 2026.
