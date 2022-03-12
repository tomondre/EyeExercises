import {CST} from "./CST";
import {CONFIG} from "../configs/CONFIG";
import TextStyleManager from "./TextStyleManager";
import OuterArrowsManager from "./OuterArrowsManager";
import {Parser} from "phaser/scripts/tsgen/src/Parser";


let scene = null;
let symbol = [];
let levelManager;
let outerArrows;
let levelUpCB;


export default class Grid {
    constructor(Scene, levelsManager, levelUpCb) {
        scene = Scene;
        levelManager = levelsManager;
        outerArrows = new OuterArrowsManager(scene, levelsManager);
        levelUpCB = levelUpCb;
    }

    create() {
        this.generateColumns();
        this.generateGrid();
        outerArrows.create();
    }


    generateGrid() {
        symbol = [];
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * levelManager.getRowCount());
        let x = (windowWidth - gridLength) / 2  ;
        let y = (window.innerHeight - gridLength) / 2;
        let numberOfSymbols = levelManager.getRowCount();
        let gap = gridLength / numberOfSymbols;

        for (let i = 0; i < numberOfSymbols; i++) {
            let row = [];
            for (let j = 0; j < numberOfSymbols; j++) {

                let style = TextStyleManager.getTextStyle()
                let text = scene.add.text(x + (j * gap), y + (i * gap), this.getRandomSymbol(), style)

                row.push(text);

            }
            symbol.push(row);
        }
    }
    generateColumns(){
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * levelManager.getRowCount());
        let x = ((windowWidth - gridLength) / 2) + 15  ;
        let y = ((window.innerHeight - gridLength) / 2);
        let numberOfSymbols = levelManager.getRowCount();
        let gap = gridLength / numberOfSymbols;
        let graphics = scene.add.graphics();
        graphics.setAlpha(0.5);


        for (let i = 0; i < numberOfSymbols; i++) {
            let color;
            if(i >= CONFIG.colors.length){
                let x = Math.round(i%CONFIG.colors.length);
                color = CONFIG.colors[x]?.value;
            }
            else if (i < CONFIG.colors.length) {
                color = CONFIG.colors[i]?.value;
            }
            graphics.lineStyle(30, color);
            graphics.beginPath();
            for (let j = 0; j < numberOfSymbols + 1; j++) {
                if(j === 0) {
                    graphics.moveTo(x + (i * gap), y + (j * gap));
                    graphics.lineTo(x + (i * gap), y + (j * gap));
                }
                else{
                    graphics.lineTo(x + (i * gap), y + (j * gap));
                }
            }
            graphics.closePath();
            graphics.strokePath();
        }
    }

    getRandomSymbol(){
        return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)].value;
    }

    destroy() {
        for (let i = 0; i < symbol.length; i++) {
            for (let j = 0; j < symbol[i].length; j++) {
                symbol[i][j].destroy();
            }
        }
    }

    checkKeyboardEntry(enteredSymbol){
        let x = outerArrows.getArrowReadingX();
        let y = outerArrows.getArrowReadingY();

        let correctSymbol = symbol[y][x].text;
        let stilingSymbol = symbol[y][x];

        if(correctSymbol === enteredSymbol.toString()){
            stilingSymbol.setStyle({ color: '#FFF' });
            setTimeout(() => stilingSymbol.setStyle({color: '#000'}), 500);
            if (!outerArrows.nextArrowToRead()) {
                levelUpCB();
            }
            return true;
        }
        else {
            return false;
        }
    }

    getSymbol(x,y){
        return symbol[x][y];
    }

}