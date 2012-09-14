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
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].code=["YUI.add('inputex-serialize', function (Y, NAME) {","","/**"," * @module inputex-serialize"," */","YUI.add(\"inputex-serialize\", function(Y){","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","      ","/**"," * SerializeField allows to serialize/deserialize a complex sub-group to a string"," * @class inputEx.SerializeField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options  Standard inputEx options definition"," */","inputEx.SerializeField = function(options) {","   inputEx.SerializeField.superclass.constructor.call(this, options);","   ","};","","Y.extend(inputEx.SerializeField, inputEx.Field, {","	","	/**","    * Adds some options: subfield & serializer","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.SerializeField.superclass.setOptions.call(this, options);","      this.options.className = options.className || 'inputEx-SerializedField';","","		this.options.subfield = options.subfield || {type: 'string'};","		this.options.serializer = options.serializer || \"json\";","	},","	","   /**","    * Render the subfield","    * @method renderComponent","    */","   renderComponent: function() {","	","      this.subfieldWrapper = inputEx.cn('div', {className: \"inputEx-SerializedField-SubFieldWrapper\"});","      this.fieldContainer.appendChild( this.subfieldWrapper );","      ","		var config = {parentEl: this.subfieldWrapper};","		Y.mix(config, this.options.subfield);","      this.subField = inputEx( config, this);","   },","","	/**","	 * Subscribe the subField","	 * @method initEvents","	 */","	initEvents: function() {","      inputEx.SerializeField.superclass.initEvents.call(this); ","      this.subField.on('updated', this.fireUpdatedEvt, this, true);","   },","","	/**","	 * Use the subField getValue and serialize it with the selected serializing method","	 * @method getValue","	 */","	getValue: function() {","		var val = this.subField.getValue();","		return this.serialize(val);","	},","	","	/**","	 * Use the deserialize method and set the value of the subField","	 * @method setValue","	 */","	setValue: function(sValue, sendUpdatedEvt) {","		var obj = this.deserialize(sValue);","		this.subField.setValue(obj, sendUpdatedEvt);","	},","	","	/**","	 * Use the configured serializer","	 * @method serialize","	 */","	serialize: function(o) {","		return inputEx.SerializeField.serializers[this.options.serializer].serialize(o);","	},","	","	/**","	 * Use the configured deserializer","	 * @method deserialize","	 */","	deserialize: function(sValue) {","		return inputEx.SerializeField.serializers[this.options.serializer].deserialize(sValue);","	},","	","	/**","	 * Sets the focus on this field","	 * @method focus","	 */","	focus: function() {","		this.subField.focus();","	}","	","});","","/**"," * Default serializers for the SerializeField"," * @class inputEx.SerializeField.serializers"," * @static"," */","inputEx.SerializeField.serializers = {","","	/**","	 * JSON Serializer","	 * @class inputEx.SerializeField.serializers.json","	 * @static","	 */","	json: {","		","		/**","		 * serialize to JSON","		 * @method serialize","		 * @static","		 */","		serialize: function(o) {","			return Y.JSON.stringify(o);","		},","","		/**","		 * deserialize from JSON","		 * @method deserialize","		 * @static","		 */","		deserialize: function(sValue) {","			return Y.JSON.parse(sValue);","		}","	},","	","	/**","	 * XML Serializer (uses the ObjTree library)","    * @class inputEx.SerializeField.serializers.xml","	 * @static","	 */","	xml: {","		","		/**","		 * serialize to XML","		 * @method serialize","		 * @static","		 */","		serialize: function(o) {","			if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {","				alert(\"ObjTree.js not loaded.\");","				return null;","			}","			var xotree = new XML.ObjTree();","			return xotree.writeXML(o);","		},","","		/**","		 * deserialize from XML ","		 * @method deserialize","		 * @static","		 */","		deserialize: function(sValue) {","			if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {","				alert(\"ObjTree.js not loaded.\");","				return null;","			}","			var xotree = new XML.ObjTree();","         var tree = xotree.parseXML( sValue );","			return tree;","		}","	}/*,","	","	flatten: {","		serialize: function(o) {","			// TODO: ","		},","","		deserialize: function(sValue) {","			// TODO: ","		}","	}*/","	","};","","","// Register this class as \"serialize\" type","inputEx.registerType(\"serialize\", inputEx.SerializeField, [","	{ type:'type', label: 'SubField', name: 'subfield'},","	{ type:'select', name: 'serializer', label: 'Serializer', choices: [{ value: 'json' }, { value: 'xml' }/*, { value: 'flatten' }*/], value: 'json'}","]);","","},'3.1.0',{","  requires: [\"inputex-string\",'json']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].lines = {"1":0,"6":0,"8":0,"18":0,"19":0,"23":0,"31":0,"32":0,"34":0,"35":0,"44":0,"45":0,"47":0,"48":0,"49":0,"57":0,"58":0,"66":0,"67":0,"75":0,"76":0,"84":0,"92":0,"100":0,"110":0,"125":0,"134":0,"151":0,"152":0,"153":0,"155":0,"156":0,"165":0,"166":0,"167":0,"169":0,"170":0,"171":0,"189":0};
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].functions = {"SerializeField:18":0,"setOptions:30":0,"renderComponent:42":0,"initEvents:56":0,"getValue:65":0,"setValue:74":0,"serialize:83":0,"deserialize:91":0,"focus:99":0,"serialize:124":0,"deserialize:133":0,"serialize:150":0,"deserialize:164":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].coveredLines = 39;
_yuitest_coverage["build/inputex-serialize/inputex-serialize.js"].coveredFunctions = 15;
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 1);
YUI.add('inputex-serialize', function (Y, NAME) {

/**
 * @module inputex-serialize
 */
_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 6);
YUI.add("inputex-serialize", function(Y){

  _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;
      
/**
 * SerializeField allows to serialize/deserialize a complex sub-group to a string
 * @class inputEx.SerializeField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options  Standard inputEx options definition
 */
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 18);
inputEx.SerializeField = function(options) {
   _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "SerializeField", 18);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 19);
inputEx.SerializeField.superclass.constructor.call(this, options);
   
};

_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 23);
Y.extend(inputEx.SerializeField, inputEx.Field, {
	
	/**
    * Adds some options: subfield & serializer
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "setOptions", 30);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 31);
inputEx.SerializeField.superclass.setOptions.call(this, options);
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 32);
this.options.className = options.className || 'inputEx-SerializedField';

		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 34);
this.options.subfield = options.subfield || {type: 'string'};
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 35);
this.options.serializer = options.serializer || "json";
	},
	
   /**
    * Render the subfield
    * @method renderComponent
    */
   renderComponent: function() {
	
      _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "renderComponent", 42);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 44);
this.subfieldWrapper = inputEx.cn('div', {className: "inputEx-SerializedField-SubFieldWrapper"});
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 45);
this.fieldContainer.appendChild( this.subfieldWrapper );
      
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 47);
var config = {parentEl: this.subfieldWrapper};
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 48);
Y.mix(config, this.options.subfield);
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 49);
this.subField = inputEx( config, this);
   },

	/**
	 * Subscribe the subField
	 * @method initEvents
	 */
	initEvents: function() {
      _yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "initEvents", 56);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 57);
inputEx.SerializeField.superclass.initEvents.call(this); 
      _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 58);
this.subField.on('updated', this.fireUpdatedEvt, this, true);
   },

	/**
	 * Use the subField getValue and serialize it with the selected serializing method
	 * @method getValue
	 */
	getValue: function() {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "getValue", 65);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 66);
var val = this.subField.getValue();
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 67);
return this.serialize(val);
	},
	
	/**
	 * Use the deserialize method and set the value of the subField
	 * @method setValue
	 */
	setValue: function(sValue, sendUpdatedEvt) {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "setValue", 74);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 75);
var obj = this.deserialize(sValue);
		_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 76);
this.subField.setValue(obj, sendUpdatedEvt);
	},
	
	/**
	 * Use the configured serializer
	 * @method serialize
	 */
	serialize: function(o) {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "serialize", 83);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 84);
return inputEx.SerializeField.serializers[this.options.serializer].serialize(o);
	},
	
	/**
	 * Use the configured deserializer
	 * @method deserialize
	 */
	deserialize: function(sValue) {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "deserialize", 91);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 92);
return inputEx.SerializeField.serializers[this.options.serializer].deserialize(sValue);
	},
	
	/**
	 * Sets the focus on this field
	 * @method focus
	 */
	focus: function() {
		_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "focus", 99);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 100);
this.subField.focus();
	}
	
});

/**
 * Default serializers for the SerializeField
 * @class inputEx.SerializeField.serializers
 * @static
 */
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 110);
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
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "serialize", 124);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 125);
return Y.JSON.stringify(o);
		},

		/**
		 * deserialize from JSON
		 * @method deserialize
		 * @static
		 */
		deserialize: function(sValue) {
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "deserialize", 133);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 134);
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
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "serialize", 150);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 151);
if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 152);
alert("ObjTree.js not loaded.");
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 153);
return null;
			}
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 155);
var xotree = new XML.ObjTree();
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 156);
return xotree.writeXML(o);
		},

		/**
		 * deserialize from XML 
		 * @method deserialize
		 * @static
		 */
		deserialize: function(sValue) {
			_yuitest_coverfunc("build/inputex-serialize/inputex-serialize.js", "deserialize", 164);
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 165);
if(!XML || !Y.Lang.isFunction(XML.ObjTree) ) {
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 166);
alert("ObjTree.js not loaded.");
				_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 167);
return null;
			}
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 169);
var xotree = new XML.ObjTree();
         _yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 170);
var tree = xotree.parseXML( sValue );
			_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 171);
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
_yuitest_coverline("build/inputex-serialize/inputex-serialize.js", 189);
inputEx.registerType("serialize", inputEx.SerializeField, [
	{ type:'type', label: 'SubField', name: 'subfield'},
	{ type:'select', name: 'serializer', label: 'Serializer', choices: [{ value: 'json' }, { value: 'xml' }/*, { value: 'flatten' }*/], value: 'json'}
]);

},'3.1.0',{
  requires: ["inputex-string",'json']
});


}, '@VERSION@');
