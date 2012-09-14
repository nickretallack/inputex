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
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].code=["YUI.add('inputex-textarea', function (Y, NAME) {","","/**"," * @module inputex-textarea"," */","YUI.add(\"inputex-textarea\",function(Y){","","   var inputEx = Y.inputEx;","/**"," * Create a textarea input"," * @class inputEx.Textarea"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *	   <li>rows: rows attribute</li>"," *	   <li>cols: cols attribute</li>"," * </ul>"," */","inputEx.Textarea = function(options) {","	inputEx.Textarea.superclass.constructor.call(this,options);","};","Y.extend(inputEx.Textarea, inputEx.StringField, {","","   /**","    * Set the specific options (rows and cols)","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.Textarea.superclass.setOptions.call(this, options);","      this.options.rows = options.rows || 6;","      this.options.cols = options.cols || 23;","      ","      // warning : readonly option doesn't work on IE < 8","      this.options.readonly = !!options.readonly;","   },","   ","   /**","    * Render an 'INPUT' DOM node","    * @method renderComponent","    */","   renderComponent: function() {","      ","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","      ","      // Attributes of the input field","      var attributes = {};","      attributes.id = this.divEl.id ? this.divEl.id+'-field' : Y.guid();","      // firefox bug (reported since year 2000 !): one extra row is always added by browser","		//                                           (see : https://bugzilla.mozilla.org/show_bug.cgi?id=33654)","      attributes.rows = !!Y.UA.gecko ? this.options.rows - 1 : this.options.rows;","      attributes.cols = this.options.cols;","      if(this.options.name) { attributes.name = this.options.name; }","      if(this.options.readonly) { attributes.readonly = 'readonly'; }","      ","      //if(this.options.maxLength) attributes.maxLength = this.options.maxLength;","   ","      // Create the node","      this.el = inputEx.cn('textarea', attributes, null, this.options.value);","      ","      // Append it to the main element","      this.wrapEl.appendChild(this.el);","      this.fieldContainer.appendChild(this.wrapEl);","   },","   ","	/**","    * Uses the optional regexp to validate the field value","    * @method validate","    */","   validate: function() { ","      var previous = inputEx.Textarea.superclass.validate.call(this);","      ","      // emulate maxLength property for textarea","      //   -> user can still type but field is invalid","      if (this.options.maxLength) {","         previous = previous && this.getValue().length <= this.options.maxLength;","      }","      ","      return previous;","   },","   ","   /**","    * Add the minLength string message handling","    * @method getStateString","    */","    getStateString: function(state) {","	   if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {  ","	      return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1];","	   ","	   // Add message too long","      } else if (state == inputEx.stateInvalid && this.options.maxLength && this.el.value.length > this.options.maxLength) {","         return inputEx.messages.stringTooLong[0]+this.options.maxLength+inputEx.messages.stringTooLong[1];","      }","	   return inputEx.Textarea.superclass.getStateString.call(this, state);","	},","	","	","	/**","	 * Insert text at the current cursor position","	 * @method insert","	 * @param {String} text Text to insert","	 */","	insert: function(text) {","		","		var sel, startPos, endPos;","		","		//IE support","		if (document.selection) {","			this.el.focus();","			sel = document.selection.createRange();","			sel.text = text;","		}","		//Mozilla/Firefox/Netscape 7+ support","		else if (this.el.selectionStart || this.el.selectionStart == '0') {","			startPos = this.el.selectionStart;","			endPos = this.el.selectionEnd;","			this.el.value = this.el.value.substring(0, startPos)+ text+ this.el.value.substring(endPos, this.el.value.length);","		} ","		else {","			this.el.value += text;","		}	","	}","","});","","// Register this class as \"text\" type","inputEx.registerType(\"text\", inputEx.Textarea, [","   { type: 'integer', label: 'Rows',  name: 'rows', value: 6 },","   { type: 'integer', label: 'Cols', name: 'cols', value: 23 }","]);","","}, '3.1.0',{","  requires: [\"inputex-string\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].lines = {"1":0,"6":0,"8":0,"20":0,"21":0,"23":0,"31":0,"32":0,"33":0,"36":0,"46":0,"49":0,"50":0,"53":0,"54":0,"55":0,"56":0,"61":0,"64":0,"65":0,"73":0,"77":0,"78":0,"81":0,"89":0,"90":0,"93":0,"94":0,"96":0,"107":0,"110":0,"111":0,"112":0,"113":0,"116":0,"117":0,"118":0,"119":0,"122":0,"129":0};
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].functions = {"Textarea:20":0,"setOptions:30":0,"renderComponent:43":0,"validate:72":0,"getStateString:88":0,"insert:105":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].coveredLines = 40;
_yuitest_coverage["build/inputex-textarea/inputex-textarea.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 1);
YUI.add('inputex-textarea', function (Y, NAME) {

/**
 * @module inputex-textarea
 */
_yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 6);
YUI.add("inputex-textarea",function(Y){

   _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 8);
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
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 20);
inputEx.Textarea = function(options) {
	_yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "Textarea", 20);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 21);
inputEx.Textarea.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 23);
Y.extend(inputEx.Textarea, inputEx.StringField, {

   /**
    * Set the specific options (rows and cols)
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "setOptions", 30);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 31);
inputEx.Textarea.superclass.setOptions.call(this, options);
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 32);
this.options.rows = options.rows || 6;
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 33);
this.options.cols = options.cols || 23;
      
      // warning : readonly option doesn't work on IE < 8
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 36);
this.options.readonly = !!options.readonly;
   },
   
   /**
    * Render an 'INPUT' DOM node
    * @method renderComponent
    */
   renderComponent: function() {
      
      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "renderComponent", 43);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 46);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});
      
      // Attributes of the input field
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 49);
var attributes = {};
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 50);
attributes.id = this.divEl.id ? this.divEl.id+'-field' : Y.guid();
      // firefox bug (reported since year 2000 !): one extra row is always added by browser
		//                                           (see : https://bugzilla.mozilla.org/show_bug.cgi?id=33654)
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 53);
attributes.rows = !!Y.UA.gecko ? this.options.rows - 1 : this.options.rows;
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 54);
attributes.cols = this.options.cols;
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 55);
if(this.options.name) { attributes.name = this.options.name; }
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 56);
if(this.options.readonly) { attributes.readonly = 'readonly'; }
      
      //if(this.options.maxLength) attributes.maxLength = this.options.maxLength;
   
      // Create the node
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 61);
this.el = inputEx.cn('textarea', attributes, null, this.options.value);
      
      // Append it to the main element
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 64);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 65);
this.fieldContainer.appendChild(this.wrapEl);
   },
   
	/**
    * Uses the optional regexp to validate the field value
    * @method validate
    */
   validate: function() { 
      _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "validate", 72);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 73);
var previous = inputEx.Textarea.superclass.validate.call(this);
      
      // emulate maxLength property for textarea
      //   -> user can still type but field is invalid
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 77);
if (this.options.maxLength) {
         _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 78);
previous = previous && this.getValue().length <= this.options.maxLength;
      }
      
      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 81);
return previous;
   },
   
   /**
    * Add the minLength string message handling
    * @method getStateString
    */
    getStateString: function(state) {
	   _yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "getStateString", 88);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 89);
if(state == inputEx.stateInvalid && this.options.minLength && this.el.value.length < this.options.minLength) {  
	      _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 90);
return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1];
	   
	   // Add message too long
      } else {_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 93);
if (state == inputEx.stateInvalid && this.options.maxLength && this.el.value.length > this.options.maxLength) {
         _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 94);
return inputEx.messages.stringTooLong[0]+this.options.maxLength+inputEx.messages.stringTooLong[1];
      }}
	   _yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 96);
return inputEx.Textarea.superclass.getStateString.call(this, state);
	},
	
	
	/**
	 * Insert text at the current cursor position
	 * @method insert
	 * @param {String} text Text to insert
	 */
	insert: function(text) {
		
		_yuitest_coverfunc("build/inputex-textarea/inputex-textarea.js", "insert", 105);
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 107);
var sel, startPos, endPos;
		
		//IE support
		_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 110);
if (document.selection) {
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 111);
this.el.focus();
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 112);
sel = document.selection.createRange();
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 113);
sel.text = text;
		}
		//Mozilla/Firefox/Netscape 7+ support
		else {_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 116);
if (this.el.selectionStart || this.el.selectionStart == '0') {
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 117);
startPos = this.el.selectionStart;
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 118);
endPos = this.el.selectionEnd;
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 119);
this.el.value = this.el.value.substring(0, startPos)+ text+ this.el.value.substring(endPos, this.el.value.length);
		} 
		else {
			_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 122);
this.el.value += text;
		}}	
	}

});

// Register this class as "text" type
_yuitest_coverline("build/inputex-textarea/inputex-textarea.js", 129);
inputEx.registerType("text", inputEx.Textarea, [
   { type: 'integer', label: 'Rows',  name: 'rows', value: 6 },
   { type: 'integer', label: 'Cols', name: 'cols', value: 23 }
]);

}, '3.1.0',{
  requires: ["inputex-string"]
});


}, '@VERSION@');
