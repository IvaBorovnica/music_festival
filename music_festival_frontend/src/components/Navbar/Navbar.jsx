import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ role, isLoggedIn }) => {
  return (
    <div className="navbar">
      {isLoggedIn ? <div className="left-links">
        {/* <Link to={'setlist'}>Setlist</Link> */}
        {/* <div className="link-box"><Link to={'concerts'}>Concerts</Link></div> */}
        <Link to={'concerts'}><button className="nav-btn">Concerts</button></Link>
        {role === 'USER' && <Link to={'tickets'}><button className="nav-btn">Tickets</button></Link>}
        <Link to={'bands'}><button className="nav-btn">Bands</button></Link>
        {role === 'ADMIN' && <Link to={'newBand'}><button className="nav-btn">Add a band</button></Link>}
        {role === 'ADMIN' && <Link to={'analytics'}><button className="nav-btn">Analytics</button></Link>}
        {/* <Link to={'concerts'}><button>Concerts</button></Link>
        <Link to={'concerts'}>Concerts</Link>
        <Link to={'tickets'}>Tickets</Link>
        <Link to={'bands'}>Bands</Link>
        <Link to={'newBand'}>Add a band</Link> */}
        <div className="right-links">
        <Link to={'login'}>Logout</Link>
      </div>
      </div> :
      <div className="right-links">
        <Link to={'login'}>Login</Link>
        <Link to={'register'}>Register</Link>
      </div>}
    </div>
  );
}

export default Navbar;
