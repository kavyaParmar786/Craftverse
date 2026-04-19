"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setUsers(d.users || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#2C1A0E", marginBottom: 4 }}>Users</h1>
        <p style={{ color: "#8B6F5E", fontSize: 14 }}>{users.length} registered users</p>
      </div>

      {loading ? (
        <div style={{ display: "grid", gap: 10 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 14 }} />)}
        </div>
      ) : users.length === 0 ? (
        <div className="glass-card" style={{ padding: "72px 24px", borderRadius: 22, textAlign: "center" }}>
          <Users size={48} color="#e5e7eb" style={{ marginBottom: 16 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "#2C1A0E", marginBottom: 8 }}>No Users Yet</h3>
          <p style={{ color: "#B89080" }}>Users will appear here once they sign up.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ borderRadius: 22, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(201,123,99,0.04)" }}>
                  {["User", "Email", "Role", "Joined"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#8B6F5E", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id} style={{ borderTop: "1px solid rgba(201,123,99,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(253,246,238,0.3)" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #E8C4A8, #F0C9A0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#FDF6EE", flexShrink: 0 }}>
                          {user.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#2C1A0E" }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#8B6F5E" }}>{user.email}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: user.role === "admin" ? "rgba(201,123,99,0.1)" : "rgba(156,163,175,0.1)", color: user.role === "admin" ? "#A85E48" : "#8B6F5E" }}>
                        {user.role === "admin" ? "⚡ Admin" : "User"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 12, color: "#B89080" }}>
                      {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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
