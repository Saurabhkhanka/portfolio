import React from 'react'
import { Link , NavLink} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Headder = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top" style={{height:"10vh"}}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">DEV-STREET</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav text-center align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/projects">Projects</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/skills">Skills</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
              </>
            )}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link text-warning fw-semibold" to="/admin">Dashboard</NavLink>
              </li>
            )}
            {user ? (
              <li className="nav-item ms-lg-2">
                <button className="btn btn-outline-danger btn-sm px-3 mt-2 mt-lg-0" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item ms-lg-2">
                <NavLink className="btn btn-outline-primary btn-sm px-3 mt-2 mt-lg-0 text-white" to="/login">Login</NavLink>
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
