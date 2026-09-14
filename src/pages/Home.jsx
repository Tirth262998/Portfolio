import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <p>Loading Home...</p>
      </div>
    )
  }

  return (
    <section id="home">
      <h2><strong>Introduction</strong></h2>

      <p>
        Hello! I'm Tirth Chaudhari, a Computer Science Engineering student
        at the National Institute of Technology Warangal.
        <br />
        I am passionate about technology, problem-solving, and creating
        innovative software solutions.
        <br />
        My interests include web development, artificial intelligence, and
        data structures &amp; algorithms.
        <br />
        I enjoy learning new technologies and applying them to build practical
        projects that solve real-world problems.
      </p>

      <div className="hero-buttons">
        <Link to="/projects" className="btn">
          View Projects
        </Link>
        <Link to="/contact" className="btn">
          Contact Me
        </Link>
      </div>
    </section>
  )
}

export default Home
