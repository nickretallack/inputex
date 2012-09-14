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
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].code=["YUI.add('inputex-timerange', function (Y, NAME) {","","/**"," * @module inputex-timerange"," */","YUI.add(\"inputex-timerange\", function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Tweaking the TimeField to make a Time Range (two TimeFields)"," *    - doesn't show seconds"," *    - Minutes by group of 5"," * @module inputex-timerange"," */","inputEx.TimeRange = function(options) {","   ","   var h1 = [], h2 = [], i, m = [], s;","   for(i = 0 ; i < 25 ; i++) { ","		s=\"\";","		if ( i<10 ){ s=\"0\"; } ","		s+= i;","		h2.push({ value: s });","      if ( i<24 ){ h1.push({ value: s }); } // First block of hours musn't contain 24","	}","	m = [{ value: \"00\" },{ value: \"05\" },{ value: \"10\" },{ value: \"15\" },{ value: \"20\" },{ value: \"25\" },{ value: \"30\" },{ value: \"35\" },{ value: \"40\" },{ value: \"45\" },{ value: \"50\" },{ value: \"55\" }];","	","   options.fields = [","      {type: 'select', choices: h1 },","      {type: 'select', choices: m },","      {type: 'select', choices: h2 },","      {type: 'select', choices: m }","   ];","","   options.separators = options.separators || [false,\"H\",\"&nbsp; à &nbsp;\",\"H\",false];","   inputEx.TimeRange.superclass.constructor.call(this,options);","","	// Hook toogleEndMinutes to the \"updated\" event of the 3d select","	// Like that when the user selects/unselects 24h the minutes will toogle accordingly","	var that = this;","	this.inputs[2].on('updated',function(){","		that.toogleEndMinutes();","	});","	","};","","Y.extend(inputEx.TimeRange, inputEx.CombineField, {   ","   /**","    * Returns an array like [\"HH:MM\",\"HH:MM\"]","    * @method getValue","    */","   getValue: function() {","      var values = inputEx.TimeRange.superclass.getValue.call(this);","","		var returnedValue = [];","		returnedValue.push(values[0]+\":\"+values[1]);","		returnedValue.push(values[2]+\":\"+values[3]);","		","      return returnedValue;","   },","","   /**","    * Set the value ","    * @method setValue","    * @param {array} array with 4 Hour strings in display order (format [\"HH\",\"MM\", \"HH\",\"MM\"])","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(arr, sendUpdatedEvt) {","		var values = arr[0].split(\":\").concat(arr[1].split(\":\"));","      inputEx.TimeRange.superclass.setValue.call(this, values, sendUpdatedEvt);","		this.toogleEndMinutes();","   },","","	/**","	 * Disable the last selector and set it to \"00\" when the third one's value is 24","	 * (it will be inccorect to have an end superior to 24:00)","	 * @method toggleEndMinutes","	 */","	toogleEndMinutes: function(){		","		var endHours = this.inputs[2];","		var endMinutes = this.inputs[3];","		","		if( endHours.getValue() == '24' ){ endMinutes.setValue(\"00\"); endMinutes.disable();}","		else{ endMinutes.enable(); }		","	},","","   /**","    * @method validate","    */","	validate: function(){","		var values = this.getValue();","		","		var hm = values[1].split(\":\");","		if(hm[0] == '24' && hm[1] != '00'){","			return false;","		}","		","		if(values[0] >= values[1]){","			return false;	","		}","		","		return true;","	}","","});","","inputEx.registerType(\"timerange\", inputEx.TimeRange);","","}, '3.1.0',{","requires: ['inputex-combine', 'inputex-select']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].lines = {"1":0,"6":0,"8":0,"17":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"27":0,"29":0,"36":0,"37":0,"41":0,"42":0,"43":0,"48":0,"54":0,"56":0,"57":0,"58":0,"60":0,"70":0,"71":0,"72":0,"81":0,"82":0,"84":0,"92":0,"94":0,"95":0,"96":0,"99":0,"100":0,"103":0,"108":0};
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].functions = {"(anonymous 3):42":0,"TimeRange:17":0,"getValue:53":0,"setValue:69":0,"toogleEndMinutes:80":0,"validate:91":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].coveredLines = 38;
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 1);
YUI.add('inputex-timerange', function (Y, NAME) {

/**
 * @module inputex-timerange
 */
_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 6);
YUI.add("inputex-timerange", function(Y){

   _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Tweaking the TimeField to make a Time Range (two TimeFields)
 *    - doesn't show seconds
 *    - Minutes by group of 5
 * @module inputex-timerange
 */
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 17);
inputEx.TimeRange = function(options) {
   
   _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "TimeRange", 17);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 19);
var h1 = [], h2 = [], i, m = [], s;
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 20);
for(i = 0 ; i < 25 ; i++) { 
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 21);
s="";
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 22);
if ( i<10 ){ s="0"; } 
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 23);
s+= i;
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 24);
h2.push({ value: s });
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 25);
if ( i<24 ){ h1.push({ value: s }); } // First block of hours musn't contain 24
	}
	_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 27);
m = [{ value: "00" },{ value: "05" },{ value: "10" },{ value: "15" },{ value: "20" },{ value: "25" },{ value: "30" },{ value: "35" },{ value: "40" },{ value: "45" },{ value: "50" },{ value: "55" }];
	
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 29);
options.fields = [
      {type: 'select', choices: h1 },
      {type: 'select', choices: m },
      {type: 'select', choices: h2 },
      {type: 'select', choices: m }
   ];

   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 36);
options.separators = options.separators || [false,"H","&nbsp; à &nbsp;","H",false];
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 37);
inputEx.TimeRange.superclass.constructor.call(this,options);

	// Hook toogleEndMinutes to the "updated" event of the 3d select
	// Like that when the user selects/unselects 24h the minutes will toogle accordingly
	_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 41);
var that = this;
	_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 42);
this.inputs[2].on('updated',function(){
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "(anonymous 3)", 42);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 43);
that.toogleEndMinutes();
	});
	
};

_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 48);
Y.extend(inputEx.TimeRange, inputEx.CombineField, {   
   /**
    * Returns an array like ["HH:MM","HH:MM"]
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "getValue", 53);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 54);
var values = inputEx.TimeRange.superclass.getValue.call(this);

		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 56);
var returnedValue = [];
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 57);
returnedValue.push(values[0]+":"+values[1]);
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 58);
returnedValue.push(values[2]+":"+values[3]);
		
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 60);
return returnedValue;
   },

   /**
    * Set the value 
    * @method setValue
    * @param {array} array with 4 Hour strings in display order (format ["HH","MM", "HH","MM"])
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(arr, sendUpdatedEvt) {
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "setValue", 69);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 70);
var values = arr[0].split(":").concat(arr[1].split(":"));
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 71);
inputEx.TimeRange.superclass.setValue.call(this, values, sendUpdatedEvt);
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 72);
this.toogleEndMinutes();
   },

	/**
	 * Disable the last selector and set it to "00" when the third one's value is 24
	 * (it will be inccorect to have an end superior to 24:00)
	 * @method toggleEndMinutes
	 */
	toogleEndMinutes: function(){		
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "toogleEndMinutes", 80);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 81);
var endHours = this.inputs[2];
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 82);
var endMinutes = this.inputs[3];
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 84);
if( endHours.getValue() == '24' ){ endMinutes.setValue("00"); endMinutes.disable();}
		else{ endMinutes.enable(); }		
	},

   /**
    * @method validate
    */
	validate: function(){
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "validate", 91);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 92);
var values = this.getValue();
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 94);
var hm = values[1].split(":");
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 95);
if(hm[0] == '24' && hm[1] != '00'){
			_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 96);
return false;
		}
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 99);
if(values[0] >= values[1]){
			_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 100);
return false;	
		}
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 103);
return true;
	}

});

_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 108);
inputEx.registerType("timerange", inputEx.TimeRange);

}, '3.1.0',{
requires: ['inputex-combine', 'inputex-select']
});


}, '@VERSION@');
