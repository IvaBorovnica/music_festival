import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-links">
        {/* <Link to={'setlist'}>Setlist</Link> */}
        <Link to={'concerts'}>Concerts</Link>
        <Link to={'tickets'}>Tickets</Link>
        <Link to={'bands'}>Bands</Link>
        <Link to={'newBand'}>Add a band</Link>
      </div>
      <div className="right-links">
        <Link to={'login'}>Login</Link>
        <Link to={'register'}>Register</Link>
      </div>
    </div>
  );
}

export default Navbar;
