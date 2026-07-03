import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Avatar,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import { Search, Business } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";
import API from "../../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCompanies = async (p = 1) => {
    try {
      const res = await API.get(`/admin/companies?page=${p}&limit=10`);
      setCompanies(res.data.companies || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(page);
  }, [page]);

  const filtered = companies.filter((c) =>
    c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Companies</Typography>
          <Typography variant="body2" color="text.secondary">Manage registered companies</Typography>
        </Box>
          <TextField
            size="small"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {filtered.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", border: "1px solid #F1F5F9" }}>
          <Business sx={{ fontSize: 64, color: "#CBD5E1", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No companies found</Typography>
        </Paper>
      ) : (
        <Paper sx={{ border: "1px solid #F1F5F9", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Company</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Industry</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c._id} sx={{ "&:hover": { bgcolor: "#F8FAFC" } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#10B981", fontSize: 13, fontWeight: 700 }}>
                          {c.companyName?.charAt(0) || "C"}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600}>{c.companyName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{c.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={c.industry || "N/A"} size="small" sx={{ bgcolor: "#F1F5F9" }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{c.location || "N/A"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Verified" size="small" color="success" variant="outlined" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="secondary" />
            </Box>
          )}
        </Paper>
      )}
    </AdminLayout>
  );
}

export default Companies;
