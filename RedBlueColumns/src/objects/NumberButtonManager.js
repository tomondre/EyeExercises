import TextStyleManager from "./TextStyleManager";
import {CONFIG, config} from "../configs/config";


let scene;
let levelManager;
let symbol = [];
let button = [];
let isContinue = true;

let callBack;


//TODO set numbers position so it is responsive to all screens (X, Y of left bottom of grid and start generating from there)
export default class NumberButtonManager {
    constructor(Scene, levesManager, CallBack) {
        scene = Scene;
        levelManager = levesManager;
        callBack = CallBack;
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
                    .on('pointerdown', () => this.getClickedButton(symbol[i]))
                    .on('pointerover', () => button[i].setStyle({ backgroundColor: '#003C00' }))
                    .on('pointerout', () => button[i].setStyle({ backgroundColor: '#006400' }))
            }
        }
    }

    getClickedButton(i) {
        callBack(i.value);
    }




}