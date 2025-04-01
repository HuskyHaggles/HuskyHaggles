// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "@fontsource/montserrat";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDetails from "./pages/UserDetails";
import AddListing from "./pages/AddListing";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

// Routes wrapper that keys on location.pathname for transitions
const AppRoutes = () => {
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
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
