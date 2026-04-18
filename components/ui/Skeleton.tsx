export function ProductSkeleton() {
  return (
    <div style={{ borderRadius: 20, background: "white", border: "1px solid rgba(139,92,246,0.08)", overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 220 }} />
      <div style={{ padding: "16px 20px 20px" }}>
        <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "80%", marginBottom: 16 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="skeleton" style={{ height: 24, width: 70 }} />
          <div className="skeleton" style={{ height: 36, width: 90, borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
      {Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  );
}

export function TextSkeleton({ width = "100%", height = 16 }: { width?: string | number; height?: number }) {
  return <div className="skeleton" style={{ width, height, marginBottom: 8 }} />;
}
