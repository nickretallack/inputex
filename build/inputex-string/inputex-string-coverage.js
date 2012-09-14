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
_yuitest_coverage["build/inputex-string/inputex-string.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-string/inputex-string.js",
    code: []
};
_yuitest_coverage["build/inputex-string/inputex-string.js"].code=["YUI.add('inputex-string', function (Y, NAME) {","","/**"," * @module inputex-string"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Basic string field (equivalent to the input type \"text\")"," * @class inputEx.StringField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *	  <li>regexp: regular expression used to validate (otherwise it always validate)</li>"," *   <li>size: size attribute of the input</li>"," *   <li>maxLength: maximum size of the string field (no message display, uses the maxlength html attribute)</li>"," *   <li>minLength: minimum size of the string field (will display an error message if shorter)</li>"," *   <li>typeInvite: string displayed when the field is empty</li>"," *   <li>readonly: set the field as readonly</li>"," * </ul>"," */","inputEx.StringField = function(options) {","   inputEx.StringField.superclass.constructor.call(this, options);","","	  if(this.options.typeInvite) {","	     this.updateTypeInvite();","	  }","};","","Y.extend(inputEx.StringField, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","	setOptions: function(options) {","	   inputEx.StringField.superclass.setOptions.call(this, options);","","	   this.options.regexp = options.regexp;","	   this.options.size = options.size;","	   this.options.maxLength = options.maxLength;","	   this.options.minLength = options.minLength;","	   this.options.typeInvite = options.typeInvite;","	   this.options.readonly = options.readonly;","	   this.options.autocomplete = lang.isUndefined(options.autocomplete) ?","	                                  inputEx.browserAutocomplete :","	                                  (options.autocomplete === false || options.autocomplete === \"off\") ? false : true;","	   this.options.trim = (options.trim === true) ? true : false;","   },","","","   /**","    * Render an 'INPUT' DOM node","    * @method renderComponent","    */","   renderComponent: function() {","","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","","      // Attributes of the input field","      var attributes = {};","      attributes.type = 'text';","      attributes.id = this.divEl.id?this.divEl.id+'-field':Y.guid();","      if(this.options.size) { attributes.size = this.options.size; }","      if(this.options.name) { attributes.name = this.options.name; }","      if(this.options.readonly) { attributes.readonly = 'readonly'; }","","      if(this.options.maxLength) { attributes.maxLength = this.options.maxLength; }","      attributes.autocomplete = this.options.autocomplete ? 'on' : 'off';","","      // Create the node","      this.el = inputEx.cn('input', attributes);","","      // Append it to the main element","      this.wrapEl.appendChild(this.el);","      this.fieldContainer.appendChild(this.wrapEl);","   },","","	/**","	 * Set the name of the field (or hidden field)","	 * @method setFieldName","	 */","	setFieldName: function(name) {","		this.el.name = name;","	},","","   /**","    * Register the change, focus and blur events","    * @method initEvents","    */","   initEvents: function() {","     Y.on(\"change\", this.onChange,this.el, this);","","       if (Y.UA.ie > 0){ // refer to inputEx-95","            var field = this.el;","            Y.on(\"key\", function(e){","              field.blur();","              field.focus();","            }, this.el,'down:13', this);","       }","","     Y.on(\"focus\", this.onFocus,this.el, this);","     Y.on(\"blur\", this.onBlur,this.el, this);","     Y.on(\"keypress\", this.onKeyPress, this.el, this);","     Y.on(\"keyup\", this.onKeyUp, this.el, this);","   },","","   /**","    * Return the string value","    * @method getValue","    * @param {String} The string value","    */","   getValue: function() {","      ","      var value;","      ","      value = (this.options.typeInvite && this.el.value == this.options.typeInvite) ? '' : this.el.value;","      ","      if (this.options.trim) {","         value = lang.trim(value);","      }","      ","	   return value;","   },","","   /**","    * Function to set the value","    * @method setValue","    * @param {String} value The new value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","		// + check : if Null or Undefined we put '' in the stringField","		this.el.value = ( lang.isNull(value) || lang.isUndefined(value) ) ? '' : value;","","      // call parent class method to set style and fire \"updated\" event","      inputEx.StringField.superclass.setValue.call(this, value, sendUpdatedEvt);","   },","","   /**","    * Uses the optional regexp to validate the field value","    * @method validate","    */","   validate: function() {","      var val = this.getValue();","","      // empty field","      if (val === '') {","         // validate only if not required","         return !this.options.required;","      }","","      // Check regex matching and minLength (both used in password field...)","      var result = true;","","      // if we are using a regular expression","      if( this.options.regexp ) {","	      result = result && val.match(this.options.regexp);","      }","      if( this.options.minLength ) {","	      result = result && val.length >= this.options.minLength;","      }","      return result;","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      this.el.disabled = true;","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      this.el.disabled = false;","   },","","   /**","    * Check if the field is disabled","    * @method isDisabled","    */","   isDisabled: function() {","      return this.el.disabled;","   },","","   /**","    * Set the focus to this field","    * @method focus","    */","   focus: function() {","      // Can't use lang.isFunction because IE >= 6 would say focus is not a function (IE says it's an object) !!","      if(!!this.el && !lang.isUndefined(this.el.focus) ) {","         this.el.focus();","      }","   },","","	/**","    * Add the minLength string message handling","    * @method getStateString","    */","	getStateString: function(state) {","	   if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {","	      return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1];","      }","	   return inputEx.StringField.superclass.getStateString.call(this, state);","	},","","   /**","    * Display the type invite after setting the class","    * @method setClassFromState","    */","   setClassFromState: function() {","	   inputEx.StringField.superclass.setClassFromState.call(this);","","	   // display/mask typeInvite","	   if(this.options.typeInvite) {","	      this.updateTypeInvite();","      }","	},","","   /**","    * @method updateTypeInvite","    */","	updateTypeInvite: function() {","","	   // field not focused","      if (!Y.one(this.divEl).hasClass( \"inputEx-focused\")) {","","         // show type invite if field is empty","         if(this.isEmpty()) {","	         Y.one(this.divEl).addClass( \"inputEx-typeInvite\");","	         this.el.value = this.options.typeInvite;","","	      // important for setValue to work with typeInvite","         } else {","            Y.one(this.divEl).removeClass(\"inputEx-typeInvite\");","         }","","      // field focused : remove type invite","      } else {","	      if(Y.one(this.divEl).hasClass(\"inputEx-typeInvite\")) {","	         // remove text","	         this.el.value = \"\";","","	         // remove the \"empty\" state and class","	         this.previousState = null;","	         Y.one(this.divEl).removeClass(\"inputEx-typeInvite\");","         }","      }","	},","","	/**","	 * Clear the typeInvite when the field gains focus","	 * @method onFocus","	 */","	onFocus: function(e) {","	   inputEx.StringField.superclass.onFocus.call(this,e);","","	   if(this.options.typeInvite) {","         this.updateTypeInvite();","      }","	},","","   /**","    * @method onKeyPress","    */","	onKeyPress: function(e) {","	   // override me","	},","","   /**","    * @method onKeyUp","    */","   onKeyUp: function(e) {","      // override me","      //","      //   example :","      //","      //   lang.later(0, this, this.setClassFromState);","      //","      //     -> Set style immediatly when typing in the field","      //     -> Call setClassFromState escaping the stack (after the event has been fully treated, because the value has to be updated)","   }","","});","","","","","// Register this class as \"string\" type","inputEx.registerType(\"string\", inputEx.StringField, [","    { type: 'string', label: 'Type invite', name: 'typeInvite', value: ''},","    { type: 'integer', label: 'Size', name: 'size', value: 20},","    { type: 'integer', label: 'Min. length', name: 'minLength', value: 0}","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"event-key\"], \"ix_provides\": \"string\"});"];
_yuitest_coverage["build/inputex-string/inputex-string.js"].lines = {"1":0,"6":0,"24":0,"25":0,"27":0,"28":0,"32":0,"39":0,"41":0,"42":0,"43":0,"44":0,"45":0,"46":0,"47":0,"50":0,"61":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"71":0,"72":0,"75":0,"78":0,"79":0,"87":0,"95":0,"97":0,"98":0,"99":0,"100":0,"101":0,"105":0,"106":0,"107":0,"108":0,"118":0,"120":0,"122":0,"123":0,"126":0,"137":0,"140":0,"148":0,"151":0,"153":0,"157":0,"160":0,"161":0,"163":0,"164":0,"166":0,"174":0,"182":0,"190":0,"199":0,"200":0,"209":0,"210":0,"212":0,"220":0,"223":0,"224":0,"234":0,"237":0,"238":0,"239":0,"243":0,"248":0,"250":0,"253":0,"254":0,"264":0,"266":0,"267":0,"298":0};
_yuitest_coverage["build/inputex-string/inputex-string.js"].functions = {"StringField:24":0,"setOptions:38":0,"renderComponent:58":0,"setFieldName:86":0,"(anonymous 2):99":0,"initEvents:94":0,"getValue:116":0,"setValue:135":0,"validate:147":0,"disable:173":0,"enable:181":0,"isDisabled:189":0,"focus:197":0,"getStateString:208":0,"setClassFromState:219":0,"updateTypeInvite:231":0,"onFocus:263":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-string/inputex-string.js"].coveredLines = 79;
_yuitest_coverage["build/inputex-string/inputex-string.js"].coveredFunctions = 18;
_yuitest_coverline("build/inputex-string/inputex-string.js", 1);
YUI.add('inputex-string', function (Y, NAME) {

/**
 * @module inputex-string
 */
   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-string/inputex-string.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Basic string field (equivalent to the input type "text")
 * @class inputEx.StringField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *	  <li>regexp: regular expression used to validate (otherwise it always validate)</li>
 *   <li>size: size attribute of the input</li>
 *   <li>maxLength: maximum size of the string field (no message display, uses the maxlength html attribute)</li>
 *   <li>minLength: minimum size of the string field (will display an error message if shorter)</li>
 *   <li>typeInvite: string displayed when the field is empty</li>
 *   <li>readonly: set the field as readonly</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-string/inputex-string.js", 24);
inputEx.StringField = function(options) {
   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "StringField", 24);
_yuitest_coverline("build/inputex-string/inputex-string.js", 25);
inputEx.StringField.superclass.constructor.call(this, options);

	  _yuitest_coverline("build/inputex-string/inputex-string.js", 27);
if(this.options.typeInvite) {
	     _yuitest_coverline("build/inputex-string/inputex-string.js", 28);
this.updateTypeInvite();
	  }
};

_yuitest_coverline("build/inputex-string/inputex-string.js", 32);
Y.extend(inputEx.StringField, inputEx.Field, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
	setOptions: function(options) {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "setOptions", 38);
_yuitest_coverline("build/inputex-string/inputex-string.js", 39);
inputEx.StringField.superclass.setOptions.call(this, options);

	   _yuitest_coverline("build/inputex-string/inputex-string.js", 41);
this.options.regexp = options.regexp;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 42);
this.options.size = options.size;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 43);
this.options.maxLength = options.maxLength;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 44);
this.options.minLength = options.minLength;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 45);
this.options.typeInvite = options.typeInvite;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 46);
this.options.readonly = options.readonly;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 47);
this.options.autocomplete = lang.isUndefined(options.autocomplete) ?
	                                  inputEx.browserAutocomplete :
	                                  (options.autocomplete === false || options.autocomplete === "off") ? false : true;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 50);
this.options.trim = (options.trim === true) ? true : false;
   },


   /**
    * Render an 'INPUT' DOM node
    * @method renderComponent
    */
   renderComponent: function() {

      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "renderComponent", 58);
_yuitest_coverline("build/inputex-string/inputex-string.js", 61);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});

      // Attributes of the input field
      _yuitest_coverline("build/inputex-string/inputex-string.js", 64);
var attributes = {};
      _yuitest_coverline("build/inputex-string/inputex-string.js", 65);
attributes.type = 'text';
      _yuitest_coverline("build/inputex-string/inputex-string.js", 66);
attributes.id = this.divEl.id?this.divEl.id+'-field':Y.guid();
      _yuitest_coverline("build/inputex-string/inputex-string.js", 67);
if(this.options.size) { attributes.size = this.options.size; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 68);
if(this.options.name) { attributes.name = this.options.name; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 69);
if(this.options.readonly) { attributes.readonly = 'readonly'; }

      _yuitest_coverline("build/inputex-string/inputex-string.js", 71);
if(this.options.maxLength) { attributes.maxLength = this.options.maxLength; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 72);
attributes.autocomplete = this.options.autocomplete ? 'on' : 'off';

      // Create the node
      _yuitest_coverline("build/inputex-string/inputex-string.js", 75);
this.el = inputEx.cn('input', attributes);

      // Append it to the main element
      _yuitest_coverline("build/inputex-string/inputex-string.js", 78);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-string/inputex-string.js", 79);
this.fieldContainer.appendChild(this.wrapEl);
   },

	/**
	 * Set the name of the field (or hidden field)
	 * @method setFieldName
	 */
	setFieldName: function(name) {
		_yuitest_coverfunc("build/inputex-string/inputex-string.js", "setFieldName", 86);
_yuitest_coverline("build/inputex-string/inputex-string.js", 87);
this.el.name = name;
	},

   /**
    * Register the change, focus and blur events
    * @method initEvents
    */
   initEvents: function() {
     _yuitest_coverfunc("build/inputex-string/inputex-string.js", "initEvents", 94);
_yuitest_coverline("build/inputex-string/inputex-string.js", 95);
Y.on("change", this.onChange,this.el, this);

       _yuitest_coverline("build/inputex-string/inputex-string.js", 97);
if (Y.UA.ie > 0){ // refer to inputEx-95
            _yuitest_coverline("build/inputex-string/inputex-string.js", 98);
var field = this.el;
            _yuitest_coverline("build/inputex-string/inputex-string.js", 99);
Y.on("key", function(e){
              _yuitest_coverfunc("build/inputex-string/inputex-string.js", "(anonymous 2)", 99);
_yuitest_coverline("build/inputex-string/inputex-string.js", 100);
field.blur();
              _yuitest_coverline("build/inputex-string/inputex-string.js", 101);
field.focus();
            }, this.el,'down:13', this);
       }

     _yuitest_coverline("build/inputex-string/inputex-string.js", 105);
Y.on("focus", this.onFocus,this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 106);
Y.on("blur", this.onBlur,this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 107);
Y.on("keypress", this.onKeyPress, this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 108);
Y.on("keyup", this.onKeyUp, this.el, this);
   },

   /**
    * Return the string value
    * @method getValue
    * @param {String} The string value
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "getValue", 116);
_yuitest_coverline("build/inputex-string/inputex-string.js", 118);
var value;
      
      _yuitest_coverline("build/inputex-string/inputex-string.js", 120);
value = (this.options.typeInvite && this.el.value == this.options.typeInvite) ? '' : this.el.value;
      
      _yuitest_coverline("build/inputex-string/inputex-string.js", 122);
if (this.options.trim) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 123);
value = lang.trim(value);
      }
      
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 126);
return value;
   },

   /**
    * Function to set the value
    * @method setValue
    * @param {String} value The new value
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {
		// + check : if Null or Undefined we put '' in the stringField
		_yuitest_coverfunc("build/inputex-string/inputex-string.js", "setValue", 135);
_yuitest_coverline("build/inputex-string/inputex-string.js", 137);
this.el.value = ( lang.isNull(value) || lang.isUndefined(value) ) ? '' : value;

      // call parent class method to set style and fire "updated" event
      _yuitest_coverline("build/inputex-string/inputex-string.js", 140);
inputEx.StringField.superclass.setValue.call(this, value, sendUpdatedEvt);
   },

   /**
    * Uses the optional regexp to validate the field value
    * @method validate
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "validate", 147);
_yuitest_coverline("build/inputex-string/inputex-string.js", 148);
var val = this.getValue();

      // empty field
      _yuitest_coverline("build/inputex-string/inputex-string.js", 151);
if (val === '') {
         // validate only if not required
         _yuitest_coverline("build/inputex-string/inputex-string.js", 153);
return !this.options.required;
      }

      // Check regex matching and minLength (both used in password field...)
      _yuitest_coverline("build/inputex-string/inputex-string.js", 157);
var result = true;

      // if we are using a regular expression
      _yuitest_coverline("build/inputex-string/inputex-string.js", 160);
if( this.options.regexp ) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 161);
result = result && val.match(this.options.regexp);
      }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 163);
if( this.options.minLength ) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 164);
result = result && val.length >= this.options.minLength;
      }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 166);
return result;
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "disable", 173);
_yuitest_coverline("build/inputex-string/inputex-string.js", 174);
this.el.disabled = true;
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "enable", 181);
_yuitest_coverline("build/inputex-string/inputex-string.js", 182);
this.el.disabled = false;
   },

   /**
    * Check if the field is disabled
    * @method isDisabled
    */
   isDisabled: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "isDisabled", 189);
_yuitest_coverline("build/inputex-string/inputex-string.js", 190);
return this.el.disabled;
   },

   /**
    * Set the focus to this field
    * @method focus
    */
   focus: function() {
      // Can't use lang.isFunction because IE >= 6 would say focus is not a function (IE says it's an object) !!
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "focus", 197);
_yuitest_coverline("build/inputex-string/inputex-string.js", 199);
if(!!this.el && !lang.isUndefined(this.el.focus) ) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 200);
this.el.focus();
      }
   },

	/**
    * Add the minLength string message handling
    * @method getStateString
    */
	getStateString: function(state) {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "getStateString", 208);
_yuitest_coverline("build/inputex-string/inputex-string.js", 209);
if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 210);
return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1];
      }
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 212);
return inputEx.StringField.superclass.getStateString.call(this, state);
	},

   /**
    * Display the type invite after setting the class
    * @method setClassFromState
    */
   setClassFromState: function() {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "setClassFromState", 219);
_yuitest_coverline("build/inputex-string/inputex-string.js", 220);
inputEx.StringField.superclass.setClassFromState.call(this);

	   // display/mask typeInvite
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 223);
if(this.options.typeInvite) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 224);
this.updateTypeInvite();
      }
	},

   /**
    * @method updateTypeInvite
    */
	updateTypeInvite: function() {

	   // field not focused
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "updateTypeInvite", 231);
_yuitest_coverline("build/inputex-string/inputex-string.js", 234);
if (!Y.one(this.divEl).hasClass( "inputEx-focused")) {

         // show type invite if field is empty
         _yuitest_coverline("build/inputex-string/inputex-string.js", 237);
if(this.isEmpty()) {
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 238);
Y.one(this.divEl).addClass( "inputEx-typeInvite");
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 239);
this.el.value = this.options.typeInvite;

	      // important for setValue to work with typeInvite
         } else {
            _yuitest_coverline("build/inputex-string/inputex-string.js", 243);
Y.one(this.divEl).removeClass("inputEx-typeInvite");
         }

      // field focused : remove type invite
      } else {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 248);
if(Y.one(this.divEl).hasClass("inputEx-typeInvite")) {
	         // remove text
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 250);
this.el.value = "";

	         // remove the "empty" state and class
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 253);
this.previousState = null;
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 254);
Y.one(this.divEl).removeClass("inputEx-typeInvite");
         }
      }
	},

	/**
	 * Clear the typeInvite when the field gains focus
	 * @method onFocus
	 */
	onFocus: function(e) {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "onFocus", 263);
_yuitest_coverline("build/inputex-string/inputex-string.js", 264);
inputEx.StringField.superclass.onFocus.call(this,e);

	   _yuitest_coverline("build/inputex-string/inputex-string.js", 266);
if(this.options.typeInvite) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 267);
this.updateTypeInvite();
      }
	},

   /**
    * @method onKeyPress
    */
	onKeyPress: function(e) {
	   // override me
	},

   /**
    * @method onKeyUp
    */
   onKeyUp: function(e) {
      // override me
      //
      //   example :
      //
      //   lang.later(0, this, this.setClassFromState);
      //
      //     -> Set style immediatly when typing in the field
      //     -> Call setClassFromState escaping the stack (after the event has been fully treated, because the value has to be updated)
   }

});




// Register this class as "string" type
_yuitest_coverline("build/inputex-string/inputex-string.js", 298);
inputEx.registerType("string", inputEx.StringField, [
    { type: 'string', label: 'Type invite', name: 'typeInvite', value: ''},
    { type: 'integer', label: 'Size', name: 'size', value: 20},
    { type: 'integer', label: 'Min. length', name: 'minLength', value: 0}
]);


}, '@VERSION@', {"requires": ["inputex-field", "event-key"], "ix_provides": "string"});
