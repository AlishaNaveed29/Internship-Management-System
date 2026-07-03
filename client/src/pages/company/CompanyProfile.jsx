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
import CompanyLayout from "../../layouts/CompanyLayout";
import API from "../../services/api";
import Loader from "../../components/common/Loader";
import { validators, validate } from "../../utils/validation";

function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const fetchProfile = async () => {
    try {
      const res = await API.get("/companies/profile");
      setProfile(res.data.company);
      setForm({
        companyName: res.data.company?.companyName || "",
        email: res.data.company?.email || "",
        industry: res.data.company?.industry || "",
        location: res.data.company?.location || "",
        website: res.data.company?.website || "",
        phone: res.data.company?.phone || "",
        description: res.data.company?.description || "",
        size: res.data.company?.size || "",
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

  const profileValidation = {
    companyName: [validators.required],
    email: [validators.required, validators.email],
    website: [validators.url],
    phone: [validators.phone],
  };

  const handleSave = async () => {
    const errs = validate(profileValidation, form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      const res = await API.put("/companies/profile", form);
      setProfile(res.data.company);
      setEditing(false);
      setErrors({});
      toast.success("Company profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleFieldChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  if (loading) return <CompanyLayout><Loader /></CompanyLayout>;

  return (
    <CompanyLayout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Company Profile</Typography>
          <Typography variant="body2" color="text.secondary">Manage your company information</Typography>
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
                bgcolor: "#6366F1",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              {profile?.companyName?.charAt(0) || "C"}
            </Avatar>
            <Typography variant="h6" fontWeight={700}>{profile?.companyName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{profile?.email}</Typography>
            <Chip
              label={profile?.industry || "Technology"}
              sx={{ bgcolor: "rgba(99,102,241,0.1)", color: "#6366F1", fontWeight: 600 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, border: "1px solid #F1F5F9" }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Company Information</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Company Name" value={form.companyName || ""}
                  onChange={handleFieldChange("companyName")}
                  disabled={!editing} size="small"
                  error={!!errors.companyName} helperText={errors.companyName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" value={form.email || ""}
                  onChange={handleFieldChange("email")}
                  disabled={!editing} size="small"
                  error={!!errors.email} helperText={errors.email} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Industry" value={form.industry || ""}
                  onChange={handleFieldChange("industry")}
                  disabled={!editing} size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Company Size" value={form.size || ""}
                  onChange={handleFieldChange("size")}
                  disabled={!editing} size="small" placeholder="e.g. 50-100 employees" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Location" value={form.location || ""}
                  onChange={handleFieldChange("location")}
                  disabled={!editing} size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Website" value={form.website || ""}
                  onChange={handleFieldChange("website")}
                  disabled={!editing} size="small"
                  error={!!errors.website} helperText={errors.website} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" value={form.phone || ""}
                  onChange={handleFieldChange("phone")}
                  disabled={!editing} size="small"
                  error={!!errors.phone} helperText={errors.phone} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Description" value={form.description || ""}
                  onChange={handleFieldChange("description")}
                  disabled={!editing} multiline rows={4} size="small" />
              </Grid>
            </Grid>
            {editing && (
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
                <Button variant="contained" startIcon={<Save />} onClick={handleSave}>Save Changes</Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </CompanyLayout>
  );
}

export default CompanyProfile;
