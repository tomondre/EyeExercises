import Phaser from 'phaser';

import MainScreen from './scenes/MainScreen.js';
import Level2 from "./level/Level2";
import Level1 from "./level/Level1";
import Level3 from "./level/Level3";
import Level4 from "./level/Level4";
import Level5 from "./level/Level5";

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: [MainScreen, Level5, Level4, Level3, Level2, Level1],
    scale: {mode: Phaser.Scale.FIT}
}

window.addEventListener("orientationchange", () => {
    location.reload();
});
if (window.innerWidth < window.innerHeight) {
    var canv = document.createElement('canvas');
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    canv.id = 'someId';
    document.body.append(canv);
    let context = canv.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canv.width, canv.height);
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.fillText("Please, rotate your screen", window.innerWidth / 2, window.innerHeight / 2);
    console.log(window.innerWidth + " " + window.innerHeight)
} else {
    new Phaser.Game(config);
}


