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
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].code=["YUI.add('inputex-keyopvalue', function (Y, NAME) {","","/**"," * @module inputex-keyopvalue"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Add an SQL operator select field in the middle of a KeyValueField"," * @class inputEx.KeyOpValueField"," * @constructor"," * @extends inputEx.KeyValueField"," * @param {Object} options InputEx definition object with the \"availableFields\""," */","inputEx.KeyOpValueField = function (options) {","   inputEx.KeyOpValueField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.KeyOpValueField, inputEx.KeyValueField, {","	","	/**","	 * Setup the options.fields from the availableFields option","	 * @method setOptions","	 */","	setOptions: function (options) {","		","		var selectFieldConfig, operators, labels, selectOptions, newOptions, i, length;","		","		selectFieldConfig = this.generateSelectConfig(options.availableFields);","		","		operators = options.operators || [\"=\", \">\", \"<\", \">=\", \"<=\", \"!=\", \"LIKE\", \"NOT LIKE\", \"IS NULL\", \"IS NOT NULL\"];","		labels = options.operatorLabels || operators;","		","		selectOptions = [];","		","		for (i = 0, length = operators.length; i < length; i += 1) {","			selectOptions.push({ value: operators[i], label: labels[i] });","		}","		","		newOptions = {","			fields: [","				selectFieldConfig,","				{type: 'select', choices: selectOptions},","				this.nameIndex[options.availableFields[0].name]","			]","		};","		","		Y.mix(newOptions, options);","		","		inputEx.KeyValueField.superclass.setOptions.call(this, newOptions);","	}","	","});","","inputEx.registerType(\"keyopvalue\", inputEx.KeyOpValueField, {});","","","}, '@VERSION@', {\"requires\": [\"inputex-keyvalue\"], \"ix_provides\": \"keyopvalue\"});"];
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].lines = {"1":0,"6":0,"16":0,"17":0,"20":0,"28":0,"30":0,"32":0,"33":0,"35":0,"37":0,"38":0,"41":0,"49":0,"51":0,"56":0};
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].functions = {"KeyOpValueField:16":0,"setOptions:26":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].coveredLines = 16;
_yuitest_coverage["build/inputex-keyopvalue/inputex-keyopvalue.js"].coveredFunctions = 3;
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 1);
YUI.add('inputex-keyopvalue', function (Y, NAME) {

/**
 * @module inputex-keyopvalue
 */
   _yuitest_coverfunc("build/inputex-keyopvalue/inputex-keyopvalue.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Add an SQL operator select field in the middle of a KeyValueField
 * @class inputEx.KeyOpValueField
 * @constructor
 * @extends inputEx.KeyValueField
 * @param {Object} options InputEx definition object with the "availableFields"
 */
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 16);
inputEx.KeyOpValueField = function (options) {
   _yuitest_coverfunc("build/inputex-keyopvalue/inputex-keyopvalue.js", "KeyOpValueField", 16);
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 17);
inputEx.KeyOpValueField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 20);
Y.extend(inputEx.KeyOpValueField, inputEx.KeyValueField, {
	
	/**
	 * Setup the options.fields from the availableFields option
	 * @method setOptions
	 */
	setOptions: function (options) {
		
		_yuitest_coverfunc("build/inputex-keyopvalue/inputex-keyopvalue.js", "setOptions", 26);
_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 28);
var selectFieldConfig, operators, labels, selectOptions, newOptions, i, length;
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 30);
selectFieldConfig = this.generateSelectConfig(options.availableFields);
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 32);
operators = options.operators || ["=", ">", "<", ">=", "<=", "!=", "LIKE", "NOT LIKE", "IS NULL", "IS NOT NULL"];
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 33);
labels = options.operatorLabels || operators;
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 35);
selectOptions = [];
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 37);
for (i = 0, length = operators.length; i < length; i += 1) {
			_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 38);
selectOptions.push({ value: operators[i], label: labels[i] });
		}
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 41);
newOptions = {
			fields: [
				selectFieldConfig,
				{type: 'select', choices: selectOptions},
				this.nameIndex[options.availableFields[0].name]
			]
		};
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 49);
Y.mix(newOptions, options);
		
		_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 51);
inputEx.KeyValueField.superclass.setOptions.call(this, newOptions);
	}
	
});

_yuitest_coverline("build/inputex-keyopvalue/inputex-keyopvalue.js", 56);
inputEx.registerType("keyopvalue", inputEx.KeyOpValueField, {});


}, '@VERSION@', {"requires": ["inputex-keyvalue"], "ix_provides": "keyopvalue"});
