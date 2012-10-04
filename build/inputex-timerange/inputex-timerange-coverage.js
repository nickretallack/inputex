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
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].code=["YUI.add('inputex-timerange', function (Y, NAME) {","","/**"," * @module inputex-timerange"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Tweaking the TimeField to make a Time Range (two TimeFields)"," *    - doesn't show seconds"," *    - Minutes by group of 5"," * @module inputex-timerange"," */","inputEx.TimeRange = function(options) {","   ","   var h1 = [], h2 = [], i, m = [], s;","   for(i = 0 ; i < 25 ; i++) { ","		s=\"\";","		if ( i<10 ){ s=\"0\"; } ","		s+= i;","		h2.push({ value: s });","      if ( i<24 ){ h1.push({ value: s }); } // First block of hours musn't contain 24","	}","	m = [{ value: \"00\" },{ value: \"05\" },{ value: \"10\" },{ value: \"15\" },{ value: \"20\" },{ value: \"25\" },{ value: \"30\" },{ value: \"35\" },{ value: \"40\" },{ value: \"45\" },{ value: \"50\" },{ value: \"55\" }];","	","   options.fields = [","      {type: 'select', choices: h1 },","      {type: 'select', choices: m },","      {type: 'select', choices: h2 },","      {type: 'select', choices: m }","   ];","","   options.separators = options.separators || [false,\"H\",\"&nbsp; à &nbsp;\",\"H\",false];","   inputEx.TimeRange.superclass.constructor.call(this,options);","","	// Hook toogleEndMinutes to the \"updated\" event of the 3d select","	// Like that when the user selects/unselects 24h the minutes will toogle accordingly","	var that = this;","	this.inputs[2].on('updated',function(){","		that.toogleEndMinutes();","	});","	","};","","Y.extend(inputEx.TimeRange, inputEx.CombineField, {   ","   /**","    * Returns an array like [\"HH:MM\",\"HH:MM\"]","    * @method getValue","    */","   getValue: function() {","      var values = inputEx.TimeRange.superclass.getValue.call(this);","","		var returnedValue = [];","		returnedValue.push(values[0]+\":\"+values[1]);","		returnedValue.push(values[2]+\":\"+values[3]);","		","      return returnedValue;","   },","","   /**","    * Set the value ","    * @method setValue","    * @param {array} array with 4 Hour strings in display order (format [\"HH\",\"MM\", \"HH\",\"MM\"])","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(arr, sendUpdatedEvt) {","		var values = arr[0].split(\":\").concat(arr[1].split(\":\"));","      inputEx.TimeRange.superclass.setValue.call(this, values, sendUpdatedEvt);","		this.toogleEndMinutes();","   },","","	/**","	 * Disable the last selector and set it to \"00\" when the third one's value is 24","	 * (it will be inccorect to have an end superior to 24:00)","	 * @method toggleEndMinutes","	 */","	toogleEndMinutes: function(){		","		var endHours = this.inputs[2];","		var endMinutes = this.inputs[3];","		","		if( endHours.getValue() == '24' ){ endMinutes.setValue(\"00\"); endMinutes.disable();}","		else{ endMinutes.enable(); }		","	},","","   /**","    * @method validate","    */","	validate: function(){","		var values = this.getValue();","		","		var hm = values[1].split(\":\");","		if(hm[0] == '24' && hm[1] != '00'){","			return false;","		}","		","		if(values[0] >= values[1]){","			return false;	","		}","		","		return true;","	}","","});","","inputEx.registerType(\"timerange\", inputEx.TimeRange);","","","}, '@VERSION@', {\"requires\": [\"inputex-combine\", \"inputex-select\"], \"ix_provides\": \"timerange\"});"];
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].lines = {"1":0,"6":0,"15":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"25":0,"27":0,"34":0,"35":0,"39":0,"40":0,"41":0,"46":0,"52":0,"54":0,"55":0,"56":0,"58":0,"68":0,"69":0,"70":0,"79":0,"80":0,"82":0,"90":0,"92":0,"93":0,"94":0,"97":0,"98":0,"101":0,"106":0};
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].functions = {"(anonymous 2):40":0,"TimeRange:15":0,"getValue:51":0,"setValue:67":0,"toogleEndMinutes:78":0,"validate:89":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].coveredLines = 37;
_yuitest_coverage["build/inputex-timerange/inputex-timerange.js"].coveredFunctions = 7;
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
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 17);
var h1 = [], h2 = [], i, m = [], s;
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 18);
for(i = 0 ; i < 25 ; i++) { 
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 19);
s="";
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 20);
if ( i<10 ){ s="0"; } 
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 21);
s+= i;
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 22);
h2.push({ value: s });
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 23);
if ( i<24 ){ h1.push({ value: s }); } // First block of hours musn't contain 24
	}
	_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 25);
m = [{ value: "00" },{ value: "05" },{ value: "10" },{ value: "15" },{ value: "20" },{ value: "25" },{ value: "30" },{ value: "35" },{ value: "40" },{ value: "45" },{ value: "50" },{ value: "55" }];
	
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 27);
options.fields = [
      {type: 'select', choices: h1 },
      {type: 'select', choices: m },
      {type: 'select', choices: h2 },
      {type: 'select', choices: m }
   ];

   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 34);
options.separators = options.separators || [false,"H","&nbsp; à &nbsp;","H",false];
   _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 35);
inputEx.TimeRange.superclass.constructor.call(this,options);

	// Hook toogleEndMinutes to the "updated" event of the 3d select
	// Like that when the user selects/unselects 24h the minutes will toogle accordingly
	_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 39);
var that = this;
	_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 40);
this.inputs[2].on('updated',function(){
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "(anonymous 2)", 40);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 41);
that.toogleEndMinutes();
	});
	
};

_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 46);
Y.extend(inputEx.TimeRange, inputEx.CombineField, {   
   /**
    * Returns an array like ["HH:MM","HH:MM"]
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "getValue", 51);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 52);
var values = inputEx.TimeRange.superclass.getValue.call(this);

		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 54);
var returnedValue = [];
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 55);
returnedValue.push(values[0]+":"+values[1]);
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 56);
returnedValue.push(values[2]+":"+values[3]);
		
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 58);
return returnedValue;
   },

   /**
    * Set the value 
    * @method setValue
    * @param {array} array with 4 Hour strings in display order (format ["HH","MM", "HH","MM"])
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(arr, sendUpdatedEvt) {
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "setValue", 67);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 68);
var values = arr[0].split(":").concat(arr[1].split(":"));
      _yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 69);
inputEx.TimeRange.superclass.setValue.call(this, values, sendUpdatedEvt);
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 70);
this.toogleEndMinutes();
   },

	/**
	 * Disable the last selector and set it to "00" when the third one's value is 24
	 * (it will be inccorect to have an end superior to 24:00)
	 * @method toggleEndMinutes
	 */
	toogleEndMinutes: function(){		
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "toogleEndMinutes", 78);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 79);
var endHours = this.inputs[2];
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 80);
var endMinutes = this.inputs[3];
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 82);
if( endHours.getValue() == '24' ){ endMinutes.setValue("00"); endMinutes.disable();}
		else{ endMinutes.enable(); }		
	},

   /**
    * @method validate
    */
	validate: function(){
		_yuitest_coverfunc("build/inputex-timerange/inputex-timerange.js", "validate", 89);
_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 90);
var values = this.getValue();
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 92);
var hm = values[1].split(":");
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 93);
if(hm[0] == '24' && hm[1] != '00'){
			_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 94);
return false;
		}
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 97);
if(values[0] >= values[1]){
			_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 98);
return false;	
		}
		
		_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 101);
return true;
	}

});

_yuitest_coverline("build/inputex-timerange/inputex-timerange.js", 106);
inputEx.registerType("timerange", inputEx.TimeRange);


}, '@VERSION@', {"requires": ["inputex-combine", "inputex-select"], "ix_provides": "timerange"});
