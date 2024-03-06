import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file for styling
import { SearchBar } from '../searchbar/searchbar.component';

function Header() {

    const handleInput = e => {
        console.log(e.target.value)
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link className='logotext' to="/">Logo</Link>
                </div>
                <SearchBar
                    placeholder='Search Restaurant'
                    handleInput={handleInput}
                />
                <div className="user-options">
                    <Link className='profile-pic' to="/">Profile</Link>
                </div>
            </div>

        </header>
    );
}

export default Header;