import {CONFIG} from "../../config/config";

var numberOfEntries;
var correctEntries;


export default class LevelPassedManager {
    constructor() {
        numberOfEntries = 0;
        correctEntries = 0;
    }
    addEntry(isCorrect) {
        numberOfEntries++;
        if (isCorrect) {
            correctEntries++;
        }
    }

    isLevelPassed() {
        let actualPercentage = correctEntries / numberOfEntries
        return actualPercentage > CONFIG.score.percentToPassTheLevel;
    }

    reset() {
        numberOfEntries = 0;
        correctEntries = 0;
    }

    create() {
        this.reset();
    }
}