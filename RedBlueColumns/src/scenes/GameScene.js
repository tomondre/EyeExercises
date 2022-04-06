import {CST} from "../objects/CST";

import ScoreBoard from "../objects/ScoreBoard";
import LevelsManager from "../objects/LevelsManager";
import Timer from "../objects/Timer";
import Grid from "../objects/Grid";
import SymbolButtonManager from "../objects/SymbolButtonManager";
import MessageManager from "../objects/MessageManager";
import FetchDataManager from "../objects/FetchDataManager";
import TimerSetting from "../objects/TimerSetting";



let levelManager;
let scoreBoard;
let timer;
let grid;
let symbolButtonManager;
let messageManager;
let timeSetting;

let isTimeSet;


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.scene.GAME});
        levelManager = new LevelsManager();
        grid = new Grid(this, levelManager, () => this.puzzleFinished());
        scoreBoard = new ScoreBoard(this, levelManager);
        timer = new Timer(this, () => this.timeOver());
        timeSetting = new TimerSetting(this, () => this.switchView())
        symbolButtonManager = new SymbolButtonManager(this, levelManager, (symbol) => this.symbolCheck(symbol));
        messageManager = new MessageManager(this);
        isTimeSet = FetchDataManager.isTimeSet();
    }

    create() {
        if(!isTimeSet)
            this.createBeforeGame()
        else
            this.createGame()
    }
    switchView(){
        timeSetting.destroy();
        isTimeSet = true;
        this.create();
    }
    createBeforeGame(){
        document.getElementById("restartWindowButton").style.visibility = "visible";
        document.getElementById("restartWindowButton").onclick = () => this.restartScene();
        document.getElementById("levelDown").style.visibility = "hidden";
        timeSetting.create();
    }
    createGame(){
        document.getElementById("levelDown").style.visibility = "visible";
        levelManager.create();
        timer.create();
        scoreBoard.create();
        grid.create();
        symbolButtonManager.create()
        symbolButtonManager.createKeyboardListener()
        FetchDataManager.saveLevelIndex( levelManager.getCurrentLevelIndex());
        if (levelManager.getCurrentLevel() !== 1)
            document.getElementById("levelDown").onclick = () => this.confirmLevelDown();
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
        timer.saveCurrent();
        timer.updateTime();
        timer.setToContinue();

        //FetchDataManager.switchTimeSet();

        this.scene.restart();
    }
    pauseGame() {
        timer.pause();
        //symbolButtonManager.removeListener();
    }
    timeOver() {
        this.pauseGame();
        messageManager.displayTimePassed(() => this.timeOverAction());
    }
    timeOverAction(){

    }
    confirmLevelDown() {
        this.pauseGame();
        messageManager.displayConfirmLevelDownMassage(() => this.levelDown(), () => this.continueGame());
    }
    continueGame() {
        timer.continue();
        this.createKeyboardListeners();
    }
    levelDown() {
        scoreBoard.reset();
        scoreBoard.resetEntryValues();
        levelManager.goDownOneLevel();
        grid.destroy();
        this.restartScene();
    }
}
