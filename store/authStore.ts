"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isLoggedIn: () => boolean;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
        if (typeof document !== "undefined") {
          document.cookie = `craft_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        }
      },
      logout: () => {
        set({ user: null, token: null });
        if (typeof document !== "undefined") {
          document.cookie = "craft_token=; path=/; max-age=0";
        }
      },
      isAdmin: () => get().user?.role === "admin",
      isLoggedIn: () => !!get().token,
    }),
    {
      name: "craftverse-auth",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
        }
        return localStorage;
      }),
      skipHydration: true,
    }
  )
);
