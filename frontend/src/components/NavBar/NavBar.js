import "./NavBar.css";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NavBar() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        history.replace('/');
    }


    return (
        <div className="nav-bar">
            <div className="nav-bar-left">
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
                { user ? 
                    <Link to='/explore' id='left-explore'>Explore</Link> : null
                }
            </div>
            <div className="nav-bar-right">
                { user ? 
                <>
                    <a href='#' id='itinerary-button'>ITINERARY</a>
                    <a href='#' id='logout-button' onClick={handleLogout} >LOG OUT</a> 
                </> : 
                <>
                    <Link to='/explore'>Explore</Link>
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
                }
            </div>
        </div>
    )
}

export default NavBar;