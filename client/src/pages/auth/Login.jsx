import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box, Typography, TextField, Button, InputAdornment, IconButton, Paper, Grid
} from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff, Work } from "@mui/icons-material";
import { toast } from "react-toastify";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { HeroIllustration } from "../../components/common/Illustrations";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", form);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.fullName}!`);
      const role = data.user.role;
      if (role === "student") navigate("/student/dashboard");
      else if (role === "company") navigate("/company/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", background: "linear-gradient(135deg, #0B0F1E 0%, #1A1F35 50%, #0F1529 100%)", position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: "-20%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <Grid container sx={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", p: 4 }}>
          <Box sx={{ maxWidth: 440 }}>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <HeroIllustration />
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 4, mb: 1, textAlign: "center" }}>Welcome Back!</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>Sign in to continue your journey with InternHub</Typography>
            </motion.div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ width: "100%", maxWidth: 420 }}>
            <Paper sx={{ p: 4.5, background: "linear-gradient(135deg, #13182B 0%, #1A1F35 100%)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box sx={{ width: 56, height: 56, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", mb: 2, boxShadow: "0 8px 24px rgba(99,102,241,0.3)" }}>
                  <Work sx={{ fontSize: 28, color: "#fff" }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Welcome Back</Typography>
                <Typography variant="body2" color="text.secondary">Sign in to continue to your account</Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2.5 }}
                  InputProps={{ startAdornment: (<InputAdornment position="start"><Mail sx={{ color: "#94A3B8", fontSize: 20 }} /></InputAdornment>) }} />
                <TextField fullWidth label="Password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} sx={{ mb: 3 }}
                  InputProps={{ startAdornment: (<InputAdornment position="start"><Lock sx={{ color: "#94A3B8", fontSize: 20 }} /></InputAdornment>),
                    endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#94A3B8" }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />
                <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ py: 1.7, fontSize: "1rem", mb: 2.5 }}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Box>
              <Typography variant="body2" align="center" color="text.secondary">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#6366F1", textDecoration: "none", fontWeight: 600 }}>Sign Up</Link>
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
