// src/pages/Users.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UsersGrid from "../components/UsersGrid";
import { supabase } from "../supabaseClient";
import { SelectChangeEvent } from "@mui/material/Select";

/**
 * User
 * Basic structure for a user object from Supabase.
 */
interface User {
  id: string;
  username: string;
  profile_picture: string;
  firstName: string;
  lastName: string;
  created_at: string;
}

/**
 * Users Page
 * Shows a list of all users, with options to sort by creation date or name.
 */
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("created_desc");

  useEffect(() => {
    document.title = "Users - Husky Haggles";
  }, []);

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

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSortBy(e.target.value);
  };

  const sortedUsers = [...users].sort((a, b) => {
    switch (sortBy) {
      case "created_desc":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "created_asc":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "firstName_asc":
        return a.firstName.localeCompare(b.firstName);
      case "firstName_desc":
        return b.firstName.localeCompare(a.firstName);
      case "lastName_asc":
        return a.lastName.localeCompare(b.lastName);
      case "lastName_desc":
        return b.lastName.localeCompare(a.lastName);
      default:
        return 0;
    }
  });

  return (
    <Container sx={{ mt: 4 }}>
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
        <UsersGrid users={sortedUsers} />
      ) : (
        <Typography>No users found.</Typography>
      )}
    </Container>
  );
};

export default Users;
