function ProjectInfo({ title, tech }) {
  return (
    <>
      <h3>{title}</h3>

      <p>
        <strong>Technologies:</strong> {tech.join(", ")}
      </p>
    </>
  )
}

export default ProjectInfo
