import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, Button, Container } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0B0F1E 0%, #1A1F35 100%)", position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", top: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
      <Box sx={{ position: "absolute", bottom: "-20%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)" }} />
      <Container maxWidth="sm" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: "8rem", md: "12rem" }, fontWeight: 900, background: "linear-gradient(135deg, #6366F1, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, mb: 2 }}>
            404
          </Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Page Not Found</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: "auto" }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button variant="contained" size="large" startIcon={<HomeIcon />} onClick={() => navigate("/")} sx={{ px: 4, py: 1.5 }}>
            Go Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
