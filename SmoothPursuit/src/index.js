import p5 from "p5";
import Game from "./Game";

//Wrapper for p5.js
const s = (sketch) => {

    let game;

    sketch.setup = function () {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        sketch.frameRate(config.game.frameRate);
        game = new Game(sketch);
        game.setUp();
    }

    sketch.draw = function () {
        game.draw();
    }
}
new p5(s);