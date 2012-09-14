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
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].code=["YUI.add('inputex-uneditable', function (Y, NAME) {","","/**"," * @module inputex-uneditable"," */","YUI.add(\"inputex-uneditable\", function(Y){","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Create a uneditable field where you can stick the html you want"," * Added Options:"," * <ul>"," *    <li>visu: inputEx visu type</li>"," * </ul>"," * @class inputEx.UneditableField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.UneditableField = function(options) {","	inputEx.UneditableField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.UneditableField, inputEx.Field, {","   ","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","	setOptions: function(options) {","      inputEx.UneditableField.superclass.setOptions.call(this,options);","      this.options.visu = options.visu;","   },","   ","   /**","    * Store the value and update the visu","    * @method setValue","    * @param {Any} val The value that will be sent to the visu","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","      this.value = val;","      ","      inputEx.renderVisu(this.options.visu, val, this.fieldContainer);","      ","	   inputEx.UneditableField.superclass.setValue.call(this, val, sendUpdatedEvt);","   },","   ","   /**","    * Return the stored value","    * @method getValue","    * @return {Any} The previously stored value","    */","   getValue: function() {","      return this.value;","   }","   ","});","","// Register this class as \"url\" type","inputEx.registerType(\"uneditable\", inputEx.UneditableField);","","}, '3.1.0',{","requires: ['inputex-field']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].lines = {"1":0,"6":0,"8":0,"22":0,"23":0,"25":0,"33":0,"34":0,"44":0,"46":0,"48":0,"57":0,"63":0};
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].functions = {"UneditableField:22":0,"setOptions:32":0,"setValue:43":0,"getValue:56":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].coveredLines = 13;
_yuitest_coverage["build/inputex-uneditable/inputex-uneditable.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 1);
YUI.add('inputex-uneditable', function (Y, NAME) {

/**
 * @module inputex-uneditable
 */
_yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 6);
YUI.add("inputex-uneditable", function(Y){

  _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 8);
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
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 22);
inputEx.UneditableField = function(options) {
	_yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "UneditableField", 22);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 23);
inputEx.UneditableField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 25);
Y.extend(inputEx.UneditableField, inputEx.Field, {
   
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
	setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "setOptions", 32);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 33);
inputEx.UneditableField.superclass.setOptions.call(this,options);
      _yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 34);
this.options.visu = options.visu;
   },
   
   /**
    * Store the value and update the visu
    * @method setValue
    * @param {Any} val The value that will be sent to the visu
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "setValue", 43);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 44);
this.value = val;
      
      _yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 46);
inputEx.renderVisu(this.options.visu, val, this.fieldContainer);
      
	   _yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 48);
inputEx.UneditableField.superclass.setValue.call(this, val, sendUpdatedEvt);
   },
   
   /**
    * Return the stored value
    * @method getValue
    * @return {Any} The previously stored value
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-uneditable/inputex-uneditable.js", "getValue", 56);
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 57);
return this.value;
   }
   
});

// Register this class as "url" type
_yuitest_coverline("build/inputex-uneditable/inputex-uneditable.js", 63);
inputEx.registerType("uneditable", inputEx.UneditableField);

}, '3.1.0',{
requires: ['inputex-field']
});


}, '@VERSION@');
