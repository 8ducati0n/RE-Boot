'use client';

import * as React from 'react';

/**
 * Client-side providers. Keep minimal for MVP.
 * Extend with ToastProvider / ThemeProvider / QueryClientProvider as needed.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
