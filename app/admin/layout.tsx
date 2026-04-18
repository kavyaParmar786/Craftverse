"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/authStore";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    if (!isAdmin()) { router.push("/"); }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin()) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f7ff" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "32px 36px", overflowX: "hidden" }}>
        {children}
      </main>
    </div>
  );
}
