import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found-page" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>404</h2>
      <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '15px' }}>
        Page Not Found
      </h3>
      <p style={{ maxWidth: '500px', margin: '0 auto 25px auto' }}>
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/Home" className="btn">
        Back to Home
      </Link>
    </section>
  )
}

export default NotFound
