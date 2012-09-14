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
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-autocomplete/inputex-autocomplete.js",
    code: []
};
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].code=["YUI.add('inputex-autocomplete', function (Y, NAME) {","","/**"," * @module inputex-autocomplete"," */","YUI.add('inputex-autocomplete', function(Y) {","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * An autocomplete field that wraps the YUI autocompleter"," * @class inputEx.AutoComplete"," * @constructor"," * @extends inputEx.StringField"," * @param {Object} options Added options for Autocompleter"," * <ul>"," *  <li>source: the datasource</li>"," *  <li>autoComp: autocompleter options</li>"," *   <li>returnValue: function to format the returned value (optional)</li>"," * </ul>"," */","inputEx.AutoComplete = function(options) {","   inputEx.AutoComplete.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.AutoComplete, inputEx.StringField, {","","   /**","    * Adds autocomplete options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.AutoComplete.superclass.setOptions.call(this, options);","  ","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-AutoComplete';","      ","      // Added options","      this.options.autoComp = options.autoComp;","      this.options.returnValue = options.returnValue;","   },","   ","   /**","    * Custom event init","    * <ul>","    *   <li>listen to autocompleter textboxBlurEvent instead of this.el \"blur\" event</li>","    *   <li>listener to autocompleter textboxBlurEvent added in buildAutocomplete method</li>","    * </ul>","    * @method initEvents","    */","   initEvents: function() {","      inputEx.AutoComplete.superclass.initEvents.call(this);","","      // remove standard blur listener","      // TODO: ?","   },","","   /**","    * Render the hidden list element","    * @method renderComponent","    */","   renderComponent: function() {","   ","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","      ","      // Attributes of the input field","      var attributes = {","         type: 'text',","         id: Y.guid()","      };","      if(this.options.size) attributes.size = this.options.size;","      if(this.options.readonly) attributes.readonly = 'readonly';","      if(this.options.maxLength) attributes.maxLength = this.options.maxLength;","","      // Create the node","      this.el = inputEx.cn('input', attributes);","      ","      // Create the hidden input","      var hiddenAttrs = {","         type: 'hidden',","         value: ''","      };","      if(this.options.name) hiddenAttrs.name = this.options.name;","      this.hiddenEl = inputEx.cn('input', hiddenAttrs);","      ","      // Append it to the main element","      this.wrapEl.appendChild(this.el);","      this.wrapEl.appendChild(this.hiddenEl);","      this.fieldContainer.appendChild(this.wrapEl);","   ","      // Render the list :","      var listId = Y.guid()","      this.listEl = inputEx.cn('div', {id: listId });","      this.fieldContainer.appendChild(this.listEl);","      ","      Y.on('available', this.buildAutocomplete, \"#\"+attributes.id, this);","      Y.on('available', this.buildAutocomplete, \"#\"+listId, this);","      //Y.on(\"domready\", function(e){alert(e+\"domready\");});","   },","   ","   /**","    * Build the YUI autocompleter","    * @method buildAutocomplete","    */","   buildAutocomplete: function() {","      // Call this function only when this.el AND this.listEl are available","      if(!this._nElementsReady) { this._nElementsReady = 0; }","      this._nElementsReady++;","      if(this._nElementsReady != 2) return;","    ","      this.yEl = Y.one(this.el)","      this.yEl.plug(Y.Plugin.AutoComplete, this.options.autoComp);","","      // Instantiate AutoComplete","      this.yEl.ac.on(\"select\",this.itemSelectHandler, this);","      this.yEl.on(\"blur\", this.onBlur, this);","   },","   ","   /**","    * itemSelect handler","    * @method itemSelectHandler","    * @param {} sType","    * @param {} aArgs","    */","   itemSelectHandler: function(o) {","      var aData = o.result.raw;","      this.setValue( this.options.returnValue ? this.options.returnValue(aData) : aData.label );","   },","","   /**","    * @method onBlur","    */","   onBlur: function(e){","     if(this.el.value == '' && this.options.typeInvite) {","       Y.one(this.divEl).addClass(\"inputEx-typeInvite\")","       if (this.el.value == '') this.el.value = this.options.typeInvite;","     }","  },","","   ","   /**","    * Set the value","    * @method setValue","    * @param {Any} value Value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","      this.hiddenEl.value = value || \"\";","      this.el.value  =  value || \"\";","      // \"inherited\" from inputex.Field :","      //    (can't inherit of inputex.StringField because would set this.el.value...)","      //","      // set corresponding style","      this.setClassFromState();","","      if(sendUpdatedEvt !== false) {","         // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   /**","    * Return the hidden value (stored in a hidden input)","    * @method getValue","    */","   getValue: function() {","      return this.hiddenEl.value;","   }","","});","","","// Register this class as \"autocomplete\" type","inputEx.registerType(\"autocomplete\", inputEx.AutoComplete);","","}, '3.1.0',{","  requires: ['inputex-string','autocomplete']","})","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].lines = {"1":0,"6":0,"8":0,"23":0,"24":0,"27":0,"35":0,"38":0,"41":0,"42":0,"54":0,"67":0,"70":0,"74":0,"75":0,"76":0,"79":0,"82":0,"86":0,"87":0,"90":0,"91":0,"92":0,"95":0,"96":0,"97":0,"99":0,"100":0,"110":0,"111":0,"112":0,"114":0,"115":0,"118":0,"119":0,"129":0,"130":0,"137":0,"138":0,"139":0,"151":0,"152":0,"157":0,"159":0,"161":0,"170":0,"177":0};
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].functions = {"AutoComplete:23":0,"setOptions:34":0,"initEvents:53":0,"renderComponent:64":0,"buildAutocomplete:108":0,"itemSelectHandler:128":0,"onBlur:136":0,"setValue:150":0,"getValue:169":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].coveredLines = 47;
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].coveredFunctions = 11;
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 1);
YUI.add('inputex-autocomplete', function (Y, NAME) {

/**
 * @module inputex-autocomplete
 */
_yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 6);
YUI.add('inputex-autocomplete', function(Y) {

  _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * An autocomplete field that wraps the YUI autocompleter
 * @class inputEx.AutoComplete
 * @constructor
 * @extends inputEx.StringField
 * @param {Object} options Added options for Autocompleter
 * <ul>
 *  <li>source: the datasource</li>
 *  <li>autoComp: autocompleter options</li>
 *   <li>returnValue: function to format the returned value (optional)</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 23);
inputEx.AutoComplete = function(options) {
   _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "AutoComplete", 23);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 24);
inputEx.AutoComplete.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 27);
Y.extend(inputEx.AutoComplete, inputEx.StringField, {

   /**
    * Adds autocomplete options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "setOptions", 34);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 35);
inputEx.AutoComplete.superclass.setOptions.call(this, options);
  
      // Overwrite options
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 38);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-AutoComplete';
      
      // Added options
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 41);
this.options.autoComp = options.autoComp;
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 42);
this.options.returnValue = options.returnValue;
   },
   
   /**
    * Custom event init
    * <ul>
    *   <li>listen to autocompleter textboxBlurEvent instead of this.el "blur" event</li>
    *   <li>listener to autocompleter textboxBlurEvent added in buildAutocomplete method</li>
    * </ul>
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "initEvents", 53);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 54);
inputEx.AutoComplete.superclass.initEvents.call(this);

      // remove standard blur listener
      // TODO: ?
   },

   /**
    * Render the hidden list element
    * @method renderComponent
    */
   renderComponent: function() {
   
      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "renderComponent", 64);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 67);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});
      
      // Attributes of the input field
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 70);
var attributes = {
         type: 'text',
         id: Y.guid()
      };
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 74);
if(this.options.size) {attributes.size = this.options.size;}
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 75);
if(this.options.readonly) {attributes.readonly = 'readonly';}
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 76);
if(this.options.maxLength) {attributes.maxLength = this.options.maxLength;}

      // Create the node
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 79);
this.el = inputEx.cn('input', attributes);
      
      // Create the hidden input
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 82);
var hiddenAttrs = {
         type: 'hidden',
         value: ''
      };
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 86);
if(this.options.name) {hiddenAttrs.name = this.options.name;}
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 87);
this.hiddenEl = inputEx.cn('input', hiddenAttrs);
      
      // Append it to the main element
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 90);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 91);
this.wrapEl.appendChild(this.hiddenEl);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 92);
this.fieldContainer.appendChild(this.wrapEl);
   
      // Render the list :
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 95);
var listId = Y.guid()
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 96);
this.listEl = inputEx.cn('div', {id: listId });
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 97);
this.fieldContainer.appendChild(this.listEl);
      
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 99);
Y.on('available', this.buildAutocomplete, "#"+attributes.id, this);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 100);
Y.on('available', this.buildAutocomplete, "#"+listId, this);
      //Y.on("domready", function(e){alert(e+"domready");});
   },
   
   /**
    * Build the YUI autocompleter
    * @method buildAutocomplete
    */
   buildAutocomplete: function() {
      // Call this function only when this.el AND this.listEl are available
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "buildAutocomplete", 108);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 110);
if(!this._nElementsReady) { this._nElementsReady = 0; }
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 111);
this._nElementsReady++;
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 112);
if(this._nElementsReady != 2) {return;}
    
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 114);
this.yEl = Y.one(this.el)
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 115);
this.yEl.plug(Y.Plugin.AutoComplete, this.options.autoComp);

      // Instantiate AutoComplete
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 118);
this.yEl.ac.on("select",this.itemSelectHandler, this);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 119);
this.yEl.on("blur", this.onBlur, this);
   },
   
   /**
    * itemSelect handler
    * @method itemSelectHandler
    * @param {} sType
    * @param {} aArgs
    */
   itemSelectHandler: function(o) {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "itemSelectHandler", 128);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 129);
var aData = o.result.raw;
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 130);
this.setValue( this.options.returnValue ? this.options.returnValue(aData) : aData.label );
   },

   /**
    * @method onBlur
    */
   onBlur: function(e){
     _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "onBlur", 136);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 137);
if(this.el.value == '' && this.options.typeInvite) {
       _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 138);
Y.one(this.divEl).addClass("inputEx-typeInvite")
       _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 139);
if (this.el.value == '') {this.el.value = this.options.typeInvite;}
     }
  },

   
   /**
    * Set the value
    * @method setValue
    * @param {Any} value Value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "setValue", 150);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 151);
this.hiddenEl.value = value || "";
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 152);
this.el.value  =  value || "";
      // "inherited" from inputex.Field :
      //    (can't inherit of inputex.StringField because would set this.el.value...)
      //
      // set corresponding style
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 157);
this.setClassFromState();

      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 159);
if(sendUpdatedEvt !== false) {
         // fire update event
         _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 161);
this.fireUpdatedEvt();
      }
   },
   
   /**
    * Return the hidden value (stored in a hidden input)
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "getValue", 169);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 170);
return this.hiddenEl.value;
   }

});


// Register this class as "autocomplete" type
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 177);
inputEx.registerType("autocomplete", inputEx.AutoComplete);

}, '3.1.0',{
  requires: ['inputex-string','autocomplete']
})


}, '@VERSION@');
