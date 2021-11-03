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
        cursor = new CarCursor(sketch, grid.getCarPosition());
        grid.subscribe(this);
    }

    draw() {
        grid.draw();
        scoreBoard.draw();
        cursor.draw();
    }

    mazeFinishedHandler() {
            grid.setup();
            console.log("game finished");
            cursor.remove();
    }

    observerChange(action) {
        switch (action) {
            case ObserverChange.collision:
                console.log("collision");
                scoreBoard.decreaseScore();
                break;
            case ObserverChange.mazeFinished:
                this.mazeFinishedHandler();
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