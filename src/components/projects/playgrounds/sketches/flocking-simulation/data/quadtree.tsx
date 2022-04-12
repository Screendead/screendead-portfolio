import p5Types from "p5"; // Import this for typechecking and intellisense
import Boid from "./boid";

class QuadTree {
  static MAX_BOIDS = 5;
  static MIN_SIZE = 10;

  boids: Boid[] = [];
  divided: boolean;
  northWest: QuadTree | null;
  northEast: QuadTree | null;
  southWest: QuadTree | null;
  southEast: QuadTree | null;

  constructor(
    boids: Boid[],
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {
    this.divided = false;
    this.northWest = null;
    this.northEast = null;
    this.southWest = null;
    this.southEast = null;

    boids.filter((boid) => {
      return (
        boid.x > this.x &&
        boid.x < this.x + this.width &&
        boid.y > this.y &&
        boid.y < this.y + this.height
      );
    }).forEach((boid) => {
      this.insert(boid);
    });
  }

  public run(p5: p5Types): void {
    if (this.divided) {
      this.northWest!.run(p5);
      this.northEast!.run(p5);
      this.southWest!.run(p5);
      this.southEast!.run(p5);
    } else {
      for (let i = 0; i < this.boids.length; i++) {
        this.boids[i].flock(p5, this.boids);
        this.boids[i].update(p5);
        this.boids[i].borders(p5, false);
        this.boids[i].display(p5);
      }
    }
  }

  public subdivide(): void {
    const x = this.x;
    const y = this.y;
    const width = this.width;
    const height = this.height;

    this.northWest = new QuadTree(
      this.boids,
      x,
      y,
      width / 2,
      height / 2,
    );

    this.northEast = new QuadTree(
      this.boids,
      x + width / 2,
      y,
      width / 2,
      height / 2,
    );

    this.southWest = new QuadTree(
      this.boids,
      x,
      y + height / 2,
      width / 2,
      height / 2,
    );

    this.southEast = new QuadTree(
      this.boids,
      x + width / 2,
      y + height / 2,
      width / 2,
      height / 2,
    );

    this.divided = true;
  }

  public getIndex(x: number, y: number): number {
    let index = -1;
    const verticalMidpoint = this.x + this.width / 2;
    const horizontalMidpoint = this.y + this.height / 2;

    // Object can completely fit within the top quadrants
    const topQuadrant = y < horizontalMidpoint && y < verticalMidpoint;
    const bottomQuadrant = y > horizontalMidpoint && y > verticalMidpoint;

    // Object can completely fit within the bottom quadrants
    if (x < verticalMidpoint && x < horizontalMidpoint) {
      if (topQuadrant) {
        index = 1;
      } else if (bottomQuadrant) {
        index = 2;
      }
    } else if (x > verticalMidpoint && x > horizontalMidpoint) {
      // Object can completely fit within the right quadrants
      if (topQuadrant) {
        index = 0;
      } else if (bottomQuadrant) {
        index = 3;
      }
    }

    return index;
  }

  public insert(boid: Boid): void {
    if (!this.divided) {
      this.boids.push(boid);

      if (this.boids.length > QuadTree.MAX_BOIDS && this.width > QuadTree.MIN_SIZE) {
        this.subdivide();
      }
    } else {
      const index = this.getIndex(boid.x, boid.y);

      if (index !== -1) {
        this.boids.push(boid);

        switch (index) {
          case 0:
            this.northEast!.insert(boid);
            break;
          case 1:
            this.northWest!.insert(boid);
            break;
          case 2:
            this.southWest!.insert(boid);
            break;
          case 3:
            this.southEast!.insert(boid);
            break;
        }
      }
    }
  }

  public query(p5: p5Types, x: number, y: number, radius: number): Boid[] {
    const results = [];

    if (this.divided) {
      const index = this.getIndex(x, y);

      if (index !== -1) {
        switch (index) {
          case 0:
            results.push(...this.northEast!.query(p5, x, y, radius));
            break;
          case 1:
            results.push(...this.northWest!.query(p5, x, y, radius));
            break;
          case 2:
            results.push(...this.southWest!.query(p5, x, y, radius));
            break;
          case 3:
            results.push(...this.southEast!.query(p5, x, y, radius));
            break;
        }
      }
    }

    if (this.contains(p5, x, y, radius)) {
      results.push(...this.boids);
    }

    return results;
  }

  public contains(p5: p5Types, x: number, y: number, radius: number): boolean {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }

  public clear(): void {
    this.boids = [];
    this.northWest = null;
    this.northEast = null;
    this.southWest = null;
    this.southEast = null;
    this.divided = false;
  }
}

export default QuadTree;
