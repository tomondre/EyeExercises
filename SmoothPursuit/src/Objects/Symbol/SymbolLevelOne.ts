import {SymbolLevel} from "./SymbolLevel";
import * as p5 from "p5";

export default class SymbolLevelOne implements SymbolLevel{
    private redDotTimeout : number;
    private redDotInterval : number;
    private shouldRedDotBeDisplayed : boolean;
    private sketch : p5;
    private isPause : boolean;

    constructor(sketch : p5) {
        this.sketch = sketch;
    }

    draw(x: number, y: number) {
        this.sketch.push();
        if (this.shouldRedDotBeDisplayed)
        {
            let c = this.sketch.color('red');
            this.sketch.fill(c);
            this.sketch.circle(x, y, 20);
        }
        this.sketch.pop();
    }

    continue() {
        clearInterval(this.redDotInterval);
        this.redDotInterval = setInterval(() => {
                this.shouldRedDotBeDisplayed = true;
                this.redDotTimeout = setTimeout(() => {
                    this.shouldRedDotBeDisplayed = false;
                }, 1000);
        }, this.sketch.random(3000, 4000));
        this.isPause = false;
    }

    pause() {
        this.shouldRedDotBeDisplayed = false;
        this.isPause = true;
        clearInterval(this.redDotInterval);
        clearTimeout(this.redDotTimeout);
    }
}