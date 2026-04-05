import { getToken } from './auth';

/**
 * Prepend API base URL to a path. When NEXT_PUBLIC_API_URL is set, it's used
 * directly; otherwise the request is routed through Next rewrites under /api.
 */
export function apiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!base) return normalized;
  return `${base.replace(/\/$/, '')}${normalized}`;
}

export interface ApiError extends Error {
  status: number;
  body?: unknown;
}

/**
 * Typed JSON fetch wrapper. Automatically attaches JWT from auth storage.
 */
export async function api<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(apiUrl(path), {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = new Error(`API ${res.status} ${res.statusText}`) as ApiError;
    err.status = res.status;
    try {
      err.body = await res.json();
    } catch {}
    throw err;
  }

  if (res.status === 204) return undefined as T;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
}

/**
 * Streaming POST — returns a ReadableStream for use with Vercel AI SDK
 * (`useChat` handles the stream protocol directly; this is for custom cases).
 */
export async function apiStream(
  path: string,
  body: unknown,
  init: RequestInit = {}
): Promise<ReadableStream<Uint8Array>> {
  const token = getToken();
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(apiUrl(path), {
    ...init,
    method: init.method ?? 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    const err = new Error(`Stream ${res.status} ${res.statusText}`) as ApiError;
    err.status = res.status;
    throw err;
  }

  return res.body;
}
