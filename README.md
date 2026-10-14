<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/97aae019-7242-4eee-945a-32ab5c15fe08

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Netlify

This project is configured as a Vite static site through [netlify.toml](./netlify.toml) and requires Node.js 22.12.

1. Push the repository without `node_modules`, `dist`, or `.env.local`.
2. Import the repository into Netlify.
3. Netlify will use `npm run build` and publish the `dist` directory automatically.

The local Express server in `server.ts` provides the Gemini API routes during development. Those `/api/*` routes are not included in the static Netlify build; configure Netlify Functions or another server-side API separately before enabling AI brief generation and Creative Copilot in production.
