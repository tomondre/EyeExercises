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
        let savedDifficulty = 2;
        this.levelManger = new LevelManager(savedLevel, savedDifficulty);
        this.scoreBoard = new ScoreBoard(sketch);
        this.timer = new Timer(sketch);
        this.symbolManager = new SymbolLevelManager(sketch, this.levelManger.getCurrentLevel());
        this.subject = new SubjectManager(savedDifficulty, sketch, this.symbolManager);

        this.symbolManager.subscribe(this);
        this.levelManger.subscribe(this);
        this.timer.subscribe(this);

        if (savedLevel === 0) {
            this.createSpaceHandler();
        }


        //TODO remove - testing
        let bool;
        document.getElementById("slowDownButton").addEventListener("pointerdown", () => {
            if (bool) {
                this.subject.setCurrentDifficulty(++savedDifficulty);
                bool = false;
            }
            else  {
                bool = true;
            }
        });
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
                this.levelManger.correctEntry();
                this.increaseScore();
                break;
            case ObserverAction.difficultyFinished:
                console.log("setting up diff: " + this.levelManger.getCurrentDifficulty())
                this.subject.setCurrentDifficulty(this.levelManger.getCurrentDifficulty());
                break;
            case ObserverAction.levelFinished:
                this.subject.setCurrentDifficulty(0);
                this.symbolManager.setLevelIndex(this.levelManger.getCurrentLevel());
                break;
            case ObserverAction.gameFinished:
                break;
            case ObserverAction.incorrectEntry:
                this.decreaseScore();
                break;
        }
    }



    private timeOverHandler() {
        this.continueGame();
    }

    private pauseGame() {
        this.timer.pause();
    }

    private continueGame() {
        this.timer.continue();
    }

    private createSpaceHandler() : void {
        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space') {
                this.spaceHandler();
            }
        });
    }

    private spaceHandler() : void {
        this.symbolManager.redDotEntry()
    }

    private decreaseScore() : void {
        this.scoreBoard.decreaseScore();
    }

    private increaseScore() : void {
        this.scoreBoard.increaseScore();
    }
}