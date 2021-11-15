import ObserverSupport from "../observer/ObserverSupport";
import {config} from "../config";
import {ObserverChange} from "../observer/ObserverChange";

let sketch;
let numberButtons = [];
let selectedNumbersList = [];

let correctCombination = [];
let correctCombinationPointer = 0;

let selectedNumbersDefaultCoordinates;

let support;
let difficultyManager;

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
        for (let i = 0; i < selectedNumbersList.length; i++) {
            sketch.text(selectedNumbersList[i], selectedNumbersDefaultCoordinates.x + (i * selectedNumbersGap), selectedNumbersDefaultCoordinates.y);
        }
    }

    generate(position) {
        let x = (position.x / window.innerWidth) * 100;
        let y = ((position.y + gapBetweenGridAndNumberButton) / window.innerHeight) * 100;

        this.saveCoordinates(position)

        let buttons = document.getElementById("numbersButtons");
        buttons.style.visibility = "visible";
        buttons.childNodes[1].style.left = x + "%";
        buttons.childNodes[1].style.top = y + "%";

        for (let i = 0; i < 10; i++) {
            let element = document.getElementById("numberButton" + i);
            element.addEventListener("click", () => this.buttonClickedHandler(i, element))
            numberButtons.push(element);
        }
    }

    saveCoordinates(position) {
        let x = position.x;
        let y = position.y + gapBetweenGridAndNumberButton + gapBetweenButtonsAnsSelectedNumbers;

        selectedNumbersDefaultCoordinates = {x: x, y: y};
        console.log(selectedNumbersDefaultCoordinates)
    }

    setCorrectCombination(_correctCombination) {
        correctCombination = _correctCombination;
    }

    reset() {
        selectedNumbersList = [];
        correctCombinationPointer = 0;
        correctCombination = [];
    }

    buttonClickedHandler(i, elementClicked) {
        if (this.checkSelectedNumber(i)) {
            support.fire(ObserverChange.correctNumberPressed);
            selectedNumbersList.push(i);
            if (correctCombination.length === selectedNumbersList.length) {
                this.reset();
                difficultyManager.mazeSolved();
            }
        } else {
            //TODO change element colo for some time as feedback.
            support.fire(ObserverChange.incorrectNumberPressed);
            elementClicked.className = "negativesmall";
            setTimeout(() => {
                elementClicked.className = "positivesmall";
            }, 500);
        }
    }

    checkSelectedNumber(input) {
        if (correctCombination[correctCombinationPointer] === input) {
            correctCombinationPointer++;
            return true;
        }
        return false;
    }
}