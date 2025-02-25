import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">My Portfolio</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/data">Fetch Data</Link>
        <Link to="/skills">Skills</Link>
      </div>
    </nav>
  );
};

export default Navbar;