import { useState, useEffect } from "react";
import { Paper, Typography, Grid, Box, Avatar, Button, Chip, TextField } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";

export default function CompanyProfile() {
  const [profile, setProfile] = useState({
    companyName: "",
    email: "",
    industry: "",
    size: "",
    location: "",
    website: "",
    phone: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/companies/profile");
        const data = res.data;
        setProfile({
          companyName: data.companyName || "",
          email: data.email || "",
          industry: data.industry || "",
          size: data.size || "",
          location: data.location || "",
          website: data.website || "",
          phone: data.phone || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put("/companies/profile", profile);
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const fields = [
    { name: "companyName", label: "Company Name", md: 6 },
    { name: "email", label: "Email", md: 6 },
    { name: "industry", label: "Industry", md: 4 },
    { name: "size", label: "Size", md: 4 },
    { name: "location", label: "Location", md: 4 },
    { name: "website", label: "Website", md: 6 },
    { name: "phone", label: "Phone", md: 6 },
  ];

  if (loading) {
    return (
      <CompanyLayout>
        <Typography color="#94A3B8">Loading profile...</Typography>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#E2E8F0">
          Company Profile
        </Typography>

        <Paper sx={{ bgcolor: "#13182B", borderRadius: 3, p: 4, border: "1px solid #1E293B" }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }} display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ width: 120, height: 120, bgcolor: "#6366F1", fontSize: 48, mb: 2 }}>
                {profile.companyName?.charAt(0)?.toUpperCase() || "C"}
              </Avatar>
              <Typography variant="h5" fontWeight="bold" color="#E2E8F0">
                {profile.companyName || "Company Name"}
              </Typography>
              <Typography variant="body2" color="#94A3B8" mb={1}>
                {profile.email}
              </Typography>
              {profile.industry && (
                <Chip label={profile.industry} sx={{ bgcolor: "#6366F1", color: "#fff", fontWeight: 600 }} />
              )}
              {!editing && (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => setEditing(true)}
                  sx={{ mt: 3, bgcolor: "#6366F1", "&:hover": { bgcolor: "#5558E6" } }}
                >
                  Edit Profile
                </Button>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={2}>
                {fields.map((field) => (
                  <Grid size={{ xs: 12, md: field.md }} key={field.name}>
                    <TextField
                      fullWidth
                      name={field.name}
                      label={field.label}
                      value={profile[field.name]}
                      onChange={handleChange}
                      disabled={!editing}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#E2E8F0",
                          "& fieldset": { borderColor: "#1E293B" },
                          "&:hover fieldset": { borderColor: "#6366F1" },
                          "&.Mui-focused fieldset": { borderColor: "#6366F1" },
                        },
                        "& .MuiInputLabel-root": { color: "#94A3B8" },
                        "& .Mui-disabled": { color: "#64748B !important", WebkitTextFillColor: "#64748B !important" },
                      }}
                    />
                  </Grid>
                ))}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    value={profile.description}
                    onChange={handleChange}
                    disabled={!editing}
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#E2E8F0",
                        "& fieldset": { borderColor: "#1E293B" },
                        "&:hover fieldset": { borderColor: "#6366F1" },
                        "&.Mui-focused fieldset": { borderColor: "#6366F1" },
                      },
                      "& .MuiInputLabel-root": { color: "#94A3B8" },
                      "& .Mui-disabled": { color: "#64748B !important", WebkitTextFillColor: "#64748B !important" },
                    }}
                  />
                </Grid>
              </Grid>

              {editing && (
                <Box display="flex" gap={2} mt={3}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{ bgcolor: "#6366F1", "&:hover": { bgcolor: "#5558E6" } }}
                  >
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    sx={{ color: "#94A3B8", borderColor: "#1E293B", "&:hover": { borderColor: "#EF4444", color: "#EF4444" } }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </CompanyLayout>
  );
}
