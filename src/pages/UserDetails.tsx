// src/pages/UserDetails.tsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ListingsGrid from "../components/ListingsGrid";
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
  // The 'users' object will be populated so ListingCard can route properly
  users?: {
    username: string;
    firstName: string;
    lastName: string;
    profile_picture: string;
  };
}

/**
 * Obfuscate an email for privacy
 */
const obfuscateEmail = (email: string) =>
  email.replace(/@/g, " [at] ").replace(/\./g, " [dot] ");

/**
 * UserDetails Page
 * Shows the user’s profile info, plus the user’s listings.
 */
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
      } else if (data) {
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
        // UPDATED query to also select the user relationship
        .select(
          `
          id,
          name,
          images,
          price,
          created_at,
          users (
            username,
            firstName,
            lastName,
            profile_picture
          )
        `
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching user listings:", error.message);
      } else if (data) {
        // Flatten any array in 'users' if Supabase returns an array
        let listingsData = data.map((listing: any) => {
          return {
            ...listing,
            users:
              listing.users &&
              Array.isArray(listing.users) &&
              listing.users.length > 0
                ? listing.users[0]
                : listing.users,
          };
        });

        // Sort after flattening
        switch (sortBy) {
          case "date_desc":
            listingsData.sort(
              (a: Listing, b: Listing) =>
                new Date(b.created_at!).getTime() -
                new Date(a.created_at!).getTime()
            );
            break;
          case "date_asc":
            listingsData.sort(
              (a: Listing, b: Listing) =>
                new Date(a.created_at!).getTime() -
                new Date(b.created_at!).getTime()
            );
            break;
          case "price_asc":
            listingsData.sort(
              (a: Listing, b: Listing) => (a.price ?? 0) - (b.price ?? 0)
            );
            break;
          case "price_desc":
            listingsData.sort(
              (a: Listing, b: Listing) => (b.price ?? 0) - (a.price ?? 0)
            );
            break;
          default:
            break;
        }
        setListings(listingsData);
      }
      setLoading(false);
    };
    fetchUserListings();
  }, [user, sortBy]);

  useEffect(() => {
    if (user) {
      document.title = `${user.firstName} ${user.lastName} (@${user.username}) - Husky Haggles`;
    } else {
      document.title = "User Details - Husky Haggles";
    }
  }, [user]);

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>User not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
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
          <Typography variant="body2">{obfuscateEmail(user.email)}</Typography>
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
        <ListingsGrid listings={listings} />
      )}
    </Container>
  );
};

export default UserDetails;
