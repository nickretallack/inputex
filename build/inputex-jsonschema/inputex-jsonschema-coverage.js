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
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-jsonschema/inputex-jsonschema.js",
    code: []
};
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].code=["YUI.add('inputex-jsonschema', function (Y, NAME) {","","/**"," * @module inputex-jsonschema"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;"," ","/**"," * Namespace containing utility functions for conversion between inputEx JSON format and JSON Schema"," *"," * based on \"Json Schema Proposal Working Draft\":"," * http://groups.google.com/group/json-schema/web/json-schema-proposal-working-draft"," * The proposal is still under discussion and the implementation is very minimalist."," *"," *"," * TODO:"," *    - we should provide a lot of json schema examples and instances that should/should not validate"," *    - use the $ref (async calls => provide callbacks to methods)"," *    - Inheritance"," *"," * Limitations:"," *    - ??? Please do not trust inputEx: the getValue may return a value which do NOT validate the schema (provide an example ?)"," *    - no tuple typing for arrays"," *    - no \"Union type definition\""," *"," * @class inputEx.JsonSchema"," * @static"," */","inputEx.JsonSchema = {","   ","   /**","    * Convert the inputEx JSON fields to a JSON schema","    * @method inputExToSchema","    * @static","    */","   inputExToSchema: function(inputExJson) {","      ","      var t = inputExJson.type || \"string\",","          ip = inputExJson || {};","      ","      if(t == \"group\") {","         var ret = {","            type:'object',","            title: ip.legend,","            properties:{","            }","         };","         ","         for(var i = 0 ; i < ip.fields.length ; i++) {","            var field = ip.fields[i];","            ","            var fieldName = field.name;","            ret.properties[fieldName] = inputEx.JsonSchema.inputExToSchema(field);","         }","         ","         return ret;","      }","      else if(t == \"number\") {","         return {","    			'type':'number',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label","    		};","      }","      else if(t == \"string\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label","    		};","      }","      else if(t == \"text\") {","         return {"," 			   'type':'string',","			   'format':'text',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","				'_inputex':{","					'rows':5,","					'cols':50","				}","    		};","      }","      else if(t == \"html\") {","         return {"," 			   'type':'string',","			   'format':'html',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","				'_inputex':{","					","				}","    		};","      }","      else if(t == \"list\") {","         return {"," 			   'type':'array',","    			'title': ip.label,","    			'items': inputEx.JsonSchema.inputExToSchema(ip.elementType),","				'_inputex':{","				}","    		};","      }","      else if(t == \"email\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'email'","    		};","      }","      else if(t == \"url\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'url'","    		};","      }","      else if(t == \"time\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'time'","    		};","      }","      else if(t == \"IPv4\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'ip-address'","    		};","      }","      else if(t == \"color\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'color'","    		};","      }","      else if(t == \"date\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'date'","    		};","      }","      else if(t == \"multiselect\" || t == \"multiautocomplete\"){","        return {","    			'type':'array',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'items': typeof ip.jsonSchemaRef == \"undefined\" ? {\"type\":\"string\"}: ip.jsonSchemaRef,// it's a little bit weird to mix a inputEx description field and jsonSchema in a specific attribute, we should had a $ref system to go through this properly","    			'_inputex': ip","    		};","      }","      else {","			return {","				'type': 'string',","				'title': ip.label,","				'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","				'_inputex': ip","			};","      }","      ","   }","","};","","","/**"," * @class inputEx.JsonSchema.Builder"," */","inputEx.JsonSchema.Builder = function(opts) {","	","	var options = opts || {};","	this.options  = options; ","	","	// specify how other schema properties are mapped to inputParam properties","	this.schemaToParamMap = options.schemaToParamMap || {","		'title':'label',","		'description':'description',","		'_inputex':null	// null value means copy child key/value pairs into field options directly","	};","	","	this.referenceResolver = options.referenceResolver || null;","	","	// options to be applied unless already specified","	this.defaultOptions = options.defaultOptions || {};	","	","	// key is reference, value is schema","	this.schemaIdentifierMap = options.schemaIdentifierMap || {};","};","","inputEx.JsonSchema.Builder.prototype = {","   ","   /** "," 	 * return a schema based on the reference value default is to look up in map"," 	 * @method defaultReferenceResolver","    */","	defaultReferenceResolver:function(reference) {","		return this.schemaIdentifierMap[reference] || null;","	},","	","	/**","	 * Convert a JSON schema to inputEx JSON","	 * @method schemaToInputEx","	 * @param {JSONSchema} p","	 */","	schemaToInputEx:function(p, propertyName) {","	","	   var fieldDef = { label: propertyName, name: propertyName };","	   var schemaMap = this.schemaToParamMap;","    	var referencedSchema = p[\"$ref\"];","		var key;","	    ","	   if(referencedSchema){","	    	var new_schema = null;","	    	if(this.referenceResolver) {","		       new_schema = this.referenceResolver(referencedSchema);","		    }","	    	if(new_schema === null) {","	    		new_schema = this.defaultReferenceResolver(referencedSchema);","	    	}","	    	if(new_schema === null) {","	    		throw new Error('Schema for property : \"'+propertyName+'\" $references \"'+referencedSchema+'\", not found');","	    	}","	    	// copy options into new schema, for example we can overide presentation","	    	// of a defined schema depending on where it is used","	    	new_schema = Y.mix({},new_schema);	// copy new_schema","	    	","	    	for(var pk in p) {","	    		if(p.hasOwnProperty(pk) && lang.isUndefined(new_schema[pk]) && pk != '$ref') {","	    			new_schema[pk] = p[pk];","	    		}","	    	}","	    	p = new_schema;","	   }","","	   if(!p.optional) {","	      fieldDef.required = true;","	   }","","	    for(key in schemaMap) {","	        if(schemaMap.hasOwnProperty(key)) {","	      	  var paramName = schemaMap[key]; ","	      	  var v = p[key];","	      	  if(!lang.isUndefined(v)) {","	      		  if(paramName === null) {","	      			  // copy / merge values from v directly into options","	      			  if(lang.isObject(v)) {","	      				  // v must be an object, copy key/value pairs into options","	      				  for(var vkey in v) {","	      					  if(v.hasOwnProperty(vkey)) {","	      						  fieldDef[vkey] = v[vkey];","	      					  }","	      				  }","	      			  }","	      		  } else {","	      			  fieldDef[paramName] = v;","	      		  }","	      	  }","	        }","	    }","	    if(!p.type) p.type = 'object';","	    var type = p.type;","	       ","	       // If type is a \"Union type definition\", we'll use the first type for the field","	       // \"array\" <=>  [] <=> [\"any\"]","	       if(lang.isArray(type)) {","	          if(type.length === 0 || (type.length == 1 && type[0] == \"any\") ) {","	             type = \"array\";","	          }","	          else {","	             type = type[0];","	          }","	       }","	       //else if(lang.isObject(type) ) {","	          // What do we do ??","	          //console.log(\"type is an object !!\");","	       //}","	       ","	       fieldDef.type = type;","	       ","	       // default value","	       if( !lang.isUndefined(p[\"default\"]) ) {","	          fieldDef.value = p[\"default\"];","	       }","	    ","	       if(type == \"array\" ) {","	          fieldDef.type = \"list\";","	          if(lang.isObject(p.items) && !lang.isArray(p.items)) {","	        	  // when items is an object, it's a schema that describes each item in the list","	        	  fieldDef.elementType = this.schemaToInputEx(p.items, propertyName);","	          }","	","		       if(p.minItems) { fieldDef.minItems = p.minItems; }","				 if(p.maxItems) { fieldDef.maxItems = p.maxItems; }","	","	       }","	       else if(type == \"object\" ) {","	          fieldDef.type = \"group\";","	          if(p.title && lang.isUndefined(fieldDef.legend)) {","	        	  fieldDef.legend = p.title; ","	          }","	          //fieldDef = this.schemaToInputEx(p, propertyName);","	          //fieldDef = this._parseSchemaProperty(p, propertyName);","	          var fields = [];","	          if(propertyName) {","	        	  fieldDef.name = propertyName;","	          }","	","	          for(key in p.properties) {","	             if(p.properties.hasOwnProperty(key)) {","	                fields.push( this.schemaToInputEx(p.properties[key], key) );","	             }","	          }","	","	          fieldDef.fields = fields;","	          ","	       }","	       else if(type == \"string\" && (p[\"enum\"] || p[\"choices\"]) ) {","	          fieldDef.type = \"select\";","	          ","	          if(p.choices) {","	             fieldDef.choices = [];","	             for(var i = 0 ; i < p.choices.length ; i++) {","	                var o = p.choices[i];","	                fieldDef.choices[i] = { label: o.label, value: o.value };","	             }","             }","             else { // p.choices","	             fieldDef.choices = [];","	             for(var i = 0 ; i < p[\"enum\"].length ; i++) {","	                var o = p[\"enum\"][i];","						 if(lang.isObject(o)) {","	                	fieldDef.choices[i] = { label: o.label, value: o.value };","						 }","						 else {","							fieldDef.choices[i] = { value: o };","						 }","	             }","             }		","	       }","	       else if(type == \"string\") {","	    	  if(!lang.isUndefined(p.pattern) && lang.isUndefined(fieldDef.regexp)) {","	    		  if(lang.isString(p.pattern)) {","	    			  fieldDef.regexp = new RegExp(p.pattern);","	    		  } else {","	    			  fieldDef.regexp = p.pattern;","	    		  }","	    	  }","	    	  if(!lang.isUndefined(p.maxLength) && lang.isUndefined(fieldDef.maxLength)) {","	    		  fieldDef.maxLength = p.maxLength; ","	    	  }","","	    	  if(!lang.isUndefined(p.minLength) && lang.isUndefined(fieldDef.minLength)) {","	    		  fieldDef.minLength = p.minLength; ","	    	  }","","	    	  if(!lang.isUndefined(p.readonly) && lang.isUndefined(fieldDef.readonly)) {","	    		  fieldDef.readonly = p.readonly; ","	    	  }","","           // According to http://groups.google.com/group/json-schema/web/json-schema-possible-formats","	          if( p.format ) {","	             if(p.format == \"html\") {","	                fieldDef.type = \"html\";","	             } else if(p.format == \"date\") {","	                fieldDef.type = \"date\";","	                fieldDef.tooltipIcon = true;","	             } else if(p.format == 'url') {","	            	 fieldDef.type = 'url';","	             } else if(p.format == 'email') {","	            	 fieldDef.type = 'email';","	             } else if(p.format == 'text') {","	            	 fieldDef.type = 'text';","	             } else if(p.format == 'time') {","	                fieldDef.type = 'time';","	             } else if(p.format == 'ip-address') {","    	             fieldDef.type = 'IPv4';","    	          } else if(p.format == 'color') {","    	             fieldDef.type = 'color';","    	          }","	          }","	       }","	","			 // Override inputEx's type with the \"_type\" attribute","			 if( !!p[\"_inputex\"] && !!p[\"_inputex\"][\"_type\"]) {","				fieldDef.type = p[\"_inputex\"][\"_type\"];","			 }","	","	    // Add the defaultOptions","	    for(var kk in this.defaultOptions) {","	        if(this.defaultOptions.hasOwnProperty(kk) && lang.isUndefined(fieldDef[kk])) {","	        	fieldDef[kk] = this.defaultOptions[kk]; ","	        }	    	","	    }","	    return fieldDef;","	},","","   /**","    * Create an inputEx Json form definition from a json schema instance object","    * Respect the \"Self-Defined Schema Convention\"","    * @method formFromInstance","    */","   formFromInstance: function(instanceObject) {","      if(!instanceObject || !instanceObject[\"$schema\"]) {","         throw new Error(\"Invalid json schema instance object. Object must have a '$schema' property.\");","      }","      ","      var formDef = this.schemaToInputEx(instanceObject[\"$schema\"]);","      ","      // Set the default value of each property to the instance value","      for(var i = 0 ; i < formDef.fields.length ; i++) {","         var fieldName = formDef.fields[i].name;","         formDef.fields[i].value = instanceObject[fieldName];","      }","      ","      return formDef;","   }","   ","};","","","}, '@VERSION@', {\"requires\": [\"inputex\"]});"];
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].lines = {"1":0,"6":0,"30":0,"39":0,"42":0,"43":0,"50":0,"51":0,"53":0,"54":0,"57":0,"59":0,"60":0,"66":0,"67":0,"73":0,"74":0,"85":0,"86":0,"96":0,"97":0,"105":0,"106":0,"113":0,"114":0,"121":0,"122":0,"129":0,"130":0,"137":0,"138":0,"145":0,"146":0,"153":0,"154":0,"163":0,"179":0,"181":0,"182":0,"185":0,"191":0,"194":0,"197":0,"200":0,"207":0,"217":0,"218":0,"219":0,"220":0,"222":0,"223":0,"224":0,"225":0,"227":0,"228":0,"230":0,"231":0,"235":0,"237":0,"238":0,"239":0,"242":0,"245":0,"246":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"256":0,"258":0,"259":0,"260":0,"265":0,"270":0,"271":0,"275":0,"276":0,"277":0,"280":0,"288":0,"291":0,"292":0,"295":0,"296":0,"297":0,"299":0,"302":0,"303":0,"306":0,"307":0,"308":0,"309":0,"313":0,"314":0,"315":0,"318":0,"319":0,"320":0,"324":0,"327":0,"328":0,"330":0,"331":0,"332":0,"333":0,"334":0,"338":0,"339":0,"340":0,"341":0,"342":0,"345":0,"350":0,"351":0,"352":0,"353":0,"355":0,"358":0,"359":0,"362":0,"363":0,"366":0,"367":0,"371":0,"372":0,"373":0,"374":0,"375":0,"376":0,"377":0,"378":0,"379":0,"380":0,"381":0,"382":0,"383":0,"384":0,"385":0,"386":0,"387":0,"388":0,"394":0,"395":0,"399":0,"400":0,"401":0,"404":0,"413":0,"414":0,"417":0,"420":0,"421":0,"422":0,"425":0};
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].functions = {"inputExToSchema:37":0,"Builder:179":0,"defaultReferenceResolver:206":0,"schemaToInputEx:215":0,"formFromInstance:412":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].coveredLines = 156;
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].coveredFunctions = 6;
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 1);
YUI.add('inputex-jsonschema', function (Y, NAME) {

/**
 * @module inputex-jsonschema
 */
  _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;
 
/**
 * Namespace containing utility functions for conversion between inputEx JSON format and JSON Schema
 *
 * based on "Json Schema Proposal Working Draft":
 * http://groups.google.com/group/json-schema/web/json-schema-proposal-working-draft
 * The proposal is still under discussion and the implementation is very minimalist.
 *
 *
 * TODO:
 *    - we should provide a lot of json schema examples and instances that should/should not validate
 *    - use the $ref (async calls => provide callbacks to methods)
 *    - Inheritance
 *
 * Limitations:
 *    - ??? Please do not trust inputEx: the getValue may return a value which do NOT validate the schema (provide an example ?)
 *    - no tuple typing for arrays
 *    - no "Union type definition"
 *
 * @class inputEx.JsonSchema
 * @static
 */
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 30);
inputEx.JsonSchema = {
   
   /**
    * Convert the inputEx JSON fields to a JSON schema
    * @method inputExToSchema
    * @static
    */
   inputExToSchema: function(inputExJson) {
      
      _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "inputExToSchema", 37);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 39);
var t = inputExJson.type || "string",
          ip = inputExJson || {};
      
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 42);
if(t == "group") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 43);
var ret = {
            type:'object',
            title: ip.legend,
            properties:{
            }
         };
         
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 50);
for(var i = 0 ; i < ip.fields.length ; i++) {
            _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 51);
var field = ip.fields[i];
            
            _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 53);
var fieldName = field.name;
            _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 54);
ret.properties[fieldName] = inputEx.JsonSchema.inputExToSchema(field);
         }
         
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 57);
return ret;
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 59);
if(t == "number") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 60);
return {
    			'type':'number',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 66);
if(t == "string") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 67);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 73);
if(t == "text") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 74);
return {
 			   'type':'string',
			   'format':'text',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
				'_inputex':{
					'rows':5,
					'cols':50
				}
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 85);
if(t == "html") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 86);
return {
 			   'type':'string',
			   'format':'html',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
				'_inputex':{
					
				}
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 96);
if(t == "list") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 97);
return {
 			   'type':'array',
    			'title': ip.label,
    			'items': inputEx.JsonSchema.inputExToSchema(ip.elementType),
				'_inputex':{
				}
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 105);
if(t == "email") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 106);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'email'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 113);
if(t == "url") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 114);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'url'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 121);
if(t == "time") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 122);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'time'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 129);
if(t == "IPv4") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 130);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'ip-address'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 137);
if(t == "color") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 138);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'color'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 145);
if(t == "date") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 146);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'date'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 153);
if(t == "multiselect" || t == "multiautocomplete"){
        _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 154);
return {
    			'type':'array',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'items': typeof ip.jsonSchemaRef == "undefined" ? {"type":"string"}: ip.jsonSchemaRef,// it's a little bit weird to mix a inputEx description field and jsonSchema in a specific attribute, we should had a $ref system to go through this properly
    			'_inputex': ip
    		};
      }
      else {
			_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 163);
return {
				'type': 'string',
				'title': ip.label,
				'optional': typeof ip.required == "undefined" ? true : !ip.required,
				'_inputex': ip
			};
      }}}}}}}}}}}}}
      
   }

};


/**
 * @class inputEx.JsonSchema.Builder
 */
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 179);
inputEx.JsonSchema.Builder = function(opts) {
	
	_yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "Builder", 179);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 181);
var options = opts || {};
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 182);
this.options  = options; 
	
	// specify how other schema properties are mapped to inputParam properties
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 185);
this.schemaToParamMap = options.schemaToParamMap || {
		'title':'label',
		'description':'description',
		'_inputex':null	// null value means copy child key/value pairs into field options directly
	};
	
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 191);
this.referenceResolver = options.referenceResolver || null;
	
	// options to be applied unless already specified
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 194);
this.defaultOptions = options.defaultOptions || {};	
	
	// key is reference, value is schema
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 197);
this.schemaIdentifierMap = options.schemaIdentifierMap || {};
};

_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 200);
inputEx.JsonSchema.Builder.prototype = {
   
   /** 
 	 * return a schema based on the reference value default is to look up in map
 	 * @method defaultReferenceResolver
    */
	defaultReferenceResolver:function(reference) {
		_yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "defaultReferenceResolver", 206);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 207);
return this.schemaIdentifierMap[reference] || null;
	},
	
	/**
	 * Convert a JSON schema to inputEx JSON
	 * @method schemaToInputEx
	 * @param {JSONSchema} p
	 */
	schemaToInputEx:function(p, propertyName) {
	
	   _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "schemaToInputEx", 215);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 217);
var fieldDef = { label: propertyName, name: propertyName };
	   _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 218);
var schemaMap = this.schemaToParamMap;
    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 219);
var referencedSchema = p["$ref"];
		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 220);
var key;
	    
	   _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 222);
if(referencedSchema){
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 223);
var new_schema = null;
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 224);
if(this.referenceResolver) {
		       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 225);
new_schema = this.referenceResolver(referencedSchema);
		    }
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 227);
if(new_schema === null) {
	    		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 228);
new_schema = this.defaultReferenceResolver(referencedSchema);
	    	}
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 230);
if(new_schema === null) {
	    		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 231);
throw new Error('Schema for property : "'+propertyName+'" $references "'+referencedSchema+'", not found');
	    	}
	    	// copy options into new schema, for example we can overide presentation
	    	// of a defined schema depending on where it is used
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 235);
new_schema = Y.mix({},new_schema);	// copy new_schema
	    	
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 237);
for(var pk in p) {
	    		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 238);
if(p.hasOwnProperty(pk) && lang.isUndefined(new_schema[pk]) && pk != '$ref') {
	    			_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 239);
new_schema[pk] = p[pk];
	    		}
	    	}
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 242);
p = new_schema;
	   }

	   _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 245);
if(!p.optional) {
	      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 246);
fieldDef.required = true;
	   }

	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 249);
for(key in schemaMap) {
	        _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 250);
if(schemaMap.hasOwnProperty(key)) {
	      	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 251);
var paramName = schemaMap[key]; 
	      	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 252);
var v = p[key];
	      	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 253);
if(!lang.isUndefined(v)) {
	      		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 254);
if(paramName === null) {
	      			  // copy / merge values from v directly into options
	      			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 256);
if(lang.isObject(v)) {
	      				  // v must be an object, copy key/value pairs into options
	      				  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 258);
for(var vkey in v) {
	      					  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 259);
if(v.hasOwnProperty(vkey)) {
	      						  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 260);
fieldDef[vkey] = v[vkey];
	      					  }
	      				  }
	      			  }
	      		  } else {
	      			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 265);
fieldDef[paramName] = v;
	      		  }
	      	  }
	        }
	    }
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 270);
if(!p.type) {p.type = 'object';}
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 271);
var type = p.type;
	       
	       // If type is a "Union type definition", we'll use the first type for the field
	       // "array" <=>  [] <=> ["any"]
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 275);
if(lang.isArray(type)) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 276);
if(type.length === 0 || (type.length == 1 && type[0] == "any") ) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 277);
type = "array";
	          }
	          else {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 280);
type = type[0];
	          }
	       }
	       //else if(lang.isObject(type) ) {
	          // What do we do ??
	          //console.log("type is an object !!");
	       //}
	       
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 288);
fieldDef.type = type;
	       
	       // default value
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 291);
if( !lang.isUndefined(p["default"]) ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 292);
fieldDef.value = p["default"];
	       }
	    
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 295);
if(type == "array" ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 296);
fieldDef.type = "list";
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 297);
if(lang.isObject(p.items) && !lang.isArray(p.items)) {
	        	  // when items is an object, it's a schema that describes each item in the list
	        	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 299);
fieldDef.elementType = this.schemaToInputEx(p.items, propertyName);
	          }
	
		       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 302);
if(p.minItems) { fieldDef.minItems = p.minItems; }
				 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 303);
if(p.maxItems) { fieldDef.maxItems = p.maxItems; }
	
	       }
	       else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 306);
if(type == "object" ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 307);
fieldDef.type = "group";
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 308);
if(p.title && lang.isUndefined(fieldDef.legend)) {
	        	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 309);
fieldDef.legend = p.title; 
	          }
	          //fieldDef = this.schemaToInputEx(p, propertyName);
	          //fieldDef = this._parseSchemaProperty(p, propertyName);
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 313);
var fields = [];
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 314);
if(propertyName) {
	        	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 315);
fieldDef.name = propertyName;
	          }
	
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 318);
for(key in p.properties) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 319);
if(p.properties.hasOwnProperty(key)) {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 320);
fields.push( this.schemaToInputEx(p.properties[key], key) );
	             }
	          }
	
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 324);
fieldDef.fields = fields;
	          
	       }
	       else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 327);
if(type == "string" && (p["enum"] || p["choices"]) ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 328);
fieldDef.type = "select";
	          
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 330);
if(p.choices) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 331);
fieldDef.choices = [];
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 332);
for(var i = 0 ; i < p.choices.length ; i++) {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 333);
var o = p.choices[i];
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 334);
fieldDef.choices[i] = { label: o.label, value: o.value };
	             }
             }
             else { // p.choices
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 338);
fieldDef.choices = [];
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 339);
for(var i = 0 ; i < p["enum"].length ; i++) {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 340);
var o = p["enum"][i];
						 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 341);
if(lang.isObject(o)) {
	                	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 342);
fieldDef.choices[i] = { label: o.label, value: o.value };
						 }
						 else {
							_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 345);
fieldDef.choices[i] = { value: o };
						 }
	             }
             }		
	       }
	       else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 350);
if(type == "string") {
	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 351);
if(!lang.isUndefined(p.pattern) && lang.isUndefined(fieldDef.regexp)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 352);
if(lang.isString(p.pattern)) {
	    			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 353);
fieldDef.regexp = new RegExp(p.pattern);
	    		  } else {
	    			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 355);
fieldDef.regexp = p.pattern;
	    		  }
	    	  }
	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 358);
if(!lang.isUndefined(p.maxLength) && lang.isUndefined(fieldDef.maxLength)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 359);
fieldDef.maxLength = p.maxLength; 
	    	  }

	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 362);
if(!lang.isUndefined(p.minLength) && lang.isUndefined(fieldDef.minLength)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 363);
fieldDef.minLength = p.minLength; 
	    	  }

	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 366);
if(!lang.isUndefined(p.readonly) && lang.isUndefined(fieldDef.readonly)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 367);
fieldDef.readonly = p.readonly; 
	    	  }

           // According to http://groups.google.com/group/json-schema/web/json-schema-possible-formats
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 371);
if( p.format ) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 372);
if(p.format == "html") {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 373);
fieldDef.type = "html";
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 374);
if(p.format == "date") {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 375);
fieldDef.type = "date";
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 376);
fieldDef.tooltipIcon = true;
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 377);
if(p.format == 'url') {
	            	 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 378);
fieldDef.type = 'url';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 379);
if(p.format == 'email') {
	            	 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 380);
fieldDef.type = 'email';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 381);
if(p.format == 'text') {
	            	 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 382);
fieldDef.type = 'text';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 383);
if(p.format == 'time') {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 384);
fieldDef.type = 'time';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 385);
if(p.format == 'ip-address') {
    	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 386);
fieldDef.type = 'IPv4';
    	          } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 387);
if(p.format == 'color') {
    	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 388);
fieldDef.type = 'color';
    	          }}}}}}}}
	          }
	       }}}}
	
			 // Override inputEx's type with the "_type" attribute
			 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 394);
if( !!p["_inputex"] && !!p["_inputex"]["_type"]) {
				_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 395);
fieldDef.type = p["_inputex"]["_type"];
			 }
	
	    // Add the defaultOptions
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 399);
for(var kk in this.defaultOptions) {
	        _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 400);
if(this.defaultOptions.hasOwnProperty(kk) && lang.isUndefined(fieldDef[kk])) {
	        	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 401);
fieldDef[kk] = this.defaultOptions[kk]; 
	        }	    	
	    }
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 404);
return fieldDef;
	},

   /**
    * Create an inputEx Json form definition from a json schema instance object
    * Respect the "Self-Defined Schema Convention"
    * @method formFromInstance
    */
   formFromInstance: function(instanceObject) {
      _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "formFromInstance", 412);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 413);
if(!instanceObject || !instanceObject["$schema"]) {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 414);
throw new Error("Invalid json schema instance object. Object must have a '$schema' property.");
      }
      
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 417);
var formDef = this.schemaToInputEx(instanceObject["$schema"]);
      
      // Set the default value of each property to the instance value
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 420);
for(var i = 0 ; i < formDef.fields.length ; i++) {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 421);
var fieldName = formDef.fields[i].name;
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 422);
formDef.fields[i].value = instanceObject[fieldName];
      }
      
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 425);
return formDef;
   }
   
};


}, '@VERSION@', {"requires": ["inputex"]});
