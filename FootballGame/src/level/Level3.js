import SymbolLevel from "./SymbolLevel";
import {CST} from "../CST";

export default class Level3 extends SymbolLevel
{
    constructor() {
        super(CST.SCENES.LEVEL_THREE);
    }

    init()
    {
        window.localStorage.setItem("SavedLevel", "3");
        this.createObjects();
        this.create();
        super.setSymbolType(3);
    }

    levelUp()
    {
        this.reset();
        this.scene.start(CST.SCENES.LEVEL_FOUR);
    }
}