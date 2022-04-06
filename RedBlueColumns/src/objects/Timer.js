import TextStyleManager from "./TextStyleManager";
import FetchDataManager from "./FetchDataManager";
import {CONFIG} from "../configs/CONFIG";
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
        if (time === -1)
        {
            shouldTimerBeDisplayed = false;
        }
    }

    create() {
        this.updateTime()
        if (!shouldTimerBeDisplayed)
            return;
        clearInterval(timerInterval);
        let style = TextStyleManager.getTextStyle();
        timerObject = scene.add.text(window.innerWidth * CONFIG.Board.timerWidth, window.innerHeight * CONFIG.Board.timerHeight, "", style);

        this.update();
        this.continue();
    }

    update() {
        if (!shouldTimerBeDisplayed)
            return;
        timerObject.setText("Daily training: " + time);
    }

    updateTime(){
        if(FetchDataManager.getCurrentTrainingTime() !== 0 || FetchDataManager.getCurrentTrainingTime() !== null){
            time = FetchDataManager.getCurrentTrainingTime();
        }
        else{
            time = FetchDataManager.getTrainingTime()
        }
    }

    saveCurrent(){
        if(time !== 0) {
            FetchDataManager.saveCurrentTrainingTime(time);
        }
        else {
            FetchDataManager.saveCurrentTrainingTime(FetchDataManager.getTrainingTime())
        }
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

    setToContinue(){
        shouldTimerBeContinued = true;
    }


}