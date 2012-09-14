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
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-keyopvalue/inputex-keyopvalue.js",
    code: []
};
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].code=["YUI.add('inputex-keyopvalue', function (Y, NAME) {","","/**"," * @module inputex-keyopvalue"," */","YUI.add(\"inputex-keyopvalue\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","","/**"," * Add an SQL operator select field in the middle of a KeyValueField"," * @class inputEx.KeyOpValueField"," * @constructor"," * @extends inputEx.KeyValueField"," * @param {Object} options InputEx definition object with the \"availableFields\""," */","inputEx.KeyOpValueField = function (options) {","   inputEx.KeyOpValueField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.KeyOpValueField, inputEx.KeyValueField, {","	","	/**","	 * Setup the options.fields from the availableFields option","	 * @method setOptions","	 */","	setOptions: function (options) {","		","		var selectFieldConfig, operators, labels, selectOptions, newOptions, i, length;","		","		selectFieldConfig = this.generateSelectConfig(options.availableFields);","		","		operators = options.operators || [\"=\", \">\", \"<\", \">=\", \"<=\", \"!=\", \"LIKE\", \"NOT LIKE\", \"IS NULL\", \"IS NOT NULL\"];","		labels = options.operatorLabels || operators;","		","		selectOptions = [];","		","		for (i = 0, length = operators.length; i < length; i += 1) {","			selectOptions.push({ value: operators[i], label: labels[i] });","		}","		","		newOptions = {","			fields: [","				selectFieldConfig,","				{type: 'select', choices: selectOptions},","				this.nameIndex[options.availableFields[0].name]","			]","		};","		","		Y.mix(newOptions, options);","		","		inputEx.KeyValueField.superclass.setOptions.call(this, newOptions);","	}","	","});","","inputEx.registerType(\"keyopvalue\", inputEx.KeyOpValueField, {});","","},'3.1.0',{","  requires: ['inputex-keyvalue']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].lines = {"1":0,"6":0,"8":0,"19":0,"20":0,"23":0,"31":0,"33":0,"35":0,"36":0,"38":0,"40":0,"41":0,"44":0,"52":0,"54":0,"59":0};
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].functions = {"KeyOpValueField:19":0,"setOptions:29":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].coveredLines = 17;
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 1);
YUI.add('inputex-keyopvalue', function (Y, NAME) {

/**
 * @module inputex-keyopvalue
 */
_yuitest_coverfunc("build/inputex-keyopvalue/inputex-keyopvalue.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 6);
YUI.add("inputex-keyopvalue",function(Y){

   _yuitest_coverfunc("build/inputex-keyopvalue/inputex-keyopvalue.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;


/**
 * Add an SQL operator select field in the middle of a KeyValueField
 * @class inputEx.KeyOpValueField
 * @constructor
 * @extends inputEx.KeyValueField
 * @param {Object} options InputEx definition object with the "availableFields"
 */
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 19);
inputEx.KeyOpValueField = function (options) {
   _yuitest_coverfunc("build/inputex-keyopvalue/inputex-keyopvalue.js", "KeyOpValueField", 19);
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 20);
inputEx.KeyOpValueField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 23);
Y.extend(inputEx.KeyOpValueField, inputEx.KeyValueField, {
	
	/**
	 * Setup the options.fields from the availableFields option
	 * @method setOptions
	 */
	setOptions: function (options) {
		
		_yuitest_coverfunc("build/inputex-keyopvalue/inputex-keyopvalue.js", "setOptions", 29);
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 31);
var selectFieldConfig, operators, labels, selectOptions, newOptions, i, length;
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 33);
selectFieldConfig = this.generateSelectConfig(options.availableFields);
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 35);
operators = options.operators || ["=", ">", "<", ">=", "<=", "!=", "LIKE", "NOT LIKE", "IS NULL", "IS NOT NULL"];
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 36);
labels = options.operatorLabels || operators;
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 38);
selectOptions = [];
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 40);
for (i = 0, length = operators.length; i < length; i += 1) {
			_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 41);
selectOptions.push({ value: operators[i], label: labels[i] });
		}
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 44);
newOptions = {
			fields: [
				selectFieldConfig,
				{type: 'select', choices: selectOptions},
				this.nameIndex[options.availableFields[0].name]
			]
		};
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 52);
Y.mix(newOptions, options);
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 54);
inputEx.KeyValueField.superclass.setOptions.call(this, newOptions);
	}
	
});

_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 59);
inputEx.registerType("keyopvalue", inputEx.KeyOpValueField, {});

},'3.1.0',{
  requires: ['inputex-keyvalue']
});


}, '@VERSION@');
