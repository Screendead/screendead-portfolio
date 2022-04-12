import Sketch from "react-p5";
import p5Types from "p5"; // Import this for typechecking and intellisense
import { Board } from "./data/board";

function Simvice() {
  let board: Board;
  let delay = 1;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
    board = new Board(32, 32, 4);

		p5.createCanvas(512, 512).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
    if (p5.frameCount % delay === 0) {
      board.update();
      // board.update();
    }

    board.draw(p5);
	};

	return <>
    <Sketch setup={setup} draw={draw} />
    <button onClick={() => {
      board.reset();
      for (let i = 0; i < board.matrix.length; i++) {
        for (let j = 0; j < board.matrix[i].length; j++) {
          board.matrix[i][j] = Math.random() * 2 - 1;
        }
      }
    }}>Randomise</button>
    <button onClick={() => {
      board.reset();
    }}>Reset</button>
    <button onClick={() => {
      delay = Math.max(delay - 1, 1);
    }}>Increase Speed</button>
    <button onClick={() => {
      delay = Math.min(delay + 1, 10);
    }}>Decrease Speed</button>
  </>;
}

export default Simvice;
