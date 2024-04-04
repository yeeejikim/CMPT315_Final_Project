
import React from "react";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <p><Link to="/manager">Manager</Link></p>
      <p><Link to="/login">Customer</Link></p>
    </div>
  );
};

export default LandingPage