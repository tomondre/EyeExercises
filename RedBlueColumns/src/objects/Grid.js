import {CST} from "./CST";
import {CONFIG} from "../CONFIG";
import TextStyleManager from "./TextStyleManager";
import OuterArrowsManager from "./OuterArrowsManager";


let scene = null;
let symbol = [];
let levelManager;
let outerArrows;


export default class Grid {
    constructor(Scene, levelsManager) {
        scene = Scene;
        levelManager = levelsManager;
        outerArrows = new OuterArrowsManager(scene, levelsManager);
    }

    create() {
        this.generateGrid();
        outerArrows.create();
    }


    generateGrid() {
        symbol = [];
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * levelManager.getRowCount());
        let x = (windowWidth - gridLength) / 2  ;
        let y = (window.innerHeight - gridLength) / 2;
        let gap = gridLength / levelManager.getRowCount();

        let numberOfSymbols = levelManager.getRowCount();

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

}