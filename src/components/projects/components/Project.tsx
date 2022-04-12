import { Link } from 'react-router-dom';
import './Project.scss';

export type ProjectProps = {
  title: string;
  description: string;
  link: string;
  image: string;
};

function Project(props: ProjectProps) {
  let project = (
    <div className="project" style={{
      backgroundImage: `url(${props.image})`,
    }}>
      <div className="project-content">
        <h3 className="project-title">{props.title}</h3>
        <p className="project-description">{props.description}</p>
      </div>
    </div>
  );

  return (
    props.link.includes('://')
      ? <a href={props.link} target="_blank" rel="noopener noreferrer" className="project-link">{project}</a>
      : <Link to={props.link} className="project-link">{project}</Link>
  );
}

export default Project;
