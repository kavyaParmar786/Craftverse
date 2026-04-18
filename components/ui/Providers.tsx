"use client";
import { useEffect } from "react";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Rehydrate persisted stores after client mount
    useCart.persist.rehydrate();
    useAuth.persist.rehydrate();
  }, []);
  return <>{children}</>;
}
