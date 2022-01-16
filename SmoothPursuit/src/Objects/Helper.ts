import {config} from "./config";

export default class Helper {

    private static instance : Helper = new Helper();

    private constructor() {
    }

    public static get() : Helper {
        if (this.instance === undefined)
        {
            this.instance = new Helper();
        }
        return this.instance;
    }

    public getRandomOptions(currentLevel : number, noOfSymbols : number) : string[] {
        let result = [];
        let singleString : string;
        let symbols;

        if (currentLevel === 1) {
            symbols = config.levels.levelTwoSymbols;
        }
        else if (currentLevel === 2)
        {
            symbols = config.levels.levelThreeSymbols;
        }
        else if (currentLevel === 3)
        {
            symbols = config.levels.levelFourSymbols;
        }
        else if (currentLevel === 4)
        {
            symbols = config.levels.levelFiveSymbols;
        }

        for (let i = 0; i < 3; i++) {
            singleString = "";
            for (let i = 0; i < noOfSymbols; i++) {
                singleString += symbols.charAt(Math.floor(Math.random() * symbols.length));
            }
            result.push(singleString);
        }
        return result;
    }

    public static createSlowdownListener(handler : () => void){
        this.removeSlowdownListener(handler);
        let elementById = document.getElementById("slowDownButton");
        elementById.addEventListener("pointerdown", handler);
    }

    public static removeSlowdownListener(handler : () => void){
        let elementById = document.getElementById("slowDownButton");
        elementById.removeEventListener("pointerdown", handler);
    }
}