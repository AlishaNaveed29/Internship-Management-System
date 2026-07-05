import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box, Typography, Button, Card, CardContent, Grid, Avatar, Chip, Container
} from "@mui/material";
import {
  School, Business, Search, HowToReg, Work, Star, ChevronRight, ArrowForward
} from "@mui/icons-material";
import API from "../../services/api";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
};

const steps = [
  {
    title: "Sign Up & Create Profile",
    description: "Register as a student or company and build your complete profile with skills, preferences, and requirements.",
    icon: <HowToReg sx={{ fontSize: 40 }} />,
  },
  {
    title: "Browse & Match",
    description: "Explore opportunities or candidates using our smart matching system tailored to your needs.",
    icon: <Search sx={{ fontSize: 40 }} />,
  },
  {
    title: "Apply & Hire",
    description: "Apply with one click or receive applications. Connect and start your internship journey.",
    icon: <Work sx={{ fontSize: 40 }} />,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    avatar: "SJ",
    text: "InternHub helped me land my dream internship at a top tech company. The platform made the entire process seamless and intuitive.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "HR Manager, TechCorp",
    avatar: "MC",
    text: "We've hired some of our best interns through InternHub. The quality of candidates and ease of use is outstanding.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "UX Design Intern",
    avatar: "ER",
    text: "The platform matched me with companies that perfectly fit my skills and career goals. Highly recommended for all students!",
    rating: 5,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    API.get("/internships?limit=6")
      .then((res) => setInternships(res.data.internships || res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const targets = [1000, 200, 500];
    const duration = 2000;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((t) => Math.floor(t * eased)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <Box sx={{ bgcolor: "#0B0F1E", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B0F1E 0%, #1A1F35 50%, #0F1529 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle at 30% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(236,72,153,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center", py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Chip
              label="Connecting Talent with Opportunity"
              sx={{
                mb: 3,
                background: "rgba(99,102,241,0.15)",
                color: "#818CF8",
                fontWeight: 600,
                px: 2,
                py: 2.5,
                fontSize: "0.9rem",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
                background: "linear-gradient(135deg, #F1F5F9 0%, #818CF8 50%, #EC4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Gateway to<br />Amazing Internships
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#94A3B8", maxWidth: 600, mx: "auto", mb: 5, lineHeight: 1.7, fontWeight: 400 }}
            >
              Discover curated internship opportunities, connect with leading companies, and launch your career with InternHub.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/register")}
                endIcon={<ArrowForward />}
                sx={{ px: 4, py: 1.8, fontSize: "1rem" }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/internships")}
                endIcon={<ChevronRight />}
                sx={{ px: 4, py: 1.8, fontSize: "1rem" }}
              >
                Browse Internships
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div {...fadeInUp}>
          <Grid container spacing={4} justifyContent="center">
            {[
              { label: "Students", value: counts[0], suffix: "+", icon: <School /> },
              { label: "Companies", value: counts[1], suffix: "+", icon: <Business /> },
              { label: "Internships", value: counts[2], suffix: "+", icon: <Work /> },
            ].map((stat) => (
              <Grid item xs={12} sm={4} key={stat.label}>
                <Card
                  sx={{
                    textAlign: "center",
                    py: 4,
                    px: 3,
                    background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.05) 100%)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(99,102,241,0.3)" },
                  }}
                >
                  <Box sx={{ color: "#6366F1", mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, background: "linear-gradient(135deg, #6366F1, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {stat.value}{stat.suffix}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      <Box sx={{ py: 10, background: "linear-gradient(180deg, rgba(99,102,241,0.03) 0%, transparent 100%)" }}>
        <Container maxWidth="lg">
          <motion.div {...fadeInUp}>
            <Typography variant="h3" align="center" sx={{ mb: 2 }}>
              How It Works
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 500, mx: "auto" }}>
              Three simple steps to kickstart your internship journey
            </Typography>
          </motion.div>

          <motion.div {...stagger}>
            <Grid container spacing={4}>
              {steps.map((step, i) => (
                <Grid item xs={12} md={4} key={step.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  >
                    <Card
                      sx={{
                        textAlign: "center",
                        py: 5,
                        px: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          borderColor: "rgba(99,102,241,0.3)",
                          boxShadow: "0 20px 60px rgba(99,102,241,0.15)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.15) 100%)",
                          color: "#818CF8",
                          mb: 3,
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Typography variant="h5" sx={{ mb: 1.5 }}>
                        {i + 1}. {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {step.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {internships.length > 0 && (
        <Box sx={{ py: 10 }}>
          <Container maxWidth="lg">
            <motion.div {...fadeInUp}>
              <Typography variant="h3" align="center" sx={{ mb: 2 }}>
                Featured Internships
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 500, mx: "auto" }}>
                Explore top internship opportunities from leading companies
              </Typography>
            </motion.div>

            <Grid container spacing={3}>
              {internships.slice(0, 6).map((internship, i) => (
                <Grid item xs={12} sm={6} md={4} key={internship._id || i}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        p: 2.5,
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          borderColor: "rgba(99,102,241,0.3)",
                          boxShadow: "0 12px 40px rgba(99,102,241,0.12)",
                        },
                      }}
                      onClick={() => navigate(`/internships/${internship._id}`)}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 44,
                            height: 44,
                            bgcolor: "rgba(99,102,241,0.15)",
                            color: "#6366F1",
                            fontWeight: 700,
                            fontSize: "1rem",
                          }}
                        >
                          {(internship.company?.name || internship.company || "C").charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {internship.title || "Untitled Position"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {internship.company?.name || internship.companyName || "Company"}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1, lineHeight: 1.6 }}>
                        {internship.description?.slice(0, 120)}
                        {(internship.description?.length || 0) > 120 ? "..." : ""}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {internship.type && (
                          <Chip label={internship.type} size="small" sx={{ background: "rgba(99,102,241,0.12)", color: "#818CF8" }} />
                        )}
                        {internship.location && (
                          <Chip label={internship.location} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Button variant="outlined" size="large" onClick={() => navigate("/internships")} endIcon={<ChevronRight />}>
                View All Internships
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      <Box sx={{ py: 10, background: "linear-gradient(180deg, rgba(236,72,153,0.03) 0%, transparent 100%)" }}>
        <Container maxWidth="lg">
          <motion.div {...fadeInUp}>
            <Typography variant="h3" align="center" sx={{ mb: 2 }}>
              What People Say
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 500, mx: "auto" }}>
              Hear from students and companies who use InternHub
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={t.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      p: 3.5,
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(99,102,241,0.25)" },
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} sx={{ fontSize: 18, color: "#F59E0B" }} />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ flex: 1, lineHeight: 1.7, mb: 3, fontStyle: "italic" }}>
                      "{t.text}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        {t.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {t.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: 12,
          background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.05) 100%)",
          borderTop: "1px solid rgba(99,102,241,0.1)",
          borderBottom: "1px solid rgba(99,102,241,0.1)",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <motion.div {...fadeInUp}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
              Join thousands of students and companies already using InternHub to connect and grow.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/register")}
                sx={{ px: 5, py: 1.8, fontSize: "1rem" }}
              >
                Join Now - It's Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
                sx={{ px: 5, py: 1.8, fontSize: "1rem" }}
              >
                Sign In
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
