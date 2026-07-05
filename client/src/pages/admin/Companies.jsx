import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress
} from "@mui/material";
import { Search, Business } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

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

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const industryColors = {
    Technology: "#6366F1",
    Healthcare: "#EC4899",
    Finance: "#F59E0B",
    Education: "#14B8A6",
    "Real Estate": "#8B5CF6",
    Retail: "#F97316",
    Manufacturing: "#06B6D4",
  };

  const getIndustryColor = (industry) => industryColors[industry] || "#64748B";

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#F1F5F9", mb: 1 }}>
            Companies
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>
            Manage registered companies
          </Typography>
        </Box>
        <TextField
          placeholder="Search companies..."
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
        ) : companies.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Business sx={{ fontSize: 48, color: "#64748B", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#94A3B8", mb: 1 }}>No companies found</Typography>
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
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Company</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Email</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Industry</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Location</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Verified</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company._id} sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.05)" } }}>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#F1F5F9" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ width: 34, height: 34, bgcolor: "#14B8A6", fontSize: 13, fontWeight: 700 }}>
                            {company.companyName?.charAt(0) || company.fullName?.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={600}>{company.companyName || company.fullName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>{company.email}</TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <Chip
                          label={company.industry || "N/A"}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor: `${getIndustryColor(company.industry)}26`,
                            color: getIndustryColor(company.industry),
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>
                        {company.location || "-"}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <Chip
                          label={company.isVerified ? "Verified" : "Pending"}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor: company.isVerified ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                            color: company.isVerified ? "#22C55E" : "#EF4444",
                          }}
                        />
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
