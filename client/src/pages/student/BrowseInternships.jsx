import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid, Card, CardContent, Typography, Button, Box, Chip, TextField, Paper,
  InputAdornment, MenuItem, FormControl, InputLabel, Select, Stack,
  Skeleton, Avatar, Pagination, Fade
} from "@mui/material";
import { Search, LocationOn, AccessTime, Paid, Work, Business } from "@mui/icons-material";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";
import { toast } from "react-toastify";

const typeOptions = ["Full-time", "Part-time", "Remote", "Hybrid", "On-site"];
const durationOptions = ["1 month", "2 months", "3 months", "6 months"];

const cardGradients = [
  "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)",
  "linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(45,212,191,0.04) 100%)",
  "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(249,115,22,0.04) 100%)",
  "linear-gradient(135deg, rgba(236,72,153,0.08) 0%, rgba(244,114,182,0.04) 100%)",
];

export default function BrowseInternships() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [applying, setApplying] = useState(null);
  const [filters, setFilters] = useState({
    search: "", location: "", type: "", duration: "",
  });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.location) params.append("location", filters.location);
    if (filters.type) params.append("type", filters.type);
    if (filters.duration) params.append("duration", filters.duration);
    params.append("page", page);
    params.append("limit", "8");

    API.get(`/internships?${params.toString()}`)
      .then((res) => {
        const data = res.data;
        setInternships(data.internships || data.data || data);
        setTotalPages(data.totalPages || data.pages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filters, page]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handleApply = async (id) => {
    setApplying(id);
    try {
      await API.post(`/applications/${id}/apply`);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(null);
    }
  };

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Skeleton variant="circular" width={48} height={48} sx={{ mb: 1.5 }} />
            <Skeleton variant="text" width="80%" sx={{ mb: 0.5, fontSize: "1rem" }} />
            <Skeleton variant="text" width="60%" sx={{ mb: 1.5 }} />
            <Stack spacing={0.5} sx={{ mb: 1.5 }}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="35%" />
              <Skeleton variant="text" width="30%" />
            </Stack>
            <Box sx={{ display: "flex", gap: 0.5, mb: 1.5 }}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={60} height={24} />
            </Box>
            <Skeleton variant="rounded" width="100%" height={40} />
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <StudentLayout>
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
            Browse Internships
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Find the perfect internship opportunity for you
          </Typography>
        </Box>

        <Paper sx={{ p: 2.5, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                placeholder="Search internships..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment>,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  label="Type"
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {typeOptions.map((t) => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={filters.duration}
                  label="Duration"
                  onChange={(e) => handleFilterChange("duration", e.target.value)}
                >
                  <MenuItem value="">All Durations</MenuItem>
                  {durationOptions.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Grid container spacing={3}>{renderSkeletons()}</Grid>
        ) : internships.length === 0 ? (
          <Fade in>
            <Paper sx={{ p: 6, textAlign: "center", borderRadius: 4 }}>
              <Work sx={{ fontSize: 72, color: "text.secondary", mb: 2, opacity: 0.3 }} />
              <Typography variant="h5" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
                No internships found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: "auto" }}>
                {filters.search || filters.location || filters.type || filters.duration
                  ? "Try adjusting your search filters to find more opportunities"
                  : "No internships are currently available. Check back later!"}
              </Typography>
              {(filters.search || filters.location || filters.type || filters.duration) && (
                <Button
                  variant="outlined"
                  onClick={() => setFilters({ search: "", location: "", type: "", duration: "" })}
                >
                  Clear Filters
                </Button>
              )}
            </Paper>
          </Fade>
        ) : (
          <>
            <Grid container spacing={3}>
              {internships.map((internship, idx) => (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={internship._id}>
                  <Fade in timeout={300 + idx * 100}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        background: cardGradients[idx % cardGradients.length],
                        backdropFilter: "blur(8px)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 40px rgba(99,102,241,0.15)",
                          borderColor: "rgba(99,102,241,0.3)",
                        },
                      }}
                    >
                      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                          <Avatar sx={{ width: 44, height: 44, bgcolor: "primary.main", fontSize: 16, fontWeight: 700 }}>
                            {internship.company?.companyName?.charAt(0) || "C"}
                          </Avatar>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ fontSize: "0.95rem", lineHeight: 1.3, mb: 0.25 }}>
                              {internship.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Business sx={{ fontSize: 12 }} />
                              {internship.company?.companyName || "Company"}
                            </Typography>
                          </Box>
                        </Box>

                        <Stack spacing={1} sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocationOn sx={{ fontSize: 15, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">{internship.location}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AccessTime sx={{ fontSize: 15, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">{internship.duration}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Paid sx={{ fontSize: 15, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">
                              {internship.stipend ? `$${internship.stipend}` : "Unpaid"}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ mb: 1.5 }}>
                          <Chip
                            label={internship.type}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                          />
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                          {(typeof internship.skills === "string" ? internship.skills.split(",").map((s) => s.trim()) : internship.skills || []).slice(0, 3).map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                              sx={{ color: "#94A3B8", borderColor: "rgba(99,102,241,0.2)", fontSize: "0.65rem" }}
                            />
                          ))}
                        </Box>

                        <Box sx={{ mt: "auto" }}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => handleApply(internship._id)}
                            disabled={applying === internship._id}
                            sx={{
                              borderRadius: 2,
                              py: 1,
                              fontWeight: 700,
                              background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                              "&:hover": {
                                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                              },
                            }}
                          >
                            {applying === internship._id ? "Applying..." : "Apply Now"}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, val) => setPage(val)}
                  color="primary"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": { fontWeight: 600 },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </StudentLayout>
  );
}
