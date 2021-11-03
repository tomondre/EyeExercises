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

import p5 from "p5";
import Game from "./Game";

//Wrapper for p5.js
const s = (sketch) => {
    let game;

    sketch.setup = function () {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        sketch.frameRate(config.game.frameRate);
        game = new Game(sketch);
    }

    sketch.draw = function () {
        game.draw();
    }
}
new p5(s);