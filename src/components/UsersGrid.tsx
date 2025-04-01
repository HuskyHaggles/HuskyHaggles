// src/components/UsersGrid.tsx
import Grid from "@mui/material/Grid";
import UserCard from "./UserCard";
import { ComponentType } from "react";

interface User {
  id?: string;
  username: string;
  profile_picture: string;
  firstName: string;
  lastName: string;
  [key: string]: any;
}

interface UsersGridProps {
  users: User[];
}

// Create a typed version of Grid that includes the required props.
const DivGrid = Grid as ComponentType<{
  component: "div";
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  spacing?: number;
  children: React.ReactNode;
}>;

/**
 * UsersGrid
 * Renders a grid of user profiles using UserCard.
 */
const UsersGrid = ({ users }: UsersGridProps) => {
  return (
    <DivGrid container component="div" spacing={2}>
      {users.map((user) => (
        <DivGrid
          key={user.id || user.username}
          item
          component="div"
          xs={6}
          sm={4}
          md={3}
        >
          <UserCard user={user} />
        </DivGrid>
      ))}
    </DivGrid>
  );
};

export default UsersGrid;
