import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { Search, Assignment } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApplications = () => {
    setLoading(true);
    const params = { search, page, limit: 10 };
    if (status) params.status = status;
    API.get("/admin/applications", { params })
      .then(({ data }) => {
        setApplications(data.applications || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, [page, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const statusColor = {
    pending: "#F59E0B",
    accepted: "#22C55E",
    rejected: "#EF4444",
    reviewing: "#6366F1",
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#F1F5F9", mb: 1 }}>
            Applications
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>
            Manage internship applications
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search applications..."
            value={search}
            onChange={handleSearch}
            size="small"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><Search sx={{ color: "#64748B" }} /></InputAdornment>,
              },
            }}
            sx={{
              minWidth: 260,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#13182B",
                borderRadius: 3,
                color: "#F1F5F9",
                "& fieldset": { borderColor: "rgba(99,102,241,0.2)" },
                "&:hover fieldset": { borderColor: "rgba(99,102,241,0.4)" },
                "&.Mui-focused fieldset": { borderColor: "#6366F1" },
              },
            }}
          />
          <FormControl
            size="small"
            sx={{
              minWidth: 150,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#13182B",
                borderRadius: 3,
                color: "#F1F5F9",
                "& fieldset": { borderColor: "rgba(99,102,241,0.2)" },
                "&:hover fieldset": { borderColor: "rgba(99,102,241,0.4)" },
                "&.Mui-focused fieldset": { borderColor: "#6366F1" },
              },
              "& .MuiInputLabel-root": { color: "#64748B", "&.Mui-focused": { color: "#6366F1" } },
            }}
          >
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="reviewing">Reviewing</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Paper sx={{ borderRadius: 4, bgcolor: "#13182B", border: "1px solid rgba(99,102,241,0.1)", overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#6366F1" }} />
          </Box>
        ) : applications.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Assignment sx={{ fontSize: 48, color: "#64748B", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#94A3B8", mb: 1 }}>No applications found</Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              {search ? "Try a different search term" : "No applications have been submitted yet"}
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Student</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Internship</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Company</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Status</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Applied Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app._id} sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.05)" } }}>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#F1F5F9" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ width: 34, height: 34, bgcolor: "#6366F1", fontSize: 13, fontWeight: 700 }}>
                            {app.student?.fullName?.charAt(0) || "?"}
                          </Avatar>
                          <Typography variant="body2" fontWeight={600}>{app.student?.fullName || "N/A"}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>
                        {app.internship?.title || "N/A"}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>
                        {app.internship?.company?.companyName || app.internship?.company?.fullName || "N/A"}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <Chip
                          label={app.status || "pending"}
                          size="small"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: 600,
                            bgcolor: `${statusColor[app.status] || statusColor.pending}26`,
                            color: statusColor[app.status] || statusColor.pending,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, val) => setPage(val)}
                  sx={{
                    "& .MuiPaginationItem-root": { color: "#94A3B8", "&.Mui-selected": { bgcolor: "#6366F1", color: "#fff" } },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </AdminLayout>
  );
}
