import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Paper, Grid, Card, CardContent, Chip, Table,
  TableHead, TableRow, TableCell, TableBody, TableContainer, Avatar, Fade, Skeleton
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Work, People, HourglassEmpty, CheckCircle, Business } from "@mui/icons-material";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

const statusColorMap = {
  pending: { bg: "rgba(99,102,241,0.15)", color: "#6366F1" },
  reviewed: { bg: "rgba(245,158,11,0.15)", color: "#F59E0B" },
  accepted: { bg: "rgba(16,185,129,0.15)", color: "#10B981" },
  rejected: { bg: "rgba(239,68,68,0.15)", color: "#EF4444" },
};

const statGradients = [
  { bg: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 100%)", accent: "#6366F1", icon: <Work /> },
  { bg: "linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(20,184,166,0.04) 100%)", accent: "#14B8A6", icon: <People /> },
  { bg: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 100%)", accent: "#F59E0B", icon: <HourglassEmpty /> },
  { bg: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 100%)", accent: "#10B981", icon: <CheckCircle /> },
];

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalInternships: 0, totalApplicants: 0, pendingReviews: 0, accepted: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internshipsRes, applicationsRes] = await Promise.all([
          API.get("/internships/my"),
          API.get("/applications/company"),
        ]);

        const internships = internshipsRes.data.internships || [];
        const applications = applicationsRes.data.applications || [];

        setStats({
          totalInternships: internships.length,
          totalApplicants: applications.length,
          pendingReviews: applications.filter((a) => a.status === "pending").length,
          accepted: applications.filter((a) => a.status === "accepted").length,
        });

        const chart = internships.map((internship) => {
          const count = applications.filter((a) => a.internship?._id === internship._id || a.internship === internship._id).length;
          return {
            name: internship.title?.length > 12 ? internship.title.slice(0, 12) + "..." : internship.title,
            applicants: count,
          };
        });
        setChartData(chart);

        const recent = [...applications]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentApplicants(recent);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Internships", value: stats.totalInternships, ...statGradients[0] },
    { label: "Total Applicants", value: stats.totalApplicants, ...statGradients[1] },
    { label: "Pending Reviews", value: stats.pendingReviews, ...statGradients[2] },
    { label: "Accepted", value: stats.accepted, ...statGradients[3] },
  ];

  return (
    <CompanyLayout>
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
          Company Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Track your internships and applicants
        </Typography>

        <Grid container spacing={3} mb={4}>
          {statCards.map((card, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
              <Fade in timeout={300 + i * 100}>
                <Card sx={{
                  background: card.bg,
                  border: `1px solid ${card.accent}22`,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 40px ${card.accent}22`,
                    borderColor: `${card.accent}44`,
                  },
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {card.label}
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color={card.accent} mt={0.5}>
                          {loading ? <Skeleton width={40} /> : card.value}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: `${card.accent}22`, color: card.accent, width: 48, height: 48 }}>
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
              <Typography variant="h6" fontWeight={700} mb={2}>
                Applications per Internship
              </Typography>
              {loading ? (
                <Skeleton variant="rounded" width="100%" height={300} />
              ) : chartData.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Work sx={{ fontSize: 48, color: "text.secondary", mb: 1, opacity: 0.3 }} />
                  <Typography color="text.secondary">No data available</Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                    <XAxis dataKey="name" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#13182B",
                        border: "1px solid rgba(99,102,241,0.2)",
                        borderRadius: 12,
                        color: "#F1F5F9",
                      }}
                      labelStyle={{ color: "#E2E8F0", fontWeight: 600 }}
                    />
                    <Bar dataKey="applicants" fill="#6366F1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Box p={2.5} borderBottom="1px solid rgba(99,102,241,0.1)">
                <Typography variant="h6" fontWeight={700}>
                  Recent Applicants
                </Typography>
              </Box>
              {loading ? (
                <Box p={2}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Box sx={{ flex: 1 }}><Skeleton variant="text" width="60%" /><Skeleton variant="text" width="30%" /></Box>
                    </Box>
                  ))}
                </Box>
              ) : recentApplicants.length === 0 ? (
                <Box p={3} textAlign="center">
                  <People sx={{ fontSize: 48, color: "text.secondary", mb: 1, opacity: 0.3 }} />
                  <Typography color="text.secondary">No applicants yet</Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentApplicants.map((app, idx) => (
                        <Fade in timeout={300 + idx * 75} key={app._id}>
                          <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }}>
                            <TableCell>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: "#6366F1", fontSize: 13, fontWeight: 700 }}>
                                  {app.student?.fullName?.charAt(0) || "S"}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight={600}>
                                    {app.student?.fullName || "Unknown"}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {app.internship?.title || "N/A"}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={app.status}
                                size="small"
                                sx={{
                                  fontWeight: 700,
                                  textTransform: "capitalize",
                                  bgcolor: (statusColorMap[app.status] || statusColorMap.pending).bg,
                                  color: (statusColorMap[app.status] || statusColorMap.pending).color,
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        </Fade>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Box p={2} textAlign="center" borderTop="1px solid rgba(99,102,241,0.1)">
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
                  onClick={() => navigate("/company/applicants")}
                >
                  View All Applicants →
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </CompanyLayout>
  );
}
