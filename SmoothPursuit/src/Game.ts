import p5 = require("p5");
import ScoreBoard from "./Objects/ScoreBoard";
import Timer from "./Objects/Timer";
import {Observer} from "./Objects/Observer";
import {ObserverAction} from "./Objects/ObserverAction";
import LevelManager from "./Objects/LevelManager";
import SubjectManager from "./Objects/Subject/SubjectManager";
import SymbolLevelManager from "./Objects/Symbol/SymbolLevelManager";

export default class Game implements Observer{

    private sketch : p5;
    private scoreBoard : ScoreBoard;
    private timer : Timer;
    private levelManger : LevelManager;
    private subject : SubjectManager;
    private symbolManager : SymbolLevelManager;

    constructor(sketch : p5) {
        this.sketch = sketch;
        let savedLevel = 0;
        let savedDifficulty = 3;
        this.levelManger = new LevelManager(savedLevel, savedDifficulty);
        this.scoreBoard = new ScoreBoard(sketch);
        this.timer = new Timer(sketch);
        this.symbolManager = new SymbolLevelManager(sketch, this.levelManger.getCurrentLevel());
        this.subject = new SubjectManager(savedDifficulty, sketch, this.symbolManager);

        this.symbolManager.subscribe(this);
        this.levelManger.subscribe(this);
        this.timer.subscribe(this);
    }


    public draw() {
        this.sketch.background(255)
        this.scoreBoard.draw();
        this.timer.draw();
        this.subject.draw();
    }

    public update(change: ObserverAction): void {
        switch (change) {
            case ObserverAction.timeOver:
                this.pauseGame();
                this.timeOverHandler();
                break;
            case ObserverAction.correctEntry:
                break;
            case ObserverAction.difficultyFinished:
                break;
            case ObserverAction.levelFinished:
                break;
            case ObserverAction.gameFinished:
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