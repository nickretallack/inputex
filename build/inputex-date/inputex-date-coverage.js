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
_yuitest_coverage["build/inputex-date/inputex-date.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-date/inputex-date.js",
    code: []
};
_yuitest_coverage["build/inputex-date/inputex-date.js"].code=["YUI.add('inputex-date', function (Y, NAME) {","","/**"," * @module inputex-date"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * A Date Field. "," * @class inputEx.DateField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options Add the folowing options: "," * <ul>"," *	   <li>dateFormat: Editor format (the one which is presented to the user) default to 'm/d/Y'</li>"," *		<li>valueFormat: if falsy, the field will return a javascript Date instance. Otherwise, this format will be used for input parsing/output formatting</li>"," * </ul>"," */","inputEx.DateField = function(options) {","	inputEx.DateField.superclass.constructor.call(this,options);","};","	","Y.extend(inputEx.DateField, inputEx.StringField, {","	/**","	 * Adds the 'inputEx-DateField' default className","	 * @method setOptions","	 * @param {Object} options Options object as passed to the constructor","	 */","   setOptions: function(options) {","   	inputEx.DateField.superclass.setOptions.call(this, options);","   	","   	// Overwrite options","   	this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField';","   	this.options.messages.invalid = options.invalidDate ? options.invalidDate : inputEx.messages.invalidDate;","   	","   	// Added options","   	this.options.dateFormat = options.dateFormat || inputEx.messages.defaultDateFormat;","		this.options.valueFormat = options.valueFormat;","   },","	   ","	/**","	 * Specific Date validation depending of the 'format' option","	 * @method validate","	 */","	validate: function() {","	   var value = this.el.value;","	","		var separator = this.options.dateFormat.match(/[^Ymd ]/g)[0];","	   var ladate = value.split(separator);","	   if( ladate.length != 3) { return false; }","	   if ( isNaN(parseInt(ladate[0],10)) || isNaN(parseInt(ladate[1],10)) || isNaN(parseInt(ladate[2],10))) { return false; }","	   var formatSplit = this.options.dateFormat.split(separator);","	   var yearIndex = inputEx.indexOf('Y',formatSplit);","	   if (ladate[yearIndex].length!=4) { return false; } // Avoid 3-digits years...","	   var d = parseInt(ladate[ inputEx.indexOf('d',formatSplit) ],10);","	   var Y = parseInt(ladate[yearIndex],10);","	   var m = parseInt(ladate[ inputEx.indexOf('m',formatSplit) ],10)-1;","	   var unedate = new Date(Y,m,d);","	   var annee = unedate.getFullYear();","	   return ((unedate.getDate() == d) && (unedate.getMonth() == m) && (annee == Y));","	},","	","	   ","	/**","	 * Format the date according to options.dateFormat","	 * @method setValue","	 * @param {Date} val Date to set","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updatedEvt or not (default is true, pass false to NOT send the event)","	 */","	setValue: function(val, sendUpdatedEvt) {","	","	   // Don't try to parse a date if there is no date","	   if( val === '' ) {","	      inputEx.DateField.superclass.setValue.call(this, '', sendUpdatedEvt);","	      return;","	   }","	   var str = \"\";","	   if (val instanceof Date) {","			str = inputEx.DateField.formatDate(val, this.options.dateFormat);","	   } ","		else if(this.options.valueFormat){","			var dateVal = inputEx.DateField.parseWithFormat(val, this.options.valueFormat);","			str = inputEx.DateField.formatDate(dateVal, this.options.dateFormat);","		}","	   // else date must match this.options.dateFormat","	   else {","	     str = val;","	   }","	","	   inputEx.DateField.superclass.setValue.call(this, str, sendUpdatedEvt);","	},","	   ","	/**","	 * Return the date","	 * @method getValue","	 * @param {Boolean} forceDate Skip the valueFormat option if set to truthy","	 * @return {String || Date} Formatted date using the valueFormat or a javascript Date instance","	 */","	getValue: function(forceDate) {","	   // let parent class function check if typeInvite, etc...","	   var value = inputEx.DateField.superclass.getValue.call(this);","","	   // Hack to validate if field not required and empty","	   if (value === '') { return '';}","	","		var finalDate = inputEx.DateField.parseWithFormat(value,this.options.dateFormat);","	","		// if valueFormat is specified, we format the string","		if(!forceDate && this.options.valueFormat){	","			return inputEx.DateField.formatDate(finalDate, this.options.valueFormat);","		} ","		","		return finalDate;","	}","","});","","/**"," * Those methods are limited but largely enough for our usage"," * @method parseWithFormat"," * @static"," */","inputEx.DateField.parseWithFormat = function(sDate,format) {","	var separator = format.match(/[^Ymd ]/g)[0];","	var ladate = sDate.split(separator);","   var formatSplit = format.split(separator);","   var d = parseInt(ladate[ inputEx.indexOf('d',formatSplit) ],10);","   var Y = parseInt(ladate[ inputEx.indexOf('Y',formatSplit) ],10);","   var m = parseInt(ladate[ inputEx.indexOf('m',formatSplit) ],10)-1;","   return (new Date(Y,m,d));","};","","/**"," * Those methods are limited but largely enough for our usage"," * @method formatDate"," * @static"," */","inputEx.DateField.formatDate = function(d,format) {","	var str = format.replace('Y',d.getFullYear());","   var m = d.getMonth()+1;","   str = str.replace('m', ((m < 10)? '0':'')+m);","   var day = d.getDate();","   str = str.replace('d', ((day < 10)? '0':'')+day);","	return str;","};","","// Register this class as \"date\" type","inputEx.registerType(\"date\", inputEx.DateField, [","   {type: 'select', label: 'Date format', name: 'dateFormat', choices: [{ value: \"m/d/Y\" }, { value:\"d/m/Y\" }] }","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\"], \"ix_provides\": \"date\"});"];
_yuitest_coverage["build/inputex-date/inputex-date.js"].lines = {"1":0,"6":0,"20":0,"21":0,"24":0,"31":0,"34":0,"35":0,"38":0,"39":0,"47":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":0,"59":0,"60":0,"61":0,"74":0,"75":0,"76":0,"78":0,"79":0,"80":0,"82":0,"83":0,"84":0,"88":0,"91":0,"102":0,"105":0,"107":0,"110":0,"111":0,"114":0,"124":0,"125":0,"126":0,"127":0,"128":0,"129":0,"130":0,"131":0,"139":0,"140":0,"141":0,"142":0,"143":0,"144":0,"145":0,"149":0};
_yuitest_coverage["build/inputex-date/inputex-date.js"].functions = {"DateField:20":0,"setOptions:30":0,"validate:46":0,"setValue:71":0,"getValue:100":0,"parseWithFormat:124":0,"formatDate:139":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-date/inputex-date.js"].coveredLines = 57;
_yuitest_coverage["build/inputex-date/inputex-date.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-date/inputex-date.js", 1);
YUI.add('inputex-date', function (Y, NAME) {

/**
 * @module inputex-date
 */
   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-date/inputex-date.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * A Date Field. 
 * @class inputEx.DateField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options Add the folowing options: 
 * <ul>
 *	   <li>dateFormat: Editor format (the one which is presented to the user) default to 'm/d/Y'</li>
 *		<li>valueFormat: if falsy, the field will return a javascript Date instance. Otherwise, this format will be used for input parsing/output formatting</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 20);
inputEx.DateField = function(options) {
	_yuitest_coverfunc("build/inputex-date/inputex-date.js", "DateField", 20);
_yuitest_coverline("build/inputex-date/inputex-date.js", 21);
inputEx.DateField.superclass.constructor.call(this,options);
};
	
_yuitest_coverline("build/inputex-date/inputex-date.js", 24);
Y.extend(inputEx.DateField, inputEx.StringField, {
	/**
	 * Adds the 'inputEx-DateField' default className
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
   setOptions: function(options) {
   	_yuitest_coverfunc("build/inputex-date/inputex-date.js", "setOptions", 30);
_yuitest_coverline("build/inputex-date/inputex-date.js", 31);
inputEx.DateField.superclass.setOptions.call(this, options);
   	
   	// Overwrite options
   	_yuitest_coverline("build/inputex-date/inputex-date.js", 34);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField';
   	_yuitest_coverline("build/inputex-date/inputex-date.js", 35);
this.options.messages.invalid = options.invalidDate ? options.invalidDate : inputEx.messages.invalidDate;
   	
   	// Added options
   	_yuitest_coverline("build/inputex-date/inputex-date.js", 38);
this.options.dateFormat = options.dateFormat || inputEx.messages.defaultDateFormat;
		_yuitest_coverline("build/inputex-date/inputex-date.js", 39);
this.options.valueFormat = options.valueFormat;
   },
	   
	/**
	 * Specific Date validation depending of the 'format' option
	 * @method validate
	 */
	validate: function() {
	   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "validate", 46);
_yuitest_coverline("build/inputex-date/inputex-date.js", 47);
var value = this.el.value;
	
		_yuitest_coverline("build/inputex-date/inputex-date.js", 49);
var separator = this.options.dateFormat.match(/[^Ymd ]/g)[0];
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 50);
var ladate = value.split(separator);
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 51);
if( ladate.length != 3) { return false; }
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 52);
if ( isNaN(parseInt(ladate[0],10)) || isNaN(parseInt(ladate[1],10)) || isNaN(parseInt(ladate[2],10))) { return false; }
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 53);
var formatSplit = this.options.dateFormat.split(separator);
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 54);
var yearIndex = inputEx.indexOf('Y',formatSplit);
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 55);
if (ladate[yearIndex].length!=4) { return false; } // Avoid 3-digits years...
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 56);
var d = parseInt(ladate[ inputEx.indexOf('d',formatSplit) ],10);
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 57);
var Y = parseInt(ladate[yearIndex],10);
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 58);
var m = parseInt(ladate[ inputEx.indexOf('m',formatSplit) ],10)-1;
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 59);
var unedate = new Date(Y,m,d);
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 60);
var annee = unedate.getFullYear();
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 61);
return ((unedate.getDate() == d) && (unedate.getMonth() == m) && (annee == Y));
	},
	
	   
	/**
	 * Format the date according to options.dateFormat
	 * @method setValue
	 * @param {Date} val Date to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updatedEvt or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(val, sendUpdatedEvt) {
	
	   // Don't try to parse a date if there is no date
	   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "setValue", 71);
_yuitest_coverline("build/inputex-date/inputex-date.js", 74);
if( val === '' ) {
	      _yuitest_coverline("build/inputex-date/inputex-date.js", 75);
inputEx.DateField.superclass.setValue.call(this, '', sendUpdatedEvt);
	      _yuitest_coverline("build/inputex-date/inputex-date.js", 76);
return;
	   }
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 78);
var str = "";
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 79);
if (val instanceof Date) {
			_yuitest_coverline("build/inputex-date/inputex-date.js", 80);
str = inputEx.DateField.formatDate(val, this.options.dateFormat);
	   } 
		else {_yuitest_coverline("build/inputex-date/inputex-date.js", 82);
if(this.options.valueFormat){
			_yuitest_coverline("build/inputex-date/inputex-date.js", 83);
var dateVal = inputEx.DateField.parseWithFormat(val, this.options.valueFormat);
			_yuitest_coverline("build/inputex-date/inputex-date.js", 84);
str = inputEx.DateField.formatDate(dateVal, this.options.dateFormat);
		}
	   // else date must match this.options.dateFormat
	   else {
	     _yuitest_coverline("build/inputex-date/inputex-date.js", 88);
str = val;
	   }}
	
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 91);
inputEx.DateField.superclass.setValue.call(this, str, sendUpdatedEvt);
	},
	   
	/**
	 * Return the date
	 * @method getValue
	 * @param {Boolean} forceDate Skip the valueFormat option if set to truthy
	 * @return {String || Date} Formatted date using the valueFormat or a javascript Date instance
	 */
	getValue: function(forceDate) {
	   // let parent class function check if typeInvite, etc...
	   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "getValue", 100);
_yuitest_coverline("build/inputex-date/inputex-date.js", 102);
var value = inputEx.DateField.superclass.getValue.call(this);

	   // Hack to validate if field not required and empty
	   _yuitest_coverline("build/inputex-date/inputex-date.js", 105);
if (value === '') { return '';}
	
		_yuitest_coverline("build/inputex-date/inputex-date.js", 107);
var finalDate = inputEx.DateField.parseWithFormat(value,this.options.dateFormat);
	
		// if valueFormat is specified, we format the string
		_yuitest_coverline("build/inputex-date/inputex-date.js", 110);
if(!forceDate && this.options.valueFormat){	
			_yuitest_coverline("build/inputex-date/inputex-date.js", 111);
return inputEx.DateField.formatDate(finalDate, this.options.valueFormat);
		} 
		
		_yuitest_coverline("build/inputex-date/inputex-date.js", 114);
return finalDate;
	}

});

/**
 * Those methods are limited but largely enough for our usage
 * @method parseWithFormat
 * @static
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 124);
inputEx.DateField.parseWithFormat = function(sDate,format) {
	_yuitest_coverfunc("build/inputex-date/inputex-date.js", "parseWithFormat", 124);
_yuitest_coverline("build/inputex-date/inputex-date.js", 125);
var separator = format.match(/[^Ymd ]/g)[0];
	_yuitest_coverline("build/inputex-date/inputex-date.js", 126);
var ladate = sDate.split(separator);
   _yuitest_coverline("build/inputex-date/inputex-date.js", 127);
var formatSplit = format.split(separator);
   _yuitest_coverline("build/inputex-date/inputex-date.js", 128);
var d = parseInt(ladate[ inputEx.indexOf('d',formatSplit) ],10);
   _yuitest_coverline("build/inputex-date/inputex-date.js", 129);
var Y = parseInt(ladate[ inputEx.indexOf('Y',formatSplit) ],10);
   _yuitest_coverline("build/inputex-date/inputex-date.js", 130);
var m = parseInt(ladate[ inputEx.indexOf('m',formatSplit) ],10)-1;
   _yuitest_coverline("build/inputex-date/inputex-date.js", 131);
return (new Date(Y,m,d));
};

/**
 * Those methods are limited but largely enough for our usage
 * @method formatDate
 * @static
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 139);
inputEx.DateField.formatDate = function(d,format) {
	_yuitest_coverfunc("build/inputex-date/inputex-date.js", "formatDate", 139);
_yuitest_coverline("build/inputex-date/inputex-date.js", 140);
var str = format.replace('Y',d.getFullYear());
   _yuitest_coverline("build/inputex-date/inputex-date.js", 141);
var m = d.getMonth()+1;
   _yuitest_coverline("build/inputex-date/inputex-date.js", 142);
str = str.replace('m', ((m < 10)? '0':'')+m);
   _yuitest_coverline("build/inputex-date/inputex-date.js", 143);
var day = d.getDate();
   _yuitest_coverline("build/inputex-date/inputex-date.js", 144);
str = str.replace('d', ((day < 10)? '0':'')+day);
	_yuitest_coverline("build/inputex-date/inputex-date.js", 145);
return str;
};

// Register this class as "date" type
_yuitest_coverline("build/inputex-date/inputex-date.js", 149);
inputEx.registerType("date", inputEx.DateField, [
   {type: 'select', label: 'Date format', name: 'dateFormat', choices: [{ value: "m/d/Y" }, { value:"d/m/Y" }] }
]);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "date"});
