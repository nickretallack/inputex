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
_yuitest_coverage["build/inputex-number/inputex-number.js"].code=["YUI.add('inputex-number', function (Y, NAME) {","","/**"," * @module inputex-number"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * A field limited to number inputs (floating)"," * @class inputEx.NumberField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.NumberField = function(options) {","   inputEx.NumberField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.NumberField, inputEx.StringField, {","   /**","    * Adds the min, and max options","    * @method setOptions","    * @param {Object} options","    */","   setOptions: function(options) {","      inputEx.NumberField.superclass.setOptions.call(this, options);","      ","      this.options.min = lang.isUndefined(options.min) ? -Infinity : parseFloat(options.min);","      this.options.max = lang.isUndefined(options.max) ? Infinity : parseFloat(options.max);","   },","   /**","    * Return a parsed float (javascript type number)","    * @method getValue","    * @return {Number} The parsed float","    */","   getValue: function() {","	","      var str_value;","      ","      // StringField getValue (handles typeInvite and trim options)","      str_value = inputEx.NumberField.superclass.getValue.call(this);","      ","      // don't return NaN if empty field","      if (str_value === '') {","         return '';","      }","      ","      return parseFloat(str_value);","   },","   ","   /**","    * Validate  if is a number","    * @method validate","    */","   validate: function() {","      ","      var str_valid = inputEx.NumberField.superclass.validate.call(this),","          str_value = inputEx.NumberField.superclass.getValue.call(this),","          value = this.getValue();","","      // superclass validation will handle inherited options (required, trim, minLength, a.s.o)","      if (!str_valid) {","         return false;","      }","      ","      // if non-required field is empty, no other validation to perform","      if (!this.options.required && this.isEmpty()) {","         return true;","      }","","      // also check the string has a valid format to describe a float number","      // (otherwise \"0.03a\" could be cast to a valid number 0.03)","      if (!str_value.match(/^([\\+\\-]?((([0-9]+(\\.)?)|([0-9]*\\.[0-9]+))([eE][+\\-]?[0-9]+)?))$/)) {","         return false;","      }","      ","      // finally, check the value could be cast as a float number and matches the restrictions","      return !isNaN(value) && value >= this.options.min && value <= this.options.max;","","   }","","});","","// Register this class as \"number\" type","inputEx.registerType(\"number\", inputEx.NumberField, []);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\"], \"ix_provides\": \"number\"});"];
_yuitest_coverage["build/inputex-number/inputex-number.js"].lines = {"1":0,"6":0,"16":0,"17":0,"20":0,"27":0,"29":0,"30":0,"39":0,"42":0,"45":0,"46":0,"49":0,"58":0,"63":0,"64":0,"68":0,"69":0,"74":0,"75":0,"79":0,"86":0};
_yuitest_coverage["build/inputex-number/inputex-number.js"].functions = {"NumberField:16":0,"setOptions:26":0,"getValue:37":0,"validate:56":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-number/inputex-number.js"].coveredLines = 22;
_yuitest_coverage["build/inputex-number/inputex-number.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-number/inputex-number.js", 1);
YUI.add('inputex-number', function (Y, NAME) {

/**
 * @module inputex-number
 */
  _yuitest_coverfunc("build/inputex-number/inputex-number.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-number/inputex-number.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.NumberField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-number/inputex-number.js", 16);
inputEx.NumberField = function(options) {
   _yuitest_coverfunc("build/inputex-number/inputex-number.js", "NumberField", 16);
_yuitest_coverline("build/inputex-number/inputex-number.js", 17);
inputEx.NumberField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-number/inputex-number.js", 20);
Y.extend(inputEx.NumberField, inputEx.StringField, {
   /**
    * Adds the min, and max options
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-number/inputex-number.js", "setOptions", 26);
_yuitest_coverline("build/inputex-number/inputex-number.js", 27);
inputEx.NumberField.superclass.setOptions.call(this, options);
      
      _yuitest_coverline("build/inputex-number/inputex-number.js", 29);
this.options.min = lang.isUndefined(options.min) ? -Infinity : parseFloat(options.min);
      _yuitest_coverline("build/inputex-number/inputex-number.js", 30);
this.options.max = lang.isUndefined(options.max) ? Infinity : parseFloat(options.max);
   },
   /**
    * Return a parsed float (javascript type number)
    * @method getValue
    * @return {Number} The parsed float
    */
   getValue: function() {
	
      _yuitest_coverfunc("build/inputex-number/inputex-number.js", "getValue", 37);
_yuitest_coverline("build/inputex-number/inputex-number.js", 39);
var str_value;
      
      // StringField getValue (handles typeInvite and trim options)
      _yuitest_coverline("build/inputex-number/inputex-number.js", 42);
str_value = inputEx.NumberField.superclass.getValue.call(this);
      
      // don't return NaN if empty field
      _yuitest_coverline("build/inputex-number/inputex-number.js", 45);
if (str_value === '') {
         _yuitest_coverline("build/inputex-number/inputex-number.js", 46);
return '';
      }
      
      _yuitest_coverline("build/inputex-number/inputex-number.js", 49);
return parseFloat(str_value);
   },
   
   /**
    * Validate  if is a number
    * @method validate
    */
   validate: function() {
      
      _yuitest_coverfunc("build/inputex-number/inputex-number.js", "validate", 56);
_yuitest_coverline("build/inputex-number/inputex-number.js", 58);
var str_valid = inputEx.NumberField.superclass.validate.call(this),
          str_value = inputEx.NumberField.superclass.getValue.call(this),
          value = this.getValue();

      // superclass validation will handle inherited options (required, trim, minLength, a.s.o)
      _yuitest_coverline("build/inputex-number/inputex-number.js", 63);
if (!str_valid) {
         _yuitest_coverline("build/inputex-number/inputex-number.js", 64);
return false;
      }
      
      // if non-required field is empty, no other validation to perform
      _yuitest_coverline("build/inputex-number/inputex-number.js", 68);
if (!this.options.required && this.isEmpty()) {
         _yuitest_coverline("build/inputex-number/inputex-number.js", 69);
return true;
      }

      // also check the string has a valid format to describe a float number
      // (otherwise "0.03a" could be cast to a valid number 0.03)
      _yuitest_coverline("build/inputex-number/inputex-number.js", 74);
if (!str_value.match(/^([\+\-]?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+\-]?[0-9]+)?))$/)) {
         _yuitest_coverline("build/inputex-number/inputex-number.js", 75);
return false;
      }
      
      // finally, check the value could be cast as a float number and matches the restrictions
      _yuitest_coverline("build/inputex-number/inputex-number.js", 79);
return !isNaN(value) && value >= this.options.min && value <= this.options.max;

   }

});

// Register this class as "number" type
_yuitest_coverline("build/inputex-number/inputex-number.js", 86);
inputEx.registerType("number", inputEx.NumberField, []);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "number"});
