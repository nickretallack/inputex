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
_yuitest_coverage["build/inputex-time/inputex-time.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-time/inputex-time.js",
    code: []
};
_yuitest_coverage["build/inputex-time/inputex-time.js"].code=["YUI.add('inputex-time', function (Y, NAME) {","","/**"," * @module inputex-time"," */","YUI.add(\"inputex-time\", function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * A field limited to number inputs (floating)"," * @class inputEx.TimeField"," * @extends inputEx.CombineField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.TimeField = function(options) {","   ","   ","   var h = [],i, m = [], secs = [], s;","   for(i = 0 ; i < 24 ; i++) { s=\"\";if(i<10){s=\"0\";} s+= i;h.push({ value: s });}","   for(i = 0 ; i < 60 ; i++) { s=\"\";if(i<10){s=\"0\";} s+= i;m.push({ value: s }); secs.push({ value: s });}","   options.fields = [","      {type: 'select', choices: h },","      {type: 'select', choices: m },","      {type: 'select', choices: secs }","   ];","   options.separators = options.separators || [false,\":\",\":\",false];","   inputEx.TimeField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.TimeField, inputEx.CombineField, {   ","   /**","    * Returns a string like HH:MM:SS","    * @method getValue","    * @return {String} Hour string","    */","   getValue: function() {","      var values = inputEx.TimeField.superclass.getValue.call(this);","      return values.join(':');","   },","","   /**","    * Set the value ","    * @method setValue","    * @param {String} str Hour string (format HH:MM:SS)","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(str, sendUpdatedEvt) {","      inputEx.TimeField.superclass.setValue.call(this, str.split(':'), sendUpdatedEvt);","   }","","});","","// Register this class as \"time\" type","inputEx.registerType(\"time\", inputEx.TimeField);","","","}, '3.1.0',{","requires: ['inputex-combine', 'inputex-select']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-time/inputex-time.js"].lines = {"1":0,"6":0,"8":0,"18":0,"21":0,"22":0,"23":0,"24":0,"29":0,"30":0,"33":0,"40":0,"41":0,"51":0,"57":0};
_yuitest_coverage["build/inputex-time/inputex-time.js"].functions = {"TimeField:18":0,"getValue:39":0,"setValue:50":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-time/inputex-time.js"].coveredLines = 15;
_yuitest_coverage["build/inputex-time/inputex-time.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-time/inputex-time.js", 1);
YUI.add('inputex-time', function (Y, NAME) {

/**
 * @module inputex-time
 */
_yuitest_coverfunc("build/inputex-time/inputex-time.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-time/inputex-time.js", 6);
YUI.add("inputex-time", function(Y){

   _yuitest_coverfunc("build/inputex-time/inputex-time.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-time/inputex-time.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.TimeField
 * @extends inputEx.CombineField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-time/inputex-time.js", 18);
inputEx.TimeField = function(options) {
   
   
   _yuitest_coverfunc("build/inputex-time/inputex-time.js", "TimeField", 18);
_yuitest_coverline("build/inputex-time/inputex-time.js", 21);
var h = [],i, m = [], secs = [], s;
   _yuitest_coverline("build/inputex-time/inputex-time.js", 22);
for(i = 0 ; i < 24 ; i++) { s="";if(i<10){s="0";} s+= i;h.push({ value: s });}
   _yuitest_coverline("build/inputex-time/inputex-time.js", 23);
for(i = 0 ; i < 60 ; i++) { s="";if(i<10){s="0";} s+= i;m.push({ value: s }); secs.push({ value: s });}
   _yuitest_coverline("build/inputex-time/inputex-time.js", 24);
options.fields = [
      {type: 'select', choices: h },
      {type: 'select', choices: m },
      {type: 'select', choices: secs }
   ];
   _yuitest_coverline("build/inputex-time/inputex-time.js", 29);
options.separators = options.separators || [false,":",":",false];
   _yuitest_coverline("build/inputex-time/inputex-time.js", 30);
inputEx.TimeField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-time/inputex-time.js", 33);
Y.extend(inputEx.TimeField, inputEx.CombineField, {   
   /**
    * Returns a string like HH:MM:SS
    * @method getValue
    * @return {String} Hour string
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-time/inputex-time.js", "getValue", 39);
_yuitest_coverline("build/inputex-time/inputex-time.js", 40);
var values = inputEx.TimeField.superclass.getValue.call(this);
      _yuitest_coverline("build/inputex-time/inputex-time.js", 41);
return values.join(':');
   },

   /**
    * Set the value 
    * @method setValue
    * @param {String} str Hour string (format HH:MM:SS)
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(str, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-time/inputex-time.js", "setValue", 50);
_yuitest_coverline("build/inputex-time/inputex-time.js", 51);
inputEx.TimeField.superclass.setValue.call(this, str.split(':'), sendUpdatedEvt);
   }

});

// Register this class as "time" type
_yuitest_coverline("build/inputex-time/inputex-time.js", 57);
inputEx.registerType("time", inputEx.TimeField);


}, '3.1.0',{
requires: ['inputex-combine', 'inputex-select']
});


}, '@VERSION@');
