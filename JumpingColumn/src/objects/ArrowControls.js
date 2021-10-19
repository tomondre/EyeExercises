import {CST} from "../cst/CST";
import {CONFIG} from "../config/CONFIG";

let scene;
let callback;
let controlImages = [];

export default class ArrowControls {
    constructor(Scene, Callback) {
        scene = Scene;
        callback = Callback;
    }

    create() {
        let controllerMidX = window.innerWidth * 0.85;
        let controllerMidY = window.innerHeight * 0.85

        let imageAngle = CONFIG.arrowImageAngle;

        controlImages[0] = scene.add.image(controllerMidX, controllerMidY - 50, "arrow");
        controlImages[1] = scene.add.image(controllerMidX + 50, controllerMidY, "arrow");
        controlImages[2] = scene.add.image(controllerMidX, controllerMidY + 50, "arrow");
        controlImages[3] = scene.add.image(controllerMidX - 50, controllerMidY, "arrow");

        for (let i = 0; i < controlImages.length; i++) {
            controlImages[i].setInteractive();
            controlImages[i].setAngle(imageAngle + (i * 90));
            controlImages[i].setScale(0.8);
        }
    }

    createListeners() {
        this.removeListeners()
        for (let i = 0; i < controlImages.length; i++) {
            controlImages[i].on("pointerover", () => controlImages[i].setTint(0xffA500));
            controlImages[i].on("pointerout", () => controlImages[i].setTint(0xffffff));
        }
        controlImages[0].on("pointerdown", () => callback(CST.arrowDirection.UP));
        controlImages[1].on("pointerdown", () => callback(CST.arrowDirection.RIGHT));
        controlImages[2].on("pointerdown", () => callback(CST.arrowDirection.DOWN));
        controlImages[3].on("pointerdown", () => callback(CST.arrowDirection.LEFT));
    }

    removeListeners()
    {
        for (let i = 0; i < controlImages.length; i++) {
            controlImages[i].off("pointerover");
            controlImages[i].off("pointerout");
            controlImages[i].off("pointerdown");
        }
    }
}