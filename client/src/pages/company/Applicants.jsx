import { useState, useEffect } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Chip, Avatar, Select, MenuItem, FormControl, InputLabel,
  Typography, Box, Pagination, Fade, Skeleton
} from "@mui/material";
import { People, Business } from "@mui/icons-material";
import { toast } from "react-toastify";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

const ITEMS_PER_PAGE = 5;

const statusColors = {
  pending: { bg: "rgba(99,102,241,0.15)", color: "#6366F1" },
  reviewed: { bg: "rgba(245,158,11,0.15)", color: "#F59E0B" },
  accepted: { bg: "rgba(16,185,129,0.15)", color: "#10B981" },
  rejected: { bg: "rgba(239,68,68,0.15)", color: "#EF4444" },
};

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/company");
      setApplications(res.data.applications || []);
    } catch (err) {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/applications/${id}/status`, { status: newStatus });
      toast.success("Status updated");
      fetchApplications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const filteredApplications = filter === "All"
    ? applications
    : applications.filter((app) => app.status === filter);

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = filteredApplications.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const statuses = ["All", "pending", "reviewed", "accepted", "rejected"];

  return (
    <CompanyLayout>
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
              Applicants
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review and manage internship applications
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            {statuses.map((s) => (
              <Chip
                key={s}
                label={s === "All" ? "All" : s}
                onClick={() => { setFilter(s); setPage(1); }}
                sx={{
                  bgcolor: filter === s ? "#6366F1" : "transparent",
                  color: filter === s ? "#fff" : "#94A3B8",
                  border: "1px solid",
                  borderColor: filter === s ? "#6366F1" : "rgba(99,102,241,0.2)",
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.2s ease",
                  "&:hover": { bgcolor: filter === s ? "#6366F1" : "rgba(99,102,241,0.08)" },
                }}
              />
            ))}
          </Box>
        </Box>

        {loading ? (
          <Paper sx={{ borderRadius: 3, p: 3 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5, borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
                <Skeleton variant="circular" width={36} height={36} />
                <Box sx={{ flex: 1 }}><Skeleton variant="text" width="40%" /><Skeleton variant="text" width="25%" /></Box>
                <Skeleton variant="rounded" width={100} height={32} />
              </Box>
            ))}
          </Paper>
        ) : filteredApplications.length === 0 ? (
          <Paper sx={{ textAlign: "center", py: 8, borderRadius: 3 }}>
            <People sx={{ fontSize: 72, color: "text.secondary", mb: 2, opacity: 0.3 }} />
            <Typography variant="h5" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
              No applicants found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filter !== "All" ? `No applications with status "${filter}"` : "No applications have been submitted yet"}
            </Typography>
          </Paper>
        ) : (
          <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Internship</TableCell>
                    <TableCell>Applied Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Update Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedApplications.map((app, idx) => (
                    <Fade in timeout={300 + idx * 75} key={app._id}>
                      <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar sx={{ width: 36, height: 36, background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", fontSize: 14, fontWeight: 700 }}>
                              {app.student?.fullName?.charAt(0) || "S"}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {app.student?.fullName || "Unknown"}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {app.student?.email || ""}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {app.internship?.title || "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(app.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={app.status}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              textTransform: "capitalize",
                              bgcolor: (statusColors[app.status] || statusColors.pending).bg,
                              color: (statusColors[app.status] || statusColors.pending).color,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <FormControl size="small" sx={{ minWidth: 130 }}>
                            <InputLabel sx={{ color: "#94A3B8" }}>Status</InputLabel>
                            <Select
                              value={app.status}
                              label="Status"
                              onChange={(e) => handleStatusChange(app._id, e.target.value)}
                              sx={{
                                color: "#E2E8F0",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.2)" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6366F1" },
                                "& .MuiSvgIcon-root": { color: "#94A3B8" },
                              }}
                            >
                              {["pending", "reviewed", "accepted", "rejected"].map((s) => (
                                <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>{s}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" p={2.5}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, val) => setPage(val)}
                  color="primary"
                  size="large"
                  sx={{ "& .MuiPaginationItem-root": { fontWeight: 600 } }}
                />
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </CompanyLayout>
  );
}
