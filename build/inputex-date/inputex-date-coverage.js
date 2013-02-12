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
_yuitest_coverage["build/inputex-date/inputex-date.js"].code=["YUI.add('inputex-date', function (Y, NAME) {","","/**"," * @module inputex-date"," */","var inputEx = Y.inputEx;","","/**"," * A Date Field."," * @class inputEx.DateField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options Add the folowing options:"," * <ul>"," *    <li>dateFormat: Editor format (the one which is presented to the user) default to 'm/d/Y'</li>"," *    <li>valueFormat: if falsy, the field will return a javascript Date instance."," *          Otherwise, this format will be used for input parsing/output formatting</li>"," * </ul>"," */","inputEx.DateField = function(options) {","   inputEx.DateField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.DateField, inputEx.StringField, {","   /**","    * Adds the 'inputEx-DateField' default className","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      inputEx.DateField.superclass.setOptions.call(this, options);","","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-date\"));","","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField';","      this.messages.invalid = options.invalidDate ? options.invalidDate : this.messages.invalidDate;","","      // Added options","      this.options.dateFormat = options.dateFormat || this.messages.defaultDateFormat;","      this.options.valueFormat = options.valueFormat;","   },","   /**","    * Specific Date validation depending of the 'format' option","    * @method validate","    */","   validate: function() {","      // NOTE: we avoid calling getValue on purpose (as it may fail if","      //       the field contains an invalid date string)","","      var separator = this.options.dateFormat.match(/[^Ymd ]/g)[0],","                      // instead of this.el.value, use getValue of the superclass,","                      // which correctly handles typeInvite and trim options.","          value     = inputEx.DateField.superclass.getValue.call(this),","          ladate    = value.split(separator),","          formatSplit, yearIndex, d, Y, m, unedate, annee;","","      if (value === '') {","         return !this.options.required;","      }","","      if(ladate.length !== 3) {","         return false;","      }","      if(isNaN(parseInt(ladate[0], 10)) || isNaN(parseInt(ladate[1], 10)) || isNaN(parseInt(ladate[2], 10))) {","         return false;","      }","      formatSplit = this.options.dateFormat.split(separator);","      yearIndex = inputEx.indexOf('Y', formatSplit);","      if(ladate[yearIndex].length !== 4) {","         return false;","      } // Avoid 3-digits years...","      d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10);","      Y = parseInt(ladate[yearIndex], 10);","      m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;","      unedate = new Date(Y, m, d);","      annee = unedate.getFullYear();","      return((unedate.getDate() === d) && (unedate.getMonth() === m) && (annee === Y));","   },","","","   /**","    * Format the date according to options.dateFormat","    * @method setValue","    * @param {Date} val Date to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue","    *       should fire the updatedEvt or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","","      var str, dateVal;","      // Don't try to parse a date if there is no date","      if(val === '') {","         inputEx.DateField.superclass.setValue.call(this, '', sendUpdatedEvt);","         return;","      }","      str = \"\";","      if(val instanceof Date) {","         str = inputEx.DateField.formatDate(val, this.options.dateFormat);","      } else if(this.options.valueFormat) {","         dateVal = inputEx.DateField.parseWithFormat(val, this.options.valueFormat);","         str = inputEx.DateField.formatDate(dateVal, this.options.dateFormat);","      }","      // else date must match this.options.dateFormat","      else {","         str = val;","      }","","      inputEx.DateField.superclass.setValue.call(this, str, sendUpdatedEvt);","   },","","   /**","    * Return the date","    * @method getValue","    * @param {Boolean} forceDate Skip the valueFormat option if set to truthy","    * @return {String || Date} Formatted date using the valueFormat or a javascript Date instance","    */","   getValue: function (forceDate) {","      // let parent class function check if typeInvite, etc...","      var value = inputEx.DateField.superclass.getValue.call(this),","          finalDate;","","      // Don't try to parse value when field is empty","      if (value === '') {","         return '';","      }","","      finalDate = inputEx.DateField.parseWithFormat(value, this.options.dateFormat);","","      // if valueFormat is specified, we format the string","      if (!forceDate && this.options.valueFormat) {","         return inputEx.DateField.formatDate(finalDate, this.options.valueFormat);","      }","","      return finalDate;","   }","","});","","/**"," * Those methods are limited but largely enough for our usage"," * @method parseWithFormat"," * @static"," */","inputEx.DateField.parseWithFormat = function(sDate, format) {","   if(sDate){","      var separator = format.match(/[^Ymd ]/g)[0],","         ladate = sDate.split(separator),","         formatSplit = format.split(separator),","         d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10),","         Y = parseInt(ladate[inputEx.indexOf('Y', formatSplit)], 10),","         m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;","      return(new Date(Y, m, d));","   }","};","","/**"," * Those methods are limited but largely enough for our usage"," * @method formatDate"," * @static"," */","inputEx.DateField.formatDate = function(d, format) {","   if(d){","      var str = format.replace('Y', d.getFullYear()),","         m = d.getMonth() + 1,","         day;","      str = str.replace('m', ((m < 10) ? '0' : '') + m);","      day = d.getDate();","      str = str.replace('d', ((day < 10) ? '0' : '') + day);","      return str;","   }","};","","// Register this class as \"date\" type","inputEx.registerType(\"date\", inputEx.DateField, [{","   type: 'select',","   label: 'Date format',","   name: 'dateFormat',","   choices: [{","      value: \"m/d/Y\"","   }, {","      value: \"d/m/Y\"","   }]","}]);","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-string\"","    ],","    \"ix_provides\": \"date\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-date/inputex-date.js"].lines = {"1":0,"6":0,"20":0,"21":0,"24":0,"32":0,"34":0,"37":0,"38":0,"41":0,"42":0,"52":0,"59":0,"60":0,"63":0,"64":0,"66":0,"67":0,"69":0,"70":0,"71":0,"72":0,"74":0,"75":0,"76":0,"77":0,"78":0,"79":0,"92":0,"94":0,"95":0,"96":0,"98":0,"99":0,"100":0,"101":0,"102":0,"103":0,"107":0,"110":0,"121":0,"125":0,"126":0,"129":0,"132":0,"133":0,"136":0,"146":0,"147":0,"148":0,"154":0,"163":0,"164":0,"165":0,"168":0,"169":0,"170":0,"171":0,"176":0};
_yuitest_coverage["build/inputex-date/inputex-date.js"].functions = {"DateField:20":0,"setOptions:30":0,"validate:48":0,"setValue:90":0,"getValue:119":0,"parseWithFormat:146":0,"formatDate:163":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-date/inputex-date.js"].coveredLines = 59;
_yuitest_coverage["build/inputex-date/inputex-date.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-date/inputex-date.js", 1);
YUI.add('inputex-date', function (Y, NAME) {

/**
 * @module inputex-date
 */
_yuitest_coverfunc("build/inputex-date/inputex-date.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-date/inputex-date.js", 6);
var inputEx = Y.inputEx;

/**
 * A Date Field.
 * @class inputEx.DateField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options Add the folowing options:
 * <ul>
 *    <li>dateFormat: Editor format (the one which is presented to the user) default to 'm/d/Y'</li>
 *    <li>valueFormat: if falsy, the field will return a javascript Date instance.
 *          Otherwise, this format will be used for input parsing/output formatting</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 20);
inputEx.DateField = function(options) {
   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "DateField", 20);
_yuitest_coverline("build/inputex-date/inputex-date.js", 21);
inputEx.DateField.superclass.constructor.call(this, options);
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
_yuitest_coverline("build/inputex-date/inputex-date.js", 32);
inputEx.DateField.superclass.setOptions.call(this, options);

      _yuitest_coverline("build/inputex-date/inputex-date.js", 34);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-date"));

      // Overwrite options
      _yuitest_coverline("build/inputex-date/inputex-date.js", 37);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField';
      _yuitest_coverline("build/inputex-date/inputex-date.js", 38);
this.messages.invalid = options.invalidDate ? options.invalidDate : this.messages.invalidDate;

      // Added options
      _yuitest_coverline("build/inputex-date/inputex-date.js", 41);
this.options.dateFormat = options.dateFormat || this.messages.defaultDateFormat;
      _yuitest_coverline("build/inputex-date/inputex-date.js", 42);
this.options.valueFormat = options.valueFormat;
   },
   /**
    * Specific Date validation depending of the 'format' option
    * @method validate
    */
   validate: function() {
      // NOTE: we avoid calling getValue on purpose (as it may fail if
      //       the field contains an invalid date string)

      _yuitest_coverfunc("build/inputex-date/inputex-date.js", "validate", 48);
_yuitest_coverline("build/inputex-date/inputex-date.js", 52);
var separator = this.options.dateFormat.match(/[^Ymd ]/g)[0],
                      // instead of this.el.value, use getValue of the superclass,
                      // which correctly handles typeInvite and trim options.
          value     = inputEx.DateField.superclass.getValue.call(this),
          ladate    = value.split(separator),
          formatSplit, yearIndex, d, Y, m, unedate, annee;

      _yuitest_coverline("build/inputex-date/inputex-date.js", 59);
if (value === '') {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 60);
return !this.options.required;
      }

      _yuitest_coverline("build/inputex-date/inputex-date.js", 63);
if(ladate.length !== 3) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 64);
return false;
      }
      _yuitest_coverline("build/inputex-date/inputex-date.js", 66);
if(isNaN(parseInt(ladate[0], 10)) || isNaN(parseInt(ladate[1], 10)) || isNaN(parseInt(ladate[2], 10))) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 67);
return false;
      }
      _yuitest_coverline("build/inputex-date/inputex-date.js", 69);
formatSplit = this.options.dateFormat.split(separator);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 70);
yearIndex = inputEx.indexOf('Y', formatSplit);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 71);
if(ladate[yearIndex].length !== 4) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 72);
return false;
      } // Avoid 3-digits years...
      _yuitest_coverline("build/inputex-date/inputex-date.js", 74);
d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 75);
Y = parseInt(ladate[yearIndex], 10);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 76);
m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;
      _yuitest_coverline("build/inputex-date/inputex-date.js", 77);
unedate = new Date(Y, m, d);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 78);
annee = unedate.getFullYear();
      _yuitest_coverline("build/inputex-date/inputex-date.js", 79);
return((unedate.getDate() === d) && (unedate.getMonth() === m) && (annee === Y));
   },


   /**
    * Format the date according to options.dateFormat
    * @method setValue
    * @param {Date} val Date to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue
    *       should fire the updatedEvt or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {

      _yuitest_coverfunc("build/inputex-date/inputex-date.js", "setValue", 90);
_yuitest_coverline("build/inputex-date/inputex-date.js", 92);
var str, dateVal;
      // Don't try to parse a date if there is no date
      _yuitest_coverline("build/inputex-date/inputex-date.js", 94);
if(val === '') {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 95);
inputEx.DateField.superclass.setValue.call(this, '', sendUpdatedEvt);
         _yuitest_coverline("build/inputex-date/inputex-date.js", 96);
return;
      }
      _yuitest_coverline("build/inputex-date/inputex-date.js", 98);
str = "";
      _yuitest_coverline("build/inputex-date/inputex-date.js", 99);
if(val instanceof Date) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 100);
str = inputEx.DateField.formatDate(val, this.options.dateFormat);
      } else {_yuitest_coverline("build/inputex-date/inputex-date.js", 101);
if(this.options.valueFormat) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 102);
dateVal = inputEx.DateField.parseWithFormat(val, this.options.valueFormat);
         _yuitest_coverline("build/inputex-date/inputex-date.js", 103);
str = inputEx.DateField.formatDate(dateVal, this.options.dateFormat);
      }
      // else date must match this.options.dateFormat
      else {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 107);
str = val;
      }}

      _yuitest_coverline("build/inputex-date/inputex-date.js", 110);
inputEx.DateField.superclass.setValue.call(this, str, sendUpdatedEvt);
   },

   /**
    * Return the date
    * @method getValue
    * @param {Boolean} forceDate Skip the valueFormat option if set to truthy
    * @return {String || Date} Formatted date using the valueFormat or a javascript Date instance
    */
   getValue: function (forceDate) {
      // let parent class function check if typeInvite, etc...
      _yuitest_coverfunc("build/inputex-date/inputex-date.js", "getValue", 119);
_yuitest_coverline("build/inputex-date/inputex-date.js", 121);
var value = inputEx.DateField.superclass.getValue.call(this),
          finalDate;

      // Don't try to parse value when field is empty
      _yuitest_coverline("build/inputex-date/inputex-date.js", 125);
if (value === '') {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 126);
return '';
      }

      _yuitest_coverline("build/inputex-date/inputex-date.js", 129);
finalDate = inputEx.DateField.parseWithFormat(value, this.options.dateFormat);

      // if valueFormat is specified, we format the string
      _yuitest_coverline("build/inputex-date/inputex-date.js", 132);
if (!forceDate && this.options.valueFormat) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 133);
return inputEx.DateField.formatDate(finalDate, this.options.valueFormat);
      }

      _yuitest_coverline("build/inputex-date/inputex-date.js", 136);
return finalDate;
   }

});

/**
 * Those methods are limited but largely enough for our usage
 * @method parseWithFormat
 * @static
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 146);
inputEx.DateField.parseWithFormat = function(sDate, format) {
   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "parseWithFormat", 146);
_yuitest_coverline("build/inputex-date/inputex-date.js", 147);
if(sDate){
      _yuitest_coverline("build/inputex-date/inputex-date.js", 148);
var separator = format.match(/[^Ymd ]/g)[0],
         ladate = sDate.split(separator),
         formatSplit = format.split(separator),
         d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10),
         Y = parseInt(ladate[inputEx.indexOf('Y', formatSplit)], 10),
         m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;
      _yuitest_coverline("build/inputex-date/inputex-date.js", 154);
return(new Date(Y, m, d));
   }
};

/**
 * Those methods are limited but largely enough for our usage
 * @method formatDate
 * @static
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 163);
inputEx.DateField.formatDate = function(d, format) {
   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "formatDate", 163);
_yuitest_coverline("build/inputex-date/inputex-date.js", 164);
if(d){
      _yuitest_coverline("build/inputex-date/inputex-date.js", 165);
var str = format.replace('Y', d.getFullYear()),
         m = d.getMonth() + 1,
         day;
      _yuitest_coverline("build/inputex-date/inputex-date.js", 168);
str = str.replace('m', ((m < 10) ? '0' : '') + m);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 169);
day = d.getDate();
      _yuitest_coverline("build/inputex-date/inputex-date.js", 170);
str = str.replace('d', ((day < 10) ? '0' : '') + day);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 171);
return str;
   }
};

// Register this class as "date" type
_yuitest_coverline("build/inputex-date/inputex-date.js", 176);
inputEx.registerType("date", inputEx.DateField, [{
   type: 'select',
   label: 'Date format',
   name: 'dateFormat',
   choices: [{
      value: "m/d/Y"
   }, {
      value: "d/m/Y"
   }]
}]);

}, '@VERSION@', {
    "requires": [
        "inputex-string"
    ],
    "ix_provides": "date",
    "skinnable": true,
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
