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
_yuitest_coverage["build/inputex-combine/inputex-combine.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-combine/inputex-combine.js",
    code: []
};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].code=["YUI.add('inputex-combine', function (Y, NAME) {","","/**"," * @module inputex-combine"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","	","/**"," * A meta field to put N fields on the same line, separated by separators"," * @class inputEx.CombineField"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>separators: array of string inserted</li>"," * </ul>"," */","inputEx.CombineField = function(options) {","   inputEx.CombineField.superclass.constructor.call(this, options);","};","","Y.extend( inputEx.CombineField, inputEx.Group, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.CombineField.superclass.setOptions.call(this, options);","","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-CombineField';","      ","      // Added options","      this.options.separators = options.separators;","   },","	   ","	/**","	 * @method render","	 */","	render: function() {","","      // Create the div wrapper for this group","	   this.divEl = inputEx.cn('div', {className: this.options.className});","	   if(this.options.id) {","   	   this.divEl.id = this.options.id;","   	}","","	   // Label element","	   if (lang.isString(this.options.label)) {","	      this.labelDiv = inputEx.cn('div', {id: this.divEl.id+'-label', className: 'inputEx-label', 'for': this.divEl.id+'-field'});","	      this.labelEl = inputEx.cn('label', null, null, this.options.label === \"\" ? \"&nbsp;\" : this.options.label);","	      this.labelDiv.appendChild(this.labelEl);","	      this.divEl.appendChild(this.labelDiv);","      }","	","  	   this.renderFields(this.divEl);  	  ","","  	   if(this.options.disabled) {","  	      this.disable();","  	   }","		","	   // Insert a float breaker","	   this.divEl.appendChild( inputEx.cn('div', {className: \"inputEx-clear-div\"}, null, \" \") );","	},","	   ","	/**","	 * Render the subfields","	 * @method renderFields","	 */","	renderFields: function(parentEl) {","	    ","	   this.appendSeparator(0);","	   ","	   if(!this.options.fields) {return;}","	   ","	   var i, n=this.options.fields.length, f, field, fieldEl,t;","	   ","	   for(i = 0 ; i < n ; i++) {","	      f = this.options.fields[i];","	      if (this.options.required) {f.required = true;}","	      field = this.renderField(f);","	      fieldEl = field.getEl();","	      t = f.type;","	      if(t != \"group\" && t != \"form\") {","	         // remove the line breaker (<div style='clear: both;'>)","	         field.divEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length-1]);","         }","      	// make the field float left","      	Y.one(fieldEl).setStyle('float', 'left');","   	","      	this.divEl.appendChild(fieldEl);","      	","      	this.appendSeparator(i+1);","	   }","	","		this.setFieldName(this.options.name);","	","	      ","	},","	","	/**","    * Override to force required option on each subfield","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by inputEx()","    */","   renderField: function(fieldOptions) {","      ","      // Subfields should inherit required property","      if (this.options.required) {","         fieldOptions.required = true;","      }","      ","      return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);","   },","	","	/**","	 * @method setFieldName","	 */","	setFieldName: function(name) {","		if(name) {","			for(var i = 0 ; i < this.inputs.length ; i++) {","				var newName = \"\";","				if(this.inputs[i].options.name) {","					newName = name+\"[\"+this.inputs[i].options.name+\"]\";","				}","				else {","					newName = name+\"[\"+i+\"]\";","				}","				this.inputs[i].setFieldName(newName);","			}","		}","	},","	","	/**","	 * Add a separator to the divEl","	 * @method appendSeparator","	 */","	appendSeparator: function(i) {","	   if(this.options.separators && this.options.separators[i]) {","	      var sep = inputEx.cn('div', {className: 'inputEx-CombineField-separator'}, null, this.options.separators[i]);","	      this.divEl.appendChild(sep);","      }","	},","","   /**","    * @method initEvents","    */","   initEvents: function() {","      var me = this,","         blurTimeout;","","      inputEx.CombineField.superclass.initEvents.apply(this, arguments);","","      var divNode = Y.one(this.divEl);","","      // TODO: does it work ?","      divNode.on(\"focusout\", function( e ) {","         // store local copy of the event to use in setTimeout","         e = lang.merge(e);","         blurTimeout = window.setTimeout(function() {","            blurTimeout = null;","            me.onBlur(e);","         }, 25);","      });","","      // TODO: does it work ?","      divNode.on(\"focusin\", function( e ) {","         if (blurTimeout !== null) {","            window.clearTimeout(blurTimeout);","            blurTimeout = null;","         }","         else {","            me.onFocus(e);","         }","      });","   },","","","	   ","	/**","	 * Set the value","	 * @method setValue","	 * @param {Array} values [value1, value2, ...]","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	setValue: function(values, sendUpdatedEvt) {","		if(!values) {","         return;","      }","      var i, n=this.inputs.length;","	   for (i = 0 ; i < n ; i++) {","	      this.inputs[i].setValue(values[i], false);","      }","      ","      this.runFieldsInteractions();","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","	},","	","	/**","	 * Specific getValue","	 * @method getValue ","	 * @return {Array} An array of values [value1, value2, ...]","	 */","	getValue: function() {","	   var values = [], i, n=this.inputs.length;","	   for(i = 0 ; i < n; i++) {","	      values.push(this.inputs[i].getValue());","	   }","	   return values;","	}","	","});","	","// Register this class as \"combine\" type","inputEx.registerType(\"combine\", inputEx.CombineField, [","   { type: 'list', name: 'fields', label: 'Elements', required: true, elementType: {type: 'type'} },","   { type: 'list', name: 'separators', label: 'Separators', required: true }","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-group\"], \"ix_provides\": \"combine\"});"];
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"30":0,"33":0,"36":0,"45":0,"46":0,"47":0,"51":0,"52":0,"53":0,"54":0,"55":0,"58":0,"60":0,"61":0,"65":0,"74":0,"76":0,"78":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"88":0,"91":0,"93":0,"95":0,"98":0,"111":0,"112":0,"115":0,"122":0,"123":0,"124":0,"125":0,"126":0,"129":0,"131":0,"141":0,"142":0,"143":0,"151":0,"154":0,"156":0,"159":0,"161":0,"162":0,"163":0,"164":0,"169":0,"170":0,"171":0,"172":0,"175":0,"189":0,"190":0,"192":0,"193":0,"194":0,"197":0,"199":0,"201":0,"211":0,"212":0,"213":0,"215":0,"221":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].functions = {"CombineField:19":0,"setOptions:29":0,"render:42":0,"renderFields:72":0,"renderField:108":0,"setFieldName:121":0,"appendSeparator:140":0,"(anonymous 3):162":0,"(anonymous 2):159":0,"(anonymous 4):169":0,"initEvents:150":0,"setValue:188":0,"getValue:210":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredLines = 74;
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredFunctions = 14;
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 1);
YUI.add('inputex-combine', function (Y, NAME) {

/**
 * @module inputex-combine
 */
   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;
	
/**
 * A meta field to put N fields on the same line, separated by separators
 * @class inputEx.CombineField
 * @extends inputEx.Group
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>separators: array of string inserted</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 19);
inputEx.CombineField = function(options) {
   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "CombineField", 19);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 20);
inputEx.CombineField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-combine/inputex-combine.js", 23);
Y.extend( inputEx.CombineField, inputEx.Group, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setOptions", 29);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 30);
inputEx.CombineField.superclass.setOptions.call(this, options);

      // Overwrite options
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 33);
this.options.className = options.className ? options.className : 'inputEx-CombineField';
      
      // Added options
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 36);
this.options.separators = options.separators;
   },
	   
	/**
	 * @method render
	 */
	render: function() {

      // Create the div wrapper for this group
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "render", 42);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 45);
this.divEl = inputEx.cn('div', {className: this.options.className});
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 46);
if(this.options.id) {
   	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 47);
this.divEl.id = this.options.id;
   	}

	   // Label element
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 51);
if (lang.isString(this.options.label)) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 52);
this.labelDiv = inputEx.cn('div', {id: this.divEl.id+'-label', className: 'inputEx-label', 'for': this.divEl.id+'-field'});
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 53);
this.labelEl = inputEx.cn('label', null, null, this.options.label === "" ? "&nbsp;" : this.options.label);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 54);
this.labelDiv.appendChild(this.labelEl);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 55);
this.divEl.appendChild(this.labelDiv);
      }
	
  	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 58);
this.renderFields(this.divEl);  	  

  	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 60);
if(this.options.disabled) {
  	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 61);
this.disable();
  	   }
		
	   // Insert a float breaker
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 65);
this.divEl.appendChild( inputEx.cn('div', {className: "inputEx-clear-div"}, null, " ") );
	},
	   
	/**
	 * Render the subfields
	 * @method renderFields
	 */
	renderFields: function(parentEl) {
	    
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderFields", 72);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 74);
this.appendSeparator(0);
	   
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 76);
if(!this.options.fields) {return;}
	   
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 78);
var i, n=this.options.fields.length, f, field, fieldEl,t;
	   
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 80);
for(i = 0 ; i < n ; i++) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 81);
f = this.options.fields[i];
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 82);
if (this.options.required) {f.required = true;}
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 83);
field = this.renderField(f);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 84);
fieldEl = field.getEl();
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 85);
t = f.type;
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 86);
if(t != "group" && t != "form") {
	         // remove the line breaker (<div style='clear: both;'>)
	         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 88);
field.divEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length-1]);
         }
      	// make the field float left
      	_yuitest_coverline("build/inputex-combine/inputex-combine.js", 91);
Y.one(fieldEl).setStyle('float', 'left');
   	
      	_yuitest_coverline("build/inputex-combine/inputex-combine.js", 93);
this.divEl.appendChild(fieldEl);
      	
      	_yuitest_coverline("build/inputex-combine/inputex-combine.js", 95);
this.appendSeparator(i+1);
	   }
	
		_yuitest_coverline("build/inputex-combine/inputex-combine.js", 98);
this.setFieldName(this.options.name);
	
	      
	},
	
	/**
    * Override to force required option on each subfield
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by inputEx()
    */
   renderField: function(fieldOptions) {
      
      // Subfields should inherit required property
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderField", 108);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 111);
if (this.options.required) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 112);
fieldOptions.required = true;
      }
      
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 115);
return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);
   },
	
	/**
	 * @method setFieldName
	 */
	setFieldName: function(name) {
		_yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setFieldName", 121);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 122);
if(name) {
			_yuitest_coverline("build/inputex-combine/inputex-combine.js", 123);
for(var i = 0 ; i < this.inputs.length ; i++) {
				_yuitest_coverline("build/inputex-combine/inputex-combine.js", 124);
var newName = "";
				_yuitest_coverline("build/inputex-combine/inputex-combine.js", 125);
if(this.inputs[i].options.name) {
					_yuitest_coverline("build/inputex-combine/inputex-combine.js", 126);
newName = name+"["+this.inputs[i].options.name+"]";
				}
				else {
					_yuitest_coverline("build/inputex-combine/inputex-combine.js", 129);
newName = name+"["+i+"]";
				}
				_yuitest_coverline("build/inputex-combine/inputex-combine.js", 131);
this.inputs[i].setFieldName(newName);
			}
		}
	},
	
	/**
	 * Add a separator to the divEl
	 * @method appendSeparator
	 */
	appendSeparator: function(i) {
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "appendSeparator", 140);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 141);
if(this.options.separators && this.options.separators[i]) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 142);
var sep = inputEx.cn('div', {className: 'inputEx-CombineField-separator'}, null, this.options.separators[i]);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 143);
this.divEl.appendChild(sep);
      }
	},

   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "initEvents", 150);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 151);
var me = this,
         blurTimeout;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 154);
inputEx.CombineField.superclass.initEvents.apply(this, arguments);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 156);
var divNode = Y.one(this.divEl);

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 159);
divNode.on("focusout", function( e ) {
         // store local copy of the event to use in setTimeout
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 2)", 159);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 161);
e = lang.merge(e);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 162);
blurTimeout = window.setTimeout(function() {
            _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 3)", 162);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 163);
blurTimeout = null;
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 164);
me.onBlur(e);
         }, 25);
      });

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 169);
divNode.on("focusin", function( e ) {
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 4)", 169);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 170);
if (blurTimeout !== null) {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 171);
window.clearTimeout(blurTimeout);
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 172);
blurTimeout = null;
         }
         else {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 175);
me.onFocus(e);
         }
      });
   },


	   
	/**
	 * Set the value
	 * @method setValue
	 * @param {Array} values [value1, value2, ...]
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(values, sendUpdatedEvt) {
		_yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setValue", 188);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 189);
if(!values) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 190);
return;
      }
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 192);
var i, n=this.inputs.length;
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 193);
for (i = 0 ; i < n ; i++) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 194);
this.inputs[i].setValue(values[i], false);
      }
      
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 197);
this.runFieldsInteractions();
      
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 199);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 201);
this.fireUpdatedEvt();
      }
	},
	
	/**
	 * Specific getValue
	 * @method getValue 
	 * @return {Array} An array of values [value1, value2, ...]
	 */
	getValue: function() {
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "getValue", 210);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 211);
var values = [], i, n=this.inputs.length;
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 212);
for(i = 0 ; i < n; i++) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 213);
values.push(this.inputs[i].getValue());
	   }
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 215);
return values;
	}
	
});
	
// Register this class as "combine" type
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 221);
inputEx.registerType("combine", inputEx.CombineField, [
   { type: 'list', name: 'fields', label: 'Elements', required: true, elementType: {type: 'type'} },
   { type: 'list', name: 'separators', label: 'Separators', required: true }
]);


}, '@VERSION@', {"requires": ["inputex-group"], "ix_provides": "combine"});
