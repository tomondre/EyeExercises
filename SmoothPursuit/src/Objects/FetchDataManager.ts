import {config} from "./config";
import {Eyes} from "./Eyes";

let gameCode = config.game.number;

export default class FetchDataManager {

    public static getEyeLevelIndex(eye : Eyes) : number
    {
        var index =  window.localStorage.getItem(gameCode + "/Level/" + eye.toString());
        if (index === null)
            return 0;
        else
            return parseInt(index);
    }

    public static getEyeDifficulty(eye : Eyes) : number {
        let item = window.localStorage.getItem(gameCode + "/Difficulty/" + eye.toString());
        if (item === null)
            return 0;
        else
            return parseInt(item);
    }

    public static saveEyeDifficulty(index : number, eye : Eyes) : void {
        window.localStorage.setItem(gameCode + "/Difficulty/" + eye.toString(), index.toString());
    }

    public static saveEyeLevelIndex(index : number, eye : Eyes) : void{
        window.localStorage.setItem(gameCode + "/Level/" + eye.toString(), index.toString());
    }

    public static getEyeTime(eye : Eyes) : number
    {
        let time = window.localStorage.getItem(gameCode + "/Time/" + eye.toString());
        if (time === null)
        {
            return 120;
        }
        return parseInt(time);
    }

    public static saveEyeTime(time : number, eye : Eyes) : void{
        window.localStorage.setItem(gameCode + "/Time/" + eye.toString(), time.toString());
    }
}