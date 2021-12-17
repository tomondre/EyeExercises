import ObserverSupport from "../ObserverSupport";
import {Observer} from "../Observer";
import * as p5 from "p5";
import {SymbolLevel} from "./SymbolLevel";
import SymbolLevelOne from "./SymbolLevelOne";
import SymbolLevelTwo from "./SymbolLevelTwo";

export default class SymbolLevelManager {

    private support : ObserverSupport;
    private levelIndex : number = 0;
    private symbols : SymbolLevel[];

    constructor(sketch : p5, savedLevel : number) {
        this.support = new ObserverSupport();

        this.symbols = [];
        this.symbols.push(new SymbolLevelOne(sketch, this.support));
        this.symbols.push(new SymbolLevelTwo(sketch, this.support));

        this.setLevelIndex(savedLevel);
    }

    public draw(x : number, y : number) : void{
        this.symbols[this.levelIndex].draw(x, y);
    }

    public setLevelIndex(levelIndex : number) : void
    {
        this.symbols[this.levelIndex].pause();
        this.levelIndex = levelIndex;
        this.symbols[levelIndex].create();
    }

    public redDotEntry() : void {
        if (this.levelIndex === 0) {
            this.symbols[0].redDotEntry();
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

    public create() : void {
        this.symbols[this.levelIndex].create();
    }
}