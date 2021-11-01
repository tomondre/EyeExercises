import Cell from "./Cell";
import {config} from "./config";

//TODO generating algorithm not working - check


let grid = [];
let cols, rows;
let current;
let stack = [];
let w = config.tile.width;

var gameStarted = false;

let sketch;
let canvasWidth

export default class Grid {

    constructor(Sketch) {
        sketch = Sketch;
        canvasWidth = config.canvas.width;
    }

    setup() {
        cols = sketch.floor(canvasWidth / w);
        rows = sketch.floor(canvasWidth / w);
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                var cell = new Cell(i, j, sketch, grid);
                grid.push(cell);
            }
        }
        current = grid[0];
        // this.generate();
    }

    generate() {
        while (true) {
            current.visited = true;
            // STEP 1
            let next = current.checkNeighbors();
            if (next) {
                next.visited = true;
                // STEP 2
                stack.push(current);

                // STEP 3
                this.removeWalls(current, next);

                // STEP 4
                current = next;

            } else if (stack.length > 0) {
                current = stack.pop();
            } else {
                return;
            }
                current.highlightLast();
        }
    }

    draw() {
        sketch.background(51);
        this.generate();
        grid[0].highlightFirst();
        for (let i = 1; i < grid.length - 1; i++) {
            grid[i].show();
        }
        grid[grid.length - 1].highlightLast();
        this.checkBoundaries();
    }

    checkBoundaries() {
        if (gameStarted) {
            for (let i = 0; i < grid.length - 1; i++) {
                if (grid[i].checkColision(sketch.mouseX, sketch.mouseY)) {
                    console.log("colision");
                    return;
                }
            }
            if (grid[grid.length - 1].isHoverOver(sketch.mouseX, sketch.mouseY)) {
                console.log("game finished")
                return;
            }
            if ((sketch.mouseX < 0 - w || sketch.mouseX > canvasWidth + w) ||
                sketch.mouseY < 0 - w || sketch.mouseY > canvasWidth + w) {
                gameStarted = false;
                document.body.style.cursor = "default";
            }
        } else {
            if ((sketch.mouseX > 0 && sketch.mouseX < w) &&
                sketch.mouseY > 0 && sketch.mouseY < w) {
                gameStarted = true;
                document.body.style.cursor = "url('./img/CursorCar.png')8 26, auto";
            }
        }
    }

    removeWalls(a, b) {
        let x = a.i - b.i;
        if (x === 1) {
            a.walls[3] = false;
            b.walls[1] = false;
        } else if (x === -1) {
            a.walls[1] = false;
            b.walls[3] = false;
        }
        let y = a.j - b.j;
        if (y === 1) {
            a.walls[0] = false;
            b.walls[2] = false;
        } else if (y === -1) {
            a.walls[2] = false;
            b.walls[0] = false;
        }
    }
}