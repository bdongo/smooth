import "./NavBar.css";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRoute } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

export const openItinerary = () => {
    const itinerary = document.querySelector('.itinerary');
    itinerary.style.translate = '0%';
}

export const closeItinerary = () => {
    const itinerary = document.querySelector('.itinerary');
    itinerary.style.translate = '100%';
}

function NavBar() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        closeSideMenu();
        history.replace('/');
    }

    const openSideMenu = () => {
        const sideNav = document.querySelector('.side-nav');
        sideNav.style.translate = '0%';
        const sideNavBackground = document.getElementById('side-nav-background');
        sideNavBackground.style.display = 'block';
    }

    const closeSideMenu = () => {
        const sideNav = document.querySelector('.side-nav');
        sideNav.style.translate = '-100%';
        const sideNavBackground = document.getElementById('side-nav-background');
        sideNavBackground.style.display = 'none';
    }

    return (
        <div className="nav-bar">
            <div id='side-nav-background' />
                <div className="hamburger-menu">
                    <GiHamburgerMenu id='burger-icon' onClick={openSideMenu}/>
                    <div className='side-nav'>
                        <IoCloseSharp id='close-icon' onClick={closeSideMenu}/>
                        <Link to='/explore' className='burger-buttons' onClick={closeSideMenu}>Explore</Link>
                        { user ? 
                            <>
                            <button id='logout-button' onClick={handleLogout}>LOG OUT</button> 
                            </> :
                            <>
                            <Link to="/login" className='burger-buttons' onClick={closeSideMenu}>Log In</Link>
                            <Link to="/signup" className='burger-buttons' onClick={closeSideMenu}>Sign Up</Link>
                            </>
                      }
                    </div>
                </div>
            <div className="nav-bar-left">
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="nav-bar-right">
                { user ? 
                <>
                    <Link to='/explore' className='right-nav-buttons'>Explore</Link>
                    <button id='itinerary-button'>ITINERARY</button>
                    <button id='logout-button' onClick={handleLogout} className='right-nav-buttons'>LOG OUT</button> 
                    <FaRoute id='it-icon' />
                </> : 
                <>
                    <Link to='/explore' className='right-nav-buttons'>Explore</Link>
                    <button id='itinerary-button' onClick={openItinerary}>ITINERARY</button>
                    <Link to="/login" className='right-nav-buttons'>Log In</Link>
                    <Link to="/signup" className='right-nav-buttons'>Sign Up</Link>
                    <FaRoute id='it-icon' />
                </>
                }
            </div>
            <div className='itinerary'>
                <IoCloseSharp id='close-it' onClick={closeItinerary} />

            </div>
        </div>
    )
}

export default NavBar;