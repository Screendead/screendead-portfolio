import p5Types from "p5"; // Import this for typechecking and intellisense
import { Cell } from "./cell";

/**
 * A class representing the area where the simulation is run.
 */
export class Board {
  static CELL_SIZE = 512 / 32;

  matrix!: number[][];
  cells!: number[][];

  constructor(private _width: number, private _height: number, private _convolutionSize: number) {
    this.reset();
  }

  reset(): void {
    // this.matrix = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 1, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // ];

    // this.matrix = [
    //   [0, 0, 0],
    //   [0, 1, 0],
    //   [0, 0, 0],
    // ];

    this.matrix = [];
    let middle = Math.floor(this._convolutionSize / 2);
    for (let i = 0; i < this._convolutionSize; i++) {
      this.matrix.push([]);
      for (let j = 0; j < this._convolutionSize; j++) {
        this.matrix[i].push((i === middle && j === middle) ? 1 : 0);
      }
    }

    this.cells = [];
    for (let x = 0; x < this._width; x++) {
      this.cells.push([]);
      for (let y = 0; y < this._height; y++) {
        let cell = Math.random() * 2 - 1;

        this.cells[x].push(cell);
      }
    }
  }

  getNeighbor(x: number, y: number): number {
    if (x < 0) x = this._width - 1;
    if (x >= this._width) x = 0;
    if (y < 0) y = this._height - 1;
    if (y >= this._height) y = 0;

    return this.cells[x][y];
  }

  /**
   * Update the state of the board by one step based on the
   * current state of the board.
   */
  update(): void {
    let newCells: number[][] = [];

    for (let x = 0; x < this._width; x++) {
      newCells.push([]);
      for (let y = 0; y < this._height; y++) {
        let newCell = 0.0;

        for (let i = 0; i < this.matrix.length; i++) {
          for (let j = 0; j < this.matrix[i].length; j++) {
            let convolution = this.matrix[i][j];
            let neighbor = this.getNeighbor(
              x + i - Math.floor(this.matrix.length / 2),
              y + j - Math.floor(this.matrix[i].length / 2)
            );

            if (neighbor) {
              newCell += convolution * neighbor;
            }
          }
        }

        // Apply an inverse gaussian activation function to the cell.
        newCell = - 1 / Math.pow(2, (Math.pow(newCell, 2))) + 1;

        newCell = Math.max(Math.min(newCell, 1), 0);
        newCells[x].push(newCell);
      }
    }

    this.cells = newCells;
  }

  /**
   * Take a p5 canvas and draw the board onto it.
   * @param p5 The p5 canvas.
   */
  draw(p5: p5Types): void {
    p5.background(0);
    p5.noStroke();
    p5.strokeWeight(1);

    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        const cell = this.cells[x][y];
        if (cell) {
          p5.fill([cell, cell, cell].map(c => c * 255));
          p5.rect(x * Board.CELL_SIZE, y * Board.CELL_SIZE, Board.CELL_SIZE, Board.CELL_SIZE);
        }
      }
    }
  }
}
