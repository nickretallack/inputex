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
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].code=["YUI.add('inputex-calendar-week-number-plugin', function (Y, NAME) {","","// number representing one day, in milliseconds","var one_day_ms = 1000*60*60*24;","","/**"," * A plugin class which adds week numbers to Calendar."," *"," * @class CalendarWeekNumber"," * @extends Plugin.Base"," * @namespace Plugin"," */","function CalendarWeekNumber () {","    CalendarWeekNumber.superclass.constructor.apply(this, arguments);","}","","/**"," * The namespace for the plugin. This will be the property on the widget, which will"," * reference the plugin instance, when it's plugged in."," *"," * @property NS"," * @static"," * @type String"," * @default \"week_number\""," */","CalendarWeekNumber.NS = \"weekNumber\";","","CalendarWeekNumber.ATTRS = {","    strings: {","        valueFn: function () {","            return Y.Intl.get(\"inputex-calendar-week-number-plugin\");","        }","    }","};","","","Y.extend(CalendarWeekNumber, Y.Plugin.Base, {","    ","    /**","     * The initializer lifecycle implementation. Modifies the host widget's","     * render to add navigation controls.","     *","     * @method initializer","     * @param {Object} config The user configuration for the plugin","     */","    initializer: function () {","        ","        var host = this.get('host');","        ","        // re-render week numbers every time we re-render a calendar pane","        this._rerenderHandle = this.beforeHostMethod('_rerenderCalendarPane', this._rerenderWeekNumbers);","        ","        // render week numbers after the first rendering","        if (!host.get('rendered')) {","            ","            this.afterHostMethod('renderUI', function () {","                this._initWeekNumbers();","                host._afterDateChange();","            });","            ","        } else {","            this._initWeekNumbers();","            host._afterDateChange();","        }","        ","    },","    ","    /**","     * The initializer destructor implementation. Responsible for destroying the initialized","     * control mechanisms.","     *","     * @method destructor","     */","    destructor : function () {","        ","        this._rerenderHandle.detach();","        ","        if (this.get('host').get('rendered')) {","            ","            var host = this.get('host'),","                calendarPanes = host.get('contentBox').all(\".yui3-calendar-grid\");","            ","            calendarPanes.each(function (pane) {","                pane.all('.yui3-calendar-week-number-spacer').remove();","                pane.all('.yui3-calendar-week-number').remove();","            });","        }","    },","    ","    _initWeekNumbers: function () {","        ","        var host = this.get('host'),","            calendarPanes = host.get('contentBox').all(\".yui3-calendar-grid\");","            ","        calendarPanes.each(function (pane) {","            pane.one('.yui3-calendar-weekdayrow').prepend(Y.Node.create('<th class=\"yui3-calendar-week-number-spacer\"></th>'));","            pane.all('.yui3-calendar-row').each(function (row) {","                row.prepend('<th class=\"yui3-calendar-week-number\"></th>');","            });","        });","        ","    },","    ","    _rerenderWeekNumbers: function (newDate, pane) {","        ","        var plugin       = this,","            host         = plugin.get('host'),","            weekDayCells = pane.all(\".yui3-calendar-week-number\"),","            startDay     = host.get('strings.first_weekday'),","            workingDate  = newDate,","            preMonthDays, weekNumber, weekNumberStr;","            ","        // some computation to get the first date displayed (maybe from previous month)","        preMonthDays = workingDate.getDay();","        ","        if (startDay > 0) {","            preMonthDays -= startDay;","        }","        ","        if (preMonthDays < 0) {","            preMonthDays += 7;","        }","        ","        workingDate = Y.Date.addDays(workingDate, -preMonthDays);","        ","        // Hide the pane before making DOM changes to speed them up","        // NOTE: will be made visible again by _rerenderCalendarPane","        pane.setStyle(\"visibility\", \"hidden\");","        ","        // iterate over weekDay cells to fill them","        weekDayCells.each(function () {","            ","            weekNumber = plugin.getWeekNumber(workingDate, startDay, plugin.get('strings.week_one_jan_date'));","            ","            // format week number on 2 chars","            weekNumberStr = (weekNumber < 10 ? \"&nbsp;\" : \"\") + weekNumber;","            ","            this.set('innerHTML', weekNumberStr);","            ","            // next date","            workingDate = Y.Date.addDays(workingDate, 7);","        });","        ","    },","    ","    ","    /**","    * Calculates the week number for the given date. Can currently support standard","    * U.S. week numbers, based on Jan 1st defining the 1st week of the year, and","    * ISO8601 week numbers, based on Jan 4th defining the 1st week of the year.","    *","    * @method getWeekNumber","    * @param {Date} date The JavaScript date for which to find the week number","    * @param {Number} firstDayOfWeek The index of the first day of the week (0 = Sun, 1 = Mon ... 6 = Sat).","    * Defaults to 0","    * @param {Number} janDate The date in the first week of January which defines week one for the year","    * Defaults to the value of CalendarWeekNumber.WEEK_ONE_JAN_DATE, which is 1 (Jan 1st).","    * For the U.S, this is normally Jan 1st. ISO8601 uses Jan 4th to define the first week of the year.","    *","    * @return {Number} The number of the week containing the given date.","    */","    getWeekNumber: function (date, firstDayOfWeek, janDate) {","        ","        // Setup Defaults","        firstDayOfWeek = firstDayOfWeek || 0;","        janDate = janDate || 1;","        ","        var targetDate = this.clearTime(date),","            startOfWeek,","            endOfWeek;","            ","        if (targetDate.getDay() === firstDayOfWeek) {","            startOfWeek = targetDate;","        } else {","            startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);","        }","        ","        var startYear = startOfWeek.getFullYear();","        ","        // DST shouldn't be a problem here, math is quicker than setDate();","        endOfWeek = new Date(startOfWeek.getTime() + 6 * one_day_ms);","        ","        var weekNum;","        if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {","            // If years don't match, endOfWeek is in Jan. and if the","            // week has WEEK_ONE_JAN_DATE in it, it's week one by definition.","            weekNum = 1;","        } else {","            // Get the 1st day of the 1st week, and","            // find how many days away we are from it.","            var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),","                weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);","                ","            // Round days to smoothen out 1 hr DST diff","            var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime()) / one_day_ms);","            ","            // Calc. Full Weeks","            var rem = daysDiff % 7;","            var weeksDiff = (daysDiff - rem)/7;","            weekNum = weeksDiff + 1;","        }","        return weekNum;","    },","    ","    /**","    * Clears the time fields from a given date, effectively setting the time to 12 noon.","    * @method clearTime","    * @param {Date} date The JavaScript Date for which the time fields will be cleared","    * @return {Date}  The JavaScript Date cleared of all time fields","    */","    clearTime: function (date) {","        date.setHours(12,0,0,0);","        return date;","    },","    ","    /**","     * Returns a new JavaScript Date object, representing the given year, month and date. Time fields (hr, min, sec, ms) on the new Date object","     * are set to 0. The method allows Date instances to be created with the a year less than 100. \"new Date(year, month, date)\" implementations","     * set the year to 19xx if a year (xx) which is less than 100 is provided.","     * <p>","     * <em>NOTE:</em>Validation on argument values is not performed. It is the caller's responsibility to ensure","     * arguments are valid as per the ECMAScript-262 Date object specification for the new Date(year, month[, date]) constructor.","     * </p>","     * @method getDate","     * @param {Number} y Year.","     * @param {Number} m Month index from 0 (Jan) to 11 (Dec).","     * @param {Number} d (optional) Date from 1 to 31. If not provided, defaults to 1.","     * @return {Date} The JavaScript date object with year, month, date set as provided.","     */","    getDate: function (y, m, d) {","        var dt = null;","        if (typeof d === \"undefined\") {","            d = 1;","        }","        if (y >= 100) {","            dt = new Date(y, m, d);","        } else {","            dt = new Date();","            dt.setFullYear(y);","            dt.setMonth(m);","            dt.setDate(d);","            dt.setHours(0,0,0,0);","        }","        return dt;","    },","    ","    /**","     * Get the first day of the week, for the give date.","     * @param {Date} dt The date in the week for which the first day is required.","     * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)","     * @return {Date} The first day of the week","     */","    getFirstDayOfWeek: function (dt, startOfWeek) {","        startOfWeek = startOfWeek || 0;","        var dayOfWeekIndex = dt.getDay(),","            dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;","            ","        return Y.Date.addDays(dt, -dayOfWeek);","    }","    ","});","","Y.namespace(\"Plugin\").CalendarWeekNumber = CalendarWeekNumber;","","}, '@VERSION@', {\"requires\": [\"plugin\", \"calendar\", \"datatype-date-math\"], \"skinnable\": true, \"lang\": [\"en\", \"fr\"]});"];
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].lines = {"1":0,"4":0,"13":0,"14":0,"26":0,"28":0,"31":0,"37":0,"48":0,"51":0,"54":0,"56":0,"57":0,"58":0,"62":0,"63":0,"76":0,"78":0,"80":0,"83":0,"84":0,"85":0,"92":0,"95":0,"96":0,"97":0,"98":0,"106":0,"114":0,"116":0,"117":0,"120":0,"121":0,"124":0,"128":0,"131":0,"133":0,"136":0,"138":0,"141":0,"165":0,"166":0,"168":0,"172":0,"173":0,"175":0,"178":0,"181":0,"183":0,"184":0,"187":0,"191":0,"195":0,"198":0,"199":0,"200":0,"202":0,"212":0,"213":0,"231":0,"232":0,"233":0,"235":0,"236":0,"238":0,"239":0,"240":0,"241":0,"242":0,"244":0,"254":0,"255":0,"258":0,"263":0};
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].functions = {"CalendarWeekNumber:13":0,"valueFn:30":0,"(anonymous 2):56":0,"initializer:46":0,"(anonymous 3):83":0,"destructor:74":0,"(anonymous 5):97":0,"(anonymous 4):95":0,"_initWeekNumbers:90":0,"(anonymous 6):131":0,"_rerenderWeekNumbers:104":0,"getWeekNumber:162":0,"clearTime:211":0,"getDate:230":0,"getFirstDayOfWeek:253":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js"].coveredLines = 74;
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
this._initWeekNumbers();
                _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 58);
host._afterDateChange();
            });
            
        } else {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 62);
this._initWeekNumbers();
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 63);
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
        
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "destructor", 74);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 76);
this._rerenderHandle.detach();
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 78);
if (this.get('host').get('rendered')) {
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 80);
var host = this.get('host'),
                calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 83);
calendarPanes.each(function (pane) {
                _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 3)", 83);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 84);
pane.all('.yui3-calendar-week-number-spacer').remove();
                _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 85);
pane.all('.yui3-calendar-week-number').remove();
            });
        }
    },
    
    _initWeekNumbers: function () {
        
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "_initWeekNumbers", 90);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 92);
var host = this.get('host'),
            calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 95);
calendarPanes.each(function (pane) {
            _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 4)", 95);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 96);
pane.one('.yui3-calendar-weekdayrow').prepend(Y.Node.create('<th class="yui3-calendar-week-number-spacer"></th>'));
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 97);
pane.all('.yui3-calendar-row').each(function (row) {
                _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 5)", 97);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 98);
row.prepend('<th class="yui3-calendar-week-number"></th>');
            });
        });
        
    },
    
    _rerenderWeekNumbers: function (newDate, pane) {
        
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "_rerenderWeekNumbers", 104);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 106);
var plugin       = this,
            host         = plugin.get('host'),
            weekDayCells = pane.all(".yui3-calendar-week-number"),
            startDay     = host.get('strings.first_weekday'),
            workingDate  = newDate,
            preMonthDays, weekNumber, weekNumberStr;
            
        // some computation to get the first date displayed (maybe from previous month)
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 114);
preMonthDays = workingDate.getDay();
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 116);
if (startDay > 0) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 117);
preMonthDays -= startDay;
        }
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 120);
if (preMonthDays < 0) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 121);
preMonthDays += 7;
        }
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 124);
workingDate = Y.Date.addDays(workingDate, -preMonthDays);
        
        // Hide the pane before making DOM changes to speed them up
        // NOTE: will be made visible again by _rerenderCalendarPane
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 128);
pane.setStyle("visibility", "hidden");
        
        // iterate over weekDay cells to fill them
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 131);
weekDayCells.each(function () {
            
            _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "(anonymous 6)", 131);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 133);
weekNumber = plugin.getWeekNumber(workingDate, startDay, plugin.get('strings.week_one_jan_date'));
            
            // format week number on 2 chars
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 136);
weekNumberStr = (weekNumber < 10 ? "&nbsp;" : "") + weekNumber;
            
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 138);
this.set('innerHTML', weekNumberStr);
            
            // next date
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 141);
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
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "getWeekNumber", 162);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 165);
firstDayOfWeek = firstDayOfWeek || 0;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 166);
janDate = janDate || 1;
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 168);
var targetDate = this.clearTime(date),
            startOfWeek,
            endOfWeek;
            
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 172);
if (targetDate.getDay() === firstDayOfWeek) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 173);
startOfWeek = targetDate;
        } else {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 175);
startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);
        }
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 178);
var startYear = startOfWeek.getFullYear();
        
        // DST shouldn't be a problem here, math is quicker than setDate();
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 181);
endOfWeek = new Date(startOfWeek.getTime() + 6 * one_day_ms);
        
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 183);
var weekNum;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 184);
if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {
            // If years don't match, endOfWeek is in Jan. and if the
            // week has WEEK_ONE_JAN_DATE in it, it's week one by definition.
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 187);
weekNum = 1;
        } else {
            // Get the 1st day of the 1st week, and
            // find how many days away we are from it.
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 191);
var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),
                weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);
                
            // Round days to smoothen out 1 hr DST diff
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 195);
var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime()) / one_day_ms);
            
            // Calc. Full Weeks
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 198);
var rem = daysDiff % 7;
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 199);
var weeksDiff = (daysDiff - rem)/7;
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 200);
weekNum = weeksDiff + 1;
        }
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 202);
return weekNum;
    },
    
    /**
    * Clears the time fields from a given date, effectively setting the time to 12 noon.
    * @method clearTime
    * @param {Date} date The JavaScript Date for which the time fields will be cleared
    * @return {Date}  The JavaScript Date cleared of all time fields
    */
    clearTime: function (date) {
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "clearTime", 211);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 212);
date.setHours(12,0,0,0);
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 213);
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
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "getDate", 230);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 231);
var dt = null;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 232);
if (typeof d === "undefined") {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 233);
d = 1;
        }
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 235);
if (y >= 100) {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 236);
dt = new Date(y, m, d);
        } else {
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 238);
dt = new Date();
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 239);
dt.setFullYear(y);
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 240);
dt.setMonth(m);
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 241);
dt.setDate(d);
            _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 242);
dt.setHours(0,0,0,0);
        }
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 244);
return dt;
    },
    
    /**
     * Get the first day of the week, for the give date.
     * @param {Date} dt The date in the week for which the first day is required.
     * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)
     * @return {Date} The first day of the week
     */
    getFirstDayOfWeek: function (dt, startOfWeek) {
        _yuitest_coverfunc("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", "getFirstDayOfWeek", 253);
_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 254);
startOfWeek = startOfWeek || 0;
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 255);
var dayOfWeekIndex = dt.getDay(),
            dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;
            
        _yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 258);
return Y.Date.addDays(dt, -dayOfWeek);
    }
    
});

_yuitest_coverline("build/inputex-calendar-week-number-plugin/inputex-calendar-week-number-plugin.js", 263);
Y.namespace("Plugin").CalendarWeekNumber = CalendarWeekNumber;

}, '@VERSION@', {"requires": ["plugin", "calendar", "datatype-date-math"], "skinnable": true, "lang": ["en", "fr"]});
