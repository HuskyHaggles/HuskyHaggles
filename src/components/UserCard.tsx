// components/UserCard.tsx
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
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${user.username}`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 200,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: 1,
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{ width: "100%", height: "100%" }}
      >
        <Box
          component="img"
          src={user.profile_picture || "https://via.placeholder.com/150"}
          alt={user.username}
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            mb: 1,
          }}
        />
        <CardContent sx={{ p: 1 }}>
          <Typography variant="h6" align="center">
            {user.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
