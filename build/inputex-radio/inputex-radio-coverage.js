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
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].code=["YUI.add('inputex-radio', function (Y, NAME) {","","/**"," * @module inputex-radio"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","	","	/**","	 * Create a radio button. Here are the added options :","	 * <ul>","	 *	 <li>choices: list of choices (array of string)</li>","	 *	 <li>values: list of returned values (array )</li>","	 *	 <li>allowAny: add an option with a string field</li>","	 * </ul>","	 * @class inputEx.RadioField","	 * @extends inputEx.Field","	 * @constructor","	 * @param {Object} options inputEx.Field options object","	 */","	inputEx.RadioField = function (options) {","		","		inputEx.RadioField.superclass.constructor.call(this,options);","		","		// IE BUG: doesn't want to set the value if the node is not in the DOM","		if (Y.UA.ie && !lang.isUndefined(this.options.value)) {","			// Set the initial value, use setTimeout to escape the stack (for nested usage in Group or Form)","			var that = this;","			setTimeout(function () {","				that.setValue(that.options.value, false);","			},0);","		}","		","	};","		","	Y.extend(inputEx.RadioField, inputEx.Field, {","		","		/**","		 * Adds the Radio button specific options","		 * @method setOptions","		 * @param {Object} options Options object as passed to the constructor","		 */","		setOptions: function (options) {","			","			var i, length;","			","			inputEx.RadioField.superclass.setOptions.call(this, options);","			","			// Display mode","			this.options.display = options.display === \"vertically\" ? \"vertically\" : \"inline\"; // default \"inline\"","			","			// Classname","			this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';","			if (this.options.display === \"vertically\") {","				this.options.className +=  ' inputEx-RadioField-Vertically';","			}","			","			// Choices creation","			","			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)","			if (lang.isArray(options.values)) {","				","				this.options.choices = [];","				","				for (i = 0, length = options.values.length; i < length; i += 1) {","					this.options.choices.push({ value: options.values[i], label: options.choices[i] });","				}","			","			// New pattern to define choices","			} else {","				","				this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]","				","			}","			","			if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {","				this.options.allowAny = false;","			} else {","				this.options.allowAny = {};","				if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}","				this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {return true;};","				this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : \"\";","				this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: \"string\", value: this.options.allowAny.value } : options.allowAny.field;","			}","			","		},","		","		/**","		 * Render the checkbox and the hidden field","		 * @method renderComponent","		 */","		renderComponent: function () {","			","			var choices, length, i, sep;","			","			this.choicesList = [];","			","			choices = this.options.choices;","			","			if(!choices){","				throw new Error(\"Missing 'choices' property in options\");","			}","","			for (i = 0, length = choices.length ; i < length ; i += 1 ) {","				","				this.addChoice(choices[i]);","				","			}","			","			// Build a \"any\" radio combined with a StringField","			if (this.options.allowAny) {","				","				this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });","				","				this.radioAny = this.allowAnyChoice.node.firstChild;","				","				this.anyField = new inputEx(this.options.allowAny.field);","				this.anyField.disable();","				","				Y.one(this.radioAny).setStyle(\"float\",\"left\");","				Y.one(this.anyField.getEl()).setStyle(\"float\",\"left\");","				","				// Hack for firefox 3.5+","				if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( \"marginTop\",\"0.2em\"); }","				","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginRight:\"3px\"},this.options.allowAny.separators[0] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","				this.allowAnyChoice.node.appendChild(this.anyField.getEl());","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginLeft:\"3px\"},this.options.allowAny.separators[1] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","			}","			","		},","		","		/**","		 * Listen for change events on all radios","		 * @method initEvents","		 */","		initEvents: function () {","			","			// Delegate event listening because list of choices is dynamic","			// so we can't listen on each <input type=\"radio\" class='inputEx-RadioField-radio' />","			","			var fieldContainer = Y.one(this.fieldContainer), that = this;","			","			// Change event (IE does not fire \"change\" event, so listen to click instead)","			fieldContainer.delegate(Y.UA.ie ? \"click\" : \"change\", function(e, matchedEl, container) {","				that.onChange(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// Focus / Blur events","			fieldContainer.delegate(\"focusin\", function(e, matchedEl, container) {","				that.onFocus(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			fieldContainer.delegate(\"focusout\", function(e, matchedEl, container) {","				that.onBlur(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// AnyField events","			if (this.allowAnyChoice) {","				","				this.anyField.on('updated', function (e, params) {","					","					var value = params[0];","					this.radioAny.value = value;","					","					this.setClassFromState();","					","					inputEx.RadioField.superclass.onChange.call(this,e);","					","				}, this, true);","				","				// Update radio field style after editing anyField content !","            if(this.anyField.el) {","               Y.one(this.anyField.el).on('blur', this.onBlur, this, true);","            }","			}","		},","		","		/**","		 * Add an additional class to the currently selected inputEx-RadioField-choice","		 * @method setSelectedClass","		 */","		setSelectedClass: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				if (this.choicesList[i].node.firstChild.checked) {","					Y.one(this.choicesList[i].node).addClass(\"inputEx-selected\");","				} else {","					Y.one(this.choicesList[i].node).removeClass(\"inputEx-selected\");","				}","				","			}","		},","		","		/**","		 * @method setClassFromState","		 */","		setClassFromState: function () {","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.setClassFromState.call(this);","			","			this.setSelectedClass();","			","		},","		","		/**","		 * Function called when the checkbox is toggled","		 * @method onChange","		 * @param {Event} e The original 'change' event","		 */","		onChange: function (e) {","			var target = e.target._node;","			","			// Enable/disable the \"any\" field","			if (this.allowAnyChoice) {","				","				var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;","				","				// if clicked another choice than allowAnyChoice","				if (!clickedOnAllowAnyChoice) {","					this.anyField.disable();","				} else {","					this.anyField.enable();","					lang.later( 50 , this.anyField , \"focus\");","				}","				","			}","			","			this.setSelectedClass();","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.onChange.call(this,e);","		},","		","		/**","		 * Get the field value","		 * @method getValue","		 * @return {Any} ","		 */","		getValue: function () {","			","			var i, length, radioInput;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","            radioInput = this.choicesList[i].node.firstChild;","","				if (radioInput.checked) {","					","					if (this.radioAny && this.radioAny == radioInput) {","						return this.anyField.getValue();","					}","					","					return this.choicesList[i].value;","				}","			}","			","			return \"\";","		},","		","		/**","		 * Set the value of the Radio","		 * @method setValue","		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		setValue: function (value, sendUpdatedEvt) {","			","			var checkAny = true, valueFound = false, i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				// valueFound is a useful when \"real\" choice has a value equal to allowAny choice default value","				// so we check only the first value-matching radio button","				if (value === this.choicesList[i].value && !valueFound) {","					","					// check the radio","					this.choicesList[i].node.firstChild.checked = true;","					","					// radioAny should not be checked (unless current choice is radioAny !)","					checkAny = this.radioAny && (i === length - 1) ? true : false;","					","					// raise valueFound flag, all other radios should be unchecked now","					valueFound = true;","					","				} else {","					this.choicesList[i].node.firstChild.checked = false;","				}","				","			}","			","			// Option allowAny","			if (this.radioAny) {","				","				if (checkAny) {","					this.radioAny.checked = true;","					this.radioAny.value = value;","					this.anyField.enable();","					this.anyField.setValue(value, false);","				} else {","					this.anyField.disable();","				}","			}","			","			// call parent class method to set style and fire updated event","			inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);","		},","		","		/**","		 * Clear the field by setting the field value to this.options.value","		 * @method clear","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		clear: function (sendUpdatedEvt) {","			","			if (this.radioAny){","				this.anyField.setValue(this.options.allowAny.value, false);","			}","		","			inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);","		},","		","		/**","		 * Should return true if empty","		 * @method isEmpty","		 */","		isEmpty: function () {","			","			var i, length, radioInput;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				radioInput = this.choicesList[i].node.firstChild;","				","				if (radioInput.checked) {","					","					// if \"any\" option checked...","					if (this.radioAny && this.radioAny == radioInput) {","						","                  // ... and not empty","						return this.anyField.isEmpty();","						","					} else {","						","                  // not empty because a choice has been made","                  // warning: should return false (=not empty) even if this radio's value is \"\"","						return false;","						","					}","				}","			}","			","			return true;","			","		},","		","		/**","       * Add extra validation if allowAny.validator is provided","		 * @method validate","		 */","		validate: function () {","			","			var i, length, radioInput, anyVal;","","         // basic field validation (e.g. required + empty)","         if (!inputEx.RadioField.superclass.validate.call(this)) {","            return false;","         }","			","         // extra validation for allowAny field (when checked)","			if (this.options.allowAny) {","				","				for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","					","					radioInput = this.choicesList[i].node.firstChild;","					","					if (radioInput.checked) {","						","						// if \"any\" option checked","						if (this.radioAny && this.radioAny == radioInput) {","							anyVal = this.anyField.getValue();","							return this.anyField.validate() && this.options.allowAny.validator(anyVal);","						}","					}","				}","			}","			","			return true;","		},","		","		/**","		 * Disable the field","		 * @method disable","		 */","		disable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.disableChoice(this.choicesList[i], false);","			}","			","		},","	","		/**","		 * Enable the field","		 * @method enable","		 */","		enable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.enableChoice(this.choicesList[i]);","			}","			","		},","		","		/**","		 * @method createChoiceNode","		 */","		createChoiceNode: function (choice) {","			","			var div, radioId, radioNode, labelNode;","			","			div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});","			","			// radioId MUST be different for each option, to allow click on label (with for:id trick)","			if(!inputEx.RadioField._idCounter) {","			   inputEx.RadioField._idCounter = 0;","			}","			radioId = \"_inputex_radioId\"+inputEx.RadioField._idCounter;","			inputEx.RadioField._idCounter++;","			","			radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });","			div.appendChild(radioNode);","			","			if (choice.label.length > 0) {","				labelNode = inputEx.cn('label', {\"for\": radioId, className: 'inputEx-RadioField-rightLabel'}, null, \"\"+choice.label);","				div.appendChild(labelNode);","			}","			","			return div;","			","		},","		","		/**","		 * @method removeChoiceNode","		 */","		removeChoiceNode: function (node) {","			","			// remove from selector","			// ","			//   -> style.display = 'none' would work only on FF (when node is an <option>)","			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM","			//","			this.fieldContainer.removeChild(node);","			","		},","		","		/**","		 * @method disableChoiceNode","		 */","		disableChoiceNode: function (node) {","			","			//node.firstChild.disabled = \"disabled\";","			node.firstChild.disabled = true;","		},","		","		/**","		 * @method enableChoiceNode","		 */","		enableChoiceNode: function (node) {","			","			//node.firstChild.removeAttribute(\"disabled\");","			node.firstChild.disabled = false;","			","		},","		","		/**","		 * Attach an <option> node to the <select> at the specified position","		 * @method appendChoiceNode","		 * @param {HTMLElement} node The <option> node to attach to the <select>","		 * @param {Int} position The position of the choice in choicesList (may not be the \"real\" position in DOM)","		 */","		appendChoiceNode: function (node, position) {","			","			var domPosition, i;","			","			// Compute real DOM position (since previous choices in choicesList may be hidden)","			domPosition = 0;","			","			for (i = 0; i < position; i += 1) {","				","				if (this.choicesList[i].visible) {","					","					domPosition += 1;","					","				}","				","			}","			","			// Insert in DOM","			if (domPosition < this.fieldContainer.childNodes.length) {","				Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);","			} else {","				","				this.fieldContainer.appendChild(node);","				","			}","		}","		","	});","	","	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)","	Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);","	","	","	// Register this class as \"radio\" type","	inputEx.registerType(\"radio\", inputEx.RadioField, [","		{","			type: 'list',","			name: 'choices',","			label: 'Choices',","			elementType: {","				type: 'group',","				fields: [","					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)","					{ label: 'Label', name: 'label' } // optional : if left empty, label is not created","				]","			},","			value: [],","			required: true","		},","		{type: 'boolean', label: 'Allow custom value', name: 'allowAny', value: false  }","	]);","	","","}, '@VERSION@', {","    \"requires\": [","        \"selector\",","        \"node-event-delegate\",","        \"inputex-field\",","        \"inputex-choice\",","        \"inputex-string\"","    ],","    \"ix_provides\": \"radio\",","    \"skinnable\": true","});"];
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].lines = {"1":0,"6":0,"21":0,"23":0,"26":0,"28":0,"29":0,"30":0,"36":0,"45":0,"47":0,"50":0,"53":0,"54":0,"55":0,"61":0,"63":0,"65":0,"66":0,"72":0,"76":0,"77":0,"79":0,"80":0,"81":0,"82":0,"83":0,"94":0,"96":0,"98":0,"100":0,"101":0,"104":0,"106":0,"111":0,"113":0,"115":0,"117":0,"118":0,"120":0,"121":0,"124":0,"127":0,"128":0,"129":0,"130":0,"133":0,"135":0,"136":0,"137":0,"138":0,"154":0,"157":0,"158":0,"162":0,"163":0,"166":0,"167":0,"171":0,"173":0,"175":0,"176":0,"178":0,"180":0,"185":0,"186":0,"197":0,"199":0,"201":0,"202":0,"204":0,"216":0,"218":0,"228":0,"231":0,"233":0,"236":0,"237":0,"239":0,"240":0,"245":0,"248":0,"258":0,"260":0,"262":0,"264":0,"266":0,"267":0,"270":0,"274":0,"285":0,"287":0,"291":0,"294":0,"297":0,"300":0,"303":0,"309":0,"311":0,"312":0,"313":0,"314":0,"315":0,"317":0,"322":0,"332":0,"333":0,"336":0,"345":0,"347":0,"349":0,"351":0,"354":0,"357":0,"363":0,"369":0,"379":0,"382":0,"383":0,"387":0,"389":0,"391":0,"393":0,"396":0,"397":0,"398":0,"404":0,"413":0,"415":0,"416":0,"427":0,"429":0,"430":0,"440":0,"442":0,"445":0,"446":0,"448":0,"449":0,"451":0,"452":0,"454":0,"455":0,"456":0,"459":0,"473":0,"483":0,"492":0,"504":0,"507":0,"509":0,"511":0,"513":0,"520":0,"521":0,"524":0,"532":0,"536":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].functions = {"(anonymous 2):29":0,"RadioField:21":0,"validator:81":0,"setOptions:43":0,"renderComponent:92":0,"(anonymous 3):157":0,"(anonymous 4):162":0,"(anonymous 5):166":0,"(anonymous 6):173":0,"initEvents:149":0,"setSelectedClass:195":0,"setClassFromState:213":0,"(anonymous 7):233":0,"onChange:227":0,"getValue:256":0,"setValue:283":0,"clear:330":0,"isEmpty:343":0,"validate:377":0,"disable:411":0,"enable:425":0,"createChoiceNode:438":0,"removeChoiceNode:466":0,"disableChoiceNode:480":0,"enableChoiceNode:489":0,"appendChoiceNode:502":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].coveredLines = 158;
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
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 23);
inputEx.RadioField.superclass.constructor.call(this,options);
		
		// IE BUG: doesn't want to set the value if the node is not in the DOM
		_yuitest_coverline("build/inputex-radio/inputex-radio.js", 26);
if (Y.UA.ie && !lang.isUndefined(this.options.value)) {
			// Set the initial value, use setTimeout to escape the stack (for nested usage in Group or Form)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 28);
var that = this;
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 29);
setTimeout(function () {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 2)", 29);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 30);
that.setValue(that.options.value, false);
			},0);
		}
		
	};
		
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 36);
Y.extend(inputEx.RadioField, inputEx.Field, {
		
		/**
		 * Adds the Radio button specific options
		 * @method setOptions
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setOptions", 43);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 45);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 47);
inputEx.RadioField.superclass.setOptions.call(this, options);
			
			// Display mode
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 50);
this.options.display = options.display === "vertically" ? "vertically" : "inline"; // default "inline"
			
			// Classname
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 53);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 54);
if (this.options.display === "vertically") {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 55);
this.options.className +=  ' inputEx-RadioField-Vertically';
			}
			
			// Choices creation
			
			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 61);
if (lang.isArray(options.values)) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 63);
this.options.choices = [];
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 65);
for (i = 0, length = options.values.length; i < length; i += 1) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 66);
this.options.choices.push({ value: options.values[i], label: options.choices[i] });
				}
			
			// New pattern to define choices
			} else {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 72);
this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]
				
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 76);
if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 77);
this.options.allowAny = false;
			} else {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 79);
this.options.allowAny = {};
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 80);
if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 81);
this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "validator", 81);
return true;};
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 82);
this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : "";
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 83);
this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: "string", value: this.options.allowAny.value } : options.allowAny.field;
			}
			
		},
		
		/**
		 * Render the checkbox and the hidden field
		 * @method renderComponent
		 */
		renderComponent: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "renderComponent", 92);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 94);
var choices, length, i, sep;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 96);
this.choicesList = [];
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 98);
choices = this.options.choices;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 100);
if(!choices){
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 101);
throw new Error("Missing 'choices' property in options");
			}

			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 104);
for (i = 0, length = choices.length ; i < length ; i += 1 ) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 106);
this.addChoice(choices[i]);
				
			}
			
			// Build a "any" radio combined with a StringField
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 111);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 113);
this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 115);
this.radioAny = this.allowAnyChoice.node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 117);
this.anyField = new inputEx(this.options.allowAny.field);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 118);
this.anyField.disable();
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 120);
Y.one(this.radioAny).setStyle("float","left");
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 121);
Y.one(this.anyField.getEl()).setStyle("float","left");
				
				// Hack for firefox 3.5+
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 124);
if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( "marginTop","0.2em"); }
				
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 127);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 128);
sep = inputEx.cn("div",null,{marginRight:"3px"},this.options.allowAny.separators[0] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 129);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 130);
this.allowAnyChoice.node.appendChild(sep);
				}
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 133);
this.allowAnyChoice.node.appendChild(this.anyField.getEl());
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 135);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 136);
sep = inputEx.cn("div",null,{marginLeft:"3px"},this.options.allowAny.separators[1] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 137);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 138);
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
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "initEvents", 149);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 154);
var fieldContainer = Y.one(this.fieldContainer), that = this;
			
			// Change event (IE does not fire "change" event, so listen to click instead)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 157);
fieldContainer.delegate(Y.UA.ie ? "click" : "change", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 3)", 157);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 158);
that.onChange(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// Focus / Blur events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 162);
fieldContainer.delegate("focusin", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 4)", 162);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 163);
that.onFocus(e);
			}, ".inputEx-RadioField-radio", "input");
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 166);
fieldContainer.delegate("focusout", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 5)", 166);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 167);
that.onBlur(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// AnyField events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 171);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 173);
this.anyField.on('updated', function (e, params) {
					
					_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 6)", 173);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 175);
var value = params[0];
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 176);
this.radioAny.value = value;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 178);
this.setClassFromState();
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 180);
inputEx.RadioField.superclass.onChange.call(this,e);
					
				}, this, true);
				
				// Update radio field style after editing anyField content !
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 185);
if(this.anyField.el) {
               _yuitest_coverline("build/inputex-radio/inputex-radio.js", 186);
Y.one(this.anyField.el).on('blur', this.onBlur, this, true);
            }
			}
		},
		
		/**
		 * Add an additional class to the currently selected inputEx-RadioField-choice
		 * @method setSelectedClass
		 */
		setSelectedClass: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setSelectedClass", 195);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 197);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 199);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 201);
if (this.choicesList[i].node.firstChild.checked) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 202);
Y.one(this.choicesList[i].node).addClass("inputEx-selected");
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 204);
Y.one(this.choicesList[i].node).removeClass("inputEx-selected");
				}
				
			}
		},
		
		/**
		 * @method setClassFromState
		 */
		setClassFromState: function () {
			
			// call superclass method (will fire updated event)
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setClassFromState", 213);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 216);
inputEx.RadioField.superclass.setClassFromState.call(this);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 218);
this.setSelectedClass();
			
		},
		
		/**
		 * Function called when the checkbox is toggled
		 * @method onChange
		 * @param {Event} e The original 'change' event
		 */
		onChange: function (e) {
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "onChange", 227);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 228);
var target = e.target._node;
			
			// Enable/disable the "any" field
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 231);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 233);
var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { _yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 7)", 233);
return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;
				
				// if clicked another choice than allowAnyChoice
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 236);
if (!clickedOnAllowAnyChoice) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 237);
this.anyField.disable();
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 239);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 240);
lang.later( 50 , this.anyField , "focus");
				}
				
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 245);
this.setSelectedClass();
			
			// call superclass method (will fire updated event)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 248);
inputEx.RadioField.superclass.onChange.call(this,e);
		},
		
		/**
		 * Get the field value
		 * @method getValue
		 * @return {Any} 
		 */
		getValue: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "getValue", 256);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 258);
var i, length, radioInput;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 260);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 262);
radioInput = this.choicesList[i].node.firstChild;

				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 264);
if (radioInput.checked) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 266);
if (this.radioAny && this.radioAny == radioInput) {
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 267);
return this.anyField.getValue();
					}
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 270);
return this.choicesList[i].value;
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 274);
return "";
		},
		
		/**
		 * Set the value of the Radio
		 * @method setValue
		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setValue", 283);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 285);
var checkAny = true, valueFound = false, i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 287);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				// valueFound is a useful when "real" choice has a value equal to allowAny choice default value
				// so we check only the first value-matching radio button
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 291);
if (value === this.choicesList[i].value && !valueFound) {
					
					// check the radio
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 294);
this.choicesList[i].node.firstChild.checked = true;
					
					// radioAny should not be checked (unless current choice is radioAny !)
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 297);
checkAny = this.radioAny && (i === length - 1) ? true : false;
					
					// raise valueFound flag, all other radios should be unchecked now
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 300);
valueFound = true;
					
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 303);
this.choicesList[i].node.firstChild.checked = false;
				}
				
			}
			
			// Option allowAny
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 309);
if (this.radioAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 311);
if (checkAny) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 312);
this.radioAny.checked = true;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 313);
this.radioAny.value = value;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 314);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 315);
this.anyField.setValue(value, false);
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 317);
this.anyField.disable();
				}
			}
			
			// call parent class method to set style and fire updated event
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 322);
inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
		
		/**
		 * Clear the field by setting the field value to this.options.value
		 * @method clear
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		clear: function (sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "clear", 330);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 332);
if (this.radioAny){
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 333);
this.anyField.setValue(this.options.allowAny.value, false);
			}
		
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 336);
inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);
		},
		
		/**
		 * Should return true if empty
		 * @method isEmpty
		 */
		isEmpty: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "isEmpty", 343);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 345);
var i, length, radioInput;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 347);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 349);
radioInput = this.choicesList[i].node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 351);
if (radioInput.checked) {
					
					// if "any" option checked...
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 354);
if (this.radioAny && this.radioAny == radioInput) {
						
                  // ... and not empty
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 357);
return this.anyField.isEmpty();
						
					} else {
						
                  // not empty because a choice has been made
                  // warning: should return false (=not empty) even if this radio's value is ""
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 363);
return false;
						
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 369);
return true;
			
		},
		
		/**
       * Add extra validation if allowAny.validator is provided
		 * @method validate
		 */
		validate: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "validate", 377);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 379);
var i, length, radioInput, anyVal;

         // basic field validation (e.g. required + empty)
         _yuitest_coverline("build/inputex-radio/inputex-radio.js", 382);
if (!inputEx.RadioField.superclass.validate.call(this)) {
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 383);
return false;
         }
			
         // extra validation for allowAny field (when checked)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 387);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 389);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 391);
radioInput = this.choicesList[i].node.firstChild;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 393);
if (radioInput.checked) {
						
						// if "any" option checked
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 396);
if (this.radioAny && this.radioAny == radioInput) {
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 397);
anyVal = this.anyField.getValue();
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 398);
return this.anyField.validate() && this.options.allowAny.validator(anyVal);
						}
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 404);
return true;
		},
		
		/**
		 * Disable the field
		 * @method disable
		 */
		disable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disable", 411);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 413);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 415);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 416);
this.disableChoice(this.choicesList[i], false);
			}
			
		},
	
		/**
		 * Enable the field
		 * @method enable
		 */
		enable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enable", 425);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 427);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 429);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 430);
this.enableChoice(this.choicesList[i]);
			}
			
		},
		
		/**
		 * @method createChoiceNode
		 */
		createChoiceNode: function (choice) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "createChoiceNode", 438);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 440);
var div, radioId, radioNode, labelNode;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 442);
div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});
			
			// radioId MUST be different for each option, to allow click on label (with for:id trick)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 445);
if(!inputEx.RadioField._idCounter) {
			   _yuitest_coverline("build/inputex-radio/inputex-radio.js", 446);
inputEx.RadioField._idCounter = 0;
			}
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 448);
radioId = "_inputex_radioId"+inputEx.RadioField._idCounter;
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 449);
inputEx.RadioField._idCounter++;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 451);
radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 452);
div.appendChild(radioNode);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 454);
if (choice.label.length > 0) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 455);
labelNode = inputEx.cn('label', {"for": radioId, className: 'inputEx-RadioField-rightLabel'}, null, ""+choice.label);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 456);
div.appendChild(labelNode);
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 459);
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
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "removeChoiceNode", 466);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 473);
this.fieldContainer.removeChild(node);
			
		},
		
		/**
		 * @method disableChoiceNode
		 */
		disableChoiceNode: function (node) {
			
			//node.firstChild.disabled = "disabled";
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disableChoiceNode", 480);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 483);
node.firstChild.disabled = true;
		},
		
		/**
		 * @method enableChoiceNode
		 */
		enableChoiceNode: function (node) {
			
			//node.firstChild.removeAttribute("disabled");
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enableChoiceNode", 489);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 492);
node.firstChild.disabled = false;
			
		},
		
		/**
		 * Attach an <option> node to the <select> at the specified position
		 * @method appendChoiceNode
		 * @param {HTMLElement} node The <option> node to attach to the <select>
		 * @param {Int} position The position of the choice in choicesList (may not be the "real" position in DOM)
		 */
		appendChoiceNode: function (node, position) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "appendChoiceNode", 502);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 504);
var domPosition, i;
			
			// Compute real DOM position (since previous choices in choicesList may be hidden)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 507);
domPosition = 0;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 509);
for (i = 0; i < position; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 511);
if (this.choicesList[i].visible) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 513);
domPosition += 1;
					
				}
				
			}
			
			// Insert in DOM
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 520);
if (domPosition < this.fieldContainer.childNodes.length) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 521);
Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);
			} else {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 524);
this.fieldContainer.appendChild(node);
				
			}
		}
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 532);
Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);
	
	
	// Register this class as "radio" type
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 536);
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
