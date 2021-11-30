import FetchDataManager from "./FetchDataManager";
import ObserverSupport from "../observer/ObserverSupport";
import {ObserverChange} from "../observer/ObserverChange";
import {config} from "../config";
import TextStyler from "./TextStyler";

let sketch;
let time;
let interval;
let support;

export default class Timer {
    constructor(Sketch) {
        sketch = Sketch;
        time = FetchDataManager.getTime();
        support = new ObserverSupport();
    }

    draw() {
        sketch.fill(config.colors.timer);
        sketch.textAlign(sketch.LEFT, sketch.TOP);
        sketch.textSize(config.textSize.normalScreen);
        sketch.text("Time: " + time, window.innerWidth * 0.1, window.innerHeight * 0.125);
    }

    create() {
        if (time !== 0) {
            clearInterval(interval);
            interval = setInterval(() => this.sec(), 1000);
        }
    }

    sec() {
        time--;
        if (time === 0) {
            this.remove();
            support.fire(ObserverChange.dailyTimerFinished);
        }
    }

    remove() {
        clearInterval(interval);
    }

    reset() {
        this.remove();
    }
}