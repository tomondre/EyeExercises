import {CONFIG} from "../config/CONFIG";

export default class TextStyleManager {
    static getTextStyle() {
        if (window.innerWidth > CONFIG.responsiveness.switchSizesWhenResolutionLowerThan) {
            return {font: CONFIG.responsiveness.normalTextSize + "px Arial", fill: "#fff"};
        } else {
            return {font: CONFIG.responsiveness.smallerTextSize + "px Arial", fill: "#fff"};
        }
    }

    static getButtonTextSize() {
        if (window.innerWidth > CONFIG.responsiveness.switchSizesWhenResolutionLowerThan) {
            return CONFIG.responsiveness.normalButtonTextSize;
        } else {
            return CONFIG.responsiveness.smallerButtonTextSize;
        }
    }
}