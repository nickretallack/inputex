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
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-uneditable/inputex-uneditable.js",
    code: []
};
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].code=["YUI.add('inputex-uneditable', function (Y, NAME) {","","/**"," * @module inputex-uneditable"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Create a uneditable field where you can stick the html you want"," * Added Options:"," * <ul>"," *    <li>visu: inputEx visu type</li>"," * </ul>"," * @class inputEx.UneditableField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.UneditableField = function(options) {","	inputEx.UneditableField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.UneditableField, inputEx.Field, {","   ","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","	setOptions: function(options) {","      inputEx.UneditableField.superclass.setOptions.call(this,options);","      this.options.visu = options.visu;","   },","   ","   /**","    * Store the value and update the visu","    * @method setValue","    * @param {Any} val The value that will be sent to the visu","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","      this.value = val;","      ","      inputEx.renderVisu(this.options.visu, val, this.fieldContainer);","      ","	   inputEx.UneditableField.superclass.setValue.call(this, val, sendUpdatedEvt);","   },","   ","   /**","    * Return the stored value","    * @method getValue","    * @return {Any} The previously stored value","    */","   getValue: function() {","      return this.value;","   }","   ","});","","// Register this class as \"url\" type","inputEx.registerType(\"uneditable\", inputEx.UneditableField);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"inputex-visus\"], \"ix_provides\": \"uneditable\"});"];
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].lines = {"1":0,"6":0,"20":0,"21":0,"23":0,"31":0,"32":0,"42":0,"44":0,"46":0,"55":0,"61":0};
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].functions = {"UneditableField:20":0,"setOptions:30":0,"setValue:41":0,"getValue:54":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].coveredLines = 12;
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 1);
YUI.add('inputex-uneditable', function (Y, NAME) {

/**
 * @module inputex-uneditable
 */
  _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * Create a uneditable field where you can stick the html you want
 * Added Options:
 * <ul>
 *    <li>visu: inputEx visu type</li>
 * </ul>
 * @class inputEx.UneditableField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 20);
inputEx.UneditableField = function(options) {
	_yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "UneditableField", 20);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 21);
inputEx.UneditableField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 23);
Y.extend(inputEx.UneditableField, inputEx.Field, {
   
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
	setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "setOptions", 30);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 31);
inputEx.UneditableField.superclass.setOptions.call(this,options);
      _yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 32);
this.options.visu = options.visu;
   },
   
   /**
    * Store the value and update the visu
    * @method setValue
    * @param {Any} val The value that will be sent to the visu
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "setValue", 41);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 42);
this.value = val;
      
      _yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 44);
inputEx.renderVisu(this.options.visu, val, this.fieldContainer);
      
	   _yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 46);
inputEx.UneditableField.superclass.setValue.call(this, val, sendUpdatedEvt);
   },
   
   /**
    * Return the stored value
    * @method getValue
    * @return {Any} The previously stored value
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "getValue", 54);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 55);
return this.value;
   }
   
});

// Register this class as "url" type
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 61);
inputEx.registerType("uneditable", inputEx.UneditableField);


}, '@VERSION@', {"requires": ["inputex-field", "inputex-visus"], "ix_provides": "uneditable"});
