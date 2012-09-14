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
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].code=["YUI.add('inputex-radio', function (Y, NAME) {","","/**"," * @module inputex-radio"," */","YUI.add(\"inputex-radio\", function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","	","	/**","	 * Create a radio button. Here are the added options :","	 * <ul>","	 *	 <li>choices: list of choices (array of string)</li>","	 *	 <li>values: list of returned values (array )</li>","	 *	 <li>allowAny: add an option with a string field</li>","	 * </ul>","	 * @class inputEx.RadioField","	 * @extends inputEx.Field","	 * @constructor","	 * @param {Object} options inputEx.Field options object","	 */","	inputEx.RadioField = function (options) {","		","		inputEx.RadioField.superclass.constructor.call(this,options);","		","		// IE BUG: doesn't want to set the value if the node is not in the DOM","		if (Y.UA.ie && !lang.isUndefined(this.options.value)) {","			// Set the initial value, use setTimeout to escape the stack (for nested usage in Group or Form)","			var that = this;","			setTimeout(function () {","				that.setValue(that.options.value, false);","			},0);","		}","		","	};","		","	Y.extend(inputEx.RadioField, inputEx.Field, {","		","		/**","		 * Adds the Radio button specific options","		 * @method setOptions","		 * @param {Object} options Options object as passed to the constructor","		 */","		setOptions: function (options) {","			","			var i, length;","			","			inputEx.RadioField.superclass.setOptions.call(this, options);","			","			// Display mode","			this.options.display = options.display === \"vertically\" ? \"vertically\" : \"inline\"; // default \"inline\"","			","			// Classname","			this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';","			if (this.options.display === \"vertically\") {","				this.options.className +=  ' inputEx-RadioField-Vertically';","			}","			","			// Choices creation","			","			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)","			if (lang.isArray(options.values)) {","				","				this.options.choices = [];","				","				for (i = 0, length = options.values.length; i < length; i += 1) {","					this.options.choices.push({ value: options.values[i], label: options.choices[i] });","				}","			","			// New pattern to define choices","			} else {","				","				this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]","				","			}","			","			if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {","				this.options.allowAny = false;","			} else {","				this.options.allowAny = {};","				if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}","				this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {return true;};","				this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : \"\";","				this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: \"string\", value: this.options.allowAny.value } : options.allowAny.field;","			}","			","		},","		","		/**","		 * Render the checkbox and the hidden field","		 * @method renderComponent","		 */","		renderComponent: function () {","			","			var choices, length, i, sep;","			","			this.choicesList = [];","			","			choices = this.options.choices;","			","			for (i = 0, length = choices.length ; i < length ; i += 1 ) {","				","				this.addChoice(choices[i]);","				","			}","			","			// Build a \"any\" radio combined with a StringField","			if (this.options.allowAny) {","				","				this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });","				","				this.radioAny = this.allowAnyChoice.node.firstChild;","				","				this.anyField = new inputEx(this.options.allowAny.field);","				this.anyField.disable();","				","				Y.one(this.radioAny).setStyle(\"float\",\"left\");","				Y.one(this.anyField.getEl()).setStyle(\"float\",\"left\");","				","				// Hack for firefox 3.5+","				if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( \"marginTop\",\"0.2em\"); }","				","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginRight:\"3px\"},this.options.allowAny.separators[0] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","				this.allowAnyChoice.node.appendChild(this.anyField.getEl());","				","				if (this.options.allowAny.separators) {","					sep = inputEx.cn(\"div\",null,{marginLeft:\"3px\"},this.options.allowAny.separators[1] || '');","					Y.one(sep).setStyle( \"float\",\"left\");","					this.allowAnyChoice.node.appendChild(sep);","				}","				","			}","			","		},","		","		/**","		 * Listen for change events on all radios","		 * @method initEvents","		 */","		initEvents: function () {","			","			// Delegate event listening because list of choices is dynamic","			// so we can't listen on each <input type=\"radio\" class='inputEx-RadioField-radio' />","			","			var fieldContainer = Y.one(this.fieldContainer), that = this;","			","			// Change event (IE does not fire \"change\" event, so listen to click instead)","			fieldContainer.delegate(Y.UA.ie ? \"click\" : \"change\", function(e, matchedEl, container) {","				that.onChange(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// Focus / Blur events","			fieldContainer.delegate(\"focusin\", function(e, matchedEl, container) {","				that.onFocus(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			fieldContainer.delegate(\"focusout\", function(e, matchedEl, container) {","				that.onBlur(e);","			}, \".inputEx-RadioField-radio\", \"input\");","			","			// AnyField events","			if (this.allowAnyChoice) {","				","				this.anyField.on('updated', function (e, params) {","					","					var value = params[0];","					this.radioAny.value = value;","					","					this.setClassFromState();","					","					inputEx.RadioField.superclass.onChange.call(this,e);","					","				}, this, true);","				","				// Update radio field style after editing anyField content !","            if(this.anyField.el) {","               Y.one(this.anyField.el).on('blur', this.onBlur, this, true);","            }","			}","		},","		","		/**","		 * Add an additional class to the currently selected inputEx-RadioField-choice","		 * @method setSelectedClass","		 */","		setSelectedClass: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				if (this.choicesList[i].node.firstChild.checked) {","					Y.one(this.choicesList[i].node).addClass(\"inputEx-selected\");","				} else {","					Y.one(this.choicesList[i].node).removeClass(\"inputEx-selected\");","				}","				","			}","		},","		","		/**","		 * @method setClassFromState","		 */","		setClassFromState: function () {","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.setClassFromState.call(this);","			","			this.setSelectedClass();","			","		},","		","		/**","		 * Function called when the checkbox is toggled","		 * @method onChange","		 * @param {Event} e The original 'change' event","		 */","		onChange: function (e) {","			var target = e.target._node;","			","			// Enable/disable the \"any\" field","			if (this.allowAnyChoice) {","				","				var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;","				","				// if clicked another choice than allowAnyChoice","				if (!clickedOnAllowAnyChoice) {","					this.anyField.disable();","				} else {","					this.anyField.enable();","					lang.later( 50 , this.anyField , \"focus\");","				}","				","			}","			","			this.setSelectedClass();","			","			// call superclass method (will fire updated event)","			inputEx.RadioField.superclass.onChange.call(this,e);","		},","		","		/**","		 * Get the field value","		 * @method getValue","		 * @return {Any} ","		 */","		getValue: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				if (this.choicesList[i].node.firstChild.checked) {","					","					if (this.radioAny && this.radioAny == this.choicesList[i].node.firstChild) {","						return this.anyField.getValue();","					}","					","					return this.choicesList[i].value;","				}","			}","			","			return \"\";","		},","		","		/**","		 * Set the value of the Radio","		 * @method setValue","		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		setValue: function (value, sendUpdatedEvt) {","			","			var checkAny = true, valueFound = false, i, length;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				// valueFound is a useful when \"real\" choice has a value equal to allowAny choice default value","				// so we check only the first value-matching radio button","				if (value === this.choicesList[i].value && !valueFound) {","					","					// check the radio","					this.choicesList[i].node.firstChild.checked = true;","					","					// radioAny should not be checked (unless current choice is radioAny !)","					checkAny = this.radioAny && (i === length - 1) ? true : false;","					","					// raise valueFound flag, all other radios should be unchecked now","					valueFound = true;","					","				} else {","					this.choicesList[i].node.firstChild.checked = false;","				}","				","			}","			","			// Option allowAny","			if (this.radioAny) {","				","				if (checkAny) {","					this.radioAny.checked = true;","					this.radioAny.value = value;","					this.anyField.enable();","					this.anyField.setValue(value, false);","				} else {","					this.anyField.disable();","				}","			}","			","			// call parent class method to set style and fire updated event","			inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);","		},","		","		/**","		 * Clear the field by setting the field value to this.options.value","		 * @method clear","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)","		 */","		clear: function (sendUpdatedEvt) {","			","			if (this.radioAny){","				this.anyField.setValue(this.options.allowAny.value, false);","			}","		","			inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);","		},","		","		/**","		 * Should return true if empty","		 * @method isEmpty","		 */","		isEmpty: function () {","			","			var i, length, radioInput;","			","			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","				","				radioInput = this.choicesList[i].node.firstChild;","				","				if (radioInput.checked) {","					","					// if \"any\" option checked","					if (this.radioAny && this.radioAny == radioInput) {","						","						return this.anyField.getValue() === '';","						","					} else {","						","						return false;","						","					}","				}","			}","			","			return true;","			","		},","		","		/**","		 * @method validate","		 */","		validate: function () {","			","			var i, length, radioInput, anyVal;","			","			if (this.options.allowAny) {","				","				for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {","					","					radioInput = this.choicesList[i].node.firstChild;","					","					if (radioInput.checked) {","						","						// if \"any\" option checked","						if (this.radioAny && this.radioAny == radioInput) {","							anyVal = this.anyField.getValue();","							return this.anyField.validate() && this.options.allowAny.validator(anyVal);","						}","					}","				}","			}","			","			return true;","		},","		","		/**","		 * Disable the field","		 * @method disable","		 */","		disable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.disableChoice(this.choicesList[i], false);","			}","			","		},","	","		/**","		 * Enable the field","		 * @method enable","		 */","		enable: function () {","			","			var i, length;","			","			for (i = 0, length = this.choicesList.length; i < length; i += 1) {","				this.enableChoice(this.choicesList[i]);","			}","			","		},","		","		/**","		 * @method createChoiceNode","		 */","		createChoiceNode: function (choice) {","			","			var div, radioId, radioNode, labelNode;","			","			div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});","			","			// radioId MUST be different for each option, to allow click on label (with for:id trick)","			if(!inputEx.RadioField._idCounter) {","			   inputEx.RadioField._idCounter = 0;","			}","			radioId = \"_inputex_radioId\"+inputEx.RadioField._idCounter;","			inputEx.RadioField._idCounter++;","			","			radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });","			div.appendChild(radioNode);","			","			if (choice.label.length > 0) {","				labelNode = inputEx.cn('label', {\"for\": radioId, className: 'inputEx-RadioField-rightLabel'}, null, \"\"+choice.label);","				div.appendChild(labelNode);","			}","			","			return div;","			","		},","		","		/**","		 * @method removeChoiceNode","		 */","		removeChoiceNode: function (node) {","			","			// remove from selector","			// ","			//   -> style.display = 'none' would work only on FF (when node is an <option>)","			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM","			//","			this.fieldContainer.removeChild(node);","			","		},","		","		/**","		 * @method disableChoiceNode","		 */","		disableChoiceNode: function (node) {","			","			//node.firstChild.disabled = \"disabled\";","			node.firstChild.disabled = true;","		},","		","		/**","		 * @method enableChoiceNode","		 */","		enableChoiceNode: function (node) {","			","			//node.firstChild.removeAttribute(\"disabled\");","			node.firstChild.disabled = false;","			","		},","		","		/**","		 * Attach an <option> node to the <select> at the specified position","		 * @method appendChoiceNode","		 * @param {HTMLElement} node The <option> node to attach to the <select>","		 * @param {Int} position The position of the choice in choicesList (may not be the \"real\" position in DOM)","		 */","		appendChoiceNode: function (node, position) {","			","			var domPosition, i;","			","			// Compute real DOM position (since previous choices in choicesList may be hidden)","			domPosition = 0;","			","			for (i = 0; i < position; i += 1) {","				","				if (this.choicesList[i].visible) {","					","					domPosition += 1;","					","				}","				","			}","			","			// Insert in DOM","			if (domPosition < this.fieldContainer.childNodes.length) {","				Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);","			} else {","				","				this.fieldContainer.appendChild(node);","				","			}","		}","		","	});","	","	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)","	Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);","	","	","	// Register this class as \"radio\" type","	inputEx.registerType(\"radio\", inputEx.RadioField, [","		{","			type: 'list',","			name: 'choices',","			label: 'Choices',","			elementType: {","				type: 'group',","				fields: [","					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)","					{ label: 'Label', name: 'label' } // optional : if left empty, label is not created","				]","			},","			value: [],","			required: true","		},","		{type: 'boolean', label: 'Allow custom value', name: 'allowAny', value: false  }","	]);","	","}, '3.1.0',{","  requires: ['selector','event-delegate','inputex-field','inputex-choice','inputex-string']","});","	","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].lines = {"1":0,"6":0,"8":0,"23":0,"25":0,"28":0,"30":0,"31":0,"32":0,"38":0,"47":0,"49":0,"52":0,"55":0,"56":0,"57":0,"63":0,"65":0,"67":0,"68":0,"74":0,"78":0,"79":0,"81":0,"82":0,"83":0,"84":0,"85":0,"96":0,"98":0,"100":0,"102":0,"104":0,"109":0,"111":0,"113":0,"115":0,"116":0,"118":0,"119":0,"122":0,"125":0,"126":0,"127":0,"128":0,"131":0,"133":0,"134":0,"135":0,"136":0,"152":0,"155":0,"156":0,"160":0,"161":0,"164":0,"165":0,"169":0,"171":0,"173":0,"174":0,"176":0,"178":0,"183":0,"184":0,"195":0,"197":0,"199":0,"200":0,"202":0,"214":0,"216":0,"226":0,"229":0,"231":0,"234":0,"235":0,"237":0,"238":0,"243":0,"246":0,"256":0,"258":0,"260":0,"262":0,"263":0,"266":0,"270":0,"281":0,"283":0,"287":0,"290":0,"293":0,"296":0,"299":0,"305":0,"307":0,"308":0,"309":0,"310":0,"311":0,"313":0,"318":0,"328":0,"329":0,"332":0,"341":0,"343":0,"345":0,"347":0,"350":0,"352":0,"356":0,"362":0,"371":0,"373":0,"375":0,"377":0,"379":0,"382":0,"383":0,"384":0,"390":0,"399":0,"401":0,"402":0,"413":0,"415":0,"416":0,"426":0,"428":0,"431":0,"432":0,"434":0,"435":0,"437":0,"438":0,"440":0,"441":0,"442":0,"445":0,"459":0,"469":0,"478":0,"490":0,"493":0,"495":0,"497":0,"499":0,"506":0,"507":0,"510":0,"518":0,"522":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].functions = {"(anonymous 3):31":0,"RadioField:23":0,"validator:83":0,"setOptions:45":0,"renderComponent:94":0,"(anonymous 4):155":0,"(anonymous 5):160":0,"(anonymous 6):164":0,"(anonymous 7):171":0,"initEvents:147":0,"setSelectedClass:193":0,"setClassFromState:211":0,"(anonymous 8):231":0,"onChange:225":0,"getValue:254":0,"setValue:279":0,"clear:326":0,"isEmpty:339":0,"validate:369":0,"disable:397":0,"enable:411":0,"createChoiceNode:424":0,"removeChoiceNode:452":0,"disableChoiceNode:466":0,"enableChoiceNode:475":0,"appendChoiceNode:488":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].coveredLines = 154;
_yuitest_coverage["build/inputex-radio/inputex-radio.js"].coveredFunctions = 28;
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 1);
YUI.add('inputex-radio', function (Y, NAME) {

/**
 * @module inputex-radio
 */
_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 6);
YUI.add("inputex-radio", function(Y){

   _yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 8);
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
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 23);
inputEx.RadioField = function (options) {
		
		_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "RadioField", 23);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 25);
inputEx.RadioField.superclass.constructor.call(this,options);
		
		// IE BUG: doesn't want to set the value if the node is not in the DOM
		_yuitest_coverline("build/inputex-radio/inputex-radio.js", 28);
if (Y.UA.ie && !lang.isUndefined(this.options.value)) {
			// Set the initial value, use setTimeout to escape the stack (for nested usage in Group or Form)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 30);
var that = this;
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 31);
setTimeout(function () {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 3)", 31);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 32);
that.setValue(that.options.value, false);
			},0);
		}
		
	};
		
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 38);
Y.extend(inputEx.RadioField, inputEx.Field, {
		
		/**
		 * Adds the Radio button specific options
		 * @method setOptions
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setOptions", 45);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 47);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 49);
inputEx.RadioField.superclass.setOptions.call(this, options);
			
			// Display mode
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 52);
this.options.display = options.display === "vertically" ? "vertically" : "inline"; // default "inline"
			
			// Classname
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 55);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 56);
if (this.options.display === "vertically") {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 57);
this.options.className +=  ' inputEx-RadioField-Vertically';
			}
			
			// Choices creation
			
			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 63);
if (lang.isArray(options.values)) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 65);
this.options.choices = [];
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 67);
for (i = 0, length = options.values.length; i < length; i += 1) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 68);
this.options.choices.push({ value: options.values[i], label: options.choices[i] });
				}
			
			// New pattern to define choices
			} else {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 74);
this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]
				
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 78);
if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 79);
this.options.allowAny = false;
			} else {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 81);
this.options.allowAny = {};
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 82);
if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 83);
this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "validator", 83);
return true;};
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 84);
this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : "";
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 85);
this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: "string", value: this.options.allowAny.value } : options.allowAny.field;
			}
			
		},
		
		/**
		 * Render the checkbox and the hidden field
		 * @method renderComponent
		 */
		renderComponent: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "renderComponent", 94);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 96);
var choices, length, i, sep;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 98);
this.choicesList = [];
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 100);
choices = this.options.choices;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 102);
for (i = 0, length = choices.length ; i < length ; i += 1 ) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 104);
this.addChoice(choices[i]);
				
			}
			
			// Build a "any" radio combined with a StringField
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 109);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 111);
this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 113);
this.radioAny = this.allowAnyChoice.node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 115);
this.anyField = new inputEx(this.options.allowAny.field);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 116);
this.anyField.disable();
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 118);
Y.one(this.radioAny).setStyle("float","left");
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 119);
Y.one(this.anyField.getEl()).setStyle("float","left");
				
				// Hack for firefox 3.5+
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 122);
if (Y.UA.gecko >= 1.91) { Y.one(this.radioAny).setStyle( "marginTop","0.2em"); }
				
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 125);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 126);
sep = inputEx.cn("div",null,{marginRight:"3px"},this.options.allowAny.separators[0] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 127);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 128);
this.allowAnyChoice.node.appendChild(sep);
				}
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 131);
this.allowAnyChoice.node.appendChild(this.anyField.getEl());
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 133);
if (this.options.allowAny.separators) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 134);
sep = inputEx.cn("div",null,{marginLeft:"3px"},this.options.allowAny.separators[1] || '');
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 135);
Y.one(sep).setStyle( "float","left");
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 136);
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
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "initEvents", 147);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 152);
var fieldContainer = Y.one(this.fieldContainer), that = this;
			
			// Change event (IE does not fire "change" event, so listen to click instead)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 155);
fieldContainer.delegate(Y.UA.ie ? "click" : "change", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 4)", 155);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 156);
that.onChange(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// Focus / Blur events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 160);
fieldContainer.delegate("focusin", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 5)", 160);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 161);
that.onFocus(e);
			}, ".inputEx-RadioField-radio", "input");
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 164);
fieldContainer.delegate("focusout", function(e, matchedEl, container) {
				_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 6)", 164);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 165);
that.onBlur(e);
			}, ".inputEx-RadioField-radio", "input");
			
			// AnyField events
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 169);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 171);
this.anyField.on('updated', function (e, params) {
					
					_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 7)", 171);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 173);
var value = params[0];
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 174);
this.radioAny.value = value;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 176);
this.setClassFromState();
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 178);
inputEx.RadioField.superclass.onChange.call(this,e);
					
				}, this, true);
				
				// Update radio field style after editing anyField content !
            _yuitest_coverline("build/inputex-radio/inputex-radio.js", 183);
if(this.anyField.el) {
               _yuitest_coverline("build/inputex-radio/inputex-radio.js", 184);
Y.one(this.anyField.el).on('blur', this.onBlur, this, true);
            }
			}
		},
		
		/**
		 * Add an additional class to the currently selected inputEx-RadioField-choice
		 * @method setSelectedClass
		 */
		setSelectedClass: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setSelectedClass", 193);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 195);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 197);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 199);
if (this.choicesList[i].node.firstChild.checked) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 200);
Y.one(this.choicesList[i].node).addClass("inputEx-selected");
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 202);
Y.one(this.choicesList[i].node).removeClass("inputEx-selected");
				}
				
			}
		},
		
		/**
		 * @method setClassFromState
		 */
		setClassFromState: function () {
			
			// call superclass method (will fire updated event)
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setClassFromState", 211);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 214);
inputEx.RadioField.superclass.setClassFromState.call(this);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 216);
this.setSelectedClass();
			
		},
		
		/**
		 * Function called when the checkbox is toggled
		 * @method onChange
		 * @param {Event} e The original 'change' event
		 */
		onChange: function (e) {
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "onChange", 225);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 226);
var target = e.target._node;
			
			// Enable/disable the "any" field
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 229);
if (this.allowAnyChoice) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 231);
var clickedOnAllowAnyChoice = inputEx.indexOf(target, this.choicesList, function(el,arrEl) { _yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "(anonymous 8)", 231);
return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;
				
				// if clicked another choice than allowAnyChoice
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 234);
if (!clickedOnAllowAnyChoice) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 235);
this.anyField.disable();
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 237);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 238);
lang.later( 50 , this.anyField , "focus");
				}
				
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 243);
this.setSelectedClass();
			
			// call superclass method (will fire updated event)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 246);
inputEx.RadioField.superclass.onChange.call(this,e);
		},
		
		/**
		 * Get the field value
		 * @method getValue
		 * @return {Any} 
		 */
		getValue: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "getValue", 254);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 256);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 258);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 260);
if (this.choicesList[i].node.firstChild.checked) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 262);
if (this.radioAny && this.radioAny == this.choicesList[i].node.firstChild) {
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 263);
return this.anyField.getValue();
					}
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 266);
return this.choicesList[i].value;
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 270);
return "";
		},
		
		/**
		 * Set the value of the Radio
		 * @method setValue
		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "setValue", 279);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 281);
var checkAny = true, valueFound = false, i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 283);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				// valueFound is a useful when "real" choice has a value equal to allowAny choice default value
				// so we check only the first value-matching radio button
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 287);
if (value === this.choicesList[i].value && !valueFound) {
					
					// check the radio
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 290);
this.choicesList[i].node.firstChild.checked = true;
					
					// radioAny should not be checked (unless current choice is radioAny !)
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 293);
checkAny = this.radioAny && (i === length - 1) ? true : false;
					
					// raise valueFound flag, all other radios should be unchecked now
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 296);
valueFound = true;
					
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 299);
this.choicesList[i].node.firstChild.checked = false;
				}
				
			}
			
			// Option allowAny
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 305);
if (this.radioAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 307);
if (checkAny) {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 308);
this.radioAny.checked = true;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 309);
this.radioAny.value = value;
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 310);
this.anyField.enable();
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 311);
this.anyField.setValue(value, false);
				} else {
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 313);
this.anyField.disable();
				}
			}
			
			// call parent class method to set style and fire updated event
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 318);
inputEx.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
		
		/**
		 * Clear the field by setting the field value to this.options.value
		 * @method clear
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		clear: function (sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "clear", 326);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 328);
if (this.radioAny){
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 329);
this.anyField.setValue(this.options.allowAny.value, false);
			}
		
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 332);
inputEx.RadioField.superclass.clear.call(this, sendUpdatedEvt);
		},
		
		/**
		 * Should return true if empty
		 * @method isEmpty
		 */
		isEmpty: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "isEmpty", 339);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 341);
var i, length, radioInput;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 343);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 345);
radioInput = this.choicesList[i].node.firstChild;
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 347);
if (radioInput.checked) {
					
					// if "any" option checked
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 350);
if (this.radioAny && this.radioAny == radioInput) {
						
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 352);
return this.anyField.getValue() === '';
						
					} else {
						
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 356);
return false;
						
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 362);
return true;
			
		},
		
		/**
		 * @method validate
		 */
		validate: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "validate", 369);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 371);
var i, length, radioInput, anyVal;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 373);
if (this.options.allowAny) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 375);
for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 377);
radioInput = this.choicesList[i].node.firstChild;
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 379);
if (radioInput.checked) {
						
						// if "any" option checked
						_yuitest_coverline("build/inputex-radio/inputex-radio.js", 382);
if (this.radioAny && this.radioAny == radioInput) {
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 383);
anyVal = this.anyField.getValue();
							_yuitest_coverline("build/inputex-radio/inputex-radio.js", 384);
return this.anyField.validate() && this.options.allowAny.validator(anyVal);
						}
					}
				}
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 390);
return true;
		},
		
		/**
		 * Disable the field
		 * @method disable
		 */
		disable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disable", 397);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 399);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 401);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 402);
this.disableChoice(this.choicesList[i], false);
			}
			
		},
	
		/**
		 * Enable the field
		 * @method enable
		 */
		enable: function () {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enable", 411);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 413);
var i, length;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 415);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 416);
this.enableChoice(this.choicesList[i]);
			}
			
		},
		
		/**
		 * @method createChoiceNode
		 */
		createChoiceNode: function (choice) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "createChoiceNode", 424);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 426);
var div, radioId, radioNode, labelNode;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 428);
div = inputEx.cn('div', {className: 'inputEx-RadioField-choice'});
			
			// radioId MUST be different for each option, to allow click on label (with for:id trick)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 431);
if(!inputEx.RadioField._idCounter) {
			   _yuitest_coverline("build/inputex-radio/inputex-radio.js", 432);
inputEx.RadioField._idCounter = 0;
			}
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 434);
radioId = "_inputex_radioId"+inputEx.RadioField._idCounter;
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 435);
inputEx.RadioField._idCounter++;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 437);
radioNode = inputEx.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 438);
div.appendChild(radioNode);
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 440);
if (choice.label.length > 0) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 441);
labelNode = inputEx.cn('label', {"for": radioId, className: 'inputEx-RadioField-rightLabel'}, null, ""+choice.label);
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 442);
div.appendChild(labelNode);
			}
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 445);
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
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "removeChoiceNode", 452);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 459);
this.fieldContainer.removeChild(node);
			
		},
		
		/**
		 * @method disableChoiceNode
		 */
		disableChoiceNode: function (node) {
			
			//node.firstChild.disabled = "disabled";
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "disableChoiceNode", 466);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 469);
node.firstChild.disabled = true;
		},
		
		/**
		 * @method enableChoiceNode
		 */
		enableChoiceNode: function (node) {
			
			//node.firstChild.removeAttribute("disabled");
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "enableChoiceNode", 475);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 478);
node.firstChild.disabled = false;
			
		},
		
		/**
		 * Attach an <option> node to the <select> at the specified position
		 * @method appendChoiceNode
		 * @param {HTMLElement} node The <option> node to attach to the <select>
		 * @param {Int} position The position of the choice in choicesList (may not be the "real" position in DOM)
		 */
		appendChoiceNode: function (node, position) {
			
			_yuitest_coverfunc("build/inputex-radio/inputex-radio.js", "appendChoiceNode", 488);
_yuitest_coverline("build/inputex-radio/inputex-radio.js", 490);
var domPosition, i;
			
			// Compute real DOM position (since previous choices in choicesList may be hidden)
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 493);
domPosition = 0;
			
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 495);
for (i = 0; i < position; i += 1) {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 497);
if (this.choicesList[i].visible) {
					
					_yuitest_coverline("build/inputex-radio/inputex-radio.js", 499);
domPosition += 1;
					
				}
				
			}
			
			// Insert in DOM
			_yuitest_coverline("build/inputex-radio/inputex-radio.js", 506);
if (domPosition < this.fieldContainer.childNodes.length) {
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 507);
Y.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);
			} else {
				
				_yuitest_coverline("build/inputex-radio/inputex-radio.js", 510);
this.fieldContainer.appendChild(node);
				
			}
		}
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 518);
Y.mix(inputEx.RadioField.prototype, inputEx.mixin.choice);
	
	
	// Register this class as "radio" type
	_yuitest_coverline("build/inputex-radio/inputex-radio.js", 522);
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
	
}, '3.1.0',{
  requires: ['selector','event-delegate','inputex-field','inputex-choice','inputex-string']
});
	

}, '@VERSION@');
