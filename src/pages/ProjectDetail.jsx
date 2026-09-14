import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProjectDetail() {
  const { projectId } = useParams()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    setProject(null)

    fetch(`http://localhost:5000/api/projects/${projectId}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error('Project Not Found')
        }

        if (!response.ok) {
          throw new Error('Failed to fetch project')
        }

        return response.json()
      })
      .then((data) => {
        setProject(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [projectId])

  if (loading) {
    return (
      <section className="project-detail-page">
        <h2>Loading project...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className="project-detail-page">
        <h2>Project Not Found</h2>
        <p>No project exists with ID &quot;{projectId}&quot;.</p>
        <p style={{ marginTop: '15px' }}>
          <Link to="/projects" className="btn">
            Back to Projects
          </Link>
        </p>
      </section>
    )
  }

  const { title, description, techStack, link } = project

  return (
    <section className="project-detail-page">
      <h2>{title}</h2>

      <div className="project-detail-card">
        <p className="project-tech-stack">
          <strong>Technologies Used:</strong> {techStack.join(', ')}
        </p>

        <p className="project-detail-desc">{description}</p>

        <div
          className="project-detail-actions"
          style={{
            marginTop: '25px',
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/projects" className="btn">
            Back to Projects
          </Link>

          {link && link !== '#' && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Visit Live Project
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail