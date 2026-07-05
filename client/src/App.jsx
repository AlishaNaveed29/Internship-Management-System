import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme/theme";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-right" theme="dark" autoClose={3000} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable />
      <AppRouter />
    </ThemeProvider>
  );
}
