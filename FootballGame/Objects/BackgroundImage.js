export default function (scene)
{
    let windowWidth = scene.game.canvas.width;
    let windowHeight = scene.game.canvas.height;

    let image = scene.add.image(windowWidth / 2, windowHeight / 2, 'gameBG');
    let scaleX = windowWidth / image.width;
    let scaleY = windowHeight / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
}