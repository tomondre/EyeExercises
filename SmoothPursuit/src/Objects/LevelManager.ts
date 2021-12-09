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
        this.support = new ObserverSupport();
    }

    public correctEntry() : void {
        this.difficultyEntries++;
        if (this.difficultyEntries === 4) {
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
        else {
            this.support.fire(ObserverAction.correctEntry);
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

}