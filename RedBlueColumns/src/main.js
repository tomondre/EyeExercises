 import * as Phaser from 'phaser';
import GameScene from "./scenes/GameScene";
import LoadScene from "./scenes/LoadScene";
import WindowSize from "./objects/WindowSize";

let gameScene = new GameScene()
 let width
 let height


const config = {
    width: WindowSize.width(),
    height: WindowSize.height(),
    type: Phaser.AUTO,
    scene: [LoadScene,gameScene],
    backgroundColor: '#fff',
}

window.addEventListener("resize", () => {
    gameScene.restartScene()
});

const game = new Phaser.Game(config);



