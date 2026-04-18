"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Package, ShoppingBag, Users, FileText, TrendingUp, Clock } from "lucide-react";

interface Stats { totalProducts: number; totalOrders: number; totalUsers: number; totalRequests: number; totalRevenue: number; }
interface RecentOrder { _id: string; user: { name: string; email: string }; totalAmount: number; status: string; createdAt: string; }

const statusColors: Record<string, { bg: string; text: string }> = {
  pending:    { bg: "rgba(201,123,99,0.12)", text: "#C97B63" },
  processing: { bg: "rgba(62,47,47,0.08)",  text: "#3E2F2F" },
  shipped:    { bg: "rgba(168,92,69,0.12)",  text: "#A85C45" },
  delivered:  { bg: "rgba(76,100,68,0.12)",  text: "#4C6444" },
  cancelled:  { bg: "rgba(180,60,60,0.10)",  text: "#B43C3C" },
};

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, padding: "22px 26px", boxShadow: "0 2px 12px rgba(62,47,47,0.06)" }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: "#EAD8C0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        <Icon size={18} color="#C97B63" />
      </div>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#3E2F2F", margin: 0 }}>{value}</p>
      {sub && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#C97B63", marginTop: 4 }}>{sub}</p>}
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
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 4 }}>Dashboard</h1>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>Welcome back! Here's what's happening at Craft Verse.</p>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 18, marginBottom: 32 }}>
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 110, borderRadius: 18 }} />)}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 18, marginBottom: 36 }}>
          <StatCard icon={TrendingUp} label="Total Revenue"    value={`₹${(stats?.totalRevenue || 0).toLocaleString("en-IN")}`} sub="From all orders" />
          <StatCard icon={ShoppingBag} label="Total Orders"   value={stats?.totalOrders || 0} />
          <StatCard icon={Package}     label="Products"        value={stats?.totalProducts || 0} />
          <StatCard icon={Users}       label="Users"           value={stats?.totalUsers || 0} />
          <StatCard icon={FileText}    label="Custom Requests" value={stats?.totalRequests || 0} />
        </div>
      )}

      {/* Recent Orders table */}
      <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid rgba(62,47,47,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 600, color: "#3E2F2F", margin: 0 }}>Recent Orders</h2>
          <a href="/admin/orders" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#C97B63", textDecoration: "none", fontWeight: 600 }}>View all →</a>
        </div>
        {loading ? (
          <div style={{ padding: 22 }}>{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 44, marginBottom: 8, borderRadius: 10 }} />)}</div>
        ) : recentOrders.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <ShoppingBag size={38} color="#EAD8C0" style={{ marginBottom: 10 }} />
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#A89080", fontSize: 13 }}>No orders yet</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#EAD8C0" }}>
                  {["Order ID", "Customer", "Amount", "Status", "Date"].map(h => (
                    <th key={h} style={{ padding: "10px 18px", textAlign: "left", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#7A6060", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order._id} style={{ borderTop: "1px solid rgba(62,47,47,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(234,216,192,0.2)" }}>
                    <td style={{ padding: "12px 18px", fontFamily: "monospace", fontSize: 12, color: "#A89080" }}>#{order._id.slice(-6).toUpperCase()}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: "#3E2F2F", margin: 0 }}>{order.user?.name || "—"}</p>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", margin: 0 }}>{order.user?.email}</p>
                    </td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: "#C97B63" }}>₹{order.totalAmount.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 50, fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, background: statusColors[order.status]?.bg || "#EAD8C0", color: statusColors[order.status]?.text || "#3E2F2F" }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Clock size={11} />{new Date(order.createdAt).toLocaleDateString("en-IN")}
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
