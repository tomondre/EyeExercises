import {CST} from "../cst/CST";
import {CONFIG} from "../config/CONFIG";
import OuterArrowsManager from "./OuterArrowsManager";

let grid = [6];
let scene = null;
let arrowImages = [];
let outerArrows = null;
let levelManager;

let levelUpCB;

export default class Grid {
    constructor(Scene, levelsManager, levelUpCb) {
        scene = Scene;
        outerArrows = new OuterArrowsManager(scene, levelsManager);
        levelManager = levelsManager;
        levelUpCB = levelUpCb
    }

    create() {
        this.generateGrid();
        this.displayGrid();
        outerArrows.create();
    }


    displayGrid() {
        arrowImages = [];
        let windowWidth = window.innerWidth;
        let gridLength = windowWidth * (CONFIG.grid.arrowSizeToWindowWidthRatio * levelManager.getRowCount());
        let x = (windowWidth - gridLength) / 2  ;
        let y = (window.innerHeight - gridLength) / 2;
        let gap = gridLength / levelManager.getRowCount();

        let arrowGridLengthRatio = gridLength / levelManager.getRowCount()

        for (let i = 0; i < grid.length; i++) {
            let row = [];
            for (let j = 0; j < grid[i].length; j++) {
                let image = scene.add.image(x + (j * gap), y + (i * gap), "arrow");
                image.setScale(CONFIG.grid.arrowScale);
                image.setOrigin(0.5);

                let imageAngle = 0;
                switch (grid[i][j]) {
                    case CST.arrowDirection.LEFT:
                        imageAngle = 270;
                        break;
                    case CST.arrowDirection.UP:
                        imageAngle = 0;
                        break;
                    case CST.arrowDirection.RIGHT:
                        imageAngle = 90;
                        break;
                    case CST.arrowDirection.DOWN:
                        imageAngle = 180;
                        break;
                }
                image.setAngle(CONFIG.arrowImageAngle + imageAngle);
                image.setScale((arrowGridLengthRatio / image.width) * CONFIG.grid.arrowSizeToTotalSpaceRatio);
                row.push(image);
            }
            arrowImages.push(row);
        }
    }

    generateGrid() {
        grid = [];
        let numberOfArrows = levelManager.getRowCount();
        for (let i = 0; i < numberOfArrows; i++) {
            let row = [];
            for (let j = 0; j < numberOfArrows; j++) {
                row[j] = this.getRandomDirection();
            }
            grid[i] = row;
        }
    }

    getRandomDirection() {
        switch (this.getRandomNumber(4)) {
            case 0:
                return CST.arrowDirection.LEFT;
            case 1:
                return CST.arrowDirection.UP;
            case 2:
                return CST.arrowDirection.RIGHT
            case 3:
                return CST.arrowDirection.DOWN
        }
    }

    getRandomNumber(maxPlusOne) {
        return Math.floor(Math.random() * maxPlusOne);
    }

    destroy() {
        for (let i = 0; i < arrowImages.length; i++) {
            for (let j = 0; j < arrowImages[i].length; j++) {
                arrowImages[i][j].destroy();
            }
        }
    }

    checkKeyboardEntry(keyPressed) {
        let outerArrowCoordinates = outerArrows.getArrowReading();

        let answerRow;
        let answerColumn;

        if (outerArrowCoordinates[0] < levelManager.getRowCount()) {
            answerRow = (levelManager.getRowCount() - 1) - outerArrowCoordinates[0];
            answerColumn = outerArrowCoordinates[1]
        } else {
            answerRow = outerArrowCoordinates[1];
            answerColumn = outerArrowCoordinates[0] - levelManager.getRowCount();
        }

        let wayOfCorrectArrowOnGrid = grid[answerRow][answerColumn];
        if (keyPressed === wayOfCorrectArrowOnGrid) {
            let imageObjectOfCorrectArrow = arrowImages[answerRow][answerColumn];
            if (!outerArrows.nextArrowToRead()) {
                levelUpCB();
                return true;
            }
            imageObjectOfCorrectArrow.setTint(0x00ff00);
            setTimeout(() => imageObjectOfCorrectArrow.clearTint(), 500);
            return true;
        } else {
            let imageObjectOfCorrectArrow = arrowImages[answerRow][answerColumn];
            imageObjectOfCorrectArrow.setTint(0xff0000);
            setTimeout(() => imageObjectOfCorrectArrow.clearTint(), 500);
            return false;
        }
    }
}