import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box, Typography, TextField, Button, InputAdornment, IconButton, Paper, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff, Person, School, Work } from "@mui/icons-material";
import { toast } from "react-toastify";
import API from "../../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await API.post("/auth/register", { ...form, role });
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0B0F1E 0%, #1A1F35 50%, #0F1529 100%)",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 440 }}
      >
        <Paper
          sx={{
            p: 4.5,
            background: "linear-gradient(135deg, #13182B 0%, #1A1F35 100%)",
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                mb: 2,
                boxShadow: "0 8px 24px rgba(99,102,241,0.3)",
              }}
            >
              <Work sx={{ fontSize: 28, color: "#fff" }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join InternHub and start your journey
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(_, val) => val && setRole(val)}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton
              value="student"
              sx={{
                py: 1.5,
                textTransform: "none",
                borderRadius: "12px 0 0 12px",
                border: "1px solid rgba(99,102,241,0.2)",
                "&.Mui-selected": {
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.1))",
                  color: "#818CF8",
                  borderColor: "#6366F1",
                },
              }}
            >
              <School sx={{ mr: 1, fontSize: 20 }} />
              Student
            </ToggleButton>
            <ToggleButton
              value="company"
              sx={{
                py: 1.5,
                textTransform: "none",
                borderRadius: "0 12px 12px 0",
                border: "1px solid rgba(99,102,241,0.2)",
                "&.Mui-selected": {
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.1))",
                  color: "#818CF8",
                  borderColor: "#6366F1",
                },
              }}
            >
              <Business sx={{ mr: 1, fontSize: 20 }} />
              Company
            </ToggleButton>
          </ToggleButtonGroup>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#94A3B8", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail sx={{ color: "#94A3B8", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#94A3B8", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#94A3B8" }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.7, fontSize: "1rem", mb: 2.5 }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>

          <Typography variant="body2" align="center" color="text.secondary">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#6366F1", textDecoration: "none", fontWeight: 600 }}>
              Sign In
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
