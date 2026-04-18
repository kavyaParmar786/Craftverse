export function ProductSkeleton() {
  return (
    <div style={{ borderRadius: 18, background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.08)", overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 210 }} />
      <div style={{ padding: "16px 18px 18px" }}>
        <div className="skeleton" style={{ height: 17, width: "70%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 13, marginBottom: 5 }} />
        <div className="skeleton" style={{ height: 13, width: "80%", marginBottom: 14 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="skeleton" style={{ height: 22, width: 64 }} />
          <div className="skeleton" style={{ height: 34, width: 80, borderRadius: 50 }} />
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
