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
_yuitest_coverage["build/inputex/inputex.js"].code=["YUI.add('inputex', function (Y, NAME) {","","/**"," * The inputEx Library"," * @module inputex"," */","  var lang = Y.Lang;","  /**","   * The inputEx method lets you create a field from the JSON definition:","   * <pre>","   *    Y.inputEx({type: 'string', name: 'company', label: 'Your company' })","   * </pre>","   * Build a field from an object like: { type: 'color' or fieldClass: inputEx.ColorField, ... }<br />","   * If the neither type or fieldClass are found, it uses inputEx.StringField","   *","   * @class inputEx","   * @method inputEx","   * @static","   * @param {Object} fieldOptions","   * @param {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField} (optional) parentField The parent field instance","   * @return {inputEx.Field} Created field instance","   */","  Y.inputEx = function(fieldOptions, parentField) {","     var fieldClass = null,","         inputInstance;","         ","    if(fieldOptions.type) {","       fieldClass = inputEx.getFieldClass(fieldOptions.type);","       ","        if( !Y.Lang.isFunction(fieldClass) ){","           throw new Error(\"Missing inputEx module for type: '\"+fieldOptions.type+\"' ?\");","        }","    }","    else {","       fieldClass = fieldOptions.fieldClass ? fieldOptions.fieldClass : inputEx.StringField;","    }","","     // Instanciate the field","     inputInstance = new fieldClass(fieldOptions);","","     // If the parentField argument is provided","     if(parentField) {","        inputInstance.setParentField(parentField);","     }","","     // Add the flatten attribute if present in the params","     /*if(fieldOptions.flatten) {","        inputInstance._flatten = true;","     }*/","     ","     return inputInstance;","  };","  ","  var inputEx = Y.inputEx;","  ","  Y.mix(Y.inputEx, {","","     VERSION: \"3.1.0\",","     ","     /**","      * Url to the spacer image. This url schould be changed according to your project directories","      * @property spacerUrl","      * @type String","      */","     spacerUrl: YUI_config.groups.inputex.base+\"inputex/assets/skins/sam/images/space.gif\", // 1x1 px","     ","     /**","      * Field empty state constant","      * @property stateEmpty","      * @type String","      */","     stateEmpty: 'empty',","     ","     /**","      * Field required state constant","      * @property stateRequired","      * @type String","      */","     stateRequired: 'required',","     ","     /**","      * Field valid state constant","      * @property stateValid","      * @type String","      */","     stateValid: 'valid',","     ","     /**","      * Field invalid state constant","      * @property stateInvalid","      * @type String","      */","     stateInvalid: 'invalid',","     ","     /**","      * Associative array containing field messages => using intl module from YUI","      * @property messages","      */","     messages: null,","     ","     /**","      * inputEx widget namespace","      * @class inputEx.widget","      * @static ","      */","     widget: {},","     ","     /**","      * inputEx mixin namespace","      * @class inputEx.mixin","      * @static ","      */","     mixin: {},","     ","     /**","      * Associative array containing common regular expressions","      * @property regexps","      */","     regexps: {","        email: /^[a-z0-9!\\#\\$%&'\\*\\-\\/=\\?\\+\\-\\^_`\\{\\|\\}~]+(?:\\.[a-z0-9!\\#\\$%&'\\*\\-\\/=\\?\\+\\-\\^_`\\{\\|\\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z]{2,6}$/i,","        url: /^(http|https):\\/\\/[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(\\:[0-9]{1,5})?(([0-9]{1,5})?\\/.*)?$/i,","        password: /^[0-9a-zA-Z\\x20-\\x7E]*$/","     },","     ","     /**","      * Hash between inputEx types and classes (ex: <code>inputEx.typeClasses.color = inputEx.ColorField</code>)<br />","      * Please register the types with the <code>registerType</code> method","      * @property typeClasses","      */","     typeClasses: {},","     ","     /**","      * Property to globally turn on/off the browser autocompletion","      * (used as default autocomplete option value by StringField, Form and their subclasses)","      * @property browserAutocomplete","      */","     browserAutocomplete: true,","     ","     /**","      * When you create a new inputEx Field Class, you can register it to give it a simple type.","      * ex:   inputEx.registerType(\"color\", inputEx.ColorField);","      * @method registerType","      * @static","      * @param {String} type String used as the inputEx field type","      * @param {Class} fieldClass Field Class to register as this type","      * @param {Array} groupOptions List of inputEx field description for each option","      * @param {Boolean} dontInherit Won't inherhit the parent field properties if set to true","      */","     registerType: function(type, fieldClass, groupOptions, dontInherit) {","        if(!lang.isString(type)) {","           throw new Error(\"inputEx.registerType: first argument must be a string\");","        }","        if(!lang.isFunction(fieldClass)) {","           throw new Error(\"inputEx.registerType: second argument must be a function\");","        }","        this.typeClasses[type] = fieldClass;","        ","        // Setup the groupOptions property on the class","        var opts = [];","        if(lang.isArray(groupOptions)) { opts = groupOptions; }","        if(fieldClass.superclass && !dontInherit && lang.isArray(fieldClass.superclass.constructor.groupOptions) ) {","           opts = fieldClass.superclass.constructor.groupOptions.concat(opts);","        }","        fieldClass.groupOptions = opts;","     },","     ","     /**","      * Returns the class for the given type","      * ex: inputEx.getFieldClass(\"color\") returns inputEx.ColorField","      * @method getFieldClass","      * @static","      * @param {String} type String type of the field","      */","     getFieldClass: function(type) {","        return lang.isFunction(this.typeClasses[type]) ? this.typeClasses[type] : null;","     },","     ","     /**","      * Get the inputex type for the given class (ex: <code>inputEx.getType(inputEx.ColorField)</code> returns \"color\")","      * @method getType","      * @static","      * @param {inputEx.Field} FieldClass An inputEx.Field or derivated class","      * @return {String} returns the inputEx type string or <code>null</code>","      */","     getType: function(FieldClass) {","        for(var type in this.typeClasses) {","           if(this.typeClasses.hasOwnProperty(type) ) {","              if(this.typeClasses[type] == FieldClass) {","                 return type;","              }","           }","        }","        return null;","     },","     ","     ","     /**","      * Return recursively the inputex modules from their 'type' property using (modulesByType from loader.js)","      * @method getRawModulesFromDefinition","      * @static","      */","     getRawModulesFromDefinition: function(inputexDef) {","        ","        var type = inputexDef.type || 'string',","            module = YUI_config.groups.inputex.modulesByType[type],","            modules = [module || type],","            //set fields if they exist","            fields = inputexDef.fields ||","            //else see if we have elementType for lists - if neither then we end up with null","            inputexDef.elementType && inputexDef.elementType.fields;","        ","        ","        // recursive for group,forms,list,combine, etc...","        if(fields) {","           Y.Array.each(fields, function(field) {","                modules = modules.concat( this.getModulesFromDefinition(field) );","           }, this);","        }","        ","        // TODO: inplaceedit  editorField","        ","        return modules;","     },","     ","     /**","      * Return unique modules definitions","      * @method getModulesFromDefinition","      * @static","      */","     getModulesFromDefinition: function(inputexDef) {","        var modules = this.getRawModulesFromDefinition(inputexDef);","        return Y.Object.keys(Y.Array.hash(modules));","     },","     ","     /**","      * Load the modules from an inputEx definition","      * @method use","      * @static","      */","     use: function(inputexDef, cb) {","        var defs, modules = [];","        if (!Y.Array.test(inputexDef)){ defs = [inputexDef];}","        else {defs = inputexDef;}","        ","        Y.each(defs, function(def){","            modules = modules.concat( this.getModulesFromDefinition(def));","        },this);","        modules.push(cb);","        Y.use.apply( Y, modules);","     },","     ","     /**","      * Helper function to set DOM node attributes and style attributes.","      * @method sn","      * @static","      * @param {HTMLElement} el The element to set attributes to","      * @param {Object} domAttributes An object containing key/value pairs to set as node attributes (ex: {id: 'myElement', className: 'myCssClass', ...})","      * @param {Object} styleAttributes Same thing for style attributes. Please use camelCase for style attributes (ex: backgroundColor for 'background-color')","      */","     sn: function(el,domAttributes,styleAttributes){","        if(!el) { return; }","        var i;","        if(domAttributes){","           for(i in domAttributes){","              var domAttribute = domAttributes[i];","              if( lang.isFunction(domAttribute) ){","                 continue;","              }","              if(i==\"className\"){","                 i=\"class\";","                 el.className=domAttribute;","              }","              if(domAttribute!==el.getAttribute(i)){","                 try{","                    if(domAttribute===false){","                       el.removeAttribute(i);","                    }else{","                       el.setAttribute(i,domAttribute);","                    }","                 }","                 catch(err){","                    //console.log(\"WARNING: WireIt.sn failed for \"+el.tagName+\", attr \"+i+\", val \"+domAttribute);","                 }","              }","           }","        }","","        if(styleAttributes){","           for(i in styleAttributes){","              if( lang.isFunction(styleAttributes[i]) ){","                 continue;","              }","              if(el.style[i]!=styleAttributes[i]){","                 el.style[i]=styleAttributes[i];","              }","           }","        }","     },","","","     /**","      * Helper function to create a DOM node. (wrapps the document.createElement tag and the inputEx.sn functions)","      * @method cn","      * @static","      * @param {String} tag The tagName to create (ex: 'div', 'a', ...)","      * @param {Object} [domAttributes] see inputEx.sn","      * @param {Object} [styleAttributes] see inputEx.sn","      * @param {String} [innerHTML] The html string to append into the created element","      * @return {HTMLElement} The created node","      */","     cn: function(tag, domAttributes, styleAttributes, innerHTML) {","          if (tag == 'input' && Y.UA.ie && Y.UA.ie < 9) { //only limit to input tag that has no tag body","              var strDom = '<' + tag;","              if (domAttributes!=='undefined'){","                  for (var k in domAttributes){","                      strDom += ' ' + (k === \"className\" ? \"class\" : k) + '=\"' + domAttributes[k] + '\"';","                  }","              }","              strDom += '/' + '>';","              return document.createElement(strDom);","","          } else {","              var el = document.createElement(tag);","              this.sn(el, domAttributes, styleAttributes);","              if (innerHTML) {","                  el.innerHTML = innerHTML;","              }","              return el;","          }","      },","     ","     ","     /**","      * Find the position of the given element. (This method is not available in IE 6)","      * @method indexOf","      * @static","      * @param {Object} el Value to search","      * @param {Array} arr The array to search","      * @param {Function} (optional) fn A function to define another way to test inclusion of el than === (returns a boolean)","      * @return {number} Element position, -1 if not found","      */","     indexOf: function(el,arr,fn) {","   ","        var l=arr.length,i;","      ","        if ( !lang.isFunction(fn) ) { fn = function(elt,arrElt) { return elt === arrElt; }; }","      ","        for ( i = 0 ;i < l ; i++ ) {","           if ( fn.call({}, el, arr[i]) ) { return i; }","        }","      ","        return -1;","     },","     ","     /**","      * Create a new array without the null or undefined values","      * @method compactArray","      * @static","      * @param {Array} arr The array to compact","      * @return {Array} The new array","      */","     compactArray: function(arr) {","        var n = [], l=arr.length,i;","        for(i = 0 ; i < l ; i++) {","           if( !lang.isNull(arr[i]) && !lang.isUndefined(arr[i]) ) {","              n.push(arr[i]);","           }","        }","        return n;","     },","     ","     /**","      * Return a string without accent (only on lowercase)","      * @method removeAccents","      * @static","      * @param {String} str The string","      * @return {String} String without accent","      */","     removeAccents: function (str) {","        return str.replace(/[àáâãäå]/g,\"a\").","                   replace(/[èéêë]/g,\"e\").","                   replace(/[ìíîï]/g,\"i\").","                   replace(/[òóôõö]/g,\"o\").","                   replace(/[ùúûü]/g,\"u\").","                   replace(/[ýÿ]/g,\"y\").","                   replace(/[ñ]/g,\"n\").","                   replace(/[ç]/g,\"c\").","                   replace(/[œ]/g,\"oe\").","                   replace(/[æ]/g,\"ae\");","     },","     ","     /**","      * String replaced by some html entities","      * @method htmlEntities","      * @static","      * @param {String} str The string","      * @return {String} String replaced by some html entities","      */","     htmlEntities: function (str) {","        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');","     }","  });","","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"pluginhost-base\",","        \"pluginhost-config\",","        \"base-pluginhost\",","        \"node-pluginhost\",","        \"plugin\",","        \"node\",","        \"intl\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/inputex/inputex.js"].lines = {"1":0,"7":0,"23":0,"24":0,"27":0,"28":0,"30":0,"31":0,"35":0,"39":0,"42":0,"43":0,"51":0,"54":0,"56":0,"150":0,"151":0,"153":0,"154":0,"156":0,"159":0,"160":0,"161":0,"162":0,"164":0,"175":0,"186":0,"187":0,"188":0,"189":0,"193":0,"204":0,"214":0,"215":0,"216":0,"222":0,"231":0,"232":0,"241":0,"242":0,"245":0,"246":0,"248":0,"249":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"267":0,"269":0,"270":0,"271":0,"273":0,"274":0,"275":0,"276":0,"278":0,"288":0,"289":0,"290":0,"291":0,"293":0,"294":0,"312":0,"313":0,"314":0,"315":0,"316":0,"319":0,"320":0,"323":0,"324":0,"325":0,"326":0,"328":0,"344":0,"346":0,"348":0,"349":0,"352":0,"363":0,"364":0,"365":0,"366":0,"369":0,"380":0,"400":0};
_yuitest_coverage["build/inputex/inputex.js"].functions = {"inputEx:23":0,"registerType:149":0,"getFieldClass:174":0,"getType:185":0,"(anonymous 2):215":0,"getRawModulesFromDefinition:202":0,"getModulesFromDefinition:230":0,"(anonymous 3):245":0,"use:240":0,"sn:260":0,"cn:311":0,"fn:346":0,"indexOf:342":0,"compactArray:362":0,"removeAccents:379":0,"htmlEntities:399":0,"(anonymous 1):1":0};
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
        url: /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(([0-9]{1,5})?\/.*)?$/i,
        password: /^[0-9a-zA-Z\x20-\x7E]*$/
     },
     
     /**
      * Hash between inputEx types and classes (ex: <code>inputEx.typeClasses.color = inputEx.ColorField</code>)<br />
      * Please register the types with the <code>registerType</code> method
      * @property typeClasses
      */
     typeClasses: {},
     
     /**
      * Property to globally turn on/off the browser autocompletion
      * (used as default autocomplete option value by StringField, Form and their subclasses)
      * @property browserAutocomplete
      */
     browserAutocomplete: true,
     
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
        _yuitest_coverfunc("build/inputex/inputex.js", "registerType", 149);
_yuitest_coverline("build/inputex/inputex.js", 150);
if(!lang.isString(type)) {
           _yuitest_coverline("build/inputex/inputex.js", 151);
throw new Error("inputEx.registerType: first argument must be a string");
        }
        _yuitest_coverline("build/inputex/inputex.js", 153);
if(!lang.isFunction(fieldClass)) {
           _yuitest_coverline("build/inputex/inputex.js", 154);
throw new Error("inputEx.registerType: second argument must be a function");
        }
        _yuitest_coverline("build/inputex/inputex.js", 156);
this.typeClasses[type] = fieldClass;
        
        // Setup the groupOptions property on the class
        _yuitest_coverline("build/inputex/inputex.js", 159);
var opts = [];
        _yuitest_coverline("build/inputex/inputex.js", 160);
if(lang.isArray(groupOptions)) { opts = groupOptions; }
        _yuitest_coverline("build/inputex/inputex.js", 161);
if(fieldClass.superclass && !dontInherit && lang.isArray(fieldClass.superclass.constructor.groupOptions) ) {
           _yuitest_coverline("build/inputex/inputex.js", 162);
opts = fieldClass.superclass.constructor.groupOptions.concat(opts);
        }
        _yuitest_coverline("build/inputex/inputex.js", 164);
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
        _yuitest_coverfunc("build/inputex/inputex.js", "getFieldClass", 174);
_yuitest_coverline("build/inputex/inputex.js", 175);
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
        _yuitest_coverfunc("build/inputex/inputex.js", "getType", 185);
_yuitest_coverline("build/inputex/inputex.js", 186);
for(var type in this.typeClasses) {
           _yuitest_coverline("build/inputex/inputex.js", 187);
if(this.typeClasses.hasOwnProperty(type) ) {
              _yuitest_coverline("build/inputex/inputex.js", 188);
if(this.typeClasses[type] == FieldClass) {
                 _yuitest_coverline("build/inputex/inputex.js", 189);
return type;
              }
           }
        }
        _yuitest_coverline("build/inputex/inputex.js", 193);
return null;
     },
     
     
     /**
      * Return recursively the inputex modules from their 'type' property using (modulesByType from loader.js)
      * @method getRawModulesFromDefinition
      * @static
      */
     getRawModulesFromDefinition: function(inputexDef) {
        
        _yuitest_coverfunc("build/inputex/inputex.js", "getRawModulesFromDefinition", 202);
_yuitest_coverline("build/inputex/inputex.js", 204);
var type = inputexDef.type || 'string',
            module = YUI_config.groups.inputex.modulesByType[type],
            modules = [module || type],
            //set fields if they exist
            fields = inputexDef.fields ||
            //else see if we have elementType for lists - if neither then we end up with null
            inputexDef.elementType && inputexDef.elementType.fields;
        
        
        // recursive for group,forms,list,combine, etc...
        _yuitest_coverline("build/inputex/inputex.js", 214);
if(fields) {
           _yuitest_coverline("build/inputex/inputex.js", 215);
Y.Array.each(fields, function(field) {
                _yuitest_coverfunc("build/inputex/inputex.js", "(anonymous 2)", 215);
_yuitest_coverline("build/inputex/inputex.js", 216);
modules = modules.concat( this.getModulesFromDefinition(field) );
           }, this);
        }
        
        // TODO: inplaceedit  editorField
        
        _yuitest_coverline("build/inputex/inputex.js", 222);
return modules;
     },
     
     /**
      * Return unique modules definitions
      * @method getModulesFromDefinition
      * @static
      */
     getModulesFromDefinition: function(inputexDef) {
        _yuitest_coverfunc("build/inputex/inputex.js", "getModulesFromDefinition", 230);
_yuitest_coverline("build/inputex/inputex.js", 231);
var modules = this.getRawModulesFromDefinition(inputexDef);
        _yuitest_coverline("build/inputex/inputex.js", 232);
return Y.Object.keys(Y.Array.hash(modules));
     },
     
     /**
      * Load the modules from an inputEx definition
      * @method use
      * @static
      */
     use: function(inputexDef, cb) {
        _yuitest_coverfunc("build/inputex/inputex.js", "use", 240);
_yuitest_coverline("build/inputex/inputex.js", 241);
var defs, modules = [];
        _yuitest_coverline("build/inputex/inputex.js", 242);
if (!Y.Array.test(inputexDef)){ defs = [inputexDef];}
        else {defs = inputexDef;}
        
        _yuitest_coverline("build/inputex/inputex.js", 245);
Y.each(defs, function(def){
            _yuitest_coverfunc("build/inputex/inputex.js", "(anonymous 3)", 245);
_yuitest_coverline("build/inputex/inputex.js", 246);
modules = modules.concat( this.getModulesFromDefinition(def));
        },this);
        _yuitest_coverline("build/inputex/inputex.js", 248);
modules.push(cb);
        _yuitest_coverline("build/inputex/inputex.js", 249);
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
        _yuitest_coverfunc("build/inputex/inputex.js", "sn", 260);
_yuitest_coverline("build/inputex/inputex.js", 261);
if(!el) { return; }
        _yuitest_coverline("build/inputex/inputex.js", 262);
var i;
        _yuitest_coverline("build/inputex/inputex.js", 263);
if(domAttributes){
           _yuitest_coverline("build/inputex/inputex.js", 264);
for(i in domAttributes){
              _yuitest_coverline("build/inputex/inputex.js", 265);
var domAttribute = domAttributes[i];
              _yuitest_coverline("build/inputex/inputex.js", 266);
if( lang.isFunction(domAttribute) ){
                 _yuitest_coverline("build/inputex/inputex.js", 267);
continue;
              }
              _yuitest_coverline("build/inputex/inputex.js", 269);
if(i=="className"){
                 _yuitest_coverline("build/inputex/inputex.js", 270);
i="class";
                 _yuitest_coverline("build/inputex/inputex.js", 271);
el.className=domAttribute;
              }
              _yuitest_coverline("build/inputex/inputex.js", 273);
if(domAttribute!==el.getAttribute(i)){
                 _yuitest_coverline("build/inputex/inputex.js", 274);
try{
                    _yuitest_coverline("build/inputex/inputex.js", 275);
if(domAttribute===false){
                       _yuitest_coverline("build/inputex/inputex.js", 276);
el.removeAttribute(i);
                    }else{
                       _yuitest_coverline("build/inputex/inputex.js", 278);
el.setAttribute(i,domAttribute);
                    }
                 }
                 catch(err){
                    //console.log("WARNING: WireIt.sn failed for "+el.tagName+", attr "+i+", val "+domAttribute);
                 }
              }
           }
        }

        _yuitest_coverline("build/inputex/inputex.js", 288);
if(styleAttributes){
           _yuitest_coverline("build/inputex/inputex.js", 289);
for(i in styleAttributes){
              _yuitest_coverline("build/inputex/inputex.js", 290);
if( lang.isFunction(styleAttributes[i]) ){
                 _yuitest_coverline("build/inputex/inputex.js", 291);
continue;
              }
              _yuitest_coverline("build/inputex/inputex.js", 293);
if(el.style[i]!=styleAttributes[i]){
                 _yuitest_coverline("build/inputex/inputex.js", 294);
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
          _yuitest_coverfunc("build/inputex/inputex.js", "cn", 311);
_yuitest_coverline("build/inputex/inputex.js", 312);
if (tag == 'input' && Y.UA.ie && Y.UA.ie < 9) { //only limit to input tag that has no tag body
              _yuitest_coverline("build/inputex/inputex.js", 313);
var strDom = '<' + tag;
              _yuitest_coverline("build/inputex/inputex.js", 314);
if (domAttributes!=='undefined'){
                  _yuitest_coverline("build/inputex/inputex.js", 315);
for (var k in domAttributes){
                      _yuitest_coverline("build/inputex/inputex.js", 316);
strDom += ' ' + (k === "className" ? "class" : k) + '="' + domAttributes[k] + '"';
                  }
              }
              _yuitest_coverline("build/inputex/inputex.js", 319);
strDom += '/' + '>';
              _yuitest_coverline("build/inputex/inputex.js", 320);
return document.createElement(strDom);

          } else {
              _yuitest_coverline("build/inputex/inputex.js", 323);
var el = document.createElement(tag);
              _yuitest_coverline("build/inputex/inputex.js", 324);
this.sn(el, domAttributes, styleAttributes);
              _yuitest_coverline("build/inputex/inputex.js", 325);
if (innerHTML) {
                  _yuitest_coverline("build/inputex/inputex.js", 326);
el.innerHTML = innerHTML;
              }
              _yuitest_coverline("build/inputex/inputex.js", 328);
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
   
        _yuitest_coverfunc("build/inputex/inputex.js", "indexOf", 342);
_yuitest_coverline("build/inputex/inputex.js", 344);
var l=arr.length,i;
      
        _yuitest_coverline("build/inputex/inputex.js", 346);
if ( !lang.isFunction(fn) ) { fn = function(elt,arrElt) { _yuitest_coverfunc("build/inputex/inputex.js", "fn", 346);
return elt === arrElt; }; }
      
        _yuitest_coverline("build/inputex/inputex.js", 348);
for ( i = 0 ;i < l ; i++ ) {
           _yuitest_coverline("build/inputex/inputex.js", 349);
if ( fn.call({}, el, arr[i]) ) { return i; }
        }
      
        _yuitest_coverline("build/inputex/inputex.js", 352);
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
        _yuitest_coverfunc("build/inputex/inputex.js", "compactArray", 362);
_yuitest_coverline("build/inputex/inputex.js", 363);
var n = [], l=arr.length,i;
        _yuitest_coverline("build/inputex/inputex.js", 364);
for(i = 0 ; i < l ; i++) {
           _yuitest_coverline("build/inputex/inputex.js", 365);
if( !lang.isNull(arr[i]) && !lang.isUndefined(arr[i]) ) {
              _yuitest_coverline("build/inputex/inputex.js", 366);
n.push(arr[i]);
           }
        }
        _yuitest_coverline("build/inputex/inputex.js", 369);
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
        _yuitest_coverfunc("build/inputex/inputex.js", "removeAccents", 379);
_yuitest_coverline("build/inputex/inputex.js", 380);
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
        _yuitest_coverfunc("build/inputex/inputex.js", "htmlEntities", 399);
_yuitest_coverline("build/inputex/inputex.js", 400);
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
