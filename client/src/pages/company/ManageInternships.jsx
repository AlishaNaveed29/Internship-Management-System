import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Button, Chip, IconButton, Pagination, Dialog, DialogTitle,
  DialogContent, DialogActions, Stack, Typography, Box, Fade, Skeleton
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
      setInternships(res.data.internships || []);
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
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
              Manage Internships
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create and manage your internship listings
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/company/post-internship")}
            sx={{
              background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
              boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(99,102,241,0.4)",
              },
            }}
          >
            Post New Internship
          </Button>
        </Box>

        {loading ? (
          <Paper sx={{ borderRadius: 3, p: 3 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5, borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
                <Box sx={{ flex: 2 }}><Skeleton variant="text" width="80%" /></Box>
                <Box sx={{ flex: 1 }}><Skeleton variant="text" width="60%" /></Box>
                <Box sx={{ flex: 1 }}><Skeleton variant="text" width="50%" /></Box>
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={30} height={30} />
              </Box>
            ))}
          </Paper>
        ) : internships.length === 0 ? (
          <Paper sx={{ textAlign: "center", py: 8, borderRadius: 3 }}>
            <Work sx={{ fontSize: 72, color: "text.secondary", mb: 2, opacity: 0.3 }} />
            <Typography variant="h5" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
              No internships posted yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Post your first internship opportunity to attract candidates
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/company/post-internship")}
              sx={{
                background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 25px rgba(99,102,241,0.35)" },
              }}
            >
              Post Your First Internship
            </Button>
          </Paper>
        ) : (
          <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applicants</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedInternships.map((internship, idx) => (
                    <Fade in timeout={300 + idx * 75} key={internship._id}>
                      <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>{internship.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">{internship.location}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">{internship.duration}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={internship.status || "active"}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              textTransform: "capitalize",
                              bgcolor: internship.status === "closed" ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
                              color: internship.status === "closed" ? "#EF4444" : "#10B981",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            {internship.applicantCount || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <IconButton
                              size="small"
                              sx={{ color: "#6366F1", "&:hover": { bgcolor: "rgba(99,102,241,0.1)" } }}
                              onClick={() => navigate(`/company/applicants?internshipId=${internship._id}`)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ color: "#F59E0B", "&:hover": { bgcolor: "rgba(245,158,11,0.1)" } }}
                              onClick={() => navigate(`/company/edit-internship/${internship._id}`)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ color: "#EF4444", "&:hover": { bgcolor: "rgba(239,68,68,0.1)" } }}
                              onClick={() => setDeleteDialog({ open: true, id: internship._id })}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" p={2.5}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, val) => setPage(val)}
                  color="primary"
                  size="large"
                  sx={{ "& .MuiPaginationItem-root": { fontWeight: 600 } }}
                />
              </Box>
            )}
          </Paper>
        )}

        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, id: null })}
          PaperProps={{
            sx: {
              bgcolor: "#13182B",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 3,
              maxWidth: 400,
            },
          }}
        >
          <DialogTitle sx={{ color: "#E2E8F0", fontWeight: 700 }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography color="#94A3B8">
              Are you sure you want to delete this internship? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button
              onClick={() => setDeleteDialog({ open: false, id: null })}
              sx={{ color: "#94A3B8", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{
                bgcolor: "#EF4444",
                fontWeight: 700,
                "&:hover": { bgcolor: "#DC2626" },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CompanyLayout>
  );
}
