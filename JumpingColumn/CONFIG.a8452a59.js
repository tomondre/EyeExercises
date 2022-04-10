// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/config/CONFIG.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIG = void 0;
var CONFIG = {
  grid: {
    arrowSizeToWindowWidthRatio: 0.03,
    arrowScale: 0.8,
    arrowsNo: 4,
    arrowSizeToTotalSpaceRatio: 0.9
  },
  arrowImageAngle: 90,
  scoreBoard: {
    increase: 10,
    decrease: 5
  },
  responsiveness: {
    normalTextSize: 40,
    normalButtonTextSize: "23px",
    switchSizesWhenResolutionLowerThan: 1000,
    smallerTextSize: 25,
    smallerButtonTextSize: "20px"
  },
  buttons: {
    pointeroutColor: 0xffA500,
    pointeroverColor: 0xff0000
  },
  messages: {
    levelPassed: {
      textFirstPart: "Great Job! Level ",
      textSecondPart: " has been passed,\n Next level starts in: ",
      textThirdPart: " seconds",
      timeLength: 2
    },
    levelNotPassed: {
      text: "Level failed. Try again"
    },
    changeEye: {
      text: "Change Eye",
      buttonOne: "Change Eye",
      buttonTwo: "Continue Level"
    },
    gameFinished: {
      text: "Congratulation, you have successfully finished the game!"
    },
    confirmLevelDown: {
      text: "Do you wish to go down one level?",
      buttonOne: "Confirm",
      buttonTwo: "Reject"
    },
    lastChangeEye: {
      text: "You have finished daily exercise. Would you like to continue or exit the game?",
      buttonOne: "Exit",
      buttonTwo: "Continue"
    },
    rotateScreen: {
      text: "Please, rotate your screen."
    },
    exitMessage: {
      text: "Thank you"
    },
    changeEyeButton: {
      text: "Press here to change eye"
    },
    exitGameButton: {
      text: "Press here to exit the game"
    },
    confirmButton: {
      text: "Confirm"
    },
    height: 0.84,
    buttonHeight: 0.88
  },
  percentOfSuccessToPassLevel: 0.89,
  levels: [{
    levelNo: 1,
    rows: 4,
    verticalOuterArrows: 1,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 2
  }, {
    levelNo: 2,
    rows: 5,
    verticalOuterArrows: 1,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 2
  }, {
    levelNo: 3,
    rows: 5,
    verticalOuterArrows: 2,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 4
  }, {
    levelNo: 4,
    rows: 6,
    verticalOuterArrows: 2,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 4
  }, {
    levelNo: 5,
    rows: 6,
    verticalOuterArrows: 3,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 6,
    rows: 6,
    verticalOuterArrows: 1,
    horizontalOuterArrows: 2,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 7,
    rows: 6,
    verticalOuterArrows: 4,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 8,
    rows: 6,
    verticalOuterArrows: 0,
    horizontalOuterArrows: 4,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 9,
    rows: 6,
    verticalOuterArrows: 2,
    horizontalOuterArrows: 2,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 10,
    rows: 7,
    verticalOuterArrows: 4,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 11,
    rows: 7,
    verticalOuterArrows: 2,
    horizontalOuterArrows: 2,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 12,
    rows: 8,
    verticalOuterArrows: 4,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 13,
    rows: 8,
    verticalOuterArrows: 2,
    horizontalOuterArrows: 2,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 14,
    rows: 9,
    verticalOuterArrows: 5,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 15,
    rows: 9,
    verticalOuterArrows: 0,
    horizontalOuterArrows: 5,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 16,
    rows: 9,
    verticalOuterArrows: 2,
    horizontalOuterArrows: 3,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 17,
    rows: 10,
    verticalOuterArrows: 5,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 18,
    rows: 10,
    verticalOuterArrows: 3,
    horizontalOuterArrows: 2,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 19,
    rows: 11,
    verticalOuterArrows: 5,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 20,
    rows: 11,
    verticalOuterArrows: 2,
    horizontalOuterArrows: 3,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 21,
    rows: 11,
    verticalOuterArrows: 6,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 22,
    rows: 11,
    verticalOuterArrows: 0,
    horizontalOuterArrows: 6,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 23,
    rows: 11,
    verticalOuterArrows: 3,
    horizontalOuterArrows: 3,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 24,
    rows: 12,
    verticalOuterArrows: 7,
    horizontalOuterArrows: 0,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 25,
    rows: 12,
    verticalOuterArrows: 0,
    horizontalOuterArrows: 7,
    correctPuzzlesToPassLevel: 5
  }, {
    levelNo: 26,
    rows: 12,
    verticalOuterArrows: 3,
    horizontalOuterArrows: 3,
    correctPuzzlesToPassLevel: 5
  }],
  eyeDisplay: {
    text: "Eye: "
  }
};
exports.CONFIG = CONFIG;
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51198" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/config/CONFIG.js"], null)
//# sourceMappingURL=/CONFIG.a8452a59.js.map