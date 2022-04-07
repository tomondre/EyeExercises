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
        this.generateGrid();
        outerArrows.create();
    }


    generateGrid() {
        symbol = [];
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * levelManager.getRowCount());
        let x = (windowWidth - gridLength) / 2;
        let y = (window.innerHeight - gridLength) / 3;
        let numberOfSymbols = levelManager.getRowCount();
        let gap = 45;

        for (let i = 0; i < numberOfSymbols; i++) {
            let row = [];
            for (let j = 0; j < numberOfSymbols; j++) {

                let style = TextStyleManager.getTextStyleGrid(j % 3)
                let text = scene.add.text(x + (j * gap), y + (i * gap), this.getRandomSymbol(), style)

                row.push(text);

            }
            symbol.push(row);
        }
    }


    getRandomSymbol() {
        return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)].value;
    }

    destroy() {
        for (let i = 0; i < symbol.length; i++) {
            for (let j = 0; j < symbol[i].length; j++) {
                symbol[i][j].destroy();
            }
        }
    }

    checkKeyboardEntry(enteredSymbol) {
        let x = outerArrows.getArrowReadingX()
        let y = outerArrows.getArrowReadingY()


        let correctSymbol = symbol[y][x].text
        let stilingSymbol = symbol[y][x]

        let style = TextStyleManager.getTextStyleGrid(x % 3).fill


        if (correctSymbol === enteredSymbol.toString()) {
            if ((x + 1) < CONFIG.levels[levelManager.getCurrentLevelIndex()].rows) {
                stilingSymbol.setStyle({color: CONFIG.blinking.correct})
                setTimeout(() => stilingSymbol.setStyle({color: style}), 500)
            }
            if (!outerArrows.nextArrowToRead()) {
                levelUpCB();
            }
            return true;
        } else {
            stilingSymbol.setStyle({color: CONFIG.blinking.wrong});
            setTimeout(() => stilingSymbol.setStyle({color: style}), 500);
            return false;
        }
    }

    getSymbol(x, y) {
        return symbol[x][y];
    }

}