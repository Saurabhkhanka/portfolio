import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={
          <ProtectedRoute>
            <Projects/>
          </ProtectedRoute>
        }/>
        <Route path='/skills' element={
          <ProtectedRoute>
            <Skills/>
          </ProtectedRoute>
        }/>
        <Route path='/contact' element={
          <ProtectedRoute>
            <Contact/>
          </ProtectedRoute>
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard/>
          </ProtectedRoute>
        }/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes >
    </AuthProvider>
  )
}

export default App
