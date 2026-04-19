"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

const statusOptions = ["pending", "reviewing", "accepted", "rejected", "completed"];
const statusColors: Record<string, { bg: string; text: string }> = {
  pending:   { bg: "rgba(201,123,99,0.12)", text: "#C97B63" },
  reviewing: { bg: "rgba(62,47,47,0.08)",  text: "#3E2F2F" },
  accepted:  { bg: "rgba(76,100,68,0.12)",  text: "#4C6444" },
  rejected:  { bg: "rgba(180,60,60,0.10)",  text: "#B43C3C" },
  completed: { bg: "rgba(168,92,69,0.12)",  text: "#A85C45" },
};
const typeLabel: Record<string, string> = { model: "Custom Model", clothes: "Custom Clothes", "3d-printing": "3D Printing" };

const TH = ({ children }: { children: string }) => (
  <th style={{ padding: "10px 18px", textAlign: "left", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#7A6060", textTransform: "uppercase", letterSpacing: "0.06em" }}>{children}</th>
);

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
      const res = await fetch(`/api/requests/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
      if (!res.ok) throw new Error();
      setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      toast.success("Status updated!");
    } catch { toast.error("Update failed"); }
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 4 }}>Custom Requests</h1>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>{requests.length} total requests</p>
      </div>
      {loading ? (
        <div style={{ display: "grid", gap: 10 }}>{[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 64, borderRadius: 14 }} />)}</div>
      ) : requests.length === 0 ? (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <FileText size={40} color="#EAD8C0" style={{ marginBottom: 12 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#3E2F2F", marginBottom: 6 }}>No Requests Yet</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#A89080", fontSize: 13 }}>Custom requests will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {requests.map((req) => (
            <div key={req._id} style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 16, overflow: "hidden" }}>
              {/* Row */}
              <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#A89080", minWidth: 70 }}>#{req._id.slice(-6).toUpperCase()}</span>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: "#3E2F2F", margin: 0 }}>{req.title}</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", margin: 0 }}>{req.user?.name || "—"} · {req.email}</p>
                </div>
                <span style={{ fontFamily: "'Poppins',sans-serif", padding: "3px 10px", borderRadius: 50, fontSize: 10, fontWeight: 600, background: "#EAD8C0", color: "#7A6060", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {typeLabel[req.type] || req.type}
                </span>
                {req.budget > 0 && <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: "#C97B63" }}>₹{req.budget.toLocaleString("en-IN")}</span>}
                <div style={{ position: "relative" }}>
                  <select value={req.status} onChange={e => updateStatus(req._id, e.target.value)}
                    style={{ appearance: "none", padding: "4px 24px 4px 10px", borderRadius: 50, border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, background: statusColors[req.status]?.bg || "#EAD8C0", color: statusColors[req.status]?.text || "#3E2F2F" }}>
                    {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                  <ChevronDown size={10} style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: statusColors[req.status]?.text || "#3E2F2F" }} />
                </div>
                <button onClick={() => setExpanded(expanded === req._id ? null : req._id)}
                  style={{ padding: "5px 8px", borderRadius: 8, border: "none", background: "#EAD8C0", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#7A6060" }}>
                  {expanded === req._id ? <ChevronUp size={13} /> : <ChevronDown size={13} />} Details
                </button>
              </div>
              {/* Expanded details */}
              {expanded === req._id && (
                <div style={{ padding: "14px 18px 18px", borderTop: "1px solid rgba(62,47,47,0.07)", background: "rgba(234,216,192,0.15)" }}>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060", lineHeight: 1.7, margin: "0 0 10px" }}>{req.description}</p>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {req.phone && <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#A89080" }}>📞 {req.phone}</span>}
                    {req.material && <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#A89080" }}>Material: {req.material}</span>}
                    {req.color && <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#A89080" }}>Color: {req.color}</span>}
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#A89080" }}>{new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
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
