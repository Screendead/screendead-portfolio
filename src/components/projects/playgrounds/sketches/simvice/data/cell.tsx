import p5Types from "p5"; // Import this for typechecking and intellisense
import { Vices } from "./vices";
import { Virtues } from "./virtues";

export class Cell {
  vices: Vices = {
    sloth: 0,
    pride: 0,
    greed: 0,
    wrath: 0,
    gluttony: 0,
    envy: 0,
    lust: 0,
  };

  // virtues: Virtues = {
  //   honor: 0,
  //   wisdom: 0,
  //   justice: 0,
  //   temperance: 0,
  //   courage: 0,
  //   integrity: 0,
  // };

  constructor(public color: [number, number, number]) {}

  setVices(vices: Vices): void {
    this.vices = { ...this.vices, ...vices };
  }

  setColor(color: [number, number, number]): void {
    this.color = color;
  }
}
