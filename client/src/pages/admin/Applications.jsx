import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress, FormControl, InputLabel, Select, MenuItem, Fade
} from "@mui/material";
import { Search, Assignment } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

const statusColor = {
  pending: "#F59E0B", accepted: "#22C55E", rejected: "#EF4444", reviewing: "#6366F1",
};

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

  useEffect(() => { fetchApplications(); }, [page, status]);
  useEffect(() => { setPage(1); }, [search, status]);

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>Applications</Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>Manage internship applications</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search applications..."
            value={search} onChange={(e) => setSearch(e.target.value)} size="small"
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: "#64748B" }} /></InputAdornment> } }}
            sx={{ minWidth: 260 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="reviewing">Reviewing</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress sx={{ color: "#6366F1" }} /></Box>
        ) : applications.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Assignment sx={{ fontSize: 64, color: "#64748B", mb: 2, opacity: 0.3 }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: "#94A3B8", mb: 1 }}>No applications found</Typography>
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
                    <TableCell>Student</TableCell>
                    <TableCell>Internship</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applied Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((app, idx) => (
                    <Fade in timeout={300 + idx * 50} key={app._id}>
                      <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 34, height: 34, bgcolor: "#6366F1", fontSize: 13, fontWeight: 700 }}>
                              {app.student?.fullName?.charAt(0) || "?"}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>{app.student?.fullName || "N/A"}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Typography variant="body2" color="#94A3B8">{app.internship?.title || "N/A"}</Typography></TableCell>
                        <TableCell><Typography variant="body2" color="#94A3B8">{app.internship?.company?.companyName || "N/A"}</Typography></TableCell>
                        <TableCell>
                          <Chip
                            label={app.status || "pending"} size="small"
                            sx={{
                              textTransform: "capitalize", fontWeight: 700,
                              bgcolor: `${statusColor[app.status] || statusColor.pending}22`,
                              color: statusColor[app.status] || statusColor.pending,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="#94A3B8">
                            {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" size="large" />
              </Box>
            )}
          </>
        )}
      </Paper>
    </AdminLayout>
  );
}
