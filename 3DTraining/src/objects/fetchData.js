import {config} from "../Config/config";

/**
 * persistence part
 * saves currently to local storage
 */
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
        window.localStorage.setItem("907/CurrentTime/", time);
    }

    static getCurrentTrainingTime() {
        var index = window.localStorage.getItem("907/CurrentTime/");
        if (index === null || index <= 0) {
            return 300
        } else
            return parseInt(index);
    }

    static saveCurrentScore(score){
        window.localStorage.setItem("908/CurrentScore/", score);
    }
    static getCurrentScore(){
        console.log("local storage of score")
        var score = window.localStorage.getItem("908/CurrentScore/");
        if (score === null || score <= 0) {
            return 0
        } else
            return parseInt(score);
    }

}