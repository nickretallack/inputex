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
_yuitest_coverage["build/inputex-ipv4/inputex-ipv4.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-ipv4/inputex-ipv4.js",
    code: []
};
_yuitest_coverage["build/inputex-ipv4/inputex-ipv4.js"].code=["YUI.add('inputex-ipv4', function (Y, NAME) {","","/**"," * @module inputex-ipv4"," */","YUI.add(\"inputex-ipv4\",function(Y){","	","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Adds an IPv4 address regexp"," * @class inputEx.IPv4Field"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.IPv4Field = function(options) {","	inputEx.IPv4Field.superclass.constructor.call(this,options);","};","Y.extend(inputEx.IPv4Field, inputEx.StringField, {","   ","   /**","    * set IPv4 regexp and invalid string","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.IPv4Field.superclass.setOptions.call(this, options);","      this.options.messages.invalid = inputEx.messages.invalidIPv4;","      this.options.regexp = /^(?:1\\d?\\d?|2(?:[0-4]\\d?|[6789]|5[0-5]?)?|[3-9]\\d?|0)(?:\\.(?:1\\d?\\d?|2(?:[0-4]\\d?|[6789]|5[0-5]?)?|[3-9]\\d?|0)){3}$/;","   }","  ","});","","// Register this class as \"IPv4\" type","inputEx.registerType(\"IPv4\", inputEx.IPv4Field, []);","","},'3.1.0',{","  requires: [\"inputex-string\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-ipv4/inputex-ipv4.js"].lines = {"1":0,"6":0,"8":0,"18":0,"19":0,"21":0,"29":0,"30":0,"31":0,"37":0};
_yuitest_coverage["build/inputex-ipv4/inputex-ipv4.js"].functions = {"IPv4Field:18":0,"setOptions:28":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-ipv4/inputex-ipv4.js"].coveredLines = 10;
_yuitest_coverage["build/inputex-ipv4/inputex-ipv4.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 1);
YUI.add('inputex-ipv4', function (Y, NAME) {

/**
 * @module inputex-ipv4
 */
_yuitest_coverfunc("build/inputex-ipv4/inputex-ipv4.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 6);
YUI.add("inputex-ipv4",function(Y){
	
   _yuitest_coverfunc("build/inputex-ipv4/inputex-ipv4.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Adds an IPv4 address regexp
 * @class inputEx.IPv4Field
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 18);
inputEx.IPv4Field = function(options) {
	_yuitest_coverfunc("build/inputex-ipv4/inputex-ipv4.js", "IPv4Field", 18);
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 19);
inputEx.IPv4Field.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 21);
Y.extend(inputEx.IPv4Field, inputEx.StringField, {
   
   /**
    * set IPv4 regexp and invalid string
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-ipv4/inputex-ipv4.js", "setOptions", 28);
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 29);
inputEx.IPv4Field.superclass.setOptions.call(this, options);
      _yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 30);
this.options.messages.invalid = inputEx.messages.invalidIPv4;
      _yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 31);
this.options.regexp = /^(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)(?:\.(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)){3}$/;
   }
  
});

// Register this class as "IPv4" type
_yuitest_coverline("build/inputex-ipv4/inputex-ipv4.js", 37);
inputEx.registerType("IPv4", inputEx.IPv4Field, []);

},'3.1.0',{
  requires: ["inputex-string"]
});


}, '@VERSION@');
