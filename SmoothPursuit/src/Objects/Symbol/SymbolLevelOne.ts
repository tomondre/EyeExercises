import {SymbolLevel} from "./SymbolLevel";
import * as p5 from "p5";
import ObserverSupport from "../ObserverSupport";
import {ObserverAction} from "../ObserverAction";

export default class SymbolLevelOne implements SymbolLevel {
    private redDotTimeout: number;
    private redDotInterval: number;
    private shouldRedDotBeDisplayed: boolean;
    private sketch: p5;
    private isPause: boolean;
    private support: ObserverSupport;

    constructor(sketch, support: ObserverSupport) {
        this.sketch = sketch;
        this.support = support;
    }

    continueSymbolLevel(difficultyEntries: number): void {
        this.continue();
    }

    draw(x: number, y: number) : void {
        this.sketch.push();
        if (this.shouldRedDotBeDisplayed) {
            let c = this.sketch.color('red');
            this.sketch.fill(c);
            this.sketch.circle(x, y, 20);
        }
        this.sketch.pop();
    }

    public continue() : void {
        this.createTimeouts();
        this.isPause = false;
        this.createSpaceListener();
    }

    private spaceHandler(event : KeyboardEvent): void {
        if (event.code === 'Space') {
            this.entry();
        }
    }

    private createSpaceListener() : void {
        this.removeSpaceListener();
        document.addEventListener('keyup', (event) => this.spaceHandler(event));
    }

    private removeSpaceListener() : void {
        document.removeEventListener('keyup', (event) => this.spaceHandler(event));
    }

    public entry() : void {
        if (this.shouldRedDotBeDisplayed)
        {
            this.support.fire(ObserverAction.correctEntry);
            this.shouldRedDotBeDisplayed = false;
        }
        else {
            this.support.fire(ObserverAction.incorrectEntry);
        }
    }

    public pause() : void {
        this.shouldRedDotBeDisplayed = false;
        this.isPause = true;
        clearInterval(this.redDotInterval);
        clearTimeout(this.redDotTimeout);
        this.removeSpaceListener();
    }

    public create(difficultyEntries : number) : void {
        this.pause();
        this.continue();
    }

    private createTimeouts() : void {
        clearInterval(this.redDotInterval);
        this.redDotInterval = setInterval(() => {
            this.shouldRedDotBeDisplayed = true;
            this.redDotTimeout = setTimeout(() => {
                if (this.shouldRedDotBeDisplayed) {
                    this.support.fire(ObserverAction.incorrectEntry)
                }
                this.shouldRedDotBeDisplayed = false;
            }, 1000);
        }, this.sketch.random(3000, 4000));
    }

    reset(): void {
    }
}