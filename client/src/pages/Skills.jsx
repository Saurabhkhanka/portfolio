import React from 'react'
import Layout from '../components/Layout/Layout'

const Skills = () => {
  return (
    <Layout>
        <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">My Skills</h2>

          {/* Frontend Skills */}
          <div className="mb-5">
            <h4 className="mb-3">Frontend</h4>
            <div className="d-flex flex-wrap gap-3">
              <span className="badge bg-primary fs-6"> <i class="ri-html5-line"></i> HTML</span>
              <span className="badge bg-primary fs-6"><i class="ri-css3-line"></i> CSS</span>
              <span className="badge bg-primary fs-6"><i class="ri-javascript-line"></i> JavaScript</span>
              <span className="badge bg-primary fs-6"> <i class="ri-reactjs-line"></i> React.js</span>
              <span className="badge bg-primary fs-6"><i class="ri-bootstrap-line"></i> Bootstrap</span>
            </div>
          </div>

          {/* Backend Skills */}
          <div className="mb-5">
            <h4 className="mb-3">Backend</h4>
            <div className="d-flex flex-wrap gap-3">
              <span className="badge bg-success fs-6"><i class="ri-nodejs-line"></i> Node.js</span>
              <span className="badge bg-success fs-6"><i class="ri-expressjs-line"></i> Express.js</span>
              <span className="badge bg-success fs-6"><i class="ri-mongo-db-line"></i> MongoDB</span>
            </div>
          </div>

          {/* Tools & Other */}
          <div className="mb-5">
            <h4 className="mb-3">Tools & Others</h4>
            <div className="d-flex flex-wrap gap-3">
              <span className="badge bg-secondary fs-6"><i class="ri-github-line"></i> Git</span>
              <span className="badge bg-secondary fs-6"><i class="ri-github-line"></i> GitHub</span>
              <span className="badge bg-secondary fs-6"><i class="ri-vscode-line"></i> VS Code</span>
              <span className="badge bg-secondary fs-6"><i class="ri-postman-line"></i> Postman</span>
              <span className="badge bg-secondary fs-6"><i class="ri-netlify-line"></i> Render</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Skills
