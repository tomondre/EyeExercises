import Grid from "./Grid";
import ScoreBoard from "./ScoreBoard";
import {ObserverChange} from "./observer/ObserverChange";
import CarCursor from "./CarCursor";

let sketch;
let grid;
let scoreBoard;

let cursor;

export default class Game {
    constructor(Sketch) {
        sketch = Sketch;

        grid = new Grid(sketch);
        scoreBoard = new ScoreBoard(sketch);
        cursor = new CarCursor(sketch.canvas);

        grid.subscribe(this);
    }

    draw() {
        grid.draw();
        scoreBoard.draw();
    }

    observerChange(action) {
        switch (action) {
            case ObserverChange.collision:
                console.log("collision");
                cursor.lock();
                break;
            case ObserverChange.mazeFinished:
                console.log("game finished");
                break;
            case ObserverChange.pointerOnFirstTile:
                console.log("pointerOnFirstTile");
                cursor.create();
                break;
            case ObserverChange.pointerOutsideMaze:
                cursor.remove();
                console.log("pointerOutside");
                break;
        }
    }
}