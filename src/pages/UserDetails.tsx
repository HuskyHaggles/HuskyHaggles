// pages/UserDetails.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
  created_at?: string;
}

const obfuscateEmail = (email: string) =>
  email.replace(/@/g, " [at] ").replace(/\./g, " [dot] ");

const UserDetails: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("date_desc");
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
        .select("id, name, images, price, created_at")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching user listings:", error.message);
      } else {
        let sorted = data || [];
        if (sortBy === "date_desc") {
          sorted = sorted.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
        } else if (sortBy === "date_asc") {
          sorted = sorted.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
        } else if (sortBy === "price_asc") {
          sorted = sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price_desc") {
          sorted = sorted.sort((a, b) => b.price - a.price);
        }
        setListings(sorted);
      }
      setLoading(false);
    };
    fetchUserListings();
  }, [user, sortBy]);

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h5">{user.firstName}'s Listings</Typography>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  label="Sort By"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="date_desc">Newest First</MenuItem>
                  <MenuItem value="date_asc">Oldest First</MenuItem>
                  <MenuItem value="price_asc">Price (Low to High)</MenuItem>
                  <MenuItem value="price_desc">Price (High to Low)</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
                        <Box
                          component="img"
                          src={listing.images[0]}
                          alt={listing.name}
                          sx={{
                            width: "100%",
                            height: 150,
                            objectFit: "cover",
                            objectPosition: "center",
                            mb: 1,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: 150,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "grey.200",
                            mb: 1,
                          }}
                        >
                          <Typography>No Image</Typography>
                        </Box>
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
