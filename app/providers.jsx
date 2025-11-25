// ============================================
// Providers Component
// ============================================
// Client component that wraps children with SessionProvider
// Required for NextAuth to work in App Router
// ============================================

'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export function SessionProvider({ children }) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}
