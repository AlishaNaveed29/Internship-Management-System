import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  LinearProgress,
} from "@mui/material";
import {
  Work,
  Assignment,
  CheckCircle,
  Cancel,
  TrendingUp,
  School,
  ArrowUpward,
  AccessTime,
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";

const chartData = [
  { month: "Jan", applications: 1, interviews: 0 },
  { month: "Feb", applications: 2, interviews: 1 },
  { month: "Mar", applications: 3, interviews: 1 },
  { month: "Apr", applications: 5, interviews: 2 },
  { month: "May", applications: 4, interviews: 3 },
  { month: "Jun", applications: 6, interviews: 3 },
];

const recentActivity = [
  { action: "Applied to Software Engineer Intern", company: "Google", date: "2 hours ago", type: "success" },
  { action: "Application viewed by company", company: "Microsoft", date: "1 day ago", type: "info" },
  { action: "Interview scheduled", company: "Amazon", date: "3 days ago", type: "warning" },
];

const defaultStats = [
  { title: "Available", value: 25, icon: <Work />, color: "#6366F1", bg: "rgba(99,102,241,0.1)", change: "+5", trend: "up" },
  { title: "Applied", value: 4, icon: <Assignment />, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", change: "+2", trend: "up" },
  { title: "Accepted", value: 1, icon: <CheckCircle />, color: "#10B981", bg: "rgba(16,185,129,0.1)", change: "0", trend: "neutral" },
  { title: "Rejected", value: 1, icon: <Cancel />, color: "#EF4444", bg: "rgba(239,68,68,0.1)", change: "+1", trend: "up" },
];

function StudentDashboard() {
  const [stats, setStats] = useState(defaultStats);

  const fetchStats = async () => {
    try {
      const res = await API.get("/students/dashboard-stats");
      if (res.data) {
        setStats((prev) =>
          prev.map((s, i) => ({
            ...s,
            value: res.data[["internships", "applied", "accepted", "rejected"][i]] || s.value,
          }))
        );
      }
    } catch {
      console.log("Using default stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <StudentLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Student Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Here's your internship overview.
          </Typography>
        </Box>
        <Chip icon={<School />} label="Your Profile" color="primary" variant="outlined" size="small" />
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((card) => (
          <Grid item xs={6} md={3} key={card.title}>
            <Paper
              sx={{
                p: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #F1F5F9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: card.bg,
                    color: card.color,
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {card.title}
                  </Typography>
                  <Typography variant="h5" fontWeight={800} sx={{ color: card.color, lineHeight: 1.2 }}>
                    {card.value}
                  </Typography>
                </Box>
              </Box>
              {card.trend === "up" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                  <ArrowUpward sx={{ fontSize: 14, color: "#10B981" }} />
                  <Typography variant="caption" fontWeight={700} sx={{ color: "#10B981" }}>
                    {card.change}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2.5, border: "1px solid #F1F5F9" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>
                Application Trends
              </Typography>
              <Chip icon={<TrendingUp />} label="+12% this month" color="success" size="small" />
            </Box>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#6366F1" strokeWidth={2.5} dot={{ fill: "#6366F1", r: 4 }} />
                <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2.5} dot={{ fill: "#10B981", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.5, border: "1px solid #F1F5F9" }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2.5 }}>
              Recent Activity
            </Typography>
            <Stack spacing={0}>
              {recentActivity.map((item, i) => (
                <Box key={i}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: item.type === "success" ? "rgba(16,185,129,0.1)" : item.type === "info" ? "rgba(99,102,241,0.1)" : "rgba(245,158,11,0.1)",
                        flexShrink: 0,
                      }}
                    >
                      <School sx={{ fontSize: 16, color: item.type === "success" ? "#10B981" : item.type === "info" ? "#6366F1" : "#F59E0B" }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {item.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.company} &bull; {item.date}
                      </Typography>
                    </Box>
                  </Box>
                  {i < recentActivity.length - 1 && <Box sx={{ borderBottom: "1px solid #F1F5F9" }} />}
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </StudentLayout>
  );
}

export default StudentDashboard;
