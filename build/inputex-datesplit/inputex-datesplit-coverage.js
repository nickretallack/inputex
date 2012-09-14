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
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-datesplit/inputex-datesplit.js",
    code: []
};
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].code=["YUI.add('inputex-datesplit', function (Y, NAME) {","","/**"," * @module inputex-datesplit"," */","YUI.add(\"inputex-datesplit\", function(Y) {","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * inputEx.DateSplitField"," * @class inputEx.DateSplitField"," * @extends inputEx.CombineField"," */","inputEx.DateSplitField = function(options) {","   	","   if(!options.dateFormat) {options.dateFormat = inputEx.messages.defaultDateFormat; }","   ","   var formatSplit = options.dateFormat.split(\"/\");","   this.yearIndex = inputEx.indexOf('Y',formatSplit);","   this.monthIndex = inputEx.indexOf('m',formatSplit);","   this.dayIndex = inputEx.indexOf('d',formatSplit);","   ","   options.fields = [];","   for(var i = 0 ; i < 3 ; i++) {","      if(i == this.dayIndex) {","         options.fields.push({type: 'integer', typeInvite: inputEx.messages.dayTypeInvite, size: 2, trim: true });","      }","      else if(i == this.yearIndex) {","         options.fields.push({type: 'integer', typeInvite: inputEx.messages.yearTypeInvite, size: 4, trim: true });","      }","      else {","         options.fields.push({type: 'integer', typeInvite: inputEx.messages.monthTypeInvite, size: 2, trim: true });","      }","   }","","   options.separators = options.separators || [false,\"&nbsp;\",\"&nbsp;\",false];","   ","	inputEx.DateSplitField.superclass.constructor.call(this,options);","","   this.initAutoTab();","};","","Y.extend(inputEx.DateSplitField, inputEx.CombineField, {","   ","   /**","	 * Set the value. Format the date according to options.dateFormat","	 * @method setValue","	 * @param {Date} val Date to set","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","   setValue: function(value, sendUpdatedEvt) {","      var values = [];","      ","      // !value catches \"\" (empty field), and invalid dates","      if (!value || !lang.isFunction(value.getTime) || !lang.isNumber(value.getTime()) ) {","         values[this.monthIndex] = \"\";","         values[this.yearIndex] = \"\";","         values[this.dayIndex] = \"\";","      } else {","         for(var i = 0 ; i < 3 ; i++) {","            values.push( i === this.dayIndex ?   this.ensureTwoChars(value.getDate()) :","                         i === this.monthIndex ? this.ensureTwoChars(value.getMonth() + 1) :","                                                 value.getFullYear());","         }","      }","      inputEx.DateSplitField.superclass.setValue.call(this, values, sendUpdatedEvt);","   },","   ","   /**","    * @method ensureTwoChars","    */","   ensureTwoChars: function (val) {","      ","      val = val + \"\"; // convert into string if not","      ","      // prefix with \"0\" if 1-char string","      if (val.length === 1) {","         val = \"0\" + val;","      }","      ","      return val;","   },","   ","   /**","    * @method getValue","    */","   getValue: function() {","      if (this.isEmpty()) return \"\";","      ","      var values = inputEx.DateSplitField.superclass.getValue.call(this);","      ","      return new Date(values[this.yearIndex], values[this.monthIndex]-1, values[this.dayIndex] );","   },","   ","   /**","    * @method validate","    */","   validate: function() {","      var subFieldsValidation = inputEx.DateSplitField.superclass.validate.call(this);","      if (!subFieldsValidation) return false;","      ","      var values = inputEx.DateSplitField.superclass.getValue.call(this);","      var day = values[this.dayIndex];","      var month = values[this.monthIndex];","      var year = values[this.yearIndex];","      ","      var val = this.getValue();","      //console.log(\"datesplit value = \",val);","      ","      // 3 empty fields","      if (val == \"\") return true;","      ","      // if a field is empty, it will be set by default (day : 31, month:12, year: 1899/1900)","      //   -> val == \"\" MUST be checked first !","      if (day == \"\" || month == \"\" || year == \"\") return false;","      ","      if (year < 0 || year > 9999 || day < 1 || day > 31 || month < 1 || month > 12) return false;","      ","      // val == any date -> true","      // val == \"Invalid Date\" -> false","      return (val != \"Invalid Date\");","   },","   ","   /**","    * @method isEmpty","    */","	isEmpty: function() {","	   var values = inputEx.DateSplitField.superclass.getValue.call(this);","	   return (values[this.monthIndex] == \"\" && values[this.yearIndex] == \"\" &&  values[this.dayIndex] == \"\");","	},","	","	/**","    * @method initAutoTab","    */","	initAutoTab: function() {","	   // \"keypress\" event codes for numeric keys (keyboard & numpad) ","	   //  (warning : \"keydown\" codes are different with numpad)","	   var numKeyCodes = [48,49,50,51,52,53,54,55,56,57];","	   ","      // verify charCode (don't auto tab when pressing \"tab\", \"arrow\", etc...)","	   var checkNumKey = function(charCode) {","   	   for (var i=0, length=numKeyCodes.length; i < length; i++) {","   	      if (charCode == numKeyCodes[i]) return true;","   	   }","   	   return false;       ","	   };","	   ","	   // Function that checks charCode and execute tab action","	   var that = this;","	   var autoTab = function(inputIndex) {","         // later to let input update its value","   	   lang.later(0, that, function() {","      	   var input = that.inputs[inputIndex];","      	   ","      	   // check input.el.value (string) because getValue doesn't work","      	   // example : if input.el.value == \"06\", getValue() == 6 (length == 1 instead of 2)","      	   if (input.el.value.length == input.options.size) {","      	      that.inputs[inputIndex+1].focus();","      	   }","   	   });","	   };","	   ","	   // add listeners on inputs","	   Y.one(this.inputs[0].el).on(\"keypress\", function(e) {","	      if (checkNumKey(e.charCode)) {","            autoTab(0);","         }","   	}, this, true);","	   Y.one(this.inputs[1].el).on(\"keypress\", function(e) {","	      if (checkNumKey(e.charCode)) {","            autoTab(1);","         }","   	}, this, true);","	}","   ","});","","// Register this class as \"datesplit\" type","inputEx.registerType(\"datesplit\", inputEx.DateSplitField);","","}, '3.1.0',{","requires: ['inputex-combine']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].lines = {"1":0,"6":0,"8":0,"16":0,"18":0,"20":0,"21":0,"22":0,"23":0,"25":0,"26":0,"27":0,"28":0,"30":0,"31":0,"34":0,"38":0,"40":0,"42":0,"45":0,"54":0,"57":0,"58":0,"59":0,"60":0,"62":0,"63":0,"68":0,"76":0,"79":0,"80":0,"83":0,"90":0,"92":0,"94":0,"101":0,"102":0,"104":0,"105":0,"106":0,"107":0,"109":0,"113":0,"117":0,"119":0,"123":0,"130":0,"131":0,"140":0,"143":0,"144":0,"145":0,"147":0,"151":0,"152":0,"154":0,"155":0,"159":0,"160":0,"166":0,"167":0,"168":0,"171":0,"172":0,"173":0,"181":0};
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].functions = {"DateSplitField:16":0,"setValue:53":0,"ensureTwoChars:74":0,"getValue:89":0,"validate:100":0,"isEmpty:129":0,"checkNumKey:143":0,"(anonymous 3):154":0,"autoTab:152":0,"(anonymous 4):166":0,"(anonymous 5):171":0,"initAutoTab:137":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].coveredLines = 66;
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].coveredFunctions = 14;
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 1);
YUI.add('inputex-datesplit', function (Y, NAME) {

/**
 * @module inputex-datesplit
 */
_yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 6);
YUI.add("inputex-datesplit", function(Y) {

  _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * inputEx.DateSplitField
 * @class inputEx.DateSplitField
 * @extends inputEx.CombineField
 */
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 16);
inputEx.DateSplitField = function(options) {
   	
   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "DateSplitField", 16);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 18);
if(!options.dateFormat) {options.dateFormat = inputEx.messages.defaultDateFormat; }
   
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 20);
var formatSplit = options.dateFormat.split("/");
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 21);
this.yearIndex = inputEx.indexOf('Y',formatSplit);
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 22);
this.monthIndex = inputEx.indexOf('m',formatSplit);
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 23);
this.dayIndex = inputEx.indexOf('d',formatSplit);
   
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 25);
options.fields = [];
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 26);
for(var i = 0 ; i < 3 ; i++) {
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 27);
if(i == this.dayIndex) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 28);
options.fields.push({type: 'integer', typeInvite: inputEx.messages.dayTypeInvite, size: 2, trim: true });
      }
      else {_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 30);
if(i == this.yearIndex) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 31);
options.fields.push({type: 'integer', typeInvite: inputEx.messages.yearTypeInvite, size: 4, trim: true });
      }
      else {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 34);
options.fields.push({type: 'integer', typeInvite: inputEx.messages.monthTypeInvite, size: 2, trim: true });
      }}
   }

   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 38);
options.separators = options.separators || [false,"&nbsp;","&nbsp;",false];
   
	_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 40);
inputEx.DateSplitField.superclass.constructor.call(this,options);

   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 42);
this.initAutoTab();
};

_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 45);
Y.extend(inputEx.DateSplitField, inputEx.CombineField, {
   
   /**
	 * Set the value. Format the date according to options.dateFormat
	 * @method setValue
	 * @param {Date} val Date to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
   setValue: function(value, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "setValue", 53);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 54);
var values = [];
      
      // !value catches "" (empty field), and invalid dates
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 57);
if (!value || !lang.isFunction(value.getTime) || !lang.isNumber(value.getTime()) ) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 58);
values[this.monthIndex] = "";
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 59);
values[this.yearIndex] = "";
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 60);
values[this.dayIndex] = "";
      } else {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 62);
for(var i = 0 ; i < 3 ; i++) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 63);
values.push( i === this.dayIndex ?   this.ensureTwoChars(value.getDate()) :
                         i === this.monthIndex ? this.ensureTwoChars(value.getMonth() + 1) :
                                                 value.getFullYear());
         }
      }
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 68);
inputEx.DateSplitField.superclass.setValue.call(this, values, sendUpdatedEvt);
   },
   
   /**
    * @method ensureTwoChars
    */
   ensureTwoChars: function (val) {
      
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "ensureTwoChars", 74);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 76);
val = val + ""; // convert into string if not
      
      // prefix with "0" if 1-char string
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 79);
if (val.length === 1) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 80);
val = "0" + val;
      }
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 83);
return val;
   },
   
   /**
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "getValue", 89);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 90);
if (this.isEmpty()) {return "";}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 92);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 94);
return new Date(values[this.yearIndex], values[this.monthIndex]-1, values[this.dayIndex] );
   },
   
   /**
    * @method validate
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "validate", 100);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 101);
var subFieldsValidation = inputEx.DateSplitField.superclass.validate.call(this);
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 102);
if (!subFieldsValidation) {return false;}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 104);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 105);
var day = values[this.dayIndex];
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 106);
var month = values[this.monthIndex];
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 107);
var year = values[this.yearIndex];
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 109);
var val = this.getValue();
      //console.log("datesplit value = ",val);
      
      // 3 empty fields
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 113);
if (val == "") {return true;}
      
      // if a field is empty, it will be set by default (day : 31, month:12, year: 1899/1900)
      //   -> val == "" MUST be checked first !
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 117);
if (day == "" || month == "" || year == "") {return false;}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 119);
if (year < 0 || year > 9999 || day < 1 || day > 31 || month < 1 || month > 12) {return false;}
      
      // val == any date -> true
      // val == "Invalid Date" -> false
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 123);
return (val != "Invalid Date");
   },
   
   /**
    * @method isEmpty
    */
	isEmpty: function() {
	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "isEmpty", 129);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 130);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 131);
return (values[this.monthIndex] == "" && values[this.yearIndex] == "" &&  values[this.dayIndex] == "");
	},
	
	/**
    * @method initAutoTab
    */
	initAutoTab: function() {
	   // "keypress" event codes for numeric keys (keyboard & numpad) 
	   //  (warning : "keydown" codes are different with numpad)
	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "initAutoTab", 137);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 140);
var numKeyCodes = [48,49,50,51,52,53,54,55,56,57];
	   
      // verify charCode (don't auto tab when pressing "tab", "arrow", etc...)
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 143);
var checkNumKey = function(charCode) {
   	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "checkNumKey", 143);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 144);
for (var i=0, length=numKeyCodes.length; i < length; i++) {
   	      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 145);
if (charCode == numKeyCodes[i]) {return true;}
   	   }
   	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 147);
return false;       
	   };
	   
	   // Function that checks charCode and execute tab action
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 151);
var that = this;
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 152);
var autoTab = function(inputIndex) {
         // later to let input update its value
   	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "autoTab", 152);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 154);
lang.later(0, that, function() {
      	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 3)", 154);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 155);
var input = that.inputs[inputIndex];
      	   
      	   // check input.el.value (string) because getValue doesn't work
      	   // example : if input.el.value == "06", getValue() == 6 (length == 1 instead of 2)
      	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 159);
if (input.el.value.length == input.options.size) {
      	      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 160);
that.inputs[inputIndex+1].focus();
      	   }
   	   });
	   };
	   
	   // add listeners on inputs
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 166);
Y.one(this.inputs[0].el).on("keypress", function(e) {
	      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 4)", 166);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 167);
if (checkNumKey(e.charCode)) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 168);
autoTab(0);
         }
   	}, this, true);
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 171);
Y.one(this.inputs[1].el).on("keypress", function(e) {
	      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 5)", 171);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 172);
if (checkNumKey(e.charCode)) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 173);
autoTab(1);
         }
   	}, this, true);
	}
   
});

// Register this class as "datesplit" type
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 181);
inputEx.registerType("datesplit", inputEx.DateSplitField);

}, '3.1.0',{
requires: ['inputex-combine']
});


}, '@VERSION@');
