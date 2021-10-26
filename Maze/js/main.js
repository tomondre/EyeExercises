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

let cols, rows;
let w = 50;
let grid = [];
let current;
let stack = [];

let canvas;
let lineWidth = 5;
function setup() {
    canvas = createCanvas(600, 600);
    strokeWeight(lineWidth);
    canvas.position(window.innerWidth / 2 - (canvas.width / 2), window.innerHeight / 2 - (canvas.height / 2))
    cols = floor(width / w);
    rows = floor(height / w);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    current = grid[0];
    generate();
}

function generate() {
    while (true) {
        current.visited = true;
        // STEP 1
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;

            // STEP 2
            stack.push(current);

            // STEP 3
            removeWalls(current, next);

            // STEP 4
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            return;
        }
    }
}

function draw() {
    background(51);
    grid[0].highlightFirst();
    for (let i = 1; i < grid.length - 1; i++) {
        grid[i].show();
    }
    grid[grid.length - 1].highlightLast()
    checkBoundaries();
}

var gameStarted = false;

function checkBoundaries() {
    if (gameStarted) {
        for (let i = 0; i < grid.length-1; i++) {
            if (grid[i].checkColision(mouseX, mouseY)) {
                console.log("colision");
            }
        }
        if (grid[grid.length - 1].isHoverOver(mouseX, mouseY))
        {
            console.log("game finished")
        }
    } else {
        if ((mouseX > 0 && mouseX < w) &&
            mouseY > 0 && mouseY < w) {
            gameStarted = true;
            document.body.style.cursor = "url('../img/CursorCar.png')12 25, auto";
        }
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function removeWalls(a, b) {
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