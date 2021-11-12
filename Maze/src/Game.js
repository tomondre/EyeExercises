import Grid from "./objects/Grid";
import ScoreBoard from "./score/ScoreBoard";
import {ObserverChange} from "./observer/ObserverChange";
import CarCursor from "./objects/CarCursor";
import DifficultyManager from "./objects/DifficultyManager";
import Timer from "./objects/Timer";
import NumberButtonManager from "./level2/NumberButtonManager";

let sketch;
let grid;
let scoreBoard;
let cursor;
let difficultyManager;
let timer;
let numberButtons;

export default class Game {
    constructor(Sketch) {
        sketch = Sketch;

        scoreBoard = new ScoreBoard(sketch);
        difficultyManager = new DifficultyManager();
        grid = new Grid(sketch, difficultyManager);
        grid.setup();
        cursor = new CarCursor(sketch, grid.getCarPosition());
        timer = new Timer(sketch);
        numberButtons = new NumberButtonManager(sketch);

        numberButtons.generate();
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
        grid.setup();
        cursor.setDefaultCarPosition(grid.getCarPosition());
    }

    startMazeRoundHandler()
    {
        cursor.create();
        scoreBoard.startInterval();
        timer.create();
    }

    levelFinishedHandler() {
        scoreBoard.reset();
        scoreBoard.saveDataToApi();
        cursor.stopCarGeneration();
        timer.reset();
    }

    dailyTimerFinishedHandler() {
    }

    levelNotPassedHandler() {
    }

    difficultyFinishedHandler() {
        scoreBoard.reset();
        scoreBoard.saveDataToApi();
        timer.reset();
    }

    gameFinishedHandler() {
    }
}