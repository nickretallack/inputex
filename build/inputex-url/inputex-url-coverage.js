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
_yuitest_coverage["build/inputex-url/inputex-url.js"].code=["YUI.add('inputex-url', function (Y, NAME) {","","/**"," * @module inputex-url"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Adds an url regexp, and display the favicon at this url"," * @class inputEx.UrlField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," * <ul>"," *   <li>favicon: boolean whether the domain favicon.ico should be displayed or not (default is true, except for https)</li>"," * </ul>"," */","inputEx.UrlField = function(options) {","   inputEx.UrlField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.UrlField, inputEx.StringField, {","","   /**","    * Adds the invalid Url message","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.UrlField.superclass.setOptions.call(this, options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-url\"));","","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-UrlField\";","      this.messages.invalid = (options.messages && options.messages.invalid) ? options.messages.invalid : this.messages.invalidUrl;","      this.options.favicon = lang.isUndefined(options.favicon) ? ((\"https:\" === document.location.protocol) ? false : true) : options.favicon;","","      // validate with url regexp","      this.options.regexp = options.regexp ? options.regexp : inputEx.regexps.url;","   },","","   /**","    * Adds a img tag before the field to display the favicon","    * @method render","    */","   render: function() {","      inputEx.UrlField.superclass.render.call(this);","","      if(!this.options.favicon) {","         Y.one(this.el).addClass( 'nofavicon');","      }","","      // Create the favicon image tag","      if(this.options.favicon) {","         this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});","         this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);","","         // focus field when clicking on favicon","         Y.on(\"click\",function(){this.focus();},this.favicon,this);","      }","   },","","   /**","    * @method setClassFromState","    */","   setClassFromState: function() {","      inputEx.UrlField.superclass.setClassFromState.call(this);","","      if(this.options.favicon) {","         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)","         this.updateFavicon((this.previousState === inputEx.stateValid) ? this.getValue() : null);","      }","   },","","   /**","    * @method updateFavicon","    */","   updateFavicon: function(url) {","      var newSrc = url ? url.match(/https?:\\/\\/[^\\/]*/)+'/favicon.ico' : inputEx.spacerUrl,","          that = this;","","      if(newSrc !== this.favicon.src) {","","         // Hide the favicon","         inputEx.sn(this.favicon, null, {visibility: 'hidden'});","","         // Change the src","         this.favicon.src = newSrc;","","         // Set the timer to launch displayFavicon in 1s","         if(this.timer) { clearTimeout(this.timer); }","         this.timer = setTimeout(function(){that.displayFavicon();}, 1000);","      }","   },","","   /**","    * Display the favicon if the icon was found (use of the naturalWidth property)","    * @method displayFavicon","    */","   displayFavicon: function() {","      inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});","   },","   ","   /**","    * Hide the favicon","    * @method hideFavicon","    */","    hideFavicon: function () {","        this.favicon.hide();","    },","    ","    /**","     * overriding hide in order to hide the favicon too","     * @method hide","     */","    hide: function () {","        inputEx.UrlField.superclass.hide.call(null, this);","        hideFavicon();","    }","});","","// Register this class as \"url\" type","inputEx.registerType(\"url\", inputEx.UrlField, [","   { type: 'boolean', label: 'Display favicon', name:'favicon', value: true}","]);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-string\"","    ],","    \"ix_provides\": \"url\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-url/inputex-url.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"31":0,"34":0,"36":0,"37":0,"38":0,"41":0,"49":0,"51":0,"52":0,"56":0,"57":0,"58":0,"61":0,"69":0,"71":0,"73":0,"81":0,"84":0,"87":0,"90":0,"93":0,"94":0,"103":0,"111":0,"119":0,"120":0,"125":0};
_yuitest_coverage["build/inputex-url/inputex-url.js"].functions = {"UrlField:19":0,"setOptions:30":0,"(anonymous 2):61":0,"render:48":0,"setClassFromState:68":0,"(anonymous 3):94":0,"updateFavicon:80":0,"displayFavicon:102":0,"hideFavicon:110":0,"hide:118":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-url/inputex-url.js"].coveredLines = 32;
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
this.messages.invalid = (options.messages && options.messages.invalid) ? options.messages.invalid : this.messages.invalidUrl;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 38);
this.options.favicon = lang.isUndefined(options.favicon) ? (("https:" === document.location.protocol) ? false : true) : options.favicon;

      // validate with url regexp
      _yuitest_coverline("build/inputex-url/inputex-url.js", 41);
this.options.regexp = options.regexp ? options.regexp : inputEx.regexps.url;
   },

   /**
    * Adds a img tag before the field to display the favicon
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "render", 48);
_yuitest_coverline("build/inputex-url/inputex-url.js", 49);
inputEx.UrlField.superclass.render.call(this);

      _yuitest_coverline("build/inputex-url/inputex-url.js", 51);
if(!this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 52);
Y.one(this.el).addClass( 'nofavicon');
      }

      // Create the favicon image tag
      _yuitest_coverline("build/inputex-url/inputex-url.js", 56);
if(this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 57);
this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});
         _yuitest_coverline("build/inputex-url/inputex-url.js", 58);
this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);

         // focus field when clicking on favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 61);
Y.on("click",function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 2)", 61);
this.focus();},this.favicon,this);
      }
   },

   /**
    * @method setClassFromState
    */
   setClassFromState: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "setClassFromState", 68);
_yuitest_coverline("build/inputex-url/inputex-url.js", 69);
inputEx.UrlField.superclass.setClassFromState.call(this);

      _yuitest_coverline("build/inputex-url/inputex-url.js", 71);
if(this.options.favicon) {
         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)
         _yuitest_coverline("build/inputex-url/inputex-url.js", 73);
this.updateFavicon((this.previousState === inputEx.stateValid) ? this.getValue() : null);
      }
   },

   /**
    * @method updateFavicon
    */
   updateFavicon: function(url) {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "updateFavicon", 80);
_yuitest_coverline("build/inputex-url/inputex-url.js", 81);
var newSrc = url ? url.match(/https?:\/\/[^\/]*/)+'/favicon.ico' : inputEx.spacerUrl,
          that = this;

      _yuitest_coverline("build/inputex-url/inputex-url.js", 84);
if(newSrc !== this.favicon.src) {

         // Hide the favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 87);
inputEx.sn(this.favicon, null, {visibility: 'hidden'});

         // Change the src
         _yuitest_coverline("build/inputex-url/inputex-url.js", 90);
this.favicon.src = newSrc;

         // Set the timer to launch displayFavicon in 1s
         _yuitest_coverline("build/inputex-url/inputex-url.js", 93);
if(this.timer) { clearTimeout(this.timer); }
         _yuitest_coverline("build/inputex-url/inputex-url.js", 94);
this.timer = setTimeout(function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 3)", 94);
that.displayFavicon();}, 1000);
      }
   },

   /**
    * Display the favicon if the icon was found (use of the naturalWidth property)
    * @method displayFavicon
    */
   displayFavicon: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "displayFavicon", 102);
_yuitest_coverline("build/inputex-url/inputex-url.js", 103);
inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});
   },
   
   /**
    * Hide the favicon
    * @method hideFavicon
    */
    hideFavicon: function () {
        _yuitest_coverfunc("build/inputex-url/inputex-url.js", "hideFavicon", 110);
_yuitest_coverline("build/inputex-url/inputex-url.js", 111);
this.favicon.hide();
    },
    
    /**
     * overriding hide in order to hide the favicon too
     * @method hide
     */
    hide: function () {
        _yuitest_coverfunc("build/inputex-url/inputex-url.js", "hide", 118);
_yuitest_coverline("build/inputex-url/inputex-url.js", 119);
inputEx.UrlField.superclass.hide.call(null, this);
        _yuitest_coverline("build/inputex-url/inputex-url.js", 120);
hideFavicon();
    }
});

// Register this class as "url" type
_yuitest_coverline("build/inputex-url/inputex-url.js", 125);
inputEx.registerType("url", inputEx.UrlField, [
   { type: 'boolean', label: 'Display favicon', name:'favicon', value: true}
]);


}, '@VERSION@', {
    "requires": [
        "inputex-string"
    ],
    "ix_provides": "url",
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
