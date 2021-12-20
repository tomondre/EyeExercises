import FetchDataManager from "./FetchDataManager";
import ObserverSupport from "../observer/ObserverSupport";
import {ObserverChange} from "../observer/ObserverChange";
import {config} from "../config";
import Helper from "./Helper";

let sketch;
let time;
let interval;
let support;
let shouldBeTimerDisplayed = true;

export default class Timer {
    constructor(Sketch) {
        sketch = Sketch;
        time = FetchDataManager.getTime();
        if (time === -1)
        {
            shouldBeTimerDisplayed = false;
        }
        support = new ObserverSupport();
    }

    draw() {
        if (!shouldBeTimerDisplayed)
            return;
        sketch.fill(config.colors.timer);
        sketch.textAlign(sketch.LEFT, sketch.TOP);
        if (Helper.isMobile())
        {
            sketch.textSize(config.textSize.mobileScreen);
        }
        else {
            sketch.textSize(config.textSize.normalScreen);
        }
        sketch.text("Time: " + time, window.innerWidth * 0.1, window.innerHeight * 0.125);
    }

    create() {
        if (!shouldBeTimerDisplayed)
            return;
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