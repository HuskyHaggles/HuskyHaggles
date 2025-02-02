import { Link } from "react-router-dom";
export default function Navbar(){
    return(
    <div id = "Navbar">
     <Link to="/Home" id="Home">Home</Link><br/>
     <Link to="/About" id="Home">Home</Link><br/>
     <Link to="/Cart" id="Home">Home</Link><br/>
    </div>
    )
}