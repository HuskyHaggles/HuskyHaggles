// src/components/UserCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
  id?: string;
  username: string;
  profile_picture: string;
  firstName: string;
  lastName: string;
}

interface UserCardProps {
  user: User;
}

/**
 * UserCard
 * Renders basic info about a user, linking to their profile on click.
 */
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/u/${user.username}`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 220,
        height: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: 1,
        p: 1,
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={user.profile_picture || "https://via.placeholder.com/150"}
          alt={user.username}
          sx={{
            width: 120,
            height: 120,
            borderRadius: "8px",
            objectFit: "cover",
            objectPosition: "center",
            mb: 1,
          }}
        />
        <CardContent sx={{ p: 0, textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            @{user.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
