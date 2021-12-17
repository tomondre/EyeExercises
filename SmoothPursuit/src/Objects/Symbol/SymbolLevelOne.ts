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
        this.isPause = false;
    }

    public redDotEntry() : void {
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
    }

    public create() : void {
        this.pause();
        this.continue();
    }
}