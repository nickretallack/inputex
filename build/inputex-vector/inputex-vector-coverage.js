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
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].code=["YUI.add('inputex-vector', function (Y, NAME) {","","/**"," * @module inputex-vector"," */","YUI.add(\"inputex-vector\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","/**"," * A field limited to number inputs (floating)"," * @class inputEx.VectorField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.VectorField = function(options) {","   inputEx.VectorField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.VectorField, inputEx.CombineField, {  ","   /**","    * Additional options for VectorField (dimension, size)","    * @method setOptions","    */ ","   setOptions: function(options) {","      inputEx.VectorField.superclass.setOptions.call(this, options);","     ","      this.options.dimension = options.dimension || 2;","      this.options.size = options.size || 3;","     ","      this.options.fields = [];","      for(var i = 0 ; i < this.options.dimension ; i++) {","         this.options.fields.push({type: 'number', size: this.options.size });","      }","   }","});","","// Register this class as \"2Dvector\" type","inputEx.registerType(\"vector\", inputEx.VectorField, [","   { type: 'integer', label: 'Dimension', name:'dimension', value: 2},","   { type: 'integer', label: 'Size', name:'size', value: 3},","   { type: 'list', name: 'separators', label: 'Separators', required: true }","]);","","},'3.1.0',{","  requires: [\"inputex-combine\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].lines = {"1":0,"6":0,"8":0,"17":0,"18":0,"20":0,"26":0,"28":0,"29":0,"31":0,"32":0,"33":0,"39":0};
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].functions = {"VectorField:17":0,"setOptions:25":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].coveredLines = 13;
_yuitest_coverage["build/inputex-vector/inputex-vector.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 1);
YUI.add('inputex-vector', function (Y, NAME) {

/**
 * @module inputex-vector
 */
_yuitest_coverfunc("build/inputex-vector/inputex-vector.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 6);
YUI.add("inputex-vector",function(Y){

   _yuitest_coverfunc("build/inputex-vector/inputex-vector.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;
/**
 * A field limited to number inputs (floating)
 * @class inputEx.VectorField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 17);
inputEx.VectorField = function(options) {
   _yuitest_coverfunc("build/inputex-vector/inputex-vector.js", "VectorField", 17);
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 18);
inputEx.VectorField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 20);
Y.extend(inputEx.VectorField, inputEx.CombineField, {  
   /**
    * Additional options for VectorField (dimension, size)
    * @method setOptions
    */ 
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-vector/inputex-vector.js", "setOptions", 25);
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 26);
inputEx.VectorField.superclass.setOptions.call(this, options);
     
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 28);
this.options.dimension = options.dimension || 2;
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 29);
this.options.size = options.size || 3;
     
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 31);
this.options.fields = [];
      _yuitest_coverline("build/inputex-vector/inputex-vector.js", 32);
for(var i = 0 ; i < this.options.dimension ; i++) {
         _yuitest_coverline("build/inputex-vector/inputex-vector.js", 33);
this.options.fields.push({type: 'number', size: this.options.size });
      }
   }
});

// Register this class as "2Dvector" type
_yuitest_coverline("build/inputex-vector/inputex-vector.js", 39);
inputEx.registerType("vector", inputEx.VectorField, [
   { type: 'integer', label: 'Dimension', name:'dimension', value: 2},
   { type: 'integer', label: 'Size', name:'size', value: 3},
   { type: 'list', name: 'separators', label: 'Separators', required: true }
]);

},'3.1.0',{
  requires: ["inputex-combine"]
});


}, '@VERSION@');
