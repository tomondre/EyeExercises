import {CST} from "../CST";
import TextStyleManager from "./TextStyleManager";
import {CONFIG} from "../../config/config";

let scene;
let eye = CST.EYE.RIGHT;
let eyeDisplayObject;

export default class EyeManager {
    constructor(Scene) {
        scene = Scene;
    }

    create() {
        let endMessageStyle = TextStyleManager.getTextStyle();
        eyeDisplayObject?.destroy();
        eyeDisplayObject = scene.add.text(window.innerWidth * 0.1, window.innerHeight * 0.07, this.eyeDisplayTextCamelCase(), endMessageStyle);
        this.updateEyeDisplay();
    }

    updateEyeDisplay() {
        eyeDisplayObject.setText(this.eyeDisplayTextCamelCase());
    }

    isRightEye() {
        return eye === CST.EYE.RIGHT;
    }

    switchEye() {
        eye === CST.EYE.LEFT ? eye = CST.EYE.RIGHT : eye = CST.EYE.LEFT;
        this.updateEyeDisplay();
    }

    getEye() {
        return eye.toString();
    }

    reset() {
        eye = CST.EYE.LEFT;
    }

    eyeDisplayTextCamelCase() {
        return CONFIG.eyeDisplay.text + eye[0].toUpperCase() + eye.substring(1).toLowerCase();
    }
}