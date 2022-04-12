import './About.scss';

function About() {
  return (
    <section className="about">
      <h2 className="about-title">About Me</h2>
      <p className="about-text">
        I'm a software engineer based in Folkestone, by the English Channel. I'm a passionate problem solver, and I'm always looking for new ways to improve my skills.
      </p>
      <ul className="about-links">
        <li className="about-links-item">
          <a href="https://www.linkedin.com/in/jack-lusher/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li className="about-links-item">
          <a href="https://www.instagram.com/lusher.cynical/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </li>
        <li className="about-links-item">
          <a href="https://github.com/Screendead" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
      </ul>
    </section>
  );
}

export default About;
