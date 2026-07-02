import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#14B8A6",
      light: "#2DD4BF",
      dark: "#0D9488",
      contrastText: "#fff",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    info: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
      dark: "#0F172A",
      card: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
      disabled: "#94A3B8",
    },
    divider: "#F1F5F9",
  },
  typography: {
    fontFamily: '"Inter", "Poppins", sans-serif',
    h1: { fontWeight: 800, fontSize: "3.5rem", lineHeight: 1.2, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, fontSize: "2.75rem", lineHeight: 1.25, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, fontSize: "2.25rem", lineHeight: 1.3, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700, fontSize: "1.75rem", lineHeight: 1.35, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: "1rem", lineHeight: 1.5 },
    subtitle1: { fontWeight: 500, fontSize: "1.1rem", lineHeight: 1.5 },
    subtitle2: { fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.5 },
    body1: { fontSize: "1rem", lineHeight: 1.7 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    caption: { fontSize: "0.75rem", lineHeight: 1.5, fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.04)",
    "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
    "0 2px 4px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
    "0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)",
    "0 6px 10px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.04)",
    "0 8px 16px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)",
    "0 10px 20px rgba(0,0,0,0.06), 0 5px 10px rgba(0,0,0,0.04)",
    "0 12px 24px rgba(0,0,0,0.06), 0 6px 12px rgba(0,0,0,0.04)",
    "0 14px 28px rgba(0,0,0,0.07), 0 7px 14px rgba(0,0,0,0.04)",
    "0 16px 32px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.04)",
    "0 18px 36px rgba(0,0,0,0.07), 0 9px 18px rgba(0,0,0,0.04)",
    "0 20px 40px rgba(0,0,0,0.08), 0 10px 20px rgba(0,0,0,0.04)",
    "0 22px 44px rgba(99,102,241,0.08), 0 11px 22px rgba(0,0,0,0.04)",
    "0 24px 48px rgba(99,102,241,0.08), 0 12px 24px rgba(0,0,0,0.04)",
    "0 26px 52px rgba(99,102,241,0.08), 0 13px 26px rgba(0,0,0,0.04)",
    "0 28px 56px rgba(99,102,241,0.08), 0 14px 28px rgba(0,0,0,0.04)",
    "0 30px 60px rgba(99,102,241,0.08), 0 15px 30px rgba(0,0,0,0.04)",
    "0 32px 64px rgba(99,102,241,0.08), 0 16px 32px rgba(0,0,0,0.04)",
    "0 34px 68px rgba(99,102,241,0.08), 0 17px 34px rgba(0,0,0,0.04)",
    "0 36px 72px rgba(99,102,241,0.08), 0 18px 36px rgba(0,0,0,0.04)",
    "0 38px 76px rgba(99,102,241,0.08), 0 19px 38px rgba(0,0,0,0.04)",
    "0 40px 80px rgba(99,102,241,0.08), 0 20px 40px rgba(0,0,0,0.04)",
    "0 42px 84px rgba(99,102,241,0.08), 0 21px 42px rgba(0,0,0,0.04)",
    "0 44px 88px rgba(99,102,241,0.08), 0 22px 44px rgba(0,0,0,0.04)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#CBD5E1 #F8FAFC",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: 6,
            height: 6,
          },
          "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
            background: "#F8FAFC",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            background: "#CBD5E1",
            borderRadius: 3,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 24px",
          fontSize: "0.95rem",
          boxShadow: "none",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
        text: {
          "&:hover": {
            background: "rgba(99, 102, 241, 0.06)",
          },
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.85rem",
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1.05rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 10px 30px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        },
        elevation2: {
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03)",
        },
        elevation3: {
          boxShadow: "0 10px 20px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            transition: "all 0.2s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6366F1",
            },
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(99,102,241,0.1)",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#6366F1",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: "0.8125rem",
        },
        sizeSmall: {
          borderRadius: 6,
          fontSize: "0.75rem",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 700,
            color: "#0F172A",
            backgroundColor: "#F8FAFC",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #F1F5F9",
          padding: "14px 16px",
          fontSize: "0.9rem",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(99,102,241,0.02)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          borderRadius: "8px 8px 0 0",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          borderRadius: "2px 2px 0 0",
          height: 3,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "12px 16px",
        },
        standardSuccess: {
          backgroundColor: "rgba(16,185,129,0.08)",
          color: "#059669",
        },
        standardError: {
          backgroundColor: "rgba(239,68,68,0.08)",
          color: "#DC2626",
        },
        standardWarning: {
          backgroundColor: "rgba(245,158,11,0.08)",
          color: "#D97706",
        },
        standardInfo: {
          backgroundColor: "rgba(59,130,246,0.08)",
          color: "#2563EB",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: "0.8rem",
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: 4,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #F1F5F9",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.2s ease",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#F1F5F9",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          fontSize: "0.7rem",
        },
      },
    },
  },
});

export default theme;
