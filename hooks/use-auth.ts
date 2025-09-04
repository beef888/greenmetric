"use client";

import { useState, useEffect } from 'react';
import { AuthService, User, AuthState } from '@/lib/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial auth state
    const initialState = AuthService.getAuthState();
    setAuthState(initialState);
    setLoading(false);

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = () => {
      const newState = AuthService.getAuthState();
      setAuthState(newState);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await AuthService.login(email, password);
    if (result.success && result.user) {
      setAuthState({ user: result.user, isAuthenticated: true });
    }
    return result;
  };

  const signup = async (userData: any) => {
    const result = await AuthService.signup(userData);
    if (result.success && result.user) {
      setAuthState({ user: result.user, isAuthenticated: true });
    }
    return result;
  };

  const logout = async () => {
    await AuthService.logout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  return {
    ...authState,
    loading,
    login,
    signup,
    logout,
  };
}