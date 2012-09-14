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
_yuitest_coverage["build/inputex-number/inputex-number.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-number/inputex-number.js",
    code: []
};
_yuitest_coverage["build/inputex-number/inputex-number.js"].code=["YUI.add('inputex-number', function (Y, NAME) {","","/**"," * @module inputex-number"," */","YUI.add(\"inputex-number\", function(Y) {","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * A field limited to number inputs (floating)"," * @class inputEx.NumberField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.NumberField = function(options) {","   inputEx.NumberField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.NumberField, inputEx.StringField, {","   /**","    * Adds the min, and max options","    * @method setOptions","    * @param {Object} options","    */","   setOptions: function(options) {","      inputEx.NumberField.superclass.setOptions.call(this, options);","      ","      this.options.min = lang.isUndefined(options.min) ? -Infinity : parseFloat(options.min);","      this.options.max = lang.isUndefined(options.max) ? Infinity : parseFloat(options.max);","   },","   /**","    * Return a parsed float (javascript type number)","    * @method getValue","    * @return {Number} The parsed float","    */","   getValue: function() {","	","      var str_value;","      ","      // StringField getValue (handles typeInvite and trim options)","      str_value = inputEx.NumberField.superclass.getValue.call(this);","      ","      // don't return NaN if empty field","      if (str_value === '') {","         return '';","      }","      ","      return parseFloat(str_value);","   },","   ","   /**","    * Check if the entered number is a float","    * @method validate","    */","   validate: function() { ","      ","      var v = this.getValue(), str_value = inputEx.NumberField.superclass.getValue.call(this);","      ","      // empty field","      if (v === '') {","         // validate only if not required","         return !this.options.required;","      }","      ","      if (isNaN(v)) {","         return false;","      }","      ","      // We have to check the number with a regexp, otherwise \"0.03a\" is parsed to a valid number 0.03","      return !!str_value.match(/^([\\+\\-]?((([0-9]+(\\.)?)|([0-9]*\\.[0-9]+))([eE][+-]?[0-9]+)?))$/) && v >= this.options.min && v <= this.options.max;","      ","   }","","});","","// Register this class as \"number\" type","inputEx.registerType(\"number\", inputEx.NumberField, []);","","}, '3.1.0',{","requires: ['inputex-string']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-number/inputex-number.js"].lines = {"1":0,"6":0,"8":0,"18":0,"19":0,"22":0,"29":0,"31":0,"32":0,"41":0,"44":0,"47":0,"48":0,"51":0,"60":0,"63":0,"65":0,"68":0,"69":0,"73":0,"80":0};
_yuitest_coverage["build/inputex-number/inputex-number.js"].functions = {"NumberField:18":0,"setOptions:28":0,"getValue:39":0,"validate:58":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-number/inputex-number.js"].coveredLines = 21;
_yuitest_coverage["build/inputex-number/inputex-number.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-number/inputex-number.js", 1);
YUI.add('inputex-number', function (Y, NAME) {

/**
 * @module inputex-number
 */
_yuitest_coverfunc("build/inputex-number/inputex-number.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-number/inputex-number.js", 6);
YUI.add("inputex-number", function(Y) {

  _yuitest_coverfunc("build/inputex-number/inputex-number.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-number/inputex-number.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.NumberField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-number/inputex-number.js", 18);
inputEx.NumberField = function(options) {
   _yuitest_coverfunc("build/inputex-number/inputex-number.js", "NumberField", 18);
_yuitest_coverline("build/inputex-number/inputex-number.js", 19);
inputEx.NumberField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-number/inputex-number.js", 22);
Y.extend(inputEx.NumberField, inputEx.StringField, {
   /**
    * Adds the min, and max options
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-number/inputex-number.js", "setOptions", 28);
_yuitest_coverline("build/inputex-number/inputex-number.js", 29);
inputEx.NumberField.superclass.setOptions.call(this, options);
      
      _yuitest_coverline("build/inputex-number/inputex-number.js", 31);
this.options.min = lang.isUndefined(options.min) ? -Infinity : parseFloat(options.min);
      _yuitest_coverline("build/inputex-number/inputex-number.js", 32);
this.options.max = lang.isUndefined(options.max) ? Infinity : parseFloat(options.max);
   },
   /**
    * Return a parsed float (javascript type number)
    * @method getValue
    * @return {Number} The parsed float
    */
   getValue: function() {
	
      _yuitest_coverfunc("build/inputex-number/inputex-number.js", "getValue", 39);
_yuitest_coverline("build/inputex-number/inputex-number.js", 41);
var str_value;
      
      // StringField getValue (handles typeInvite and trim options)
      _yuitest_coverline("build/inputex-number/inputex-number.js", 44);
str_value = inputEx.NumberField.superclass.getValue.call(this);
      
      // don't return NaN if empty field
      _yuitest_coverline("build/inputex-number/inputex-number.js", 47);
if (str_value === '') {
         _yuitest_coverline("build/inputex-number/inputex-number.js", 48);
return '';
      }
      
      _yuitest_coverline("build/inputex-number/inputex-number.js", 51);
return parseFloat(str_value);
   },
   
   /**
    * Check if the entered number is a float
    * @method validate
    */
   validate: function() { 
      
      _yuitest_coverfunc("build/inputex-number/inputex-number.js", "validate", 58);
_yuitest_coverline("build/inputex-number/inputex-number.js", 60);
var v = this.getValue(), str_value = inputEx.NumberField.superclass.getValue.call(this);
      
      // empty field
      _yuitest_coverline("build/inputex-number/inputex-number.js", 63);
if (v === '') {
         // validate only if not required
         _yuitest_coverline("build/inputex-number/inputex-number.js", 65);
return !this.options.required;
      }
      
      _yuitest_coverline("build/inputex-number/inputex-number.js", 68);
if (isNaN(v)) {
         _yuitest_coverline("build/inputex-number/inputex-number.js", 69);
return false;
      }
      
      // We have to check the number with a regexp, otherwise "0.03a" is parsed to a valid number 0.03
      _yuitest_coverline("build/inputex-number/inputex-number.js", 73);
return !!str_value.match(/^([\+\-]?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+-]?[0-9]+)?))$/) && v >= this.options.min && v <= this.options.max;
      
   }

});

// Register this class as "number" type
_yuitest_coverline("build/inputex-number/inputex-number.js", 80);
inputEx.registerType("number", inputEx.NumberField, []);

}, '3.1.0',{
requires: ['inputex-string']
});


}, '@VERSION@');
