import {CONFIG} from "../configs/CONFIG";
import TextStyleManager from "./TextStyleManager";

let outerArrows = [];
let scene = null;
let outerArrowsImages = [];

let arrowReading = 0;
let levelManager;

export default class OuterArrowsManager {
    constructor(Scene, levelsManager) {
        levelManager = levelsManager;
        scene = Scene;
    }

    create() {
        this.generateOuterArrows();
        this.displayOuterArrows();
    }

    generateOuterArrows() {
        let verticalArrows = levelManager.getVerticalOuterArrowsNo();
        let horizontalArrows = levelManager.getHorizontalOuterArrowsNo();
        outerArrows = [];

        //Vertical Outer Arrows Generation
        let randomNumbers = this.getRandomArrowPositionIDs(0, levelManager.getRowCount(), horizontalArrows);
        for (let i = 0; i < horizontalArrows; i++) {
            outerArrows.push(new this.OuterArrow(randomNumbers[i], scene));
        }

        //Horizontal Outer Arrows Generation
        randomNumbers = this.getRandomArrowPositionIDs(levelManager.getRowCount(), levelManager.getRowCount() * 2, verticalArrows);
        for (let i = 0; i < verticalArrows; i++) {
            outerArrows.push(new this.OuterArrow(randomNumbers[i], scene));
        }
        arrowReading = 0;
    }

    getArrowReadingY() {
        let arrow = outerArrows[arrowReading];
        let y = arrow.getArrowPlace() - levelManager.getRowCount();
        if(y < 0){
            y = (y * -1) - 1
        }
        return y;
    }
    getArrowReadingX() {
        let arrow = outerArrows[arrowReading];
        return arrow.getDepthReading();
    }

    nextArrowToRead() {
        outerArrows[arrowReading].deepenReading();
        arrowReading++;
        if (arrowReading === outerArrows.length) {
            arrowReading = 0;
        }
        return !outerArrows[arrowReading].isOutOfBoundaries();
    }

    displayOuterArrows() {
        let gap = 45;
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * levelManager.getRowCount());
        let x = ((windowWidth - gridLength) / 2) + gap / 3;
        let y = ((window.innerHeight - gridLength) / 3) + gap / 3;


        let arrowCount = 1;

        for (let i = 0; i < outerArrows.length; i++) {
            let arrow = outerArrows[i];
            let arrowX;
            let arrowY;
            let rotation;
            let textAngle;

            if (arrow.getArrowPlace() < levelManager.getRowCount()) {
                arrowX = x - gap;
                arrowY = y + (gap * (levelManager.getRowCount() - 1 - arrow.getArrowPlace()));
                rotation = 180;
                textAngle = 0;
            } else {
                arrowX = x + ((arrow.getArrowPlace() - levelManager.getRowCount()) * gap);
                arrowY = y - gap;
                rotation = 270;
                textAngle = 0;
            }
            let arrowGridLengthRatio = gridLength / levelManager.getRowCount()
            let image;
            image = scene.add.image(arrowX, arrowY, "arrow");
            image.setAngle(rotation);
            image.setScale((arrowGridLengthRatio / image.width) * CONFIG.grid.arrowSizeToTotalSpaceRatio);
            image.setTint(0x00ff00);

            let style = TextStyleManager.getButtonTextSize()
            let text = scene.add.text(arrowX, arrowY, arrowCount++, style).setOrigin(0.5)
            text.setAngle(textAngle);
            outerArrowsImages[i] = image;
        }
    }

    OuterArrow(placement, Scene) {
        this.place = placement;
        this.scene = Scene;
        this.depthReading = 0;
        this.display = function (x, y) {
            this.arrowObject = this.scene.add.image(x, y, "arrow");
            this.arrowObject.setOrigin(0.5);
        };
        this.destroy = function () {
            this.arrowObject.destroy();
        };
        this.getDepthReading = function () {
            return this.depthReading;
        };
        this.getArrowPlace = function () {
            return this.place;
        }
        this.deepenReading = function () {
            ++this.depthReading;
        }
        this.isOutOfBoundaries = function () {
            return this.depthReading === levelManager.getRowCount();
        }
    }

    getRandomArrowPositionIDs(min, max, count) {
        let nums = new Set();
        while (nums.size < count) {
            nums.add(Math.floor(Math.random() * (max - min) + min));
        }
        return [...nums].sort((a, b) => a - b);
    }
}