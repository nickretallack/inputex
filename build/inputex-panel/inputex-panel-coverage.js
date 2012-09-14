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
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].code=["YUI.add('inputex-panel', function (Y, NAME) {","","","/**"," * Provides a Panel widget, a widget that mimics the functionality of a regular OS window."," * Comes with Standard Module support, XY Positioning, Alignment Support, Stack (z-index) support,"," * modality, auto-focus and auto-hide functionality, and header/footer button support."," *"," * @module inputex-panel"," */","YUI.add('inputex-panel', function (Y) {","","    /**","     * A basic Panel Widget, with added support from inputEx.Base","     *","     * @class inputEx.Panel","     * @constructor","     * @extends Panel","     * @uses inputEx.Base","     * @param {Object} object The user configuration for the instance.","     */","    Y.inputEx.Panel = Y.Base.create(\"panel\", Y.Panel, [Y.inputEx.Base], {","        /**","         * Hide the panel","         * (Must overide because the favicon on the UrlField stay do not desappear) ","         *","         * @method hide","         */","        hide: function () {","            Y.inputEx.Panel.superclass.hide.apply(this, arguments);","            this.get(\"field\").hide();","","        },","        /**","         * Show the panel","         *","         * @method show","         */","        show: function () {","            Y.inputEx.Panel.superclass.show.apply(this, arguments);","            this.get(\"field\").show();","","        }","    });","","}, '3.1.0', {","    requires: ['inputex', 'panel', 'inputex-base']","});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].lines = {"1":0,"11":0,"22":0,"30":0,"31":0,"40":0,"41":0};
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].functions = {"hide:29":0,"show:39":0,"(anonymous 2):11":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].coveredLines = 7;
_yuitest_coverage["build/inputex-panel/inputex-panel.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 1);
YUI.add('inputex-panel', function (Y, NAME) {


/**
 * Provides a Panel widget, a widget that mimics the functionality of a regular OS window.
 * Comes with Standard Module support, XY Positioning, Alignment Support, Stack (z-index) support,
 * modality, auto-focus and auto-hide functionality, and header/footer button support.
 *
 * @module inputex-panel
 */
_yuitest_coverfunc("build/inputex-panel/inputex-panel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 11);
YUI.add('inputex-panel', function (Y) {

    /**
     * A basic Panel Widget, with added support from inputEx.Base
     *
     * @class inputEx.Panel
     * @constructor
     * @extends Panel
     * @uses inputEx.Base
     * @param {Object} object The user configuration for the instance.
     */
    _yuitest_coverfunc("build/inputex-panel/inputex-panel.js", "(anonymous 2)", 11);
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 22);
Y.inputEx.Panel = Y.Base.create("panel", Y.Panel, [Y.inputEx.Base], {
        /**
         * Hide the panel
         * (Must overide because the favicon on the UrlField stay do not desappear) 
         *
         * @method hide
         */
        hide: function () {
            _yuitest_coverfunc("build/inputex-panel/inputex-panel.js", "hide", 29);
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 30);
Y.inputEx.Panel.superclass.hide.apply(this, arguments);
            _yuitest_coverline("build/inputex-panel/inputex-panel.js", 31);
this.get("field").hide();

        },
        /**
         * Show the panel
         *
         * @method show
         */
        show: function () {
            _yuitest_coverfunc("build/inputex-panel/inputex-panel.js", "show", 39);
_yuitest_coverline("build/inputex-panel/inputex-panel.js", 40);
Y.inputEx.Panel.superclass.show.apply(this, arguments);
            _yuitest_coverline("build/inputex-panel/inputex-panel.js", 41);
this.get("field").show();

        }
    });

}, '3.1.0', {
    requires: ['inputex', 'panel', 'inputex-base']
});

}, '@VERSION@');
