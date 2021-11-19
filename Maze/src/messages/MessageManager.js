import ButtonManager from "./ButtonManager";
import {config} from "../config";

let sketch;
let buttonManager;

let messages = config.messages;

let shouldBeLevelNotPassedDrawn = false;
let levelNotPassedInterval;

let shouldBeTimeOverMessageDrawn = false;

let shouldBeLevelPassedMessageDrawn = false;
let levelPassedInterval;

let shouldBeGameFinishedMessageDrawn = false;

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
        sketch.textAlign(sketch.CENTER);
        if (shouldBeLevelNotPassedDrawn) {
            sketch.text(messages.levelNotPassed.text + time + messages.levelNotPassed.textTwo, messagePosition.x, messagePosition.y);
        } else if (shouldBeTimeOverMessageDrawn) {
            sketch.text(messages.timeOverMessage.text, messagePosition.x, messagePosition.y);
        } else if (shouldBeLevelPassedMessageDrawn) {
            sketch.text(messages.levelPassedMessage.text + passedLevel + messages.levelPassedMessage.textTwo + time + messages.levelPassedMessage.textThree, messagePosition.x, messagePosition.y);
        } else if (shouldBeGameFinishedMessageDrawn) {
            sketch.text(messages.gameFinished.text, messagePosition.x, messagePosition.y);
        }
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

    displayGameFinishedMessage() {
        shouldBeGameFinishedMessageDrawn = true;
        //TODO create handler for continuing the game
    }

    displayTimeOverMessage() {
        shouldBeTimeOverMessageDrawn = true;
    }
}