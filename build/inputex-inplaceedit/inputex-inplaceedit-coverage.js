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
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].code=["YUI.add('inputex-inplaceedit', function (Y, NAME) {","","/**"," * @module inputex-inplaceedit"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx,","       CSS_PREFIX = \"inputEx-\";","","/**"," * Meta field providing in place editing (the editor appears when you click on the formatted value)."," * @class inputEx.InPlaceEdit"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *   <li>visu</li>"," *   <li>editorField</li>"," *   <li>animColors</li>"," * </ul>"," */","inputEx.InPlaceEdit = function(options) {","   inputEx.InPlaceEdit.superclass.constructor.call(this, options);","   this.publish('openEditor');","   this.publish('closeEditor');","};","","Y.extend(inputEx.InPlaceEdit, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      var that = this,","      buttonConfigs, buttonConfigsLength ,i, item;","","","      inputEx.InPlaceEdit.superclass.setOptions.call(this, options);","      ","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-inplaceedit\"));","      ","      this.options.visu = options.visu;","      ","      this.options.editorField = options.editorField;","      ","      //this.options.buttonTypes = options.buttonTypes || {ok:\"submit\",cancel:\"link\"};","","      if (!options.buttonConfigs) {","          // Default","          this.options.buttonConfigs = [{","              type: \"submit\",","              value: this.messages.okEditor,","              className: \"inputEx-Button \" + CSS_PREFIX + 'OkButton',","              onClick: {","                  fn: this.onOkEditor,","                  scope: this","              }","          }, {","              type: \"link\",","              value: this.messages.cancelEditor,","              className: \"inputEx-Button \" + CSS_PREFIX + 'CancelLink',","              onClick: {","                  fn: this.onCancelEditor,","                  scope: this","              }","          }];","","      } else {","          // Custumized buttons","          buttonConfigs = options.buttonConfigs,","          buttonConfigsLength = buttonConfigs.length,","          i, item;","","","          for (i = 0 ; i < buttonConfigsLength ; i++){","            item = buttonConfigs[i]  ;"," ","              if (item.isOkButton) {","                  item.value = item.value || that.messages.okEditor;","                  item.className ? item.className += \"inputEx-Button \" + CSS_PREFIX + 'OkButton' : \"inputEx-Button \" + CSS_PREFIX + 'OkButton';","                  item.onClick ? item.onClick : item.onClick = {","                      fn: that.onOkEditor,","                      scope: that","                  };","              } else {","                  item.value = item.value || that.messages.cancelEditor;","                  item.className ? item.className += \"inputEx-Button \" + CSS_PREFIX + 'CancelLink' : \"inputEx-Button \" + CSS_PREFIX + 'CancelLink';","                  item.onClick ? item.onClick : item.onClick = {","                      fn: that.onCancelEditor,","                      scope: that","                };","              }","          }","","          this.options.buttonConfigs = buttonConfigs;","","      }"," ","      this.options.animColors = options.animColors || null;","   },","   ","   /**","    * Override renderComponent to create 2 divs: the visualization one, and the edit in place form","    * @method renderComponent","    */","   renderComponent: function() {","      this.renderVisuDiv();","     this.renderEditor();","   },","   ","   /**","    * Render the editor","    * @method renderEditor","    */","   renderEditor: function() {","      var i,","         editorFieldEl,","         config;","","      this.editorContainer = inputEx.cn('div', {className: CSS_PREFIX+'editor'}, {display: 'none'});","      ","      // Render the editor field","      if(!this.options.editorField){","        throw new Error(\"Missing 'editorField' property in options\");","      }","      this.editorField = inputEx(this.options.editorField,this);","      editorFieldEl = this.editorField.getEl();","      ","      this.editorContainer.appendChild( editorFieldEl );","      Y.one(editorFieldEl).addClass(CSS_PREFIX+'editorDiv');","      this.buttons = [];","      for (i = 0; i < this.options.buttonConfigs.length ; i++){","        config = this.options.buttonConfigs[i];","        config.parentEl = this.editorContainer;","        this.buttons.push(new inputEx.widget.Button(config));","      }","      ","      // Line breaker ()","      this.editorContainer.appendChild( inputEx.cn('div',null, {clear: 'both'}) );","      ","      this.fieldContainer.appendChild(this.editorContainer);","      ","   },","   ","   /**","    * Set the color when hovering the field","    * @method onVisuMouseOver","    * @param {Event} e The original mouseover event","    */","   onVisuMouseOver: function() {","      // to totally disable the visual effect on mouse enter, you should change css options inputEx-InPlaceEdit-visu:hover","      if(this.disabled) {","         return;","      }","      ","      if(this.colorAnim) {","         this.colorAnim.stop(true);","      }","      inputEx.sn(this.formattedContainer, null, {backgroundColor: this.options.animColors.from });","   },","   ","   /**","    * Start the color animation when hovering the field","    * @method onVisuMouseOut","    * @param {Event} e The original mouseout event","    */","   onVisuMouseOut: function() {","      var optionsAnim, that;","      if(this.disabled) {","         return;","      }","      ","      // Start animation","      if(this.colorAnim) {","         this.colorAnim.stop(true);","      }","      if(!this.options.animColors) {","         return;","      }","","      optionsAnim =  {","        node: this.formattedContainer","      };","","      if(this.options.animColors.from){","        optionsAnim.from = {","          backgroundColor : this.options.animColors.from","        };","      }","      if(this.options.animColors.from){","        optionsAnim.to = {","          backgroundColor : this.options.animColors.to","        };","      }","      this.colorAnim = new Y.Anim(optionsAnim);","      that = this;","      this.colorAnim.on(\"end\",function() {","        Y.one(that.formattedContainer).setStyle('backgroundColor', '');","      });","      this.colorAnim.run();","      ","   },","   ","   /**","    * Create the div that will contain the visualization of the value","    * @method renderVisuDiv","    */","   renderVisuDiv: function() {","      this.formattedContainer = inputEx.cn('div', {className: 'inputEx-InPlaceEdit-visu'});","      ","      if( lang.isFunction(this.options.formatDom) ) {","         this.formattedContainer.appendChild( this.options.formatDom(this.options.value) );","      }","      else if( lang.isFunction(this.options.formatValue) ) {","         this.formattedContainer.innerHTML = this.options.formatValue(this.options.value);","      }","      else {","         this.formattedContainer.innerHTML = lang.isUndefined(this.options.value) ? this.messages.emptyInPlaceEdit: this.options.value;","      }","      ","      this.fieldContainer.appendChild(this.formattedContainer);","      ","   },","","   /**","    * Adds the events for the editor and color animations","    * @method initEvents","    */","   initEvents: function() {","      Y.one(this.formattedContainer).on(\"click\", this.openEditor, this, true);","            ","      // For color animation (if specified)","      if (this.options.animColors) {","         Y.one(this.formattedContainer).on('mouseover', this.onVisuMouseOver, this);","         Y.one(this.formattedContainer).on('mouseout', this.onVisuMouseOut, this);","      }","      ","      if(this.editorField.el) {","         var that = this;","         // Register some listeners","         Y.on(\"keyup\", function(e){ that.onKeyUp(e); },\"#\"+Y.one(this.editorField.el).get(\"id\"));","         Y.on(\"keydown\", function(e){ that.onKeyDown(e); },\"#\"+Y.one(this.editorField.el).get(\"id\"));","      }","   },","   ","   /**","    * Handle some keys events to close the editor","    * @method onKeyUp","    * @param {Event} e The original keyup event","    */","   onKeyUp: function(e) {","      // Enter","      if( e.keyCode === 13) {","         this.onOkEditor(e);","      }","      // Escape","      if( e.keyCode === 27) {","         this.onCancelEditor(e);","      }","   },","   ","   /**","    * Handle the tabulation key to close the editor","    * @method onKeyDown","    * @param {Event} e The original keydown event","    */","   onKeyDown: function(e) {","      // Tab","      if(e.keyCode === 9) {","         this.onOkEditor(e);","      }","   },","   ","   /**","    * Validate the editor (ok button, enter key or tabulation key)","    * @method onOkEditor","    */","   onOkEditor: function(e) {","","      var newValue, that;","","      if(e) {","         e.halt();","      }","      ","      newValue = this.editorField.getValue();","      this.setValue(newValue);","      this.closeEditor();","      ","      that = this;","      setTimeout(function() {that.fire(\"updated\",newValue);}, 50);","   },","","   ","   /**","    * Close the editor on cancel (cancel button, blur event or escape key)","    * @method onCancelEditor","    * @param {Event} e The original event (click, blur or keydown)","    */","   onCancelEditor: function(e) {","      if(e) {","         e.halt();","      }","      this.closeEditor();","   },","   ","   /**","    * Close the editor on cancel (cancel button, blur event or escape key)","    * @method closeEditor","    * @param {Event} e The original event (click, blur or keydown)","    */","   closeEditor: function() {","      this.editorContainer.style.display = 'none';","      this.formattedContainer.style.display = '';","      this.fire(\"closeEditor\");","   },","       ","   /**","    * Override enable to Enable openEditor","    * @method enable","    */","    enable: function(){","      this.disabled = false;","      inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu'});","    },","    ","   /**","    * Override disable to Disable openEditor","    * @method disable","    */","    disable: function(){","      this.disabled = true;","      inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu-disable'});","    },","    ","   /**","    * Display the editor","    * @method openEditor","    */","   openEditor: function() {","      if(this.disabled) {","         return;","      }","","      var value = this.getValue();","      this.editorContainer.style.display = '';","      this.formattedContainer.style.display = 'none';","   ","      if(!lang.isUndefined(value)) {","         this.editorField.setValue(value);","      }","      ","      // Set focus in the element !","      this.editorField.focus();","   ","      // Select the content","      if(this.editorField.el && lang.isFunction(this.editorField.el.setSelectionRange) && (!!value && !!value.length)) {","         this.editorField.el.setSelectionRange(0,value.length);","      }","      this.fire(\"openEditor\");","   },","   ","   /**","    * Returned the previously stored value","    * @method getValue","    * @return {Any} The value of the subfield","    */","   getValue: function() {","      var editorOpened = (this.editorContainer.style.display === '');","      return editorOpened ? this.editorField.getValue() : this.value;","   },","","   /**","    * Set the value and update the display","    * @method setValue","    * @param {Any} value The value to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated'","    * event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","      // Store the value","     this.value = value;","   ","      if(lang.isUndefined(value) || value === \"\") {","         inputEx.renderVisu(this.options.visu, this.messages.emptyInPlaceEdit, this.formattedContainer);","      }","      else {","         inputEx.renderVisu(this.options.visu, this.value, this.formattedContainer);","      }","      ","      // If the editor is opened, update it","      if(this.editorContainer.style.display === '') {","         this.editorField.setValue(value);","      }","      ","      inputEx.InPlaceEdit.superclass.setValue.call(this, value, sendUpdatedEvt);","   },","   ","   /**","    * Close the editor when calling the close function on this field","    * @method close","    */","   close: function() {","      this.editorContainer.style.display = 'none';","      this.formattedContainer.style.display = '';","      this.fire(\"openEditor\");","  }","","});","  ","// Register this class as \"inplaceedit\" type","inputEx.registerType(\"inplaceedit\", inputEx.InPlaceEdit, [","   { type:'type', label: 'Editor', name: 'editorField'}","]);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"inputex-button\",","        \"anim-base\",","        \"anim-color\",","        \"inputex-visus\"","    ],","    \"ix_provides\": \"inplaceedit\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].lines = {"1":0,"6":0,"22":0,"23":0,"24":0,"25":0,"28":0,"36":0,"40":0,"43":0,"45":0,"47":0,"51":0,"53":0,"73":0,"78":0,"79":0,"81":0,"82":0,"83":0,"84":0,"89":0,"90":0,"91":0,"98":0,"102":0,"110":0,"111":0,"119":0,"123":0,"126":0,"127":0,"129":0,"130":0,"132":0,"133":0,"134":0,"135":0,"136":0,"137":0,"138":0,"142":0,"144":0,"155":0,"156":0,"159":0,"160":0,"162":0,"171":0,"172":0,"173":0,"177":0,"178":0,"180":0,"181":0,"184":0,"188":0,"189":0,"193":0,"194":0,"198":0,"199":0,"200":0,"201":0,"203":0,"212":0,"214":0,"215":0,"217":0,"218":0,"221":0,"224":0,"233":0,"236":0,"237":0,"238":0,"241":0,"242":0,"244":0,"245":0,"256":0,"257":0,"260":0,"261":0,"272":0,"273":0,"283":0,"285":0,"286":0,"289":0,"290":0,"291":0,"293":0,"294":0,"304":0,"305":0,"307":0,"316":0,"317":0,"318":0,"326":0,"327":0,"335":0,"336":0,"344":0,"345":0,"348":0,"349":0,"350":0,"352":0,"353":0,"357":0,"360":0,"361":0,"363":0,"372":0,"373":0,"385":0,"387":0,"388":0,"391":0,"395":0,"396":0,"399":0,"407":0,"408":0,"409":0,"415":0};
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].functions = {"InPlaceEdit:22":0,"setOptions:34":0,"renderComponent:109":0,"renderEditor:118":0,"onVisuMouseOver:153":0,"(anonymous 2):200":0,"onVisuMouseOut:170":0,"renderVisuDiv:211":0,"(anonymous 3):244":0,"(anonymous 4):245":0,"initEvents:232":0,"onKeyUp:254":0,"onKeyDown:270":0,"(anonymous 5):294":0,"onOkEditor:281":0,"onCancelEditor:303":0,"closeEditor:315":0,"enable:325":0,"disable:334":0,"openEditor:343":0,"getValue:371":0,"setValue:383":0,"close:406":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-inplaceedit/inputex-inplaceedit.js"].coveredLines = 128;
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
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 36);
var that = this,
      buttonConfigs, buttonConfigsLength ,i, item;


      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 40);
inputEx.InPlaceEdit.superclass.setOptions.call(this, options);
      
      //I18N
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 43);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-inplaceedit"));
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 45);
this.options.visu = options.visu;
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 47);
this.options.editorField = options.editorField;
      
      //this.options.buttonTypes = options.buttonTypes || {ok:"submit",cancel:"link"};

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 51);
if (!options.buttonConfigs) {
          // Default
          _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 53);
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
          _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 73);
buttonConfigs = options.buttonConfigs,
          buttonConfigsLength = buttonConfigs.length,
          i, item;


          _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 78);
for (i = 0 ; i < buttonConfigsLength ; i++){
            _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 79);
item = buttonConfigs[i]  ;
 
              _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 81);
if (item.isOkButton) {
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 82);
item.value = item.value || that.messages.okEditor;
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 83);
item.className ? item.className += "inputEx-Button " + CSS_PREFIX + 'OkButton' : "inputEx-Button " + CSS_PREFIX + 'OkButton';
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 84);
item.onClick ? item.onClick : item.onClick = {
                      fn: that.onOkEditor,
                      scope: that
                  };
              } else {
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 89);
item.value = item.value || that.messages.cancelEditor;
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 90);
item.className ? item.className += "inputEx-Button " + CSS_PREFIX + 'CancelLink' : "inputEx-Button " + CSS_PREFIX + 'CancelLink';
                  _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 91);
item.onClick ? item.onClick : item.onClick = {
                      fn: that.onCancelEditor,
                      scope: that
                };
              }
          }

          _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 98);
this.options.buttonConfigs = buttonConfigs;

      }
 
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 102);
this.options.animColors = options.animColors || null;
   },
   
   /**
    * Override renderComponent to create 2 divs: the visualization one, and the edit in place form
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderComponent", 109);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 110);
this.renderVisuDiv();
     _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 111);
this.renderEditor();
   },
   
   /**
    * Render the editor
    * @method renderEditor
    */
   renderEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderEditor", 118);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 119);
var i,
         editorFieldEl,
         config;

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 123);
this.editorContainer = inputEx.cn('div', {className: CSS_PREFIX+'editor'}, {display: 'none'});
      
      // Render the editor field
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 126);
if(!this.options.editorField){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 127);
throw new Error("Missing 'editorField' property in options");
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 129);
this.editorField = inputEx(this.options.editorField,this);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 130);
editorFieldEl = this.editorField.getEl();
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 132);
this.editorContainer.appendChild( editorFieldEl );
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 133);
Y.one(editorFieldEl).addClass(CSS_PREFIX+'editorDiv');
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 134);
this.buttons = [];
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 135);
for (i = 0; i < this.options.buttonConfigs.length ; i++){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 136);
config = this.options.buttonConfigs[i];
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 137);
config.parentEl = this.editorContainer;
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 138);
this.buttons.push(new inputEx.widget.Button(config));
      }
      
      // Line breaker ()
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 142);
this.editorContainer.appendChild( inputEx.cn('div',null, {clear: 'both'}) );
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 144);
this.fieldContainer.appendChild(this.editorContainer);
      
   },
   
   /**
    * Set the color when hovering the field
    * @method onVisuMouseOver
    * @param {Event} e The original mouseover event
    */
   onVisuMouseOver: function() {
      // to totally disable the visual effect on mouse enter, you should change css options inputEx-InPlaceEdit-visu:hover
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onVisuMouseOver", 153);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 155);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 156);
return;
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 159);
if(this.colorAnim) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 160);
this.colorAnim.stop(true);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 162);
inputEx.sn(this.formattedContainer, null, {backgroundColor: this.options.animColors.from });
   },
   
   /**
    * Start the color animation when hovering the field
    * @method onVisuMouseOut
    * @param {Event} e The original mouseout event
    */
   onVisuMouseOut: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onVisuMouseOut", 170);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 171);
var optionsAnim, that;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 172);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 173);
return;
      }
      
      // Start animation
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 177);
if(this.colorAnim) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 178);
this.colorAnim.stop(true);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 180);
if(!this.options.animColors) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 181);
return;
      }

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 184);
optionsAnim =  {
        node: this.formattedContainer
      };

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 188);
if(this.options.animColors.from){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 189);
optionsAnim.from = {
          backgroundColor : this.options.animColors.from
        };
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 193);
if(this.options.animColors.from){
        _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 194);
optionsAnim.to = {
          backgroundColor : this.options.animColors.to
        };
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 198);
this.colorAnim = new Y.Anim(optionsAnim);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 199);
that = this;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 200);
this.colorAnim.on("end",function() {
        _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 2)", 200);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 201);
Y.one(that.formattedContainer).setStyle('backgroundColor', '');
      });
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 203);
this.colorAnim.run();
      
   },
   
   /**
    * Create the div that will contain the visualization of the value
    * @method renderVisuDiv
    */
   renderVisuDiv: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "renderVisuDiv", 211);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 212);
this.formattedContainer = inputEx.cn('div', {className: 'inputEx-InPlaceEdit-visu'});
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 214);
if( lang.isFunction(this.options.formatDom) ) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 215);
this.formattedContainer.appendChild( this.options.formatDom(this.options.value) );
      }
      else {_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 217);
if( lang.isFunction(this.options.formatValue) ) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 218);
this.formattedContainer.innerHTML = this.options.formatValue(this.options.value);
      }
      else {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 221);
this.formattedContainer.innerHTML = lang.isUndefined(this.options.value) ? this.messages.emptyInPlaceEdit: this.options.value;
      }}
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 224);
this.fieldContainer.appendChild(this.formattedContainer);
      
   },

   /**
    * Adds the events for the editor and color animations
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "initEvents", 232);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 233);
Y.one(this.formattedContainer).on("click", this.openEditor, this, true);
            
      // For color animation (if specified)
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 236);
if (this.options.animColors) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 237);
Y.one(this.formattedContainer).on('mouseover', this.onVisuMouseOver, this);
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 238);
Y.one(this.formattedContainer).on('mouseout', this.onVisuMouseOut, this);
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 241);
if(this.editorField.el) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 242);
var that = this;
         // Register some listeners
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 244);
Y.on("keyup", function(e){ _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 3)", 244);
that.onKeyUp(e); },"#"+Y.one(this.editorField.el).get("id"));
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 245);
Y.on("keydown", function(e){ _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 4)", 245);
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
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onKeyUp", 254);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 256);
if( e.keyCode === 13) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 257);
this.onOkEditor(e);
      }
      // Escape
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 260);
if( e.keyCode === 27) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 261);
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
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onKeyDown", 270);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 272);
if(e.keyCode === 9) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 273);
this.onOkEditor(e);
      }
   },
   
   /**
    * Validate the editor (ok button, enter key or tabulation key)
    * @method onOkEditor
    */
   onOkEditor: function(e) {

      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onOkEditor", 281);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 283);
var newValue, that;

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 285);
if(e) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 286);
e.halt();
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 289);
newValue = this.editorField.getValue();
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 290);
this.setValue(newValue);
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 291);
this.closeEditor();
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 293);
that = this;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 294);
setTimeout(function() {_yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "(anonymous 5)", 294);
that.fire("updated",newValue);}, 50);
   },

   
   /**
    * Close the editor on cancel (cancel button, blur event or escape key)
    * @method onCancelEditor
    * @param {Event} e The original event (click, blur or keydown)
    */
   onCancelEditor: function(e) {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "onCancelEditor", 303);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 304);
if(e) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 305);
e.halt();
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 307);
this.closeEditor();
   },
   
   /**
    * Close the editor on cancel (cancel button, blur event or escape key)
    * @method closeEditor
    * @param {Event} e The original event (click, blur or keydown)
    */
   closeEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "closeEditor", 315);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 316);
this.editorContainer.style.display = 'none';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 317);
this.formattedContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 318);
this.fire("closeEditor");
   },
       
   /**
    * Override enable to Enable openEditor
    * @method enable
    */
    enable: function(){
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "enable", 325);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 326);
this.disabled = false;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 327);
inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu'});
    },
    
   /**
    * Override disable to Disable openEditor
    * @method disable
    */
    disable: function(){
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "disable", 334);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 335);
this.disabled = true;
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 336);
inputEx.sn(this.formattedContainer, {className: 'inputEx-InPlaceEdit-visu-disable'});
    },
    
   /**
    * Display the editor
    * @method openEditor
    */
   openEditor: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "openEditor", 343);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 344);
if(this.disabled) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 345);
return;
      }

      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 348);
var value = this.getValue();
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 349);
this.editorContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 350);
this.formattedContainer.style.display = 'none';
   
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 352);
if(!lang.isUndefined(value)) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 353);
this.editorField.setValue(value);
      }
      
      // Set focus in the element !
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 357);
this.editorField.focus();
   
      // Select the content
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 360);
if(this.editorField.el && lang.isFunction(this.editorField.el.setSelectionRange) && (!!value && !!value.length)) {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 361);
this.editorField.el.setSelectionRange(0,value.length);
      }
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 363);
this.fire("openEditor");
   },
   
   /**
    * Returned the previously stored value
    * @method getValue
    * @return {Any} The value of the subfield
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "getValue", 371);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 372);
var editorOpened = (this.editorContainer.style.display === '');
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 373);
return editorOpened ? this.editorField.getValue() : this.value;
   },

   /**
    * Set the value and update the display
    * @method setValue
    * @param {Any} value The value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated'
    * event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {
      // Store the value
     _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "setValue", 383);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 385);
this.value = value;
   
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 387);
if(lang.isUndefined(value) || value === "") {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 388);
inputEx.renderVisu(this.options.visu, this.messages.emptyInPlaceEdit, this.formattedContainer);
      }
      else {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 391);
inputEx.renderVisu(this.options.visu, this.value, this.formattedContainer);
      }
      
      // If the editor is opened, update it
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 395);
if(this.editorContainer.style.display === '') {
         _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 396);
this.editorField.setValue(value);
      }
      
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 399);
inputEx.InPlaceEdit.superclass.setValue.call(this, value, sendUpdatedEvt);
   },
   
   /**
    * Close the editor when calling the close function on this field
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-inplaceedit/inputex-inplaceedit.js", "close", 406);
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 407);
this.editorContainer.style.display = 'none';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 408);
this.formattedContainer.style.display = '';
      _yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 409);
this.fire("openEditor");
  }

});
  
// Register this class as "inplaceedit" type
_yuitest_coverline("build/inputex-inplaceedit/inputex-inplaceedit.js", 415);
inputEx.registerType("inplaceedit", inputEx.InPlaceEdit, [
   { type:'type', label: 'Editor', name: 'editorField'}
]);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "inputex-button",
        "anim-base",
        "anim-color",
        "inputex-visus"
    ],
    "ix_provides": "inplaceedit",
    "skinnable": true,
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl"
    ]
});
