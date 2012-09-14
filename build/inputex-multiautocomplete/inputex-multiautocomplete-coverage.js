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
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-multiautocomplete/inputex-multiautocomplete.js",
    code: []
};
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].code=["YUI.add('inputex-multiautocomplete', function (Y, NAME) {","","/**"," * @module inputex-multiautocomplete"," */","YUI.add(\"inputex-multiautocomplete\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a multi autocomplete field"," * @class inputEx.MultiAutoComplete"," * @extends inputEx.AutoComplete"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," * </ul>"," */","inputEx.MultiAutoComplete = function(options) {","   inputEx.MultiAutoComplete.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.MultiAutoComplete, inputEx.AutoComplete, {","   ","   /**","    * Build the DDList","    * @method renderComponent","    */","   renderComponent: function() {","      inputEx.MultiAutoComplete.superclass.renderComponent.call(this);","      ","      this.ddlist = new inputEx.DDListField({parentEl: this.fieldContainer});","      this.ddlist.on(\"itemRemoved\",function() {","         this.setClassFromState();","         this.fireUpdatedEvt();","      }, this);","      this.ddlist.on(\"updated\", this.fireUpdatedEvt, this);","   },  ","   ","   /**","    * Additional options","    * @method setOptions","    */","   setOptions: function(options) {","      inputEx.MultiAutoComplete.superclass.setOptions.call(this, options);","      ","      // Method to format the ddlist item labels","      this.options.returnLabel = options.returnLabel;","   },","","   /**","    * Handle item selection in the autocompleter to add it to the list","    * @method itemSelectHandler","    */","   itemSelectHandler: function(v) {","      v.halt();","      ","      var aData = v.result;","      var value = lang.isFunction(this.options.returnValue) ? this.options.returnValue(aData) : aData.raw;","      var label = lang.isFunction(this.options.returnLabel) ? this.options.returnLabel(aData) : value;","      this.ddlist.addItem({label: label, value: value});","      this.el.value = \"\";","      this.hiddenEl.value = this.stringifyValue();","      this.fireUpdatedEvt();","      this.onChange();","      this.yEl.ac.hide();","   },","   ","   /**","    * Set the value","    * @method setValue","    * @param {String} value The value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","      this.ddlist.setValue(value);","      ","      // set corresponding style","      this.setClassFromState();","      ","      if(sendUpdatedEvt !== false) {","         // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   /**","    * Return the value","    * @method getValue","    * @return {Any} an array of selected values","    */","   getValue: function() {","      return this.ddlist.getValue();","   },","   ","   /**","    * Return (stateEmpty|stateRequired) if the value equals the typeInvite attribute","    * @method getState","    */","   getState: function() { ","      var val = this.getValue();","      ","      // if nothing in the list","      if( val.length === 0) {","         return this.options.required ? inputEx.stateRequired : inputEx.stateEmpty;","      }","      ","      return this.validate() ? inputEx.stateValid : inputEx.stateInvalid;","   },","   ","   /**","    * TODO : how to validate ?","    * @method validate","    */","   validate: function() { ","      return true;","   },","   ","   /**","    * onChange event handler","    * @method onChange","    * @param {Event} e The original 'change' event","    */","    onChange: function(e) {","       if (this.hiddenEl.value != this.stringifyValue()){ ","          this.hiddenEl.value = this.stringifyValue();","       }","       // erase inherited version, so don't trash previous value if input is empty","    },","    ","    /**","     * @method onBlur","     */","    onBlur : function(){","       this.el.value = '';","       if(this.el.value === '' && this.options.typeInvite) {","          Dom.addClass(this.divEl, \"inputEx-typeInvite\");","          if (this.el.value === '') this.el.value = this.options.typeInvite;","       }","    },","    ","    /**","     * @method stringifyValue","     */","    stringifyValue: function(){","       return Y.JSON.stringify(this.getValue());","    }","   ","});","","// Register this class as \"multiautocomplete\" type","inputEx.registerType(\"multiautocomplete\", inputEx.MultiAutoComplete);","","},'3.1.0',{","  requires:['inputex-autocomplete','json','inputex-ddlist']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].lines = {"1":0,"6":0,"8":0,"20":0,"21":0,"24":0,"31":0,"33":0,"34":0,"35":0,"36":0,"38":0,"46":0,"49":0,"57":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"77":0,"80":0,"82":0,"84":0,"94":0,"102":0,"105":0,"106":0,"109":0,"117":0,"126":0,"127":0,"136":0,"137":0,"138":0,"139":0,"147":0,"153":0};
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].functions = {"MultiAutoComplete:20":0,"(anonymous 3):34":0,"renderComponent:30":0,"setOptions:45":0,"itemSelectHandler:56":0,"setValue:76":0,"getValue:93":0,"getState:101":0,"validate:116":0,"onChange:125":0,"onBlur:135":0,"stringifyValue:146":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].coveredLines = 42;
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].coveredFunctions = 14;
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 1);
YUI.add('inputex-multiautocomplete', function (Y, NAME) {

/**
 * @module inputex-multiautocomplete
 */
_yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 6);
YUI.add("inputex-multiautocomplete",function(Y){

   _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Create a multi autocomplete field
 * @class inputEx.MultiAutoComplete
 * @extends inputEx.AutoComplete
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 * </ul>
 */
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 20);
inputEx.MultiAutoComplete = function(options) {
   _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "MultiAutoComplete", 20);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 21);
inputEx.MultiAutoComplete.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 24);
Y.extend(inputEx.MultiAutoComplete, inputEx.AutoComplete, {
   
   /**
    * Build the DDList
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "renderComponent", 30);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 31);
inputEx.MultiAutoComplete.superclass.renderComponent.call(this);
      
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 33);
this.ddlist = new inputEx.DDListField({parentEl: this.fieldContainer});
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 34);
this.ddlist.on("itemRemoved",function() {
         _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "(anonymous 3)", 34);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 35);
this.setClassFromState();
         _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 36);
this.fireUpdatedEvt();
      }, this);
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 38);
this.ddlist.on("updated", this.fireUpdatedEvt, this);
   },  
   
   /**
    * Additional options
    * @method setOptions
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "setOptions", 45);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 46);
inputEx.MultiAutoComplete.superclass.setOptions.call(this, options);
      
      // Method to format the ddlist item labels
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 49);
this.options.returnLabel = options.returnLabel;
   },

   /**
    * Handle item selection in the autocompleter to add it to the list
    * @method itemSelectHandler
    */
   itemSelectHandler: function(v) {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "itemSelectHandler", 56);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 57);
v.halt();
      
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 59);
var aData = v.result;
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 60);
var value = lang.isFunction(this.options.returnValue) ? this.options.returnValue(aData) : aData.raw;
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 61);
var label = lang.isFunction(this.options.returnLabel) ? this.options.returnLabel(aData) : value;
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 62);
this.ddlist.addItem({label: label, value: value});
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 63);
this.el.value = "";
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 64);
this.hiddenEl.value = this.stringifyValue();
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 65);
this.fireUpdatedEvt();
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 66);
this.onChange();
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 67);
this.yEl.ac.hide();
   },
   
   /**
    * Set the value
    * @method setValue
    * @param {String} value The value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "setValue", 76);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 77);
this.ddlist.setValue(value);
      
      // set corresponding style
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 80);
this.setClassFromState();
      
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 82);
if(sendUpdatedEvt !== false) {
         // fire update event
         _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 84);
this.fireUpdatedEvt();
      }
   },
   
   /**
    * Return the value
    * @method getValue
    * @return {Any} an array of selected values
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "getValue", 93);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 94);
return this.ddlist.getValue();
   },
   
   /**
    * Return (stateEmpty|stateRequired) if the value equals the typeInvite attribute
    * @method getState
    */
   getState: function() { 
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "getState", 101);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 102);
var val = this.getValue();
      
      // if nothing in the list
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 105);
if( val.length === 0) {
         _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 106);
return this.options.required ? inputEx.stateRequired : inputEx.stateEmpty;
      }
      
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 109);
return this.validate() ? inputEx.stateValid : inputEx.stateInvalid;
   },
   
   /**
    * TODO : how to validate ?
    * @method validate
    */
   validate: function() { 
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "validate", 116);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 117);
return true;
   },
   
   /**
    * onChange event handler
    * @method onChange
    * @param {Event} e The original 'change' event
    */
    onChange: function(e) {
       _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "onChange", 125);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 126);
if (this.hiddenEl.value != this.stringifyValue()){ 
          _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 127);
this.hiddenEl.value = this.stringifyValue();
       }
       // erase inherited version, so don't trash previous value if input is empty
    },
    
    /**
     * @method onBlur
     */
    onBlur : function(){
       _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "onBlur", 135);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 136);
this.el.value = '';
       _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 137);
if(this.el.value === '' && this.options.typeInvite) {
          _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 138);
Dom.addClass(this.divEl, "inputEx-typeInvite");
          _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 139);
if (this.el.value === '') {this.el.value = this.options.typeInvite;}
       }
    },
    
    /**
     * @method stringifyValue
     */
    stringifyValue: function(){
       _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "stringifyValue", 146);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 147);
return Y.JSON.stringify(this.getValue());
    }
   
});

// Register this class as "multiautocomplete" type
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 153);
inputEx.registerType("multiautocomplete", inputEx.MultiAutoComplete);

},'3.1.0',{
  requires:['inputex-autocomplete','json','inputex-ddlist']
});


}, '@VERSION@');
