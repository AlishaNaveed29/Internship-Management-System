import { Box, Button, Container, Typography } from "@mui/material";
import { Home, SearchOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "rgba(99,102,241,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
          }}
        >
          <SearchOff sx={{ fontSize: 60, color: "#6366F1" }} />
        </Box>
        <Typography variant="h2" fontWeight={800} sx={{ mb: 1 }}>
          404
        </Typography>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 400, mx: "auto" }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<Home />}
          sx={{ py: 1.5, px: 4 }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}

export default NotFound;
