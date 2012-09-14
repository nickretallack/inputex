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
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].code=["YUI.add('inputex-radio', function (Y, NAME) {","","/**"," * @module inputex-radio"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","	","	/**","	 * Create a radio button. Here are the added options :","	 * <ul>","	 *	 <li>choices: list of choices (array of string)</li>","	 *	 <li>values: list of returned values (array )</li>","	 *	 <li>allowAny: add an option with a string field</li>","	 * </ul>","	 * @class inputEx.RadioField","	 * @extends inputEx.Field","	 * @constructor","	 * @param {Object} options inputEx.Field options object","	 */","	inputEx.RadioField = function (options) {","		","		inputEx.RadioField.superclass.constructor.call(this,options);","		","		// IE BUG: doesn't want to set the value if the node is not in the DOM","		if (Y.UA.ie && !lang.isUndefined(this.options.value)) {","			// Set the initial value, use setTimeout to escape the stack (for nested usage in Group or Form)","			var that = this;","			setTimeout(function () {","				that.setValue(that.options.value, false);","			},0);","		}","		","	};","		","	Y.extend(inputEx.RadioField, inputEx.Field, {","		","		/**","		 * Adds the Radio button specific options","		 * @method setOptions","		 * @param {Object} options Options object as passed to the constructor","		 */","		setOptions: function (options) {","			","			var i, length;","			","			inputEx.RadioField.superclass.setOptions.call(this, options);","			","			// Display mode","			this.options.display = options.display === \"vertically\" ? \"vertically\" : \"inline\"; // default \"inline\"","			","			// Classname","			this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';","			if (this.options.display === \"vertically\") {","				this.options.className +=  ' inputEx-RadioField-Vertically';","			}","			","			// Choices creation","			","			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)","			if (lang.isArray(options.values)) {","				","				this.options.choices = [];","				","				for (i = 0, length = options.values.length; i < length; i += 1) {","					this.options.choices.push({ value: options.values[i], label: options.choices[i] });","				}","			","			// New pattern to define choices","			} else {","				","				this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]","				","			}","			","			if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {","				this.options.allowAny = false;","			} else {","				this.options.allowAny = {};","				if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}","				this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {return true;};","				this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : \"\";","				this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: \"string\", value: this.options.allowAny.value } : options.allowAny.field;","			}","			","		},","		","		/**","		 * Render the checkbox and the hidden field","		 * @method renderComponent","		 */","		renderComponent: function () {","			","			var choices, length, i, sep;","			","			this.choicesList = [];","			","			choices = this.options.choices;","			","			for (i = 0, length = choices.length ; i < length ; i += 1 ) {","				","				this.addChoice(choices[i]);","				","			}","			","			// Build a \"any\" radio combined with a StringField","			if (this.options.allowAny) {","				","				this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });","				","				this.radioAny = this.allowAnyChoice.node.firstChild;","				","				this.anyField = new inputEx(this.options.allowAny.field);","				this.anyField.disable();","				","				Y.one(this.radioAny).setStyle(\"float\",\"left\");","				Y.one(this.anyField.getEl()).setStyle(\"float\",\"left\");","				","				// Hack for firefox 3.5+","				if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( \"marginTop\",\"0.2em\"); }","				","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginRight:\"3px\"},this.options.allowAny.separators[0] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","				this.allowAnyChoice.node.appendChild(this.anyField.getEl());","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginLeft:\"3px\"},this.options.allowAny.separators[1] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","			}","			","		},","		","		/**","		 * Listen for change events on all radios","		 * @method initEvents","		 */","		initEvents: function () {","			","			// Delegate event listening because list of choices is dynamic","			// so we can't listen on each <input type=\"radio\" class='inputEx-RadioField-radio' />","			","			var fieldContainer = Y.one(this.fieldContainer), that = this;","			","			// Change event (IE does not fire \"change\" event, so listen to click instead)","			fieldContainer.delegate(Y.UA.ie ? \"click\" : \"change\", function(e, matchedEl, container) {","				that.onChange(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// Focus / Blur events","			fieldContainer.delegate(\"focusin\", function(e, matchedEl, container) {","				that.onFocus(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			fieldContainer.delegate(\"focusout\", function(e, matchedEl, container) {","				that.onBlur(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// AnyField events","			if (this.allowAnyChoice) {","				","				this.anyField.on('updated', function (e, params) {","					","					var value = params[0];","					this.radioAny.value = value;","					","					this.setClassFromState();","					","					inputEx.RadioField.superclass.onChange.call(this,e);","					","				}, this, true);","				","				// Update radio field style after editing anyField content !","            if(this.anyField.el) {","               Y.one(this.anyField.el).on('blur', this.onBlur, this, true);","            }","			}","		},","		","		/**","		 * Add an additional class to the currently selected inputEx-RadioField-choice","		 * @method setSelectedClass","		 */","		setSelectedClass: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				if (this.choicesList[i].node.firstChild.checked) {","					Y.one(this.choicesList[i].node).addClass(\"inputEx-selected\");","				} else {","					Y.one(this.choicesList[i].node).removeClass(\"inputEx-selected\");","				}","				","			}","		},","		","		/**","		 * @method setClassFromState","		 */","		setClassFromState: function () {","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.setClassFromState.call(this);","			","			this.setSelectedClass();","			","		},","		","		/**","		 * Function called when the checkbox is toggled","		 * @method onChange","		 * @param {Event} e The original 'change' event","		 */","		onChange: function (e) {","			var target = e.target._node;","			","			// Enable/disable the \"any\" field","			if (this.allowAnyChoice) {","				","				var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;","				","				// if clicked another choice than allowAnyChoice","				if (!clickedOnAllowAnyChoice) {","					this.anyField.disable();","				} else {","					this.anyField.enable();","					lang.later( 50 , this.anyField , \"focus\");","				}","				","			}","			","			this.setSelectedClass();","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.onChange.call(this,e);","		},","		","		/**","		 * Get the field value","		 * @method getValue","		 * @return {Any} ","		 */","		getValue: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				if (this.choicesList[i].node.firstChild.checked) {","					","					if (this.radioAny && this.radioAny == this.choicesList[i].node.firstChild) {","						return this.anyField.getValue();","					}","					","					return this.choicesList[i].value;","				}","			}","			","			return \"\";","		},","		","		/**","		 * Set the value of the Radio","		 * @method setValue","		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		setValue: function (value, sendUpdatedEvt) {","			","			var checkAny = true, valueFound = false, i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				// valueFound is a useful when \"real\" choice has a value equal to allowAny choice default value","				// so we check only the first value-matching radio button","				if (value === this.choicesList[i].value && !valueFound) {","					","					// check the radio","					this.choicesList[i].node.firstChild.checked = true;","					","					// radioAny should not be checked (unless current choice is radioAny !)","					checkAny = this.radioAny && (i === length - 1) ? true : false;","					","					// raise valueFound flag, all other radios should be unchecked now","					valueFound = true;","					","				} else {","					this.choicesList[i].node.firstChild.checked = false;","				}","				","			}","			","			// Option allowAny","			if (this.radioAny) {","				","				if (checkAny) {","					this.radioAny.checked = true;","					this.radioAny.value = value;","					this.anyField.enable();","					this.anyField.setValue(value, false);","				} else {","					this.anyField.disable();","				}","			}","			","			// call parent class method to set style and fire updated event","			inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);","		},","		","		/**","		 * Clear the field by setting the field value to this.options.value","		 * @method clear","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		clear: function (sendUpdatedEvt) {","			","			if (this.radioAny){","				this.anyField.setValue(this.options.allowAny.value, false);","			}","		","			inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);","		},","		","		/**","		 * Should return true if empty","		 * @method isEmpty","		 */","		isEmpty: function () {","			","			var i, length, radioInput;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				radioInput = this.choicesList[i].node.firstChild;","				","				if (radioInput.checked) {","					","					// if \"any\" option checked","					if (this.radioAny && this.radioAny == radioInput) {","						","						return this.anyField.getValue() === '';","						","					} else {","						","						return false;","						","					}","				}","			}","			","			return true;","			","		},","		","		/**","		 * @method validate","		 */","		validate: function () {","			","			var i, length, radioInput, anyVal;","			","			if (this.options.allowAny) {","				","				for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","					","					radioInput = this.choicesList[i].node.firstChild;","					","					if (radioInput.checked) {","						","						// if \"any\" option checked","						if (this.radioAny && this.radioAny == radioInput) {","							anyVal = this.anyField.getValue();","							return this.anyField.validate() && this.options.allowAny.validator(anyVal);","						}","					}","				}","			}","			","			return true;","		},","		","		/**","		 * Disable the field","		 * @method disable","		 */","		disable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.disableChoice(this.choicesList[i], false);","			}","			","		},","	","		/**","		 * Enable the field","		 * @method enable","		 */","		enable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.enableChoice(this.choicesList[i]);","			}","			","		},","		","		/**","		 * @method createChoiceNode","		 */","		createChoiceNode: function (choice) {","			","			var div, radioId, radioNode, labelNode;","			","			div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});","			","			// radioId MUST be different for each option, to allow click on label (with for:id trick)","			if(!inputEx.RadioField._idCounter) {","			   inputEx.RadioField._idCounter = 0;","			}","			radioId = \"_inputex_radioId\"+inputEx.RadioField._idCounter;","			inputEx.RadioField._idCounter++;","			","			radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });","			div.appendChild(radioNode);","			","			if (choice.label.length > 0) {","				labelNode = inputEx.cn('label', {\"for\": radioId, className: 'inputEx-RadioField-rightLabel'}, null, \"\"+choice.label);","				div.appendChild(labelNode);","			}","			","			return div;","			","		},","		","		/**","		 * @method removeChoiceNode","		 */","		removeChoiceNode: function (node) {","			","			// remove from selector","			// ","			//   -> style.display = 'none' would work only on FF (when node is an <option>)","			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM","			//","			this.fieldContainer.removeChild(node);","			","		},","		","		/**","		 * @method disableChoiceNode","		 */","		disableChoiceNode: function (node) {","			","			//node.firstChild.disabled = \"disabled\";","			node.firstChild.disabled = true;","		},","		","		/**","		 * @method enableChoiceNode","		 */","		enableChoiceNode: function (node) {","			","			//node.firstChild.removeAttribute(\"disabled\");","			node.firstChild.disabled = false;","			","		},","		","		/**","		 * Attach an <option> node to the <select> at the specified position","		 * @method appendChoiceNode","		 * @param {HTMLElement} node The <option> node to attach to the <select>","		 * @param {Int} position The position of the choice in choicesList (may not be the \"real\" position in DOM)","		 */","		appendChoiceNode: function (node, position) {","			","			var domPosition, i;","			","			// Compute real DOM position (since previous choices in choicesList may be hidden)","			domPosition = 0;","			","			for (i = 0; i < position; i += 1) {","				","				if (this.choicesList[i].visible) {","					","					domPosition += 1;","					","				}","				","			}","			","			// Insert in DOM","			if (domPosition < this.fieldContainer.childNodes.length) {","				Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);","			} else {","				","				this.fieldContainer.appendChild(node);","				","			}","		}","		","	});","	","	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)","	Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);","	","	","	// Register this class as \"radio\" type","	inputEx.registerType(\"radio\", inputEx.RadioField, [","		{","			type: 'list',","			name: 'choices',","			label: 'Choices',","			elementType: {","				type: 'group',","				fields: [","					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)","					{ label: 'Label', name: 'label' } // optional : if left empty, label is not created","				]","			},","			value: [],","			required: true","		},","		{type: 'boolean', label: 'Allow custom value', name: 'allowAny', value: false  }","	]);","	","","}, '@VERSION@', {\"requires\": [\"selector\", \"event-delegate\", \"inputex-field\", \"inputex-choice\", \"inputex-string\"], \"ix_provides\": \"radio\"});"];
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].lines = {"1":0,"6":0,"21":0,"23":0,"26":0,"28":0,"29":0,"30":0,"36":0,"45":0,"47":0,"50":0,"53":0,"54":0,"55":0,"61":0,"63":0,"65":0,"66":0,"72":0,"76":0,"77":0,"79":0,"80":0,"81":0,"82":0,"83":0,"94":0,"96":0,"98":0,"100":0,"102":0,"107":0,"109":0,"111":0,"113":0,"114":0,"116":0,"117":0,"120":0,"123":0,"124":0,"125":0,"126":0,"129":0,"131":0,"132":0,"133":0,"134":0,"150":0,"153":0,"154":0,"158":0,"159":0,"162":0,"163":0,"167":0,"169":0,"171":0,"172":0,"174":0,"176":0,"181":0,"182":0,"193":0,"195":0,"197":0,"198":0,"200":0,"212":0,"214":0,"224":0,"227":0,"229":0,"232":0,"233":0,"235":0,"236":0,"241":0,"244":0,"254":0,"256":0,"258":0,"260":0,"261":0,"264":0,"268":0,"279":0,"281":0,"285":0,"288":0,"291":0,"294":0,"297":0,"303":0,"305":0,"306":0,"307":0,"308":0,"309":0,"311":0,"316":0,"326":0,"327":0,"330":0,"339":0,"341":0,"343":0,"345":0,"348":0,"350":0,"354":0,"360":0,"369":0,"371":0,"373":0,"375":0,"377":0,"380":0,"381":0,"382":0,"388":0,"397":0,"399":0,"400":0,"411":0,"413":0,"414":0,"424":0,"426":0,"429":0,"430":0,"432":0,"433":0,"435":0,"436":0,"438":0,"439":0,"440":0,"443":0,"457":0,"467":0,"476":0,"488":0,"491":0,"493":0,"495":0,"497":0,"504":0,"505":0,"508":0,"516":0,"520":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].functions = {"(anonymous 2):29":0,"RadioField:21":0,"validator:81":0,"setOptions:43":0,"renderComponent:92":0,"(anonymous 3):153":0,"(anonymous 4):158":0,"(anonymous 5):162":0,"(anonymous 6):169":0,"initEvents:145":0,"setSelectedClass:191":0,"setClassFromState:209":0,"(anonymous 7):229":0,"onChange:223":0,"getValue:252":0,"setValue:277":0,"clear:324":0,"isEmpty:337":0,"validate:367":0,"disable:395":0,"enable:409":0,"createChoiceNode:422":0,"removeChoiceNode:450":0,"disableChoiceNode:464":0,"enableChoiceNode:473":0,"appendChoiceNode:486":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].coveredLines = 153;
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
for (i = 0, length = choices.length ; i < length ; i += 1 ) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 102);
this.addChoice(choices[i]);
				
			}
			
			// Build a "any" radio combined with a StringField
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 107);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 109);
this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 111);
this.radioAny = this.allowAnyChoice.node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 113);
this.anyField = new inputEx(this.options.allowAny.field);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 114);
this.anyField.disable();
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 116);
Y.one(this.radioAny).setStyle("float","left");
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 117);
Y.one(this.anyField.getEl()).setStyle("float","left");
				
				// Hack for firefox 3.5+
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 120);
if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( "marginTop","0.2em"); }
				
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 123);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 124);
sep = inputEx.cn("div",null,{marginRight:"3px"},this.options.allowAny.separators[0] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 125);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 126);
this.allowAnyChoice.node.appendChild(sep);
				}
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 129);
this.allowAnyChoice.node.appendChild(this.anyField.getEl());
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 131);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 132);
sep = inputEx.cn("div",null,{marginLeft:"3px"},this.options.allowAny.separators[1] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 133);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 134);
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
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "initEvents", 145);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 150);
var fieldContainer = Y.one(this.fieldContainer), that = this;
			
			// Change event (IE does not fire "change" event, so listen to click instead)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 153);
fieldContainer.delegate(Y.UA.ie ? "click" : "change", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 3)", 153);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 154);
that.onChange(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// Focus / Blur events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 158);
fieldContainer.delegate("focusin", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 4)", 158);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 159);
that.onFocus(e);
			}, ".inputEx-RadioField-radio", "input");
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 162);
fieldContainer.delegate("focusout", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 5)", 162);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 163);
that.onBlur(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// AnyField events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 167);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 169);
this.anyField.on('updated', function (e, params) {
					
					_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 6)", 169);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 171);
var value = params[0];
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 172);
this.radioAny.value = value;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 174);
this.setClassFromState();
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 176);
inputEx.RadioField.superclass.onChange.call(this,e);
					
				}, this, true);
				
				// Update radio field style after editing anyField content !
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 181);
if(this.anyField.el) {
               _yuitest_coverline("build/inputex-radio/inputex-radio.js", 182);
Y.one(this.anyField.el).on('blur', this.onBlur, this, true);
            }
			}
		},
		
		/**
		 * Add an additional class to the currently selected inputEx-RadioField-choice
		 * @method setSelectedClass
		 */
		setSelectedClass: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setSelectedClass", 191);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 193);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 195);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 197);
if (this.choicesList[i].node.firstChild.checked) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 198);
Y.one(this.choicesList[i].node).addClass("inputEx-selected");
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 200);
Y.one(this.choicesList[i].node).removeClass("inputEx-selected");
				}
				
			}
		},
		
		/**
		 * @method setClassFromState
		 */
		setClassFromState: function () {
			
			// call superclass method (will fire updated event)
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setClassFromState", 209);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 212);
inputEx.RadioField.superclass.setClassFromState.call(this);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 214);
this.setSelectedClass();
			
		},
		
		/**
		 * Function called when the checkbox is toggled
		 * @method onChange
		 * @param {Event} e The original 'change' event
		 */
		onChange: function (e) {
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "onChange", 223);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 224);
var target = e.target._node;
			
			// Enable/disable the "any" field
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 227);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 229);
var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { _yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 7)", 229);
return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;
				
				// if clicked another choice than allowAnyChoice
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 232);
if (!clickedOnAllowAnyChoice) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 233);
this.anyField.disable();
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 235);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 236);
lang.later( 50 , this.anyField , "focus");
				}
				
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 241);
this.setSelectedClass();
			
			// call superclass method (will fire updated event)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 244);
inputEx.RadioField.superclass.onChange.call(this,e);
		},
		
		/**
		 * Get the field value
		 * @method getValue
		 * @return {Any} 
		 */
		getValue: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "getValue", 252);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 254);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 256);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 258);
if (this.choicesList[i].node.firstChild.checked) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 260);
if (this.radioAny && this.radioAny == this.choicesList[i].node.firstChild) {
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 261);
return this.anyField.getValue();
					}
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 264);
return this.choicesList[i].value;
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 268);
return "";
		},
		
		/**
		 * Set the value of the Radio
		 * @method setValue
		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setValue", 277);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 279);
var checkAny = true, valueFound = false, i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 281);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				// valueFound is a useful when "real" choice has a value equal to allowAny choice default value
				// so we check only the first value-matching radio button
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 285);
if (value === this.choicesList[i].value && !valueFound) {
					
					// check the radio
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 288);
this.choicesList[i].node.firstChild.checked = true;
					
					// radioAny should not be checked (unless current choice is radioAny !)
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 291);
checkAny = this.radioAny && (i === length - 1) ? true : false;
					
					// raise valueFound flag, all other radios should be unchecked now
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 294);
valueFound = true;
					
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 297);
this.choicesList[i].node.firstChild.checked = false;
				}
				
			}
			
			// Option allowAny
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 303);
if (this.radioAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 305);
if (checkAny) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 306);
this.radioAny.checked = true;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 307);
this.radioAny.value = value;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 308);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 309);
this.anyField.setValue(value, false);
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 311);
this.anyField.disable();
				}
			}
			
			// call parent class method to set style and fire updated event
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 316);
inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
		
		/**
		 * Clear the field by setting the field value to this.options.value
		 * @method clear
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		clear: function (sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "clear", 324);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 326);
if (this.radioAny){
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 327);
this.anyField.setValue(this.options.allowAny.value, false);
			}
		
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 330);
inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);
		},
		
		/**
		 * Should return true if empty
		 * @method isEmpty
		 */
		isEmpty: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "isEmpty", 337);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 339);
var i, length, radioInput;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 341);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 343);
radioInput = this.choicesList[i].node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 345);
if (radioInput.checked) {
					
					// if "any" option checked
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 348);
if (this.radioAny && this.radioAny == radioInput) {
						
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 350);
return this.anyField.getValue() === '';
						
					} else {
						
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 354);
return false;
						
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 360);
return true;
			
		},
		
		/**
		 * @method validate
		 */
		validate: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "validate", 367);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 369);
var i, length, radioInput, anyVal;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 371);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 373);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 375);
radioInput = this.choicesList[i].node.firstChild;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 377);
if (radioInput.checked) {
						
						// if "any" option checked
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 380);
if (this.radioAny && this.radioAny == radioInput) {
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 381);
anyVal = this.anyField.getValue();
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 382);
return this.anyField.validate() && this.options.allowAny.validator(anyVal);
						}
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 388);
return true;
		},
		
		/**
		 * Disable the field
		 * @method disable
		 */
		disable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disable", 395);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 397);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 399);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 400);
this.disableChoice(this.choicesList[i], false);
			}
			
		},
	
		/**
		 * Enable the field
		 * @method enable
		 */
		enable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enable", 409);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 411);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 413);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 414);
this.enableChoice(this.choicesList[i]);
			}
			
		},
		
		/**
		 * @method createChoiceNode
		 */
		createChoiceNode: function (choice) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "createChoiceNode", 422);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 424);
var div, radioId, radioNode, labelNode;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 426);
div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});
			
			// radioId MUST be different for each option, to allow click on label (with for:id trick)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 429);
if(!inputEx.RadioField._idCounter) {
			   _yuitest_coverline("build/inputex-radio/inputex-radio.js", 430);
inputEx.RadioField._idCounter = 0;
			}
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 432);
radioId = "_inputex_radioId"+inputEx.RadioField._idCounter;
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 433);
inputEx.RadioField._idCounter++;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 435);
radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 436);
div.appendChild(radioNode);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 438);
if (choice.label.length > 0) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 439);
labelNode = inputEx.cn('label', {"for": radioId, className: 'inputEx-RadioField-rightLabel'}, null, ""+choice.label);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 440);
div.appendChild(labelNode);
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 443);
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
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "removeChoiceNode", 450);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 457);
this.fieldContainer.removeChild(node);
			
		},
		
		/**
		 * @method disableChoiceNode
		 */
		disableChoiceNode: function (node) {
			
			//node.firstChild.disabled = "disabled";
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disableChoiceNode", 464);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 467);
node.firstChild.disabled = true;
		},
		
		/**
		 * @method enableChoiceNode
		 */
		enableChoiceNode: function (node) {
			
			//node.firstChild.removeAttribute("disabled");
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enableChoiceNode", 473);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 476);
node.firstChild.disabled = false;
			
		},
		
		/**
		 * Attach an <option> node to the <select> at the specified position
		 * @method appendChoiceNode
		 * @param {HTMLElement} node The <option> node to attach to the <select>
		 * @param {Int} position The position of the choice in choicesList (may not be the "real" position in DOM)
		 */
		appendChoiceNode: function (node, position) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "appendChoiceNode", 486);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 488);
var domPosition, i;
			
			// Compute real DOM position (since previous choices in choicesList may be hidden)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 491);
domPosition = 0;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 493);
for (i = 0; i < position; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 495);
if (this.choicesList[i].visible) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 497);
domPosition += 1;
					
				}
				
			}
			
			// Insert in DOM
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 504);
if (domPosition < this.fieldContainer.childNodes.length) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 505);
Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);
			} else {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 508);
this.fieldContainer.appendChild(node);
				
			}
		}
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 516);
Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);
	
	
	// Register this class as "radio" type
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 520);
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
	

}, '@VERSION@', {"requires": ["selector", "event-delegate", "inputex-field", "inputex-choice", "inputex-string"], "ix_provides": "radio"});
