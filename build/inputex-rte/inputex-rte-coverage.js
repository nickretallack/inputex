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
_yuitest_coverage["build/inputex-rte/inputex-rte.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-rte/inputex-rte.js",
    code: []
};
_yuitest_coverage["build/inputex-rte/inputex-rte.js"].code=["YUI.add('inputex-rte', function (Y, NAME) {","","/**"," * WARNING: this field requires YUI2 (for the YUI2 Riche Text Editor)"," * @module inputex-rte"," */","   var inputEx = Y.inputEx,","       YAHOO = Y.YUI2,","       lang = Y.Lang;","   ","/**"," * Wrapper for the Rich Text Editor from YUI"," * @class inputEx.RTEField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *   <li>opts: the options to be added when calling the RTE constructor (see YUI RTE)</li>"," *   <li>editorType: if == 'simple', the field will use the SimpleEditor. Any other value will use the Editor class.</li>"," * </ul>"," */","inputEx.RTEField = function(options) {","   inputEx.RTEField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.RTEField, inputEx.Field, {   ","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","     setOptions: function(options) {","        inputEx.RTEField.superclass.setOptions.call(this, options);","        ","        this.options.opts = options.opts || {};","        this.options.editorType = options.editorType;","   },","   ","   /**","    * Render the field using the YUI Editor widget","    * @method renderComponent","    */   ","   renderComponent: function() {","      if(!inputEx.RTEfieldsNumber) { inputEx.RTEfieldsNumber = 0; }","      ","      var id = \"inputEx-RTEField-\"+inputEx.RTEfieldsNumber;","      var attributes = {id:id};","      if(this.options.name) { attributes.name = this.options.name; }","      ","      this.el = inputEx.cn('textarea', attributes);","      ","      inputEx.RTEfieldsNumber += 1;","      this.fieldContainer.appendChild(this.el);","   ","      //This is the default config","      var _def = {","          height: '300px',","          width: '580px',","          dompath: true,","          filterWord:true // get rid of the MS word junk","      };","      //The options object","      var o = this.options.opts;","      //Walk it to set the new config object","      for (var i in o) {","           if (lang.hasOwnProperty(o, i)) {","               _def[i] = o[i];","           }","      }","      //Check if options.editorType is present and set to simple, if it is use SimpleEditor instead of Editor","      var editorType = ((this.options.editorType && (this.options.editorType == 'simple')) ? YAHOO.widget.SimpleEditor : YAHOO.widget.Editor);","   ","      //If this fails then the code is not loaded on the page","      if (editorType) {","          this.editor = new editorType(id, _def);","          this.editor.render();","      } else {","       alert('Editor is not on the page');","      }","      ","      ","      //","      // Filters out msword html comments, classes, and other junk","      // (complementary with YAHOO.widget.SimpleEditor.prototype.filter_msword, when filterWord option is true)","      // @param {String} value The html string","      // @return {String} The html string","      this.editor.filter_msword = function(html) {","         ","         html = editorType.prototype.filter_msword.call(this,html);","         ","         // if we don't filter ms word junk","         if (!this.get('filterWord')) {","            return html;","         }","","         html = html.replace( /<!--[^>][\\s\\S]*-->/gi, ''); // strip (meta-)comments","         html = html.replace( /<\\/?meta[^>]*>/gi, ''); // strip meta tags","         html = html.replace( /<\\/?link[^>]*>/gi, ''); // strip link tags","         html = html.replace( / class=('|\")?MsoNormal('|\")?/gi, ''); // strip MS office class","         html = Y.Lang.trim(html); // trim spaces","         ","         return html;","      };","      ","   },","   ","   /**","    * Set the html content","    * @method setValue","    * @param {String} value The html string","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","      if(this.editor) {","         var iframeId = this.el.id+\"_editor\";","         ","         // if editor iframe not rendered","         if (!YAHOO.util.Dom.get(iframeId)) {","            // put value in textarea : will be processed by this.editor._setInitialContent (clean html, etc...)","            this.el.value = value;","            ","         } else {","            this.editor.setEditorHTML(value);","         }","      }","      ","      if(sendUpdatedEvt !== false) {","         // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   /**","    * Get the html string","    * @method getValue","    * @return {String} the html string","    */","   getValue: function() {","      ","      var html;","      ","      try {","         // trigger HTML cleaning (strip MS word or internal junk)","         // + save to hidden textarea (required for classic HTML 'submit')","         html = this.editor.saveHTML();","         return html;","      }","      catch(ex) { return null; }","   }","   ","   ","});","   ","// Register this class as \"html\" type","inputEx.registerType(\"html\", inputEx.RTEField, []);","   ","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"yui2-editor\"], \"ix_provides\": \"html\"});"];
_yuitest_coverage["build/inputex-rte/inputex-rte.js"].lines = {"1":0,"7":0,"22":0,"23":0,"25":0,"32":0,"34":0,"35":0,"43":0,"45":0,"46":0,"47":0,"49":0,"51":0,"52":0,"55":0,"62":0,"64":0,"65":0,"66":0,"70":0,"73":0,"74":0,"75":0,"77":0,"86":0,"88":0,"91":0,"92":0,"95":0,"96":0,"97":0,"98":0,"99":0,"101":0,"113":0,"114":0,"117":0,"119":0,"122":0,"126":0,"128":0,"139":0,"141":0,"144":0,"145":0,"147":0,"154":0};
_yuitest_coverage["build/inputex-rte/inputex-rte.js"].functions = {"RTEField:22":0,"setOptions:31":0,"filter_msword:86":0,"renderComponent:42":0,"setValue:112":0,"getValue:137":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-rte/inputex-rte.js"].coveredLines = 48;
_yuitest_coverage["build/inputex-rte/inputex-rte.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 1);
YUI.add('inputex-rte', function (Y, NAME) {

/**
 * WARNING: this field requires YUI2 (for the YUI2 Riche Text Editor)
 * @module inputex-rte
 */
   _yuitest_coverfunc("build/inputex-rte/inputex-rte.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 7);
var inputEx = Y.inputEx,
       YAHOO = Y.YUI2,
       lang = Y.Lang;
   
/**
 * Wrapper for the Rich Text Editor from YUI
 * @class inputEx.RTEField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *   <li>opts: the options to be added when calling the RTE constructor (see YUI RTE)</li>
 *   <li>editorType: if == 'simple', the field will use the SimpleEditor. Any other value will use the Editor class.</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 22);
inputEx.RTEField = function(options) {
   _yuitest_coverfunc("build/inputex-rte/inputex-rte.js", "RTEField", 22);
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 23);
inputEx.RTEField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 25);
Y.extend(inputEx.RTEField, inputEx.Field, {   
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
     setOptions: function(options) {
        _yuitest_coverfunc("build/inputex-rte/inputex-rte.js", "setOptions", 31);
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 32);
inputEx.RTEField.superclass.setOptions.call(this, options);
        
        _yuitest_coverline("build/inputex-rte/inputex-rte.js", 34);
this.options.opts = options.opts || {};
        _yuitest_coverline("build/inputex-rte/inputex-rte.js", 35);
this.options.editorType = options.editorType;
   },
   
   /**
    * Render the field using the YUI Editor widget
    * @method renderComponent
    */   
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-rte/inputex-rte.js", "renderComponent", 42);
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 43);
if(!inputEx.RTEfieldsNumber) { inputEx.RTEfieldsNumber = 0; }
      
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 45);
var id = "inputEx-RTEField-"+inputEx.RTEfieldsNumber;
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 46);
var attributes = {id:id};
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 47);
if(this.options.name) { attributes.name = this.options.name; }
      
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 49);
this.el = inputEx.cn('textarea', attributes);
      
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 51);
inputEx.RTEfieldsNumber += 1;
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 52);
this.fieldContainer.appendChild(this.el);
   
      //This is the default config
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 55);
var _def = {
          height: '300px',
          width: '580px',
          dompath: true,
          filterWord:true // get rid of the MS word junk
      };
      //The options object
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 62);
var o = this.options.opts;
      //Walk it to set the new config object
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 64);
for (var i in o) {
           _yuitest_coverline("build/inputex-rte/inputex-rte.js", 65);
if (lang.hasOwnProperty(o, i)) {
               _yuitest_coverline("build/inputex-rte/inputex-rte.js", 66);
_def[i] = o[i];
           }
      }
      //Check if options.editorType is present and set to simple, if it is use SimpleEditor instead of Editor
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 70);
var editorType = ((this.options.editorType && (this.options.editorType == 'simple')) ? YAHOO.widget.SimpleEditor : YAHOO.widget.Editor);
   
      //If this fails then the code is not loaded on the page
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 73);
if (editorType) {
          _yuitest_coverline("build/inputex-rte/inputex-rte.js", 74);
this.editor = new editorType(id, _def);
          _yuitest_coverline("build/inputex-rte/inputex-rte.js", 75);
this.editor.render();
      } else {
       _yuitest_coverline("build/inputex-rte/inputex-rte.js", 77);
alert('Editor is not on the page');
      }
      
      
      //
      // Filters out msword html comments, classes, and other junk
      // (complementary with YAHOO.widget.SimpleEditor.prototype.filter_msword, when filterWord option is true)
      // @param {String} value The html string
      // @return {String} The html string
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 86);
this.editor.filter_msword = function(html) {
         
         _yuitest_coverfunc("build/inputex-rte/inputex-rte.js", "filter_msword", 86);
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 88);
html = editorType.prototype.filter_msword.call(this,html);
         
         // if we don't filter ms word junk
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 91);
if (!this.get('filterWord')) {
            _yuitest_coverline("build/inputex-rte/inputex-rte.js", 92);
return html;
         }

         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 95);
html = html.replace( /<!--[^>][\s\S]*-->/gi, ''); // strip (meta-)comments
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 96);
html = html.replace( /<\/?meta[^>]*>/gi, ''); // strip meta tags
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 97);
html = html.replace( /<\/?link[^>]*>/gi, ''); // strip link tags
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 98);
html = html.replace( / class=('|")?MsoNormal('|")?/gi, ''); // strip MS office class
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 99);
html = Y.Lang.trim(html); // trim spaces
         
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 101);
return html;
      };
      
   },
   
   /**
    * Set the html content
    * @method setValue
    * @param {String} value The html string
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-rte/inputex-rte.js", "setValue", 112);
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 113);
if(this.editor) {
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 114);
var iframeId = this.el.id+"_editor";
         
         // if editor iframe not rendered
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 117);
if (!YAHOO.util.Dom.get(iframeId)) {
            // put value in textarea : will be processed by this.editor._setInitialContent (clean html, etc...)
            _yuitest_coverline("build/inputex-rte/inputex-rte.js", 119);
this.el.value = value;
            
         } else {
            _yuitest_coverline("build/inputex-rte/inputex-rte.js", 122);
this.editor.setEditorHTML(value);
         }
      }
      
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 126);
if(sendUpdatedEvt !== false) {
         // fire update event
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 128);
this.fireUpdatedEvt();
      }
   },
   
   /**
    * Get the html string
    * @method getValue
    * @return {String} the html string
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-rte/inputex-rte.js", "getValue", 137);
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 139);
var html;
      
      _yuitest_coverline("build/inputex-rte/inputex-rte.js", 141);
try {
         // trigger HTML cleaning (strip MS word or internal junk)
         // + save to hidden textarea (required for classic HTML 'submit')
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 144);
html = this.editor.saveHTML();
         _yuitest_coverline("build/inputex-rte/inputex-rte.js", 145);
return html;
      }
      catch(ex) { _yuitest_coverline("build/inputex-rte/inputex-rte.js", 147);
return null; }
   }
   
   
});
   
// Register this class as "html" type
_yuitest_coverline("build/inputex-rte/inputex-rte.js", 154);
inputEx.registerType("html", inputEx.RTEField, []);
   

}, '@VERSION@', {"requires": ["inputex-field", "yui2-editor"], "ix_provides": "html"});
