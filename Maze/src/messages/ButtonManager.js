export default class ButtonManager
{
    static createMiddleButton(callback, message) {
        let elementById = document.getElementById("middleButton");
        elementById.style.visibility = "visible";
        elementById.innerText = message;
        elementById.addEventListener("click", () => {
            elementById.style.visibility = "hidden";
            callback();
        });
    }
}