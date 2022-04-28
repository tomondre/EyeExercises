var eyeTestScreen = {

    local: {
        dtStart: null,
        ets: this,
        updateInterval: null
    },

    EyeTestProgramID: 0,
    EyeTestUpdateToken: "",
    IsRunning: false,
    ScoreRequired: 0,
    CurrentHighScore: 0,

    messages: {

    },

    // logStart: function () {
    //     var instance = this;
    //     wsTye.EyeTestStart(this.EyeTestProgramID,
    //         function (data) {
    //             instance.EyeTestUpdateToken = data;
    //             clearInterval(instance.local.updateInterval);
    //             instance.local.updateInterval = setInterval(function () {
    //                 instance.logEnd();
    //             }, 10000); // 15 second interval
    //             // todo: change back to 15
    //         },
    //         function () { /* todo: error - attempt logging of error */ }
    //     );
    // },
    // logEnd: function () {
    //     var iTry = parseInt($('#hidScore').val(), 10);
    //     wsTye.EyeTestEnd(this.EyeTestProgramID,
    //         this.EyeTestUpdateToken,
    //         $('#hidAttribName').val(),
    //         $('#hidAttribValue').val(),
    //         iTry
    //     );
    // },
    // start: function () {
    //     if (this.IsRunning) {
    //         this.stop();
    //     }
    //     this.IsRunning = true;
    //     this.logStart();
    // },
    // stop: function () {
    //     if (!this.IsRunning)
    //         return;
    //     clearInterval(this.local.updateInterval);
    //     this.logEnd();
    //     this.IsRunning = false;
    // },
    getScore: function () {
        return parseInt($('#hidScore').val(), 10);
    },
    setScore: function (score) {
        $('#hidScore').val(score);
    },
    getScoreRequired: function () {
        return parseInt($('#hidScoreRequired').val(), 10);
    },
    setScoreRequired: function (score) {
        $('#hidScoreRequired').val(score);
    },
    setLevel: function (level) {
        $('#hidAttribName').val("level");
        $('#hidAttribValue').val(level);
    },
    setAttrib: function (attribName, attribValue) {
        $('#hidAttribName').val(attribName);
        $('#hidAttribValue').val(attribValue);
    }
};