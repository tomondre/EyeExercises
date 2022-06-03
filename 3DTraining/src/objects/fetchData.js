import {config} from "../Config/config";

export default class FetchDataManager {
    saveLevelIndex(level) {
        if(level >= 0 && level < config.levels.length)
        window.localStorage.setItem("904/Level/", level);
    }

    getLevelIndex() {
        var index = window.localStorage.getItem("904/Level/");
        if (index === null)
            return 0;
        else
            return parseInt(index);
    }

    savePuzzleIndex(level) {
        if(level < 40)
        window.localStorage.setItem("905/Puzzle/", level);
    }

    getPuzzleIndex() {
        var index = window.localStorage.getItem("905/Puzzle/");
        if (index === null)
            return 0;
        else
            return parseInt(index);
    }

    static saveCurrentTrainingTime(time) {
        window.localStorage.setItem("906/CurrentTime/", time);
    }

    static getCurrentTrainingTime() {
        var index = window.localStorage.getItem("906/CurrentTime/");
        if (index === null || index <= 0) {
            console.log(1)
            return 150
        } else
            return parseInt(index);
    }
}