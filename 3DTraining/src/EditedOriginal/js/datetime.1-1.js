
/**
 * Class that handles Date and Time related operations.
 * It is very similar to .NET's DateTime class
 * Find reference and documentation at: http://menendezpoo.com
 */

//Constructor
function DateTime(){
    var year = 0;
    var month = 0;
    var day = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var millisecond = 0;

    switch(arguments.length){
        case 0:
            var d = new Date();
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDay();
            hour = d.getHours();
            minute = d.getMinutes();
            second = d.getSeconds();
            millisecond = d.getMilliseconds();
            break;
        case 1:
            millisecond = arguments[0];
            break;
        case 3:
            year = arguments[0];
            month = arguments[1];
            day = arguments[2];
            break;
        case 6:
            year = arguments[0];
            month = arguments[1];
            day = arguments[2];
            hour = arguments[3];
            minute = arguments[4];
            second = arguments[5];
            break;
        case 7:
            year = arguments[0];
            month = arguments[1];
            day = arguments[2];
            hour = arguments[3];
            minute = arguments[4];
            second = arguments[5];
            millisecond = arguments[6];
            break;
        default:
            throw("No constructor supports " + arguments.length + " arguments");
    }

    if(!year && !month && !day)
        days = 0;
    else
        days = Math.round(this.absoluteDays(year, month, day));

    this.span = new TimeSpan(days, hour, minute, second, millisecond);

};

DateTime.prototype = {

    toString : function(){
        return this.year() + "/" + TimeSpan.pad(this.month()) + "/" + TimeSpan.pad(this.day()) +  " " + this.timeOfDay();
    },

    /* Methods */
    absoluteDays : function(year, month, day){

        function div(a,b){ return Math.round(a/b); }
        var num = 0;
        var num2= 1;
        var numArray = !DateTime.isLeapYear(year) ? DateTime.monthDays : DateTime.monthDaysLeapYear;
        while(num2 < month){
            num += numArray[num2++];
        }
        return ((((((day - 1) + num) + (365 * (year - 1))) + ((year -1 ) / 4)) - (( year - 1) / 100)) + ((year - 1) / 400));s
    },

    add : function(timespan){
        return new DateTime(this.span._millis + timespan._millis);
    },

    addDays : function(days){
        return new DateTime(this.span._millis + days * 86400000);
    },

    addHours : function(hours){
        return new DateTime(this.span._millis + hours * 3600000);
    },

    addMilliseconds : function(millis){
        return new DateTime(this.span._millis + millis);
    },

    addMinutes : function(minutes){
        return new DateTime(this.span._millis + minutes * 60000);
    },

    addMonths : function(months){
        var day = this.day();
        var month = this.month() + (months % 12);
        var year = this.year() + Math.round(months / 12);

        if(month < 1){
            month = 12 + month;
        }else if(month > 12){
            month -=12;
            year++;
        }

        var days = DateTime.daysInMonth(year, month);

        if(day > days)
            day = days;

        var time = new DateTime(year, month, day);
        return time.add(this.timeOfDay());
    },

    addSeconds : function(seconds){
        return new DateTime(this.span._millis + seconds * 1000);
    },

    addYears : function(years){
        return this.addMonths(years * 12);
    },

    compareTo : function(datetime){
        return this.span.compareTo(datetime.span);
    },

    equals : function(datetime){
        return this.span.equals(datetime.span);
    },

    subtractDate : function(datetime){
        return new TimeSpan(this.span._millis - datetime.span._millis);
    },

    subtractTime : function(timespan){
        return new DateTime(this.span._millis - timespan._millis);
    },

    fromSpan : function(what){

        var index = 1;
        var daysmonth = DateTime.monthDays;
        var days = this.span.days();
        var num = Math.round(days / 146097);
        days -= num * 146097;
        var num2 = Math.round(days / 36524);
        if(num2 == 4) num2 =3;
        days -= num2 * 36524;
        var num3 = Math.round(days / 1461);
        days -= num3 * 1461;
        var num4 = Math.round(days / 365);
        if(num4 == 4) num = 3;
        if(what == "year")
            return (((((num * 400) + (num2 * 100)) + (num3 * 4)) + num4) + 1);
        days -= num4 * 365;
        if(what != "dayyear"){
            if((num4==3) && ((num2 == 3) || (num3 != 24)))
                daysmonth = DateTime.monthDaysLeapYear;
            while(days >= daysmonth[index])
                days -= daysmonth[index++];
            if(what == "month")
                return index;
        }
        return days + 1;

    },


    format : function (format){
        var shortdays = new Array("", DateTime.strings.Mon, DateTime.strings.Tue, DateTime.strings.Wed, DateTime.strings.Thu, DateTime.strings.Fri, DateTime.strings.Sat, DateTime.strings.Sun);
        var days = new Array("", DateTime.strings.Monday, DateTime.strings.Tuesday, DateTime.strings.Wednesday, DateTime.strings.Thursday, DateTime.strings.Friday, DateTime.strings.Saturday, DateTime.strings.Sunday);
        var shortmonths = new Array("", DateTime.strings.Jan, DateTime.strings.Feb, DateTime.strings.Mar, DateTime.strings.Apr, DateTime.strings.May, DateTime.strings.Jun, DateTime.strings.Jul, DateTime.strings.Aug, DateTime.strings.Sep, DateTime.strings.Oct, DateTime.strings.Nov, DateTime.strings.Dec);
        var months      = new Array("", DateTime.strings.January, DateTime.strings.February, DateTime.strings.March, DateTime.strings.April, DateTime.strings.MayFull, DateTime.strings.June, DateTime.strings.July, DateTime.strings.August, DateTime.strings.September, DateTime.strings.October, DateTime.strings.November, DateTime.strings.December);

        var day = this.day();
        var dayOfWeek = this.dayOfWeek();
        var millisecond = this.millisecond();
        var hour = this.hour();
        var minute = this.minute();
        var second = this.second();
        var month = this.month();
        var year = this.year();

        var data = new Array();

        var yearstr = year + "";
        /*
        if(yearstr.length > 1)
            yearstr = yearstr.substr(0, yearstr.length - 2)
        */
        data["dddd"] = days[dayOfWeek];
        data["ddd"]  = shortdays[dayOfWeek];
        data["dd"] = TimeSpan.pad(day);
        data["d"] = day;
        data["fff"] = millisecond;
        data["ff"] = Math.round(millisecond / 10);
        data["f"] = Math.round(millisecond / 100);
        data["hh"] = TimeSpan.pad(hour > 12 ? hour - 12 : hour);
        data["h"] = hour > 12 ? hour - 12 : hour;
        data["HH"] = TimeSpan.pad(hour);
        data["H"] = hour;
        data["mm"] = TimeSpan.pad(minute);
        data["m"] = minute;
        data["MMMM"] = months[month];
        data["MMM"] = shortmonths[month];
        data["MM"] = TimeSpan.pad(month);
        data["M"] = month;
        data["ss"] = TimeSpan.pad(second);
        data["s"] = second;
        data["tt"] = (hour > 12 ? DateTime.strings.PM : DateTime.strings.AM) ;
        data["t"] = (hour > 12 ? DateTime.strings.P : DateTime.strings.A);
        data["yyyy"] = year;
        data["yyy"] = year;
        data["yy"] = year;
        data["y"] = year;
        data[":"] = DateTime.strings.TimeSeparator;
        data["/"] = DateTime.strings.DateSeparator;


        var output = "";
        var res = format.split(/(dddd|ddd|dd|d|fff|ff|f|hh|h|HH|H||mm|m|MMMM|MMM|MM|M|ss|s|tt|t|yyyy|yyy|yy|y)?/);

        for(var i = 0; i < res.length; i++){
            if(res[i]){
                if(data[res[i]]){
                    output += data[res[i]];
                }else{
                    output += res[i];
                }
            }
        }

        return output;
    },

    /* Properties */
    date : function(){
        return new DateTime(this.year(), this.month(), this.day());
    },

    day : function(){
        return this.fromSpan("day");
    },

    dayOfWeek : function(){
        return (this.span.days() + 1) % 7;
    },

    dayOfYear : function(){
        return this.fromSpan("dayyear");
    },

    hour : function(){
        return this.span.hours();
    },

    millisecond : function(){
        return this.span.milliseconds();
    },

    minute : function(){
        return this.span.minutes();
    },

    month : function(){
        return this.fromSpan("month");
    },

    second : function(){
        return this.span.seconds();
    },

    timeOfDay : function(){
        return new TimeSpan(this.span._millis % 86400000);
    },

    year : function(){
        return this.fromSpan("year");
    },

    totalMilliseconds: function() {
        return this.span._millis;
    }

}

DateTime.monthDays =         new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
DateTime.monthDaysLeapYear = new Array(0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
DateTime.daysInMonth = function (year, month){
    if(DateTime.isLeapYear(year)){
        return DateTime.monthDaysLeapYear[month];
    }else{
        return DateTime.monthDays[month];
    }
};
DateTime.now = function(){
    d = new Date();
    return new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
};
DateTime.utcNow = function(){
    d = new Date();
    return new DateTime(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDay(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
};
DateTime.today = function(){
    var now = DateTime.now();
    return new DateTime(now.year(), now.month(), now.day());
};
DateTime.isLeapYear = function(year){
    if (( (year % 4 == 0) && (year % 100 != 0) ) || (year % 400 == 0))
        return true;
    return false;
};

///*
DateTime.strings = function(){  };
DateTime.strings.Mon 		= "Mon";
DateTime.strings.Monday 	= "Monday";
DateTime.strings.Tue 		= "Tue";
DateTime.strings.Tuesday 	= "Tuesday";
DateTime.strings.Wed 		= "Wed";
DateTime.strings.Wednesday 	= "Wednesday";
DateTime.strings.Thu 		= "Thu";
DateTime.strings.Thursday 	= "Thursday";
DateTime.strings.Fri 		= "Fri";
DateTime.strings.Friday 	= "Friday";
DateTime.strings.Sat 		= "Sat";
DateTime.strings.Saturday 	= "Saturday";
DateTime.strings.Sun 		= "Sun";
DateTime.strings.Sunday 	= "Sunday";
DateTime.strings.Jan 		= "Jan";
DateTime.strings.Januray 	= "January";
DateTime.strings.Feb 		= "Feb";
DateTime.strings.February	= "February";
DateTime.strings.Mar 		= "Mar";
DateTime.strings.March 		= "March";
DateTime.strings.Apr 		= "Apr";
DateTime.strings.April 		= "April";
DateTime.strings.May 		= "May";
DateTime.strings.MayFull 	= "May";
DateTime.strings.Jun 		= "Jun";
DateTime.strings.June		= "June";
DateTime.strings.Jul 		= "Jul";
DateTime.strings.July		= "July";
DateTime.strings.Aug 		= "Aug";
DateTime.strings.August 	= "August";
DateTime.strings.Sep 		= "Sep";
DateTime.strings.September 	= "September";
DateTime.strings.Oct 		= "Oct";
DateTime.strings.October 	= "October";
DateTime.strings.Nov 		= "Nov";
DateTime.strings.November 	= "November";
DateTime.strings.Dec 		= "Dec";
DateTime.strings.December 	= "December";
DateTime.strings.A  		= "A";
DateTime.strings.AM 		= "AM";
DateTime.strings.P			= "P";
DateTime.strings.PM 		= "PM";
DateTime.strings.TimeSeparator = ":";
DateTime.strings.DateSeparator = "/";



/**
 * Class that handles time related operations.
 * It is very similar to .NET's TimeSpan class
 * Find reference and documentation at: http://menendezpoo.com
 */
function TimeSpan(){

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;

    switch(arguments.length){
        case 0:
            break;
        case 1:
            milliseconds = arguments[0];
            break;
        case 2:
            days = arguments[0];
            hours = arguments[1];
            break;
        case 3:
            hours = arguments[0];
            minutes = arguments[1];
            seconds = arguments[2];
            break;
        case 4:
            days = arguments[0];
            hours = arguments[1];
            minutes = arguments[2];
            seconds = arguments[3];
            break;
        case 5:
            days = arguments[0];
            hours = arguments[1];
            minutes = arguments[2];
            seconds = arguments[3];
            milliseconds = arguments[4];
            break;
        default:
            throw("No constructor of TimeSpan supports " + arguments.length + " arguments");
    }

    this._millis = (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
};

TimeSpan.prototype = {
    /* Methods */
    add: function (timespan) {
        return new TimeSpan(timespan._millis + this._millis);
    },

    compareTo: function (timespan) {
        if (this._millis > timespan._millis) return 1;
        if (this._millis == timespan._millis) return 0;
        if (this._millis < timespan._millis) return -1;
    },

    duration: function () {
        return new TimeSpan(Math.abs(this._millis));
    },

    equals: function (timespan) {
        return this._millis == timespan._millis;
    },

    negate: function () {
        this._millis *= -1;
    },

    subtract: function (timespan) {
        return new TimeSpan(this._millis - timespan._millis);
    },

    rounder: function (number) {
        if (this._millis < 0)
            return Math.ceil(number);
        return Math.floor(number);
    },

    /* Properties */

    days: function () {
        return this.rounder(this._millis / (24 * 3600 * 1000));
    },

    hours: function () {
        return this.rounder((this._millis % (24 * 3600 * 1000)) / (3600 * 1000));
    },

    milliseconds: function () {
        return this.rounder(this._millis % 1000);
    },

    minutes: function () {
        return this.rounder((this._millis % (3600 * 1000)) / (60 * 1000));
    },

    seconds: function () {
        return this.rounder((this._millis % 60000) / 1000);
    },

    totalDays: function () {
        return this._millis / (24 * 3600 * 1000);
    },

    totalHours: function () {
        return this._millis / (3600 * 1000);
    },

    totalMinutes: function () {
        return this._millis / (60 * 1000);
    },

    totalSeconds: function () {
        return this._millis / 1000;
    },

    totalMilliseconds: function () {
        return this._millis;
    },

    toString: function () {
        return (this._millis < 0 ? "-" : "") + (Math.abs(this.days()) ? TimeSpan.pad(Math.abs(this.days())) + "." : "") + TimeSpan.pad(Math.abs(this.hours())) + ":" + TimeSpan.pad(Math.abs(this.minutes())) + ":" + TimeSpan.pad(Math.abs(this.seconds())) + "." + Math.abs(this.milliseconds());
    },
    toTimeString: function (format) {
        // format like 'dd:HH:mm:ss'

        if (typeof (format) != "string") {
            return (this._millis < 0 ? "-" : "") + (Math.abs(this.days()) ? TimeSpan.pad(Math.abs(this.days())) + "." : "") + TimeSpan.pad(Math.abs(this.hours())) + ":" + TimeSpan.pad(Math.abs(this.minutes())) + ":" + TimeSpan.pad(Math.abs(this.seconds())) + "." + Math.abs(this.milliseconds());
        } else {
            var days = (Math.abs(this.days()) ? TimeSpan.pad(Math.abs(this.days())) + "." : ""),
                hours = TimeSpan.pad(Math.abs(this.hours())),
                minutes = TimeSpan.pad(Math.abs(this.minutes())),
                seconds = TimeSpan.pad(Math.abs(this.seconds())),
                ms = Math.abs(this.milliseconds()),
                r = "";

            if (format.indexOf('dd') > -1)
                r = days + ":";
            if (format.indexOf('HH') > -1)
                r += hours + ":";
            if (format.indexOf('ss') > -1)
                r += minutes + ":";
            if (format.indexOf('ss') > -1)
                r += seconds + ":";
            if (format.indexOf('ms') > -1)
                r += ms;

            if (r.lastIndexOf(':') == r.length - 1)
                r = r.substr(0, r.length - 1);

            return r;
        }
    }

};

TimeSpan.pad = function(number){ return (number < 10 ? '0' : '') + number; };