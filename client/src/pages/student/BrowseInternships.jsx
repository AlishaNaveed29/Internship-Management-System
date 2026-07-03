import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Skeleton,
  Avatar,
  AvatarGroup,
  Fade,
  Grow,
  Pagination,
} from "@mui/material";
import {
  Search,
  LocationOn,
  AccessTime,
  Work,
  Paid,
  TrendingUp,
  School,
  FilterList,
  Clear,
  Bolt,
  BusinessCenter,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";

const locations = ["All", "Remote", "New York", "San Francisco", "Austin", "Seattle", "Chicago", "Boston"];
const durations = ["All", "3 months", "6 months", "1 year"];

const typeColors = {
  "Full-time": { bg: "rgba(16,185,129,0.1)", color: "#059669" },
  "Part-time": { bg: "rgba(245,158,11,0.1)", color: "#D97706" },
  "Remote": { bg: "rgba(99,102,241,0.1)", color: "#4F46E5" },
  "Hybrid": { bg: "rgba(139,92,246,0.1)", color: "#7C3AED" },
};
const defaultTypeColor = { bg: "rgba(99,102,241,0.1)", color: "#4F46E5" };

function BrowseInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [duration, setDuration] = useState("All");
  const [applying, setApplying] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadInternships = async (p = 1) => {
    try {
      const res = await API.get(`/internships?page=${p}&limit=9`);
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

  const apply = async (id) => {
    setApplying(id);
    try {
      await API.post(`/applications/${id}/apply`);
      toast.success("Application submitted successfully!");
      loadInternships();
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
    } finally {
      setApplying(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setPage(1);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setLocation("All");
    setDuration("All");
    setPage(1);
  };

  const filtered = internships.filter((item) => {
    const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.company?.companyName?.toLowerCase().includes(search.toLowerCase());
    const matchLocation = location === "All" || item.location === location;
    const matchDuration = duration === "All" || item.duration === duration;
    return matchSearch && matchLocation && matchDuration;
  });

  return (
    <StudentLayout>
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            position: "relative",
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -40,
              left: "30%",
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h4" fontWeight={800} color="#fff" sx={{ mb: 1 }}>
              Find Your Dream Internship
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.85)", mb: 3, maxWidth: 600 }}>
              Browse hundreds of internship opportunities from top companies
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                <Chip icon={<BusinessCenter />} label={`${totalPages > 0 ? `${(page - 1) * 9 + 1}-${Math.min(page * 9, totalPages * 9)}` : "0"} Opportunities`} sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, "& .MuiChip-icon": { color: "rgba(255,255,255,0.8)" } }} />
              <Chip icon={<Bolt />} label="Top Companies" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, "& .MuiChip-icon": { color: "rgba(255,255,255,0.8)" } }} />
              <Chip icon={<School />} label="Quick Apply" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, "& .MuiChip-icon": { color: "rgba(255,255,255,0.8)" } }} />
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "#fff",
            border: "1px solid #F1F5F9",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            mb: 4,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search internships, companies..."
                value={search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><Search sx={{ color: "#94A3B8" }} /></InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "#F8FAFC" } }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Location</InputLabel>
                <Select
                  value={location}
                  label="Location"
                  onChange={handleLocationChange}
                  sx={{ bgcolor: "#F8FAFC" }}
                >
                  {locations.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Duration</InputLabel>
                <Select
                  value={duration}
                  label="Duration"
                  onChange={handleDurationChange}
                  sx={{ bgcolor: "#F8FAFC" }}
                >
                  {durations.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Clear />}
                onClick={handleClear}
                sx={{ py: 1 }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} md={6} lg={4} key={i}>
                <Card sx={{ border: "1px solid #F1F5F9" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="circular" width={44} height={44} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={60} height={24} />
                    </Box>
                    <Skeleton variant="rounded" width="100%" height={40} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filtered.length === 0 ? (
          <Fade in>
            <Box
              sx={{
                textAlign: "center",
                py: 10,
                px: 3,
                borderRadius: 4,
                bgcolor: "#fff",
                border: "1px solid #F1F5F9",
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  bgcolor: "rgba(99,102,241,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Search sx={{ fontSize: 44, color: "#6366F1" }} />
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                No internships found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: "auto" }}>
                We couldn't find any internships matching your criteria. Try adjusting your search filters.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Clear />}
                onClick={handleClear}
              >
                Reset Filters
              </Button>
            </Box>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((item, index) => (
              <Grow in key={item._id} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 300 + index * 80 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #F1F5F9",
                      position: "relative",
                      overflow: "visible",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 6px 12px rgba(0,0,0,0.06)",
                        borderColor: "rgba(99,102,241,0.2)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: -1,
                        left: 24,
                        right: 24,
                        height: 3,
                        background: "linear-gradient(90deg, #6366F1, #A78BFA, #6366F1)",
                        borderRadius: "0 0 3px 3px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        ".MuiCard-root:hover &": { opacity: 1 },
                      }}
                    />
                    <CardContent sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column" }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 46,
                              height: 46,
                              bgcolor: "rgba(99,102,241,0.1)",
                              color: "#6366F1",
                              fontWeight: 700,
                              fontSize: 18,
                              borderRadius: 2,
                            }}
                          >
                            {item.company?.companyName?.charAt(0) || "C"}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                              {item.company?.companyName || "Company"}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.company?.industry || "Technology"}
                            </Typography>
                          </Box>
                        </Box>
                        {item.type && (
                          <Chip
                            label={item.type}
                            size="small"
                            sx={{
                              fontSize: 11,
                              fontWeight: 600,
                              bgcolor: (typeColors[item.type] || defaultTypeColor).bg,
                              color: (typeColors[item.type] || defaultTypeColor).color,
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 2, fontSize: "1.05rem", lineHeight: 1.3 }}
                      >
                        {item.title}
                      </Typography>

                      <Stack spacing={1.2} sx={{ mb: 2.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box sx={{ width: 20, display: "flex", justifyContent: "center" }}>
                            <LocationOn sx={{ fontSize: 18, color: "#94A3B8" }} />
                          </Box>
                          <Typography variant="body2" color="text.secondary">{item.location || "Remote"}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box sx={{ width: 20, display: "flex", justifyContent: "center" }}>
                            <AccessTime sx={{ fontSize: 18, color: "#94A3B8" }} />
                          </Box>
                          <Typography variant="body2" color="text.secondary">{item.duration || "6 months"}</Typography>
                        </Box>
                        {item.stipend && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 20, display: "flex", justifyContent: "center" }}>
                              <Paid sx={{ fontSize: 18, color: "#94A3B8" }} />
                            </Box>
                            <Typography variant="body2" fontWeight={600} sx={{ color: "#059669" }}>
                              {item.stipend}
                            </Typography>
                          </Box>
                        )}
                        {item.positions && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 20, display: "flex", justifyContent: "center" }}>
                              <Work sx={{ fontSize: 18, color: "#94A3B8" }} />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {item.positions} position{item.positions > 1 ? "s" : ""} available
                            </Typography>
                          </Box>
                        )}
                      </Stack>

                      <Box sx={{ mt: "auto" }}>
                        {item.skills?.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3).map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              m: 0.2,
                              bgcolor: "rgba(99,102,241,0.06)",
                              color: "#4F46E5",
                              fontSize: 11,
                              fontWeight: 500,
                            }}
                          />
                        ))}
                        {item.skills?.split(",").filter(Boolean).length > 3 && (
                          <Chip
                            label={`+${item.skills.split(",").filter(Boolean).length - 3}`}
                            size="small"
                            sx={{ m: 0.2, bgcolor: "#F1F5F9", color: "#64748B", fontSize: 11 }}
                          />
                        )}
                      </Box>
                    </CardContent>

                    <Box sx={{ px: 3, pb: 3 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => apply(item._id)}
                        disabled={applying === item._id}
                        sx={{
                          py: 1.3,
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                            transition: "left 0.5s ease",
                          },
                          "&:hover::before": {
                            left: "100%",
                          },
                        }}
                      >
                        {applying === item._id ? "Applying..." : "Apply Now"}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grow>
            ))}
          </Grid>
        )}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="secondary" size="large" />
          </Box>
        )}
      </Box>
    </StudentLayout>
  );
}

export default BrowseInternships;
