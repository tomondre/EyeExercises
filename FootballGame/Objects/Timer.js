import {CONFIG} from "../../config/config.js";
import {CST} from "../CST";
import FetchDataManager from "./FetchDataManager";
import TextStyleManager from "./TextStyleManager";

export default class Timer {
    constructor(scene) {
        this.scene = scene
        this.timerText = null;
        this.interval = null;
        this.time = 10;
    }

    create(callback, eye) {
        this.reset();
        if (eye === CST.EYE.RIGHT) {
            this.time = FetchDataManager.getEyeTime(CST.EYE.RIGHT);
        } else {
            this.time = FetchDataManager.getEyeTime(CST.EYE.LEFT);
        }
        this.timeOverCB = callback;
        let timerTextStyle = TextStyleManager.getTextStyle()
        this.timerText = this.scene.add.text(this.scene.game.canvas.width * 0.1,this.scene.game.canvas.width * 0.01, "", timerTextStyle);
        this.interval = setInterval(() => this.sec(), 1000);
        this.update();
    }

    update() {
        this.timerText.setText("Time: " + this.time)
    }

    reset() {
        clearInterval(this.interval);
    }

    sec() {
        this.time -= 1;

        if (this.time === 0) {
            clearInterval(this.interval);
            this.timeOverCB();
        }
        this.update();
    }

    pause() {
        clearInterval(this.interval);
    }

    continue() {
        this.interval = setInterval(() => this.sec(), 1000);
    }
}