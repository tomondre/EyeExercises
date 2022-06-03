
import p5 from "p5";
import Game from "./objects/game";

//Wrapper for p5.js
const s = (sketch) => {
    let game;

    sketch.setup = function () {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        game = new Game();
        game.create()
    }

    sketch.draw = function () {
    }
}
new p5(s);

window.addEventListener("orientationchange", () => {
    location.reload();
});

window.addEventListener('resize', function(event) {
    location.reload();
}, true);