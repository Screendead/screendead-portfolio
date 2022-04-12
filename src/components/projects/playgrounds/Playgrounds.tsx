import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlaygroundInfo } from "./components/Playground";
import FlockingSimulation from "./sketches/flocking-simulation/flocking-simulation";
import Simvice from "./sketches/simvice/simvice";

export let playgrounds: PlaygroundInfo[] = [
  {
    title: 'Flocking Simulation',
    description: 'A simulation of flocking birds in a 2D environment.',
    link: '/projects/playgrounds/sketches/flocking-simulation',
    sketch: <FlockingSimulation />,
  },
  {
    title: 'Simvice',
    description: 'An interesting cellular automaton simulation.',
    link: '/projects/playgrounds/sketches/simvice',
    sketch: <Simvice />,
  },
];

function Playgrounds() {
  return (
    <section className="playgrounds">
      <h2 className="playgrounds-title">Playgrounds</h2>
      <div className="playgrounds-content">
        {
          playgrounds && playgrounds.map((playground, index) => (
            <Link key={index} to={playground.link}>
              {playground.title}
            </Link>
          ))
        }
      </div>
    </section>
  );
}

export default Playgrounds;
