import Helper from "../objects/Helper";

export default class ButtonManager {
    static createMiddleButton(callback, message, x) {
        let elementById = document.getElementById("middleButton");

        let position;
        if (Helper.isMobile()) {
            elementById.style.fontSize = "40px";
            position = ((x + 100) / window.innerHeight) * 100;
        } else {
            elementById.style.fontSize = "20px";
            position = ((x + 60) / window.innerHeight) * 100;
        }
        document.getElementById("actionButtons").style.top = position + "%";
        elementById.style.visibility = "visible";
        elementById.innerText = message;
        elementById.addEventListener("click", () => {
            elementById.style.visibility = "hidden";
            callback();
        });
    }
}