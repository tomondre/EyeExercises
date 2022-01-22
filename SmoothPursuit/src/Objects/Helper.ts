import {config} from "./config";

export default class Helper {

    private static instance: Helper = new Helper();

    private constructor() {
    }

    public static get(): Helper {
        if (this.instance === undefined) {
            this.instance = new Helper();
        }
        return this.instance;
    }

    public static getOptions(currentLevel: number, correctOption : string): string[] {

        let singleString: string;
        let symbols;
        let noOfSymbols = correctOption.length;

        if (currentLevel === 1) {
            symbols = config.levels.levelTwoSymbols;
        } else if (currentLevel === 2) {
            symbols = config.levels.levelThreeSymbols;
        } else if (currentLevel === 3) {
            symbols = config.levels.levelFourSymbols;
        } else if (currentLevel === 4) {
            symbols = config.levels.levelFiveSymbols;
        }

        let result : string[];
        do {
            result = [];
            for (let i = 0; i < 3; i++) {
                do {
                    singleString = "";
                    for (let i = 0; i < noOfSymbols; i++) {
                        singleString += symbols.charAt(Math.floor(Math.random() * symbols.length));
                    }
                } while (new Set(singleString).size !== singleString.length)

                result.push(singleString);
            }
            result.push(correctOption);
        } while (new Set(result).size !== result.length)
        return result;
    }


    public static shuffleArray(array) : string[] {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    public static createSlowdownListener(handler: () => void) {
        this.removeSlowdownListener(handler);
        let elementById = document.getElementById("slowDownButton");
        elementById.addEventListener("pointerdown", handler);
    }

    public static removeSlowdownListener(handler: () => void) {
        let elementById = document.getElementById("slowDownButton");
        elementById.removeEventListener("pointerdown", handler);
    }
}