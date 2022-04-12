import p5Types from "p5"; // Import this for typechecking and intellisense

export interface BoidParameters {
  x: number,
  y: number,
  radius: number,
  maxSpeed: number,
  maxForce: number,
  maxSteerForce: number,
  maxDistance: number,
  desiredseparation: number,
  neighbordist: number,
  color: p5Types.Color,
}

class Boid {
  x: number;
  y: number;
  radius: number;
  maxSpeed: number;
  maxForce: number;
  maxSteerForce: number;
  maxDistance: number;
  desiredseparation: number;
  neighbordist: number;
  color: p5Types.Color;

  acceleration: p5Types.Vector;
  velocity: p5Types.Vector;
  position: p5Types.Vector;
  r: number;

  constructor(
    p5: p5Types,
    {
      x,
      y,
      radius = 10,
      maxSpeed = 3,
      maxForce = 2,
      maxSteerForce = 0.4,
      maxDistance = 100,
      desiredseparation = 25,
      neighbordist = 50,
      color,
    }: BoidParameters,
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.maxSteerForce = maxSteerForce;
    this.maxDistance = maxDistance;
    this.desiredseparation = desiredseparation;
    this.neighbordist = neighbordist;
    this.color = color;

    this.acceleration = p5.createVector(0, 0);
    this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1))
        .mult(maxSpeed);
    this.position = p5.createVector(x, y)
    this.r = radius;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.maxSteerForce = maxSteerForce;
    this.maxDistance = maxDistance;
    this.color = color;
  }

  public applyForce(p5: p5Types, force: p5Types.Vector) {
    this.acceleration.add(force);
  }

  public update(p5: p5Types) {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  public seek(p5: p5Types, target: p5Types.Vector) {
    const desired = p5Types.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);

    const steer = p5Types.Vector.sub(desired, this.velocity);
    steer.limit(this.maxSteerForce);
    this.applyForce(p5, steer);
  }

  public arrive(p5: p5Types, target: p5Types.Vector) {
    const desired = p5Types.Vector.sub(target, this.position);
    const d = desired.mag();
    if (d < this.maxDistance) {
      const m = p5.map(d, 0, this.maxDistance, 0, this.maxSpeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxSpeed);
    }

    const steer = p5Types.Vector.sub(desired, this.velocity);
    steer.limit(this.maxSteerForce);
    this.applyForce(p5, steer);
  }

  public separate(p5: p5Types, boids: Boid[]) {
    let steer = p5.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      const d = p5Types.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < this.desiredseparation) {
        const diff = p5Types.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxSteerForce);
      this.applyForce(p5, steer);
    }
  }

  public align(p5: p5Types, boids: Boid[]) {
    let sum = p5.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      const d = p5Types.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < this.neighbordist) {
        // Check if neighboring boid is in front of this boid
        const angle = this.velocity.angleBetween(boids[i].velocity);
        if (angle < p5.PI / 2 && angle > -p5.PI / 2) {
          sum.add(boids[i].velocity);
          count++;
        }
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);

      const steer = p5Types.Vector.sub(sum, this.velocity);
      steer.limit(this.maxSteerForce);
      this.applyForce(p5, steer);
    }
  }

  public cohesion(p5: p5Types, boids: Boid[]) {
    let sum = p5.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      const d = p5Types.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < this.neighbordist) {
        sum.add(boids[i].position);
        count++;
      }
    }

    if (count > 0) {
      sum.normalize();
      sum.mult(this.maxSpeed);

      const steer = p5Types.Vector.sub(sum, this.velocity);
      steer.limit(this.maxSteerForce);
      this.applyForce(p5, steer);
    }
  }

  public flock(p5: p5Types, boids: Boid[]) {
    this.separate(p5, boids);
    this.align(p5, boids);
    this.cohesion(p5, boids);
  }

  public display(p5: p5Types) {
    p5.fill(this.color);
    p5.stroke(this.color);
    p5.ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }

  public borders(p5: p5Types, constrain: boolean) {
    if (constrain) {
      if (this.position.x < this.r) {
        this.position.x = this.r;
        this.acceleration.x = this.maxSpeed;
      }
      if (this.position.y < this.r) {
        this.position.y = this.r;
        this.acceleration.y = this.maxSpeed;
      }
      if (this.position.x > p5.width - this.r) {
        this.position.x = p5.width - this.r;
        this.acceleration.x = -this.maxSpeed;
      }
      if (this.position.y > p5.height - this.r) {
        this.position.y = p5.height - this.r;
        this.acceleration.y = -this.maxSpeed;
      }
    } else {
      if (this.position.x < 0) this.position.x = p5.width;
      if (this.position.y < 0) this.position.y = p5.height;
      if (this.position.x > p5.width) this.position.x = 0;
      if (this.position.y > p5.height) this.position.y = 0;
    }
  }
}

export default Boid;
