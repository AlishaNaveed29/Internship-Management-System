import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
    },
    secondary: {
      main: "#EC4899",
      light: "#F472B6",
      dark: "#DB2777",
    },
    accent: { main: "#14B8A6" },
    background: {
      default: "#0B0F1E",
      paper: "#13182B",
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#94A3B8",
    },
    divider: "rgba(99,102,241,0.12)",
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #0B0F1E 0%, #1A1F35 50%, #0B0F1E 100%)",
          minHeight: "100vh",
        },
        "::-webkit-scrollbar": { width: 6 },
        "::-webkit-scrollbar-track": { background: "#0B0F1E" },
        "::-webkit-scrollbar-thumb": { background: "#6366F1", borderRadius: 3 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
          },
        },
        outlined: {
          borderColor: "rgba(99,102,241,0.3)",
          "&:hover": { borderColor: "#6366F1", background: "rgba(99,102,241,0.08)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#13182B",
          borderRadius: 16,
          border: "1px solid rgba(99,102,241,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #13182B 0%, #1A1F35 100%)",
          borderRadius: 16,
          border: "1px solid rgba(99,102,241,0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "rgba(15,23,42,0.6)",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "rgba(15,23,42,0.8)" },
            "&.Mui-focused": {
              backgroundColor: "rgba(15,23,42,0.9)",
              boxShadow: "0 0 0 2px rgba(99,102,241,0.2)",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottomColor: "rgba(99,102,241,0.08)" },
        head: { fontWeight: 700, color: "#94A3B8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: { "&:hover": { backgroundColor: "rgba(99,102,241,0.04)" } },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(99,102,241,0.1)",
          backgroundColor: "#0F1529",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15,23,42,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(99,102,241,0.1)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

export default theme;
