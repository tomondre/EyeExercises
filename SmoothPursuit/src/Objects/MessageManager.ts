import * as p5 from "p5";
import {config} from "./config";
import {create} from "domain";

export default class MessageManager {

    private messages;
    private sketch: p5;
    private elements: p5.element[] = [];

    constructor(sketch: p5) {
        this.messages = config.messages
        this.sketch = sketch;
    }

    public draw(): void {

    }

    public levelFinishedMessage(callback: void, finishedLevel: number): void {

    }

    public changeEyeMessage(okCallback: () => void, rejectCallback: () => void): void {
        let text = config.messages.changeEye.text[0];
        let element: p5.Element = this.sketch.createElement("h5", text);
        this.elements.push(element);
        let x = this.sketch.canvas.width / 2;
        let y = this.sketch.canvas.height / 2;
        element.style("color", "black");
        element.position(x, y);

        let leftButtonText = config.messages.changeEye.okButtonText;
        let rightButtonText = config.messages.changeEye.rejectButtonText;

        this.createChooseOneButton(leftButtonText, rightButtonText, okCallback, rejectCallback);
    }

    public createChooseOneButton(leftText: string, rightText: string, leftCallback: () => void, rightCallback: () => void): void {

        let xOffset = config.messages.buttons.chooseOneButtonsXOffsetInPixels
        let x = this.sketch.canvas.width / 2;
        let y = config.messages.buttons.heightPositionRatio * this.sketch.canvas.height;

        let leftButton = this.sketch.createButton(leftText);
        this.elements.push(leftButton);
        leftButton.position(x - xOffset, y);
        leftButton.mousePressed(() => {
            this.removeAllElements();
            leftCallback();
        });
        leftButton.class("positivesmall");

        let rightButton = this.sketch.createButton(rightText);
        this.elements.push(rightButton);
        rightButton.position(x + xOffset, y);
        rightButton.mousePressed(() => {
            this.removeAllElements();
            rightCallback();
        });
        rightButton.class("negativesmall");

        // leftButton.mousePressed(this.removeAllElements.bind(this));
        // rightButton.mousePressed(this.removeAllElements.bind(this));
    }

    private removeAllElements(): void {
        this.elements.forEach((e) => e.remove());
        this.elements = [];
    }
}
