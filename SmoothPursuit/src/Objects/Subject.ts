import * as p5 from "p5";
import LevelManager from "./LevelManager";

export default class Subject {
    private sketch : p5;
    private x : number;
    private y : number;
    private levelManager : LevelManager
    private image : p5.Image;

    constructor(sketch : p5, levelManager : LevelManager) {
        this.image = sketch.loadImage('assets/Bee.png');
        this.sketch = sketch;
        this.x = sketch.canvas.width / 2;
        this.y = sketch.canvas.height / 2;
        this.levelManager = levelManager;
        this.reset();
    }

    draw() {
        this.sketch.imageMode(this.sketch.CENTER);
        this.sketch.image(this.image, this.x, this.y);
        this.move();
        this.checkBoundaries();
    }

    private move() {
        this.x += 10;
    }

    private checkBoundaries() {
        
    }

    reset() {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
    }
}