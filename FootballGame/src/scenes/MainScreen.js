import Phaser from 'phaser';
import {CST} from '../CST.js'

export default class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MAIN
        });
    }

    preload() {
        this.load.image("gameBG", "./assets/Just goal.png");
        this.load.image("ball", "./assets/BallAktiv 3.png");
        this.load.image("thumbUp", "./assets/ThumbUp.png");
    }

    create() {
        window.localStorage.setItem(CST.EYE.RIGHT.toString(), 10);
        window.localStorage.setItem(CST.EYE.LEFT.toString(), 10);
        this.loadAndOpenSavedLevel();
    }

    loadAndOpenSavedLevel()
    {
        window.localStorage.setItem("SavedLevel", 1);
        let lastPlayedLevel = window.localStorage.getItem("SavedLevel");
        let sceneToOpen;
        switch (lastPlayedLevel) {
            case "1":
                sceneToOpen = CST.SCENES.LEVEL_ONE;
                break;
            case "2":
                sceneToOpen = CST.SCENES.LEVEL_TWO;
                break;
            case "3":
                sceneToOpen = CST.SCENES.LEVEL_THREE;
                break;
            case "4":
                sceneToOpen = CST.SCENES.LEVEL_FOUR;
                break;
            case "5":
                sceneToOpen = CST.SCENES.LEVEL_FIVE;
                break;
        }
        this.scene.start(sceneToOpen);
    }
}
