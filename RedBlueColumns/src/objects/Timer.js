import TextStyleManager from "./TextStyleManager";
import {CST} from "./CST";

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
        time = 150;
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
        if(time > 0) {
            time--;
            this.update();
        }
        else {
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


}