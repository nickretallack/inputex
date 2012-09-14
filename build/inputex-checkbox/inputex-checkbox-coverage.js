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
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].code=["YUI.add('inputex-checkbox', function (Y, NAME) {","","/**"," * @module inputex-checkbox"," */","YUI.add(\"inputex-checkbox\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a checkbox."," * @class inputEx.CheckBox"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options for CheckBoxes:"," * <ul>"," *   <li>sentValues: 2D vector of values for checked/unchecked states (default is [true, false])</li>"," * </ul>"," */","inputEx.CheckBox = function(options) {","	inputEx.CheckBox.superclass.constructor.call(this,options);","};","	","Y.extend(inputEx.CheckBox, inputEx.Field, {","	   ","	/**","	 * Adds the CheckBox specific options","	 * @method setOptions","	 * @param {Object} options Options object as passed to the constructor","	 */","	setOptions: function(options) {","	   inputEx.CheckBox.superclass.setOptions.call(this, options);","	   ","	   // Overwrite options:","	   this.options.className = options.className ? options.className : 'inputEx-Field inputEx-CheckBox';","	   ","	   this.options.rightLabel = options.rightLabel || '';","	   ","	   // Added options","	   this.sentValues = options.sentValues || [true, false];","	   this.options.sentValues = this.sentValues; // for compatibility","	   this.checkedValue = this.sentValues[0];","	   this.uncheckedValue = this.sentValues[1];","	},","	   ","	/**","	 * Render the checkbox and the hidden field","	 * @method renderComponent","	 */","	renderComponent: function() {","	","   	var checkBoxId = this.divEl.id?this.divEl.id+'-field':Y.guid();","	   this.el = inputEx.cn('input', { id: checkBoxId, type: 'checkbox' });","","	   this.fieldContainer.appendChild(this.el);","	","	   this.rightLabelEl = inputEx.cn('label', {\"for\": checkBoxId, className: 'inputEx-CheckBox-rightLabel'}, null, this.options.rightLabel);","	   this.fieldContainer.appendChild(this.rightLabelEl);","	","	   // Keep state of checkbox in a hidden field (format : this.checkedValue or this.uncheckedValue)","	   // This is useful for non-javascript form submit (it allows custom checked/unchecked values to be submitted)","	   this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.uncheckedValue});","	   this.fieldContainer.appendChild(this.hiddenEl);","	},","	   ","	/**","	 * Clear the previous events and listen for the \"change\" event","	 * @method initEvents","	 */","	initEvents: function() {","	   ","	   // Awful Hack to work in IE6 and below (the checkbox doesn't fire the change event)","	   // It seems IE 8 removed this behavior from IE7 so it only works with IE 7 ??","	   if( Y.UA.ie ) {","	      Y.one(this.el).on(\"click\", function(e) { Y.later(10,this,function(){this.onChange(e);}); }, this);","	   } else {","	     Y.one(this.el).on(\"change\", this.onChange, this, true);","	   }","	   ","	   Y.one(this.el).on(\"focus\", this.onFocus, this, true);","	   Y.one(this.el).on(\"blur\", this.onBlur, this, true);","	},","	   ","	/**","	 * Function called when the checkbox is toggled","	 * @method onChange","	 * @param {Event} e The original 'change' event","	 */","	onChange: function(e) {","	   this.hiddenEl.value = this.el.checked ? this.checkedValue : this.uncheckedValue;","	","	   inputEx.CheckBox.superclass.onChange.call(this,e);","	},","	","	/**","	 * Get the state value","	 * @method getValue","	 * @return {Any} one of [checkedValue,uncheckedValue]","	 */","	getValue: function() {","	      return this.el.checked ? this.checkedValue : this.uncheckedValue;","	},","	","	/**","	 * Set the value of the checkedbox","	 * @method setValue","	 * @param {Any} value The value schould be one of [checkedValue,uncheckedValue]","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	setValue: function(value, sendUpdatedEvt) {","	   if (value===this.checkedValue || (typeof(value) == 'string' && typeof(this.checkedValue) == 'boolean' &&","		value === String(this.checkedValue))) {","			this.hiddenEl.value = this.checkedValue;","			","			// check checkbox (all browsers)","			this.el.checked = true;","			","			// hacks for IE6, because input is not operational at init, ","			// so \"this.el.checked = true\" would work for default values !","			// (but still work for later setValue calls)","			if (Y.UA.ie === 6) {","			   this.el.setAttribute(\"defaultChecked\",\"checked\"); // for IE6","		   }","		}","	   else {","	      // DEBUG :","	      /*if (value!==this.uncheckedValue && lang.isObject(console) && lang.isFunction(console.log) ) {","	         console.log(\"inputEx.CheckBox: value is *\"+value+\"*, schould be in [\"+this.checkedValue+\",\"+this.uncheckedValue+\"]\");","         }*/","			this.hiddenEl.value = this.uncheckedValue;","			","			// uncheck checkbox (all browsers)","		   this.el.checked = false;","		   ","			// hacks for IE6, because input is not operational at init, ","			// so \"this.el.checked = false\" would work for default values !","			// (but still work for later setValue calls)","			if (Y.UA.ie === 6) {","			   this.el.removeAttribute(\"defaultChecked\"); // for IE6","		   }","		}","		","		// Call Field.setValue to set class and fire updated event","		inputEx.CheckBox.superclass.setValue.call(this,value, sendUpdatedEvt);","	},","	","	/**","    * Disable the field","    * @method disable","    */","   disable: function() {","      this.el.disabled = true;","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      this.el.disabled = false;","   }","	","});   ","	","// Register this class as \"boolean\" type","inputEx.registerType(\"boolean\", inputEx.CheckBox, [ ","   {type: 'string', label: 'Right Label', name: 'rightLabel'}","]);","	","}, '0.0.1',{","  requires: [\"inputex-field\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"25":0,"33":0,"36":0,"38":0,"41":0,"42":0,"43":0,"44":0,"53":0,"54":0,"56":0,"58":0,"59":0,"63":0,"64":0,"75":0,"76":0,"78":0,"81":0,"82":0,"91":0,"93":0,"102":0,"112":0,"114":0,"117":0,"122":0,"123":0,"131":0,"134":0,"139":0,"140":0,"145":0,"153":0,"161":0,"167":0};
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].functions = {"CheckBox:21":0,"setOptions:32":0,"renderComponent:51":0,"(anonymous 4):76":0,"(anonymous 3):76":0,"initEvents:71":0,"onChange:90":0,"getValue:101":0,"setValue:111":0,"disable:152":0,"enable:160":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].coveredLines = 41;
_yuitest_coverage["build/inputex-checkbox/inputex-checkbox.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 1);
YUI.add('inputex-checkbox', function (Y, NAME) {

/**
 * @module inputex-checkbox
 */
_yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 6);
YUI.add("inputex-checkbox",function(Y){

   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

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
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 21);
inputEx.CheckBox = function(options) {
	_yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "CheckBox", 21);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 22);
inputEx.CheckBox.superclass.constructor.call(this,options);
};
	
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 25);
Y.extend(inputEx.CheckBox, inputEx.Field, {
	   
	/**
	 * Adds the CheckBox specific options
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
	setOptions: function(options) {
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "setOptions", 32);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 33);
inputEx.CheckBox.superclass.setOptions.call(this, options);
	   
	   // Overwrite options:
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 36);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-CheckBox';
	   
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 38);
this.options.rightLabel = options.rightLabel || '';
	   
	   // Added options
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 41);
this.sentValues = options.sentValues || [true, false];
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 42);
this.options.sentValues = this.sentValues; // for compatibility
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 43);
this.checkedValue = this.sentValues[0];
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 44);
this.uncheckedValue = this.sentValues[1];
	},
	   
	/**
	 * Render the checkbox and the hidden field
	 * @method renderComponent
	 */
	renderComponent: function() {
	
   	_yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "renderComponent", 51);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 53);
var checkBoxId = this.divEl.id?this.divEl.id+'-field':Y.guid();
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 54);
this.el = inputEx.cn('input', { id: checkBoxId, type: 'checkbox' });

	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 56);
this.fieldContainer.appendChild(this.el);
	
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 58);
this.rightLabelEl = inputEx.cn('label', {"for": checkBoxId, className: 'inputEx-CheckBox-rightLabel'}, null, this.options.rightLabel);
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 59);
this.fieldContainer.appendChild(this.rightLabelEl);
	
	   // Keep state of checkbox in a hidden field (format : this.checkedValue or this.uncheckedValue)
	   // This is useful for non-javascript form submit (it allows custom checked/unchecked values to be submitted)
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 63);
this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.uncheckedValue});
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 64);
this.fieldContainer.appendChild(this.hiddenEl);
	},
	   
	/**
	 * Clear the previous events and listen for the "change" event
	 * @method initEvents
	 */
	initEvents: function() {
	   
	   // Awful Hack to work in IE6 and below (the checkbox doesn't fire the change event)
	   // It seems IE 8 removed this behavior from IE7 so it only works with IE 7 ??
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "initEvents", 71);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 75);
if( Y.UA.ie ) {
	      _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 76);
Y.one(this.el).on("click", function(e) { _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "(anonymous 3)", 76);
Y.later(10,this,function(){_yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "(anonymous 4)", 76);
this.onChange(e);}); }, this);
	   } else {
	     _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 78);
Y.one(this.el).on("change", this.onChange, this, true);
	   }
	   
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 81);
Y.one(this.el).on("focus", this.onFocus, this, true);
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 82);
Y.one(this.el).on("blur", this.onBlur, this, true);
	},
	   
	/**
	 * Function called when the checkbox is toggled
	 * @method onChange
	 * @param {Event} e The original 'change' event
	 */
	onChange: function(e) {
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "onChange", 90);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 91);
this.hiddenEl.value = this.el.checked ? this.checkedValue : this.uncheckedValue;
	
	   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 93);
inputEx.CheckBox.superclass.onChange.call(this,e);
	},
	
	/**
	 * Get the state value
	 * @method getValue
	 * @return {Any} one of [checkedValue,uncheckedValue]
	 */
	getValue: function() {
	      _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "getValue", 101);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 102);
return this.el.checked ? this.checkedValue : this.uncheckedValue;
	},
	
	/**
	 * Set the value of the checkedbox
	 * @method setValue
	 * @param {Any} value The value schould be one of [checkedValue,uncheckedValue]
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(value, sendUpdatedEvt) {
	   _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "setValue", 111);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 112);
if (value===this.checkedValue || (typeof(value) == 'string' && typeof(this.checkedValue) == 'boolean' &&
		value === String(this.checkedValue))) {
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 114);
this.hiddenEl.value = this.checkedValue;
			
			// check checkbox (all browsers)
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 117);
this.el.checked = true;
			
			// hacks for IE6, because input is not operational at init, 
			// so "this.el.checked = true" would work for default values !
			// (but still work for later setValue calls)
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 122);
if (Y.UA.ie === 6) {
			   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 123);
this.el.setAttribute("defaultChecked","checked"); // for IE6
		   }
		}
	   else {
	      // DEBUG :
	      /*if (value!==this.uncheckedValue && lang.isObject(console) && lang.isFunction(console.log) ) {
	         console.log("inputEx.CheckBox: value is *"+value+"*, schould be in ["+this.checkedValue+","+this.uncheckedValue+"]");
         }*/
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 131);
this.hiddenEl.value = this.uncheckedValue;
			
			// uncheck checkbox (all browsers)
		   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 134);
this.el.checked = false;
		   
			// hacks for IE6, because input is not operational at init, 
			// so "this.el.checked = false" would work for default values !
			// (but still work for later setValue calls)
			_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 139);
if (Y.UA.ie === 6) {
			   _yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 140);
this.el.removeAttribute("defaultChecked"); // for IE6
		   }
		}
		
		// Call Field.setValue to set class and fire updated event
		_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 145);
inputEx.CheckBox.superclass.setValue.call(this,value, sendUpdatedEvt);
	},
	
	/**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "disable", 152);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 153);
this.el.disabled = true;
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-checkbox/inputex-checkbox.js", "enable", 160);
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 161);
this.el.disabled = false;
   }
	
});   
	
// Register this class as "boolean" type
_yuitest_coverline("build/inputex-checkbox/inputex-checkbox.js", 167);
inputEx.registerType("boolean", inputEx.CheckBox, [ 
   {type: 'string', label: 'Right Label', name: 'rightLabel'}
]);
	
}, '0.0.1',{
  requires: ["inputex-field"]
});


}, '@VERSION@');
