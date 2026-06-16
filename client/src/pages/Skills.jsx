import React from 'react'
import Layout from '../components/Layout/Layout'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'JavaScript (ES6+)', icon: 'ri-javascript-fill', color: '#F7DF1E' },
        { name: 'TypeScript', icon: 'ri-braces-line', color: '#3178C6' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'React.js', icon: 'ri-reactjs-fill', color: '#61DAFB' },
        { name: 'Next.js', icon: 'ri-instance-line', color: '#111827' },
        { name: 'React Native', icon: 'ri-smartphone-line', color: '#0dcaf0' },
        { name: 'Redux Toolkit', icon: 'ri-loop-left-line', color: '#764ABC' },
        { name: 'RTK Query', icon: 'ri-git-merge-line', color: '#764ABC' },
        { name: 'HTML5', icon: 'ri-html5-fill', color: '#E34F26' },
        { name: 'CSS3', icon: 'ri-css3-fill', color: '#1572B6' },
        { name: 'Tailwind CSS', icon: 'ri-windy-line', color: '#38BDF8' }
      ]
    },
    {
      title: 'Back-End & Databases',
      skills: [
        { name: 'Node.js', icon: 'ri-nodejs-fill', color: '#339933' },
        { name: 'Express.js', icon: 'ri-terminal-box-fill', color: '#828282' },
        { name: 'MongoDB', icon: 'ri-database-2-fill', color: '#47A248' },
        { name: 'MySQL', icon: 'ri-database-line', color: '#00758F' }
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Git', icon: 'ri-git-branch-line', color: '#F05032' },
        { name: 'GitHub', icon: 'ri-github-fill', color: '#181717' },
        { name: 'VS Code', icon: 'ri-code-line', color: '#007ACC' },
        { name: 'Postman', icon: 'ri-send-plane-fill', color: '#FF6C37' },
        { name: 'NPM', icon: 'ri-npmjs-fill', color: '#CB3837' },
        { name: 'Render', icon: 'ri-cloud-line', color: '#46E3B7' }
      ]
    },
    {
      title: 'Architecture & Integration',
      skills: [
        { name: 'RESTful APIs', icon: 'ri-api-line', color: '#0d6efd' },
        { name: 'JSON', icon: 'ri-file-code-line', color: '#FF8C00' },
        { name: 'Third-Party APIs', icon: 'ri-external-link-line', color: '#198754' },
        { name: 'JWT', icon: 'ri-shield-keyhole-line', color: '#D63AFF' },
        { name: 'Bcrypt', icon: 'ri-lock-password-line', color: '#FF3366' },
        { name: 'Role-Based Access Control', icon: 'ri-user-settings-line', color: '#00C8FF' },
        { name: 'Nodemailer', icon: 'ri-mail-send-fill', color: '#007acc' }
      ]
    }
  ];

  return (
    <Layout>
      <section className="skills-section py-5">
        <div className="container mt-4">
          <div className="text-center mb-5">
            <h2 className="welcome-title">My Skills</h2>
            <div className="welcome-line"></div>
            <p className="text-muted lead mx-auto fs-5" style={{ maxWidth: '650px' }}>
              A detailed breakdown of language expertise, frameworks, tools, database management, and architecture integration.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {skillCategories.map((category, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="skills-category-card">
                  <h4 className="category-title mb-4">{category.title}</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="skill-badge-custom" title={skill.name}>
                        <i 
                          className={skill.icon} 
                          style={{ color: skill.color, fontSize: '1.2rem' }}
                        ></i>
                        <span>{skill.name}</span>
                      </div>
                    ))}
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

export default Skills
