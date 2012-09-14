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
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].code=["YUI.add('inputex-dateselectmonth', function (Y, NAME) {","","/**"," * @module inputex-dateselectmonth"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","	","	/**","	 * A field to enter a date with 2 strings and a select","	 * @class inputEx.DateSelectMonthField","	 * @extends inputEx.CombineField","	 */","	inputEx.DateSelectMonthField = function (options) {","		","		var formatSplit, selectOptions, i, j, monthsNb;","		","		if (!options.dateFormat) {","			options.dateFormat = inputEx.messages.defaultDateFormat;","		}","		","		formatSplit = options.dateFormat.split(\"/\");","		","		this.yearIndex = inputEx.indexOf('Y', formatSplit);","		this.monthIndex = inputEx.indexOf('m', formatSplit);","		this.dayIndex = inputEx.indexOf('d', formatSplit);","		","		options.fields = [];","		","		for (i = 0 ; i < 3 ; i += 1) {","			","			if (i === this.dayIndex) {","				options.fields.push({ type: 'string', typeInvite: inputEx.messages.dayTypeInvite, size: 2 });","			}","			else if (i === this.yearIndex) {","				options.fields.push({ type: 'string', typeInvite: inputEx.messages.yearTypeInvite, size: 4 });","			}","			else {","				","				selectOptions = [{ value: -1, label: inputEx.messages.selectMonth }];","				","				for (j = 0, monthsNb = inputEx.messages.months.length; j < monthsNb; j += 1) {","					selectOptions.push({ value: j, label: inputEx.messages.months[j] });","				}","				","				options.fields.push({ type: 'select', choices: selectOptions, value: -1 });","			}","			","		}","		","		options.separators = options.separators || [false, \"&nbsp;\", \"&nbsp;\", false];","		","		inputEx.DateSelectMonthField.superclass.constructor.call(this, options);","	};","	","	Y.extend(inputEx.DateSelectMonthField, inputEx.CombineField, {","		","		/**","		 * @method setValue","		 */","		setValue: function (value, sendUpdatedEvt) {","			","			var values, i;","			","			values = [];","			","			// !value catches \"\" (empty field), other tests invalid dates (Invalid Date, or NaN)","			if (!value || !(value instanceof Date) || !lang.isNumber(value.getTime())) {","				values[this.monthIndex] = -1;","				values[this.yearIndex] = \"\";","				values[this.dayIndex] = \"\";","			} else {","				for (i = 0 ; i < 3 ; i += 1) {","					values.push(i === this.dayIndex ? value.getDate() : (i === this.yearIndex ? value.getFullYear() : value.getMonth()));","				}","			}","			inputEx.DateSelectMonthField.superclass.setValue.call(this, values, sendUpdatedEvt);","		},","		","		/**","		 * @method getValue","		 */","		getValue: function () {","			","			var values;","			","			if (this.isEmpty()) {","				return \"\";","			}","			","			values = inputEx.DateSelectMonthField.superclass.getValue.call(this);","			","			// if selected month index is -1, new Date(..) would create a valid date with month == December !!!)","			if (values[this.monthIndex] === -1) {","				return new Date(NaN, NaN, NaN); // -> Invalid Date (Firefox) or NaN (IE) (both instanceof Date ...)","			}","			","			return new Date(parseInt(values[this.yearIndex], 10), values[this.monthIndex], parseInt(values[this.dayIndex], 10));","		},","		","		/**","		 * @method validate","		 */","		validate: function () {","			","			var val = this.getValue();","			","			// empty field","			if (val === '') {","				// validate only if not required","				return !this.options.required;","			}","			","			// val is :","			//  -> a Date, when valid","			//  -> an Invalid Date (== \"Invalid Date\"), when invalid on FF","			//  -> NaN, when invalid on IE","			//","			// These 3 cases would pass the \"val instanceof Date\" test, ","			// but last 2 cases return NaN on val.getDate(), so \"isFinite\" test fails.","			return (val instanceof Date && lang.isNumber(val.getTime()));","		},","		","		/**","		 * @method isEmpty","		 */","		isEmpty: function () {","			var values = inputEx.DateSelectMonthField.superclass.getValue.call(this);","			return (values[this.monthIndex] === -1 && values[this.yearIndex] === \"\" &&  values[this.dayIndex] === \"\");","		}","		","	});","	","	// Register this class as \"dateselectmonth\" type","	inputEx.registerType(\"dateselectmonth\", inputEx.DateSelectMonthField);","","","}, '@VERSION@', {\"requires\": [\"inputex-combine\", \"inputex-string\", \"inputex-select\"], \"ix_provides\": \"dateselectmonth\"});"];
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].lines = {"1":0,"6":0,"14":0,"16":0,"18":0,"19":0,"22":0,"24":0,"25":0,"26":0,"28":0,"30":0,"32":0,"33":0,"35":0,"36":0,"40":0,"42":0,"43":0,"46":0,"51":0,"53":0,"56":0,"63":0,"65":0,"68":0,"69":0,"70":0,"71":0,"73":0,"74":0,"77":0,"85":0,"87":0,"88":0,"91":0,"94":0,"95":0,"98":0,"106":0,"109":0,"111":0,"121":0,"128":0,"129":0,"135":0};
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].functions = {"DateSelectMonthField:14":0,"setValue:61":0,"getValue:83":0,"validate:104":0,"isEmpty:127":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].coveredLines = 46;
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 1);
YUI.add('inputex-dateselectmonth', function (Y, NAME) {

/**
 * @module inputex-dateselectmonth
 */
  _yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;
	
	/**
	 * A field to enter a date with 2 strings and a select
	 * @class inputEx.DateSelectMonthField
	 * @extends inputEx.CombineField
	 */
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 14);
inputEx.DateSelectMonthField = function (options) {
		
		_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "DateSelectMonthField", 14);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 16);
var formatSplit, selectOptions, i, j, monthsNb;
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 18);
if (!options.dateFormat) {
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 19);
options.dateFormat = inputEx.messages.defaultDateFormat;
		}
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 22);
formatSplit = options.dateFormat.split("/");
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 24);
this.yearIndex = inputEx.indexOf('Y', formatSplit);
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 25);
this.monthIndex = inputEx.indexOf('m', formatSplit);
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 26);
this.dayIndex = inputEx.indexOf('d', formatSplit);
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 28);
options.fields = [];
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 30);
for (i = 0 ; i < 3 ; i += 1) {
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 32);
if (i === this.dayIndex) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 33);
options.fields.push({ type: 'string', typeInvite: inputEx.messages.dayTypeInvite, size: 2 });
			}
			else {_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 35);
if (i === this.yearIndex) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 36);
options.fields.push({ type: 'string', typeInvite: inputEx.messages.yearTypeInvite, size: 4 });
			}
			else {
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 40);
selectOptions = [{ value: -1, label: inputEx.messages.selectMonth }];
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 42);
for (j = 0, monthsNb = inputEx.messages.months.length; j < monthsNb; j += 1) {
					_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 43);
selectOptions.push({ value: j, label: inputEx.messages.months[j] });
				}
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 46);
options.fields.push({ type: 'select', choices: selectOptions, value: -1 });
			}}
			
		}
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 51);
options.separators = options.separators || [false, "&nbsp;", "&nbsp;", false];
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 53);
inputEx.DateSelectMonthField.superclass.constructor.call(this, options);
	};
	
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 56);
Y.extend(inputEx.DateSelectMonthField, inputEx.CombineField, {
		
		/**
		 * @method setValue
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "setValue", 61);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 63);
var values, i;
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 65);
values = [];
			
			// !value catches "" (empty field), other tests invalid dates (Invalid Date, or NaN)
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 68);
if (!value || !(value instanceof Date) || !lang.isNumber(value.getTime())) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 69);
values[this.monthIndex] = -1;
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 70);
values[this.yearIndex] = "";
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 71);
values[this.dayIndex] = "";
			} else {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 73);
for (i = 0 ; i < 3 ; i += 1) {
					_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 74);
values.push(i === this.dayIndex ? value.getDate() : (i === this.yearIndex ? value.getFullYear() : value.getMonth()));
				}
			}
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 77);
inputEx.DateSelectMonthField.superclass.setValue.call(this, values, sendUpdatedEvt);
		},
		
		/**
		 * @method getValue
		 */
		getValue: function () {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "getValue", 83);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 85);
var values;
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 87);
if (this.isEmpty()) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 88);
return "";
			}
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 91);
values = inputEx.DateSelectMonthField.superclass.getValue.call(this);
			
			// if selected month index is -1, new Date(..) would create a valid date with month == December !!!)
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 94);
if (values[this.monthIndex] === -1) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 95);
return new Date(NaN, NaN, NaN); // -> Invalid Date (Firefox) or NaN (IE) (both instanceof Date ...)
			}
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 98);
return new Date(parseInt(values[this.yearIndex], 10), values[this.monthIndex], parseInt(values[this.dayIndex], 10));
		},
		
		/**
		 * @method validate
		 */
		validate: function () {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "validate", 104);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 106);
var val = this.getValue();
			
			// empty field
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 109);
if (val === '') {
				// validate only if not required
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 111);
return !this.options.required;
			}
			
			// val is :
			//  -> a Date, when valid
			//  -> an Invalid Date (== "Invalid Date"), when invalid on FF
			//  -> NaN, when invalid on IE
			//
			// These 3 cases would pass the "val instanceof Date" test, 
			// but last 2 cases return NaN on val.getDate(), so "isFinite" test fails.
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 121);
return (val instanceof Date && lang.isNumber(val.getTime()));
		},
		
		/**
		 * @method isEmpty
		 */
		isEmpty: function () {
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "isEmpty", 127);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 128);
var values = inputEx.DateSelectMonthField.superclass.getValue.call(this);
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 129);
return (values[this.monthIndex] === -1 && values[this.yearIndex] === "" &&  values[this.dayIndex] === "");
		}
		
	});
	
	// Register this class as "dateselectmonth" type
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 135);
inputEx.registerType("dateselectmonth", inputEx.DateSelectMonthField);


}, '@VERSION@', {"requires": ["inputex-combine", "inputex-string", "inputex-select"], "ix_provides": "dateselectmonth"});
