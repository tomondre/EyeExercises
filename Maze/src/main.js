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

//TODO not listen to the collision on first and last cell


import Cell from "./Cell";
import p5 from "p5";
import {config} from "./config";
import Grid from "./Grid";

//Wrapper for p5.js
const s = (sketch) => {
    let canvas;
    let canvasWidth = config.canvas.width;
    let lineWidth = 5;

    let grid;

    sketch.setup = function () {
        canvas = sketch.createCanvas(canvasWidth, canvasWidth);
        sketch.strokeWeight(lineWidth);
        canvas.position(window.innerWidth / 2 - (canvas.width / 2), window.innerHeight / 2 - (canvas.height / 2))
        createObjects()

        function createObjects() {
            grid = new Grid(sketch);
        }
        grid.setup()
    }


    sketch.draw = function () {
        grid.draw();
    }

}
let myp5 = new p5(s);