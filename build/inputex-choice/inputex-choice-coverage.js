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
_yuitest_coverage["build/inputex-choice/inputex-choice.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-choice/inputex-choice.js",
    code: []
};
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].code=["YUI.add('inputex-choice', function (Y, NAME) {","","/**"," * @module inputex-choice"," */","YUI.add(\"inputex-choice\", function(Y){","	","	var lang = Y.Lang,","	    inputEx = Y.inputEx;","	","	/**","	 * This static class is used to provide basic choices functionnalities such as in \"select\" and \"radio\" fields","	 * We use it by mixin the methods below to the target prototype: ","	 *  eg.  Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);","	 * It provides the following methods : addChoice, removeChoice, hideChoice, showChoice, disableChoice, enableChoice, and getChoicePosition","	 * @class inputEx.mixin.choice","	 */","	inputEx.mixin.choice = {","		","		/**","		 * Add a choice","		 * @method addChoice","		 * @param {Object} config An object describing the choice to add (e.g. { value: 'second' [, label: 'Second' [, position: 1 || after: 'First' || before: 'Third']] })","		 */","		addChoice: function (config) {","			","			var choice, position, that;","			","			// allow config not to be an object, just a value -> convert it in a standard config object","			if (!lang.isObject(config)) {","				config = { value: config };","			}","			","			choice = {","				value: config.value,","				label: lang.isString(config.label) ? config.label : \"\" + config.value,","				visible: true","			};","			","			// Create DOM <option> node","			choice.node = this.createChoiceNode(choice);","			","			// Get choice's position","			//   -> don't pass config.value to getChoicePosition !!!","			//     (we search position of existing choice, whereas config.value is a property of new choice to be created...)","			position = this.getChoicePosition({ position: config.position, label: config.before || config.after });","			","			if (position === -1) { //  (default is at the end)","				position = this.choicesList.length;","				","			} else if (lang.isString(config.after)) {","				// +1 to insert \"after\" position (not \"at\" position)","				position += 1;","			}","			","			","			// Insert choice in list at position","			this.choicesList.splice(position, 0, choice);","			","			// Append <option> node in DOM","			this.appendChoiceNode(choice.node, position);","			","			// Select new choice","			if (!!config.selected) {","				","				// setTimeout for IE6 (let time to create dom option)","				that = this;","				setTimeout(function () {","					that.setValue(choice.value);","				}, 0);","				","			}","			","			// Return generated choice","			return choice;","			","		},","		","		/**","		 * Remove a choice","		 * @method removeChoice","		 * @param {Object} config An object targeting the choice to remove (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		removeChoice: function (config) {","			","			var position, choice;","			","			// Get choice's position","			position = this.getChoicePosition(config);","			","			if (position === -1) {","				throw new Error(\"SelectField : invalid or missing position, label or value in removeChoice\");","			}","			","			// Choice to remove","			choice = this.choicesList[position];","			","			// Clear if removing selected choice","			if (this.getValue() === choice.value) {","				this.clear();","			}","			","			// Remove choice in list at position","			this.choicesList.splice(position, 1); // remove 1 element at position","			","			// Remove node from DOM","			// test if visible first in case we try to remove a hiden choice (already detached from parentNode...)","			if (choice.visible) {","			   this.removeChoiceNode(choice.node);","			}","			","		},","		","		/**","		 * Hide a choice","		 * @method hideChoice","		 * @param {Object} config An object targeting the choice to hide (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		hideChoice: function (config, sendUpdatedEvt) {","			","			var position, choice;","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				// test if visible first in case we try to hide twice or more...","				if (choice.visible) {","					","					choice.visible = false;","					","					// Clear if hiding selected choice","					if (this.getValue() === choice.value) {","						this.clear(sendUpdatedEvt);","					}","					","					// Remove from DOM","					this.removeChoiceNode(choice.node);","					","				}","				","			}","			","		},","		","		/**","		 * Show a choice","		 * @method showChoice","		 * @param {Object} config An object targeting the choice to show (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		showChoice: function (config) {","			","			var position, choice;","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				if (!choice.visible) {","					","					choice.visible = true;","					this.appendChoiceNode(choice.node, position);","				","				}","				","			}","			","		},","		","		/**","		 * Disable a choice","		 * @method disableChoice","		 * @param {Object} config An object targeting the choice to disable (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		disableChoice: function (config, unselect) {","			","			var position, choice;","			","			// Should we unselect choice if disabling selected choice","			if (lang.isUndefined(unselect) || !lang.isBoolean(unselect)) { unselect = true; }","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				this.disableChoiceNode(choice.node);","				","				// Clear if disabling selected choice","				if (unselect && this.getValue() === choice.value) {","					this.clear();","				}","				","			}","			","		},","		","		/**","		 * Enable a choice","		 * @method enableChoice","		 * @param {Object} config An object targeting the choice to enable (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		enableChoice: function (config) {","			","			var position, choice;","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				this.enableChoiceNode(choice.node);","				","			}","			","		},","		","		/**","		 * Get the position of a choice in choicesList (NOT in the DOM)","		 * @method getChoicePosition","		 * @param {Object} config An object targeting the choice (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		getChoicePosition: function (config) {","			","			var nbChoices, position = -1;","			","			nbChoices = this.choicesList.length;","			","			// Handle position","			if (lang.isNumber(config.position) && config.position >= 0 && config.position < nbChoices) {","				","				position = parseInt(config.position, 10);","				","			} else if (!lang.isUndefined(config.value)) {","				","				// get position of choice with value === config.value","				position = inputEx.indexOf(config.value, this.choicesList, function (value, opt) {","					return opt.value === value;","				});","				","			} else if (lang.isString(config.label)) {","				","				// get position of choice with label === config.label","				position = inputEx.indexOf(config.label, this.choicesList, function (label, opt) {","					return opt.label === label;","				});","				","			}","			","			return position;","		}","		","	};","	","}, '3.1.0',{","  requires: [\"inputex\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].lines = {"1":0,"6":0,"8":0,"18":0,"27":0,"30":0,"31":0,"34":0,"41":0,"46":0,"48":0,"49":0,"51":0,"53":0,"58":0,"61":0,"64":0,"67":0,"68":0,"69":0,"75":0,"86":0,"89":0,"91":0,"92":0,"96":0,"99":0,"100":0,"104":0,"108":0,"109":0,"121":0,"123":0,"125":0,"127":0,"130":0,"132":0,"135":0,"136":0,"140":0,"155":0,"157":0,"159":0,"161":0,"163":0,"165":0,"166":0,"181":0,"184":0,"186":0,"188":0,"190":0,"192":0,"195":0,"196":0,"210":0,"212":0,"214":0,"216":0,"218":0,"231":0,"233":0,"236":0,"238":0,"240":0,"243":0,"244":0,"247":0,"250":0,"251":0,"256":0};
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].functions = {"(anonymous 3):68":0,"addChoice:25":0,"removeChoice:84":0,"hideChoice:119":0,"showChoice:153":0,"disableChoice:179":0,"enableChoice:208":0,"(anonymous 4):243":0,"(anonymous 5):250":0,"getChoicePosition:229":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].coveredLines = 71;
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 1);
YUI.add('inputex-choice', function (Y, NAME) {

/**
 * @module inputex-choice
 */
_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 6);
YUI.add("inputex-choice", function(Y){
	
	_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 8);
var lang = Y.Lang,
	    inputEx = Y.inputEx;
	
	/**
	 * This static class is used to provide basic choices functionnalities such as in "select" and "radio" fields
	 * We use it by mixin the methods below to the target prototype: 
	 *  eg.  Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);
	 * It provides the following methods : addChoice, removeChoice, hideChoice, showChoice, disableChoice, enableChoice, and getChoicePosition
	 * @class inputEx.mixin.choice
	 */
	_yuitest_coverline("build/inputex-choice/inputex-choice.js", 18);
inputEx.mixin.choice = {
		
		/**
		 * Add a choice
		 * @method addChoice
		 * @param {Object} config An object describing the choice to add (e.g. { value: 'second' [, label: 'Second' [, position: 1 || after: 'First' || before: 'Third']] })
		 */
		addChoice: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "addChoice", 25);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 27);
var choice, position, that;
			
			// allow config not to be an object, just a value -> convert it in a standard config object
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 30);
if (!lang.isObject(config)) {
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 31);
config = { value: config };
			}
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 34);
choice = {
				value: config.value,
				label: lang.isString(config.label) ? config.label : "" + config.value,
				visible: true
			};
			
			// Create DOM <option> node
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 41);
choice.node = this.createChoiceNode(choice);
			
			// Get choice's position
			//   -> don't pass config.value to getChoicePosition !!!
			//     (we search position of existing choice, whereas config.value is a property of new choice to be created...)
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 46);
position = this.getChoicePosition({ position: config.position, label: config.before || config.after });
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 48);
if (position === -1) { //  (default is at the end)
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 49);
position = this.choicesList.length;
				
			} else {_yuitest_coverline("build/inputex-choice/inputex-choice.js", 51);
if (lang.isString(config.after)) {
				// +1 to insert "after" position (not "at" position)
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 53);
position += 1;
			}}
			
			
			// Insert choice in list at position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 58);
this.choicesList.splice(position, 0, choice);
			
			// Append <option> node in DOM
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 61);
this.appendChoiceNode(choice.node, position);
			
			// Select new choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 64);
if (!!config.selected) {
				
				// setTimeout for IE6 (let time to create dom option)
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 67);
that = this;
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 68);
setTimeout(function () {
					_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 3)", 68);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 69);
that.setValue(choice.value);
				}, 0);
				
			}
			
			// Return generated choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 75);
return choice;
			
		},
		
		/**
		 * Remove a choice
		 * @method removeChoice
		 * @param {Object} config An object targeting the choice to remove (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		removeChoice: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "removeChoice", 84);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 86);
var position, choice;
			
			// Get choice's position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 89);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 91);
if (position === -1) {
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 92);
throw new Error("SelectField : invalid or missing position, label or value in removeChoice");
			}
			
			// Choice to remove
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 96);
choice = this.choicesList[position];
			
			// Clear if removing selected choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 99);
if (this.getValue() === choice.value) {
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 100);
this.clear();
			}
			
			// Remove choice in list at position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 104);
this.choicesList.splice(position, 1); // remove 1 element at position
			
			// Remove node from DOM
			// test if visible first in case we try to remove a hiden choice (already detached from parentNode...)
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 108);
if (choice.visible) {
			   _yuitest_coverline("build/inputex-choice/inputex-choice.js", 109);
this.removeChoiceNode(choice.node);
			}
			
		},
		
		/**
		 * Hide a choice
		 * @method hideChoice
		 * @param {Object} config An object targeting the choice to hide (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		hideChoice: function (config, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "hideChoice", 119);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 121);
var position, choice;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 123);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 125);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 127);
choice = this.choicesList[position];
				
				// test if visible first in case we try to hide twice or more...
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 130);
if (choice.visible) {
					
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 132);
choice.visible = false;
					
					// Clear if hiding selected choice
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 135);
if (this.getValue() === choice.value) {
						_yuitest_coverline("build/inputex-choice/inputex-choice.js", 136);
this.clear(sendUpdatedEvt);
					}
					
					// Remove from DOM
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 140);
this.removeChoiceNode(choice.node);
					
				}
				
			}
			
		},
		
		/**
		 * Show a choice
		 * @method showChoice
		 * @param {Object} config An object targeting the choice to show (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		showChoice: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "showChoice", 153);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 155);
var position, choice;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 157);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 159);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 161);
choice = this.choicesList[position];
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 163);
if (!choice.visible) {
					
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 165);
choice.visible = true;
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 166);
this.appendChoiceNode(choice.node, position);
				
				}
				
			}
			
		},
		
		/**
		 * Disable a choice
		 * @method disableChoice
		 * @param {Object} config An object targeting the choice to disable (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		disableChoice: function (config, unselect) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "disableChoice", 179);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 181);
var position, choice;
			
			// Should we unselect choice if disabling selected choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 184);
if (lang.isUndefined(unselect) || !lang.isBoolean(unselect)) { unselect = true; }
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 186);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 188);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 190);
choice = this.choicesList[position];
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 192);
this.disableChoiceNode(choice.node);
				
				// Clear if disabling selected choice
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 195);
if (unselect && this.getValue() === choice.value) {
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 196);
this.clear();
				}
				
			}
			
		},
		
		/**
		 * Enable a choice
		 * @method enableChoice
		 * @param {Object} config An object targeting the choice to enable (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		enableChoice: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "enableChoice", 208);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 210);
var position, choice;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 212);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 214);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 216);
choice = this.choicesList[position];
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 218);
this.enableChoiceNode(choice.node);
				
			}
			
		},
		
		/**
		 * Get the position of a choice in choicesList (NOT in the DOM)
		 * @method getChoicePosition
		 * @param {Object} config An object targeting the choice (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		getChoicePosition: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "getChoicePosition", 229);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 231);
var nbChoices, position = -1;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 233);
nbChoices = this.choicesList.length;
			
			// Handle position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 236);
if (lang.isNumber(config.position) && config.position >= 0 && config.position < nbChoices) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 238);
position = parseInt(config.position, 10);
				
			} else {_yuitest_coverline("build/inputex-choice/inputex-choice.js", 240);
if (!lang.isUndefined(config.value)) {
				
				// get position of choice with value === config.value
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 243);
position = inputEx.indexOf(config.value, this.choicesList, function (value, opt) {
					_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 4)", 243);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 244);
return opt.value === value;
				});
				
			} else {_yuitest_coverline("build/inputex-choice/inputex-choice.js", 247);
if (lang.isString(config.label)) {
				
				// get position of choice with label === config.label
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 250);
position = inputEx.indexOf(config.label, this.choicesList, function (label, opt) {
					_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 5)", 250);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 251);
return opt.label === label;
				});
				
			}}}
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 256);
return position;
		}
		
	};
	
}, '3.1.0',{
  requires: ["inputex"]
});


}, '@VERSION@');
