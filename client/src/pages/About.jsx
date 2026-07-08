import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <section className="about-section" id="about">
        <div className="container mt-4">
          
          {/* Main Card Wrapper */}
          <div className="about-card-glass mb-5">
            <div className="row align-items-center g-5">
              
              {/* Profile Avatar Icon Column */}
              <div className="col-lg-4 text-center">
                <div className="about-avatar-container">
                  <div className="about-avatar-spinner"></div>
                  <div className="about-avatar-icon-box">
                    <i className="ri-code-s-slash-line"></i>
                  </div>
                </div>
              </div>

              {/* Description Column */}
              <div className="col-lg-8">
                <h2 className="welcome-title text-start mb-2">About Me</h2>
                <div className="welcome-line ms-0 mb-4" style={{ width: '50px' }}></div>
                
                <p className="about-paragraph">
                  Hello! I'm <strong>Saurabh Singh Khanka</strong>, a Full Stack Developer. I love building fast, secure, and user-friendly web and mobile applications using modern tools like <strong>React, Next.js, Node.js, Express, MongoDB, and MySQL</strong>.
                </p>
                <p className="about-paragraph">
                  I specialize in creating clean user interfaces using <strong>Redux Toolkit</strong>, as well as mobile apps using <strong>React Native</strong>. On the backend, I write secure APIs with user logins, role controls, and email notification services.
                </p>
                <p className="about-paragraph">
                  I enjoy writing clean code with <strong>TypeScript</strong>, managing projects with <strong>Git & GitHub</strong>, containerizing applications with <strong>Docker</strong>, setting up automated <strong>GitHub Actions (CI/CD)</strong> pipelines, and deploying websites directly to <strong>Render</strong>.
                </p>
                <p className="about-paragraph mb-0">
                  When I'm not coding, you can find me reading tech blogs to keep up with industry trends, exploring open-source projects, or playing basketball.
                </p>
              </div>
            </div>
          </div>

          {/* Background Sections Rendered as cards */}
          <div className="row g-4 justify-content-center">
            {/* Education Info Card */}
            <div className="col-lg-4 col-md-6">
              <div className="info-card-custom">
                <div className="info-card-icon-box bg-blue">
                  <i className="ri-graduation-cap-line"></i>
                </div>
                <h5 className="info-card-title">Education</h5>
                <p className="info-card-text">
                  <strong>MCA in AI & ML</strong>
                  <br />
                  Amity University
                </p>
              </div>
            </div>

            {/* Specialization Info Card */}
            <div className="col-lg-4 col-md-6">
              <div className="info-card-custom">
                <div className="info-card-icon-box bg-cyan">
                  <i className="ri-terminal-window-line"></i>
                </div>
                <h5 className="info-card-title">Specialization</h5>
                <p className="info-card-text">
                  Full Stack Development, Backend Development, Frontend Development
                </p>
              </div>
            </div>

            {/* Tools Info Card */}
            <div className="col-lg-4 col-md-6">
              <div className="info-card-custom">
                <div className="info-card-icon-box bg-purple">
                  <i className="ri-tools-line"></i>
                </div>
                <h5 className="info-card-title">Development Tools</h5>
                <p className="info-card-text">
                  Git, GitHub, Docker, GitHub Actions (CI/CD), VS Code, Postman
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
  )
}

export default About
