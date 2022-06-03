
import FetchDataManager from "./fetchData"




let timerObject;
let time;
let timerInterval;
let shouldTimerBeContinued = true;
let shouldTimerBeDisplayed = true;
let sketch


export default class Timer {
    constructor() {

        time = FetchDataManager.getCurrentTrainingTime()
        if (time === -1)
        {
            shouldTimerBeDisplayed = false;
        }

    }

    create() {
        if (!shouldTimerBeDisplayed)
            return;
        this.update();
        this.continue();
    }

    update() {
        if (!shouldTimerBeDisplayed)
            return;
        document.getElementById("timeField").innerHTML = "Time: " + time
        this.updateCurrentTime()
        this.continue()
    }

    updateCurrentTime(){
        if(time >= 0) {
            FetchDataManager.saveCurrentTrainingTime(time);
        }
        else {

        }
    }


    destroy() {
        clearInterval(timerInterval);
        timerObject.destroy();
    }

    tick() {
        if(time > 0) {
            time--;
            clearInterval(timerInterval);
            this.update()
        }
    }

    pause() {
        clearInterval(timerInterval);
    }

    continue() {
        if(!shouldTimerBeDisplayed)
            return;
        if (shouldTimerBeContinued) {
            timerInterval = setInterval(() => this.tick(), 1000);
        }
    }

    setToContinue(){
        shouldTimerBeContinued = true;
    }


}