import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-auto fixed-desktop">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>Saurabh's Portfolio</h5>
            <p className=" ">
              A full-stack developer passionate about building clean & user-friendly web apps.
            </p>
          </div>

          {/* Quick NavLinks */}
          <div className="col-md-4 mb-3">
            <h5>Quick NavLinks</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/projects" className="text-light text-decoration-none">Projects</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p className=" mb-1">Email: saurabhkhanka222@gmail.com</p>
            <p className=" mb-0">Phone: +91 95821 11994</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center pt-3 border-top border-secondary mt-3">
          <small className="">&copy; {new Date().getFullYear()} Saurabh Singh Khanka. All rights reserved.</small>
        </div>
      </div>
    </footer>

  )
}

export default Footer