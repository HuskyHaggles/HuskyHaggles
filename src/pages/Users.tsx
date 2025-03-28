import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Helmet } from "react-helmet";
import UserCard from "../components/UserCard";
import { supabase } from "../supabaseClient";
import { SelectChangeEvent } from "@mui/material/Select";

interface User {
  id: string;
  username: string;
  profile_picture: string;
  firstName: string;
  lastName: string;
  created_at: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("created_desc");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          "id, username, profile_picture, firstName, lastName, created_at"
        );

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleSortChange = (
    e: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setSortBy(e.target.value);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "created_desc") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "created_asc") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sortBy === "firstName_asc") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "firstName_desc") {
      return b.firstName.localeCompare(a.firstName);
    } else if (sortBy === "lastName_asc") {
      return a.lastName.localeCompare(b.lastName);
    } else if (sortBy === "lastName_desc") {
      return b.lastName.localeCompare(a.lastName);
    }
    return 0;
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Helmet>
        <title>Users - Husky Haggles</title>
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel>Sort Users</InputLabel>
        <Select
          name="sortBy"
          value={sortBy}
          label="Sort Users"
          onChange={handleSortChange}
        >
          <MenuItem value="created_desc">Newest First</MenuItem>
          <MenuItem value="created_asc">Oldest First</MenuItem>
          <MenuItem value="firstName_asc">First Name (A-Z)</MenuItem>
          <MenuItem value="firstName_desc">First Name (Z-A)</MenuItem>
          <MenuItem value="lastName_asc">Last Name (A-Z)</MenuItem>
          <MenuItem value="lastName_desc">Last Name (Z-A)</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <Typography>Loading users...</Typography>
      ) : sortedUsers.length > 0 ? (
        <Grid container spacing={2}>
          {sortedUsers.map((user) => (
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
