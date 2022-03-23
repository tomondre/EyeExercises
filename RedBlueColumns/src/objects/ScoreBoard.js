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

let streak = 0;

export default class ScoreBoard {
    constructor(Scene, LeveManager) {
        scene = Scene;
        levelManager = LeveManager;
    }

    create() {
        let style = TextStyleManager.getTextStyle();
        scoreBoardObject = scene.add.text(window.innerWidth * CONFIG.Board.scoreWidth, window.innerHeight * CONFIG.Board.scoreHeight, "Score: " + scoreCount, style);
    }

    update() {
        scoreBoardObject.setText("Score: " + scoreCount);
    }

    increaseScore(){
        scoreCount += CONFIG.scoreBoard.increase;
        numberOfCorrectEntries++;
        numberOfEntries++;
        if(streak >= 3){
            scoreCount += CONFIG.scoreBoard.increase;
            streak = 0;
        }
        else {
            streak++;
        }
        this.update();
    }
    decreaseScore(){
        scoreCount -= CONFIG.scoreBoard.decrease;
        numberOfIncorrectEntries++;
        numberOfEntries++;
        streak = 0;
        this.update();
    }

    resetEntryValues(){
        numberOfIncorrectEntries = 0;
        numberOfEntries = 0;
        numberOfCorrectEntries = 0;
    }
    reset()
    {
        numberOfIncorrectEntries = 0;
        numberOfEntries = 0;
        numberOfCorrectEntries = 0;
        passed = 0;
    }
    isLevelPassed()
    {
        if(this.isPuzzlePassed()){
            passed++;
        }
        return passed >= CONFIG.levels[levelManager.getCurrentLevelIndex()].correctPuzzlesToPassLevel;
    }
    isPuzzlePassed(){
        return numberOfCorrectEntries - numberOfIncorrectEntries === numberOfEntries
    }

}
