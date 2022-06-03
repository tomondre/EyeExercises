import {config} from "../Config/config"


export default class MessageManager {

    constructor() {

    }
    displayMessage(level, callback){
        let message;
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
                callback();
                clearInterval(interval)
            }

        }, 1000)
    }


}