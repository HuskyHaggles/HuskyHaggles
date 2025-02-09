import { useState } from "react";
import Footer from "./components/Footer";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/productDetails"
              element={<Navigate to="ProductDetails" />}
            />
          </Routes>
        </div>
      </HashRouter>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
