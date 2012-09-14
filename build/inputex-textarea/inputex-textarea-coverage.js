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
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-textarea/inputex-textarea.js",
    code: []
};
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].code=["YUI.add('inputex-textarea', function (Y, NAME) {","","/**"," * @module inputex-textarea"," */","   var inputEx = Y.inputEx;","/**"," * Create a textarea input"," * @class inputEx.Textarea"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *	   <li>rows: rows attribute</li>"," *	   <li>cols: cols attribute</li>"," * </ul>"," */","inputEx.Textarea = function(options) {","	inputEx.Textarea.superclass.constructor.call(this,options);","};","Y.extend(inputEx.Textarea, inputEx.StringField, {","","   /**","    * Set the specific options (rows and cols)","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.Textarea.superclass.setOptions.call(this, options);","      this.options.rows = options.rows || 6;","      this.options.cols = options.cols || 23;","      ","      // warning : readonly option doesn't work on IE < 8","      this.options.readonly = !!options.readonly;","   },","   ","   /**","    * Render an 'INPUT' DOM node","    * @method renderComponent","    */","   renderComponent: function() {","      ","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","      ","      // Attributes of the input field","      var attributes = {};","      attributes.id = this.divEl.id ? this.divEl.id+'-field' : Y.guid();","      // firefox bug (reported since year 2000 !): one extra row is always added by browser","		//                                           (see : https://bugzilla.mozilla.org/show_bug.cgi?id=33654)","      attributes.rows = !!Y.UA.gecko ? this.options.rows - 1 : this.options.rows;","      attributes.cols = this.options.cols;","      if(this.options.name) { attributes.name = this.options.name; }","      if(this.options.readonly) { attributes.readonly = 'readonly'; }","      ","      //if(this.options.maxLength) attributes.maxLength = this.options.maxLength;","   ","      // Create the node","      this.el = inputEx.cn('textarea', attributes, null, this.options.value);","      ","      // Append it to the main element","      this.wrapEl.appendChild(this.el);","      this.fieldContainer.appendChild(this.wrapEl);","   },","   ","	/**","    * Uses the optional regexp to validate the field value","    * @method validate","    */","   validate: function() { ","      var previous = inputEx.Textarea.superclass.validate.call(this);","      ","      // emulate maxLength property for textarea","      //   -> user can still type but field is invalid","      if (this.options.maxLength) {","         previous = previous && this.getValue().length <= this.options.maxLength;","      }","      ","      return previous;","   },","   ","   /**","    * Add the minLength string message handling","    * @method getStateString","    */","    getStateString: function(state) {","	   if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {  ","	      return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1];","	   ","	   // Add message too long","      } else if (state == inputEx.stateInvalid && this.options.maxLength && this.el.value.length > this.options.maxLength) {","         return inputEx.messages.stringTooLong[0]+this.options.maxLength+inputEx.messages.stringTooLong[1];","      }","	   return inputEx.Textarea.superclass.getStateString.call(this, state);","	},","	","	","	/**","	 * Insert text at the current cursor position","	 * @method insert","	 * @param {String} text Text to insert","	 */","	insert: function(text) {","		","		var sel, startPos, endPos;","		","		//IE support","		if (document.selection) {","			this.el.focus();","			sel = document.selection.createRange();","			sel.text = text;","		}","		//Mozilla/Firefox/Netscape 7+ support","		else if (this.el.selectionStart || this.el.selectionStart == '0') {","			startPos = this.el.selectionStart;","			endPos = this.el.selectionEnd;","			this.el.value = this.el.value.substring(0, startPos)+ text+ this.el.value.substring(endPos, this.el.value.length);","		} ","		else {","			this.el.value += text;","		}	","	}","","});","","// Register this class as \"text\" type","inputEx.registerType(\"text\", inputEx.Textarea, [","   { type: 'integer', label: 'Rows',  name: 'rows', value: 6 },","   { type: 'integer', label: 'Cols', name: 'cols', value: 23 }","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\"], \"ix_provides\": \"text\"});"];
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].lines = {"1":0,"6":0,"18":0,"19":0,"21":0,"29":0,"30":0,"31":0,"34":0,"44":0,"47":0,"48":0,"51":0,"52":0,"53":0,"54":0,"59":0,"62":0,"63":0,"71":0,"75":0,"76":0,"79":0,"87":0,"88":0,"91":0,"92":0,"94":0,"105":0,"108":0,"109":0,"110":0,"111":0,"114":0,"115":0,"116":0,"117":0,"120":0,"127":0};
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].functions = {"Textarea:18":0,"setOptions:28":0,"renderComponent:41":0,"validate:70":0,"getStateString:86":0,"insert:103":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].coveredLines = 39;
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 1);
YUI.add('inputex-textarea', function (Y, NAME) {

/**
 * @module inputex-textarea
 */
   _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 6);
var inputEx = Y.inputEx;
/**
 * Create a textarea input
 * @class inputEx.Textarea
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *	   <li>rows: rows attribute</li>
 *	   <li>cols: cols attribute</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 18);
inputEx.Textarea = function(options) {
	_yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "Textarea", 18);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 19);
inputEx.Textarea.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 21);
Y.extend(inputEx.Textarea, inputEx.StringField, {

   /**
    * Set the specific options (rows and cols)
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "setOptions", 28);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 29);
inputEx.Textarea.superclass.setOptions.call(this, options);
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 30);
this.options.rows = options.rows || 6;
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 31);
this.options.cols = options.cols || 23;
      
      // warning : readonly option doesn't work on IE < 8
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 34);
this.options.readonly = !!options.readonly;
   },
   
   /**
    * Render an 'INPUT' DOM node
    * @method renderComponent
    */
   renderComponent: function() {
      
      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "renderComponent", 41);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 44);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});
      
      // Attributes of the input field
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 47);
var attributes = {};
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 48);
attributes.id = this.divEl.id ? this.divEl.id+'-field' : Y.guid();
      // firefox bug (reported since year 2000 !): one extra row is always added by browser
		//                                           (see : https://bugzilla.mozilla.org/show_bug.cgi?id=33654)
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 51);
attributes.rows = !!Y.UA.gecko ? this.options.rows - 1 : this.options.rows;
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 52);
attributes.cols = this.options.cols;
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 53);
if(this.options.name) { attributes.name = this.options.name; }
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 54);
if(this.options.readonly) { attributes.readonly = 'readonly'; }
      
      //if(this.options.maxLength) attributes.maxLength = this.options.maxLength;
   
      // Create the node
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 59);
this.el = inputEx.cn('textarea', attributes, null, this.options.value);
      
      // Append it to the main element
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 62);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 63);
this.fieldContainer.appendChild(this.wrapEl);
   },
   
	/**
    * Uses the optional regexp to validate the field value
    * @method validate
    */
   validate: function() { 
      _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "validate", 70);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 71);
var previous = inputEx.Textarea.superclass.validate.call(this);
      
      // emulate maxLength property for textarea
      //   -> user can still type but field is invalid
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 75);
if (this.options.maxLength) {
         _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 76);
previous = previous && this.getValue().length <= this.options.maxLength;
      }
      
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 79);
return previous;
   },
   
   /**
    * Add the minLength string message handling
    * @method getStateString
    */
    getStateString: function(state) {
	   _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "getStateString", 86);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 87);
if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {  
	      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 88);
return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1];
	   
	   // Add message too long
      } else {_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 91);
if (state == inputEx.stateInvalid && this.options.maxLength && this.el.value.length > this.options.maxLength) {
         _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 92);
return inputEx.messages.stringTooLong[0]+this.options.maxLength+inputEx.messages.stringTooLong[1];
      }}
	   _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 94);
return inputEx.Textarea.superclass.getStateString.call(this, state);
	},
	
	
	/**
	 * Insert text at the current cursor position
	 * @method insert
	 * @param {String} text Text to insert
	 */
	insert: function(text) {
		
		_yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "insert", 103);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 105);
var sel, startPos, endPos;
		
		//IE support
		_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 108);
if (document.selection) {
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 109);
this.el.focus();
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 110);
sel = document.selection.createRange();
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 111);
sel.text = text;
		}
		//Mozilla/Firefox/Netscape 7+ support
		else {_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 114);
if (this.el.selectionStart || this.el.selectionStart == '0') {
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 115);
startPos = this.el.selectionStart;
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 116);
endPos = this.el.selectionEnd;
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 117);
this.el.value = this.el.value.substring(0, startPos)+ text+ this.el.value.substring(endPos, this.el.value.length);
		} 
		else {
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 120);
this.el.value += text;
		}}	
	}

});

// Register this class as "text" type
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 127);
inputEx.registerType("text", inputEx.Textarea, [
   { type: 'integer', label: 'Rows',  name: 'rows', value: 6 },
   { type: 'integer', label: 'Cols', name: 'cols', value: 23 }
]);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "text"});
