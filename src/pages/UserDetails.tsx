import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CardMedia,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Helmet } from "react-helmet";

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profile_picture: string;
  created_at?: string;
}

interface Listing {
  id: string;
  name: string;
  images: string[];
  price?: number;
}

const obfuscateEmail = (email: string) =>
  email.replace(/@/g, " [at] ").replace(/\./g, " [dot] ");

const UserDetails: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!username) return;
      const { data, error } = await supabase
        .from("users")
        .select(
          "id, username, email, firstName, lastName, profile_picture, created_at"
        )
        .eq("username", username)
        .single();
      if (error) {
        console.error("Error fetching user details:", error.message);
      } else {
        setUser(data);
      }
    };
    fetchUserDetails();
  }, [username]);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("listings")
        .select("id, name, images, price")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching user listings:", error.message);
      } else {
        setListings(data || []);
      }
      setLoading(false);
    };
    fetchUserListings();
  }, [user]);

  return (
    <>
      <Helmet>
        <title>
          {user
            ? `${user.firstName} ${user.lastName} (@${user.username}) - Husky Haggles`
            : "User Details - Husky Haggles"}
        </title>
      </Helmet>
      <Container sx={{ mt: 4 }}>
        {user ? (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box
                component="img"
                src={user.profile_picture || "https://via.placeholder.com/150"}
                alt={user.username}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "8px",
                  objectFit: "cover",
                  objectPosition: "center",
                  mr: 2,
                }}
              />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  @{user.username}
                </Typography>
                <Typography variant="body2">
                  {obfuscateEmail(user.email)}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate("/users")}
              sx={{ mb: 2 }}
            >
              Back to Users
            </Button>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {user.firstName}'s Listings
            </Typography>
            {loading ? (
              <Typography>Loading listings...</Typography>
            ) : (
              <Grid container spacing={2}>
                {listings.map((listing) => (
                  <Grid item xs={12} sm={6} md={4} key={listing.id}>
                    <Paper
                      sx={{ p: 2, cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/u/${user.username}/${listing.id}`)
                      }
                    >
                      {listing.images?.length > 0 ? (
                        <CardMedia
                          component="img"
                          image={listing.images[0]}
                          alt={listing.name}
                          sx={{
                            height: 150,
                            objectFit: "cover",
                            objectPosition: "center",
                            mb: 1,
                          }}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          image="https://via.placeholder.com/300x150?text=No+Image"
                          alt="No Image Available"
                          sx={{
                            height: 150,
                            objectFit: "cover",
                            objectPosition: "center",
                            mb: 1,
                          }}
                        />
                      )}
                      <Typography variant="h6">{listing.name}</Typography>
                      {listing.price && (
                        <Typography variant="body2" color="text.secondary">
                          Price: ${listing.price}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        ) : (
          <Typography>User not found.</Typography>
        )}
      </Container>
    </>
  );
};

export default UserDetails;
