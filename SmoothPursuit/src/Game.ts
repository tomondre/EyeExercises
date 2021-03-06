import p5 = require("p5");
import ScoreBoard from "./Objects/ScoreBoard";
import Timer from "./Objects/Timer";
import {Observer} from "./Objects/Observer";
import {ObserverAction} from "./Objects/ObserverAction";
import LevelManager from "./Objects/LevelManager";
import SubjectManager from "./Objects/Subject/SubjectManager";
import SymbolLevelManager from "./Objects/Symbol/SymbolLevelManager";
import ButtonManager from "./Objects/ButtonManager";
import {Eyes} from "./Objects/Eyes";
import EyeManager from "./Objects/EyeManager";
import MessageManager from "./Objects/MessageManager";
import FetchDataManager from "./Objects/FetchDataManager";
import {config} from "./Objects/config";
import SaveAPI from "./Objects/SaveAPI";

export default class Game implements Observer {

    private sketch: p5;
    private scoreBoard: ScoreBoard;
    private timer: Timer;
    private levelManger: LevelManager;
    private subject: SubjectManager;
    private symbolManager: SymbolLevelManager;
    private buttonManager: ButtonManager;
    private eyeManager: EyeManager;
    private messageManager: MessageManager;
    private api: SaveAPI;
    private backgroundColor : string = config.colors.backgroundColor;

    constructor(sketch: p5) {
        let savedLevel =
            FetchDataManager.getEyeLevelIndex(Eyes.RIGHT);
        let savedDifficulty =
            FetchDataManager.getEyeDifficulty(Eyes.RIGHT);
        let savedTime =
            FetchDataManager.getEyeTime(Eyes.RIGHT);

        this.sketch = sketch;
        this.levelManger = new LevelManager(savedLevel, savedDifficulty);
        this.scoreBoard = new ScoreBoard(sketch);
        this.timer = new Timer(savedTime, sketch);
        this.symbolManager = new SymbolLevelManager(sketch, this.levelManger.getCurrentLevel());
        this.subject = new SubjectManager(savedDifficulty, sketch, this.symbolManager);
        this.buttonManager = new ButtonManager(sketch);
        this.eyeManager = new EyeManager(sketch);
        this.messageManager = new MessageManager(sketch);
        this.api = new SaveAPI();

        this.removePictureIfLevelFour()

        this.symbolManager.subscribe(this);
        this.levelManger.subscribe(this);
        this.timer.subscribe(this);
        this.buttonManager.subscribe(this);
    }


    public draw(): void {
        this.sketch.background(this.backgroundColor);
        this.scoreBoard.draw();
        this.timer.draw();
        this.eyeManager.draw();
        this.subject.draw();
        this.buttonManager.draw();
    }

    public update(change: ObserverAction, props): void {
        switch (change) {
            case ObserverAction.timeOver:
                this.pauseGame();
                this.timeOverHandler()
                break;
            case ObserverAction.correctEntry:
                this.increaseScore();
                this.levelManger.correctEntry();
                break;
            case ObserverAction.difficultyFinished:
                this.difficultyFinishedHandler();
                break;
            case ObserverAction.levelFinished:
                this.pauseGame();
                this.messageManager.levelFinishedMessage(this.levelUp.bind(this), this.levelManger.getCurrentLevel());
                break;
            case ObserverAction.gameFinished:
                FetchDataManager.saveEyeDifficulty(0, this.eyeManager.getCurrentEye());
                FetchDataManager.saveEyeLevelIndex(0, this.eyeManager.getCurrentEye());
                this.pauseGame();
                this.messageManager.gameFinishedMessage(this.closeGame.bind(this));
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
        // console.log(ObserverAction[change]);
    }

    private correctSymbolEntryHandler() {
        this.continueGameSymbolLevel();
        this.scoreBoard.increaseScore();
        this.levelManger.correctEntry();
    }

    private incorrectSymbolEntryHandler() {
        this.continueGameSymbolLevel();
        this.scoreBoard.decreaseScore();
        this.levelManger.correctEntry();
    }

    private timeOverHandler(): void {
        if (this.eyeManager.getCurrentEye() === Eyes.LEFT) {
            this.messageManager.bothEyesTimeOverMessage(this.closeGame.bind(this), () => {
                this.buttonManager.removeButtons();
                this.continueGame();
            });
            return;
        } else {
            this.messageManager.changeEyeMessage(this.changeEyeHandler.bind(this), () => {
                this.buttonManager.removeButtons();
                this.continueGame();
            });
        }
    }

    private closeGame(): void {
        window.close();
    }

    private pauseGame(): void {
        this.timer.pause();
        this.subject.pause();
    }

    private continueGame() {
        this.timer.continue();
        this.subject.continue();
    }

    private decreaseScore(): void {
        this.scoreBoard.decreaseScore();
    }

    private increaseScore(): void {
        this.scoreBoard.increaseScore();
    }

    private displaySymbolsHandler(props: string) {
        this.pauseGame();
        let arr = props;
        this.buttonManager.displayButtonOptions(arr, this.levelManger.getCurrentLevel());
    }

    private continueGameSymbolLevel(): void {
        this.timer.continue();
        this.subject.continueSymbolLevel(this.levelManger.getDifficultyEntries() + 1);
    }

    private levelUp() {
        this.saveData();
        let level = this.levelManger.getCurrentLevel();
        let diff = 0;
        this.set(level, diff);
        this.timer.continue();
    }

    private set(level: number, difficulty: number): void {
        this.levelManger.set(level, difficulty);
        this.symbolManager.setLevelIndex(level);
        this.subject.setCurrentDifficulty(difficulty);
        this.removePictureIfLevelFour()
    }

    private difficultyFinishedHandler() {
        this.saveData();
        this.subject.setCurrentDifficulty(this.levelManger.getCurrentDifficulty());
        this.removePictureIfLevelFour()
    }

    private changeEyeHandler() {
        this.buttonManager.removeButtons();
        this.saveData();

        let level =
            FetchDataManager.getEyeLevelIndex(Eyes.LEFT);
        let difficulty =
            FetchDataManager.getEyeDifficulty(Eyes.LEFT);
        let time =
            FetchDataManager.getEyeTime(Eyes.LEFT);
        this.timer.create(time);
        this.scoreBoard.resetScore();
        this.eyeManager.setEye(Eyes.LEFT);
        this.set(level, difficulty);
    }

    private saveData() {
        let currentEye = this.eyeManager.getCurrentEye();
        let currentLevel = this.levelManger.getCurrentLevel();
        let currentDifficulty = this.levelManger.getCurrentDifficulty();
        let score = this.scoreBoard.getScore();
        this.api.uploadData(score, currentEye.toString(), currentLevel);
        FetchDataManager.saveEyeLevelIndex(currentLevel, currentEye);
        FetchDataManager.saveEyeDifficulty(currentDifficulty, currentEye);
        this.scoreBoard.resetScore();
    }

    public removePictureIfLevelFour(): void {
        if (this.levelManger.getCurrentLevel() === 3) {
            this.subject.removePicture();
        }
    }
}