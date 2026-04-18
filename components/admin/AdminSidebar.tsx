"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, FileText, Newspaper, Users, LogOut, ChevronRight, ExternalLink } from "lucide-react";
import { useAuth } from "@/store/authStore";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard",       icon: LayoutDashboard },
  { href: "/admin/products",  label: "Products",        icon: Package },
  { href: "/admin/orders",    label: "Orders",          icon: ShoppingBag },
  { href: "/admin/requests",  label: "Custom Requests", icon: FileText },
  { href: "/admin/news",      label: "News",            icon: Newspaper },
  { href: "/admin/users",     label: "Users",           icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const handleLogout = () => { logout(); router.push("/"); };

  return (
    <aside style={{
      width: 236, minHeight: "100vh", flexShrink: 0,
      background: "#FAF3E8",
      borderRight: "1px solid rgba(62,47,47,0.10)",
      display: "flex", flexDirection: "column",
      position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid rgba(62,47,47,0.08)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#C97B63", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 13, color: "white" }}>CV</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: "#3E2F2F", margin: 0 }}>Craft Verse</p>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, color: "#C97B63", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* User */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(62,47,47,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#C97B63", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: 12, fontWeight: 700, color: "white" }}>
            {user?.name?.[0] || "A"}
          </div>
          <div>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600, color: "#3E2F2F", margin: 0 }}>{user?.name || "Admin"}</p>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, color: "#A89080", margin: 0 }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px" }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "9px 13px", borderRadius: 11, marginBottom: 3,
              textDecoration: "none",
              background: active ? "#EAD8C0" : "transparent",
              border: active ? "1px solid rgba(201,123,99,0.2)" : "1px solid transparent",
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(201,123,99,0.07)"; }}
            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Icon size={15} color={active ? "#C97B63" : "#A89080"} />
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#3E2F2F" : "#7A6060" }}>{label}</span>
              </div>
              {active && <ChevronRight size={12} color="#C97B63" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "10px 10px 22px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", borderRadius: 11, textDecoration: "none", fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060", marginBottom: 4 }}>
          <ExternalLink size={14} color="#A89080" /> View Site
        </Link>
        <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", borderRadius: 11, border: "none", background: "rgba(201,123,99,0.08)", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#C97B63", width: "100%" }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
