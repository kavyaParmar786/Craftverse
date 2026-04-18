"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";

const navLinks = [
  { label:"Shop", children:[
    { label:"DIY Charts", href:"/diy-charts" },
    { label:"DIY Models", href:"/diy-models" },
    { label:"Custom Clothes", href:"/custom-clothes" },
  ]},
  { label:"Services", children:[
    { label:"3D Printing", href:"/3d-printing" },
    { label:"Custom Models", href:"/custom-models" },
  ]},
  { label:"About", href:"/about" },
  { label:"News", href:"/news" },
  { label:"FAQ", href:"/faq" },
];

export default function Navbar() {
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [openDrop,setOpenDrop]=useState<string|null>(null);
  const [userMenu,setUserMenu]=useState(false);
  const [mounted,setMounted]=useState(false);
  const pathname=usePathname();
  const count=useCart(s=>s.count());
  const {user,logout,isAdmin}=useAuth();

  useEffect(()=>{
    setMounted(true);
    const fn=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{ setMenuOpen(false);setOpenDrop(null);setUserMenu(false); },[pathname]);

  return (
    <>
      <style>{`
        .nav-link{padding:8px 14px;border-radius:10px;text-decoration:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:#374151;background:transparent;transition:all 0.2s;border:none;cursor:pointer;}
        .nav-link:hover,.nav-link.active{background:rgba(139,92,246,0.08);color:#7c3aed;}
        .dropdown-item{display:block;padding:10px 14px;border-radius:10px;text-decoration:none;font-size:14px;color:#374151;font-weight:500;transition:all 0.15s;}
        .dropdown-item:hover{background:rgba(139,92,246,0.08);color:#7c3aed;}
        .icon-btn{width:40px;height:40px;border-radius:12px;background:rgba(139,92,246,0.08);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;text-decoration:none;}
        .icon-btn:hover{background:rgba(139,92,246,0.15);}
        .user-menu-item{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;text-decoration:none;font-size:13px;color:#374151;font-weight:500;background:none;border:none;cursor:pointer;width:100%;}
        .user-menu-item:hover{background:rgba(139,92,246,0.06);}
        @media(max-width:767px){.desktop-nav{display:none!important;}}
        @media(min-width:768px){.mobile-toggle{display:none!important;}}
        @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        transition:"all 0.3s ease",
        background:scrolled?"rgba(253,252,251,0.92)":"rgba(253,252,251,0.7)",
        backdropFilter:scrolled?"blur(20px)":"blur(8px)",
        borderBottom:scrolled?"1px solid rgba(139,92,246,0.1)":"1px solid transparent",
        boxShadow:scrolled?"0 4px 24px rgba(139,92,246,0.08)":"none",
      }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display:"flex",alignItems:"center",gap:10,textDecoration:"none" }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#8b5cf6,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(139,92,246,0.3)" }}>
              <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:"white" }}>CV</span>
            </div>
            <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:18,color:"#1a1a2e" }}>
              Craft <span style={{ color:"#8b5cf6" }}>Verse</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display:"flex",alignItems:"center",gap:4 }}>
            {navLinks.map(link=>(
              <div key={link.label} style={{ position:"relative" }}>
                {link.children ? (
                  <>
                    <button className="nav-link" onClick={()=>setOpenDrop(openDrop===link.label?null:link.label)}
                      style={{ display:"flex",alignItems:"center",gap:4 }}>
                      {link.label}
                      <ChevronDown size={14} style={{ transition:"transform 0.2s",transform:openDrop===link.label?"rotate(180deg)":"rotate(0)" }}/>
                    </button>
                    {openDrop===link.label&&(
                      <div style={{ position:"absolute",top:"calc(100% + 8px)",left:0,minWidth:180,background:"rgba(255,255,255,0.97)",backdropFilter:"blur(16px)",borderRadius:14,border:"1px solid rgba(139,92,246,0.12)",boxShadow:"0 8px 32px rgba(139,92,246,0.15)",padding:"8px",animation:"dropIn 0.2s ease" }}>
                        {link.children.map(c=><Link key={c.href} href={c.href} className="dropdown-item">{c.label}</Link>)}
                      </div>
                    )}
                  </>
                ):(
                  <Link href={link.href!} className={`nav-link${pathname===link.href?" active":""}`}>{link.label}</Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <Link href="/cart" className="icon-btn" style={{ position:"relative" }}>
              <ShoppingCart size={18} color="#7c3aed"/>
              {mounted&&count>0&&(
                <span style={{ position:"absolute",top:-4,right:-4,width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#fb7185,#f43f5e)",color:"white",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(244,63,94,0.4)" }}>{count}</span>
              )}
            </Link>

            {mounted&&user?(
              <div style={{ position:"relative" }}>
                <button onClick={()=>setUserMenu(!userMenu)}
                  style={{ display:"flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,rgba(237,233,254,0.8),rgba(224,242,254,0.8))",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:"#7c3aed" }}>
                  <User size={15}/>{user.name.split(" ")[0]}
                </button>
                {userMenu&&(
                  <div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,minWidth:160,background:"rgba(255,255,255,0.97)",backdropFilter:"blur(16px)",borderRadius:14,border:"1px solid rgba(139,92,246,0.12)",boxShadow:"0 8px 32px rgba(139,92,246,0.15)",padding:"8px",animation:"dropIn 0.2s ease" }}>
                    {isAdmin()&&<Link href="/admin/dashboard" className="user-menu-item"><LayoutDashboard size={14}/>Admin Panel</Link>}
                    <button onClick={logout} className="user-menu-item" style={{ color:"#ef4444" }}><LogOut size={14}/>Logout</button>
                  </div>
                )}
              </div>
            ):(
              <Link href="/login" className="btn-primary" style={{ padding:"8px 20px",fontSize:13 }}>Sign In</Link>
            )}

            <button className="icon-btn mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)}>
              {menuOpen?<X size={18} color="#7c3aed"/>:<Menu size={18} color="#7c3aed"/>}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen&&(
          <div style={{ background:"rgba(253,252,251,0.97)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(139,92,246,0.1)",padding:"16px 24px 24px" }}>
            {navLinks.map(link=>(
              <div key={link.label}>
                {link.children?(
                  <>
                    <p style={{ fontSize:11,fontWeight:600,color:"#9ca3af",letterSpacing:"0.1em",textTransform:"uppercase",margin:"12px 0 6px" }}>{link.label}</p>
                    {link.children.map(c=><Link key={c.href} href={c.href} style={{ display:"block",padding:"10px 12px",borderRadius:10,textDecoration:"none",fontSize:14,color:"#374151",fontWeight:500 }}>{c.label}</Link>)}
                  </>
                ):(
                  <Link href={link.href!} style={{ display:"block",padding:"10px 12px",borderRadius:10,textDecoration:"none",fontSize:14,color:"#374151",fontWeight:500 }}>{link.label}</Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
