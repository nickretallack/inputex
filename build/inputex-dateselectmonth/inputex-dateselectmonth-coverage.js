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
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].code=["YUI.add('inputex-dateselectmonth', function (Y, NAME) {","","/**"," * @module inputex-dateselectmonth"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","	","	/**","	 * A field to enter a date with 2 strings and a select","	 * @class inputEx.DateSelectMonthField","	 * @extends inputEx.CombineField","	 */","	inputEx.DateSelectMonthField = function (options) {","		","		var formatSplit, selectOptions, i, j, monthsNb;","		","		// The ressource bundle is loaded here because","		// DateSelectMonthField needs them to construct his fields","","		// this.messages will be overridden by the constructor of Field and re-loaded and mix in setOptions","		this.messages = Y.Intl.get(\"inputex-dateselectmonth\");","","		if (!options.dateFormat) {","			options.dateFormat = this.messages.defaultDateFormat;","		}","		","		formatSplit = options.dateFormat.split(\"/\");","		","		this.yearIndex = inputEx.indexOf('Y', formatSplit);","		this.monthIndex = inputEx.indexOf('m', formatSplit);","		this.dayIndex = inputEx.indexOf('d', formatSplit);","		","		options.fields = [];","		","		for (i = 0 ; i < 3 ; i += 1) {","			","			if (i === this.dayIndex) {","				options.fields.push({ type: 'string', typeInvite: this.messages.dayTypeInvite, size: 2 });","			}","			else if (i === this.yearIndex) {","				options.fields.push({ type: 'string', typeInvite: this.messages.yearTypeInvite, size: 4 });","			}","			else {","				","				selectOptions = [{ value: '', label: this.messages.selectMonth }];","				","				for (j = 0, monthsNb = this.messages.months.length; j < monthsNb; j += 1) {","					selectOptions.push({ value: j, label: this.messages.months[j] });","				}","				","				options.fields.push({ type: 'select', choices: selectOptions, value: '' });","			}","			","		}","		","		options.separators = options.separators || [false, \"&nbsp;\", \"&nbsp;\", false];","		","		inputEx.DateSelectMonthField.superclass.constructor.call(this, options);","	};","	","	Y.extend(inputEx.DateSelectMonthField, inputEx.CombineField, {","","		/**","		 * @method setOptions","		 */","		setOptions: function(options) {","			inputEx.DateSelectMonthField.superclass.setOptions.call(this, options);","","			//I18N","			this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-dateselectmonth\"));","		},","		","		/**","		 * @method setValue","		 */","		setValue: function (value, sendUpdatedEvt) {","			","			var values, i;","			","			values = [];","			","			// !value catches \"\" (empty field), other tests invalid dates (Invalid Date, or NaN)","			if (!value || !(value instanceof Date) || !lang.isNumber(value.getTime())) {","				values[this.monthIndex] = \"\";","				values[this.yearIndex] = \"\";","				values[this.dayIndex] = \"\";","			} else {","				for (i = 0 ; i < 3 ; i += 1) {","					values.push(i === this.dayIndex ? value.getDate() : (i === this.yearIndex ? value.getFullYear() : value.getMonth()));","				}","			}","			inputEx.DateSelectMonthField.superclass.setValue.call(this, values, sendUpdatedEvt);","		},","		","		/**","		 * @method getValue","		 */","		getValue: function () {","			","         // if all sub-fields are empty (isEmpty method is inherited from inputEx.Group)","			if (this.isEmpty()) { return \"\"; }","			","			var values = inputEx.DateSelectMonthField.superclass.getValue.call(this);","			","			// if selected month index is '', new Date(..) would create a valid date with month == January !!!)","			if (values[this.monthIndex] === '') {","				return new Date(NaN, NaN, NaN); // -> Invalid Date (Firefox) or NaN (IE) (both instanceof Date ...)","			}","			","			return new Date(parseInt(values[this.yearIndex], 10), values[this.monthIndex], parseInt(values[this.dayIndex], 10));","		},","		","		/**","		 * @method validate","		 */","		validate: function () {","			","			var val = this.getValue();","			","			// empty field","			if (val === '') {","				// validate only if not required","				return !this.options.required;","			}","			","			// val is :","			//  -> a Date, when valid","			//  -> an Invalid Date (== \"Invalid Date\"), when invalid on FF","			//  -> NaN, when invalid on IE","			//","			// These 3 cases would pass the \"val instanceof Date\" test,","			// but last 2 cases return NaN on val.getDate(), so \"isFinite\" test fails.","			return (val instanceof Date && lang.isNumber(val.getTime()));","		}","		","	});","	","	// Register this class as \"dateselectmonth\" type","	inputEx.registerType(\"dateselectmonth\", inputEx.DateSelectMonthField);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-combine\",","        \"inputex-string\",","        \"inputex-select\"","    ],","    \"ix_provides\": \"dateselectmonth\",","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].lines = {"1":0,"6":0,"14":0,"16":0,"22":0,"24":0,"25":0,"28":0,"30":0,"31":0,"32":0,"34":0,"36":0,"38":0,"39":0,"41":0,"42":0,"46":0,"48":0,"49":0,"52":0,"57":0,"59":0,"62":0,"68":0,"71":0,"79":0,"81":0,"84":0,"85":0,"86":0,"87":0,"89":0,"90":0,"93":0,"102":0,"104":0,"107":0,"108":0,"111":0,"119":0,"122":0,"124":0,"134":0,"140":0};
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].functions = {"DateSelectMonthField:14":0,"setOptions:67":0,"setValue:77":0,"getValue:99":0,"validate:117":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-dateselectmonth/inputex-dateselectmonth.js"].coveredLines = 45;
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
		
		// The ressource bundle is loaded here because
		// DateSelectMonthField needs them to construct his fields

		// this.messages will be overridden by the constructor of Field and re-loaded and mix in setOptions
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 22);
this.messages = Y.Intl.get("inputex-dateselectmonth");

		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 24);
if (!options.dateFormat) {
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 25);
options.dateFormat = this.messages.defaultDateFormat;
		}
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 28);
formatSplit = options.dateFormat.split("/");
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 30);
this.yearIndex = inputEx.indexOf('Y', formatSplit);
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 31);
this.monthIndex = inputEx.indexOf('m', formatSplit);
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 32);
this.dayIndex = inputEx.indexOf('d', formatSplit);
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 34);
options.fields = [];
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 36);
for (i = 0 ; i < 3 ; i += 1) {
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 38);
if (i === this.dayIndex) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 39);
options.fields.push({ type: 'string', typeInvite: this.messages.dayTypeInvite, size: 2 });
			}
			else {_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 41);
if (i === this.yearIndex) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 42);
options.fields.push({ type: 'string', typeInvite: this.messages.yearTypeInvite, size: 4 });
			}
			else {
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 46);
selectOptions = [{ value: '', label: this.messages.selectMonth }];
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 48);
for (j = 0, monthsNb = this.messages.months.length; j < monthsNb; j += 1) {
					_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 49);
selectOptions.push({ value: j, label: this.messages.months[j] });
				}
				
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 52);
options.fields.push({ type: 'select', choices: selectOptions, value: '' });
			}}
			
		}
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 57);
options.separators = options.separators || [false, "&nbsp;", "&nbsp;", false];
		
		_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 59);
inputEx.DateSelectMonthField.superclass.constructor.call(this, options);
	};
	
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 62);
Y.extend(inputEx.DateSelectMonthField, inputEx.CombineField, {

		/**
		 * @method setOptions
		 */
		setOptions: function(options) {
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "setOptions", 67);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 68);
inputEx.DateSelectMonthField.superclass.setOptions.call(this, options);

			//I18N
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 71);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-dateselectmonth"));
		},
		
		/**
		 * @method setValue
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "setValue", 77);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 79);
var values, i;
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 81);
values = [];
			
			// !value catches "" (empty field), other tests invalid dates (Invalid Date, or NaN)
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 84);
if (!value || !(value instanceof Date) || !lang.isNumber(value.getTime())) {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 85);
values[this.monthIndex] = "";
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 86);
values[this.yearIndex] = "";
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 87);
values[this.dayIndex] = "";
			} else {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 89);
for (i = 0 ; i < 3 ; i += 1) {
					_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 90);
values.push(i === this.dayIndex ? value.getDate() : (i === this.yearIndex ? value.getFullYear() : value.getMonth()));
				}
			}
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 93);
inputEx.DateSelectMonthField.superclass.setValue.call(this, values, sendUpdatedEvt);
		},
		
		/**
		 * @method getValue
		 */
		getValue: function () {
			
         // if all sub-fields are empty (isEmpty method is inherited from inputEx.Group)
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "getValue", 99);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 102);
if (this.isEmpty()) { return ""; }
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 104);
var values = inputEx.DateSelectMonthField.superclass.getValue.call(this);
			
			// if selected month index is '', new Date(..) would create a valid date with month == January !!!)
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 107);
if (values[this.monthIndex] === '') {
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 108);
return new Date(NaN, NaN, NaN); // -> Invalid Date (Firefox) or NaN (IE) (both instanceof Date ...)
			}
			
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 111);
return new Date(parseInt(values[this.yearIndex], 10), values[this.monthIndex], parseInt(values[this.dayIndex], 10));
		},
		
		/**
		 * @method validate
		 */
		validate: function () {
			
			_yuitest_coverfunc("build/inputex-dateselectmonth/inputex-dateselectmonth.js", "validate", 117);
_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 119);
var val = this.getValue();
			
			// empty field
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 122);
if (val === '') {
				// validate only if not required
				_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 124);
return !this.options.required;
			}
			
			// val is :
			//  -> a Date, when valid
			//  -> an Invalid Date (== "Invalid Date"), when invalid on FF
			//  -> NaN, when invalid on IE
			//
			// These 3 cases would pass the "val instanceof Date" test,
			// but last 2 cases return NaN on val.getDate(), so "isFinite" test fails.
			_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 134);
return (val instanceof Date && lang.isNumber(val.getTime()));
		}
		
	});
	
	// Register this class as "dateselectmonth" type
	_yuitest_coverline("build/inputex-dateselectmonth/inputex-dateselectmonth.js", 140);
inputEx.registerType("dateselectmonth", inputEx.DateSelectMonthField);


}, '@VERSION@', {
    "requires": [
        "inputex-combine",
        "inputex-string",
        "inputex-select"
    ],
    "ix_provides": "dateselectmonth",
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
