export default function (scene, callback, message) {
    let windowWidth = scene.game.canvas.width;
    let windowHeight = scene.game.canvas.height;

    let endMessageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
    let messageText = scene.add.text(windowWidth * 0.5, windowHeight * 0.5, message.text, endMessageStyle);
    messageText.setOrigin(0.5);

    let button = document.getElementById("confirmButton");
    button.style.visibility = "visible";
    button.onclick = () => {
        button.style.visibility = "hidden";
        callback();
    };
    // let button = scene.add.text(windowWidth * 0.5, messageText.y + messageText.height + 7, message.button, endMessageStyle);
    // button.setOrigin(0.5);
    // button.setInteractive();
    // button.on("pointerdown", () => callback());
    // button.on("pointerover", () => button.setTint(0xff0000));
    // button.on("pointerout", () => button.setTint(0xffffff));

}