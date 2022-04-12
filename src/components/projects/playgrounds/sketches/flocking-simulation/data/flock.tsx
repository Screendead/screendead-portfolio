import p5Types from "p5"; // Import this for typechecking and intellisense
import Boid, { BoidParameters } from "./boid";

class Flock {
  boids: Boid[];

  constructor(p5: p5Types) {
    this.boids = [];
    for (let i = 0; i < 1000; i++) {
      let boid = new Boid(p5, {
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        radius: 10,
        color: p5.color(p5.random(255), p5.random(255), p5.random(255)),
      } as BoidParameters);

      this.boids.push(boid);
    }
  }

  public run(p5: p5Types) {
    let newBoids: Boid[] = [...this.boids]

    for (let i = 0; i < newBoids.length; i++) {
      newBoids[i].flock(p5, this.boids);
      newBoids[i].update(p5);
      newBoids[i].borders(p5, false);
      newBoids[i].display(p5);
    }

    this.boids = newBoids;
  }
}

export default Flock;
