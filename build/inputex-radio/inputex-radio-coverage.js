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
_yuitest_coverage["build/inputex-radio/inputex-radio.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-radio/inputex-radio.js",
    code: []
};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].code=["YUI.add('inputex-radio', function (Y, NAME) {","","/**"," * @module inputex-radio"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","	","	/**","	 * Create a radio button. Here are the added options :","	 * <ul>","	 *	 <li>choices: list of choices (array of string)</li>","	 *	 <li>values: list of returned values (array )</li>","	 *	 <li>allowAny: add an option with a string field</li>","	 * </ul>","	 * @class inputEx.RadioField","	 * @extends inputEx.Field","	 * @constructor","	 * @param {Object} options inputEx.Field options object","	 */","	inputEx.RadioField = function (options) {","		inputEx.RadioField.superclass.constructor.call(this,options);","	};","	","	Y.extend(inputEx.RadioField, inputEx.Field, {","		","		/**","		 * Adds the Radio button specific options","		 * @method setOptions","		 * @param {Object} options Options object as passed to the constructor","		 */","		setOptions: function (options) {","			","			var i, length;","			","			inputEx.RadioField.superclass.setOptions.call(this, options);","			","			// Display mode","			this.options.display = options.display === \"vertically\" ? \"vertically\" : \"inline\"; // default \"inline\"","			","			// Classname","			this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';","			if (this.options.display === \"vertically\") {","				this.options.className +=  ' inputEx-RadioField-Vertically';","			}","			","			// Choices creation","			","			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)","			if (lang.isArray(options.values)) {","				","				this.options.choices = [];","				","				for (i = 0, length = options.values.length; i < length; i += 1) {","					this.options.choices.push({ value: options.values[i], label: options.choices[i] });","				}","			","			// New pattern to define choices","			} else {","				","				this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]","				","			}","			","			if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {","				this.options.allowAny = false;","			} else {","				this.options.allowAny = {};","				if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}","				this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {return true;};","				this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : \"\";","				this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: \"string\", value: this.options.allowAny.value } : options.allowAny.field;","			}","			","		},","		","		/**","		 * Render the checkbox and the hidden field","		 * @method renderComponent","		 */","		renderComponent: function () {","			","			var choices, length, i, sep;","			","			this.choicesList = [];","			","			choices = this.options.choices;","			","			if(!choices){","				throw new Error(\"Missing 'choices' property in options\");","			}","","			for (i = 0, length = choices.length ; i < length ; i += 1 ) {","				","				this.addChoice(choices[i]);","				","			}","			","			// Build a \"any\" radio combined with a StringField","			if (this.options.allowAny) {","				","				this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });","				","				this.radioAny = this.allowAnyChoice.node.firstChild;","				","				this.anyField = new inputEx(this.options.allowAny.field);","				this.anyField.disable();","				","				Y.one(this.radioAny).setStyle(\"float\",\"left\");","				Y.one(this.anyField.getEl()).setStyle(\"float\",\"left\");","				","				// Hack for firefox 3.5+","				if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( \"marginTop\",\"0.2em\"); }","				","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginRight:\"3px\"},this.options.allowAny.separators[0] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","				this.allowAnyChoice.node.appendChild(this.anyField.getEl());","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginLeft:\"3px\"},this.options.allowAny.separators[1] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","			}","			","		},","		","		/**","		 * Listen for change events on all radios","		 * @method initEvents","		 */","		initEvents: function () {","			","			// Delegate event listening because list of choices is dynamic","			// so we can't listen on each <input type=\"radio\" class='inputEx-RadioField-radio' />","			","			var fieldContainer = Y.one(this.fieldContainer), that = this;","			","			// Change event (IE does not fire \"change\" event, so listen to click instead)","			fieldContainer.delegate(Y.UA.ie ? \"click\" : \"change\", function(e, matchedEl, container) {","				that.onChange(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// Focus / Blur events","			fieldContainer.delegate(\"focusin\", function(e, matchedEl, container) {","				that.onFocus(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			fieldContainer.delegate(\"focusout\", function(e, matchedEl, container) {","				that.onBlur(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// AnyField events","			if (this.allowAnyChoice) {","				","				this.anyField.on('updated', function (e, params) {","					","					var value = params[0];","					this.radioAny.value = value;","					","					this.setClassFromState();","					","					inputEx.RadioField.superclass.onChange.call(this,e);","					","				}, this, true);","				","				// Update radio field style after editing anyField content !","            if(this.anyField.el) {","               Y.one(this.anyField.el).on('blur', this.onBlur, this, true);","            }","			}","		},","		","		/**","		 * Add an additional class to the currently selected inputEx-RadioField-choice","		 * @method setSelectedClass","		 */","		setSelectedClass: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				if (this.choicesList[i].node.firstChild.checked) {","					Y.one(this.choicesList[i].node).addClass(\"inputEx-selected\");","				} else {","					Y.one(this.choicesList[i].node).removeClass(\"inputEx-selected\");","				}","				","			}","		},","		","		/**","		 * @method setClassFromState","		 */","		setClassFromState: function () {","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.setClassFromState.call(this);","			","			this.setSelectedClass();","			","		},","		","		/**","		 * Function called when the checkbox is toggled","		 * @method onChange","		 * @param {Event} e The original 'change' event","		 */","		onChange: function (e) {","			var target = e.target._node;","			","			// Enable/disable the \"any\" field","			if (this.allowAnyChoice) {","				","				var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;","				","				// if clicked another choice than allowAnyChoice","				if (!clickedOnAllowAnyChoice) {","					this.anyField.disable();","				} else {","					this.anyField.enable();","					lang.later( 50 , this.anyField , \"focus\");","				}","				","			}","			","			this.setSelectedClass();","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.onChange.call(this,e);","		},","		","		/**","		 * Get the field value","		 * @method getValue","		 * @return {Any} ","		 */","		getValue: function () {","			","			var i, length, radioInput;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","            radioInput = this.choicesList[i].node.firstChild;","","				if (radioInput.checked) {","					","					if (this.radioAny && this.radioAny == radioInput) {","						return this.anyField.getValue();","					}","					","					return this.choicesList[i].value;","				}","			}","			","			return \"\";","		},","		","		/**","		 * Set the value of the Radio","		 * @method setValue","		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		setValue: function (value, sendUpdatedEvt) {","			","			var checkAny = true, valueFound = false, i, length;","			","         // With IE 7 and below, the radio inputs need to be in the doc","         // for the value to be applied, so wait for it to happen!","         if (Y.UA.ie && Y.UA.ie <= 7 && !this._ieFirstValueSet) {","","            // retry counter (avoid to loop forever in case the radio is never attached to doc)","            this._ieFirstValueRetries = (this._ieFirstValueRetries || 0) + 1;","","            // if not in the doc (and less than 40 retries)","            if (!Y.DOM.inDoc(this.divEl) && this._ieFirstValueRetries < 40) {","","               // try to set value later","               Y.later(50, this, function () {","                  // important to check again because a successful","                  // setValue may have happened in between... so this","                  // value shouldn't be set (it's stale).","                  if (!this._ieFirstValueSet) {","                     this.setValue(value, sendUpdatedEvt);","                  }","               });","","            } else {","               this._ieFirstValueSet = true;","            }","         }","","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				// valueFound is a useful when \"real\" choice has a value equal to allowAny choice default value","				// so we check only the first value-matching radio button","				if (value === this.choicesList[i].value && !valueFound) {","					","					// check the radio","					this.choicesList[i].node.firstChild.checked = true;","					","					// radioAny should not be checked (unless current choice is radioAny !)","					checkAny = this.radioAny && (i === length - 1) ? true : false;","					","					// raise valueFound flag, all other radios should be unchecked now","					valueFound = true;","					","				} else {","					this.choicesList[i].node.firstChild.checked = false;","				}","				","			}","			","			// Option allowAny","			if (this.radioAny) {","				","				if (checkAny) {","					this.radioAny.checked = true;","					this.radioAny.value = value;","					this.anyField.enable();","					this.anyField.setValue(value, false);","				} else {","					this.anyField.disable();","				}","			}","			","			// call parent class method to set style and fire updated event","			inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);","		},","		","		/**","		 * Clear the field by setting the field value to this.options.value","		 * @method clear","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		clear: function (sendUpdatedEvt) {","			","			if (this.radioAny){","				this.anyField.setValue(this.options.allowAny.value, false);","			}","		","			inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);","		},","		","		/**","		 * Should return true if empty","		 * @method isEmpty","		 */","		isEmpty: function () {","			","			var i, length, radioInput;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				radioInput = this.choicesList[i].node.firstChild;","				","				if (radioInput.checked) {","					","					// if \"any\" option checked...","					if (this.radioAny && this.radioAny == radioInput) {","						","                  // ... and not empty","						return this.anyField.isEmpty();","						","					} else {","						","                  // not empty because a choice has been made","                  // warning: should return false (=not empty) even if this radio's value is \"\"","						return false;","						","					}","				}","			}","			","			return true;","			","		},","		","		/**","       * Add extra validation if allowAny.validator is provided","		 * @method validate","		 */","		validate: function () {","			","			var i, length, radioInput, anyVal;","","         // basic field validation (e.g. required + empty)","         if (!inputEx.RadioField.superclass.validate.call(this)) {","            return false;","         }","			","         // extra validation for allowAny field (when checked)","			if (this.options.allowAny) {","				","				for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","					","					radioInput = this.choicesList[i].node.firstChild;","					","					if (radioInput.checked) {","						","						// if \"any\" option checked","						if (this.radioAny && this.radioAny == radioInput) {","							anyVal = this.anyField.getValue();","							return this.anyField.validate() && this.options.allowAny.validator(anyVal);","						}","					}","				}","			}","			","			return true;","		},","		","		/**","		 * Disable the field","		 * @method disable","		 */","		disable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.disableChoice(this.choicesList[i], false);","			}","			","		},","	","		/**","		 * Enable the field","		 * @method enable","		 */","		enable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.enableChoice(this.choicesList[i]);","			}","			","		},","		","		/**","		 * @method createChoiceNode","		 */","		createChoiceNode: function (choice) {","			","			var div, radioId, radioNode, labelNode;","			","			div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});","			","			// radioId MUST be different for each option, to allow click on label (with for:id trick)","			if(!inputEx.RadioField._idCounter) {","			   inputEx.RadioField._idCounter = 0;","			}","			radioId = \"_inputex_radioId\"+inputEx.RadioField._idCounter;","			inputEx.RadioField._idCounter++;","			","			radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });","			div.appendChild(radioNode);","			","			if (choice.label.length > 0) {","				labelNode = inputEx.cn('label', {\"for\": radioId, className: 'inputEx-RadioField-rightLabel'}, null, \"\"+choice.label);","				div.appendChild(labelNode);","			}","			","			return div;","			","		},","		","		/**","		 * @method removeChoiceNode","		 */","		removeChoiceNode: function (node) {","			","			// remove from selector","			// ","			//   -> style.display = 'none' would work only on FF (when node is an <option>)","			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM","			//","			this.fieldContainer.removeChild(node);","			","		},","		","		/**","		 * @method disableChoiceNode","		 */","		disableChoiceNode: function (node) {","			","			//node.firstChild.disabled = \"disabled\";","			node.firstChild.disabled = true;","		},","		","		/**","		 * @method enableChoiceNode","		 */","		enableChoiceNode: function (node) {","			","			//node.firstChild.removeAttribute(\"disabled\");","			node.firstChild.disabled = false;","			","		},","		","		/**","		 * Attach an <option> node to the <select> at the specified position","		 * @method appendChoiceNode","		 * @param {HTMLElement} node The <option> node to attach to the <select>","		 * @param {Int} position The position of the choice in choicesList (may not be the \"real\" position in DOM)","		 */","		appendChoiceNode: function (node, position) {","			","			var domPosition, i;","			","			// Compute real DOM position (since previous choices in choicesList may be hidden)","			domPosition = 0;","			","			for (i = 0; i < position; i += 1) {","				","				if (this.choicesList[i].visible) {","					","					domPosition += 1;","					","				}","				","			}","			","			// Insert in DOM","			if (domPosition < this.fieldContainer.childNodes.length) {","				Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);","			} else {","				","				this.fieldContainer.appendChild(node);","				","			}","		}","		","	});","	","	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)","	Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);","	","	","	// Register this class as \"radio\" type","	inputEx.registerType(\"radio\", inputEx.RadioField, [","		{","			type: 'list',","			name: 'choices',","			label: 'Choices',","			elementType: {","				type: 'group',","				fields: [","					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)","					{ label: 'Label', name: 'label' } // optional : if left empty, label is not created","				]","			},","			value: [],","			required: true","		},","		{type: 'boolean', label: 'Allow custom value', name: 'allowAny', value: false  }","	]);","	","","}, '@VERSION@', {","    \"requires\": [","        \"selector\",","        \"node-event-delegate\",","        \"inputex-field\",","        \"inputex-choice\",","        \"inputex-string\"","    ],","    \"ix_provides\": \"radio\",","    \"skinnable\": true","});"];
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].lines = {"1":0,"6":0,"21":0,"22":0,"25":0,"34":0,"36":0,"39":0,"42":0,"43":0,"44":0,"50":0,"52":0,"54":0,"55":0,"61":0,"65":0,"66":0,"68":0,"69":0,"70":0,"71":0,"72":0,"83":0,"85":0,"87":0,"89":0,"90":0,"93":0,"95":0,"100":0,"102":0,"104":0,"106":0,"107":0,"109":0,"110":0,"113":0,"116":0,"117":0,"118":0,"119":0,"122":0,"124":0,"125":0,"126":0,"127":0,"143":0,"146":0,"147":0,"151":0,"152":0,"155":0,"156":0,"160":0,"162":0,"164":0,"165":0,"167":0,"169":0,"174":0,"175":0,"186":0,"188":0,"190":0,"191":0,"193":0,"205":0,"207":0,"217":0,"220":0,"222":0,"225":0,"226":0,"228":0,"229":0,"234":0,"237":0,"247":0,"249":0,"251":0,"253":0,"255":0,"256":0,"259":0,"263":0,"274":0,"278":0,"281":0,"284":0,"287":0,"291":0,"292":0,"297":0,"301":0,"305":0,"308":0,"311":0,"314":0,"317":0,"323":0,"325":0,"326":0,"327":0,"328":0,"329":0,"331":0,"336":0,"346":0,"347":0,"350":0,"359":0,"361":0,"363":0,"365":0,"368":0,"371":0,"377":0,"383":0,"393":0,"396":0,"397":0,"401":0,"403":0,"405":0,"407":0,"410":0,"411":0,"412":0,"418":0,"427":0,"429":0,"430":0,"441":0,"443":0,"444":0,"454":0,"456":0,"459":0,"460":0,"462":0,"463":0,"465":0,"466":0,"468":0,"469":0,"470":0,"473":0,"487":0,"497":0,"506":0,"518":0,"521":0,"523":0,"525":0,"527":0,"534":0,"535":0,"538":0,"546":0,"550":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].functions = {"RadioField:21":0,"validator:70":0,"setOptions:32":0,"renderComponent:81":0,"(anonymous 2):146":0,"(anonymous 3):151":0,"(anonymous 4):155":0,"(anonymous 5):162":0,"initEvents:138":0,"setSelectedClass:184":0,"setClassFromState:202":0,"(anonymous 6):222":0,"onChange:216":0,"getValue:245":0,"(anonymous 7):287":0,"setValue:272":0,"clear:344":0,"isEmpty:357":0,"validate:391":0,"disable:425":0,"enable:439":0,"createChoiceNode:452":0,"removeChoiceNode:480":0,"disableChoiceNode:494":0,"enableChoiceNode:503":0,"appendChoiceNode:516":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].coveredLines = 161;
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].coveredFunctions = 27;
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 1);
YUI.add('inputex-radio', function (Y, NAME) {

/**
 * @module inputex-radio
 */
   _yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;
	
	/**
	 * Create a radio button. Here are the added options :
	 * <ul>
	 *	 <li>choices: list of choices (array of string)</li>
	 *	 <li>values: list of returned values (array )</li>
	 *	 <li>allowAny: add an option with a string field</li>
	 * </ul>
	 * @class inputEx.RadioField
	 * @extends inputEx.Field
	 * @constructor
	 * @param {Object} options inputEx.Field options object
	 */
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 21);
inputEx.RadioField = function (options) {
		_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "RadioField", 21);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 22);
inputEx.RadioField.superclass.constructor.call(this,options);
	};
	
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 25);
Y.extend(inputEx.RadioField, inputEx.Field, {
		
		/**
		 * Adds the Radio button specific options
		 * @method setOptions
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setOptions", 32);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 34);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 36);
inputEx.RadioField.superclass.setOptions.call(this, options);
			
			// Display mode
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 39);
this.options.display = options.display === "vertically" ? "vertically" : "inline"; // default "inline"
			
			// Classname
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 42);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 43);
if (this.options.display === "vertically") {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 44);
this.options.className +=  ' inputEx-RadioField-Vertically';
			}
			
			// Choices creation
			
			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 50);
if (lang.isArray(options.values)) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 52);
this.options.choices = [];
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 54);
for (i = 0, length = options.values.length; i < length; i += 1) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 55);
this.options.choices.push({ value: options.values[i], label: options.choices[i] });
				}
			
			// New pattern to define choices
			} else {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 61);
this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]
				
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 65);
if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 66);
this.options.allowAny = false;
			} else {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 68);
this.options.allowAny = {};
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 69);
if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 70);
this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "validator", 70);
return true;};
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 71);
this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : "";
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 72);
this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: "string", value: this.options.allowAny.value } : options.allowAny.field;
			}
			
		},
		
		/**
		 * Render the checkbox and the hidden field
		 * @method renderComponent
		 */
		renderComponent: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "renderComponent", 81);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 83);
var choices, length, i, sep;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 85);
this.choicesList = [];
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 87);
choices = this.options.choices;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 89);
if(!choices){
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 90);
throw new Error("Missing 'choices' property in options");
			}

			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 93);
for (i = 0, length = choices.length ; i < length ; i += 1 ) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 95);
this.addChoice(choices[i]);
				
			}
			
			// Build a "any" radio combined with a StringField
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 100);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 102);
this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 104);
this.radioAny = this.allowAnyChoice.node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 106);
this.anyField = new inputEx(this.options.allowAny.field);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 107);
this.anyField.disable();
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 109);
Y.one(this.radioAny).setStyle("float","left");
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 110);
Y.one(this.anyField.getEl()).setStyle("float","left");
				
				// Hack for firefox 3.5+
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 113);
if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( "marginTop","0.2em"); }
				
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 116);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 117);
sep = inputEx.cn("div",null,{marginRight:"3px"},this.options.allowAny.separators[0] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 118);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 119);
this.allowAnyChoice.node.appendChild(sep);
				}
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 122);
this.allowAnyChoice.node.appendChild(this.anyField.getEl());
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 124);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 125);
sep = inputEx.cn("div",null,{marginLeft:"3px"},this.options.allowAny.separators[1] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 126);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 127);
this.allowAnyChoice.node.appendChild(sep);
				}
				
			}
			
		},
		
		/**
		 * Listen for change events on all radios
		 * @method initEvents
		 */
		initEvents: function () {
			
			// Delegate event listening because list of choices is dynamic
			// so we can't listen on each <input type="radio" class='inputEx-RadioField-radio' />
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "initEvents", 138);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 143);
var fieldContainer = Y.one(this.fieldContainer), that = this;
			
			// Change event (IE does not fire "change" event, so listen to click instead)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 146);
fieldContainer.delegate(Y.UA.ie ? "click" : "change", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 2)", 146);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 147);
that.onChange(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// Focus / Blur events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 151);
fieldContainer.delegate("focusin", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 3)", 151);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 152);
that.onFocus(e);
			}, ".inputEx-RadioField-radio", "input");
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 155);
fieldContainer.delegate("focusout", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 4)", 155);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 156);
that.onBlur(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// AnyField events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 160);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 162);
this.anyField.on('updated', function (e, params) {
					
					_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 5)", 162);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 164);
var value = params[0];
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 165);
this.radioAny.value = value;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 167);
this.setClassFromState();
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 169);
inputEx.RadioField.superclass.onChange.call(this,e);
					
				}, this, true);
				
				// Update radio field style after editing anyField content !
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 174);
if(this.anyField.el) {
               _yuitest_coverline("build/inputex-radio/inputex-radio.js", 175);
Y.one(this.anyField.el).on('blur', this.onBlur, this, true);
            }
			}
		},
		
		/**
		 * Add an additional class to the currently selected inputEx-RadioField-choice
		 * @method setSelectedClass
		 */
		setSelectedClass: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setSelectedClass", 184);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 186);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 188);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 190);
if (this.choicesList[i].node.firstChild.checked) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 191);
Y.one(this.choicesList[i].node).addClass("inputEx-selected");
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 193);
Y.one(this.choicesList[i].node).removeClass("inputEx-selected");
				}
				
			}
		},
		
		/**
		 * @method setClassFromState
		 */
		setClassFromState: function () {
			
			// call superclass method (will fire updated event)
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setClassFromState", 202);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 205);
inputEx.RadioField.superclass.setClassFromState.call(this);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 207);
this.setSelectedClass();
			
		},
		
		/**
		 * Function called when the checkbox is toggled
		 * @method onChange
		 * @param {Event} e The original 'change' event
		 */
		onChange: function (e) {
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "onChange", 216);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 217);
var target = e.target._node;
			
			// Enable/disable the "any" field
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 220);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 222);
var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { _yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 6)", 222);
return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;
				
				// if clicked another choice than allowAnyChoice
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 225);
if (!clickedOnAllowAnyChoice) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 226);
this.anyField.disable();
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 228);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 229);
lang.later( 50 , this.anyField , "focus");
				}
				
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 234);
this.setSelectedClass();
			
			// call superclass method (will fire updated event)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 237);
inputEx.RadioField.superclass.onChange.call(this,e);
		},
		
		/**
		 * Get the field value
		 * @method getValue
		 * @return {Any} 
		 */
		getValue: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "getValue", 245);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 247);
var i, length, radioInput;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 249);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 251);
radioInput = this.choicesList[i].node.firstChild;

				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 253);
if (radioInput.checked) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 255);
if (this.radioAny && this.radioAny == radioInput) {
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 256);
return this.anyField.getValue();
					}
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 259);
return this.choicesList[i].value;
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 263);
return "";
		},
		
		/**
		 * Set the value of the Radio
		 * @method setValue
		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setValue", 272);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 274);
var checkAny = true, valueFound = false, i, length;
			
         // With IE 7 and below, the radio inputs need to be in the doc
         // for the value to be applied, so wait for it to happen!
         _yuitest_coverline("build/inputex-radio/inputex-radio.js", 278);
if (Y.UA.ie && Y.UA.ie <= 7 && !this._ieFirstValueSet) {

            // retry counter (avoid to loop forever in case the radio is never attached to doc)
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 281);
this._ieFirstValueRetries = (this._ieFirstValueRetries || 0) + 1;

            // if not in the doc (and less than 40 retries)
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 284);
if (!Y.DOM.inDoc(this.divEl) && this._ieFirstValueRetries < 40) {

               // try to set value later
               _yuitest_coverline("build/inputex-radio/inputex-radio.js", 287);
Y.later(50, this, function () {
                  // important to check again because a successful
                  // setValue may have happened in between... so this
                  // value shouldn't be set (it's stale).
                  _yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 7)", 287);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 291);
if (!this._ieFirstValueSet) {
                     _yuitest_coverline("build/inputex-radio/inputex-radio.js", 292);
this.setValue(value, sendUpdatedEvt);
                  }
               });

            } else {
               _yuitest_coverline("build/inputex-radio/inputex-radio.js", 297);
this._ieFirstValueSet = true;
            }
         }

			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 301);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				// valueFound is a useful when "real" choice has a value equal to allowAny choice default value
				// so we check only the first value-matching radio button
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 305);
if (value === this.choicesList[i].value && !valueFound) {
					
					// check the radio
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 308);
this.choicesList[i].node.firstChild.checked = true;
					
					// radioAny should not be checked (unless current choice is radioAny !)
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 311);
checkAny = this.radioAny && (i === length - 1) ? true : false;
					
					// raise valueFound flag, all other radios should be unchecked now
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 314);
valueFound = true;
					
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 317);
this.choicesList[i].node.firstChild.checked = false;
				}
				
			}
			
			// Option allowAny
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 323);
if (this.radioAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 325);
if (checkAny) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 326);
this.radioAny.checked = true;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 327);
this.radioAny.value = value;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 328);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 329);
this.anyField.setValue(value, false);
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 331);
this.anyField.disable();
				}
			}
			
			// call parent class method to set style and fire updated event
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 336);
inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
		
		/**
		 * Clear the field by setting the field value to this.options.value
		 * @method clear
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		clear: function (sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "clear", 344);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 346);
if (this.radioAny){
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 347);
this.anyField.setValue(this.options.allowAny.value, false);
			}
		
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 350);
inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);
		},
		
		/**
		 * Should return true if empty
		 * @method isEmpty
		 */
		isEmpty: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "isEmpty", 357);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 359);
var i, length, radioInput;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 361);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 363);
radioInput = this.choicesList[i].node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 365);
if (radioInput.checked) {
					
					// if "any" option checked...
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 368);
if (this.radioAny && this.radioAny == radioInput) {
						
                  // ... and not empty
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 371);
return this.anyField.isEmpty();
						
					} else {
						
                  // not empty because a choice has been made
                  // warning: should return false (=not empty) even if this radio's value is ""
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 377);
return false;
						
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 383);
return true;
			
		},
		
		/**
       * Add extra validation if allowAny.validator is provided
		 * @method validate
		 */
		validate: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "validate", 391);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 393);
var i, length, radioInput, anyVal;

         // basic field validation (e.g. required + empty)
         _yuitest_coverline("build/inputex-radio/inputex-radio.js", 396);
if (!inputEx.RadioField.superclass.validate.call(this)) {
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 397);
return false;
         }
			
         // extra validation for allowAny field (when checked)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 401);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 403);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 405);
radioInput = this.choicesList[i].node.firstChild;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 407);
if (radioInput.checked) {
						
						// if "any" option checked
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 410);
if (this.radioAny && this.radioAny == radioInput) {
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 411);
anyVal = this.anyField.getValue();
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 412);
return this.anyField.validate() && this.options.allowAny.validator(anyVal);
						}
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 418);
return true;
		},
		
		/**
		 * Disable the field
		 * @method disable
		 */
		disable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disable", 425);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 427);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 429);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 430);
this.disableChoice(this.choicesList[i], false);
			}
			
		},
	
		/**
		 * Enable the field
		 * @method enable
		 */
		enable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enable", 439);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 441);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 443);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 444);
this.enableChoice(this.choicesList[i]);
			}
			
		},
		
		/**
		 * @method createChoiceNode
		 */
		createChoiceNode: function (choice) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "createChoiceNode", 452);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 454);
var div, radioId, radioNode, labelNode;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 456);
div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});
			
			// radioId MUST be different for each option, to allow click on label (with for:id trick)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 459);
if(!inputEx.RadioField._idCounter) {
			   _yuitest_coverline("build/inputex-radio/inputex-radio.js", 460);
inputEx.RadioField._idCounter = 0;
			}
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 462);
radioId = "_inputex_radioId"+inputEx.RadioField._idCounter;
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 463);
inputEx.RadioField._idCounter++;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 465);
radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 466);
div.appendChild(radioNode);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 468);
if (choice.label.length > 0) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 469);
labelNode = inputEx.cn('label', {"for": radioId, className: 'inputEx-RadioField-rightLabel'}, null, ""+choice.label);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 470);
div.appendChild(labelNode);
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 473);
return div;
			
		},
		
		/**
		 * @method removeChoiceNode
		 */
		removeChoiceNode: function (node) {
			
			// remove from selector
			// 
			//   -> style.display = 'none' would work only on FF (when node is an <option>)
			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM
			//
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "removeChoiceNode", 480);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 487);
this.fieldContainer.removeChild(node);
			
		},
		
		/**
		 * @method disableChoiceNode
		 */
		disableChoiceNode: function (node) {
			
			//node.firstChild.disabled = "disabled";
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disableChoiceNode", 494);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 497);
node.firstChild.disabled = true;
		},
		
		/**
		 * @method enableChoiceNode
		 */
		enableChoiceNode: function (node) {
			
			//node.firstChild.removeAttribute("disabled");
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enableChoiceNode", 503);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 506);
node.firstChild.disabled = false;
			
		},
		
		/**
		 * Attach an <option> node to the <select> at the specified position
		 * @method appendChoiceNode
		 * @param {HTMLElement} node The <option> node to attach to the <select>
		 * @param {Int} position The position of the choice in choicesList (may not be the "real" position in DOM)
		 */
		appendChoiceNode: function (node, position) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "appendChoiceNode", 516);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 518);
var domPosition, i;
			
			// Compute real DOM position (since previous choices in choicesList may be hidden)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 521);
domPosition = 0;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 523);
for (i = 0; i < position; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 525);
if (this.choicesList[i].visible) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 527);
domPosition += 1;
					
				}
				
			}
			
			// Insert in DOM
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 534);
if (domPosition < this.fieldContainer.childNodes.length) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 535);
Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);
			} else {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 538);
this.fieldContainer.appendChild(node);
				
			}
		}
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 546);
Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);
	
	
	// Register this class as "radio" type
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 550);
inputEx.registerType("radio", inputEx.RadioField, [
		{
			type: 'list',
			name: 'choices',
			label: 'Choices',
			elementType: {
				type: 'group',
				fields: [
					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)
					{ label: 'Label', name: 'label' } // optional : if left empty, label is not created
				]
			},
			value: [],
			required: true
		},
		{type: 'boolean', label: 'Allow custom value', name: 'allowAny', value: false  }
	]);
	

}, '@VERSION@', {
    "requires": [
        "selector",
        "node-event-delegate",
        "inputex-field",
        "inputex-choice",
        "inputex-string"
    ],
    "ix_provides": "radio",
    "skinnable": true
});
