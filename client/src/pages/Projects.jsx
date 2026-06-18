import React from 'react'
import Layout from '../components/Layout/Layout'




const Projects = () => {

  const projects = [
    {
      title: 'College Canteen Automation System',
      description: 'A secure, production-ready full-stack food ordering platform featuring a Backend-for-Frontend (BFF) secure cookie auth architecture, atomic stock controls, and automated email receipts.',
      liveLink: 'https://canteen-psi-three.vercel.app/',
      githubLink: 'https://github.com/Saurabhkhanka/canteen',
      icon: 'ri-restaurant-line',
      image: '/projects/canteen.png',
      tech: 'Next.js, Node.js & MongoDB'
    },
    {
      title: 'Weather Forecast Portal',
      description: 'A responsive weather forecast web app showing real-time atmospheric updates and predictions with dynamic visual states.',
      liveLink: 'https://weather-forecast-srsb.onrender.com',
      githubLink: 'https://github.com/Saurabhkhanka/weather',
      icon: 'ri-cloud-windy-line',
      image: '/projects/weather.png',
      tech: 'React & REST API'
    },
    {
      title: 'Gym Landing Page',
      description: 'A high-performance static fitness page featuring interactive section navigations and custom layouts built from scratch.',
      liveLink: 'https://saurabhkhanka.github.io/Fitness-/',
      githubLink: 'https://github.com/Saurabhkhanka/Fitness-',
      icon: 'ri-heart-pulse-line',
      image: '/projects/gym.png',
      tech: 'HTML5 & CSS3'
    },
    {
      title: 'Secure MERN Auth & Audit Portal',
      description: 'A robust user account service featuring secure registrations, logins, verification filters, activity logs, and an admin audit panel.',
      liveLink: '',
      githubLink: 'https://github.com/Saurabhkhanka/portfolio',
      icon: 'ri-shield-user-line',
      image: '/projects/auth.png',
      tech: 'Node.js, Express & MongoDB'
    },
    {
      title: 'Cross-Platform Fitness Native App',
      description: 'A native mobile workout tracker app with state preservation and cache-optimized sync pipelines, designed for logging training data.',
      liveLink: '',
      githubLink: 'https://github.com/Saurabhkhanka/Fitness-',
      icon: 'ri-smartphone-line',
      image: '/projects/native.png',
      tech: 'React Native & Redux Toolkit'
    }
  ];

  return (
    <Layout>
      <section className="projects-section py-5">
        <div className="container mt-4">
          <div className="text-center mb-5">
            <h2 className="welcome-title">My Projects</h2>
            <div className="welcome-line"></div>
            <p className="text-muted lead mx-auto fs-5" style={{ maxWidth: '650px' }}>
              Explore my recent client works, web applications, and landing pages built using modern development techniques.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {projects.map((project, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className={`project-card-custom proj-${index}`}>
                  <div className="project-banner-image-container">
                    <img src={project.image} alt={project.title} className="project-banner-img" />
                    <div className="project-banner-overlay">
                      <i className={project.icon}></i>
                    </div>
                    <span className="project-tech-badge">{project.tech}</span>
                  </div>
                  <div className="project-content-body">
                    <h5 className="project-title-custom">{project.title}</h5>
                    <p className="project-desc-custom">{project.description}</p>
                    <div className="mt-auto d-flex gap-2">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-project-primary">
                          <i className="ri-external-link-line"></i> Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-project-outline">
                          <i className="ri-github-fill"></i> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Projects
