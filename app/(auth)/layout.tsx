export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ede9fe 0%, #bae6fd 50%, #fecdd3 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "fixed", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,181,253,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "10%", right: "5%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(125,211,252,0.3) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440 }}>
        {children}
      </div>
    </div>
  );
}
