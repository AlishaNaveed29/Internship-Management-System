import { useState, useEffect } from "react";
import {
  Paper, Typography, Grid, Box, Avatar, Button, Chip, TextField
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import StudentLayout from "../../layouts/StudentLayout";
import API from "../../services/api";
import { toast } from "react-toastify";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    API.get("/students/profile")
      .then((res) => {
        const data = res.data.student || res.data;
        setProfile(data);
        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
          university: data.university || "",
          degree: data.degree || "",
          major: data.major || "",
          graduationYear: data.graduationYear || "",
          skills: data.skills || [],
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || "",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (e) => {
    const val = e.target.value;
    handleChange("skills", val.split(",").map((s) => s.trim()).filter(Boolean));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await API.put("/students/profile", form);
      setProfile(res.data.student || res.data);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      fullName: profile.fullName || "",
      email: profile.email || "",
      university: profile.university || "",
      degree: profile.degree || "",
      major: profile.major || "",
      graduationYear: profile.graduationYear || "",
      skills: profile.skills || [],
      phone: profile.phone || "",
      location: profile.location || "",
      bio: profile.bio || "",
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <StudentLayout>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="text.secondary">Loading profile...</Typography>
        </Box>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <Box sx={{ p: { xs: 0, md: 2 } }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          My Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Avatar
                src={profile?.avatar}
                sx={{
                  width: 120, height: 120, mx: "auto", mb: 2,
                  bgcolor: "#6366F1", fontSize: 40, fontWeight: 700,
                }}
              >
                {profile?.fullName?.charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                {profile?.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {profile?.email}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, justifyContent: "center" }}>
                {(profile?.skills || []).map((skill) => (
                  <Chip key={skill} label={skill} size="small" color="primary" variant="outlined" />
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  {editing ? "Edit Profile" : "Profile Details"}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {editing ? (
                    <>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={form.fullName || ""}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="University"
                    value={form.university || ""}
                    onChange={(e) => handleChange("university", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Degree"
                    value={form.degree || ""}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Major"
                    value={form.major || ""}
                    onChange={(e) => handleChange("major", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Graduation Year"
                    value={form.graduationYear || ""}
                    onChange={(e) => handleChange("graduationYear", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={form.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={form.location || ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Skills (comma-separated)"
                    value={(form.skills || []).join(", ")}
                    onChange={handleSkillsChange}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    value={form.bio || ""}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    disabled={!editing}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </StudentLayout>
  );
}
