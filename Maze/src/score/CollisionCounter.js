
let collisionCount = 0;
let maxCollisions = config.game.collisionCountForGameOver


export default class CollisionCounter {
    collision()
    {
        collisionCount++;
    }

    isGameOver()
    {
        return collisionCount >= (maxCollisions - 1);
    }

    reset()
    {
        collisionCount = 0;
    }
}