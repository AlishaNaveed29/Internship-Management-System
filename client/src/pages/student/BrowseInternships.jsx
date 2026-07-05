import { useState, useEffect } from "react";
import {
  Grid, Card, CardContent, Typography, Button, Box, Chip, TextField,
  InputAdornment, MenuItem, FormControl, InputLabel, Select, Stack,
  Skeleton, Avatar, Pagination
} from "@mui/material";
import { Search, LocationOn, AccessTime, Work, Paid } from "@mui/icons-material";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";
import { toast } from "react-toastify";

const typeOptions = ["Full-time", "Part-time", "Remote", "Hybrid", "On-site"];
const durationOptions = ["1 month", "2 months", "3 months", "6 months"];

export default function BrowseInternships() {
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
      <Grid item xs={12} sm={6} lg={3} key={i}>
        <Card>
          <CardContent>
            <Skeleton variant="circular" width={48} height={48} sx={{ mb: 1.5 }} />
            <Skeleton variant="text" width="80%" sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
            <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
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
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          Browse Internships
        </Typography>

        <Paper sx={{ p: 2.5, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Search internships..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><Search /></InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><LocationOn /></InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Work sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No internships found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search filters
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {internships.map((internship) => (
                <Grid item xs={12} sm={6} lg={3} key={internship._id}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3 }}>
                      <Avatar
                        src={internship.company?.logo || internship.companyLogo}
                        sx={{ width: 48, height: 48, mb: 1.5, bgcolor: "#6366F1" }}
                      >
                        {internship.company?.name?.charAt(0) || internship.companyName?.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, fontSize: "1rem" }}>
                        {internship.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {internship.company?.name || internship.companyName}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {internship.location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {internship.duration}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                        <Paid sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {internship.stipend ? `$${internship.stipend}` : "Unpaid"}
                        </Typography>
                      </Stack>
                      <Box sx={{ mb: 1.5 }}>
                        <Chip label={internship.type} size="small" color="primary" variant="outlined" sx={{ mr: 0.5 }} />
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                        {(internship.skills || internship.requiredSkills || []).slice(0, 3).map((skill) => (
                          <Chip key={skill} label={skill} size="small" variant="outlined"
                            sx={{ color: "#94A3B8", borderColor: "rgba(99,102,241,0.2)" }}
                          />
                        ))}
                      </Box>
                      <Box sx={{ mt: "auto" }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleApply(internship._id)}
                          disabled={applying === internship._id}
                        >
                          {applying === internship._id ? "Applying..." : "Apply Now"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
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
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </StudentLayout>
  );
}
