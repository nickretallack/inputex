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
_yuitest_coverage["build/inputex-select/inputex-select.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-select/inputex-select.js",
    code: []
};
_yuitest_coverage["build/inputex-select/inputex-select.js"].code=["YUI.add('inputex-select', function (Y, NAME) {","","/**"," * @module inputex-select"," */","	var lang = Y.Lang,","	    inputEx = Y.inputEx;","","	/**","	 * Create a select field","	 * @class inputEx.SelectField","	 * @extends inputEx.Field","	 * @constructor","	 * @param {Object} options Added options:","	 * <ul>","	 *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}])</li>","	 * </ul>","	 */","	inputEx.SelectField = function (options) {","		inputEx.SelectField.superclass.constructor.call(this, options);","	};","","	Y.extend(inputEx.SelectField, inputEx.Field, {","		","		/**","		 * Set the default values of the options","		 * @method setOptions","		 * @param {Object} options Options object as passed to the constructor","		 */","		setOptions: function (options) {","		","			var i, length;","		","			inputEx.SelectField.superclass.setOptions.call(this, options);","		","			this.options.choices = lang.isArray(options.choices) ? options.choices : [];","		","			// Retro-compatibility with old pattern (changed since 2010-06-30)","			if (lang.isArray(options.selectValues)) {","			","				for (i = 0, length = options.selectValues.length; i < length; i += 1) {","				","					this.options.choices.push({","						value: options.selectValues[i],","						label: \"\" + ((options.selectOptions && !lang.isUndefined(options.selectOptions[i])) ? options.selectOptions[i] : options.selectValues[i])","					});","				","				}","			}","		","		},","	","		/**","		 * Build a select tag with options","		 * @method renderComponent","		 */","		renderComponent: function () {","		","			var i, length;","		","			// create DOM <select> node","			this.el = inputEx.cn('select', {","			","				id: this.divEl.id ? this.divEl.id + '-field' : Y.guid(),","				name: this.options.name || ''","			","			});","		","			// list of choices (e.g. [{ label: \"France\", value:\"fr\", node:<DOM-node>, visible:true }, {...}, ...])","			this.choicesList = [];","		","			// add choices","			for (i = 0, length = this.options.choices.length; i < length; i += 1) {","				this.addChoice(this.options.choices[i]);","			}","		","			// append <select> to DOM tree","			this.fieldContainer.appendChild(this.el);","		},","	","		/**","		 * Register the \"change\" event","		 * @method initEventgs","		 */","		initEvents: function () {","			Y.on(\"change\", this.onChange, this.el, this);","			Y.on(\"focus\", this.onFocus, this.el,this);","			Y.on(\"blur\", this.onBlur, this.el,this);","		},","	","		/**","		 * Set the value","		 * @method setValue","		 * @param {String} value The value to set","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","		 */","		setValue: function (value, sendUpdatedEvt) {","		","			var i, length, choice, firstIndexAvailable, choiceFound = false;","		","			for (i = 0, length = this.choicesList.length; i < length ; i += 1) {","			","				if (this.choicesList[i].visible) {","				","					choice = this.choicesList[i];","				","					if (value === choice.value) {","					","						choice.node.selected = \"selected\";","						choiceFound = true;","						break; // choice node already found","					","					} else if (lang.isUndefined(firstIndexAvailable)) {","					","						firstIndexAvailable = i;","					}","				","				}","			","			}","			","			// select value from first choice available when","			// value not matching any visible choice","			//","			// if no choice available (-> firstIndexAvailable is undefined), skip value setting","			if (!choiceFound && !lang.isUndefined(firstIndexAvailable)) {","				","				choice = this.choicesList[firstIndexAvailable];","				choice.node.selected = \"selected\";","				value = choice.value;","				","			}","			","			// Call Field.setValue to set class and fire updated event","			inputEx.SelectField.superclass.setValue.call(this, value, sendUpdatedEvt);","		},","	","		/**","		 * Return the value","		 * @method getValue","		 * @return {Any} the selected value","		 */","		getValue: function () {","		","			var choiceIndex;","			","			if (this.el.selectedIndex >= 0) {","				","				choiceIndex = inputEx.indexOf(this.el.childNodes[this.el.selectedIndex], this.choicesList, function (node, choice) {","					return node === choice.node;","				});","			","				return this.choicesList[choiceIndex].value;","				","			} else {","				","				return \"\";","				","			}","		},","	","		/**","		 * Disable the field","		 * @method disable","		 */","		disable: function () {","			this.el.disabled = true;","		},","","		/**","		 * Enable the field","		 * @method enable","		 */","		enable: function () {","			this.el.disabled = false;","		},","		","		/**","		 * @method createChoiceNode","		 */","		createChoiceNode: function (choice) {","			","			return inputEx.cn('option', {value: choice.value}, null, choice.label);","			","		},","		","		/**","		 * @method removeChoiceNode","		 */","		removeChoiceNode: function (node) {","			","			// remove from selector","			// ","			//   -> style.display = 'none' would work only on FF (when node is an <option>)","			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM","			//","			this.el.removeChild(node);","			","		},","		","		/**","		 * @method disableChoiceNode","		 */","		disableChoiceNode: function (node) {","			","			node.disabled = \"disabled\";","			","		},","		","		/**","		 * @method enableChoiceNode","		 */","		enableChoiceNode: function (node) {","			","			node.removeAttribute(\"disabled\");","			","		},","		","		/**","		 * Attach an <option> node to the <select> at the specified position","		 * @method appendChoiceNode","		 * @param {HTMLElement} node The <option> node to attach to the <select>","		 * @param {Int} position The position of the choice in choicesList (may not be the \"real\" position in DOM)","		 */","		appendChoiceNode: function (node, position) {","			","			var domPosition, i;","			","			// Compute real DOM position (since previous choices in choicesList may be hidden)","			domPosition = 0;","			","			for (i = 0; i < position; i += 1) {","				","				if (this.choicesList[i].visible) {","					","					domPosition += 1;","					","				}","				","			}","			","			// Insert in DOM","			if (domPosition < this.el.childNodes.length) {","				Y.one(this.el).insert(node,domPosition);","			} else {","				","				this.el.appendChild(node);","				","			}","		},	","		","		/** ","		 * Add stringField setFieldName for classic form in group in listField","		 * @method setFieldName","		 */","		setFieldName: function(name) {","			this.el.name = name;","    }","		","	});","	","	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)","	Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);","	","	","	// Register this class as \"select\" type","	inputEx.registerType(\"select\", inputEx.SelectField, [","		{","			type: 'list',","			name: 'choices',","			label: 'Choices',","			elementType: {","				type: 'group',","				fields: [","					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)","					{ label: 'Label', name: 'label' } // optional : if left empty, label is same as value","				]","			},","			value: [],","			required: true","		}","	]);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"inputex-choice\"], \"ix_provides\": \"select\"});"];
_yuitest_coverage["build/inputex-select/inputex-select.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"32":0,"34":0,"36":0,"39":0,"41":0,"43":0,"59":0,"62":0,"70":0,"73":0,"74":0,"78":0,"86":0,"87":0,"88":0,"99":0,"101":0,"103":0,"105":0,"107":0,"109":0,"110":0,"111":0,"113":0,"115":0,"126":0,"128":0,"129":0,"130":0,"135":0,"145":0,"147":0,"149":0,"150":0,"153":0,"157":0,"167":0,"175":0,"183":0,"197":0,"206":0,"215":0,"227":0,"230":0,"232":0,"234":0,"236":0,"243":0,"244":0,"247":0,"257":0,"263":0,"267":0};
_yuitest_coverage["build/inputex-select/inputex-select.js"].functions = {"SelectField:19":0,"setOptions:30":0,"renderComponent:57":0,"initEvents:85":0,"setValue:97":0,"(anonymous 2):149":0,"getValue:143":0,"disable:166":0,"enable:174":0,"createChoiceNode:181":0,"removeChoiceNode:190":0,"disableChoiceNode:204":0,"enableChoiceNode:213":0,"appendChoiceNode:225":0,"setFieldName:256":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-select/inputex-select.js"].coveredLines = 58;
_yuitest_coverage["build/inputex-select/inputex-select.js"].coveredFunctions = 16;
_yuitest_coverline("build/inputex-select/inputex-select.js", 1);
YUI.add('inputex-select', function (Y, NAME) {

/**
 * @module inputex-select
 */
	_yuitest_coverfunc("build/inputex-select/inputex-select.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-select/inputex-select.js", 6);
var lang = Y.Lang,
	    inputEx = Y.inputEx;

	/**
	 * Create a select field
	 * @class inputEx.SelectField
	 * @extends inputEx.Field
	 * @constructor
	 * @param {Object} options Added options:
	 * <ul>
	 *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}])</li>
	 * </ul>
	 */
	_yuitest_coverline("build/inputex-select/inputex-select.js", 19);
inputEx.SelectField = function (options) {
		_yuitest_coverfunc("build/inputex-select/inputex-select.js", "SelectField", 19);
_yuitest_coverline("build/inputex-select/inputex-select.js", 20);
inputEx.SelectField.superclass.constructor.call(this, options);
	};

	_yuitest_coverline("build/inputex-select/inputex-select.js", 23);
Y.extend(inputEx.SelectField, inputEx.Field, {
		
		/**
		 * Set the default values of the options
		 * @method setOptions
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "setOptions", 30);
_yuitest_coverline("build/inputex-select/inputex-select.js", 32);
var i, length;
		
			_yuitest_coverline("build/inputex-select/inputex-select.js", 34);
inputEx.SelectField.superclass.setOptions.call(this, options);
		
			_yuitest_coverline("build/inputex-select/inputex-select.js", 36);
this.options.choices = lang.isArray(options.choices) ? options.choices : [];
		
			// Retro-compatibility with old pattern (changed since 2010-06-30)
			_yuitest_coverline("build/inputex-select/inputex-select.js", 39);
if (lang.isArray(options.selectValues)) {
			
				_yuitest_coverline("build/inputex-select/inputex-select.js", 41);
for (i = 0, length = options.selectValues.length; i < length; i += 1) {
				
					_yuitest_coverline("build/inputex-select/inputex-select.js", 43);
this.options.choices.push({
						value: options.selectValues[i],
						label: "" + ((options.selectOptions && !lang.isUndefined(options.selectOptions[i])) ? options.selectOptions[i] : options.selectValues[i])
					});
				
				}
			}
		
		},
	
		/**
		 * Build a select tag with options
		 * @method renderComponent
		 */
		renderComponent: function () {
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "renderComponent", 57);
_yuitest_coverline("build/inputex-select/inputex-select.js", 59);
var i, length;
		
			// create DOM <select> node
			_yuitest_coverline("build/inputex-select/inputex-select.js", 62);
this.el = inputEx.cn('select', {
			
				id: this.divEl.id ? this.divEl.id + '-field' : Y.guid(),
				name: this.options.name || ''
			
			});
		
			// list of choices (e.g. [{ label: "France", value:"fr", node:<DOM-node>, visible:true }, {...}, ...])
			_yuitest_coverline("build/inputex-select/inputex-select.js", 70);
this.choicesList = [];
		
			// add choices
			_yuitest_coverline("build/inputex-select/inputex-select.js", 73);
for (i = 0, length = this.options.choices.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-select/inputex-select.js", 74);
this.addChoice(this.options.choices[i]);
			}
		
			// append <select> to DOM tree
			_yuitest_coverline("build/inputex-select/inputex-select.js", 78);
this.fieldContainer.appendChild(this.el);
		},
	
		/**
		 * Register the "change" event
		 * @method initEventgs
		 */
		initEvents: function () {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "initEvents", 85);
_yuitest_coverline("build/inputex-select/inputex-select.js", 86);
Y.on("change", this.onChange, this.el, this);
			_yuitest_coverline("build/inputex-select/inputex-select.js", 87);
Y.on("focus", this.onFocus, this.el,this);
			_yuitest_coverline("build/inputex-select/inputex-select.js", 88);
Y.on("blur", this.onBlur, this.el,this);
		},
	
		/**
		 * Set the value
		 * @method setValue
		 * @param {String} value The value to set
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "setValue", 97);
_yuitest_coverline("build/inputex-select/inputex-select.js", 99);
var i, length, choice, firstIndexAvailable, choiceFound = false;
		
			_yuitest_coverline("build/inputex-select/inputex-select.js", 101);
for (i = 0, length = this.choicesList.length; i < length ; i += 1) {
			
				_yuitest_coverline("build/inputex-select/inputex-select.js", 103);
if (this.choicesList[i].visible) {
				
					_yuitest_coverline("build/inputex-select/inputex-select.js", 105);
choice = this.choicesList[i];
				
					_yuitest_coverline("build/inputex-select/inputex-select.js", 107);
if (value === choice.value) {
					
						_yuitest_coverline("build/inputex-select/inputex-select.js", 109);
choice.node.selected = "selected";
						_yuitest_coverline("build/inputex-select/inputex-select.js", 110);
choiceFound = true;
						_yuitest_coverline("build/inputex-select/inputex-select.js", 111);
break; // choice node already found
					
					} else {_yuitest_coverline("build/inputex-select/inputex-select.js", 113);
if (lang.isUndefined(firstIndexAvailable)) {
					
						_yuitest_coverline("build/inputex-select/inputex-select.js", 115);
firstIndexAvailable = i;
					}}
				
				}
			
			}
			
			// select value from first choice available when
			// value not matching any visible choice
			//
			// if no choice available (-> firstIndexAvailable is undefined), skip value setting
			_yuitest_coverline("build/inputex-select/inputex-select.js", 126);
if (!choiceFound && !lang.isUndefined(firstIndexAvailable)) {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 128);
choice = this.choicesList[firstIndexAvailable];
				_yuitest_coverline("build/inputex-select/inputex-select.js", 129);
choice.node.selected = "selected";
				_yuitest_coverline("build/inputex-select/inputex-select.js", 130);
value = choice.value;
				
			}
			
			// Call Field.setValue to set class and fire updated event
			_yuitest_coverline("build/inputex-select/inputex-select.js", 135);
inputEx.SelectField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
	
		/**
		 * Return the value
		 * @method getValue
		 * @return {Any} the selected value
		 */
		getValue: function () {
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "getValue", 143);
_yuitest_coverline("build/inputex-select/inputex-select.js", 145);
var choiceIndex;
			
			_yuitest_coverline("build/inputex-select/inputex-select.js", 147);
if (this.el.selectedIndex >= 0) {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 149);
choiceIndex = inputEx.indexOf(this.el.childNodes[this.el.selectedIndex], this.choicesList, function (node, choice) {
					_yuitest_coverfunc("build/inputex-select/inputex-select.js", "(anonymous 2)", 149);
_yuitest_coverline("build/inputex-select/inputex-select.js", 150);
return node === choice.node;
				});
			
				_yuitest_coverline("build/inputex-select/inputex-select.js", 153);
return this.choicesList[choiceIndex].value;
				
			} else {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 157);
return "";
				
			}
		},
	
		/**
		 * Disable the field
		 * @method disable
		 */
		disable: function () {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "disable", 166);
_yuitest_coverline("build/inputex-select/inputex-select.js", 167);
this.el.disabled = true;
		},

		/**
		 * Enable the field
		 * @method enable
		 */
		enable: function () {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "enable", 174);
_yuitest_coverline("build/inputex-select/inputex-select.js", 175);
this.el.disabled = false;
		},
		
		/**
		 * @method createChoiceNode
		 */
		createChoiceNode: function (choice) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "createChoiceNode", 181);
_yuitest_coverline("build/inputex-select/inputex-select.js", 183);
return inputEx.cn('option', {value: choice.value}, null, choice.label);
			
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
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "removeChoiceNode", 190);
_yuitest_coverline("build/inputex-select/inputex-select.js", 197);
this.el.removeChild(node);
			
		},
		
		/**
		 * @method disableChoiceNode
		 */
		disableChoiceNode: function (node) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "disableChoiceNode", 204);
_yuitest_coverline("build/inputex-select/inputex-select.js", 206);
node.disabled = "disabled";
			
		},
		
		/**
		 * @method enableChoiceNode
		 */
		enableChoiceNode: function (node) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "enableChoiceNode", 213);
_yuitest_coverline("build/inputex-select/inputex-select.js", 215);
node.removeAttribute("disabled");
			
		},
		
		/**
		 * Attach an <option> node to the <select> at the specified position
		 * @method appendChoiceNode
		 * @param {HTMLElement} node The <option> node to attach to the <select>
		 * @param {Int} position The position of the choice in choicesList (may not be the "real" position in DOM)
		 */
		appendChoiceNode: function (node, position) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "appendChoiceNode", 225);
_yuitest_coverline("build/inputex-select/inputex-select.js", 227);
var domPosition, i;
			
			// Compute real DOM position (since previous choices in choicesList may be hidden)
			_yuitest_coverline("build/inputex-select/inputex-select.js", 230);
domPosition = 0;
			
			_yuitest_coverline("build/inputex-select/inputex-select.js", 232);
for (i = 0; i < position; i += 1) {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 234);
if (this.choicesList[i].visible) {
					
					_yuitest_coverline("build/inputex-select/inputex-select.js", 236);
domPosition += 1;
					
				}
				
			}
			
			// Insert in DOM
			_yuitest_coverline("build/inputex-select/inputex-select.js", 243);
if (domPosition < this.el.childNodes.length) {
				_yuitest_coverline("build/inputex-select/inputex-select.js", 244);
Y.one(this.el).insert(node,domPosition);
			} else {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 247);
this.el.appendChild(node);
				
			}
		},	
		
		/** 
		 * Add stringField setFieldName for classic form in group in listField
		 * @method setFieldName
		 */
		setFieldName: function(name) {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "setFieldName", 256);
_yuitest_coverline("build/inputex-select/inputex-select.js", 257);
this.el.name = name;
    }
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	_yuitest_coverline("build/inputex-select/inputex-select.js", 263);
Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);
	
	
	// Register this class as "select" type
	_yuitest_coverline("build/inputex-select/inputex-select.js", 267);
inputEx.registerType("select", inputEx.SelectField, [
		{
			type: 'list',
			name: 'choices',
			label: 'Choices',
			elementType: {
				type: 'group',
				fields: [
					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)
					{ label: 'Label', name: 'label' } // optional : if left empty, label is same as value
				]
			},
			value: [],
			required: true
		}
	]);


}, '@VERSION@', {"requires": ["inputex-field", "inputex-choice"], "ix_provides": "select"});
