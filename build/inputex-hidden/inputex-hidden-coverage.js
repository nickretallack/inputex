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
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].code=["YUI.add('inputex-hidden', function (Y, NAME) {","","/**"," * @module inputex-hidden"," */","YUI.add(\"inputex-hidden\", function(Y){","   ","  var inputEx = Y.inputEx;","","/**"," * Create a hidden input, inherits from inputEx.Field"," * @class inputEx.HiddenField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.HiddenField = function(options) {","	inputEx.HiddenField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.HiddenField, inputEx.Field, {","   ","   /**","    * Doesn't render much...","    * @method render","    */","   render: function() {","      this.type = inputEx.HiddenField;","	   this.divEl = inputEx.cn('div', null, {display: 'none'});","	   ","	   this.el = inputEx.cn('input', {type: 'hidden'});","	   this.rawValue = ''; // initialize the rawValue with '' (default value of a hidden field)","	","	   if(this.options.name) this.el.name = this.options.name;","	   this.divEl.appendChild(this.el);","   },","","   /**","    * Stores the typed value in a local variable, and store the value in the hidden input (cast as string by the input)","    * @method setValue","    * @param {Any} val The value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","	","	   // store in the hidden input (so the value is sent as \"string\" if HTML form submit)","      this.el.value = val;","","      // store the value in a variable, so getValue can return it without type casting","      this.rawValue = val;","","      // Call Field.setValue to set class and fire updated event","		inputEx.HiddenField.superclass.setValue.call(this,val, sendUpdatedEvt);","   },","","   /**","    * Get the previously stored value (respect the datatype of the value)","    * @method getValue","    * @return {Any} the previously stored value","    */","   getValue: function() {","      return this.rawValue;","   }","","});","   ","// Register this class as \"hidden\" type","inputEx.registerType(\"hidden\", inputEx.HiddenField);","","}, '0.0.1',{","  requires:[\"inputex-field\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].lines = {"1":0,"6":0,"8":0,"17":0,"18":0,"21":0,"28":0,"29":0,"31":0,"32":0,"34":0,"35":0,"47":0,"50":0,"53":0,"62":0,"68":0};
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].functions = {"HiddenField:17":0,"render:27":0,"setValue:44":0,"getValue:61":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].coveredLines = 17;
_yuitest_coverage["build/inputex-hidden/inputex-hidden.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 1);
YUI.add('inputex-hidden', function (Y, NAME) {

/**
 * @module inputex-hidden
 */
_yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 6);
YUI.add("inputex-hidden", function(Y){
   
  _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 8);
var inputEx = Y.inputEx;

/**
 * Create a hidden input, inherits from inputEx.Field
 * @class inputEx.HiddenField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 17);
inputEx.HiddenField = function(options) {
	_yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "HiddenField", 17);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 18);
inputEx.HiddenField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 21);
Y.extend(inputEx.HiddenField, inputEx.Field, {
   
   /**
    * Doesn't render much...
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "render", 27);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 28);
this.type = inputEx.HiddenField;
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 29);
this.divEl = inputEx.cn('div', null, {display: 'none'});
	   
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 31);
this.el = inputEx.cn('input', {type: 'hidden'});
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 32);
this.rawValue = ''; // initialize the rawValue with '' (default value of a hidden field)
	
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 34);
if(this.options.name) {this.el.name = this.options.name;}
	   _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 35);
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
      _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "setValue", 44);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 47);
this.el.value = val;

      // store the value in a variable, so getValue can return it without type casting
      _yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 50);
this.rawValue = val;

      // Call Field.setValue to set class and fire updated event
		_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 53);
inputEx.HiddenField.superclass.setValue.call(this,val, sendUpdatedEvt);
   },

   /**
    * Get the previously stored value (respect the datatype of the value)
    * @method getValue
    * @return {Any} the previously stored value
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-hidden/inputex-hidden.js", "getValue", 61);
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 62);
return this.rawValue;
   }

});
   
// Register this class as "hidden" type
_yuitest_coverline("build/inputex-hidden/inputex-hidden.js", 68);
inputEx.registerType("hidden", inputEx.HiddenField);

}, '0.0.1',{
  requires:["inputex-field"]
});


}, '@VERSION@');
