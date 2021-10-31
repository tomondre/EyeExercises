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

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function () {
        let neighbors = [];

        let top = grid[index(i, j - 1)];
        let right = grid[index(i + 1, j)];
        let bottom = grid[index(i, j + 1)];
        let left = grid[index(i - 1, j)];

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
            let r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    };
    this.highlight = function (r, g, b, leftTopOffset, rightBottomOffset) {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(r, g, b, 100);
        rect(x + leftTopOffset, y + leftTopOffset, w - rightBottomOffset, w - rightBottomOffset);
    };
    this.isHoverOver = function (mouseX, mouseY) {
        let x = this.i * w;
        let y = this.j * w;
        return mouseX > x && mouseX < x + w &&
               mouseY > y && mouseY < y + w;
    }
    this.highlightFirst = function (r, g, b) {
        let c = config.tile.firstTile;
        this.highlight(c.R, c.G, c.B, 0, lineWidth);
    }

    this.highlightLast = function (r, g, b) {
        let c = config.tile.firstTile;
        this.highlight(c.R, c.G, c.B, lineWidth, 0);
    }

    this.checkColision = function (mX, mY) {
        let x = this.i * w;
        let y = this.j * w;
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

    this.show = function () {
        let x = this.i * w;
        let y = this.j * w;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }
    };
}