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
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].code=["YUI.add('inputex-integer', function (Y, NAME) {","","/**"," * @module inputex-integer"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * A field limited to number inputs"," * @class inputEx.IntegerField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>negative: boolean indicating if we accept negative numbers</li>"," * </ul>"," */","inputEx.IntegerField = function(options) {","   inputEx.IntegerField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.IntegerField, inputEx.StringField, {","   /**","    * Adds the negative, min, and max options","    * @method setOptions","    * @param {Object} options","    */","   setOptions: function(options) {","      inputEx.IntegerField.superclass.setOptions.call(this, options);","      ","      this.options.negative = lang.isUndefined(options.negative) ? false : options.negative;","      this.options.min = lang.isUndefined(options.min) ? (this.options.negative ? -Infinity : 0) : parseInt(options.min,10);","      this.options.max = lang.isUndefined(options.max) ? Infinity : parseInt(options.max,10);","   },","   ","   /**","    * Get the value","    * @method getValue","    * @return {int} The integer value","    */","   getValue: function() {","      ","      var str_value;","      ","      // StringField getValue (handles typeInvite and trim options)","      str_value = inputEx.IntegerField.superclass.getValue.call(this);","      ","      // don't return NaN if empty field","      if (str_value === '') {","         return '';","      }","      ","      return parseInt(str_value, 10);","   },","   ","   /**","    * Validate if the value is an integer","    * @method validate","    */","   validate: function() {","      ","      var str_valid = inputEx.IntegerField.superclass.validate.call(this),","          str_value = inputEx.IntegerField.superclass.getValue.call(this),","          value = this.getValue();","","      // superclass validation will handle inherited options (required, trim, minLength, a.s.o)","      if (!str_valid) {","         return false;","      }","","      // if non-required field is empty, no other validation to perform","      if (!this.options.required && this.isEmpty()) {","         return true;","      }","      ","      // also check the string has a valid format to describe an integer","      if (!str_value.match(/^[\\+\\-]?[0-9]+$/)) {","         return false;","      }","      ","      // finally, check the value could be cast as an integer and matches the restrictions","      return !isNaN(value) &&","             (this.options.negative ? true : value >= 0) &&","             value >= this.options.min && value <= this.options.max;","      ","   }","   ","});","","// Register this class as \"integer\" type","inputEx.registerType(\"integer\", inputEx.IntegerField, [","   //{ type: 'integer', label: 'Radix', name: 'radix', value: 10},","   {type: 'boolean', label: 'Accept negative', name: 'negative', value: false }","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\"], \"ix_provides\": \"integer\"});"];
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"30":0,"32":0,"33":0,"34":0,"44":0,"47":0,"50":0,"51":0,"54":0,"63":0,"68":0,"69":0,"73":0,"74":0,"78":0,"79":0,"83":0,"92":0};
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].functions = {"IntegerField:19":0,"setOptions:29":0,"getValue:42":0,"validate:61":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].coveredLines = 23;
_yuitest_coverage["build/inputex-integer/inputex-integer.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 1);
YUI.add('inputex-integer', function (Y, NAME) {

/**
 * @module inputex-integer
 */
   _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 6);
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
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 19);
inputEx.IntegerField = function(options) {
   _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "IntegerField", 19);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 20);
inputEx.IntegerField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-integer/inputex-integer.js", 23);
Y.extend(inputEx.IntegerField, inputEx.StringField, {
   /**
    * Adds the negative, min, and max options
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "setOptions", 29);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 30);
inputEx.IntegerField.superclass.setOptions.call(this, options);
      
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 32);
this.options.negative = lang.isUndefined(options.negative) ? false : options.negative;
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 33);
this.options.min = lang.isUndefined(options.min) ? (this.options.negative ? -Infinity : 0) : parseInt(options.min,10);
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 34);
this.options.max = lang.isUndefined(options.max) ? Infinity : parseInt(options.max,10);
   },
   
   /**
    * Get the value
    * @method getValue
    * @return {int} The integer value
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "getValue", 42);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 44);
var str_value;
      
      // StringField getValue (handles typeInvite and trim options)
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 47);
str_value = inputEx.IntegerField.superclass.getValue.call(this);
      
      // don't return NaN if empty field
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 50);
if (str_value === '') {
         _yuitest_coverline("build/inputex-integer/inputex-integer.js", 51);
return '';
      }
      
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 54);
return parseInt(str_value, 10);
   },
   
   /**
    * Validate if the value is an integer
    * @method validate
    */
   validate: function() {
      
      _yuitest_coverfunc("build/inputex-integer/inputex-integer.js", "validate", 61);
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 63);
var str_valid = inputEx.IntegerField.superclass.validate.call(this),
          str_value = inputEx.IntegerField.superclass.getValue.call(this),
          value = this.getValue();

      // superclass validation will handle inherited options (required, trim, minLength, a.s.o)
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 68);
if (!str_valid) {
         _yuitest_coverline("build/inputex-integer/inputex-integer.js", 69);
return false;
      }

      // if non-required field is empty, no other validation to perform
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 73);
if (!this.options.required && this.isEmpty()) {
         _yuitest_coverline("build/inputex-integer/inputex-integer.js", 74);
return true;
      }
      
      // also check the string has a valid format to describe an integer
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 78);
if (!str_value.match(/^[\+\-]?[0-9]+$/)) {
         _yuitest_coverline("build/inputex-integer/inputex-integer.js", 79);
return false;
      }
      
      // finally, check the value could be cast as an integer and matches the restrictions
      _yuitest_coverline("build/inputex-integer/inputex-integer.js", 83);
return !isNaN(value) &&
             (this.options.negative ? true : value >= 0) &&
             value >= this.options.min && value <= this.options.max;
      
   }
   
});

// Register this class as "integer" type
_yuitest_coverline("build/inputex-integer/inputex-integer.js", 92);
inputEx.registerType("integer", inputEx.IntegerField, [
   //{ type: 'integer', label: 'Radix', name: 'radix', value: 10},
   {type: 'boolean', label: 'Accept negative', name: 'negative', value: false }
]);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "integer"});
