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
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].code=["YUI.add('inputex-choice', function (Y, NAME) {","","/**"," * @module inputex-choice"," */","	var lang = Y.Lang,","	    inputEx = Y.inputEx;","	","	/**","	 * This static class is used to provide basic choices functionnalities such as in \"select\" and \"radio\" fields","	 * We use it by mixin the methods below to the target prototype: ","	 *  eg.  Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);","	 * It provides the following methods : addChoice, removeChoice, hideChoice, showChoice, disableChoice, enableChoice, and getChoicePosition","	 * @class inputEx.mixin.choice","	 */","	inputEx.mixin.choice = {","		","		/**","		 * Add a choice","		 * @method addChoice","		 * @param {Object} config An object describing the choice to add (e.g. { value: 'second' [, label: 'Second' [, position: 1 || after: 'First' || before: 'Third']] })","		 */","		addChoice: function (config) {","			","			var choice, position, that;","			","			// allow config not to be an object, just a value -> convert it in a standard config object","			if (!lang.isObject(config)) {","				config = { value: config };","			}","			","			choice = {","				value: config.value,","				label: lang.isString(config.label) ? config.label : \"\" + config.value,","				visible: true","			};","			","			// Create DOM <option> node","			choice.node = this.createChoiceNode(choice);","			","			// Get choice's position","			//   -> don't pass config.value to getChoicePosition !!!","			//     (we search position of existing choice, whereas config.value is a property of new choice to be created...)","			position = this.getChoicePosition({ position: config.position, label: config.before || config.after });","			","			if (position === -1) { //  (default is at the end)","				position = this.choicesList.length;","				","			} else if (lang.isString(config.after)) {","				// +1 to insert \"after\" position (not \"at\" position)","				position += 1;","			}","			","			","			// Insert choice in list at position","			this.choicesList.splice(position, 0, choice);","			","			// Append <option> node in DOM","			this.appendChoiceNode(choice.node, position);","			","			// Select new choice","			if (!!config.selected) {","				","				// setTimeout for IE6 (let time to create dom option)","				that = this;","				setTimeout(function () {","					that.setValue(choice.value);","				}, 0);","				","			}","			","			// Return generated choice","			return choice;","			","		},","		","		/**","		 * Remove a choice","		 * @method removeChoice","		 * @param {Object} config An object targeting the choice to remove (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		removeChoice: function (config) {","			","			var position, choice;","			","			// Get choice's position","			position = this.getChoicePosition(config);","			","			if (position === -1) {","				throw new Error(\"SelectField : invalid or missing position, label or value in removeChoice\");","			}","			","			// Choice to remove","			choice = this.choicesList[position];","			","			// Clear if removing selected choice","			if (this.getValue() === choice.value) {","				this.clear();","			}","			","			// Remove choice in list at position","			this.choicesList.splice(position, 1); // remove 1 element at position","			","			// Remove node from DOM","			// test if visible first in case we try to remove a hiden choice (already detached from parentNode...)","			if (choice.visible) {","			   this.removeChoiceNode(choice.node);","			}","			","		},","		","		/**","		 * Hide a choice","		 * @method hideChoice","		 * @param {Object} config An object targeting the choice to hide (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		hideChoice: function (config, sendUpdatedEvt) {","			","			var position, choice;","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				// test if visible first in case we try to hide twice or more...","				if (choice.visible) {","					","					choice.visible = false;","					","					// Clear if hiding selected choice","					if (this.getValue() === choice.value) {","						this.clear(sendUpdatedEvt);","					}","					","					// Remove from DOM","					this.removeChoiceNode(choice.node);","					","				}","				","			}","			","		},","		","		/**","		 * Show a choice","		 * @method showChoice","		 * @param {Object} config An object targeting the choice to show (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		showChoice: function (config) {","			","			var position, choice;","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				if (!choice.visible) {","					","					choice.visible = true;","					this.appendChoiceNode(choice.node, position);","				","				}","				","			}","			","		},","		","		/**","		 * Disable a choice","		 * @method disableChoice","		 * @param {Object} config An object targeting the choice to disable (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		disableChoice: function (config, unselect) {","			","			var position, choice;","			","			// Should we unselect choice if disabling selected choice","			if (lang.isUndefined(unselect) || !lang.isBoolean(unselect)) { unselect = true; }","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				this.disableChoiceNode(choice.node);","				","				// Clear if disabling selected choice","				if (unselect && this.getValue() === choice.value) {","					this.clear();","				}","				","			}","			","		},","		","		/**","		 * Enable a choice","		 * @method enableChoice","		 * @param {Object} config An object targeting the choice to enable (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		enableChoice: function (config) {","			","			var position, choice;","			","			position = this.getChoicePosition(config);","			","			if (position !== -1) {","				","				choice = this.choicesList[position];","				","				this.enableChoiceNode(choice.node);","				","			}","			","		},","		","		/**","		 * Get the position of a choice in choicesList (NOT in the DOM)","		 * @method getChoicePosition","		 * @param {Object} config An object targeting the choice (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })","		 */","		getChoicePosition: function (config) {","			","			var nbChoices, position = -1;","			","			nbChoices = this.choicesList.length;","			","			// Handle position","			if (lang.isNumber(config.position) && config.position >= 0 && config.position < nbChoices) {","				","				position = parseInt(config.position, 10);","				","			} else if (!lang.isUndefined(config.value)) {","				","				// get position of choice with value === config.value","				position = inputEx.indexOf(config.value, this.choicesList, function (value, opt) {","					return opt.value === value;","				});","				","			} else if (lang.isString(config.label)) {","				","				// get position of choice with label === config.label","				position = inputEx.indexOf(config.label, this.choicesList, function (label, opt) {","					return opt.label === label;","				});","				","			}","			","			return position;","		}","		","	};","","","}, '@VERSION@', {\"requires\": [\"inputex\"]});"];
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].lines = {"1":0,"6":0,"16":0,"25":0,"28":0,"29":0,"32":0,"39":0,"44":0,"46":0,"47":0,"49":0,"51":0,"56":0,"59":0,"62":0,"65":0,"66":0,"67":0,"73":0,"84":0,"87":0,"89":0,"90":0,"94":0,"97":0,"98":0,"102":0,"106":0,"107":0,"119":0,"121":0,"123":0,"125":0,"128":0,"130":0,"133":0,"134":0,"138":0,"153":0,"155":0,"157":0,"159":0,"161":0,"163":0,"164":0,"179":0,"182":0,"184":0,"186":0,"188":0,"190":0,"193":0,"194":0,"208":0,"210":0,"212":0,"214":0,"216":0,"229":0,"231":0,"234":0,"236":0,"238":0,"241":0,"242":0,"245":0,"248":0,"249":0,"254":0};
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].functions = {"(anonymous 2):66":0,"addChoice:23":0,"removeChoice:82":0,"hideChoice:117":0,"showChoice:151":0,"disableChoice:177":0,"enableChoice:206":0,"(anonymous 3):241":0,"(anonymous 4):248":0,"getChoicePosition:227":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].coveredLines = 70;
_yuitest_coverage["build/inputex-choice/inputex-choice.js"].coveredFunctions = 11;
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 1);
YUI.add('inputex-choice', function (Y, NAME) {

/**
 * @module inputex-choice
 */
	_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 6);
var lang = Y.Lang,
	    inputEx = Y.inputEx;
	
	/**
	 * This static class is used to provide basic choices functionnalities such as in "select" and "radio" fields
	 * We use it by mixin the methods below to the target prototype: 
	 *  eg.  Y.mix(inputEx.SelectField.prototype, inputEx.mixin.choice);
	 * It provides the following methods : addChoice, removeChoice, hideChoice, showChoice, disableChoice, enableChoice, and getChoicePosition
	 * @class inputEx.mixin.choice
	 */
	_yuitest_coverline("build/inputex-choice/inputex-choice.js", 16);
inputEx.mixin.choice = {
		
		/**
		 * Add a choice
		 * @method addChoice
		 * @param {Object} config An object describing the choice to add (e.g. { value: 'second' [, label: 'Second' [, position: 1 || after: 'First' || before: 'Third']] })
		 */
		addChoice: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "addChoice", 23);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 25);
var choice, position, that;
			
			// allow config not to be an object, just a value -> convert it in a standard config object
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 28);
if (!lang.isObject(config)) {
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 29);
config = { value: config };
			}
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 32);
choice = {
				value: config.value,
				label: lang.isString(config.label) ? config.label : "" + config.value,
				visible: true
			};
			
			// Create DOM <option> node
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 39);
choice.node = this.createChoiceNode(choice);
			
			// Get choice's position
			//   -> don't pass config.value to getChoicePosition !!!
			//     (we search position of existing choice, whereas config.value is a property of new choice to be created...)
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 44);
position = this.getChoicePosition({ position: config.position, label: config.before || config.after });
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 46);
if (position === -1) { //  (default is at the end)
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 47);
position = this.choicesList.length;
				
			} else {_yuitest_coverline("build/inputex-choice/inputex-choice.js", 49);
if (lang.isString(config.after)) {
				// +1 to insert "after" position (not "at" position)
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 51);
position += 1;
			}}
			
			
			// Insert choice in list at position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 56);
this.choicesList.splice(position, 0, choice);
			
			// Append <option> node in DOM
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 59);
this.appendChoiceNode(choice.node, position);
			
			// Select new choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 62);
if (!!config.selected) {
				
				// setTimeout for IE6 (let time to create dom option)
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 65);
that = this;
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 66);
setTimeout(function () {
					_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 2)", 66);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 67);
that.setValue(choice.value);
				}, 0);
				
			}
			
			// Return generated choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 73);
return choice;
			
		},
		
		/**
		 * Remove a choice
		 * @method removeChoice
		 * @param {Object} config An object targeting the choice to remove (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		removeChoice: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "removeChoice", 82);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 84);
var position, choice;
			
			// Get choice's position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 87);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 89);
if (position === -1) {
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 90);
throw new Error("SelectField : invalid or missing position, label or value in removeChoice");
			}
			
			// Choice to remove
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 94);
choice = this.choicesList[position];
			
			// Clear if removing selected choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 97);
if (this.getValue() === choice.value) {
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 98);
this.clear();
			}
			
			// Remove choice in list at position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 102);
this.choicesList.splice(position, 1); // remove 1 element at position
			
			// Remove node from DOM
			// test if visible first in case we try to remove a hiden choice (already detached from parentNode...)
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 106);
if (choice.visible) {
			   _yuitest_coverline("build/inputex-choice/inputex-choice.js", 107);
this.removeChoiceNode(choice.node);
			}
			
		},
		
		/**
		 * Hide a choice
		 * @method hideChoice
		 * @param {Object} config An object targeting the choice to hide (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		hideChoice: function (config, sendUpdatedEvt) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "hideChoice", 117);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 119);
var position, choice;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 121);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 123);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 125);
choice = this.choicesList[position];
				
				// test if visible first in case we try to hide twice or more...
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 128);
if (choice.visible) {
					
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 130);
choice.visible = false;
					
					// Clear if hiding selected choice
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 133);
if (this.getValue() === choice.value) {
						_yuitest_coverline("build/inputex-choice/inputex-choice.js", 134);
this.clear(sendUpdatedEvt);
					}
					
					// Remove from DOM
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 138);
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
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "showChoice", 151);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 153);
var position, choice;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 155);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 157);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 159);
choice = this.choicesList[position];
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 161);
if (!choice.visible) {
					
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 163);
choice.visible = true;
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 164);
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
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "disableChoice", 177);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 179);
var position, choice;
			
			// Should we unselect choice if disabling selected choice
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 182);
if (lang.isUndefined(unselect) || !lang.isBoolean(unselect)) { unselect = true; }
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 184);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 186);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 188);
choice = this.choicesList[position];
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 190);
this.disableChoiceNode(choice.node);
				
				// Clear if disabling selected choice
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 193);
if (unselect && this.getValue() === choice.value) {
					_yuitest_coverline("build/inputex-choice/inputex-choice.js", 194);
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
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "enableChoice", 206);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 208);
var position, choice;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 210);
position = this.getChoicePosition(config);
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 212);
if (position !== -1) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 214);
choice = this.choicesList[position];
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 216);
this.enableChoiceNode(choice.node);
				
			}
			
		},
		
		/**
		 * Get the position of a choice in choicesList (NOT in the DOM)
		 * @method getChoicePosition
		 * @param {Object} config An object targeting the choice (e.g. { position : 1 } || { value: 'second' } || { label: 'Second' })
		 */
		getChoicePosition: function (config) {
			
			_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "getChoicePosition", 227);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 229);
var nbChoices, position = -1;
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 231);
nbChoices = this.choicesList.length;
			
			// Handle position
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 234);
if (lang.isNumber(config.position) && config.position >= 0 && config.position < nbChoices) {
				
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 236);
position = parseInt(config.position, 10);
				
			} else {_yuitest_coverline("build/inputex-choice/inputex-choice.js", 238);
if (!lang.isUndefined(config.value)) {
				
				// get position of choice with value === config.value
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 241);
position = inputEx.indexOf(config.value, this.choicesList, function (value, opt) {
					_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 3)", 241);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 242);
return opt.value === value;
				});
				
			} else {_yuitest_coverline("build/inputex-choice/inputex-choice.js", 245);
if (lang.isString(config.label)) {
				
				// get position of choice with label === config.label
				_yuitest_coverline("build/inputex-choice/inputex-choice.js", 248);
position = inputEx.indexOf(config.label, this.choicesList, function (label, opt) {
					_yuitest_coverfunc("build/inputex-choice/inputex-choice.js", "(anonymous 4)", 248);
_yuitest_coverline("build/inputex-choice/inputex-choice.js", 249);
return opt.label === label;
				});
				
			}}}
			
			_yuitest_coverline("build/inputex-choice/inputex-choice.js", 254);
return position;
		}
		
	};


}, '@VERSION@', {"requires": ["inputex"]});
