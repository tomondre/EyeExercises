//TODO uncomment ajax call andcheck if works
//TODO make arrows instead of buttons?
//TODO rename buttons
//TODO make close button works
//TODO calibrate color

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const imageUrl = "../assets/ThumbUp.png";

let leftButton = document.getElementById("goLeftButton");
let rightButton = document.getElementById("goRightButton");

let goLeft = false;
let goRight = false;

let leftPictureOffset = 0.001;
let rightPictureOffset = 0.001;

let lastOffset = rightPictureOffset;

let leftImage;
let rightImage;

let offsetInc = 0.0005;

let seconds;
let score = 0;

let startTime;

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
    createListeners()
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
        leftButton.onpointerdown = () => goLeft = true;
        leftButton.onpointerup = () => goLeft = false;
        leftButton.onpointerout = () => goLeft = false;

        rightButton.onpointerdown = () => goRight = true;
        rightButton.onpointerup = () => goRight = false;
        rightButton.onpointerout = () => goRight = false;

        document.addEventListener("keydown", (event) => {
            if (event.code === 'ArrowLeft') {
                goLeft = true;
            }
            if (event.code === 'ArrowRight') {
                goRight = true;
            }
        });
        document.addEventListener("keyup", (event) => {
            if (event.code === 'ArrowLeft') {
                goLeft = false;
            }
            if (event.code === 'ArrowRight') {
                goRight = false;
            }
        })
    }

    function createTimer() {
        seconds = fetchSavedEyeTime();
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
            let time = window.localStorage.getItem("905/Time");
            return time == null ? 10 : time;
        }

        function timeOverHandler() {
            saveDataToAPI()
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
            console.log(currentLog);

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
    drawTimer();
    drawScore();
    renderPictures();

    function clearCanvas() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function renderPictures() {
        renderPicture(leftImage, leftPictureOffset);
        renderPicture(rightImage, rightPictureOffset);
    }

    function drawScore() {
        drawText("Score: " + score, context.canvas.width * 0.05, context.canvas.height * 0.15)
    }

    function drawTimer() {
        drawText("Time: " + seconds, context.canvas.width * 0.05, context.canvas.height * 0.1);
    }

    function drawText(text, x, y) {
        context.globalAlpha = 1;
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(text, x, y);
        context.globalAlpha = 0.5;

    }

    function renderPicture(image, offset) {
        let scale = 0.3;
        let middleX = ((image.width * scale) / 2);
        let middleY = ((image.height * scale) / 2);
        let offsetX = context.canvas.width * offset;
        image.style.background = "#FF0010";
        context.drawImage(image, context.canvas.width * 0.5 - middleX + offsetX, context.canvas.height * 0.5 - middleY, image.width * scale, image.height * scale);
    }
}

function checkButtons() {
    if (goLeft) {
        decreaseOfssets();
    }
    if (goRight) {
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
