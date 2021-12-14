import * as p5 from "p5";
import {SymbolLevel} from "./SymbolLevel";
import ObserverSupport from "../ObserverSupport";

export default class SymbolLevelTwo implements SymbolLevel {
    private sketch : p5;

    private symbols : string = "☺☽♘♡♫⚅⚐✂☃✈✔✏✰❆➔☏☘☞";
    private symbolInterval : number;
    private symbolTimeout : number;
    private numberOfSymbols : number = 1;
    private generatedSymbols : string = "";
    private shouldBeSymbolGenerated : boolean;
    private support : ObserverSupport;
    constructor(sketch, support: ObserverSupport) {
        this.sketch = sketch;
        this.support = support;
    }

    public draw(x: number, y: number) {
        this.sketch.push();
        if (this.shouldBeSymbolGenerated)
        {
            this.sketch.textSize(50);
            this.sketch.fill('black');
            this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
            this.sketch.text(this.generatedSymbols, x, y);
        }
        this.sketch.pop();
    }

    public continue() {
        clearInterval(this.symbolInterval);
        this.symbolInterval = setInterval(() => {
            this.generateSymbols();
            this.shouldBeSymbolGenerated = true;
            this.symbolTimeout = setTimeout(() => {
               this.shouldBeSymbolGenerated = false;
            }, 1000);
            }, this.sketch.random(3000, 4000));
    }

    public pause() {
        this.shouldBeSymbolGenerated = false;
        clearInterval(this.symbolInterval);
        clearTimeout(this.symbolTimeout);
    }

    private generateSymbols() {
        this.generatedSymbols = "";
        for (let i = 0; i < this.numberOfSymbols; i++) {
            this.generatedSymbols += this.symbols[this.sketch.int(this.sketch.random(0, this.symbols.length))];
        }
        this.numberOfSymbols++;
    }

    public create() : void {
        this.pause();
        this.generatedSymbols = "";
        this.numberOfSymbols = 1;
        this.continue();
    }

    redDotEntry() : void {
    }
}