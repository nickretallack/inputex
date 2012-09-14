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
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-hidden/inputex-hidden.js",
    code: []
};
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].code=["YUI.add('inputex-hidden', function (Y, NAME) {","","/**"," * @module inputex-hidden"," */","  var inputEx = Y.inputEx;","","/**"," * Create a hidden input, inherits from inputEx.Field"," * @class inputEx.HiddenField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.HiddenField = function(options) {","	inputEx.HiddenField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.HiddenField, inputEx.Field, {","   ","   /**","    * Doesn't render much...","    * @method render","    */","   render: function() {","      this.type = inputEx.HiddenField;","	   this.divEl = inputEx.cn('div', null, {display: 'none'});","	   ","	   this.el = inputEx.cn('input', {type: 'hidden'});","	   this.rawValue = ''; // initialize the rawValue with '' (default value of a hidden field)","	","	   if(this.options.name) this.el.name = this.options.name;","	   this.divEl.appendChild(this.el);","   },","","   /**","    * Stores the typed value in a local variable, and store the value in the hidden input (cast as string by the input)","    * @method setValue","    * @param {Any} val The value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","	","	   // store in the hidden input (so the value is sent as \"string\" if HTML form submit)","      this.el.value = val;","","      // store the value in a variable, so getValue can return it without type casting","      this.rawValue = val;","","      // Call Field.setValue to set class and fire updated event","		inputEx.HiddenField.superclass.setValue.call(this,val, sendUpdatedEvt);","   },","","   /**","    * Get the previously stored value (respect the datatype of the value)","    * @method getValue","    * @return {Any} the previously stored value","    */","   getValue: function() {","      return this.rawValue;","   }","","});","   ","// Register this class as \"hidden\" type","inputEx.registerType(\"hidden\", inputEx.HiddenField);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"hidden\"});"];
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].lines = {"1":0,"6":0,"15":0,"16":0,"19":0,"26":0,"27":0,"29":0,"30":0,"32":0,"33":0,"45":0,"48":0,"51":0,"60":0,"66":0};
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].functions = {"HiddenField:15":0,"render:25":0,"setValue:42":0,"getValue:59":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].coveredLines = 16;
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 1);
YUI.add('inputex-hidden', function (Y, NAME) {

/**
 * @module inputex-hidden
 */
  _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 6);
var inputEx = Y.inputEx;

/**
 * Create a hidden input, inherits from inputEx.Field
 * @class inputEx.HiddenField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 15);
inputEx.HiddenField = function(options) {
	_yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "HiddenField", 15);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 16);
inputEx.HiddenField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 19);
Y.extend(inputEx.HiddenField, inputEx.Field, {
   
   /**
    * Doesn't render much...
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "render", 25);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 26);
this.type = inputEx.HiddenField;
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 27);
this.divEl = inputEx.cn('div', null, {display: 'none'});
	   
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 29);
this.el = inputEx.cn('input', {type: 'hidden'});
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 30);
this.rawValue = ''; // initialize the rawValue with '' (default value of a hidden field)
	
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 32);
if(this.options.name) {this.el.name = this.options.name;}
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 33);
this.divEl.appendChild(this.el);
   },

   /**
    * Stores the typed value in a local variable, and store the value in the hidden input (cast as string by the input)
    * @method setValue
    * @param {Any} val The value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
	
	   // store in the hidden input (so the value is sent as "string" if HTML form submit)
      _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "setValue", 42);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 45);
this.el.value = val;

      // store the value in a variable, so getValue can return it without type casting
      _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 48);
this.rawValue = val;

      // Call Field.setValue to set class and fire updated event
		_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 51);
inputEx.HiddenField.superclass.setValue.call(this,val, sendUpdatedEvt);
   },

   /**
    * Get the previously stored value (respect the datatype of the value)
    * @method getValue
    * @return {Any} the previously stored value
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "getValue", 59);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 60);
return this.rawValue;
   }

});
   
// Register this class as "hidden" type
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 66);
inputEx.registerType("hidden", inputEx.HiddenField);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "hidden"});
