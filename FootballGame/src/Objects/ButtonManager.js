import {CONFIG} from "../../config/config.js";

var optionButtons;

var correctOptionIndex;

export default class ButtonManager {
    constructor(scene) {
        this.scene = scene;
        optionButtons = [];
    }

    create() {
    }

    displayOptionButtons(options, callback) {
        let correctOption = options[options.length - 1];
        let buttonsY = this.scene.game.canvas.height * CONFIG.optionButtonsPosition.buttonsY
        let gap = ((1 - (2 * CONFIG.optionButtonsPosition.firstButtonX)) / 3) * this.scene.game.canvas.width

        let style = {font: "45px Helvetica", fill: "#fff", align: "center"};
        let shuffledOptions = this.shuffle(options);
        for (let i = 0; i < 4; i++) {
            optionButtons[i] = this.scene.add.text(this.scene.game.canvas.width * CONFIG.optionButtonsPosition.firstButtonX + (gap * i), buttonsY, shuffledOptions[i].replaceAll(',', ''), style)
            optionButtons[i].setInteractive();

            let tintColor
            if (shuffledOptions[i] === correctOption) {
                tintColor = 0x00ff00;
                correctOptionIndex = i;
            } else {
                tintColor = 0xff0000;
            }
            optionButtons[i].on("pointerdown", () => {
                optionButtons[i].setTint(tintColor);
                setTimeout(() => callback(i), 1000);
                optionButtons[i].off("pointerdown");
            });
        }
    }


    getCorrectOptionIndex() {
        return correctOptionIndex;
    }

    destroyOptionButtons() {
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].destroy();
        }
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }


}
