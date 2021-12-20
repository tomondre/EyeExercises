import ObserverSupport from "./ObserverSupport";
import {ObserverAction} from "./ObserverAction";
import {Observer} from "./Observer";

export default class LevelManager {
    private currentLevel : number;
    private currentDifficulty : number;
    private difficultyEntries : number;
    private support : ObserverSupport;

    constructor(savedLevel : number, savedDifficulty : number) {
        this.currentLevel = savedLevel;
        this.currentDifficulty = savedDifficulty;
        this.difficultyEntries = 0;
        this.support = new ObserverSupport();
    }

    public correctEntry() : void {
        this.difficultyEntries++;
        if (this.difficultyEntries === 3) {
            this.difficultyEntries = 0;
            this.currentDifficulty++;

            if (this.currentDifficulty === 6) {
                this.currentDifficulty = 0;
                this.currentLevel++;
                if (this.currentLevel === 4)
                {
                    this.support.fire(ObserverAction.gameFinished)
                } else {
                    this.support.fire(ObserverAction.levelFinished)
                }
            }
            else {
                this.support.fire(ObserverAction.difficultyFinished);
            }
        }
    }

    public getCurrentDifficulty() : number {
        return this.currentDifficulty;
    }

    public getCurrentLevel() : number {
        return this.currentLevel;
    }

    public getDifficultyEntries() : number {
        return this.difficultyEntries;
    }

    public subscribe(observer : Observer) : void{
        this.support.subscribe(observer);
    }

    public set(level : number, difficulty : number) : void {
        this.currentLevel = level;
        this.currentDifficulty = difficulty;
        this.difficultyEntries = 0;

    }

}