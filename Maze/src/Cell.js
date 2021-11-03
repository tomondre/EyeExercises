// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
import {config} from "./config"
import Helper from "./Helper";

let w;
let lineWidth = config.maze.lineWidth;
let cols, rows;
let grid;
let gridOffsetX;
let gridOffsetY


export default class Cell {
    constructor(i, j, sketch, _grid, _w, _cols) {
        cols = _cols;
        rows = _cols;
        w = _w;
        grid = _grid
        this.sketch = sketch
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;
        let offsets = Helper.getOffsets();
        gridOffsetX = offsets.offsetX;
        gridOffsetY = offsets.offsetY;
    }

    checkNeighbors() {
        let neighbors = [];
        let top = grid[this.index(this.i, this.j - 1)];
        let right = grid[this.index(this.i + 1, this.j)];
        let bottom = grid[this.index(this.i, this.j + 1)];
        let left = grid[this.index(this.i - 1, this.j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            let r = this.sketch.floor(this.sketch.random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    };

    highlight(r, g, b, leftTopOffset, rightBottomOffset) {
        let coordinates = this.getXYcoordinates();
        let x = coordinates.x;
        let y = coordinates.y;

        this.sketch.noStroke();
        this.sketch.fill(r, g, b, 100);
        this.sketch.rect(x + leftTopOffset, y + leftTopOffset, w - rightBottomOffset, w - rightBottomOffset);
    };

    isHoverOver(mouseX, mouseY) {
        let coordinates = this.getXYcoordinates();
        let x = coordinates.x;
        let y = coordinates.y;
        return mouseX > x && mouseX < x + w &&
            mouseY > y && mouseY < y + w;
    }

    highlightFirst() {
        let c = config.tile.firstTile;
        this.highlight(c.R, c.G, c.B, 0, lineWidth);
    }

    highlightLast() {
        let c = config.tile.lastTile;
        this.highlight(c.R, c.G, c.B, lineWidth, 0);
    }

    checkColision(mX, mY) {
        let coordinates = this.getXYcoordinates();
        let x = coordinates.x;
        let y = coordinates.y;

        if (this.walls[0]) {
            if (mX > x - lineWidth && mX < x + w + lineWidth &&
                mY > y - lineWidth && mY < y + lineWidth) {
                return true;
            }
        }
        if (this.walls[1]) {
            if (mX > x + w - lineWidth && mX < x + w + lineWidth &&
                mY > y - lineWidth && mY < y + w - lineWidth) {
                return true;
            }
        }
        if (this.walls[2]) {
            if (mX > x - lineWidth && mX < x + w + lineWidth &&
                mY > y + w - lineWidth && mY < y + w + lineWidth) {
                return true;
            }
        }
        if (this.walls[3]) {
            if (mX > x - lineWidth && mX < x + lineWidth &&
                mY > y - lineWidth && mY < y + w + lineWidth) {
                return true;
            }
        }
        return false;
    }

    show() {
        let coordinates = this.getXYcoordinates();
        let x = coordinates.x;
        let y = coordinates.y;
        this.sketch.stroke(255);
        if (this.walls[0]) {
            this.sketch.line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            this.sketch.line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            this.sketch.line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            this.sketch.line(x, y + w, x, y);
        }
    }

    index(i, j) {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
            return -1;
        }
        return i + j * cols;
    }

    getMiddlePoint() {
        let coordinates = this.getXYcoordinates();
        let x = coordinates.x + (w / 2);
        let y = coordinates.y + (w / 2);
        return {x, y}
    }

    getXYcoordinates() {
        let x = this.i * w + gridOffsetX;
        let y = this.j * w + gridOffsetY;
        return {x, y};
    }
}