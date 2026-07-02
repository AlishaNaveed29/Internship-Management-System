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
  Chip,
  Divider,
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
  Search,
  Send,
  Celebration,
  Business,
  People,
  Speed,
  Verified,
  BarChart,
  PersonAdd,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const features = [
  {
    icon: <Search sx={{ fontSize: 28 }} />,
    title: "Smart Discovery",
    desc: "AI-powered search filters internships by skills, location, duration, and industry preferences.",
    color: "#6366F1",
  },
  {
    icon: <Send sx={{ fontSize: 28 }} />,
    title: "One-Click Apply",
    desc: "Apply to multiple positions instantly with your pre-filled profile and portfolio links.",
    color: "#10B981",
  },
  {
    icon: <BarChart sx={{ fontSize: 28 }} />,
    title: "Real-Time Tracking",
    desc: "Monitor application status, interview invites, and offers from a single dashboard.",
    color: "#F59E0B",
  },
  {
    icon: <AutoAwesome sx={{ fontSize: 28 }} />,
    title: "Smart Matching",
    desc: "Our algorithm recommends the best-fit internships based on your unique skill profile.",
    color: "#8B5CF6",
  },
  {
    icon: <Verified sx={{ fontSize: 28 }} />,
    title: "Verified Companies",
    desc: "Every company is vetted to ensure legitimate, high-quality internship opportunities.",
    color: "#EC4899",
  },
  {
    icon: <Speed sx={{ fontSize: 28 }} />,
    title: "Fast Response",
    desc: "Get responses within 48 hours on average with our streamlined communication system.",
    color: "#14B8A6",
  },
];

const stats = [
  { value: "500+", label: "Active Internships", sub: "across 20+ industries" },
  { value: "2,000+", label: "Students Placed", sub: "in top companies" },
  { value: "150+", label: "Partner Companies", sub: "from startups to Fortune 500" },
  { value: "95%", label: "Success Rate", sub: "within 3 months" },
];

const howItWorks = [
  { step: "01", title: "Create Your Profile", desc: "Sign up and build a comprehensive profile highlighting your skills, education, and experience.", icon: <PersonAdd />, color: "#6366F1" },
  { step: "02", title: "Discover Opportunities", desc: "Browse or get matched with internships that fit your career goals and preferences.", icon: <Search />, color: "#10B981" },
  { step: "03", title: "Apply Instantly", desc: "Submit applications with one click and track every step of the process.", icon: <Send />, color: "#F59E0B" },
  { step: "04", title: "Launch Your Career", desc: "Land your dream internship and gain real-world experience with industry leaders.", icon: <Celebration />, color: "#8B5CF6" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CS Student, Stanford University",
    initials: "SJ",
    text: "InternHub completely transformed my internship search. I applied to 12 positions in one day and heard back from 8 companies within a week. The platform's matching algorithm is incredibly accurate — it recommended opportunities I wouldn't have found on my own.",
    stat: "Placed at Google",
    color: "#6366F1",
  },
  {
    name: "Michael Chen",
    role: "HR Manager, TechCorp Inc.",
    initials: "MC",
    text: "As a hiring manager, InternHub has streamlined our entire recruitment pipeline. The quality of candidates is exceptional, and the dashboard gives us all the tools we need to evaluate, communicate, and onboard interns efficiently.",
    stat: "Hired 15+ interns",
    color: "#10B981",
  },
  {
    name: "Emily Rodriguez",
    role: "Business Student, NYU",
    initials: "ER",
    text: "What sets InternHub apart is the transparency. I could see exactly where my application stood at every stage, received timely updates, and the interview scheduling was seamless. I landed my dream consulting internship within two weeks.",
    stat: "Placed at McKinsey",
    color: "#8B5CF6",
  },
];

const companies = [
  "TechCorp", "DataFlow", "CloudBase", "InnovateX", "GreenEnergy", "FinCore",
];

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* ─── HERO ─── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0B1120 0%, #1E293B 60%, #312E81 100%)",
          color: "white",
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
          <Box sx={{ position: "absolute", bottom: "-20%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />
          <Box sx={{ position: "absolute", top: "40%", left: "60%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                icon={<AutoAwesome sx={{ fontSize: 16 }} />}
                label="Trusted by 150+ companies worldwide"
                size="small"
                sx={{
                  bgcolor: "rgba(99,102,241,0.2)",
                  color: "#A5B4FC",
                  fontWeight: 600,
                  fontSize: 12,
                  mb: 3,
                  px: 1,
                  "& .MuiChip-icon": { color: "#A5B4FC" },
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
                  lineHeight: 1.1,
                  fontWeight: 900,
                  mb: 2,
                  letterSpacing: "-0.03em",
                }}
              >
                The Smarter Way to{" "}
                <Box component="span" sx={{ background: "linear-gradient(135deg, #A78BFA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Land Your Internship
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "#94A3B8",
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  lineHeight: 1.8,
                  mb: 5,
                  maxWidth: 560,
                }}
              >
                InternHub connects ambitious students with top companies through intelligent matching, 
                streamlined applications, and real-time tracking — all in one place.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={Link}
                  to={isAuthenticated ? "/student/dashboard" : "/register"}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.8,
                    px: 4,
                    fontSize: "1rem",
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    "&:hover": { background: "linear-gradient(135deg, #4F46E5, #7C3AED)" },
                  }}
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    py: 1.8,
                    px: 4,
                    fontSize: "1rem",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.2)",
                    "&:hover": { borderColor: "rgba(255,255,255,0.5)", bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 5, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CheckCircle sx={{ fontSize: 16, color: "#34D399" }} />
                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>No credit card</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CheckCircle sx={{ fontSize: 16, color: "#34D399" }} />
                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>Free for students</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CheckCircle sx={{ fontSize: 16, color: "#34D399" }} />
                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>Verified companies</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <Box
                sx={{
                  width: 420,
                  height: 420,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 60%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366F1, #A78BFA)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 30px 80px rgba(99,102,241,0.35)",
                    animation: "pulse 3s ease-in-out infinite",
                    "@keyframes pulse": { "0%, 100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.05)" } },
                  }}
                >
                  <Work sx={{ fontSize: 72, color: "#fff" }} />
                </Box>
                <Box sx={{ position: "absolute", top: "15%", right: "10%", bgcolor: "rgba(16,185,129,0.15)", backdropFilter: "blur(10px)", borderRadius: 3, px: 2, py: 1.5, border: "1px solid rgba(16,185,129,0.2)" }}>
                  <Typography variant="caption" fontWeight={600} sx={{ color: "#34D399" }}>2,000+ Placed</Typography>
                </Box>
                <Box sx={{ position: "absolute", bottom: "20%", left: "8%", bgcolor: "rgba(99,102,241,0.15)", backdropFilter: "blur(10px)", borderRadius: 3, px: 2, py: 1.5, border: "1px solid rgba(99,102,241,0.2)" }}>
                  <Typography variant="caption" fontWeight={600} sx={{ color: "#A5B4FC" }}>150+ Companies</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── COMPANY BANNER ─── */}
      <Box sx={{ bgcolor: "#fff", py: 5, borderBottom: "1px solid #F1F5F9" }}>
        <Container maxWidth="xl">
          <Typography variant="caption" align="center" sx={{ display: "block", color: "#94A3B8", fontWeight: 600, letterSpacing: 2, mb: 3, textTransform: "uppercase" }}>
            Trusted by leading companies
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {companies.map((c) => (
              <Grid item key={c}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, opacity: 0.5, "&:hover": { opacity: 0.8 } }}>
                  <Business sx={{ fontSize: 24, color: "#64748B" }} />
                  <Typography variant="h6" fontWeight={700} sx={{ color: "#1E293B", fontSize: "1.1rem" }}>{c}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── STATS ─── */}
      <Box sx={{ bgcolor: "#F8FAFC", py: 7, borderBottom: "1px solid #F1F5F9" }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <Box sx={{ textAlign: "center", px: 2 }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.5rem" }, mb: 0.5, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#1E293B", mb: 0.25 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                    {stat.sub}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── HOW IT WORKS ─── */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip label="Simple Process" size="small" sx={{ bgcolor: "rgba(99,102,241,0.1)", color: "#6366F1", fontWeight: 600, mb: 2 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, mb: 1.5, fontWeight: 800 }}>
            How It Works
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: "auto", fontSize: "1.05rem" }}>
            Four simple steps to launch your career with the perfect internship.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {howItWorks.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.step}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  border: "1px solid #F1F5F9",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", borderColor: `${item.color}30` },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: `${item.color}12`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#94A3B8", letterSpacing: 1 }}>{item.step}</Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: "1rem" }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── FEATURES ─── */}
      <Box sx={{ bgcolor: "#fff", py: { xs: 8, md: 12 }, borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Platform Features" size="small" sx={{ bgcolor: "rgba(16,185,129,0.1)", color: "#10B981", fontWeight: 600, mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, mb: 1.5, fontWeight: 800 }}>
              Everything You Need to Succeed
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: "auto", fontSize: "1.05rem" }}>
              A comprehensive platform designed to make the internship journey seamless from start to finish.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Card
                  sx={{
                    p: 2.5,
                    height: "100%",
                    border: "1px solid #F1F5F9",
                    "&:hover": { borderColor: `${feature.color}30` },
                  }}
                >
                  <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: `${feature.color}10`,
                        color: feature.color,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: "1rem" }}>
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
      </Box>

      {/* ─── TESTIMONIALS ─── */}
      <Box sx={{ bgcolor: "#F8FAFC", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Testimonials" size="small" sx={{ bgcolor: "rgba(139,92,246,0.1)", color: "#8B5CF6", fontWeight: 600, mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, mb: 1.5, fontWeight: 800 }}>
              What Our Users Say
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: "auto", fontSize: "1.05rem" }}>
              Real stories from students and companies who use InternHub.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((t) => (
              <Grid item xs={12} md={4} key={t.name}>
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid #F1F5F9",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ p: 0, "&:last-child": { pb: 0 }, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: t.color,
                          fontWeight: 700,
                          fontSize: 16,
                        }}
                      >
                        {t.initials}
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
                    <Typography
                      variant="body2"
                      sx={{ lineHeight: 1.8, color: "#475569", flex: 1, mb: 2.5, fontStyle: "italic" }}
                    >
                      &ldquo;{t.text}&rdquo;
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircle sx={{ fontSize: 16, color: t.color }} />
                      <Typography variant="caption" fontWeight={700} sx={{ color: t.color }}>
                        {t.stat}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── CTA ─── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #312E81 100%)",
          py: { xs: 8, md: 10 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 60%)" }} />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h3" sx={{ color: "#fff", mb: 2, fontWeight: 800, fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
            Ready to Launch Your Career?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.65)", mb: 5, fontSize: "1.1rem", maxWidth: 500, mx: "auto" }}
          >
            Join thousands of students who have found their dream internships. Start your journey today.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                py: 1.8,
                px: 5,
                fontSize: "1rem",
                bgcolor: "#fff",
                color: "#4F46E5",
                fontWeight: 700,
                "&:hover": { bgcolor: "#F1F5F9", transform: "translateY(-2px)", boxShadow: "0 8px 25px rgba(255,255,255,0.2)" },
              }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                py: 1.8,
                px: 5,
                fontSize: "1rem",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.25)",
                fontWeight: 600,
                "&:hover": { borderColor: "rgba(255,255,255,0.5)", bgcolor: "rgba(255,255,255,0.05)" },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Home;
