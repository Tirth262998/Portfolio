import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <BrowserRouter>
      <Navbar theme={theme} onThemeToggle={handleThemeToggle} />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
