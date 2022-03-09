import {CONFIG} from "../CONFIG";
import TextStyleManager from "./TextStyleManager";

let scene = null;
let scoreCount = 0;
let scoreBoardObject = null;
let streak = 0;
let numberOfCorrectEntries = 0;
let numberOfEntries = 0;

export default class ScoreBoard {
    constructor(Scene) {
        scene = Scene;
    }

    create() {
        let style = TextStyleManager.getTextStyle()
        scoreBoardObject = scene.add.text(window.innerWidth * 0.1, window.innerHeight * 0.125, "Score: " + scoreCount, style)
    }

    // update() {
    //     scoreBoardObject.setText("Score: " + scoreCount);
    // }
    //
    // increaseScore() {
    //     scoreCount += CONFIG.scoreBoard.increase;
    //     if (++streak === 3) {
    //         scoreCount += CONFIG.scoreBoard.increase;
    //         streak = 0;
    //     }
    //     numberOfEntries++;
    //     numberOfCorrectEntries++;
    //     this.update();
    // }
    //
    // decreaseScore() {
    //     scoreCount -= CONFIG.scoreBoard.decrease;
    //     streak = 0;
    //     numberOfEntries++;
    //     this.update();
    // }
    //
    // reset() {
    //     scoreCount = 0;
    //     streak = 0;
    // }
    //
    // resetLevelCheck()
    // {
    //     numberOfEntries = 0;
    //     numberOfCorrectEntries = 0;
    // }
    //
    // getScore() {
    //     return scoreCount;
    // }
    //
    // isLevelPassed()
    // {
    //     return (numberOfCorrectEntries / numberOfEntries) > CONFIG.percentOfSuccessToPassLevel;
    // }
}
