import {config} from "../config"

let collisionCount = 0;
let maxCollisions = config.game.collisionCountForGameOver


export default class CollisionCounter {
    collision()
    {
        collisionCount++;
    }

    isGameOver()
    {
        return collisionCount >= (maxCollisions);
    }

    reset()
    {
        collisionCount = 0;
    }
}