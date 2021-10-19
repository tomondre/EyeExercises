import Dot from "../Objects/Dot";
import ScoreBoard from "../Objects/ScoreBoard";
import DifficultyManager from "../Objects/DifficulityManager";
import Ball from "../Objects/Ball";
import Timer from "../Objects/Timer";
import IntervalManager from "../Objects/IntervalManager";
import {CST} from "../CST";
import EndLevelMessage from "../Messages/EndLevelMessage";
import BackgroundImage from "../Objects/BackgroundImage";
import LevelPassedManager from "../Objects/LevelPassedManager";
import DisplayFixTheBallMessage from "../Messages/DisplayFixTheBallMessage";
import Message from "../Messages/Message";
import {CONFIG} from "../../config/config";

var eye;
var startOfTheRound;
var keyboardListener;

export default class Level1 extends Phaser.Scene {
    constructor() {
        super(CST.SCENES.LEVEL_ONE);
        this.createObjects();
        eye = CST.EYE.RIGHT
    }

    create() {
        BackgroundImage(this);
        this.intervalManager.createBallInterval();
        this.intervalManager.createSymbolInterval();
        this.createSpaceOnKeyboardListener();
        this.scoreBoard.create()
        this.timer.create(() => this.continueTilChangeEyePressed());
        this.levelPassedManager.create();
        startOfTheRound = true;
        let spaceButton = document.getElementById("spaceButton");
        spaceButton.removeEventListener("click", keyboardListener);
        spaceButton.style.visibility = "visible";
        this.addKeyboardButtonListener();
        document.getElementById("slowDownButton").onclick = this.slowDownButtonPressed.bind(this);
    }

    update() {
    }

    createObjects() {
        this.dot = new Dot(this);
        this.scoreBoard = new ScoreBoard(this);
        this.difficultyManager = new DifficultyManager(this, () => this.difficultiesFinished());
        this.ball = new Ball(this);
        this.timer = new Timer(this);
        this.intervalManager = new IntervalManager(() => this.createBall(), () => this.dot.toGenerateRedDot(true), () => this.incorrectSpacePressed());
        this.levelPassedManager = new LevelPassedManager();
    }

    addKeyboardButtonListener() {
        keyboardListener = this.spacePressed.bind(this);
        document.getElementById("spaceButton").addEventListener("click", keyboardListener);
    }

    createSpaceOnKeyboardListener() {
        this.input.keyboard.on('keydown-SPACE', () => {
            this.spacePressed();
        })
    }

    spacePressed() {
        //Valid entry of space pressed
        if (this.dot.isWaitingForSpaceAfterRedDotGenerated()) {
            let reactionTime = this.time.now - this.dot.getLastGeneratedTime();
            if (reactionTime < 1000) {
                console.log(reactionTime);
            }
            this.dot.setWaitingForSpaceAfterRedDotGenerated(false);
            this.correctSpacePressed();
        }
        //Space pressed without dot generated
        else {
            this.incorrectSpacePressed();
        }
        this.intervalManager.clearPlayerResponseTimeout();
    }

    correctSpacePressed() {
        this.difficultyManager.increaseDifficulty();
        startOfTheRound = false;
        this.levelPassedManager.addEntry(true)
        this.scoreBoard.increaseScore();
        this.intervalManager.setBallIntervalTime(this.difficultyManager.getDifficultyUpperIntervalLimit());
    }

    incorrectSpacePressed() {
        this.difficultyManager.decreaseDifficulty();
        if (startOfTheRound) {
            this.pauseGame();
            DisplayFixTheBallMessage(this, () => this.continueGame())
            return;
        }
        this.levelPassedManager.addEntry(false);
        this.scoreBoard.decreaseScore();
        this.intervalManager.setBallIntervalTime(this.difficultyManager.getDifficultyUpperIntervalLimit());
    }

    pauseGame() {
        document.getElementById("spaceButton").removeEventListener("click", keyboardListener);
        this.input.keyboard.off('keydown-SPACE');
        this.timer.pause();
        this.intervalManager.pauseIntervals();
    }

    continueGame() {
        this.addKeyboardButtonListener();
        this.createSpaceOnKeyboardListener();
        this.timer.continue();
        this.intervalManager.continueIntervals();
    }

    createBall() {
        this.intervalManager.setBallIntervalTime(this.difficultyManager.getDifficultyUpperIntervalLimit());
        this.ball.createBall(this.difficultyManager.getCurrentDifficulty());
        if (this.dot.isToGenerateRedDot()) {
            this.dot.createRedDot(this.ball.getX(), this.ball.getY(), this.difficultyManager.getCurrentDifficulty())
            this.intervalManager.createPlayerResponseTimeout();
        } else {
            this.dot.deleteRedDotIfExists();
        }
    }


    difficultiesFinished() {
        this.pauseGame();

        if (this.levelPassedManager.isLevelPassed()) {
            EndLevelMessage(this, 1, () => this.levelUp());
            this.saveDataToAPI();
        } else {
            Message(this, () => this.restartLevel(), CONFIG.messages.levelNotPassed)
        }

        // if (eye === CST.EYE.LEFT) {
        //     if (this.levelPassedManager.isLevelPassed()) {
        //         this.saveDataToAPI();
        //         EndLevelMessage(this, 1, () => this.levelUp());
        //         eye = CST.EYE.RIGHT;
        //     } else {
        //         eye = CST.EYE.RIGHT;
        //         Message(this, () => this.restartLevel(), CONFIG.messages.levelNotPassed)
        //     }
        // } else {
        //     this.saveDataToAPI();
        //     eye = CST.EYE.LEFT;
        //     Message(this,  () => this.restartLevel(),CONFIG.messages.changeEye);
        //     }
        // this.reset();
    }

    reset() {
        this.intervalManager.reset();
        this.registry.destroy();
        this.events.off();
        this.input.keyboard.off('keydown-SPACE');
        this.timer.reset();
        this.intervalManager.resetBallIntervalSpeed();
        this.difficultyManager.reset();
    }

    slowDownButtonPressed() {
        this.intervalManager.slowDownButtonPressed();
    }

    levelUp() {
        this.saveDataToAPI();
        document.getElementById("spaceButton").style.visibility = "hidden";
        this.reset();
        this.scene.start(CST.SCENES.LEVEL_TWO);
    }

    restartLevel() {
        this.reset();
        this.create();
    }

    saveDataToAPI() {
        console.log("Level: " + 1 + ", Score: " + this.scoreBoard.getScore() + ", Eye: " + eye.toString() + ", Difficulty: " + this.difficultyManager.getCurrentDifficultyIndex());
    }

    continueTilChangeEyePressed() {

    }
}