import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress, Fade
} from "@mui/material";
import { Search, Business } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

const industryColors = {
  Technology: "#6366F1", Healthcare: "#EC4899", Finance: "#F59E0B",
  Education: "#14B8A6", "Real Estate": "#8B5CF6", Retail: "#F97316",
  Manufacturing: "#06B6D4",
};

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCompanies = () => {
    setLoading(true);
    API.get("/admin/companies", { params: { search, page, limit: 10 } })
      .then(({ data }) => {
        setCompanies(data.companies || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCompanies(); }, [page]);
  useEffect(() => { setPage(1); }, [search]);

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>Companies</Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>Manage registered companies</Typography>
        </Box>
        <TextField
          placeholder="Search companies..."
          value={search} onChange={(e) => setSearch(e.target.value)} size="small"
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: "#64748B" }} /></InputAdornment> } }}
          sx={{ minWidth: 280 }}
        />
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress sx={{ color: "#6366F1" }} /></Box>
        ) : companies.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Business sx={{ fontSize: 64, color: "#64748B", mb: 2, opacity: 0.3 }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: "#94A3B8", mb: 1 }}>No companies found</Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              {search ? "Try a different search term" : "No companies have registered yet"}
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Industry</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Verified</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company, idx) => (
                    <Fade in timeout={300 + idx * 50} key={company._id}>
                      <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 34, height: 34, bgcolor: "#14B8A6", fontSize: 13, fontWeight: 700 }}>
                              {company.companyName?.charAt(0) || company.fullName?.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>{company.companyName || company.fullName}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Typography variant="body2" color="#94A3B8">{company.email}</Typography></TableCell>
                        <TableCell>
                          <Chip
                            label={company.industry || "N/A"} size="small"
                            sx={{ fontWeight: 700, bgcolor: `${(industryColors[company.industry] || "#64748B")}22`, color: industryColors[company.industry] || "#64748B" }}
                          />
                        </TableCell>
                        <TableCell><Typography variant="body2" color="#94A3B8">{company.location || "-"}</Typography></TableCell>
                        <TableCell>
                          <Chip
                            label={company.isVerified ? "Verified" : "Pending"} size="small"
                            sx={{
                              fontWeight: 700,
                              bgcolor: company.isVerified ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                              color: company.isVerified ? "#22C55E" : "#EF4444",
                            }}
                          />
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
