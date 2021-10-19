import ScoreBoard from "../Objects/ScoreBoard";
import SymbolManager from "../Objects/SymbolManager";
import DifficultyManager from "../Objects/DifficulityManager";
import Ball from "../Objects/Ball";
import ButtonManager from "../Objects/ButtonManager";
import IntervalManager from "../Objects/IntervalManager";
import EndLevelMessage from "../Messages/EndLevelMessage";
import BackgroundImage from "../Objects/BackgroundImage";
import Timer from "../Objects/Timer";
import {CST} from "../CST";
import LevelPassedManager from "../Objects/LevelPassedManager";
import Message from "../Messages/Message";
import {CONFIG} from "../../config/config";

var levelNo;
var eye;
var symbolTimeout;


export default class SymbolLevel extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.createObjects();
        eye = CST.EYE.RIGHT;
    }

    createObjects() {
        this.symbolManager = new SymbolManager(this);
        this.scoreBoard = new ScoreBoard(this);
        this.difficultyManager = new DifficultyManager(this)
        this.ball = new Ball(this);
        this.buttonManager = new ButtonManager(this);
        this.intervalManager = new IntervalManager(() => this.createBall(), () => this.symbolManager.setToGenerateSymbol(true), null);
        this.buttonManager = new ButtonManager(this);
        this.timer = new Timer(this);
        this.levelPassedManager = new LevelPassedManager();
    }

    create() {
        this.levelPassedManager.create();
        BackgroundImage(this);
        this.scoreBoard.create()
        this.symbolManager.setLevelFinishedCallback(() => this.roundFinished())

        this.symbolManager.generateSymbols(this.difficultyManager.getCurrentDifficulty())
        this.intervalManager.createBallInterval();
        this.timer.create(() => this.roundFinished(), eye);
        this.intervalManager.createSymbolInterval();
        document.getElementById("slowDownButton").onclick = this.slowDownButtonPressed.bind(this);
    }

    update() {
    }

    createBall() {
        this.ball.createBall(this.difficultyManager.getCurrentDifficulty())
        if (this.symbolManager.isToGenerateSymbol()) {
            this.symbolManager.createSymbol(this.ball.getX(), this.ball.getY())

            //Sets up timer after last symbol in the sequence that is displayed. After this timeout, the options are displayed
            if (this.symbolManager.noMoreSymbolsLeft()) {
                symbolTimeout = setTimeout(() => this.displaySymbolOptions(), 2500);
            }
        } else {
            this.symbolManager.removeSymbol()
        }
    }


    displaySymbolOptions() {
        let options = this.symbolManager.getOptions(this.difficultyManager.getCurrentDifficulty())

        this.timer.pause();
        this.buttonManager.displayOptionButtons(options, (selectedIndex) => this.checkForValidAnswer(selectedIndex));
        this.intervalManager.reset();
    }

    checkForValidAnswer(selectedIndex) {
        let correctAnswer = this.buttonManager.getCorrectOptionIndex();
        if (selectedIndex === correctAnswer) {
            this.correctAnswer();
        } else {
            this.incorrectAnswer();
        }
        this.intervalManager.setBallIntervalTime(this.difficultyManager.getCurrentDifficulty().lowerIntervalLimit);
        this.buttonManager.destroyOptionButtons();
        this.continueGame();
    }

    correctAnswer() {
        this.scoreBoard.increaseScore();
        this.levelPassedManager.addEntry(true);
        this.difficultyManager.increaseDifficulty();
    }

    incorrectAnswer() {
        this.scoreBoard.decreaseScore();
        this.levelPassedManager.addEntry(false);
    }

    continueGame() {
        this.timer.continue();
        this.symbolManager.generateSymbols(this.difficultyManager.getCurrentDifficulty());
        this.intervalManager.createBallInterval();
        this.intervalManager.createSymbolInterval();
    }

    reset() {
        this.levelPassedManager.reset();
        this.intervalManager.reset();
        this.registry.destroy();
        this.events.off();
        this.difficultyManager.reset();
    }

    setSymbolType(level) {
        levelNo = level;
        this.symbolManager.setLevel(level);
    }

    roundFinished() {
        this.intervalManager.reset();
        clearTimeout(symbolTimeout);
        if (eye === CST.EYE.LEFT) {
            if (this.levelPassedManager.isLevelPassed()) {
                if (levelNo !== 5) {
                    EndLevelMessage(this, levelNo, () => this.levelUp());
                    eye = CST.EYE.RIGHT;
                } else
                    this.gameFinished();
            } else {
                eye = CST.EYE.RIGHT;
                Message(this, () => this.restartLevel(), CONFIG.messages.levelNotPassed)
            }
        } else {
            eye = CST.EYE.LEFT;
            Message(this, () => this.restartLevel(), CONFIG.messages.changeEye);
        }
        this.reset();
    }

    slowDownButtonPressed() {
        this.intervalManager.slowDownButtonPressed()
    }

    restartLevel() {
        this.reset();
        this.create();
    }
}