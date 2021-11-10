import {config} from "../config";

export default class Helper {
    static getOffsets()
    {
        let offsetX = (window.innerWidth - (config.canvas.width)) / 2;
        let offsetY = (window.innerHeight - (config.canvas.width)) / 2;
        return {offsetX, offsetY};
    }
}