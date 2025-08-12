import './Navbar.css'
import {Link, NavLink} from "react-router-dom";


function NavBar() {
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
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/searchpage">Search</NavLink></li>
                        <li><NavLink to="/loginpage">Login</NavLink></li>
                        <li><NavLink to="/registerpage">Register</NavLink></li>
                    </ul>
                </div>

            </div>
            <hr/>
        </nav>
    )

}

export default NavBar;