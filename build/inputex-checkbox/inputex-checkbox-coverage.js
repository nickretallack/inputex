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
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-checkbox/inputex-checkbox.js",
    code: []
};
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].code=["YUI.add('inputex-checkbox', function (Y, NAME) {","","/**"," * @module inputex-checkbox"," */","   var inputEx = Y.inputEx;","","/**"," * Create a checkbox."," * @class inputEx.CheckBox"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options for CheckBoxes:"," * <ul>"," *   <li>sentValues: 2D vector of values for checked/unchecked states (default is [true, false])</li>"," * </ul>"," */","inputEx.CheckBox = function(options) {","	inputEx.CheckBox.superclass.constructor.call(this,options);","};","	","Y.extend(inputEx.CheckBox, inputEx.Field, {","	   ","	/**","	 * Adds the CheckBox specific options","	 * @method setOptions","	 * @param {Object} options Options object as passed to the constructor","	 */","	setOptions: function(options) {","	   inputEx.CheckBox.superclass.setOptions.call(this, options);","	   ","	   // Overwrite options:","	   this.options.className = options.className ? options.className : 'inputEx-Field inputEx-CheckBox';","	   ","	   this.options.rightLabel = options.rightLabel || '';","	   ","	   // Added options","	   this.sentValues = options.sentValues || [true, false];","	   this.options.sentValues = this.sentValues; // for compatibility","	   this.checkedValue = this.sentValues[0];","	   this.uncheckedValue = this.sentValues[1];","	},","	   ","	/**","	 * Render the checkbox and the hidden field","	 * @method renderComponent","	 */","	renderComponent: function() {","	","   	var checkBoxId = this.divEl.id?this.divEl.id+'-field':Y.guid();","	   this.el = inputEx.cn('input', { id: checkBoxId, type: 'checkbox', className: 'inputEx-CheckBox-checkbox' });","","	   this.fieldContainer.appendChild(this.el);","	","	   this.rightLabelEl = inputEx.cn('label', {\"for\": checkBoxId, className: 'inputEx-CheckBox-rightLabel'}, null, this.options.rightLabel);","	   this.fieldContainer.appendChild(this.rightLabelEl);","	","	   // Keep state of checkbox in a hidden field (format : this.checkedValue or this.uncheckedValue)","	   // This is useful for non-javascript form submit (it allows custom checked/unchecked values to be submitted)","	   this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.uncheckedValue});","	   this.fieldContainer.appendChild(this.hiddenEl);","	},","	   ","	/**","	 * Clear the previous events and listen for the \"change\" event","	 * @method initEvents","	 */","	initEvents: function() {","	   ","	   // Awful Hack to work in IE8 and below: the \"change\" event is only fired when focus is lost","      // and not immediately... so we listen for \"click\" instead, and setTimeout to give time for","      // the input to reflect the new value (changed after the firing of the \"click\" event!).","	   if (Y.UA.ie && Y.UA.ie < 9) {","	      Y.one(this.el).on(\"click\", function (e) { Y.later(10, this, function () { this.onChange(e); }); }, this);","	   } else {","	     Y.one(this.el).on(\"change\", this.onChange, this, true);","	   }","	   ","	   Y.one(this.el).on(\"focus\", this.onFocus, this, true);","	   Y.one(this.el).on(\"blur\", this.onBlur, this, true);","	},","	   ","	/**","	 * Function called when the checkbox is toggled","	 * @method onChange","	 * @param {Event} e The original 'change' event","	 */","	onChange: function (e) {","      ","	   this.hiddenEl.value = this.el.checked ? this.checkedValue : this.uncheckedValue;","	","      // will fire the updated event","	   inputEx.CheckBox.superclass.onChange.call(this, e);","","      // trick: usually class is set on blur, but when clicking a checkbox the input won't","      //        gain focus so no blur event will ever be fired... so do it on change (blur","      //        event is still fired if focusing the input via keyboard's tab)","      this.setClassFromState();","	},","	","	/**","	 * Get the state value","	 * @method getValue","	 * @return {Any} one of [checkedValue,uncheckedValue]","	 */","	getValue: function() {","	      return this.el.checked ? this.checkedValue : this.uncheckedValue;","	},","	","   // checkbox is considered \"empty\" when not checked, this way the \"required\"","   // option will be equivalent to enforcing the checking of the box.","   isEmpty: function () {","      return !this.el.checked;","   },","","	/**","	 * Set the value of the checkedbox","	 * @method setValue","	 * @param {Any} value The value schould be one of [checkedValue,uncheckedValue]","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	setValue: function(value, sendUpdatedEvt) {","	   if (value===this.checkedValue || (typeof(value) == 'string' && typeof(this.checkedValue) == 'boolean' &&","		value === String(this.checkedValue))) {","			this.hiddenEl.value = this.checkedValue;","			","			// check checkbox (all browsers)","			this.el.checked = true;","			","			// hacks for IE6, because input is not operational at init,","			// so \"this.el.checked = true\" would work for default values !","			// (but still work for later setValue calls)","			if (Y.UA.ie === 6) {","			   this.el.setAttribute(\"defaultChecked\",\"checked\"); // for IE6","		   }","		}","	   else {","	      // DEBUG :","	      /*if (value!==this.uncheckedValue && lang.isObject(console) && lang.isFunction(console.log) ) {","	         console.log(\"inputEx.CheckBox: value is *\"+value+\"*, schould be in [\"+this.checkedValue+\",\"+this.uncheckedValue+\"]\");","         }*/","			this.hiddenEl.value = this.uncheckedValue;","			","			// uncheck checkbox (all browsers)","		   this.el.checked = false;","		   ","			// hacks for IE6, because input is not operational at init,","			// so \"this.el.checked = false\" would work for default values !","			// (but still work for later setValue calls)","			if (Y.UA.ie === 6) {","			   this.el.removeAttribute(\"defaultChecked\"); // for IE6","		   }","		}","		","		// Call Field.setValue to set class and fire updated event","		inputEx.CheckBox.superclass.setValue.call(this,value, sendUpdatedEvt);","	},","	","	/**","    * Disable the field","    * @method disable","    */","   disable: function() {","      this.el.disabled = true;","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      this.el.disabled = false;","   }","	","});","","// Register this class as \"boolean\" type","inputEx.registerType(\"boolean\", inputEx.CheckBox, [","   {type: 'string', label: 'Right Label', name: 'rightLabel'}","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"boolean\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].lines = {"1":0,"6":0,"18":0,"19":0,"22":0,"30":0,"33":0,"35":0,"38":0,"39":0,"40":0,"41":0,"50":0,"51":0,"53":0,"55":0,"56":0,"60":0,"61":0,"73":0,"74":0,"76":0,"79":0,"80":0,"90":0,"93":0,"98":0,"107":0,"113":0,"123":0,"125":0,"128":0,"133":0,"134":0,"142":0,"145":0,"150":0,"151":0,"156":0,"164":0,"172":0,"178":0};
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].functions = {"CheckBox:18":0,"setOptions:29":0,"renderComponent:48":0,"(anonymous 3):74":0,"(anonymous 2):74":0,"initEvents:68":0,"onChange:88":0,"getValue:106":0,"isEmpty:112":0,"setValue:122":0,"disable:163":0,"enable:171":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].coveredLines = 42;
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 1);
YUI.add('inputex-checkbox', function (Y, NAME) {

/**
 * @module inputex-checkbox
 */
   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 6);
var inputEx = Y.inputEx;

/**
 * Create a checkbox.
 * @class inputEx.CheckBox
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options for CheckBoxes:
 * <ul>
 *   <li>sentValues: 2D vector of values for checked/unchecked states (default is [true, false])</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 18);
inputEx.CheckBox = function(options) {
	_yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "CheckBox", 18);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 19);
inputEx.CheckBox.superclass.constructor.call(this,options);
};
	
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 22);
Y.extend(inputEx.CheckBox, inputEx.Field, {
	   
	/**
	 * Adds the CheckBox specific options
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
	setOptions: function(options) {
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "setOptions", 29);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 30);
inputEx.CheckBox.superclass.setOptions.call(this, options);
	   
	   // Overwrite options:
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 33);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-CheckBox';
	   
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 35);
this.options.rightLabel = options.rightLabel || '';
	   
	   // Added options
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 38);
this.sentValues = options.sentValues || [true, false];
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 39);
this.options.sentValues = this.sentValues; // for compatibility
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 40);
this.checkedValue = this.sentValues[0];
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 41);
this.uncheckedValue = this.sentValues[1];
	},
	   
	/**
	 * Render the checkbox and the hidden field
	 * @method renderComponent
	 */
	renderComponent: function() {
	
   	_yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "renderComponent", 48);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 50);
var checkBoxId = this.divEl.id?this.divEl.id+'-field':Y.guid();
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 51);
this.el = inputEx.cn('input', { id: checkBoxId, type: 'checkbox', className: 'inputEx-CheckBox-checkbox' });

	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 53);
this.fieldContainer.appendChild(this.el);
	
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 55);
this.rightLabelEl = inputEx.cn('label', {"for": checkBoxId, className: 'inputEx-CheckBox-rightLabel'}, null, this.options.rightLabel);
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 56);
this.fieldContainer.appendChild(this.rightLabelEl);
	
	   // Keep state of checkbox in a hidden field (format : this.checkedValue or this.uncheckedValue)
	   // This is useful for non-javascript form submit (it allows custom checked/unchecked values to be submitted)
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 60);
this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.uncheckedValue});
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 61);
this.fieldContainer.appendChild(this.hiddenEl);
	},
	   
	/**
	 * Clear the previous events and listen for the "change" event
	 * @method initEvents
	 */
	initEvents: function() {
	   
	   // Awful Hack to work in IE8 and below: the "change" event is only fired when focus is lost
      // and not immediately... so we listen for "click" instead, and setTimeout to give time for
      // the input to reflect the new value (changed after the firing of the "click" event!).
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "initEvents", 68);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 73);
if (Y.UA.ie && Y.UA.ie < 9) {
	      _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 74);
Y.one(this.el).on("click", function (e) { _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "(anonymous 2)", 74);
Y.later(10, this, function () { _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "(anonymous 3)", 74);
this.onChange(e); }); }, this);
	   } else {
	     _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 76);
Y.one(this.el).on("change", this.onChange, this, true);
	   }
	   
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 79);
Y.one(this.el).on("focus", this.onFocus, this, true);
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 80);
Y.one(this.el).on("blur", this.onBlur, this, true);
	},
	   
	/**
	 * Function called when the checkbox is toggled
	 * @method onChange
	 * @param {Event} e The original 'change' event
	 */
	onChange: function (e) {
      
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "onChange", 88);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 90);
this.hiddenEl.value = this.el.checked ? this.checkedValue : this.uncheckedValue;
	
      // will fire the updated event
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 93);
inputEx.CheckBox.superclass.onChange.call(this, e);

      // trick: usually class is set on blur, but when clicking a checkbox the input won't
      //        gain focus so no blur event will ever be fired... so do it on change (blur
      //        event is still fired if focusing the input via keyboard's tab)
      _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 98);
this.setClassFromState();
	},
	
	/**
	 * Get the state value
	 * @method getValue
	 * @return {Any} one of [checkedValue,uncheckedValue]
	 */
	getValue: function() {
	      _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "getValue", 106);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 107);
return this.el.checked ? this.checkedValue : this.uncheckedValue;
	},
	
   // checkbox is considered "empty" when not checked, this way the "required"
   // option will be equivalent to enforcing the checking of the box.
   isEmpty: function () {
      _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "isEmpty", 112);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 113);
return !this.el.checked;
   },

	/**
	 * Set the value of the checkedbox
	 * @method setValue
	 * @param {Any} value The value schould be one of [checkedValue,uncheckedValue]
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(value, sendUpdatedEvt) {
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "setValue", 122);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 123);
if (value===this.checkedValue || (typeof(value) == 'string' && typeof(this.checkedValue) == 'boolean' &&
		value === String(this.checkedValue))) {
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 125);
this.hiddenEl.value = this.checkedValue;
			
			// check checkbox (all browsers)
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 128);
this.el.checked = true;
			
			// hacks for IE6, because input is not operational at init,
			// so "this.el.checked = true" would work for default values !
			// (but still work for later setValue calls)
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 133);
if (Y.UA.ie === 6) {
			   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 134);
this.el.setAttribute("defaultChecked","checked"); // for IE6
		   }
		}
	   else {
	      // DEBUG :
	      /*if (value!==this.uncheckedValue && lang.isObject(console) && lang.isFunction(console.log) ) {
	         console.log("inputEx.CheckBox: value is *"+value+"*, schould be in ["+this.checkedValue+","+this.uncheckedValue+"]");
         }*/
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 142);
this.hiddenEl.value = this.uncheckedValue;
			
			// uncheck checkbox (all browsers)
		   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 145);
this.el.checked = false;
		   
			// hacks for IE6, because input is not operational at init,
			// so "this.el.checked = false" would work for default values !
			// (but still work for later setValue calls)
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 150);
if (Y.UA.ie === 6) {
			   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 151);
this.el.removeAttribute("defaultChecked"); // for IE6
		   }
		}
		
		// Call Field.setValue to set class and fire updated event
		_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 156);
inputEx.CheckBox.superclass.setValue.call(this,value, sendUpdatedEvt);
	},
	
	/**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "disable", 163);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 164);
this.el.disabled = true;
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "enable", 171);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 172);
this.el.disabled = false;
   }
	
});

// Register this class as "boolean" type
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 178);
inputEx.registerType("boolean", inputEx.CheckBox, [
   {type: 'string', label: 'Right Label', name: 'rightLabel'}
]);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "boolean", "skinnable": true});
