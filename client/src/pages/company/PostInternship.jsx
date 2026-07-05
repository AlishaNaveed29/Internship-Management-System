import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Grid, Box, Button, TextField, MenuItem, CircularProgress } from "@mui/material";
import { Send } from "@mui/icons-material";
import { toast } from "react-toastify";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

export default function PostInternship() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    type: "",
    stipend: "",
    skills: "",
    positions: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        positions: Number(form.positions),
        stipend: Number(form.stipend),
      };
      await API.post("/internships", payload);
      toast.success("Internship posted successfully");
      navigate("/company/manage-internships");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post internship");
    } finally {
      setLoading(false);
    }
  };

  const durations = ["3 months", "6 months", "1 year"];
  const types = ["Full-time", "Part-time", "Remote", "Hybrid"];

  return (
    <CompanyLayout>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#E2E8F0">
          Post Internship
        </Typography>

        <Paper sx={{ bgcolor: "#13182B", borderRadius: 3, p: 4, border: "1px solid #1E293B" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  name="duration"
                  label="Duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" }, "& .MuiSelect-icon": { color: "#94A3B8" } }}
                >
                  {durations.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  name="type"
                  label="Type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" }, "& .MuiSelect-icon": { color: "#94A3B8" } }}
                >
                  {types.map((t) => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="stipend"
                  label="Stipend"
                  type="number"
                  value={form.stipend}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="skills"
                  label="Skills (comma-separated)"
                  value={form.skills}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="positions"
                  label="Positions"
                  type="number"
                  value={form.positions}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="requirements"
                  label="Requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { color: "#E2E8F0", "& fieldset": { borderColor: "#1E293B" }, "&:hover fieldset": { borderColor: "#6366F1" }, "&.Mui-focused fieldset": { borderColor: "#6366F1" } }, "& .MuiInputLabel-root": { color: "#94A3B8" } }}
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                disabled={loading}
                sx={{ bgcolor: "#6366F1", "&:hover": { bgcolor: "#5558E6" }, px: 4, py: 1.5 }}
              >
                {loading ? "Posting..." : "Post Internship"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </CompanyLayout>
  );
}
