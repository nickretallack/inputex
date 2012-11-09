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
_yuitest_coverage["build/inputex-timeinterval/inputex-timeinterval.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-timeinterval/inputex-timeinterval.js",
    code: []
};
_yuitest_coverage["build/inputex-timeinterval/inputex-timeinterval.js"].code=["YUI.add('inputex-timeinterval', function (Y, NAME) {","","/**"," * @module inputex-timeinterval"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * A field limited to number inputs (floating)"," * @class inputEx.TimeIntervalField"," * @extends inputEx.CombineField"," * @constructor"," * @param {Object} options Added options"," * <ul>"," *    <li>unit: inputEx.TimeIntervalField.units.MYUNIT (SECOND,MINUTE,HOUR,DAY,MONTH,YEAR)</li>"," * </ul>"," */","inputEx.TimeIntervalField = function(options) {","   inputEx.TimeIntervalField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.TimeIntervalField, inputEx.CombineField, {","   ","   /**","    * Additional options","    * @method setOptions","    */","   setOptions: function(options) {","      ","      inputEx.TimeIntervalField.superclass.setOptions.call(this,options);","      ","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-timeinterval\"));","","      var units = inputEx.TimeIntervalField.units;","      var unitsStr = this.messages.timeUnits;","      ","      this.options.unit = options.unit || units.SECOND;","      ","      ","      var n=[]; for(var i=1;i<=60;i++){ n.push({ value : i }); }","      ","      this.options.fields = options.fields || [","         {type: 'select', choices: n },","         {","            type: 'select',","            choices: [","               { value: units.SECOND, label: unitsStr.SECOND },","               { value: units.MINUTE, label: unitsStr.MINUTE },","               { value: units.HOUR, label: unitsStr.HOUR },","               { value: units.DAY, label: unitsStr.DAY },","               { value: units.MONTH, label: unitsStr.MONTH },","               { value: units.YEAR, label: unitsStr.YEAR }","            ]","         }","      ];","      ","      this.options.separators = options.separators || [false, \"&nbsp;&nbsp;\", false];","   },","   ","   /**","    * Concat the values to return a date","    * @method getValue","    * @return {Integer} the time interval in the field unit","    */","   getValue: function() {","      var v = inputEx.TimeIntervalField.superclass.getValue.call(this);","      return (parseInt(v[0],10)*v[1])/this.options.unit;","   },","","   /**","    * Set the value of both subfields","    * @method setValue","    * @param {Number} val The time interval integer (with the given unit)","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","      var seconds = (typeof val == \"string\" ? parseFloat(val,10) : val)*this.options.unit;","      var units = inputEx.TimeIntervalField.units;","      var selectedUnit,n;","      ","      if(seconds < units.SECOND) {","         selectedUnit = units.SECOND;","         n=1;","      }","      else {","			","			if (seconds % units.YEAR === 0) {","				selectedUnit = units.YEAR;","			} else if (seconds % units.MONTH === 0) {","				selectedUnit = units.MONTH;","			} else if (seconds % units.DAY === 0) {","				selectedUnit = units.DAY;","			} else if (seconds % units.HOUR === 0) {","				selectedUnit = units.HOUR;","			} else if (seconds % units.MINUTE === 0) {","				selectedUnit = units.MINUTE;","			} else {","				selectedUnit = units.SECOND;","			}","			n=Math.floor(seconds/selectedUnit);","		}","","      inputEx.TimeIntervalField.superclass.setValue.call(this, [n, selectedUnit], sendUpdatedEvt);","   }","","});","","inputEx.TimeIntervalField.units = {","   SECOND: 1,","   MINUTE: 60,","   HOUR: 3600,","   DAY: 86400,","   MONTH: 2592000,","   YEAR: 31536000","};","","// Register this class as \"timeinterval\" type","inputEx.registerType(\"timeinterval\", inputEx.TimeIntervalField);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-combine\",","        \"inputex-select\"","    ],","    \"ix_provides\": \"timeinterval\",","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-timeinterval/inputex-timeinterval.js"].lines = {"1":0,"6":0,"19":0,"20":0,"22":0,"30":0,"32":0,"34":0,"35":0,"37":0,"40":0,"42":0,"57":0,"66":0,"67":0,"77":0,"78":0,"79":0,"81":0,"82":0,"83":0,"87":0,"88":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"98":0,"100":0,"103":0,"108":0,"118":0};
_yuitest_coverage["build/inputex-timeinterval/inputex-timeinterval.js"].functions = {"TimeIntervalField:19":0,"setOptions:28":0,"getValue:65":0,"setValue:76":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-timeinterval/inputex-timeinterval.js"].coveredLines = 36;
_yuitest_coverage["build/inputex-timeinterval/inputex-timeinterval.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 1);
YUI.add('inputex-timeinterval', function (Y, NAME) {

/**
 * @module inputex-timeinterval
 */
   _yuitest_coverfunc("build/inputex-timeinterval/inputex-timeinterval.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.TimeIntervalField
 * @extends inputEx.CombineField
 * @constructor
 * @param {Object} options Added options
 * <ul>
 *    <li>unit: inputEx.TimeIntervalField.units.MYUNIT (SECOND,MINUTE,HOUR,DAY,MONTH,YEAR)</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 19);
inputEx.TimeIntervalField = function(options) {
   _yuitest_coverfunc("build/inputex-timeinterval/inputex-timeinterval.js", "TimeIntervalField", 19);
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 20);
inputEx.TimeIntervalField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 22);
Y.extend(inputEx.TimeIntervalField, inputEx.CombineField, {
   
   /**
    * Additional options
    * @method setOptions
    */
   setOptions: function(options) {
      
      _yuitest_coverfunc("build/inputex-timeinterval/inputex-timeinterval.js", "setOptions", 28);
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 30);
inputEx.TimeIntervalField.superclass.setOptions.call(this,options);
      
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 32);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-timeinterval"));

      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 34);
var units = inputEx.TimeIntervalField.units;
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 35);
var unitsStr = this.messages.timeUnits;
      
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 37);
this.options.unit = options.unit || units.SECOND;
      
      
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 40);
var n=[]; for(var i=1;i<=60;i++){ n.push({ value : i }); }
      
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 42);
this.options.fields = options.fields || [
         {type: 'select', choices: n },
         {
            type: 'select',
            choices: [
               { value: units.SECOND, label: unitsStr.SECOND },
               { value: units.MINUTE, label: unitsStr.MINUTE },
               { value: units.HOUR, label: unitsStr.HOUR },
               { value: units.DAY, label: unitsStr.DAY },
               { value: units.MONTH, label: unitsStr.MONTH },
               { value: units.YEAR, label: unitsStr.YEAR }
            ]
         }
      ];
      
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 57);
this.options.separators = options.separators || [false, "&nbsp;&nbsp;", false];
   },
   
   /**
    * Concat the values to return a date
    * @method getValue
    * @return {Integer} the time interval in the field unit
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-timeinterval/inputex-timeinterval.js", "getValue", 65);
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 66);
var v = inputEx.TimeIntervalField.superclass.getValue.call(this);
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 67);
return (parseInt(v[0],10)*v[1])/this.options.unit;
   },

   /**
    * Set the value of both subfields
    * @method setValue
    * @param {Number} val The time interval integer (with the given unit)
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-timeinterval/inputex-timeinterval.js", "setValue", 76);
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 77);
var seconds = (typeof val == "string" ? parseFloat(val,10) : val)*this.options.unit;
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 78);
var units = inputEx.TimeIntervalField.units;
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 79);
var selectedUnit,n;
      
      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 81);
if(seconds < units.SECOND) {
         _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 82);
selectedUnit = units.SECOND;
         _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 83);
n=1;
      }
      else {
			
			_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 87);
if (seconds % units.YEAR === 0) {
				_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 88);
selectedUnit = units.YEAR;
			} else {_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 89);
if (seconds % units.MONTH === 0) {
				_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 90);
selectedUnit = units.MONTH;
			} else {_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 91);
if (seconds % units.DAY === 0) {
				_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 92);
selectedUnit = units.DAY;
			} else {_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 93);
if (seconds % units.HOUR === 0) {
				_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 94);
selectedUnit = units.HOUR;
			} else {_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 95);
if (seconds % units.MINUTE === 0) {
				_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 96);
selectedUnit = units.MINUTE;
			} else {
				_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 98);
selectedUnit = units.SECOND;
			}}}}}
			_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 100);
n=Math.floor(seconds/selectedUnit);
		}

      _yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 103);
inputEx.TimeIntervalField.superclass.setValue.call(this, [n, selectedUnit], sendUpdatedEvt);
   }

});

_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 108);
inputEx.TimeIntervalField.units = {
   SECOND: 1,
   MINUTE: 60,
   HOUR: 3600,
   DAY: 86400,
   MONTH: 2592000,
   YEAR: 31536000
};

// Register this class as "timeinterval" type
_yuitest_coverline("build/inputex-timeinterval/inputex-timeinterval.js", 118);
inputEx.registerType("timeinterval", inputEx.TimeIntervalField);


}, '@VERSION@', {
    "requires": [
        "inputex-combine",
        "inputex-select"
    ],
    "ix_provides": "timeinterval",
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl"
    ]
});
