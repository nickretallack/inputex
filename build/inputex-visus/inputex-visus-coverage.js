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
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].code=["YUI.add('inputex-visus', function (Y, NAME) {","","/**"," * Used by InPlaceEdit and Uneditable fields"," * @module inputex-visus"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","/**"," * Contains the various visualization methods"," * @class inputEx.visus"," * @static"," */","inputEx.visus = {","  ","  /**","   * Use the trimpath-template engine","   * see http://code.google.com/p/trimpath/wiki/JavaScriptTemplates for syntax","   * options = {visuType: 'trimpath', template: \"String template\"}","   * @method trimpath","   */","  trimpath: function(options, data) {","      if(!TrimPath) { alert('TrimPath is not on the page. Please load inputex/lib/trimpath-template.js'); return null; }","      var tpl = TrimPath.parseTemplate(options.template);","      var ret = tpl.process(data);","      return ret;","  },","  ","  /**","   * Use a rendering function","   * options = {visuType: 'func', func: function(data) { ...code here...} }","   * @method func","   */","  \"func\": function(options, data) {","     return options.func(data);","  },","  ","  /**","   * Use Y.Lang.dump","   * options = {visuType: 'dump'}","   * @method dump","   */","  dump: function(options, data) {","     return Y.dump(data);","  }","   ","};","","/**"," * Render 'data' using a visualization function described by 'visuOptions'"," * @method renderVisu"," * @static"," * @param {Object} visuOptions The visu parameters object with: visuType: 'myType', ...args..."," * @param {Object} data The input data to send to the template"," * @param {HTMLElement || String} parentEl optional Set the result as content of parentEl"," * @return {HTMLElement || String} Either the inserted HTMLElement or the String set to parentEl.innerHTML"," */","inputEx.renderVisu = function(visuOptions,data, parentEl) {","   ","   var opts = visuOptions || {};","   var visuType = opts.visuType || 'dump';","   ","   if( !inputEx.visus.hasOwnProperty(visuType) ) {","      throw new Error(\"inputEx: no visu for visuType: \"+visuType);","   }","   ","   var f = inputEx.visus[visuType];","   if( !lang.isFunction(f) ) {","      throw new Error(\"inputEx: no visu for visuType: \"+visuType);","   }","   ","   var v = null;","   try {","      v = f(opts,data);","   }","   catch(ex) {","      throw new Error(\"inputEx: error while running visu \"+visuType+\" : \"+ex.message);","   }","   ","   // Get the node","   var node = null;","   if(parentEl) {","      if(lang.isString(parentEl)) {","         node = Y.one(parentEl);","      }","      else {","         node = parentEl;","      }","   }","   ","   // Insert it","   if(node) {","      if(Y.Lang.isObject(v) && v.tagName ) {","         node.innerHTML = \"\";","         node.appendChild(v);","      }","      else {","         node.innerHTML = v;","      }","   }","   ","   return v;","};","","","}, '@VERSION@', {\"requires\": [\"inputex\", \"dump\"]});"];
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].lines = {"1":0,"7":0,"14":0,"23":0,"24":0,"25":0,"26":0,"35":0,"44":0,"58":0,"60":0,"61":0,"63":0,"64":0,"67":0,"68":0,"69":0,"72":0,"73":0,"74":0,"77":0,"81":0,"82":0,"83":0,"84":0,"87":0,"92":0,"93":0,"94":0,"95":0,"98":0,"102":0};
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].functions = {"trimpath:22":0,"\"func\":34":0,"dump:43":0,"renderVisu:58":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].coveredLines = 32;
_yuitest_coverage["build/inputex-visus/inputex-visus.js"].coveredFunctions = 5;
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
   * Use the trimpath-template engine
   * see http://code.google.com/p/trimpath/wiki/JavaScriptTemplates for syntax
   * options = {visuType: 'trimpath', template: "String template"}
   * @method trimpath
   */
  trimpath: function(options, data) {
      _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "trimpath", 22);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 23);
if(!TrimPath) { alert('TrimPath is not on the page. Please load inputex/lib/trimpath-template.js'); return null; }
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 24);
var tpl = TrimPath.parseTemplate(options.template);
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 25);
var ret = tpl.process(data);
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 26);
return ret;
  },
  
  /**
   * Use a rendering function
   * options = {visuType: 'func', func: function(data) { ...code here...} }
   * @method func
   */
  "func": function(options, data) {
     _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "\"func\"", 34);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 35);
return options.func(data);
  },
  
  /**
   * Use Y.Lang.dump
   * options = {visuType: 'dump'}
   * @method dump
   */
  dump: function(options, data) {
     _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "dump", 43);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 44);
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
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 58);
inputEx.renderVisu = function(visuOptions,data, parentEl) {
   
   _yuitest_coverfunc("build/inputex-visus/inputex-visus.js", "renderVisu", 58);
_yuitest_coverline("build/inputex-visus/inputex-visus.js", 60);
var opts = visuOptions || {};
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 61);
var visuType = opts.visuType || 'dump';
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 63);
if( !inputEx.visus.hasOwnProperty(visuType) ) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 64);
throw new Error("inputEx: no visu for visuType: "+visuType);
   }
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 67);
var f = inputEx.visus[visuType];
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 68);
if( !lang.isFunction(f) ) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 69);
throw new Error("inputEx: no visu for visuType: "+visuType);
   }
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 72);
var v = null;
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 73);
try {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 74);
v = f(opts,data);
   }
   catch(ex) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 77);
throw new Error("inputEx: error while running visu "+visuType+" : "+ex.message);
   }
   
   // Get the node
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 81);
var node = null;
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 82);
if(parentEl) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 83);
if(lang.isString(parentEl)) {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 84);
node = Y.one(parentEl);
      }
      else {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 87);
node = parentEl;
      }
   }
   
   // Insert it
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 92);
if(node) {
      _yuitest_coverline("build/inputex-visus/inputex-visus.js", 93);
if(Y.Lang.isObject(v) && v.tagName ) {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 94);
node.innerHTML = "";
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 95);
node.appendChild(v);
      }
      else {
         _yuitest_coverline("build/inputex-visus/inputex-visus.js", 98);
node.innerHTML = v;
      }
   }
   
   _yuitest_coverline("build/inputex-visus/inputex-visus.js", 102);
return v;
};


}, '@VERSION@', {"requires": ["inputex", "dump"]});
