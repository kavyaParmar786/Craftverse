"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { ShoppingBag, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];
const statusColors: Record<string, { bg: string; text: string }> = {
  pending:    { bg: "rgba(201,123,99,0.12)", text: "#C97B63" },
  processing: { bg: "rgba(62,47,47,0.08)",  text: "#3E2F2F" },
  shipped:    { bg: "rgba(168,92,69,0.12)",  text: "#A85C45" },
  delivered:  { bg: "rgba(76,100,68,0.12)",  text: "#4C6444" },
  cancelled:  { bg: "rgba(180,60,60,0.10)",  text: "#B43C3C" },
};

const TH = ({ children }: { children: string }) => (
  <th style={{ padding: "10px 18px", textAlign: "left", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#7A6060", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" as const }}>{children}</th>
);

export default function AdminOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setOrders(d.orders || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
      if (!res.ok) throw new Error();
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      toast.success("Status updated!");
    } catch { toast.error("Update failed"); }
    finally { setUpdatingId(null); }
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 4 }}>Orders</h1>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>{orders.length} total orders</p>
      </div>
      {loading ? (
        <div style={{ display: "grid", gap: 10 }}>{[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 64, borderRadius: 14 }} />)}</div>
      ) : orders.length === 0 ? (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <ShoppingBag size={40} color="#EAD8C0" style={{ marginBottom: 12 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#3E2F2F", marginBottom: 6 }}>No Orders Yet</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#A89080", fontSize: 13 }}>Orders will appear here once customers start purchasing.</p>
        </div>
      ) : (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#EAD8C0" }}><TH>Order ID</TH><TH>Customer</TH><TH>Items</TH><TH>Total</TH><TH>Status</TH><TH>Date</TH></tr></thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order._id} style={{ borderTop: "1px solid rgba(62,47,47,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(234,216,192,0.18)" }}>
                    <td style={{ padding: "12px 18px", fontFamily: "monospace", fontSize: 12, color: "#A89080" }}>#{order._id.slice(-6).toUpperCase()}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: "#3E2F2F", margin: 0 }}>{order.user?.name || "—"}</p>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", margin: 0 }}>{order.user?.email}</p>
                    </td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060" }}>{order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}</td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: "#C97B63" }}>₹{order.totalAmount?.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <select value={order.status} disabled={updatingId === order._id} onChange={e => updateStatus(order._id, e.target.value)}
                          style={{ appearance: "none", padding: "4px 26px 4px 10px", borderRadius: 50, border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, background: statusColors[order.status]?.bg || "#EAD8C0", color: statusColors[order.status]?.text || "#3E2F2F" }}>
                          {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                        </select>
                        <ChevronDown size={11} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: statusColors[order.status]?.text || "#3E2F2F" }} />
                      </div>
                    </td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", whiteSpace: "nowrap" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
