import { Link } from 'react-router-dom'
import profileImg from '../assets/My_photo.jpeg'

function Navbar({ theme, onThemeToggle }) {
  return (
    <header>
      <div className="profile">
        <img
          src={profileImg}
          alt="Portrait of Tirth Chaudhari"
          className="Profile-Img"
        />
        <h1><strong>Tirth Chaudhari</strong></h1>
      </div>

      <nav>
        <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onThemeToggle}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
