# Frontend deploy notes

## Local setup

1. Copy `.env.example` to `.env`
2. Fill in Firebase values
3. Set `VITE_API_BASE_URL` to your backend URL
4. Run `npm install`
5. Run `npm run build`

## Deploy config

- `VITE_API_BASE_URL`: backend API base URL
- `VITE_WS_BASE_URL`: optional WebSocket base URL
- `VITE_APP_BASE_PATH`: optional subpath like `/my-project`
- `VITE_ROUTER_MODE=hash`: recommended for static hosting without SPA rewrites

## Backend note

If frontend is deployed on a different domain, set backend env `FRONTEND_ORIGINS` with a comma-separated list, for example:

`FRONTEND_ORIGINS=https://your-frontend.example.com,https://www.your-frontend.example.com`
