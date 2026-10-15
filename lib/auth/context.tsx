"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "../db/client";

export interface RitvyaUser {
  id: string;
  email?: string;
  name?: string;
  isDemo: boolean;
}

interface AuthContextType {
  user: RitvyaUser | null;
  isLoading: boolean;
  isDemo: boolean;
  isSupabaseActive: boolean;
  loginGuestUser: () => void;
  loginDemoUser: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = "ritvya_active_member_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RitvyaUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. If Supabase is configured, check real session
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
            isDemo: false,
          });
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
            isDemo: false,
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }

    // 2. Private On-Device Session Authentication
    try {
      const savedUser = localStorage.getItem(LOCAL_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        const defaultMember: RitvyaUser = {
          id: "ritvya-member-active",
          email: "member@ritvya.health",
          name: "RITVYA Member",
          isDemo: false,
        };
        setUser(defaultMember);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(defaultMember));
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginGuestUser = () => {
    const memberUser: RitvyaUser = {
      id: "ritvya-member-active",
      email: "member@ritvya.health",
      name: "RITVYA Member",
      isDemo: false,
    };
    setUser(memberUser);
    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(memberUser));
    } catch {}
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    try {
      localStorage.removeItem(LOCAL_USER_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDemo: user?.isDemo ?? false,
        isSupabaseActive: isSupabaseConfigured,
        loginGuestUser,
        loginDemoUser: loginGuestUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: {
        id: "ritvya-member-active",
        email: "member@ritvya.health",
        name: "RITVYA Member",
        isDemo: false,
      },
      isLoading: false,
      isDemo: false,
      isSupabaseActive: false,
      loginGuestUser: () => {},
      loginDemoUser: () => {},
      signOut: async () => {},
    };
  }
  return context;
}
