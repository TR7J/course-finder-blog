import React from "react";
import {Link} from 'react-router-dom'
import './navbar.css'

export default function Navbar(){
    
    return(
        <div>
            <nav className="nav">
                <ul className='nav-ul'>
                    <li><Link to={'/CreatePost'} className='nav-links'>Create Blog</Link></li>
                    <li><Link to={'/'} className='nav-links'>Home</Link></li>
                    <li><Link to={'/LogIn'} className="nav-links">Log In</Link></li>
                    <li><Link to={'/Signup'} className='nav-links'>Sign Up</Link></li>
                </ul>
            </nav>
        </div>
    )
}