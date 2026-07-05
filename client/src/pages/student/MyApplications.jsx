import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Chip, Avatar, Typography, Box, IconButton, Pagination
} from "@mui/material";
import { Visibility, Assignment } from "@mui/icons-material";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";

const STATUS_COLORS = {
  pending: "warning",
  reviewed: "info",
  accepted: "success",
  rejected: "error",
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
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          My Applications
        </Typography>

        <Paper>
          {loading ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography color="text.secondary">Loading...</Typography>
            </Box>
          ) : applications.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Assignment sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No applications yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse internships and start applying!
              </Typography>
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
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app._id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar
                              src={app.internship?.company?.logo || app.companyLogo}
                              sx={{ width: 36, height: 36, bgcolor: "#6366F1", fontSize: 14 }}
                            >
                              {(app.internship?.company?.name || app.companyName || "C").charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>
                              {app.internship?.title || app.internshipTitle || "N/A"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {app.internship?.company?.name || app.companyName || "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={app.status}
                            size="small"
                            color={STATUS_COLORS[app.status] || "default"}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(app.createdAt || app.appliedDate).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate("/student/applications")}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    color="primary"
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
