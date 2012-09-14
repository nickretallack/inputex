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
_yuitest_coverage["build/inputex-panel/inputex-panel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-panel/inputex-panel.js",
    code: []
};
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].code=["YUI.add('inputex-panel', function (Y, NAME) {","","","/**"," * Provides a Panel widget, a widget that mimics the functionality of a regular OS window."," * Comes with Standard Module support, XY Positioning, Alignment Support, Stack (z-index) support,"," * modality, auto-focus and auto-hide functionality, and header/footer button support."," *"," * @module inputex-panel"," */","    /**","     * A basic Panel Widget, with added support from inputEx.Base","     *","     * @class inputEx.Panel","     * @constructor","     * @extends Panel","     * @uses inputEx.Base","     * @param {Object} object The user configuration for the instance.","     */","    Y.inputEx.Panel = Y.Base.create(\"panel\", Y.Panel, [Y.inputEx.Base], {","        /**","         * Hide the panel","         * (Must overide because the favicon on the UrlField stay do not desappear) ","         *","         * @method hide","         */","        hide: function () {","            Y.inputEx.Panel.superclass.hide.apply(this, arguments);","            this.get(\"field\").hide();","","        },","        /**","         * Show the panel","         *","         * @method show","         */","        show: function () {","            Y.inputEx.Panel.superclass.show.apply(this, arguments);","            this.get(\"field\").show();","","        }","    });","","","}, '@VERSION@', {\"requires\": [\"inputex\", \"panel\", \"inputex-base\"]});"];
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].lines = {"1":0,"20":0,"28":0,"29":0,"38":0,"39":0};
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].functions = {"hide:27":0,"show:37":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].coveredLines = 6;
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].coveredFunctions = 3;
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 1);
YUI.add('inputex-panel', function (Y, NAME) {


/**
 * Provides a Panel widget, a widget that mimics the functionality of a regular OS window.
 * Comes with Standard Module support, XY Positioning, Alignment Support, Stack (z-index) support,
 * modality, auto-focus and auto-hide functionality, and header/footer button support.
 *
 * @module inputex-panel
 */
    /**
     * A basic Panel Widget, with added support from inputEx.Base
     *
     * @class inputEx.Panel
     * @constructor
     * @extends Panel
     * @uses inputEx.Base
     * @param {Object} object The user configuration for the instance.
     */
    _yuitest_coverfunc("build/inputex-panel/inputex-panel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 20);
Y.inputEx.Panel = Y.Base.create("panel", Y.Panel, [Y.inputEx.Base], {
        /**
         * Hide the panel
         * (Must overide because the favicon on the UrlField stay do not desappear) 
         *
         * @method hide
         */
        hide: function () {
            _yuitest_coverfunc("build/inputex-panel/inputex-panel.js", "hide", 27);
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 28);
Y.inputEx.Panel.superclass.hide.apply(this, arguments);
            _yuitest_coverline("build/inputex-panel/inputex-panel.js", 29);
this.get("field").hide();

        },
        /**
         * Show the panel
         *
         * @method show
         */
        show: function () {
            _yuitest_coverfunc("build/inputex-panel/inputex-panel.js", "show", 37);
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 38);
Y.inputEx.Panel.superclass.show.apply(this, arguments);
            _yuitest_coverline("build/inputex-panel/inputex-panel.js", 39);
this.get("field").show();

        }
    });


}, '@VERSION@', {"requires": ["inputex", "panel", "inputex-base"]});
