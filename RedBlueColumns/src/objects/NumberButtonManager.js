import TextStyleManager from "./TextStyleManager";

import {CONFIG, config} from "../configs/config";


let scene;
let levelManager;
let symbol = [];
let button = [];
let isContinue = true;


//TODO set numbers position so it is responsive to all screens (X, Y of left bottom of grid and start generating from there)
export default class NumberButtonManager {
    constructor(Scene, levesManager) {
        scene = Scene;
        levelManager = levesManager;
    }

    create() {
        symbol = CONFIG.symbols;
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * levelManager.getRowCount());
        let gap = gridLength / levelManager.getRowCount();
        let x = ((windowWidth - gridLength) / 2);
        let y = ((window.innerHeight - gridLength) / 2) + (levelManager.getRowCount() + 1) * gap ;


        if (isContinue) {
            for (let i = 0; i < symbol.length; i++) {
                 button[i] = scene.add.text(x + (i * gap), y, symbol[i].value, TextStyleManager.getButtonTextSize())
                    .setPadding(8)
                    .setStyle({ backgroundColor: '#006400' })
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => this.startGame(symbol[i]))
                    .on('pointerover', () => button[i].setStyle({ backgroundColor: '#003C00' }))
                    .on('pointerout', () => button[i].setStyle({ backgroundColor: '#006400' }))
                //scene.add.text(x + (i * gap), y, symbol[i].value, TextStyleManager.getButtonTextSize()).setPadding(10);
            }
        }
    }

    startGame(i) {
        console.log(i);
    }
    // generate(position) {
    //     let x = (position.x / window.innerWidth) * 100;
    //     let y = ((position.y + gapBetweenGridAndNumberButton) / window.innerHeight) * 100;
    //
    //     this.saveCoordinates(position)
    //
    //     let buttons = document.getElementById("numbersButtons");
    //     buttons.style.visibility = "visible";
    //     buttons.childNodes[1].style.left = x + "%";
    //     if (Helper.isMobile())
    //     {
    //         buttons.childNodes[1].style.top = (y + 3) + "%";
    //         buttons.childNodes[1].style.width = "100%";
    //         let elements = document.getElementsByClassName("numBut");
    //         for (let i = 0; i < elements.length; i++) {
    //             elements.item(i).style.fontSize = "50px";
    //         }
    //     }
    //     else {
    //         buttons.childNodes[1].style.top = (y) + "%";
    //     }
    //
    //     for (let i = 0; i < 10; i++) {
    //         let element = document.getElementById("numberButton" + i);
    //         element.addEventListener("click", () => this.buttonClickedHandler(i))
    //         numberButtons.push(element);
    //     }
    //     document.addEventListener('keydown', this.keyboardClickedHandler.bind(this));
    //
    //     this.continue();
    // }
    //
    //
    // continue() {
    //     isContinue = true;
    //     document.getElementById("numbersButtons").style.visibility = "visible";
    // }
    //
    // pause() {
    //     isContinue = false;
    //     document.getElementById("numbersButtons").style.visibility = "hidden";
    // }
    //
    //
    // saveCoordinates(position) {
    //     let x = position.x;
    //     let y = position.y + gapBetweenGridAndNumberButton + gapBetweenButtonsAnsSelectedNumbers;
    //
    //     selectedNumbersDefaultCoordinates = {x: x, y: y};
    // }
    //
    //
    // reset() {
    //     selectedNumbersList = [];
    //     correctCombinationPointer = 0;
    //     correctCombination = [];
    // }



}