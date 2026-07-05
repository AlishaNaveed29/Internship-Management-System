import { Box, Container, Typography, Stack } from "@mui/material";
import { Work, Favorite, Security } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0B0F1E", borderTop: "1px solid rgba(99,102,241,0.1)", py: 6, mt: "auto" }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} justifyContent="space-between" alignItems="center">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Work sx={{ color: "#6366F1" }} />
            <Typography variant="h6" fontWeight={800} sx={{ background: "linear-gradient(135deg, #6366F1, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InternHub</Typography>
          </Box>
          <Stack direction="row" spacing={3} alignItems="center">
            <Favorite sx={{ color: "#EC4899", fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary">© 2026 InternHub. All rights reserved.</Typography>
            <Security sx={{ color: "#14B8A6", fontSize: 18 }} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
