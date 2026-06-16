import React, { useState, useEffect } from 'react'
import { Link , NavLink} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Headder = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

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
                <NavLink className="nav-link nav-link-custom" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link nav-link-custom" to="/about">About</NavLink>
              </li>
              {user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link nav-link-custom" to="/projects">Projects</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link nav-link-custom" to="/skills">Skills</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link nav-link-custom" to="/contact">Contact</NavLink>
                  </li>
                </>
              )}
              {user && user.role === 'admin' && (
                <li className="nav-item">
                  <NavLink className="nav-link nav-link-custom text-warning fw-semibold" to="/admin">Dashboard</NavLink>
                </li>
              )}
              {user ? (
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <button className="btn-nav-logout" onClick={logout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <NavLink className="btn-nav-login" to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Headder
