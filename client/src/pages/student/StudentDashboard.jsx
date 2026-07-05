import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Paper, Grid, Card, CardContent, Chip, Table,
  TableHead, TableRow, TableCell, TableBody, TableContainer, Avatar
} from "@mui/material";
import {
  Assignment, HourglassEmpty, CheckCircle, Cancel
} from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import StudentLayout from "../../layouts/StudentLayout";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

const statCards = [
  { label: "Total Applications", icon: <Assignment />, color: "#6366F1", bg: "rgba(99,102,241,0.15)" },
  { label: "Pending", icon: <HourglassEmpty />, color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  { label: "Accepted", icon: <CheckCircle />, color: "#10B981", bg: "rgba(16,185,129,0.15)" },
  { label: "Rejected", icon: <Cancel />, color: "#EF4444", bg: "rgba(239,68,68,0.15)" },
];

const STATUS_COLORS = {
  pending: "warning", reviewed: "info", accepted: "success", rejected: "error",
};

const PIE_COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"];

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/applications/my")
      .then((res) => setApplications(res.data.applications || res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Accepted", value: stats.accepted },
    { name: "Rejected", value: stats.rejected },
  ].filter((d) => d.value > 0);

  const recentApps = applications.slice(0, 5);

  return (
    <StudentLayout>
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Welcome back, {user?.fullName?.split(" ")[0] || "Student"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Here&apos;s an overview of your internship applications
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: "Total Applications", value: stats.total, icon: <Assignment />, color: "#6366F1", bg: "rgba(99,102,241,0.15)" },
            { label: "Pending", value: stats.pending, icon: <HourglassEmpty />, color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
            { label: "Accepted", value: stats.accepted, icon: <CheckCircle />, color: "#10B981", bg: "rgba(16,185,129,0.15)" },
            { label: "Rejected", value: stats.rejected, icon: <Cancel />, color: "#EF4444", bg: "rgba(239,68,68,0.15)" },
          ].map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.label}>
              <Card sx={{
                background: `linear-gradient(135deg, ${card.bg} 0%, ${card.bg}88 100%)`,
                border: `1px solid ${card.color}33`,
                position: "relative",
                overflow: "hidden",
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="h3" fontWeight={800} sx={{ color: card.color, mb: 0.5 }}>
                        {loading ? "..." : card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {card.label}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: card.color, width: 48, height: 48, opacity: 0.9 }}>
                      {card.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Recent Applications
              </Typography>
              {loading ? (
                <Typography color="text.secondary">Loading...</Typography>
              ) : recentApps.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Assignment sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                  <Typography color="text.secondary">No applications yet</Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Internship</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentApps.map((app) => (
                        <TableRow key={app._id} hover sx={{ cursor: "pointer" }} onClick={() => navigate("/student/applications")}>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {app.internship?.title || app.internshipTitle || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={app.status}
                              size="small"
                              color={STATUS_COLORS[app.status] || "default"}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(app.createdAt || app.appliedDate).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Application Breakdown
              </Typography>
              {pieData.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography color="text.secondary">No data to display</Typography>
                </Box>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((_, idx) => (
                          <Cell key={idx} fill={PIE_COLORS[idx]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mt: 1 }}>
                    {pieData.map((item, idx) => (
                      <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: PIE_COLORS[idx] }} />
                        <Typography variant="caption" color="text.secondary">
                          {item.name} ({item.value})
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </StudentLayout>
  );
}
