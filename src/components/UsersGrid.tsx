// src/components/UsersGrid.tsx
import React from "react";
import { Grid } from "@mui/material";
import UserCard from "./UserCard";

interface User {
  id?: string;
  [key: string]: any;
}

interface UsersGridProps {
  users: User[];
}

/**
 * UsersGrid
 * Renders a grid of user profiles using UserCard.
 */
const UsersGrid: React.FC<UsersGridProps> = ({ users }) => {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item key={user.id || user.username} xs={6} sm={4} md={3}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UsersGrid;
