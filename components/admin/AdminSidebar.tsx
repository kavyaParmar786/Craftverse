"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, FileText, Newspaper, Users, LogOut, ChevronRight, Sparkles } from "lucide-react";
import { useAuth } from "@/store/authStore";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/requests", label: "Custom Requests", icon: FileText },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => { logout(); router.push("/"); };

  return (
    <aside style={{
      width: 240, minHeight: "100vh", flexShrink: 0,
      background: "linear-gradient(180deg, #fdfcfb 0%, #f5f3ff 100%)",
      borderRight: "1px solid rgba(139,92,246,0.12)",
      display: "flex", flexDirection: "column",
      position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(139,92,246,0.08)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: "white" }}>CV</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 15, color: "#1a1a2e", margin: 0 }}>Craft Verse</p>
            <p style={{ fontSize: 10, color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(139,92,246,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c4b5fd, #7dd3fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>
            {user?.name?.[0] || "A"}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{user?.name || "Admin"}</p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", borderRadius: 12, marginBottom: 4,
              textDecoration: "none",
              background: active ? "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(14,165,233,0.08))" : "transparent",
              border: active ? "1px solid rgba(139,92,246,0.15)" : "1px solid transparent",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.05)"; }}
            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon size={16} color={active ? "#7c3aed" : "#9ca3af"} />
                <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? "#7c3aed" : "#4b5563" }}>{label}</span>
              </div>
              {active && <ChevronRight size={13} color="#8b5cf6" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px 12px 24px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 12, textDecoration: "none", fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
          <Sparkles size={15} /> View Site
        </Link>
        <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 12, border: "none", background: "rgba(251,113,133,0.06)", cursor: "pointer", fontSize: 13, color: "#ef4444", width: "100%" }}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
