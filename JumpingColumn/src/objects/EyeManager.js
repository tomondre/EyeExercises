import {CST} from "../cst/CST";
import {CONFIG} from "../config/CONFIG";
import TextStyleManager from "./TextStyleManager";

let scene;
let eye = CST.eye.RIGHT;
let eyeDisplayObject;

export default class EyeManager {
    constructor(Scene) {
        scene = Scene;
    }

    create() {
        let endMessageStyle = TextStyleManager.getTextStyle()
        eyeDisplayObject = scene.add.text(window.innerWidth * 0.05, window.innerHeight * 0.125, this.eyeDisplayTextCamelCase(), endMessageStyle);
        this.updateEyeDisplay();
    }

    updateEyeDisplay() {
        eyeDisplayObject.setText(this.eyeDisplayTextCamelCase());
    }

    isRightEye() {
        return eye === CST.eye.RIGHT;
    }

    switchEye() {
        eye === CST.eye.LEFT ? eye = CST.eye.RIGHT : eye = CST.eye.LEFT;
        this.updateEyeDisplay();
    }

    getEye() {
        return eye.toString();
    }

    reset() {
        eye = CST.eye.LEFT;
    }

    eyeDisplayTextCamelCase() {
        return CONFIG.eyeDisplay.text + eye[0].toUpperCase() + eye.substring(1).toLowerCase();
    }
}