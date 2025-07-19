import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

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
        <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Contact Me</h2>
          <p className="text-center mb-5">
            Have a project in mind or just want to say hi? Fill out the form below or email me directly.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea className="form-control" id="message" rows="5" placeholder="Type your message..."  value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>

              {/* Optional direct contact info */}
              <div className="mt-5 text-center">
                <p className="mb-1">📧 Email: <a href="mailto:saurabh@example.com">saurabhkhanka222@gmail.com</a></p>
                <p className="mb-1">📱 Phone: +91 9582111994</p>
                <div className="mt-3">
                  <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="btn btn-dark btn-sm me-2">GitHub</a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">LinkedIn</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Contact