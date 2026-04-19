"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { ShoppingBag, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];
const statusColors: Record<string, { bg: string; text: string }> = {
  pending:    { bg: "rgba(201,123,99,0.12)",  text: "#A85E48" },
  processing: { bg: "rgba(201,123,99,0.12)",  text: "#0284c7" },
  shipped:    { bg: "rgba(201,123,99,0.12)",  text: "#A85E48" },
  delivered:  { bg: "rgba(201,123,99,0.12)",  text: "#A85E48" },
  cancelled:  { bg: "rgba(239,68,68,0.12)",   text: "#dc2626" },
};

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
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      toast.success("Order status updated!");
    } catch { toast.error("Update failed"); }
    finally { setUpdatingId(null); }
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#2C1A0E", marginBottom: 4 }}>Orders</h1>
        <p style={{ color: "#8B6F5E", fontSize: 14 }}>{orders.length} total orders</p>
      </div>

      {loading ? (
        <div style={{ display: "grid", gap: 12 }}>
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 72, borderRadius: 14 }} />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-card" style={{ padding: "72px 24px", borderRadius: 22, textAlign: "center" }}>
          <ShoppingBag size={48} color="#e5e7eb" style={{ marginBottom: 16 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "#2C1A0E", marginBottom: 8 }}>No Orders Yet</h3>
          <p style={{ color: "#B89080" }}>Orders will appear here once customers start purchasing.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ borderRadius: 22, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(201,123,99,0.04)" }}>
                  {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#8B6F5E", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order._id} style={{ borderTop: "1px solid rgba(201,123,99,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(253,246,238,0.3)" }}>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#8B6F5E", fontFamily: "monospace" }}>
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#2C1A0E", margin: 0 }}>{order.user?.name || "—"}</p>
                      <p style={{ fontSize: 11, color: "#B89080", margin: "2px 0 0" }}>{order.user?.email}</p>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#5C3D2E" }}>
                      {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 15, fontWeight: 700, color: "#A85E48" }}>
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={e => updateStatus(order._id, e.target.value)}
                          style={{
                            appearance: "none", padding: "5px 28px 5px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                            fontSize: 12, fontWeight: 600,
                            background: statusColors[order.status]?.bg || "rgba(156,163,175,0.1)",
                            color: statusColors[order.status]?.text || "#8B6F5E",
                          }}
                        >
                          {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                        </select>
                        <ChevronDown size={12} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: statusColors[order.status]?.text || "#8B6F5E" }} />
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 12, color: "#B89080", whiteSpace: "nowrap" }}>
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
