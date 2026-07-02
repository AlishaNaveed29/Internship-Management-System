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
  IconButton,
} from "@mui/material";
import { Visibility, Assignment } from "@mui/icons-material";
import StudentLayout from "../../layouts/StudentLayout";
import Loader from "../../components/common/Loader";
import API from "../../services/api";

const statusColors = {
  pending: { bg: "#FEF3C7", color: "#D97706", label: "Pending" },
  reviewed: { bg: "#DBEAFE", color: "#2563EB", label: "Reviewed" },
  accepted: { bg: "#D1FAE5", color: "#059669", label: "Accepted" },
  rejected: { bg: "#FEE2E2", color: "#DC2626", label: "Rejected" },
};

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/my");
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

  if (loading) return <StudentLayout><Loader /></StudentLayout>;

  return (
    <StudentLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>My Applications</Typography>
          <Typography variant="body2" color="text.secondary">Track your internship applications</Typography>
        </Box>
        <Chip
          icon={<Assignment />}
          label={`${applications.length} Total`}
          sx={{ bgcolor: "rgba(99,102,241,0.1)", color: "#6366F1", fontWeight: 600 }}
        />
      </Box>

      {applications.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", border: "1px solid #F1F5F9" }}>
          <Assignment sx={{ fontSize: 64, color: "#CBD5E1", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No applications yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start browsing internships and apply to your favorites
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ border: "1px solid #F1F5F9", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Internship</b></TableCell>
                  <TableCell><b>Company</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Applied Date</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id} sx={{ "&:hover": { bgcolor: "#F8FAFC" } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {app.internship?.title || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#6366F1", fontSize: 12, fontWeight: 700 }}>
                          {app.internship?.company?.companyName?.charAt(0) || "C"}
                        </Avatar>
                        <Typography variant="body2">
                          {app.internship?.company?.companyName || "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusColors[app.status]?.label || app.status}
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
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: "#6366F1" }}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </StudentLayout>
  );
}

export default MyApplications;
