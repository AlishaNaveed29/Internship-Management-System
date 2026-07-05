import { Box, CircularProgress } from "@mui/material";

export default function Loader({ fullPage = true }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: fullPage ? "100vh" : 400,
      }}
    >
      <CircularProgress size={48} sx={{ color: "#6366F1" }} />
    </Box>
  );
}
