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
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-datetime/inputex-datetime.js",
    code: []
};
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].code=["YUI.add('inputex-datetime', function (Y, NAME) {","","/**"," * @module inputex-datetime"," */","YUI.add(\"inputex-datetime\", function(Y) {","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * A field limited to number inputs (floating)"," * @class inputEx.DateTimeField"," * @extends inputEx.CombineField"," * @constructor"," * @param {Object} options Added options"," * <ul>"," *    <li>dateFormat: same as DateField (deprecated, use \"dateFieldOptions.dateFormat\" instead)</li>"," *    <li>dateFieldOptions: options passed to the datepicker field</li>"," *    <li>timeFieldOptions: options passed to the time field</li>"," * </ul>"," */","inputEx.DateTimeField = function(options) {","","   var datefield = {type: 'datepicker'},","       timefield = {type: 'time'};","","   if(options.dateFieldOptions) {","      Y.mix (datefield, options.dateFieldOptions, true);","   }","","   if(options.timeFieldOptions) {","      Y.mix (timefield, options.timeFieldOptions, true);","   }","","   if(options.dateFormat) { // backward compatibility","      datefield.dateFormat = options.dateFormat;","   }","","   options.fields = [datefield, timefield];","","   options.separators = options.separators || [false, \"&nbsp;&nbsp;\", false];","   inputEx.DateTimeField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DateTimeField, inputEx.CombineField, {   ","   /**","    * Concat the values to return a date","    * @method getValue","    * @return {Date} The javascript Date object","    */","   getValue: function() {","      var d = this.inputs[0].getValue();","      if( d == '' ) return null;","      var a = this.inputs[1].getValue().split(':');","      ","      d.setHours(a[0]);","      d.setMinutes(a[1]);","      d.setSeconds(a[2]);","      ","      return d;","   },","","   /**","    * Set the value of both subfields","    * @method setValue","    * @param {Date} val Date to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","      if(!lang.isObject(val)) {return;}","      var h = val.getHours();","      var m = val.getMinutes();","      var s = val.getSeconds();","      var time = ([(h < 10 ? '0':'')+h, (m < 10 ? '0':'')+m, (s < 10 ? '0':'')+s]).join(':');","      inputEx.DateTimeField.superclass.setValue.call(this, [val, time], sendUpdatedEvt);","   }","","});","","","","// Register this class as \"time\" type","inputEx.registerType(\"datetime\", inputEx.DateTimeField);","","}, '3.1.0',{","requires: ['inputex-combine']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].lines = {"1":0,"6":0,"8":0,"23":0,"25":0,"28":0,"29":0,"32":0,"33":0,"36":0,"37":0,"40":0,"42":0,"43":0,"46":0,"53":0,"54":0,"55":0,"57":0,"58":0,"59":0,"61":0,"71":0,"72":0,"73":0,"74":0,"75":0,"76":0,"84":0};
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].functions = {"DateTimeField:23":0,"getValue:52":0,"setValue:70":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].coveredLines = 29;
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 1);
YUI.add('inputex-datetime', function (Y, NAME) {

/**
 * @module inputex-datetime
 */
_yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 6);
YUI.add("inputex-datetime", function(Y) {

  _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.DateTimeField
 * @extends inputEx.CombineField
 * @constructor
 * @param {Object} options Added options
 * <ul>
 *    <li>dateFormat: same as DateField (deprecated, use "dateFieldOptions.dateFormat" instead)</li>
 *    <li>dateFieldOptions: options passed to the datepicker field</li>
 *    <li>timeFieldOptions: options passed to the time field</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 23);
inputEx.DateTimeField = function(options) {

   _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "DateTimeField", 23);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 25);
var datefield = {type: 'datepicker'},
       timefield = {type: 'time'};

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 28);
if(options.dateFieldOptions) {
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 29);
Y.mix (datefield, options.dateFieldOptions, true);
   }

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 32);
if(options.timeFieldOptions) {
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 33);
Y.mix (timefield, options.timeFieldOptions, true);
   }

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 36);
if(options.dateFormat) { // backward compatibility
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 37);
datefield.dateFormat = options.dateFormat;
   }

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 40);
options.fields = [datefield, timefield];

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 42);
options.separators = options.separators || [false, "&nbsp;&nbsp;", false];
   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 43);
inputEx.DateTimeField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 46);
Y.extend(inputEx.DateTimeField, inputEx.CombineField, {   
   /**
    * Concat the values to return a date
    * @method getValue
    * @return {Date} The javascript Date object
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "getValue", 52);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 53);
var d = this.inputs[0].getValue();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 54);
if( d == '' ) {return null;}
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 55);
var a = this.inputs[1].getValue().split(':');
      
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 57);
d.setHours(a[0]);
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 58);
d.setMinutes(a[1]);
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 59);
d.setSeconds(a[2]);
      
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 61);
return d;
   },

   /**
    * Set the value of both subfields
    * @method setValue
    * @param {Date} val Date to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "setValue", 70);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 71);
if(!lang.isObject(val)) {return;}
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 72);
var h = val.getHours();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 73);
var m = val.getMinutes();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 74);
var s = val.getSeconds();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 75);
var time = ([(h < 10 ? '0':'')+h, (m < 10 ? '0':'')+m, (s < 10 ? '0':'')+s]).join(':');
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 76);
inputEx.DateTimeField.superclass.setValue.call(this, [val, time], sendUpdatedEvt);
   }

});



// Register this class as "time" type
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 84);
inputEx.registerType("datetime", inputEx.DateTimeField);

}, '3.1.0',{
requires: ['inputex-combine']
});


}, '@VERSION@');
