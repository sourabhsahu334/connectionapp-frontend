import React, { useState,useEffect } from 'react';
import './navbar.css'; // Import your custom CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [navbarBackground, setNavbarBackground] = useState('transparent');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100; // Adjust this value to control when the background color changes
      const newNavbarBackground = scrollY > threshold ? 'rgba(0,0,0,.2)' : 'transparent';
      setNavbarBackground(newNavbarBackground);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`} style={{ backgroundColor: navbarBackground }}>
      {/* <div className="navbar-brand">
        <img style={{height:"70px"}} src="" alt='LOGO'/>
      </div> */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
      <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
      </ul>
    </nav>
  );
};

export default Navbar;
