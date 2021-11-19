import {config} from "../config";
import ObserverSupport from "../observer/ObserverSupport";
import {ObserverChange} from "../observer/ObserverChange";

let difficulties = config.difficulties;

let currentDifficulty;

let numberOfMazeSolved = 0;
let currentLevel = 0;

let support;

export default class DifficultyManager {

    constructor(savedLevel, savedDifficulty) {
        support = new ObserverSupport();
        currentDifficulty = savedDifficulty;
        currentLevel = savedLevel;
    }

    increaseDifficulty() {
        currentDifficulty++;
        numberOfMazeSolved = 0;
    }

    getCurrentDifficultyNo() {
        return difficulties[currentDifficulty].difficulty;
    }

    getCurrentLevelNo() {
        return currentLevel;
    }

    getCurrentColumnNo() {
        return difficulties[currentDifficulty].numberOfColumns;
    }

    getNoOfNumbers() {
        return difficulties[currentDifficulty].numberOfNumbersWhenLevelTwo;
    }

    mazeSolved() {
        numberOfMazeSolved++;
        if (numberOfMazeSolved === difficulties[currentDifficulty].numberOfMazes) {
            support.fire(ObserverChange.saveDataToAPI, {difficulty: currentDifficulty, level: currentLevel})
            numberOfMazeSolved = 0;
            currentDifficulty++;
            if (currentDifficulty === difficulties.length) {
                currentDifficulty = 0;
                currentLevel++;

                if (currentLevel === 2) {
                    support.fire(ObserverChange.gameFinished);
                } else {
                    support.fire(ObserverChange.levelFinished);
                }
            } else {
                support.fire(ObserverChange.difficultyFinished);
            }
        }
        else {
            support.fire(ObserverChange.mazeSolved);
        }
    }

    resetDifficulty() {
        numberOfMazeSolved = 0;
    }

    subscribe(observer) {
        support.subscribe(observer)
    }

    unsubscribe(observer) {
        support.unsubscribe(observer);
    }
}