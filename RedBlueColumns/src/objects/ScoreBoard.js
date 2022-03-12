import {CONFIG} from "../configs/CONFIG";
import TextStyleManager from "./TextStyleManager";


let scene = null;
let scoreCount = 0;
let scoreBoardObject = null;
let numberOfCorrectEntries = 0;
let numberOfEntries = 0;
let numberOfIncorrectEntries = 0;
let passed = 0;
let levelManager;

export default class ScoreBoard {
    constructor(Scene, LeveManager) {
        scene = Scene;
        levelManager = LeveManager;
    }

    create() {
        let style = TextStyleManager.getTextStyle();
        scoreBoardObject = scene.add.text(window.innerWidth * 0.1, window.innerHeight * 0.125, "Score: " + scoreCount, style);
    }

    update() {
        scoreBoardObject.setText("Score: " + scoreCount);
    }

    increaseScore(){
        scoreCount += CONFIG.scoreBoard.increase;
        numberOfCorrectEntries++;
        numberOfEntries++;
        this.update();
    }
    decreaseScore(){
        scoreCount -= CONFIG.scoreBoard.decrease;
        numberOfIncorrectEntries++;
        numberOfEntries++;
        this.update();
    }
    reset() {
        scoreCount = 0;
    }

    resetLevelCheck()
    {
        numberOfIncorrectEntries = 0;
        numberOfEntries = 0;
        numberOfCorrectEntries = 0;
    }
    isLevelPassed()
    {
        if(numberOfCorrectEntries - numberOfIncorrectEntries === numberOfEntries){
            passed++;
        }
        return passed >= CONFIG.levels[levelManager.getCurrentLevelIndex()].correctPuzzlesToPassLevel;
    }

}
