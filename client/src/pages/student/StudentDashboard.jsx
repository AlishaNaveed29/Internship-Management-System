import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Paper, Grid, Card, CardContent, Chip, Table,
  TableHead, TableRow, TableCell, TableBody, TableContainer, Avatar, Fade, Skeleton
} from "@mui/material";
import {
  Assignment, HourglassEmpty, CheckCircle, Cancel, Work
} from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import StudentLayout from "../../layouts/StudentLayout";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

const STATUS_COLORS = {
  pending: "warning", reviewed: "info", accepted: "success", rejected: "error",
};

const PIE_COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"];

const statConfig = [
  { label: "Total Applications", icon: <Assignment />, color: "#6366F1", bg: "rgba(99,102,241,0.15)", gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)" },
  { label: "Pending", icon: <HourglassEmpty />, color: "#F59E0B", bg: "rgba(245,158,11,0.15)", gradient: "linear-gradient(135deg, #F59E0B, #F97316)" },
  { label: "Accepted", icon: <CheckCircle />, color: "#10B981", bg: "rgba(16,185,129,0.15)", gradient: "linear-gradient(135deg, #10B981, #34D399)" },
  { label: "Rejected", icon: <Cancel />, color: "#EF4444", bg: "rgba(239,68,68,0.15)", gradient: "linear-gradient(135deg, #EF4444, #F87171)" },
];

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
    { name: "Pending", value: stats.pending, color: PIE_COLORS[1] },
    { name: "Accepted", value: stats.accepted, color: PIE_COLORS[2] },
    { name: "Rejected", value: stats.rejected, color: PIE_COLORS[3] },
  ].filter((d) => d.value > 0);

  const recentApps = applications.slice(0, 5);

  const statCards = [
    { ...statConfig[0], value: stats.total },
    { ...statConfig[1], value: stats.pending },
    { ...statConfig[2], value: stats.accepted },
    { ...statConfig[3], value: stats.rejected },
  ];

  return (
    <StudentLayout>
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
          Welcome back, {user?.fullName?.split(" ")[0] || "Student"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Here&apos;s an overview of your internship applications
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((card, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
              <Fade in timeout={300 + i * 100}>
                <Card sx={{
                  background: `linear-gradient(135deg, ${card.bg} 0%, ${card.bg}88 100%)`,
                  border: `1px solid ${card.color}33`,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 40px ${card.color}33`,
                    borderColor: card.color + "66",
                  },
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography variant="h3" fontWeight={800} sx={{ color: card.color, mb: 0.5 }}>
                          {loading ? <Skeleton width={40} /> : card.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {card.label}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: card.color, width: 48, height: 48, opacity: 0.9, boxShadow: `0 4px 15px ${card.color}44` }}>
                        {card.icon}
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Recent Applications
              </Typography>
              {loading ? (
                <Box>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, py: 1, borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Box sx={{ flex: 1 }}><Skeleton variant="text" width="60%" /><Skeleton variant="text" width="30%" /></Box>
                    </Box>
                  ))}
                </Box>
              ) : recentApps.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Work sx={{ fontSize: 48, color: "text.secondary", mb: 1, opacity: 0.3 }} />
                  <Typography variant="h6" color="text.secondary" fontWeight={600}>
                    No applications yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Browse internships and start your journey!
                  </Typography>
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
                      {recentApps.map((app, idx) => (
                        <Fade in timeout={300 + idx * 75} key={app._id}>
                          <TableRow hover sx={{ cursor: "pointer", "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }} onClick={() => navigate("/student/applications")}>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {app.internship?.title || "N/A"}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={app.status}
                                size="small"
                                color={STATUS_COLORS[app.status] || "default"}
                                variant="outlined"
                                sx={{ fontWeight: 600, textTransform: "capitalize" }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(app.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </Fade>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Application Breakdown
              </Typography>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <Skeleton variant="circular" width={200} height={200} />
                </Box>
              ) : pieData.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography color="text.secondary">No data to display</Typography>
                </Box>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%" cy="50%"
                        innerRadius={60} outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", mt: 1 }}>
                    {pieData.map((item) => (
                      <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color }} />
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
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
