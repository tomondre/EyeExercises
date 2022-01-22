import * as p5 from "p5";
import {SymbolLevel} from "./SymbolLevel";
import ObserverSupport from "../ObserverSupport";
import {ObserverAction} from "../ObserverAction";
import {config} from "../config";

export default class SymbolLevelImpl implements SymbolLevel {
    private sketch: p5;
    public symbols: string;
    private symbolAppearTimeout: number = 0;
    private symbolRemovingTimeout: NodeJS.Timeout;
    private numberOfSymbols: number;
    private generatedSymbols: string[] = [];
    private shouldBeSymbolGenerated: boolean;
    private support: ObserverSupport;
    private symbolPointer: number = 0;
    private symbolColor : string = config.colors.symbolColor;

    constructor(sketch: p5, support: ObserverSupport) {
        this.sketch = sketch;
        this.support = support;
    }

    public draw(x: number, y: number): void {
        this.sketch.push();
        if (this.shouldBeSymbolGenerated) {
            this.sketch.textSize(50);
            this.sketch.fill(this.symbolColor);
            this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
            this.sketch.text(this.generatedSymbols[this.symbolPointer], x, y);
        }
        this.sketch.pop();
    }

    public continue(): void {
        this.create(this.numberOfSymbols);
    }

    public createSymbolsShowingSequence(): void {
        clearTimeout(this.symbolAppearTimeout);
        clearTimeout(this.symbolRemovingTimeout);
        let timeoutTime = this.sketch.random(3000, 4000);
        this.symbolAppearTimeout = window.setTimeout(() => {
            this.shouldBeSymbolGenerated = true;
            this.symbolRemovingTimeout = setTimeout(() => {
                this.shouldBeSymbolGenerated = false;
                this.symbolPointer++;
                if (this.symbolPointer < this.generatedSymbols.length) {
                    this.createSymbolsShowingSequence()
                } else {
                    setTimeout(() => {
                        this.support.fire(ObserverAction.symbolsDisplayed, {data: this.generatedSymbols.join("")});
                    }, 1000)
                }
            }, 1000);
        }, timeoutTime);
    }

    public pause(): void {
        this.shouldBeSymbolGenerated = false;
        clearTimeout(this.symbolAppearTimeout);
        clearTimeout(this.symbolRemovingTimeout);
    }

    private generateSymbols(): void {
        do {
            console.log("iter");
            this.generatedSymbols = [];
            for (let i = 0; i < this.numberOfSymbols; i++) {
                let randomIndex = this.sketch.int(this.sketch.random(0, this.symbols.length));
                this.generatedSymbols.push(this.symbols[randomIndex]);
            }
        } while (new Set(this.generatedSymbols).size !== this.generatedSymbols.length)
    }

    public create(difficultyEntries: number): void {
        //TODO
        // if (difficultyEntries === this.numberOfSymbols)
        //     return;
        this.pause();
        this.numberOfSymbols = difficultyEntries;
        this.symbolPointer = 0;
        this.generateSymbols();
        this.createSymbolsShowingSequence();
    }

    public entry(): void {
    }

    continueSymbolLevel(difficultyEntries: number): void {
        this.symbolPointer = 0;
        this.generateSymbols();
        this.createSymbolsShowingSequence();
    }

    reset(): void {
    }
}