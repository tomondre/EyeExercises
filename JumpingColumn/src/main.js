import * as Phaser from 'phaser';
import GameScene from "./scenes/GameScene";
import LoadScene from "./scenes/LoadScene";

const config = {
    width: window.innerWidth - 21,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: [LoadScene, GameScene]
}

const game = new Phaser.Game(config);