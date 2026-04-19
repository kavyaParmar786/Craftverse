"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";

const navLinks = [
  { label: "Shop", children: [
    { label: "DIY Charts", href: "/diy-charts" },
    { label: "DIY Models", href: "/diy-models" },
    { label: "Custom Clothes", href: "/custom-clothes" },
  ]},
  { label: "Services", children: [
    { label: "3D Printing", href: "/3d-printing" },
    { label: "Custom Models", href: "/custom-models" },
  ]},
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [userMenu, setUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const count = useCart(s => s.count());
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false); setOpenDrop(null); setUserMenu(false);
  }, [pathname]);

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          padding: 6px 2px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #3E2F2F;
          background: transparent;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #C97B63;
          transition: width 0.25s ease;
        }
        .nav-link:hover, .nav-link.active { color: #C97B63; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .drop-item {
          display: block;
          padding: 9px 14px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #3E2F2F;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .drop-item:hover { background: #EAD8C0; color: #C97B63; }

        .cart-btn {
          position: relative;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #EAD8C0;
          border: 1px solid rgba(62,47,47,0.12);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: background 0.2s;
        }
        .cart-btn:hover { background: #C97B63; }
        .cart-btn:hover svg { stroke: white; }

        .user-btn {
          padding: 7px 16px;
          border-radius: 50px;
          border: 1.5px solid rgba(201,123,99,0.4);
          background: transparent;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #C97B63;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.2s;
        }
        .user-btn:hover { background: #C97B63; color: white; }

        .user-menu-item {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 14px; border-radius: 8px;
          text-decoration: none; font-family: 'Poppins', sans-serif;
          font-size: 13px; color: #3E2F2F; font-weight: 400;
          background: none; border: none; cursor: pointer; width: 100%;
          transition: background 0.15s;
        }
        .user-menu-item:hover { background: #EAD8C0; }

        @media(max-width:767px){.desktop-nav{display:none!important;}}
        @media(min-width:768px){.mobile-toggle{display:none!important;}}
        @keyframes dropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(245,233,218,0.96)" : "rgba(245,233,218,0.82)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(6px)",
        borderBottom: scrolled ? "1px solid rgba(62,47,47,0.1)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(62,47,47,0.08)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#C97B63",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 10px rgba(201,123,99,0.28)",
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14, color: "white" }}>CV</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19, color: "#3E2F2F", letterSpacing: "-0.01em" }}>
              Craft <span style={{ color: "#C97B63" }}>Verse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navLinks.map(link => (
              <div key={link.label} style={{ position: "relative" }}>
                {link.children ? (
                  <>
                    <button
                      className="nav-link"
                      onClick={() => setOpenDrop(openDrop === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown size={13} style={{ transition: "transform 0.2s", transform: openDrop === link.label ? "rotate(180deg)" : "rotate(0)" }} />
                    </button>
                    {openDrop === link.label && (
                      <div style={{
                        position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
                        minWidth: 170, background: "#FAF3E8",
                        borderRadius: 12, border: "1px solid rgba(62,47,47,0.1)",
                        boxShadow: "0 8px 32px rgba(62,47,47,0.12)",
                        padding: "8px", animation: "dropIn 0.2s ease",
                      }}>
                        {link.children.map(c => <Link key={c.href} href={c.href} className="drop-item">{c.label}</Link>)}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href!} className={`nav-link${pathname === link.href ? " active" : ""}`}>{link.label}</Link>
                )}
              </div>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/cart" className="cart-btn">
              <ShoppingCart size={17} color="#3E2F2F" />
              {mounted && count > 0 && (
                <span style={{
                  position: "absolute", top: -3, right: -3,
                  width: 17, height: 17, borderRadius: "50%",
                  background: "#C97B63", color: "white",
                  fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{count}</span>
              )}
            </Link>

            {mounted && user ? (
              <div style={{ position: "relative" }}>
                <button className="user-btn" onClick={() => setUserMenu(!userMenu)}>
                  <User size={14} />{user.name.split(" ")[0]}
                </button>
                {userMenu && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    minWidth: 160, background: "#FAF3E8",
                    borderRadius: 12, border: "1px solid rgba(62,47,47,0.1)",
                    boxShadow: "0 8px 32px rgba(62,47,47,0.12)",
                    padding: "8px", animation: "dropIn 0.2s ease",
                  }}>
                    {isAdmin() && <Link href="/admin/dashboard" className="user-menu-item"><LayoutDashboard size={14} />Admin Panel</Link>}
                    <button onClick={logout} className="user-menu-item" style={{ color: "#A85C45" }}><LogOut size={14} />Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>Sign In</Link>
            )}

            <button
              className="mobile-toggle cart-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ width: 38, height: 38 }}
            >
              {menuOpen ? <X size={17} color="#3E2F2F" /> : <Menu size={17} color="#3E2F2F" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: "#FAF3E8",
            borderTop: "1px solid rgba(62,47,47,0.1)",
            padding: "16px 24px 24px",
          }}>
            {navLinks.map(link => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <p style={{ fontSize: 10, fontWeight: 600, color: "#A89080", letterSpacing: "0.12em", textTransform: "uppercase", margin: "14px 0 6px" }}>{link.label}</p>
                    {link.children.map(c => (
                      <Link key={c.href} href={c.href} style={{ display: "block", padding: "9px 10px", borderRadius: 8, textDecoration: "none", fontSize: 14, color: "#3E2F2F", fontWeight: 400, fontFamily: "'Poppins', sans-serif" }}>{c.label}</Link>
                    ))}
                  </>
                ) : (
                  <Link href={link.href!} style={{ display: "block", padding: "9px 10px", borderRadius: 8, textDecoration: "none", fontSize: 14, color: "#3E2F2F", fontWeight: 400, fontFamily: "'Poppins', sans-serif" }}>{link.label}</Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
