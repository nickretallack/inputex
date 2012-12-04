if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js",
    code: []
};
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].code=["YUI.add('inputex-calendar-week-number-plugin', function (Y, NAME) {","","// number representing one day, in milliseconds","var one_day_ms = 1000*60*60*24;","","/**"," * A plugin class which adds week numbers to Calendar."," *"," * @class CalendarWeekNumber"," * @extends Plugin.Base"," * @namespace Plugin"," */","function CalendarWeekNumber () {","    CalendarWeekNumber.superclass.constructor.apply(this, arguments);","}","","/**"," * The namespace for the plugin. This will be the property on the widget, which will"," * reference the plugin instance, when it's plugged in."," *"," * @property NS"," * @static"," * @type String"," * @default \"week_number\""," */","CalendarWeekNumber.NS = \"weekNumber\";","","CalendarWeekNumber.ATTRS = {","    strings: {","        valueFn: function () {","            return Y.Intl.get(\"inputex-calendar-week-number-plugin\");","        }","    }","};","","","Y.extend(CalendarWeekNumber, Y.Plugin.Base, {","    ","    /**","     * The initializer lifecycle implementation. Modifies the host widget's","     * render to add navigation controls.","     *","     * @method initializer","     * @param {Object} config The user configuration for the plugin","     */","    initializer: function () {","        ","        var host = this.get('host');","        ","        // re-render week numbers every time we re-render a calendar pane","        this._rerenderHandle = this.beforeHostMethod('_rerenderCalendarPane', this._rerenderWeekNumbers);","        ","        // render week numbers after the first rendering","        if (!host.get('rendered')) {","            ","            this.afterHostMethod('renderUI', function () {","                host.get('boundingBox').addClass('yui3-calendar-with-week-numbers');","                this._initWeekNumbers();","                host._afterDateChange();","            });","            ","        } else {","            host.get('boundingBox').addClass('yui3-calendar-with-week-numbers');","            this._initWeekNumbers();","            host._afterDateChange();","        }","        ","    },","    ","    /**","     * The initializer destructor implementation. Responsible for destroying the initialized","     * control mechanisms.","     *","     * @method destructor","     */","    destructor : function () {","        ","        this._rerenderHandle.detach();","        ","        if (this.get('host').get('rendered')) {","            ","            var host = this.get('host'),","                calendarPanes = host.get('contentBox').all(\".yui3-calendar-grid\");","            ","            calendarPanes.each(function (pane) {","                pane.all('.yui3-calendar-week-number-spacer').remove();","                pane.all('.yui3-calendar-week-number').remove();","            });","            ","            host.get('boundingBox').removeClass('yui3-calendar-with-week-numbers');","        }","    },","    ","    _initWeekNumbers: function () {","        ","        var host = this.get('host'),","            calendarPanes = host.get('contentBox').all(\".yui3-calendar-grid\");","            ","        calendarPanes.each(function (pane) {","            pane.one('.yui3-calendar-weekdayrow').prepend(Y.Node.create('<th class=\"yui3-calendar-week-number-spacer\"></th>'));","            pane.all('.yui3-calendar-row').each(function (row) {","                row.prepend('<th class=\"yui3-calendar-week-number\"></th>');","            });","        });","        ","    },","    ","    _rerenderWeekNumbers: function (newDate, pane) {","        ","        var plugin       = this,","            host         = plugin.get('host'),","            weekDayCells = pane.all(\".yui3-calendar-week-number\"),","            startDay     = host.get('strings.first_weekday'),","            workingDate  = newDate,","            preMonthDays, weekNumber, weekNumberStr;","            ","        // some computation to get the first date displayed (maybe from previous month)","        preMonthDays = workingDate.getDay();","        ","        if (startDay > 0) {","            preMonthDays -= startDay;","        }","        ","        if (preMonthDays < 0) {","            preMonthDays += 7;","        }","        ","        workingDate = Y.Date.addDays(workingDate, -preMonthDays);","        ","        // Hide the pane before making DOM changes to speed them up","        // NOTE: will be made visible again by _rerenderCalendarPane","        pane.setStyle(\"visibility\", \"hidden\");","        ","        // iterate over weekDay cells to fill them","        weekDayCells.each(function () {","            ","            weekNumber = plugin.getWeekNumber(workingDate, startDay, plugin.get('strings.week_one_jan_date'));","            ","            // format week number on 2 chars","            weekNumberStr = (weekNumber < 10 ? \"&nbsp;\" : \"\") + weekNumber;","            ","            this.set('innerHTML', weekNumberStr);","            ","            // next date","            workingDate = Y.Date.addDays(workingDate, 7);","        });","        ","    },","    ","    ","    /**","    * Calculates the week number for the given date. Can currently support standard","    * U.S. week numbers, based on Jan 1st defining the 1st week of the year, and","    * ISO8601 week numbers, based on Jan 4th defining the 1st week of the year.","    *","    * @method getWeekNumber","    * @param {Date} date The JavaScript date for which to find the week number","    * @param {Number} firstDayOfWeek The index of the first day of the week (0 = Sun, 1 = Mon ... 6 = Sat).","    * Defaults to 0","    * @param {Number} janDate The date in the first week of January which defines week one for the year","    * Defaults to the value of CalendarWeekNumber.WEEK_ONE_JAN_DATE, which is 1 (Jan 1st).","    * For the U.S, this is normally Jan 1st. ISO8601 uses Jan 4th to define the first week of the year.","    *","    * @return {Number} The number of the week containing the given date.","    */","    getWeekNumber: function (date, firstDayOfWeek, janDate) {","        ","        // Setup Defaults","        firstDayOfWeek = firstDayOfWeek || 0;","        janDate = janDate || 1;","        ","        var targetDate = this.clearTime(date),","            startOfWeek,","            endOfWeek;","            ","        if (targetDate.getDay() === firstDayOfWeek) {","            startOfWeek = targetDate;","        } else {","            startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);","        }","        ","        var startYear = startOfWeek.getFullYear();","        ","        // DST shouldn't be a problem here, math is quicker than setDate();","        endOfWeek = new Date(startOfWeek.getTime() + 6 * one_day_ms);","        ","        var weekNum;","        if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {","            // If years don't match, endOfWeek is in Jan. and if the","            // week has WEEK_ONE_JAN_DATE in it, it's week one by definition.","            weekNum = 1;","        } else {","            // Get the 1st day of the 1st week, and","            // find how many days away we are from it.","            var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),","                weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);","                ","            // Round days to smoothen out 1 hr DST diff","            var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime()) / one_day_ms);","            ","            // Calc. Full Weeks","            var rem = daysDiff % 7;","            var weeksDiff = (daysDiff - rem)/7;","            weekNum = weeksDiff + 1;","        }","        return weekNum;","    },","    ","    /**","    * Clears the time fields from a given date, effectively setting the time to 12 noon.","    * @method clearTime","    * @param {Date} date The JavaScript Date for which the time fields will be cleared","    * @return {Date}  The JavaScript Date cleared of all time fields","    */","    clearTime: function (date) {","        date.setHours(12,0,0,0);","        return date;","    },","    ","    /**","     * Returns a new JavaScript Date object, representing the given year, month and date. Time fields (hr, min, sec, ms) on the new Date object","     * are set to 0. The method allows Date instances to be created with the a year less than 100. \"new Date(year, month, date)\" implementations","     * set the year to 19xx if a year (xx) which is less than 100 is provided.","     * <p>","     * <em>NOTE:</em>Validation on argument values is not performed. It is the caller's responsibility to ensure","     * arguments are valid as per the ECMAScript-262 Date object specification for the new Date(year, month[, date]) constructor.","     * </p>","     * @method getDate","     * @param {Number} y Year.","     * @param {Number} m Month index from 0 (Jan) to 11 (Dec).","     * @param {Number} d (optional) Date from 1 to 31. If not provided, defaults to 1.","     * @return {Date} The JavaScript date object with year, month, date set as provided.","     */","    getDate: function (y, m, d) {","        var dt = null;","        if (typeof d === \"undefined\") {","            d = 1;","        }","        if (y >= 100) {","            dt = new Date(y, m, d);","        } else {","            dt = new Date();","            dt.setFullYear(y);","            dt.setMonth(m);","            dt.setDate(d);","            dt.setHours(0,0,0,0);","        }","        return dt;","    },","    ","    /**","     * Get the first day of the week, for the give date.","     * @param {Date} dt The date in the week for which the first day is required.","     * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)","     * @return {Date} The first day of the week","     */","    getFirstDayOfWeek: function (dt, startOfWeek) {","        startOfWeek = startOfWeek || 0;","        var dayOfWeekIndex = dt.getDay(),","            dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;","            ","        return Y.Date.addDays(dt, -dayOfWeek);","    }","    ","});","","Y.namespace(\"Plugin\").CalendarWeekNumber = CalendarWeekNumber;","","}, '@VERSION@', {\"requires\": [\"plugin\", \"calendar\", \"datatype-date-math\"], \"skinnable\": true, \"lang\": [\"en\", \"fr\"]});"];
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].lines = {"1":0,"4":0,"13":0,"14":0,"26":0,"28":0,"31":0,"37":0,"48":0,"51":0,"54":0,"56":0,"57":0,"58":0,"59":0,"63":0,"64":0,"65":0,"78":0,"80":0,"82":0,"85":0,"86":0,"87":0,"90":0,"96":0,"99":0,"100":0,"101":0,"102":0,"110":0,"118":0,"120":0,"121":0,"124":0,"125":0,"128":0,"132":0,"135":0,"137":0,"140":0,"142":0,"145":0,"169":0,"170":0,"172":0,"176":0,"177":0,"179":0,"182":0,"185":0,"187":0,"188":0,"191":0,"195":0,"199":0,"202":0,"203":0,"204":0,"206":0,"216":0,"217":0,"235":0,"236":0,"237":0,"239":0,"240":0,"242":0,"243":0,"244":0,"245":0,"246":0,"248":0,"258":0,"259":0,"262":0,"267":0};
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].functions = {"CalendarWeekNumber:13":0,"valueFn:30":0,"(anonymous 2):56":0,"initializer:46":0,"(anonymous 3):85":0,"destructor:76":0,"(anonymous 5):101":0,"(anonymous 4):99":0,"_initWeekNumbers:94":0,"(anonymous 6):135":0,"_rerenderWeekNumbers:108":0,"getWeekNumber:166":0,"clearTime:215":0,"getDate:234":0,"getFirstDayOfWeek:257":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].coveredLines = 77;
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].coveredFunctions = 16;
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 1);
YUI.add('inputex-calendar-week-number-plugin', function (Y, NAME) {

// number representing one day, in milliseconds
_yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 4);
var one_day_ms = 1000*60*60*24;

/**
 * A plugin class which adds week numbers to Calendar.
 *
 * @class CalendarWeekNumber
 * @extends Plugin.Base
 * @namespace Plugin
 */
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 13);
function CalendarWeekNumber () {
    _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "CalendarWeekNumber", 13);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 14);
CalendarWeekNumber.superclass.constructor.apply(this, arguments);
}

/**
 * The namespace for the plugin. This will be the property on the widget, which will
 * reference the plugin instance, when it's plugged in.
 *
 * @property NS
 * @static
 * @type String
 * @default "week_number"
 */
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 26);
CalendarWeekNumber.NS = "weekNumber";

_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 28);
CalendarWeekNumber.ATTRS = {
    strings: {
        valueFn: function () {
            _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "valueFn", 30);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 31);
return Y.Intl.get("inputex-calendar-week-number-plugin");
        }
    }
};


_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 37);
Y.extend(CalendarWeekNumber, Y.Plugin.Base, {
    
    /**
     * The initializer lifecycle implementation. Modifies the host widget's
     * render to add navigation controls.
     *
     * @method initializer
     * @param {Object} config The user configuration for the plugin
     */
    initializer: function () {
        
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "initializer", 46);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 48);
var host = this.get('host');
        
        // re-render week numbers every time we re-render a calendar pane
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 51);
this._rerenderHandle = this.beforeHostMethod('_rerenderCalendarPane', this._rerenderWeekNumbers);
        
        // render week numbers after the first rendering
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 54);
if (!host.get('rendered')) {
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 56);
this.afterHostMethod('renderUI', function () {
                _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 2)", 56);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 57);
host.get('boundingBox').addClass('yui3-calendar-with-week-numbers');
                _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 58);
this._initWeekNumbers();
                _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 59);
host._afterDateChange();
            });
            
        } else {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 63);
host.get('boundingBox').addClass('yui3-calendar-with-week-numbers');
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 64);
this._initWeekNumbers();
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 65);
host._afterDateChange();
        }
        
    },
    
    /**
     * The initializer destructor implementation. Responsible for destroying the initialized
     * control mechanisms.
     *
     * @method destructor
     */
    destructor : function () {
        
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "destructor", 76);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 78);
this._rerenderHandle.detach();
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 80);
if (this.get('host').get('rendered')) {
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 82);
var host = this.get('host'),
                calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 85);
calendarPanes.each(function (pane) {
                _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 3)", 85);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 86);
pane.all('.yui3-calendar-week-number-spacer').remove();
                _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 87);
pane.all('.yui3-calendar-week-number').remove();
            });
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 90);
host.get('boundingBox').removeClass('yui3-calendar-with-week-numbers');
        }
    },
    
    _initWeekNumbers: function () {
        
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "_initWeekNumbers", 94);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 96);
var host = this.get('host'),
            calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 99);
calendarPanes.each(function (pane) {
            _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 4)", 99);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 100);
pane.one('.yui3-calendar-weekdayrow').prepend(Y.Node.create('<th class="yui3-calendar-week-number-spacer"></th>'));
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 101);
pane.all('.yui3-calendar-row').each(function (row) {
                _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 5)", 101);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 102);
row.prepend('<th class="yui3-calendar-week-number"></th>');
            });
        });
        
    },
    
    _rerenderWeekNumbers: function (newDate, pane) {
        
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "_rerenderWeekNumbers", 108);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 110);
var plugin       = this,
            host         = plugin.get('host'),
            weekDayCells = pane.all(".yui3-calendar-week-number"),
            startDay     = host.get('strings.first_weekday'),
            workingDate  = newDate,
            preMonthDays, weekNumber, weekNumberStr;
            
        // some computation to get the first date displayed (maybe from previous month)
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 118);
preMonthDays = workingDate.getDay();
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 120);
if (startDay > 0) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 121);
preMonthDays -= startDay;
        }
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 124);
if (preMonthDays < 0) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 125);
preMonthDays += 7;
        }
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 128);
workingDate = Y.Date.addDays(workingDate, -preMonthDays);
        
        // Hide the pane before making DOM changes to speed them up
        // NOTE: will be made visible again by _rerenderCalendarPane
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 132);
pane.setStyle("visibility", "hidden");
        
        // iterate over weekDay cells to fill them
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 135);
weekDayCells.each(function () {
            
            _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 6)", 135);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 137);
weekNumber = plugin.getWeekNumber(workingDate, startDay, plugin.get('strings.week_one_jan_date'));
            
            // format week number on 2 chars
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 140);
weekNumberStr = (weekNumber < 10 ? "&nbsp;" : "") + weekNumber;
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 142);
this.set('innerHTML', weekNumberStr);
            
            // next date
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 145);
workingDate = Y.Date.addDays(workingDate, 7);
        });
        
    },
    
    
    /**
    * Calculates the week number for the given date. Can currently support standard
    * U.S. week numbers, based on Jan 1st defining the 1st week of the year, and
    * ISO8601 week numbers, based on Jan 4th defining the 1st week of the year.
    *
    * @method getWeekNumber
    * @param {Date} date The JavaScript date for which to find the week number
    * @param {Number} firstDayOfWeek The index of the first day of the week (0 = Sun, 1 = Mon ... 6 = Sat).
    * Defaults to 0
    * @param {Number} janDate The date in the first week of January which defines week one for the year
    * Defaults to the value of CalendarWeekNumber.WEEK_ONE_JAN_DATE, which is 1 (Jan 1st).
    * For the U.S, this is normally Jan 1st. ISO8601 uses Jan 4th to define the first week of the year.
    *
    * @return {Number} The number of the week containing the given date.
    */
    getWeekNumber: function (date, firstDayOfWeek, janDate) {
        
        // Setup Defaults
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "getWeekNumber", 166);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 169);
firstDayOfWeek = firstDayOfWeek || 0;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 170);
janDate = janDate || 1;
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 172);
var targetDate = this.clearTime(date),
            startOfWeek,
            endOfWeek;
            
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 176);
if (targetDate.getDay() === firstDayOfWeek) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 177);
startOfWeek = targetDate;
        } else {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 179);
startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);
        }
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 182);
var startYear = startOfWeek.getFullYear();
        
        // DST shouldn't be a problem here, math is quicker than setDate();
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 185);
endOfWeek = new Date(startOfWeek.getTime() + 6 * one_day_ms);
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 187);
var weekNum;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 188);
if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {
            // If years don't match, endOfWeek is in Jan. and if the
            // week has WEEK_ONE_JAN_DATE in it, it's week one by definition.
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 191);
weekNum = 1;
        } else {
            // Get the 1st day of the 1st week, and
            // find how many days away we are from it.
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 195);
var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),
                weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);
                
            // Round days to smoothen out 1 hr DST diff
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 199);
var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime()) / one_day_ms);
            
            // Calc. Full Weeks
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 202);
var rem = daysDiff % 7;
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 203);
var weeksDiff = (daysDiff - rem)/7;
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 204);
weekNum = weeksDiff + 1;
        }
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 206);
return weekNum;
    },
    
    /**
    * Clears the time fields from a given date, effectively setting the time to 12 noon.
    * @method clearTime
    * @param {Date} date The JavaScript Date for which the time fields will be cleared
    * @return {Date}  The JavaScript Date cleared of all time fields
    */
    clearTime: function (date) {
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "clearTime", 215);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 216);
date.setHours(12,0,0,0);
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 217);
return date;
    },
    
    /**
     * Returns a new JavaScript Date object, representing the given year, month and date. Time fields (hr, min, sec, ms) on the new Date object
     * are set to 0. The method allows Date instances to be created with the a year less than 100. "new Date(year, month, date)" implementations
     * set the year to 19xx if a year (xx) which is less than 100 is provided.
     * <p>
     * <em>NOTE:</em>Validation on argument values is not performed. It is the caller's responsibility to ensure
     * arguments are valid as per the ECMAScript-262 Date object specification for the new Date(year, month[, date]) constructor.
     * </p>
     * @method getDate
     * @param {Number} y Year.
     * @param {Number} m Month index from 0 (Jan) to 11 (Dec).
     * @param {Number} d (optional) Date from 1 to 31. If not provided, defaults to 1.
     * @return {Date} The JavaScript date object with year, month, date set as provided.
     */
    getDate: function (y, m, d) {
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "getDate", 234);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 235);
var dt = null;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 236);
if (typeof d === "undefined") {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 237);
d = 1;
        }
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 239);
if (y >= 100) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 240);
dt = new Date(y, m, d);
        } else {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 242);
dt = new Date();
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 243);
dt.setFullYear(y);
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 244);
dt.setMonth(m);
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 245);
dt.setDate(d);
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 246);
dt.setHours(0,0,0,0);
        }
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 248);
return dt;
    },
    
    /**
     * Get the first day of the week, for the give date.
     * @param {Date} dt The date in the week for which the first day is required.
     * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)
     * @return {Date} The first day of the week
     */
    getFirstDayOfWeek: function (dt, startOfWeek) {
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "getFirstDayOfWeek", 257);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 258);
startOfWeek = startOfWeek || 0;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 259);
var dayOfWeekIndex = dt.getDay(),
            dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;
            
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 262);
return Y.Date.addDays(dt, -dayOfWeek);
    }
    
});

_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 267);
Y.namespace("Plugin").CalendarWeekNumber = CalendarWeekNumber;

}, '@VERSION@', {"requires": ["plugin", "calendar", "datatype-date-math"], "skinnable": true, "lang": ["en", "fr"]});
