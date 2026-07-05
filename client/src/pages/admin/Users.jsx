import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress
} from "@mui/material";
import { Search, People } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = () => {
    setLoading(true);
    API.get("/admin/users", { params: { search, page, limit: 10 } })
      .then(({ data }) => {
        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const roleColors = { student: "#6366F1", company: "#14B8A6", admin: "#EF4444" };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#F1F5F9", mb: 1 }}>
            Users
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>
            Manage all platform users
          </Typography>
        </Box>
        <TextField
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
          size="small"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search sx={{ color: "#64748B" }} /></InputAdornment>,
            },
          }}
          sx={{
            minWidth: 280,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#13182B",
              borderRadius: 3,
              color: "#F1F5F9",
              "& fieldset": { borderColor: "rgba(99,102,241,0.2)" },
              "&:hover fieldset": { borderColor: "rgba(99,102,241,0.4)" },
              "&.Mui-focused fieldset": { borderColor: "#6366F1" },
            },
          }}
        />
      </Box>

      <Paper sx={{ borderRadius: 4, bgcolor: "#13182B", border: "1px solid rgba(99,102,241,0.1)", overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#6366F1" }} />
          </Box>
        ) : users.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <People sx={{ fontSize: 48, color: "#64748B", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#94A3B8", mb: 1 }}>No users found</Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              {search ? "Try a different search term" : "No users have registered yet"}
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>User</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Email</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Role</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Joined Date</TableCell>
                    <TableCell sx={{ color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id} sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.05)" } }}>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#F1F5F9" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ width: 34, height: 34, bgcolor: "#6366F1", fontSize: 13, fontWeight: 700 }}>
                            {user.fullName?.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={600}>{user.fullName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>{user.email}</TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: 600,
                            bgcolor: `${roleColors[user.role]}26`,
                            color: roleColors[user.role],
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94A3B8" }}>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <Chip
                          label={user.status || "active"}
                          size="small"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: 600,
                            bgcolor: (user.status === "active" || !user.status) ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                            color: (user.status === "active" || !user.status) ? "#22C55E" : "#EF4444",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, val) => setPage(val)}
                  sx={{
                    "& .MuiPaginationItem-root": { color: "#94A3B8", "&.Mui-selected": { bgcolor: "#6366F1", color: "#fff" } },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </AdminLayout>
  );
}
