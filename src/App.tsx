import { useState } from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import { Navigate } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productDetails" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
