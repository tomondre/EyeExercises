import Grid from "./objects/Grid";
import ScoreBoard from "./score/ScoreBoard";
import {ObserverChange} from "./observer/ObserverChange";
import CarCursor from "./objects/CarCursor";
import DifficultyManager from "./objects/DifficultyManager";
import Timer from "./objects/Timer";

let sketch;
let grid;
let scoreBoard;
let cursor;
let difficultyManager;
let timer;

export default class Game {
    constructor(Sketch) {
        sketch = Sketch;

        grid = new Grid(sketch);
        scoreBoard = new ScoreBoard(sketch);
        difficultyManager = new DifficultyManager();
        grid.setup(difficultyManager.getCurrentColumnNo());
        cursor = new CarCursor(sketch, grid.getCarPosition());
        timer = new Timer(sketch);

        //Subscribe
        grid.subscribe(this);
    }

    draw() {
        grid.draw();
        scoreBoard.draw();
        timer.draw();
        cursor.draw();
    }

    observerChange(action) {
        switch (action) {
            case ObserverChange.collision:
                scoreBoard.decreaseScoreWallHit();
                break;
            case ObserverChange.mazeSolved:
                this.mazeFinishedHandler();
                break;
            case ObserverChange.pointerOnFirstTile:
                this.startMazeRoundHandler();
                break;
            case ObserverChange.pointerOutsideMaze:
                cursor.remove();
                break;
            case ObserverChange.levelFinished:
                this.levelFinishedHandler();
                break;
            case ObserverChange.dailyTimerFinished:
                this.dailyTimerFinishedHandler();
                break;
            case ObserverChange.levelNotPassed:
                this.levelNotPassedHandler();
                break;
            case ObserverChange.difficultyFinished:
                this.difficultyFinishedHandler();
                break;
            case ObserverChange.gameFinished:
                this.gameFinishedHandler();
                break;
        }
    }

    mazeFinishedHandler() {
        scoreBoard.clearInterval();
        timer.remove();
        difficultyManager.mazeSolved();
        cursor.remove();
        scoreBoard.resetCollisions();
        grid.setup(difficultyManager.getCurrentColumnNo());
        cursor.setDefaultCarPosition(grid.getCarPosition());
    }

    startMazeRoundHandler()
    {
        cursor.create();
        scoreBoard.startInterval();
        timer.create();
    }

    levelFinishedHandler() {

    }

    dailyTimerFinishedHandler() {
    }

    levelNotPassedHandler() {
    }

    difficultyFinishedHandler() {
        scoreBoard.reset();
        scoreBoard.saveDataToApi();
    }

    gameFinishedHandler() {
    }
}