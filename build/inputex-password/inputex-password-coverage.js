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
_yuitest_coverage["build/inputex-password/inputex-password.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-password/inputex-password.js",
    code: []
};
_yuitest_coverage["build/inputex-password/inputex-password.js"].code=["YUI.add('inputex-password', function (Y, NAME) {","","/**"," * @module inputex-password"," */","YUI.add(\"inputex-password\", function(Y){","","   var inputEx = Y.inputEx,lang=Y.Lang;","	","/**"," * Create a password field."," * @class inputEx.PasswordField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," * <ul>"," *   <li>confirmPasswordField: the PasswordField instance to compare to when using 2 password fields for password creation (please use the setConfirmationField method)</li>"," *   <li>strengthIndicator: display a widget to indicate password strength (default false)</li>"," *   <li>capsLockWarning: display a warning if CapsLock is on (default false)</li>"," *   <li>confirm: id of the field to compare to</li>"," * </ul>"," */","inputEx.PasswordField = function(options) {","	inputEx.PasswordField.superclass.constructor.call(this,options);","};","","/**"," * Keep track of all instances, indexed by ids, for the password confirmation field"," * @property byId"," * @static"," */","inputEx.PasswordField.byId = {}; ","","Y.extend(inputEx.PasswordField, inputEx.StringField, {","   ","	/**","	 * Add the password regexp, strengthIndicator, capsLockWarning","	 * @method setOptions","	 * @param {Object} options Options object as passed to the constructor","	 */","	setOptions: function(options) {","	   inputEx.PasswordField.superclass.setOptions.call(this, options);","	   ","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-PasswordField\";","	   ","	   // Add the password regexp (overridable)","	   this.options.regexp = options.regexp || inputEx.regexps.password;","	  ","		// display a strength indicator","		this.options.strengthIndicator = lang.isUndefined(options.strengthIndicator) ? false : options.strengthIndicator;","		","		// capsLockWarning","		this.options.capsLockWarning = lang.isUndefined(options.capsLockWarning) ? false : options.capsLockWarning;","		","		// confirm option, pass the id of the password field to confirm","		inputEx.PasswordField.byId[options.id] = this;","		var passwordField;","		if(options.confirm && (passwordField = inputEx.PasswordField.byId[options.confirm]) ) {","			this.setConfirmationField(passwordField);","		}","	},","	","	/**","	 * Set the el type to 'password'","	 * @method renderComponent","	 */","	renderComponent: function() {","	   // IE doesn't want to set the \"type\" property to 'password' if the node has a parent","	   // even if the parent is not in the DOM yet !!","	   ","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","	      ","		// Attributes of the input field","	   var attributes = {};","	   attributes.type = 'password';","	   attributes.size = this.options.size;","	   if(this.options.name) attributes.name = this.options.name;","	","	   // Create the node","		this.el = inputEx.cn('input', attributes);","		","		//inputEx.PasswordField.byId","		","		// Append it to the main element","		this.wrapEl.appendChild(this.el);","      this.fieldContainer.appendChild(this.wrapEl);","		","		// Caps lock warning","		if(this.options.capsLockWarning) {","		   this.capsLockWarning = inputEx.cn('div',{className: 'capsLockWarning'},{display: 'none'},inputEx.messages.capslockWarning);","		   this.wrapEl.appendChild(this.capsLockWarning);","	   }","	   ","	   // Password strength indicator","		if(this.options.strengthIndicator) {","		   this.strengthEl = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicator'}, null, inputEx.messages.passwordStrength);","		   this.strengthBlocks = [];","		   for(var i = 0 ; i < 4 ; i++) {","		      var lamp = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicatorBlock'});","		      this.strengthEl.appendChild( lamp );","		      this.strengthBlocks[i] = Y.one(lamp);","		   }","		   this.wrapEl.appendChild(this.strengthEl);","		}","	},","	   ","	/**","	 * Set this field as the confirmation for the targeted password field:","	 * @method setConfirmationField","	 * @param {inputEx.PasswordField} passwordField The target password field","	 */","	setConfirmationField: function(passwordField) {","	   this.options.confirmPasswordField = passwordField;","	   this.options.messages.invalid = inputEx.messages.invalidPasswordConfirmation;","	   this.options.confirmPasswordField.options.confirmationPasswordField = this;","	},","	","	/**","	 * The validation adds the confirmation password field support","	 * @method validate","	 */","	validate: function() {","	   if(this.options.confirmPasswordField) {","	      if(this.options.confirmPasswordField.getValue() != this.getValue() ) {","	         return false;","	      }","	   }","	   return inputEx.PasswordField.superclass.validate.call(this);","	},","	","	/**","	 * Change the state string","	 * @method getStateString","	 */","	getStateString: function(state) {","	   if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {  ","	      return inputEx.messages.invalidPassword[0]+this.options.minLength+inputEx.messages.invalidPassword[1];","      }","	   return inputEx.StringField.superclass.getStateString.call(this, state);","	},","	","	/**","	 * Update the state of the confirmation field","	 * @method onInput","	 * @param {Event} e The original input event","	 */","	onInput: function(e) {","	   inputEx.PasswordField.superclass.onInput.call(this,e);","	   if(this.options.confirmationPasswordField) {","	      this.options.confirmationPasswordField.setClassFromState();","	   }","	},","	","	/**","	 * callback to display the capsLockWarning","	 * @method onKeyPress","	 */","	onKeyPress: function(e) {","	   inputEx.PasswordField.superclass.onKeyPress.call(this,e);","	   if(this.options.capsLockWarning) {","         var ev = e ? e : window.event;","         if (!ev) {","            return;","         }","         var targ = ev.target ? ev.target : ev.srcElement;","      ","         // get key pressed","         var which = -1;","         if (ev.which) {","            which = ev.which;","         } else if (ev.keyCode) {","            which = ev.keyCode;","         }","         // get shift status","         var shift_status = false;","         if (ev.shiftKey) {","            shift_status = ev.shiftKey;","         } else if (ev.modifiers) {","            shift_status = !!(ev.modifiers & 4);","         }","         var displayWarning = ((which >= 65 && which <=  90) && !shift_status) ||","                              ((which >= 97 && which <= 122) && shift_status);","         this.setCapsLockWarning(displayWarning);","      }","      ","	},","	","	/**","	 * onkeyup callback to update the strength indicator","	 * @method onKeyUp","	 */","	onKeyUp: function(e) {","      inputEx.PasswordField.superclass.onKeyUp.call(this,e);","       if(this.options.strengthIndicator) {","          lang.later( 0, this, this.updateStrengthIndicator);","       }","     },","     ","     /**","      * Show or hide the caps lock warning given the status","      * @method setCapsLockWarning","      */","     setCapsLockWarning: function(status) {","        this.capsLockWarning.style.display = status ? '' : 'none';","     },","     ","     /**","      * Update the strength indicator (called by onKeyPress)","      * @method updateStrenghtIndicator","      */","     updateStrengthIndicator: function() {","        var strength = inputEx.PasswordField.getPasswordStrength(this.getValue()),","            i, on, bgColor;","        for(i = 0 ; i < 4 ; i++) {","           on = (strength >= i*25) && (strength>0);","           bgColor = on ? \"#4AE817\" : \"#FFFFFF\";","           this.strengthBlocks[i].setStyle(\"backgroundColor\", bgColor);","		  }","     }","   ","	","});","","/**"," * Return an integer within [0,100] that quantify the password strength"," * Function taken from Mozilla Code: (changed a little bit the values)"," * http://lxr.mozilla.org/seamonkey/source/security/manager/pki/resources/content/password.js"," * @method getPasswordStrength"," * @static"," */","inputEx.PasswordField.getPasswordStrength = function(pw) {","    // Here is how we weigh the quality of the password","    // number of characters","    // numbers","    // non-alpha-numeric chars","    // upper and lower case characters","","    //length of the password","    var pwlength=(pw.length);","    //if (pwlength>5)","    //     pwlength=5;","    if (pwlength>7)","         pwlength=7;","","    //use of numbers in the password","    var numnumeric = pw.replace (/[0-9]/g, \"\");","    var numeric=(pw.length - numnumeric.length);","    if (numeric>3)","        numeric=3;","","    //use of symbols in the password","    var symbols = pw.replace (/\\W/g, \"\");","    var numsymbols=(pw.length - symbols.length);","    if (numsymbols>3)","        numsymbols=3;","","    //use of uppercase in the password","    var numupper = pw.replace (/[A-Z]/g, \"\");","    var upper=(pw.length - numupper.length);","    if (upper>3)","        upper=3;","","    //var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*15) + (upper*10);","    var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*20) + (upper*10);","","    // make sure we're give a value between 0 and 100","    if ( pwstrength < 0 ) { pwstrength = 0; }","    if ( pwstrength > 100 ) { pwstrength = 100;}","    return pwstrength;","};","","// Register this class as \"password\" type","inputEx.registerType(\"password\", inputEx.PasswordField, [","   {type: 'boolean', label: 'Strength indicator', name: 'strengthIndicator', value: false },","   {type: 'boolean', label: 'CapsLock warning', name: 'capsLockWarning', value: false }","]);","	","},'3.1.0',{","  requires: [\"inputex-string\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-password/inputex-password.js"].lines = {"1":0,"6":0,"8":0,"23":0,"24":0,"32":0,"34":0,"42":0,"44":0,"47":0,"50":0,"53":0,"56":0,"57":0,"58":0,"59":0,"72":0,"75":0,"76":0,"77":0,"78":0,"81":0,"86":0,"87":0,"90":0,"91":0,"92":0,"96":0,"97":0,"98":0,"99":0,"100":0,"101":0,"102":0,"104":0,"114":0,"115":0,"116":0,"124":0,"125":0,"126":0,"129":0,"137":0,"138":0,"140":0,"149":0,"150":0,"151":0,"160":0,"161":0,"162":0,"163":0,"164":0,"166":0,"169":0,"170":0,"171":0,"172":0,"173":0,"176":0,"177":0,"178":0,"179":0,"180":0,"182":0,"184":0,"194":0,"195":0,"196":0,"205":0,"213":0,"215":0,"216":0,"217":0,"218":0,"232":0,"240":0,"243":0,"244":0,"247":0,"248":0,"249":0,"250":0,"253":0,"254":0,"255":0,"256":0,"259":0,"260":0,"261":0,"262":0,"265":0,"268":0,"269":0,"270":0,"274":0};
_yuitest_coverage["build/inputex-password/inputex-password.js"].functions = {"PasswordField:23":0,"setOptions:41":0,"renderComponent:67":0,"setConfirmationField:113":0,"validate:123":0,"getStateString:136":0,"onInput:148":0,"onKeyPress:159":0,"onKeyUp:193":0,"setCapsLockWarning:204":0,"updateStrengthIndicator:212":0,"getPasswordStrength:232":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-password/inputex-password.js"].coveredLines = 96;
_yuitest_coverage["build/inputex-password/inputex-password.js"].coveredFunctions = 14;
_yuitest_coverline("build/inputex-password/inputex-password.js", 1);
YUI.add('inputex-password', function (Y, NAME) {

/**
 * @module inputex-password
 */
_yuitest_coverfunc("build/inputex-password/inputex-password.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-password/inputex-password.js", 6);
YUI.add("inputex-password", function(Y){

   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-password/inputex-password.js", 8);
var inputEx = Y.inputEx,lang=Y.Lang;
	
/**
 * Create a password field.
 * @class inputEx.PasswordField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 * <ul>
 *   <li>confirmPasswordField: the PasswordField instance to compare to when using 2 password fields for password creation (please use the setConfirmationField method)</li>
 *   <li>strengthIndicator: display a widget to indicate password strength (default false)</li>
 *   <li>capsLockWarning: display a warning if CapsLock is on (default false)</li>
 *   <li>confirm: id of the field to compare to</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-password/inputex-password.js", 23);
inputEx.PasswordField = function(options) {
	_yuitest_coverfunc("build/inputex-password/inputex-password.js", "PasswordField", 23);
_yuitest_coverline("build/inputex-password/inputex-password.js", 24);
inputEx.PasswordField.superclass.constructor.call(this,options);
};

/**
 * Keep track of all instances, indexed by ids, for the password confirmation field
 * @property byId
 * @static
 */
_yuitest_coverline("build/inputex-password/inputex-password.js", 32);
inputEx.PasswordField.byId = {}; 

_yuitest_coverline("build/inputex-password/inputex-password.js", 34);
Y.extend(inputEx.PasswordField, inputEx.StringField, {
   
	/**
	 * Add the password regexp, strengthIndicator, capsLockWarning
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
	setOptions: function(options) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "setOptions", 41);
_yuitest_coverline("build/inputex-password/inputex-password.js", 42);
inputEx.PasswordField.superclass.setOptions.call(this, options);
	   
      _yuitest_coverline("build/inputex-password/inputex-password.js", 44);
this.options.className = options.className ? options.className : "inputEx-Field inputEx-PasswordField";
	   
	   // Add the password regexp (overridable)
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 47);
this.options.regexp = options.regexp || inputEx.regexps.password;
	  
		// display a strength indicator
		_yuitest_coverline("build/inputex-password/inputex-password.js", 50);
this.options.strengthIndicator = lang.isUndefined(options.strengthIndicator) ? false : options.strengthIndicator;
		
		// capsLockWarning
		_yuitest_coverline("build/inputex-password/inputex-password.js", 53);
this.options.capsLockWarning = lang.isUndefined(options.capsLockWarning) ? false : options.capsLockWarning;
		
		// confirm option, pass the id of the password field to confirm
		_yuitest_coverline("build/inputex-password/inputex-password.js", 56);
inputEx.PasswordField.byId[options.id] = this;
		_yuitest_coverline("build/inputex-password/inputex-password.js", 57);
var passwordField;
		_yuitest_coverline("build/inputex-password/inputex-password.js", 58);
if(options.confirm && (passwordField = inputEx.PasswordField.byId[options.confirm]) ) {
			_yuitest_coverline("build/inputex-password/inputex-password.js", 59);
this.setConfirmationField(passwordField);
		}
	},
	
	/**
	 * Set the el type to 'password'
	 * @method renderComponent
	 */
	renderComponent: function() {
	   // IE doesn't want to set the "type" property to 'password' if the node has a parent
	   // even if the parent is not in the DOM yet !!
	   
      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-password/inputex-password.js", "renderComponent", 67);
_yuitest_coverline("build/inputex-password/inputex-password.js", 72);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});
	      
		// Attributes of the input field
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 75);
var attributes = {};
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 76);
attributes.type = 'password';
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 77);
attributes.size = this.options.size;
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 78);
if(this.options.name) {attributes.name = this.options.name;}
	
	   // Create the node
		_yuitest_coverline("build/inputex-password/inputex-password.js", 81);
this.el = inputEx.cn('input', attributes);
		
		//inputEx.PasswordField.byId
		
		// Append it to the main element
		_yuitest_coverline("build/inputex-password/inputex-password.js", 86);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-password/inputex-password.js", 87);
this.fieldContainer.appendChild(this.wrapEl);
		
		// Caps lock warning
		_yuitest_coverline("build/inputex-password/inputex-password.js", 90);
if(this.options.capsLockWarning) {
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 91);
this.capsLockWarning = inputEx.cn('div',{className: 'capsLockWarning'},{display: 'none'},inputEx.messages.capslockWarning);
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 92);
this.wrapEl.appendChild(this.capsLockWarning);
	   }
	   
	   // Password strength indicator
		_yuitest_coverline("build/inputex-password/inputex-password.js", 96);
if(this.options.strengthIndicator) {
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 97);
this.strengthEl = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicator'}, null, inputEx.messages.passwordStrength);
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 98);
this.strengthBlocks = [];
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 99);
for(var i = 0 ; i < 4 ; i++) {
		      _yuitest_coverline("build/inputex-password/inputex-password.js", 100);
var lamp = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicatorBlock'});
		      _yuitest_coverline("build/inputex-password/inputex-password.js", 101);
this.strengthEl.appendChild( lamp );
		      _yuitest_coverline("build/inputex-password/inputex-password.js", 102);
this.strengthBlocks[i] = Y.one(lamp);
		   }
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 104);
this.wrapEl.appendChild(this.strengthEl);
		}
	},
	   
	/**
	 * Set this field as the confirmation for the targeted password field:
	 * @method setConfirmationField
	 * @param {inputEx.PasswordField} passwordField The target password field
	 */
	setConfirmationField: function(passwordField) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "setConfirmationField", 113);
_yuitest_coverline("build/inputex-password/inputex-password.js", 114);
this.options.confirmPasswordField = passwordField;
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 115);
this.options.messages.invalid = inputEx.messages.invalidPasswordConfirmation;
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 116);
this.options.confirmPasswordField.options.confirmationPasswordField = this;
	},
	
	/**
	 * The validation adds the confirmation password field support
	 * @method validate
	 */
	validate: function() {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "validate", 123);
_yuitest_coverline("build/inputex-password/inputex-password.js", 124);
if(this.options.confirmPasswordField) {
	      _yuitest_coverline("build/inputex-password/inputex-password.js", 125);
if(this.options.confirmPasswordField.getValue() != this.getValue() ) {
	         _yuitest_coverline("build/inputex-password/inputex-password.js", 126);
return false;
	      }
	   }
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 129);
return inputEx.PasswordField.superclass.validate.call(this);
	},
	
	/**
	 * Change the state string
	 * @method getStateString
	 */
	getStateString: function(state) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "getStateString", 136);
_yuitest_coverline("build/inputex-password/inputex-password.js", 137);
if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {  
	      _yuitest_coverline("build/inputex-password/inputex-password.js", 138);
return inputEx.messages.invalidPassword[0]+this.options.minLength+inputEx.messages.invalidPassword[1];
      }
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 140);
return inputEx.StringField.superclass.getStateString.call(this, state);
	},
	
	/**
	 * Update the state of the confirmation field
	 * @method onInput
	 * @param {Event} e The original input event
	 */
	onInput: function(e) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "onInput", 148);
_yuitest_coverline("build/inputex-password/inputex-password.js", 149);
inputEx.PasswordField.superclass.onInput.call(this,e);
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 150);
if(this.options.confirmationPasswordField) {
	      _yuitest_coverline("build/inputex-password/inputex-password.js", 151);
this.options.confirmationPasswordField.setClassFromState();
	   }
	},
	
	/**
	 * callback to display the capsLockWarning
	 * @method onKeyPress
	 */
	onKeyPress: function(e) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "onKeyPress", 159);
_yuitest_coverline("build/inputex-password/inputex-password.js", 160);
inputEx.PasswordField.superclass.onKeyPress.call(this,e);
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 161);
if(this.options.capsLockWarning) {
         _yuitest_coverline("build/inputex-password/inputex-password.js", 162);
var ev = e ? e : window.event;
         _yuitest_coverline("build/inputex-password/inputex-password.js", 163);
if (!ev) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 164);
return;
         }
         _yuitest_coverline("build/inputex-password/inputex-password.js", 166);
var targ = ev.target ? ev.target : ev.srcElement;
      
         // get key pressed
         _yuitest_coverline("build/inputex-password/inputex-password.js", 169);
var which = -1;
         _yuitest_coverline("build/inputex-password/inputex-password.js", 170);
if (ev.which) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 171);
which = ev.which;
         } else {_yuitest_coverline("build/inputex-password/inputex-password.js", 172);
if (ev.keyCode) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 173);
which = ev.keyCode;
         }}
         // get shift status
         _yuitest_coverline("build/inputex-password/inputex-password.js", 176);
var shift_status = false;
         _yuitest_coverline("build/inputex-password/inputex-password.js", 177);
if (ev.shiftKey) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 178);
shift_status = ev.shiftKey;
         } else {_yuitest_coverline("build/inputex-password/inputex-password.js", 179);
if (ev.modifiers) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 180);
shift_status = !!(ev.modifiers & 4);
         }}
         _yuitest_coverline("build/inputex-password/inputex-password.js", 182);
var displayWarning = ((which >= 65 && which <=  90) && !shift_status) ||
                              ((which >= 97 && which <= 122) && shift_status);
         _yuitest_coverline("build/inputex-password/inputex-password.js", 184);
this.setCapsLockWarning(displayWarning);
      }
      
	},
	
	/**
	 * onkeyup callback to update the strength indicator
	 * @method onKeyUp
	 */
	onKeyUp: function(e) {
      _yuitest_coverfunc("build/inputex-password/inputex-password.js", "onKeyUp", 193);
_yuitest_coverline("build/inputex-password/inputex-password.js", 194);
inputEx.PasswordField.superclass.onKeyUp.call(this,e);
       _yuitest_coverline("build/inputex-password/inputex-password.js", 195);
if(this.options.strengthIndicator) {
          _yuitest_coverline("build/inputex-password/inputex-password.js", 196);
lang.later( 0, this, this.updateStrengthIndicator);
       }
     },
     
     /**
      * Show or hide the caps lock warning given the status
      * @method setCapsLockWarning
      */
     setCapsLockWarning: function(status) {
        _yuitest_coverfunc("build/inputex-password/inputex-password.js", "setCapsLockWarning", 204);
_yuitest_coverline("build/inputex-password/inputex-password.js", 205);
this.capsLockWarning.style.display = status ? '' : 'none';
     },
     
     /**
      * Update the strength indicator (called by onKeyPress)
      * @method updateStrenghtIndicator
      */
     updateStrengthIndicator: function() {
        _yuitest_coverfunc("build/inputex-password/inputex-password.js", "updateStrengthIndicator", 212);
_yuitest_coverline("build/inputex-password/inputex-password.js", 213);
var strength = inputEx.PasswordField.getPasswordStrength(this.getValue()),
            i, on, bgColor;
        _yuitest_coverline("build/inputex-password/inputex-password.js", 215);
for(i = 0 ; i < 4 ; i++) {
           _yuitest_coverline("build/inputex-password/inputex-password.js", 216);
on = (strength >= i*25) && (strength>0);
           _yuitest_coverline("build/inputex-password/inputex-password.js", 217);
bgColor = on ? "#4AE817" : "#FFFFFF";
           _yuitest_coverline("build/inputex-password/inputex-password.js", 218);
this.strengthBlocks[i].setStyle("backgroundColor", bgColor);
		  }
     }
   
	
});

/**
 * Return an integer within [0,100] that quantify the password strength
 * Function taken from Mozilla Code: (changed a little bit the values)
 * http://lxr.mozilla.org/seamonkey/source/security/manager/pki/resources/content/password.js
 * @method getPasswordStrength
 * @static
 */
_yuitest_coverline("build/inputex-password/inputex-password.js", 232);
inputEx.PasswordField.getPasswordStrength = function(pw) {
    // Here is how we weigh the quality of the password
    // number of characters
    // numbers
    // non-alpha-numeric chars
    // upper and lower case characters

    //length of the password
    _yuitest_coverfunc("build/inputex-password/inputex-password.js", "getPasswordStrength", 232);
_yuitest_coverline("build/inputex-password/inputex-password.js", 240);
var pwlength=(pw.length);
    //if (pwlength>5)
    //     pwlength=5;
    _yuitest_coverline("build/inputex-password/inputex-password.js", 243);
if (pwlength>7)
         {_yuitest_coverline("build/inputex-password/inputex-password.js", 244);
pwlength=7;}

    //use of numbers in the password
    _yuitest_coverline("build/inputex-password/inputex-password.js", 247);
var numnumeric = pw.replace (/[0-9]/g, "");
    _yuitest_coverline("build/inputex-password/inputex-password.js", 248);
var numeric=(pw.length - numnumeric.length);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 249);
if (numeric>3)
        {_yuitest_coverline("build/inputex-password/inputex-password.js", 250);
numeric=3;}

    //use of symbols in the password
    _yuitest_coverline("build/inputex-password/inputex-password.js", 253);
var symbols = pw.replace (/\W/g, "");
    _yuitest_coverline("build/inputex-password/inputex-password.js", 254);
var numsymbols=(pw.length - symbols.length);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 255);
if (numsymbols>3)
        {_yuitest_coverline("build/inputex-password/inputex-password.js", 256);
numsymbols=3;}

    //use of uppercase in the password
    _yuitest_coverline("build/inputex-password/inputex-password.js", 259);
var numupper = pw.replace (/[A-Z]/g, "");
    _yuitest_coverline("build/inputex-password/inputex-password.js", 260);
var upper=(pw.length - numupper.length);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 261);
if (upper>3)
        {_yuitest_coverline("build/inputex-password/inputex-password.js", 262);
upper=3;}

    //var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*15) + (upper*10);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 265);
var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*20) + (upper*10);

    // make sure we're give a value between 0 and 100
    _yuitest_coverline("build/inputex-password/inputex-password.js", 268);
if ( pwstrength < 0 ) { pwstrength = 0; }
    _yuitest_coverline("build/inputex-password/inputex-password.js", 269);
if ( pwstrength > 100 ) { pwstrength = 100;}
    _yuitest_coverline("build/inputex-password/inputex-password.js", 270);
return pwstrength;
};

// Register this class as "password" type
_yuitest_coverline("build/inputex-password/inputex-password.js", 274);
inputEx.registerType("password", inputEx.PasswordField, [
   {type: 'boolean', label: 'Strength indicator', name: 'strengthIndicator', value: false },
   {type: 'boolean', label: 'CapsLock warning', name: 'capsLockWarning', value: false }
]);
	
},'3.1.0',{
  requires: ["inputex-string"]
});


}, '@VERSION@');
