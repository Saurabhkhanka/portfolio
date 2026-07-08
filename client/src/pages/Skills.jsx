import React from 'react'
import Layout from '../components/Layout/Layout'

const dockerIcon = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" style={{ display: 'block' }}>
    <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.95-5.43h2.12a.19.19 0 0 0 .18-.19V3.57a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m0 2.71h2.12a.19.19 0 0 0 .18-.18V6.29a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.89c0 .1.09.18.19.18m-2.93 0h2.12a.19.19 0 0 0 .18-.18V6.29a.18.18 0 0 0-.18-.18H8.1a.18.18 0 0 0-.18.18v1.89c0 .1.08.18.18.18m-2.96 0h2.11a.19.19 0 0 0 .19-.18V6.29a.18.18 0 0 0-.19-.18H5.14a.19.19 0 0 0-.19.18v1.89c0 .1.08.18.19.18m5.89 2.72h2.12a.19.19 0 0 0 .18-.19V9.01a.19.19 0 0 0-.18-.19h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m-2.93 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H8.1a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.96 0h2.11a.18.18 0 0 0 .19-.19V9.01a.18.18 0 0 0-.18-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.08.19.19.19m-2.92 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H2.22a.18.18 0 0 0-.19.18v1.9c0 .1.08.18.19.18m21.54-1.19c-.06-.05-.67-.51-1.95-.51-.34 0-.68.03-1.01.09a3.77 3.77 0 0 0-1.72-2.57l-.34-.2-.23.33a4.6 4.6 0 0 0-.6 1.43c-.24.97-.1 1.88.4 2.66a4.7 4.7 0 0 1-1.75.42H.76a.75.75 0 0 0-.76.75 11.38 11.38 0 0 0 .7 4.06 6.03 6.03 0 0 0 2.4 3.12c1.18.73 3.1 1.14 5.28 1.14.98 0 1.96-.08 2.93-.26a12.25 12.25 0 0 0 3.82-1.4 10.5 10.5 0 0 0 2.61-2.13c1.25-1.42 2-3 2.55-4.4h.23c1.37 0 2.21-.55 2.68-1 .3-.3.55-.66.7-1.06l.1-.28Z" />
  </svg>
);

const apiIcon = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" style={{ display: 'block' }}>
    <path d="M21,11H19V9a1,1,0,0,0-1-1H16V6a1,1,0,0,0-1-1H13V3a1,1,0,0,0-2,0V5H9a1,1,0,0,0-1,1H6V8a1,1,0,0,0-1,1v2H3a1,1,0,0,0,0,2H5v2a1,1,0,0,0,1,1H8v2a1,1,0,0,0,1,1h2v2a1,1,0,0,0,2,0V19h2a1,1,0,0,0,1-1V16h2a1,1,0,0,0,1-1V13h2a1,1,0,0,0,0-2Zm-7,6H10V14h4Zm0-4H10V10h4Zm0-4H10V6h4Z" />
  </svg>
);

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      catIcon: 'ri-code-box-line',
      catColor: '#0d6efd',
      skills: [
        { name: 'JavaScript (ES6+)', icon: 'ri-javascript-fill', color: '#F7DF1E' },
        { name: 'TypeScript', icon: 'ri-braces-line', color: '#3178C6' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      catIcon: 'ri-window-line',
      catColor: '#0dcaf0',
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
      catIcon: 'ri-database-2-line',
      catColor: '#198754',
      skills: [
        { name: 'Node.js', icon: 'ri-nodejs-fill', color: '#339933' },
        { name: 'Express.js', icon: 'ri-terminal-box-fill', color: '#828282' },
        { name: 'MongoDB', icon: 'ri-database-2-fill', color: '#47A248' },
        { name: 'MySQL', icon: 'ri-database-line', color: '#00758F' }
      ]
    },
    {
      title: 'Tools & Platforms',
      catIcon: 'ri-tools-line',
      catColor: '#6c757d',
      skills: [
        { name: 'Git', icon: 'ri-git-branch-line', color: '#F05032' },
        { name: 'GitHub', icon: 'ri-github-fill', color: '#181717' },
        { name: 'Docker', icon: dockerIcon, color: '#2496ED' },
        { name: 'VS Code', icon: 'ri-code-line', color: '#007ACC' },
        { name: 'Postman', icon: 'ri-send-plane-fill', color: '#FF6C37' },
        { name: 'NPM', icon: 'ri-npmjs-fill', color: '#CB3837' },
        { name: 'Render', icon: 'ri-cloud-line', color: '#46E3B7' },
        { name: 'GitHub Actions', icon: 'ri-rocket-2-line', color: '#2088FF' }
      ]
    },
    {
      title: 'Architecture & Integration',
      catIcon: 'ri-git-merge-line',
      catColor: '#764abc',
      skills: [
        { name: 'RESTful APIs', icon: apiIcon, color: '#0d6efd' },
        { name: 'JSON', icon: 'ri-file-code-line', color: '#FF8C00' },
        { name: 'Third-Party APIs', icon: 'ri-external-link-line', color: '#198754' },
        { name: 'JWT', icon: 'ri-shield-keyhole-line', color: '#D63AFF' },
        { name: 'Bcrypt', icon: 'ri-lock-password-line', color: '#FF3366' },
        { name: 'Role-Based Access Control', icon: 'ri-user-settings-line', color: '#00C8FF' },
        { name: 'Nodemailer', icon: 'ri-mail-send-fill', color: '#007acc' },
        { name: 'Google Gemini API', icon: 'ri-brain-line', color: '#1A73E8' }
      ]
    }
  ];

  return (
    <section className="skills-section py-5" id="skills">
        <div className="container mt-4">
          <div className="text-center mb-5">
            <h2 className="welcome-title">My Skills</h2>
            <div className="welcome-line"></div>
            <p className="text-muted lead mx-auto fs-5" style={{ maxWidth: '650px' }}>
              A detailed breakdown of language expertise, frameworks, tools, database management, and architecture integration.
            </p>
          </div>

          {/* Main 2x2 grid for first 4 categories */}
          <div className="row g-4 justify-content-center mb-4">
            {skillCategories.slice(0, 4).map((category, index) => (
              <div key={index} className="col-12 col-md-6">
                <div className="skills-category-card" style={{ '--cat-color': category.catColor }}>
                  <h4 className="category-title mb-4">
                    <i className={`${category.catIcon} me-2`} style={{ color: category.catColor }}></i>
                    {category.title}
                  </h4>
                  <div className="skills-grid">
                    {category.skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="skill-tile-custom" 
                        title={skill.name}
                        style={{
                          '--skill-color': skill.color,
                          '--skill-glow': `${skill.color}20`
                        }}
                      >
                        <div 
                          className="skill-tile-icon-wrapper" 
                          style={{ color: skill.color, background: `${skill.color}15` }}
                        >
                          {typeof skill.icon === 'string' ? (
                            <i className={skill.icon}></i>
                          ) : (
                            <div className="skill-tile-custom-icon" style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {skill.icon}
                            </div>
                          )}
                        </div>
                        <span className="skill-tile-name">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width horizontal flex card for Architecture & Integration */}
          {skillCategories[4] && (
            <div className="row g-4 justify-content-center">
              <div className="col-12">
                <div className="skills-category-card" style={{ '--cat-color': skillCategories[4].catColor }}>
                  <h4 className="category-title mb-4">
                    <i className={`${skillCategories[4].catIcon} me-2`} style={{ color: skillCategories[4].catColor }}></i>
                    {skillCategories[4].title}
                  </h4>
                  
                  {/* Flex wrap container instead of Grid */}
                  <div className="d-flex flex-wrap gap-3">
                    {skillCategories[4].skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="skill-tile-custom" 
                        title={skill.name}
                        style={{
                          '--skill-color': skill.color,
                          '--skill-glow': `${skill.color}20`,
                          width: 'auto',
                          flex: '0 0 auto'
                        }}
                      >
                        <div 
                          className="skill-tile-icon-wrapper" 
                          style={{ color: skill.color, background: `${skill.color}15` }}
                        >
                          {typeof skill.icon === 'string' ? (
                            <i className={skill.icon}></i>
                          ) : (
                            <div className="skill-tile-custom-icon" style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {skill.icon}
                            </div>
                          )}
                        </div>
                        <span className="skill-tile-name" style={{ overflow: 'visible', whiteSpace: 'normal' }}>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}        </div>
      </section>
  )
}

export default Skills
