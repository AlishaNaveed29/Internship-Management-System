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
  Button,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from "@mui/material";
import { Add, Edit, Delete, Visibility, Work } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CompanyLayout from "../../layouts/CompanyLayout";
import Loader from "../../components/common/Loader";
import API from "../../services/api";

function ManageInternships() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadInternships = async (p = 1) => {
    try {
      const res = await API.get(`/internships/my?page=${p}&limit=10`);
      setInternships(res.data.internships || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInternships(page);
  }, [page]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await API.delete(`/internships/${deleteId}`);
      toast.success("Internship deleted");
      setDeleteId(null);
      loadInternships();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <CompanyLayout><Loader /></CompanyLayout>;

  return (
    <CompanyLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Manage Internships</Typography>
          <Typography variant="body2" color="text.secondary">View and manage your posted internships</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/company/post-internship")}>
          Post New
        </Button>
      </Box>

      {internships.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", border: "1px solid #F1F5F9" }}>
          <Work sx={{ fontSize: 64, color: "#CBD5E1", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>No internships posted</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/company/post-internship")}>
            Post Your First Internship
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ border: "1px solid #F1F5F9", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Duration</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Applicants</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {internships.map((item) => (
                  <TableRow key={item._id} sx={{ "&:hover": { bgcolor: "#F8FAFC" } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{item.title}</Typography>
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
                      <Chip
                        label={item.applicantCount || 0}
                        size="small"
                        sx={{ bgcolor: "#F1F5F9", fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <IconButton size="small" sx={{ color: "#6366F1" }}><Visibility fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: "#F59E0B" }}><Edit fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: "#EF4444" }} onClick={() => setDeleteId(item._id)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
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

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Internship</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this internship? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </CompanyLayout>
  );
}

export default ManageInternships;
