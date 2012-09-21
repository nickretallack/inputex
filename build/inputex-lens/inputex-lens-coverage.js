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
_yuitest_coverage["build/inputex-lens/inputex-lens.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-lens/inputex-lens.js",
    code: []
};
_yuitest_coverage["build/inputex-lens/inputex-lens.js"].code=["YUI.add('inputex-lens', function (Y, NAME) {","","/**"," * @module inputex-lens"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Display a group with inplace edit and custom template"," * @class inputEx.Lens"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>lens: html code for the lens. Fields will be displayed in the div elements that has the classname named \"field-(field name)\"</li>"," *    <li>visus: list of visualization for each field</li>"," * </ul>"," */","inputEx.Lens = function(options) {","   inputEx.Lens.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.Lens, inputEx.Group, {","   ","   /**","    * Set additional options","    * @method setOptions","    */","	setOptions: function(options) {","		inputEx.Lens.superclass.setOptions.call(this, options);","","		if(!this.options.fields){","				throw new Error(\"Missing 'fields' property in options\");","		}","		","		var lens = \"\";","		if( !lang.isString(options.lens) ) {","			for(var i = 0 ; i < this.options.fields.length ; i++) {","				lens += \"<div class='field-\"+this.options.fields[i].name+\"'></div>\";","			}","		}","		this.options.lens = lang.isString(options.lens) ? options.lens : lens;","		","		this.options.visus = options.visus;","	},","	","	/**","	 * Render each the fields in each div which class attribute is \"field-\"+fieldName","	 * @method renderFields","	 */","	renderFields: function(parentEl) {","      ","			parentEl.innerHTML = this.options.lens;","			","			for(var i = 0 ; i < this.options.fields.length ; i++) {","","				var els = Y.one(parentEl).all(\".\"+\"field-\"+this.options.fields[i].name+\" , div .field-\"+this.options.fields[i].name);","				var el = els.item(0);","","				var params = { parentEl: el._node, editorField: this.options.fields[i], name: this.options.fields[i].name };","				if(this.options.visus) {","					params.visu = this.options.visus[i];","				}","				var field = new inputEx.InPlaceEdit(params);","				","				this.inputs.push(field);","				if(field.options.name) {","		    	this.inputsNames[field.options.name] = field;","		    }","			  // Subscribe to the field \"updated\" event to send the group \"updated\" event","			  field.on('updated', this.onChange, this, true);","		","			}","  	","   }","	","});","","// Register this class as \"list\" type","inputEx.registerType(\"lens\", inputEx.Lens, [","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-group\", \"inputex-inplaceedit\"], \"ix_provides\": \"lens\"});"];
_yuitest_coverage["build/inputex-lens/inputex-lens.js"].lines = {"1":0,"6":0,"20":0,"21":0,"24":0,"31":0,"33":0,"34":0,"37":0,"38":0,"39":0,"40":0,"43":0,"45":0,"54":0,"56":0,"58":0,"59":0,"61":0,"62":0,"63":0,"65":0,"67":0,"68":0,"69":0,"72":0,"81":0};
_yuitest_coverage["build/inputex-lens/inputex-lens.js"].functions = {"Lens:20":0,"setOptions:30":0,"renderFields:52":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-lens/inputex-lens.js"].coveredLines = 27;
_yuitest_coverage["build/inputex-lens/inputex-lens.js"].coveredFunctions = 4;
_yuitest_coverline("build/inputex-lens/inputex-lens.js", 1);
YUI.add('inputex-lens', function (Y, NAME) {

/**
 * @module inputex-lens
 */
   _yuitest_coverfunc("build/inputex-lens/inputex-lens.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-lens/inputex-lens.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Display a group with inplace edit and custom template
 * @class inputEx.Lens
 * @extends inputEx.Group
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>lens: html code for the lens. Fields will be displayed in the div elements that has the classname named "field-(field name)"</li>
 *    <li>visus: list of visualization for each field</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-lens/inputex-lens.js", 20);
inputEx.Lens = function(options) {
   _yuitest_coverfunc("build/inputex-lens/inputex-lens.js", "Lens", 20);
_yuitest_coverline("build/inputex-lens/inputex-lens.js", 21);
inputEx.Lens.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-lens/inputex-lens.js", 24);
Y.extend(inputEx.Lens, inputEx.Group, {
   
   /**
    * Set additional options
    * @method setOptions
    */
	setOptions: function(options) {
		_yuitest_coverfunc("build/inputex-lens/inputex-lens.js", "setOptions", 30);
_yuitest_coverline("build/inputex-lens/inputex-lens.js", 31);
inputEx.Lens.superclass.setOptions.call(this, options);

		_yuitest_coverline("build/inputex-lens/inputex-lens.js", 33);
if(!this.options.fields){
				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 34);
throw new Error("Missing 'fields' property in options");
		}
		
		_yuitest_coverline("build/inputex-lens/inputex-lens.js", 37);
var lens = "";
		_yuitest_coverline("build/inputex-lens/inputex-lens.js", 38);
if( !lang.isString(options.lens) ) {
			_yuitest_coverline("build/inputex-lens/inputex-lens.js", 39);
for(var i = 0 ; i < this.options.fields.length ; i++) {
				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 40);
lens += "<div class='field-"+this.options.fields[i].name+"'></div>";
			}
		}
		_yuitest_coverline("build/inputex-lens/inputex-lens.js", 43);
this.options.lens = lang.isString(options.lens) ? options.lens : lens;
		
		_yuitest_coverline("build/inputex-lens/inputex-lens.js", 45);
this.options.visus = options.visus;
	},
	
	/**
	 * Render each the fields in each div which class attribute is "field-"+fieldName
	 * @method renderFields
	 */
	renderFields: function(parentEl) {
      
			_yuitest_coverfunc("build/inputex-lens/inputex-lens.js", "renderFields", 52);
_yuitest_coverline("build/inputex-lens/inputex-lens.js", 54);
parentEl.innerHTML = this.options.lens;
			
			_yuitest_coverline("build/inputex-lens/inputex-lens.js", 56);
for(var i = 0 ; i < this.options.fields.length ; i++) {

				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 58);
var els = Y.one(parentEl).all("."+"field-"+this.options.fields[i].name+" , div .field-"+this.options.fields[i].name);
				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 59);
var el = els.item(0);

				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 61);
var params = { parentEl: el._node, editorField: this.options.fields[i], name: this.options.fields[i].name };
				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 62);
if(this.options.visus) {
					_yuitest_coverline("build/inputex-lens/inputex-lens.js", 63);
params.visu = this.options.visus[i];
				}
				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 65);
var field = new inputEx.InPlaceEdit(params);
				
				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 67);
this.inputs.push(field);
				_yuitest_coverline("build/inputex-lens/inputex-lens.js", 68);
if(field.options.name) {
		    	_yuitest_coverline("build/inputex-lens/inputex-lens.js", 69);
this.inputsNames[field.options.name] = field;
		    }
			  // Subscribe to the field "updated" event to send the group "updated" event
			  _yuitest_coverline("build/inputex-lens/inputex-lens.js", 72);
field.on('updated', this.onChange, this, true);
		
			}
  	
   }
	
});

// Register this class as "list" type
_yuitest_coverline("build/inputex-lens/inputex-lens.js", 81);
inputEx.registerType("lens", inputEx.Lens, [
]);


}, '@VERSION@', {"requires": ["inputex-group", "inputex-inplaceedit"], "ix_provides": "lens"});
