import {SymbolLevel} from "./SymbolLevel";
import ObserverSupport from "../ObserverSupport";
import * as p5 from "p5";
import {config} from "../config";
import {KeyType} from "./KeyType";
import {ObserverAction} from "../ObserverAction";

export default class SymbolLevelFour implements SymbolLevel {
    private sketch: p5;
    private support: ObserverSupport;
    // @ts-ignore
    private data: { firstDigit, secondDigit, answerRange }[] = config.levels.levelFour;
    private numberPointer: number = 0;
    private generatedEquation: number[] = [];
    private generatedAnswers: number[] = [];
    private listener = this.spaceHandler.bind(this);

    constructor(sketch, support: ObserverSupport) {
        this.sketch = sketch;
        this.support = support;
    }

    continue(): void {
        this.createKeyboardListener();
    }

    continueSymbolLevel(difficultyEntries: number): void {

    }

    create(difficultyEntries: number): void {
        this.numberPointer = difficultyEntries - 1 ;

        this.continue();
        this.generateNumbers();
        console.log(this.generatedAnswers);
        console.log(this.generatedEquation);
    }

    draw(x: number, y: number): void {

    }

    pause(): void {
        this.removeKeyboardListener();
    }

    entry(key: KeyType): void {
        let sum: number = 0;
        for (let i = 0; i < this.generatedEquation.length; i++) {
            sum += this.generatedEquation[i];
        }

        let valueToCompare: number;

        switch (key) {
            case KeyType.Left:
                valueToCompare = this.generatedAnswers[0];
                break;
            case KeyType.Down:
                valueToCompare = this.generatedAnswers[1];
                break;
            case KeyType.Right:
                valueToCompare = this.generatedAnswers[2];
                break;
        }

        if (valueToCompare == sum) {
            console.log("correct");
            this.support.fire(ObserverAction.correctEntrySymbolLevel);
        } else {
            console.log("incorrect");
            this.support.fire(ObserverAction.incorrectEntrySymbolLevel);
        }
        console.log(this.numberPointer);
    }

    public reset(): void {
        this.numberPointer = 0;
    }

    private createKeyboardListener(): void {
        this.removeKeyboardListener();
        document.addEventListener('keyup', this.listener);
    }

    private removeKeyboardListener(): void {
        document.removeEventListener('keyup', this.listener);
    }

    private generateNumbers(): void {
        this.generateEquation();
        this.generateAnswers();
    }

    private generateEquation(): void {
        let object: { firstDigit, secondDigit } = this.data[this.numberPointer];

        let randomFirst: number = this.sketch.floor(this.sketch.random(0, object.firstDigit.length));
        let firstNum = object.firstDigit[randomFirst];

        let randomSecond: number = this.sketch.floor(this.sketch.random(0, object.secondDigit.length));
        let secondNum = object.secondDigit[randomSecond];

        this.generatedEquation = [];
        this.generatedEquation.push(firstNum);
        this.generatedEquation.push(secondNum);
    }

    private generateAnswers(): void {
        let object: { firstDigit, secondDigit, answerRange } = this.data[this.numberPointer];

        this.generatedAnswers = [];
        for (let i = 0; i < 2; i++) {
            let min: number = object.answerRange[0];
            let max: number = object.answerRange[1];

            let answer = this.sketch.floor(this.sketch.random(min, max));
            this.generatedAnswers.push(answer);
        }

        let number: number = this.generatedEquation[0] + this.generatedEquation[1];
        this.generatedAnswers.push(number);

        this.generatedAnswers = this.shuffle(this.generatedAnswers);
    }

    private shuffle(array: number[]): number[] {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    private spaceHandler(event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowLeft':
                this.entry(KeyType.Left);
                break;
            case 'ArrowDown':
                this.entry(KeyType.Down);
                break;
            case 'ArrowRight':
                this.entry(KeyType.Right)
                break;
        }
    }
}