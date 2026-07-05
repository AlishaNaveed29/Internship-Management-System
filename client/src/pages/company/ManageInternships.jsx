import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Button, Chip, IconButton, Pagination, Dialog, DialogTitle,
  DialogContent, DialogActions, Stack, Typography, Box
} from "@mui/material";
import { Add, Edit, Delete, Visibility, Work } from "@mui/icons-material";
import { toast } from "react-toastify";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

const ITEMS_PER_PAGE = 5;

export default function ManageInternships() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const fetchInternships = async () => {
    try {
      const res = await API.get("/internships/my");
      setInternships(res.data);
    } catch (err) {
      toast.error("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleDelete = async () => {
    try {
      await API.delete(`/internships/${deleteDialog.id}`);
      toast.success("Internship deleted");
      setDeleteDialog({ open: false, id: null });
      fetchInternships();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const totalPages = Math.ceil(internships.length / ITEMS_PER_PAGE);
  const paginatedInternships = internships.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <CompanyLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="#E2E8F0">
            Manage Internships
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/company/post-internship")}
            sx={{ bgcolor: "#6366F1", "&:hover": { bgcolor: "#5558E6" } }}
          >
            Post New
          </Button>
        </Box>

        {loading ? (
          <Typography color="#94A3B8">Loading internships...</Typography>
        ) : internships.length === 0 ? (
          <Paper sx={{ bgcolor: "#13182B", borderRadius: 3, p: 6, border: "1px solid #1E293B", textAlign: "center" }}>
            <Work sx={{ fontSize: 64, color: "#1E293B", mb: 2 }} />
            <Typography variant="h6" color="#94A3B8" mb={2}>No internships posted yet</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/company/post-internship")}
              sx={{ bgcolor: "#6366F1", "&:hover": { bgcolor: "#5558E6" } }}
            >
              Post Your First Internship
            </Button>
          </Paper>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ bgcolor: "#13182B", borderRadius: 3, border: "1px solid #1E293B" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Title</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Location</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Duration</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Status</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }}>Applicants</TableCell>
                    <TableCell sx={{ color: "#94A3B8", fontWeight: "bold", borderColor: "#1E293B" }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedInternships.map((internship) => (
                    <TableRow key={internship._id}>
                      <TableCell sx={{ color: "#E2E8F0", borderColor: "#1E293B" }}>
                        <Typography variant="body2" fontWeight="bold">{internship.title}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#94A3B8", borderColor: "#1E293B" }}>{internship.location}</TableCell>
                      <TableCell sx={{ color: "#94A3B8", borderColor: "#1E293B" }}>{internship.duration}</TableCell>
                      <TableCell sx={{ borderColor: "#1E293B" }}>
                        <Chip
                          label={internship.status || "Active"}
                          size="small"
                          sx={{
                            bgcolor: internship.status === "closed" ? "#EF4444" : "#10B981",
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#94A3B8", borderColor: "#1E293B" }}>
                        {internship.applicantsCount || internship.applicants?.length || 0}
                      </TableCell>
                      <TableCell sx={{ borderColor: "#1E293B" }} align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton size="small" sx={{ color: "#6366F1" }} onClick={() => navigate(`/company/applicants?internshipId=${internship._id}`)}>
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#F59E0B" }} onClick={() => navigate(`/company/edit-internship/${internship._id}`)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#EF4444" }} onClick={() => setDeleteDialog({ open: true, id: internship._id })}>
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
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, val) => setPage(val)}
                  sx={{
                    "& .MuiPaginationItem-root": { color: "#94A3B8", borderColor: "#1E293B" },
                    "& .Mui-selected": { bgcolor: "#6366F1 !important", color: "#fff" },
                  }}
                />
              </Box>
            )}
          </>
        )}

        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, id: null })}
          PaperProps={{ sx: { bgcolor: "#13182B", border: "1px solid #1E293B" } }}
        >
          <DialogTitle sx={{ color: "#E2E8F0" }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography color="#94A3B8">
              Are you sure you want to delete this internship? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, id: null })} sx={{ color: "#94A3B8" }}>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" sx={{ bgcolor: "#EF4444", "&:hover": { bgcolor: "#DC2626" } }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CompanyLayout>
  );
}
