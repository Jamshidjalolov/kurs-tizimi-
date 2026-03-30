import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function getBasePath(value?: string): string {
  const source = value?.trim();
  if (!source || source === "/") {
    return "/";
  }

  return `/${source.replace(/^\/+|\/+$/g, "")}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: getBasePath(env.VITE_APP_BASE_PATH),
    plugins: [react(), tailwindcss()],
    esbuild: {
      logLevel: "silent",
    },
  };
})
