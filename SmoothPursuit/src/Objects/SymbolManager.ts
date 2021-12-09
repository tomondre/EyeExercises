import ObserverSupport from "./ObserverSupport";
import {Observer} from "./Observer";
import * as p5 from "p5";
import LevelManager from "./LevelManager";

export default class SymbolManager {

    private support : ObserverSupport;
    private sketch : p5;
    private levelIndex : number;

    constructor(sketch : p5) {
        this.sketch = sketch;
    }

    public draw() {
        switch (this.levelIndex) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    public setLevelIndex(levelIndex : number)
    {
        this.levelIndex = levelIndex;
        this.reset();
    }

    public subscribe(observer : Observer) {
        this.support.subscribe(observer);
    }

    private reset() {

    }
}