import {CST} from "../CST";

let scene;
let timerText;
let eye;
let callback;
let exitCallback;

export default class EyeManager {
    constructor(Scene, Callback, exitCB) {
        scene = Scene;
        eye = CST.EYE.RIGHT.toString();
        callback = Callback;
        exitCallback = exitCB;
    }

    create() {
        let style = {font: "35px Arial", fill: "#fff", align: "center"};
        timerText = scene.add.text(scene.game.canvas.width * 0.1,scene.game.canvas.width * 0.03, "Eye: " + this.toCamelCase(eye), style);
    }

    setEye(Eye)
    {
        eye = Eye;
        this.create();
    }

    getEyeString()
    {
        return this.toCamelCase(eye);
    }

    getEye()
    {
        return eye;
    }

    toCamelCase(input) {
        return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
    }

    displayChangeEyeButton()
    {
        let changeEyeButton = document.getElementById("changeEyeButton");
        changeEyeButton.style.visibility = "visible";
        changeEyeButton.onclick = () => {
            this.hideChangeEyeButton();
            callback();
        };
    }

    displayExitGameButton()
    {
        let changeEyeButton = document.getElementById("changeEyeButton");
        changeEyeButton.innerText = "Exit Game";
        changeEyeButton.style.visibility = "visible";
        changeEyeButton.onclick = () => {
            this.hideChangeEyeButton();
            exitCallback();
        };
    }

    hideChangeEyeButton()
    {
        let changeEyeButton = document.getElementById("changeEyeButton");
        changeEyeButton.style.visibility = "hidden";
    }
}