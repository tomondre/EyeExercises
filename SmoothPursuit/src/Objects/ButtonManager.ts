import * as p5 from "p5";
import ObserverSupport from "./ObserverSupport";
import {Observer} from "./Observer";
import {ObserverAction} from "./ObserverAction";

export default class ButtonManager {

    private sketch : p5;
    private correctOption : string;
    private options : string[];
    private buttons : p5.element[] = [];
    private observerSupport : ObserverSupport;

    constructor(sketch : p5) {
        this.sketch = sketch;
        this.observerSupport = new ObserverSupport();
    }

    public draw(): void {

    }

    public removeButtons() : void{
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].remove();
        }
    }

    private handler(selectedButton : string) : void {
        this.removeButtons();
        if (selectedButton === this.correctOption) {
            this.observerSupport.fire(ObserverAction.correctEntrySymbolLevel);
        }
        else {
            this.observerSupport.fire(ObserverAction.incorrectEntrySymbolLevel);
        }
    }

    public create() : void {
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
            button.mousePressed(() => this.handler(this.options[i]));
            button.addClass("positivesmall");
            this.buttons.push(button);
        }
    }

    public displayButtonOptions(correctOption: string, otherOptions: string[]): void {
        this.correctOption = correctOption;
        otherOptions.push(correctOption);
        this.options = this.shuffleArray(otherOptions);
        this.create();
    }

    private shuffleArray(array) : string[] {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    public subscribe(observer : Observer) : void {
        this.observerSupport.subscribe(observer);
    }

    public unsubscribe(observer : Observer) : void {
        this.observerSupport.unsubscribe(observer);
    }
}