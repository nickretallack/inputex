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
_yuitest_coverage["build/inputex-base/inputex-base.js"].code=["YUI.add('inputex-base', function (Y, NAME) {","","/**"," * A widget-stdmod-level extension that provides ability to render a form within the body"," *"," * @module inputex-base"," */",""," YUI.add('inputex-base',function(Y){","","/**"," * The inputExBase class provides the hideOn attribute which can"," * be used to hide the widget when certain events occur."," *"," * @class inputEx.Base"," * @param {Object} config User configuration object"," */","function inputExBase(config) {","    Y.after(this._renderUIInputEx, this, 'renderUI');","","    Y.after(this._bindUIInputEx, this, 'bindUI');","","    if (this.get(\"rendered\")) {","        this._renderUIInputEx();","    }","}","","inputExBase.ATTRS = {","   ","   /**","    * inputEx json configuration","    *","    * @attribute inputEx","    * @type Object","    */","   inputEx: {","   },","   ","   ","   /**","    * Instantiated inputEx field (any type)","    * ","    * @attribute field","    * @type inputEx.Field","    */","   field: {","   }","};","","inputExBase.prototype = {","","   /**","    * @method _renderUIInputEx","    * @private","    */","   _renderUIInputEx: function() {","     var config = {};","     Y.mix(config, this.get('inputEx') );","     config.parentEl = this.get('contentBox');","     this.set('field', Y.inputEx(config));","   },","   ","   /**","    * @method _bindUIInputEx","    * @private","    */","   _bindUIInputEx: function() {","      // Closing all fields when the widget is hidden","      this.on('visibleChange', function(e) {","        if(e.newVal === false) {","          this.get('field').close();","        }","      }, this);","   }","","};","","","Y.inputEx.Base = inputExBase;","","","}, '3.1.0',{","  requires: ['inputex', 'base']","});","","","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-base/inputex-base.js"].lines = {"1":0,"9":0,"18":0,"19":0,"21":0,"23":0,"24":0,"28":0,"50":0,"57":0,"58":0,"59":0,"60":0,"69":0,"70":0,"71":0,"79":0};
_yuitest_coverage["build/inputex-base/inputex-base.js"].functions = {"inputExBase:18":0,"_renderUIInputEx:56":0,"(anonymous 3):69":0,"_bindUIInputEx:67":0,"(anonymous 2):9":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-base/inputex-base.js"].coveredLines = 17;
_yuitest_coverage["build/inputex-base/inputex-base.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-base/inputex-base.js", 1);
YUI.add('inputex-base', function (Y, NAME) {

/**
 * A widget-stdmod-level extension that provides ability to render a form within the body
 *
 * @module inputex-base
 */

 _yuitest_coverfunc("build/inputex-base/inputex-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-base/inputex-base.js", 9);
YUI.add('inputex-base',function(Y){

/**
 * The inputExBase class provides the hideOn attribute which can
 * be used to hide the widget when certain events occur.
 *
 * @class inputEx.Base
 * @param {Object} config User configuration object
 */
_yuitest_coverfunc("build/inputex-base/inputex-base.js", "(anonymous 2)", 9);
_yuitest_coverline("build/inputex-base/inputex-base.js", 18);
function inputExBase(config) {
    _yuitest_coverfunc("build/inputex-base/inputex-base.js", "inputExBase", 18);
_yuitest_coverline("build/inputex-base/inputex-base.js", 19);
Y.after(this._renderUIInputEx, this, 'renderUI');

    _yuitest_coverline("build/inputex-base/inputex-base.js", 21);
Y.after(this._bindUIInputEx, this, 'bindUI');

    _yuitest_coverline("build/inputex-base/inputex-base.js", 23);
if (this.get("rendered")) {
        _yuitest_coverline("build/inputex-base/inputex-base.js", 24);
this._renderUIInputEx();
    }
}

_yuitest_coverline("build/inputex-base/inputex-base.js", 28);
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

_yuitest_coverline("build/inputex-base/inputex-base.js", 50);
inputExBase.prototype = {

   /**
    * @method _renderUIInputEx
    * @private
    */
   _renderUIInputEx: function() {
     _yuitest_coverfunc("build/inputex-base/inputex-base.js", "_renderUIInputEx", 56);
_yuitest_coverline("build/inputex-base/inputex-base.js", 57);
var config = {};
     _yuitest_coverline("build/inputex-base/inputex-base.js", 58);
Y.mix(config, this.get('inputEx') );
     _yuitest_coverline("build/inputex-base/inputex-base.js", 59);
config.parentEl = this.get('contentBox');
     _yuitest_coverline("build/inputex-base/inputex-base.js", 60);
this.set('field', Y.inputEx(config));
   },
   
   /**
    * @method _bindUIInputEx
    * @private
    */
   _bindUIInputEx: function() {
      // Closing all fields when the widget is hidden
      _yuitest_coverfunc("build/inputex-base/inputex-base.js", "_bindUIInputEx", 67);
_yuitest_coverline("build/inputex-base/inputex-base.js", 69);
this.on('visibleChange', function(e) {
        _yuitest_coverfunc("build/inputex-base/inputex-base.js", "(anonymous 3)", 69);
_yuitest_coverline("build/inputex-base/inputex-base.js", 70);
if(e.newVal === false) {
          _yuitest_coverline("build/inputex-base/inputex-base.js", 71);
this.get('field').close();
        }
      }, this);
   }

};


_yuitest_coverline("build/inputex-base/inputex-base.js", 79);
Y.inputEx.Base = inputExBase;


}, '3.1.0',{
  requires: ['inputex', 'base']
});




}, '@VERSION@');
