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

let mazeSolution = [];
let mazeSolved = false;

let collisionCooldown = config.cooldown.afterCollisionCooldown;

let gameStarted = false;
let isCooldown = false;

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
        mazeSolution = [];

        mazeSolved = false;

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

                //STEP 5 - maze solver
                if (current.i === (cols - 1)&& current.j === (rows - 1))
                {
                    mazeSolved = true;
                }
                if (!mazeSolved)
                {
                    mazeSolution.push(current);
                }
            } else if (stack.length > 0) {
                if (!mazeSolved)
                {
                    mazeSolution.pop();
                }
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
        this.drawSolution();
        this.generate();
        this.checkBoundaries();
    }

    drawSolution()
    {
        for (let i = 0; i < mazeSolution.length; i++) {
            mazeSolution[i].highlightLast();
        }
    }

    checkBoundaries() {
        if (gameStarted) {

            if (!isCooldown) {
                isCooldown = true;
                for (let i = 1; i < grid.length - 1; i++) {
                    if (grid[i].checkColision(sketch.mouseX, sketch.mouseY)) {
                        observerSupport.fire(ObserverChange.collision);
                        break;
                    }
                }
                setTimeout(() => isCooldown = false, collisionCooldown);
            }

            else if (grid[grid.length - 1].isHoverOver(sketch.mouseX, sketch.mouseY)) {
                gameStarted = false;
                observerSupport.fire(ObserverChange.mazeSolved);
            }

            else if ((sketch.mouseX < mazeOffsetX || sketch.mouseX > mazeWidth + mazeOffsetX) ||
                sketch.mouseY < mazeOffsetY || sketch.mouseY > mazeWidth + mazeOffsetY) {
                gameStarted = false;
                observerSupport.fire(ObserverChange.pointerOutsideMaze);
            }

        } else if ((sketch.mouseX > mazeOffsetX && sketch.mouseX < mazeOffsetX + w) &&
                sketch.mouseY > mazeOffsetY && sketch.mouseY < mazeOffsetY +  w) {
                gameStarted = true;
                observerSupport.fire(ObserverChange.pointerOnFirstTile);
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
        return grid[0].getMiddlePoint();
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