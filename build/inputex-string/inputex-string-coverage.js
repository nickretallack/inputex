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
_yuitest_coverage["build/inputex-string/inputex-string.js"].code=["YUI.add('inputex-string', function (Y, NAME) {","","/**"," * @module inputex-string"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Basic string field (equivalent to the input type \"text\")"," * @class inputEx.StringField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *	  <li>regexp: regular expression used to validate (otherwise it always validate)</li>"," *   <li>size: size attribute of the input</li>"," *   <li>maxLength: maximum size of the string field (no message display, uses the maxlength html attribute)</li>"," *   <li>minLength: minimum size of the string field (will display an error message if shorter)</li>"," *   <li>typeInvite: string displayed when the field is empty</li>"," *   <li>readonly: set the field as readonly</li>"," * </ul>"," */","inputEx.StringField = function(options) {","   inputEx.StringField.superclass.constructor.call(this, options);","","	  if(this.options.typeInvite) {","	     this.updateTypeInvite();","	  }","};","","Y.extend(inputEx.StringField, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","	setOptions: function(options) {","	   inputEx.StringField.superclass.setOptions.call(this, options);","","      // I18N","      this.messages = Y.mix(this.messages,Y.Intl.get(\"inputex-string\"));","","	   this.options.regexp = options.regexp;","	   this.options.size = options.size;","	   this.options.maxLength = options.maxLength;","	   this.options.minLength = options.minLength;","	   this.options.typeInvite = options.typeInvite;","	   this.options.readonly = options.readonly;","	   this.options.autocomplete = lang.isUndefined(options.autocomplete) ?","	                                  inputEx.browserAutocomplete :","	                                  (options.autocomplete === false || options.autocomplete === \"off\") ? false : true;","	   this.options.trim = (options.trim === true) ? true : false;","   },","","","   /**","    * Render an 'INPUT' DOM node","    * @method renderComponent","    */","   renderComponent: function() {","","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","","      // Attributes of the input field","      var attributes = {};","      attributes.type = 'text';","      attributes.id = this.divEl.id?this.divEl.id+'-field':Y.guid();","      if(this.options.size) { attributes.size = this.options.size; }","      if(this.options.name) { attributes.name = this.options.name; }","      if(this.options.readonly) { attributes.readonly = 'readonly'; }","","      if(this.options.maxLength) { attributes.maxLength = this.options.maxLength; }","      attributes.autocomplete = this.options.autocomplete ? 'on' : 'off';","","      // Create the node","      this.el = inputEx.cn('input', attributes);","","      // Append it to the main element","      this.wrapEl.appendChild(this.el);","      this.fieldContainer.appendChild(this.wrapEl);","   },","","	/**","	 * Set the name of the field (or hidden field)","	 * @method setFieldName","	 */","	setFieldName: function(name) {","		this.el.name = name;","	},","","   /**","    * Register the change, focus and blur events","    * @method initEvents","    */","   initEvents: function() {","     Y.on(\"change\", this.onChange,this.el, this);","","       if (Y.UA.ie > 0){ // refer to inputEx-95","            var field = this.el;","            Y.on(\"key\", function(e){","              field.blur();","              field.focus();","            }, this.el,'down:13', this);","       }","","     Y.on(\"focus\", this.onFocus,this.el, this);","     Y.on(\"blur\", this.onBlur,this.el, this);","     Y.on(\"keypress\", this.onKeyPress, this.el, this);","     Y.on(\"keyup\", this.onKeyUp, this.el, this);","   },","","   /**","    * Return the string value","    * @method getValue","    * @param {String} The string value","    */","   getValue: function() {","      ","      var value;","      ","      value = (this.options.typeInvite && this.el.value == this.options.typeInvite) ? '' : this.el.value;","      ","      if (this.options.trim) {","         value = lang.trim(value);","      }","      ","	   return value;","   },","","   /**","    * Function to set the value","    * @method setValue","    * @param {String} value The new value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","		// + check : if Null or Undefined we put '' in the stringField","		this.el.value = ( lang.isNull(value) || lang.isUndefined(value) ) ? '' : value;","","      // call parent class method to set style and fire \"updated\" event","      inputEx.StringField.superclass.setValue.call(this, value, sendUpdatedEvt);","   },","","   /**","    * Uses the optional regexp to validate the field value","    * @method validate","    */","   validate: function () {","","      // NOTE: don't use this.getValue directly, so that when it's overriden","      //       in fields like IntegerField, string validations are still tested","      //       against a string.","      var value = inputEx.StringField.prototype.getValue.call(this),","          valid;","","      // superclass validation (e.g. will check empty + required)","      valid = inputEx.StringField.superclass.validate.call(this);","","      // check regex matching","      if (valid && this.options.regexp) {","	      valid = !!value.match(this.options.regexp);","      }","","      // check min length","      if (valid && this.options.minLength) {","	      valid = value.length >= this.options.minLength;","      }","","      // check max length: already constrained by the html field","","      return valid;","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      this.el.disabled = true;","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      this.el.disabled = false;","   },","","   /**","    * Check if the field is disabled","    * @method isDisabled","    */","   isDisabled: function() {","      return this.el.disabled;","   },","","   /**","    * Set the focus to this field","    * @method focus","    */","   focus: function() {","      // Can't use lang.isFunction because IE >= 6 would say focus is not a function (IE says it's an object) !!","      if(!!this.el && !lang.isUndefined(this.el.focus) ) {","         this.el.focus();","      }","   },","","	/**","    * Add the minLength string message handling","    * @method getStateString","    */","	getStateString: function(state) {","	   if (this.options.minLength && state === inputEx.stateInvalid && this.getValue().length < this.options.minLength) {","	      return this.messages.stringTooShort[0] + this.options.minLength + this.messages.stringTooShort[1];","      }","	   return inputEx.StringField.superclass.getStateString.call(this, state);","	},","","   /**","    * Display the type invite after setting the class","    * @method setClassFromState","    */","   setClassFromState: function() {","	   inputEx.StringField.superclass.setClassFromState.call(this);","","	   // display/mask typeInvite","	   if(this.options.typeInvite) {","	      this.updateTypeInvite();","      }","	},","","   /**","    * @method updateTypeInvite","    */","	updateTypeInvite: function() {","","	   // field not focused","      if (!Y.one(this.divEl).hasClass( \"inputEx-focused\")) {","","         // show type invite if field is empty","         if(this.isEmpty()) {","	         Y.one(this.divEl).addClass( \"inputEx-typeInvite\");","	         this.el.value = this.options.typeInvite;","","	      // important for setValue to work with typeInvite","         } else {","            Y.one(this.divEl).removeClass(\"inputEx-typeInvite\");","         }","","      // field focused : remove type invite","      } else {","	      if(Y.one(this.divEl).hasClass(\"inputEx-typeInvite\")) {","	         // remove text","	         this.el.value = \"\";","","	         // remove the \"empty\" state and class","	         this.previousState = null;","	         Y.one(this.divEl).removeClass(\"inputEx-typeInvite\");","         }","      }","	},","","	/**","	 * Clear the typeInvite when the field gains focus","	 * @method onFocus","	 */","	onFocus: function(e) {","	   inputEx.StringField.superclass.onFocus.call(this,e);","","	   if(this.options.typeInvite) {","         this.updateTypeInvite();","      }","	},","","   /**","    * @method onKeyPress","    */","	onKeyPress: function(e) {","	   // override me","	},","","   /**","    * @method onKeyUp","    */","   onKeyUp: function(e) {","      // override me","      //","      //   example :","      //","      //   lang.later(0, this, this.setClassFromState);","      //","      //     -> Set style immediatly when typing in the field","      //     -> Call setClassFromState escaping the stack (after the event has been fully treated, because the value has to be updated)","   }","","});","","","","","// Register this class as \"string\" type","inputEx.registerType(\"string\", inputEx.StringField, [","    { type: 'string', label: 'Type invite', name: 'typeInvite', value: ''},","    { type: 'integer', label: 'Size', name: 'size', value: 20},","    { type: 'integer', label: 'Min. length', name: 'minLength', value: 0}","]);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"event-key\"","    ],","    \"ix_provides\": \"string\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-string/inputex-string.js"].lines = {"1":0,"6":0,"24":0,"25":0,"27":0,"28":0,"32":0,"39":0,"42":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"50":0,"53":0,"64":0,"67":0,"68":0,"69":0,"70":0,"71":0,"72":0,"74":0,"75":0,"78":0,"81":0,"82":0,"90":0,"98":0,"100":0,"101":0,"102":0,"103":0,"104":0,"108":0,"109":0,"110":0,"111":0,"121":0,"123":0,"125":0,"126":0,"129":0,"140":0,"143":0,"155":0,"159":0,"162":0,"163":0,"167":0,"168":0,"173":0,"181":0,"189":0,"197":0,"206":0,"207":0,"216":0,"217":0,"219":0,"227":0,"230":0,"231":0,"241":0,"244":0,"245":0,"246":0,"250":0,"255":0,"257":0,"260":0,"261":0,"271":0,"273":0,"274":0,"305":0};
_yuitest_coverage["build/inputex-string/inputex-string.js"].functions = {"StringField:24":0,"setOptions:38":0,"renderComponent:61":0,"setFieldName:89":0,"(anonymous 2):102":0,"initEvents:97":0,"getValue:119":0,"setValue:138":0,"validate:150":0,"disable:180":0,"enable:188":0,"isDisabled:196":0,"focus:204":0,"getStateString:215":0,"setClassFromState:226":0,"updateTypeInvite:238":0,"onFocus:270":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-string/inputex-string.js"].coveredLines = 78;
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

      // I18N
      _yuitest_coverline("build/inputex-string/inputex-string.js", 42);
this.messages = Y.mix(this.messages,Y.Intl.get("inputex-string"));

	   _yuitest_coverline("build/inputex-string/inputex-string.js", 44);
this.options.regexp = options.regexp;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 45);
this.options.size = options.size;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 46);
this.options.maxLength = options.maxLength;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 47);
this.options.minLength = options.minLength;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 48);
this.options.typeInvite = options.typeInvite;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 49);
this.options.readonly = options.readonly;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 50);
this.options.autocomplete = lang.isUndefined(options.autocomplete) ?
	                                  inputEx.browserAutocomplete :
	                                  (options.autocomplete === false || options.autocomplete === "off") ? false : true;
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 53);
this.options.trim = (options.trim === true) ? true : false;
   },


   /**
    * Render an 'INPUT' DOM node
    * @method renderComponent
    */
   renderComponent: function() {

      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "renderComponent", 61);
_yuitest_coverline("build/inputex-string/inputex-string.js", 64);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});

      // Attributes of the input field
      _yuitest_coverline("build/inputex-string/inputex-string.js", 67);
var attributes = {};
      _yuitest_coverline("build/inputex-string/inputex-string.js", 68);
attributes.type = 'text';
      _yuitest_coverline("build/inputex-string/inputex-string.js", 69);
attributes.id = this.divEl.id?this.divEl.id+'-field':Y.guid();
      _yuitest_coverline("build/inputex-string/inputex-string.js", 70);
if(this.options.size) { attributes.size = this.options.size; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 71);
if(this.options.name) { attributes.name = this.options.name; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 72);
if(this.options.readonly) { attributes.readonly = 'readonly'; }

      _yuitest_coverline("build/inputex-string/inputex-string.js", 74);
if(this.options.maxLength) { attributes.maxLength = this.options.maxLength; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 75);
attributes.autocomplete = this.options.autocomplete ? 'on' : 'off';

      // Create the node
      _yuitest_coverline("build/inputex-string/inputex-string.js", 78);
this.el = inputEx.cn('input', attributes);

      // Append it to the main element
      _yuitest_coverline("build/inputex-string/inputex-string.js", 81);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-string/inputex-string.js", 82);
this.fieldContainer.appendChild(this.wrapEl);
   },

	/**
	 * Set the name of the field (or hidden field)
	 * @method setFieldName
	 */
	setFieldName: function(name) {
		_yuitest_coverfunc("build/inputex-string/inputex-string.js", "setFieldName", 89);
_yuitest_coverline("build/inputex-string/inputex-string.js", 90);
this.el.name = name;
	},

   /**
    * Register the change, focus and blur events
    * @method initEvents
    */
   initEvents: function() {
     _yuitest_coverfunc("build/inputex-string/inputex-string.js", "initEvents", 97);
_yuitest_coverline("build/inputex-string/inputex-string.js", 98);
Y.on("change", this.onChange,this.el, this);

       _yuitest_coverline("build/inputex-string/inputex-string.js", 100);
if (Y.UA.ie > 0){ // refer to inputEx-95
            _yuitest_coverline("build/inputex-string/inputex-string.js", 101);
var field = this.el;
            _yuitest_coverline("build/inputex-string/inputex-string.js", 102);
Y.on("key", function(e){
              _yuitest_coverfunc("build/inputex-string/inputex-string.js", "(anonymous 2)", 102);
_yuitest_coverline("build/inputex-string/inputex-string.js", 103);
field.blur();
              _yuitest_coverline("build/inputex-string/inputex-string.js", 104);
field.focus();
            }, this.el,'down:13', this);
       }

     _yuitest_coverline("build/inputex-string/inputex-string.js", 108);
Y.on("focus", this.onFocus,this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 109);
Y.on("blur", this.onBlur,this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 110);
Y.on("keypress", this.onKeyPress, this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 111);
Y.on("keyup", this.onKeyUp, this.el, this);
   },

   /**
    * Return the string value
    * @method getValue
    * @param {String} The string value
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "getValue", 119);
_yuitest_coverline("build/inputex-string/inputex-string.js", 121);
var value;
      
      _yuitest_coverline("build/inputex-string/inputex-string.js", 123);
value = (this.options.typeInvite && this.el.value == this.options.typeInvite) ? '' : this.el.value;
      
      _yuitest_coverline("build/inputex-string/inputex-string.js", 125);
if (this.options.trim) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 126);
value = lang.trim(value);
      }
      
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 129);
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
		_yuitest_coverfunc("build/inputex-string/inputex-string.js", "setValue", 138);
_yuitest_coverline("build/inputex-string/inputex-string.js", 140);
this.el.value = ( lang.isNull(value) || lang.isUndefined(value) ) ? '' : value;

      // call parent class method to set style and fire "updated" event
      _yuitest_coverline("build/inputex-string/inputex-string.js", 143);
inputEx.StringField.superclass.setValue.call(this, value, sendUpdatedEvt);
   },

   /**
    * Uses the optional regexp to validate the field value
    * @method validate
    */
   validate: function () {

      // NOTE: don't use this.getValue directly, so that when it's overriden
      //       in fields like IntegerField, string validations are still tested
      //       against a string.
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "validate", 150);
_yuitest_coverline("build/inputex-string/inputex-string.js", 155);
var value = inputEx.StringField.prototype.getValue.call(this),
          valid;

      // superclass validation (e.g. will check empty + required)
      _yuitest_coverline("build/inputex-string/inputex-string.js", 159);
valid = inputEx.StringField.superclass.validate.call(this);

      // check regex matching
      _yuitest_coverline("build/inputex-string/inputex-string.js", 162);
if (valid && this.options.regexp) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 163);
valid = !!value.match(this.options.regexp);
      }

      // check min length
      _yuitest_coverline("build/inputex-string/inputex-string.js", 167);
if (valid && this.options.minLength) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 168);
valid = value.length >= this.options.minLength;
      }

      // check max length: already constrained by the html field

      _yuitest_coverline("build/inputex-string/inputex-string.js", 173);
return valid;
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "disable", 180);
_yuitest_coverline("build/inputex-string/inputex-string.js", 181);
this.el.disabled = true;
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "enable", 188);
_yuitest_coverline("build/inputex-string/inputex-string.js", 189);
this.el.disabled = false;
   },

   /**
    * Check if the field is disabled
    * @method isDisabled
    */
   isDisabled: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "isDisabled", 196);
_yuitest_coverline("build/inputex-string/inputex-string.js", 197);
return this.el.disabled;
   },

   /**
    * Set the focus to this field
    * @method focus
    */
   focus: function() {
      // Can't use lang.isFunction because IE >= 6 would say focus is not a function (IE says it's an object) !!
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "focus", 204);
_yuitest_coverline("build/inputex-string/inputex-string.js", 206);
if(!!this.el && !lang.isUndefined(this.el.focus) ) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 207);
this.el.focus();
      }
   },

	/**
    * Add the minLength string message handling
    * @method getStateString
    */
	getStateString: function(state) {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "getStateString", 215);
_yuitest_coverline("build/inputex-string/inputex-string.js", 216);
if (this.options.minLength && state === inputEx.stateInvalid && this.getValue().length < this.options.minLength) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 217);
return this.messages.stringTooShort[0] + this.options.minLength + this.messages.stringTooShort[1];
      }
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 219);
return inputEx.StringField.superclass.getStateString.call(this, state);
	},

   /**
    * Display the type invite after setting the class
    * @method setClassFromState
    */
   setClassFromState: function() {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "setClassFromState", 226);
_yuitest_coverline("build/inputex-string/inputex-string.js", 227);
inputEx.StringField.superclass.setClassFromState.call(this);

	   // display/mask typeInvite
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 230);
if(this.options.typeInvite) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 231);
this.updateTypeInvite();
      }
	},

   /**
    * @method updateTypeInvite
    */
	updateTypeInvite: function() {

	   // field not focused
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "updateTypeInvite", 238);
_yuitest_coverline("build/inputex-string/inputex-string.js", 241);
if (!Y.one(this.divEl).hasClass( "inputEx-focused")) {

         // show type invite if field is empty
         _yuitest_coverline("build/inputex-string/inputex-string.js", 244);
if(this.isEmpty()) {
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 245);
Y.one(this.divEl).addClass( "inputEx-typeInvite");
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 246);
this.el.value = this.options.typeInvite;

	      // important for setValue to work with typeInvite
         } else {
            _yuitest_coverline("build/inputex-string/inputex-string.js", 250);
Y.one(this.divEl).removeClass("inputEx-typeInvite");
         }

      // field focused : remove type invite
      } else {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 255);
if(Y.one(this.divEl).hasClass("inputEx-typeInvite")) {
	         // remove text
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 257);
this.el.value = "";

	         // remove the "empty" state and class
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 260);
this.previousState = null;
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 261);
Y.one(this.divEl).removeClass("inputEx-typeInvite");
         }
      }
	},

	/**
	 * Clear the typeInvite when the field gains focus
	 * @method onFocus
	 */
	onFocus: function(e) {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "onFocus", 270);
_yuitest_coverline("build/inputex-string/inputex-string.js", 271);
inputEx.StringField.superclass.onFocus.call(this,e);

	   _yuitest_coverline("build/inputex-string/inputex-string.js", 273);
if(this.options.typeInvite) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 274);
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
_yuitest_coverline("build/inputex-string/inputex-string.js", 305);
inputEx.registerType("string", inputEx.StringField, [
    { type: 'string', label: 'Type invite', name: 'typeInvite', value: ''},
    { type: 'integer', label: 'Size', name: 'size', value: 20},
    { type: 'integer', label: 'Min. length', name: 'minLength', value: 0}
]);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "event-key"
    ],
    "ix_provides": "string",
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
