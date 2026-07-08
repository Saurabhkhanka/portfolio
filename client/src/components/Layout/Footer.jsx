import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Footer = () => {
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

  return (
    <footer className="custom-footer mt-auto">
      <div className="container">
        <div className="row g-4">

          {/* About Section */}
          <div className="col-lg-4 col-md-6">
            <Link className="navbar-brand-custom footer-logo mb-3" to="/">
              <i className="ri-terminal-box-line me-2"></i>
              DEV-STREET
            </Link>
            <p className="footer-text">
              The intersection of creativity & code. Dedicated to building high-performance, modern, and engaging web and mobile applications.
            </p>
          </div>

          {/* Quick NavLinks */}
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links-list">
              <li><a href="#hero-section" onClick={(e) => handleNavClick(e, 'hero-section')} className="footer-link-custom"><i className="ri-arrow-right-s-line"></i> Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="footer-link-custom"><i className="ri-arrow-right-s-line"></i> About</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="footer-link-custom"><i className="ri-arrow-right-s-line"></i> Projects</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="footer-link-custom"><i className="ri-arrow-right-s-line"></i> Contact</a></li>
              <li><Link to="/admin" className="footer-link-custom text-warning"><i className="ri-arrow-right-s-line text-warning"></i> Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-heading">Let's Connect</h5>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <i className="ri-mail-line"></i>
              </div>
              <span className="footer-text">saurabhkhanka222@gmail.com</span>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <i className="ri-phone-line"></i>
              </div>
              <span className="footer-text">+91 95821 11994</span>
            </div>
            
            <div className="footer-social-wrapper">
              <a href="https://github.com/Saurabhkhanka" target="_blank" rel="noopener noreferrer" className="footer-social-pill github">
                <i className="ri-github-fill"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-pill linkedin">
                <i className="ri-linkedin-fill"></i>
              </a>
              <a href="mailto:saurabhkhanka222@gmail.com" className="footer-social-pill email">
                <i className="ri-mail-fill"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center footer-bottom">
          <p className="mb-0">&copy; {new Date().getFullYear()} Saurabh Singh Khanka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
