import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Work,
  School,
  TrendingUp,
  Security,
  AutoAwesome,
  Groups,
  ArrowForward,
  CheckCircle,
  PlayArrow,
} from "@mui/icons-material";

const features = [
  {
    icon: <Work sx={{ fontSize: 36 }} />,
    title: "Browse Internships",
    desc: "Explore hundreds of internship opportunities from top companies across various industries.",
    color: "#6366F1",
  },
  {
    icon: <School sx={{ fontSize: 36 }} />,
    title: "Student Profiles",
    desc: "Create a standout profile showcasing your skills, projects, and academic achievements.",
    color: "#10B981",
  },
  {
    icon: <TrendingUp sx={{ fontSize: 36 }} />,
    title: "Track Applications",
    desc: "Monitor your application status in real-time with detailed analytics and insights.",
    color: "#F59E0B",
  },
  {
    icon: <Security sx={{ fontSize: 36 }} />,
    title: "Secure Platform",
    desc: "Enterprise-grade security protecting your data and privacy throughout the process.",
    color: "#EF4444",
  },
  {
    icon: <AutoAwesome sx={{ fontSize: 36 }} />,
    title: "Smart Matching",
    desc: "AI-powered recommendations that match your skills with the perfect internship.",
    color: "#8B5CF6",
  },
  {
    icon: <Groups sx={{ fontSize: 36 }} />,
    title: "Company Dashboard",
    desc: "Powerful tools for companies to manage postings, review applicants, and hire talent.",
    color: "#EC4899",
  },
];

const stats = [
  { value: "500+", label: "Active Internships" },
  { value: "2,000+", label: "Students Placed" },
  { value: "150+", label: "Partner Companies" },
  { value: "95%", label: "Success Rate" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    avatar: "S",
    rating: 5,
    text: "InternHub helped me land my dream internship at Google. The platform is incredibly intuitive and the matching algorithm is spot on!",
  },
  {
    name: "Michael Chen",
    role: "HR Manager, TechCorp",
    avatar: "M",
    rating: 5,
    text: "We've hired some of our best interns through InternHub. The quality of candidates and the management tools are outstanding.",
  },
  {
    name: "Emily Rodriguez",
    role: "Business Student",
    avatar: "E",
    rating: 5,
    text: "The application tracking feature is a game-changer. I could see exactly where I stood throughout the entire process.",
  },
];

function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #6366F1 100%)",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 16 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.15)",
            filter: "blur(80px)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(16,185,129,0.1)",
            filter: "blur(60px)",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <CheckCircle sx={{ color: "#34D399", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "#94A3B8", letterSpacing: 1 }}>
                  TRUSTED BY 150+ COMPANIES
                </Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  lineHeight: 1.1,
                  mb: 3,
                }}
              >
                Find Your{" "}
                <Box component="span" sx={{ background: "linear-gradient(135deg, #818CF8, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Dream Internship
                </Box>{" "}
                Today
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#94A3B8", fontWeight: 400, mb: 5, maxWidth: 540, lineHeight: 1.8, fontSize: "1.1rem" }}
              >
                The all-in-one platform connecting ambitious students with innovative companies. 
                Browse opportunities, apply instantly, and launch your career.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ py: 1.8, px: 4, fontSize: "1.05rem" }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    py: 1.8,
                    px: 4,
                    fontSize: "1.05rem",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.3)",
                    "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366F1, #818CF8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 20px 60px rgba(99,102,241,0.4)",
                    }}
                  >
                    <Work sx={{ fontSize: 80, color: "#fff" }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ bgcolor: "#fff", py: 6, borderBottom: "1px solid #F1F5F9" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {stats.map((stat) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      background: "linear-gradient(135deg, #6366F1, #818CF8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 800,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}
        >
          Everything You Need
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: 600, mx: "auto", fontSize: "1.1rem" }}
        >
          A complete platform designed to make the internship journey seamless for everyone involved.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid #F1F5F9",
                  "&:hover": { borderColor: `${feature.color}40` },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: "#fff", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}
          >
            What People Say
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 600, mx: "auto" }}
          >
            Hear from students and companies who use InternHub.
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((t) => (
              <Grid item xs={12} md={4} key={t.name}>
                <Card sx={{ p: 3, height: "100%", border: "1px solid #F1F5F9" }}>
                  <CardContent>
                    <Rating value={t.rating} readOnly size="small" sx={{ mb: 2 }} />
                    <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, fontStyle: "italic", color: "#475569" }}>
                      "{t.text}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "#6366F1",
                          width: 44,
                          height: 44,
                          fontWeight: 700,
                        }}
                      >
                        {t.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>
                          {t.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
          py: { xs: 8, md: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ color: "#fff", mb: 2, fontWeight: 800 }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.8)", mb: 5, fontSize: "1.1rem" }}
          >
            Join thousands of students who have found their dream internships through InternHub.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                py: 1.8,
                px: 5,
                fontSize: "1.05rem",
                bgcolor: "#fff",
                color: "#6366F1",
                "&:hover": { bgcolor: "#F1F5F9" },
              }}
            >
              Sign Up Free
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                py: 1.8,
                px: 5,
                fontSize: "1.05rem",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.4)",
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              Login
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Home;
