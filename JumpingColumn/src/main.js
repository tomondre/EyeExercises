import * as Phaser from 'phaser';
import GameScene from "./scenes/GameScene";
import LoadScene from "./scenes/LoadScene";

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: [LoadScene, GameScene]
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