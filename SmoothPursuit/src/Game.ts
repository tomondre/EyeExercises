import p5 = require("p5");
import ScoreBoard from "./Objects/ScoreBoard";
import Timer from "./Objects/Timer";
import {Observer} from "./Objects/Observer";
import {ObserverAction} from "./Objects/ObserverAction";
import LevelManager from "./Objects/LevelManager";
import SubjectManager from "./Objects/Subject/SubjectManager";
import SymbolLevelManager from "./Objects/Symbol/SymbolLevelManager";
import Helper from "./Objects/Helper";
import ButtonManager from "./Objects/ButtonManager";
import FetchDataManager from "./Objects/FetchDataManager";
import {Eyes} from "./Objects/Eyes";

export default class Game implements Observer {

    private sketch : p5;
    private scoreBoard : ScoreBoard;
    private timer : Timer;
    private levelManger : LevelManager;
    private subject : SubjectManager;
    private symbolManager : SymbolLevelManager;
    private buttonManager : ButtonManager;

    constructor(sketch : p5) {
        let savedLevel = FetchDataManager.getEyeLevelIndex(Eyes.RIGHT);
        let savedDifficulty = FetchDataManager.getEyeDifficulty(Eyes.RIGHT);
        let savedTime = FetchDataManager.getEyeTime(Eyes.RIGHT);

        this.sketch = sketch;
        this.levelManger = new LevelManager(savedLevel, savedDifficulty);
        this.scoreBoard = new ScoreBoard(sketch);
        this.timer = new Timer(savedTime, sketch);
        this.symbolManager = new SymbolLevelManager(sketch, this.levelManger.getCurrentLevel());
        this.subject = new SubjectManager(savedDifficulty, sketch, this.symbolManager);
        this.buttonManager = new ButtonManager(sketch);

        this.symbolManager.subscribe(this);
        this.levelManger.subscribe(this);
        this.timer.subscribe(this);
        this.buttonManager.subscribe(this);

        if (savedLevel === 0) {
            this.createSpaceHandler();
        }

        //TODO remove - testing
        // let bool;
        // document.getElementById("slowDownButton").addEventListener("pointerdown", () => {
        //     if (bool) {
        //         this.subject.setCurrentDifficulty(++savedDifficulty);
        //         bool = false;
        //     }
        //     else  {
        //         bool = true;
        //     }
        // });
    }


    public draw() : void{
        this.sketch.textSize(40);
        this.sketch.background(255);
        this.scoreBoard.draw();
        this.timer.draw();
        this.subject.draw();
        this.buttonManager.draw();
    }

    public update(change : ObserverAction, props): void {
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
            case ObserverAction.symbolsDisplayed:
                this.displaySymbolsHandler(props.data);
                break;
            case ObserverAction.correctEntrySymbolLevel:
                this.correctSymbolEntryHandler();
                break;
            case ObserverAction.incorrectEntrySymbolLevel:
                this.incorrectSymbolEntryHandler();
                break;
        }
    }

    private correctSymbolEntryHandler() {
        this.levelManger.correctEntry();
        this.scoreBoard.increaseScore();
        this.continueGameSymbolLevel();
    }

    private incorrectSymbolEntryHandler() {
        this.levelManger.correctEntry();
        this.scoreBoard.decreaseScore();
        this.continueGameSymbolLevel();
    }

    private timeOverHandler() : void {
        this.continueGame();
    }

    private pauseGame() : void {
        this.timer.pause();
        this.subject.pause();
    }

    private continueGame() {
        this.timer.continue();
        this.subject.continue();
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

    private displaySymbolsHandler(props : string) {
        this.pauseGame();
        let arr = props;
        let randomOptions = Helper.get().getRandomOptions(this.levelManger.getCurrentLevel(), arr.length);
        this.buttonManager.displayButtonOptions(arr, randomOptions);
    }

    private continueGameSymbolLevel() : void {
        this.timer.continue();
        this.subject.continueSymbolLevel(this.levelManger.getDifficultyEntries() + 1);
    }
}