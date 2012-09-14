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
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].code=["YUI.add('inputex-datetime', function (Y, NAME) {","","/**"," * @module inputex-datetime"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * A field limited to number inputs (floating)"," * @class inputEx.DateTimeField"," * @extends inputEx.CombineField"," * @constructor"," * @param {Object} options Added options"," * <ul>"," *    <li>dateFormat: same as DateField (deprecated, use \"dateFieldOptions.dateFormat\" instead)</li>"," *    <li>dateFieldOptions: options passed to the datepicker field</li>"," *    <li>timeFieldOptions: options passed to the time field</li>"," * </ul>"," */","inputEx.DateTimeField = function(options) {","","   var datefield = {type: 'datepicker'},","       timefield = {type: 'time'};","","   if(options.dateFieldOptions) {","      Y.mix (datefield, options.dateFieldOptions, true);","   }","","   if(options.timeFieldOptions) {","      Y.mix (timefield, options.timeFieldOptions, true);","   }","","   if(options.dateFormat) { // backward compatibility","      datefield.dateFormat = options.dateFormat;","   }","","   options.fields = [datefield, timefield];","","   options.separators = options.separators || [false, \"&nbsp;&nbsp;\", false];","   inputEx.DateTimeField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DateTimeField, inputEx.CombineField, {   ","   /**","    * Concat the values to return a date","    * @method getValue","    * @return {Date} The javascript Date object","    */","   getValue: function() {","      var d = this.inputs[0].getValue();","      if( d == '' ) return null;","      var a = this.inputs[1].getValue().split(':');","      ","      d.setHours(a[0]);","      d.setMinutes(a[1]);","      d.setSeconds(a[2]);","      ","      return d;","   },","","   /**","    * Set the value of both subfields","    * @method setValue","    * @param {Date} val Date to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","      if(!lang.isObject(val)) {return;}","      var h = val.getHours();","      var m = val.getMinutes();","      var s = val.getSeconds();","      var time = ([(h < 10 ? '0':'')+h, (m < 10 ? '0':'')+m, (s < 10 ? '0':'')+s]).join(':');","      inputEx.DateTimeField.superclass.setValue.call(this, [val, time], sendUpdatedEvt);","   }","","});","","","","// Register this class as \"time\" type","inputEx.registerType(\"datetime\", inputEx.DateTimeField);","","","}, '@VERSION@', {\"requires\": [\"inputex-datepicker\", \"inputex-combine\", \"inputex-time\"], \"ix_provides\": \"datetime\"});"];
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].lines = {"1":0,"6":0,"21":0,"23":0,"26":0,"27":0,"30":0,"31":0,"34":0,"35":0,"38":0,"40":0,"41":0,"44":0,"51":0,"52":0,"53":0,"55":0,"56":0,"57":0,"59":0,"69":0,"70":0,"71":0,"72":0,"73":0,"74":0,"82":0};
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].functions = {"DateTimeField:21":0,"getValue:50":0,"setValue:68":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].coveredLines = 28;
_yuitest_coverage["build/inputex-datetime/inputex-datetime.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 1);
YUI.add('inputex-datetime', function (Y, NAME) {

/**
 * @module inputex-datetime
 */
  _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 6);
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
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 21);
inputEx.DateTimeField = function(options) {

   _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "DateTimeField", 21);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 23);
var datefield = {type: 'datepicker'},
       timefield = {type: 'time'};

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 26);
if(options.dateFieldOptions) {
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 27);
Y.mix (datefield, options.dateFieldOptions, true);
   }

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 30);
if(options.timeFieldOptions) {
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 31);
Y.mix (timefield, options.timeFieldOptions, true);
   }

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 34);
if(options.dateFormat) { // backward compatibility
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 35);
datefield.dateFormat = options.dateFormat;
   }

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 38);
options.fields = [datefield, timefield];

   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 40);
options.separators = options.separators || [false, "&nbsp;&nbsp;", false];
   _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 41);
inputEx.DateTimeField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 44);
Y.extend(inputEx.DateTimeField, inputEx.CombineField, {   
   /**
    * Concat the values to return a date
    * @method getValue
    * @return {Date} The javascript Date object
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "getValue", 50);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 51);
var d = this.inputs[0].getValue();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 52);
if( d == '' ) {return null;}
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 53);
var a = this.inputs[1].getValue().split(':');
      
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 55);
d.setHours(a[0]);
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 56);
d.setMinutes(a[1]);
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 57);
d.setSeconds(a[2]);
      
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 59);
return d;
   },

   /**
    * Set the value of both subfields
    * @method setValue
    * @param {Date} val Date to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-datetime/inputex-datetime.js", "setValue", 68);
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 69);
if(!lang.isObject(val)) {return;}
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 70);
var h = val.getHours();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 71);
var m = val.getMinutes();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 72);
var s = val.getSeconds();
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 73);
var time = ([(h < 10 ? '0':'')+h, (m < 10 ? '0':'')+m, (s < 10 ? '0':'')+s]).join(':');
      _yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 74);
inputEx.DateTimeField.superclass.setValue.call(this, [val, time], sendUpdatedEvt);
   }

});



// Register this class as "time" type
_yuitest_coverline("build/inputex-datetime/inputex-datetime.js", 82);
inputEx.registerType("datetime", inputEx.DateTimeField);


}, '@VERSION@', {"requires": ["inputex-datepicker", "inputex-combine", "inputex-time"], "ix_provides": "datetime"});
