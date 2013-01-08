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
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].code=["YUI.add('inputex-autocomplete', function (Y, NAME) {","","/**"," * @module inputex-autocomplete"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * An autocomplete field that wraps the YUI autocompleter"," * @class inputEx.AutoComplete"," * @constructor"," * @extends inputEx.StringField"," * @param {Object} options Added options for Autocompleter"," * <ul>"," *  <li>source: the datasource</li>"," *  <li>autoComp: autocompleter options</li>"," *   <li>returnValue: function to format the returned value (optional)</li>"," * </ul>"," */","inputEx.AutoComplete = function(options) {","   inputEx.AutoComplete.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.AutoComplete, inputEx.StringField, {","","   /**","    * Adds autocomplete options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.AutoComplete.superclass.setOptions.call(this, options);","  ","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-AutoComplete';","      ","      // Added options","      this.options.autoComp    = options.autoComp;","      this.options.returnValue = options.returnValue;","   },","   ","   /**","    * Custom event init","    * <ul>","    *   <li>listen to autocompleter textboxBlurEvent instead of this.el \"blur\" event</li>","    *   <li>listener to autocompleter textboxBlurEvent added in buildAutocomplete method</li>","    * </ul>","    * @method initEvents","    */","   initEvents: function() {","      ","      inputEx.AutoComplete.superclass.initEvents.call(this);","      ","      if (Y.UA.ie > 0){","         // Restore \"enter\" key support for selecting items (prevented in inputex-string)","         Y.Event.detach('key', undefined, this.el);","      }","","      // remove standard blur listener","      // TODO: ?","   },","","   /**","    * Render the hidden list element","    * @method renderComponent","    */","   renderComponent: function() {","   ","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});","      ","      // Attributes of the input field","      var attributes = {","         type: 'text',","         id: Y.guid()","      };","      if(this.options.size) attributes.size = this.options.size;","      if(this.options.readonly) attributes.readonly = 'readonly';","      if(this.options.maxLength) attributes.maxLength = this.options.maxLength;","","      // Create the node","      this.el = inputEx.cn('input', attributes);","      ","      // Create the hidden input","      var hiddenAttrs = {","         type: 'hidden',","         value: ''","      };","      if(this.options.name) hiddenAttrs.name = this.options.name;","      this.hiddenEl = inputEx.cn('input', hiddenAttrs);","      ","      // Append it to the main element","      this.wrapEl.appendChild(this.el);","      this.wrapEl.appendChild(this.hiddenEl);","      this.fieldContainer.appendChild(this.wrapEl);","   ","      // Render the list :","      var listId = Y.guid()","      this.listEl = inputEx.cn('div', {id: listId });","      this.fieldContainer.appendChild(this.listEl);","      ","      Y.on('available', this.buildAutocomplete, \"#\"+attributes.id, this);","      Y.on('available', this.buildAutocomplete, \"#\"+listId, this);","      //Y.on(\"domready\", function(e){alert(e+\"domready\");});","   },","   ","   /**","    * Build the YUI autocompleter","    * @method buildAutocomplete","    */","   buildAutocomplete: function() {","      // Call this function only when this.el AND this.listEl are available","      if(!this._nElementsReady) { this._nElementsReady = 0; }","      this._nElementsReady++;","      if(this._nElementsReady != 2) return;","    ","      this.yEl = Y.one(this.el)","      this.yEl.plug(Y.Plugin.AutoComplete, this.options.autoComp);","","      // Instantiate AutoComplete","      this.yEl.ac.on(\"select\",this.itemSelectHandler, this);","      this.yEl.on(\"blur\", this.onBlur, this);","   },","   ","   /**","    * itemSelect handler","    * @method itemSelectHandler","    * @param {} sType","    * @param {} aArgs","    */","   itemSelectHandler: function(o) {","      var aData = o.result.raw;","      this.setValue( this.options.returnValue ? this.options.returnValue(aData) : aData.label );","   },","","   /**","    * @method onBlur","    */","   onBlur: function(e){","      if (this.el.value == '' && this.options.typeInvite) {","         Y.one(this.divEl).addClass(\"inputEx-typeInvite\")","         this.el.value = this.options.typeInvite;","      }","   },","   ","   ","   onChange: function(e) {","      ","      this.setClassFromState();","      ","      // Clear the field when no value","      if (this.hiddenEl.value != this.el.value) {","         this.hiddenEl.value = this.el.value;","      }","      ","      Y.later(50, this, function() {","         if (this.el.value == \"\") {","            this.setValue(\"\");","         }","      });","   },","   ","   /**","    * Set the value","    * @method setValue","    * @param {Any} value Value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)","    */","   setValue: function (value, sendUpdatedEvt) {","      ","      this.hiddenEl.value = value || \"\";","      ","      inputEx.AutoComplete.superclass.setValue.call(this, value, sendUpdatedEvt);","   },","   ","   /**","    * Return the hidden value (stored in a hidden input)","    * @method getValue","    */","   getValue: function() {","      return this.hiddenEl.value;","   }","","});","","","// Register this class as \"autocomplete\" type","inputEx.registerType(\"autocomplete\", inputEx.AutoComplete);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\", \"autocomplete\"], \"ix_provides\": \"autocomplete\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].lines = {"1":0,"6":0,"21":0,"22":0,"25":0,"33":0,"36":0,"39":0,"40":0,"53":0,"55":0,"57":0,"71":0,"74":0,"78":0,"79":0,"80":0,"83":0,"86":0,"90":0,"91":0,"94":0,"95":0,"96":0,"99":0,"100":0,"101":0,"103":0,"104":0,"114":0,"115":0,"116":0,"118":0,"119":0,"122":0,"123":0,"133":0,"134":0,"141":0,"142":0,"143":0,"150":0,"153":0,"154":0,"157":0,"158":0,"159":0,"172":0,"174":0,"182":0,"189":0};
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].functions = {"AutoComplete:21":0,"setOptions:32":0,"initEvents:51":0,"renderComponent:68":0,"buildAutocomplete:112":0,"itemSelectHandler:132":0,"onBlur:140":0,"(anonymous 2):157":0,"onChange:148":0,"setValue:170":0,"getValue:181":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].coveredLines = 51;
_yuitest_coverage["build/inputex-autocomplete/inputex-autocomplete.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 1);
YUI.add('inputex-autocomplete', function (Y, NAME) {

/**
 * @module inputex-autocomplete
 */
  _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 6);
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
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 21);
inputEx.AutoComplete = function(options) {
   _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "AutoComplete", 21);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 22);
inputEx.AutoComplete.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 25);
Y.extend(inputEx.AutoComplete, inputEx.StringField, {

   /**
    * Adds autocomplete options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "setOptions", 32);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 33);
inputEx.AutoComplete.superclass.setOptions.call(this, options);
  
      // Overwrite options
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 36);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-AutoComplete';
      
      // Added options
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 39);
this.options.autoComp    = options.autoComp;
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 40);
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
      
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "initEvents", 51);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 53);
inputEx.AutoComplete.superclass.initEvents.call(this);
      
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 55);
if (Y.UA.ie > 0){
         // Restore "enter" key support for selecting items (prevented in inputex-string)
         _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 57);
Y.Event.detach('key', undefined, this.el);
      }

      // remove standard blur listener
      // TODO: ?
   },

   /**
    * Render the hidden list element
    * @method renderComponent
    */
   renderComponent: function() {
   
      // This element wraps the input node in a float: none div
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "renderComponent", 68);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 71);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});
      
      // Attributes of the input field
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 74);
var attributes = {
         type: 'text',
         id: Y.guid()
      };
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 78);
if(this.options.size) {attributes.size = this.options.size;}
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 79);
if(this.options.readonly) {attributes.readonly = 'readonly';}
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 80);
if(this.options.maxLength) {attributes.maxLength = this.options.maxLength;}

      // Create the node
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 83);
this.el = inputEx.cn('input', attributes);
      
      // Create the hidden input
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 86);
var hiddenAttrs = {
         type: 'hidden',
         value: ''
      };
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 90);
if(this.options.name) {hiddenAttrs.name = this.options.name;}
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 91);
this.hiddenEl = inputEx.cn('input', hiddenAttrs);
      
      // Append it to the main element
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 94);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 95);
this.wrapEl.appendChild(this.hiddenEl);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 96);
this.fieldContainer.appendChild(this.wrapEl);
   
      // Render the list :
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 99);
var listId = Y.guid()
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 100);
this.listEl = inputEx.cn('div', {id: listId });
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 101);
this.fieldContainer.appendChild(this.listEl);
      
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 103);
Y.on('available', this.buildAutocomplete, "#"+attributes.id, this);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 104);
Y.on('available', this.buildAutocomplete, "#"+listId, this);
      //Y.on("domready", function(e){alert(e+"domready");});
   },
   
   /**
    * Build the YUI autocompleter
    * @method buildAutocomplete
    */
   buildAutocomplete: function() {
      // Call this function only when this.el AND this.listEl are available
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "buildAutocomplete", 112);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 114);
if(!this._nElementsReady) { this._nElementsReady = 0; }
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 115);
this._nElementsReady++;
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 116);
if(this._nElementsReady != 2) {return;}
    
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 118);
this.yEl = Y.one(this.el)
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 119);
this.yEl.plug(Y.Plugin.AutoComplete, this.options.autoComp);

      // Instantiate AutoComplete
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 122);
this.yEl.ac.on("select",this.itemSelectHandler, this);
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 123);
this.yEl.on("blur", this.onBlur, this);
   },
   
   /**
    * itemSelect handler
    * @method itemSelectHandler
    * @param {} sType
    * @param {} aArgs
    */
   itemSelectHandler: function(o) {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "itemSelectHandler", 132);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 133);
var aData = o.result.raw;
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 134);
this.setValue( this.options.returnValue ? this.options.returnValue(aData) : aData.label );
   },

   /**
    * @method onBlur
    */
   onBlur: function(e){
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "onBlur", 140);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 141);
if (this.el.value == '' && this.options.typeInvite) {
         _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 142);
Y.one(this.divEl).addClass("inputEx-typeInvite")
         _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 143);
this.el.value = this.options.typeInvite;
      }
   },
   
   
   onChange: function(e) {
      
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "onChange", 148);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 150);
this.setClassFromState();
      
      // Clear the field when no value
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 153);
if (this.hiddenEl.value != this.el.value) {
         _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 154);
this.hiddenEl.value = this.el.value;
      }
      
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 157);
Y.later(50, this, function() {
         _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "(anonymous 2)", 157);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 158);
if (this.el.value == "") {
            _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 159);
this.setValue("");
         }
      });
   },
   
   /**
    * Set the value
    * @method setValue
    * @param {Any} value Value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
    */
   setValue: function (value, sendUpdatedEvt) {
      
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "setValue", 170);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 172);
this.hiddenEl.value = value || "";
      
      _yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 174);
inputEx.AutoComplete.superclass.setValue.call(this, value, sendUpdatedEvt);
   },
   
   /**
    * Return the hidden value (stored in a hidden input)
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-autocomplete/inputex-autocomplete.js", "getValue", 181);
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 182);
return this.hiddenEl.value;
   }

});


// Register this class as "autocomplete" type
_yuitest_coverline("build/inputex-autocomplete/inputex-autocomplete.js", 189);
inputEx.registerType("autocomplete", inputEx.AutoComplete);


}, '@VERSION@', {"requires": ["inputex-string", "autocomplete"], "ix_provides": "autocomplete", "skinnable": true});
