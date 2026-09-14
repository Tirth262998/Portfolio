import { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        return response.json()
      })
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load projects. Please make sure the backend server is running.')
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects">
      <h2>My Projects</h2>

      {loading && <p>Loading projects...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="project-container">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects