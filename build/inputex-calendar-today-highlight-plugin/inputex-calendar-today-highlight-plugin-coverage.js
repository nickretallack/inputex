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
_yuitest_coverage["build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js",
    code: []
};
_yuitest_coverage["build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js"].code=["YUI.add('inputex-calendar-today-highlight-plugin', function (Y, NAME) {","","/**"," * A plugin class which adds week numbers to Calendar."," *"," * @class CalendarTodayHighlight"," * @extends Plugin.Base"," * @namespace Plugin"," */","function CalendarTodayHighlight() {","    CalendarTodayHighlight.superclass.constructor.apply(this, arguments);","}","","/**"," * The namespace for the plugin. This will be the property on the widget, which will"," * reference the plugin instance, when it's plugged in."," *"," * @property NS"," * @static"," * @type String"," * @default \"week_number\""," */","CalendarTodayHighlight.NS = \"todayHighlight\";","","","Y.extend(CalendarTodayHighlight, Y.Plugin.Base, {","    ","    /**","     * The initializer lifecycle implementation. Modifies the host widget's","     * render to add navigation controls.","     *","     * @method initializer","     * @param {Object} config The user configuration for the plugin","     */","    initializer: function () {","        ","        var host = this.get('host');","        ","        // re-add class every time we render custom rules","        this._handle = this.afterHostMethod('_renderCustomRules', this._addClassOnToday);","        ","        // render week numbers after the first rendering","        if (!host.get('rendered')) {","            ","            this.afterHostMethod('renderUI', function () {","                this._addClassOnToday();","            });","            ","        } else {","            this._addClassOnToday();","        }","        ","    },","    ","    /**","     * The initializer destructor implementation. Responsible for destroying the initialized","     * control mechanisms.","     *","     * @method destructor","     */","    destructor: function () {","        ","        this._handle.detach();","        ","        if (this.get('host').get('rendered')) {","            ","            var host = this.get('host'),","                calendarPanes = host.get('contentBox').all(\".yui3-calendar-grid\");","            ","            calendarPanes.each(function (pane) {","                pane.all('.yui3-calendar-today').removeClass('yui3-calendar-today');","            });","        }","    },","    ","    _addClassOnToday: function () {","        ","        var host    = this.get('host'),","            paneNum = 0,","            today   = new Date(),","            month   = today.getMonth(),","            year    = today.getFullYear(),","            paneDate, todayNode;","            ","        host.get(\"contentBox\").all(\".yui3-calendar-today\").removeClass('yui3-calendar-today');","        ","        for (paneNum = 0; paneNum < host._paneNumber; paneNum++) {","            ","            paneDate = Y.Date.addMonths(host.get(\"date\"), paneNum);","            ","            if (paneDate.getMonth() === month && paneDate.getFullYear() === year) {","                ","                todayNode = host._dateToNode(today);","                ","                todayNode.addClass('yui3-calendar-today');","                ","                break; // only one active today cell at a time","            }","            ","        }","        ","    }","    ","});","","Y.namespace(\"Plugin\").CalendarTodayHighlight = CalendarTodayHighlight;","","}, '@VERSION@', {\"requires\": [\"plugin\", \"calendar\", \"datatype-date-math\"], \"skinnable\": true});"];
_yuitest_coverage["build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js"].lines = {"1":0,"10":0,"11":0,"23":0,"26":0,"37":0,"40":0,"43":0,"45":0,"46":0,"50":0,"63":0,"65":0,"67":0,"70":0,"71":0,"78":0,"85":0,"87":0,"89":0,"91":0,"93":0,"95":0,"97":0,"106":0};
_yuitest_coverage["build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js"].functions = {"CalendarTodayHighlight:10":0,"(anonymous 2):45":0,"initializer:35":0,"(anonymous 3):70":0,"destructor:61":0,"_addClassOnToday:76":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js"].coveredLines = 25;
_yuitest_coverage["build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 1);
YUI.add('inputex-calendar-today-highlight-plugin', function (Y, NAME) {

/**
 * A plugin class which adds week numbers to Calendar.
 *
 * @class CalendarTodayHighlight
 * @extends Plugin.Base
 * @namespace Plugin
 */
_yuitest_coverfunc("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 10);
function CalendarTodayHighlight() {
    _yuitest_coverfunc("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", "CalendarTodayHighlight", 10);
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 11);
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
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 23);
CalendarTodayHighlight.NS = "todayHighlight";


_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 26);
Y.extend(CalendarTodayHighlight, Y.Plugin.Base, {
    
    /**
     * The initializer lifecycle implementation. Modifies the host widget's
     * render to add navigation controls.
     *
     * @method initializer
     * @param {Object} config The user configuration for the plugin
     */
    initializer: function () {
        
        _yuitest_coverfunc("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", "initializer", 35);
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 37);
var host = this.get('host');
        
        // re-add class every time we render custom rules
        _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 40);
this._handle = this.afterHostMethod('_renderCustomRules', this._addClassOnToday);
        
        // render week numbers after the first rendering
        _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 43);
if (!host.get('rendered')) {
            
            _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 45);
this.afterHostMethod('renderUI', function () {
                _yuitest_coverfunc("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", "(anonymous 2)", 45);
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 46);
this._addClassOnToday();
            });
            
        } else {
            _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 50);
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
        
        _yuitest_coverfunc("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", "destructor", 61);
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 63);
this._handle.detach();
        
        _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 65);
if (this.get('host').get('rendered')) {
            
            _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 67);
var host = this.get('host'),
                calendarPanes = host.get('contentBox').all(".yui3-calendar-grid");
            
            _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 70);
calendarPanes.each(function (pane) {
                _yuitest_coverfunc("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", "(anonymous 3)", 70);
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 71);
pane.all('.yui3-calendar-today').removeClass('yui3-calendar-today');
            });
        }
    },
    
    _addClassOnToday: function () {
        
        _yuitest_coverfunc("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", "_addClassOnToday", 76);
_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 78);
var host    = this.get('host'),
            paneNum = 0,
            today   = new Date(),
            month   = today.getMonth(),
            year    = today.getFullYear(),
            paneDate, todayNode;
            
        _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 85);
host.get("contentBox").all(".yui3-calendar-today").removeClass('yui3-calendar-today');
        
        _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 87);
for (paneNum = 0; paneNum < host._paneNumber; paneNum++) {
            
            _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 89);
paneDate = Y.Date.addMonths(host.get("date"), paneNum);
            
            _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 91);
if (paneDate.getMonth() === month && paneDate.getFullYear() === year) {
                
                _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 93);
todayNode = host._dateToNode(today);
                
                _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 95);
todayNode.addClass('yui3-calendar-today');
                
                _yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 97);
break; // only one active today cell at a time
            }
            
        }
        
    }
    
});

_yuitest_coverline("build/inputex-calendar-today-highlight-plugin/inputex-calendar-today-highlight-plugin.js", 106);
Y.namespace("Plugin").CalendarTodayHighlight = CalendarTodayHighlight;

}, '@VERSION@', {"requires": ["plugin", "calendar", "datatype-date-math"], "skinnable": true});
