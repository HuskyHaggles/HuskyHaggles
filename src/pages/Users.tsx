// Users.tsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import UserCard from "../components/UserCard";
import { supabase } from "../supabaseClient";

interface User {
  id: string;
  username: string;
  profile_picture: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, profile_picture")
        .order("username", { ascending: true });

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {loading ? (
        <Typography>Loading users...</Typography>
      ) : users.length > 0 ? (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item key={user.id} xs={6} sm={4} md={3}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No users found.</Typography>
      )}
    </Container>
  );
};

export default Users;
