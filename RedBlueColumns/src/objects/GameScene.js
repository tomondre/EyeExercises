import {CST} from "./CST";

import ScoreBoard from "./ScoreBoard";
import LevelsManager from "./LevelsManager";
import Timer from "./Timer";
import Grid from "./Grid";


let levelManager;
let scoreBoard;
let timer;
let grid;


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.scene.GAME});
        levelManager = new LevelsManager();
        grid = new Grid(this, levelManager);
        scoreBoard = new ScoreBoard(this);
        timer = new Timer(this);

    }

    create() {
        levelManager.create();
        timer.create();
        scoreBoard.create();
        grid.create();
    }

}
