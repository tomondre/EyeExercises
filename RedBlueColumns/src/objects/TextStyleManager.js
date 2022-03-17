import {CONFIG} from "../configs/CONFIG";

export default class TextStyleManager {
    static getTextStyle() {
        if (window.innerWidth > CONFIG.responsiveness.switchSizesWhenResolutionLowerThan) {
            return {font: CONFIG.responsiveness.normalTextSize + "px Arial", fill: "#000000"};
        } else {
            return {font: CONFIG.responsiveness.smallerTextSize + "px Arial", fill: "#000000"};
        }
    }

    static getTextStyleGrid(x) {
        if (window.innerWidth > CONFIG.responsiveness.switchSizesWhenResolutionLowerThan) {
            return {font: CONFIG.responsiveness.normalTextSize + "px Arial", fill: CONFIG.colors[x].value};
        } else {
            return {font: CONFIG.responsiveness.smallerTextSize + "px Arial", fill: CONFIG.colors[x].value};
        }
    }

    static getButtonTextSize() {
        if (window.innerWidth > CONFIG.responsiveness.switchSizesWhenResolutionLowerThan) {
            return {font: CONFIG.responsiveness.normalButtonTextSize + "px Arial", fill: "#FFFFFF"};
        } else {
            return {font: CONFIG.responsiveness.smallerButtonTextSize + "px Arial", fill: "#FFFFFF"};
        }
    }
}