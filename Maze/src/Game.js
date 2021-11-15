import Grid from "./objects/Grid";
import ScoreBoard from "./score/ScoreBoard";
import {ObserverChange} from "./observer/ObserverChange";
import CarCursor from "./objects/CarCursor";
import DifficultyManager from "./objects/DifficultyManager";
import Timer from "./objects/Timer";
import NumberButtonManager from "./level2/NumberButtonManager";
import {config} from "./config";

let sketch;
let grid;
let scoreBoard;
let cursor;
let difficultyManager;
let timer;
let numberButtons;

//TODO Fetch difficulties
//TODO align numbers in second level
//TODO API call
//TODO

export default class Game {
    constructor(Sketch) {
        sketch = Sketch;

        difficultyManager = new DifficultyManager(0, 0);
        scoreBoard = new ScoreBoard(sketch);
        grid = new Grid(sketch, difficultyManager);
        grid.setup();
        cursor = new CarCursor(sketch, grid.getCarPosition());
        timer = new Timer(sketch);
        numberButtons = new NumberButtonManager(sketch, difficultyManager);

        //Subscribe
        grid.subscribe(this);

        if (difficultyManager.getCurrentLevelNo() === 0) {
        } else {
            scoreBoard.setDefaultLevelTwoScore();
            this.setLevelTwo();
        }
    }

    draw() {
        grid.draw();
        scoreBoard.draw();
        timer.draw();
        cursor.draw();
        numberButtons.draw();
    }

    observerChange(action) {
        switch (action) {
            case ObserverChange.mazeSolved:
                this.mazeFinishedHandler();
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
        if (difficultyManager.getCurrentLevelNo() === 0) {
            switch (action) {
                case ObserverChange.collision:
                    scoreBoard.decreaseScoreWallHit();
                    break;
                case ObserverChange.pointerOnFirstTile:
                    this.startMazeRoundHandler();
                    break;
                case ObserverChange.pointerOutsideMaze:
                    cursor.remove();
                    break;
            }
        } else {
            switch (action) {
                case ObserverChange.correctNumberPressed:
                    scoreBoard.increaseScoreLevelTwo();
                    break;
                case ObserverChange.incorrectNumberPressed:
                    scoreBoard.decreaseScoreLevelTwo();
                    break;
            }
        }
        console.log(action);
    }

    mazeFinishedHandler() {
        scoreBoard.clearInterval();
        grid.setup();

        if (difficultyManager.getCurrentLevelNo() === 0) {
            timer.remove();
            cursor.remove();
            scoreBoard.resetCollisions();
            cursor.setDefaultCarPosition(grid.getCarPosition());
        } else {
            numberButtons.setCorrectCombination(grid.getCorrectCombination());
        }
    }

    startMazeRoundHandler() {
        cursor.create();
        scoreBoard.startInterval();
        timer.create();
    }

    dailyTimerFinishedHandler() {

    }

    levelNotPassedHandler() {

    }

    difficultyFinishedHandler() {
        scoreBoard.saveDataToApi();

        if (difficultyManager.getCurrentLevelNo() === 0) {
            scoreBoard.setDefaultLevelOneScore()
        } else {
            scoreBoard.setDefaultLevelTwoScore()
        }

        this.mazeFinishedHandler();
    }

    gameFinishedHandler() {

    }

    levelFinishedHandler() {
        scoreBoard.saveDataToApi();
        cursor.stopCarGeneration();

        this.mazeFinishedHandler();

        if (difficultyManager.getCurrentLevelNo() === 0) {
            scoreBoard.setDefaultLevelOneScore()
        } else {
            scoreBoard.setDefaultLevelTwoScore()
            this.setLevelTwo();
        }
    }

    setLevelTwo() {
        cursor.stopCarGeneration();
        numberButtons.generate(grid.getGridLeftBottomPosition());
        numberButtons.setCorrectCombination(grid.getCorrectCombination());
        timer.create();
    }
}