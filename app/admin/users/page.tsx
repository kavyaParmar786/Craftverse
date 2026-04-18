"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Users } from "lucide-react";

const TH = ({ children }: { children: string }) => (
  <th style={{ padding: "10px 18px", textAlign: "left", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#7A6060", textTransform: "uppercase", letterSpacing: "0.06em" }}>{children}</th>
);

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
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 4 }}>Users</h1>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>{users.length} registered users</p>
      </div>
      {loading ? (
        <div style={{ display: "grid", gap: 10 }}>{[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, borderRadius: 12 }} />)}</div>
      ) : users.length === 0 ? (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <Users size={40} color="#EAD8C0" style={{ marginBottom: 12 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#3E2F2F", marginBottom: 6 }}>No Users Yet</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#A89080", fontSize: 13 }}>Users will appear here once they sign up.</p>
        </div>
      ) : (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#EAD8C0" }}><TH>User</TH><TH>Email</TH><TH>Role</TH><TH>Joined</TH></tr></thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id} style={{ borderTop: "1px solid rgba(62,47,47,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(234,216,192,0.18)" }}>
                    <td style={{ padding: "12px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#C97B63", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0 }}>
                          {user.name?.[0] || "?"}
                        </div>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: "#3E2F2F" }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060" }}>{user.email}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 50, fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: user.role === "admin" ? "rgba(201,123,99,0.15)" : "#EAD8C0", color: user.role === "admin" ? "#C97B63" : "#7A6060" }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080" }}>
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
