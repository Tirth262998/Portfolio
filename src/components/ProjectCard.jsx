import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectInfo from './ProjectInfo'

function ProjectCard({ project }) {
  const [showDetails, setShowDetails] = useState(false)

  const { id, title, description, techStack } = project

  const handleToggleDetails = () => {
    setShowDetails((prevShow) => !prevShow)
  }

  return (
    <article className="project-card">
      <ProjectInfo title={title} tech={techStack} />

      <p>{description}</p>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleToggleDetails}
          aria-expanded={showDetails}
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>

        <Link to={`/projects/${id}`} className="btn">
          View Page
        </Link>
      </div>

      {showDetails && (
        <div className="project-details">
          <p><strong>Project ID:</strong> #{id}</p>
          <p><strong>Full Tech Stack:</strong> {techStack.join(', ')}</p>
          <p>
            <em>
              Key Highlights: Modular architecture, secure processing, clean responsive design,
              and optimization for multi-device viewports.
            </em>
          </p>
        </div>
      )}
    </article>
  )
}

export default ProjectCard
