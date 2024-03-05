import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file for styling

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link className='logotext' to="/">Logo</Link>
                </div>
                <div className="user-options">
                    <Link className='profile-pic' to="/">Profile</Link>
                </div>
            </div>

        </header>
    );
}

export default Header;