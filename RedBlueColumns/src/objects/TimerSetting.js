import FetchDataManager from "./FetchDataManager";
import TextStyleManager from "./TextStyleManager";
import {CONFIG} from "../configs/CONFIG";

let scene;
let time;
let text;
let textObject
let timeObject;

let button = [];
let callback;


export default class TimerSetting {
    constructor(Scene, Callback) {
        scene = Scene;
        time = FetchDataManager.getTrainingTime();
        text = CONFIG.timerSettings.text;
        callback = Callback;
    }

    create() {
        this.createButtons();
        let style = TextStyleManager.getTextStyle();
        textObject = scene.add.text(window.innerWidth * this.getWidth(text), window.innerHeight * 0.4, "", style);
        timeObject = scene.add.text(window.innerWidth * this.getWidth(time), window.innerHeight * 0.45, "", style);
        this.update();
    }

    update() {
        textObject.setText(text);
        timeObject.setText(time);
    }
    destroy() {
        for (let i = 0; i < button.length; i++) {
            button[i].destroy();
        }
        textObject.destroy();
        timeObject.destroy();
    }

    createButtons(){
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * 4);
        let gap = gridLength / 3;
        let x = ((windowWidth - gridLength) / 2.36);
        let y = ((window.innerHeight - gridLength) / 2) + (3 + 3) * gap ;

        for (let i = 0; i < 3; i++) {
            let symbol = CONFIG.timerSettings.buttonSymbols[i]
            button[i] = scene.add.text(x + (i * 200 - (symbol.length * 5)), y, symbol, TextStyleManager.getButtonTextSize())
                .setPadding(15)
                .setStyle({backgroundColor: '#006400'})
                .setInteractive({useHandCursor: true})
                .on('pointerdown', () => this.onClick(symbol))
                .on('pointerover', () => button[i].setStyle({backgroundColor: '#003C00'}))
                .on('pointerout', () => button[i].setStyle({backgroundColor: '#006400'}))
        }
    }

    increase() {
        time += 20;
        this.update();
    }

    decrease() {
        time -= 20;
        this.update();
    }

    onClick(x){
        switch(x) {
            case "+":
                this.increase();
                break;
            case "-":
                this.decrease();
                break;
            case "Confirm":
                FetchDataManager.saveTrainingTime(time);
                FetchDataManager.saveCurrentTrainingTime(time);
                FetchDataManager.switchTimeSet();
                callback();
                break;
        }
    }

    getWidth(x) {
        if (this.isInt(x)) {
            return 0.5 - (0.01 * x.toString().length);
        } else {
            return 0.5 - (0.005 * x.length);
        }
    }

    isInt(value) {
        var x = parseFloat(value);
        return !isNaN(value) && (x | 0) === x;
    }

}