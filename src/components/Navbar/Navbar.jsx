// import {NavLink} from 'react-dom-router'
import './Navbar.css'


function NavBar(){


    return(
        <nav>
            <div className='nav-container'>
                <ul>
                    <li>Home</li>
                    <li>Search</li>
                    <li>Login</li>
                    <li>Register</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;