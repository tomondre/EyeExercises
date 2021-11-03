import {config} from "./config";

let sketch;
let img;
let defaultCarCoordinates;
let defaultCarSize = config.car.size;
let shouldBeDrawn = false;
let angle = 0;

export default class CarCursor {
    constructor(Sketch, defaultCarPosition) {
        sketch = Sketch;
        img = sketch.loadImage('./img/CursorCar.png');
        defaultCarCoordinates = defaultCarPosition;
        this.remove();
    }

    draw() {
        if (shouldBeDrawn) {
            sketch.translate();
            let x = sketch.pmouseX - sketch.mouseX;
            let y = sketch.pmouseY - sketch.mouseY

            if (x > 0 && y > 0) {
                angle = 135;
            } else if (x > 0 && y < 0) {
                angle = 45;
            } else if (x < 0 && y < 0) {
                angle = 315;
            } else if (x < 0 && y > 0) {
                angle = 225;
            } else if (x === 0 && y < 0) {
                angle = 0;
            } else if (x === 0 && y > 0) {
                angle = 180;
            } else if (x < 0 && y === 0) {
                angle = 270;
            } else if (x > 0 && y === 0) {
                angle = 90;
            }
            sketch.translate(sketch.mouseX, sketch.mouseY);
            sketch.angleMode(sketch.DEGREES)
            sketch.rotate(angle);
            sketch.imageMode(sketch.CENTER);
            sketch.image(img, 0, 0, defaultCarSize.x, defaultCarSize.y)
        } else {
            sketch.image(img, defaultCarCoordinates.x, defaultCarCoordinates.y, defaultCarSize.x, defaultCarSize.y);
        }
    }

    create() {
        shouldBeDrawn = true;
    }

    remove() {
        shouldBeDrawn = false;
    }
}