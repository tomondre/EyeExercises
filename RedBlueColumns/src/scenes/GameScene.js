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
        grid = new Grid(this, levelManager);
        scoreBoard = new ScoreBoard(this);
        timer = new Timer(this);
        numberButtonManager = new NumberButtonManager(this, levelManager);

    }

    create() {
        levelManager.create();
        timer.create();
        scoreBoard.create();
        grid.create();
        numberButtonManager.create()
    }

}
