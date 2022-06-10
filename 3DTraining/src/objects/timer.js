
import FetchDataManager from "./fetchData"




let timerObject;
let time;
let timerInterval;
let shouldTimerBeContinued = true;
let shouldTimerBeDisplayed = true;
let call


export default class Timer {
    constructor(Callback) {

        call = Callback

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
            this.update()
        }
        else {
            this.pause()
            call()
        }
    }

    pause() {
        clearInterval(timerInterval);
        shouldTimerBeContinued = true
    }

    continue() {
        if(!shouldTimerBeDisplayed)
            return;
        if (shouldTimerBeContinued) {
            timerInterval = setInterval(() => this.tick(), 1000);
            shouldTimerBeContinued = false;
        }
    }

    setToContinue(){
        shouldTimerBeContinued = true;
    }


}