import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress
} from "@mui/material";
import { Search, Work } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

export default function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInternships = () => {
    setLoading(true);
    API.get("/admin/internships", { params: { search, page, limit: 10 } })
      .then(({ data }) => {
        setInternships(data.internships || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInternships();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const statusColor = {
    active: "#22C55E",
    closed: "#EF4444",
    draft: "#F59E0B",
    filled: "#6366F1",
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#F1F5F9", mb: 1 }}>
            Internships
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>
            Manage all internship listings
          </Typography>
        </Box>
        <TextField
          placeholder="Search internships..."
          value={search}
          onChange={handleSearch}
          size="small"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search sx={{ color: "#64748B" }} /></InputAdornment>,
            },
          }}
          sx={{
            minWidth: 280,
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
      </Box>

      <Paper sx={{ borderRadius: 4, bgcolor: "#13182B", border: "1px solid rgba(99,102,241,0.1)", overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#6366F1" }} />
          </Box>
        ) : internships.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Work sx={{ fontSize: 48, color: "#64748B", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#94A3B8", mb: 1 }}>No internships found</Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              {search ? "Try a different search term" : "No internships have been posted yet"}
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Title</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Company</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Location</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Duration</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Status</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Posted Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {internships.map((internship) => (
                    <TableRow key={internship._id} sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.05)" } }}>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#F1F5F9" }}>
                        <Typography variant="body2" fontWeight={600}>{internship.title}</Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#F1F5F9" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ width: 30, height: 30, bgcolor: "#14B8A6", fontSize: 11, fontWeight: 700 }}>
                            {(internship.company?.companyName || internship.company?.fullName || "C")?.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {internship.company?.companyName || internship.company?.fullName || "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>{internship.location || "-"}</TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>{internship.duration || "-"}</TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <Chip
                          label={internship.status || "active"}
                          size="small"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: 600,
                            bgcolor: `${statusColor[internship.status] || statusColor.active}26`,
                            color: statusColor[internship.status] || statusColor.active,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>
                        {internship.createdAt ? new Date(internship.createdAt).toLocaleDateString() : "-"}
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
