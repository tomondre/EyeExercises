import {config} from "../Config/config"

let timer

export default class MessageManager {

    constructor(timerObject) {
        timer = timerObject
        this.hide()
    }


    hide(){
        document.getElementById("confirmButtons").style.visibility = "hidden"
        document.getElementById("message").innerText = ""
    }
    show(){
        document.getElementById("confirmButtons").style.visibility = "visible"
    }

    displayMessage(level, callback){
        let message;
        timer.pause()
        if(level < config.levels.length){
            message = config.message.levelPassed
        }
        else {
            message = config.message.exercisesFinished
        }
        let time = message.timeLength
        let text = message.textFirstPart + level + message.textSecondPart + time + message.textThirdPart
        document.getElementById("message").innerText = text

        let interval = setInterval(() => {
            if(time > 0) {
                time--
                text = message.textFirstPart + level + message.textSecondPart + time + message.textThirdPart
                document.getElementById("message").innerText = text
            }
            else {
                document.getElementById("message").innerText = ""
                timer.continue()
                callback();
                clearInterval(interval)
            }

        }, 1000)
    }

    displayConfirmLevelDownMassage( cancelCallback, confirmCallBack){
        this.show()
        document.getElementById("message").innerText = config.message.confirmLevelDown.text
        document.getElementById("accept").onclick = () => {
            confirmCallBack()
            this.hide()
        }
        document.getElementById("cancel").onclick = () => {
            cancelCallback()
            this.hide()
        }
    }

    displayTimePassed(){
        document.getElementById("img3D").style.visibility = "hidden"
        document.getElementById("inputImg").style.visibility = "hidden"
        document.getElementById("message").style.fontSize = "35px";
        document.getElementById("message").innerText =  config.message.timeOver.text
    }

    displayGameFinished(){
        document.getElementById("img3D").style.visibility = "hidden"
        document.getElementById("inputImg").style.visibility = "hidden"
        document.getElementById("message").style.fontSize = "35px";
        document.getElementById("message").innerText =  config.message.gameFinished.text
        timer.pause()
    }

}