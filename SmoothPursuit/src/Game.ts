import p5 = require("p5");
import ScoreBoard from "./Objects/ScoreBoard";
import Timer from "./Objects/Timer";
import {Observer} from "./Objects/Observer";
import {ObserverAction} from "./Objects/ObserverAction";

export default class Game implements Observer{

    private scoreBoard : ScoreBoard;
    private timer : Timer;

    constructor(sketch : p5) {
        this.scoreBoard = new ScoreBoard(sketch);
        this.timer = new Timer(sketch);
        this.timer.subscribe(this);
    }

    public draw() {
        this.scoreBoard.draw();
        this.timer.draw();
        console.log("draw");
    }

    public update(change: ObserverAction): void {
        switch (change) {
            case ObserverAction.timeOver:
                this.pauseGame();
                this.timeOverHandler();
                break;
        }
    }

    private timeOverHandler() {
        console.log("timeOVer")
        this.continueGame();
    }

    private pauseGame() {
        this.timer.pause();
    }

    private continueGame() {
        this.timer.continue();
    }
}