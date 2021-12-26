import {config} from "../config";

export default class Helper {
    static getOffsets()
    {
        if (Helper.isMobile())
        {
            let offsetY = (window.innerHeight - (config.maze.width)) / 3;
            let offsetX = window.innerWidth - (window.innerHeight * config.maze.mobileWidthToScreenSizeRatio) / 2;
            return {offsetX, offsetY};
        }
        else {

            let offsetX = (window.innerWidth - (config.maze.width)) / 2;
            let offsetY = (window.innerHeight - (config.maze.width)) / 2;
            return {offsetX, offsetY};
        }
    }

    static isMobile()
    {
        return window.innerWidth < 960 && window.innerHeight > window.innerWidth;
    }
}