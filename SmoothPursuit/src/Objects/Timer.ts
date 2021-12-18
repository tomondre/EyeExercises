import p5 = require("p5");
import {Observer} from "./Observer";
import ObserverSupport from "./ObserverSupport";
import {ObserverAction} from "./ObserverAction";

export default class Timer {

    private sketch : p5;
    private time : number;
    private intervalNum : number;
    private support : ObserverSupport

    constructor(time : number, sketch : p5) {
        this.support = new ObserverSupport();
        this.sketch = sketch;
        this.time = time;
        this.continue();
    }

    public continue() : void {
        clearInterval(this.intervalNum);
        this.intervalNum = setInterval(() => this.sec(), 1000)
    }

    public pause() : void{
        clearInterval(this.intervalNum);
    }

    public draw() : void{
        this.sketch.text("Time: " + this.time, 0.1 * this.sketch.canvas.width, 0.125 * this.sketch.canvas.height);
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
        this.time = time;
        this.continue();
    }
}