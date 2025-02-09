import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div id="Navbar">
      <Link to="/home" id="Home">
        Home
      </Link>
      <br />
      <Link to="/about" id="About">
        About
      </Link>
      <br />
      <Link to="/cart" id="Cart">
        Cart
      </Link>
      <br />
    </div>
  );
}
