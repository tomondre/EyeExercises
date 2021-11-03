import {config} from "./config";

//TODO remove comments

let difficulties = config.difficulties;
let currentDifficulty = 0;
let numberOfMazeSolved = 0;

export default class DifficultyManager {

    increaseDifficulty() {
        currentDifficulty++;
        numberOfMazeSolved = 0;
    }

    getCurrentDifficultyNo() {
        return difficulties[currentDifficulty].difficulty;
    }

    getCurrentColumnNo()
    {
        return difficulties[currentDifficulty].numberOfColumns;
    }

    mazeSolved() {
        numberOfMazeSolved++;
        if (this.isDifficultyFinished()) {
            numberOfMazeSolved = 0;
            console.log("increased")
            this.increaseDifficulty();
        }
    }

    isLevelFinished() {
        if (this.isDifficultyFinished() && currentDifficulty >= difficulties.length)
        {
            numberOfMazeSolved = 0;
            return true;
        }
        return false;
    }

    isDifficultyFinished() {
        if (difficulties[currentDifficulty] === undefined) {
            console.log("level finished")
            numberOfMazeSolved = 0;
            return true;
        }
        return numberOfMazeSolved >= (difficulties[currentDifficulty].numberOfMazes);
    }
}