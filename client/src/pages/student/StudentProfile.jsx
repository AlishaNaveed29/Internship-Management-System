import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Avatar,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";
import Loader from "../../components/common/Loader";

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  const fetchProfile = async () => {
    try {
      const res = await API.get("/students/profile");
      setProfile(res.data.student);
      setForm({
        fullName: res.data.student.fullName || "",
        email: res.data.student.email || "",
        university: res.data.student.university || "",
        degree: res.data.student.degree || "",
        major: res.data.student.major || "",
        graduationYear: res.data.student.graduationYear || "",
        skills: res.data.student.skills || "",
        phone: res.data.student.phone || "",
        location: res.data.student.location || "",
        bio: res.data.student.bio || "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await API.put("/students/profile", form);
      setProfile(res.data.student);
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <StudentLayout><Loader /></StudentLayout>;

  return (
    <StudentLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>My Profile</Typography>
          <Typography variant="body2" color="text.secondary">Manage your personal information</Typography>
        </Box>
        <Button
          variant={editing ? "outlined" : "contained"}
          startIcon={editing ? <Cancel /> : <Edit />}
          onClick={() => editing ? setEditing(false) : setEditing(true)}
          color={editing ? "error" : "primary"}
        >
          {editing ? "Cancel" : "Edit Profile"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, textAlign: "center", border: "1px solid #F1F5F9" }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              {profile?.fullName?.charAt(0) || "S"}
            </Avatar>
            <Typography variant="h6" fontWeight={700}>{profile?.fullName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {profile?.email}
            </Typography>
            {profile?.skills?.split(",").map((s) => s.trim()).filter(Boolean).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{ m: 0.3, bgcolor: "rgba(99,102,241,0.1)", color: "#6366F1", fontWeight: 600 }}
              />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, border: "1px solid #F1F5F9" }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Personal Information</Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={form.fullName || ""}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="University"
                  value={form.university || ""}
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Degree"
                  value={form.degree || ""}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Major"
                  value={form.major || ""}
                  onChange={(e) => setForm({ ...form, major: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Graduation Year"
                  value={form.graduationYear || ""}
                  onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={form.location || ""}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  disabled={!editing}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills (comma separated)"
                  value={form.skills || ""}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  disabled={!editing}
                  size="small"
                  helperText="e.g. JavaScript, Python, React"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  value={form.bio || ""}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  disabled={!editing}
                  multiline
                  rows={3}
                  size="small"
                />
              </Grid>
            </Grid>

            {editing && (
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
                <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                  Save Changes
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </StudentLayout>
  );
}

export default StudentProfile;
