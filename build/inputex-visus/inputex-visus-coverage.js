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
_yuitest_coverage["build/inputex-visus/inputex-visus.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-visus/inputex-visus.js",
    code: []
};
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].code=["YUI.add('inputex-visus', function (Y, NAME) {","","/**"," * Used by InPlaceEdit and Uneditable fields"," * @module inputex-visus"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","/**"," * Contains the various visualization methods"," * @class inputEx.visus"," * @static"," */","inputEx.visus = {","  ","  /**","   * Use a rendering function","   * options = {visuType: 'func', func: function(data) { ...code here...} }","   * @method func","   */","  \"func\": function(options, data) {","     return options.func(data);","  },","  ","  /**","   * Use Y.Lang.dump","   * options = {visuType: 'dump'}","   * @method dump","   */","  dump: function(options, data) {","     return Y.dump(data);","  }","   ","};","","/**"," * Render 'data' using a visualization function described by 'visuOptions'"," * @method renderVisu"," * @static"," * @param {Object} visuOptions The visu parameters object with: visuType: 'myType', ...args..."," * @param {Object} data The input data to send to the template"," * @param {HTMLElement || String} parentEl optional Set the result as content of parentEl"," * @return {HTMLElement || String} Either the inserted HTMLElement or the String set to parentEl.innerHTML"," */","inputEx.renderVisu = function(visuOptions,data, parentEl) {","   ","   var opts = visuOptions || {};","   var visuType = opts.visuType || 'dump';","   ","   if( !inputEx.visus.hasOwnProperty(visuType) ) {","      throw new Error(\"inputEx: no visu for visuType: \"+visuType);","   }","   ","   var f = inputEx.visus[visuType];","   if( !lang.isFunction(f) ) {","      throw new Error(\"inputEx: no visu for visuType: \"+visuType);","   }","   ","   var v = null;","   try {","      v = f(opts,data);","   }","   catch(ex) {","      throw new Error(\"inputEx: error while running visu \"+visuType+\" : \"+ex.message);","   }","   ","   // Get the node","   var node = null;","   if(parentEl) {","      if(lang.isString(parentEl)) {","         node = Y.one(parentEl);","      }","      else {","         node = parentEl;","      }","   }","   ","   // Insert it","   if(node) {","      if(Y.Lang.isObject(v) && v.tagName ) {","         node.innerHTML = \"\";","         node.appendChild(v);","      }","      else {","         node.innerHTML = v;","      }","   }","   ","   return v;","};","","","}, '@VERSION@', {\"requires\": [\"inputex\", \"dump\"]});"];
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].lines = {"1":0,"7":0,"14":0,"22":0,"31":0,"45":0,"47":0,"48":0,"50":0,"51":0,"54":0,"55":0,"56":0,"59":0,"60":0,"61":0,"64":0,"68":0,"69":0,"70":0,"71":0,"74":0,"79":0,"80":0,"81":0,"82":0,"85":0,"89":0};
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].functions = {"\"func\":21":0,"dump:30":0,"renderVisu:45":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].coveredLines = 28;
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 1);
YUI.add('inputex-visus', function (Y, NAME) {

/**
 * Used by InPlaceEdit and Uneditable fields
 * @module inputex-visus
 */
   _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 7);
var lang = Y.Lang,
       inputEx = Y.inputEx;
/**
 * Contains the various visualization methods
 * @class inputEx.visus
 * @static
 */
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 14);
inputEx.visus = {
  
  /**
   * Use a rendering function
   * options = {visuType: 'func', func: function(data) { ...code here...} }
   * @method func
   */
  "func": function(options, data) {
     _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "\"func\"", 21);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 22);
return options.func(data);
  },
  
  /**
   * Use Y.Lang.dump
   * options = {visuType: 'dump'}
   * @method dump
   */
  dump: function(options, data) {
     _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "dump", 30);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 31);
return Y.dump(data);
  }
   
};

/**
 * Render 'data' using a visualization function described by 'visuOptions'
 * @method renderVisu
 * @static
 * @param {Object} visuOptions The visu parameters object with: visuType: 'myType', ...args...
 * @param {Object} data The input data to send to the template
 * @param {HTMLElement || String} parentEl optional Set the result as content of parentEl
 * @return {HTMLElement || String} Either the inserted HTMLElement or the String set to parentEl.innerHTML
 */
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 45);
inputEx.renderVisu = function(visuOptions,data, parentEl) {
   
   _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "renderVisu", 45);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 47);
var opts = visuOptions || {};
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 48);
var visuType = opts.visuType || 'dump';
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 50);
if( !inputEx.visus.hasOwnProperty(visuType) ) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 51);
throw new Error("inputEx: no visu for visuType: "+visuType);
   }
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 54);
var f = inputEx.visus[visuType];
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 55);
if( !lang.isFunction(f) ) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 56);
throw new Error("inputEx: no visu for visuType: "+visuType);
   }
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 59);
var v = null;
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 60);
try {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 61);
v = f(opts,data);
   }
   catch(ex) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 64);
throw new Error("inputEx: error while running visu "+visuType+" : "+ex.message);
   }
   
   // Get the node
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 68);
var node = null;
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 69);
if(parentEl) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 70);
if(lang.isString(parentEl)) {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 71);
node = Y.one(parentEl);
      }
      else {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 74);
node = parentEl;
      }
   }
   
   // Insert it
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 79);
if(node) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 80);
if(Y.Lang.isObject(v) && v.tagName ) {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 81);
node.innerHTML = "";
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 82);
node.appendChild(v);
      }
      else {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 85);
node.innerHTML = v;
      }
   }
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 89);
return v;
};


}, '@VERSION@', {"requires": ["inputex", "dump"]});
