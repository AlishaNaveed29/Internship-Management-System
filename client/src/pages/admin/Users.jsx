import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, Avatar, TextField, InputAdornment,
  Pagination, CircularProgress, Fade
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

  useEffect(() => { fetchUsers(); }, [page]);

  useEffect(() => { setPage(1); }, [search]);

  const roleColors = { student: "#6366F1", company: "#14B8A6", admin: "#EF4444" };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>Users</Typography>
          <Typography variant="body2" sx={{ color: "#64748B" }}>Manage all platform users</Typography>
        </Box>
        <TextField
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search sx={{ color: "#64748B" }} /></InputAdornment>,
            },
          }}
          sx={{ minWidth: 280 }}
        />
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress sx={{ color: "#6366F1" }} /></Box>
        ) : users.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <People sx={{ fontSize: 64, color: "#64748B", mb: 2, opacity: 0.3 }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: "#94A3B8", mb: 1 }}>No users found</Typography>
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
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Joined Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, idx) => (
                    <Fade in timeout={300 + idx * 50} key={user._id}>
                      <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(99,102,241,0.04)" } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 34, height: 34, bgcolor: "#6366F1", fontSize: 13, fontWeight: 700 }}>
                              {user.fullName?.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>{user.fullName}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Typography variant="body2" color="#94A3B8">{user.email}</Typography></TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            size="small"
                            sx={{
                              textTransform: "capitalize", fontWeight: 700,
                              bgcolor: `${roleColors[user.role]}22`,
                              color: roleColors[user.role],
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="#94A3B8">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status || "active"}
                            size="small"
                            sx={{
                              textTransform: "capitalize", fontWeight: 700,
                              bgcolor: (!user.status || user.status === "active") ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                              color: (!user.status || user.status === "active") ? "#22C55E" : "#EF4444",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" size="large" />
              </Box>
            )}
          </>
        )}
      </Paper>
    </AdminLayout>
  );
}
