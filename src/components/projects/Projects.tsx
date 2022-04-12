import faker from "@faker-js/faker";
import { useEffect, useState } from "react";
import Project, { ProjectProps } from "./components/Project";

import './Projects.scss';

function Projects() {
  let [projects, setProjects] = useState<ProjectProps[] | null>(null);

  useEffect(() => {
    let _projects = new Array(7).fill(0).map((_, i) => {
      faker.seed(i);

      return {
        title: faker.company.companyName(),
        description: faker.lorem.sentence(6),
        link: faker.internet.url(),
        image: `https://source.unsplash.com/600x600/?night&${Math.random()}`,
      }
    });

    setProjects([
      {
        title: 'Playgrounds',
        description: 'A selection of personal play projects written using TypeScript, React, and p5.js',
        link: '/projects/playgrounds',
        image: `https://source.unsplash.com/600x600/?night&${Math.random()}`,
      },
      ..._projects
    ]);
  }, []);

  return (
    <section className="projects">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-content">
        {
          projects && projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              image={project.image}
            />
          ))
        }
      </div>
    </section>
  );
}

export default Projects;
