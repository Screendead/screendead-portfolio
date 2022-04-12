import Sketch from "react-p5";
import p5Types from "p5"; // Import this for typechecking and intellisense
import QuadTree from "./data/quadtree";
import Boid, { BoidParameters } from "./data/boid";
import Flock from "./data/flock";

let isSlowVersion: boolean = false;

function FlockingSimulation() {
  let boids: Boid[] = [];
  let quadTree: QuadTree;
  let flock: Flock;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(512, 512).parent(canvasParentRef);

    if (isSlowVersion) {
      flock = new Flock(p5);
    } else {
      quadTree = new QuadTree([], 0, 0, p5.width, p5.height);

      for (let i = 0; i < 1000; i++) {
        let boid = new Boid(p5, {
          x: p5.random(p5.width),
          y: p5.random(p5.height),
          radius: 2,
          color: p5.color(255, 255, 255),
        } as BoidParameters);

        boids.push(boid);
      }
    }
	};

	const draw = (p5: p5Types) => {
    p5.background(0);

    if (isSlowVersion) {
      flock.run(p5);
    } else {
      quadTree = new QuadTree(boids, 0, 0, p5.width, p5.height);

      quadTree.run(p5);
    }
	};

	return <Sketch setup={setup} draw={draw} />
}

export default FlockingSimulation;
