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
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].code=["YUI.add('inputex-datesplit', function (Y, NAME) {","","/**"," * @module inputex-datesplit"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * inputEx.DateSplitField"," * @class inputEx.DateSplitField"," * @extends inputEx.CombineField"," */","inputEx.DateSplitField = function(options) {","   	","   if(!options.dateFormat) {options.dateFormat = inputEx.messages.defaultDateFormat; }","   ","   var formatSplit = options.dateFormat.split(\"/\");","   this.yearIndex = inputEx.indexOf('Y',formatSplit);","   this.monthIndex = inputEx.indexOf('m',formatSplit);","   this.dayIndex = inputEx.indexOf('d',formatSplit);","   ","   options.fields = [];","   for(var i = 0 ; i < 3 ; i++) {","      if(i == this.dayIndex) {","         options.fields.push({type: 'integer', typeInvite: inputEx.messages.dayTypeInvite, size: 2, trim: true });","      }","      else if(i == this.yearIndex) {","         options.fields.push({type: 'integer', typeInvite: inputEx.messages.yearTypeInvite, size: 4, trim: true });","      }","      else {","         options.fields.push({type: 'integer', typeInvite: inputEx.messages.monthTypeInvite, size: 2, trim: true });","      }","   }","","   options.separators = options.separators || [false,\"&nbsp;\",\"&nbsp;\",false];","   ","	inputEx.DateSplitField.superclass.constructor.call(this,options);","","   this.initAutoTab();","};","","Y.extend(inputEx.DateSplitField, inputEx.CombineField, {","   ","   /**","	 * Set the value. Format the date according to options.dateFormat","	 * @method setValue","	 * @param {Date} val Date to set","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","   setValue: function(value, sendUpdatedEvt) {","      var values = [];","      ","      // !value catches \"\" (empty field), and invalid dates","      if (!value || !lang.isFunction(value.getTime) || !lang.isNumber(value.getTime()) ) {","         values[this.monthIndex] = \"\";","         values[this.yearIndex] = \"\";","         values[this.dayIndex] = \"\";","      } else {","         for(var i = 0 ; i < 3 ; i++) {","            values.push( i === this.dayIndex ?   this.ensureTwoChars(value.getDate()) :","                         i === this.monthIndex ? this.ensureTwoChars(value.getMonth() + 1) :","                                                 value.getFullYear());","         }","      }","      inputEx.DateSplitField.superclass.setValue.call(this, values, sendUpdatedEvt);","   },","   ","   /**","    * @method ensureTwoChars","    */","   ensureTwoChars: function (val) {","      ","      val = val + \"\"; // convert into string if not","      ","      // prefix with \"0\" if 1-char string","      if (val.length === 1) {","         val = \"0\" + val;","      }","      ","      return val;","   },","   ","   /**","    * @method getValue","    */","   getValue: function() {","      if (this.isEmpty()) return \"\";","      ","      var values = inputEx.DateSplitField.superclass.getValue.call(this);","      ","      return new Date(values[this.yearIndex], values[this.monthIndex]-1, values[this.dayIndex] );","   },","   ","   /**","    * @method validate","    */","   validate: function() {","      var subFieldsValidation = inputEx.DateSplitField.superclass.validate.call(this);","      if (!subFieldsValidation) return false;","      ","      var values = inputEx.DateSplitField.superclass.getValue.call(this);","      var day = values[this.dayIndex];","      var month = values[this.monthIndex];","      var year = values[this.yearIndex];","      ","      var val = this.getValue();","      //console.log(\"datesplit value = \",val);","      ","      // 3 empty fields","      if (val == \"\") return true;","      ","      // if a field is empty, it will be set by default (day : 31, month:12, year: 1899/1900)","      //   -> val == \"\" MUST be checked first !","      if (day == \"\" || month == \"\" || year == \"\") return false;","      ","      if (year < 0 || year > 9999 || day < 1 || day > 31 || month < 1 || month > 12) return false;","      ","      // val == any date -> true","      // val == \"Invalid Date\" -> false","      return (val != \"Invalid Date\");","   },","   ","   /**","    * @method isEmpty","    */","	isEmpty: function() {","	   var values = inputEx.DateSplitField.superclass.getValue.call(this);","	   return (values[this.monthIndex] == \"\" && values[this.yearIndex] == \"\" &&  values[this.dayIndex] == \"\");","	},","	","	/**","    * @method initAutoTab","    */","	initAutoTab: function() {","	   // \"keypress\" event codes for numeric keys (keyboard & numpad) ","	   //  (warning : \"keydown\" codes are different with numpad)","	   var numKeyCodes = [48,49,50,51,52,53,54,55,56,57];","	   ","      // verify charCode (don't auto tab when pressing \"tab\", \"arrow\", etc...)","	   var checkNumKey = function(charCode) {","   	   for (var i=0, length=numKeyCodes.length; i < length; i++) {","   	      if (charCode == numKeyCodes[i]) return true;","   	   }","   	   return false;       ","	   };","	   ","	   // Function that checks charCode and execute tab action","	   var that = this;","	   var autoTab = function(inputIndex) {","         // later to let input update its value","   	   lang.later(0, that, function() {","      	   var input = that.inputs[inputIndex];","      	   ","      	   // check input.el.value (string) because getValue doesn't work","      	   // example : if input.el.value == \"06\", getValue() == 6 (length == 1 instead of 2)","      	   if (input.el.value.length == input.options.size) {","      	      that.inputs[inputIndex+1].focus();","      	   }","   	   });","	   };","	   ","	   // add listeners on inputs","	   Y.one(this.inputs[0].el).on(\"keypress\", function(e) {","	      if (checkNumKey(e.charCode)) {","            autoTab(0);","         }","   	}, this, true);","	   Y.one(this.inputs[1].el).on(\"keypress\", function(e) {","	      if (checkNumKey(e.charCode)) {","            autoTab(1);","         }","   	}, this, true);","	}","   ","});","","// Register this class as \"datesplit\" type","inputEx.registerType(\"datesplit\", inputEx.DateSplitField);","","","}, '@VERSION@', {\"requires\": [\"inputex-combine\", \"inputex-integer\"], \"ix_provides\": \"datesplit\"});"];
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].lines = {"1":0,"6":0,"14":0,"16":0,"18":0,"19":0,"20":0,"21":0,"23":0,"24":0,"25":0,"26":0,"28":0,"29":0,"32":0,"36":0,"38":0,"40":0,"43":0,"52":0,"55":0,"56":0,"57":0,"58":0,"60":0,"61":0,"66":0,"74":0,"77":0,"78":0,"81":0,"88":0,"90":0,"92":0,"99":0,"100":0,"102":0,"103":0,"104":0,"105":0,"107":0,"111":0,"115":0,"117":0,"121":0,"128":0,"129":0,"138":0,"141":0,"142":0,"143":0,"145":0,"149":0,"150":0,"152":0,"153":0,"157":0,"158":0,"164":0,"165":0,"166":0,"169":0,"170":0,"171":0,"179":0};
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].functions = {"DateSplitField:14":0,"setValue:51":0,"ensureTwoChars:72":0,"getValue:87":0,"validate:98":0,"isEmpty:127":0,"checkNumKey:141":0,"(anonymous 2):152":0,"autoTab:150":0,"(anonymous 3):164":0,"(anonymous 4):169":0,"initAutoTab:135":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].coveredLines = 65;
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 1);
YUI.add('inputex-datesplit', function (Y, NAME) {

/**
 * @module inputex-datesplit
 */
  _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * inputEx.DateSplitField
 * @class inputEx.DateSplitField
 * @extends inputEx.CombineField
 */
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 14);
inputEx.DateSplitField = function(options) {
   	
   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "DateSplitField", 14);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 16);
if(!options.dateFormat) {options.dateFormat = inputEx.messages.defaultDateFormat; }
   
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 18);
var formatSplit = options.dateFormat.split("/");
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 19);
this.yearIndex = inputEx.indexOf('Y',formatSplit);
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 20);
this.monthIndex = inputEx.indexOf('m',formatSplit);
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 21);
this.dayIndex = inputEx.indexOf('d',formatSplit);
   
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 23);
options.fields = [];
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 24);
for(var i = 0 ; i < 3 ; i++) {
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 25);
if(i == this.dayIndex) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 26);
options.fields.push({type: 'integer', typeInvite: inputEx.messages.dayTypeInvite, size: 2, trim: true });
      }
      else {_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 28);
if(i == this.yearIndex) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 29);
options.fields.push({type: 'integer', typeInvite: inputEx.messages.yearTypeInvite, size: 4, trim: true });
      }
      else {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 32);
options.fields.push({type: 'integer', typeInvite: inputEx.messages.monthTypeInvite, size: 2, trim: true });
      }}
   }

   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 36);
options.separators = options.separators || [false,"&nbsp;","&nbsp;",false];
   
	_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 38);
inputEx.DateSplitField.superclass.constructor.call(this,options);

   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 40);
this.initAutoTab();
};

_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 43);
Y.extend(inputEx.DateSplitField, inputEx.CombineField, {
   
   /**
	 * Set the value. Format the date according to options.dateFormat
	 * @method setValue
	 * @param {Date} val Date to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
   setValue: function(value, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "setValue", 51);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 52);
var values = [];
      
      // !value catches "" (empty field), and invalid dates
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 55);
if (!value || !lang.isFunction(value.getTime) || !lang.isNumber(value.getTime()) ) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 56);
values[this.monthIndex] = "";
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 57);
values[this.yearIndex] = "";
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 58);
values[this.dayIndex] = "";
      } else {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 60);
for(var i = 0 ; i < 3 ; i++) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 61);
values.push( i === this.dayIndex ?   this.ensureTwoChars(value.getDate()) :
                         i === this.monthIndex ? this.ensureTwoChars(value.getMonth() + 1) :
                                                 value.getFullYear());
         }
      }
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 66);
inputEx.DateSplitField.superclass.setValue.call(this, values, sendUpdatedEvt);
   },
   
   /**
    * @method ensureTwoChars
    */
   ensureTwoChars: function (val) {
      
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "ensureTwoChars", 72);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 74);
val = val + ""; // convert into string if not
      
      // prefix with "0" if 1-char string
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 77);
if (val.length === 1) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 78);
val = "0" + val;
      }
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 81);
return val;
   },
   
   /**
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "getValue", 87);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 88);
if (this.isEmpty()) {return "";}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 90);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 92);
return new Date(values[this.yearIndex], values[this.monthIndex]-1, values[this.dayIndex] );
   },
   
   /**
    * @method validate
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "validate", 98);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 99);
var subFieldsValidation = inputEx.DateSplitField.superclass.validate.call(this);
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 100);
if (!subFieldsValidation) {return false;}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 102);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 103);
var day = values[this.dayIndex];
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 104);
var month = values[this.monthIndex];
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 105);
var year = values[this.yearIndex];
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 107);
var val = this.getValue();
      //console.log("datesplit value = ",val);
      
      // 3 empty fields
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 111);
if (val == "") {return true;}
      
      // if a field is empty, it will be set by default (day : 31, month:12, year: 1899/1900)
      //   -> val == "" MUST be checked first !
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 115);
if (day == "" || month == "" || year == "") {return false;}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 117);
if (year < 0 || year > 9999 || day < 1 || day > 31 || month < 1 || month > 12) {return false;}
      
      // val == any date -> true
      // val == "Invalid Date" -> false
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 121);
return (val != "Invalid Date");
   },
   
   /**
    * @method isEmpty
    */
	isEmpty: function() {
	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "isEmpty", 127);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 128);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 129);
return (values[this.monthIndex] == "" && values[this.yearIndex] == "" &&  values[this.dayIndex] == "");
	},
	
	/**
    * @method initAutoTab
    */
	initAutoTab: function() {
	   // "keypress" event codes for numeric keys (keyboard & numpad) 
	   //  (warning : "keydown" codes are different with numpad)
	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "initAutoTab", 135);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 138);
var numKeyCodes = [48,49,50,51,52,53,54,55,56,57];
	   
      // verify charCode (don't auto tab when pressing "tab", "arrow", etc...)
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 141);
var checkNumKey = function(charCode) {
   	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "checkNumKey", 141);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 142);
for (var i=0, length=numKeyCodes.length; i < length; i++) {
   	      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 143);
if (charCode == numKeyCodes[i]) {return true;}
   	   }
   	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 145);
return false;       
	   };
	   
	   // Function that checks charCode and execute tab action
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 149);
var that = this;
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 150);
var autoTab = function(inputIndex) {
         // later to let input update its value
   	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "autoTab", 150);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 152);
lang.later(0, that, function() {
      	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 2)", 152);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 153);
var input = that.inputs[inputIndex];
      	   
      	   // check input.el.value (string) because getValue doesn't work
      	   // example : if input.el.value == "06", getValue() == 6 (length == 1 instead of 2)
      	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 157);
if (input.el.value.length == input.options.size) {
      	      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 158);
that.inputs[inputIndex+1].focus();
      	   }
   	   });
	   };
	   
	   // add listeners on inputs
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 164);
Y.one(this.inputs[0].el).on("keypress", function(e) {
	      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 3)", 164);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 165);
if (checkNumKey(e.charCode)) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 166);
autoTab(0);
         }
   	}, this, true);
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 169);
Y.one(this.inputs[1].el).on("keypress", function(e) {
	      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 4)", 169);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 170);
if (checkNumKey(e.charCode)) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 171);
autoTab(1);
         }
   	}, this, true);
	}
   
});

// Register this class as "datesplit" type
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 179);
inputEx.registerType("datesplit", inputEx.DateSplitField);


}, '@VERSION@', {"requires": ["inputex-combine", "inputex-integer"], "ix_provides": "datesplit"});
