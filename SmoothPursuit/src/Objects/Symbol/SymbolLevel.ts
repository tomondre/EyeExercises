export interface SymbolLevel {
    draw(x : number, y : number) : void;
    continue() : void;
    pause() : void;
    create() : void;
    redDotEntry(): void;
}