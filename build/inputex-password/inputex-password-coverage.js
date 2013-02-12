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
_yuitest_coverage["build/inputex-password/inputex-password.js"].code=["YUI.add('inputex-password', function (Y, NAME) {","","/**"," * @module inputex-password"," */","   var inputEx = Y.inputEx,lang=Y.Lang;","	","/**"," * Create a password field."," * @class inputEx.PasswordField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," * <ul>"," *   <li>confirmPasswordField: the PasswordField instance to compare to when using 2 password fields for password creation (please use the setConfirmationField method)</li>"," *   <li>strengthIndicator: display a widget to indicate password strength (default false)</li>"," *   <li>capsLockWarning: display a warning if CapsLock is on (default false)</li>"," *   <li>confirm: id of the field to compare to</li>"," * </ul>"," */","inputEx.PasswordField = function(options) {","	inputEx.PasswordField.superclass.constructor.call(this,options);","};","","/**"," * Keep track of all instances, indexed by ids, for the password confirmation field"," * @property byId"," * @static"," */","inputEx.PasswordField.byId = {}; ","","Y.extend(inputEx.PasswordField, inputEx.StringField, {","   ","	/**","	 * Add the password regexp, strengthIndicator, capsLockWarning","	 * @method setOptions","	 * @param {Object} options Options object as passed to the constructor","	 */","	setOptions: function(options) {","	   inputEx.PasswordField.superclass.setOptions.call(this, options);","","      this.messages = Y.mix(this.messages,Y.Intl.get(\"inputex-password\"));","	   ","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-PasswordField\";","	  ","		// display a strength indicator","		this.options.strengthIndicator = lang.isUndefined(options.strengthIndicator) ? false : options.strengthIndicator;","		","		// capsLockWarning","		this.options.capsLockWarning = lang.isUndefined(options.capsLockWarning) ? false : options.capsLockWarning;","		","		// confirm option, pass the id of the password field to confirm","		inputEx.PasswordField.byId[options.id] = this;","		var passwordField;","		if(options.confirm && (passwordField = inputEx.PasswordField.byId[options.confirm]) ) {","			this.setConfirmationField(passwordField);","		}","	},","	","	/**","	 * Set the el type to 'password'","	 * @method renderComponent","	 */","	renderComponent: function() {","	   // IE doesn't want to set the \"type\" property to 'password' if the node has a parent","	   // even if the parent is not in the DOM yet !!","	   ","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","	      ","		// Attributes of the input field","	   var attributes = {};","	   attributes.type = 'password';","	   attributes.size = this.options.size;","	   if(this.options.name) attributes.name = this.options.name;","	","	   // Create the node","		this.el = inputEx.cn('input', attributes);","		","		//inputEx.PasswordField.byId","		","		// Append it to the main element","		this.wrapEl.appendChild(this.el);","      this.fieldContainer.appendChild(this.wrapEl);","		","		// Caps lock warning","		if(this.options.capsLockWarning) {","		   this.capsLockWarning = inputEx.cn('div',{className: 'capsLockWarning'},{display: 'none'},this.messages.capslockWarning);","		   this.wrapEl.appendChild(this.capsLockWarning);","	   }","	   ","	   // Password strength indicator","		if(this.options.strengthIndicator) {","		   this.strengthEl = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicator'}, null, this.messages.passwordStrength);","		   this.strengthBlocks = [];","		   for(var i = 0 ; i < 4 ; i++) {","		      var lamp = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicatorBlock'});","		      this.strengthEl.appendChild( lamp );","		      this.strengthBlocks[i] = Y.one(lamp);","		   }","		   this.wrapEl.appendChild(this.strengthEl);","		}","	},","	   ","	/**","	 * Set this field as the confirmation for the targeted password field:","	 * @method setConfirmationField","	 * @param {inputEx.PasswordField} passwordField The target password field","	 */","	setConfirmationField: function(passwordField) {","	   this.options.confirmPasswordField = passwordField;","	   this.messages.invalid = this.messages.invalidPasswordConfirmation;","	   this.options.confirmPasswordField.options.confirmationPasswordField = this;","	},","	","	/**","	 * The validation adds the confirmation password field support","	 * @method validate","	 */","	validate: function() {","	   if(this.options.confirmPasswordField) {","	      if(this.options.confirmPasswordField.getValue() != this.getValue() ) {","	         return false;","	      }","	   }","	   return inputEx.PasswordField.superclass.validate.call(this);","	},","	","	/**","	 * Update the state of the confirmation field","	 * @method onInput","	 * @param {Event} e The original input event","	 */","	onInput: function(e) {","	   inputEx.PasswordField.superclass.onInput.call(this,e);","	   if(this.options.confirmationPasswordField) {","	      this.options.confirmationPasswordField.setClassFromState();","	   }","	},","	","	/**","	 * callback to display the capsLockWarning","	 * @method onKeyPress","	 */","	onKeyPress: function(e) {","	   inputEx.PasswordField.superclass.onKeyPress.call(this,e);","	   if(this.options.capsLockWarning) {","         var ev = e ? e : window.event;","         if (!ev) {","            return;","         }","         var targ = ev.target ? ev.target : ev.srcElement;","      ","         // get key pressed","         var which = -1;","         if (ev.which) {","            which = ev.which;","         } else if (ev.keyCode) {","            which = ev.keyCode;","         }","         // get shift status","         var shift_status = false;","         if (ev.shiftKey) {","            shift_status = ev.shiftKey;","         } else if (ev.modifiers) {","            shift_status = !!(ev.modifiers & 4);","         }","         var displayWarning = ((which >= 65 && which <=  90) && !shift_status) ||","                              ((which >= 97 && which <= 122) && shift_status);","         this.setCapsLockWarning(displayWarning);","      }","      ","	},","	","	/**","	 * onkeyup callback to update the strength indicator","	 * @method onKeyUp","	 */","	onKeyUp: function(e) {","      inputEx.PasswordField.superclass.onKeyUp.call(this,e);","       if(this.options.strengthIndicator) {","          lang.later( 0, this, this.updateStrengthIndicator);","       }","     },","     ","     /**","      * Show or hide the caps lock warning given the status","      * @method setCapsLockWarning","      */","     setCapsLockWarning: function(status) {","        this.capsLockWarning.style.display = status ? '' : 'none';","     },","     ","     /**","      * Update the strength indicator (called by onKeyPress)","      * @method updateStrenghtIndicator","      */","     updateStrengthIndicator: function() {","        var strength = inputEx.PasswordField.getPasswordStrength(this.getValue()),","            i, on, bgColor;","        for(i = 0 ; i < 4 ; i++) {","           on = (strength >= i*25) && (strength>0);","           bgColor = on ? \"#4AE817\" : \"#FFFFFF\";","           this.strengthBlocks[i].setStyle(\"backgroundColor\", bgColor);","		  }","     }","   ","	","});","","/**"," * Return an integer within [0,100] that quantify the password strength"," * Function taken from Mozilla Code: (changed a little bit the values)"," * http://lxr.mozilla.org/seamonkey/source/security/manager/pki/resources/content/password.js"," * @method getPasswordStrength"," * @static"," */","inputEx.PasswordField.getPasswordStrength = function(pw) {","    // Here is how we weigh the quality of the password","    // number of characters","    // numbers","    // non-alpha-numeric chars","    // upper and lower case characters","","    //length of the password","    var pwlength=(pw.length);","    //if (pwlength>5)","    //     pwlength=5;","    if (pwlength>7)","         pwlength=7;","","    //use of numbers in the password","    var numnumeric = pw.replace (/[0-9]/g, \"\");","    var numeric=(pw.length - numnumeric.length);","    if (numeric>3)","        numeric=3;","","    //use of symbols in the password","    var symbols = pw.replace (/\\W/g, \"\");","    var numsymbols=(pw.length - symbols.length);","    if (numsymbols>3)","        numsymbols=3;","","    //use of uppercase in the password","    var numupper = pw.replace (/[A-Z]/g, \"\");","    var upper=(pw.length - numupper.length);","    if (upper>3)","        upper=3;","","    //var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*15) + (upper*10);","    var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*20) + (upper*10);","","    // make sure we're give a value between 0 and 100","    if ( pwstrength < 0 ) { pwstrength = 0; }","    if ( pwstrength > 100 ) { pwstrength = 100;}","    return pwstrength;","};","","// Register this class as \"password\" type","inputEx.registerType(\"password\", inputEx.PasswordField, [","   {type: 'boolean', label: 'Strength indicator', name: 'strengthIndicator', value: false },","   {type: 'boolean', label: 'CapsLock warning', name: 'capsLockWarning', value: false }","]);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-string\"","    ],","    \"ix_provides\": \"password\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-password/inputex-password.js"].lines = {"1":0,"6":0,"21":0,"22":0,"30":0,"32":0,"40":0,"42":0,"44":0,"47":0,"50":0,"53":0,"54":0,"55":0,"56":0,"69":0,"72":0,"73":0,"74":0,"75":0,"78":0,"83":0,"84":0,"87":0,"88":0,"89":0,"93":0,"94":0,"95":0,"96":0,"97":0,"98":0,"99":0,"101":0,"111":0,"112":0,"113":0,"121":0,"122":0,"123":0,"126":0,"135":0,"136":0,"137":0,"146":0,"147":0,"148":0,"149":0,"150":0,"152":0,"155":0,"156":0,"157":0,"158":0,"159":0,"162":0,"163":0,"164":0,"165":0,"166":0,"168":0,"170":0,"180":0,"181":0,"182":0,"191":0,"199":0,"201":0,"202":0,"203":0,"204":0,"218":0,"226":0,"229":0,"230":0,"233":0,"234":0,"235":0,"236":0,"239":0,"240":0,"241":0,"242":0,"245":0,"246":0,"247":0,"248":0,"251":0,"254":0,"255":0,"256":0,"260":0};
_yuitest_coverage["build/inputex-password/inputex-password.js"].functions = {"PasswordField:21":0,"setOptions:39":0,"renderComponent:64":0,"setConfirmationField:110":0,"validate:120":0,"onInput:134":0,"onKeyPress:145":0,"onKeyUp:179":0,"setCapsLockWarning:190":0,"updateStrengthIndicator:198":0,"getPasswordStrength:218":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-password/inputex-password.js"].coveredLines = 92;
_yuitest_coverage["build/inputex-password/inputex-password.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-password/inputex-password.js", 1);
YUI.add('inputex-password', function (Y, NAME) {

/**
 * @module inputex-password
 */
   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-password/inputex-password.js", 6);
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
_yuitest_coverline("build/inputex-password/inputex-password.js", 21);
inputEx.PasswordField = function(options) {
	_yuitest_coverfunc("build/inputex-password/inputex-password.js", "PasswordField", 21);
_yuitest_coverline("build/inputex-password/inputex-password.js", 22);
inputEx.PasswordField.superclass.constructor.call(this,options);
};

/**
 * Keep track of all instances, indexed by ids, for the password confirmation field
 * @property byId
 * @static
 */
_yuitest_coverline("build/inputex-password/inputex-password.js", 30);
inputEx.PasswordField.byId = {}; 

_yuitest_coverline("build/inputex-password/inputex-password.js", 32);
Y.extend(inputEx.PasswordField, inputEx.StringField, {
   
	/**
	 * Add the password regexp, strengthIndicator, capsLockWarning
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
	setOptions: function(options) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "setOptions", 39);
_yuitest_coverline("build/inputex-password/inputex-password.js", 40);
inputEx.PasswordField.superclass.setOptions.call(this, options);

      _yuitest_coverline("build/inputex-password/inputex-password.js", 42);
this.messages = Y.mix(this.messages,Y.Intl.get("inputex-password"));
	   
      _yuitest_coverline("build/inputex-password/inputex-password.js", 44);
this.options.className = options.className ? options.className : "inputEx-Field inputEx-PasswordField";
	  
		// display a strength indicator
		_yuitest_coverline("build/inputex-password/inputex-password.js", 47);
this.options.strengthIndicator = lang.isUndefined(options.strengthIndicator) ? false : options.strengthIndicator;
		
		// capsLockWarning
		_yuitest_coverline("build/inputex-password/inputex-password.js", 50);
this.options.capsLockWarning = lang.isUndefined(options.capsLockWarning) ? false : options.capsLockWarning;
		
		// confirm option, pass the id of the password field to confirm
		_yuitest_coverline("build/inputex-password/inputex-password.js", 53);
inputEx.PasswordField.byId[options.id] = this;
		_yuitest_coverline("build/inputex-password/inputex-password.js", 54);
var passwordField;
		_yuitest_coverline("build/inputex-password/inputex-password.js", 55);
if(options.confirm && (passwordField = inputEx.PasswordField.byId[options.confirm]) ) {
			_yuitest_coverline("build/inputex-password/inputex-password.js", 56);
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
      _yuitest_coverfunc("build/inputex-password/inputex-password.js", "renderComponent", 64);
_yuitest_coverline("build/inputex-password/inputex-password.js", 69);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});
	      
		// Attributes of the input field
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 72);
var attributes = {};
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 73);
attributes.type = 'password';
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 74);
attributes.size = this.options.size;
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 75);
if(this.options.name) {attributes.name = this.options.name;}
	
	   // Create the node
		_yuitest_coverline("build/inputex-password/inputex-password.js", 78);
this.el = inputEx.cn('input', attributes);
		
		//inputEx.PasswordField.byId
		
		// Append it to the main element
		_yuitest_coverline("build/inputex-password/inputex-password.js", 83);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-password/inputex-password.js", 84);
this.fieldContainer.appendChild(this.wrapEl);
		
		// Caps lock warning
		_yuitest_coverline("build/inputex-password/inputex-password.js", 87);
if(this.options.capsLockWarning) {
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 88);
this.capsLockWarning = inputEx.cn('div',{className: 'capsLockWarning'},{display: 'none'},this.messages.capslockWarning);
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 89);
this.wrapEl.appendChild(this.capsLockWarning);
	   }
	   
	   // Password strength indicator
		_yuitest_coverline("build/inputex-password/inputex-password.js", 93);
if(this.options.strengthIndicator) {
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 94);
this.strengthEl = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicator'}, null, this.messages.passwordStrength);
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 95);
this.strengthBlocks = [];
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 96);
for(var i = 0 ; i < 4 ; i++) {
		      _yuitest_coverline("build/inputex-password/inputex-password.js", 97);
var lamp = inputEx.cn('div', {className: 'inputEx-Password-StrengthIndicatorBlock'});
		      _yuitest_coverline("build/inputex-password/inputex-password.js", 98);
this.strengthEl.appendChild( lamp );
		      _yuitest_coverline("build/inputex-password/inputex-password.js", 99);
this.strengthBlocks[i] = Y.one(lamp);
		   }
		   _yuitest_coverline("build/inputex-password/inputex-password.js", 101);
this.wrapEl.appendChild(this.strengthEl);
		}
	},
	   
	/**
	 * Set this field as the confirmation for the targeted password field:
	 * @method setConfirmationField
	 * @param {inputEx.PasswordField} passwordField The target password field
	 */
	setConfirmationField: function(passwordField) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "setConfirmationField", 110);
_yuitest_coverline("build/inputex-password/inputex-password.js", 111);
this.options.confirmPasswordField = passwordField;
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 112);
this.messages.invalid = this.messages.invalidPasswordConfirmation;
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 113);
this.options.confirmPasswordField.options.confirmationPasswordField = this;
	},
	
	/**
	 * The validation adds the confirmation password field support
	 * @method validate
	 */
	validate: function() {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "validate", 120);
_yuitest_coverline("build/inputex-password/inputex-password.js", 121);
if(this.options.confirmPasswordField) {
	      _yuitest_coverline("build/inputex-password/inputex-password.js", 122);
if(this.options.confirmPasswordField.getValue() != this.getValue() ) {
	         _yuitest_coverline("build/inputex-password/inputex-password.js", 123);
return false;
	      }
	   }
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 126);
return inputEx.PasswordField.superclass.validate.call(this);
	},
	
	/**
	 * Update the state of the confirmation field
	 * @method onInput
	 * @param {Event} e The original input event
	 */
	onInput: function(e) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "onInput", 134);
_yuitest_coverline("build/inputex-password/inputex-password.js", 135);
inputEx.PasswordField.superclass.onInput.call(this,e);
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 136);
if(this.options.confirmationPasswordField) {
	      _yuitest_coverline("build/inputex-password/inputex-password.js", 137);
this.options.confirmationPasswordField.setClassFromState();
	   }
	},
	
	/**
	 * callback to display the capsLockWarning
	 * @method onKeyPress
	 */
	onKeyPress: function(e) {
	   _yuitest_coverfunc("build/inputex-password/inputex-password.js", "onKeyPress", 145);
_yuitest_coverline("build/inputex-password/inputex-password.js", 146);
inputEx.PasswordField.superclass.onKeyPress.call(this,e);
	   _yuitest_coverline("build/inputex-password/inputex-password.js", 147);
if(this.options.capsLockWarning) {
         _yuitest_coverline("build/inputex-password/inputex-password.js", 148);
var ev = e ? e : window.event;
         _yuitest_coverline("build/inputex-password/inputex-password.js", 149);
if (!ev) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 150);
return;
         }
         _yuitest_coverline("build/inputex-password/inputex-password.js", 152);
var targ = ev.target ? ev.target : ev.srcElement;
      
         // get key pressed
         _yuitest_coverline("build/inputex-password/inputex-password.js", 155);
var which = -1;
         _yuitest_coverline("build/inputex-password/inputex-password.js", 156);
if (ev.which) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 157);
which = ev.which;
         } else {_yuitest_coverline("build/inputex-password/inputex-password.js", 158);
if (ev.keyCode) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 159);
which = ev.keyCode;
         }}
         // get shift status
         _yuitest_coverline("build/inputex-password/inputex-password.js", 162);
var shift_status = false;
         _yuitest_coverline("build/inputex-password/inputex-password.js", 163);
if (ev.shiftKey) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 164);
shift_status = ev.shiftKey;
         } else {_yuitest_coverline("build/inputex-password/inputex-password.js", 165);
if (ev.modifiers) {
            _yuitest_coverline("build/inputex-password/inputex-password.js", 166);
shift_status = !!(ev.modifiers & 4);
         }}
         _yuitest_coverline("build/inputex-password/inputex-password.js", 168);
var displayWarning = ((which >= 65 && which <=  90) && !shift_status) ||
                              ((which >= 97 && which <= 122) && shift_status);
         _yuitest_coverline("build/inputex-password/inputex-password.js", 170);
this.setCapsLockWarning(displayWarning);
      }
      
	},
	
	/**
	 * onkeyup callback to update the strength indicator
	 * @method onKeyUp
	 */
	onKeyUp: function(e) {
      _yuitest_coverfunc("build/inputex-password/inputex-password.js", "onKeyUp", 179);
_yuitest_coverline("build/inputex-password/inputex-password.js", 180);
inputEx.PasswordField.superclass.onKeyUp.call(this,e);
       _yuitest_coverline("build/inputex-password/inputex-password.js", 181);
if(this.options.strengthIndicator) {
          _yuitest_coverline("build/inputex-password/inputex-password.js", 182);
lang.later( 0, this, this.updateStrengthIndicator);
       }
     },
     
     /**
      * Show or hide the caps lock warning given the status
      * @method setCapsLockWarning
      */
     setCapsLockWarning: function(status) {
        _yuitest_coverfunc("build/inputex-password/inputex-password.js", "setCapsLockWarning", 190);
_yuitest_coverline("build/inputex-password/inputex-password.js", 191);
this.capsLockWarning.style.display = status ? '' : 'none';
     },
     
     /**
      * Update the strength indicator (called by onKeyPress)
      * @method updateStrenghtIndicator
      */
     updateStrengthIndicator: function() {
        _yuitest_coverfunc("build/inputex-password/inputex-password.js", "updateStrengthIndicator", 198);
_yuitest_coverline("build/inputex-password/inputex-password.js", 199);
var strength = inputEx.PasswordField.getPasswordStrength(this.getValue()),
            i, on, bgColor;
        _yuitest_coverline("build/inputex-password/inputex-password.js", 201);
for(i = 0 ; i < 4 ; i++) {
           _yuitest_coverline("build/inputex-password/inputex-password.js", 202);
on = (strength >= i*25) && (strength>0);
           _yuitest_coverline("build/inputex-password/inputex-password.js", 203);
bgColor = on ? "#4AE817" : "#FFFFFF";
           _yuitest_coverline("build/inputex-password/inputex-password.js", 204);
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
_yuitest_coverline("build/inputex-password/inputex-password.js", 218);
inputEx.PasswordField.getPasswordStrength = function(pw) {
    // Here is how we weigh the quality of the password
    // number of characters
    // numbers
    // non-alpha-numeric chars
    // upper and lower case characters

    //length of the password
    _yuitest_coverfunc("build/inputex-password/inputex-password.js", "getPasswordStrength", 218);
_yuitest_coverline("build/inputex-password/inputex-password.js", 226);
var pwlength=(pw.length);
    //if (pwlength>5)
    //     pwlength=5;
    _yuitest_coverline("build/inputex-password/inputex-password.js", 229);
if (pwlength>7)
         {_yuitest_coverline("build/inputex-password/inputex-password.js", 230);
pwlength=7;}

    //use of numbers in the password
    _yuitest_coverline("build/inputex-password/inputex-password.js", 233);
var numnumeric = pw.replace (/[0-9]/g, "");
    _yuitest_coverline("build/inputex-password/inputex-password.js", 234);
var numeric=(pw.length - numnumeric.length);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 235);
if (numeric>3)
        {_yuitest_coverline("build/inputex-password/inputex-password.js", 236);
numeric=3;}

    //use of symbols in the password
    _yuitest_coverline("build/inputex-password/inputex-password.js", 239);
var symbols = pw.replace (/\W/g, "");
    _yuitest_coverline("build/inputex-password/inputex-password.js", 240);
var numsymbols=(pw.length - symbols.length);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 241);
if (numsymbols>3)
        {_yuitest_coverline("build/inputex-password/inputex-password.js", 242);
numsymbols=3;}

    //use of uppercase in the password
    _yuitest_coverline("build/inputex-password/inputex-password.js", 245);
var numupper = pw.replace (/[A-Z]/g, "");
    _yuitest_coverline("build/inputex-password/inputex-password.js", 246);
var upper=(pw.length - numupper.length);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 247);
if (upper>3)
        {_yuitest_coverline("build/inputex-password/inputex-password.js", 248);
upper=3;}

    //var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*15) + (upper*10);
    _yuitest_coverline("build/inputex-password/inputex-password.js", 251);
var pwstrength=((pwlength*10)-20) + (numeric*10) + (numsymbols*20) + (upper*10);

    // make sure we're give a value between 0 and 100
    _yuitest_coverline("build/inputex-password/inputex-password.js", 254);
if ( pwstrength < 0 ) { pwstrength = 0; }
    _yuitest_coverline("build/inputex-password/inputex-password.js", 255);
if ( pwstrength > 100 ) { pwstrength = 100;}
    _yuitest_coverline("build/inputex-password/inputex-password.js", 256);
return pwstrength;
};

// Register this class as "password" type
_yuitest_coverline("build/inputex-password/inputex-password.js", 260);
inputEx.registerType("password", inputEx.PasswordField, [
   {type: 'boolean', label: 'Strength indicator', name: 'strengthIndicator', value: false },
   {type: 'boolean', label: 'CapsLock warning', name: 'capsLockWarning', value: false }
]);


}, '@VERSION@', {
    "requires": [
        "inputex-string"
    ],
    "ix_provides": "password",
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
