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
_yuitest_coverage["build/inputex-object/inputex-object.js"].code=["YUI.add('inputex-object', function (Y, NAME) {","","/**"," * @module inputex-object"," */","   var inputEx = Y.inputEx,","       lang = Y.Lang;","   ","/**"," * list of PairField where where the returned value is converted to an object"," * @class inputEx.ObjectField"," * @extends inputEx.ListField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.ObjectField = function(options) {","	options.elementType = {","		type: 'combine', ","		fields: [","		   {type: 'string', size: 10 },","		   {type:'string', size: 10 }","		]","	};","	inputEx.ObjectField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.ObjectField, inputEx.ListField, {","","   /**","    * Convert the array of 2d elements to an javascript object ","    * @method getValue","    */","   getValue: function() {","      var v = inputEx.ObjectField.superclass.getValue.call(this);","      var obj = {};","      for(var i = 0 ; i < v.length ; i++) {","         obj[ v[i][0] ] = v[i][1];","      }","      return obj;","   },","   ","   /**","    * Convert the object into a list of pairs","    * @method setValue","    */","   setValue: function(v) {","      var val = [];","      for(var key in v) {","         if( v.hasOwnProperty(key) ) {","            val.push([key, v[key]]);","         }","      }","      inputEx.ObjectField.superclass.setValue.call(this,val);","   }","});","","// Register this class as \"object\" type","inputEx.registerType('object', inputEx.ObjectField);","","","}, '@VERSION@', {\"requires\": [\"inputex-list\", \"inputex-combine\", \"inputex-string\"], \"ix_provides\": \"object\"});"];
_yuitest_coverage["build/inputex-object/inputex-object.js"].lines = {"1":0,"6":0,"16":0,"17":0,"24":0,"27":0,"34":0,"35":0,"36":0,"37":0,"39":0,"47":0,"48":0,"49":0,"50":0,"53":0,"58":0};
_yuitest_coverage["build/inputex-object/inputex-object.js"].functions = {"ObjectField:16":0,"getValue:33":0,"setValue:46":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-object/inputex-object.js"].coveredLines = 17;
_yuitest_coverage["build/inputex-object/inputex-object.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-object/inputex-object.js", 1);
YUI.add('inputex-object', function (Y, NAME) {

/**
 * @module inputex-object
 */
   _yuitest_coverfunc("build/inputex-object/inputex-object.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-object/inputex-object.js", 6);
var inputEx = Y.inputEx,
       lang = Y.Lang;
   
/**
 * list of PairField where where the returned value is converted to an object
 * @class inputEx.ObjectField
 * @extends inputEx.ListField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-object/inputex-object.js", 16);
inputEx.ObjectField = function(options) {
	_yuitest_coverfunc("build/inputex-object/inputex-object.js", "ObjectField", 16);
_yuitest_coverline("build/inputex-object/inputex-object.js", 17);
options.elementType = {
		type: 'combine', 
		fields: [
		   {type: 'string', size: 10 },
		   {type:'string', size: 10 }
		]
	};
	_yuitest_coverline("build/inputex-object/inputex-object.js", 24);
inputEx.ObjectField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-object/inputex-object.js", 27);
Y.extend(inputEx.ObjectField, inputEx.ListField, {

   /**
    * Convert the array of 2d elements to an javascript object 
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-object/inputex-object.js", "getValue", 33);
_yuitest_coverline("build/inputex-object/inputex-object.js", 34);
var v = inputEx.ObjectField.superclass.getValue.call(this);
      _yuitest_coverline("build/inputex-object/inputex-object.js", 35);
var obj = {};
      _yuitest_coverline("build/inputex-object/inputex-object.js", 36);
for(var i = 0 ; i < v.length ; i++) {
         _yuitest_coverline("build/inputex-object/inputex-object.js", 37);
obj[ v[i][0] ] = v[i][1];
      }
      _yuitest_coverline("build/inputex-object/inputex-object.js", 39);
return obj;
   },
   
   /**
    * Convert the object into a list of pairs
    * @method setValue
    */
   setValue: function(v) {
      _yuitest_coverfunc("build/inputex-object/inputex-object.js", "setValue", 46);
_yuitest_coverline("build/inputex-object/inputex-object.js", 47);
var val = [];
      _yuitest_coverline("build/inputex-object/inputex-object.js", 48);
for(var key in v) {
         _yuitest_coverline("build/inputex-object/inputex-object.js", 49);
if( v.hasOwnProperty(key) ) {
            _yuitest_coverline("build/inputex-object/inputex-object.js", 50);
val.push([key, v[key]]);
         }
      }
      _yuitest_coverline("build/inputex-object/inputex-object.js", 53);
inputEx.ObjectField.superclass.setValue.call(this,val);
   }
});

// Register this class as "object" type
_yuitest_coverline("build/inputex-object/inputex-object.js", 58);
inputEx.registerType('object', inputEx.ObjectField);


}, '@VERSION@', {"requires": ["inputex-list", "inputex-combine", "inputex-string"], "ix_provides": "object"});
