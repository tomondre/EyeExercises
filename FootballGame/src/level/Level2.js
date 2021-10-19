import SymbolLevel from "./SymbolLevel";
import {CST} from "../CST";

export default class Level2 extends SymbolLevel
{
    constructor() {
        super(CST.SCENES.LEVEL_TWO);
    }

    init()
    {
        window.localStorage.setItem("SavedLevel", "2");
        this.createObjects();
        this.create();
        super.setSymbolType(2);
    }

    levelUp()
    {
        this.reset();
        this.scene.start(CST.SCENES.LEVEL_THREE);
    }
}