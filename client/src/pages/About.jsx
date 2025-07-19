import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout>
        {/* About Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Profile Image */}
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt="Saurabh Singh Khanka"
                className="img-fluid rounded-circle shadow"
                style={{ maxWidth: '250px' }}
              />
            </div>

            {/* Text Content */}
            <div className="col-md-8">
              <h2 className="mb-3">About Me</h2>
              <p>
                Hello! I'm <strong>Saurabh Singh Khanka</strong>, a Full Stack Developer passionate about crafting responsive web applications using modern technologies like React, Node.js, and MongoDB.
              </p>
              <p>
                I have a strong foundation in computer science and love solving real-world problems through code. I'm constantly exploring new tools and frameworks to improve my development workflow.
              </p>
              <p>
                When I'm not coding, I enjoy reading tech blogs, learning new skills, and playing basketball.
              </p>
            </div>
          </div>

          {/* Optional: Add education or experience */}
          <div className="mt-5">
            <h3 className="mb-3">My Background</h3>
            <ul>
              <li><strong>Education:</strong> MCA in AI & ML from XYZ University</li>
              <li><strong>Specialization:</strong> Full Stack Development, Machine Learning</li>
              <li><strong>Tools:</strong> Git, GitHub, VS Code, Postman, Firebase</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About