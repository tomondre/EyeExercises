parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xdyC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CONFIG=void 0;var e={application:{timeLength:10},space:{spaceWidthRatio:.6,spaceHeightRatio:.08,spaceHeightMarginRatio:.9,playerResponseTime:1e3},ball:{ballSize:100,defaultSpeed:750,speedIncreaseInMilliseconds:50,speedDecreaseInMilliseconds:50},score:{increase:10,decrease:5,percentToPassTheLevel:.9},slowDownButton:{slowDownBy:100},optionButtonsPosition:{buttonsY:.85,firstButtonX:.3},messages:{levelNotPassed:{text:"Level failed. Try again",button:"Confirm"},changeEye:{text:"Change Eye",button:"Confirm"},gameFinished:{text:"Congratulation, you have successfully finished the game!",button:"Exit"},fixTheBall:{text:"Remember to fixate the ball!",countdownFirstPart:"Continuing in ",countdownSecondPart:" seconds"},endLevel:{firstPart:"Congratulation - you have passed level ",secondPart:",\n next level starts in ",thirdPart:" seconds"}},responsiveness:{normalTextSize:40,normalButtonTextSize:"23px",switchSizesWhenResolutionLowerThan:1e3,smallerTextSize:25,smallerButtonTextSize:"10px"},difficulty:[{topSpanY:.5,bottomSpanY:.51,leftSpanXMin:.24,leftSpanXMax:.25,rightSpanXMin:.74,rightSpanXMax:.75,dotSize:10,lowerIntervalLimit:599,upperIntervalLimit:1200,numberOfSymbols:1},{topSpanY:.45,bottomSpanY:.55,leftSpanXMin:.24,leftSpanXMax:.25,rightSpanXMin:.74,rightSpanXMax:.75,dotSize:9,lowerIntervalLimit:501,upperIntervalLimit:600,numberOfSymbols:1},{topSpanY:.45,bottomSpanY:.55,leftSpanXMin:.2,leftSpanXMax:.3,rightSpanXMin:.7,rightSpanXMax:.8,dotSize:8,lowerIntervalLimit:429,upperIntervalLimit:500,numberOfSymbols:2},{topSpanY:.4,bottomSpanY:.6,leftSpanXMin:.2,leftSpanXMax:.3,rightSpanXMin:.7,rightSpanXMax:.8,dotSize:7,lowerIntervalLimit:376,upperIntervalLimit:428,numberOfSymbols:2},{topSpanY:.4,bottomSpanY:.6,leftSpanXMin:.15,leftSpanXMax:.35,rightSpanXMin:.65,rightSpanXMax:.85,dotSize:6,lowerIntervalLimit:334,upperIntervalLimit:375,numberOfSymbols:3},{topSpanY:.35,bottomSpanY:.65,leftSpanXMin:.15,leftSpanXMax:.35,rightSpanXMin:.65,rightSpanXMax:.85,dotSize:5,lowerIntervalLimit:301,upperIntervalLimit:333,numberOfSymbols:3},{topSpanY:.35,bottomSpanY:.65,leftSpanXMin:.1,leftSpanXMax:.4,rightSpanXMin:.6,rightSpanXMax:.9,dotSize:5,lowerIntervalLimit:273,upperIntervalLimit:300,numberOfSymbols:4},{topSpanY:.3,bottomSpanY:.7,leftSpanXMin:.1,leftSpanXMax:.4,rightSpanXMin:.6,rightSpanXMax:.9,dotSize:5,lowerIntervalLimit:0,upperIntervalLimit:372,numberOfSymbols:4}],eyeDisplay:{text:"Eye: "}};exports.CONFIG=e;
},{}]},{},["xdyC"], null)
//# sourceMappingURL=config.cb8ca0c0.js.map