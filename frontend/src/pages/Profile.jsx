import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import logo from '../header-component/logo.png';
import list from '../header-component/left-chevron.png';

const Profile = () => {

    const [user, setUser] = useState();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          setUser(JSON.parse(loggedInUser))
        }
      }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        const profileMenu = document.querySelector(".profile-button");
        if (profileMenu && !profileMenu.contains(event.target)) {
            setShowProfileMenu(false);
        }
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    if (user) {
    return (
    <main className="content">
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link className="logoimage" to="/restaurants">
                        <img src={logo} width={70}/>
                    </Link>
                </div>
                <div className="user-options">
                    <img src = {list} className='profile-button' width = {50} onClick={toggleProfileMenu} />
                    <div className={`profile-menu ${showProfileMenu ? 'show' : ''}`}>
                        <div className="profile-links">
                            {/* <Link to="/manager">Manager</Link> */}
                            <Link to="/profile">Profile</Link>
                            <Link to="/cart">Cart</Link>
                            <Link to="/orders">Orders</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div>
        <p>Hey, {user.cust_name}</p>
        </div>
        </main>
    );
    };
    return (
        <div>
            <Link to="/manager">Manager</Link>
            <Link to="/restaurants">Customer</Link>
        </div>
    );
};

export default Profile