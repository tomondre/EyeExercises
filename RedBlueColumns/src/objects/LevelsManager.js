import {CONFIG} from "../configs/CONFIG";
import FetchDataManager from "./FetchDataManager";
import {CST} from "./CST";

let levels = CONFIG.levels;
let currentLevelIndex;
let puzzlesPassedCount = 0;
let firstFetch = true;

export default class LevelsManager {

    create() {
        if (firstFetch) {
            currentLevelIndex = FetchDataManager.getLevelIndex();
            firstFetch = false;
        }
    }

    levelFinished() {
        if(currentLevelIndex !== CONFIG.levels.length - 1) {
            currentLevelIndex++;
        }
        else {
            currentLevelIndex = 0;
        }
    }

    puzzlePassed() {
        puzzlesPassedCount++;
    }

    isEyeRoundPassed() {
        return this.getCorrectPuzzlesToPassLevelNo() === puzzlesPassedCount;
    }

    resetPuzzleCount()
    {
        puzzlesPassedCount = 0;
    }

    changeEye() {
        currentLevelIndex = FetchDataManager.getEyeLevelIndex(CST.eye.LEFT);
    }

    goDownOneLevel() {
        currentLevelIndex--;
    }

    getCurrentLevel() {
        return levels[currentLevelIndex].levelNo;
    }

    getCurrentLevelIndex() {
        return currentLevelIndex;
    }

    getRowCount() {
        return levels[currentLevelIndex].rows;
    }

    getVerticalOuterArrowsNo() {
        return levels[currentLevelIndex].verticalOuterArrows;
    }

    getHorizontalOuterArrowsNo() {
        return levels[currentLevelIndex].horizontalOuterArrows;
    }

    getCorrectPuzzlesToPassLevelNo() {
        return levels[currentLevelIndex].correctPuzzlesToPassLevel;
    }
}