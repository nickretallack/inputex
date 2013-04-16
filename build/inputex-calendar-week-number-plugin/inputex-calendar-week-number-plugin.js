YUI.add('inputex-calendar-week-number-plugin', function (Y, NAME) {

// number representing one day, in milliseconds
var one_day_ms = 1000*60*60*24;

/**
 * A plugin class which adds week numbers to Calendar.
 *
 * @class CalendarWeekNumber
 * @extends Plugin.Base
 * @namespace Plugin
 */
function CalendarWeekNumber () {
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
CalendarWeekNumber.NS = "weekNumber";

CalendarWeekNumber.ATTRS = {
    strings: {
        valueFn: function () {
            return Y.Intl.get("inputex-calendar-week-number-plugin");
        }
    }
};


Y.extend(CalendarWeekNumber, Y.Plugin.Base, {
    
    /**
     * The initializer lifecycle implementation. Modifies the host widget's
     * render to add navigation controls.
     *
     * @method initializer
     * @param {Object} config The user configuration for the plugin
     */
    initializer: function () {
        
        var host = this.get('host');
        
        // re-render week numbers every time we re-render a calendar pane
        this._rerenderHandle = this.beforeHostMethod('_rerenderCalendarPane', this._rerenderWeekNumbers);
        
        // render week numbers after the first rendering
        if (!host.get('rendered')) {
            
            this.afterHostMethod('renderUI', function () {
                host.get('boundingBox').addClass('yui3-calendar-with-week-numbers');
                this._initWeekNumbers();
                host._afterDateChange();
            });
            
        } else {
            host.get('boundingBox').addClass('yui3-calendar-with-week-numbers');
            this._initWeekNumbers();
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
        
        this._rerenderHandle.detach();
        
        if (this.get('host').get('rendered')) {
            
            var host = this.get('host'),
                calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
            calendarPanes.each(function (pane) {
                pane.all('.yui3-calendar-week-number-spacer').remove();
                pane.all('.yui3-calendar-week-number').remove();
            });
            
            host.get('boundingBox').removeClass('yui3-calendar-with-week-numbers');
        }
    },
    
    _initWeekNumbers: function () {
        
        var host = this.get('host'),
            calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
        calendarPanes.each(function (pane) {
            pane.one('.yui3-calendar-weekdayrow').prepend(Y.Node.create('<th class="yui3-calendar-week-number-spacer"></th>'));
            pane.all('.yui3-calendar-row').each(function (row) {
                row.prepend('<th class="yui3-calendar-week-number"></th>');
            });
        });
        
    },
    
    _rerenderWeekNumbers: function (newDate, pane) {
        
        var plugin       = this,
            host         = plugin.get('host'),
            weekDayCells = pane.all(".yui3-calendar-week-number"),
            startDay     = host.get('strings.first_weekday'),
            workingDate  = newDate,
            preMonthDays, weekNumber, weekNumberStr;
            
        // some computation to get the first date displayed (maybe from previous month)
        preMonthDays = workingDate.getDay();
        
        if (startDay > 0) {
            preMonthDays -= startDay;
        }
        
        if (preMonthDays < 0) {
            preMonthDays += 7;
        }
        
        workingDate = Y.Date.addDays(workingDate, -preMonthDays);
        
        // Hide the pane before making DOM changes to speed them up
        // NOTE: will be made visible again by _rerenderCalendarPane
        pane.setStyle("visibility", "hidden");
        
        // iterate over weekDay cells to fill them
        weekDayCells.each(function () {
            
            weekNumber = plugin.getWeekNumber(workingDate, startDay, plugin.get('strings.week_one_jan_date'));
            
            // format week number on 2 chars
            weekNumberStr = (weekNumber < 10 ? "&nbsp;" : "") + weekNumber;
            
            this.set('innerHTML', weekNumberStr);
            
            // next date
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
        firstDayOfWeek = firstDayOfWeek || 0;
        janDate = janDate || 1;
        
        var targetDate = this.clearTime(date),
            startOfWeek,
            endOfWeek;
            
        if (targetDate.getDay() === firstDayOfWeek) {
            startOfWeek = targetDate;
        } else {
            startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);
        }
        
        var startYear = startOfWeek.getFullYear();
        
        // DST shouldn't be a problem here, math is quicker than setDate();
        endOfWeek = new Date(startOfWeek.getTime() + 6 * one_day_ms);
        
        var weekNum;
        if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {
            // If years don't match, endOfWeek is in Jan. and if the
            // week has WEEK_ONE_JAN_DATE in it, it's week one by definition.
            weekNum = 1;
        } else {
            // Get the 1st day of the 1st week, and
            // find how many days away we are from it.
            var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),
                weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);
                
            // Round days to smoothen out 1 hr DST diff
            var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime()) / one_day_ms);
            
            // Calc. Full Weeks
            var rem = daysDiff % 7;
            var weeksDiff = (daysDiff - rem)/7;
            weekNum = weeksDiff + 1;
        }
        return weekNum;
    },
    
    /**
    * Clears the time fields from a given date, effectively setting the time to 12 noon.
    * @method clearTime
    * @param {Date} date The JavaScript Date for which the time fields will be cleared
    * @return {Date}  The JavaScript Date cleared of all time fields
    */
    clearTime: function (date) {
        date.setHours(12,0,0,0);
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
        var dt = null;
        if (typeof d === "undefined") {
            d = 1;
        }
        if (y >= 100) {
            dt = new Date(y, m, d);
        } else {
            dt = new Date();
            dt.setFullYear(y);
            dt.setMonth(m);
            dt.setDate(d);
            dt.setHours(0,0,0,0);
        }
        return dt;
    },
    
    /**
     * Get the first day of the week, for the give date.
     * @param {Date} dt The date in the week for which the first day is required.
     * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)
     * @return {Date} The first day of the week
     */
    getFirstDayOfWeek: function (dt, startOfWeek) {
        startOfWeek = startOfWeek || 0;
        var dayOfWeekIndex = dt.getDay(),
            dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;
            
        return Y.Date.addDays(dt, -dayOfWeek);
    }
    
});

Y.namespace("Plugin").CalendarWeekNumber = CalendarWeekNumber;

}, '@VERSION@', {"requires": ["plugin", "calendar", "datatype-date-math"], "skinnable": true, "lang": ["en", "fr", "de"]});
