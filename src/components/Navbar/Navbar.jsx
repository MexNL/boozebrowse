import './Navbar.css'
import {Link, NavLink} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);

    return (
        <nav>
            <div className='nav-container'>
                <Link to='/'>
                    <span className='title-container'>
                        <img src='src/assets/logo.png' alt='logo'/>
                        <h1>Boozebrowse</h1>
                    </span>
                </Link>

                <div className='pages-container'>
                    <ul>
                        <li><NavLink to="/"><h3>Home</h3></NavLink></li>
                        <li><NavLink to="/searchpage"><h3>Search</h3></NavLink></li>

                        {!isAuth ? (
                            <>
                                <li><NavLink to="/loginpage"><h3>Login</h3></NavLink></li>
                                <li><NavLink to="/registerpage"><h3>Register</h3></NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/profile"><h3>Profile</h3></NavLink></li>
                                <li><button className="logoutButton" onClick={logout}><h3>Logout</h3></button></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <hr/>
        </nav>
    )
}

export default NavBar;
