import {CST} from "../cst/CST";

export default class LoadScene extends Phaser.Scene {

    constructor() {
        super({key: CST.scene.LOAD});
    }

    preload() {
     this.load.image("arrow", "./assets/Arrow.png");
    }

    init() {

    }

    create() {
        this.scene.start(CST.scene.GAME);
    }
}