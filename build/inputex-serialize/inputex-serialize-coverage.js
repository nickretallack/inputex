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
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-serialize/inputex-serialize.js",
    code: []
};
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].code=["YUI.add('inputex-serialize', function (Y, NAME) {","","/**"," * @module inputex-serialize"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","      ","/**"," * SerializeField allows to serialize/deserialize a complex sub-group to a string"," * @class inputEx.SerializeField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options  Standard inputEx options definition"," */","inputEx.SerializeField = function(options) {","   inputEx.SerializeField.superclass.constructor.call(this, options);","   ","};","","Y.extend(inputEx.SerializeField, inputEx.Field, {","	","	/**","    * Adds some options: subfield & serializer","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.SerializeField.superclass.setOptions.call(this, options);","      this.options.className = options.className || 'inputEx-SerializedField';","","		this.options.subfield = options.subfield || {type: 'string'};","		this.options.serializer = options.serializer || \"json\";","	},","	","   /**","    * Render the subfield","    * @method renderComponent","    */","   renderComponent: function() {","	","      this.subfieldWrapper = inputEx.cn('div', {className: \"inputEx-SerializedField-SubFieldWrapper\"});","      this.fieldContainer.appendChild( this.subfieldWrapper );","      ","		var config = {parentEl: this.subfieldWrapper};","		Y.mix(config, this.options.subfield);","      this.subField = inputEx( config, this);","   },","","	/**","	 * Subscribe the subField","	 * @method initEvents","	 */","	initEvents: function() {","      inputEx.SerializeField.superclass.initEvents.call(this); ","      this.subField.on('updated', this.fireUpdatedEvt, this, true);","   },","","	/**","	 * Use the subField getValue and serialize it with the selected serializing method","	 * @method getValue","	 */","	getValue: function() {","		var val = this.subField.getValue();","		return this.serialize(val);","	},","	","	/**","	 * Use the deserialize method and set the value of the subField","	 * @method setValue","	 */","	setValue: function(sValue, sendUpdatedEvt) {","		var obj = this.deserialize(sValue);","		this.subField.setValue(obj, sendUpdatedEvt);","	},","	","	/**","	 * Use the configured serializer","	 * @method serialize","	 */","	serialize: function(o) {","		return inputEx.SerializeField.serializers[this.options.serializer].serialize(o);","	},","	","	/**","	 * Use the configured deserializer","	 * @method deserialize","	 */","	deserialize: function(sValue) {","		return inputEx.SerializeField.serializers[this.options.serializer].deserialize(sValue);","	},","	","	/**","	 * Sets the focus on this field","	 * @method focus","	 */","	focus: function() {","		this.subField.focus();","	}","	","});","","/**"," * Default serializers for the SerializeField"," * @class inputEx.SerializeField.serializers"," * @static"," */","inputEx.SerializeField.serializers = {","","	/**","	 * JSON Serializer","	 * @class inputEx.SerializeField.serializers.json","	 * @static","	 */","	json: {","		","		/**","		 * serialize to JSON","		 * @method serialize","		 * @static","		 */","		serialize: function(o) {","			return Y.JSON.stringify(o);","		},","","		/**","		 * deserialize from JSON","		 * @method deserialize","		 * @static","		 */","		deserialize: function(sValue) {","			return Y.JSON.parse(sValue);","		}","	},","	","	/**","	 * XML Serializer (uses the ObjTree library)","    * @class inputEx.SerializeField.serializers.xml","	 * @static","	 */","	xml: {","		","		/**","		 * serialize to XML","		 * @method serialize","		 * @static","		 */","		serialize: function(o) {","			if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {","				alert(\"ObjTree.js not loaded.\");","				return null;","			}","			var xotree = new XML.ObjTree();","			return xotree.writeXML(o);","		},","","		/**","		 * deserialize from XML ","		 * @method deserialize","		 * @static","		 */","		deserialize: function(sValue) {","			if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {","				alert(\"ObjTree.js not loaded.\");","				return null;","			}","			var xotree = new XML.ObjTree();","         var tree = xotree.parseXML( sValue );","			return tree;","		}","	}/*,","	","	flatten: {","		serialize: function(o) {","			// TODO: ","		},","","		deserialize: function(sValue) {","			// TODO: ","		}","	}*/","	","};","","","// Register this class as \"serialize\" type","inputEx.registerType(\"serialize\", inputEx.SerializeField, [","	{ type:'type', label: 'SubField', name: 'subfield'},","	{ type:'select', name: 'serializer', label: 'Serializer', choices: [{ value: 'json' }, { value: 'xml' }/*, { value: 'flatten' }*/], value: 'json'}","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\", \"json\"], \"ix_provides\": \"serialize\"});"];
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].lines = {"1":0,"6":0,"16":0,"17":0,"21":0,"29":0,"30":0,"32":0,"33":0,"42":0,"43":0,"45":0,"46":0,"47":0,"55":0,"56":0,"64":0,"65":0,"73":0,"74":0,"82":0,"90":0,"98":0,"108":0,"123":0,"132":0,"149":0,"150":0,"151":0,"153":0,"154":0,"163":0,"164":0,"165":0,"167":0,"168":0,"169":0,"187":0};
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].functions = {"SerializeField:16":0,"setOptions:28":0,"renderComponent:40":0,"initEvents:54":0,"getValue:63":0,"setValue:72":0,"serialize:81":0,"deserialize:89":0,"focus:97":0,"serialize:122":0,"deserialize:131":0,"serialize:148":0,"deserialize:162":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].coveredLines = 38;
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].coveredFunctions = 14;
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 1);
YUI.add('inputex-serialize', function (Y, NAME) {

/**
 * @module inputex-serialize
 */
  _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;
      
/**
 * SerializeField allows to serialize/deserialize a complex sub-group to a string
 * @class inputEx.SerializeField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options  Standard inputEx options definition
 */
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 16);
inputEx.SerializeField = function(options) {
   _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "SerializeField", 16);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 17);
inputEx.SerializeField.superclass.constructor.call(this, options);
   
};

_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 21);
Y.extend(inputEx.SerializeField, inputEx.Field, {
	
	/**
    * Adds some options: subfield & serializer
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "setOptions", 28);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 29);
inputEx.SerializeField.superclass.setOptions.call(this, options);
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 30);
this.options.className = options.className || 'inputEx-SerializedField';

		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 32);
this.options.subfield = options.subfield || {type: 'string'};
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 33);
this.options.serializer = options.serializer || "json";
	},
	
   /**
    * Render the subfield
    * @method renderComponent
    */
   renderComponent: function() {
	
      _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "renderComponent", 40);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 42);
this.subfieldWrapper = inputEx.cn('div', {className: "inputEx-SerializedField-SubFieldWrapper"});
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 43);
this.fieldContainer.appendChild( this.subfieldWrapper );
      
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 45);
var config = {parentEl: this.subfieldWrapper};
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 46);
Y.mix(config, this.options.subfield);
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 47);
this.subField = inputEx( config, this);
   },

	/**
	 * Subscribe the subField
	 * @method initEvents
	 */
	initEvents: function() {
      _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "initEvents", 54);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 55);
inputEx.SerializeField.superclass.initEvents.call(this); 
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 56);
this.subField.on('updated', this.fireUpdatedEvt, this, true);
   },

	/**
	 * Use the subField getValue and serialize it with the selected serializing method
	 * @method getValue
	 */
	getValue: function() {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "getValue", 63);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 64);
var val = this.subField.getValue();
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 65);
return this.serialize(val);
	},
	
	/**
	 * Use the deserialize method and set the value of the subField
	 * @method setValue
	 */
	setValue: function(sValue, sendUpdatedEvt) {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "setValue", 72);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 73);
var obj = this.deserialize(sValue);
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 74);
this.subField.setValue(obj, sendUpdatedEvt);
	},
	
	/**
	 * Use the configured serializer
	 * @method serialize
	 */
	serialize: function(o) {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "serialize", 81);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 82);
return inputEx.SerializeField.serializers[this.options.serializer].serialize(o);
	},
	
	/**
	 * Use the configured deserializer
	 * @method deserialize
	 */
	deserialize: function(sValue) {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "deserialize", 89);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 90);
return inputEx.SerializeField.serializers[this.options.serializer].deserialize(sValue);
	},
	
	/**
	 * Sets the focus on this field
	 * @method focus
	 */
	focus: function() {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "focus", 97);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 98);
this.subField.focus();
	}
	
});

/**
 * Default serializers for the SerializeField
 * @class inputEx.SerializeField.serializers
 * @static
 */
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 108);
inputEx.SerializeField.serializers = {

	/**
	 * JSON Serializer
	 * @class inputEx.SerializeField.serializers.json
	 * @static
	 */
	json: {
		
		/**
		 * serialize to JSON
		 * @method serialize
		 * @static
		 */
		serialize: function(o) {
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "serialize", 122);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 123);
return Y.JSON.stringify(o);
		},

		/**
		 * deserialize from JSON
		 * @method deserialize
		 * @static
		 */
		deserialize: function(sValue) {
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "deserialize", 131);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 132);
return Y.JSON.parse(sValue);
		}
	},
	
	/**
	 * XML Serializer (uses the ObjTree library)
    * @class inputEx.SerializeField.serializers.xml
	 * @static
	 */
	xml: {
		
		/**
		 * serialize to XML
		 * @method serialize
		 * @static
		 */
		serialize: function(o) {
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "serialize", 148);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 149);
if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 150);
alert("ObjTree.js not loaded.");
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 151);
return null;
			}
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 153);
var xotree = new XML.ObjTree();
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 154);
return xotree.writeXML(o);
		},

		/**
		 * deserialize from XML 
		 * @method deserialize
		 * @static
		 */
		deserialize: function(sValue) {
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "deserialize", 162);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 163);
if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 164);
alert("ObjTree.js not loaded.");
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 165);
return null;
			}
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 167);
var xotree = new XML.ObjTree();
         _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 168);
var tree = xotree.parseXML( sValue );
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 169);
return tree;
		}
	}/*,
	
	flatten: {
		serialize: function(o) {
			// TODO: 
		},

		deserialize: function(sValue) {
			// TODO: 
		}
	}*/
	
};


// Register this class as "serialize" type
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 187);
inputEx.registerType("serialize", inputEx.SerializeField, [
	{ type:'type', label: 'SubField', name: 'subfield'},
	{ type:'select', name: 'serializer', label: 'Serializer', choices: [{ value: 'json' }, { value: 'xml' }/*, { value: 'flatten' }*/], value: 'json'}
]);


}, '@VERSION@', {"requires": ["inputex-string", "json"], "ix_provides": "serialize"});
