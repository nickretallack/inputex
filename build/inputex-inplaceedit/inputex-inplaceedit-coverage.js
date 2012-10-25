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
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].code=["YUI.add('inputex-inplaceedit', function (Y, NAME) {","","/**"," * @module inputex-inplaceedit"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx,","       CSS_PREFIX = \"inputEx-\";","","/**"," * Meta field providing in place editing (the editor appears when you click on the formatted value). "," * @class inputEx.InPlaceEdit"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *   <li>visu</li>"," *   <li>editorField</li>"," *   <li>animColors</li>"," * </ul>"," */","inputEx.InPlaceEdit = function(options) {","   inputEx.InPlaceEdit.superclass.constructor.call(this, options);","   this.publish('openEditor');","   this.publish('closeEditor');","};","","Y.extend(inputEx.InPlaceEdit, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      var that = this;","","      inputEx.InPlaceEdit.superclass.setOptions.call(this, options);","      ","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-inplaceedit\"));","      ","      this.options.visu = options.visu;","      ","      this.options.editorField = options.editorField;","      ","      //this.options.buttonTypes = options.buttonTypes || {ok:\"submit\",cancel:\"link\"};","","      if (!options.buttonConfigs) {","          // Default ","          this.options.buttonConfigs = [{","              type: \"submit\",","              value: this.messages.okEditor,","              className: \"inputEx-Button \" + CSS_PREFIX + 'OkButton',","              onClick: {","                  fn: this.onOkEditor,","                  scope: this","              }","          }, {","              type: \"link\",","              value: this.messages.cancelEditor,","              className: \"inputEx-Button \" + CSS_PREFIX + 'CancelLink',","              onClick: {","                  fn: this.onCancelEditor,","                  scope: this","              }","          }];","","      } else {","          // Custumized buttons","          options.buttonConfigs.forEach(function (item) {","","              if (item.isOkButton) {","                  item.value = that.messages.okEditor;","                  item.className ? item.className += \"inputEx-Button \" + CSS_PREFIX + 'OkButton' : \"inputEx-Button \" + CSS_PREFIX + 'OkButton';","                  item.onClick ? item.onClick : item.onClick = {","                      fn: that.onOkEditor,","                      scope: that","                  };","              } else {","                  item.value = that.messages.cancelEditor;","                  item.className ? item.className += \"inputEx-Button \" + CSS_PREFIX + 'CancelLink' : \"inputEx-Button \" + CSS_PREFIX + 'CancelLink';","                  item.onClick ? item.onClick : item.onClick = {","                      fn: that.onCancelEditor,","                      scope: that","                  };","              }","          });","","          this.options.buttonConfigs = options.buttonConfigs;","","      }"," ","      this.options.animColors = options.animColors || null;","   },","   ","   /**","    * Override renderComponent to create 2 divs: the visualization one, and the edit in place form","    * @method renderComponent","    */","   renderComponent: function() {","      this.renderVisuDiv();","     this.renderEditor();","   },","   ","   /**","    * Render the editor","    * @method renderEditor","    */","   renderEditor: function() {","      var i;","","      this.editorContainer = inputEx.cn('div', {className: CSS_PREFIX+'editor'}, {display: 'none'});","      ","      // Render the editor field","      if(!this.options.editorField){","        throw new Error(\"Missing 'editorField' property in options\");","      }","      this.editorField = inputEx(this.options.editorField,this);","      var editorFieldEl = this.editorField.getEl();","      ","      this.editorContainer.appendChild( editorFieldEl );","      Y.one(editorFieldEl).addClass(CSS_PREFIX+'editorDiv');","      this.buttons = [];","      for (i = 0; i < this.options.buttonConfigs.length ; i++){","        var config = this.options.buttonConfigs[i];","        config.parentEl = this.editorContainer;","        this.buttons.push(new inputEx.widget.Button(config));","      }","      ","      // Line breaker ()","      this.editorContainer.appendChild( inputEx.cn('div',null, {clear: 'both'}) );","      ","      this.fieldContainer.appendChild(this.editorContainer);","      ","   },","   ","   /**","    * Set the color when hovering the field","    * @method onVisuMouseOver","    * @param {Event} e The original mouseover event","    */","   onVisuMouseOver: function(e) {","      // to totally disable the visual effect on mouse enter, you should change css options inputEx-InPlaceEdit-visu:hover","      if(this.disabled) {","         return;","      }","      ","      if(this.colorAnim) {","         this.colorAnim.stop(true);","      }","      inputEx.sn(this.formattedContainer, null, {backgroundColor: this.options.animColors.from });","   },","   ","   /**","    * Start the color animation when hovering the field","    * @method onVisuMouseOut","    * @param {Event} e The original mouseout event","    */","   onVisuMouseOut: function(e) {","      var optionsAnim;","      if(this.disabled) {","         return;","      }","      ","      // Start animation","      if(this.colorAnim) {","         this.colorAnim.stop(true);","      }","      if(!this.options.animColors) {","         return;","      }","","      optionsAnim =  {","        node: this.formattedContainer","      };","","      if(this.options.animColors.from){","        optionsAnim.from = {","          backgroundColor : this.options.animColors.from","        };","      }","      if(this.options.animColors.from){","        optionsAnim.to = {","          backgroundColor : this.options.animColors.to","        };","      }","      this.colorAnim = new Y.Anim(optionsAnim);","      var that = this;","      this.colorAnim.on(\"end\",function() { ","        Y.one(that.formattedContainer).setStyle('backgroundColor', ''); ","      });","      this.colorAnim.run();","      ","   },","   ","   /**","    * Create the div that will contain the visualization of the value","    * @method renderVisuDiv","    */","   renderVisuDiv: function() {","      this.formattedContainer = inputEx.cn('div', {className: 'inputEx-InPlaceEdit-visu'});","      ","      if( lang.isFunction(this.options.formatDom) ) {","         this.formattedContainer.appendChild( this.options.formatDom(this.options.value) );","      }","      else if( lang.isFunction(this.options.formatValue) ) {","         this.formattedContainer.innerHTML = this.options.formatValue(this.options.value);","      }","      else {","         this.formattedContainer.innerHTML = lang.isUndefined(this.options.value) ? this.messages.emptyInPlaceEdit: this.options.value;","      }","      ","      this.fieldContainer.appendChild(this.formattedContainer);","      ","   },","","   /**","    * Adds the events for the editor and color animations","    * @method initEvents","    */","   initEvents: function() {  ","      Y.one(this.formattedContainer).on(\"click\", this.openEditor, this, true);","            ","      // For color animation (if specified)","      if (this.options.animColors) {","         Y.one(this.formattedContainer).on('mouseover', this.onVisuMouseOver, this);","         Y.one(this.formattedContainer).on('mouseout', this.onVisuMouseOut, this);","      }","      ","      if(this.editorField.el) {","         var that = this;","         // Register some listeners","         Y.on(\"keyup\", function(e){ that.onKeyUp(e); },\"#\"+Y.one(this.editorField.el).get(\"id\"));","         Y.on(\"keydown\", function(e){ that.onKeyDown(e); },\"#\"+Y.one(this.editorField.el).get(\"id\"));","      }","   },","   ","   /**","    * Handle some keys events to close the editor","    * @method onKeyUp","    * @param {Event} e The original keyup event","    */","   onKeyUp: function(e) {","      // Enter","      if( e.keyCode === 13) {","         this.onOkEditor(e);","      }","      // Escape","      if( e.keyCode === 27) {","         this.onCancelEditor(e);","      }","   },","   ","   /**","    * Handle the tabulation key to close the editor","    * @method onKeyDown","    * @param {Event} e The original keydown event","    */","   onKeyDown: function(e) {","      // Tab","      if(e.keyCode === 9) {","         this.onOkEditor(e);","      }","   },","   ","   /**","    * Validate the editor (ok button, enter key or tabulation key)","    * @method onOkEditor","    */","   onOkEditor: function(e) {","","      if(e) {","         e.halt();","      }","      ","      var newValue = this.editorField.getValue();","      this.setValue(newValue);","      this.closeEditor();","      ","      var that = this;","      setTimeout(function() {that.fire(\"updated\",newValue);}, 50);      ","   },","","   ","   /**","    * Close the editor on cancel (cancel button, blur event or escape key)","    * @method onCancelEditor","    * @param {Event} e The original event (click, blur or keydown)","    */","   onCancelEditor: function(e) {","      if(e) {","         e.halt();","      }","      this.closeEditor();","   },","   ","   /**","    * Close the editor on cancel (cancel button, blur event or escape key)","    * @method closeEditor","    * @param {Event} e The original event (click, blur or keydown)","    */","   closeEditor: function() {","      this.editorContainer.style.display = 'none';","      this.formattedContainer.style.display = '';","      this.fire(\"closeEditor\");","   },  ","       ","   /**","    * Override enable to Enable openEditor","    * @method enable","    */","    enable: function(){","      this.disabled = false;","      inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu'});","    },  ","    ","   /**","    * Override disable to Disable openEditor","    * @method disable","    */   ","    disable: function(){","      this.disabled = true;","      inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu-disable'});","    },","    ","   /**","    * Display the editor","    * @method openEditor","    */","   openEditor: function() {","      if(this.disabled) {","         return; ","      }","","      var value = this.getValue();","      this.editorContainer.style.display = '';","      this.formattedContainer.style.display = 'none';","   ","      if(!lang.isUndefined(value)) {","         this.editorField.setValue(value);   ","      }","      ","      // Set focus in the element !","      this.editorField.focus();","   ","      // Select the content","      if(this.editorField.el && lang.isFunction(this.editorField.el.setSelectionRange) && (!!value && !!value.length)) {","         this.editorField.el.setSelectionRange(0,value.length);","      }","      this.fire(\"openEditor\");","   },","   ","   /**","    * Returned the previously stored value","    * @method getValue","    * @return {Any} The value of the subfield","    */","   getValue: function() {","      var editorOpened = (this.editorContainer.style.display === '');","      return editorOpened ? this.editorField.getValue() : this.value;","   },","","   /**","    * Set the value and update the display","    * @method setValue","    * @param {Any} value The value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {   ","      // Store the value","     this.value = value;","   ","      if(lang.isUndefined(value) || value === \"\") {","         inputEx.renderVisu(this.options.visu, this.messages.emptyInPlaceEdit, this.formattedContainer);","      }","      else {","         inputEx.renderVisu(this.options.visu, this.value, this.formattedContainer);","      }","      ","      // If the editor is opened, update it ","      if(this.editorContainer.style.display === '') {","         this.editorField.setValue(value);","      }","      ","      inputEx.InPlaceEdit.superclass.setValue.call(this, value, sendUpdatedEvt);","   },","   ","   /**","    * Close the editor when calling the close function on this field","    * @method close","    */","   close: function() {","      this.editorContainer.style.display = 'none';","      this.formattedContainer.style.display = '';","      this.fire(\"openEditor\");","  }","","});","  ","// Register this class as \"inplaceedit\" type","inputEx.registerType(\"inplaceedit\", inputEx.InPlaceEdit, [","   { type:'type', label: 'Editor', name: 'editorField'}","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"inputex-button\", \"anim\", \"inputex-visus\"], \"ix_provides\": \"inplaceedit\", \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"ca\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].lines = {"1":0,"6":0,"22":0,"23":0,"24":0,"25":0,"28":0,"36":0,"38":0,"41":0,"43":0,"45":0,"49":0,"51":0,"71":0,"73":0,"74":0,"75":0,"76":0,"81":0,"82":0,"83":0,"90":0,"94":0,"102":0,"103":0,"111":0,"113":0,"116":0,"117":0,"119":0,"120":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"128":0,"132":0,"134":0,"145":0,"146":0,"149":0,"150":0,"152":0,"161":0,"162":0,"163":0,"167":0,"168":0,"170":0,"171":0,"174":0,"178":0,"179":0,"183":0,"184":0,"188":0,"189":0,"190":0,"191":0,"193":0,"202":0,"204":0,"205":0,"207":0,"208":0,"211":0,"214":0,"223":0,"226":0,"227":0,"228":0,"231":0,"232":0,"234":0,"235":0,"246":0,"247":0,"250":0,"251":0,"262":0,"263":0,"273":0,"274":0,"277":0,"278":0,"279":0,"281":0,"282":0,"292":0,"293":0,"295":0,"304":0,"305":0,"306":0,"314":0,"315":0,"323":0,"324":0,"332":0,"333":0,"336":0,"337":0,"338":0,"340":0,"341":0,"345":0,"348":0,"349":0,"351":0,"360":0,"361":0,"372":0,"374":0,"375":0,"378":0,"382":0,"383":0,"386":0,"394":0,"395":0,"396":0,"402":0};
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].functions = {"InPlaceEdit:22":0,"(anonymous 2):71":0,"setOptions:34":0,"renderComponent:101":0,"renderEditor:110":0,"onVisuMouseOver:143":0,"(anonymous 3):190":0,"onVisuMouseOut:160":0,"renderVisuDiv:201":0,"(anonymous 4):234":0,"(anonymous 5):235":0,"initEvents:222":0,"onKeyUp:244":0,"onKeyDown:260":0,"(anonymous 6):282":0,"onOkEditor:271":0,"onCancelEditor:291":0,"closeEditor:303":0,"enable:313":0,"disable:322":0,"openEditor:331":0,"getValue:359":0,"setValue:370":0,"close:393":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].coveredLines = 125;
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].coveredFunctions = 25;
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
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 36);
var that = this;

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 38);
inputEx.InPlaceEdit.superclass.setOptions.call(this, options);
      
      //I18N
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 41);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-inplaceedit"));
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 43);
this.options.visu = options.visu;
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 45);
this.options.editorField = options.editorField;
      
      //this.options.buttonTypes = options.buttonTypes || {ok:"submit",cancel:"link"};

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 49);
if (!options.buttonConfigs) {
          // Default 
          _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 51);
this.options.buttonConfigs = [{
              type: "submit",
              value: this.messages.okEditor,
              className: "inputEx-Button " + CSS_PREFIX + 'OkButton',
              onClick: {
                  fn: this.onOkEditor,
                  scope: this
              }
          }, {
              type: "link",
              value: this.messages.cancelEditor,
              className: "inputEx-Button " + CSS_PREFIX + 'CancelLink',
              onClick: {
                  fn: this.onCancelEditor,
                  scope: this
              }
          }];

      } else {
          // Custumized buttons
          _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 71);
options.buttonConfigs.forEach(function (item) {

              _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 2)", 71);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 73);
if (item.isOkButton) {
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 74);
item.value = that.messages.okEditor;
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 75);
item.className ? item.className += "inputEx-Button " + CSS_PREFIX + 'OkButton' : "inputEx-Button " + CSS_PREFIX + 'OkButton';
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 76);
item.onClick ? item.onClick : item.onClick = {
                      fn: that.onOkEditor,
                      scope: that
                  };
              } else {
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 81);
item.value = that.messages.cancelEditor;
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 82);
item.className ? item.className += "inputEx-Button " + CSS_PREFIX + 'CancelLink' : "inputEx-Button " + CSS_PREFIX + 'CancelLink';
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 83);
item.onClick ? item.onClick : item.onClick = {
                      fn: that.onCancelEditor,
                      scope: that
                  };
              }
          });

          _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 90);
this.options.buttonConfigs = options.buttonConfigs;

      }
 
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 94);
this.options.animColors = options.animColors || null;
   },
   
   /**
    * Override renderComponent to create 2 divs: the visualization one, and the edit in place form
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderComponent", 101);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 102);
this.renderVisuDiv();
     _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 103);
this.renderEditor();
   },
   
   /**
    * Render the editor
    * @method renderEditor
    */
   renderEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderEditor", 110);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 111);
var i;

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 113);
this.editorContainer = inputEx.cn('div', {className: CSS_PREFIX+'editor'}, {display: 'none'});
      
      // Render the editor field
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 116);
if(!this.options.editorField){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 117);
throw new Error("Missing 'editorField' property in options");
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 119);
this.editorField = inputEx(this.options.editorField,this);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 120);
var editorFieldEl = this.editorField.getEl();
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 122);
this.editorContainer.appendChild( editorFieldEl );
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 123);
Y.one(editorFieldEl).addClass(CSS_PREFIX+'editorDiv');
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 124);
this.buttons = [];
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 125);
for (i = 0; i < this.options.buttonConfigs.length ; i++){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 126);
var config = this.options.buttonConfigs[i];
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 127);
config.parentEl = this.editorContainer;
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 128);
this.buttons.push(new inputEx.widget.Button(config));
      }
      
      // Line breaker ()
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 132);
this.editorContainer.appendChild( inputEx.cn('div',null, {clear: 'both'}) );
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 134);
this.fieldContainer.appendChild(this.editorContainer);
      
   },
   
   /**
    * Set the color when hovering the field
    * @method onVisuMouseOver
    * @param {Event} e The original mouseover event
    */
   onVisuMouseOver: function(e) {
      // to totally disable the visual effect on mouse enter, you should change css options inputEx-InPlaceEdit-visu:hover
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onVisuMouseOver", 143);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 145);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 146);
return;
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 149);
if(this.colorAnim) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 150);
this.colorAnim.stop(true);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 152);
inputEx.sn(this.formattedContainer, null, {backgroundColor: this.options.animColors.from });
   },
   
   /**
    * Start the color animation when hovering the field
    * @method onVisuMouseOut
    * @param {Event} e The original mouseout event
    */
   onVisuMouseOut: function(e) {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onVisuMouseOut", 160);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 161);
var optionsAnim;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 162);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 163);
return;
      }
      
      // Start animation
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 167);
if(this.colorAnim) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 168);
this.colorAnim.stop(true);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 170);
if(!this.options.animColors) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 171);
return;
      }

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 174);
optionsAnim =  {
        node: this.formattedContainer
      };

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 178);
if(this.options.animColors.from){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 179);
optionsAnim.from = {
          backgroundColor : this.options.animColors.from
        };
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 183);
if(this.options.animColors.from){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 184);
optionsAnim.to = {
          backgroundColor : this.options.animColors.to
        };
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 188);
this.colorAnim = new Y.Anim(optionsAnim);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 189);
var that = this;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 190);
this.colorAnim.on("end",function() { 
        _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 3)", 190);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 191);
Y.one(that.formattedContainer).setStyle('backgroundColor', ''); 
      });
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 193);
this.colorAnim.run();
      
   },
   
   /**
    * Create the div that will contain the visualization of the value
    * @method renderVisuDiv
    */
   renderVisuDiv: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderVisuDiv", 201);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 202);
this.formattedContainer = inputEx.cn('div', {className: 'inputEx-InPlaceEdit-visu'});
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 204);
if( lang.isFunction(this.options.formatDom) ) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 205);
this.formattedContainer.appendChild( this.options.formatDom(this.options.value) );
      }
      else {_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 207);
if( lang.isFunction(this.options.formatValue) ) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 208);
this.formattedContainer.innerHTML = this.options.formatValue(this.options.value);
      }
      else {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 211);
this.formattedContainer.innerHTML = lang.isUndefined(this.options.value) ? this.messages.emptyInPlaceEdit: this.options.value;
      }}
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 214);
this.fieldContainer.appendChild(this.formattedContainer);
      
   },

   /**
    * Adds the events for the editor and color animations
    * @method initEvents
    */
   initEvents: function() {  
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "initEvents", 222);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 223);
Y.one(this.formattedContainer).on("click", this.openEditor, this, true);
            
      // For color animation (if specified)
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 226);
if (this.options.animColors) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 227);
Y.one(this.formattedContainer).on('mouseover', this.onVisuMouseOver, this);
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 228);
Y.one(this.formattedContainer).on('mouseout', this.onVisuMouseOut, this);
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 231);
if(this.editorField.el) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 232);
var that = this;
         // Register some listeners
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 234);
Y.on("keyup", function(e){ _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 4)", 234);
that.onKeyUp(e); },"#"+Y.one(this.editorField.el).get("id"));
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 235);
Y.on("keydown", function(e){ _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 5)", 235);
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
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onKeyUp", 244);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 246);
if( e.keyCode === 13) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 247);
this.onOkEditor(e);
      }
      // Escape
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 250);
if( e.keyCode === 27) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 251);
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
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onKeyDown", 260);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 262);
if(e.keyCode === 9) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 263);
this.onOkEditor(e);
      }
   },
   
   /**
    * Validate the editor (ok button, enter key or tabulation key)
    * @method onOkEditor
    */
   onOkEditor: function(e) {

      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onOkEditor", 271);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 273);
if(e) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 274);
e.halt();
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 277);
var newValue = this.editorField.getValue();
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 278);
this.setValue(newValue);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 279);
this.closeEditor();
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 281);
var that = this;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 282);
setTimeout(function() {_yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 6)", 282);
that.fire("updated",newValue);}, 50);      
   },

   
   /**
    * Close the editor on cancel (cancel button, blur event or escape key)
    * @method onCancelEditor
    * @param {Event} e The original event (click, blur or keydown)
    */
   onCancelEditor: function(e) {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onCancelEditor", 291);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 292);
if(e) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 293);
e.halt();
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 295);
this.closeEditor();
   },
   
   /**
    * Close the editor on cancel (cancel button, blur event or escape key)
    * @method closeEditor
    * @param {Event} e The original event (click, blur or keydown)
    */
   closeEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "closeEditor", 303);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 304);
this.editorContainer.style.display = 'none';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 305);
this.formattedContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 306);
this.fire("closeEditor");
   },  
       
   /**
    * Override enable to Enable openEditor
    * @method enable
    */
    enable: function(){
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "enable", 313);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 314);
this.disabled = false;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 315);
inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu'});
    },  
    
   /**
    * Override disable to Disable openEditor
    * @method disable
    */   
    disable: function(){
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "disable", 322);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 323);
this.disabled = true;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 324);
inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu-disable'});
    },
    
   /**
    * Display the editor
    * @method openEditor
    */
   openEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "openEditor", 331);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 332);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 333);
return; 
      }

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 336);
var value = this.getValue();
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 337);
this.editorContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 338);
this.formattedContainer.style.display = 'none';
   
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 340);
if(!lang.isUndefined(value)) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 341);
this.editorField.setValue(value);   
      }
      
      // Set focus in the element !
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 345);
this.editorField.focus();
   
      // Select the content
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 348);
if(this.editorField.el && lang.isFunction(this.editorField.el.setSelectionRange) && (!!value && !!value.length)) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 349);
this.editorField.el.setSelectionRange(0,value.length);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 351);
this.fire("openEditor");
   },
   
   /**
    * Returned the previously stored value
    * @method getValue
    * @return {Any} The value of the subfield
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "getValue", 359);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 360);
var editorOpened = (this.editorContainer.style.display === '');
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 361);
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
     _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "setValue", 370);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 372);
this.value = value;
   
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 374);
if(lang.isUndefined(value) || value === "") {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 375);
inputEx.renderVisu(this.options.visu, this.messages.emptyInPlaceEdit, this.formattedContainer);
      }
      else {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 378);
inputEx.renderVisu(this.options.visu, this.value, this.formattedContainer);
      }
      
      // If the editor is opened, update it 
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 382);
if(this.editorContainer.style.display === '') {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 383);
this.editorField.setValue(value);
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 386);
inputEx.InPlaceEdit.superclass.setValue.call(this, value, sendUpdatedEvt);
   },
   
   /**
    * Close the editor when calling the close function on this field
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "close", 393);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 394);
this.editorContainer.style.display = 'none';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 395);
this.formattedContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 396);
this.fire("openEditor");
  }

});
  
// Register this class as "inplaceedit" type
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 402);
inputEx.registerType("inplaceedit", inputEx.InPlaceEdit, [
   { type:'type', label: 'Editor', name: 'editorField'}
]);


}, '@VERSION@', {"requires": ["inputex-field", "inputex-button", "anim", "inputex-visus"], "ix_provides": "inplaceedit", "skinnable": true, "lang": ["en", "fr", "de", "ca", "es", "fr", "it", "nl"]});
