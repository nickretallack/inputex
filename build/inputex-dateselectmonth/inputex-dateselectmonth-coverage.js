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
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-dateselectmonth/inputex-dateselectmonth.js",
    code: []
};
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].code=["YUI.add('inputex-dateselectmonth', function (Y, NAME) {","","/**"," * @module inputex-dateselectmonth"," */","YUI.add(\"inputex-dateselectmonth\", function(Y) {","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","	","	/**","	 * A field to enter a date with 2 strings and a select","	 * @class inputEx.DateSelectMonthField","	 * @extends inputEx.CombineField","	 */","	inputEx.DateSelectMonthField = function (options) {","		","		var formatSplit, selectOptions, i, j, monthsNb;","		","		if (!options.dateFormat) {","			options.dateFormat = inputEx.messages.defaultDateFormat;","		}","		","		formatSplit = options.dateFormat.split(\"/\");","		","		this.yearIndex = inputEx.indexOf('Y', formatSplit);","		this.monthIndex = inputEx.indexOf('m', formatSplit);","		this.dayIndex = inputEx.indexOf('d', formatSplit);","		","		options.fields = [];","		","		for (i = 0 ; i < 3 ; i += 1) {","			","			if (i === this.dayIndex) {","				options.fields.push({ type: 'string', typeInvite: inputEx.messages.dayTypeInvite, size: 2 });","			}","			else if (i === this.yearIndex) {","				options.fields.push({ type: 'string', typeInvite: inputEx.messages.yearTypeInvite, size: 4 });","			}","			else {","				","				selectOptions = [{ value: -1, label: inputEx.messages.selectMonth }];","				","				for (j = 0, monthsNb = inputEx.messages.months.length; j < monthsNb; j += 1) {","					selectOptions.push({ value: j, label: inputEx.messages.months[j] });","				}","				","				options.fields.push({ type: 'select', choices: selectOptions, value: -1 });","			}","			","		}","		","		options.separators = options.separators || [false, \"&nbsp;\", \"&nbsp;\", false];","		","		inputEx.DateSelectMonthField.superclass.constructor.call(this, options);","	};","	","	Y.extend(inputEx.DateSelectMonthField, inputEx.CombineField, {","		","		/**","		 * @method setValue","		 */","		setValue: function (value, sendUpdatedEvt) {","			","			var values, i;","			","			values = [];","			","			// !value catches \"\" (empty field), other tests invalid dates (Invalid Date, or NaN)","			if (!value || !(value instanceof Date) || !lang.isNumber(value.getTime())) {","				values[this.monthIndex] = -1;","				values[this.yearIndex] = \"\";","				values[this.dayIndex] = \"\";","			} else {","				for (i = 0 ; i < 3 ; i += 1) {","					values.push(i === this.dayIndex ? value.getDate() : (i === this.yearIndex ? value.getFullYear() : value.getMonth()));","				}","			}","			inputEx.DateSelectMonthField.superclass.setValue.call(this, values, sendUpdatedEvt);","		},","		","		/**","		 * @method getValue","		 */","		getValue: function () {","			","			var values;","			","			if (this.isEmpty()) {","				return \"\";","			}","			","			values = inputEx.DateSelectMonthField.superclass.getValue.call(this);","			","			// if selected month index is -1, new Date(..) would create a valid date with month == December !!!)","			if (values[this.monthIndex] === -1) {","				return new Date(NaN, NaN, NaN); // -> Invalid Date (Firefox) or NaN (IE) (both instanceof Date ...)","			}","			","			return new Date(parseInt(values[this.yearIndex], 10), values[this.monthIndex], parseInt(values[this.dayIndex], 10));","		},","		","		/**","		 * @method validate","		 */","		validate: function () {","			","			var val = this.getValue();","			","			// empty field","			if (val === '') {","				// validate only if not required","				return !this.options.required;","			}","			","			// val is :","			//  -> a Date, when valid","			//  -> an Invalid Date (== \"Invalid Date\"), when invalid on FF","			//  -> NaN, when invalid on IE","			//","			// These 3 cases would pass the \"val instanceof Date\" test, ","			// but last 2 cases return NaN on val.getDate(), so \"isFinite\" test fails.","			return (val instanceof Date && lang.isNumber(val.getTime()));","		},","		","		/**","		 * @method isEmpty","		 */","		isEmpty: function () {","			var values = inputEx.DateSelectMonthField.superclass.getValue.call(this);","			return (values[this.monthIndex] === -1 && values[this.yearIndex] === \"\" &&  values[this.dayIndex] === \"\");","		}","		","	});","	","	// Register this class as \"dateselectmonth\" type","	inputEx.registerType(\"dateselectmonth\", inputEx.DateSelectMonthField);","	","}, '3.1.0',{","requires: ['inputex-combine']","});","","","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].lines = {"1":0,"6":0,"8":0,"16":0,"18":0,"20":0,"21":0,"24":0,"26":0,"27":0,"28":0,"30":0,"32":0,"34":0,"35":0,"37":0,"38":0,"42":0,"44":0,"45":0,"48":0,"53":0,"55":0,"58":0,"65":0,"67":0,"70":0,"71":0,"72":0,"73":0,"75":0,"76":0,"79":0,"87":0,"89":0,"90":0,"93":0,"96":0,"97":0,"100":0,"108":0,"111":0,"113":0,"123":0,"130":0,"131":0,"137":0};
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].functions = {"DateSelectMonthField:16":0,"setValue:63":0,"getValue:85":0,"validate:106":0,"isEmpty:129":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].coveredLines = 47;
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 1);
YUI.add('inputex-dateselectmonth', function (Y, NAME) {

/**
 * @module inputex-dateselectmonth
 */
_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 6);
YUI.add("inputex-dateselectmonth", function(Y) {

  _yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;
	
	/**
	 * A field to enter a date with 2 strings and a select
	 * @class inputEx.DateSelectMonthField
	 * @extends inputEx.CombineField
	 */
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 16);
inputEx.DateSelectMonthField = function (options) {
		
		_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "DateSelectMonthField", 16);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 18);
var formatSplit, selectOptions, i, j, monthsNb;
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 20);
if (!options.dateFormat) {
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 21);
options.dateFormat = inputEx.messages.defaultDateFormat;
		}
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 24);
formatSplit = options.dateFormat.split("/");
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 26);
this.yearIndex = inputEx.indexOf('Y', formatSplit);
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 27);
this.monthIndex = inputEx.indexOf('m', formatSplit);
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 28);
this.dayIndex = inputEx.indexOf('d', formatSplit);
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 30);
options.fields = [];
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 32);
for (i = 0 ; i < 3 ; i += 1) {
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 34);
if (i === this.dayIndex) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 35);
options.fields.push({ type: 'string', typeInvite: inputEx.messages.dayTypeInvite, size: 2 });
			}
			else {_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 37);
if (i === this.yearIndex) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 38);
options.fields.push({ type: 'string', typeInvite: inputEx.messages.yearTypeInvite, size: 4 });
			}
			else {
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 42);
selectOptions = [{ value: -1, label: inputEx.messages.selectMonth }];
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 44);
for (j = 0, monthsNb = inputEx.messages.months.length; j < monthsNb; j += 1) {
					_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 45);
selectOptions.push({ value: j, label: inputEx.messages.months[j] });
				}
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 48);
options.fields.push({ type: 'select', choices: selectOptions, value: -1 });
			}}
			
		}
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 53);
options.separators = options.separators || [false, "&nbsp;", "&nbsp;", false];
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 55);
inputEx.DateSelectMonthField.superclass.constructor.call(this, options);
	};
	
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 58);
Y.extend(inputEx.DateSelectMonthField, inputEx.CombineField, {
		
		/**
		 * @method setValue
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "setValue", 63);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 65);
var values, i;
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 67);
values = [];
			
			// !value catches "" (empty field), other tests invalid dates (Invalid Date, or NaN)
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 70);
if (!value || !(value instanceof Date) || !lang.isNumber(value.getTime())) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 71);
values[this.monthIndex] = -1;
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 72);
values[this.yearIndex] = "";
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 73);
values[this.dayIndex] = "";
			} else {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 75);
for (i = 0 ; i < 3 ; i += 1) {
					_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 76);
values.push(i === this.dayIndex ? value.getDate() : (i === this.yearIndex ? value.getFullYear() : value.getMonth()));
				}
			}
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 79);
inputEx.DateSelectMonthField.superclass.setValue.call(this, values, sendUpdatedEvt);
		},
		
		/**
		 * @method getValue
		 */
		getValue: function () {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "getValue", 85);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 87);
var values;
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 89);
if (this.isEmpty()) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 90);
return "";
			}
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 93);
values = inputEx.DateSelectMonthField.superclass.getValue.call(this);
			
			// if selected month index is -1, new Date(..) would create a valid date with month == December !!!)
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 96);
if (values[this.monthIndex] === -1) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 97);
return new Date(NaN, NaN, NaN); // -> Invalid Date (Firefox) or NaN (IE) (both instanceof Date ...)
			}
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 100);
return new Date(parseInt(values[this.yearIndex], 10), values[this.monthIndex], parseInt(values[this.dayIndex], 10));
		},
		
		/**
		 * @method validate
		 */
		validate: function () {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "validate", 106);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 108);
var val = this.getValue();
			
			// empty field
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 111);
if (val === '') {
				// validate only if not required
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 113);
return !this.options.required;
			}
			
			// val is :
			//  -> a Date, when valid
			//  -> an Invalid Date (== "Invalid Date"), when invalid on FF
			//  -> NaN, when invalid on IE
			//
			// These 3 cases would pass the "val instanceof Date" test, 
			// but last 2 cases return NaN on val.getDate(), so "isFinite" test fails.
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 123);
return (val instanceof Date && lang.isNumber(val.getTime()));
		},
		
		/**
		 * @method isEmpty
		 */
		isEmpty: function () {
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "isEmpty", 129);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 130);
var values = inputEx.DateSelectMonthField.superclass.getValue.call(this);
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 131);
return (values[this.monthIndex] === -1 && values[this.yearIndex] === "" &&  values[this.dayIndex] === "");
		}
		
	});
	
	// Register this class as "dateselectmonth" type
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 137);
inputEx.registerType("dateselectmonth", inputEx.DateSelectMonthField);
	
}, '3.1.0',{
requires: ['inputex-combine']
});




}, '@VERSION@');
