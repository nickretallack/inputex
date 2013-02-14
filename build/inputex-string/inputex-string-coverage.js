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
_yuitest_coverage["build/inputex-string/inputex-string.js"].code=["YUI.add('inputex-string', function (Y, NAME) {","","/**"," * @module inputex-string"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Basic string field (equivalent to the input type \"text\")"," * @class inputEx.StringField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *	  <li>regexp: regular expression used to validate (otherwise it always validate)</li>"," *   <li>size: size attribute of the input</li>"," *   <li>maxLength: maximum size of the string field (no message display, uses the maxlength html attribute)</li>"," *   <li>minLength: minimum size of the string field (will display an error message if shorter)</li>"," *   <li>typeInvite: string displayed when the field is empty</li>"," *   <li>readonly: set the field as readonly</li>"," * </ul>"," */","inputEx.StringField = function(options) {","   inputEx.StringField.superclass.constructor.call(this, options);","","	  if(this.options.typeInvite) {","	     this.updateTypeInvite();","	  }","};","","Y.extend(inputEx.StringField, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","	setOptions: function(options) {","	   inputEx.StringField.superclass.setOptions.call(this, options);","","      // I18N","      this.messages = Y.mix(this.messages,Y.Intl.get(\"inputex-string\"));","","	   this.options.regexp = options.regexp;","	   this.options.size = options.size;","	   this.options.maxLength = options.maxLength;","	   this.options.minLength = options.minLength;","	   this.options.typeInvite = options.typeInvite;","	   this.options.readonly = options.readonly;","","      // possible values: \"on\", \"off\", or \"default\" (= inherit from attribute set on form tag)","      // see: https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-autocomplete","	   this.options.autocomplete = !lang.isUndefined(options.autocomplete) ? options.autocomplete : \"default\";","	   this.options.trim = (options.trim === true) ? true : false;","   },","","","   /**","    * Render an 'INPUT' DOM node","    * @method renderComponent","    */","   renderComponent: function() {","","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","","      // Attributes of the input field","      var attributes = {};","      attributes.type = 'text';","      attributes.id = this.divEl.id?this.divEl.id+'-field':Y.guid();","      if(this.options.size) { attributes.size = this.options.size; }","      if(this.options.name) { attributes.name = this.options.name; }","      if(this.options.readonly) { attributes.readonly = 'readonly'; }","","      if(this.options.maxLength) { attributes.maxLength = this.options.maxLength; }","      // don't set the autocomplete attribute when \"default\" (the input will adopt the form's behavior regarding autocomplete)","      if(this.options.autocomplete !== \"default\") { attributes.autocomplete = this.options.autocomplete; }","","      // Create the node","      this.el = inputEx.cn('input', attributes);","","      // Append it to the main element","      this.wrapEl.appendChild(this.el);","      this.fieldContainer.appendChild(this.wrapEl);","   },","","	/**","	 * Set the name of the field (or hidden field)","	 * @method setFieldName","	 */","	setFieldName: function(name) {","		this.el.name = name;","	},","","   /**","    * Register the change, focus and blur events","    * @method initEvents","    */","   initEvents: function() {","     Y.on(\"change\", this.onChange,this.el, this);","","       if (Y.UA.ie > 0){ // refer to inputEx-95","            var field = this.el;","            Y.on(\"key\", function(e){","              field.blur();","              field.focus();","            }, this.el,'down:13', this);","       }","","     Y.on(\"focus\", this.onFocus,this.el, this);","     Y.on(\"blur\", this.onBlur,this.el, this);","     Y.on(\"keypress\", this.onKeyPress, this.el, this);","     Y.on(\"keyup\", this.onKeyUp, this.el, this);","   },","","   /**","    * Return the string value","    * @method getValue","    * @param {String} The string value","    */","   getValue: function() {","      ","      var value;","      ","      value = (this.options.typeInvite && this.el.value == this.options.typeInvite) ? '' : this.el.value;","      ","      if (this.options.trim) {","         value = lang.trim(value);","      }","      ","	   return value;","   },","","   /**","    * Function to set the value","    * @method setValue","    * @param {String} value The new value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","		// + check : if Null or Undefined we put '' in the stringField","		this.el.value = ( lang.isNull(value) || lang.isUndefined(value) ) ? '' : value;","","      // call parent class method to set style and fire \"updated\" event","      inputEx.StringField.superclass.setValue.call(this, value, sendUpdatedEvt);","   },","","   /**","    * Uses the optional regexp to validate the field value","    * @method validate","    */","   validate: function () {","","      // NOTE: don't use this.getValue directly, so that when it's overriden","      //       in fields like IntegerField, string validations are still tested","      //       against a string.","      var value = inputEx.StringField.prototype.getValue.call(this),","          valid;","","      // superclass validation (e.g. will check empty + required)","      valid = inputEx.StringField.superclass.validate.call(this);","","      // check regex matching","      if (valid && this.options.regexp) {","	      valid = !!value.match(this.options.regexp);","      }","","      // check min length","      if (valid && this.options.minLength) {","	      valid = value.length >= this.options.minLength;","      }","","      // check max length: already constrained by the html field","","      return valid;","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      this.el.disabled = true;","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      this.el.disabled = false;","   },","","   /**","    * Check if the field is disabled","    * @method isDisabled","    */","   isDisabled: function() {","      return this.el.disabled;","   },","","   /**","    * Set the focus to this field","    * @method focus","    */","   focus: function() {","      // Can't use lang.isFunction because IE >= 6 would say focus is not a function (IE says it's an object) !!","      if(!!this.el && !lang.isUndefined(this.el.focus) ) {","         this.el.focus();","      }","   },","","	/**","    * Add the minLength string message handling","    * @method getStateString","    */","	getStateString: function(state) {","	   if (this.options.minLength && state === inputEx.stateInvalid && this.getValue().length < this.options.minLength) {","	      return this.messages.stringTooShort[0] + this.options.minLength + this.messages.stringTooShort[1];","      }","	   return inputEx.StringField.superclass.getStateString.call(this, state);","	},","","   /**","    * Display the type invite after setting the class","    * @method setClassFromState","    */","   setClassFromState: function() {","	   inputEx.StringField.superclass.setClassFromState.call(this);","","	   // display/mask typeInvite","	   if(this.options.typeInvite) {","	      this.updateTypeInvite();","      }","	},","","   /**","    * @method updateTypeInvite","    */","	updateTypeInvite: function() {","","	   // field not focused","      if (!Y.one(this.divEl).hasClass( \"inputEx-focused\")) {","","         // show type invite if field is empty","         if(this.isEmpty()) {","	         Y.one(this.divEl).addClass( \"inputEx-typeInvite\");","	         this.el.value = this.options.typeInvite;","","	      // important for setValue to work with typeInvite","         } else {","            Y.one(this.divEl).removeClass(\"inputEx-typeInvite\");","         }","","      // field focused : remove type invite","      } else {","	      if(Y.one(this.divEl).hasClass(\"inputEx-typeInvite\")) {","	         // remove text","	         this.el.value = \"\";","","	         // remove the \"empty\" state and class","	         this.previousState = null;","	         Y.one(this.divEl).removeClass(\"inputEx-typeInvite\");","         }","      }","	},","","	/**","	 * Clear the typeInvite when the field gains focus","	 * @method onFocus","	 */","	onFocus: function(e) {","	   inputEx.StringField.superclass.onFocus.call(this,e);","","	   if(this.options.typeInvite) {","         this.updateTypeInvite();","      }","	},","","   /**","    * @method onKeyPress","    */","	onKeyPress: function(e) {","	   // override me","	},","","   /**","    * @method onKeyUp","    */","   onKeyUp: function(e) {","      // override me","      //","      //   example :","      //","      //   lang.later(0, this, this.setClassFromState);","      //","      //     -> Set style immediatly when typing in the field","      //     -> Call setClassFromState escaping the stack (after the event has been fully treated, because the value has to be updated)","   }","","});","","","","","// Register this class as \"string\" type","inputEx.registerType(\"string\", inputEx.StringField, [","    { type: 'string', label: 'Type invite', name: 'typeInvite', value: ''},","    { type: 'integer', label: 'Size', name: 'size', value: 20},","    { type: 'integer', label: 'Min. length', name: 'minLength', value: 0}","]);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"event-key\"","    ],","    \"ix_provides\": \"string\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-string/inputex-string.js"].lines = {"1":0,"6":0,"24":0,"25":0,"27":0,"28":0,"32":0,"39":0,"42":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"53":0,"54":0,"65":0,"68":0,"69":0,"70":0,"71":0,"72":0,"73":0,"75":0,"77":0,"80":0,"83":0,"84":0,"92":0,"100":0,"102":0,"103":0,"104":0,"105":0,"106":0,"110":0,"111":0,"112":0,"113":0,"123":0,"125":0,"127":0,"128":0,"131":0,"142":0,"145":0,"157":0,"161":0,"164":0,"165":0,"169":0,"170":0,"175":0,"183":0,"191":0,"199":0,"208":0,"209":0,"218":0,"219":0,"221":0,"229":0,"232":0,"233":0,"243":0,"246":0,"247":0,"248":0,"252":0,"257":0,"259":0,"262":0,"263":0,"273":0,"275":0,"276":0,"307":0};
_yuitest_coverage["build/inputex-string/inputex-string.js"].functions = {"StringField:24":0,"setOptions:38":0,"renderComponent:62":0,"setFieldName:91":0,"(anonymous 2):104":0,"initEvents:99":0,"getValue:121":0,"setValue:140":0,"validate:152":0,"disable:182":0,"enable:190":0,"isDisabled:198":0,"focus:206":0,"getStateString:217":0,"setClassFromState:228":0,"updateTypeInvite:240":0,"onFocus:272":0,"(anonymous 1):1":0};
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

      // possible values: "on", "off", or "default" (= inherit from attribute set on form tag)
      // see: https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-autocomplete
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 53);
this.options.autocomplete = !lang.isUndefined(options.autocomplete) ? options.autocomplete : "default";
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 54);
this.options.trim = (options.trim === true) ? true : false;
   },


   /**
    * Render an 'INPUT' DOM node
    * @method renderComponent
    */
   renderComponent: function() {

      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "renderComponent", 62);
_yuitest_coverline("build/inputex-string/inputex-string.js", 65);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});

      // Attributes of the input field
      _yuitest_coverline("build/inputex-string/inputex-string.js", 68);
var attributes = {};
      _yuitest_coverline("build/inputex-string/inputex-string.js", 69);
attributes.type = 'text';
      _yuitest_coverline("build/inputex-string/inputex-string.js", 70);
attributes.id = this.divEl.id?this.divEl.id+'-field':Y.guid();
      _yuitest_coverline("build/inputex-string/inputex-string.js", 71);
if(this.options.size) { attributes.size = this.options.size; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 72);
if(this.options.name) { attributes.name = this.options.name; }
      _yuitest_coverline("build/inputex-string/inputex-string.js", 73);
if(this.options.readonly) { attributes.readonly = 'readonly'; }

      _yuitest_coverline("build/inputex-string/inputex-string.js", 75);
if(this.options.maxLength) { attributes.maxLength = this.options.maxLength; }
      // don't set the autocomplete attribute when "default" (the input will adopt the form's behavior regarding autocomplete)
      _yuitest_coverline("build/inputex-string/inputex-string.js", 77);
if(this.options.autocomplete !== "default") { attributes.autocomplete = this.options.autocomplete; }

      // Create the node
      _yuitest_coverline("build/inputex-string/inputex-string.js", 80);
this.el = inputEx.cn('input', attributes);

      // Append it to the main element
      _yuitest_coverline("build/inputex-string/inputex-string.js", 83);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-string/inputex-string.js", 84);
this.fieldContainer.appendChild(this.wrapEl);
   },

	/**
	 * Set the name of the field (or hidden field)
	 * @method setFieldName
	 */
	setFieldName: function(name) {
		_yuitest_coverfunc("build/inputex-string/inputex-string.js", "setFieldName", 91);
_yuitest_coverline("build/inputex-string/inputex-string.js", 92);
this.el.name = name;
	},

   /**
    * Register the change, focus and blur events
    * @method initEvents
    */
   initEvents: function() {
     _yuitest_coverfunc("build/inputex-string/inputex-string.js", "initEvents", 99);
_yuitest_coverline("build/inputex-string/inputex-string.js", 100);
Y.on("change", this.onChange,this.el, this);

       _yuitest_coverline("build/inputex-string/inputex-string.js", 102);
if (Y.UA.ie > 0){ // refer to inputEx-95
            _yuitest_coverline("build/inputex-string/inputex-string.js", 103);
var field = this.el;
            _yuitest_coverline("build/inputex-string/inputex-string.js", 104);
Y.on("key", function(e){
              _yuitest_coverfunc("build/inputex-string/inputex-string.js", "(anonymous 2)", 104);
_yuitest_coverline("build/inputex-string/inputex-string.js", 105);
field.blur();
              _yuitest_coverline("build/inputex-string/inputex-string.js", 106);
field.focus();
            }, this.el,'down:13', this);
       }

     _yuitest_coverline("build/inputex-string/inputex-string.js", 110);
Y.on("focus", this.onFocus,this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 111);
Y.on("blur", this.onBlur,this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 112);
Y.on("keypress", this.onKeyPress, this.el, this);
     _yuitest_coverline("build/inputex-string/inputex-string.js", 113);
Y.on("keyup", this.onKeyUp, this.el, this);
   },

   /**
    * Return the string value
    * @method getValue
    * @param {String} The string value
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "getValue", 121);
_yuitest_coverline("build/inputex-string/inputex-string.js", 123);
var value;
      
      _yuitest_coverline("build/inputex-string/inputex-string.js", 125);
value = (this.options.typeInvite && this.el.value == this.options.typeInvite) ? '' : this.el.value;
      
      _yuitest_coverline("build/inputex-string/inputex-string.js", 127);
if (this.options.trim) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 128);
value = lang.trim(value);
      }
      
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 131);
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
		_yuitest_coverfunc("build/inputex-string/inputex-string.js", "setValue", 140);
_yuitest_coverline("build/inputex-string/inputex-string.js", 142);
this.el.value = ( lang.isNull(value) || lang.isUndefined(value) ) ? '' : value;

      // call parent class method to set style and fire "updated" event
      _yuitest_coverline("build/inputex-string/inputex-string.js", 145);
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
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "validate", 152);
_yuitest_coverline("build/inputex-string/inputex-string.js", 157);
var value = inputEx.StringField.prototype.getValue.call(this),
          valid;

      // superclass validation (e.g. will check empty + required)
      _yuitest_coverline("build/inputex-string/inputex-string.js", 161);
valid = inputEx.StringField.superclass.validate.call(this);

      // check regex matching
      _yuitest_coverline("build/inputex-string/inputex-string.js", 164);
if (valid && this.options.regexp) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 165);
valid = !!value.match(this.options.regexp);
      }

      // check min length
      _yuitest_coverline("build/inputex-string/inputex-string.js", 169);
if (valid && this.options.minLength) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 170);
valid = value.length >= this.options.minLength;
      }

      // check max length: already constrained by the html field

      _yuitest_coverline("build/inputex-string/inputex-string.js", 175);
return valid;
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "disable", 182);
_yuitest_coverline("build/inputex-string/inputex-string.js", 183);
this.el.disabled = true;
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "enable", 190);
_yuitest_coverline("build/inputex-string/inputex-string.js", 191);
this.el.disabled = false;
   },

   /**
    * Check if the field is disabled
    * @method isDisabled
    */
   isDisabled: function() {
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "isDisabled", 198);
_yuitest_coverline("build/inputex-string/inputex-string.js", 199);
return this.el.disabled;
   },

   /**
    * Set the focus to this field
    * @method focus
    */
   focus: function() {
      // Can't use lang.isFunction because IE >= 6 would say focus is not a function (IE says it's an object) !!
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "focus", 206);
_yuitest_coverline("build/inputex-string/inputex-string.js", 208);
if(!!this.el && !lang.isUndefined(this.el.focus) ) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 209);
this.el.focus();
      }
   },

	/**
    * Add the minLength string message handling
    * @method getStateString
    */
	getStateString: function(state) {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "getStateString", 217);
_yuitest_coverline("build/inputex-string/inputex-string.js", 218);
if (this.options.minLength && state === inputEx.stateInvalid && this.getValue().length < this.options.minLength) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 219);
return this.messages.stringTooShort[0] + this.options.minLength + this.messages.stringTooShort[1];
      }
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 221);
return inputEx.StringField.superclass.getStateString.call(this, state);
	},

   /**
    * Display the type invite after setting the class
    * @method setClassFromState
    */
   setClassFromState: function() {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "setClassFromState", 228);
_yuitest_coverline("build/inputex-string/inputex-string.js", 229);
inputEx.StringField.superclass.setClassFromState.call(this);

	   // display/mask typeInvite
	   _yuitest_coverline("build/inputex-string/inputex-string.js", 232);
if(this.options.typeInvite) {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 233);
this.updateTypeInvite();
      }
	},

   /**
    * @method updateTypeInvite
    */
	updateTypeInvite: function() {

	   // field not focused
      _yuitest_coverfunc("build/inputex-string/inputex-string.js", "updateTypeInvite", 240);
_yuitest_coverline("build/inputex-string/inputex-string.js", 243);
if (!Y.one(this.divEl).hasClass( "inputEx-focused")) {

         // show type invite if field is empty
         _yuitest_coverline("build/inputex-string/inputex-string.js", 246);
if(this.isEmpty()) {
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 247);
Y.one(this.divEl).addClass( "inputEx-typeInvite");
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 248);
this.el.value = this.options.typeInvite;

	      // important for setValue to work with typeInvite
         } else {
            _yuitest_coverline("build/inputex-string/inputex-string.js", 252);
Y.one(this.divEl).removeClass("inputEx-typeInvite");
         }

      // field focused : remove type invite
      } else {
	      _yuitest_coverline("build/inputex-string/inputex-string.js", 257);
if(Y.one(this.divEl).hasClass("inputEx-typeInvite")) {
	         // remove text
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 259);
this.el.value = "";

	         // remove the "empty" state and class
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 262);
this.previousState = null;
	         _yuitest_coverline("build/inputex-string/inputex-string.js", 263);
Y.one(this.divEl).removeClass("inputEx-typeInvite");
         }
      }
	},

	/**
	 * Clear the typeInvite when the field gains focus
	 * @method onFocus
	 */
	onFocus: function(e) {
	   _yuitest_coverfunc("build/inputex-string/inputex-string.js", "onFocus", 272);
_yuitest_coverline("build/inputex-string/inputex-string.js", 273);
inputEx.StringField.superclass.onFocus.call(this,e);

	   _yuitest_coverline("build/inputex-string/inputex-string.js", 275);
if(this.options.typeInvite) {
         _yuitest_coverline("build/inputex-string/inputex-string.js", 276);
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
_yuitest_coverline("build/inputex-string/inputex-string.js", 307);
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
