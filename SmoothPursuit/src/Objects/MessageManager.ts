import * as p5 from "p5";
import {config} from "./config";

export default class MessageManager {

    private messages;
    private sketch: p5;
    private elements: p5.element[] = [];

    constructor(sketch: p5) {
        this.messages = config.messages
        this.sketch = sketch;
        console.log(config.messages)
    }

    public levelFinishedMessage(callback: () => void, finishedLevel: number): void {

        let textConfig: string[] = config.messages.levelFinished.text;

        let firstPart: string = textConfig[0] + finishedLevel + textConfig[1];
        let secondPart: string = textConfig[2];
        this.createTimerMessage(firstPart, secondPart, callback);

    }

    private createTimerMessage(partOne: string, partTwo: string, callback: () => void): void {
        let time = config.messages.levelFinished.time;
        let text = partOne + time + partTwo;
        this.createMessage(text);
        let interval = setInterval(() => {
            time--;
            let text = partOne + time + partTwo;
            this.removeAllElements();
            this.createMessage(text);
            if (time === 0) {
                this.removeAllElements();
                callback();
                clearInterval(interval);
            }
        }, 1000);
    }

    public changeEyeMessage(okCallback: () => void, rejectCallback: () => void): void {
        let text = config.messages.changeEye.text[0];
        this.createMessage(text);
        let leftButtonText = config.messages.changeEye.okButtonText;
        let rightButtonText = config.messages.changeEye.rejectButtonText;
        let rejectCB : () => void = () => {
            rejectCallback();
            let text : string = config.messages.changeEye.buttonText;
            this.displayChangeEyeButton(okCallback, text);
        };

        this.createChooseOneButton(leftButtonText, rightButtonText, okCallback, rejectCB);
    }

    public displayChangeEyeButton(callback : () => void, text : string){
        let x : number = this.sketch.canvas.width * 0.1;
        let y : number = this.sketch.canvas.height * 0.235;
        this.createSingleButton(text, callback, x, y, true);
    }

    private createMessage(text: string): p5.Element {
        let element: p5.Element = this.sketch.createElement("h5", text);
        this.elements.push(element);
        element.style("font-size", "40px");
        element.style("color", "black");
        element.center();
        return element;
    }

    private createSingleButton(text: string, callback: () => void, x: number, y: number, isIndependent : boolean) {
        let leftButton = this.sketch.createButton(text);
        leftButton.center();
        if (!isIndependent)
        {
            this.elements.push(leftButton);
        }
        leftButton.position(x, y);
        leftButton.mousePressed(() => {
            leftButton.remove();
            this.removeAllElements();
            callback();
        });
        leftButton.class("positivesmall");
    }

    public createChooseOneButton(leftText: string, rightText: string, leftCallback: () => void, rightCallback: () => void): void {

        let xOffset = config.messages.buttons.chooseOneButtonsXOffsetInPixels
        let x = this.sketch.canvas.width / 2;
        let y = config.messages.buttons.heightPositionRatio * this.sketch.canvas.height;

        this.createSingleButton(leftText, leftCallback, x - xOffset, y, false);
        this.createSingleButton(rightText, rightCallback, x + xOffset, y, false);
    }

    private removeAllElements(): void {
        this.elements.forEach((e) => e.remove());
        this.elements = [];
    }

    public bothEyesTimeOverMessage(closeGame: () => void, continueGame: () => void): void {
        let text: string = config.messages.timeForBothEyesOver.text[0];
        this.createMessage(text);

        let leftText: string = config.messages.timeForBothEyesOver.okButtonText;
        let rightText: string = config.messages.timeForBothEyesOver.rejectButtonText;

        let rightCB : () => void = () => {
            continueGame();
            let buttonText : string = config.messages.timeForBothEyesOver.buttonText;
            this.displayChangeEyeButton(closeGame, buttonText);
        };

        this.createChooseOneButton(leftText, rightText, closeGame, rightCB);
    }

    public gameFinishedMessage(callback: () => void) : void {
        let text : string = config.messages.gameFinished.text[0];
        let element = this.createMessage(text);

        let buttonText : string = config.messages.gameFinished.button;
        this.createSingleButton(buttonText, callback, this.sketch.canvas.width / 2, element.position().y + 100, false);
    }
}
