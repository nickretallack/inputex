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
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].code=["YUI.add('inputex-multiautocomplete', function (Y, NAME) {","","/**"," * @module inputex-multiautocomplete"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a multi autocomplete field"," * @class inputEx.MultiAutoComplete"," * @extends inputEx.AutoComplete"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," * </ul>"," */","inputEx.MultiAutoComplete = function(options) {","   inputEx.MultiAutoComplete.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.MultiAutoComplete, inputEx.AutoComplete, {","   ","   /**","    * Build the DDList","    * @method renderComponent","    */","   renderComponent: function() {","      inputEx.MultiAutoComplete.superclass.renderComponent.call(this);","      ","      this.ddlist = new inputEx.DDListField({parentEl: this.fieldContainer});","      this.ddlist.on(\"itemRemoved\",function() {","         this.setClassFromState();","         this.fireUpdatedEvt();","      }, this);","      this.ddlist.on(\"updated\", this.fireUpdatedEvt, this);","   },  ","   ","   /**","    * Additional options","    * @method setOptions","    */","   setOptions: function(options) {","      inputEx.MultiAutoComplete.superclass.setOptions.call(this, options);","      ","      // Method to format the ddlist item labels","      this.options.returnLabel = options.returnLabel;","   },","","   /**","    * Handle item selection in the autocompleter to add it to the list","    * @method itemSelectHandler","    */","   itemSelectHandler: function(v) {","      v.halt();","      ","      var aData = v.result;","      var value = lang.isFunction(this.options.returnValue) ? this.options.returnValue(aData) : aData.raw;","      var label = lang.isFunction(this.options.returnLabel) ? this.options.returnLabel(aData) : value;","      this.ddlist.addItem({label: label, value: value});","      this.el.value = \"\";","      this.hiddenEl.value = this.stringifyValue();","      this.fireUpdatedEvt();","      this.onChange();","      this.yEl.ac.hide();","   },","   ","   /**","    * Set the value","    * @method setValue","    * @param {String} value The value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function (value, sendUpdatedEvt) {","      this.ddlist.setValue(value);","      ","      // set corresponding style","      this.setClassFromState();","      ","      if(sendUpdatedEvt !== false) {","         // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   clear: function (sendUpdatedEvt) {","      this.setValue(lang.isUndefined(this.options.value) ? [] : this.options.value, sendUpdatedEvt);","   },","","   /**","    * Return the value","    * @method getValue","    * @return {Any} an array of selected values","    */","   getValue: function() {","      return this.ddlist.getValue();","   },","","   isEmpty: function () {","      return this.getValue().length === 0;","   },","   ","   /**","    * onChange event handler","    * @method onChange","    * @param {Event} e The original 'change' event","    */","    onChange: function(e) {","       if (this.hiddenEl.value != this.stringifyValue()){ ","          this.hiddenEl.value = this.stringifyValue();","       }","       // erase inherited version, so don't trash previous value if input is empty","    },","    ","    /**","     * @method onBlur","     */","    onBlur : function(){","       this.el.value = '';","       if(this.el.value === '' && this.options.typeInvite) {","          Dom.addClass(this.divEl, \"inputEx-typeInvite\");","          if (this.el.value === '') this.el.value = this.options.typeInvite;","       }","    },","    ","    /**","     * @method stringifyValue","     */","    stringifyValue: function(){","       return Y.JSON.stringify(this.getValue());","    }","   ","});","","// Register this class as \"multiautocomplete\" type","inputEx.registerType(\"multiautocomplete\", inputEx.MultiAutoComplete);","","","}, '@VERSION@', {\"requires\": [\"inputex-autocomplete\", \"json\", \"inputex-ddlist\"], \"ix_provides\": \"multiautocomplete\"});"];
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].lines = {"1":0,"6":0,"18":0,"19":0,"22":0,"29":0,"31":0,"32":0,"33":0,"34":0,"36":0,"44":0,"47":0,"55":0,"57":0,"58":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"75":0,"78":0,"80":0,"82":0,"87":0,"96":0,"100":0,"109":0,"110":0,"119":0,"120":0,"121":0,"122":0,"130":0,"136":0};
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].functions = {"MultiAutoComplete:18":0,"(anonymous 2):32":0,"renderComponent:28":0,"setOptions:43":0,"itemSelectHandler:54":0,"setValue:74":0,"clear:86":0,"getValue:95":0,"isEmpty:99":0,"onChange:108":0,"onBlur:118":0,"stringifyValue:129":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].coveredLines = 38;
_yuitest_coverage["build/inputex-multiautocomplete/inputex-multiautocomplete.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 1);
YUI.add('inputex-multiautocomplete', function (Y, NAME) {

/**
 * @module inputex-multiautocomplete
 */
   _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 6);
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
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 18);
inputEx.MultiAutoComplete = function(options) {
   _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "MultiAutoComplete", 18);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 19);
inputEx.MultiAutoComplete.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 22);
Y.extend(inputEx.MultiAutoComplete, inputEx.AutoComplete, {
   
   /**
    * Build the DDList
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "renderComponent", 28);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 29);
inputEx.MultiAutoComplete.superclass.renderComponent.call(this);
      
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 31);
this.ddlist = new inputEx.DDListField({parentEl: this.fieldContainer});
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 32);
this.ddlist.on("itemRemoved",function() {
         _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "(anonymous 2)", 32);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 33);
this.setClassFromState();
         _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 34);
this.fireUpdatedEvt();
      }, this);
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 36);
this.ddlist.on("updated", this.fireUpdatedEvt, this);
   },  
   
   /**
    * Additional options
    * @method setOptions
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "setOptions", 43);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 44);
inputEx.MultiAutoComplete.superclass.setOptions.call(this, options);
      
      // Method to format the ddlist item labels
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 47);
this.options.returnLabel = options.returnLabel;
   },

   /**
    * Handle item selection in the autocompleter to add it to the list
    * @method itemSelectHandler
    */
   itemSelectHandler: function(v) {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "itemSelectHandler", 54);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 55);
v.halt();
      
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 57);
var aData = v.result;
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 58);
var value = lang.isFunction(this.options.returnValue) ? this.options.returnValue(aData) : aData.raw;
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 59);
var label = lang.isFunction(this.options.returnLabel) ? this.options.returnLabel(aData) : value;
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 60);
this.ddlist.addItem({label: label, value: value});
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 61);
this.el.value = "";
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 62);
this.hiddenEl.value = this.stringifyValue();
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 63);
this.fireUpdatedEvt();
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 64);
this.onChange();
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 65);
this.yEl.ac.hide();
   },
   
   /**
    * Set the value
    * @method setValue
    * @param {String} value The value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function (value, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "setValue", 74);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 75);
this.ddlist.setValue(value);
      
      // set corresponding style
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 78);
this.setClassFromState();
      
      _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 80);
if(sendUpdatedEvt !== false) {
         // fire update event
         _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 82);
this.fireUpdatedEvt();
      }
   },
   
   clear: function (sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "clear", 86);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 87);
this.setValue(lang.isUndefined(this.options.value) ? [] : this.options.value, sendUpdatedEvt);
   },

   /**
    * Return the value
    * @method getValue
    * @return {Any} an array of selected values
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "getValue", 95);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 96);
return this.ddlist.getValue();
   },

   isEmpty: function () {
      _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "isEmpty", 99);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 100);
return this.getValue().length === 0;
   },
   
   /**
    * onChange event handler
    * @method onChange
    * @param {Event} e The original 'change' event
    */
    onChange: function(e) {
       _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "onChange", 108);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 109);
if (this.hiddenEl.value != this.stringifyValue()){ 
          _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 110);
this.hiddenEl.value = this.stringifyValue();
       }
       // erase inherited version, so don't trash previous value if input is empty
    },
    
    /**
     * @method onBlur
     */
    onBlur : function(){
       _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "onBlur", 118);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 119);
this.el.value = '';
       _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 120);
if(this.el.value === '' && this.options.typeInvite) {
          _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 121);
Dom.addClass(this.divEl, "inputEx-typeInvite");
          _yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 122);
if (this.el.value === '') {this.el.value = this.options.typeInvite;}
       }
    },
    
    /**
     * @method stringifyValue
     */
    stringifyValue: function(){
       _yuitest_coverfunc("build/inputex-multiautocomplete/inputex-multiautocomplete.js", "stringifyValue", 129);
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 130);
return Y.JSON.stringify(this.getValue());
    }
   
});

// Register this class as "multiautocomplete" type
_yuitest_coverline("build/inputex-multiautocomplete/inputex-multiautocomplete.js", 136);
inputEx.registerType("multiautocomplete", inputEx.MultiAutoComplete);


}, '@VERSION@', {"requires": ["inputex-autocomplete", "json", "inputex-ddlist"], "ix_provides": "multiautocomplete"});
