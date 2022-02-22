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
    private arrowImage: p5.Image;
    // @ts-ignore
    private mathData: { answerGapX, answerGapY, middleAnswerGapY, arrowSize } = config.levels.levelFourMath;


    constructor(sketch, support: ObserverSupport) {
        this.sketch = sketch;
        this.support = support;
        this.arrowImage = this.sketch.loadImage('assets/Arrow.png');
    }

    continue(): void {
        this.createKeyboardListener();
    }

    continueSymbolLevel(difficultyEntries: number): void {

    }

    create(difficultyEntries: number): void {
        this.numberPointer = difficultyEntries - 1;

        this.generateNumbers();
        this.continue();
    }

    public draw(x: number, y: number): void {
        this.sketch.push();
        let center = this.sketch.LEFT;
        this.sketch.textAlign(center, center);
        this.sketch.textSize(50);
        this.sketch.fill(config.colors.levelFour.equation);
        this.sketch.text(this.generatedEquation[0] + " + " + this.generatedEquation[1], x, y);
        this.sketch.pop();
        let arrowX: number;
        let arrowY: number;

        arrowY = y + this.mathData.answerGapY;
        arrowX = x - this.mathData.answerGapX;
        this.drawArrow(arrowX, arrowY, 0, 0);

        arrowY = y + this.mathData.answerGapY + this.mathData.middleAnswerGapY;
        arrowX = x;
        this.drawArrow(arrowX, arrowY, 270, 1);

        arrowY = y + this.mathData.answerGapY;
        arrowX = x + this.mathData.answerGapX;
        this.drawArrow(arrowX, arrowY, 180, 2);
    }

    private drawArrow(x: number, y: number, rotation: number, answerIndex: number): void {
        let center = this.sketch.CENTER;

        this.sketch.push();
        x = x + this.mathData.answerGapX;
        this.sketch.translate(x, y);

        this.sketch.push();
        this.sketch.imageMode(center);
        this.sketch.rotate(rotation);
        this.sketch.image(this.arrowImage, 0, 0);
        this.sketch.pop();

        this.sketch.fill(config.colors.levelFour.arrowTextColor)
        this.sketch.textSize(30);
        this.sketch.textAlign(center, center);
        this.sketch.text(this.generatedAnswers[answerIndex], 0, 0);

        this.sketch.pop();

        let size = config.levels.levelFourMath.arrowSize;
        this.arrowImage.resize(size, size);
    }

    public pause(): void {
        this.removeKeyboardListener();
    }

    public entry(key: KeyType): void {
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
            this.support.fire(ObserverAction.correctEntrySymbolLevel);
        } else {
            this.support.fire(ObserverAction.incorrectEntrySymbolLevel);
        }
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
        if (this.numberPointer <= this.data.length -1) {
            this.generateEquation();
            this.generateAnswers();
        }
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

        do {
            this.generatedAnswers = [];
            for (let i = 0; i < 2; i++) {
                let min: number = object.answerRange[0];
                let max: number = object.answerRange[1];

                let answer = this.sketch.floor(this.sketch.random(min, max));
                this.generatedAnswers.push(answer);
            }
            let correctAnswer: number = this.generatedEquation[0] + this.generatedEquation[1];
            this.generatedAnswers.push(correctAnswer);
        } while (new Set(this.generatedAnswers).size != this.generatedAnswers.length)

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