import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  Work,
  Assignment,
  CheckCircle,
  Cancel,
  TrendingUp,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CompanyLayout from "../../layouts/CompanyLayout";

const statCards = [
  { title: "Posted Internships", value: 6, icon: <Work />, color: "#6366F1", bg: "rgba(99,102,241,0.1)" },
  { title: "Total Applications", value: 31, icon: <Assignment />, color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  { title: "Accepted", value: 8, icon: <CheckCircle />, color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  { title: "Rejected", value: 5, icon: <Cancel />, color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
];

const chartData = [
  { month: "Jan", applications: 5, accepted: 2 },
  { month: "Feb", applications: 8, accepted: 3 },
  { month: "Mar", applications: 12, accepted: 4 },
  { month: "Apr", applications: 7, accepted: 2 },
  { month: "May", applications: 15, accepted: 5 },
  { month: "Jun", applications: 10, accepted: 3 },
];

const recentApplicants = [
  { name: "Alice Johnson", position: "Frontend Intern", status: "pending", date: "2 hours ago" },
  { name: "Bob Smith", position: "Backend Intern", status: "reviewed", date: "1 day ago" },
  { name: "Carol Williams", position: "UI/UX Intern", status: "accepted", date: "3 days ago" },
];

function CompanyDashboard() {
  return (
    <CompanyLayout>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
        Company Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Manage your internships and review applicants
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: "1px solid #F1F5F9",
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
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
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {card.title}
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ color: card.color }}>
                  {card.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, border: "1px solid #F1F5F9" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>Application Overview</Typography>
              <Chip icon={<TrendingUp />} label="+18% this month" color="success" size="small" />
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="applications" fill="#6366F1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="accepted" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, border: "1px solid #F1F5F9" }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Recent Applicants
            </Typography>
            {recentApplicants.map((app, i) => (
              <Box key={i} sx={{ mb: 2.5, "&:last-child": { mb: 0 } }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      bgcolor: "#6366F1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {app.name.charAt(0)}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{app.name}</Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {app.position}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {app.date}
                    </Typography>
                  </Box>
                </Box>
                {i < recentApplicants.length - 1 && (
                  <Box sx={{ borderBottom: "1px solid #F1F5F9", my: 2 }} />
                )}
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </CompanyLayout>
  );
}

export default CompanyDashboard;
