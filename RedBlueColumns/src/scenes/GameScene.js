import {CST} from "../objects/CST";

import ScoreBoard from "../objects/ScoreBoard";
import LevelsManager from "../objects/LevelsManager";
import Timer from "../objects/Timer";
import Grid from "../objects/Grid";
import NumberButtonManager from "../objects/NumberButtonManager";


let levelManager;
let scoreBoard;
let timer;
let grid;
let numberButtonManager


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.scene.GAME});
        levelManager = new LevelsManager();
        grid = new Grid(this, levelManager, () => this.puzzleFinished());
        scoreBoard = new ScoreBoard(this, levelManager);
        timer = new Timer(this);
        numberButtonManager = new NumberButtonManager(this, levelManager, (symbol) => this.symbolCheck(symbol));

    }

    create() {
        levelManager.create();
        timer.create();
        scoreBoard.create();
        grid.create();
        numberButtonManager.create()
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
            this.levelFinished();
        } else {
            this.restartScene();
        }
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
}
