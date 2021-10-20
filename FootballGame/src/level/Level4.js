import SymbolLevel from "./SymbolLevel";
import {CST} from "../CST";

export default class Level4 extends SymbolLevel
{
    constructor() {
        super(CST.SCENES.LEVEL_FOUR);
    }

    init()
    {
        this.createObjects();
        this.create();
        super.setSymbolType(4);
    }


    levelUp()
    {
        this.reset();
        this.scene.start(CST.SCENES.LEVEL_FIVE);
    }
}