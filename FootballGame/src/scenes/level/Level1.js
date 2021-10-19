import Dot from "../../Objects/Dot";
import ScoreBoard from "../../Objects/ScoreBoard";
import DifficultyManager from "../../Objects/DifficulityManager";
import Ball from "../../Objects/Ball";
import Timer from "../../Objects/Timer";
import IntervalManager from "../../Objects/IntervalManager";
import {CST} from "../../CST";
import EndLevelMessage from "../../Messages/EndLevelMessage";
import BackgroundImage from "../../Objects/BackgroundImage";
import LevelPassedManager from "../../Objects/LevelPassedManager";
import DisplayFixTheBallMessage from "../../Messages/DisplayFixTheBallMessage";
import Message from "../../Messages/Message";
import {CONFIG} from "../../../config/config";
import EyeManager from "../../Objects/EyeManager";

var startOfTheRound;
var keyboardListener;

export default class Level1 extends Phaser.Scene {
    constructor() {
        super(CST.SCENES.LEVEL_ONE);
        this.createObjects();
    }

    create() {
        BackgroundImage(this);
        this.intervalManager.createBallInterval();
        this.intervalManager.createSymbolInterval();
        this.createSpaceListeners();
        this.scoreBoard.create()
        this.timer.create(() => this.continueTilChangeEyePressed());
        this.levelPassedManager.create();
        startOfTheRound = true;
        let spaceButton = document.getElementById("spaceButton");
        spaceButton.removeEventListener("click", keyboardListener);
        spaceButton.style.visibility = "visible";
        this.addKeyboardButtonListener();
        document.getElementById("slowDownButton").onclick = this.slowDownButtonPressed.bind(this);
        this.eyeManager.create();
    }

    init(input)
    {
        this.eyeManager.setEye(input.eye);
        this.difficultyManager.setDifficulty(input.difficulty);
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
        this.eyeManager = new EyeManager(this, () => this.changeEye(), () => this.exitGame());
    }

    addKeyboardButtonListener() {

    }

    createSpaceListeners() {
        this.input.keyboard.on('keydown-SPACE', () => {
            this.spacePressed();
        });
        keyboardListener = this.spacePressed.bind(this);
        document.getElementById("spaceButton").addEventListener("click", keyboardListener);
    }

    removeSpaceListeners()
    {
        document.getElementById("spaceButton").removeEventListener("click", keyboardListener);
        this.input.keyboard.off('keydown-SPACE');
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
        this.removeSpaceListeners();
        this.timer.pause();
        this.intervalManager.pauseIntervals();
    }

    continueGame() {
        this.addKeyboardButtonListener();
        this.createSpaceListeners();
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

        this.reset();

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
        this.removeSpaceListeners();
        this.timer.reset();
        this.intervalManager.resetBallIntervalSpeed();
        this.difficultyManager.reset();

    }

    slowDownButtonPressed() {
        this.intervalManager.slowDownButtonPressed();
    }

    levelUp() {
        document.getElementById("spaceButton").style.visibility = "hidden";
        this.reset();
        this.scene.stop();
        this.scene.start(CST.SCENES.LEVEL_TWO, {eye: this.eyeManager.getEye(), difficulty: 0, continue: true});
    }

    restartLevel() {
        this.reset();
        this.create();
    }

    saveDataToAPI() {
        console.log("Level: " + 1 + ", Score: " + this.scoreBoard.getScore() + ", Eye: " + this.eyeManager.getEyeString().toString() + ", Difficulty: " + this.difficultyManager.getCurrentDifficultyIndex());
    }

    changeEye()
    {
        this.scene.restart();
        this.saveDataToAPI();
        this.scene.start(CST.SCENES.MAIN, {eye: CST.EYE.LEFT});
    }

    continueTilChangeEyePressed() {
        if (this.eyeManager.getEye() === CST.EYE.RIGHT)
        {
            this.eyeManager.displayChangeEyeButton();
        }
        else {
            this.eyeManager.displayExitGameButton();
        }
    }

    exitGame()
    {

    }
}