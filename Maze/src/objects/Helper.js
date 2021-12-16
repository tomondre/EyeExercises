import {config} from "../config";

export default class Helper {
    static getOffsets()
    {
        if (Helper.isMobile())
        {
            let offsetY = (window.innerHeight - (config.canvas.width)) / 3;
            return {offsetX : 0, offsetY};
        }
        else {

            let offsetX = (window.innerWidth - (config.canvas.width)) / 2;
            let offsetY = (window.innerHeight - (config.canvas.width)) / 2;
            return {offsetX, offsetY};
        }
    }

    static isMobile()
    {
        return window.innerWidth < 960 && window.innerHeight > window.innerWidth
    }
}