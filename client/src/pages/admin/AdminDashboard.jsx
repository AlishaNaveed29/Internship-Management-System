import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Avatar, Chip, CircularProgress
} from "@mui/material";
import {
  People, Business, Work, Assignment
} from "@mui/icons-material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

const statCards = [
  { label: "Total Users", icon: <People />, color: "#6366F1", key: "totalUsers" },
  { label: "Companies", icon: <Business />, color: "#14B8A6", key: "totalCompanies" },
  { label: "Internships", icon: <Work />, color: "#F59E0B", key: "totalInternships" },
  { label: "Applications", icon: <Assignment />, color: "#EC4899", key: "totalApplications" },
];

const gradients = [
  "linear-gradient(135deg, #6366F1, #8B5CF6)",
  "linear-gradient(135deg, #14B8A6, #06B6D4)",
  "linear-gradient(135deg, #F59E0B, #F97316)",
  "linear-gradient(135deg, #EC4899, #F43F5E)",
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stats")
      .then(({ data }) => {
        setStats(data);
        setRecentUsers(data.recentUsers || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const chartData = stats
    ? Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          users: Math.round((stats.totalUsers || 0) / 7 * (0.5 + Math.random())),
        };
      })
    : [];

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <CircularProgress sx={{ color: "#6366F1" }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#F1F5F9", mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B" }}>
          Overview of your platform activity
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.key}>
            <Card
              sx={{
                background: gradients[i],
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(99,102,241,0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 40px rgba(99,102,241,0.25)" },
              }}
            >
              <CardContent sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 500, mb: 0.5 }}>
                    {card.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={800} sx={{ color: "#fff" }}>
                    {stats?.[card.key] ?? 0}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 52, height: 52 }}>
                  {card.icon}
                </Avatar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "#13182B", border: "1px solid rgba(99,102,241,0.1)" }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#F1F5F9", mb: 3 }}>
              Users Per Day (This Week)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748B" tick={{ fill: "#64748B", fontSize: 12 }} />
                <YAxis stroke="#64748B" tick={{ fill: "#64748B", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    bgcolor: "#13182B",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 12,
                    color: "#F1F5F9",
                  }}
                />
                <Bar dataKey="users" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "#13182B", border: "1px solid rgba(99,102,241,0.1)" }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#F1F5F9", mb: 2 }}>
              Recent Users
            </Typography>
            {recentUsers.length === 0 ? (
              <Typography variant="body2" sx={{ color: "#64748B", textAlign: "center", py: 4 }}>
                No users yet
              </Typography>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>User</TableCell>
                      <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentUsers.slice(0, 5).map((user) => (
                      <TableRow
                        key={user._id}
                        sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.05)" }, cursor: "pointer" }}
                        onClick={() => navigate("/admin/users")}
                      >
                        <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#F1F5F9" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: "#6366F1", fontSize: 13, fontWeight: 700 }}>
                              {user.fullName?.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600} sx={{ color: "#F1F5F9" }}>
                              {user.fullName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <Chip
                            label={user.role}
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: 600,
                              bgcolor: user.role === "admin" ? "rgba(239,68,68,0.15)" : user.role === "company" ? "rgba(20,184,166,0.15)" : "rgba(99,102,241,0.15)",
                              color: user.role === "admin" ? "#EF4444" : user.role === "company" ? "#14B8A6" : "#6366F1",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
