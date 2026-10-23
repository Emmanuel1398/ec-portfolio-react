/* Load .env into process.env for the build scripts, so src/config/site.js
   resolves the same VITE_* values in Node as it does in the Vite bundle.
   Import this FIRST: ES imports run in order, before the script body.
   Values already set in the environment (e.g. on Vercel) win. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

try {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf-8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch { /* no .env · site.js defaults apply */ }

export { ROOT };
