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
} from "@mui/material";
import { Search, Work } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";
import API from "../../services/api";

function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchInternships = async () => {
    try {
      const res = await API.get("/admin/internships");
      setInternships(res.data.internships || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const filtered = internships.filter((i) =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.company?.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Internships</Typography>
          <Typography variant="body2" color="text.secondary">View all internships on the platform</Typography>
        </Box>
        <TextField
          size="small"
          placeholder="Search internships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {filtered.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", border: "1px solid #F1F5F9" }}>
          <Work sx={{ fontSize: 64, color: "#CBD5E1", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No internships found</Typography>
        </Paper>
      ) : (
        <Paper sx={{ border: "1px solid #F1F5F9", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Company</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Duration</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Posted</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item._id} sx={{ "&:hover": { bgcolor: "#F8FAFC" } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{item.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: "#6366F1", fontSize: 11, fontWeight: 700 }}>
                          {item.company?.companyName?.charAt(0) || "C"}
                        </Avatar>
                        <Typography variant="body2">{item.company?.companyName || "N/A"}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{item.location || "Remote"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{item.duration || "N/A"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status || "Active"}
                        size="small"
                        sx={{
                          bgcolor: item.status === "closed" ? "#FEE2E2" : "#D1FAE5",
                          color: item.status === "closed" ? "#DC2626" : "#059669",
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </AdminLayout>
  );
}

export default AdminInternships;
