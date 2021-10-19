import {CONFIG} from "../../config/config.js";

let difficultiesFinishedCallback;

export default class DifficultyManager {
    constructor(scene, callback) {
        difficultiesFinishedCallback = callback;
        this.scene = scene;
        this.difficulties = CONFIG.difficulty;
        this.currentDifficulty = 0;
    }

    // checkForDifficulty(ballIntervalTime) {
    //     let difficulty = this.difficulties[this.currentDifficulty]
    //
    //     if (difficulty.lowerIntervalLimit <= ballIntervalTime && difficulty.upperIntervalLimit >= ballIntervalTime) {
    //         return;
    //     }
    //
    //     //True when the ball interval time is smaller then the current difficulty boundary. Used for checking difficulties
    //     if (difficulty.upperIntervalLimit < ballIntervalTime && this.currentDifficulty !== 0) {
    //         this.currentDifficulty--;
    //     } else if ((difficulty.lowerIntervalLimit > ballIntervalTime && this.currentDifficulty < this.difficulties.length - 1) && this.currentDifficulty !== 7) {
    //         this.currentDifficulty++;
    //     }
    // }

    getCurrentDifficulty() {
        return this.difficulties[this.currentDifficulty]
    }

    reset() {
        this.currentDifficulty = 0
    }

    getCurrentDifficultyIndex()
    {
        return this.currentDifficulty;
    }

    increaseDifficulty() {
        if (this.currentDifficulty + 1 === this.difficulties.length) {
            difficultiesFinishedCallback();
            return;
        }
        this.currentDifficulty++;
        console.log("Difficulty increased");
    }

    decreaseDifficulty() {
        if (this.currentDifficulty !== 0)
            this.currentDifficulty--;
    }

    getDifficultyUpperIntervalLimit() {
        return this.difficulties[this.currentDifficulty].upperIntervalLimit;
    }
}