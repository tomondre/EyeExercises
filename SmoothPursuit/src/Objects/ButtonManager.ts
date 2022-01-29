import * as p5 from "p5";
import ObserverSupport from "./ObserverSupport";
import {Observer} from "./Observer";
import {ObserverAction} from "./ObserverAction";
import Helper from "./Helper";
import {config} from "./config";

export default class ButtonManager {
    private sketch: p5;
    private correctOption: string;
    private options: string[];
    private buttons: p5.element[] = [];
    private observerSupport: ObserverSupport;
    private buttonTextColor: string = config.colors.answerSymbolColor;
    private keyboardEvent: () => void = this.keyboardHandler.bind(this);

    constructor(sketch: p5) {
        this.sketch = sketch;
        this.observerSupport = new ObserverSupport();
    }

    public draw(): void {

    }


    public removeButtons(): void {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].remove();
        }
    }

    private handler(selectedButton: string): void {
        this.removeButtons();
        this.removeKeyboardListener();
        if (selectedButton === this.correctOption) {
            this.observerSupport.fire(ObserverAction.correctEntrySymbolLevel);
        } else {
            this.observerSupport.fire(ObserverAction.incorrectEntrySymbolLevel);
        }
    }

    public keyboardHandler(event: KeyboardEvent): void {
        let option: string;
        switch (event.key) {
            case "1":
                option = this.options[0];
                break;
            case "2":
                option = this.options[1];
                break;
            case "3":
                option = this.options[2];
                break;
            case "4":
                option = this.options[3];
                break;
            default:
                return;
        }
        this.handler(option);
    }

    public createKeyboardListener(): void {
        this.removeKeyboardListener();
        document.addEventListener('keydown', this.keyboardEvent);
    }

    public create(): void {
        this.removeButtons();
        this.buttons = [];
        let areaPercentage = 0.4;
        let buttonArea = this.sketch.canvas.width * areaPercentage;
        let gap = buttonArea / 3;
        let firstX = this.sketch.canvas.width * (1 - areaPercentage) / 2;
        for (let i = 0; i < 4; i++) {
            let currentButtonX = firstX + (gap * i + 1);
            let button = this.sketch.createButton(this.options[i]);
            button.position(currentButtonX, this.sketch.height * 0.9);
            button.style("font-size", "30px");
            button.style("color", this.buttonTextColor);
            button.mousePressed(() => this.handler(this.options[i]));
            button.addClass("positivesmall");
            this.buttons.push(button);
        }
        this.createKeyboardListener();
    }

    public displayButtonOptions(correctOption: string, currentLevel: number): void {
        let randomOptions = Helper.getOptions(currentLevel, correctOption);
        this.correctOption = correctOption;
        this.options = Helper.shuffleArray(randomOptions);
        this.create();
    }


    public subscribe(observer: Observer): void {
        this.observerSupport.subscribe(observer);
    }

    public unsubscribe(observer: Observer): void {
        this.observerSupport.unsubscribe(observer);
    }

    private removeKeyboardListener() {
        document.removeEventListener('keydown', this.keyboardEvent);
    }
}