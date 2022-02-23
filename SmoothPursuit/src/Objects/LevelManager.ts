import ObserverSupport from "./ObserverSupport";
import {ObserverAction} from "./ObserverAction";
import {Observer} from "./Observer";
import {config} from "./config";

export default class LevelManager {
    private currentLevel : number;
    private currentDifficulty : number;
    private difficultyEntries : number;
    private support : ObserverSupport;
    private subDifficultyEntries: number;

    constructor(savedLevel: number, savedDifficulty: number) {
        this.currentLevel = savedLevel;
        this.currentDifficulty = savedDifficulty;
        this.difficultyEntries = 0;
        this.subDifficultyEntries = 1;
        this.support = new ObserverSupport();
    }

    public correctEntry() : void {
        this.subDifficultyEntries++;
        console.log("Correct entry " + this.subDifficultyEntries)
        if (this.subDifficultyEntries === config.levels.subDiffEntries) {
            this.subDifficultyEntries = 0;
            this.difficultyEntries++;
            if (this.difficultyEntries === config.levels.subDifficulties) {
                this.difficultyEntries = 0;
                this.currentDifficulty++;
                if (this.currentDifficulty === 6) {
                    this.currentDifficulty = 0;
                    this.currentLevel++;
                    if (this.currentLevel === 4) {
                        this.support.fire(ObserverAction.gameFinished)
                    } else {
                        this.support.fire(ObserverAction.levelFinished)
                    }
                } else {
                    this.support.fire(ObserverAction.difficultyFinished);
                }
            }
        }
    }

    public getCurrentDifficulty(): number {
        return this.currentDifficulty;
    }

    public getCurrentLevel(): number {
        return this.currentLevel;
    }

    public getDifficultyEntries(): number {
        return this.difficultyEntries;
    }

    public subscribe(observer: Observer): void {
        this.support.subscribe(observer);
    }

    public set(level: number, difficulty: number): void {
        console.log("entry reset")
        this.currentLevel = level;
        this.currentDifficulty = difficulty;
        this.difficultyEntries = 0;
        this.subDifficultyEntries = 0;
    }
}