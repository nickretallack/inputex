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
_yuitest_coverage["build/inputex-integer/inputex-integer.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-integer/inputex-integer.js",
    code: []
};
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].code=["YUI.add('inputex-integer', function (Y, NAME) {","","/**"," * @module inputex-integer"," */","YUI.add(\"inputex-integer\", function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * A field limited to number inputs"," * @class inputEx.IntegerField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>negative: boolean indicating if we accept negative numbers</li>"," * </ul>"," */","inputEx.IntegerField = function(options) {","   inputEx.IntegerField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.IntegerField, inputEx.StringField, {","   /**","    * Adds the negative, min, and max options","    * @method setOptions","    * @param {Object} options","    */","   setOptions: function(options) {","      inputEx.IntegerField.superclass.setOptions.call(this, options);","      ","      this.options.negative = lang.isUndefined(options.negative) ? false : options.negative;","      this.options.min = lang.isUndefined(options.min) ? (this.options.negative ? -Infinity : 0) : parseInt(options.min,10);","      this.options.max = lang.isUndefined(options.max) ? Infinity : parseInt(options.max,10);","   },","   ","   /**","    * Get the value","    * @method getValue","    * @return {int} The integer value","    */","   getValue: function() {","      ","      var str_value;","      ","      // StringField getValue (handles typeInvite and trim options)","      str_value = inputEx.IntegerField.superclass.getValue.call(this);","      ","      // don't return NaN if empty field","      if (str_value === '') {","         return '';","      }","      ","      return parseInt(str_value, 10);","   },","   ","   /**","    * Validate  if is a number","    * @method validate","    */","   validate: function() {","      ","      var v = this.getValue(), str_value = inputEx.IntegerField.superclass.getValue.call(this);","      ","      // empty field","      if (v === '') {","         // validate only if not required","         return !this.options.required;","      }","      ","      if (isNaN(v)) {","         return false;","      }","      ","      return !!str_value.match(/^[\\+\\-]?[0-9]+$/) && (this.options.negative ? true : v >= 0) && v >= this.options.min && v <= this.options.max;","      ","   }","   ","});","","// Register this class as \"integer\" type","inputEx.registerType(\"integer\", inputEx.IntegerField, [","   //{ type: 'integer', label: 'Radix', name: 'radix', value: 10},","   {type: 'boolean', label: 'Accept negative', name: 'negative', value: false }","]);","","}, '3.1.0',{","requires: ['inputex-string']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"25":0,"32":0,"34":0,"35":0,"36":0,"46":0,"49":0,"52":0,"53":0,"56":0,"65":0,"68":0,"70":0,"73":0,"74":0,"77":0,"84":0};
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].functions = {"IntegerField:21":0,"setOptions:31":0,"getValue:44":0,"validate:63":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].coveredLines = 22;
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 1);
YUI.add('inputex-integer', function (Y, NAME) {

/**
 * @module inputex-integer
 */
_yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 6);
YUI.add("inputex-integer", function(Y){

   _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * A field limited to number inputs
 * @class inputEx.IntegerField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>negative: boolean indicating if we accept negative numbers</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 21);
inputEx.IntegerField = function(options) {
   _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "IntegerField", 21);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 22);
inputEx.IntegerField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-integer/inputex-integer.js", 25);
Y.extend(inputEx.IntegerField, inputEx.StringField, {
   /**
    * Adds the negative, min, and max options
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "setOptions", 31);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 32);
inputEx.IntegerField.superclass.setOptions.call(this, options);
      
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 34);
this.options.negative = lang.isUndefined(options.negative) ? false : options.negative;
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 35);
this.options.min = lang.isUndefined(options.min) ? (this.options.negative ? -Infinity : 0) : parseInt(options.min,10);
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 36);
this.options.max = lang.isUndefined(options.max) ? Infinity : parseInt(options.max,10);
   },
   
   /**
    * Get the value
    * @method getValue
    * @return {int} The integer value
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "getValue", 44);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 46);
var str_value;
      
      // StringField getValue (handles typeInvite and trim options)
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 49);
str_value = inputEx.IntegerField.superclass.getValue.call(this);
      
      // don't return NaN if empty field
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 52);
if (str_value === '') {
         _yuitest_coverline("build/inputex-integer/inputex-integer.js", 53);
return '';
      }
      
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 56);
return parseInt(str_value, 10);
   },
   
   /**
    * Validate  if is a number
    * @method validate
    */
   validate: function() {
      
      _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "validate", 63);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 65);
var v = this.getValue(), str_value = inputEx.IntegerField.superclass.getValue.call(this);
      
      // empty field
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 68);
if (v === '') {
         // validate only if not required
         _yuitest_coverline("build/inputex-integer/inputex-integer.js", 70);
return !this.options.required;
      }
      
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 73);
if (isNaN(v)) {
         _yuitest_coverline("build/inputex-integer/inputex-integer.js", 74);
return false;
      }
      
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 77);
return !!str_value.match(/^[\+\-]?[0-9]+$/) && (this.options.negative ? true : v >= 0) && v >= this.options.min && v <= this.options.max;
      
   }
   
});

// Register this class as "integer" type
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 84);
inputEx.registerType("integer", inputEx.IntegerField, [
   //{ type: 'integer', label: 'Radix', name: 'radix', value: 10},
   {type: 'boolean', label: 'Accept negative', name: 'negative', value: false }
]);

}, '3.1.0',{
requires: ['inputex-string']
});


}, '@VERSION@');
