import TextStyleManager from "./TextStyleManager";
import FetchDataManager from "./FetchDataManager";
import {CST} from "../cst/CST";

let scene;
let timerObject;
let time;
let timerInterval;
let callback;
let shouldTimerBeContinued = true;
let shouldTimerBeDisplayed = true;

export default class Timer {
    constructor(Scene, cb) {
        scene = Scene;
        callback = cb;
        time = FetchDataManager.getEyeTime(CST.eye.RIGHT);
        if (time === -1)
        {
            shouldTimerBeDisplayed = false;
        }
    }

    create() {
        if (!shouldTimerBeDisplayed)
            return;
        clearInterval(timerInterval);
        let style = TextStyleManager.getTextStyle();
        timerObject = scene.add.text(window.innerWidth * 0.1, window.innerHeight * 0.07, "", style);

        this.update();
        this.continue();
    }

    update() {
        if (!shouldTimerBeDisplayed)
            return;
        timerObject.setText("Daily training: " + time);
    }

    destroy() {
        clearInterval(timerInterval);
        timerObject.destroy();
    }

    tick() {
        time--;
        this.update();
        if (time === 0) {
            callback();
            this.pause();
            shouldTimerBeContinued = false;
        }
    }

    pause() {
        clearInterval(timerInterval);
    }

    continue() {
        if(!shouldTimerBeDisplayed)
            return;
        if (shouldTimerBeContinued)
            timerInterval = setInterval(() => this.tick(), 1000);
    }

    switchEye() {
        time = FetchDataManager.getEyeTime(CST.eye.LEFT);
        shouldTimerBeContinued = true;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => this.tick(), 1000);
    }
}