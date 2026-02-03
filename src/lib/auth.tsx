'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, User } from './supabase';

const DEMO_ACCOUNTS: Record<string, User> = {
  'admin@beatfolio.kr': {
    id: 'demo-admin-001', email: 'admin@beatfolio.kr', user_type: 'admin',
    name: 'BEATFOLIO Admin', avatar_url: '', created_at: '2024-01-01',
  },
  'artist@beatfolio.kr': {
    id: 'demo-artist-001', email: 'artist@beatfolio.kr', user_type: 'artist',
    name: 'DJ NOVA', avatar_url: '', created_at: '2024-03-15',
  },
  'client@beatfolio.kr': {
    id: 'demo-client-001', email: 'client@beatfolio.kr', user_type: 'client',
    name: '김민수', avatar_url: '', created_at: '2024-06-01',
  },
};

const DEMO_PW = 'beatfolio1234';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string, userType: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  demoLogin: (type: 'admin' | 'artist' | 'client') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('bf_user') : null;
    if (saved) { try { setUser(JSON.parse(saved)); } catch {} }
    const init = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (url && !url.includes('placeholder')) {
          const sb = createClient();
          const { data: { user: au } } = await sb.auth.getUser();
          if (au) {
            const { data: p } = await sb.from('users').select('*').eq('id', au.id).single();
            if (p) setUser(p);
          }
        }
      } catch {}
      setLoading(false);
    };
    init();
  }, []);

  const demoLogin = (type: 'admin' | 'artist' | 'client') => {
    const m = { admin: 'admin@beatfolio.kr', artist: 'artist@beatfolio.kr', client: 'client@beatfolio.kr' };
    const u = DEMO_ACCOUNTS[m[type]];
    if (u) { setUser(u); localStorage.setItem('bf_user', JSON.stringify(u)); }
  };

  const signIn = async (email: string, password: string) => {
    const d = DEMO_ACCOUNTS[email.toLowerCase()];
    if (d && password === DEMO_PW) { setUser(d); localStorage.setItem('bf_user', JSON.stringify(d)); return {}; }
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes('placeholder')) {
        const sb = createClient();
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return {};
      }
    } catch {}
    return { error: 'Invalid email or password' };
  };

  const signUp = async (email: string, password: string, name: string, userType: string) => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes('placeholder')) {
        const sb = createClient();
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { name, user_type: userType } } });
        if (error) return { error: error.message };
        if (data.user) await sb.from('users').insert({ id: data.user.id, email, name, user_type: userType });
        return {};
      }
    } catch {}
    return { error: 'Sign up not available in demo mode' };
  };

  const signInWithGoogle = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes('placeholder')) {
        const sb = createClient();
        const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } });
        if (error) return { error: error.message };
        return {};
      }
    } catch {}
    return { error: 'Google login not available in demo mode' };
  };

  const signOut = async () => {
    setUser(null); localStorage.removeItem('bf_user');
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes('placeholder')) { const sb = createClient(); await sb.auth.signOut(); }
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
