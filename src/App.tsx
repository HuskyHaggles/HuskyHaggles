// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "@fontsource/montserrat";

/* Pages */
import Home from "./pages/Home";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDetails from "./pages/UserDetails";
import AddListing from "./pages/AddListing";

/* Global Components */
import Navbar from "./components/Navbar";

/* MUI / Theme */
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

/* If you're using react-helmet-async elsewhere, you can keep this, or remove it if not needed */
import { HelmetProvider } from "react-helmet-async";

// A wrapper to allow keyed transitions based on location.pathname
const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/users" element={<Users />} />
      <Route path="/u/:username" element={<UserDetails />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/u/:username/:listing_id" element={<ListingDetails />} />
      <Route path="/add_listing" element={<AddListing />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* If you're not using <Helmet> at all, you can remove HelmetProvider */}
      <HelmetProvider>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
