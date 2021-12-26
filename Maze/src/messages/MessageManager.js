import ButtonManager from "./ButtonManager";
import {config} from "../config";
import Helper from "../objects/Helper";

let sketch;
let buttonManager;

let messages = config.messages;

let shouldBeLevelNotPassedDrawn = false;
let levelNotPassedInterval;

let shouldBeTimeOverMessageDrawn = false;

let shouldBeLevelPassedMessageDrawn = false;
let levelPassedInterval;

let shouldBeGameFinishedMessageDrawn = false;

let shouldBeRememberToPressNumberMessageBeDrawn = false;
let rememberToPressInterval;

let passedLevel;
let time = 0;

let messagePosition;

export default class MessageManager {
    constructor(Sketch, gridHeight) {
        sketch = Sketch;
        buttonManager = new ButtonManager();
        messagePosition = {x : window.innerWidth * 0.5, y : gridHeight + 40};
    }

    draw() {
        sketch.push();
        if (Helper.isMobile()) {
            sketch.textSize(40);
        } else{
            sketch.textSize(40);
        }
        sketch.textAlign(sketch.CENTER);
        if (shouldBeLevelNotPassedDrawn) {
            sketch.text(messages.levelNotPassed.text + time + messages.levelNotPassed.textTwo, messagePosition.x, messagePosition.y);
        } else if (shouldBeTimeOverMessageDrawn) {
            sketch.text(messages.timeOverMessage.text, messagePosition.x, messagePosition.y);
        } else if (shouldBeLevelPassedMessageDrawn) {
            sketch.text(messages.levelPassedMessage.text + passedLevel + messages.levelPassedMessage.textTwo + time + messages.levelPassedMessage.textThree, messagePosition.x, messagePosition.y);
        } else if (shouldBeGameFinishedMessageDrawn) {
            sketch.text(messages.gameFinished.text, messagePosition.x, messagePosition.y);
        } else if(shouldBeRememberToPressNumberMessageBeDrawn) {
            sketch.text(messages.rememberToPressNumber.text, messagePosition.x, messagePosition.y);
        }
        sketch.pop();
    }

    displayLevelNotPassedMessage(callback) {
        time = messages.levelNotPassed.timeLength;
        shouldBeLevelNotPassedDrawn = true;

        clearInterval(levelNotPassedInterval);
        levelNotPassedInterval = setInterval(() => {
            time--;
            if (time === 0) {
                shouldBeLevelNotPassedDrawn = false;
                clearInterval(levelNotPassedInterval);
                callback();
            }
        }, 1000);
    }

    displayLevelFinishedMessage(callback, level) {
        passedLevel = level;
        time = messages.levelPassedMessage.timeLength;
        shouldBeLevelPassedMessageDrawn = true;

        clearInterval(levelPassedInterval);
        levelPassedInterval = setInterval(() => {
            time--;
            if (time === 0) {
                shouldBeLevelPassedMessageDrawn = false;
                clearInterval(levelPassedInterval);
                callback();
            }
        }, 1000);
    }

    displayRememberToPressNumberMessage(callback) {
        time = messages.rememberToPressNumber.timeLength;

        shouldBeRememberToPressNumberMessageBeDrawn = true;
        clearInterval(rememberToPressInterval);
        rememberToPressInterval = setInterval(() => {
            time--;
            if (time === 0) {
                shouldBeRememberToPressNumberMessageBeDrawn = false;
                clearInterval(rememberToPressInterval);
                callback();
            }
        }, 1000);
    }

    displayGameFinishedMessage(callback) {
        shouldBeGameFinishedMessageDrawn = true;
        ButtonManager.createMiddleButton(() => {
            shouldBeGameFinishedMessageDrawn = false;
            callback();
        }, messages.gameFinished.button, messagePosition.y);
    }

    displayTimeOverMessage(callback) {
        shouldBeTimeOverMessageDrawn = true;
        ButtonManager.createMiddleButton(() => {
            shouldBeTimeOverMessageDrawn = false;
            callback();
        }, messages.timeOverMessage.button,  messagePosition.y);
    }
}