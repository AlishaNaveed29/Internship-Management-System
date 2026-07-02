import { Box, Container, Grid, Typography, IconButton, Divider } from "@mui/material";
import { Work, LinkedIn, Twitter, GitHub } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      sx={{
        background: "#0F172A",
        color: "#CBD5E1",
        pt: 8,
        pb: 4,
        mt: 10,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Work sx={{ color: "#818CF8", mr: 1, fontSize: 28 }} />
              <Typography variant="h5" fontWeight={800} sx={{ color: "#fff" }}>
                InternHub
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, maxWidth: 320 }}>
              The premier platform connecting talented students with amazing internship opportunities at leading companies.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[LinkedIn, Twitter, GitHub].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: "#94A3B8",
                    bgcolor: "rgba(255,255,255,0.05)",
                    "&:hover": { bgcolor: "#6366F1", color: "#fff" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#fff", mb: 2 }}>
              Platform
            </Typography>
            {["Browse Internships", "For Students", "For Companies", "How It Works"].map((item) => (
              <Typography key={item} variant="body2" sx={{ mb: 1.5, "&:hover": { color: "#818CF8" }, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#fff", mb: 2 }}>
              Company
            </Typography>
            {["About Us", "Careers", "Press Kit", "Contact"].map((item) => (
              <Typography key={item} variant="body2" sx={{ mb: 1.5, "&:hover": { color: "#818CF8" }, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#fff", mb: 2 }}>
              Support
            </Typography>
            {["Help Center", "Privacy Policy", "Terms of Service", "FAQ"].map((item) => (
              <Typography key={item} variant="body2" sx={{ mb: 1.5, "&:hover": { color: "#818CF8" }, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#fff", mb: 2 }}>
              Legal
            </Typography>
            {["GDPR", "Security", "Cookie Policy", "Guidelines"].map((item) => (
              <Typography key={item} variant="body2" sx={{ mb: 1.5, "&:hover": { color: "#818CF8" }, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

        <Typography variant="body2" sx={{ textAlign: "center", color: "#64748B" }}>
          &copy; {new Date().getFullYear()} InternHub. All rights reserved. Made with passion for students and companies.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
