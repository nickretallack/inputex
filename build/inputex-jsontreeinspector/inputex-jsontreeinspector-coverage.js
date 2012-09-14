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
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].code=["YUI.add('inputex-jsontreeinspector', function (Y, NAME) {","","/**"," * @module inputex-jsontreeinspector"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a treeview to inspect a javascript object"," * @class inputEx.widget.JsonTreeInspector"," * @constructor"," * @param {String|HTMLElement} parentEl where to append the tree"," * @param {Object} object the object to inspect"," * @param {String} jsonPath JSON Path string (optional) (http://code.google.com/p/jsonpath/wiki/Javascript)"," */","inputEx.widget.JsonTreeInspector = function(parentEl, object, cfg) {","","   /**","    * Hash to contain the values indexed by li ids","    * @property hash","    */","   this.hash = {};","   ","   /**","    * Main div element","    * @property el","    */","   this.el = inputEx.cn('div');","   ","   this.cfg = Y.mix({},cfg);","   this.cfg.showEmptyObjects = lang.isUndefined(this.cfg.showEmptyObjects) ? true : this.cfg.showEmptyObjects;","","   var branch = lang.isString(this.cfg.jsonPath) ? inputEx.widget.JsonTreeInspector.jsonPath(object,this.cfg.jsonPath) : object;","   ","   this.buildBranch( branch, this.el);","   ","   (lang.isString(parentEl) ? document.getElementById(parentEl) : parentEl).appendChild(this.el);","};","","inputEx.widget.JsonTreeInspector.prototype = {","   ","   /**","    * Destroy the widget","    * @method destroy","    */","   destroy: function() {","      ","      // Remove from DOM","      if(Dom.inDocument(this.el)) {","         this.el.parentNode.removeChild(this.el);","      }","      ","      // recursively purge element","      Event.purgeElement(this.el, true);","   },","   ","   /**","    * Build the sub-branch for obj","    * @method buildBranch","    */","   buildBranch: function(obj,parentEl) {","      ","      var ul = inputEx.cn('ul', {className: 'inputEx-JsonTreeInspector'});","      ","      for(var key in obj) {","         if(obj.hasOwnProperty(key)) {","            var value = obj[key];","            ","            var id = Y.guid();","            var li = inputEx.cn('li', {id: id}, null, key+':');","            li.id = id;","            this.hash[id] = {value: value, expanded: false};","            ","            var add = true;","            ","            if( lang.isObject(value) ) {","                  ","               Y.one(li).addClass('collapsed');","               Y.one(li).on('click', this.onItemClick, this, true);","               ","               ","               if( !lang.isFunction(value) && !this.cfg.showEmptyObjects && Y.Object.isEmpty(value) ) {","                  add = false;","               }","               ","            }","            else if( lang.isArray(value) ) {","               li.appendChild( inputEx.cn('span', null, null, \"[ \"+value.length+\" element\"+(value.length > 1 ? 's':'')+\"]\" ) );","               Y.one(li).addClass('collapsed');","               Y.one(li).on('click', this.onItemClick, this, true);","            }","            else {","               var spanContent = '';","               if( lang.isString(value) ) {","                  spanContent = '\"'+inputEx.htmlEntities(value)+'\"';","               }","               else {","                  if(value === null) {","                     spanContent = \"null\";","                  }","                  else {","                     spanContent = value.toString();","                  }","               }","               li.appendChild( inputEx.cn('span', {className: 'type-'+(value === null ? \"null\" : (typeof value))}, null, spanContent ) );","            }","            ","            if(add)","               ul.appendChild(li);","         }","      }","      ","      parentEl.appendChild(ul);","      ","      return ul;","   },","   ","   ","   /**","    * When the user click on a node","    * @method onItemClick","    */","   onItemClick: function(e, params) {","      ","      e.halt();","      ","      if( e.target.hasClass('expanded') || e.target.hasClass('collapsed') ) {","         this.expandElement(e.target._node);","      }","   },","   ","   ","   /**","    * expand the node given the li element","    * @method expandElement","    */","   expandElement: function(li) {","      ","      var isExpanded = Y.one(li).hasClass('expanded');","      Y.one(li).replaceClass(isExpanded ? 'expanded' : 'collapsed' , isExpanded ? 'collapsed':'expanded');","","      var h = this.hash[li.id];","","      if(isExpanded) {","         // hide the sub-branch","         h.expanded.style.display = 'none';","      }","      else {","         if(h.expanded === false) {","            // generate the sub-branch","            h.expanded = this.buildBranch(h.value, li);","         }","         // show the sub-branch","         h.expanded.style.display = '';","      }","   },","   ","   /**","    * Expand a branch given a li element","    * @method expandBranch","    * @param {HTMLElement} li ","    * @param {Integer} maxLevel","    */","   expandBranch: function(li,maxLevel) {","      this.expandElement(li);","      ","      var that = this;","      Y.one(li).get('children').item(0).get('children').each(function(subLi) {","         ","         if(subLi.hasClass(\"collapsed\") && maxLevel != 0) {","            that.expandBranch(subLi._node,maxLevel-1);","         }","         ","      });","      ","   },","   ","   /**","    * Expand the root node","    * @method expandAll","    * @param {Integer} maxLevel","    */","   expandAll: function(maxLevel) {","      var ul = this.el.childNodes[0];","      var liEls = ul.childNodes;","      for(var i = 0 ; i < liEls.length ; i++) {","         var li = liEls[i];","         this.expandBranch(li,maxLevel);","      }","   }","   ","};","","//","// JSONPath 0.8.0 - XPath for JSON","// http://code.google.com/p/jsonpath/","// http://code.google.com/p/jsonpath/wiki/Javascript","//","// Copyright (c) 2007 Stefan Goessner (goessner.net)","// Licensed under the MIT (MIT-LICENSE.txt) licence.","//","inputEx.widget.JsonTreeInspector.jsonPath = function (obj, expr, arg) {","   var P = {","      resultType: arg && arg.resultType || \"VALUE\",","      result: [],","      normalize: function(expr) {","         var subx = [];","         return expr.replace(/[\\['](\\??\\(.*?\\))[\\]']/g, function($0,$1){return \"[#\"+(subx.push($1)-1)+\"]\";})","                    .replace(/'?\\.'?|\\['?/g, \";\")","                    .replace(/;;;|;;/g, \";..;\")","                    .replace(/;$|'?\\]|'$/g, \"\")","                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});","      },","      asPath: function(path) {","         var x = path.split(\";\"), p = \"$\";","         for (var i=1,n=x.length; i<n; i++)","            p += /^[0-9*]+$/.test(x[i]) ? (\"[\"+x[i]+\"]\") : (\"['\"+x[i]+\"']\");","         return p;","      },","      store: function(p, v) {","         if (p) P.result[P.result.length] = P.resultType == \"PATH\" ? P.asPath(p) : v;","         return !!p;","      },","      trace: function(expr, val, path) {","         if (expr) {","            var x = expr.split(\";\"), loc = x.shift();","            x = x.join(\";\");","            if (val && val.hasOwnProperty(loc))","               P.trace(x, val[loc], path + \";\" + loc);","            else if (loc === \"*\")","               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+\";\"+x,v,p); });","            else if (loc === \"..\") {","               P.trace(x, val, path);","               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === \"object\" && P.trace(\"..;\"+x,v[m],p+\";\"+m); });","            }","            else if (/,/.test(loc)) { // [name1,name2,...]","               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)","                  P.trace(s[i]+\";\"+x, val, path);","            }","            else if (/^\\(.*?\\)$/.test(loc)) // [(expr)]","               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(\";\")+1))+\";\"+x, val, path);","            else if (/^\\?\\(.*?\\)$/.test(loc)) // [?(expr)]","               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\\?\\((.*?)\\)$/,\"$1\"),v[m],m)) P.trace(m+\";\"+x,v,p); });","            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax","               P.slice(loc, x, val, path);","         }","         else","            P.store(path, val);","      },","      walk: function(loc, expr, val, path, f) {","         if (val instanceof Array) {","            for (var i=0,n=val.length; i<n; i++)","               if (i in val)","                  f(i,loc,expr,val,path);","         }","         else if (typeof val === \"object\") {","            for (var m in val)","               if (val.hasOwnProperty(m))","                  f(m,loc,expr,val,path);","         }","      },","      slice: function(loc, expr, val, path) {","         if (val instanceof Array) {","            var len=val.length, start=0, end=len, step=1;","            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});","            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);","            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);","            for (var i=start; i<end; i+=step)","               P.trace(i+\";\"+expr, val, path);","         }","      },","      eval: function(x, _v, _vname) {","         try { return $ && _v && eval(x.replace(/@/g, \"_v\")); }","         catch(e) { throw new SyntaxError(\"jsonPath: \" + e.message + \": \" + x.replace(/@/g, \"_v\").replace(/\\^/g, \"_a\")); }","      }","   };","","   var $ = obj;","   if (expr && obj && (P.resultType == \"VALUE\" || P.resultType == \"PATH\")) {","      P.trace(P.normalize(expr).replace(/^\\$;/,\"\"), obj, \"$\");","      return P.result.length ? P.result : false;","   }","};","","","}, '@VERSION@', {\"requires\": [\"inputex\"], \"skinnable\": true});"];
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].lines = {"1":0,"6":0,"17":0,"23":0,"29":0,"31":0,"32":0,"34":0,"36":0,"38":0,"41":0,"50":0,"51":0,"55":0,"64":0,"66":0,"67":0,"68":0,"70":0,"71":0,"72":0,"73":0,"75":0,"77":0,"79":0,"80":0,"83":0,"84":0,"88":0,"89":0,"90":0,"91":0,"94":0,"95":0,"96":0,"99":0,"100":0,"103":0,"106":0,"109":0,"110":0,"114":0,"116":0,"126":0,"128":0,"129":0,"140":0,"141":0,"143":0,"145":0,"147":0,"150":0,"152":0,"155":0,"166":0,"168":0,"169":0,"171":0,"172":0,"185":0,"186":0,"187":0,"188":0,"189":0,"203":0,"204":0,"208":0,"209":0,"213":0,"216":0,"217":0,"218":0,"219":0,"222":0,"223":0,"226":0,"227":0,"228":0,"229":0,"230":0,"231":0,"232":0,"233":0,"234":0,"235":0,"237":0,"238":0,"239":0,"241":0,"242":0,"243":0,"244":0,"245":0,"246":0,"249":0,"252":0,"253":0,"254":0,"255":0,"257":0,"258":0,"259":0,"260":0,"264":0,"265":0,"266":0,"267":0,"268":0,"269":0,"270":0,"274":0,"275":0,"279":0,"280":0,"281":0,"282":0};
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].functions = {"JsonTreeInspector:17":0,"destroy:47":0,"buildBranch:62":0,"onItemClick:124":0,"expandElement:138":0,"(anonymous 2):169":0,"expandBranch:165":0,"expandAll:184":0,"(anonymous 3):209":0,"(anonymous 4):213":0,"normalize:207":0,"asPath:215":0,"store:221":0,"(anonymous 5):232":0,"(anonymous 6):235":0,"(anonymous 7):244":0,"trace:225":0,"walk:251":0,"(anonymous 8):266":0,"slice:263":0,"eval:273":0,"jsonPath:203":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].coveredLines = 116;
_yuitest_coverage["build/inputex-jsontreeinspector/inputex-jsontreeinspector.js"].coveredFunctions = 23;
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 1);
YUI.add('inputex-jsontreeinspector', function (Y, NAME) {

/**
 * @module inputex-jsontreeinspector
 */
   _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 6);
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
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 17);
inputEx.widget.JsonTreeInspector = function(parentEl, object, cfg) {

   /**
    * Hash to contain the values indexed by li ids
    * @property hash
    */
   _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "JsonTreeInspector", 17);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 23);
this.hash = {};
   
   /**
    * Main div element
    * @property el
    */
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 29);
this.el = inputEx.cn('div');
   
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 31);
this.cfg = Y.mix({},cfg);
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 32);
this.cfg.showEmptyObjects = lang.isUndefined(this.cfg.showEmptyObjects) ? true : this.cfg.showEmptyObjects;

   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 34);
var branch = lang.isString(this.cfg.jsonPath) ? inputEx.widget.JsonTreeInspector.jsonPath(object,this.cfg.jsonPath) : object;
   
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 36);
this.buildBranch( branch, this.el);
   
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 38);
(lang.isString(parentEl) ? document.getElementById(parentEl) : parentEl).appendChild(this.el);
};

_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 41);
inputEx.widget.JsonTreeInspector.prototype = {
   
   /**
    * Destroy the widget
    * @method destroy
    */
   destroy: function() {
      
      // Remove from DOM
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "destroy", 47);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 50);
if(Dom.inDocument(this.el)) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 51);
this.el.parentNode.removeChild(this.el);
      }
      
      // recursively purge element
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 55);
Event.purgeElement(this.el, true);
   },
   
   /**
    * Build the sub-branch for obj
    * @method buildBranch
    */
   buildBranch: function(obj,parentEl) {
      
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "buildBranch", 62);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 64);
var ul = inputEx.cn('ul', {className: 'inputEx-JsonTreeInspector'});
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 66);
for(var key in obj) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 67);
if(obj.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 68);
var value = obj[key];
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 70);
var id = Y.guid();
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 71);
var li = inputEx.cn('li', {id: id}, null, key+':');
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 72);
li.id = id;
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 73);
this.hash[id] = {value: value, expanded: false};
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 75);
var add = true;
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 77);
if( lang.isObject(value) ) {
                  
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 79);
Y.one(li).addClass('collapsed');
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 80);
Y.one(li).on('click', this.onItemClick, this, true);
               
               
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 83);
if( !lang.isFunction(value) && !this.cfg.showEmptyObjects && Y.Object.isEmpty(value) ) {
                  _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 84);
add = false;
               }
               
            }
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 88);
if( lang.isArray(value) ) {
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 89);
li.appendChild( inputEx.cn('span', null, null, "[ "+value.length+" element"+(value.length > 1 ? 's':'')+"]" ) );
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 90);
Y.one(li).addClass('collapsed');
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 91);
Y.one(li).on('click', this.onItemClick, this, true);
            }
            else {
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 94);
var spanContent = '';
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 95);
if( lang.isString(value) ) {
                  _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 96);
spanContent = '"'+inputEx.htmlEntities(value)+'"';
               }
               else {
                  _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 99);
if(value === null) {
                     _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 100);
spanContent = "null";
                  }
                  else {
                     _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 103);
spanContent = value.toString();
                  }
               }
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 106);
li.appendChild( inputEx.cn('span', {className: 'type-'+(value === null ? "null" : (typeof value))}, null, spanContent ) );
            }}
            
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 109);
if(add)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 110);
ul.appendChild(li);}
         }
      }
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 114);
parentEl.appendChild(ul);
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 116);
return ul;
   },
   
   
   /**
    * When the user click on a node
    * @method onItemClick
    */
   onItemClick: function(e, params) {
      
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "onItemClick", 124);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 126);
e.halt();
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 128);
if( e.target.hasClass('expanded') || e.target.hasClass('collapsed') ) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 129);
this.expandElement(e.target._node);
      }
   },
   
   
   /**
    * expand the node given the li element
    * @method expandElement
    */
   expandElement: function(li) {
      
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "expandElement", 138);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 140);
var isExpanded = Y.one(li).hasClass('expanded');
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 141);
Y.one(li).replaceClass(isExpanded ? 'expanded' : 'collapsed' , isExpanded ? 'collapsed':'expanded');

      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 143);
var h = this.hash[li.id];

      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 145);
if(isExpanded) {
         // hide the sub-branch
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 147);
h.expanded.style.display = 'none';
      }
      else {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 150);
if(h.expanded === false) {
            // generate the sub-branch
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 152);
h.expanded = this.buildBranch(h.value, li);
         }
         // show the sub-branch
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 155);
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
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "expandBranch", 165);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 166);
this.expandElement(li);
      
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 168);
var that = this;
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 169);
Y.one(li).get('children').item(0).get('children').each(function(subLi) {
         
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 2)", 169);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 171);
if(subLi.hasClass("collapsed") && maxLevel != 0) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 172);
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
      _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "expandAll", 184);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 185);
var ul = this.el.childNodes[0];
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 186);
var liEls = ul.childNodes;
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 187);
for(var i = 0 ; i < liEls.length ; i++) {
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 188);
var li = liEls[i];
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 189);
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
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 203);
inputEx.widget.JsonTreeInspector.jsonPath = function (obj, expr, arg) {
   _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "jsonPath", 203);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 204);
var P = {
      resultType: arg && arg.resultType || "VALUE",
      result: [],
      normalize: function(expr) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "normalize", 207);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 208);
var subx = [];
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 209);
return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){_yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 3)", 209);
return "[#"+(subx.push($1)-1)+"]";})
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function($0,$1){_yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 4)", 213);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 213);
return subx[$1];});
      },
      asPath: function(path) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "asPath", 215);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 216);
var x = path.split(";"), p = "$";
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 217);
for (var i=1,n=x.length; i<n; i++)
            {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 218);
p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");}
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 219);
return p;
      },
      store: function(p, v) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "store", 221);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 222);
if (p) {P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;}
         _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 223);
return !!p;
      },
      trace: function(expr, val, path) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "trace", 225);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 226);
if (expr) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 227);
var x = expr.split(";"), loc = x.shift();
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 228);
x = x.join(";");
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 229);
if (val && val.hasOwnProperty(loc))
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 230);
P.trace(x, val[loc], path + ";" + loc);}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 231);
if (loc === "*")
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 232);
P.walk(loc, x, val, path, function(m,l,x,v,p) { _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 5)", 232);
P.trace(m+";"+x,v,p); });}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 233);
if (loc === "..") {
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 234);
P.trace(x, val, path);
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 235);
P.walk(loc, x, val, path, function(m,l,x,v,p) { _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 6)", 235);
typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
            }
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 237);
if (/,/.test(loc)) { // [name1,name2,...]
               _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 238);
for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                  {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 239);
P.trace(s[i]+";"+x, val, path);}
            }
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 241);
if (/^\(.*?\)$/.test(loc)) // [(expr)]
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 242);
P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 243);
if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 244);
P.walk(loc, x, val, path, function(m,l,x,v,p) { _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 7)", 244);
if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) {P.trace(m+";"+x,v,p);} });}
            else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 245);
if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 246);
P.slice(loc, x, val, path);}}}}}}}
         }
         else
            {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 249);
P.store(path, val);}
      },
      walk: function(loc, expr, val, path, f) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "walk", 251);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 252);
if (val instanceof Array) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 253);
for (var i=0,n=val.length; i<n; i++)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 254);
if (i in val)
                  {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 255);
f(i,loc,expr,val,path);}}
         }
         else {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 257);
if (typeof val === "object") {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 258);
for (var m in val)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 259);
if (val.hasOwnProperty(m))
                  {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 260);
f(m,loc,expr,val,path);}}
         }}
      },
      slice: function(loc, expr, val, path) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "slice", 263);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 264);
if (val instanceof Array) {
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 265);
var len=val.length, start=0, end=len, step=1;
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 266);
loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){_yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "(anonymous 8)", 266);
start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 267);
start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 268);
end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
            _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 269);
for (var i=start; i<end; i+=step)
               {_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 270);
P.trace(i+";"+expr, val, path);}
         }
      },
      eval: function(x, _v, _vname) {
         _yuitest_coverfunc("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", "eval", 273);
_yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 274);
try { return $ && _v && eval(x.replace(/@/g, "_v")); }
         catch(e) { _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 275);
throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
      }
   };

   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 279);
var $ = obj;
   _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 280);
if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 281);
P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
      _yuitest_coverline("build/inputex-jsontreeinspector/inputex-jsontreeinspector.js", 282);
return P.result.length ? P.result : false;
   }
};


}, '@VERSION@', {"requires": ["inputex"], "skinnable": true});
