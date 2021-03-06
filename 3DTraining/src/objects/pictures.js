import {config} from "../Config/config";

let images
let levelName,
    puzzleIndex

export default class Pictures {

    setupPictures(name, index) {
        levelName = name
        puzzleIndex = Math.round(index)
        switch (levelName) {
            case "square":
                this.setupSquarePictures()
                break;
            case "flower":
                this.setupFlowerPictures()
                break;
            case "circle":
                this.setupCirclePictures()
                break;
            case "star":
                this.setupStarPictures()
                break;
            default:
                break;
        }
    }

    getImageDirector() {
        return "img/" + levelName + "/"
    }

    getImages(){
        return images
    }

    setupInputField(levelIndex) {
        document.getElementById("inputImg").src = "img/" + config.levels[levelIndex].levelName + "/exp.png"


        var uagent = navigator.userAgent.toLowerCase()
        if(uagent.search("android") > -1 || uagent.search("apple") > -1 && uagent.search("apple") != 42){
            document.getElementById(("inputImg")).width = config.levels[levelIndex].phone.expWidth
            document.getElementById(("inputImg")).height = config.levels[levelIndex].phone.expHeight

            document.getElementById("button1").coords = config.levels[levelIndex].phone.button1
            document.getElementById("button2").coords = config.levels[levelIndex].phone.button2
            document.getElementById("button3").coords = config.levels[levelIndex].phone.button3
            document.getElementById("button4").coords = config.levels[levelIndex].phone.button4
            document.getElementById("button5").coords = config.levels[levelIndex].phone.button5
            document.getElementById("button6").coords = config.levels[levelIndex].phone.button6
        }
        else {
            document.getElementById(("inputImg")).width = config.levels[levelIndex].computer.expWidth
            document.getElementById(("inputImg")).height = config.levels[levelIndex].computer.expHeight

            document.getElementById("button1").coords = config.levels[levelIndex].computer.button1
            document.getElementById("button2").coords = config.levels[levelIndex].computer.button2
            document.getElementById("button3").coords = config.levels[levelIndex].computer.button3
            document.getElementById("button4").coords = config.levels[levelIndex].computer.button4
            document.getElementById("button5").coords = config.levels[levelIndex].computer.button5
            document.getElementById("button6").coords = config.levels[levelIndex].computer.button6
        }
    }

    setupSquarePictures() {
        images = new Array();
        var arr = new Array();
        arr.push('0-4.gif');
        arr.push('0-4.gif');
        images[0] = arr;
        var arr = new Array();
        arr.push('1-2.gif');
        arr.push('1-2.gif');
        images[1] = arr;
        var arr = new Array();
        arr.push('10-2.gif');
        arr.push('10-2.gif');
        images[10] = arr;
        var arr = new Array();
        arr.push('11-3.gif');
        arr.push('11-5.gif');
        images[11] = arr;
        var arr = new Array();
        arr.push('12-4.gif');
        arr.push('12-4.gif');
        images[12] = arr;
        var arr = new Array();
        arr.push('13-2.gif');
        arr.push('13-2.gif');
        images[13] = arr;
        var arr = new Array();
        arr.push('14-3.gif');
        arr.push('14-3.gif');
        images[14] = arr;
        var arr = new Array();
        arr.push('15-2.gif');
        arr.push('15-2.gif');
        images[15] = arr;
        var arr = new Array();
        arr.push('16-4.gif');
        arr.push('16-4.gif');
        images[16] = arr;
        var arr = new Array();
        arr.push('17-1.gif');
        arr.push('17-1.gif');
        images[17] = arr;
        var arr = new Array();
        arr.push('18-3.gif');
        arr.push('18-3.gif');
        images[18] = arr;
        var arr = new Array();
        arr.push('19-2.gif');
        arr.push('19-2.gif');
        images[19] = arr;
        var arr = new Array();
        arr.push('2-3.gif');
        arr.push('2-3.gif');
        images[2] = arr;
        var arr = new Array();
        arr.push('20-4.gif');
        arr.push('20-4.gif');
        images[20] = arr;
        var arr = new Array();
        arr.push('21-1.gif');
        arr.push('21-1.gif');
        images[21] = arr;
        var arr = new Array();
        arr.push('22-3.gif');
        arr.push('22-3.gif');
        images[22] = arr;
        var arr = new Array();
        arr.push('23-2.gif');
        arr.push('23-2.gif');
        images[23] = arr;
        var arr = new Array();
        arr.push('24-4.gif');
        arr.push('24-4.gif');
        images[24] = arr;
        var arr = new Array();
        arr.push('25-1.gif');
        arr.push('25-1.gif');
        images[25] = arr;
        var arr = new Array();
        arr.push('26-2.gif');
        arr.push('26-2.gif');
        images[26] = arr;
        var arr = new Array();
        arr.push('27-3.gif');
        arr.push('27-3.gif');
        images[27] = arr;
        var arr = new Array();
        arr.push('28-4.gif');
        arr.push('28-4.gif');
        images[28] = arr;
        var arr = new Array();
        arr.push('29-2.gif');
        arr.push('29-2.gif');
        images[29] = arr;
        var arr = new Array();
        arr.push('3-1.gif');
        arr.push('3-1.gif');
        images[3] = arr;
        var arr = new Array();
        arr.push('30-3.gif');
        arr.push('30-3.gif');
        images[30] = arr;
        var arr = new Array();
        arr.push('31-2.gif');
        arr.push('31-2.gif');
        images[31] = arr;
        var arr = new Array();
        arr.push('32-3.gif');
        arr.push('32-3.gif');
        images[32] = arr;
        var arr = new Array();
        arr.push('33-4.gif');
        arr.push('33-4.gif');
        images[33] = arr;
        var arr = new Array();
        arr.push('34-1.gif');
        arr.push('34-1.gif');
        images[34] = arr;
        var arr = new Array();
        arr.push('35-3.gif');
        arr.push('35-3.gif');
        images[35] = arr;
        var arr = new Array();
        arr.push('36-2.gif');
        arr.push('36-2.gif');
        images[36] = arr;
        var arr = new Array();
        arr.push('37-1.gif');
        arr.push('37-1.gif');
        images[37] = arr;
        var arr = new Array();
        arr.push('38-1.gif');
        arr.push('38-5.gif');
        images[38] = arr;
        var arr = new Array();
        arr.push('39-2.gif');
        arr.push('39-6.gif');
        images[39] = arr;
        var arr = new Array();
        arr.push('4-4.gif');
        arr.push('4-4.gif');
        images[4] = arr;
        var arr = new Array();
        arr.push('40-4.gif');
        arr.push('40-4.gif');
        images[40] = arr;
        var arr = new Array();
        arr.push('5-1.gif');
        arr.push('5-1.gif');
        images[5] = arr;
        var arr = new Array();
        arr.push('6-3.gif');
        arr.push('6-3.gif');
        images[6] = arr;
        var arr = new Array();
        arr.push('7-2.gif');
        arr.push('7-2.gif');
        images[7] = arr;
        var arr = new Array();
        arr.push('8-4.gif');
        arr.push('8-4.gif');
        images[8] = arr;
        var arr = new Array();
        arr.push('9-1.gif');
        arr.push('9-1.gif');
        images[9] = arr;
        var arr = new Array();
        arr.push('exp.gif');
        var img = document.getElementById("img3D");
        var rand = parseInt((Math.random() * 2));
        img.src = this.getImageDirector() + images[puzzleIndex][rand];
    }

    setupFlowerPictures() {
        images = new Array();
        var arr = new Array();
        arr.push('0-4.gif');
        arr.push('0-6.gif');
        images[0] = arr;
        var arr = new Array();
        arr.push('1-2.gif');
        arr.push('1-3.gif');
        images[1] = arr;
        var arr = new Array();
        arr.push('10-2.gif');
        arr.push('10-4.gif');
        images[10] = arr;
        var arr = new Array();
        arr.push('11-3.gif');
        arr.push('11-3.gif');
        images[11] = arr;
        var arr = new Array();
        arr.push('12-2.gif');
        arr.push('12-4.gif');
        images[12] = arr;
        var arr = new Array();
        arr.push('13-1.gif');
        arr.push('13-6.gif');
        images[13] = arr;
        var arr = new Array();
        arr.push('14-4.gif');
        arr.push('14-5.gif');
        images[14] = arr;
        var arr = new Array();
        arr.push('15-1.gif');
        arr.push('15-3.gif');
        images[15] = arr;
        var arr = new Array();
        arr.push('16-4.gif');
        arr.push('16-6.gif');
        images[16] = arr;
        var arr = new Array();
        arr.push('17-2.gif');
        arr.push('17-3.gif');
        images[17] = arr;
        var arr = new Array();
        arr.push('18-5.gif');
        arr.push('18-6.gif');
        images[18] = arr;
        var arr = new Array();
        arr.push('19-1.gif');
        arr.push('19-3.gif');
        images[19] = arr;
        var arr = new Array();
        arr.push('2-5.gif');
        arr.push('2-6.gif');
        images[2] = arr;
        var arr = new Array();
        arr.push('20-4.gif');
        arr.push('20-6.gif');
        images[20] = arr;
        var arr = new Array();
        arr.push('21-2.gif');
        arr.push('21-6.gif');
        images[21] = arr;
        var arr = new Array();
        arr.push('22-3.gif');
        arr.push('22-5.gif');
        images[22] = arr;
        var arr = new Array();
        arr.push('23-1.gif');
        arr.push('23-2.gif');
        images[23] = arr;
        var arr = new Array();
        arr.push('24-3.gif');
        arr.push('24-4.gif');
        images[24] = arr;
        var arr = new Array();
        arr.push('25-2.gif');
        arr.push('25-6.gif');
        images[25] = arr;
        var arr = new Array();
        arr.push('26-1.gif');
        arr.push('26-4.gif');
        images[26] = arr;
        var arr = new Array();
        arr.push('27-3.gif');
        arr.push('27-5.gif');
        images[27] = arr;
        var arr = new Array();
        arr.push('28-2.gif');
        arr.push('28-4.gif');
        images[28] = arr;
        var arr = new Array();
        arr.push('29-1.gif');
        arr.push('29-6.gif');
        images[29] = arr;
        var arr = new Array();
        arr.push('3-1.gif');
        arr.push('3-3.gif');
        images[3] = arr;
        var arr = new Array();
        arr.push('30-4.gif');
        arr.push('30-5.gif');
        images[30] = arr;
        var arr = new Array();
        arr.push('31-1.gif');
        arr.push('31-3.gif');
        images[31] = arr;
        var arr = new Array();
        arr.push('32-3.gif');
        arr.push('32-5.gif');
        images[32] = arr;
        var arr = new Array();
        arr.push('33-1.gif');
        arr.push('33-4.gif');
        images[33] = arr;
        var arr = new Array();
        arr.push('34-3.gif');
        arr.push('34-6.gif');
        images[34] = arr;
        var arr = new Array();
        arr.push('35-4.gif');
        arr.push('35-5.gif');
        images[35] = arr;
        var arr = new Array();
        arr.push('36-1.gif');
        arr.push('36-2.gif');
        images[36] = arr;
        var arr = new Array();
        arr.push('37-2.gif');
        arr.push('37-3.gif');
        images[37] = arr;
        var arr = new Array();
        arr.push('4-4.gif');
        arr.push('4-6.gif');
        images[4] = arr;
        var arr = new Array();
        arr.push('5-2.gif');
        arr.push('5-6.gif');
        images[5] = arr;
        var arr = new Array();
        arr.push('6-3.gif');
        arr.push('6-5.gif');
        images[6] = arr;
        var arr = new Array();
        arr.push('7-1.gif');
        arr.push('7-2.gif');
        images[7] = arr;
        var arr = new Array();
        arr.push('8-3.gif');
        arr.push('8-4.gif');
        images[8] = arr;
        var arr = new Array();
        arr.push('9-2.gif');
        arr.push('9-6.gif');
        images[9] = arr;
        var arr = new Array();
        arr.push('exp.gif');
        var img = document.getElementById("img3D");
        var rand = parseInt((Math.random() * 2));
        img.src = this.getImageDirector() + images[puzzleIndex][rand];
    }

    setupCirclePictures() {
        images = new Array();
        var arr = new Array();
        arr.push('0-4.gif');
        arr.push('0-6.gif');
        images[0] = arr;
        var arr = new Array();
        arr.push('1-2.gif');
        arr.push('1-3.gif');
        images[1] = arr;
        var arr = new Array();
        arr.push('10-1.gif');
        arr.push('10-4.gif');
        images[10] = arr;
        var arr = new Array();
        arr.push('11-5.gif');
        arr.push('11-5.gif');
        images[11] = arr;
        var arr = new Array();
        arr.push('12-2.gif');
        arr.push('12-4.gif');
        images[12] = arr;
        var arr = new Array();
        arr.push('13-6.gif');
        arr.push('13-6.gif');
        images[13] = arr;
        var arr = new Array();
        arr.push('14-4.gif');
        arr.push('14-5.gif');
        images[14] = arr;
        var arr = new Array();
        arr.push('15-1.gif');
        arr.push('15-3.gif');
        images[15] = arr;
        var arr = new Array();
        arr.push('16-4.gif');
        arr.push('16-6.gif');
        images[16] = arr;
        var arr = new Array();
        arr.push('17-3.gif');
        arr.push('17-3.gif');
        images[17] = arr;
        var arr = new Array();
        arr.push('18-5.gif');
        arr.push('18-6.gif');
        images[18] = arr;
        var arr = new Array();
        arr.push('19-1.gif');
        arr.push('19-3.gif');
        images[19] = arr;
        var arr = new Array();
        arr.push('2-5.gif');
        arr.push('2-6.gif');
        images[2] = arr;
        var arr = new Array();
        arr.push('20-4.gif');
        arr.push('20-6.gif');
        images[20] = arr;
        var arr = new Array();
        arr.push('21-2.gif');
        arr.push('21-6.gif');
        images[21] = arr;
        var arr = new Array();
        arr.push('22-3.gif');
        arr.push('22-3.gif');
        images[22] = arr;
        var arr = new Array();
        arr.push('23-1.gif');
        arr.push('23-2.gif');
        images[23] = arr;
        var arr = new Array();
        arr.push('24-3.gif');
        arr.push('24-4.gif');
        images[24] = arr;
        var arr = new Array();
        arr.push('25-2.gif');
        arr.push('25-6.gif');
        images[25] = arr;
        var arr = new Array();
        arr.push('26-1.gif');
        arr.push('26-1.gif');
        images[26] = arr;
        var arr = new Array();
        arr.push('27-3.gif');
        arr.push('27-5.gif');
        images[27] = arr;
        var arr = new Array();
        arr.push('28-2.gif');
        arr.push('28-4.gif');
        images[28] = arr;
        var arr = new Array();
        arr.push('29-1.gif');
        arr.push('29-6.gif');
        images[29] = arr;
        var arr = new Array();
        arr.push('3-1.gif');
        arr.push('3-3.gif');
        images[3] = arr;
        var arr = new Array();
        arr.push('30-4.gif');
        arr.push('30-5.gif');
        images[30] = arr;
        var arr = new Array();
        arr.push('31-1.gif');
        arr.push('31-3.gif');
        images[31] = arr;
        var arr = new Array();
        arr.push('32-3.gif');
        arr.push('32-5.gif');
        images[32] = arr;
        var arr = new Array();
        arr.push('33-1.gif');
        arr.push('33-4.gif');
        images[33] = arr;
        var arr = new Array();
        arr.push('34-3.gif');
        arr.push('34-6.gif');
        images[34] = arr;
        var arr = new Array();
        arr.push('35-4.gif');
        arr.push('35-4.gif');
        images[35] = arr;
        var arr = new Array();
        arr.push('36-1.gif');
        arr.push('36-2.gif');
        images[36] = arr;
        var arr = new Array();
        arr.push('37-2.gif');
        arr.push('37-2.gif');
        images[37] = arr;
        var arr = new Array();
        arr.push('38-1.gif');
        arr.push('38-5.gif');
        images[38] = arr;
        var arr = new Array();
        arr.push('4-4.gif');
        arr.push('4-6.gif');
        images[4] = arr;
        var arr = new Array();
        arr.push('5-2.gif');
        arr.push('5-6.gif');
        images[5] = arr;
        var arr = new Array();
        arr.push('6-3.gif');
        arr.push('6-5.gif');
        images[6] = arr;
        var arr = new Array();
        arr.push('7-1.gif');
        arr.push('7-2.gif');
        images[7] = arr;
        var arr = new Array();
        arr.push('8-3.gif');
        arr.push('8-4.gif');
        images[8] = arr;
        var arr = new Array();
        arr.push('9-2.gif');
        arr.push('9-2.gif');
        images[9] = arr;
        var arr = new Array();
        arr.push('exp.gif');
        var img = document.getElementById("img3D");
        var rand = parseInt((Math.random() * 2));
        img.src = this.getImageDirector() + images[puzzleIndex][rand];
    }

    setupStarPictures() {
        images = new Array();
        var arr = new Array();
        arr.push('0-4.gif');
        arr.push('0-6.gif');
        images[0] = arr;
        var arr = new Array();
        arr.push('1-2.gif');
        arr.push('1-3.gif');
        images[1] = arr;
        var arr = new Array();
        arr.push('10-1.gif');
        arr.push('10-4.gif');
        images[10] = arr;
        var arr = new Array();
        arr.push('11-3.gif');
        arr.push('11-5.gif');
        images[11] = arr;
        var arr = new Array();
        arr.push('12-2.gif');
        arr.push('12-4.gif');
        images[12] = arr;
        var arr = new Array();
        arr.push('13-1.gif');
        arr.push('13-6.gif');
        images[13] = arr;
        var arr = new Array();
        arr.push('14-4.gif');
        arr.push('14-5.gif');
        images[14] = arr;
        var arr = new Array();
        arr.push('15-1.gif');
        arr.push('15-3.gif');
        images[15] = arr;
        var arr = new Array();
        arr.push('16-4.gif');
        arr.push('16-6.gif');
        images[16] = arr;
        var arr = new Array();
        arr.push('17-2.gif');
        arr.push('17-3.gif');
        images[17] = arr;
        var arr = new Array();
        arr.push('18-5.gif');
        arr.push('18-6.gif');
        images[18] = arr;
        var arr = new Array();
        arr.push('19-1.gif');
        arr.push('19-3.gif');
        images[19] = arr;
        var arr = new Array();
        arr.push('2-5.gif');
        arr.push('2-6.gif');
        images[2] = arr;
        var arr = new Array();
        arr.push('20-4.gif');
        arr.push('20-6.gif');
        images[20] = arr;
        var arr = new Array();
        arr.push('21-2.gif');
        arr.push('21-6.gif');
        images[21] = arr;
        var arr = new Array();
        arr.push('22-3.gif');
        arr.push('22-5.gif');
        images[22] = arr;
        var arr = new Array();
        arr.push('23-1.gif');
        arr.push('23-2.gif');
        images[23] = arr;
        var arr = new Array();
        arr.push('24-3.gif');
        arr.push('24-4.gif');
        images[24] = arr;
        var arr = new Array();
        arr.push('25-2.gif');
        arr.push('25-6.gif');
        images[25] = arr;
        var arr = new Array();
        arr.push('26-1.gif');
        arr.push('26-4.gif');
        images[26] = arr;
        var arr = new Array();
        arr.push('27-3.gif');
        arr.push('27-5.gif');
        images[27] = arr;
        var arr = new Array();
        arr.push('28-2.gif');
        arr.push('28-4.gif');
        images[28] = arr;
        var arr = new Array();
        arr.push('29-1.gif');
        arr.push('29-6.gif');
        images[29] = arr;
        var arr = new Array();
        arr.push('3-1.gif');
        arr.push('3-3.gif');
        images[3] = arr;
        var arr = new Array();
        arr.push('30-4.gif');
        arr.push('30-5.gif');
        images[30] = arr;
        var arr = new Array();
        arr.push('31-1.gif');
        arr.push('31-3.gif');
        images[31] = arr;
        var arr = new Array();
        arr.push('32-3.gif');
        arr.push('32-5.gif');
        images[32] = arr;
        var arr = new Array();
        arr.push('33-1.gif');
        arr.push('33-4.gif');
        images[33] = arr;
        var arr = new Array();
        arr.push('34-3.gif');
        arr.push('34-6.gif');
        images[34] = arr;
        var arr = new Array();
        arr.push('35-4.gif');
        arr.push('35-5.gif');
        images[35] = arr;
        var arr = new Array();
        arr.push('36-1.gif');
        arr.push('36-2.gif');
        images[36] = arr;
        var arr = new Array();
        arr.push('37-2.gif');
        arr.push('37-3.gif');
        images[37] = arr;
        var arr = new Array();
        arr.push('38-1.gif');
        arr.push('38-5.gif');
        images[38] = arr;
        var arr = new Array();
        arr.push('39-2.gif');
        arr.push('39-6.gif');
        images[39] = arr;
        var arr = new Array();
        arr.push('40-4.gif');
        arr.push('40-6.gif');
        images[40] = arr;
        var arr = new Array();
        arr.push('4-4.gif');
        arr.push('4-6.gif');
        images[4] = arr;
        var arr = new Array();
        arr.push('5-2.gif');
        arr.push('5-6.gif');
        images[5] = arr;
        var arr = new Array();
        arr.push('6-3.gif');
        arr.push('6-5.gif');
        images[6] = arr;
        var arr = new Array();
        arr.push('7-1.gif');
        arr.push('7-2.gif');
        images[7] = arr;
        var arr = new Array();
        arr.push('8-3.gif');
        arr.push('8-4.gif');
        images[8] = arr;
        var arr = new Array();
        arr.push('9-2.gif');
        arr.push('9-6.gif');
        images[9] = arr;
        var arr = new Array();
        arr.push('exp.gif');
        var img = document.getElementById("img3D");
        var rand = parseInt((Math.random() * 2));
        img.src = this.getImageDirector() + images[puzzleIndex][rand];
    }
}