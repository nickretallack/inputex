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
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].code=["YUI.add('inputex-datesplit', function (Y, NAME) {","","/**"," * @module inputex-datesplit"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * inputEx.DateSplitField"," * @class inputEx.DateSplitField"," * @extends inputEx.CombineField"," */","inputEx.DateSplitField = function(options) {","","    // The ressource bundle is loaded here because","    // DateSplitField needs them to construct his fields","","    // this.messages will be overridden by the constructor of Field and re-loaded and mix in setOptions","    this.messages = Y.Intl.get(\"inputex-datesplit\");","","   if(!options.dateFormat) {options.dateFormat = this.messages.defaultDateFormat; }","   ","   var formatSplit = options.dateFormat.split(\"/\");","   this.yearIndex = inputEx.indexOf('Y',formatSplit);","   this.monthIndex = inputEx.indexOf('m',formatSplit);","   this.dayIndex = inputEx.indexOf('d',formatSplit);","   ","   options.fields = [];","   for(var i = 0 ; i < 3 ; i++) {","      if(i == this.dayIndex) {","         options.fields.push({type: 'integer', typeInvite: this.messages.dayTypeInvite, size: 2, trim: true });","      }","      else if(i == this.yearIndex) {","         options.fields.push({type: 'integer', typeInvite: this.messages.yearTypeInvite, size: 4, trim: true });","      }","      else {","         options.fields.push({type: 'integer', typeInvite: this.messages.monthTypeInvite, size: 2, trim: true });","      }","   }","","   options.separators = options.separators || [false,\"&nbsp;\",\"&nbsp;\",false];","   ","	inputEx.DateSplitField.superclass.constructor.call(this,options);","","   this.initAutoTab();","};","","Y.extend(inputEx.DateSplitField, inputEx.CombineField, {","   ","    /**","     * @method setOptions","     */","    setOptions: function(options) {","      inputEx.DateSplitField.superclass.setOptions.call(this, options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-datesplit\"));","    },","","   /**","	 * Set the value. Format the date according to options.dateFormat","	 * @method setValue","	 * @param {Date} val Date to set","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","   setValue: function(value, sendUpdatedEvt) {","      var values = [];","      ","      // !value catches \"\" (empty field), and invalid dates","      if (!value || !lang.isFunction(value.getTime) || !lang.isNumber(value.getTime()) ) {","         values[this.monthIndex] = \"\";","         values[this.yearIndex] = \"\";","         values[this.dayIndex] = \"\";","      } else {","         for(var i = 0 ; i < 3 ; i++) {","            values.push( i === this.dayIndex ?   this.ensureTwoChars(value.getDate()) :","                         i === this.monthIndex ? this.ensureTwoChars(value.getMonth() + 1) :","                                                 value.getFullYear());","         }","      }","      inputEx.DateSplitField.superclass.setValue.call(this, values, sendUpdatedEvt);","   },","   ","   /**","    * @method ensureTwoChars","    */","   ensureTwoChars: function (val) {","      ","      val = val + \"\"; // convert into string if not","      ","      // prefix with \"0\" if 1-char string","      if (val.length === 1) {","         val = \"0\" + val;","      }","      ","      return val;","   },","   ","   /**","    * @method getValue","    */","   getValue: function() {","      if (this.isEmpty()) return \"\";","      ","      var values = inputEx.DateSplitField.superclass.getValue.call(this);","      ","      return new Date(values[this.yearIndex], values[this.monthIndex]-1, values[this.dayIndex] );","   },","   ","   /**","    * @method validate","    */","   validate: function() {","      var subFieldsValidation = inputEx.DateSplitField.superclass.validate.call(this);","      if (!subFieldsValidation) return false;","      ","      var values = inputEx.DateSplitField.superclass.getValue.call(this);","      var day = values[this.dayIndex];","      var month = values[this.monthIndex];","      var year = values[this.yearIndex];","      ","      var val = this.getValue();","      //console.log(\"datesplit value = \",val);","      ","      // 3 empty fields","      if (val == \"\") return true;","      ","      // if a field is empty, it will be set by default (day : 31, month:12, year: 1899/1900)","      //   -> val == \"\" MUST be checked first !","      if (day == \"\" || month == \"\" || year == \"\") return false;","      ","      if (year < 0 || year > 9999 || day < 1 || day > 31 || month < 1 || month > 12) return false;","      ","      // val == any date -> true","      // val == \"Invalid Date\" -> false","      return (val != \"Invalid Date\");","   },","   ","   /**","    * @method isEmpty","    */","	isEmpty: function() {","	   var values = inputEx.DateSplitField.superclass.getValue.call(this);","	   return (values[this.monthIndex] == \"\" && values[this.yearIndex] == \"\" &&  values[this.dayIndex] == \"\");","	},","	","	/**","    * @method initAutoTab","    */","	initAutoTab: function() {","	   // \"keypress\" event codes for numeric keys (keyboard & numpad) ","	   //  (warning : \"keydown\" codes are different with numpad)","	   var numKeyCodes = [48,49,50,51,52,53,54,55,56,57];","	   ","      // verify charCode (don't auto tab when pressing \"tab\", \"arrow\", etc...)","	   var checkNumKey = function(charCode) {","   	   for (var i=0, length=numKeyCodes.length; i < length; i++) {","   	      if (charCode == numKeyCodes[i]) return true;","   	   }","   	   return false;       ","	   };","	   ","	   // Function that checks charCode and execute tab action","	   var that = this;","	   var autoTab = function(inputIndex) {","         // later to let input update its value","   	   lang.later(0, that, function() {","      	   var input = that.inputs[inputIndex];","      	   ","      	   // check input.el.value (string) because getValue doesn't work","      	   // example : if input.el.value == \"06\", getValue() == 6 (length == 1 instead of 2)","      	   if (input.el.value.length == input.options.size) {","      	      that.inputs[inputIndex+1].focus();","      	   }","   	   });","	   };","	   ","	   // add listeners on inputs","	   Y.one(this.inputs[0].el).on(\"keypress\", function(e) {","	      if (checkNumKey(e.charCode)) {","            autoTab(0);","         }","   	}, this, true);","	   Y.one(this.inputs[1].el).on(\"keypress\", function(e) {","	      if (checkNumKey(e.charCode)) {","            autoTab(1);","         }","   	}, this, true);","	}","   ","});","","// Register this class as \"datesplit\" type","inputEx.registerType(\"datesplit\", inputEx.DateSplitField);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-combine\",","        \"inputex-integer\"","    ],","    \"ix_provides\": \"datesplit\",","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].lines = {"1":0,"6":0,"14":0,"20":0,"22":0,"24":0,"25":0,"26":0,"27":0,"29":0,"30":0,"31":0,"32":0,"34":0,"35":0,"38":0,"42":0,"44":0,"46":0,"49":0,"55":0,"58":0,"68":0,"71":0,"72":0,"73":0,"74":0,"76":0,"77":0,"82":0,"90":0,"93":0,"94":0,"97":0,"104":0,"106":0,"108":0,"115":0,"116":0,"118":0,"119":0,"120":0,"121":0,"123":0,"127":0,"131":0,"133":0,"137":0,"144":0,"145":0,"154":0,"157":0,"158":0,"159":0,"161":0,"165":0,"166":0,"168":0,"169":0,"173":0,"174":0,"180":0,"181":0,"182":0,"185":0,"186":0,"187":0,"195":0};
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].functions = {"DateSplitField:14":0,"setOptions:54":0,"setValue:67":0,"ensureTwoChars:88":0,"getValue:103":0,"validate:114":0,"isEmpty:143":0,"checkNumKey:157":0,"(anonymous 2):168":0,"autoTab:166":0,"(anonymous 3):180":0,"(anonymous 4):185":0,"initAutoTab:151":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].coveredLines = 68;
_yuitest_coverage["build/inputex-datesplit/inputex-datesplit.js"].coveredFunctions = 14;
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

    // The ressource bundle is loaded here because
    // DateSplitField needs them to construct his fields

    // this.messages will be overridden by the constructor of Field and re-loaded and mix in setOptions
    _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "DateSplitField", 14);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 20);
this.messages = Y.Intl.get("inputex-datesplit");

   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 22);
if(!options.dateFormat) {options.dateFormat = this.messages.defaultDateFormat; }
   
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 24);
var formatSplit = options.dateFormat.split("/");
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 25);
this.yearIndex = inputEx.indexOf('Y',formatSplit);
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 26);
this.monthIndex = inputEx.indexOf('m',formatSplit);
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 27);
this.dayIndex = inputEx.indexOf('d',formatSplit);
   
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 29);
options.fields = [];
   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 30);
for(var i = 0 ; i < 3 ; i++) {
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 31);
if(i == this.dayIndex) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 32);
options.fields.push({type: 'integer', typeInvite: this.messages.dayTypeInvite, size: 2, trim: true });
      }
      else {_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 34);
if(i == this.yearIndex) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 35);
options.fields.push({type: 'integer', typeInvite: this.messages.yearTypeInvite, size: 4, trim: true });
      }
      else {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 38);
options.fields.push({type: 'integer', typeInvite: this.messages.monthTypeInvite, size: 2, trim: true });
      }}
   }

   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 42);
options.separators = options.separators || [false,"&nbsp;","&nbsp;",false];
   
	_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 44);
inputEx.DateSplitField.superclass.constructor.call(this,options);

   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 46);
this.initAutoTab();
};

_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 49);
Y.extend(inputEx.DateSplitField, inputEx.CombineField, {
   
    /**
     * @method setOptions
     */
    setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "setOptions", 54);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 55);
inputEx.DateSplitField.superclass.setOptions.call(this, options);

      //I18N
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 58);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-datesplit"));
    },

   /**
	 * Set the value. Format the date according to options.dateFormat
	 * @method setValue
	 * @param {Date} val Date to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
   setValue: function(value, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "setValue", 67);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 68);
var values = [];
      
      // !value catches "" (empty field), and invalid dates
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 71);
if (!value || !lang.isFunction(value.getTime) || !lang.isNumber(value.getTime()) ) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 72);
values[this.monthIndex] = "";
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 73);
values[this.yearIndex] = "";
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 74);
values[this.dayIndex] = "";
      } else {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 76);
for(var i = 0 ; i < 3 ; i++) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 77);
values.push( i === this.dayIndex ?   this.ensureTwoChars(value.getDate()) :
                         i === this.monthIndex ? this.ensureTwoChars(value.getMonth() + 1) :
                                                 value.getFullYear());
         }
      }
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 82);
inputEx.DateSplitField.superclass.setValue.call(this, values, sendUpdatedEvt);
   },
   
   /**
    * @method ensureTwoChars
    */
   ensureTwoChars: function (val) {
      
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "ensureTwoChars", 88);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 90);
val = val + ""; // convert into string if not
      
      // prefix with "0" if 1-char string
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 93);
if (val.length === 1) {
         _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 94);
val = "0" + val;
      }
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 97);
return val;
   },
   
   /**
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "getValue", 103);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 104);
if (this.isEmpty()) {return "";}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 106);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 108);
return new Date(values[this.yearIndex], values[this.monthIndex]-1, values[this.dayIndex] );
   },
   
   /**
    * @method validate
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "validate", 114);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 115);
var subFieldsValidation = inputEx.DateSplitField.superclass.validate.call(this);
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 116);
if (!subFieldsValidation) {return false;}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 118);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 119);
var day = values[this.dayIndex];
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 120);
var month = values[this.monthIndex];
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 121);
var year = values[this.yearIndex];
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 123);
var val = this.getValue();
      //console.log("datesplit value = ",val);
      
      // 3 empty fields
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 127);
if (val == "") {return true;}
      
      // if a field is empty, it will be set by default (day : 31, month:12, year: 1899/1900)
      //   -> val == "" MUST be checked first !
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 131);
if (day == "" || month == "" || year == "") {return false;}
      
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 133);
if (year < 0 || year > 9999 || day < 1 || day > 31 || month < 1 || month > 12) {return false;}
      
      // val == any date -> true
      // val == "Invalid Date" -> false
      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 137);
return (val != "Invalid Date");
   },
   
   /**
    * @method isEmpty
    */
	isEmpty: function() {
	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "isEmpty", 143);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 144);
var values = inputEx.DateSplitField.superclass.getValue.call(this);
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 145);
return (values[this.monthIndex] == "" && values[this.yearIndex] == "" &&  values[this.dayIndex] == "");
	},
	
	/**
    * @method initAutoTab
    */
	initAutoTab: function() {
	   // "keypress" event codes for numeric keys (keyboard & numpad) 
	   //  (warning : "keydown" codes are different with numpad)
	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "initAutoTab", 151);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 154);
var numKeyCodes = [48,49,50,51,52,53,54,55,56,57];
	   
      // verify charCode (don't auto tab when pressing "tab", "arrow", etc...)
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 157);
var checkNumKey = function(charCode) {
   	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "checkNumKey", 157);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 158);
for (var i=0, length=numKeyCodes.length; i < length; i++) {
   	      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 159);
if (charCode == numKeyCodes[i]) {return true;}
   	   }
   	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 161);
return false;       
	   };
	   
	   // Function that checks charCode and execute tab action
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 165);
var that = this;
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 166);
var autoTab = function(inputIndex) {
         // later to let input update its value
   	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "autoTab", 166);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 168);
lang.later(0, that, function() {
      	   _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 2)", 168);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 169);
var input = that.inputs[inputIndex];
      	   
      	   // check input.el.value (string) because getValue doesn't work
      	   // example : if input.el.value == "06", getValue() == 6 (length == 1 instead of 2)
      	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 173);
if (input.el.value.length == input.options.size) {
      	      _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 174);
that.inputs[inputIndex+1].focus();
      	   }
   	   });
	   };
	   
	   // add listeners on inputs
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 180);
Y.one(this.inputs[0].el).on("keypress", function(e) {
	      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 3)", 180);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 181);
if (checkNumKey(e.charCode)) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 182);
autoTab(0);
         }
   	}, this, true);
	   _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 185);
Y.one(this.inputs[1].el).on("keypress", function(e) {
	      _yuitest_coverfunc("build/inputex-datesplit/inputex-datesplit.js", "(anonymous 4)", 185);
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 186);
if (checkNumKey(e.charCode)) {
            _yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 187);
autoTab(1);
         }
   	}, this, true);
	}
   
});

// Register this class as "datesplit" type
_yuitest_coverline("build/inputex-datesplit/inputex-datesplit.js", 195);
inputEx.registerType("datesplit", inputEx.DateSplitField);


}, '@VERSION@', {
    "requires": [
        "inputex-combine",
        "inputex-integer"
    ],
    "ix_provides": "datesplit",
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
