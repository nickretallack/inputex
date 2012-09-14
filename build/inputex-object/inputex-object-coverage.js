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
_yuitest_coverage["build/inputex-object/inputex-object.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-object/inputex-object.js",
    code: []
};
_yuitest_coverage["build/inputex-object/inputex-object.js"].code=["YUI.add('inputex-object', function (Y, NAME) {","","/**"," * @module inputex-object"," */","YUI.add(\"inputex-object\", function(Y){","","   var inputEx = Y.inputEx,","       lang = Y.Lang;","   ","/**"," * list of PairField where where the returned value is converted to an object"," * @class inputEx.ObjectField"," * @extends inputEx.ListField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.ObjectField = function(options) {","	options.elementType = {","		type: 'combine', ","		fields: [","		   {type: 'string', size: 10 },","		   {type:'string', size: 10 }","		]","	};","	inputEx.ObjectField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.ObjectField, inputEx.ListField, {","","   /**","    * Convert the array of 2d elements to an javascript object ","    * @method getValue","    */","   getValue: function() {","      var v = inputEx.ObjectField.superclass.getValue.call(this);","      var obj = {};","      for(var i = 0 ; i < v.length ; i++) {","         obj[ v[i][0] ] = v[i][1];","      }","      return obj;","   },","   ","   /**","    * Convert the object into a list of pairs","    * @method setValue","    */","   setValue: function(v) {","      var val = [];","      for(var key in v) {","         if( v.hasOwnProperty(key) ) {","            val.push([key, v[key]]);","         }","      }","      inputEx.ObjectField.superclass.setValue.call(this,val);","   }","});","","// Register this class as \"object\" type","inputEx.registerType('object', inputEx.ObjectField);","","},'3.1.0',{","  requires: ['inputex-list','inputex-combine','inputex-string']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-object/inputex-object.js"].lines = {"1":0,"6":0,"8":0,"18":0,"19":0,"26":0,"29":0,"36":0,"37":0,"38":0,"39":0,"41":0,"49":0,"50":0,"51":0,"52":0,"55":0,"60":0};
_yuitest_coverage["build/inputex-object/inputex-object.js"].functions = {"ObjectField:18":0,"getValue:35":0,"setValue:48":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-object/inputex-object.js"].coveredLines = 18;
_yuitest_coverage["build/inputex-object/inputex-object.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-object/inputex-object.js", 1);
YUI.add('inputex-object', function (Y, NAME) {

/**
 * @module inputex-object
 */
_yuitest_coverfunc("build/inputex-object/inputex-object.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-object/inputex-object.js", 6);
YUI.add("inputex-object", function(Y){

   _yuitest_coverfunc("build/inputex-object/inputex-object.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-object/inputex-object.js", 8);
var inputEx = Y.inputEx,
       lang = Y.Lang;
   
/**
 * list of PairField where where the returned value is converted to an object
 * @class inputEx.ObjectField
 * @extends inputEx.ListField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-object/inputex-object.js", 18);
inputEx.ObjectField = function(options) {
	_yuitest_coverfunc("build/inputex-object/inputex-object.js", "ObjectField", 18);
_yuitest_coverline("build/inputex-object/inputex-object.js", 19);
options.elementType = {
		type: 'combine', 
		fields: [
		   {type: 'string', size: 10 },
		   {type:'string', size: 10 }
		]
	};
	_yuitest_coverline("build/inputex-object/inputex-object.js", 26);
inputEx.ObjectField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-object/inputex-object.js", 29);
Y.extend(inputEx.ObjectField, inputEx.ListField, {

   /**
    * Convert the array of 2d elements to an javascript object 
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-object/inputex-object.js", "getValue", 35);
_yuitest_coverline("build/inputex-object/inputex-object.js", 36);
var v = inputEx.ObjectField.superclass.getValue.call(this);
      _yuitest_coverline("build/inputex-object/inputex-object.js", 37);
var obj = {};
      _yuitest_coverline("build/inputex-object/inputex-object.js", 38);
for(var i = 0 ; i < v.length ; i++) {
         _yuitest_coverline("build/inputex-object/inputex-object.js", 39);
obj[ v[i][0] ] = v[i][1];
      }
      _yuitest_coverline("build/inputex-object/inputex-object.js", 41);
return obj;
   },
   
   /**
    * Convert the object into a list of pairs
    * @method setValue
    */
   setValue: function(v) {
      _yuitest_coverfunc("build/inputex-object/inputex-object.js", "setValue", 48);
_yuitest_coverline("build/inputex-object/inputex-object.js", 49);
var val = [];
      _yuitest_coverline("build/inputex-object/inputex-object.js", 50);
for(var key in v) {
         _yuitest_coverline("build/inputex-object/inputex-object.js", 51);
if( v.hasOwnProperty(key) ) {
            _yuitest_coverline("build/inputex-object/inputex-object.js", 52);
val.push([key, v[key]]);
         }
      }
      _yuitest_coverline("build/inputex-object/inputex-object.js", 55);
inputEx.ObjectField.superclass.setValue.call(this,val);
   }
});

// Register this class as "object" type
_yuitest_coverline("build/inputex-object/inputex-object.js", 60);
inputEx.registerType('object', inputEx.ObjectField);

},'3.1.0',{
  requires: ['inputex-list','inputex-combine','inputex-string']
});


}, '@VERSION@');
