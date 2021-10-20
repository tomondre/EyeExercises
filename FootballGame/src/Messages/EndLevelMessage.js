import {CONFIG} from "../../config/config";

export default function EndLevelMessage(scene, level, callback) {
    let windowWidth = scene.game.canvas.width;
    let windowHeight = scene.game.canvas.height;

    let endMessageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
    let image = scene.add.image(windowWidth * 0.5, windowHeight * 0.6, "thumbUp");
    image.setOrigin(0.5, 0);
    image.setScale(0.1);
    image.setInteractive();

    let time = 5;
    let text = null;

    let textFunction = function () {
        if (time === 0)
            callback();
        if (text !== null)
            text.destroy();
        text = scene.add.text(windowWidth / 2, windowHeight / 2, CONFIG.messages.endLevel.firstPart + level + CONFIG.messages.endLevel.secondPart + time + CONFIG.messages.endLevel.thirdPart, endMessageStyle);
        text.setOrigin(0.5);
        time--;
    }
    textFunction();
    setInterval(() => textFunction(), 1000);
}