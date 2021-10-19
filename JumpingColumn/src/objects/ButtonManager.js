import {CONFIG} from "../config/CONFIG";
import TextStyleManager from "./TextStyleManager";

let scene;

let shouldExitButtonBeDisplayed;
let exitButtonCB;

let shouldChangeEyeButtonBeDisplayed;
let changeEyeCB;

export default class ButtonManager {
    constructor(Scene) {
        scene = Scene;
    }

    create() {
        if (shouldExitButtonBeDisplayed)
        {
            this.displayExitButton(null);
        }

        if (shouldChangeEyeButtonBeDisplayed)
        {
            this.displayChangeEyeButton(null);
        }
    }

    displayChooseOneButtons(message, confirmCallback, rejectCallback) {
        let acceptButton = document.getElementById("confirmButton");
        acceptButton.style.visibility = "visible";
        acceptButton.innerText = message.buttonOne;
        acceptButton.style.fontSize = TextStyleManager.getButtonTextSize();
        acceptButton.onclick = () => {
            acceptButton.style.visibility = "hidden";
            rejectButton.style.visibility = "hidden";
            confirmCallback();
        }

        let rejectButton = document.getElementById("rejectButton");
        rejectButton.style.visibility = "visible";
        rejectButton.innerText = message.buttonTwo;
        rejectButton.style.fontSize = TextStyleManager.getButtonTextSize();
        rejectButton.onclick = () => {
            acceptButton.style.visibility = "hidden";
            rejectButton.style.visibility = "hidden";
            rejectCallback();
        };
   }

   hideButtons()
   {
       document.getElementById("confirmButton").style.visibility = "hidden";
       document.getElementById("rejectButton").style.visibility = "hidden";
       document.getElementById("middleButton").style.visibility = "hidden";
   }

    displayBottomButton(message, callback) {
        let bottomButton = document.getElementById("middleButton");
        bottomButton.style.visibility = "visible";
        bottomButton.innerText = message;
        bottomButton.style.fontSize = TextStyleManager.getButtonTextSize();
        bottomButton.onclick = () => {
            document.getElementById("rejectButton").style.visibility = "hidden";
            document.getElementById("confirmButton").style.visibility = "hidden";
            bottomButton.style.visibility = "hidden";
            callback();
        };
    }

    displayChangeEyeButton(callback) {
        if (callback !== null)
        {
            changeEyeCB = callback;
        }
        let message = CONFIG.messages.changeEyeButton.text;
        shouldChangeEyeButtonBeDisplayed = true;
        this.displayBottomButton(message, changeEyeCB);
    }

    displayExitButton(callback) {
        if (callback !== null)
        {
            exitButtonCB = callback;
        }
        let message = CONFIG.messages.exitGameButton.text;
        shouldExitButtonBeDisplayed = true;
        this.displayBottomButton(message, exitButtonCB);
    }

    displayConfirmButton(callback) {
        let bottomButton = document.getElementById("middleButton");
        bottomButton.style.visibility = "visible";
        bottomButton.innerText = CONFIG.messages.confirmButton.text;
        bottomButton.style.fontSize = TextStyleManager.getButtonTextSize();
        bottomButton.onclick = () => {
            bottomButton.style.visibility = "hidden";
            callback();
        };
    }

    reset()
    {
        shouldExitButtonBeDisplayed = false;
        shouldChangeEyeButtonBeDisplayed = false;
    }
}