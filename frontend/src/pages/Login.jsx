import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {


    const [name, setName] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser))
      }
    }, []);
  
    // login the user
    const handleSubmit = async e => {
      e.preventDefault();
      const response = await axios.get(`/customers/?search=${name}`);
      setUser(JSON.stringify(response.data[0]));
      localStorage.setItem('user', JSON.stringify(response.data[0]));
    };
    
    if (user) {
      return navigate("/restaurants");
    }

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              value={name}
              placeholder="enter a username"
              onChange={({ target }) => setName(target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      );
    
};

export default Login;