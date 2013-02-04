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
_yuitest_coverage["build/inputex-base/inputex-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-base/inputex-base.js",
    code: []
};
_yuitest_coverage["build/inputex-base/inputex-base.js"].code=["YUI.add('inputex-base', function (Y, NAME) {","","/**"," * A widget-stdmod-level extension that provides ability to render a form within the body"," *"," * @module inputex-base"," */","","/**"," * The inputExBase class provides the hideOn attribute which can"," * be used to hide the widget when certain events occur."," *"," * @class inputEx.Base"," * @param {Object} config User configuration object"," */","function inputExBase(config) {","    Y.after(this._renderUIInputEx, this, 'renderUI');","","    Y.after(this._bindUIInputEx, this, 'bindUI');","","    if (this.get(\"rendered\")) {","        this._renderUIInputEx();","    }","}","","inputExBase.ATTRS = {","   ","   /**","    * inputEx json configuration","    *","    * @attribute inputEx","    * @type Object","    */","   inputEx: {","   },","   ","   ","   /**","    * Instantiated inputEx field (any type)","    *","    * @attribute field","    * @type inputEx.Field","    */","   field: {","   }","};","","inputExBase.prototype = {","","   /**","    * @method _renderUIInputEx","    * @private","    */","   _renderUIInputEx: function() {","      var field = Y.inputEx(this.get('inputEx') || {});","      this.setStdModContent('body', field.getEl(), 'after');","      this.set('field',field);","   },","   ","   /**","    * @method _bindUIInputEx","    * @private","    */","   _bindUIInputEx: function() {","      // Closing all fields when the widget is hidden","      this.on('visibleChange', function(e) {","        if(e.newVal === false) {","          this.get('field').close();","        }","      }, this);","   }","","};","","","Y.inputEx.Base = inputExBase;","","","}, '@VERSION@', {\"requires\": [\"inputex\", \"widget\", \"widget-stdmod\"]});"];
_yuitest_coverage["build/inputex-base/inputex-base.js"].lines = {"1":0,"16":0,"17":0,"19":0,"21":0,"22":0,"26":0,"48":0,"55":0,"56":0,"57":0,"66":0,"67":0,"68":0,"76":0};
_yuitest_coverage["build/inputex-base/inputex-base.js"].functions = {"inputExBase:16":0,"_renderUIInputEx:54":0,"(anonymous 2):66":0,"_bindUIInputEx:64":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-base/inputex-base.js"].coveredLines = 15;
_yuitest_coverage["build/inputex-base/inputex-base.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-base/inputex-base.js", 1);
YUI.add('inputex-base', function (Y, NAME) {

/**
 * A widget-stdmod-level extension that provides ability to render a form within the body
 *
 * @module inputex-base
 */

/**
 * The inputExBase class provides the hideOn attribute which can
 * be used to hide the widget when certain events occur.
 *
 * @class inputEx.Base
 * @param {Object} config User configuration object
 */
_yuitest_coverfunc("build/inputex-base/inputex-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-base/inputex-base.js", 16);
function inputExBase(config) {
    _yuitest_coverfunc("build/inputex-base/inputex-base.js", "inputExBase", 16);
_yuitest_coverline("build/inputex-base/inputex-base.js", 17);
Y.after(this._renderUIInputEx, this, 'renderUI');

    _yuitest_coverline("build/inputex-base/inputex-base.js", 19);
Y.after(this._bindUIInputEx, this, 'bindUI');

    _yuitest_coverline("build/inputex-base/inputex-base.js", 21);
if (this.get("rendered")) {
        _yuitest_coverline("build/inputex-base/inputex-base.js", 22);
this._renderUIInputEx();
    }
}

_yuitest_coverline("build/inputex-base/inputex-base.js", 26);
inputExBase.ATTRS = {
   
   /**
    * inputEx json configuration
    *
    * @attribute inputEx
    * @type Object
    */
   inputEx: {
   },
   
   
   /**
    * Instantiated inputEx field (any type)
    *
    * @attribute field
    * @type inputEx.Field
    */
   field: {
   }
};

_yuitest_coverline("build/inputex-base/inputex-base.js", 48);
inputExBase.prototype = {

   /**
    * @method _renderUIInputEx
    * @private
    */
   _renderUIInputEx: function() {
      _yuitest_coverfunc("build/inputex-base/inputex-base.js", "_renderUIInputEx", 54);
_yuitest_coverline("build/inputex-base/inputex-base.js", 55);
var field = Y.inputEx(this.get('inputEx') || {});
      _yuitest_coverline("build/inputex-base/inputex-base.js", 56);
this.setStdModContent('body', field.getEl(), 'after');
      _yuitest_coverline("build/inputex-base/inputex-base.js", 57);
this.set('field',field);
   },
   
   /**
    * @method _bindUIInputEx
    * @private
    */
   _bindUIInputEx: function() {
      // Closing all fields when the widget is hidden
      _yuitest_coverfunc("build/inputex-base/inputex-base.js", "_bindUIInputEx", 64);
_yuitest_coverline("build/inputex-base/inputex-base.js", 66);
this.on('visibleChange', function(e) {
        _yuitest_coverfunc("build/inputex-base/inputex-base.js", "(anonymous 2)", 66);
_yuitest_coverline("build/inputex-base/inputex-base.js", 67);
if(e.newVal === false) {
          _yuitest_coverline("build/inputex-base/inputex-base.js", 68);
this.get('field').close();
        }
      }, this);
   }

};


_yuitest_coverline("build/inputex-base/inputex-base.js", 76);
Y.inputEx.Base = inputExBase;


}, '@VERSION@', {"requires": ["inputex", "widget", "widget-stdmod"]});
