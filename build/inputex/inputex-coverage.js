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
_yuitest_coverage["build/inputex/inputex.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex/inputex.js",
    code: []
};
_yuitest_coverage["build/inputex/inputex.js"].code=["YUI.add('inputex', function (Y, NAME) {","","/**"," * The inputEx Library"," * @module inputex"," */","  var lang = Y.Lang;","  /**","   * The inputEx method lets you create a field from the JSON definition:","   * <pre>","   *    Y.inputEx({type: 'string', name: 'company', label: 'Your company' })","   * </pre>","   * Build a field from an object like: { type: 'color' or fieldClass: inputEx.ColorField, ... }<br />","   * If the neither type or fieldClass are found, it uses inputEx.StringField","   *","   * @class inputEx","   * @method inputEx","   * @static","   * @param {Object} fieldOptions","   * @param {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField} (optional) parentField The parent field instance","   * @return {inputEx.Field} Created field instance","   */","  Y.inputEx = function(fieldOptions, parentField) {","     var fieldClass = null,","         inputInstance;","         ","    if(fieldOptions.type) {","       fieldClass = inputEx.getFieldClass(fieldOptions.type);","       ","        if( !Y.Lang.isFunction(fieldClass) ){","           throw new Error(\"Missing inputEx module for type: '\"+fieldOptions.type+\"' ?\");","        }","    }","    else {","       fieldClass = fieldOptions.fieldClass ? fieldOptions.fieldClass : inputEx.StringField;","    }","","     // Instanciate the field","     inputInstance = new fieldClass(fieldOptions);","","     // If the parentField argument is provided","     if(parentField) {","        inputInstance.setParentField(parentField);","     }","","     // Add the flatten attribute if present in the params","     /*if(fieldOptions.flatten) {","        inputInstance._flatten = true;","     }*/","     ","     return inputInstance;","  };","  ","  var inputEx = Y.inputEx;","  ","  Y.mix(Y.inputEx, {","","     VERSION: \"3.1.0\",","     ","     /**","      * Url to the spacer image. This url schould be changed according to your project directories","      * @property spacerUrl","      * @type String","      */","     spacerUrl: YUI_config.groups.inputex.base+\"inputex/assets/skins/sam/images/space.gif\", // 1x1 px","     ","     /**","      * Field empty state constant","      * @property stateEmpty","      * @type String","      */","     stateEmpty: 'empty',","     ","     /**","      * Field required state constant","      * @property stateRequired","      * @type String","      */","     stateRequired: 'required',","     ","     /**","      * Field valid state constant","      * @property stateValid","      * @type String","      */","     stateValid: 'valid',","     ","     /**","      * Field invalid state constant","      * @property stateInvalid","      * @type String","      */","     stateInvalid: 'invalid',","     ","     /**","      * Associative array containing field messages => using intl module from YUI","      * @property messages","      */","     messages: null,","     ","     /**","      * inputEx widget namespace","      * @class inputEx.widget","      * @static ","      */","     widget: {},","     ","     /**","      * inputEx mixin namespace","      * @class inputEx.mixin","      * @static ","      */","     mixin: {},","     ","     /**","      * Associative array containing common regular expressions","      * @property regexps","      */","     regexps: {","        email: /^[a-z0-9!\\#\\$%&'\\*\\-\\/=\\?\\+\\-\\^_`\\{\\|\\}~]+(?:\\.[a-z0-9!\\#\\$%&'\\*\\-\\/=\\?\\+\\-\\^_`\\{\\|\\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z]{2,6}$/i,","        url: /^(http|https):\\/\\/[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(\\:[0-9]{1,5})?(([0-9]{1,5})?\\/.*)?$/i","     },","     ","     /**","      * Hash between inputEx types and classes (ex: <code>inputEx.typeClasses.color = inputEx.ColorField</code>)<br />","      * Please register the types with the <code>registerType</code> method","      * @property typeClasses","      */","     typeClasses: {},","     ","     /**","      * Property to globally turn on/off the browser autocompletion","      * Possible values: \"on\", \"off\"","      * @property browserAutocomplete","      */","     browserAutocomplete: \"on\",","     ","     /**","      * When you create a new inputEx Field Class, you can register it to give it a simple type.","      * ex:   inputEx.registerType(\"color\", inputEx.ColorField);","      * @method registerType","      * @static","      * @param {String} type String used as the inputEx field type","      * @param {Class} fieldClass Field Class to register as this type","      * @param {Array} groupOptions List of inputEx field description for each option","      * @param {Boolean} dontInherit Won't inherhit the parent field properties if set to true","      */","     registerType: function(type, fieldClass, groupOptions, dontInherit) {","        if(!lang.isString(type)) {","           throw new Error(\"inputEx.registerType: first argument must be a string\");","        }","        if(!lang.isFunction(fieldClass)) {","           throw new Error(\"inputEx.registerType: second argument must be a function\");","        }","        this.typeClasses[type] = fieldClass;","        ","        // Setup the groupOptions property on the class","        var opts = [];","        if(lang.isArray(groupOptions)) { opts = groupOptions; }","        if(fieldClass.superclass && !dontInherit && lang.isArray(fieldClass.superclass.constructor.groupOptions) ) {","           opts = fieldClass.superclass.constructor.groupOptions.concat(opts);","        }","        fieldClass.groupOptions = opts;","     },","     ","     /**","      * Returns the class for the given type","      * ex: inputEx.getFieldClass(\"color\") returns inputEx.ColorField","      * @method getFieldClass","      * @static","      * @param {String} type String type of the field","      */","     getFieldClass: function(type) {","        return lang.isFunction(this.typeClasses[type]) ? this.typeClasses[type] : null;","     },","     ","     /**","      * Get the inputex type for the given class (ex: <code>inputEx.getType(inputEx.ColorField)</code> returns \"color\")","      * @method getType","      * @static","      * @param {inputEx.Field} FieldClass An inputEx.Field or derivated class","      * @return {String} returns the inputEx type string or <code>null</code>","      */","     getType: function(FieldClass) {","        for(var type in this.typeClasses) {","           if(this.typeClasses.hasOwnProperty(type) ) {","              if(this.typeClasses[type] == FieldClass) {","                 return type;","              }","           }","        }","        return null;","     },","     ","     ","     /**","      * Return recursively the inputex modules from their 'type' property using (modulesByType from loader.js)","      * @method getRawModulesFromDefinition","      * @static","      */","     getRawModulesFromDefinition: function(inputexDef) {","        ","        var type = inputexDef.type || 'string',","            module = YUI_config.groups.inputex.modulesByType[type],","            modules = [module || type],","            //set fields if they exist","            fields = inputexDef.fields ||","            //else see if we have elementType for lists - if neither then we end up with null","            inputexDef.elementType && inputexDef.elementType.fields;","        ","        ","        // recursive for group,forms,list,combine, etc...","        if(fields) {","           Y.Array.each(fields, function(field) {","                modules = modules.concat( this.getModulesFromDefinition(field) );","           }, this);","        }","        ","        // TODO: inplaceedit  editorField","        ","        return modules;","     },","     ","     /**","      * Return unique modules definitions","      * @method getModulesFromDefinition","      * @static","      */","     getModulesFromDefinition: function(inputexDef) {","        var modules = this.getRawModulesFromDefinition(inputexDef);","        return Y.Object.keys(Y.Array.hash(modules));","     },","     ","     /**","      * Load the modules from an inputEx definition","      * @method use","      * @static","      */","     use: function(inputexDef, cb) {","        var defs, modules = [];","        if (!Y.Array.test(inputexDef)){ defs = [inputexDef];}","        else {defs = inputexDef;}","        ","        Y.each(defs, function(def){","            modules = modules.concat( this.getModulesFromDefinition(def));","        },this);","        modules.push(cb);","        Y.use.apply( Y, modules);","     },","     ","     /**","      * Helper function to set DOM node attributes and style attributes.","      * @method sn","      * @static","      * @param {HTMLElement} el The element to set attributes to","      * @param {Object} domAttributes An object containing key/value pairs to set as node attributes (ex: {id: 'myElement', className: 'myCssClass', ...})","      * @param {Object} styleAttributes Same thing for style attributes. Please use camelCase for style attributes (ex: backgroundColor for 'background-color')","      */","     sn: function(el,domAttributes,styleAttributes){","        if(!el) { return; }","        var i;","        if(domAttributes){","           for(i in domAttributes){","              var domAttribute = domAttributes[i];","              if( lang.isFunction(domAttribute) ){","                 continue;","              }","              if(i==\"className\"){","                 i=\"class\";","                 el.className=domAttribute;","              }","              if(domAttribute!==el.getAttribute(i)){","                 try{","                    if(domAttribute===false){","                       el.removeAttribute(i);","                    }else{","                       el.setAttribute(i,domAttribute);","                    }","                 }","                 catch(err){","                    //console.log(\"WARNING: WireIt.sn failed for \"+el.tagName+\", attr \"+i+\", val \"+domAttribute);","                 }","              }","           }","        }","","        if(styleAttributes){","           for(i in styleAttributes){","              if( lang.isFunction(styleAttributes[i]) ){","                 continue;","              }","              if(el.style[i]!=styleAttributes[i]){","                 el.style[i]=styleAttributes[i];","              }","           }","        }","     },","","","     /**","      * Helper function to create a DOM node. (wrapps the document.createElement tag and the inputEx.sn functions)","      * @method cn","      * @static","      * @param {String} tag The tagName to create (ex: 'div', 'a', ...)","      * @param {Object} [domAttributes] see inputEx.sn","      * @param {Object} [styleAttributes] see inputEx.sn","      * @param {String} [innerHTML] The html string to append into the created element","      * @return {HTMLElement} The created node","      */","     cn: function(tag, domAttributes, styleAttributes, innerHTML) {","          if (tag == 'input' && Y.UA.ie && Y.UA.ie < 9) { //only limit to input tag that has no tag body","              var strDom = '<' + tag;","              if (domAttributes!=='undefined'){","                  for (var k in domAttributes){","                      strDom += ' ' + (k === \"className\" ? \"class\" : k) + '=\"' + domAttributes[k] + '\"';","                  }","              }","              strDom += '/' + '>';","              return document.createElement(strDom);","","          } else {","              var el = document.createElement(tag);","              this.sn(el, domAttributes, styleAttributes);","              if (innerHTML) {","                  el.innerHTML = innerHTML;","              }","              return el;","          }","      },","     ","     ","     /**","      * Find the position of the given element. (This method is not available in IE 6)","      * @method indexOf","      * @static","      * @param {Object} el Value to search","      * @param {Array} arr The array to search","      * @param {Function} (optional) fn A function to define another way to test inclusion of el than === (returns a boolean)","      * @return {number} Element position, -1 if not found","      */","     indexOf: function(el,arr,fn) {","   ","        var l=arr.length,i;","      ","        if ( !lang.isFunction(fn) ) { fn = function(elt,arrElt) { return elt === arrElt; }; }","      ","        for ( i = 0 ;i < l ; i++ ) {","           if ( fn.call({}, el, arr[i]) ) { return i; }","        }","      ","        return -1;","     },","     ","     /**","      * Create a new array without the null or undefined values","      * @method compactArray","      * @static","      * @param {Array} arr The array to compact","      * @return {Array} The new array","      */","     compactArray: function(arr) {","        var n = [], l=arr.length,i;","        for(i = 0 ; i < l ; i++) {","           if( !lang.isNull(arr[i]) && !lang.isUndefined(arr[i]) ) {","              n.push(arr[i]);","           }","        }","        return n;","     },","     ","     /**","      * Return a string without accent (only on lowercase)","      * @method removeAccents","      * @static","      * @param {String} str The string","      * @return {String} String without accent","      */","     removeAccents: function (str) {","        return str.replace(/[àáâãäå]/g,\"a\").","                   replace(/[èéêë]/g,\"e\").","                   replace(/[ìíîï]/g,\"i\").","                   replace(/[òóôõö]/g,\"o\").","                   replace(/[ùúûü]/g,\"u\").","                   replace(/[ýÿ]/g,\"y\").","                   replace(/[ñ]/g,\"n\").","                   replace(/[ç]/g,\"c\").","                   replace(/[œ]/g,\"oe\").","                   replace(/[æ]/g,\"ae\");","     },","     ","     /**","      * String replaced by some html entities","      * @method htmlEntities","      * @static","      * @param {String} str The string","      * @return {String} String replaced by some html entities","      */","     htmlEntities: function (str) {","        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');","     }","  });","","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"pluginhost-base\",","        \"pluginhost-config\",","        \"base-pluginhost\",","        \"node-pluginhost\",","        \"plugin\",","        \"node\",","        \"intl\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/inputex/inputex.js"].lines = {"1":0,"7":0,"23":0,"24":0,"27":0,"28":0,"30":0,"31":0,"35":0,"39":0,"42":0,"43":0,"51":0,"54":0,"56":0,"149":0,"150":0,"152":0,"153":0,"155":0,"158":0,"159":0,"160":0,"161":0,"163":0,"174":0,"185":0,"186":0,"187":0,"188":0,"192":0,"203":0,"213":0,"214":0,"215":0,"221":0,"230":0,"231":0,"240":0,"241":0,"244":0,"245":0,"247":0,"248":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"268":0,"269":0,"270":0,"272":0,"273":0,"274":0,"275":0,"277":0,"287":0,"288":0,"289":0,"290":0,"292":0,"293":0,"311":0,"312":0,"313":0,"314":0,"315":0,"318":0,"319":0,"322":0,"323":0,"324":0,"325":0,"327":0,"343":0,"345":0,"347":0,"348":0,"351":0,"362":0,"363":0,"364":0,"365":0,"368":0,"379":0,"399":0};
_yuitest_coverage["build/inputex/inputex.js"].functions = {"inputEx:23":0,"registerType:148":0,"getFieldClass:173":0,"getType:184":0,"(anonymous 2):214":0,"getRawModulesFromDefinition:201":0,"getModulesFromDefinition:229":0,"(anonymous 3):244":0,"use:239":0,"sn:259":0,"cn:310":0,"fn:345":0,"indexOf:341":0,"compactArray:361":0,"removeAccents:378":0,"htmlEntities:398":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex/inputex.js"].coveredLines = 89;
_yuitest_coverage["build/inputex/inputex.js"].coveredFunctions = 17;
_yuitest_coverline("build/inputex/inputex.js", 1);
YUI.add('inputex', function (Y, NAME) {

/**
 * The inputEx Library
 * @module inputex
 */
  _yuitest_coverfunc("build/inputex/inputex.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex/inputex.js", 7);
var lang = Y.Lang;
  /**
   * The inputEx method lets you create a field from the JSON definition:
   * <pre>
   *    Y.inputEx({type: 'string', name: 'company', label: 'Your company' })
   * </pre>
   * Build a field from an object like: { type: 'color' or fieldClass: inputEx.ColorField, ... }<br />
   * If the neither type or fieldClass are found, it uses inputEx.StringField
   *
   * @class inputEx
   * @method inputEx
   * @static
   * @param {Object} fieldOptions
   * @param {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField} (optional) parentField The parent field instance
   * @return {inputEx.Field} Created field instance
   */
  _yuitest_coverline("build/inputex/inputex.js", 23);
Y.inputEx = function(fieldOptions, parentField) {
     _yuitest_coverfunc("build/inputex/inputex.js", "inputEx", 23);
_yuitest_coverline("build/inputex/inputex.js", 24);
var fieldClass = null,
         inputInstance;
         
    _yuitest_coverline("build/inputex/inputex.js", 27);
if(fieldOptions.type) {
       _yuitest_coverline("build/inputex/inputex.js", 28);
fieldClass = inputEx.getFieldClass(fieldOptions.type);
       
        _yuitest_coverline("build/inputex/inputex.js", 30);
if( !Y.Lang.isFunction(fieldClass) ){
           _yuitest_coverline("build/inputex/inputex.js", 31);
throw new Error("Missing inputEx module for type: '"+fieldOptions.type+"' ?");
        }
    }
    else {
       _yuitest_coverline("build/inputex/inputex.js", 35);
fieldClass = fieldOptions.fieldClass ? fieldOptions.fieldClass : inputEx.StringField;
    }

     // Instanciate the field
     _yuitest_coverline("build/inputex/inputex.js", 39);
inputInstance = new fieldClass(fieldOptions);

     // If the parentField argument is provided
     _yuitest_coverline("build/inputex/inputex.js", 42);
if(parentField) {
        _yuitest_coverline("build/inputex/inputex.js", 43);
inputInstance.setParentField(parentField);
     }

     // Add the flatten attribute if present in the params
     /*if(fieldOptions.flatten) {
        inputInstance._flatten = true;
     }*/
     
     _yuitest_coverline("build/inputex/inputex.js", 51);
return inputInstance;
  };
  
  _yuitest_coverline("build/inputex/inputex.js", 54);
var inputEx = Y.inputEx;
  
  _yuitest_coverline("build/inputex/inputex.js", 56);
Y.mix(Y.inputEx, {

     VERSION: "3.1.0",
     
     /**
      * Url to the spacer image. This url schould be changed according to your project directories
      * @property spacerUrl
      * @type String
      */
     spacerUrl: YUI_config.groups.inputex.base+"inputex/assets/skins/sam/images/space.gif", // 1x1 px
     
     /**
      * Field empty state constant
      * @property stateEmpty
      * @type String
      */
     stateEmpty: 'empty',
     
     /**
      * Field required state constant
      * @property stateRequired
      * @type String
      */
     stateRequired: 'required',
     
     /**
      * Field valid state constant
      * @property stateValid
      * @type String
      */
     stateValid: 'valid',
     
     /**
      * Field invalid state constant
      * @property stateInvalid
      * @type String
      */
     stateInvalid: 'invalid',
     
     /**
      * Associative array containing field messages => using intl module from YUI
      * @property messages
      */
     messages: null,
     
     /**
      * inputEx widget namespace
      * @class inputEx.widget
      * @static 
      */
     widget: {},
     
     /**
      * inputEx mixin namespace
      * @class inputEx.mixin
      * @static 
      */
     mixin: {},
     
     /**
      * Associative array containing common regular expressions
      * @property regexps
      */
     regexps: {
        email: /^[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+(?:\.[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i,
        url: /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(([0-9]{1,5})?\/.*)?$/i
     },
     
     /**
      * Hash between inputEx types and classes (ex: <code>inputEx.typeClasses.color = inputEx.ColorField</code>)<br />
      * Please register the types with the <code>registerType</code> method
      * @property typeClasses
      */
     typeClasses: {},
     
     /**
      * Property to globally turn on/off the browser autocompletion
      * Possible values: "on", "off"
      * @property browserAutocomplete
      */
     browserAutocomplete: "on",
     
     /**
      * When you create a new inputEx Field Class, you can register it to give it a simple type.
      * ex:   inputEx.registerType("color", inputEx.ColorField);
      * @method registerType
      * @static
      * @param {String} type String used as the inputEx field type
      * @param {Class} fieldClass Field Class to register as this type
      * @param {Array} groupOptions List of inputEx field description for each option
      * @param {Boolean} dontInherit Won't inherhit the parent field properties if set to true
      */
     registerType: function(type, fieldClass, groupOptions, dontInherit) {
        _yuitest_coverfunc("build/inputex/inputex.js", "registerType", 148);
_yuitest_coverline("build/inputex/inputex.js", 149);
if(!lang.isString(type)) {
           _yuitest_coverline("build/inputex/inputex.js", 150);
throw new Error("inputEx.registerType: first argument must be a string");
        }
        _yuitest_coverline("build/inputex/inputex.js", 152);
if(!lang.isFunction(fieldClass)) {
           _yuitest_coverline("build/inputex/inputex.js", 153);
throw new Error("inputEx.registerType: second argument must be a function");
        }
        _yuitest_coverline("build/inputex/inputex.js", 155);
this.typeClasses[type] = fieldClass;
        
        // Setup the groupOptions property on the class
        _yuitest_coverline("build/inputex/inputex.js", 158);
var opts = [];
        _yuitest_coverline("build/inputex/inputex.js", 159);
if(lang.isArray(groupOptions)) { opts = groupOptions; }
        _yuitest_coverline("build/inputex/inputex.js", 160);
if(fieldClass.superclass && !dontInherit && lang.isArray(fieldClass.superclass.constructor.groupOptions) ) {
           _yuitest_coverline("build/inputex/inputex.js", 161);
opts = fieldClass.superclass.constructor.groupOptions.concat(opts);
        }
        _yuitest_coverline("build/inputex/inputex.js", 163);
fieldClass.groupOptions = opts;
     },
     
     /**
      * Returns the class for the given type
      * ex: inputEx.getFieldClass("color") returns inputEx.ColorField
      * @method getFieldClass
      * @static
      * @param {String} type String type of the field
      */
     getFieldClass: function(type) {
        _yuitest_coverfunc("build/inputex/inputex.js", "getFieldClass", 173);
_yuitest_coverline("build/inputex/inputex.js", 174);
return lang.isFunction(this.typeClasses[type]) ? this.typeClasses[type] : null;
     },
     
     /**
      * Get the inputex type for the given class (ex: <code>inputEx.getType(inputEx.ColorField)</code> returns "color")
      * @method getType
      * @static
      * @param {inputEx.Field} FieldClass An inputEx.Field or derivated class
      * @return {String} returns the inputEx type string or <code>null</code>
      */
     getType: function(FieldClass) {
        _yuitest_coverfunc("build/inputex/inputex.js", "getType", 184);
_yuitest_coverline("build/inputex/inputex.js", 185);
for(var type in this.typeClasses) {
           _yuitest_coverline("build/inputex/inputex.js", 186);
if(this.typeClasses.hasOwnProperty(type) ) {
              _yuitest_coverline("build/inputex/inputex.js", 187);
if(this.typeClasses[type] == FieldClass) {
                 _yuitest_coverline("build/inputex/inputex.js", 188);
return type;
              }
           }
        }
        _yuitest_coverline("build/inputex/inputex.js", 192);
return null;
     },
     
     
     /**
      * Return recursively the inputex modules from their 'type' property using (modulesByType from loader.js)
      * @method getRawModulesFromDefinition
      * @static
      */
     getRawModulesFromDefinition: function(inputexDef) {
        
        _yuitest_coverfunc("build/inputex/inputex.js", "getRawModulesFromDefinition", 201);
_yuitest_coverline("build/inputex/inputex.js", 203);
var type = inputexDef.type || 'string',
            module = YUI_config.groups.inputex.modulesByType[type],
            modules = [module || type],
            //set fields if they exist
            fields = inputexDef.fields ||
            //else see if we have elementType for lists - if neither then we end up with null
            inputexDef.elementType && inputexDef.elementType.fields;
        
        
        // recursive for group,forms,list,combine, etc...
        _yuitest_coverline("build/inputex/inputex.js", 213);
if(fields) {
           _yuitest_coverline("build/inputex/inputex.js", 214);
Y.Array.each(fields, function(field) {
                _yuitest_coverfunc("build/inputex/inputex.js", "(anonymous 2)", 214);
_yuitest_coverline("build/inputex/inputex.js", 215);
modules = modules.concat( this.getModulesFromDefinition(field) );
           }, this);
        }
        
        // TODO: inplaceedit  editorField
        
        _yuitest_coverline("build/inputex/inputex.js", 221);
return modules;
     },
     
     /**
      * Return unique modules definitions
      * @method getModulesFromDefinition
      * @static
      */
     getModulesFromDefinition: function(inputexDef) {
        _yuitest_coverfunc("build/inputex/inputex.js", "getModulesFromDefinition", 229);
_yuitest_coverline("build/inputex/inputex.js", 230);
var modules = this.getRawModulesFromDefinition(inputexDef);
        _yuitest_coverline("build/inputex/inputex.js", 231);
return Y.Object.keys(Y.Array.hash(modules));
     },
     
     /**
      * Load the modules from an inputEx definition
      * @method use
      * @static
      */
     use: function(inputexDef, cb) {
        _yuitest_coverfunc("build/inputex/inputex.js", "use", 239);
_yuitest_coverline("build/inputex/inputex.js", 240);
var defs, modules = [];
        _yuitest_coverline("build/inputex/inputex.js", 241);
if (!Y.Array.test(inputexDef)){ defs = [inputexDef];}
        else {defs = inputexDef;}
        
        _yuitest_coverline("build/inputex/inputex.js", 244);
Y.each(defs, function(def){
            _yuitest_coverfunc("build/inputex/inputex.js", "(anonymous 3)", 244);
_yuitest_coverline("build/inputex/inputex.js", 245);
modules = modules.concat( this.getModulesFromDefinition(def));
        },this);
        _yuitest_coverline("build/inputex/inputex.js", 247);
modules.push(cb);
        _yuitest_coverline("build/inputex/inputex.js", 248);
Y.use.apply( Y, modules);
     },
     
     /**
      * Helper function to set DOM node attributes and style attributes.
      * @method sn
      * @static
      * @param {HTMLElement} el The element to set attributes to
      * @param {Object} domAttributes An object containing key/value pairs to set as node attributes (ex: {id: 'myElement', className: 'myCssClass', ...})
      * @param {Object} styleAttributes Same thing for style attributes. Please use camelCase for style attributes (ex: backgroundColor for 'background-color')
      */
     sn: function(el,domAttributes,styleAttributes){
        _yuitest_coverfunc("build/inputex/inputex.js", "sn", 259);
_yuitest_coverline("build/inputex/inputex.js", 260);
if(!el) { return; }
        _yuitest_coverline("build/inputex/inputex.js", 261);
var i;
        _yuitest_coverline("build/inputex/inputex.js", 262);
if(domAttributes){
           _yuitest_coverline("build/inputex/inputex.js", 263);
for(i in domAttributes){
              _yuitest_coverline("build/inputex/inputex.js", 264);
var domAttribute = domAttributes[i];
              _yuitest_coverline("build/inputex/inputex.js", 265);
if( lang.isFunction(domAttribute) ){
                 _yuitest_coverline("build/inputex/inputex.js", 266);
continue;
              }
              _yuitest_coverline("build/inputex/inputex.js", 268);
if(i=="className"){
                 _yuitest_coverline("build/inputex/inputex.js", 269);
i="class";
                 _yuitest_coverline("build/inputex/inputex.js", 270);
el.className=domAttribute;
              }
              _yuitest_coverline("build/inputex/inputex.js", 272);
if(domAttribute!==el.getAttribute(i)){
                 _yuitest_coverline("build/inputex/inputex.js", 273);
try{
                    _yuitest_coverline("build/inputex/inputex.js", 274);
if(domAttribute===false){
                       _yuitest_coverline("build/inputex/inputex.js", 275);
el.removeAttribute(i);
                    }else{
                       _yuitest_coverline("build/inputex/inputex.js", 277);
el.setAttribute(i,domAttribute);
                    }
                 }
                 catch(err){
                    //console.log("WARNING: WireIt.sn failed for "+el.tagName+", attr "+i+", val "+domAttribute);
                 }
              }
           }
        }

        _yuitest_coverline("build/inputex/inputex.js", 287);
if(styleAttributes){
           _yuitest_coverline("build/inputex/inputex.js", 288);
for(i in styleAttributes){
              _yuitest_coverline("build/inputex/inputex.js", 289);
if( lang.isFunction(styleAttributes[i]) ){
                 _yuitest_coverline("build/inputex/inputex.js", 290);
continue;
              }
              _yuitest_coverline("build/inputex/inputex.js", 292);
if(el.style[i]!=styleAttributes[i]){
                 _yuitest_coverline("build/inputex/inputex.js", 293);
el.style[i]=styleAttributes[i];
              }
           }
        }
     },


     /**
      * Helper function to create a DOM node. (wrapps the document.createElement tag and the inputEx.sn functions)
      * @method cn
      * @static
      * @param {String} tag The tagName to create (ex: 'div', 'a', ...)
      * @param {Object} [domAttributes] see inputEx.sn
      * @param {Object} [styleAttributes] see inputEx.sn
      * @param {String} [innerHTML] The html string to append into the created element
      * @return {HTMLElement} The created node
      */
     cn: function(tag, domAttributes, styleAttributes, innerHTML) {
          _yuitest_coverfunc("build/inputex/inputex.js", "cn", 310);
_yuitest_coverline("build/inputex/inputex.js", 311);
if (tag == 'input' && Y.UA.ie && Y.UA.ie < 9) { //only limit to input tag that has no tag body
              _yuitest_coverline("build/inputex/inputex.js", 312);
var strDom = '<' + tag;
              _yuitest_coverline("build/inputex/inputex.js", 313);
if (domAttributes!=='undefined'){
                  _yuitest_coverline("build/inputex/inputex.js", 314);
for (var k in domAttributes){
                      _yuitest_coverline("build/inputex/inputex.js", 315);
strDom += ' ' + (k === "className" ? "class" : k) + '="' + domAttributes[k] + '"';
                  }
              }
              _yuitest_coverline("build/inputex/inputex.js", 318);
strDom += '/' + '>';
              _yuitest_coverline("build/inputex/inputex.js", 319);
return document.createElement(strDom);

          } else {
              _yuitest_coverline("build/inputex/inputex.js", 322);
var el = document.createElement(tag);
              _yuitest_coverline("build/inputex/inputex.js", 323);
this.sn(el, domAttributes, styleAttributes);
              _yuitest_coverline("build/inputex/inputex.js", 324);
if (innerHTML) {
                  _yuitest_coverline("build/inputex/inputex.js", 325);
el.innerHTML = innerHTML;
              }
              _yuitest_coverline("build/inputex/inputex.js", 327);
return el;
          }
      },
     
     
     /**
      * Find the position of the given element. (This method is not available in IE 6)
      * @method indexOf
      * @static
      * @param {Object} el Value to search
      * @param {Array} arr The array to search
      * @param {Function} (optional) fn A function to define another way to test inclusion of el than === (returns a boolean)
      * @return {number} Element position, -1 if not found
      */
     indexOf: function(el,arr,fn) {
   
        _yuitest_coverfunc("build/inputex/inputex.js", "indexOf", 341);
_yuitest_coverline("build/inputex/inputex.js", 343);
var l=arr.length,i;
      
        _yuitest_coverline("build/inputex/inputex.js", 345);
if ( !lang.isFunction(fn) ) { fn = function(elt,arrElt) { _yuitest_coverfunc("build/inputex/inputex.js", "fn", 345);
return elt === arrElt; }; }
      
        _yuitest_coverline("build/inputex/inputex.js", 347);
for ( i = 0 ;i < l ; i++ ) {
           _yuitest_coverline("build/inputex/inputex.js", 348);
if ( fn.call({}, el, arr[i]) ) { return i; }
        }
      
        _yuitest_coverline("build/inputex/inputex.js", 351);
return -1;
     },
     
     /**
      * Create a new array without the null or undefined values
      * @method compactArray
      * @static
      * @param {Array} arr The array to compact
      * @return {Array} The new array
      */
     compactArray: function(arr) {
        _yuitest_coverfunc("build/inputex/inputex.js", "compactArray", 361);
_yuitest_coverline("build/inputex/inputex.js", 362);
var n = [], l=arr.length,i;
        _yuitest_coverline("build/inputex/inputex.js", 363);
for(i = 0 ; i < l ; i++) {
           _yuitest_coverline("build/inputex/inputex.js", 364);
if( !lang.isNull(arr[i]) && !lang.isUndefined(arr[i]) ) {
              _yuitest_coverline("build/inputex/inputex.js", 365);
n.push(arr[i]);
           }
        }
        _yuitest_coverline("build/inputex/inputex.js", 368);
return n;
     },
     
     /**
      * Return a string without accent (only on lowercase)
      * @method removeAccents
      * @static
      * @param {String} str The string
      * @return {String} String without accent
      */
     removeAccents: function (str) {
        _yuitest_coverfunc("build/inputex/inputex.js", "removeAccents", 378);
_yuitest_coverline("build/inputex/inputex.js", 379);
return str.replace(/[àáâãäå]/g,"a").
                   replace(/[èéêë]/g,"e").
                   replace(/[ìíîï]/g,"i").
                   replace(/[òóôõö]/g,"o").
                   replace(/[ùúûü]/g,"u").
                   replace(/[ýÿ]/g,"y").
                   replace(/[ñ]/g,"n").
                   replace(/[ç]/g,"c").
                   replace(/[œ]/g,"oe").
                   replace(/[æ]/g,"ae");
     },
     
     /**
      * String replaced by some html entities
      * @method htmlEntities
      * @static
      * @param {String} str The string
      * @return {String} String replaced by some html entities
      */
     htmlEntities: function (str) {
        _yuitest_coverfunc("build/inputex/inputex.js", "htmlEntities", 398);
_yuitest_coverline("build/inputex/inputex.js", 399);
return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
     }
  });


}, '@VERSION@', {
    "requires": [
        "intl",
        "pluginhost-base",
        "pluginhost-config",
        "base-pluginhost",
        "node-pluginhost",
        "plugin",
        "node",
        "intl"
    ],
    "skinnable": true
});
