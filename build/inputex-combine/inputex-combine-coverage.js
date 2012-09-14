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
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].code=["YUI.add('inputex-combine', function (Y, NAME) {","","/**"," * @module inputex-combine"," */","YUI.add(\"inputex-combine\", function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","	","/**"," * A meta field to put N fields on the same line, separated by separators"," * @class inputEx.CombineField"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>separators: array of string inserted</li>"," * </ul>"," */","inputEx.CombineField = function(options) {","   inputEx.CombineField.superclass.constructor.call(this, options);","};","","Y.extend( inputEx.CombineField, inputEx.Group, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.CombineField.superclass.setOptions.call(this, options);","","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-CombineField';","      ","      // Added options","      this.options.separators = options.separators;","   },","	   ","	/**","	 * @method render","	 */","	render: function() {","","      // Create the div wrapper for this group","	   this.divEl = inputEx.cn('div', {className: this.options.className});","	   if(this.options.id) {","   	   this.divEl.id = this.options.id;","   	}","","	   // Label element","	   if (lang.isString(this.options.label)) {","	      this.labelDiv = inputEx.cn('div', {id: this.divEl.id+'-label', className: 'inputEx-label', 'for': this.divEl.id+'-field'});","	      this.labelEl = inputEx.cn('label', null, null, this.options.label === \"\" ? \"&nbsp;\" : this.options.label);","	      this.labelDiv.appendChild(this.labelEl);","	      this.divEl.appendChild(this.labelDiv);","      }","	","  	   this.renderFields(this.divEl);  	  ","","  	   if(this.options.disabled) {","  	      this.disable();","  	   }","		","	   // Insert a float breaker","	   this.divEl.appendChild( inputEx.cn('div', {className: \"inputEx-clear-div\"}, null, \" \") );","	},","	   ","	/**","	 * Render the subfields","	 * @method renderFields","	 */","	renderFields: function(parentEl) {","	    ","	   this.appendSeparator(0);","	   ","	   if(!this.options.fields) {return;}","	   ","	   var i, n=this.options.fields.length, f, field, fieldEl,t;","	   ","	   for(i = 0 ; i < n ; i++) {","	      f = this.options.fields[i];","	      if (this.options.required) {f.required = true;}","	      field = this.renderField(f);","	      fieldEl = field.getEl();","	      t = f.type;","	      if(t != \"group\" && t != \"form\") {","	         // remove the line breaker (<div style='clear: both;'>)","	         field.divEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length-1]);","         }","      	// make the field float left","      	Y.one(fieldEl).setStyle('float', 'left');","   	","      	this.divEl.appendChild(fieldEl);","      	","      	this.appendSeparator(i+1);","	   }","	","		this.setFieldName(this.options.name);","	","	      ","	},","	","	/**","    * Override to force required option on each subfield","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by inputEx()","    */","   renderField: function(fieldOptions) {","      ","      // Subfields should inherit required property","      if (this.options.required) {","         fieldOptions.required = true;","      }","      ","      return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);","   },","	","	/**","	 * @method setFieldName","	 */","	setFieldName: function(name) {","		if(name) {","			for(var i = 0 ; i < this.inputs.length ; i++) {","				var newName = \"\";","				if(this.inputs[i].options.name) {","					newName = name+\"[\"+this.inputs[i].options.name+\"]\";","				}","				else {","					newName = name+\"[\"+i+\"]\";","				}","				this.inputs[i].setFieldName(newName);","			}","		}","	},","	","	/**","	 * Add a separator to the divEl","	 * @method appendSeparator","	 */","	appendSeparator: function(i) {","	   if(this.options.separators && this.options.separators[i]) {","	      var sep = inputEx.cn('div', {className: 'inputEx-CombineField-separator'}, null, this.options.separators[i]);","	      this.divEl.appendChild(sep);","      }","	},","","   /**","    * @method initEvents","    */","   initEvents: function() {","      var me = this,","         blurTimeout;","","      inputEx.CombineField.superclass.initEvents.apply(this, arguments);","","      var divNode = Y.one(this.divEl);","","      // TODO: does it work ?","      divNode.on(\"focusout\", function( e ) {","         // store local copy of the event to use in setTimeout","         e = lang.merge(e);","         blurTimeout = window.setTimeout(function() {","            blurTimeout = null;","            me.onBlur(e);","         }, 25);","      });","","      // TODO: does it work ?","      divNode.on(\"focusin\", function( e ) {","         if (blurTimeout !== null) {","            window.clearTimeout(blurTimeout);","            blurTimeout = null;","         }","         else {","            me.onFocus(e);","         }","      });","   },","","","	   ","	/**","	 * Set the value","	 * @method setValue","	 * @param {Array} values [value1, value2, ...]","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	setValue: function(values, sendUpdatedEvt) {","		if(!values) {","         return;","      }","      var i, n=this.inputs.length;","	   for (i = 0 ; i < n ; i++) {","	      this.inputs[i].setValue(values[i], false);","      }","      ","      this.runFieldsInteractions();","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","	},","	","	/**","	 * Specific getValue","	 * @method getValue ","	 * @return {Array} An array of values [value1, value2, ...]","	 */","	getValue: function() {","	   var values = [], i, n=this.inputs.length;","	   for(i = 0 ; i < n; i++) {","	      values.push(this.inputs[i].getValue());","	   }","	   return values;","	}","	","});","	","// Register this class as \"combine\" type","inputEx.registerType(\"combine\", inputEx.CombineField, [","   { type: 'list', name: 'fields', label: 'Elements', required: true, elementType: {type: 'type'} },","   { type: 'list', name: 'separators', label: 'Separators', required: true }","]);","	","	","}, '3.1.0',{","  requires: ['inputex-group']","});","   ","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"25":0,"32":0,"35":0,"38":0,"47":0,"48":0,"49":0,"53":0,"54":0,"55":0,"56":0,"57":0,"60":0,"62":0,"63":0,"67":0,"76":0,"78":0,"80":0,"82":0,"83":0,"84":0,"85":0,"86":0,"87":0,"88":0,"90":0,"93":0,"95":0,"97":0,"100":0,"113":0,"114":0,"117":0,"124":0,"125":0,"126":0,"127":0,"128":0,"131":0,"133":0,"143":0,"144":0,"145":0,"153":0,"156":0,"158":0,"161":0,"163":0,"164":0,"165":0,"166":0,"171":0,"172":0,"173":0,"174":0,"177":0,"191":0,"192":0,"194":0,"195":0,"196":0,"199":0,"201":0,"203":0,"213":0,"214":0,"215":0,"217":0,"223":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].functions = {"CombineField:21":0,"setOptions:31":0,"render:44":0,"renderFields:74":0,"renderField:110":0,"setFieldName:123":0,"appendSeparator:142":0,"(anonymous 4):164":0,"(anonymous 3):161":0,"(anonymous 5):171":0,"initEvents:152":0,"setValue:190":0,"getValue:212":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredLines = 75;
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredFunctions = 15;
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 1);
YUI.add('inputex-combine', function (Y, NAME) {

/**
 * @module inputex-combine
 */
_yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 6);
YUI.add("inputex-combine", function(Y){

   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 8);
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
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 21);
inputEx.CombineField = function(options) {
   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "CombineField", 21);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 22);
inputEx.CombineField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-combine/inputex-combine.js", 25);
Y.extend( inputEx.CombineField, inputEx.Group, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setOptions", 31);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 32);
inputEx.CombineField.superclass.setOptions.call(this, options);

      // Overwrite options
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 35);
this.options.className = options.className ? options.className : 'inputEx-CombineField';
      
      // Added options
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 38);
this.options.separators = options.separators;
   },
	   
	/**
	 * @method render
	 */
	render: function() {

      // Create the div wrapper for this group
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "render", 44);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 47);
this.divEl = inputEx.cn('div', {className: this.options.className});
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 48);
if(this.options.id) {
   	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 49);
this.divEl.id = this.options.id;
   	}

	   // Label element
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 53);
if (lang.isString(this.options.label)) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 54);
this.labelDiv = inputEx.cn('div', {id: this.divEl.id+'-label', className: 'inputEx-label', 'for': this.divEl.id+'-field'});
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 55);
this.labelEl = inputEx.cn('label', null, null, this.options.label === "" ? "&nbsp;" : this.options.label);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 56);
this.labelDiv.appendChild(this.labelEl);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 57);
this.divEl.appendChild(this.labelDiv);
      }
	
  	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 60);
this.renderFields(this.divEl);  	  

  	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 62);
if(this.options.disabled) {
  	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 63);
this.disable();
  	   }
		
	   // Insert a float breaker
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 67);
this.divEl.appendChild( inputEx.cn('div', {className: "inputEx-clear-div"}, null, " ") );
	},
	   
	/**
	 * Render the subfields
	 * @method renderFields
	 */
	renderFields: function(parentEl) {
	    
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderFields", 74);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 76);
this.appendSeparator(0);
	   
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 78);
if(!this.options.fields) {return;}
	   
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 80);
var i, n=this.options.fields.length, f, field, fieldEl,t;
	   
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 82);
for(i = 0 ; i < n ; i++) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 83);
f = this.options.fields[i];
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 84);
if (this.options.required) {f.required = true;}
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 85);
field = this.renderField(f);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 86);
fieldEl = field.getEl();
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 87);
t = f.type;
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 88);
if(t != "group" && t != "form") {
	         // remove the line breaker (<div style='clear: both;'>)
	         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 90);
field.divEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length-1]);
         }
      	// make the field float left
      	_yuitest_coverline("build/inputex-combine/inputex-combine.js", 93);
Y.one(fieldEl).setStyle('float', 'left');
   	
      	_yuitest_coverline("build/inputex-combine/inputex-combine.js", 95);
this.divEl.appendChild(fieldEl);
      	
      	_yuitest_coverline("build/inputex-combine/inputex-combine.js", 97);
this.appendSeparator(i+1);
	   }
	
		_yuitest_coverline("build/inputex-combine/inputex-combine.js", 100);
this.setFieldName(this.options.name);
	
	      
	},
	
	/**
    * Override to force required option on each subfield
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by inputEx()
    */
   renderField: function(fieldOptions) {
      
      // Subfields should inherit required property
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderField", 110);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 113);
if (this.options.required) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 114);
fieldOptions.required = true;
      }
      
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 117);
return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);
   },
	
	/**
	 * @method setFieldName
	 */
	setFieldName: function(name) {
		_yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setFieldName", 123);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 124);
if(name) {
			_yuitest_coverline("build/inputex-combine/inputex-combine.js", 125);
for(var i = 0 ; i < this.inputs.length ; i++) {
				_yuitest_coverline("build/inputex-combine/inputex-combine.js", 126);
var newName = "";
				_yuitest_coverline("build/inputex-combine/inputex-combine.js", 127);
if(this.inputs[i].options.name) {
					_yuitest_coverline("build/inputex-combine/inputex-combine.js", 128);
newName = name+"["+this.inputs[i].options.name+"]";
				}
				else {
					_yuitest_coverline("build/inputex-combine/inputex-combine.js", 131);
newName = name+"["+i+"]";
				}
				_yuitest_coverline("build/inputex-combine/inputex-combine.js", 133);
this.inputs[i].setFieldName(newName);
			}
		}
	},
	
	/**
	 * Add a separator to the divEl
	 * @method appendSeparator
	 */
	appendSeparator: function(i) {
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "appendSeparator", 142);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 143);
if(this.options.separators && this.options.separators[i]) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 144);
var sep = inputEx.cn('div', {className: 'inputEx-CombineField-separator'}, null, this.options.separators[i]);
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 145);
this.divEl.appendChild(sep);
      }
	},

   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "initEvents", 152);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 153);
var me = this,
         blurTimeout;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 156);
inputEx.CombineField.superclass.initEvents.apply(this, arguments);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 158);
var divNode = Y.one(this.divEl);

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 161);
divNode.on("focusout", function( e ) {
         // store local copy of the event to use in setTimeout
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 3)", 161);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 163);
e = lang.merge(e);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 164);
blurTimeout = window.setTimeout(function() {
            _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 4)", 164);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 165);
blurTimeout = null;
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 166);
me.onBlur(e);
         }, 25);
      });

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 171);
divNode.on("focusin", function( e ) {
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 5)", 171);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 172);
if (blurTimeout !== null) {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 173);
window.clearTimeout(blurTimeout);
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 174);
blurTimeout = null;
         }
         else {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 177);
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
		_yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setValue", 190);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 191);
if(!values) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 192);
return;
      }
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 194);
var i, n=this.inputs.length;
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 195);
for (i = 0 ; i < n ; i++) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 196);
this.inputs[i].setValue(values[i], false);
      }
      
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 199);
this.runFieldsInteractions();
      
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 201);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 203);
this.fireUpdatedEvt();
      }
	},
	
	/**
	 * Specific getValue
	 * @method getValue 
	 * @return {Array} An array of values [value1, value2, ...]
	 */
	getValue: function() {
	   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "getValue", 212);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 213);
var values = [], i, n=this.inputs.length;
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 214);
for(i = 0 ; i < n; i++) {
	      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 215);
values.push(this.inputs[i].getValue());
	   }
	   _yuitest_coverline("build/inputex-combine/inputex-combine.js", 217);
return values;
	}
	
});
	
// Register this class as "combine" type
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 223);
inputEx.registerType("combine", inputEx.CombineField, [
   { type: 'list', name: 'fields', label: 'Elements', required: true, elementType: {type: 'type'} },
   { type: 'list', name: 'separators', label: 'Separators', required: true }
]);
	
	
}, '3.1.0',{
  requires: ['inputex-group']
});
   

}, '@VERSION@');
