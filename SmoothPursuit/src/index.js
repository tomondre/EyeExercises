import p5 from "p5";
import Game from "./Game";
import {config} from "./Objects/config";

//Wrapper for p5.js
const s = (sketch) => {
    let game;

    sketch.setup = function () {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        sketch.frameRate(config.game.frameRate);
        sketch.angleMode(sketch.DEGREES)
        game = new Game(sketch);
    }

    sketch.draw = function () {
        game.draw();
    }
}
new p5(s);