/**
 * Minimal auth token storage for MVP.
 * Prefers cookie (SameSite=Lax) so server components can read later,
 * with localStorage as a fallback.
 */

const TOKEN_KEY = 'reboot_token';

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  try {
    document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
      token
    )}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
  } catch {}
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${TOKEN_KEY}=`));
    if (match) return decodeURIComponent(match.split('=')[1] ?? '');
  } catch {}
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  try {
    document.cookie = `${TOKEN_KEY}=; Path=/; Max-Age=0`;
  } catch {}
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {}
}
