import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Headder = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand-custom" to="/">
            <i className="ri-terminal-box-line me-2"></i>
            DEV-STREET
          </Link>
          <button
            className="navbar-toggler navbar-toggler-custom"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav text-center align-items-center">
              <li className="nav-item">
                <a className="nav-link nav-link-custom animate-hover" href="#hero-section" onClick={(e) => handleNavClick(e, 'hero-section')}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom animate-hover" href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom animate-hover" href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom animate-hover" href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom animate-hover" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Headder
