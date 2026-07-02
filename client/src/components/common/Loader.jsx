import { Box, CircularProgress, Typography } from "@mui/material";

function Loader({ message = "Loading..." }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
      gap={2}
    >
      <CircularProgress size={48} thickness={4} sx={{ color: "#6366F1" }} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}

export default Loader;
