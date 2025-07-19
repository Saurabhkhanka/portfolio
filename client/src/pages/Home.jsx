import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Hi, I'm Saurabh</h1>
          <p className="lead">Full Stack Developer | MERN Stack Enthusiast</p>
          <div className="mt-4">
            <Link to="/projects" className="btn btn-primary mx-2">My Projects</Link>
            <Link to="/contact" className="btn btn-outline-light mx-2">Contact Me</Link>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-3">Welcome to My Portfolio</h2>
          <p className="text-muted">Explore my work, skills, and get in touch.</p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-sm-6">
              <Link to="/about" className="text-decoration-none text-dark">
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">About Me</h5>
                    <p className="card-text">Know more about my background.</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6">
              <Link to="/skills" className="text-decoration-none text-dark">
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">Skills</h5>
                    <p className="card-text">Tech stack and tools I use.</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6">
              <Link to="/projects" className="text-decoration-none text-dark">
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">Projects</h5>
                    <p className="card-text">Check out my recent work.</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6">
              <Link to="/contact" className="text-decoration-none text-dark">
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">Contact</h5>
                    <p className="card-text">Let's connect and collaborate!</p>
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