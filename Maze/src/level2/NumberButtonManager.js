import ObserverSupport from "../observer/ObserverSupport";
import {config} from "../config";
import {ObserverChange} from "../observer/ObserverChange";
import Helper from "../objects/Helper";

let sketch;
let numberButtons = [];
let selectedNumbersList = [];

let correctCombination = [];
let correctCombinationPointer = 0;

let selectedNumbersDefaultCoordinates;

let support;
let difficultyManager;

let isContinue = true;

let selectedNumbersGap = config.levelTwoNumbers.selectedGap;
let gapBetweenGridAndNumberButton = config.levelTwoNumbers.gapBetweenGridAndNumberButton;
let gapBetweenButtonsAnsSelectedNumbers = config.levelTwoNumbers.gapBetweenButtonsAnsSelectedNumbers;

//TODO set numbers position so it is responsive to all screens (X, Y of left bottom of grid and start generating from there)
export default class NumberButtonManager {
    constructor(Sketch, _difficultyManager) {
        sketch = Sketch;
        support = new ObserverSupport();
        difficultyManager = _difficultyManager;
    }

    draw() {
        if (isContinue) {
            for (let i = 0; i < selectedNumbersList.length; i++) {
                if (Helper.isMobile())
                {
                    sketch.textSize(50);
                    sketch.text(selectedNumbersList[i], selectedNumbersDefaultCoordinates.x + (i * 50 + 20), selectedNumbersDefaultCoordinates.y + 60);
                }
                else {
                    sketch.text(selectedNumbersList[i], selectedNumbersDefaultCoordinates.x + (i * selectedNumbersGap), selectedNumbersDefaultCoordinates.y);
                }
            }
        }
    }

    generate(position) {
        let x = (position.x / window.innerWidth) * 100;
        let y = ((position.y + gapBetweenGridAndNumberButton) / window.innerHeight) * 100;

        this.saveCoordinates(position)

        let buttons = document.getElementById("numbersButtons");
        buttons.style.visibility = "visible";
        buttons.childNodes[1].style.left = x + "%";
        if (Helper.isMobile())
        {
            buttons.childNodes[1].style.top = (y + 3) + "%";
            buttons.childNodes[1].style.width = "100%";
            let elements = document.getElementsByClassName("numBut");
            for (let i = 0; i < elements.length; i++) {
                elements.item(i).style.fontSize = "50px";
            }
        }
        else {
            buttons.childNodes[1].style.top = (y - 2) + "%";
        }

        for (let i = 0; i < 10; i++) {
            let element = document.getElementById("numberButton" + i);
            element.addEventListener("click", () => this.buttonClickedHandler(i))
            numberButtons.push(element);
        }
        document.addEventListener('keydown', this.keyboardClickedHandler.bind(this));

        this.continue();
    }

    keyboardClickedHandler(event) {
        for (let i = 0; i < 10; i++) {
            if (event.key === i.toString()) {
                this.buttonClickedHandler(i);
                return;
            }
        }
    }

    continue() {
        isContinue = true;
        document.getElementById("numbersButtons").style.visibility = "visible";
    }

    pause() {
        isContinue = false;
        document.getElementById("numbersButtons").style.visibility = "hidden";
    }


    saveCoordinates(position) {
        let x = position.x;
        let y = position.y + gapBetweenGridAndNumberButton + gapBetweenButtonsAnsSelectedNumbers;

        selectedNumbersDefaultCoordinates = {x: x, y: y};
    }

    setCorrectCombination(_correctCombination) {
        this.reset()
        correctCombination = _correctCombination;
    }

    reset() {
        selectedNumbersList = [];
        correctCombinationPointer = 0;
        correctCombination = [];
    }

    buttonClickedHandler(i) {
        if (isContinue) {
            if (this.checkSelectedNumber(i)) {
                support.fire(ObserverChange.correctNumberPressed);
                selectedNumbersList.push(i);
                if (correctCombination.length === selectedNumbersList.length) {
                    this.reset();
                    difficultyManager.mazeSolved();
                }
            } else {
                if (this.isFirstWrongEntry())
                {
                    support.fire(ObserverChange.incorrectFirstNumberPressed);
                    return;
                }
                support.fire(ObserverChange.incorrectNumberPressed);
                numberButtons[i].className = "negativesmall";
                setTimeout(() => {
                    numberButtons[i].className = "positivesmall";
                }, 500);
            }
        }
    }

    isFirstWrongEntry() {
        return correctCombinationPointer === 0;
    }

    checkSelectedNumber(input) {
        if (correctCombination[correctCombinationPointer] === input) {
            correctCombinationPointer++;
            return true;
        }
        return false;
    }
}