import ObserverSupport from "../ObserverSupport";
import {Observer} from "../Observer";
import * as p5 from "p5";
import {SymbolLevel} from "./SymbolLevel";
import SymbolLevelOne from "./SymbolLevelOne";
import SymbolLevelTwo from "./SymbolLevelTwo";
import SymbolLevelThree from "./SymbolLevelThree";
import SymbolLevelFour from "./SymbolLevelFour";

export default class SymbolLevelManager {

    private support : ObserverSupport;
    private levelIndex : number = 0;
    private symbols : SymbolLevel[];

    constructor(sketch : p5, savedLevel : number) {
        this.support = new ObserverSupport();
        this.levelIndex = savedLevel;
        this.symbols = [];
        this.symbols.push(new SymbolLevelOne(sketch, this.support));
        this.symbols.push(new SymbolLevelTwo(sketch, this.support));
        this.symbols.push(new SymbolLevelThree(sketch, this.support));
        this.symbols.push(new SymbolLevelFour(sketch, this.support));
    }

    public draw(x : number, y : number) : void{
        this.symbols[this.levelIndex].draw(x, y);
    }

    public setLevelIndex(levelIndex : number) : void
    {
        this.symbols[this.levelIndex].pause();
        this.levelIndex = levelIndex;
    }

    public redDotEntry() : void {
        if (this.levelIndex === 0) {
            this.symbols[0].entry();
        }
    }

    public subscribe(observer : Observer) : void {
        this.support.subscribe(observer);
    }

    public pause() : void {
        this.symbols[this.levelIndex].pause();
    }

    public continue() : void {
        this.symbols[this.levelIndex].continue();
    }

    public create(difficultyEntries : number) : void {
        this.symbols[this.levelIndex].create(difficultyEntries);
    }

    public reset() : void {
        this.symbols[this.levelIndex].reset();
    }

    continueSymbolLevel(difficultyEntries: number) {
        this.symbols[this.levelIndex].continueSymbolLevel(difficultyEntries);
    }
}