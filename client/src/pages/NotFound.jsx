import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, Button, Container } from "@mui/material";
import { Home } from "@mui/icons-material";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0B0F1E 0%, #1A1F35 50%, #0F1529 100%)",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", md: "10rem" },
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 400, mx: "auto" }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            startIcon={<Home />}
            sx={{ px: 5, py: 1.7, fontSize: "1rem" }}
          >
            Go Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
