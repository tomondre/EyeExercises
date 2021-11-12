import {config} from "../config";
import ObserverSupport from "../observer/ObserverSupport";
import {ObserverChange} from "../observer/ObserverChange";

let difficulties = config.difficulties;
let currentDifficulty = 0;
let numberOfMazeSolved = 0;
let currentLevel = 0;

let support;

export default class DifficultyManager {

    constructor() {
        support = new ObserverSupport();
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

    mazeSolved() {
        numberOfMazeSolved++;
        if (numberOfMazeSolved === difficulties[currentDifficulty].numberOfMazes) {
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
    }

    subscribe(observer) {
        support.subscribe(observer)
    }

    unsubscribe(observer) {
        support.unsubscribe(observer);
    }
}