import {CST} from "../cst/CST";
import Grid from "../objects/Grid";
import LevelsManager from "../objects/LevelsManager";
import ArrowControls from "../objects/ArrowControls";
import ScoreBoard from "../objects/ScoreBoard";
import MessageManager from "../objects/MessageManager";
import Timer from "../objects/Timer";
import ButtonManager from "../objects/ButtonManager";
import EyeManager from "../objects/EyeManager";
import FetchDataManager from "../objects/FetchDataManager";
import APIcall from "../objects/APIcall";

let grid;
let levelManager;
let arrowControl;
let scoreBoard;
let messageManager;
let timer;
let cursorKeys;
let buttonManager;
let eyeManager;
let api;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.scene.GAME});
        eyeManager = new EyeManager(this);
        levelManager = new LevelsManager();
        grid = new Grid(this, levelManager, () => this.puzzleFinished());
        arrowControl = new ArrowControls(this, (arrow) => this.keyboardHandler(arrow))
        scoreBoard = new ScoreBoard(this);
        buttonManager = new ButtonManager(this);
        messageManager = new MessageManager(this, buttonManager);
        timer = new Timer(this, () => this.timeOver());
        api = new APIcall();
    }

    create() {
        api.create();
        levelManager.create();
        eyeManager.create();
        buttonManager.create();
        arrowControl.create();
        grid.create();
        scoreBoard.create();
        timer.create(eyeManager.getEye());
        FetchDataManager.saveEyeLevelIndex(eyeManager.getEye(), levelManager.getCurrentLevelIndex());
        this.createKeyboardListeners();
        if (levelManager.getCurrentLevel() !== 1)
            document.getElementById("levelDown").onclick = () => this.confirmLevelDown();

    }

    createKeyboardListeners() {
        arrowControl.createListeners()
        cursorKeys = this.input.keyboard.createCursorKeys();
        cursorKeys.up.on('down', () => this.keyboardHandler(CST.arrowDirection.UP))
        cursorKeys.right.on('down', () => this.keyboardHandler(CST.arrowDirection.RIGHT))
        cursorKeys.down.on('down', () => this.keyboardHandler(CST.arrowDirection.DOWN))
        cursorKeys.left.on('down', () => this.keyboardHandler(CST.arrowDirection.LEFT))
    }

    removeKeyboardListeners() {
        arrowControl.removeListeners();
        cursorKeys.up.off('down');
        cursorKeys.right.off('down');
        cursorKeys.down.off('down');
        cursorKeys.left.off('down');
    }

    keyboardHandler(arrow) {
        if (grid.checkKeyboardEntry(arrow)) {
            scoreBoard.increaseScore();
        } else {
            scoreBoard.decreaseScore();
        }
    }

    puzzleFinished() {
        timer.pause();
        levelManager.puzzlePassed();
        if (levelManager.isEyeRoundPassed()) {
            if (scoreBoard.isLevelPassed()) {
                this.saveDataToAPI();
                messageManager.displayLevelPassedMessage(() => this.levelFinished(), levelManager.getCurrentLevel())
            } else {
                messageManager.displayLevelNotPassedMessage(() => this.levelNotFinished())
            }
        } else {
            this.restartScene();
        }
    }

    changeEye() {
        this.saveDataToAPI();
        levelManager.resetPuzzleCount();
        buttonManager.reset();
        scoreBoard.reset();
        messageManager.removeInterval();
        levelManager.changeEye();
        eyeManager.switchEye();
        timer.switchEye();
        this.restartScene();
    }

    restartScene() {
        this.scene.restart();
    }

    levelFinished() {
        levelManager.resetPuzzleCount();
        scoreBoard.reset();
        scoreBoard.resetLevelCheck();
        levelManager.levelFinished();
        this.restartScene();
    }

    levelNotFinished() {
        levelManager.resetPuzzleCount();
        scoreBoard.resetLevelCheck();
        scoreBoard.reset();
        this.restartScene();
    }

    confirmLevelDown() {
        this.pauseGame();
        messageManager.displayConfirmLevelDownMassage(() => this.levelDown(), () => this.continueGame());
    }

    levelDown() {
        this.saveDataToAPI();
        scoreBoard.reset();
        scoreBoard.resetLevelCheck();
        levelManager.goDownOneLevel();
        grid.destroy();
        this.restartScene();
    }

    pauseGame() {
        timer.pause();
        this.removeKeyboardListeners();
    }

    continueGame() {
        timer.continue();
        this.createKeyboardListeners();
    }

    timeOver() {
        this.pauseGame();
        if (eyeManager.isRightEye()) {
            messageManager.displayChangeEyeMessage(() => this.changeEye(), () => this.continueTilEyeChangePressed());
        } else {
            messageManager.displayLeftEyeMessage(() => this.exitGame(), () => this.continueTilExitGamePressed());
        }
    }

    exitGame() {
        this.saveDataToAPI()
        console.log("Exited");
    }

    continueTilEyeChangePressed() {
        buttonManager.displayChangeEyeButton(() => this.changeEye());
        this.continueGame();
    }

    continueTilExitGamePressed() {
        buttonManager.displayExitButton(() => this.exitGame());
        this.continueGame();
    }

    saveDataToAPI() {
        //Check so we are not uploading unrelated data. For example when client goes down
        if (!scoreBoard.getScore() < 90)
            api.uploadData(scoreBoard.getScore(), eyeManager.getEye(), levelManager.getCurrentLevel());
    }
}
