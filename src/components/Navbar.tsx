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
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
    if (isMobile) setDrawerOpen(false);
  };

  const navItems = [
    { label: "All Listings", path: "/listings" },
    { label: "Create New Listing", path: user ? "/create-listing" : "/login" },
  ];

  const authItems = user
    ? [
        {
          label: user.user_metadata?.username || user.email,
          path: `/u/${user.user_metadata?.username || user.email}`,
        },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Sign Up", path: "/signup" },
      ];

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
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => handleNav("/")}
          >
            Husky Haggles
          </Typography>

          <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
            {[...navItems, ...authItems].map((item, index) => (
              <Button
                key={index}
                color="inherit"
                onClick={() => handleNav(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
