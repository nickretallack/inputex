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
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-jsontreeinspector/inputex-jsontreeinspector.js",
    code: []
};
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].code=["YUI.add('inputex-jsontreeinspector', function (Y, NAME) {","","/**"," * @module inputex-jsontreeinspector"," */","YUI.add(\"inputex-jsontreeinspector\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a treeview to inspect a javascript object"," * @class inputEx.widget.JsonTreeInspector"," * @constructor"," * @param {String|HTMLElement} parentEl where to append the tree"," * @param {Object} object the object to inspect"," * @param {String} jsonPath JSON Path string (optional) (http://code.google.com/p/jsonpath/wiki/Javascript)"," */","inputEx.widget.JsonTreeInspector = function(parentEl, object, cfg) {","","   /**","    * Hash to contain the values indexed by li ids","    * @property hash","    */","   this.hash = {};","   ","   /**","    * Main div element","    * @property el","    */","   this.el = inputEx.cn('div');","   ","   this.cfg = Y.mix({},cfg);","   this.cfg.showEmptyObjects = lang.isUndefined(this.cfg.showEmptyObjects) ? true : this.cfg.showEmptyObjects;","","   var branch = lang.isString(this.cfg.jsonPath) ? inputEx.widget.JsonTreeInspector.jsonPath(object,this.cfg.jsonPath) : object;","   ","   this.buildBranch( branch, this.el);","   ","   (lang.isString(parentEl) ? document.getElementById(parentEl) : parentEl).appendChild(this.el);","};","","inputEx.widget.JsonTreeInspector.prototype = {","   ","   /**","    * Destroy the widget","    * @method destroy","    */","   destroy: function() {","      ","      // Remove from DOM","      if(Dom.inDocument(this.el)) {","         this.el.parentNode.removeChild(this.el);","      }","      ","      // recursively purge element","      Event.purgeElement(this.el, true);","   },","   ","   /**","    * Build the sub-branch for obj","    * @method buildBranch","    */","   buildBranch: function(obj,parentEl) {","      ","      var ul = inputEx.cn('ul', {className: 'inputEx-JsonTreeInspector'});","      ","      for(var key in obj) {","         if(obj.hasOwnProperty(key)) {","            var value = obj[key];","            ","            var id = Y.guid();","            var li = inputEx.cn('li', {id: id}, null, key+':');","            li.id = id;","            this.hash[id] = {value: value, expanded: false};","            ","            var add = true;","            ","            if( lang.isObject(value) ) {","                  ","               Y.one(li).addClass('collapsed');","               Y.one(li).on('click', this.onItemClick, this, true);","               ","               ","               if( !lang.isFunction(value) && !this.cfg.showEmptyObjects && Y.Object.isEmpty(value) ) {","                  add = false;","               }","               ","            }","            else if( lang.isArray(value) ) {","               li.appendChild( inputEx.cn('span', null, null, \"[ \"+value.length+\" element\"+(value.length > 1 ? 's':'')+\"]\" ) );","               Y.one(li).addClass('collapsed');","               Y.one(li).on('click', this.onItemClick, this, true);","            }","            else {","               var spanContent = '';","               if( lang.isString(value) ) {","                  spanContent = '\"'+inputEx.htmlEntities(value)+'\"';","               }","               else {","                  if(value === null) {","                     spanContent = \"null\";","                  }","                  else {","                     spanContent = value.toString();","                  }","               }","               li.appendChild( inputEx.cn('span', {className: 'type-'+(value === null ? \"null\" : (typeof value))}, null, spanContent ) );","            }","            ","            if(add)","               ul.appendChild(li);","         }","      }","      ","      parentEl.appendChild(ul);","      ","      return ul;","   },","   ","   ","   /**","    * When the user click on a node","    * @method onItemClick","    */","   onItemClick: function(e, params) {","      ","      e.halt();","      ","      if( e.target.hasClass('expanded') || e.target.hasClass('collapsed') ) {","         this.expandElement(e.target._node);","      }","   },","   ","   ","   /**","    * expand the node given the li element","    * @method expandElement","    */","   expandElement: function(li) {","      ","      var isExpanded = Y.one(li).hasClass('expanded');","      Y.one(li).replaceClass(isExpanded ? 'expanded' : 'collapsed' , isExpanded ? 'collapsed':'expanded');","","      var h = this.hash[li.id];","","      if(isExpanded) {","         // hide the sub-branch","         h.expanded.style.display = 'none';","      }","      else {","         if(h.expanded === false) {","            // generate the sub-branch","            h.expanded = this.buildBranch(h.value, li);","         }","         // show the sub-branch","         h.expanded.style.display = '';","      }","   },","   ","   /**","    * Expand a branch given a li element","    * @method expandBranch","    * @param {HTMLElement} li ","    * @param {Integer} maxLevel","    */","   expandBranch: function(li,maxLevel) {","      this.expandElement(li);","      ","      var that = this;","      Y.one(li).get('children').item(0).get('children').each(function(subLi) {","         ","         if(subLi.hasClass(\"collapsed\") && maxLevel != 0) {","            that.expandBranch(subLi._node,maxLevel-1);","         }","         ","      });","      ","   },","   ","   /**","    * Expand the root node","    * @method expandAll","    * @param {Integer} maxLevel","    */","   expandAll: function(maxLevel) {","      var ul = this.el.childNodes[0];","      var liEls = ul.childNodes;","      for(var i = 0 ; i < liEls.length ; i++) {","         var li = liEls[i];","         this.expandBranch(li,maxLevel);","      }","   }","   ","};","","//","// JSONPath 0.8.0 - XPath for JSON","// http://code.google.com/p/jsonpath/","// http://code.google.com/p/jsonpath/wiki/Javascript","//","// Copyright (c) 2007 Stefan Goessner (goessner.net)","// Licensed under the MIT (MIT-LICENSE.txt) licence.","//","inputEx.widget.JsonTreeInspector.jsonPath = function (obj, expr, arg) {","   var P = {","      resultType: arg && arg.resultType || \"VALUE\",","      result: [],","      normalize: function(expr) {","         var subx = [];","         return expr.replace(/[\\['](\\??\\(.*?\\))[\\]']/g, function($0,$1){return \"[#\"+(subx.push($1)-1)+\"]\";})","                    .replace(/'?\\.'?|\\['?/g, \";\")","                    .replace(/;;;|;;/g, \";..;\")","                    .replace(/;$|'?\\]|'$/g, \"\")","                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});","      },","      asPath: function(path) {","         var x = path.split(\";\"), p = \"$\";","         for (var i=1,n=x.length; i<n; i++)","            p += /^[0-9*]+$/.test(x[i]) ? (\"[\"+x[i]+\"]\") : (\"['\"+x[i]+\"']\");","         return p;","      },","      store: function(p, v) {","         if (p) P.result[P.result.length] = P.resultType == \"PATH\" ? P.asPath(p) : v;","         return !!p;","      },","      trace: function(expr, val, path) {","         if (expr) {","            var x = expr.split(\";\"), loc = x.shift();","            x = x.join(\";\");","            if (val && val.hasOwnProperty(loc))","               P.trace(x, val[loc], path + \";\" + loc);","            else if (loc === \"*\")","               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+\";\"+x,v,p); });","            else if (loc === \"..\") {","               P.trace(x, val, path);","               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === \"object\" && P.trace(\"..;\"+x,v[m],p+\";\"+m); });","            }","            else if (/,/.test(loc)) { // [name1,name2,...]","               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)","                  P.trace(s[i]+\";\"+x, val, path);","            }","            else if (/^\\(.*?\\)$/.test(loc)) // [(expr)]","               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(\";\")+1))+\";\"+x, val, path);","            else if (/^\\?\\(.*?\\)$/.test(loc)) // [?(expr)]","               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\\?\\((.*?)\\)$/,\"$1\"),v[m],m)) P.trace(m+\";\"+x,v,p); });","            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax","               P.slice(loc, x, val, path);","         }","         else","            P.store(path, val);","      },","      walk: function(loc, expr, val, path, f) {","         if (val instanceof Array) {","            for (var i=0,n=val.length; i<n; i++)","               if (i in val)","                  f(i,loc,expr,val,path);","         }","         else if (typeof val === \"object\") {","            for (var m in val)","               if (val.hasOwnProperty(m))","                  f(m,loc,expr,val,path);","         }","      },","      slice: function(loc, expr, val, path) {","         if (val instanceof Array) {","            var len=val.length, start=0, end=len, step=1;","            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});","            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);","            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);","            for (var i=start; i<end; i+=step)","               P.trace(i+\";\"+expr, val, path);","         }","      },","      eval: function(x, _v, _vname) {","         try { return $ && _v && eval(x.replace(/@/g, \"_v\")); }","         catch(e) { throw new SyntaxError(\"jsonPath: \" + e.message + \": \" + x.replace(/@/g, \"_v\").replace(/\\^/g, \"_a\")); }","      }","   };","","   var $ = obj;","   if (expr && obj && (P.resultType == \"VALUE\" || P.resultType == \"PATH\")) {","      P.trace(P.normalize(expr).replace(/^\\$;/,\"\"), obj, \"$\");","      return P.result.length ? P.result : false;","   }","};","","},'3.1.0',{","  requires: ['inputex']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].lines = {"1":0,"6":0,"8":0,"19":0,"25":0,"31":0,"33":0,"34":0,"36":0,"38":0,"40":0,"43":0,"52":0,"53":0,"57":0,"66":0,"68":0,"69":0,"70":0,"72":0,"73":0,"74":0,"75":0,"77":0,"79":0,"81":0,"82":0,"85":0,"86":0,"90":0,"91":0,"92":0,"93":0,"96":0,"97":0,"98":0,"101":0,"102":0,"105":0,"108":0,"111":0,"112":0,"116":0,"118":0,"128":0,"130":0,"131":0,"142":0,"143":0,"145":0,"147":0,"149":0,"152":0,"154":0,"157":0,"168":0,"170":0,"171":0,"173":0,"174":0,"187":0,"188":0,"189":0,"190":0,"191":0,"205":0,"206":0,"210":0,"211":0,"215":0,"218":0,"219":0,"220":0,"221":0,"224":0,"225":0,"228":0,"229":0,"230":0,"231":0,"232":0,"233":0,"234":0,"235":0,"236":0,"237":0,"239":0,"240":0,"241":0,"243":0,"244":0,"245":0,"246":0,"247":0,"248":0,"251":0,"254":0,"255":0,"256":0,"257":0,"259":0,"260":0,"261":0,"262":0,"266":0,"267":0,"268":0,"269":0,"270":0,"271":0,"272":0,"276":0,"277":0,"281":0,"282":0,"283":0,"284":0};
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].functions = {"JsonTreeInspector:19":0,"destroy:49":0,"buildBranch:64":0,"onItemClick:126":0,"expandElement:140":0,"(anonymous 3):171":0,"expandBranch:167":0,"expandAll:186":0,"(anonymous 4):211":0,"(anonymous 5):215":0,"normalize:209":0,"asPath:217":0,"store:223":0,"(anonymous 6):234":0,"(anonymous 7):237":0,"(anonymous 8):246":0,"trace:227":0,"walk:253":0,"(anonymous 9):268":0,"slice:265":0,"eval:275":0,"jsonPath:205":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].coveredLines = 117;
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].coveredFunctions = 24;
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 1);
YUI.add('inputex-jsontreeinspector', function (Y, NAME) {

/**
 * @module inputex-jsontreeinspector
 */
_yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 6);
YUI.add("inputex-jsontreeinspector",function(Y){

   _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Create a treeview to inspect a javascript object
 * @class inputEx.widget.JsonTreeInspector
 * @constructor
 * @param {String|HTMLElement} parentEl where to append the tree
 * @param {Object} object the object to inspect
 * @param {String} jsonPath JSON Path string (optional) (http://code.google.com/p/jsonpath/wiki/Javascript)
 */
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 19);
inputEx.widget.JsonTreeInspector = function(parentEl, object, cfg) {

   /**
    * Hash to contain the values indexed by li ids
    * @property hash
    */
   _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "JsonTreeInspector", 19);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 25);
this.hash = {};
   
   /**
    * Main div element
    * @property el
    */
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 31);
this.el = inputEx.cn('div');
   
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 33);
this.cfg = Y.mix({},cfg);
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 34);
this.cfg.showEmptyObjects = lang.isUndefined(this.cfg.showEmptyObjects) ? true : this.cfg.showEmptyObjects;

   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 36);
var branch = lang.isString(this.cfg.jsonPath) ? inputEx.widget.JsonTreeInspector.jsonPath(object,this.cfg.jsonPath) : object;
   
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 38);
this.buildBranch( branch, this.el);
   
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 40);
(lang.isString(parentEl) ? document.getElementById(parentEl) : parentEl).appendChild(this.el);
};

_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 43);
inputEx.widget.JsonTreeInspector.prototype = {
   
   /**
    * Destroy the widget
    * @method destroy
    */
   destroy: function() {
      
      // Remove from DOM
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "destroy", 49);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 52);
if(Dom.inDocument(this.el)) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 53);
this.el.parentNode.removeChild(this.el);
      }
      
      // recursively purge element
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 57);
Event.purgeElement(this.el, true);
   },
   
   /**
    * Build the sub-branch for obj
    * @method buildBranch
    */
   buildBranch: function(obj,parentEl) {
      
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "buildBranch", 64);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 66);
var ul = inputEx.cn('ul', {className: 'inputEx-JsonTreeInspector'});
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 68);
for(var key in obj) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 69);
if(obj.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 70);
var value = obj[key];
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 72);
var id = Y.guid();
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 73);
var li = inputEx.cn('li', {id: id}, null, key+':');
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 74);
li.id = id;
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 75);
this.hash[id] = {value: value, expanded: false};
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 77);
var add = true;
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 79);
if( lang.isObject(value) ) {
                  
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 81);
Y.one(li).addClass('collapsed');
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 82);
Y.one(li).on('click', this.onItemClick, this, true);
               
               
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 85);
if( !lang.isFunction(value) && !this.cfg.showEmptyObjects && Y.Object.isEmpty(value) ) {
                  _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 86);
add = false;
               }
               
            }
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 90);
if( lang.isArray(value) ) {
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 91);
li.appendChild( inputEx.cn('span', null, null, "[ "+value.length+" element"+(value.length > 1 ? 's':'')+"]" ) );
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 92);
Y.one(li).addClass('collapsed');
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 93);
Y.one(li).on('click', this.onItemClick, this, true);
            }
            else {
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 96);
var spanContent = '';
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 97);
if( lang.isString(value) ) {
                  _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 98);
spanContent = '"'+inputEx.htmlEntities(value)+'"';
               }
               else {
                  _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 101);
if(value === null) {
                     _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 102);
spanContent = "null";
                  }
                  else {
                     _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 105);
spanContent = value.toString();
                  }
               }
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 108);
li.appendChild( inputEx.cn('span', {className: 'type-'+(value === null ? "null" : (typeof value))}, null, spanContent ) );
            }}
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 111);
if(add)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 112);
ul.appendChild(li);}
         }
      }
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 116);
parentEl.appendChild(ul);
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 118);
return ul;
   },
   
   
   /**
    * When the user click on a node
    * @method onItemClick
    */
   onItemClick: function(e, params) {
      
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "onItemClick", 126);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 128);
e.halt();
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 130);
if( e.target.hasClass('expanded') || e.target.hasClass('collapsed') ) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 131);
this.expandElement(e.target._node);
      }
   },
   
   
   /**
    * expand the node given the li element
    * @method expandElement
    */
   expandElement: function(li) {
      
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "expandElement", 140);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 142);
var isExpanded = Y.one(li).hasClass('expanded');
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 143);
Y.one(li).replaceClass(isExpanded ? 'expanded' : 'collapsed' , isExpanded ? 'collapsed':'expanded');

      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 145);
var h = this.hash[li.id];

      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 147);
if(isExpanded) {
         // hide the sub-branch
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 149);
h.expanded.style.display = 'none';
      }
      else {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 152);
if(h.expanded === false) {
            // generate the sub-branch
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 154);
h.expanded = this.buildBranch(h.value, li);
         }
         // show the sub-branch
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 157);
h.expanded.style.display = '';
      }
   },
   
   /**
    * Expand a branch given a li element
    * @method expandBranch
    * @param {HTMLElement} li 
    * @param {Integer} maxLevel
    */
   expandBranch: function(li,maxLevel) {
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "expandBranch", 167);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 168);
this.expandElement(li);
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 170);
var that = this;
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 171);
Y.one(li).get('children').item(0).get('children').each(function(subLi) {
         
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 3)", 171);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 173);
if(subLi.hasClass("collapsed") && maxLevel != 0) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 174);
that.expandBranch(subLi._node,maxLevel-1);
         }
         
      });
      
   },
   
   /**
    * Expand the root node
    * @method expandAll
    * @param {Integer} maxLevel
    */
   expandAll: function(maxLevel) {
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "expandAll", 186);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 187);
var ul = this.el.childNodes[0];
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 188);
var liEls = ul.childNodes;
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 189);
for(var i = 0 ; i < liEls.length ; i++) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 190);
var li = liEls[i];
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 191);
this.expandBranch(li,maxLevel);
      }
   }
   
};

//
// JSONPath 0.8.0 - XPath for JSON
// http://code.google.com/p/jsonpath/
// http://code.google.com/p/jsonpath/wiki/Javascript
//
// Copyright (c) 2007 Stefan Goessner (goessner.net)
// Licensed under the MIT (MIT-LICENSE.txt) licence.
//
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 205);
inputEx.widget.JsonTreeInspector.jsonPath = function (obj, expr, arg) {
   _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "jsonPath", 205);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 206);
var P = {
      resultType: arg && arg.resultType || "VALUE",
      result: [],
      normalize: function(expr) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "normalize", 209);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 210);
var subx = [];
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 211);
return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){_yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 4)", 211);
return "[#"+(subx.push($1)-1)+"]";})
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function($0,$1){_yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 5)", 215);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 215);
return subx[$1];});
      },
      asPath: function(path) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "asPath", 217);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 218);
var x = path.split(";"), p = "$";
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 219);
for (var i=1,n=x.length; i<n; i++)
            {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 220);
p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");}
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 221);
return p;
      },
      store: function(p, v) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "store", 223);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 224);
if (p) {P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;}
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 225);
return !!p;
      },
      trace: function(expr, val, path) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "trace", 227);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 228);
if (expr) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 229);
var x = expr.split(";"), loc = x.shift();
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 230);
x = x.join(";");
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 231);
if (val && val.hasOwnProperty(loc))
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 232);
P.trace(x, val[loc], path + ";" + loc);}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 233);
if (loc === "*")
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 234);
P.walk(loc, x, val, path, function(m,l,x,v,p) { _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 6)", 234);
P.trace(m+";"+x,v,p); });}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 235);
if (loc === "..") {
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 236);
P.trace(x, val, path);
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 237);
P.walk(loc, x, val, path, function(m,l,x,v,p) { _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 7)", 237);
typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
            }
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 239);
if (/,/.test(loc)) { // [name1,name2,...]
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 240);
for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                  {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 241);
P.trace(s[i]+";"+x, val, path);}
            }
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 243);
if (/^\(.*?\)$/.test(loc)) // [(expr)]
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 244);
P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 245);
if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 246);
P.walk(loc, x, val, path, function(m,l,x,v,p) { _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 8)", 246);
if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) {P.trace(m+";"+x,v,p);} });}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 247);
if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 248);
P.slice(loc, x, val, path);}}}}}}}
         }
         else
            {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 251);
P.store(path, val);}
      },
      walk: function(loc, expr, val, path, f) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "walk", 253);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 254);
if (val instanceof Array) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 255);
for (var i=0,n=val.length; i<n; i++)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 256);
if (i in val)
                  {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 257);
f(i,loc,expr,val,path);}}
         }
         else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 259);
if (typeof val === "object") {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 260);
for (var m in val)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 261);
if (val.hasOwnProperty(m))
                  {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 262);
f(m,loc,expr,val,path);}}
         }}
      },
      slice: function(loc, expr, val, path) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "slice", 265);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 266);
if (val instanceof Array) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 267);
var len=val.length, start=0, end=len, step=1;
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 268);
loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){_yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 9)", 268);
start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 269);
start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 270);
end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 271);
for (var i=start; i<end; i+=step)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 272);
P.trace(i+";"+expr, val, path);}
         }
      },
      eval: function(x, _v, _vname) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "eval", 275);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 276);
try { return $ && _v && eval(x.replace(/@/g, "_v")); }
         catch(e) { _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 277);
throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
      }
   };

   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 281);
var $ = obj;
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 282);
if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 283);
P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 284);
return P.result.length ? P.result : false;
   }
};

},'3.1.0',{
  requires: ['inputex']
});


}, '@VERSION@');
