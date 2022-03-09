 import * as Phaser from 'phaser';
import GameScene from "./objects/GameScene";
import LoadScene from "./objects/LoadScene";



const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: [LoadScene,GameScene],
    backgroundColor: '#fff',
}

// window.addEventListener("resize", () => {
//     location.reload();
// });

const game = new Phaser.Game(config);



