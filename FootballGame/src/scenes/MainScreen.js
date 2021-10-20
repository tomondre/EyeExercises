import Phaser from 'phaser';
import {CST} from '../CST.js'
import FetchDataManager from "../Objects/FetchDataManager";

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
        this.loadAndOpenSavedLevel();
    }

    loadAndOpenSavedLevel()
    {
        let lastPlayedLevel = FetchDataManager.getEyeLevelIndex(CST.EYE.RIGHT);
        let sceneToOpen;
        switch (lastPlayedLevel) {
            default :
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
