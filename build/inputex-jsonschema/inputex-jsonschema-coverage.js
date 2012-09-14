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
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].code=["YUI.add('inputex-jsonschema', function (Y, NAME) {","","/**"," * @module inputex-jsonschema"," */","YUI.add(\"inputex-jsonschema\", function(Y){","","  var lang = Y.Lang,","      inputEx = Y.inputEx;"," ","/**"," * Namespace containing utility functions for conversion between inputEx JSON format and JSON Schema"," *"," * based on \"Json Schema Proposal Working Draft\":"," * http://groups.google.com/group/json-schema/web/json-schema-proposal-working-draft"," * The proposal is still under discussion and the implementation is very minimalist."," *"," *"," * TODO:"," *    - we should provide a lot of json schema examples and instances that should/should not validate"," *    - use the $ref (async calls => provide callbacks to methods)"," *    - Inheritance"," *"," * Limitations:"," *    - ??? Please do not trust inputEx: the getValue may return a value which do NOT validate the schema (provide an example ?)"," *    - no tuple typing for arrays"," *    - no \"Union type definition\""," *"," * @class inputEx.JsonSchema"," * @static"," */","inputEx.JsonSchema = {","   ","   /**","    * Convert the inputEx JSON fields to a JSON schema","    * @method inputExToSchema","    * @static","    */","   inputExToSchema: function(inputExJson) {","      ","      var t = inputExJson.type || \"string\",","          ip = inputExJson || {};","      ","      if(t == \"group\") {","         var ret = {","            type:'object',","            title: ip.legend,","            properties:{","            }","         };","         ","         for(var i = 0 ; i < ip.fields.length ; i++) {","            var field = ip.fields[i];","            ","            var fieldName = field.name;","            ret.properties[fieldName] = inputEx.JsonSchema.inputExToSchema(field);","         }","         ","         return ret;","      }","      else if(t == \"number\") {","         return {","    			'type':'number',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label","    		};","      }","      else if(t == \"string\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label","    		};","      }","      else if(t == \"text\") {","         return {"," 			   'type':'string',","			   'format':'text',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","				'_inputex':{","					'rows':5,","					'cols':50","				}","    		};","      }","      else if(t == \"html\") {","         return {"," 			   'type':'string',","			   'format':'html',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","				'_inputex':{","					","				}","    		};","      }","      else if(t == \"list\") {","         return {"," 			   'type':'array',","    			'title': ip.label,","    			'items': inputEx.JsonSchema.inputExToSchema(ip.elementType),","				'_inputex':{","				}","    		};","      }","      else if(t == \"email\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'email'","    		};","      }","      else if(t == \"url\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'url'","    		};","      }","      else if(t == \"time\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'time'","    		};","      }","      else if(t == \"IPv4\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'ip-address'","    		};","      }","      else if(t == \"color\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'color'","    		};","      }","      else if(t == \"date\") {","         return {","    			'type':'string',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'format':'date'","    		};","      }","      else if(t == \"multiselect\" || t == \"multiautocomplete\"){","        return {","    			'type':'array',","    			'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","    			'title': ip.label,","    			'items': typeof ip.jsonSchemaRef == \"undefined\" ? {\"type\":\"string\"}: ip.jsonSchemaRef,// it's a little bit weird to mix a inputEx description field and jsonSchema in a specific attribute, we should had a $ref system to go through this properly","    			'_inputex': ip","    		};","      }","      else {","			return {","				'type': 'string',","				'title': ip.label,","				'optional': typeof ip.required == \"undefined\" ? true : !ip.required,","				'_inputex': ip","			};","      }","      ","   }","","};","","","/**"," * @class inputEx.JsonSchema.Builder"," */","inputEx.JsonSchema.Builder = function(opts) {","	","	var options = opts || {};","	this.options  = options; ","	","	// specify how other schema properties are mapped to inputParam properties","	this.schemaToParamMap = options.schemaToParamMap || {","		'title':'label',","		'description':'description',","		'_inputex':null	// null value means copy child key/value pairs into field options directly","	};","	","	this.referenceResolver = options.referenceResolver || null;","	","	// options to be applied unless already specified","	this.defaultOptions = options.defaultOptions || {};	","	","	// key is reference, value is schema","	this.schemaIdentifierMap = options.schemaIdentifierMap || {};","};","","inputEx.JsonSchema.Builder.prototype = {","   ","   /** "," 	 * return a schema based on the reference value default is to look up in map"," 	 * @method defaultReferenceResolver","    */","	defaultReferenceResolver:function(reference) {","		return this.schemaIdentifierMap[reference] || null;","	},","	","	/**","	 * Convert a JSON schema to inputEx JSON","	 * @method schemaToInputEx","	 * @param {JSONSchema} p","	 */","	schemaToInputEx:function(p, propertyName) {","	","	   var fieldDef = { label: propertyName, name: propertyName };","	   var schemaMap = this.schemaToParamMap;","    	var referencedSchema = p[\"$ref\"];","		var key;","	    ","	   if(referencedSchema){","	    	var new_schema = null;","	    	if(this.referenceResolver) {","		       new_schema = this.referenceResolver(referencedSchema);","		    }","	    	if(new_schema === null) {","	    		new_schema = this.defaultReferenceResolver(referencedSchema);","	    	}","	    	if(new_schema === null) {","	    		throw new Error('Schema for property : \"'+propertyName+'\" $references \"'+referencedSchema+'\", not found');","	    	}","	    	// copy options into new schema, for example we can overide presentation","	    	// of a defined schema depending on where it is used","	    	new_schema = Y.mix({},new_schema);	// copy new_schema","	    	","	    	for(var pk in p) {","	    		if(p.hasOwnProperty(pk) && lang.isUndefined(new_schema[pk]) && pk != '$ref') {","	    			new_schema[pk] = p[pk];","	    		}","	    	}","	    	p = new_schema;","	   }","","	   if(!p.optional) {","	      fieldDef.required = true;","	   }","","	    for(key in schemaMap) {","	        if(schemaMap.hasOwnProperty(key)) {","	      	  var paramName = schemaMap[key]; ","	      	  var v = p[key];","	      	  if(!lang.isUndefined(v)) {","	      		  if(paramName === null) {","	      			  // copy / merge values from v directly into options","	      			  if(lang.isObject(v)) {","	      				  // v must be an object, copy key/value pairs into options","	      				  for(var vkey in v) {","	      					  if(v.hasOwnProperty(vkey)) {","	      						  fieldDef[vkey] = v[vkey];","	      					  }","	      				  }","	      			  }","	      		  } else {","	      			  fieldDef[paramName] = v;","	      		  }","	      	  }","	        }","	    }","	    if(!p.type) p.type = 'object';","	    var type = p.type;","	       ","	       // If type is a \"Union type definition\", we'll use the first type for the field","	       // \"array\" <=>  [] <=> [\"any\"]","	       if(lang.isArray(type)) {","	          if(type.length === 0 || (type.length == 1 && type[0] == \"any\") ) {","	             type = \"array\";","	          }","	          else {","	             type = type[0];","	          }","	       }","	       //else if(lang.isObject(type) ) {","	          // What do we do ??","	          //console.log(\"type is an object !!\");","	       //}","	       ","	       fieldDef.type = type;","	       ","	       // default value","	       if( !lang.isUndefined(p[\"default\"]) ) {","	          fieldDef.value = p[\"default\"];","	       }","	    ","	       if(type == \"array\" ) {","	          fieldDef.type = \"list\";","	          if(lang.isObject(p.items) && !lang.isArray(p.items)) {","	        	  // when items is an object, it's a schema that describes each item in the list","	        	  fieldDef.elementType = this.schemaToInputEx(p.items, propertyName);","	          }","	","		       if(p.minItems) { fieldDef.minItems = p.minItems; }","				 if(p.maxItems) { fieldDef.maxItems = p.maxItems; }","	","	       }","	       else if(type == \"object\" ) {","	          fieldDef.type = \"group\";","	          if(p.title && lang.isUndefined(fieldDef.legend)) {","	        	  fieldDef.legend = p.title; ","	          }","	          //fieldDef = this.schemaToInputEx(p, propertyName);","	          //fieldDef = this._parseSchemaProperty(p, propertyName);","	          var fields = [];","	          if(propertyName) {","	        	  fieldDef.name = propertyName;","	          }","	","	          for(key in p.properties) {","	             if(p.properties.hasOwnProperty(key)) {","	                fields.push( this.schemaToInputEx(p.properties[key], key) );","	             }","	          }","	","	          fieldDef.fields = fields;","	          ","	       }","	       else if(type == \"string\" && (p[\"enum\"] || p[\"choices\"]) ) {","	          fieldDef.type = \"select\";","	          ","	          if(p.choices) {","	             fieldDef.choices = [];","	             for(var i = 0 ; i < p.choices.length ; i++) {","	                var o = p.choices[i];","	                fieldDef.choices[i] = { label: o.label, value: o.value };","	             }","             }","             else { // p.choices","	             fieldDef.choices = [];","	             for(var i = 0 ; i < p[\"enum\"].length ; i++) {","	                var o = p[\"enum\"][i];","						 if(lang.isObject(o)) {","	                	fieldDef.choices[i] = { label: o.label, value: o.value };","						 }","						 else {","							fieldDef.choices[i] = { value: o };","						 }","	             }","             }		","	       }","	       else if(type == \"string\") {","	    	  if(!lang.isUndefined(p.pattern) && lang.isUndefined(fieldDef.regexp)) {","	    		  if(lang.isString(p.pattern)) {","	    			  fieldDef.regexp = new RegExp(p.pattern);","	    		  } else {","	    			  fieldDef.regexp = p.pattern;","	    		  }","	    	  }","	    	  if(!lang.isUndefined(p.maxLength) && lang.isUndefined(fieldDef.maxLength)) {","	    		  fieldDef.maxLength = p.maxLength; ","	    	  }","","	    	  if(!lang.isUndefined(p.minLength) && lang.isUndefined(fieldDef.minLength)) {","	    		  fieldDef.minLength = p.minLength; ","	    	  }","","	    	  if(!lang.isUndefined(p.readonly) && lang.isUndefined(fieldDef.readonly)) {","	    		  fieldDef.readonly = p.readonly; ","	    	  }","","           // According to http://groups.google.com/group/json-schema/web/json-schema-possible-formats","	          if( p.format ) {","	             if(p.format == \"html\") {","	                fieldDef.type = \"html\";","	             } else if(p.format == \"date\") {","	                fieldDef.type = \"date\";","	                fieldDef.tooltipIcon = true;","	             } else if(p.format == 'url') {","	            	 fieldDef.type = 'url';","	             } else if(p.format == 'email') {","	            	 fieldDef.type = 'email';","	             } else if(p.format == 'text') {","	            	 fieldDef.type = 'text';","	             } else if(p.format == 'time') {","	                fieldDef.type = 'time';","	             } else if(p.format == 'ip-address') {","    	             fieldDef.type = 'IPv4';","    	          } else if(p.format == 'color') {","    	             fieldDef.type = 'color';","    	          }","	          }","	       }","	","			 // Override inputEx's type with the \"_type\" attribute","			 if( !!p[\"_inputex\"] && !!p[\"_inputex\"][\"_type\"]) {","				fieldDef.type = p[\"_inputex\"][\"_type\"];","			 }","	","	    // Add the defaultOptions","	    for(var kk in this.defaultOptions) {","	        if(this.defaultOptions.hasOwnProperty(kk) && lang.isUndefined(fieldDef[kk])) {","	        	fieldDef[kk] = this.defaultOptions[kk]; ","	        }	    	","	    }","	    return fieldDef;","	},","","   /**","    * Create an inputEx Json form definition from a json schema instance object","    * Respect the \"Self-Defined Schema Convention\"","    * @method formFromInstance","    */","   formFromInstance: function(instanceObject) {","      if(!instanceObject || !instanceObject[\"$schema\"]) {","         throw new Error(\"Invalid json schema instance object. Object must have a '$schema' property.\");","      }","      ","      var formDef = this.schemaToInputEx(instanceObject[\"$schema\"]);","      ","      // Set the default value of each property to the instance value","      for(var i = 0 ; i < formDef.fields.length ; i++) {","         var fieldName = formDef.fields[i].name;","         formDef.fields[i].value = instanceObject[fieldName];","      }","      ","      return formDef;","   }","   ","};","","}, '3.1.0',{","  requires: [\"inputex\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].lines = {"1":0,"6":0,"8":0,"32":0,"41":0,"44":0,"45":0,"52":0,"53":0,"55":0,"56":0,"59":0,"61":0,"62":0,"68":0,"69":0,"75":0,"76":0,"87":0,"88":0,"98":0,"99":0,"107":0,"108":0,"115":0,"116":0,"123":0,"124":0,"131":0,"132":0,"139":0,"140":0,"147":0,"148":0,"155":0,"156":0,"165":0,"181":0,"183":0,"184":0,"187":0,"193":0,"196":0,"199":0,"202":0,"209":0,"219":0,"220":0,"221":0,"222":0,"224":0,"225":0,"226":0,"227":0,"229":0,"230":0,"232":0,"233":0,"237":0,"239":0,"240":0,"241":0,"244":0,"247":0,"248":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"258":0,"260":0,"261":0,"262":0,"267":0,"272":0,"273":0,"277":0,"278":0,"279":0,"282":0,"290":0,"293":0,"294":0,"297":0,"298":0,"299":0,"301":0,"304":0,"305":0,"308":0,"309":0,"310":0,"311":0,"315":0,"316":0,"317":0,"320":0,"321":0,"322":0,"326":0,"329":0,"330":0,"332":0,"333":0,"334":0,"335":0,"336":0,"340":0,"341":0,"342":0,"343":0,"344":0,"347":0,"352":0,"353":0,"354":0,"355":0,"357":0,"360":0,"361":0,"364":0,"365":0,"368":0,"369":0,"373":0,"374":0,"375":0,"376":0,"377":0,"378":0,"379":0,"380":0,"381":0,"382":0,"383":0,"384":0,"385":0,"386":0,"387":0,"388":0,"389":0,"390":0,"396":0,"397":0,"401":0,"402":0,"403":0,"406":0,"415":0,"416":0,"419":0,"422":0,"423":0,"424":0,"427":0};
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].functions = {"inputExToSchema:39":0,"Builder:181":0,"defaultReferenceResolver:208":0,"schemaToInputEx:217":0,"formFromInstance:414":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].coveredLines = 157;
_yuitest_coverage["build/inputex-jsonschema/inputex-jsonschema.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 1);
YUI.add('inputex-jsonschema', function (Y, NAME) {

/**
 * @module inputex-jsonschema
 */
_yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 6);
YUI.add("inputex-jsonschema", function(Y){

  _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 8);
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
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 32);
inputEx.JsonSchema = {
   
   /**
    * Convert the inputEx JSON fields to a JSON schema
    * @method inputExToSchema
    * @static
    */
   inputExToSchema: function(inputExJson) {
      
      _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "inputExToSchema", 39);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 41);
var t = inputExJson.type || "string",
          ip = inputExJson || {};
      
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 44);
if(t == "group") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 45);
var ret = {
            type:'object',
            title: ip.legend,
            properties:{
            }
         };
         
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 52);
for(var i = 0 ; i < ip.fields.length ; i++) {
            _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 53);
var field = ip.fields[i];
            
            _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 55);
var fieldName = field.name;
            _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 56);
ret.properties[fieldName] = inputEx.JsonSchema.inputExToSchema(field);
         }
         
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 59);
return ret;
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 61);
if(t == "number") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 62);
return {
    			'type':'number',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 68);
if(t == "string") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 69);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 75);
if(t == "text") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 76);
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
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 87);
if(t == "html") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 88);
return {
 			   'type':'string',
			   'format':'html',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
				'_inputex':{
					
				}
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 98);
if(t == "list") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 99);
return {
 			   'type':'array',
    			'title': ip.label,
    			'items': inputEx.JsonSchema.inputExToSchema(ip.elementType),
				'_inputex':{
				}
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 107);
if(t == "email") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 108);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'email'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 115);
if(t == "url") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 116);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'url'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 123);
if(t == "time") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 124);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'time'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 131);
if(t == "IPv4") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 132);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'ip-address'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 139);
if(t == "color") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 140);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'color'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 147);
if(t == "date") {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 148);
return {
    			'type':'string',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'format':'date'
    		};
      }
      else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 155);
if(t == "multiselect" || t == "multiautocomplete"){
        _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 156);
return {
    			'type':'array',
    			'optional': typeof ip.required == "undefined" ? true : !ip.required,
    			'title': ip.label,
    			'items': typeof ip.jsonSchemaRef == "undefined" ? {"type":"string"}: ip.jsonSchemaRef,// it's a little bit weird to mix a inputEx description field and jsonSchema in a specific attribute, we should had a $ref system to go through this properly
    			'_inputex': ip
    		};
      }
      else {
			_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 165);
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
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 181);
inputEx.JsonSchema.Builder = function(opts) {
	
	_yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "Builder", 181);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 183);
var options = opts || {};
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 184);
this.options  = options; 
	
	// specify how other schema properties are mapped to inputParam properties
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 187);
this.schemaToParamMap = options.schemaToParamMap || {
		'title':'label',
		'description':'description',
		'_inputex':null	// null value means copy child key/value pairs into field options directly
	};
	
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 193);
this.referenceResolver = options.referenceResolver || null;
	
	// options to be applied unless already specified
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 196);
this.defaultOptions = options.defaultOptions || {};	
	
	// key is reference, value is schema
	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 199);
this.schemaIdentifierMap = options.schemaIdentifierMap || {};
};

_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 202);
inputEx.JsonSchema.Builder.prototype = {
   
   /** 
 	 * return a schema based on the reference value default is to look up in map
 	 * @method defaultReferenceResolver
    */
	defaultReferenceResolver:function(reference) {
		_yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "defaultReferenceResolver", 208);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 209);
return this.schemaIdentifierMap[reference] || null;
	},
	
	/**
	 * Convert a JSON schema to inputEx JSON
	 * @method schemaToInputEx
	 * @param {JSONSchema} p
	 */
	schemaToInputEx:function(p, propertyName) {
	
	   _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "schemaToInputEx", 217);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 219);
var fieldDef = { label: propertyName, name: propertyName };
	   _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 220);
var schemaMap = this.schemaToParamMap;
    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 221);
var referencedSchema = p["$ref"];
		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 222);
var key;
	    
	   _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 224);
if(referencedSchema){
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 225);
var new_schema = null;
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 226);
if(this.referenceResolver) {
		       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 227);
new_schema = this.referenceResolver(referencedSchema);
		    }
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 229);
if(new_schema === null) {
	    		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 230);
new_schema = this.defaultReferenceResolver(referencedSchema);
	    	}
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 232);
if(new_schema === null) {
	    		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 233);
throw new Error('Schema for property : "'+propertyName+'" $references "'+referencedSchema+'", not found');
	    	}
	    	// copy options into new schema, for example we can overide presentation
	    	// of a defined schema depending on where it is used
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 237);
new_schema = Y.mix({},new_schema);	// copy new_schema
	    	
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 239);
for(var pk in p) {
	    		_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 240);
if(p.hasOwnProperty(pk) && lang.isUndefined(new_schema[pk]) && pk != '$ref') {
	    			_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 241);
new_schema[pk] = p[pk];
	    		}
	    	}
	    	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 244);
p = new_schema;
	   }

	   _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 247);
if(!p.optional) {
	      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 248);
fieldDef.required = true;
	   }

	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 251);
for(key in schemaMap) {
	        _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 252);
if(schemaMap.hasOwnProperty(key)) {
	      	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 253);
var paramName = schemaMap[key]; 
	      	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 254);
var v = p[key];
	      	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 255);
if(!lang.isUndefined(v)) {
	      		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 256);
if(paramName === null) {
	      			  // copy / merge values from v directly into options
	      			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 258);
if(lang.isObject(v)) {
	      				  // v must be an object, copy key/value pairs into options
	      				  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 260);
for(var vkey in v) {
	      					  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 261);
if(v.hasOwnProperty(vkey)) {
	      						  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 262);
fieldDef[vkey] = v[vkey];
	      					  }
	      				  }
	      			  }
	      		  } else {
	      			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 267);
fieldDef[paramName] = v;
	      		  }
	      	  }
	        }
	    }
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 272);
if(!p.type) {p.type = 'object';}
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 273);
var type = p.type;
	       
	       // If type is a "Union type definition", we'll use the first type for the field
	       // "array" <=>  [] <=> ["any"]
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 277);
if(lang.isArray(type)) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 278);
if(type.length === 0 || (type.length == 1 && type[0] == "any") ) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 279);
type = "array";
	          }
	          else {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 282);
type = type[0];
	          }
	       }
	       //else if(lang.isObject(type) ) {
	          // What do we do ??
	          //console.log("type is an object !!");
	       //}
	       
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 290);
fieldDef.type = type;
	       
	       // default value
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 293);
if( !lang.isUndefined(p["default"]) ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 294);
fieldDef.value = p["default"];
	       }
	    
	       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 297);
if(type == "array" ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 298);
fieldDef.type = "list";
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 299);
if(lang.isObject(p.items) && !lang.isArray(p.items)) {
	        	  // when items is an object, it's a schema that describes each item in the list
	        	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 301);
fieldDef.elementType = this.schemaToInputEx(p.items, propertyName);
	          }
	
		       _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 304);
if(p.minItems) { fieldDef.minItems = p.minItems; }
				 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 305);
if(p.maxItems) { fieldDef.maxItems = p.maxItems; }
	
	       }
	       else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 308);
if(type == "object" ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 309);
fieldDef.type = "group";
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 310);
if(p.title && lang.isUndefined(fieldDef.legend)) {
	        	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 311);
fieldDef.legend = p.title; 
	          }
	          //fieldDef = this.schemaToInputEx(p, propertyName);
	          //fieldDef = this._parseSchemaProperty(p, propertyName);
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 315);
var fields = [];
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 316);
if(propertyName) {
	        	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 317);
fieldDef.name = propertyName;
	          }
	
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 320);
for(key in p.properties) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 321);
if(p.properties.hasOwnProperty(key)) {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 322);
fields.push( this.schemaToInputEx(p.properties[key], key) );
	             }
	          }
	
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 326);
fieldDef.fields = fields;
	          
	       }
	       else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 329);
if(type == "string" && (p["enum"] || p["choices"]) ) {
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 330);
fieldDef.type = "select";
	          
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 332);
if(p.choices) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 333);
fieldDef.choices = [];
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 334);
for(var i = 0 ; i < p.choices.length ; i++) {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 335);
var o = p.choices[i];
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 336);
fieldDef.choices[i] = { label: o.label, value: o.value };
	             }
             }
             else { // p.choices
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 340);
fieldDef.choices = [];
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 341);
for(var i = 0 ; i < p["enum"].length ; i++) {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 342);
var o = p["enum"][i];
						 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 343);
if(lang.isObject(o)) {
	                	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 344);
fieldDef.choices[i] = { label: o.label, value: o.value };
						 }
						 else {
							_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 347);
fieldDef.choices[i] = { value: o };
						 }
	             }
             }		
	       }
	       else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 352);
if(type == "string") {
	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 353);
if(!lang.isUndefined(p.pattern) && lang.isUndefined(fieldDef.regexp)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 354);
if(lang.isString(p.pattern)) {
	    			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 355);
fieldDef.regexp = new RegExp(p.pattern);
	    		  } else {
	    			  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 357);
fieldDef.regexp = p.pattern;
	    		  }
	    	  }
	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 360);
if(!lang.isUndefined(p.maxLength) && lang.isUndefined(fieldDef.maxLength)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 361);
fieldDef.maxLength = p.maxLength; 
	    	  }

	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 364);
if(!lang.isUndefined(p.minLength) && lang.isUndefined(fieldDef.minLength)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 365);
fieldDef.minLength = p.minLength; 
	    	  }

	    	  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 368);
if(!lang.isUndefined(p.readonly) && lang.isUndefined(fieldDef.readonly)) {
	    		  _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 369);
fieldDef.readonly = p.readonly; 
	    	  }

           // According to http://groups.google.com/group/json-schema/web/json-schema-possible-formats
	          _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 373);
if( p.format ) {
	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 374);
if(p.format == "html") {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 375);
fieldDef.type = "html";
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 376);
if(p.format == "date") {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 377);
fieldDef.type = "date";
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 378);
fieldDef.tooltipIcon = true;
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 379);
if(p.format == 'url') {
	            	 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 380);
fieldDef.type = 'url';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 381);
if(p.format == 'email') {
	            	 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 382);
fieldDef.type = 'email';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 383);
if(p.format == 'text') {
	            	 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 384);
fieldDef.type = 'text';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 385);
if(p.format == 'time') {
	                _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 386);
fieldDef.type = 'time';
	             } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 387);
if(p.format == 'ip-address') {
    	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 388);
fieldDef.type = 'IPv4';
    	          } else {_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 389);
if(p.format == 'color') {
    	             _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 390);
fieldDef.type = 'color';
    	          }}}}}}}}
	          }
	       }}}}
	
			 // Override inputEx's type with the "_type" attribute
			 _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 396);
if( !!p["_inputex"] && !!p["_inputex"]["_type"]) {
				_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 397);
fieldDef.type = p["_inputex"]["_type"];
			 }
	
	    // Add the defaultOptions
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 401);
for(var kk in this.defaultOptions) {
	        _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 402);
if(this.defaultOptions.hasOwnProperty(kk) && lang.isUndefined(fieldDef[kk])) {
	        	_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 403);
fieldDef[kk] = this.defaultOptions[kk]; 
	        }	    	
	    }
	    _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 406);
return fieldDef;
	},

   /**
    * Create an inputEx Json form definition from a json schema instance object
    * Respect the "Self-Defined Schema Convention"
    * @method formFromInstance
    */
   formFromInstance: function(instanceObject) {
      _yuitest_coverfunc("build/inputex-jsonschema/inputex-jsonschema.js", "formFromInstance", 414);
_yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 415);
if(!instanceObject || !instanceObject["$schema"]) {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 416);
throw new Error("Invalid json schema instance object. Object must have a '$schema' property.");
      }
      
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 419);
var formDef = this.schemaToInputEx(instanceObject["$schema"]);
      
      // Set the default value of each property to the instance value
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 422);
for(var i = 0 ; i < formDef.fields.length ; i++) {
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 423);
var fieldName = formDef.fields[i].name;
         _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 424);
formDef.fields[i].value = instanceObject[fieldName];
      }
      
      _yuitest_coverline("build/inputex-jsonschema/inputex-jsonschema.js", 427);
return formDef;
   }
   
};

}, '3.1.0',{
  requires: ["inputex"]
});


}, '@VERSION@');
