import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'

// Configure axios defaults globally
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3600";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes >
  )
}

export default App
