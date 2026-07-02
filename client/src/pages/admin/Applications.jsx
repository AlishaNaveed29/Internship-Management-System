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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Search, Assignment } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";
import API from "../../services/api";

const statusColors = {
  pending: { bg: "#FEF3C7", color: "#D97706" },
  reviewed: { bg: "#DBEAFE", color: "#2563EB" },
  accepted: { bg: "#D1FAE5", color: "#059669" },
  rejected: { bg: "#FEE2E2", color: "#DC2626" },
};

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.student?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.internship?.title?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Applications</Typography>
          <Typography variant="body2" color="text.secondary">View all applications across the platform</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
            }}
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="reviewed">Reviewed</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", border: "1px solid #F1F5F9" }}>
          <Assignment sx={{ fontSize: 64, color: "#CBD5E1", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No applications found</Typography>
        </Paper>
      ) : (
        <Paper sx={{ border: "1px solid #F1F5F9", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Student</b></TableCell>
                  <TableCell><b>Internship</b></TableCell>
                  <TableCell><b>Company</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Applied</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((app) => (
                  <TableRow key={app._id} sx={{ "&:hover": { bgcolor: "#F8FAFC" } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#6366F1", fontSize: 13, fontWeight: 700 }}>
                          {app.student?.fullName?.charAt(0) || "S"}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600}>{app.student?.fullName || "N/A"}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>{app.internship?.title || "N/A"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {app.internship?.company?.companyName || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={app.status}
                        size="small"
                        sx={{
                          bgcolor: statusColors[app.status]?.bg || "#F1F5F9",
                          color: statusColors[app.status]?.color || "#475569",
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
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

export default AdminApplications;
