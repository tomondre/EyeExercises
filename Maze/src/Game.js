import Grid from "./objects/Grid";
import ScoreBoard from "./score/ScoreBoard";
import {ObserverChange} from "./observer/ObserverChange";
import CarCursor from "./objects/CarCursor";
import DifficultyManager from "./objects/DifficultyManager";
import Timer from "./objects/Timer";
import NumberButtonManager from "./level2/NumberButtonManager";
import MessageManager from "./messages/MessageManager";
import FetchDataManager from "./objects/FetchDataManager";

let sketch;
let grid;
let scoreBoard;
let cursor;
let difficultyManager;
let timer;
let numberButtons;
let messageManager;

//TODO API call

export default class Game {
    constructor(Sketch) {
        sketch = Sketch;


        difficultyManager = new DifficultyManager(FetchDataManager.getLevelIndex(), FetchDataManager.getDifficulty());
        scoreBoard = new ScoreBoard(sketch);
        grid = new Grid(sketch, difficultyManager);
        grid.setup();
        cursor = new CarCursor(sketch, grid.getCarPosition());
        timer = new Timer(sketch);
        numberButtons = new NumberButtonManager(sketch, difficultyManager);
        messageManager = new MessageManager(sketch, grid.getGridLeftBottomPosition().y);

        timer.create();

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
        numberButtons.draw();
        messageManager.draw();
        cursor.draw();
    }

    observerChange(action, data) {
        switch (action) {
            case ObserverChange.mazeSolved:
                this.pauseGame();
                this.mazeFinishedHandler();
                break;
            case ObserverChange.levelFinished:
                this.pauseGame();
                cursor.stopCarGeneration();
                messageManager.displayLevelFinishedMessage(() => this.levelFinishedHandler(), difficultyManager.getCurrentLevelNo());
                break;
            case ObserverChange.dailyTimerFinished:
                this.pauseGame();
                messageManager.displayTimeOverMessage(() => this.dailyTimerFinishedHandler());
                break;
            case ObserverChange.levelNotPassed:
                this.pauseGame()
                cursor.remove();
                messageManager.displayLevelNotPassedMessage(() => this.levelNotPassedHandler());
                break;
            case ObserverChange.difficultyFinished:
                this.pauseGame();
                this.difficultyFinishedHandler();
                break;
            case ObserverChange.gameFinished:
                this.pauseGame();
                FetchDataManager.saveDifficulty(0);
                FetchDataManager.saveLevelIndex(0);
                messageManager.displayGameFinishedMessage(() => this.gameFinishedHandler());
                break;
            case ObserverChange.saveDataToAPI:
                scoreBoard.saveDataToApi(data.level, data.difficulty);
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
                case ObserverChange.incorrectFirstNumberPressed:
                    this.pauseGame();
                    messageManager.displayRememberToPressNumberMessage(() => this.continueGame());
            }
        }
    }

    pauseGame() {
        timer.remove();
        scoreBoard.clearInterval();
        cursor.remove();
        if (difficultyManager.getCurrentLevelNo() === 0) {
            grid.stopListening();
        } else {
            numberButtons.pause();
        }
    }

    continueGame() {
        timer.create();
        if (difficultyManager.getCurrentLevelNo() === 0) {
            grid.startListening();
            scoreBoard.startInterval();
        } else {
            numberButtons.continue();
        }
    }

    mazeFinishedHandler() {
        grid.setup();

        if (difficultyManager.getCurrentLevelNo() === 0) {
            cursor.remove();
            scoreBoard.resetCollisions();
            cursor.setDefaultCarPosition(grid.getCarPosition());
        } else {
            numberButtons.setCorrectCombination(grid.getCorrectCombination());
        }
        this.continueGame();
    }

    startMazeRoundHandler() {
        this.continueGame();
        cursor.create();
    }

    dailyTimerFinishedHandler() {
        this.continueGame();
    }

    levelNotPassedHandler() {
        difficultyManager.resetDifficulty();
        grid.gameNotStarted();
        grid.setup();
        if (difficultyManager.getCurrentLevelNo() === 0) {
            scoreBoard.setDefaultLevelOneScore();
        } else {
            scoreBoard.setDefaultLevelTwoScore();
            numberButtons.setCorrectCombination(grid.getCorrectCombination());
        }
        this.continueGame();
    }

    difficultyFinishedHandler() {
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
        this.mazeFinishedHandler();

        if (difficultyManager.getCurrentLevelNo() === 0) {
            scoreBoard.setDefaultLevelOneScore()
        } else {
            scoreBoard.setDefaultLevelTwoScore()
            this.setLevelTwo();
        }
        this.continueGame();
    }

    setLevelTwo() {
        cursor.stopCarGeneration();
        numberButtons.generate(grid.getGridLeftBottomPosition());
        numberButtons.setCorrectCombination(grid.getCorrectCombination());
        scoreBoard.reset();
        this.continueGame();
    }
}