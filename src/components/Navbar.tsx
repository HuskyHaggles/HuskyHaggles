// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  Divider,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

/**
 * Navbar
 * Displays the top navigation bar with links to Home, Listings, Users, etc.
 */
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // The logged-in user object from Supabase Auth
  const [user, setUser] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // On mount, check for an existing logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setUser(data.user);
      }
    };
    fetchUser();

    // Optionally, also listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  // Common navigation function
  const handleNav = (path: string) => {
    navigate(path);
    if (isMobile) setDrawerOpen(false);
  };

  // Navigation items for all users
  const navItems = [
    { label: "Browse Listings", path: "/listings" },
    { label: "View Users", path: "/users" },
    // If user is logged in, go to /add_listing, otherwise /login
    { label: "Add Listing", path: user ? "/add_listing" : "/login" },
  ];

  // If user is logged in, show @username → /u/username
  // Else show Login/Sign Up
  const authItems = user
    ? [
        {
          label: "@" + (user.user_metadata?.username ?? "yourusername"),
          path: "/u/" + (user.user_metadata?.username ?? "yourusername"),
        },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Sign Up", path: "/signup" },
      ];

  // Determine if a button is "active"
  const getButtonSx = (itemPath: string, label: string) => {
    const isActive =
      label === "Add Listing"
        ? location.pathname === "/add_listing"
        : location.pathname.startsWith(itemPath);

    return {
      transition: "transform 0.2s, backgroundColor: 0.2s",
      backgroundColor: isActive ? "rgba(0, 0, 0, 0.3)" : "transparent",
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    };
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(45deg, #f093fb, #f5576c)" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s, text-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              },
            }}
            onClick={() => handleNav("/")}
          >
            Husky Haggles
          </Typography>

          {/* Right side navigation buttons */}
          <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
            {[...navItems, ...authItems].map((item, index) => (
              <Button
                key={`${item.label}-${index}`}
                color="inherit"
                onClick={() => handleNav(item.path)}
                sx={getButtonSx(item.path, item.label)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Optional Drawer for Mobile (Hamburger menu) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250, bgcolor: "#fff" }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            <ListItemButton onClick={() => handleNav("/")}>
              <ListItemText primary="Home" />
            </ListItemButton>
            <Divider />
            {navItems.map((item, index) => (
              <ListItemButton
                key={`${item.label}-${index}`}
                onClick={() => handleNav(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <Divider />
            {authItems.map((item, index) => (
              <ListItemButton
                key={`${item.label}-${index}`}
                onClick={() => handleNav(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
