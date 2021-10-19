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

const game = new Phaser.Game(config);


