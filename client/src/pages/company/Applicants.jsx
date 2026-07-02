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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { People } from "@mui/icons-material";
import { toast } from "react-toastify";
import CompanyLayout from "../../layouts/CompanyLayout";
import Loader from "../../components/common/Loader";
import API from "../../services/api";

const statusColors = {
  pending: { bg: "#FEF3C7", color: "#D97706" },
  reviewed: { bg: "#DBEAFE", color: "#2563EB" },
  accepted: { bg: "#D1FAE5", color: "#059669" },
  rejected: { bg: "#FEE2E2", color: "#DC2626" },
};

function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchApplicants = async () => {
    try {
      const res = await API.get("/applications/company");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/${id}/status`, { status });
      toast.success(`Application ${status}`);
      fetchApplicants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);

  if (loading) return <CompanyLayout><Loader /></CompanyLayout>;

  return (
    <CompanyLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Applicants</Typography>
          <Typography variant="body2" color="text.secondary">Review and manage applications</Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter Status</InputLabel>
          <Select value={filter} label="Filter Status" onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="reviewed">Reviewed</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filtered.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", border: "1px solid #F1F5F9" }}>
          <People sx={{ fontSize: 64, color: "#CBD5E1", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No applicants found</Typography>
        </Paper>
      ) : (
        <Paper sx={{ border: "1px solid #F1F5F9", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Student</b></TableCell>
                  <TableCell><b>Internship</b></TableCell>
                  <TableCell><b>Applied Date</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
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
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{app.student?.fullName || "N/A"}</Typography>
                          <Typography variant="caption" color="text.secondary">{app.student?.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>{app.internship?.title || "N/A"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
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
                    <TableCell align="right">
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={app.status}
                          onChange={(e) => updateStatus(app._id, e.target.value)}
                          sx={{ fontSize: 13 }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="reviewed">Reviewed</MenuItem>
                          <MenuItem value="accepted">Accept</MenuItem>
                          <MenuItem value="rejected">Reject</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </CompanyLayout>
  );
}

export default Applicants;
