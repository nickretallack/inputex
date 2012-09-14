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
_yuitest_coverage["build/inputex-uppercase/inputex-uppercase.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-uppercase/inputex-uppercase.js",
    code: []
};
_yuitest_coverage["build/inputex-uppercase/inputex-uppercase.js"].code=["YUI.add('inputex-uppercase', function (Y, NAME) {","","/**"," * @module inputex-uppercase"," */","YUI.add(\"inputex-uppercase\",function(Y){","	","   var inputEx = Y.inputEx,","       lang = Y.Lang;","","/**"," * A field where the value is always uppercase"," * @class inputEx.UpperCaseField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.UpperCaseField = function(options) {","   inputEx.UpperCaseField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.UpperCaseField, inputEx.StringField, {","","   /**","    * Set the value and call toUpperCase","    * @method setValue","    * @param {String} val The string","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","      // don't always rewrite the value to able selections with Ctrl+A","      var uppered = val.toUpperCase();","      if(uppered != this.getValue()) {","         inputEx.UpperCaseField.superclass.setValue.call(this, uppered, sendUpdatedEvt);","      }","   },","","   /**","    * Call setvalue on input to update the field with upper case value","    * @method onKeyPress","    * @param {Event} e The original 'input' event","    */","   onKeyPress: function(e) { ","      inputEx.UpperCaseField.superclass.onKeyPress.call(this,e);","      ","      // Re-Apply a toUpperCase method","      Y.Lang.later(0,this,function() {this.setValue( (this.getValue()) );});","   }","","});","","// Register this class as \"uppercase\" type","inputEx.registerType(\"uppercase\", inputEx.UpperCaseField);","","},'3.1.0',{","  requires: ['inputex-string']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-uppercase/inputex-uppercase.js"].lines = {"1":0,"6":0,"8":0,"18":0,"19":0,"22":0,"32":0,"33":0,"34":0,"44":0,"47":0,"53":0};
_yuitest_coverage["build/inputex-uppercase/inputex-uppercase.js"].functions = {"UpperCaseField:18":0,"setValue:30":0,"(anonymous 3):47":0,"onKeyPress:43":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-uppercase/inputex-uppercase.js"].coveredLines = 12;
_yuitest_coverage["build/inputex-uppercase/inputex-uppercase.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 1);
YUI.add('inputex-uppercase', function (Y, NAME) {

/**
 * @module inputex-uppercase
 */
_yuitest_coverfunc("build/inputex-uppercase/inputex-uppercase.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 6);
YUI.add("inputex-uppercase",function(Y){
	
   _yuitest_coverfunc("build/inputex-uppercase/inputex-uppercase.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 8);
var inputEx = Y.inputEx,
       lang = Y.Lang;

/**
 * A field where the value is always uppercase
 * @class inputEx.UpperCaseField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 18);
inputEx.UpperCaseField = function(options) {
   _yuitest_coverfunc("build/inputex-uppercase/inputex-uppercase.js", "UpperCaseField", 18);
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 19);
inputEx.UpperCaseField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 22);
Y.extend(inputEx.UpperCaseField, inputEx.StringField, {

   /**
    * Set the value and call toUpperCase
    * @method setValue
    * @param {String} val The string
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
      // don't always rewrite the value to able selections with Ctrl+A
      _yuitest_coverfunc("build/inputex-uppercase/inputex-uppercase.js", "setValue", 30);
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 32);
var uppered = val.toUpperCase();
      _yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 33);
if(uppered != this.getValue()) {
         _yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 34);
inputEx.UpperCaseField.superclass.setValue.call(this, uppered, sendUpdatedEvt);
      }
   },

   /**
    * Call setvalue on input to update the field with upper case value
    * @method onKeyPress
    * @param {Event} e The original 'input' event
    */
   onKeyPress: function(e) { 
      _yuitest_coverfunc("build/inputex-uppercase/inputex-uppercase.js", "onKeyPress", 43);
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 44);
inputEx.UpperCaseField.superclass.onKeyPress.call(this,e);
      
      // Re-Apply a toUpperCase method
      _yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 47);
Y.Lang.later(0,this,function() {_yuitest_coverfunc("build/inputex-uppercase/inputex-uppercase.js", "(anonymous 3)", 47);
this.setValue( (this.getValue()) );});
   }

});

// Register this class as "uppercase" type
_yuitest_coverline("build/inputex-uppercase/inputex-uppercase.js", 53);
inputEx.registerType("uppercase", inputEx.UpperCaseField);

},'3.1.0',{
  requires: ['inputex-string']
});


}, '@VERSION@');
