import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function htmlEnvPlugin(env) {
  return {
    name: 'html-env',
    transformIndexHtml(html) {
      return html.replace(/%VITE_(\w+)%/g, (match, key) => {
        const val = env[`VITE_${key}`];
        return val !== undefined ? val : match;
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), htmlEnvPlugin(env)],
  };
})
