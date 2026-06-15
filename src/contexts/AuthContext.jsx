import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const getRedirectTo = () =>
  `${window.location.origin}${import.meta.env.BASE_URL}`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectTo() },
    });

  const signInWithKakao = () =>
    supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: getRedirectTo() },
    });

  const signOut = () => supabase.auth.signOut();

  const value = { user, loading, signInWithGoogle, signInWithKakao, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
