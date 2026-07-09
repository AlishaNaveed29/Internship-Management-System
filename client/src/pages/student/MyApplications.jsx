import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Chip, Avatar, Typography, Box, Pagination, Skeleton, Button
} from "@mui/material";
import { Assignment, Business } from "@mui/icons-material";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";

const STATUS_COLORS = {
  pending: "warning",
  reviewed: "info",
  accepted: "success",
  rejected: "error",
};

const STATUS_BG = {
  pending: "rgba(245,158,11,0.12)",
  reviewed: "rgba(99,102,241,0.12)",
  accepted: "rgba(16,185,129,0.12)",
  rejected: "rgba(239,68,68,0.12)",
};

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    setLoading(true);
    API.get(`/applications/my?page=${page}&limit=${limit}`)
      .then((res) => {
        const data = res.data;
        setApplications(data.applications || data.data || data);
        setTotalPages(data.totalPages || data.pages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <StudentLayout>
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
            My Applications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track your internship applications
          </Typography>
        </Box>

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          {loading ? (
            <Box sx={{ p: 3 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5, borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
                  <Skeleton variant="circular" width={36} height={36} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="25%" />
                  </Box>
                  <Skeleton variant="rounded" width={80} height={24} />
                </Box>
              ))}
            </Box>
          ) : applications.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Assignment sx={{ fontSize: 72, color: "text.secondary", mb: 2, opacity: 0.3 }} />
              <Typography variant="h5" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
                No applications yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Browse internships and start applying!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/student/browse")}
                sx={{
                  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 25px rgba(99,102,241,0.35)" },
                }}
              >
                Browse Internships
              </Button>
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Internship</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Applied Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((app, idx) => (
                        <TableRow
                          hover
                          key={app._id}
                          sx={{
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": { bgcolor: "rgba(99,102,241,0.04)" },
                          }}
                          onClick={() => navigate("/student/browse")}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar
                                sx={{
                                  width: 36, height: 36,
                                  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                                  fontSize: 13, fontWeight: 700,
                                }}
                              >
                                {(app.internship?.title || "I").charAt(0)}
                              </Avatar>
                              <Typography variant="body2" fontWeight={600}>
                                {app.internship?.title || "N/A"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Business sx={{ fontSize: 14 }} />
                              {app.internship?.company?.companyName || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={app.status}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                textTransform: "capitalize",
                                bgcolor: STATUS_BG[app.status] || "rgba(99,102,241,0.12)",
                              color: app.status === "pending" ? "#F59E0B" :
                                     app.status === "reviewed" ? "#6366F1" :
                                     app.status === "accepted" ? "#10B981" :
                                     app.status === "rejected" ? "#EF4444" : "#94A3B8",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(app.createdAt || app.appliedDate).toLocaleDateString("en-US", {
                                year: "numeric", month: "short", day: "numeric",
                              })}
                            </Typography>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", p: 2.5 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    color="primary"
                    size="large"
                    sx={{ "& .MuiPaginationItem-root": { fontWeight: 600 } }}
                  />
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </StudentLayout>
  );
}
