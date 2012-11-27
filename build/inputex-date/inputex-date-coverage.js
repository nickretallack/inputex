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
_yuitest_coverage["build/inputex-date/inputex-date.js"].code=["YUI.add('inputex-date', function (Y, NAME) {","","/**"," * @module inputex-date"," */","var inputEx = Y.inputEx;","","/**"," * A Date Field."," * @class inputEx.DateField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options Add the folowing options:"," * <ul>"," *    <li>dateFormat: Editor format (the one which is presented to the user) default to 'm/d/Y'</li>"," *    <li>valueFormat: if falsy, the field will return a javascript Date instance."," *          Otherwise, this format will be used for input parsing/output formatting</li>"," * </ul>"," */","inputEx.DateField = function(options) {","   inputEx.DateField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.DateField, inputEx.StringField, {","   /**","    * Adds the 'inputEx-DateField' default className","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      inputEx.DateField.superclass.setOptions.call(this, options);","","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-date\"));","","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField';","      this.messages.invalid = options.invalidDate ? options.invalidDate : this.messages.invalidDate;","","      // Added options","      this.options.dateFormat = options.dateFormat || this.messages.defaultDateFormat;","      this.options.valueFormat = options.valueFormat;","   },","   /**","    * Specific Date validation depending of the 'format' option","    * @method validate","    */","   validate: function() {","","      var value = this.el.value,","         separator = this.options.dateFormat.match(/[^Ymd ]/g)[0],","         ladate = value.split(separator),","         formatSplit, yearIndex, d, Y, m, unedate, annee;","","      if(ladate.length !== 3) {","         return false;","      }","      if(isNaN(parseInt(ladate[0], 10)) || isNaN(parseInt(ladate[1], 10)) || isNaN(parseInt(ladate[2], 10))) {","         return false;","      }","      formatSplit = this.options.dateFormat.split(separator);","      yearIndex = inputEx.indexOf('Y', formatSplit);","      if(ladate[yearIndex].length !== 4) {","         return false;","      } // Avoid 3-digits years...","      d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10);","      Y = parseInt(ladate[yearIndex], 10);","      m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;","      unedate = new Date(Y, m, d);","      annee = unedate.getFullYear();","      return((unedate.getDate() === d) && (unedate.getMonth() === m) && (annee === Y));","   },","","","   /**","    * Format the date according to options.dateFormat","    * @method setValue","    * @param {Date} val Date to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue","    *       should fire the updatedEvt or not (default is true, pass false to NOT send the event)","    */","   setValue: function(val, sendUpdatedEvt) {","","      var str, dateVal;","      // Don't try to parse a date if there is no date","      if(val === '') {","         inputEx.DateField.superclass.setValue.call(this, '', sendUpdatedEvt);","         return;","      }","      str = \"\";","      if(val instanceof Date) {","         str = inputEx.DateField.formatDate(val, this.options.dateFormat);","      } else if(this.options.valueFormat) {","         dateVal = inputEx.DateField.parseWithFormat(val, this.options.valueFormat);","         str = inputEx.DateField.formatDate(dateVal, this.options.dateFormat);","      }","      // else date must match this.options.dateFormat","      else {","         str = val;","      }","","      inputEx.DateField.superclass.setValue.call(this, str, sendUpdatedEvt);","   },","","   /**","    * Return the date","    * @method getValue","    * @param {Boolean} forceDate Skip the valueFormat option if set to truthy","    * @return {String || Date} Formatted date using the valueFormat or a javascript Date instance","    */","   getValue: function(forceDate) {","      // let parent class function check if typeInvite, etc...","      var value = inputEx.DateField.superclass.getValue.call(this),","         finalDate;","","      // Hack to validate if field not required and empty","      if(value === '') {","         return '';","      }","","      finalDate = inputEx.DateField.parseWithFormat(value, this.options.dateFormat);","","      // if valueFormat is specified, we format the string","      if(!forceDate && this.options.valueFormat) {","         return inputEx.DateField.formatDate(finalDate, this.options.valueFormat);","      }","","      return finalDate;","   }","","});","","/**"," * Those methods are limited but largely enough for our usage"," * @method parseWithFormat"," * @static"," */","inputEx.DateField.parseWithFormat = function(sDate, format) {","   if(sDate){","      var separator = format.match(/[^Ymd ]/g)[0],","         ladate = sDate.split(separator),","         formatSplit = format.split(separator),","         d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10),","         Y = parseInt(ladate[inputEx.indexOf('Y', formatSplit)], 10),","         m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;","      return(new Date(Y, m, d));","   }","};","","/**"," * Those methods are limited but largely enough for our usage"," * @method formatDate"," * @static"," */","inputEx.DateField.formatDate = function(d, format) {","   if(d){","      var str = format.replace('Y', d.getFullYear()),","         m = d.getMonth() + 1,","         day;","      str = str.replace('m', ((m < 10) ? '0' : '') + m);","      day = d.getDate();","      str = str.replace('d', ((day < 10) ? '0' : '') + day);","      return str;","   }","};","","// Register this class as \"date\" type","inputEx.registerType(\"date\", inputEx.DateField, [{","   type: 'select',","   label: 'Date format',","   name: 'dateFormat',","   choices: [{","      value: \"m/d/Y\"","   }, {","      value: \"d/m/Y\"","   }]","}]);","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-string\"","    ],","    \"ix_provides\": \"date\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-date/inputex-date.js"].lines = {"1":0,"6":0,"20":0,"21":0,"24":0,"32":0,"34":0,"37":0,"38":0,"41":0,"42":0,"50":0,"55":0,"56":0,"58":0,"59":0,"61":0,"62":0,"63":0,"64":0,"66":0,"67":0,"68":0,"69":0,"70":0,"71":0,"84":0,"86":0,"87":0,"88":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"99":0,"102":0,"113":0,"117":0,"118":0,"121":0,"124":0,"125":0,"128":0,"138":0,"139":0,"140":0,"146":0,"155":0,"156":0,"157":0,"160":0,"161":0,"162":0,"163":0,"168":0};
_yuitest_coverage["build/inputex-date/inputex-date.js"].functions = {"DateField:20":0,"setOptions:30":0,"validate:48":0,"setValue:82":0,"getValue:111":0,"parseWithFormat:138":0,"formatDate:155":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-date/inputex-date.js"].coveredLines = 57;
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

      _yuitest_coverfunc("build/inputex-date/inputex-date.js", "validate", 48);
_yuitest_coverline("build/inputex-date/inputex-date.js", 50);
var value = this.el.value,
         separator = this.options.dateFormat.match(/[^Ymd ]/g)[0],
         ladate = value.split(separator),
         formatSplit, yearIndex, d, Y, m, unedate, annee;

      _yuitest_coverline("build/inputex-date/inputex-date.js", 55);
if(ladate.length !== 3) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 56);
return false;
      }
      _yuitest_coverline("build/inputex-date/inputex-date.js", 58);
if(isNaN(parseInt(ladate[0], 10)) || isNaN(parseInt(ladate[1], 10)) || isNaN(parseInt(ladate[2], 10))) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 59);
return false;
      }
      _yuitest_coverline("build/inputex-date/inputex-date.js", 61);
formatSplit = this.options.dateFormat.split(separator);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 62);
yearIndex = inputEx.indexOf('Y', formatSplit);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 63);
if(ladate[yearIndex].length !== 4) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 64);
return false;
      } // Avoid 3-digits years...
      _yuitest_coverline("build/inputex-date/inputex-date.js", 66);
d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 67);
Y = parseInt(ladate[yearIndex], 10);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 68);
m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;
      _yuitest_coverline("build/inputex-date/inputex-date.js", 69);
unedate = new Date(Y, m, d);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 70);
annee = unedate.getFullYear();
      _yuitest_coverline("build/inputex-date/inputex-date.js", 71);
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

      _yuitest_coverfunc("build/inputex-date/inputex-date.js", "setValue", 82);
_yuitest_coverline("build/inputex-date/inputex-date.js", 84);
var str, dateVal;
      // Don't try to parse a date if there is no date
      _yuitest_coverline("build/inputex-date/inputex-date.js", 86);
if(val === '') {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 87);
inputEx.DateField.superclass.setValue.call(this, '', sendUpdatedEvt);
         _yuitest_coverline("build/inputex-date/inputex-date.js", 88);
return;
      }
      _yuitest_coverline("build/inputex-date/inputex-date.js", 90);
str = "";
      _yuitest_coverline("build/inputex-date/inputex-date.js", 91);
if(val instanceof Date) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 92);
str = inputEx.DateField.formatDate(val, this.options.dateFormat);
      } else {_yuitest_coverline("build/inputex-date/inputex-date.js", 93);
if(this.options.valueFormat) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 94);
dateVal = inputEx.DateField.parseWithFormat(val, this.options.valueFormat);
         _yuitest_coverline("build/inputex-date/inputex-date.js", 95);
str = inputEx.DateField.formatDate(dateVal, this.options.dateFormat);
      }
      // else date must match this.options.dateFormat
      else {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 99);
str = val;
      }}

      _yuitest_coverline("build/inputex-date/inputex-date.js", 102);
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
      _yuitest_coverfunc("build/inputex-date/inputex-date.js", "getValue", 111);
_yuitest_coverline("build/inputex-date/inputex-date.js", 113);
var value = inputEx.DateField.superclass.getValue.call(this),
         finalDate;

      // Hack to validate if field not required and empty
      _yuitest_coverline("build/inputex-date/inputex-date.js", 117);
if(value === '') {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 118);
return '';
      }

      _yuitest_coverline("build/inputex-date/inputex-date.js", 121);
finalDate = inputEx.DateField.parseWithFormat(value, this.options.dateFormat);

      // if valueFormat is specified, we format the string
      _yuitest_coverline("build/inputex-date/inputex-date.js", 124);
if(!forceDate && this.options.valueFormat) {
         _yuitest_coverline("build/inputex-date/inputex-date.js", 125);
return inputEx.DateField.formatDate(finalDate, this.options.valueFormat);
      }

      _yuitest_coverline("build/inputex-date/inputex-date.js", 128);
return finalDate;
   }

});

/**
 * Those methods are limited but largely enough for our usage
 * @method parseWithFormat
 * @static
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 138);
inputEx.DateField.parseWithFormat = function(sDate, format) {
   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "parseWithFormat", 138);
_yuitest_coverline("build/inputex-date/inputex-date.js", 139);
if(sDate){
      _yuitest_coverline("build/inputex-date/inputex-date.js", 140);
var separator = format.match(/[^Ymd ]/g)[0],
         ladate = sDate.split(separator),
         formatSplit = format.split(separator),
         d = parseInt(ladate[inputEx.indexOf('d', formatSplit)], 10),
         Y = parseInt(ladate[inputEx.indexOf('Y', formatSplit)], 10),
         m = parseInt(ladate[inputEx.indexOf('m', formatSplit)], 10) - 1;
      _yuitest_coverline("build/inputex-date/inputex-date.js", 146);
return(new Date(Y, m, d));
   }
};

/**
 * Those methods are limited but largely enough for our usage
 * @method formatDate
 * @static
 */
_yuitest_coverline("build/inputex-date/inputex-date.js", 155);
inputEx.DateField.formatDate = function(d, format) {
   _yuitest_coverfunc("build/inputex-date/inputex-date.js", "formatDate", 155);
_yuitest_coverline("build/inputex-date/inputex-date.js", 156);
if(d){
      _yuitest_coverline("build/inputex-date/inputex-date.js", 157);
var str = format.replace('Y', d.getFullYear()),
         m = d.getMonth() + 1,
         day;
      _yuitest_coverline("build/inputex-date/inputex-date.js", 160);
str = str.replace('m', ((m < 10) ? '0' : '') + m);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 161);
day = d.getDate();
      _yuitest_coverline("build/inputex-date/inputex-date.js", 162);
str = str.replace('d', ((day < 10) ? '0' : '') + day);
      _yuitest_coverline("build/inputex-date/inputex-date.js", 163);
return str;
   }
};

// Register this class as "date" type
_yuitest_coverline("build/inputex-date/inputex-date.js", 168);
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
