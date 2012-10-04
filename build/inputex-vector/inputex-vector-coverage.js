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
_yuitest_coverage["build/inputex-vector/inputex-vector.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-vector/inputex-vector.js",
    code: []
};
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].code=["YUI.add('inputex-vector', function (Y, NAME) {","","/**"," * @module inputex-vector"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","/**"," * A field limited to number inputs (floating)"," * @class inputEx.VectorField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.VectorField = function(options) {","   inputEx.VectorField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.VectorField, inputEx.CombineField, {  ","   /**","    * Additional options for VectorField (dimension, size)","    * @method setOptions","    */ ","   setOptions: function(options) {","      inputEx.VectorField.superclass.setOptions.call(this, options);","     ","      this.options.dimension = options.dimension || 2;","      this.options.size = options.size || 3;","     ","      this.options.fields = [];","      for(var i = 0 ; i < this.options.dimension ; i++) {","         this.options.fields.push({type: 'number', size: this.options.size });","      }","   }","});","","// Register this class as \"2Dvector\" type","inputEx.registerType(\"vector\", inputEx.VectorField, [","   { type: 'integer', label: 'Dimension', name:'dimension', value: 2},","   { type: 'integer', label: 'Size', name:'size', value: 3},","   { type: 'list', name: 'separators', label: 'Separators', required: true }","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-combine\"], \"ix_provides\": \"vector\"});"];
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].lines = {"1":0,"6":0,"15":0,"16":0,"18":0,"24":0,"26":0,"27":0,"29":0,"30":0,"31":0,"37":0};
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].functions = {"VectorField:15":0,"setOptions:23":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].coveredLines = 12;
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].coveredFunctions = 3;
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 1);
YUI.add('inputex-vector', function (Y, NAME) {

/**
 * @module inputex-vector
 */
   _yuitest_coverfunc("build/inputex-vector/inputex-vector.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;
/**
 * A field limited to number inputs (floating)
 * @class inputEx.VectorField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 15);
inputEx.VectorField = function(options) {
   _yuitest_coverfunc("build/inputex-vector/inputex-vector.js", "VectorField", 15);
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 16);
inputEx.VectorField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 18);
Y.extend(inputEx.VectorField, inputEx.CombineField, {  
   /**
    * Additional options for VectorField (dimension, size)
    * @method setOptions
    */ 
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-vector/inputex-vector.js", "setOptions", 23);
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 24);
inputEx.VectorField.superclass.setOptions.call(this, options);
     
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 26);
this.options.dimension = options.dimension || 2;
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 27);
this.options.size = options.size || 3;
     
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 29);
this.options.fields = [];
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 30);
for(var i = 0 ; i < this.options.dimension ; i++) {
         _yuitest_coverline("build/inputex-vector/inputex-vector.js", 31);
this.options.fields.push({type: 'number', size: this.options.size });
      }
   }
});

// Register this class as "2Dvector" type
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 37);
inputEx.registerType("vector", inputEx.VectorField, [
   { type: 'integer', label: 'Dimension', name:'dimension', value: 2},
   { type: 'integer', label: 'Size', name:'size', value: 3},
   { type: 'list', name: 'separators', label: 'Separators', required: true }
]);


}, '@VERSION@', {"requires": ["inputex-combine"], "ix_provides": "vector"});
