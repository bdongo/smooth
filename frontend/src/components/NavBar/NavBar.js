import "./NavBar.css";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <div className="nav-bar">
            <div className="nav-bar-left">
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="nav-bar-right">
                <Link to='/explore'>Explore</Link>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default NavBar;