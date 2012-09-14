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
_yuitest_coverage["build/inputex-file/inputex-file.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-file/inputex-file.js",
    code: []
};
_yuitest_coverage["build/inputex-file/inputex-file.js"].code=["YUI.add('inputex-file', function (Y, NAME) {","","/**"," * @module inputex-file"," */","YUI.add(\"inputex-file\", function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a file input"," * @class inputEx.FileField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," * </ul>"," */","inputEx.FileField = function(options) {","	inputEx.FileField.superclass.constructor.call(this,options);","};","inputEx.FileField._id_count = 0;","Y.extend(inputEx.FileField, inputEx.Field, {","	","   /**","    * Adds size and accept options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","		inputEx.FileField.superclass.setOptions.call(this, options);","		this.options.size = options.size;","		this.options.accept = options.accept;","	},","	","   /**","    * Render an 'INPUT' DOM node","    * @method renderComponent","    */","   renderComponent: function() {","      ","      // Attributes of the input field","      var attributes = {};","      attributes.id = this.divEl.id?this.divEl.id+'-field': (\"_inputex_fileid\"+(inputEx.FileField._id_count++));","      attributes.type = \"file\";","      if(this.options.name) attributes.name = this.options.name;","   	if(this.options.size) attributes.size = this.options.size;","   	if(this.options.accept) attributes.accept = this.options.accept;","","      // Create the node","      this.el = inputEx.cn('input', attributes);","      ","      // Append it to the main element","      this.fieldContainer.appendChild(this.el);","   }","","});","","// Register this class as \"file\" type","inputEx.registerType(\"file\", inputEx.FileField);","","","}, '3.1.0',{","requires: ['inputex-field']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-file/inputex-file.js"].lines = {"1":0,"6":0,"8":0,"20":0,"21":0,"23":0,"24":0,"32":0,"33":0,"34":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"52":0,"55":0,"61":0};
_yuitest_coverage["build/inputex-file/inputex-file.js"].functions = {"FileField:20":0,"setOptions:31":0,"renderComponent:41":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-file/inputex-file.js"].coveredLines = 19;
_yuitest_coverage["build/inputex-file/inputex-file.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-file/inputex-file.js", 1);
YUI.add('inputex-file', function (Y, NAME) {

/**
 * @module inputex-file
 */
_yuitest_coverfunc("build/inputex-file/inputex-file.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-file/inputex-file.js", 6);
YUI.add("inputex-file", function(Y){

   _yuitest_coverfunc("build/inputex-file/inputex-file.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-file/inputex-file.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Create a file input
 * @class inputEx.FileField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 * </ul>
 */
_yuitest_coverline("build/inputex-file/inputex-file.js", 20);
inputEx.FileField = function(options) {
	_yuitest_coverfunc("build/inputex-file/inputex-file.js", "FileField", 20);
_yuitest_coverline("build/inputex-file/inputex-file.js", 21);
inputEx.FileField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-file/inputex-file.js", 23);
inputEx.FileField._id_count = 0;
_yuitest_coverline("build/inputex-file/inputex-file.js", 24);
Y.extend(inputEx.FileField, inputEx.Field, {
	
   /**
    * Adds size and accept options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
		_yuitest_coverfunc("build/inputex-file/inputex-file.js", "setOptions", 31);
_yuitest_coverline("build/inputex-file/inputex-file.js", 32);
inputEx.FileField.superclass.setOptions.call(this, options);
		_yuitest_coverline("build/inputex-file/inputex-file.js", 33);
this.options.size = options.size;
		_yuitest_coverline("build/inputex-file/inputex-file.js", 34);
this.options.accept = options.accept;
	},
	
   /**
    * Render an 'INPUT' DOM node
    * @method renderComponent
    */
   renderComponent: function() {
      
      // Attributes of the input field
      _yuitest_coverfunc("build/inputex-file/inputex-file.js", "renderComponent", 41);
_yuitest_coverline("build/inputex-file/inputex-file.js", 44);
var attributes = {};
      _yuitest_coverline("build/inputex-file/inputex-file.js", 45);
attributes.id = this.divEl.id?this.divEl.id+'-field': ("_inputex_fileid"+(inputEx.FileField._id_count++));
      _yuitest_coverline("build/inputex-file/inputex-file.js", 46);
attributes.type = "file";
      _yuitest_coverline("build/inputex-file/inputex-file.js", 47);
if(this.options.name) {attributes.name = this.options.name;}
   	_yuitest_coverline("build/inputex-file/inputex-file.js", 48);
if(this.options.size) {attributes.size = this.options.size;}
   	_yuitest_coverline("build/inputex-file/inputex-file.js", 49);
if(this.options.accept) {attributes.accept = this.options.accept;}

      // Create the node
      _yuitest_coverline("build/inputex-file/inputex-file.js", 52);
this.el = inputEx.cn('input', attributes);
      
      // Append it to the main element
      _yuitest_coverline("build/inputex-file/inputex-file.js", 55);
this.fieldContainer.appendChild(this.el);
   }

});

// Register this class as "file" type
_yuitest_coverline("build/inputex-file/inputex-file.js", 61);
inputEx.registerType("file", inputEx.FileField);


}, '3.1.0',{
requires: ['inputex-field']
});


}, '@VERSION@');
