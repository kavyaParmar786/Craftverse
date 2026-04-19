export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight:"100vh",
      background:"#F5E9DA",
      backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"24px",
    }}>
      <div style={{ position:"fixed",top:"15%",left:"8%",width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle, rgba(201,123,99,0.12) 0%, transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"fixed",bottom:"12%",right:"6%",width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle, rgba(234,216,192,0.5) 0%, transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"relative",zIndex:1,width:"100%",maxWidth:440 }}>
        {children}
      </div>
    </div>
  );
}
