import { Link } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="home-link">Screendead</Link>
        <nav className="nav">
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link">Projects</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
