"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

const statusOptions = ["pending", "reviewing", "accepted", "rejected", "completed"];
const statusColors: Record<string, { bg: string; text: string }> = {
  pending:   { bg: "rgba(245,158,11,0.12)",  text: "#d97706" },
  reviewing: { bg: "rgba(14,165,233,0.12)",  text: "#0284c7" },
  accepted:  { bg: "rgba(16,185,129,0.12)",  text: "#059669" },
  rejected:  { bg: "rgba(239,68,68,0.12)",   text: "#dc2626" },
  completed: { bg: "rgba(139,92,246,0.12)",  text: "#7c3aed" },
};

const typeLabel: Record<string, string> = { model: "Custom Model", clothes: "Custom Clothes", "3d-printing": "3D Printing" };
const typeColor: Record<string, string> = { model: "#10b981", clothes: "#fb7185", "3d-printing": "#f59e0b" };

export default function AdminRequestsPage() {
  const { token } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/requests", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setRequests(d.requests || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      toast.success("Status updated!");
    } catch { toast.error("Update failed"); }
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>Custom Requests</h1>
        <p style={{ color: "#6b7280", fontSize: 14 }}>{requests.length} total requests</p>
      </div>

      {loading ? (
        <div style={{ display: "grid", gap: 12 }}>
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 80, borderRadius: 16 }} />)}
        </div>
      ) : requests.length === 0 ? (
        <div className="glass-card" style={{ padding: "72px 24px", borderRadius: 22, textAlign: "center" }}>
          <FileText size={48} color="#e5e7eb" style={{ marginBottom: 16 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "#1a1a2e", marginBottom: 8 }}>No Requests Yet</h3>
          <p style={{ color: "#9ca3af" }}>Custom requests from users will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {requests.map((req) => (
            <div key={req._id} className="glass-card" style={{ borderRadius: 18, overflow: "hidden" }}>
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", cursor: "pointer", flexWrap: "wrap" }}
                onClick={() => setExpanded(expanded === req._id ? null : req._id)}>
                {/* Type badge */}
                <span style={{ padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, background: `${typeColor[req.type]}18`, color: typeColor[req.type], flexShrink: 0 }}>
                  {typeLabel[req.type] || req.type}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{req.title}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>By {req.user?.name || "—"} · {req.email}</p>
                </div>

                {req.budget && (
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#7c3aed", flexShrink: 0 }}>₹{req.budget.toLocaleString("en-IN")}</span>
                )}

                {/* Status selector */}
                <div style={{ position: "relative", flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <select
                    value={req.status}
                    onChange={e => updateStatus(req._id, e.target.value)}
                    style={{ appearance: "none", padding: "5px 28px 5px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: statusColors[req.status]?.bg, color: statusColors[req.status]?.text }}
                  >
                    {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: statusColors[req.status]?.text }} />
                </div>

                {expanded === req._id ? <ChevronUp size={16} color="#9ca3af" /> : <ChevronDown size={16} color="#9ca3af" />}
              </div>

              {/* Expanded details */}
              {expanded === req._id && (
                <div style={{ padding: "0 24px 20px", borderTop: "1px solid rgba(139,92,246,0.08)" }}>
                  <div style={{ paddingTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Description</p>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{req.description}</p>
                    </div>
                    <div style={{ display: "grid", gap: 12 }}>
                      {req.phone && (
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Phone</p>
                          <a href={`tel:${req.phone}`} style={{ fontSize: 14, color: "#7c3aed", textDecoration: "none", fontWeight: 600 }}>{req.phone}</a>
                        </div>
                      )}
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Submitted</p>
                        <p style={{ fontSize: 13, color: "#374151" }}>{new Date(req.createdAt).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
