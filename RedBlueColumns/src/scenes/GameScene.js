import {CST} from "../objects/CST";

import ScoreBoard from "../objects/ScoreBoard";
import LevelsManager from "../objects/LevelsManager";
import Timer from "../objects/Timer";
import Grid from "../objects/Grid";
import SymbolButtonManager from "../objects/SymbolButtonManager";
import MessageManager from "../objects/MessageManager";


let levelManager;
let scoreBoard;
let timer;
let grid;
let symbolButtonManager;
let messageManager;


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.scene.GAME});
        levelManager = new LevelsManager();
        grid = new Grid(this, levelManager, () => this.puzzleFinished());
        scoreBoard = new ScoreBoard(this, levelManager);
        timer = new Timer(this, () => this.timeOver());
        symbolButtonManager = new SymbolButtonManager(this, levelManager, (symbol) => this.symbolCheck(symbol));
        messageManager = new MessageManager(this);
    }

    create() {
        levelManager.create();
        timer.create();
        scoreBoard.create();
        grid.create();
        symbolButtonManager.create()
        symbolButtonManager.createKeyboardListener()
    }


    levelFinished() {
        levelManager.resetPuzzleCount();
        scoreBoard.reset();
        levelManager.levelFinished();
        this.restartScene();
    }

    puzzleFinished() {
        timer.pause();
        levelManager.puzzlePassed();
        if (scoreBoard.isLevelPassed()) {
            messageManager.displayLevelPassedMessage(() => this.levelFinished(), levelManager.getCurrentLevel())
        } else {
            if(!scoreBoard.isPuzzlePassed()) {
                messageManager.displayLevelNotPassedMessage(() => this.levelNotFinished())
            }
            else {
                this.levelNotFinished()
            }
        }

    }

    levelNotFinished() {
        scoreBoard.resetEntryValues();
        levelManager.resetPuzzleCount();
        this.restartScene();
    }

    symbolCheck(symbol) {
        if (grid.checkKeyboardEntry(symbol)) {
            scoreBoard.increaseScore();
        } else {
            scoreBoard.decreaseScore();
        }
    }

    restartScene() {
        this.scene.restart();
    }
    pauseGame() {
        timer.pause();
        symbolButtonManager.removeListener();
    }
}
