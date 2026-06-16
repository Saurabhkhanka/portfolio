import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="hero-title">Hi, I'm Saurabh</h1>
          <p className="hero-subtitle">Full Stack Developer | MERN Stack Enthusiast</p>
          <div className="hero-buttons mt-4">
            <Link to="/projects" className="btn-hero-primary mx-2 text-decoration-none">My Projects</Link>
            <Link to="/contact" className="btn-hero-outline mx-2 text-decoration-none">Contact Me</Link>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="welcome-section">
        <div className="container">
          <h2 className="welcome-title">Welcome to My Portfolio</h2>
          <div className="welcome-line"></div>
          <p className="text-muted lead mx-auto fs-5" style={{ maxWidth: '650px' }}>
            Explore my work, technical skill sets, and projects, or get in touch directly to collaborate.
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="home-cards-section">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {/* About Me Card */}
            <div className="col-lg-3 col-md-6 col-sm-10">
              <Link to="/about" className="nav-card-link">
                <div className="nav-card card-about">
                  <div className="nav-card-icon-wrapper">
                    <i className="ri-user-3-line"></i>
                  </div>
                  <h4 className="nav-card-title">About Me</h4>
                  <p className="nav-card-text">Know more about my educational background, experience, and interests.</p>
                  <div className="nav-card-action mt-auto">
                    Explore Profile <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </Link>
            </div>

            {/* Skills Card */}
            <div className="col-lg-3 col-md-6 col-sm-10">
              <Link to="/skills" className="nav-card-link">
                <div className="nav-card card-skills">
                  <div className="nav-card-icon-wrapper">
                    <i className="ri-braces-line"></i>
                  </div>
                  <h4 className="nav-card-title">My Skills</h4>
                  <p className="nav-card-text">Explore the full range of technologies, languages, and tools I specialize in.</p>
                  <div className="nav-card-action mt-auto">
                    View Skills <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </Link>
            </div>

            {/* Projects Card */}
            <div className="col-lg-3 col-md-6 col-sm-10">
              <Link to="/projects" className="nav-card-link">
                <div className="nav-card card-projects">
                  <div className="nav-card-icon-wrapper">
                    <i className="ri-folder-open-line"></i>
                  </div>
                  <h4 className="nav-card-title">Projects</h4>
                  <p className="nav-card-text">Browse through my portfolio of responsive web applications and live demos.</p>
                  <div className="nav-card-action mt-auto">
                    See My Work <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </Link>
            </div>

            {/* Contact Card */}
            <div className="col-lg-3 col-md-6 col-sm-10">
              <Link to="/contact" className="nav-card-link">
                <div className="nav-card card-contact">
                  <div className="nav-card-icon-wrapper">
                    <i className="ri-mail-send-line"></i>
                  </div>
                  <h4 className="nav-card-title">Contact Me</h4>
                  <p className="nav-card-text">Get in touch to collaborate on projects, discuss opportunities, or connect.</p>
                  <div className="nav-card-action mt-auto">
                    Let's Connect <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home