var includerDeferredScripts = new Array(),
    onload_methods = new Array(),
    onload_counter = 0,
    includerStartTime = null;

var includerScript = function (paramUrl, paramCallback) {
    this.url = paramUrl;
    this.callback = paramCallback;
};

function includerDebug(v) {
    return;
    if ($('#includerDebug').length == 0) {
        var debug = $('<div id="includerDebug"></div>');
        $('body').append(debug);
        debug.attr('style', 'background-color:#ffffff; position:absolute;top:20px;left:200px;width:800px;height:600px;z-index:2000;opacity:1;filter:alpha(opacity=100);overflow:scroll;'); //q&d
    }
    $('#includerDebug').html($('#includerDebug').html() + "<br />" + v);
}

function includerGetScript(url, success) {
    if (url.toLowerCase().indexOf('.css') == url.length - 4) {
        //css
        var script = document.createElement('link');
        script.setAttribute('rel', 'stylesheet');
        script.setAttribute('href', url);
        var head = document.getElementsByTagName('head')[0],
            done = false;
        /*script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        includerDebug('script "' + script.src + '" completed');
        script.onload = script.onreadystatechange = null;
        }
        };*/
        head.appendChild(script);
    } else {
        //js
        onload_counter += 1;
        var script = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName('head')[0],
            done = false;
        includerDebug('adding script ' + url);
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                includerDebug('script "' + script.src + '" completed');
                if (typeof (success) != "undefined") {
                    includerDebug('executing success function of script: ' + url);
                    success.apply();
                }
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
                onload_counter -= 1;
                //includerDebug(onload_counter);
            }
        };
        head.appendChild(script);
    }
}

// alias
function include(url, success) {
    includerDeferredScripts.push(new includerScript(url, success));
    //includerDebug('included script: ' + url);
}

function includer(callback) {
    includerStartTime = new Date();
    for (var i = 0, len = includerDeferredScripts.length; i < len; i++) {
        var script = includerDeferredScripts[i];
        includerGetScript(script.url, script.callback);
    }

    var onload_complete = function () {
        try {
            jquery_stripeTables();
        } catch (err) { }
        try {
            jquery_assignClickUrl();
        } catch (err) { }
        if (typeof (onload_methods) != "undefined") {
            for (var i = 0, len = onload_methods.length; i < len; i++) {
                includerDebug("applying onload method: " + onload_methods[i]);
                onload_methods[i].apply();
                if (i == (len - 1) && typeof (callback) == "function") {
                    callback.apply();
                }
            }
        }
    };

    var allGood = function () {
        includerDebug('are we good to go loop?: scripts remaining: ' + onload_counter);
        var timeSpent = ((new Date()) - includerStartTime);
        includerDebug("time spent: " + timeSpent);
        if (onload_counter != 0 && timeSpent <= 2500) {
            setTimeout(function () { allGood(); }, 200);
        } else {
            onload_complete();
        }
    };

    includerDebug('are we good to go?: scripts remaining: ' + onload_counter);

    setTimeout(function () {
        includerDebug('starting loop: ' + onload_counter);
        allGood();
    }, 100);



    //include("/js/debug.js", onload_complete);
} // includer()
