import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Contact = () => {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
    }
  }, [user])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/client`, {email,name,message})
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/')
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error('something went wromg')
    }
  }

  return (
    <Layout>
      <section className="contact-section py-5 min-vh-80 d-flex align-items-center">
        <div className="container">
          <div className="text-center mb-5 animate-fade-in">
            <h1 className="display-4 fw-bold mb-2 text-gradient">Get In Touch</h1>
            <p className="text-muted fs-5 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Drop a message, and let's create something extraordinary.
            </p>
          </div>

          <div className="row g-5 align-items-stretch">
            {/* Info Panel */}
            <div className="col-lg-5 d-flex flex-column justify-content-between g-4">
              <div className="d-grid gap-4">
                <div className="info-item-card">
                  <div className="info-icon-wrapper">
                    <i className="ri-mail-line"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">Email Me Directly</h5>
                    <a href="mailto:saurabhkhanka222@gmail.com" className="text-primary text-decoration-none fs-6">
                      saurabhkhanka222@gmail.com
                    </a>
                  </div>
                </div>

                <div className="info-item-card">
                  <div className="info-icon-wrapper">
                    <i className="ri-phone-line"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">Call Me</h5>
                    <a href="tel:+919582111994" className="text-muted text-decoration-none fs-6">
                      +91 9582111994
                    </a>
                  </div>
                </div>

                <div className="info-item-card">
                  <div className="info-icon-wrapper">
                    <i className="ri-map-pin-line"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">Location</h5>
                    <p className="text-muted mb-0 fs-6">
                      New Delhi, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-5 p-4 glass-card text-center">
                <h6 className="fw-bold text-muted mb-3 text-uppercase tracking-wider">Connect with me</h6>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="social-pill github">
                    <i className="ri-github-line"></i>
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="social-pill linkedin">
                    <i className="ri-linkedin-line"></i>
                  </a>
                  <a href="mailto:saurabhkhanka222@gmail.com" className="social-pill email">
                    <i className="ri-mail-line"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="col-lg-7">
              <div className="glass-card p-5">
                <h3 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                  <i className="ri-chat-smile-2-line text-primary"></i> Send a Message
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="custom-label">
                      <i className="ri-user-line text-primary"></i> Your Name
                    </label>
                    <input 
                      type="text" 
                      className="form-control custom-input" 
                      id="name" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e)=>setName(e.target.value)} 
                      required 
                    />
                    {user && (
                      <div className="form-text text-success small mt-1">
                        <i className="ri-checkbox-circle-line me-1"></i> Prefilled from account
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="custom-label">
                      <i className="ri-mail-line text-primary"></i> Email Address
                    </label>
                    <input 
                      type="email" 
                      className="form-control custom-input" 
                      id="email" 
                      placeholder="name@example.com" 
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)} 
                      required 
                    />
                    {user && (
                      <div className="form-text text-success small mt-1">
                        <i className="ri-checkbox-circle-line me-1"></i> Prefilled from account
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="custom-label">
                      <i className="ri-message-3-line text-primary"></i> Your Message
                    </label>
                    <textarea 
                      className="form-control custom-input" 
                      id="message" 
                      rows="5" 
                      placeholder="Tell me about your project or inquiry..."  
                      value={message} 
                      onChange={(e)=>setMessage(e.target.value)} 
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-submit-contact w-100">
                    <i className="ri-send-plane-fill"></i> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Contact