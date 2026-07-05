import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Paper, Grid, Card, CardContent, Chip, Table,
  TableHead, TableRow, TableCell, TableBody, TableContainer, Avatar
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Work, People, HourglassEmpty, CheckCircle } from "@mui/icons-material";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalInternships: 0,
    totalApplicants: 0,
    pendingReviews: 0,
    accepted: 0,
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

        const internships = internshipsRes.data;
        const applications = applicationsRes.data;

        setStats({
          totalInternships: internships.length,
          totalApplicants: applications.length,
          pendingReviews: applications.filter((a) => a.status === "Pending").length,
          accepted: applications.filter((a) => a.status === "Accepted").length,
        });

        const chart = internships.map((internship) => {
          const count = applications.filter((a) => a.internshipId?._id === internship._id || a.internshipId === internship._id).length;
          return {
            name: internship.title?.length > 15 ? internship.title.slice(0, 15) + "..." : internship.title,
            applicants: count,
          };
        });
        setChartData(chart);

        const recent = [...applications]
          .sort((a, b) => new Date(b.createdAt || b.appliedDate) - new Date(a.createdAt || a.appliedDate))
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
    { label: "Total Internships", value: stats.totalInternships, icon: <Work />, color: "#6366F1" },
    { label: "Total Applicants", value: stats.totalApplicants, icon: <People />, color: "#14B8A6" },
    { label: "Pending Reviews", value: stats.pendingReviews, icon: <HourglassEmpty />, color: "#F59E0B" },
    { label: "Accepted", value: stats.accepted, icon: <CheckCircle />, color: "#10B981" },
  ];

  return (
    <CompanyLayout>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#E2E8F0">
          Dashboard
        </Typography>

        <Grid container spacing={3} mb={4}>
          {statCards.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.label}>
              <Card sx={{ bgcolor: "#13182B", borderRadius: 3, border: "1px solid #1E293B" }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" color="#94A3B8">{card.label}</Typography>
                      <Typography variant="h4" fontWeight="bold" color="#E2E8F0" mt={1}>
                        {loading ? "..." : card.value}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: card.color, width: 48, height: 48 }}>
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
            <Paper sx={{ bgcolor: "#13182B", borderRadius: 3, p: 3, border: "1px solid #1E293B" }}>
              <Typography variant="h6" fontWeight="bold" color="#E2E8F0" mb={2}>
                Applications per Internship
              </Typography>
              {loading ? (
                <Typography color="#94A3B8">Loading chart...</Typography>
              ) : chartData.length === 0 ? (
                <Typography color="#94A3B8">No data available</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="name" stroke="#94A3B8" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#13182B", border: "1px solid #1E293B", borderRadius: 8 }}
                      labelStyle={{ color: "#E2E8F0" }}
                    />
                    <Bar dataKey="applicants" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ bgcolor: "#13182B", borderRadius: 3, border: "1px solid #1E293B" }}>
              <Box p={2} borderBottom="1px solid #1E293B">
                <Typography variant="h6" fontWeight="bold" color="#E2E8F0">
                  Recent Applicants
                </Typography>
              </Box>
              {loading ? (
                <Box p={2}><Typography color="#94A3B8">Loading...</Typography></Box>
              ) : recentApplicants.length === 0 ? (
                <Box p={2}><Typography color="#94A3B8">No applicants yet</Typography></Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "#94A3B8", borderColor: "#1E293B" }}>Student</TableCell>
                        <TableCell sx={{ color: "#94A3B8", borderColor: "#1E293B" }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentApplicants.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell sx={{ borderColor: "#1E293B" }}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar sx={{ width: 32, height: 32, bgcolor: "#6366F1", fontSize: 14 }}>
                                {app.studentId?.name?.charAt(0) || "S"}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="#E2E8F0">
                                  {app.studentId?.name || "Unknown"}
                                </Typography>
                                <Typography variant="caption" color="#94A3B8">
                                  {app.internshipId?.title || "N/A"}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ borderColor: "#1E293B" }}>
                            <Chip
                              label={app.status}
                              size="small"
                              sx={{
                                bgcolor: app.status === "Accepted" ? "#10B981" :
                                         app.status === "Rejected" ? "#EF4444" :
                                         app.status === "Reviewed" ? "#F59E0B" : "#6366F1",
                                color: "#fff",
                                fontWeight: 600,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Box p={2} textAlign="center" borderTop="1px solid #1E293B">
                <Typography
                  variant="body2"
                  color="#6366F1"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/company/applicants")}
                >
                  View All Applicants
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </CompanyLayout>
  );
}
