import {CST} from "../objects/CST";

import ScoreBoard from "../objects/ScoreBoard";
import LevelsManager from "../objects/LevelsManager";
import Timer from "../objects/Timer";
import Grid from "../objects/Grid";
import SymbolButtonManager from "../objects/SymbolButtonManager";


let levelManager;
let scoreBoard;
let timer;
let grid;
let symbolButtonManager;


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.scene.GAME});
        levelManager = new LevelsManager();
        grid = new Grid(this, levelManager, () => this.puzzleFinished());
        scoreBoard = new ScoreBoard(this, levelManager);
        timer = new Timer(this);
        symbolButtonManager = new SymbolButtonManager(this, levelManager, (symbol) => this.symbolCheck(symbol));

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
