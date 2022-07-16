import React, { Component } from 'react'
import '../styles/header.css'
import logo from '../assets/image/logo.png'
import { Link } from 'react-router-dom';

export class Header extends Component {
    handleLogout = () => {
        window.location.href= "./"
    }
    render() {
        return (
            <nav className="navbar navbar-expand-md flex-row flex-wrap navStyle">
                <div className="container">
                    <Link to="/home" className="navbar-brand navLink">
                        <img width="80" src={logo} alt=""></img>
                    </Link>
                    <button className="navbar-toggler buttonCollapse" data-bs-toggle="collapse" data-bs-target="#collapseExample">
                     <i className="fas fa-bars iconCollapse"></i>
                    </button>
                    <div className="navbar-collapse collapse" id="collapseExample">
                        <ul className="navbar-nav ms-md-auto">
                            <li className="nav-item"><Link to="/login" className="select">Back office</Link></li>
                        </ul>
                    </div>
                 </div>
            </nav>

        )
    }
}
export default Header;