let sketch;
let numberButtons = [];
let selectedNumbersList = [];

let correctCombination = [];
let correctCombinationPointer = 0;

//TODO set numbers position so it is responsive to all screens (X, Y of left bottom of grid and start generating from there)
export default class NumberButtonManager {
    constructor(Sketch) {
        sketch = Sketch;
    }
    
    generate(CorrectCombination)
    {
        correctCombination = CorrectCombination;

        for (let i = 0; i < 10; i++) {
            let element = document.getElementById("numberButton" + i);
            element.addEventListener("click", () => this.buttonClickedHandler(i, element))
            numberButtons.push(element);
        }
    }


    reset()
    {
        numberButtons = [];
        selectedNumbersList = [];
        correctCombinationPointer = 0;
        correctCombination = [];
    }

    buttonClickedHandler(i, elementClicked) {
        if (this.checkSelectedNumber(i))
        {
            selectedNumbersList.push(i);
        }
        else {
            //TODO change element colo for some time as feedback.
        }
    }

    checkSelectedNumber(input)
    {
        if (correctCombination[correctCombinationPointer] === input)
        {
            correctCombinationPointer++;
            return true;
        }
        return false;
    }
}