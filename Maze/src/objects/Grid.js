import Cell from "./Cell";
import {config} from "../config";
import ObserverSupport from "../observer/ObserverSupport";
import {ObserverChange} from "../observer/ObserverChange";
import Helper from "./Helper";

let grid = [];
let cols, rows;
let current;
let stack = [];
let w;
let lineWidth = config.maze.lineWidth;

let gameStarted = false;

let sketch;
let mazeWidth = config.canvas.width;
let mazeOffsetX = Helper.getOffsets().offsetX;
let mazeOffsetY = Helper.getOffsets().offsetY;

let observerSupport;

export default class Grid {
    constructor(Sketch) {
        sketch = Sketch;
        observerSupport = new ObserverSupport();
    }

    setup(numberOfColumns) {
        w = sketch.floor(mazeWidth / numberOfColumns);
        cols = numberOfColumns;
        rows = numberOfColumns;
        grid = [];
        cols = sketch.floor(mazeWidth / w);
        rows = sketch.floor(mazeWidth / w);
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                var cell = new Cell(i, j, sketch, grid, w, cols);
                grid.push(cell);
            }
        }
        current = grid[0];
        this.generate();
    }

    generate() {
        sketch.strokeWeight(lineWidth);
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
            }
            else {
                return;
            }
        }
    }

    draw() {
        sketch.background(0);
        for (let i = 1; i < grid.length - 1; i++) {
            grid[i].show();
        }
        grid[0].highlightFirst();
        grid[grid.length - 1].highlightLast();
        this.checkBoundaries();
    }

    checkBoundaries() {
        if (gameStarted) {
            for (let i = 1; i < grid.length - 1; i++) {
                if (grid[i].checkColision(sketch.mouseX, sketch.mouseY)) {
                    observerSupport.fire(ObserverChange.collision);
                    return;
                }
            }
            if (grid[grid.length - 1].isHoverOver(sketch.mouseX, sketch.mouseY)) {
                gameStarted = false;
                observerSupport.fire(ObserverChange.difficultyFinished);
                return;
            }
            if ((sketch.mouseX < mazeOffsetX || sketch.mouseX > mazeWidth + mazeOffsetX) ||
                sketch.mouseY < mazeOffsetY || sketch.mouseY > mazeWidth + mazeOffsetY) {
                gameStarted = false;
                observerSupport.fire(ObserverChange.pointerOutsideMaze);
            }
        } else {
            if ((sketch.mouseX > mazeOffsetX && sketch.mouseX < mazeOffsetX + w) &&
                sketch.mouseY > mazeOffsetY && sketch.mouseY < mazeOffsetY +  w) {
                gameStarted = true;
                observerSupport.fire(ObserverChange.pointerOnFirstTile);
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

    getCarPosition()
    {
        let result = grid[0].getMiddlePoint();
        result.x -= config.car.size.x / 2;
        result.y -= config.car.size.y / 2;
        return result;
    }

    subscribe(observer)
    {
        observerSupport.subscribe(observer);
    }

    unsubscribe(observer)
    {
        observerSupport.unsubscribe(observer);
    }
}