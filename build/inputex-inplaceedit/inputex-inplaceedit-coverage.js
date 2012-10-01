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
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-inplaceedit/inputex-inplaceedit.js",
    code: []
};
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].code=["YUI.add('inputex-inplaceedit', function (Y, NAME) {","","/**"," * @module inputex-inplaceedit"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx,","       CSS_PREFIX = \"inputEx-\";","","/**"," * Meta field providing in place editing (the editor appears when you click on the formatted value). "," * @class inputEx.InPlaceEdit"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *   <li>visu</li>"," *   <li>editorField</li>"," *   <li>animColors</li>"," * </ul>"," */","inputEx.InPlaceEdit = function(options) {","   inputEx.InPlaceEdit.superclass.constructor.call(this, options);","   this.publish('openEditor');","   this.publish('closeEditor');","};","","Y.extend(inputEx.InPlaceEdit, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.InPlaceEdit.superclass.setOptions.call(this, options);","      ","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-inplaceedit\"));","      ","      this.options.visu = options.visu;","      ","      this.options.editorField = options.editorField;","      ","      //this.options.buttonTypes = options.buttonTypes || {ok:\"submit\",cancel:\"link\"};","      ","      this.options.buttonConfigs = options.buttonConfigs || [{","               type: \"submit\",","               value: this.messages.okEditor,","               className: \"inputEx-Button \"+CSS_PREFIX+'OkButton',","               onClick: {fn: this.onOkEditor, scope:this}","            },{","               type: \"link\",","               value: this.messages.cancelEditor,","               className: \"inputEx-Button \"+CSS_PREFIX+'CancelLink',","               onClick: {fn: this.onCancelEditor, scope:this}","            }];","      ","      this.options.animColors = options.animColors || null;","   },","   ","   /**","    * Override renderComponent to create 2 divs: the visualization one, and the edit in place form","    * @method renderComponent","    */","   renderComponent: function() {","      this.renderVisuDiv();","     this.renderEditor();","   },","   ","   /**","    * Render the editor","    * @method renderEditor","    */","   renderEditor: function() {","      var i;","","      this.editorContainer = inputEx.cn('div', {className: CSS_PREFIX+'editor'}, {display: 'none'});","      ","      // Render the editor field","      if(!this.options.editorField){","        throw new Error(\"Missing 'editorField' property in options\");","      }","      this.editorField = inputEx(this.options.editorField,this);","      var editorFieldEl = this.editorField.getEl();","      ","      this.editorContainer.appendChild( editorFieldEl );","      Y.one(editorFieldEl).addClass(CSS_PREFIX+'editorDiv');","      this.buttons = [];","      for (i = 0; i < this.options.buttonConfigs.length ; i++){","        var config = this.options.buttonConfigs[i];","        config.parentEl = this.editorContainer;","        this.buttons.push(new inputEx.widget.Button(config));","      }","      ","      // Line breaker ()","      this.editorContainer.appendChild( inputEx.cn('div',null, {clear: 'both'}) );","      ","      this.fieldContainer.appendChild(this.editorContainer);","      ","   },","   ","   /**","    * Set the color when hovering the field","    * @method onVisuMouseOver","    * @param {Event} e The original mouseover event","    */","   onVisuMouseOver: function(e) {","      // to totally disable the visual effect on mouse enter, you should change css options inputEx-InPlaceEdit-visu:hover","      if(this.disabled) {","         return;","      }","      ","      if(this.colorAnim) {","         this.colorAnim.stop(true);","      }","      inputEx.sn(this.formattedContainer, null, {backgroundColor: this.options.animColors.from });","   },","   ","   /**","    * Start the color animation when hovering the field","    * @method onVisuMouseOut","    * @param {Event} e The original mouseout event","    */","   onVisuMouseOut: function(e) {","      var optionsAnim;","      if(this.disabled) {","         return;","      }","      ","      // Start animation","      if(this.colorAnim) {","         this.colorAnim.stop(true);","      }","      if(!this.options.animColors) {","         return;","      }","","      optionsAnim =  {","        node: this.formattedContainer","      };","","      if(this.options.animColors.from){","        optionsAnim.from = {","          backgroundColor : this.options.animColors.from","        };","      }","      if(this.options.animColors.from){","        optionsAnim.to = {","          backgroundColor : this.options.animColors.to","        };","      }","      this.colorAnim = new Y.Anim(optionsAnim);","      var that = this;","      this.colorAnim.on(\"end\",function() { ","        Y.one(that.formattedContainer).setStyle('backgroundColor', ''); ","      });","      this.colorAnim.run();","      ","   },","   ","   /**","    * Create the div that will contain the visualization of the value","    * @method renderVisuDiv","    */","   renderVisuDiv: function() {","      this.formattedContainer = inputEx.cn('div', {className: 'inputEx-InPlaceEdit-visu'});","      ","      if( lang.isFunction(this.options.formatDom) ) {","         this.formattedContainer.appendChild( this.options.formatDom(this.options.value) );","      }","      else if( lang.isFunction(this.options.formatValue) ) {","         this.formattedContainer.innerHTML = this.options.formatValue(this.options.value);","      }","      else {","         this.formattedContainer.innerHTML = lang.isUndefined(this.options.value) ? this.messages.emptyInPlaceEdit: this.options.value;","      }","      ","      this.fieldContainer.appendChild(this.formattedContainer);","      ","   },","","   /**","    * Adds the events for the editor and color animations","    * @method initEvents","    */","   initEvents: function() {  ","      Y.one(this.formattedContainer).on(\"click\", this.openEditor, this, true);","            ","      // For color animation (if specified)","      if (this.options.animColors) {","         Y.one(this.formattedContainer).on('mouseover', this.onVisuMouseOver, this);","         Y.one(this.formattedContainer).on('mouseout', this.onVisuMouseOut, this);","      }","      ","      if(this.editorField.el) {","         var that = this;","         // Register some listeners","         Y.on(\"keyup\", function(e){ that.onKeyUp(e); },\"#\"+Y.one(this.editorField.el).get(\"id\"));","         Y.on(\"keydown\", function(e){ that.onKeyDown(e); },\"#\"+Y.one(this.editorField.el).get(\"id\"));","      }","   },","   ","   /**","    * Handle some keys events to close the editor","    * @method onKeyUp","    * @param {Event} e The original keyup event","    */","   onKeyUp: function(e) {","      // Enter","      if( e.keyCode === 13) {","         this.onOkEditor(e);","      }","      // Escape","      if( e.keyCode === 27) {","         this.onCancelEditor(e);","      }","   },","   ","   /**","    * Handle the tabulation key to close the editor","    * @method onKeyDown","    * @param {Event} e The original keydown event","    */","   onKeyDown: function(e) {","      // Tab","      if(e.keyCode === 9) {","         this.onOkEditor(e);","      }","   },","   ","   /**","    * Validate the editor (ok button, enter key or tabulation key)","    * @method onOkEditor","    */","   onOkEditor: function(e) {","","      if(e) {","         e.halt();","      }","      ","      var newValue = this.editorField.getValue();","      this.setValue(newValue);","      this.closeEditor();","      ","      var that = this;","      setTimeout(function() {that.fire(\"updated\",newValue);}, 50);      ","   },","","   ","   /**","    * Close the editor on cancel (cancel button, blur event or escape key)","    * @method onCancelEditor","    * @param {Event} e The original event (click, blur or keydown)","    */","   onCancelEditor: function(e) {","      if(e) {","         e.halt();","      }","      this.closeEditor();","   },","   ","   /**","    * Close the editor on cancel (cancel button, blur event or escape key)","    * @method closeEditor","    * @param {Event} e The original event (click, blur or keydown)","    */","   closeEditor: function() {","      this.editorContainer.style.display = 'none';","      this.formattedContainer.style.display = '';","      this.fire(\"closeEditor\");","   },  ","       ","   /**","    * Override enable to Enable openEditor","    * @method enable","    */","    enable: function(){","      this.disabled = false;","      inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu'});","    },  ","    ","   /**","    * Override disable to Disable openEditor","    * @method disable","    */   ","    disable: function(){","      this.disabled = true;","      inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu-disable'});","    },","    ","   /**","    * Display the editor","    * @method openEditor","    */","   openEditor: function() {","      if(this.disabled) {","         return; ","      }","","      var value = this.getValue();","      this.editorContainer.style.display = '';","      this.formattedContainer.style.display = 'none';","   ","      if(!lang.isUndefined(value)) {","         this.editorField.setValue(value);   ","      }","      ","      // Set focus in the element !","      this.editorField.focus();","   ","      // Select the content","      if(this.editorField.el && lang.isFunction(this.editorField.el.setSelectionRange) && (!!value && !!value.length)) {","         this.editorField.el.setSelectionRange(0,value.length);","      }","      this.fire(\"openEditor\");","   },","   ","   /**","    * Returned the previously stored value","    * @method getValue","    * @return {Any} The value of the subfield","    */","   getValue: function() {","      var editorOpened = (this.editorContainer.style.display === '');","      return editorOpened ? this.editorField.getValue() : this.value;","   },","","   /**","    * Set the value and update the display","    * @method setValue","    * @param {Any} value The value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {   ","      // Store the value","     this.value = value;","   ","      if(lang.isUndefined(value) || value === \"\") {","         inputEx.renderVisu(this.options.visu, this.messages.emptyInPlaceEdit, this.formattedContainer);","      }","      else {","         inputEx.renderVisu(this.options.visu, this.value, this.formattedContainer);","      }","      ","      // If the editor is opened, update it ","      if(this.editorContainer.style.display === '') {","         this.editorField.setValue(value);","      }","      ","      inputEx.InPlaceEdit.superclass.setValue.call(this, value, sendUpdatedEvt);","   },","   ","   /**","    * Close the editor when calling the close function on this field","    * @method close","    */","   close: function() {","      this.editorContainer.style.display = 'none';","      this.formattedContainer.style.display = '';","      this.fire(\"openEditor\");","  }","","});","  ","// Register this class as \"inplaceedit\" type","inputEx.registerType(\"inplaceedit\", inputEx.InPlaceEdit, [","   { type:'type', label: 'Editor', name: 'editorField'}","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"inputex-button\", \"anim\", \"inputex-visus\"], \"ix_provides\": \"inplaceedit\", \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].lines = {"1":0,"6":0,"22":0,"23":0,"24":0,"25":0,"28":0,"35":0,"38":0,"40":0,"42":0,"46":0,"58":0,"66":0,"67":0,"75":0,"77":0,"80":0,"81":0,"83":0,"84":0,"86":0,"87":0,"88":0,"89":0,"90":0,"91":0,"92":0,"96":0,"98":0,"109":0,"110":0,"113":0,"114":0,"116":0,"125":0,"126":0,"127":0,"131":0,"132":0,"134":0,"135":0,"138":0,"142":0,"143":0,"147":0,"148":0,"152":0,"153":0,"154":0,"155":0,"157":0,"166":0,"168":0,"169":0,"171":0,"172":0,"175":0,"178":0,"187":0,"190":0,"191":0,"192":0,"195":0,"196":0,"198":0,"199":0,"210":0,"211":0,"214":0,"215":0,"226":0,"227":0,"237":0,"238":0,"241":0,"242":0,"243":0,"245":0,"246":0,"256":0,"257":0,"259":0,"268":0,"269":0,"270":0,"278":0,"279":0,"287":0,"288":0,"296":0,"297":0,"300":0,"301":0,"302":0,"304":0,"305":0,"309":0,"312":0,"313":0,"315":0,"324":0,"325":0,"336":0,"338":0,"339":0,"342":0,"346":0,"347":0,"350":0,"358":0,"359":0,"360":0,"366":0};
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].functions = {"InPlaceEdit:22":0,"setOptions:34":0,"renderComponent:65":0,"renderEditor:74":0,"onVisuMouseOver:107":0,"(anonymous 2):154":0,"onVisuMouseOut:124":0,"renderVisuDiv:165":0,"(anonymous 3):198":0,"(anonymous 4):199":0,"initEvents:186":0,"onKeyUp:208":0,"onKeyDown:224":0,"(anonymous 5):246":0,"onOkEditor:235":0,"onCancelEditor:255":0,"closeEditor:267":0,"enable:277":0,"disable:286":0,"openEditor:295":0,"getValue:323":0,"setValue:334":0,"close:357":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].coveredLines = 114;
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].coveredFunctions = 24;
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 1);
YUI.add('inputex-inplaceedit', function (Y, NAME) {

/**
 * @module inputex-inplaceedit
 */
   _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx,
       CSS_PREFIX = "inputEx-";

/**
 * Meta field providing in place editing (the editor appears when you click on the formatted value). 
 * @class inputEx.InPlaceEdit
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *   <li>visu</li>
 *   <li>editorField</li>
 *   <li>animColors</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 22);
inputEx.InPlaceEdit = function(options) {
   _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "InPlaceEdit", 22);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 23);
inputEx.InPlaceEdit.superclass.constructor.call(this, options);
   _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 24);
this.publish('openEditor');
   _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 25);
this.publish('closeEditor');
};

_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 28);
Y.extend(inputEx.InPlaceEdit, inputEx.Field, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "setOptions", 34);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 35);
inputEx.InPlaceEdit.superclass.setOptions.call(this, options);
      
      //I18N
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 38);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-inplaceedit"));
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 40);
this.options.visu = options.visu;
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 42);
this.options.editorField = options.editorField;
      
      //this.options.buttonTypes = options.buttonTypes || {ok:"submit",cancel:"link"};
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 46);
this.options.buttonConfigs = options.buttonConfigs || [{
               type: "submit",
               value: this.messages.okEditor,
               className: "inputEx-Button "+CSS_PREFIX+'OkButton',
               onClick: {fn: this.onOkEditor, scope:this}
            },{
               type: "link",
               value: this.messages.cancelEditor,
               className: "inputEx-Button "+CSS_PREFIX+'CancelLink',
               onClick: {fn: this.onCancelEditor, scope:this}
            }];
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 58);
this.options.animColors = options.animColors || null;
   },
   
   /**
    * Override renderComponent to create 2 divs: the visualization one, and the edit in place form
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderComponent", 65);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 66);
this.renderVisuDiv();
     _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 67);
this.renderEditor();
   },
   
   /**
    * Render the editor
    * @method renderEditor
    */
   renderEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderEditor", 74);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 75);
var i;

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 77);
this.editorContainer = inputEx.cn('div', {className: CSS_PREFIX+'editor'}, {display: 'none'});
      
      // Render the editor field
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 80);
if(!this.options.editorField){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 81);
throw new Error("Missing 'editorField' property in options");
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 83);
this.editorField = inputEx(this.options.editorField,this);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 84);
var editorFieldEl = this.editorField.getEl();
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 86);
this.editorContainer.appendChild( editorFieldEl );
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 87);
Y.one(editorFieldEl).addClass(CSS_PREFIX+'editorDiv');
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 88);
this.buttons = [];
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 89);
for (i = 0; i < this.options.buttonConfigs.length ; i++){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 90);
var config = this.options.buttonConfigs[i];
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 91);
config.parentEl = this.editorContainer;
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 92);
this.buttons.push(new inputEx.widget.Button(config));
      }
      
      // Line breaker ()
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 96);
this.editorContainer.appendChild( inputEx.cn('div',null, {clear: 'both'}) );
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 98);
this.fieldContainer.appendChild(this.editorContainer);
      
   },
   
   /**
    * Set the color when hovering the field
    * @method onVisuMouseOver
    * @param {Event} e The original mouseover event
    */
   onVisuMouseOver: function(e) {
      // to totally disable the visual effect on mouse enter, you should change css options inputEx-InPlaceEdit-visu:hover
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onVisuMouseOver", 107);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 109);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 110);
return;
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 113);
if(this.colorAnim) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 114);
this.colorAnim.stop(true);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 116);
inputEx.sn(this.formattedContainer, null, {backgroundColor: this.options.animColors.from });
   },
   
   /**
    * Start the color animation when hovering the field
    * @method onVisuMouseOut
    * @param {Event} e The original mouseout event
    */
   onVisuMouseOut: function(e) {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onVisuMouseOut", 124);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 125);
var optionsAnim;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 126);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 127);
return;
      }
      
      // Start animation
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 131);
if(this.colorAnim) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 132);
this.colorAnim.stop(true);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 134);
if(!this.options.animColors) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 135);
return;
      }

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 138);
optionsAnim =  {
        node: this.formattedContainer
      };

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 142);
if(this.options.animColors.from){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 143);
optionsAnim.from = {
          backgroundColor : this.options.animColors.from
        };
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 147);
if(this.options.animColors.from){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 148);
optionsAnim.to = {
          backgroundColor : this.options.animColors.to
        };
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 152);
this.colorAnim = new Y.Anim(optionsAnim);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 153);
var that = this;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 154);
this.colorAnim.on("end",function() { 
        _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 2)", 154);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 155);
Y.one(that.formattedContainer).setStyle('backgroundColor', ''); 
      });
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 157);
this.colorAnim.run();
      
   },
   
   /**
    * Create the div that will contain the visualization of the value
    * @method renderVisuDiv
    */
   renderVisuDiv: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderVisuDiv", 165);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 166);
this.formattedContainer = inputEx.cn('div', {className: 'inputEx-InPlaceEdit-visu'});
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 168);
if( lang.isFunction(this.options.formatDom) ) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 169);
this.formattedContainer.appendChild( this.options.formatDom(this.options.value) );
      }
      else {_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 171);
if( lang.isFunction(this.options.formatValue) ) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 172);
this.formattedContainer.innerHTML = this.options.formatValue(this.options.value);
      }
      else {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 175);
this.formattedContainer.innerHTML = lang.isUndefined(this.options.value) ? this.messages.emptyInPlaceEdit: this.options.value;
      }}
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 178);
this.fieldContainer.appendChild(this.formattedContainer);
      
   },

   /**
    * Adds the events for the editor and color animations
    * @method initEvents
    */
   initEvents: function() {  
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "initEvents", 186);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 187);
Y.one(this.formattedContainer).on("click", this.openEditor, this, true);
            
      // For color animation (if specified)
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 190);
if (this.options.animColors) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 191);
Y.one(this.formattedContainer).on('mouseover', this.onVisuMouseOver, this);
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 192);
Y.one(this.formattedContainer).on('mouseout', this.onVisuMouseOut, this);
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 195);
if(this.editorField.el) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 196);
var that = this;
         // Register some listeners
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 198);
Y.on("keyup", function(e){ _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 3)", 198);
that.onKeyUp(e); },"#"+Y.one(this.editorField.el).get("id"));
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 199);
Y.on("keydown", function(e){ _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 4)", 199);
that.onKeyDown(e); },"#"+Y.one(this.editorField.el).get("id"));
      }
   },
   
   /**
    * Handle some keys events to close the editor
    * @method onKeyUp
    * @param {Event} e The original keyup event
    */
   onKeyUp: function(e) {
      // Enter
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onKeyUp", 208);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 210);
if( e.keyCode === 13) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 211);
this.onOkEditor(e);
      }
      // Escape
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 214);
if( e.keyCode === 27) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 215);
this.onCancelEditor(e);
      }
   },
   
   /**
    * Handle the tabulation key to close the editor
    * @method onKeyDown
    * @param {Event} e The original keydown event
    */
   onKeyDown: function(e) {
      // Tab
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onKeyDown", 224);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 226);
if(e.keyCode === 9) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 227);
this.onOkEditor(e);
      }
   },
   
   /**
    * Validate the editor (ok button, enter key or tabulation key)
    * @method onOkEditor
    */
   onOkEditor: function(e) {

      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onOkEditor", 235);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 237);
if(e) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 238);
e.halt();
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 241);
var newValue = this.editorField.getValue();
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 242);
this.setValue(newValue);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 243);
this.closeEditor();
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 245);
var that = this;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 246);
setTimeout(function() {_yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 5)", 246);
that.fire("updated",newValue);}, 50);      
   },

   
   /**
    * Close the editor on cancel (cancel button, blur event or escape key)
    * @method onCancelEditor
    * @param {Event} e The original event (click, blur or keydown)
    */
   onCancelEditor: function(e) {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onCancelEditor", 255);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 256);
if(e) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 257);
e.halt();
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 259);
this.closeEditor();
   },
   
   /**
    * Close the editor on cancel (cancel button, blur event or escape key)
    * @method closeEditor
    * @param {Event} e The original event (click, blur or keydown)
    */
   closeEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "closeEditor", 267);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 268);
this.editorContainer.style.display = 'none';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 269);
this.formattedContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 270);
this.fire("closeEditor");
   },  
       
   /**
    * Override enable to Enable openEditor
    * @method enable
    */
    enable: function(){
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "enable", 277);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 278);
this.disabled = false;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 279);
inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu'});
    },  
    
   /**
    * Override disable to Disable openEditor
    * @method disable
    */   
    disable: function(){
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "disable", 286);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 287);
this.disabled = true;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 288);
inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu-disable'});
    },
    
   /**
    * Display the editor
    * @method openEditor
    */
   openEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "openEditor", 295);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 296);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 297);
return; 
      }

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 300);
var value = this.getValue();
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 301);
this.editorContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 302);
this.formattedContainer.style.display = 'none';
   
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 304);
if(!lang.isUndefined(value)) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 305);
this.editorField.setValue(value);   
      }
      
      // Set focus in the element !
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 309);
this.editorField.focus();
   
      // Select the content
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 312);
if(this.editorField.el && lang.isFunction(this.editorField.el.setSelectionRange) && (!!value && !!value.length)) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 313);
this.editorField.el.setSelectionRange(0,value.length);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 315);
this.fire("openEditor");
   },
   
   /**
    * Returned the previously stored value
    * @method getValue
    * @return {Any} The value of the subfield
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "getValue", 323);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 324);
var editorOpened = (this.editorContainer.style.display === '');
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 325);
return editorOpened ? this.editorField.getValue() : this.value;
   },

   /**
    * Set the value and update the display
    * @method setValue
    * @param {Any} value The value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {   
      // Store the value
     _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "setValue", 334);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 336);
this.value = value;
   
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 338);
if(lang.isUndefined(value) || value === "") {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 339);
inputEx.renderVisu(this.options.visu, this.messages.emptyInPlaceEdit, this.formattedContainer);
      }
      else {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 342);
inputEx.renderVisu(this.options.visu, this.value, this.formattedContainer);
      }
      
      // If the editor is opened, update it 
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 346);
if(this.editorContainer.style.display === '') {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 347);
this.editorField.setValue(value);
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 350);
inputEx.InPlaceEdit.superclass.setValue.call(this, value, sendUpdatedEvt);
   },
   
   /**
    * Close the editor when calling the close function on this field
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "close", 357);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 358);
this.editorContainer.style.display = 'none';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 359);
this.formattedContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 360);
this.fire("openEditor");
  }

});
  
// Register this class as "inplaceedit" type
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 366);
inputEx.registerType("inplaceedit", inputEx.InPlaceEdit, [
   { type:'type', label: 'Editor', name: 'editorField'}
]);


}, '@VERSION@', {"requires": ["inputex-field", "inputex-button", "anim", "inputex-visus"], "ix_provides": "inplaceedit", "skinnable": true, "lang": ["en", "fr", "de", "es", "fr", "it", "nl"]});
