import { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

const durations = ["3 months", "6 months", "1 year"];
const types = ["Full-time", "Part-time", "Remote", "Hybrid"];

function PostInternship() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    type: "",
    stipend: "",
    skills: "",
    requirements: "",
    positions: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required");
      return;
    }
    setLoading(true);
    try {
      await API.post("/internships", form);
      toast.success("Internship posted successfully!");
      navigate("/company/manage-internships");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post internship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyLayout>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
        Post Internship
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Create a new internship opportunity
      </Typography>

      <Paper sx={{ p: 4, border: "1px solid #F1F5F9", maxWidth: 900 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Internship Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                helperText="Describe the internship role, responsibilities, and what the candidate will learn"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. New York, Remote"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
              >
                {durations.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                {types.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stipend / Salary"
                name="stipend"
                value={form.stipend}
                onChange={handleChange}
                placeholder="e.g. $2000/month"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Required Skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, Python"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Open Positions"
                name="positions"
                value={form.positions}
                onChange={handleChange}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requirements"
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="List the key requirements for this position"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => navigate("/company/manage-internships")}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : <Send />}
              disabled={loading}
              size="large"
            >
              {loading ? "Posting..." : "Post Internship"}
            </Button>
          </Box>
        </form>
      </Paper>
    </CompanyLayout>
  );
}

export default PostInternship;
