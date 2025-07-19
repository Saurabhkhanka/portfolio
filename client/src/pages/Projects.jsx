import React from 'react'
import Layout from '../components/Layout/Layout'


  

const Projects = () => {

    const projects = [
    {
      title: 'Personal Finance Tracker',
      description: 'Track your income and expenses with intuitive graphs.',
      liveLink: 'https://yourproject1.com',
      githubLink: 'https://github.com/yourusername/project1'
    },
    {
      title: 'Movie Recommendation System',
      description: 'AI-based system to recommend movies based on your taste.',
      liveLink: '',
      githubLink: 'https://github.com/yourusername/movie-recommender'
    },
    {
      title: 'E-Commerce Website',
      description: 'A full-featured shopping site using MERN Stack.',
      liveLink: 'https://yourproject2.com',
      githubLink: 'https://github.com/yourusername/project2'
    },
    // Add more projects as needed
  ];

  
  return (
    <Layout>
         <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">My Projects</h2>
          <div className="row">
            {projects.map((project, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <div className="mt-auto">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm me-2">
                          Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">
                          GitHub
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