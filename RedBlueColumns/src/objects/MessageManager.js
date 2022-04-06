import {CONFIG} from "../configs/CONFIG";
import TextStyleManager from "./TextStyleManager";

let scene;
let levelPassedInterval;
let nextLevelTimeDuration

export default class MessageManager {

    constructor(Scene) {
        scene = Scene;
    }


    displayLevelPassedMessage(callback, currentLevel) {
        let message = CONFIG.messages.levelPassed;
        nextLevelTimeDuration = CONFIG.messages.levelPassed.timeLength;
        let text = message.textFirstPart + currentLevel + message.textSecondPart + nextLevelTimeDuration + message.textThirdPart;
        let textObject = this.displayMessage(text);
         levelPassedInterval = setInterval(() => {
            if (--nextLevelTimeDuration === 0) {
                clearInterval(levelPassedInterval);
                callback();
            }
            textObject.setText(message.textFirstPart + currentLevel + message.textSecondPart + nextLevelTimeDuration + message.textThirdPart);
        }, 1000);
    }

    displayTimePassed(callback){
        let text = CONFIG.messages.timeOver.text;
        let textObject = this.displayMessage(text);
        levelPassedInterval = setInterval(() => {
            if (--nextLevelTimeDuration === 0) {
                clearInterval(levelPassedInterval);
                callback();
            }
            textObject.setText(text);
        }, 1000);
    }

    displayLevelNotPassedMessage(callback) {
        this.displayMessage(CONFIG.messages.puzzleNotPassed.text);
        this.displayConfirmButton(callback);
    };

    displayConfirmButton(call) {
        let bottomButton = document.getElementById("middleButton");
        bottomButton.style.visibility = "visible";
        bottomButton.innerText = CONFIG.messages.confirmButton.text;
        bottomButton.style.fontSize = TextStyleManager.getButtonTextSize();
        bottomButton.onclick = () => {
            bottomButton.style.visibility = "hidden";
            call();
        };
    }
    displayConfirmLevelDownMassage(confirmCallback, rejectCallback) {
        let text = this.displayMessage(CONFIG.messages.confirmLevelDown.text);
        this.displayChooseOneButtons(CONFIG.messages.confirmLevelDown, () => {
            text.destroy();
            confirmCallback();
        }, () => {
            text.destroy();
            rejectCallback();
        }, text);
    }

    removeInterval()
    {
        clearInterval(levelPassedInterval);
    }

    displayMessage(message) {
        let windowWidth = scene.game.canvas.width;
        let windowHeight = scene.game.canvas.height;
        let endMessageStyle = TextStyleManager.getTextStyle()
        let messageText = scene.add.text(windowWidth * 0.5, windowHeight * CONFIG.messages.height, message, endMessageStyle);
        messageText.setOrigin(0.5);
        return messageText;
    }





    displayChooseOneButtons(message, confirmCallback, rejectCallback) {
        let acceptButton = document.getElementById("confirmButton");
        acceptButton.style.visibility = "visible";
        acceptButton.innerText = message.buttonOne;
        acceptButton.style.fontSize = TextStyleManager.getButtonTextSize();
        acceptButton.onclick = () => {
            acceptButton.style.visibility = "hidden";
            rejectButton.style.visibility = "hidden";
            confirmCallback();
        }

        let rejectButton = document.getElementById("rejectButton");
        rejectButton.style.visibility = "visible";
        rejectButton.innerText = message.buttonTwo;
        rejectButton.style.fontSize = TextStyleManager.getButtonTextSize();
        rejectButton.onclick = () => {
            acceptButton.style.visibility = "hidden";
            rejectButton.style.visibility = "hidden";
            rejectCallback();
        };
    }
}