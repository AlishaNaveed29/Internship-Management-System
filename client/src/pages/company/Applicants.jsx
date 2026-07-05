import { useState, useEffect } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Chip, Avatar, Select, MenuItem, FormControl, InputLabel,
  Typography, Box, Pagination
} from "@mui/material";
import { People } from "@mui/icons-material";
import { toast } from "react-toastify";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

const ITEMS_PER_PAGE = 5;

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/company");
      setApplications(res.data);
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

  const statuses = ["All", "Pending", "Reviewed", "Accepted", "Rejected"];
  const statusColors = {
    Pending: "#6366F1",
    Reviewed: "#F59E0B",
    Accepted: "#10B981",
    Rejected: "#EF4444",
  };

  return (
    <CompanyLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="#E2E8F0">
            Applicants
          </Typography>
          <Box display="flex" gap={1}>
            {statuses.map((s) => (
              <Chip
                key={s}
                label={s}
                onClick={() => { setFilter(s); setPage(1); }}
                sx={{
                  bgcolor: filter === s ? "#6366F1" : "transparent",
                  color: filter === s ? "#fff" : "#94A3B8",
                  border: "1px solid",
                  borderColor: filter === s ? "#6366F1" : "#1E293B",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { bgcolor: filter === s ? "#6366F1" : "#1E293B" },
                }}
              />
            ))}
          </Box>
        </Box>

        {loading ? (
          <Typography color="#94A3B8">Loading applicants...</Typography>
        ) : filteredApplications.length === 0 ? (
          <Paper sx={{ bgcolor: "#13182B", borderRadius: 3, p: 6, border: "1px solid #1E293B", textAlign: "center" }}>
            <People sx={{ fontSize: 64, color: "#1E293B", mb: 2 }} />
            <Typography variant="h6" color="#94A3B8">No applicants found</Typography>
          </Paper>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ bgcolor: "#13182B", borderRadius: 3, border: "1px solid #1E293B" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Student</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Internship</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Applied Date</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Status</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedApplications.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell sx={{ borderColor: "#1E293B" }}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: "#6366F1", fontSize: 16 }}>
                            {app.studentId?.name?.charAt(0) || "S"}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" color="#E2E8F0" fontWeight="600">
                              {app.studentId?.name || "Unknown"}
                            </Typography>
                            <Typography variant="caption" color="#94A3B8">
                              {app.studentId?.email || ""}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "#94A3B8", borderColor: "#1E293B" }}>
                        {app.internshipId?.title || "N/A"}
                      </TableCell>
                      <TableCell sx={{ color: "#94A3B8", borderColor: "#1E293B" }}>
                        {new Date(app.createdAt || app.appliedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ borderColor: "#1E293B" }}>
                        <Chip
                          label={app.status}
                          size="small"
                          sx={{
                            bgcolor: statusColors[app.status] || "#6366F1",
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ borderColor: "#1E293B" }} align="center">
                        <FormControl size="small" sx={{ minWidth: 130 }}>
                          <InputLabel sx={{ color: "#94A3B8" }}>Status</InputLabel>
                          <Select
                            value={app.status}
                            label="Status"
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            sx={{
                              color: "#E2E8F0",
                              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1E293B" },
                              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6366F1" },
                              "& .MuiSvgIcon-root": { color: "#94A3B8" },
                            }}
                          >
                            {["Pending", "Reviewed", "Accepted", "Rejected"].map((s) => (
                              <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, val) => setPage(val)}
                  sx={{
                    "& .MuiPaginationItem-root": { color: "#94A3B8", borderColor: "#1E293B" },
                    "& .Mui-selected": { bgcolor: "#6366F1 !important", color: "#fff" },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </CompanyLayout>
  );
}
