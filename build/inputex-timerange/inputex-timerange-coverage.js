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
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-timerange/inputex-timerange.js",
    code: []
};
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].code=["YUI.add('inputex-timerange', function (Y, NAME) {","","/**"," * @module inputex-timerange"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Tweaking the TimeField to make a Time Range (two TimeFields)"," *    - doesn't show seconds"," *    - Minutes by group of 5"," * @module inputex-timerange"," */","inputEx.TimeRange = function(options) {","   var h1 = [], h2 = [], i, m = [], s;","","   for(i = 0 ; i < 25 ; i++) {","      s = i < 10 ?  \"0\" : \"\";","      s += i;","      h2.push({ value: s });","      if ( i<24 ){ h1.push({ value: s }); } // First block of hours musn't contain 24","   }","   m = [{ value: \"00\" },{ value: \"05\" },{ value: \"10\" },{ value: \"15\" },{ value: \"20\" },{ value: \"25\" },{ value: \"30\" },{ value: \"35\" },{ value: \"40\" },{ value: \"45\" },{ value: \"50\" },{ value: \"55\" }];","   ","   options.fields = [","      {type: 'select', choices: h1 },","      {type: 'select', choices: m },","      {type: 'select', choices: h2 },","      {type: 'select', choices: m }","   ];","","   options.separators = options.separators || [false,\"H\",\"&nbsp; à &nbsp;\",\"H\",false];","   inputEx.TimeRange.superclass.constructor.call(this,options);","","","   // Hook toggleEndMinutes to the \"updated\" event of the 3d select","   // Like that when the user selects/unselects 24h the minutes will toogle accordingly","   this.inputs[3].on('updated', this.toggleEndMinutes, this);","};","","Y.extend(inputEx.TimeRange, inputEx.CombineField, {","","   setOptions: function(options) {","      inputEx.TimeRange.superclass.setOptions.call(this, options);","","      // I18N","      this.messages = Y.mix(this.messages,Y.Intl.get(\"inputex-timerange\"));","","      if (options.minTime) {","         this.setMinTime(options.mintime);","      }","   },","","   setMinTime: function (time) {","      this.options.minTime = time;","      this.setClassFromState();","   },","","   onChange: function () {","      this.setClassFromState();","      inputEx.TimeRange.superclass.onChange.call(this);","   },","","   /**","    * Returns an array like [\"HH:MM\",\"HH:MM\"]","    * @method getValue","    */","   getValue: function() {","      var values = inputEx.TimeRange.superclass.getValue.call(this);","","      var returnedValue = [];","      returnedValue.push(values[0]+\":\"+values[1]);","      returnedValue.push(values[2]+\":\"+values[3]);","      ","      return returnedValue;","   },","","   /**","    * Set the value","    * @method setValue","    * @param {array} array with 4 Hour strings in display order (format [\"HH\",\"MM\", \"HH\",\"MM\"])","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(arr, sendUpdatedEvt) {","      var values = arr[0].split(\":\").concat(arr[1].split(\":\"));","      inputEx.TimeRange.superclass.setValue.call(this, values, sendUpdatedEvt);","      this.toggleEndMinutes();","   },","","   /**","    * Disable the last selector and set it to \"00\" when the third one's value is 24","    * (it will be inccorect to have an end superior to 24:00)","    * @method toggleEndMinutes","    */","   toggleEndMinutes: function(){","      var endHours   = this.inputs[2],","          endMinutes = this.inputs[3];","      ","      if (endHours.getValue() === '24') {","         endMinutes.setValue(\"00\", false);","         endMinutes.disable();","      }","      else {","         endMinutes.enable();","      }","   },","","   /**","    * Add the minLength string message handling","    * @method getStateString","    */","   getStateString: function(state) {","      var values  = this.getValue(),","          minTime = this.options.minTime;","","      if (state === inputEx.stateInvalid && values[0] >= values[1]) {","         return this.messages.incorrectOrder;","      }","","      if (state === inputEx.stateInvalid && minTime && values[0] <= minTime) {","         return Y.Lang.sub(this.messages.minTimeError, {minTime: minTime});","      }","","      return inputEx.TimeRange.superclass.getStateString.call(this, state);","   },","","   /**","    * @method validate","    */","   validate: function(){","      var values = this.getValue();","      ","      var hm = values[1].split(\":\");","      if(hm[0] == '24' && hm[1] != '00'){","         return false;","      }","      ","      if(values[0] >= values[1]){","         return false;","      }","","      if (this.options.minTime && values[0] <= this.options.minTime) {","         return false;","      }","      ","      return true;","   }","","});","","inputEx.registerType(\"timerange\", inputEx.TimeRange);","","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"inputex-combine\",","        \"inputex-select\"","    ],","    \"lang\": [","        \"en\",","        \"fr\"","    ],","    \"ix_provides\": \"timerange\"","});"];
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].lines = {"1":0,"6":0,"15":0,"16":0,"18":0,"19":0,"20":0,"21":0,"22":0,"24":0,"26":0,"33":0,"34":0,"39":0,"42":0,"45":0,"48":0,"50":0,"51":0,"56":0,"57":0,"61":0,"62":0,"70":0,"72":0,"73":0,"74":0,"76":0,"86":0,"87":0,"88":0,"97":0,"100":0,"101":0,"102":0,"105":0,"114":0,"117":0,"118":0,"121":0,"122":0,"125":0,"132":0,"134":0,"135":0,"136":0,"139":0,"140":0,"143":0,"144":0,"147":0,"152":0};
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].functions = {"TimeRange:15":0,"setOptions:44":0,"setMinTime:55":0,"onChange:60":0,"getValue:69":0,"setValue:85":0,"toggleEndMinutes:96":0,"getStateString:113":0,"validate:131":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].coveredLines = 52;
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].coveredFunctions = 10;
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 1);
YUI.add('inputex-timerange', function (Y, NAME) {

/**
 * @module inputex-timerange
 */
   _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Tweaking the TimeField to make a Time Range (two TimeFields)
 *    - doesn't show seconds
 *    - Minutes by group of 5
 * @module inputex-timerange
 */
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 15);
inputEx.TimeRange = function(options) {
   _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "TimeRange", 15);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 16);
var h1 = [], h2 = [], i, m = [], s;

   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 18);
for(i = 0 ; i < 25 ; i++) {
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 19);
s = i < 10 ?  "0" : "";
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 20);
s += i;
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 21);
h2.push({ value: s });
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 22);
if ( i<24 ){ h1.push({ value: s }); } // First block of hours musn't contain 24
   }
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 24);
m = [{ value: "00" },{ value: "05" },{ value: "10" },{ value: "15" },{ value: "20" },{ value: "25" },{ value: "30" },{ value: "35" },{ value: "40" },{ value: "45" },{ value: "50" },{ value: "55" }];
   
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 26);
options.fields = [
      {type: 'select', choices: h1 },
      {type: 'select', choices: m },
      {type: 'select', choices: h2 },
      {type: 'select', choices: m }
   ];

   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 33);
options.separators = options.separators || [false,"H","&nbsp; à &nbsp;","H",false];
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 34);
inputEx.TimeRange.superclass.constructor.call(this,options);


   // Hook toggleEndMinutes to the "updated" event of the 3d select
   // Like that when the user selects/unselects 24h the minutes will toogle accordingly
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 39);
this.inputs[3].on('updated', this.toggleEndMinutes, this);
};

_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 42);
Y.extend(inputEx.TimeRange, inputEx.CombineField, {

   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "setOptions", 44);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 45);
inputEx.TimeRange.superclass.setOptions.call(this, options);

      // I18N
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 48);
this.messages = Y.mix(this.messages,Y.Intl.get("inputex-timerange"));

      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 50);
if (options.minTime) {
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 51);
this.setMinTime(options.mintime);
      }
   },

   setMinTime: function (time) {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "setMinTime", 55);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 56);
this.options.minTime = time;
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 57);
this.setClassFromState();
   },

   onChange: function () {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "onChange", 60);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 61);
this.setClassFromState();
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 62);
inputEx.TimeRange.superclass.onChange.call(this);
   },

   /**
    * Returns an array like ["HH:MM","HH:MM"]
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "getValue", 69);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 70);
var values = inputEx.TimeRange.superclass.getValue.call(this);

      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 72);
var returnedValue = [];
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 73);
returnedValue.push(values[0]+":"+values[1]);
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 74);
returnedValue.push(values[2]+":"+values[3]);
      
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 76);
return returnedValue;
   },

   /**
    * Set the value
    * @method setValue
    * @param {array} array with 4 Hour strings in display order (format ["HH","MM", "HH","MM"])
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(arr, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "setValue", 85);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 86);
var values = arr[0].split(":").concat(arr[1].split(":"));
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 87);
inputEx.TimeRange.superclass.setValue.call(this, values, sendUpdatedEvt);
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 88);
this.toggleEndMinutes();
   },

   /**
    * Disable the last selector and set it to "00" when the third one's value is 24
    * (it will be inccorect to have an end superior to 24:00)
    * @method toggleEndMinutes
    */
   toggleEndMinutes: function(){
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "toggleEndMinutes", 96);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 97);
var endHours   = this.inputs[2],
          endMinutes = this.inputs[3];
      
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 100);
if (endHours.getValue() === '24') {
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 101);
endMinutes.setValue("00", false);
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 102);
endMinutes.disable();
      }
      else {
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 105);
endMinutes.enable();
      }
   },

   /**
    * Add the minLength string message handling
    * @method getStateString
    */
   getStateString: function(state) {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "getStateString", 113);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 114);
var values  = this.getValue(),
          minTime = this.options.minTime;

      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 117);
if (state === inputEx.stateInvalid && values[0] >= values[1]) {
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 118);
return this.messages.incorrectOrder;
      }

      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 121);
if (state === inputEx.stateInvalid && minTime && values[0] <= minTime) {
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 122);
return Y.Lang.sub(this.messages.minTimeError, {minTime: minTime});
      }

      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 125);
return inputEx.TimeRange.superclass.getStateString.call(this, state);
   },

   /**
    * @method validate
    */
   validate: function(){
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "validate", 131);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 132);
var values = this.getValue();
      
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 134);
var hm = values[1].split(":");
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 135);
if(hm[0] == '24' && hm[1] != '00'){
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 136);
return false;
      }
      
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 139);
if(values[0] >= values[1]){
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 140);
return false;
      }

      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 143);
if (this.options.minTime && values[0] <= this.options.minTime) {
         _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 144);
return false;
      }
      
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 147);
return true;
   }

});

_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 152);
inputEx.registerType("timerange", inputEx.TimeRange);


}, '@VERSION@', {
    "requires": [
        "intl",
        "inputex-combine",
        "inputex-select"
    ],
    "lang": [
        "en",
        "fr"
    ],
    "ix_provides": "timerange"
});
