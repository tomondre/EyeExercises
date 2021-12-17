import * as p5 from "p5";
import {SymbolLevel} from "./SymbolLevel";
import ObserverSupport from "../ObserverSupport";
import {ObserverAction} from "../ObserverAction";
import {config} from "../config";

export default class SymbolLevelTwo implements SymbolLevel {
    private sketch: p5;
    private symbols: string = config.levels.levelTwoSymbols;
    private symbolAppearTimeout: number = 0;
    private symbolRemovingTimeout: number;
    private numberOfSymbols: number;
    private generatedSymbols: string[] = [];
    private shouldBeSymbolGenerated: boolean;
    private support: ObserverSupport;
    private symbolPointer: number = 0;

    constructor(sketch: p5, support: ObserverSupport) {
        this.sketch = sketch;
        this.support = support;
    }

    public draw(x: number, y: number): void {
        this.sketch.push();
        if (this.shouldBeSymbolGenerated) {
            this.sketch.textSize(50);
            this.sketch.fill('black');
            this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
            this.sketch.text(this.generatedSymbols[this.symbolPointer], x, y);
        }
        this.sketch.pop();
    }

    public continue(): void {
    }

    public createSymbolsShowingSequence(): void {
        clearInterval(this.symbolAppearTimeout);

        let timeoutTime = this.sketch.random(3000, 4000);
        let timeout: number = window.setTimeout(() => {
            this.shouldBeSymbolGenerated = true;
            this.symbolRemovingTimeout = setTimeout(() => {
                this.shouldBeSymbolGenerated = false;
                this.symbolPointer++;
                if (this.symbolPointer < this.generatedSymbols.length) {
                    this.createSymbolsShowingSequence()
                } else {
                    this.support.fire(ObserverAction.symbolsDisplayed, {data: this.generatedSymbols.join("")});
                }
            }, 1000);
        }, timeoutTime);
        //TODO fix bug
        // this.symbolAppearTimeout = timeout;
        // clearTimeout(timeout);
    }

    public pause(): void {
        this.shouldBeSymbolGenerated = false;
        clearInterval(this.symbolAppearTimeout);
        clearTimeout(this.symbolRemovingTimeout);
    }

    private generateSymbols(): void {
        this.generatedSymbols = [];
        for (let i = 0; i < this.numberOfSymbols; i++) {
            this.generatedSymbols.push(this.symbols[this.sketch.int(this.sketch.random(0, this.symbols.length))]);
        }
        this.numberOfSymbols++;
    }

    public create(): void {
        this.pause();
        this.generatedSymbols = [];
        this.numberOfSymbols = 1;
        this.generateSymbols();
        this.createSymbolsShowingSequence();
    }

    public redDotEntry(): void {
    }
}