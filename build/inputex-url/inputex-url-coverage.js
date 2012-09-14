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
_yuitest_coverage["build/inputex-url/inputex-url.js"].code=["YUI.add('inputex-url', function (Y, NAME) {","","/**"," * @module inputex-url"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Adds an url regexp, and display the favicon at this url"," * @class inputEx.UrlField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," * <ul>"," *   <li>favicon: boolean whether the domain favicon.ico should be displayed or not (default is true, except for https)</li>"," * </ul>"," */","inputEx.UrlField = function(options) {","   inputEx.UrlField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.UrlField, inputEx.StringField, {","","   /**","    * Adds the invalid Url message","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.UrlField.superclass.setOptions.call(this, options);","","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-UrlField\";","      this.options.messages.invalid = inputEx.messages.invalidUrl;","      this.options.favicon = lang.isUndefined(options.favicon) ? ((\"https:\" == document.location.protocol) ? false : true) : options.favicon;","      this.options.size = options.size || 50;","","      // validate with url regexp","      this.options.regexp = inputEx.regexps.url;","   },","","   /**","    * Adds a img tag before the field to display the favicon","    * @method render","    */","   render: function() {","      inputEx.UrlField.superclass.render.call(this);","      this.el.size = this.options.size;","","      if(!this.options.favicon) {","         Y.one(this.el).addClass( 'nofavicon');","      }","","      // Create the favicon image tag","      if(this.options.favicon) {","         this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});","         this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);","","         // focus field when clicking on favicon","         Y.on(\"click\",function(){this.focus();},this.favicon,this);","      }","   },","","   /**","    * @method setClassFromState","    */","   setClassFromState: function() {","      inputEx.UrlField.superclass.setClassFromState.call(this);","","      if(this.options.favicon) {","         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)","         this.updateFavicon((this.previousState == inputEx.stateValid) ? this.getValue() : null);","      }","   },","","   /**","    * @method updateFavicon","    */","   updateFavicon: function(url) {","      var newSrc = url ? url.match(/https?:\\/\\/[^\\/]*/)+'/favicon.ico' : inputEx.spacerUrl;","      if(newSrc != this.favicon.src) {","","         // Hide the favicon","         inputEx.sn(this.favicon, null, {visibility: 'hidden'});","","         // Change the src","         this.favicon.src = newSrc;","","         // Set the timer to launch displayFavicon in 1s","         if(this.timer) { clearTimeout(this.timer); }","         var that = this;","         this.timer = setTimeout(function(){that.displayFavicon();}, 1000);","      }","   },","","   /**","    * Display the favicon if the icon was found (use of the naturalWidth property)","    * @method displayFavicon","    */","   displayFavicon: function() {","      inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});","   },","   ","   /**","    * Hide the favicon","    * @method hideFavicon","    */","    hideFavicon: function () {","        this.favicon.hide();","    },","    ","    /**","     * overriding hide in order to hide the favicon too","     * @method hide","     */","    hide: function () {","        inputEx.UrlField.superclass.hide.call(null, this);","        hideFavicon();","    }","});","","// Register this class as \"url\" type","inputEx.registerType(\"url\", inputEx.UrlField, [","   { type: 'boolean', label: 'Display favicon', name:'favicon', value: true}","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\"], \"ix_provides\": \"url\"});"];
_yuitest_coverage["build/inputex-url/inputex-url.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"31":0,"33":0,"34":0,"35":0,"36":0,"39":0,"47":0,"48":0,"50":0,"51":0,"55":0,"56":0,"57":0,"60":0,"68":0,"70":0,"72":0,"80":0,"81":0,"84":0,"87":0,"90":0,"91":0,"92":0,"101":0,"109":0,"117":0,"118":0,"123":0};
_yuitest_coverage["build/inputex-url/inputex-url.js"].functions = {"UrlField:19":0,"setOptions:30":0,"(anonymous 2):60":0,"render:46":0,"setClassFromState:67":0,"(anonymous 3):92":0,"updateFavicon:79":0,"displayFavicon:100":0,"hideFavicon:108":0,"hide:116":0,"(anonymous 1):1":0};
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

      _yuitest_coverline("build/inputex-url/inputex-url.js", 33);
this.options.className = options.className ? options.className : "inputEx-Field inputEx-UrlField";
      _yuitest_coverline("build/inputex-url/inputex-url.js", 34);
this.options.messages.invalid = inputEx.messages.invalidUrl;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 35);
this.options.favicon = lang.isUndefined(options.favicon) ? (("https:" == document.location.protocol) ? false : true) : options.favicon;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 36);
this.options.size = options.size || 50;

      // validate with url regexp
      _yuitest_coverline("build/inputex-url/inputex-url.js", 39);
this.options.regexp = inputEx.regexps.url;
   },

   /**
    * Adds a img tag before the field to display the favicon
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "render", 46);
_yuitest_coverline("build/inputex-url/inputex-url.js", 47);
inputEx.UrlField.superclass.render.call(this);
      _yuitest_coverline("build/inputex-url/inputex-url.js", 48);
this.el.size = this.options.size;

      _yuitest_coverline("build/inputex-url/inputex-url.js", 50);
if(!this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 51);
Y.one(this.el).addClass( 'nofavicon');
      }

      // Create the favicon image tag
      _yuitest_coverline("build/inputex-url/inputex-url.js", 55);
if(this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 56);
this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});
         _yuitest_coverline("build/inputex-url/inputex-url.js", 57);
this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);

         // focus field when clicking on favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 60);
Y.on("click",function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 2)", 60);
this.focus();},this.favicon,this);
      }
   },

   /**
    * @method setClassFromState
    */
   setClassFromState: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "setClassFromState", 67);
_yuitest_coverline("build/inputex-url/inputex-url.js", 68);
inputEx.UrlField.superclass.setClassFromState.call(this);

      _yuitest_coverline("build/inputex-url/inputex-url.js", 70);
if(this.options.favicon) {
         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)
         _yuitest_coverline("build/inputex-url/inputex-url.js", 72);
this.updateFavicon((this.previousState == inputEx.stateValid) ? this.getValue() : null);
      }
   },

   /**
    * @method updateFavicon
    */
   updateFavicon: function(url) {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "updateFavicon", 79);
_yuitest_coverline("build/inputex-url/inputex-url.js", 80);
var newSrc = url ? url.match(/https?:\/\/[^\/]*/)+'/favicon.ico' : inputEx.spacerUrl;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 81);
if(newSrc != this.favicon.src) {

         // Hide the favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 84);
inputEx.sn(this.favicon, null, {visibility: 'hidden'});

         // Change the src
         _yuitest_coverline("build/inputex-url/inputex-url.js", 87);
this.favicon.src = newSrc;

         // Set the timer to launch displayFavicon in 1s
         _yuitest_coverline("build/inputex-url/inputex-url.js", 90);
if(this.timer) { clearTimeout(this.timer); }
         _yuitest_coverline("build/inputex-url/inputex-url.js", 91);
var that = this;
         _yuitest_coverline("build/inputex-url/inputex-url.js", 92);
this.timer = setTimeout(function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 3)", 92);
that.displayFavicon();}, 1000);
      }
   },

   /**
    * Display the favicon if the icon was found (use of the naturalWidth property)
    * @method displayFavicon
    */
   displayFavicon: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "displayFavicon", 100);
_yuitest_coverline("build/inputex-url/inputex-url.js", 101);
inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});
   },
   
   /**
    * Hide the favicon
    * @method hideFavicon
    */
    hideFavicon: function () {
        _yuitest_coverfunc("build/inputex-url/inputex-url.js", "hideFavicon", 108);
_yuitest_coverline("build/inputex-url/inputex-url.js", 109);
this.favicon.hide();
    },
    
    /**
     * overriding hide in order to hide the favicon too
     * @method hide
     */
    hide: function () {
        _yuitest_coverfunc("build/inputex-url/inputex-url.js", "hide", 116);
_yuitest_coverline("build/inputex-url/inputex-url.js", 117);
inputEx.UrlField.superclass.hide.call(null, this);
        _yuitest_coverline("build/inputex-url/inputex-url.js", 118);
hideFavicon();
    }
});

// Register this class as "url" type
_yuitest_coverline("build/inputex-url/inputex-url.js", 123);
inputEx.registerType("url", inputEx.UrlField, [
   { type: 'boolean', label: 'Display favicon', name:'favicon', value: true}
]);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "url"});
