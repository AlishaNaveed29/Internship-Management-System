import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress, Fade
} from "@mui/material";
import { Search, Work } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

const statusColor = {
  active: "#22C55E", closed: "#EF4444", draft: "#F59E0B", filled: "#6366F1",
};

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

  useEffect(() => { fetchInternships(); }, [page]);
  useEffect(() => { setPage(1); }, [search]);

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>Internships</Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>Manage all internship listings</Typography>
        </Box>
        <TextField
          placeholder="Search internships..."
          value={search} onChange={(e) => setSearch(e.target.value)} size="small"
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: "#64748B" }} /></InputAdornment> } }}
          sx={{ minWidth: 280 }}
        />
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress sx={{ color: "#6366F1" }} /></Box>
        ) : internships.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Work sx={{ fontSize: 64, color: "#64748B", mb: 2, opacity: 0.3 }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: "#94A3B8", mb: 1 }}>No internships found</Typography>
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
                    <TableCell>Title</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Posted Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {internships.map((internship, idx) => (
                    <Fade in timeout={300 + idx * 50} key={internship._id}>
                      <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }}>
                        <TableCell><Typography variant="body2" fontWeight={600}>{internship.title}</Typography></TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 30, height: 30, bgcolor: "#14B8A6", fontSize: 11, fontWeight: 700 }}>
                              {(internship.company?.companyName || "C")?.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={500}>
                              {internship.company?.companyName || internship.company?.fullName || "N/A"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Typography variant="body2" color="#94A3B8">{internship.location || "-"}</Typography></TableCell>
                        <TableCell><Typography variant="body2" color="#94A3B8">{internship.duration || "-"}</Typography></TableCell>
                        <TableCell>
                          <Chip
                            label={internship.status || "active"} size="small"
                            sx={{
                              textTransform: "capitalize", fontWeight: 700,
                              bgcolor: `${statusColor[internship.status] || statusColor.active}22`,
                              color: statusColor[internship.status] || statusColor.active,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="#94A3B8">
                            {internship.createdAt ? new Date(internship.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-"}
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
