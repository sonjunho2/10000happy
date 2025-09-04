//src/api/client.ts
import { ENV } from '../config/env';

async function http<T>(path: string, opts?: RequestInit): Promise<T> {
  if (!ENV.API_BASE_URL) throw new Error('NO_BACKEND');
  const r = await fetch(ENV.API_BASE_URL.replace(/\/$/, '') + path, {
    headers: { 'Content-Type': 'application/json', ...(opts?.headers || {}) },
    ...opts
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

export const client = {
  get:   <T>(path: string) => http<T>(path),
  post:  <T>(path: string, body: any) => http<T>(path, { method: 'POST', body: JSON.stringify(body) })
};
