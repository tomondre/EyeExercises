import Phaser from 'phaser';

import MainScreen from './scenes/MainScreen.js';
import Level2 from "./scenes/level/Level2";
import Level1 from "./scenes/level/Level1";
import Level3 from "./scenes/level/Level3";
import Level4 from "./scenes/level/Level4";
import Level5 from "./scenes/level/Level5";

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: [MainScreen, Level5, Level4, Level3, Level2, Level1],
    scale: {mode: Phaser.Scale.FIT}
}

const game = new Phaser.Game(config);


