
var images,
    maxTime = 15000,
    level = 0,
    imgDir,
    interval = null,
    counter = 0,
    score = 0,
    completed = false;

function updateScore() {
    $('#scoreField').html("Score: " + score);

    // if test already completed, and user continues to train resulting in sub-pass score....don't update it
    if (completed && score < eyeTestScreen.getScoreRequired())
        return;

    eyeTestScreen.setScore(score);
}

function DisplayImage(str) {
    // method used in 3DLevel1, 3DLevel2, 3DLevel6, 3DLevel7
    window.clearInterval(interval);

//	if (level <= 40)
//		return;

    interval = window.setInterval(function () { LevelBack(); }, maxTime);

    var img = document.getElementById("img3D");
    var rand = parseInt((Math.random() * 2));
    if (img.src.indexOf("-" + str) !== -1) {
        level++;
        img.src = imgDir + images[level][rand];
        score += 5;
    } else {
        level = Math.max(level - 1, 0);
        score = (score <= 2 ? 0 : score - 5);
        img.src = imgDir + images[level][rand];
    }
    /*
    if (level < 40 && numberOrTries <= 50) {
        numberOrTries++;
        var img = document.getElementById("img3D");
        var rand = parseInt((Math.random() * 2));
        if (img.src.indexOf("-" + str) != -1) {
            level++;
            img.src = imgDir + images[level][rand];
            score += 5;
            scoreField.innerHTML = "Score: " + score;
        } else {
            level = Math.max(level - 1, 0);
            score = (score <= 2 ? 0 : score - 5);
            img.src = imgDir + images[level][rand];
            scoreField.innerHTML = "Score: " + score;
        }
    } else {
        eyeTestScreen.stop();
        level = 0;
        score = 0;
        numberOrTries = 0;
    }
    */

    eyeTestScreen.setAttrib("level", level);
    updateScore(score);

    if ((eyeTestScreen.getScoreRequired() <= score || level >= 40) && !completed) {
        alert(tye.dicValue('eyeTest_3dtestCompleted'));
        completed = true;
        window.clearInterval(interval);
    }

}

function LevelBack() {
    if (counter == 1) {
        level -= 1;
        counter = 0;
    } else {
        counter = 1;
    }
    score -= 3;
    if (level <= 0) {
        level = 0;
    }

    var img = document.getElementById("img3D");
    var rand = parseInt((Math.random()*2));
    if (img.src.indexOf(images[level][rand]) != -1) {
        img.src = imgDir + images[level][rand];
    } else {
        img.src = imgDir + images[level][0];
    }

    if (score <= 0) {
        score = 0;
    }

    eyeTestScreen.setAttrib("level", level);
    updateScore(score);

    //var scoreField = document.getElementById("scoreField");
    //scoreField.innerHTML = "Score: " + score;
    //wrongAnswers += 1;
    window.clearInterval(interval);
    interval = window.setInterval(function () { LevelBack(); }, maxTime);
}
/*
function Stop() {
	var btn = document.getElementById("btn");
	if (btn.value == "Start") {
		btn.value = "Stop";
		$(btn).addClass('negativesmall').removeClass('positivesmall');
		eyeTestScreen.start();
		dtStart = new DateTime();
		StartMotion();
		updateHidSpeed();
	} else {
		// stop eyetest
		clearInterval(interval);

		$(btn).addClass('positivesmall').removeClass('negativesmall').val("Start");
		var dtEnd = new DateTime();
		var totalSeconds = parseInt(dtEnd.subtractDate(dtStart).totalSeconds(), 10);

		eyeTestScreen.stop();
		eyeTestScreen.IsRunning = false;

	}
}*/