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
_yuitest_coverage["build/inputex-keyvalue/inputex-keyvalue.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-keyvalue/inputex-keyvalue.js",
    code: []
};
_yuitest_coverage["build/inputex-keyvalue/inputex-keyvalue.js"].code=["YUI.add('inputex-keyvalue', function (Y, NAME) {","","/**"," * @module inputex-keyvalue"," */","YUI.add(\"inputex-keyvalue\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Display a selectors for keys and auto-update the value field"," * @class inputEx.KeyValueField"," * @constructor"," * @extends inputEx.CombineField"," * @param {Object} options InputEx definition object with the \"availableFields\""," */","inputEx.KeyValueField = function(options) {","   inputEx.KeyValueField.superclass.constructor.call(this, options);","};","","Y.extend( inputEx.KeyValueField, inputEx.CombineField, {","   ","   /**","    * Subscribe the \"updated\" event on the key selector","    * @method initEvents","    */","   initEvents: function() {","      inputEx.KeyValueField.superclass.initEvents.call(this);","","      this.inputs[0].on('updated',this.onSelectFieldChange, this, true); ","   },","","","	/**","	 * Generate","	 * @method generateSelectConfig","	 */","	generateSelectConfig: function(availableFields) {","		","		this.nameIndex = {};","		","		var choices = [], i, field, fieldCopy, k, l;","		","		for (i = 0 , l = availableFields.length ; i < l ; i++) {","			","			field =  availableFields[i];","			fieldCopy = {};","			for (k in field) {","				if (field.hasOwnProperty(k) && k != \"label\") {","					fieldCopy[k] = field[k];","				}","			}","			","			this.nameIndex[field.name] = fieldCopy;","			","			choices.push({ value: field.name, label:field.label || field.name });","			","		}","		","		return { type: 'select', choices: choices };","	},","","	/**","	 * Setup the options.fields from the availableFields option","	 * @method setOptions","	 */","	setOptions: function(options) {","		","		var selectFieldConfig = this.generateSelectConfig(options.availableFields);","	","		var newOptions = {","			fields: [","				selectFieldConfig,","				this.nameIndex[options.availableFields[0].name]","			]","		};","		","		Y.mix(newOptions, options);","		","		inputEx.KeyValueField.superclass.setOptions.call(this, newOptions);","	},","   ","   /**","    * Rebuild the value field","    * @method onSelectFieldChange","    */","   onSelectFieldChange: function(value) {","      var f = this.nameIndex[value];","      var lastInput = this.inputs[this.inputs.length-1];","      var next = this.divEl.childNodes[inputEx.indexOf(lastInput.getEl(), this.divEl.childNodes)+1];","      lastInput.destroy();","      this.inputs.pop();","      var field = this.renderField(f);","      var fieldEl = field.getEl();","      Y.one(fieldEl).setStyle('float', 'left');","      ","      this.divEl.insertBefore(fieldEl, next);","   }","   ","});","","inputEx.registerType(\"keyvalue\", inputEx.KeyValueField, {});","","},'3.1.0',{","  requires: ['inputex-combine']","});","","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-keyvalue/inputex-keyvalue.js"].lines = {"1":0,"6":0,"8":0,"18":0,"19":0,"22":0,"29":0,"31":0,"41":0,"43":0,"45":0,"47":0,"48":0,"49":0,"50":0,"51":0,"55":0,"57":0,"61":0,"70":0,"72":0,"79":0,"81":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"98":0,"103":0};
_yuitest_coverage["build/inputex-keyvalue/inputex-keyvalue.js"].functions = {"KeyValueField:18":0,"initEvents:28":0,"generateSelectConfig:39":0,"setOptions:68":0,"onSelectFieldChange:88":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-keyvalue/inputex-keyvalue.js"].coveredLines = 33;
_yuitest_coverage["build/inputex-keyvalue/inputex-keyvalue.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 1);
YUI.add('inputex-keyvalue', function (Y, NAME) {

/**
 * @module inputex-keyvalue
 */
_yuitest_coverfunc("build/inputex-keyvalue/inputex-keyvalue.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 6);
YUI.add("inputex-keyvalue",function(Y){

   _yuitest_coverfunc("build/inputex-keyvalue/inputex-keyvalue.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Display a selectors for keys and auto-update the value field
 * @class inputEx.KeyValueField
 * @constructor
 * @extends inputEx.CombineField
 * @param {Object} options InputEx definition object with the "availableFields"
 */
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 18);
inputEx.KeyValueField = function(options) {
   _yuitest_coverfunc("build/inputex-keyvalue/inputex-keyvalue.js", "KeyValueField", 18);
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 19);
inputEx.KeyValueField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 22);
Y.extend( inputEx.KeyValueField, inputEx.CombineField, {
   
   /**
    * Subscribe the "updated" event on the key selector
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-keyvalue/inputex-keyvalue.js", "initEvents", 28);
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 29);
inputEx.KeyValueField.superclass.initEvents.call(this);

      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 31);
this.inputs[0].on('updated',this.onSelectFieldChange, this, true); 
   },


	/**
	 * Generate
	 * @method generateSelectConfig
	 */
	generateSelectConfig: function(availableFields) {
		
		_yuitest_coverfunc("build/inputex-keyvalue/inputex-keyvalue.js", "generateSelectConfig", 39);
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 41);
this.nameIndex = {};
		
		_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 43);
var choices = [], i, field, fieldCopy, k, l;
		
		_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 45);
for (i = 0 , l = availableFields.length ; i < l ; i++) {
			
			_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 47);
field =  availableFields[i];
			_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 48);
fieldCopy = {};
			_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 49);
for (k in field) {
				_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 50);
if (field.hasOwnProperty(k) && k != "label") {
					_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 51);
fieldCopy[k] = field[k];
				}
			}
			
			_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 55);
this.nameIndex[field.name] = fieldCopy;
			
			_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 57);
choices.push({ value: field.name, label:field.label || field.name });
			
		}
		
		_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 61);
return { type: 'select', choices: choices };
	},

	/**
	 * Setup the options.fields from the availableFields option
	 * @method setOptions
	 */
	setOptions: function(options) {
		
		_yuitest_coverfunc("build/inputex-keyvalue/inputex-keyvalue.js", "setOptions", 68);
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 70);
var selectFieldConfig = this.generateSelectConfig(options.availableFields);
	
		_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 72);
var newOptions = {
			fields: [
				selectFieldConfig,
				this.nameIndex[options.availableFields[0].name]
			]
		};
		
		_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 79);
Y.mix(newOptions, options);
		
		_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 81);
inputEx.KeyValueField.superclass.setOptions.call(this, newOptions);
	},
   
   /**
    * Rebuild the value field
    * @method onSelectFieldChange
    */
   onSelectFieldChange: function(value) {
      _yuitest_coverfunc("build/inputex-keyvalue/inputex-keyvalue.js", "onSelectFieldChange", 88);
_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 89);
var f = this.nameIndex[value];
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 90);
var lastInput = this.inputs[this.inputs.length-1];
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 91);
var next = this.divEl.childNodes[inputEx.indexOf(lastInput.getEl(), this.divEl.childNodes)+1];
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 92);
lastInput.destroy();
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 93);
this.inputs.pop();
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 94);
var field = this.renderField(f);
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 95);
var fieldEl = field.getEl();
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 96);
Y.one(fieldEl).setStyle('float', 'left');
      
      _yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 98);
this.divEl.insertBefore(fieldEl, next);
   }
   
});

_yuitest_coverline("build/inputex-keyvalue/inputex-keyvalue.js", 103);
inputEx.registerType("keyvalue", inputEx.KeyValueField, {});

},'3.1.0',{
  requires: ['inputex-combine']
});



}, '@VERSION@');
