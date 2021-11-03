import Grid from "./Grid";
import ScoreBoard from "./ScoreBoard";
import {ObserverChange} from "./observer/ObserverChange";
import CarCursor from "./CarCursor";
import DifficultyManager from "./DifficultyManager";

let sketch;
let grid;
let scoreBoard;
let cursor;
let difficultyManager;

export default class Game {
    constructor(Sketch) {
        sketch = Sketch;

        grid = new Grid(sketch);
        scoreBoard = new ScoreBoard(sketch);
        difficultyManager = new DifficultyManager();
        grid.setup(difficultyManager.getCurrentColumnNo());
        cursor = new CarCursor(sketch, grid.getCarPosition());

        grid.subscribe(this);

    }

    draw() {
        grid.draw();
        scoreBoard.draw();
        cursor.draw();
    }

    mazeFinishedHandler() {
        difficultyManager.mazeSolved();
        if(difficultyManager.isLevelFinished()) {
            this.levelFinishedCalBack();
            return;
        }
        cursor.remove();

        grid.setup(difficultyManager.getCurrentColumnNo());
    }

    observerChange(action) {
        switch (action) {
            case ObserverChange.collision:
                scoreBoard.decreaseScore();
                break;
            case ObserverChange.mazeFinished:
                this.mazeFinishedHandler();
                break;
            case ObserverChange.pointerOnFirstTile:
                cursor.create();
                break;
            case ObserverChange.pointerOutsideMaze:
                cursor.remove();
                break;
        }
    }

    levelFinishedCalBack() {
        console.log("levelFInished")
    }
}