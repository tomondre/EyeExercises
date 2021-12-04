import p5 = require("p5");
import {Observer} from "./Observer";
import ObserverSupport from "./ObserverSupport";
import {ObserverAction} from "./ObserverAction";

export default class Timer {

    private sketch : p5;
    private time : number;
    private intervalNum : number;
    private support : ObserverSupport

    constructor(sketch : p5) {
        this.support = new ObserverSupport();
        this.sketch = sketch;
        this.time = 0;
    }

    public continue() {
        clearInterval(this.intervalNum);
        this.intervalNum = setInterval(() => this.sec(), 1000)
    }

    public pause() {
        clearInterval(this.intervalNum);
    }

    public draw() {

    }

    private sec() {
        this.time--;
        if (this.time === 0) {
            clearInterval();
            this.support.fire(ObserverAction.timeOver);
        }
    }

    public subscribe(observer : Observer) {
        this.support.subscribe(observer);
    }
}