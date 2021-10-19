import {CONFIG} from "../config/CONFIG";
import TextStyleManager from "./TextStyleManager";

let scene;
let buttonManager;
let levelPassedInterval;

export default class MessageManager {

    constructor(Scene, ButtonManager) {
        scene = Scene;
        buttonManager = ButtonManager;
    }

    displayChangeEyeMessage(confirmCallback, rejectCallback) {
        let message = CONFIG.messages.changeEye;
        let text = this.displayMessage(message.text);
        buttonManager.displayChooseOneButtons(message, () => {
            text.destroy();
            confirmCallback();
        }, () => {
            text.destroy();
            rejectCallback();
        }, text);
    }

    displayLeftEyeMessage(confirmCallback, rejectCallback) {
        let message = CONFIG.messages.lastChangeEye;
        let text = this.displayMessage(message.text);
        buttonManager.displayChooseOneButtons(message, () => {
            text.destroy();
            confirmCallback();
        }, () => {
            text.destroy();
            rejectCallback();
        }, text);
    }

    displayLevelPassedMessage(callback, currentLevel) {
        let message = CONFIG.messages.levelPassed;
        let nextLevelTimeDuration = CONFIG.messages.levelPassed.timeLength;
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

    displayLevelNotPassedMessage(callback) {
        this.displayMessage(CONFIG.messages.levelNotPassed.text);
        buttonManager.displayConfirmButton(callback);
    }

    displayConfirmLevelDownMassage(confirmCallback, rejectCallback) {
        let text = this.displayMessage(CONFIG.messages.confirmLevelDown.text);
        buttonManager.displayChooseOneButtons(CONFIG.messages.confirmLevelDown, () => {
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
}