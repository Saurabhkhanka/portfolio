import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'

const dockerIcon = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" style={{ display: 'block' }}>
    <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.95-5.43h2.12a.19.19 0 0 0 .18-.19V3.57a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m0 2.71h2.12a.19.19 0 0 0 .18-.18V6.29a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.89c0 .1.09.18.19.18m-2.93 0h2.12a.19.19 0 0 0 .18-.18V6.29a.18.18 0 0 0-.18-.18H8.1a.18.18 0 0 0-.18.18v1.89c0 .1.08.18.18.18m-2.96 0h2.11a.19.19 0 0 0 .19-.18V6.29a.18.18 0 0 0-.19-.18H5.14a.19.19 0 0 0-.19.18v1.89c0 .1.08.18.19.18m5.89 2.72h2.12a.19.19 0 0 0 .18-.19V9.01a.19.19 0 0 0-.18-.19h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m-2.93 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H8.1a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.96 0h2.11a.18.18 0 0 0 .19-.19V9.01a.18.18 0 0 0-.18-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.08.19.19.19m-2.92 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H2.22a.18.18 0 0 0-.19.18v1.9c0 .1.08.18.19.18m21.54-1.19c-.06-.05-.67-.51-1.95-.51-.34 0-.68.03-1.01.09a3.77 3.77 0 0 0-1.72-2.57l-.34-.2-.23.33a4.6 4.6 0 0 0-.6 1.43c-.24.97-.1 1.88.4 2.66a4.7 4.7 0 0 1-1.75.42H.76a.75.75 0 0 0-.76.75 11.38 11.38 0 0 0 .7 4.06 6.03 6.03 0 0 0 2.4 3.12c1.18.73 3.1 1.14 5.28 1.14.98 0 1.96-.08 2.93-.26a12.25 12.25 0 0 0 3.82-1.4 10.5 10.5 0 0 0 2.61-2.13c1.25-1.42 2-3 2.55-4.4h.23c1.37 0 2.21-.55 2.68-1 .3-.3.55-.66.7-1.06l.1-.28Z" />
  </svg>
);

const Home = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const heroSkills = [
    { name: 'React.js', icon: 'ri-reactjs-fill', color: '#61DAFB', bg: 'rgba(97, 218, 251, 0.1)', desc: 'For building responsive and dynamic web interfaces.' },
    { name: 'JavaScript (ES6+)', icon: 'ri-javascript-fill', color: '#F7DF1E', bg: 'rgba(247, 223, 30, 0.1)', desc: 'For programming powerful client-side logic and features.' },
    { name: 'TypeScript', icon: 'ri-braces-line', color: '#3178C6', bg: 'rgba(49, 120, 198, 0.1)', desc: 'For adding scale and type safety to modern applications.' },
    { name: 'Next.js', icon: 'ri-instance-line', color: '#ffffff', bg: 'rgba(255, 255, 255, 0.1)', desc: 'For lightning-fast server-rendered React applications.' },
    { name: 'React Native', icon: 'ri-smartphone-line', color: '#0dcaf0', bg: 'rgba(13, 202, 240, 0.1)', desc: 'For building cross-platform native mobile applications.' },
    { name: 'Node.js', icon: 'ri-nodejs-fill', color: '#339933', bg: 'rgba(51, 153, 51, 0.1)', desc: 'For high-performance server-side scripting and engines.' },
    { name: 'MongoDB', icon: 'ri-database-2-fill', color: '#47A248', bg: 'rgba(71, 162, 72, 0.1)', desc: 'For scalable, flexible document-based database storage.' },
    { name: 'MySQL', icon: 'ri-database-line', color: '#00758F', bg: 'rgba(0, 117, 143, 0.1)', desc: 'For modeling relational databases and managing structured data.' },
    { name: 'Docker', icon: dockerIcon, color: '#2496ED', bg: 'rgba(36, 150, 237, 0.1)', desc: 'For containerizing applications and automating deployments.' },
    { name: 'Tailwind CSS', icon: 'ri-windy-line', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.1)', desc: 'For rapid UI design using utility-first styling classes.' }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % heroSkills.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [heroSkills.length]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section text-center text-lg-start" id="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Column: Intro */}
            <div className="col-lg-6">
              <h1 className="hero-title">
                Hi, I'm <span className="text-gradient">Saurabh</span> <span className="wave-emoji">👋</span>
              </h1>
              <p className="hero-subtitle">Full Stack Developer | React, Node.js, Next.js & React Native Specialist</p>
              <div className="hero-buttons mt-4 d-flex justify-content-center justify-content-lg-start flex-wrap gap-3">
                <a href="#projects" className="btn-hero-primary text-decoration-none">My Projects</a>
                <a 
                  href="/resume.pdf" 
                  className="btn-hero-outline text-decoration-none"
                  target="_blank" 
                  rel="noopener noreferrer"
                  download
                >
                  <i className="ri-download-line me-1"></i> Resume
                </a>
                <a href="#contact" className="btn-hero-outline text-decoration-none">Contact Me</a>
              </div>
            </div>

            {/* Right Column: Skill Showcase Animation */}
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="hero-skill-showcase-container">
                <div className="glowing-orb orb-1"></div>
                <div className="glowing-orb orb-2"></div>
                <div className="skill-card-glass">
                  <div className="skill-card-body animate-skill-content" key={currentSkillIndex}>
                    <div 
                      className="skill-icon-outer-wrapper"
                      style={{ 
                        color: heroSkills[currentSkillIndex].color, 
                        background: heroSkills[currentSkillIndex].bg,
                        boxShadow: `0 8px 30px ${heroSkills[currentSkillIndex].bg}`
                      }}
                    >
                      {typeof heroSkills[currentSkillIndex].icon === 'string' ? (
                        <i className={`${heroSkills[currentSkillIndex].icon} skill-icon-animate`}></i>
                      ) : (
                        <div className="skill-icon-animate d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          {heroSkills[currentSkillIndex].icon}
                        </div>
                      )}
                    </div>
                    <h3 className="skill-showcase-title">{heroSkills[currentSkillIndex].name}</h3>
                    <p className="skill-showcase-desc">{heroSkills[currentSkillIndex].desc}</p>
                    
                    <div className="skill-dots-wrapper">
                      {heroSkills.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`skill-dot ${idx === currentSkillIndex ? 'active' : ''}`}
                          onClick={() => setCurrentSkillIndex(idx)}
                          style={{ 
                            backgroundColor: idx === currentSkillIndex ? heroSkills[currentSkillIndex].color : 'rgba(255, 255, 255, 0.2)' 
                          }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <a href="#about" className="nav-card-link">
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
              </a>
            </div>

            {/* Skills Card */}
            <div className="col-lg-3 col-md-6 col-sm-10">
              <a href="#skills" className="nav-card-link">
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
              </a>
            </div>

            {/* Projects Card */}
            <div className="col-lg-3 col-md-6 col-sm-10">
              <a href="#projects" className="nav-card-link">
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
              </a>
            </div>

            {/* Contact Card */}
            <div className="col-lg-3 col-md-6 col-sm-10">
              <a href="#contact" className="nav-card-link">
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
              </a>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  )
}

export default Home