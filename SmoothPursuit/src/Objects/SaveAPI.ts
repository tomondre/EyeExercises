import {start} from "repl";

export default class SaveAPI {
    private start: string

    constructor() {
        this.startTimer();
    }


    public startTimer(): void {
        this.start = this.getCurrentDateTime();
    }

    public uploadData(score, eye: string, level): void {
        let currentLog = {
            score: score,
            startTimeStr: this.start,
            endTimeStr: this.getCurrentDateTime(),
            exerciseName: "SmoothPursuit",
            attribValue: "level " + level,
            attribName: eye.toLowerCase(),        // (left, right or both) depending on current eye (blank if no eye-switching)
        }
        console.log(currentLog);

        try {
            // @ts-ignore
            window.$.ajax({
                type: "POST",
                url: `/Exercise/PostScore`,
                data: {score: currentLog},
                success: function (data) {
                    if (data.success) {
                    } else {
                    }
                }
            })
            this.startTimer();
        } catch (e) {

        }
    }

    // Expected exerciseName:
    // Football             (football game)
    // JumpingColumn        (arrows game)
    // SmoothPursuit        (idk, lol)

    private getCurrentDateTime(): string {
        let date = new Date().toLocaleString("en-GB");
        // from js: 07/10/2021, 19:05:51
        // to   cs: 07-10-2021 19:05:51
        date = date.replace("/", "-");
        date = date.replace("/", "-");
        date = date.replace(",", "");
        return date;
    }
}