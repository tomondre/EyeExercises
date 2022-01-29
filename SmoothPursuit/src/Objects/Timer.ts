import p5 = require("p5");
import {Observer} from "./Observer";
import ObserverSupport from "./ObserverSupport";
import {ObserverAction} from "./ObserverAction";
import {config} from "./config";

export default class Timer {

    private sketch : p5;
    private time : number;
    private intervalNum : NodeJS.Timer;
    private support : ObserverSupport
    private shouldTimerBeDisplayed : boolean = true;
    private color : string = config.colors.textColor;

    constructor(time : number, sketch : p5) {
        if (time === -1) {
            this.shouldTimerBeDisplayed = false;
        }

        this.support = new ObserverSupport();
        this.sketch = sketch;
        this.time = time;
        this.continue();
    }

    public continue() : void {
        if (!this.shouldTimerBeDisplayed)
            return;

        clearInterval(this.intervalNum);
        this.intervalNum = setInterval(() => this.sec(), 1000)
    }

    public pause() : void{
        clearInterval(this.intervalNum);
    }

    public draw() : void{
        if (!this.shouldTimerBeDisplayed)
            return;
        this.sketch.push();
        this.sketch.textSize(40);
        this.sketch.fill(this.color);
        this.sketch.text("Time: " + this.time, 0.1 * this.sketch.canvas.width, 0.07 * this.sketch.canvas.height);
        this.sketch.pop();
    }

    private sec() : void{
        if (this.time === 0)
            return;
        this.time--;
        if (this.time === 0) {
            clearInterval(this.intervalNum);
            this.support.fire(ObserverAction.timeOver);
        }
    }

    public subscribe(observer : Observer) : void {
        this.support.subscribe(observer);
    }

    public create(time: number) : void {
        if (time === -1)
        {
            this.shouldTimerBeDisplayed = false;
        }
        if (!this.shouldTimerBeDisplayed)
            return;
        this.time = time;
        this.continue();
    }
}