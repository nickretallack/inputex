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
_yuitest_coverage["build/inputex-url/inputex-url.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-url/inputex-url.js",
    code: []
};
_yuitest_coverage["build/inputex-url/inputex-url.js"].code=["YUI.add('inputex-url', function (Y, NAME) {","","/**"," * @module inputex-url"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Adds an url regexp, and display the favicon at this url"," * @class inputEx.UrlField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," * <ul>"," *   <li>favicon: boolean whether the domain favicon.ico should be displayed or not (default is true, except for https)</li>"," * </ul>"," */","inputEx.UrlField = function(options) {","   inputEx.UrlField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.UrlField, inputEx.StringField, {","","   /**","    * Adds the invalid Url message","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.UrlField.superclass.setOptions.call(this, options);","","     //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-url\"));","","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-UrlField\";","      this.messages.invalid = this.messages.invalidUrl;","      this.options.favicon = lang.isUndefined(options.favicon) ? ((\"https:\" === document.location.protocol) ? false : true) : options.favicon;","      this.options.size = options.size || 50;","","      // validate with url regexp","      this.options.regexp = inputEx.regexps.url;","   },","","   /**","    * Adds a img tag before the field to display the favicon","    * @method render","    */","   render: function() {","      inputEx.UrlField.superclass.render.call(this);","      this.el.size = this.options.size;","","      if(!this.options.favicon) {","         Y.one(this.el).addClass( 'nofavicon');","      }","","      // Create the favicon image tag","      if(this.options.favicon) {","         this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});","         this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);","","         // focus field when clicking on favicon","         Y.on(\"click\",function(){this.focus();},this.favicon,this);","      }","   },","","   /**","    * @method setClassFromState","    */","   setClassFromState: function() {","      inputEx.UrlField.superclass.setClassFromState.call(this);","","      if(this.options.favicon) {","         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)","         this.updateFavicon((this.previousState === inputEx.stateValid) ? this.getValue() : null);","      }","   },","","   /**","    * @method updateFavicon","    */","   updateFavicon: function(url) {","      var newSrc = url ? url.match(/https?:\\/\\/[^\\/]*/)+'/favicon.ico' : inputEx.spacerUrl,","          that = this;","","      if(newSrc !== this.favicon.src) {","","         // Hide the favicon","         inputEx.sn(this.favicon, null, {visibility: 'hidden'});","","         // Change the src","         this.favicon.src = newSrc;","","         // Set the timer to launch displayFavicon in 1s","         if(this.timer) { clearTimeout(this.timer); }","         this.timer = setTimeout(function(){that.displayFavicon();}, 1000);","      }","   },","","   /**","    * Display the favicon if the icon was found (use of the naturalWidth property)","    * @method displayFavicon","    */","   displayFavicon: function() {","      inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});","   },","   ","   /**","    * Hide the favicon","    * @method hideFavicon","    */","    hideFavicon: function () {","        this.favicon.hide();","    },","    ","    /**","     * overriding hide in order to hide the favicon too","     * @method hide","     */","    hide: function () {","        inputEx.UrlField.superclass.hide.call(null, this);","        hideFavicon();","    }","});","","// Register this class as \"url\" type","inputEx.registerType(\"url\", inputEx.UrlField, [","   { type: 'boolean', label: 'Display favicon', name:'favicon', value: true}","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\"], \"ix_provides\": \"url\", \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"ca\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-url/inputex-url.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"31":0,"34":0,"36":0,"37":0,"38":0,"39":0,"42":0,"50":0,"51":0,"53":0,"54":0,"58":0,"59":0,"60":0,"63":0,"71":0,"73":0,"75":0,"83":0,"86":0,"89":0,"92":0,"95":0,"96":0,"105":0,"113":0,"121":0,"122":0,"127":0};
_yuitest_coverage["build/inputex-url/inputex-url.js"].functions = {"UrlField:19":0,"setOptions:30":0,"(anonymous 2):63":0,"render:49":0,"setClassFromState:70":0,"(anonymous 3):96":0,"updateFavicon:82":0,"displayFavicon:104":0,"hideFavicon:112":0,"hide:120":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-url/inputex-url.js"].coveredLines = 34;
_yuitest_coverage["build/inputex-url/inputex-url.js"].coveredFunctions = 11;
_yuitest_coverline("build/inputex-url/inputex-url.js", 1);
YUI.add('inputex-url', function (Y, NAME) {

/**
 * @module inputex-url
 */
   _yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-url/inputex-url.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Adds an url regexp, and display the favicon at this url
 * @class inputEx.UrlField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 * <ul>
 *   <li>favicon: boolean whether the domain favicon.ico should be displayed or not (default is true, except for https)</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-url/inputex-url.js", 19);
inputEx.UrlField = function(options) {
   _yuitest_coverfunc("build/inputex-url/inputex-url.js", "UrlField", 19);
_yuitest_coverline("build/inputex-url/inputex-url.js", 20);
inputEx.UrlField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-url/inputex-url.js", 23);
Y.extend(inputEx.UrlField, inputEx.StringField, {

   /**
    * Adds the invalid Url message
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "setOptions", 30);
_yuitest_coverline("build/inputex-url/inputex-url.js", 31);
inputEx.UrlField.superclass.setOptions.call(this, options);

     //I18N
      _yuitest_coverline("build/inputex-url/inputex-url.js", 34);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-url"));

      _yuitest_coverline("build/inputex-url/inputex-url.js", 36);
this.options.className = options.className ? options.className : "inputEx-Field inputEx-UrlField";
      _yuitest_coverline("build/inputex-url/inputex-url.js", 37);
this.messages.invalid = this.messages.invalidUrl;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 38);
this.options.favicon = lang.isUndefined(options.favicon) ? (("https:" === document.location.protocol) ? false : true) : options.favicon;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 39);
this.options.size = options.size || 50;

      // validate with url regexp
      _yuitest_coverline("build/inputex-url/inputex-url.js", 42);
this.options.regexp = inputEx.regexps.url;
   },

   /**
    * Adds a img tag before the field to display the favicon
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "render", 49);
_yuitest_coverline("build/inputex-url/inputex-url.js", 50);
inputEx.UrlField.superclass.render.call(this);
      _yuitest_coverline("build/inputex-url/inputex-url.js", 51);
this.el.size = this.options.size;

      _yuitest_coverline("build/inputex-url/inputex-url.js", 53);
if(!this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 54);
Y.one(this.el).addClass( 'nofavicon');
      }

      // Create the favicon image tag
      _yuitest_coverline("build/inputex-url/inputex-url.js", 58);
if(this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 59);
this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});
         _yuitest_coverline("build/inputex-url/inputex-url.js", 60);
this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);

         // focus field when clicking on favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 63);
Y.on("click",function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 2)", 63);
this.focus();},this.favicon,this);
      }
   },

   /**
    * @method setClassFromState
    */
   setClassFromState: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "setClassFromState", 70);
_yuitest_coverline("build/inputex-url/inputex-url.js", 71);
inputEx.UrlField.superclass.setClassFromState.call(this);

      _yuitest_coverline("build/inputex-url/inputex-url.js", 73);
if(this.options.favicon) {
         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)
         _yuitest_coverline("build/inputex-url/inputex-url.js", 75);
this.updateFavicon((this.previousState === inputEx.stateValid) ? this.getValue() : null);
      }
   },

   /**
    * @method updateFavicon
    */
   updateFavicon: function(url) {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "updateFavicon", 82);
_yuitest_coverline("build/inputex-url/inputex-url.js", 83);
var newSrc = url ? url.match(/https?:\/\/[^\/]*/)+'/favicon.ico' : inputEx.spacerUrl,
          that = this;

      _yuitest_coverline("build/inputex-url/inputex-url.js", 86);
if(newSrc !== this.favicon.src) {

         // Hide the favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 89);
inputEx.sn(this.favicon, null, {visibility: 'hidden'});

         // Change the src
         _yuitest_coverline("build/inputex-url/inputex-url.js", 92);
this.favicon.src = newSrc;

         // Set the timer to launch displayFavicon in 1s
         _yuitest_coverline("build/inputex-url/inputex-url.js", 95);
if(this.timer) { clearTimeout(this.timer); }
         _yuitest_coverline("build/inputex-url/inputex-url.js", 96);
this.timer = setTimeout(function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 3)", 96);
that.displayFavicon();}, 1000);
      }
   },

   /**
    * Display the favicon if the icon was found (use of the naturalWidth property)
    * @method displayFavicon
    */
   displayFavicon: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "displayFavicon", 104);
_yuitest_coverline("build/inputex-url/inputex-url.js", 105);
inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});
   },
   
   /**
    * Hide the favicon
    * @method hideFavicon
    */
    hideFavicon: function () {
        _yuitest_coverfunc("build/inputex-url/inputex-url.js", "hideFavicon", 112);
_yuitest_coverline("build/inputex-url/inputex-url.js", 113);
this.favicon.hide();
    },
    
    /**
     * overriding hide in order to hide the favicon too
     * @method hide
     */
    hide: function () {
        _yuitest_coverfunc("build/inputex-url/inputex-url.js", "hide", 120);
_yuitest_coverline("build/inputex-url/inputex-url.js", 121);
inputEx.UrlField.superclass.hide.call(null, this);
        _yuitest_coverline("build/inputex-url/inputex-url.js", 122);
hideFavicon();
    }
});

// Register this class as "url" type
_yuitest_coverline("build/inputex-url/inputex-url.js", 127);
inputEx.registerType("url", inputEx.UrlField, [
   { type: 'boolean', label: 'Display favicon', name:'favicon', value: true}
]);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "url", "skinnable": true, "lang": ["en", "fr", "de", "ca", "es", "fr", "it", "nl"]});
