import {CONFIG} from "../../config/config";

export default function DisplayFixTheBallMessage(scene, callback) {
    let windowMidX = scene.game.canvas.width / 2;
    let windowMidY = scene.game.canvas.height / 2;

    let messageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
    let messageText = scene.add.text(windowMidX, windowMidY, CONFIG.messages.fixTheBall.text, messageStyle)
    messageText.setOrigin(0.5,);
    let time = 3;
    let text = null;
    let interval;
    text = scene.add.text(windowMidX, windowMidY + 35, CONFIG.messages.fixTheBall.countdownFirstPart + time + CONFIG.messages.fixTheBall.countdownSecondPart, messageStyle);
    text.setOrigin(0.5);
    let textFunction = function () {
        if (time === 0) {
            messageText.destroy();
            text.destroy();
            clearInterval(interval);
            callback();
            return;
        }
        text.setText(CONFIG.messages.fixTheBall.countdownFirstPart + time + CONFIG.messages.fixTheBall.countdownSecondPart)
        time--;
    }
    textFunction();
    interval = setInterval(() => textFunction(), 1000);
}