var startTime;

export default class APIcall {
    create() {
            startTime = this.getCurrentDateTime();
    }

    uploadData(score, eye, level) {
        let currentLog = {
            score: score,
            startTimeStr: startTime,
            endTimeStr: this.getCurrentDateTime(),
            exerciseName: "Football",
            attribValue: "level " + level,
            attribName: eye.toLowerCase(),        // (left, right or both) depending on current eye (blank if no eye-switching)
        }
        console.log(currentLog);

        // TODO: check work request on TYE website
        $.ajax({
            type: "POST",
            url: `/Exercise/PostScore`,
            data: {score: currentLog},
            success: function (data) {
                if (data.success) {
                } else {
                }
            }
        })
    }

    // Expected exerciseName:
    // Football             (football game)
    // JumpingColumn        (arrows game)
    // SmoothPursuit        (idk, lol)

    getCurrentDateTime() {
        let date = new Date().toLocaleString("en-GB");
        // from js: 07/10/2021, 19:05:51
        // to   cs: 07-10-2021 19:05:51
        date = date.replace("/", "-");
        date = date.replace("/", "-");
        date = date.replace(",", "");
        return date;
    }
}