var tye = {
    /*
    private
    */
    _user_agent: "",
    _is_iPad: false,
    _is_mobile_device: false,
    /*
    stuff
    */
    currentUrl: "",
    enableDebug: false,
    dictionary: null,
    dictionaryLanguage: null,
    messages: {
        confirmDelete: 'Delete?'
    },
    /*
    general
    method names really ought to be camelCase (!)
    */
    debug: function (v) {
        if (!tye.enableDebug)
            return;
        if ($('#tyeDebuggin').length == 0) {
            var debug = $('<div id="tyeDebuggin"></div>');
            $('body').append(debug);
            debug.attr('style', 'position:absolute;top:20px;left:500px;width:300px;height:600px;opacity:.5;filter:alpha(opacity=50);overflow:scroll;'); //q&d
        }
        $('#tyeDebuggin').html(v + '<br />' + $('#tyeDebuggin').html());
    },
    dicValue: function (key, htmlEncode) {
        try {
            if (typeof (htmlEncode) == "undefined" || !htmlEncode) {
                return tye.dictionary[key][tye.dictionaryLanguage].replace(/&lt;br \/&gt;/g, '\n');
            } else {
                return tye.dictionary[key][tye.dictionaryLanguage];
            }
        } catch (err) {
            return "error occured getting translation for this...you shouldn't have seen this text...sorry :-(";
        }
    },
    guid: function () {
        var S4 = function () {
            return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
        };
        return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
    },
    hideLoading: function () {
        $('#loading_icon').hide();
    },
    hideMessage: function () {
        $('#dialog_box').hide();
        tye.hideOverlay();
    },
    hideOverlay: function (action) {
        var scrolltop = $(document).scrollTop();
        if (action == "fade")
            $('#dialog_overlay').fadeOut();
        else
            $('#dialog_overlay').hide();
        $('body').css('overflow', 'auto');
        $('html').css('overflow', 'auto');
        $('html').css('overflow-y', 'scroll');
        $(document).scrollTop(scrolltop);
        $(window).unbind('resize.tyeshowOverlay');
    },
    isIpad: function () {
        if (tye._user_agent == "")
            tye.isMobileDevice();
        return (tye._user_agent.match(/iPad/i) != null);
    },
    isMobileDevice: function () {
        if (tye._user_agent == "") {
            tye._user_agent = navigator.userAgent.toLowerCase(); //.match(/iPad/i) != null;
            tye._is_mobile_device = (tye._user_agent.match(/iPad/i) != null
                || tye._user_agent.match(/iPod/i) != null
                || tye._user_agent.match(/iPhone/i) != null
                || tye._user_agent.match(/android/i) != null
                || tye._user_agent.match(/mobile/i) != null
            );
        }
        return tye._is_mobile_device;
    },
    popDialog: function (url, width, height) {
        if (typeof (width) == "undefined")
            width = 600;
        if (typeof (height) == "undefined")
            height = 400;
        window.open(url, "win" + tye.guid(), "directories=no,width=" + width + ",height=" + height + ",scrollbars=yes,resizable=no,status=yes,titlebar=yes,toolbar=no");
    },
    rqValue: function (queryStringVariableName, ignoreCase) {
        if (typeof (ignoreCase) == "undefined")
            ignoreCase = false;

        // http://stackoverflow.com/questions/2907482/how-to-get-the-query-string-by-javascript
        var assoc = {};
        var decode = function (s) {
            return decodeURIComponent(s.replace(/\+/g, " "));
        };
        var queryString = location.search.substring(1);
        var keyValues = queryString.split('&');
        for (var i in keyValues) {
            var key = keyValues[i].split('=');
            if (key.length > 1) {
                if (ignoreCase)
                    assoc[decode(key[0]).toLowerCase()] = decode(key[1]);
                else
                    assoc[decode(key[0])] = decode(key[1]);
            }
        }

        if (ignoreCase)
            return assoc[queryStringVariableName.toLowerCase()] || "";
        else
            return assoc[queryStringVariableName] || "";
    },
    showLoading: function () {
        if ($('#loading_icon').length < 1) {
            var loading = $('<img id="loading_icon" style="position:absolute;top:200px;left:100px;'
                + 'z-index:101;display:none;'
                + '" src="/img/loading_big.gif" />')
            $('body').append(loading);
        }
        $('#loading_icon').show().center();
    },
    showMessage: function (text, cssClass) {
        var box = null;
        if ($('#dialog_box').length < 1) {
            box = $('<div id="dialog_box" style="position:absolute;height:150px;width:300px;z-index:101;display:none"><div class="dialog_box_icon"></div><div class="info">&nbsp;</div></div>');
            $('body').append(box);
        }
        tye.showOverlay();
        if (box == null) {
            box = $('#dialog_box');
        }
        box.removeClass().addClass(cssClass);
        box.find('div.info').html(text);
        box.show().center().on('click', function () {
            tye.hideMessage();
            tye.hideOverlay();
        });

    },
    showOverlay: function (action) {
        if ($('#dialog_overlay').length < 1) {
            var overlay = $('<div id="dialog_overlay" style="position:absolute;top:200px;left:100px;width:300px;height:300px;'
                + 'background-color:#333333;z-index:100;display:none;'
                + '">&nbsp;</div>').css('opacity', '0.5');
            $('body').append(overlay);
        }

        var scrolltop = $(document).scrollTop();

        $('body').css('overflow', 'hidden');
        $('html').css('overflow', 'hidden');
        $(document).scrollTop(scrolltop);

        if (action == "fade")
            $('#dialog_overlay').fadeIn();
        else
            $('#dialog_overlay').show();
        $('#dialog_overlay').width($(window).width())
            .height($(window).height())
            .css('top', $(window).scrollTop())
            .css('left', $(window).scrollLeft());

        $(window).on('resize.tyeshowOverlay', function () {
            $('#dialog_overlay')
                .width($(window).width())
                .height($(window).height())
                .css('top', $(window).scrollTop())
                .css('left', $(window).scrollLeft());
        });
    }
};