import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import {
  School,
  Business,
  Work,
  Assignment,
  TrendingUp,
  People,
  ArrowUpward,
  PersonAdd,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../layouts/AdminLayout";

const statCards = [
  { title: "Students", value: 200, icon: <School />, color: "#6366F1", bg: "rgba(99,102,241,0.1)", change: "+24", trend: "up" },
  { title: "Companies", value: 50, icon: <Business />, color: "#10B981", bg: "rgba(16,185,129,0.1)", change: "+3", trend: "up" },
  { title: "Internships", value: 120, icon: <Work />, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", change: "+12", trend: "up" },
  { title: "Applications", value: 700, icon: <Assignment />, color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", change: "+48", trend: "up" },
];

const chartData = [
  { month: "Jan", students: 120, companies: 30, internships: 60 },
  { month: "Feb", students: 140, companies: 35, internships: 70 },
  { month: "Mar", students: 160, companies: 38, internships: 80 },
  { month: "Apr", students: 180, companies: 42, internships: 95 },
  { month: "May", students: 190, companies: 48, internships: 110 },
  { month: "Jun", students: 200, companies: 50, internships: 120 },
];

const quickStats = [
  { label: "New this week", value: "+24 students", color: "#6366F1", icon: <PersonAdd sx={{ fontSize: 18 }} /> },
  { label: "Active internships", value: "85", color: "#10B981", icon: <Work sx={{ fontSize: 18 }} /> },
  { label: "Pending reviews", value: "12", color: "#F59E0B", icon: <Assignment sx={{ fontSize: 18 }} /> },
  { label: "New companies", value: "+3 this week", color: "#8B5CF6", icon: <Business sx={{ fontSize: 18 }} /> },
];

const recentUsers = [
  { name: "Alice Johnson", role: "Student", initials: "AJ", color: "#6366F1" },
  { name: "TechCorp Inc", role: "Company", initials: "T", color: "#10B981" },
  { name: "Bob Smith", role: "Student", initials: "BS", color: "#6366F1" },
  { name: "DataFlow Ltd", role: "Company", initials: "D", color: "#10B981" },
];

function AdminDashboard() {
  return (
    <AdminLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Platform overview and analytics
          </Typography>
        </Box>
        <Chip icon={<TrendingUp />} label="+15% this quarter" color="success" size="small" />
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statCards.map((card) => (
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
                Platform Growth
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#6366F1" }} />
                  <Typography variant="caption" color="text.secondary">Students</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#10B981" }} />
                  <Typography variant="caption" color="text.secondary">Companies</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#F59E0B" }} />
                  <Typography variant="caption" color="text.secondary">Internships</Typography>
                </Box>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="students" stackId="1" stroke="#6366F1" fill="#6366F1" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="companies" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="internships" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.5, border: "1px solid #F1F5F9" }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>
              Quick Stats
            </Typography>
            <Stack spacing={0}>
              {quickStats.map((item, i) => (
                <Box key={i}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ color: item.color, display: "flex" }}>{item.icon}</Box>
                      <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700} sx={{ color: item.color }}>{item.value}</Typography>
                  </Box>
                  {i < quickStats.length - 1 && <Box sx={{ borderBottom: "1px solid #F1F5F9" }} />}
                </Box>
              ))}
            </Stack>

            <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 2.5, mb: 1.5 }}>
              Recent Users
            </Typography>
            <Stack spacing={0}>
              {recentUsers.map((user, i) => (
                <Box key={i}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: user.color,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {user.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.role}</Typography>
                    </Box>
                  </Box>
                  {i < recentUsers.length - 1 && <Box sx={{ borderBottom: "1px solid #F1F5F9" }} />}
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default AdminDashboard;
