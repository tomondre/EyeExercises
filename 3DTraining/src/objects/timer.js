
import FetchDataManager from "./fetchData"

let timerObject
let time,
    ticks = 0
let timerInterval
let shouldTimerBeContinued = true
let shouldTimerBeDisplayed = true
let call,
    callScore


export default class Timer {
    constructor(Callback, CallbackScore) {
        call = Callback
        callScore = CallbackScore
        if (time === -1)
        {
            shouldTimerBeDisplayed = false;
        }

    }

    create() {
        time = FetchDataManager.getCurrentTrainingTime()
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
            time--
            ticks++
            this.update()
        }
        else {
            this.pause()
            call()
        }
        if(ticks >= 15){
            callScore()
            this.resetTicks()
        }
    }

    resetTicks(){
        ticks = 0;
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