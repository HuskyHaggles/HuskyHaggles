import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<Users />} />
        <Route path="/u/:username" element={<UserDetails />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/u/:username/:listing_uuid" element={<ListingDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
