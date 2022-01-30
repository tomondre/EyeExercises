//TODO uncomment ajax call andcheck if works
//TODO make close button works

window.addEventListener("orientationchange", () => {
    location.reload();
});
if (window.innerWidth < window.innerHeight) {
    var canv = document.createElement('canvas');
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    canv.id = 'someId';
    document.body.append(canv);
    let context = canv.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canv.width, canv.height);
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.fillText("Please, rotate your screen", window.innerWidth / 2, window.innerHeight / 2);
} else {
    const canvas = document.createElement('canvas');
    canvas.id = 'halabala';
    document.body.append(canvas);
    canvas.style.background = "black";
    const context = canvas.getContext("2d");
    let easierButton = document.getElementById("goLeftButton");
    let harderButton = document.getElementById("goRightButton");

    let easier = false;
    let harder = false;

    let leftPictureOffset = -0.001;
    let rightPictureOffset = 0.001;

    let lastOffset = rightPictureOffset;

    let leftImage;
    let rightImage;

    let offsetInc = 0.0005;

    let seconds;
    let score = 0;

    let startTime;

    let displayEndOfRoundMessage;
    let shouldTimerBeDisplayed = true;

    window.onload = constructor;

    function constructor() {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        setUp();
        gameLoop();
    }

    function setUp() {
        setUpCanvasForAnalgyphs();
        setUpPictures();
        createListeners();
        createTimer();

        function setUpCanvasForAnalgyphs() {
            context.globalAlpha = 0.5;
            context.globalCompositeOperation = "lighter";
        }

        function setUpPictures() {
            rightImage = setUpPicture(rightPictureOffset, "../assets/elephant/BlueElephant.png");
            leftImage = setUpPicture(leftPictureOffset, "../assets/elephant/RedElephant.png");
        }

        function setUpPicture(offset, path) {
            let image = new Image();
            image.src = path;
            return image;
        }

        function createListeners() {
            easierButton.onpointerdown = () => easier = true;
            easierButton.onpointerup = () => easier = false;
            easierButton.onpointerout = () => easier = false;

            harderButton.onpointerdown = () => harder = true;
            harderButton.onpointerup = () => harder = false;
            harderButton.onpointerout = () => harder = false;

            document.addEventListener("keydown", keyDownListener);
            document.addEventListener("keyup", keyUpListener)
        }

        function keyUpListener(event) {
            if (event.code === 'ArrowLeft') {
                easier = false;
            }
            if (event.code === 'ArrowRight') {
                harder = false;
            }
        }

        function keyDownListener(event) {
            if (event.code === 'ArrowLeft') {
                easier = true;
            }
            if (event.code === 'ArrowRight') {
                harder = true;
            }
        }

        function createTimer() {
            seconds = fetchSavedEyeTime();
            if (seconds === -1) {
                shouldTimerBeDisplayed = false;
                return;
            }
            startTime = getCurrentDateTime();
            let interval = setInterval(sec, 1000);

            function sec() {
                seconds--;
                if (seconds === 0) {
                    clearInterval(interval);
                    timeOverHandler();
                }
            }

            function fetchSavedEyeTime() {
                let time = window.localStorage.getItem("908/Time");
                return time == null ? 150 : parseInt(time);
            }

            function timeOverHandler() {
                removeListeners();
                saveDataToAPI()

                easier = false;
                harder = false;

                let exitButton = document.getElementById("middleButton");
                exitButton.style.visibility = 'visible';
                exitButton.style.top = (window.innerHeight * 0.5 + 50) + "px";
                exitButton.addEventListener("keydown", () => {
                    window.close();
                })

                displayEndOfRoundMessage = true;

                function removeListeners() {
                    removeElementAllListeners("goLeftButton");
                    removeElementAllListeners("goRightButton");

                    function removeElementAllListeners(elementID) {
                        let old_element = document.getElementById(elementID);
                        let new_element = old_element.cloneNode(true);
                        old_element.parentNode.replaceChild(new_element, old_element);
                    }

                    document.removeEventListener("keydown", keyDownListener);
                    document.removeEventListener("keyup", keyUpListener)
                }
            }

            //TODO check if works
            function saveDataToAPI() {
                var currentLog = {
                    score: score,
                    startTimeStr: startTime,
                    endTimeStr: getCurrentDateTime(),
                    exerciseName: "3DElephant",
                    attribName: "both" // (left, right or both) depending on current eye (blank if no eye-switching)

                };
                // window.$.ajax({
                //     type: "POST",
                //     url: "/Exercise/PostScore",
                //     data: {
                //         score: currentLog
                //     },
                //     success: function success(data) {
                //         if (data.success) {
                //         } else {
                //         }
                //     }
                // });
            }

            function getCurrentDateTime() {
                var date = new Date().toLocaleString("en-GB"); // from js: 07/10/2021, 19:05:51
                // to   cs: 07-10-2021 19:05:51

                date = date.replace("/", "-");
                date = date.replace("/", "-");
                date = date.replace(",", "");
                return date;
            }
        }
    }

    function gameLoop() {
        checkButtons();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function draw() {
        clearCanvas();
        drawScore();
        drawEndOfTheRoundMessage();
        renderPictures();
        if (shouldTimerBeDisplayed) {
            drawTimer();
        }

        function drawEndOfTheRoundMessage() {
            if (displayEndOfRoundMessage) {
                context.textAlign = "center";
                drawText("Great job, you have finished daily exercise!", context.canvas.width * 0.5, context.canvas.height * 0.5);
            }
        }

        function clearCanvas() {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }

        function renderPictures() {
            renderPicture(leftImage, leftPictureOffset);
            renderPicture(rightImage, rightPictureOffset);
        }

        function drawScore() {
            context.textAlign = "left";
            context.textBaseline = "top";
            drawText("Score: " + score, context.canvas.width * 0.1, context.canvas.height * 0.125)
        }

        function drawTimer() {
            context.textBaseline = "top";
            context.textAlign = "left";
            drawText("Time: " + seconds, context.canvas.width * 0.1, context.canvas.height * 0.07);
        }

        function drawText(text, x, y) {
            context.globalAlpha = 1;
            context.fillStyle = "white";
            if (canvas.width < 1000) {
                context.font = "25px Arial";
            } else {
                context.font = "40px Arial";
            }
            context.fillText(text, x, y);
            context.globalAlpha = 0.5;
        }

        function renderPicture(image, offset, composite) {
            let scale = 0.3;
            let middleX = ((image.width * scale) / 2);
            let middleY = ((image.height * scale) / 2);
            let offsetX = context.canvas.width * offset;
            context.globalAlpha = 0.5;
            context.drawImage(image, context.canvas.width * 0.5 - middleX + offsetX, context.canvas.height * 0.5 - middleY, image.width * scale, image.height * scale);
        }
    }

    function checkButtons() {
        if (easier) {
            decreaseOfssets();
        }
        if (harder) {
            increaseOffsets();
            if (rightPictureOffset > lastOffset) {
                score++;
                lastOffset = rightPictureOffset;
            }
        }

        function decreaseOfssets() {
            if (rightPictureOffset > 0) {
                rightPictureOffset -= offsetInc;
                leftPictureOffset += offsetInc;
            }
        }

        function increaseOffsets() {
            rightPictureOffset += offsetInc;
            leftPictureOffset -= offsetInc;
        }
    }
}