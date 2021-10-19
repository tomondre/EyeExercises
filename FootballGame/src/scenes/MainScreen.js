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

    create(data) {
        window.localStorage.setItem(CST.EYE.RIGHT.toString(), 10);
        window.localStorage.setItem(CST.EYE.LEFT.toString(), 10);
        if (data.eye === undefined)
        {
            console.log("First eye");
            this.loadAndOpenSavedLevel()
        }
        else
        {
            console.log("change eye");
            this.changeEye();
        }
    }

    loadAndOpenSavedLevel()
    {
        //Logic for opening the right level for eye and difficulty. Should call API calls to check what level and difficulty is saved
        //TODO to be implemented when the API will work
        let sceneToOpen;
        let lastPlayedLevel = "1";
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
        console.log("starting scene " + sceneToOpen);
        this.scene.start(sceneToOpen, {eye: CST.EYE.RIGHT, difficulty: 0, continue: false});
    }

    changeEye()
    {
        //Logic for opening the right level for eye and difficulty. Should call API calls to check what level and difficulty is saved
        //TODO to be implemented when the API will work

        let lastPlayedLevel = "1";
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

        this.scene.start(sceneToOpen, {eye: CST.EYE.LEFT, difficulty: 0, continue: false});
    }
}
