import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes >
    </>
  )
}

export default App
