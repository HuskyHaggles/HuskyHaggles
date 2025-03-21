// UserDetails.tsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface User {
  id: string;
  username: string;
  profile_picture: string;
  email: string;
  created_at: string;
  firstName: string;
  lastName: string;
}

const UserDetails: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          "id, username, profile_picture, email, created_at, firstName, lastName"
        )
        .eq("username", username)
        .single();

      if (error) {
        console.error("Error fetching user details:", error);
      } else {
        setUser(data);
      }
      setLoading(false);
    };

    if (username) {
      fetchUserDetails();
    }
  }, [username]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading user details...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>User not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          component="img"
          src={user.profile_picture || "https://via.placeholder.com/150"}
          alt={user.username}
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            mr: 2,
          }}
        />
        <Box>
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
        </Box>
      </Box>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body2">
        Joined: {new Date(user.created_at).toLocaleDateString()}
      </Typography>
    </Container>
  );
};

export default UserDetails;
