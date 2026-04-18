"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Package, ShoppingBag, Users, FileText, TrendingUp, Clock } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRequests: number;
  totalRevenue: number;
}

interface RecentOrder {
  _id: string;
  user: { name: string; email: string };
  totalAmount: number;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "#f59e0b",
  processing: "#0ea5e9",
  shipped: "#8b5cf6",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

function StatCard({ icon: Icon, label, value, color, sub }: { icon: any; label: string; value: string | number; color: string; sub?: string }) {
  return (
    <div className="glass-card" style={{ padding: "24px 28px", borderRadius: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 4 }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: "#10b981", marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setStats(d.stats); setRecentOrders(d.recentOrders || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: "#6b7280", fontSize: 14 }}>Welcome back! Here's what's happening at Craft Verse.</p>
      </div>

      {/* Stats grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20, marginBottom: 36 }}>
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 120, borderRadius: 20 }} />)}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20, marginBottom: 40 }}>
          <StatCard icon={TrendingUp} label="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString("en-IN")}`} color="#8b5cf6" sub="↑ From all orders" />
          <StatCard icon={ShoppingBag} label="Total Orders" value={stats?.totalOrders || 0} color="#0ea5e9" />
          <StatCard icon={Package} label="Products" value={stats?.totalProducts || 0} color="#10b981" />
          <StatCard icon={Users} label="Users" value={stats?.totalUsers || 0} color="#fb7185" />
          <StatCard icon={FileText} label="Custom Requests" value={stats?.totalRequests || 0} color="#f59e0b" />
        </div>
      )}

      {/* Recent Orders */}
      <div className="glass-card" style={{ borderRadius: 22, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(139,92,246,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>Recent Orders</h2>
          <a href="/admin/orders" style={{ fontSize: 13, color: "#8b5cf6", textDecoration: "none", fontWeight: 600 }}>View all →</a>
        </div>

        {loading ? (
          <div style={{ padding: 24 }}>
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 48, marginBottom: 10, borderRadius: 10 }} />)}
          </div>
        ) : recentOrders.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <ShoppingBag size={40} color="#e5e7eb" style={{ marginBottom: 12 }} />
            <p style={{ color: "#9ca3af", fontSize: 14 }}>No orders yet</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(139,92,246,0.04)" }}>
                  {["Order ID", "Customer", "Amount", "Status", "Date"].map(h => (
                    <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order._id} style={{ borderTop: "1px solid rgba(139,92,246,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(245,243,255,0.3)" }}>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#6b7280", fontFamily: "monospace" }}>#{order._id.slice(-6).toUpperCase()}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{order.user?.name || "—"}</p>
                      <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{order.user?.email}</p>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 700, color: "#7c3aed" }}>₹{order.totalAmount.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: `${statusColors[order.status]}15`, color: statusColors[order.status] }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 12, color: "#9ca3af" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
