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
_yuitest_coverage["build/inputex-select/inputex-select.js"].code=["YUI.add('inputex-select', function (Y, NAME) {","","/**"," * @module inputex-select"," */","YUI.add(\"inputex-select\",function(Y){","","	var lang = Y.Lang,","	    inputEx = Y.inputEx;","","	/**","	 * Create a select field","	 * @class inputEx.SelectField","	 * @extends inputEx.Field","	 * @constructor","	 * @param {Object} options Added options:","	 * <ul>","	 *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}])</li>","	 * </ul>","	 */","	inputEx.SelectField = function (options) {","		inputEx.SelectField.superclass.constructor.call(this, options);","	};","","	Y.extend(inputEx.SelectField, inputEx.Field, {","		","		/**","		 * Set the default values of the options","		 * @method setOptions","		 * @param {Object} options Options object as passed to the constructor","		 */","		setOptions: function (options) {","		","			var i, length;","		","			inputEx.SelectField.superclass.setOptions.call(this, options);","		","			this.options.choices = lang.isArray(options.choices) ? options.choices : [];","		","			// Retro-compatibility with old pattern (changed since 2010-06-30)","			if (lang.isArray(options.selectValues)) {","			","				for (i = 0, length = options.selectValues.length; i < length; i += 1) {","				","					this.options.choices.push({","						value: options.selectValues[i],","						label: \"\" + ((options.selectOptions && !lang.isUndefined(options.selectOptions[i])) ? options.selectOptions[i] : options.selectValues[i])","					});","				","				}","			}","		","		},","	","		/**","		 * Build a select tag with options","		 * @method renderComponent","		 */","		renderComponent: function () {","		","			var i, length;","		","			// create DOM <select> node","			this.el = inputEx.cn('select', {","			","				id: this.divEl.id ? this.divEl.id + '-field' : Y.guid(),","				name: this.options.name || ''","			","			});","		","			// list of choices (e.g. [{ label: \"France\", value:\"fr\", node:<DOM-node>, visible:true }, {...}, ...])","			this.choicesList = [];","		","			// add choices","			for (i = 0, length = this.options.choices.length; i < length; i += 1) {","				this.addChoice(this.options.choices[i]);","			}","		","			// append <select> to DOM tree","			this.fieldContainer.appendChild(this.el);","		},","	","		/**","		 * Register the \"change\" event","		 * @method initEventgs","		 */","		initEvents: function () {","			Y.on(\"change\", this.onChange, this.el, this);","			Y.on(\"focus\", this.onFocus, this.el,this);","			Y.on(\"blur\", this.onBlur, this.el,this);","		},","	","		/**","		 * Set the value","		 * @method setValue","		 * @param {String} value The value to set","		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","		 */","		setValue: function (value, sendUpdatedEvt) {","		","			var i, length, choice, firstIndexAvailable, choiceFound = false;","		","			for (i = 0, length = this.choicesList.length; i < length ; i += 1) {","			","				if (this.choicesList[i].visible) {","				","					choice = this.choicesList[i];","				","					if (value === choice.value) {","					","						choice.node.selected = \"selected\";","						choiceFound = true;","						break; // choice node already found","					","					} else if (lang.isUndefined(firstIndexAvailable)) {","					","						firstIndexAvailable = i;","					}","				","				}","			","			}","			","			// select value from first choice available when","			// value not matching any visible choice","			//","			// if no choice available (-> firstIndexAvailable is undefined), skip value setting","			if (!choiceFound && !lang.isUndefined(firstIndexAvailable)) {","				","				choice = this.choicesList[firstIndexAvailable];","				choice.node.selected = \"selected\";","				value = choice.value;","				","			}","			","			// Call Field.setValue to set class and fire updated event","			inputEx.SelectField.superclass.setValue.call(this, value, sendUpdatedEvt);","		},","	","		/**","		 * Return the value","		 * @method getValue","		 * @return {Any} the selected value","		 */","		getValue: function () {","		","			var choiceIndex;","			","			if (this.el.selectedIndex >= 0) {","				","				choiceIndex = inputEx.indexOf(this.el.childNodes[this.el.selectedIndex], this.choicesList, function (node, choice) {","					return node === choice.node;","				});","			","				return this.choicesList[choiceIndex].value;","				","			} else {","				","				return \"\";","				","			}","		},","	","		/**","		 * Disable the field","		 * @method disable","		 */","		disable: function () {","			this.el.disabled = true;","		},","","		/**","		 * Enable the field","		 * @method enable","		 */","		enable: function () {","			this.el.disabled = false;","		},","		","		/**","		 * @method createChoiceNode","		 */","		createChoiceNode: function (choice) {","			","			return inputEx.cn('option', {value: choice.value}, null, choice.label);","			","		},","		","		/**","		 * @method removeChoiceNode","		 */","		removeChoiceNode: function (node) {","			","			// remove from selector","			// ","			//   -> style.display = 'none' would work only on FF (when node is an <option>)","			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM","			//","			this.el.removeChild(node);","			","		},","		","		/**","		 * @method disableChoiceNode","		 */","		disableChoiceNode: function (node) {","			","			node.disabled = \"disabled\";","			","		},","		","		/**","		 * @method enableChoiceNode","		 */","		enableChoiceNode: function (node) {","			","			node.removeAttribute(\"disabled\");","			","		},","		","		/**","		 * Attach an <option> node to the <select> at the specified position","		 * @method appendChoiceNode","		 * @param {HTMLElement} node The <option> node to attach to the <select>","		 * @param {Int} position The position of the choice in choicesList (may not be the \"real\" position in DOM)","		 */","		appendChoiceNode: function (node, position) {","			","			var domPosition, i;","			","			// Compute real DOM position (since previous choices in choicesList may be hidden)","			domPosition = 0;","			","			for (i = 0; i < position; i += 1) {","				","				if (this.choicesList[i].visible) {","					","					domPosition += 1;","					","				}","				","			}","			","			// Insert in DOM","			if (domPosition < this.el.childNodes.length) {","				Y.one(this.el).insert(node,domPosition);","			} else {","				","				this.el.appendChild(node);","				","			}","		},	","		","		/** ","		 * Add stringField setFieldName for classic form in group in listField","		 * @method setFieldName","		 */","		setFieldName: function(name) {","			this.el.name = name;","    }","		","	});","	","	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)","	Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);","	","	","	// Register this class as \"select\" type","	inputEx.registerType(\"select\", inputEx.SelectField, [","		{","			type: 'list',","			name: 'choices',","			label: 'Choices',","			elementType: {","				type: 'group',","				fields: [","					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)","					{ label: 'Label', name: 'label' } // optional : if left empty, label is same as value","				]","			},","			value: [],","			required: true","		}","	]);","","}, '3.1.0',{","  requires: ['inputex-field','inputex-choice']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-select/inputex-select.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"25":0,"34":0,"36":0,"38":0,"41":0,"43":0,"45":0,"61":0,"64":0,"72":0,"75":0,"76":0,"80":0,"88":0,"89":0,"90":0,"101":0,"103":0,"105":0,"107":0,"109":0,"111":0,"112":0,"113":0,"115":0,"117":0,"128":0,"130":0,"131":0,"132":0,"137":0,"147":0,"149":0,"151":0,"152":0,"155":0,"159":0,"169":0,"177":0,"185":0,"199":0,"208":0,"217":0,"229":0,"232":0,"234":0,"236":0,"238":0,"245":0,"246":0,"249":0,"259":0,"265":0,"269":0};
_yuitest_coverage["build/inputex-select/inputex-select.js"].functions = {"SelectField:21":0,"setOptions:32":0,"renderComponent:59":0,"initEvents:87":0,"setValue:99":0,"(anonymous 3):151":0,"getValue:145":0,"disable:168":0,"enable:176":0,"createChoiceNode:183":0,"removeChoiceNode:192":0,"disableChoiceNode:206":0,"enableChoiceNode:215":0,"appendChoiceNode:227":0,"setFieldName:258":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-select/inputex-select.js"].coveredLines = 59;
_yuitest_coverage["build/inputex-select/inputex-select.js"].coveredFunctions = 17;
_yuitest_coverline("build/inputex-select/inputex-select.js", 1);
YUI.add('inputex-select', function (Y, NAME) {

/**
 * @module inputex-select
 */
_yuitest_coverfunc("build/inputex-select/inputex-select.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-select/inputex-select.js", 6);
YUI.add("inputex-select",function(Y){

	_yuitest_coverfunc("build/inputex-select/inputex-select.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-select/inputex-select.js", 8);
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
	_yuitest_coverline("build/inputex-select/inputex-select.js", 21);
inputEx.SelectField = function (options) {
		_yuitest_coverfunc("build/inputex-select/inputex-select.js", "SelectField", 21);
_yuitest_coverline("build/inputex-select/inputex-select.js", 22);
inputEx.SelectField.superclass.constructor.call(this, options);
	};

	_yuitest_coverline("build/inputex-select/inputex-select.js", 25);
Y.extend(inputEx.SelectField, inputEx.Field, {
		
		/**
		 * Set the default values of the options
		 * @method setOptions
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "setOptions", 32);
_yuitest_coverline("build/inputex-select/inputex-select.js", 34);
var i, length;
		
			_yuitest_coverline("build/inputex-select/inputex-select.js", 36);
inputEx.SelectField.superclass.setOptions.call(this, options);
		
			_yuitest_coverline("build/inputex-select/inputex-select.js", 38);
this.options.choices = lang.isArray(options.choices) ? options.choices : [];
		
			// Retro-compatibility with old pattern (changed since 2010-06-30)
			_yuitest_coverline("build/inputex-select/inputex-select.js", 41);
if (lang.isArray(options.selectValues)) {
			
				_yuitest_coverline("build/inputex-select/inputex-select.js", 43);
for (i = 0, length = options.selectValues.length; i < length; i += 1) {
				
					_yuitest_coverline("build/inputex-select/inputex-select.js", 45);
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
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "renderComponent", 59);
_yuitest_coverline("build/inputex-select/inputex-select.js", 61);
var i, length;
		
			// create DOM <select> node
			_yuitest_coverline("build/inputex-select/inputex-select.js", 64);
this.el = inputEx.cn('select', {
			
				id: this.divEl.id ? this.divEl.id + '-field' : Y.guid(),
				name: this.options.name || ''
			
			});
		
			// list of choices (e.g. [{ label: "France", value:"fr", node:<DOM-node>, visible:true }, {...}, ...])
			_yuitest_coverline("build/inputex-select/inputex-select.js", 72);
this.choicesList = [];
		
			// add choices
			_yuitest_coverline("build/inputex-select/inputex-select.js", 75);
for (i = 0, length = this.options.choices.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-select/inputex-select.js", 76);
this.addChoice(this.options.choices[i]);
			}
		
			// append <select> to DOM tree
			_yuitest_coverline("build/inputex-select/inputex-select.js", 80);
this.fieldContainer.appendChild(this.el);
		},
	
		/**
		 * Register the "change" event
		 * @method initEventgs
		 */
		initEvents: function () {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "initEvents", 87);
_yuitest_coverline("build/inputex-select/inputex-select.js", 88);
Y.on("change", this.onChange, this.el, this);
			_yuitest_coverline("build/inputex-select/inputex-select.js", 89);
Y.on("focus", this.onFocus, this.el,this);
			_yuitest_coverline("build/inputex-select/inputex-select.js", 90);
Y.on("blur", this.onBlur, this.el,this);
		},
	
		/**
		 * Set the value
		 * @method setValue
		 * @param {String} value The value to set
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "setValue", 99);
_yuitest_coverline("build/inputex-select/inputex-select.js", 101);
var i, length, choice, firstIndexAvailable, choiceFound = false;
		
			_yuitest_coverline("build/inputex-select/inputex-select.js", 103);
for (i = 0, length = this.choicesList.length; i < length ; i += 1) {
			
				_yuitest_coverline("build/inputex-select/inputex-select.js", 105);
if (this.choicesList[i].visible) {
				
					_yuitest_coverline("build/inputex-select/inputex-select.js", 107);
choice = this.choicesList[i];
				
					_yuitest_coverline("build/inputex-select/inputex-select.js", 109);
if (value === choice.value) {
					
						_yuitest_coverline("build/inputex-select/inputex-select.js", 111);
choice.node.selected = "selected";
						_yuitest_coverline("build/inputex-select/inputex-select.js", 112);
choiceFound = true;
						_yuitest_coverline("build/inputex-select/inputex-select.js", 113);
break; // choice node already found
					
					} else {_yuitest_coverline("build/inputex-select/inputex-select.js", 115);
if (lang.isUndefined(firstIndexAvailable)) {
					
						_yuitest_coverline("build/inputex-select/inputex-select.js", 117);
firstIndexAvailable = i;
					}}
				
				}
			
			}
			
			// select value from first choice available when
			// value not matching any visible choice
			//
			// if no choice available (-> firstIndexAvailable is undefined), skip value setting
			_yuitest_coverline("build/inputex-select/inputex-select.js", 128);
if (!choiceFound && !lang.isUndefined(firstIndexAvailable)) {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 130);
choice = this.choicesList[firstIndexAvailable];
				_yuitest_coverline("build/inputex-select/inputex-select.js", 131);
choice.node.selected = "selected";
				_yuitest_coverline("build/inputex-select/inputex-select.js", 132);
value = choice.value;
				
			}
			
			// Call Field.setValue to set class and fire updated event
			_yuitest_coverline("build/inputex-select/inputex-select.js", 137);
inputEx.SelectField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
	
		/**
		 * Return the value
		 * @method getValue
		 * @return {Any} the selected value
		 */
		getValue: function () {
		
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "getValue", 145);
_yuitest_coverline("build/inputex-select/inputex-select.js", 147);
var choiceIndex;
			
			_yuitest_coverline("build/inputex-select/inputex-select.js", 149);
if (this.el.selectedIndex >= 0) {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 151);
choiceIndex = inputEx.indexOf(this.el.childNodes[this.el.selectedIndex], this.choicesList, function (node, choice) {
					_yuitest_coverfunc("build/inputex-select/inputex-select.js", "(anonymous 3)", 151);
_yuitest_coverline("build/inputex-select/inputex-select.js", 152);
return node === choice.node;
				});
			
				_yuitest_coverline("build/inputex-select/inputex-select.js", 155);
return this.choicesList[choiceIndex].value;
				
			} else {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 159);
return "";
				
			}
		},
	
		/**
		 * Disable the field
		 * @method disable
		 */
		disable: function () {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "disable", 168);
_yuitest_coverline("build/inputex-select/inputex-select.js", 169);
this.el.disabled = true;
		},

		/**
		 * Enable the field
		 * @method enable
		 */
		enable: function () {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "enable", 176);
_yuitest_coverline("build/inputex-select/inputex-select.js", 177);
this.el.disabled = false;
		},
		
		/**
		 * @method createChoiceNode
		 */
		createChoiceNode: function (choice) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "createChoiceNode", 183);
_yuitest_coverline("build/inputex-select/inputex-select.js", 185);
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
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "removeChoiceNode", 192);
_yuitest_coverline("build/inputex-select/inputex-select.js", 199);
this.el.removeChild(node);
			
		},
		
		/**
		 * @method disableChoiceNode
		 */
		disableChoiceNode: function (node) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "disableChoiceNode", 206);
_yuitest_coverline("build/inputex-select/inputex-select.js", 208);
node.disabled = "disabled";
			
		},
		
		/**
		 * @method enableChoiceNode
		 */
		enableChoiceNode: function (node) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "enableChoiceNode", 215);
_yuitest_coverline("build/inputex-select/inputex-select.js", 217);
node.removeAttribute("disabled");
			
		},
		
		/**
		 * Attach an <option> node to the <select> at the specified position
		 * @method appendChoiceNode
		 * @param {HTMLElement} node The <option> node to attach to the <select>
		 * @param {Int} position The position of the choice in choicesList (may not be the "real" position in DOM)
		 */
		appendChoiceNode: function (node, position) {
			
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "appendChoiceNode", 227);
_yuitest_coverline("build/inputex-select/inputex-select.js", 229);
var domPosition, i;
			
			// Compute real DOM position (since previous choices in choicesList may be hidden)
			_yuitest_coverline("build/inputex-select/inputex-select.js", 232);
domPosition = 0;
			
			_yuitest_coverline("build/inputex-select/inputex-select.js", 234);
for (i = 0; i < position; i += 1) {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 236);
if (this.choicesList[i].visible) {
					
					_yuitest_coverline("build/inputex-select/inputex-select.js", 238);
domPosition += 1;
					
				}
				
			}
			
			// Insert in DOM
			_yuitest_coverline("build/inputex-select/inputex-select.js", 245);
if (domPosition < this.el.childNodes.length) {
				_yuitest_coverline("build/inputex-select/inputex-select.js", 246);
Y.one(this.el).insert(node,domPosition);
			} else {
				
				_yuitest_coverline("build/inputex-select/inputex-select.js", 249);
this.el.appendChild(node);
				
			}
		},	
		
		/** 
		 * Add stringField setFieldName for classic form in group in listField
		 * @method setFieldName
		 */
		setFieldName: function(name) {
			_yuitest_coverfunc("build/inputex-select/inputex-select.js", "setFieldName", 258);
_yuitest_coverline("build/inputex-select/inputex-select.js", 259);
this.el.name = name;
    }
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	_yuitest_coverline("build/inputex-select/inputex-select.js", 265);
Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);
	
	
	// Register this class as "select" type
	_yuitest_coverline("build/inputex-select/inputex-select.js", 269);
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

}, '3.1.0',{
  requires: ['inputex-field','inputex-choice']
});


}, '@VERSION@');
