YUI.add('inputex-calendar-today-highlight-plugin', function (Y, NAME) {

/**
 * A plugin class which adds week numbers to Calendar.
 *
 * @class CalendarTodayHighlight
 * @extends Plugin.Base
 * @namespace Plugin
 */
function CalendarTodayHighlight() {
    CalendarTodayHighlight.superclass.constructor.apply(this, arguments);
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
CalendarTodayHighlight.NS = "todayHighlight";


Y.extend(CalendarTodayHighlight, Y.Plugin.Base, {
    
    /**
     * The initializer lifecycle implementation. Modifies the host widget's
     * render to add navigation controls.
     *
     * @method initializer
     * @param {Object} config The user configuration for the plugin
     */
    initializer: function () {
        
        var host = this.get('host');
        
        // re-add class every time we render custom rules
        this._handle = this.afterHostMethod('_renderCustomRules', this._addClassOnToday);
        
        // render week numbers after the first rendering
        if (!host.get('rendered')) {
            
            this.afterHostMethod('renderUI', function () {
                this._addClassOnToday();
            });
            
        } else {
            this._addClassOnToday();
        }
        
    },
    
    /**
     * The initializer destructor implementation. Responsible for destroying the initialized
     * control mechanisms.
     *
     * @method destructor
     */
    destructor: function () {
        
        this._handle.detach();
        
        if (this.get('host').get('rendered')) {
            
            var host = this.get('host'),
                calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
            calendarPanes.each(function (pane) {
                pane.all('.yui3-calendar-today').removeClass('yui3-calendar-today');
            });
        }
    },
    
    _addClassOnToday: function () {
        
        var host    = this.get('host'),
            paneNum = 0,
            today   = new Date(),
            month   = today.getMonth(),
            year    = today.getFullYear(),
            paneDate, todayNode;
            
        host.get("contentBox").all(".yui3-calendar-today").removeClass('yui3-calendar-today');
        
        for (paneNum = 0; paneNum < host._paneNumber; paneNum++) {
            
            paneDate = Y.Date.addMonths(host.get("date"), paneNum);
            
            if (paneDate.getMonth() === month && paneDate.getFullYear() === year) {
                
                todayNode = host._dateToNode(today);
                
                todayNode.addClass('yui3-calendar-today');
                
                break; // only one active today cell at a time
            }
            
        }
        
    }
    
});

Y.namespace("Plugin").CalendarTodayHighlight = CalendarTodayHighlight;

}, '@VERSION@', {"requires": ["plugin", "calendar", "datatype-date-math"], "skinnable": true});
