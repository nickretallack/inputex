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
_yuitest_coverage["build/inputex-url/inputex-url.js"].code=["YUI.add('inputex-url', function (Y, NAME) {","","/**"," * @module inputex-url"," */","YUI.add(\"inputex-url\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Adds an url regexp, and display the favicon at this url"," * @class inputEx.UrlField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," * <ul>"," *   <li>favicon: boolean whether the domain favicon.ico should be displayed or not (default is true, except for https)</li>"," * </ul>"," */","inputEx.UrlField = function(options) {","   inputEx.UrlField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.UrlField, inputEx.StringField, {","","   /**","    * Adds the invalid Url message","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.UrlField.superclass.setOptions.call(this, options);","","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-UrlField\";","      this.options.messages.invalid = inputEx.messages.invalidUrl;","      this.options.favicon = lang.isUndefined(options.favicon) ? ((\"https:\" == document.location.protocol) ? false : true) : options.favicon;","      this.options.size = options.size || 50;","","      // validate with url regexp","      this.options.regexp = inputEx.regexps.url;","   },","","   /**","    * Adds a img tag before the field to display the favicon","    * @method render","    */","   render: function() {","      inputEx.UrlField.superclass.render.call(this);","      this.el.size = this.options.size;","","      if(!this.options.favicon) {","         Y.one(this.el).addClass( 'nofavicon');","      }","","      // Create the favicon image tag","      if(this.options.favicon) {","         this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});","         this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);","","         // focus field when clicking on favicon","         Y.on(\"click\",function(){this.focus();},this.favicon,this);","      }","   },","","   /**","    * @method setClassFromState","    */","   setClassFromState: function() {","      inputEx.UrlField.superclass.setClassFromState.call(this);","","      if(this.options.favicon) {","         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)","         this.updateFavicon((this.previousState == inputEx.stateValid) ? this.getValue() : null);","      }","   },","","   /**","    * @method updateFavicon","    */","   updateFavicon: function(url) {","      var newSrc = url ? url.match(/https?:\\/\\/[^\\/]*/)+'/favicon.ico' : inputEx.spacerUrl;","      if(newSrc != this.favicon.src) {","","         // Hide the favicon","         inputEx.sn(this.favicon, null, {visibility: 'hidden'});","","         // Change the src","         this.favicon.src = newSrc;","","         // Set the timer to launch displayFavicon in 1s","         if(this.timer) { clearTimeout(this.timer); }","         var that = this;","         this.timer = setTimeout(function(){that.displayFavicon();}, 1000);","      }","   },","","   /**","    * Display the favicon if the icon was found (use of the naturalWidth property)","    * @method displayFavicon","    */","   displayFavicon: function() {","      inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});","   },","   ","   /**","    * Hide the favicon","    * @method hideFavicon","    */","    hideFavicon: function () {","        this.favicon.hide();","    },","    ","    /**","     * overriding hide in order to hide the favicon too","     * @method hide","     */","    hide: function () {","        inputEx.UrlField.superclass.hide.call(null, this);","        hideFavicon();","    }","});","","// Register this class as \"url\" type","inputEx.registerType(\"url\", inputEx.UrlField, [","   { type: 'boolean', label: 'Display favicon', name:'favicon', value: true}","]);","","},'3.1.0',{","  requires: [\"inputex-string\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-url/inputex-url.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"25":0,"33":0,"35":0,"36":0,"37":0,"38":0,"41":0,"49":0,"50":0,"52":0,"53":0,"57":0,"58":0,"59":0,"62":0,"70":0,"72":0,"74":0,"82":0,"83":0,"86":0,"89":0,"92":0,"93":0,"94":0,"103":0,"111":0,"119":0,"120":0,"125":0};
_yuitest_coverage["build/inputex-url/inputex-url.js"].functions = {"UrlField:21":0,"setOptions:32":0,"(anonymous 3):62":0,"render:48":0,"setClassFromState:69":0,"(anonymous 4):94":0,"updateFavicon:81":0,"displayFavicon:102":0,"hideFavicon:110":0,"hide:118":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-url/inputex-url.js"].coveredLines = 35;
_yuitest_coverage["build/inputex-url/inputex-url.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-url/inputex-url.js", 1);
YUI.add('inputex-url', function (Y, NAME) {

/**
 * @module inputex-url
 */
_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-url/inputex-url.js", 6);
YUI.add("inputex-url",function(Y){

   _yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-url/inputex-url.js", 8);
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
_yuitest_coverline("build/inputex-url/inputex-url.js", 21);
inputEx.UrlField = function(options) {
   _yuitest_coverfunc("build/inputex-url/inputex-url.js", "UrlField", 21);
_yuitest_coverline("build/inputex-url/inputex-url.js", 22);
inputEx.UrlField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-url/inputex-url.js", 25);
Y.extend(inputEx.UrlField, inputEx.StringField, {

   /**
    * Adds the invalid Url message
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "setOptions", 32);
_yuitest_coverline("build/inputex-url/inputex-url.js", 33);
inputEx.UrlField.superclass.setOptions.call(this, options);

      _yuitest_coverline("build/inputex-url/inputex-url.js", 35);
this.options.className = options.className ? options.className : "inputEx-Field inputEx-UrlField";
      _yuitest_coverline("build/inputex-url/inputex-url.js", 36);
this.options.messages.invalid = inputEx.messages.invalidUrl;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 37);
this.options.favicon = lang.isUndefined(options.favicon) ? (("https:" == document.location.protocol) ? false : true) : options.favicon;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 38);
this.options.size = options.size || 50;

      // validate with url regexp
      _yuitest_coverline("build/inputex-url/inputex-url.js", 41);
this.options.regexp = inputEx.regexps.url;
   },

   /**
    * Adds a img tag before the field to display the favicon
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "render", 48);
_yuitest_coverline("build/inputex-url/inputex-url.js", 49);
inputEx.UrlField.superclass.render.call(this);
      _yuitest_coverline("build/inputex-url/inputex-url.js", 50);
this.el.size = this.options.size;

      _yuitest_coverline("build/inputex-url/inputex-url.js", 52);
if(!this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 53);
Y.one(this.el).addClass( 'nofavicon');
      }

      // Create the favicon image tag
      _yuitest_coverline("build/inputex-url/inputex-url.js", 57);
if(this.options.favicon) {
         _yuitest_coverline("build/inputex-url/inputex-url.js", 58);
this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});
         _yuitest_coverline("build/inputex-url/inputex-url.js", 59);
this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);

         // focus field when clicking on favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 62);
Y.on("click",function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 3)", 62);
this.focus();},this.favicon,this);
      }
   },

   /**
    * @method setClassFromState
    */
   setClassFromState: function() {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "setClassFromState", 69);
_yuitest_coverline("build/inputex-url/inputex-url.js", 70);
inputEx.UrlField.superclass.setClassFromState.call(this);

      _yuitest_coverline("build/inputex-url/inputex-url.js", 72);
if(this.options.favicon) {
         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)
         _yuitest_coverline("build/inputex-url/inputex-url.js", 74);
this.updateFavicon((this.previousState == inputEx.stateValid) ? this.getValue() : null);
      }
   },

   /**
    * @method updateFavicon
    */
   updateFavicon: function(url) {
      _yuitest_coverfunc("build/inputex-url/inputex-url.js", "updateFavicon", 81);
_yuitest_coverline("build/inputex-url/inputex-url.js", 82);
var newSrc = url ? url.match(/https?:\/\/[^\/]*/)+'/favicon.ico' : inputEx.spacerUrl;
      _yuitest_coverline("build/inputex-url/inputex-url.js", 83);
if(newSrc != this.favicon.src) {

         // Hide the favicon
         _yuitest_coverline("build/inputex-url/inputex-url.js", 86);
inputEx.sn(this.favicon, null, {visibility: 'hidden'});

         // Change the src
         _yuitest_coverline("build/inputex-url/inputex-url.js", 89);
this.favicon.src = newSrc;

         // Set the timer to launch displayFavicon in 1s
         _yuitest_coverline("build/inputex-url/inputex-url.js", 92);
if(this.timer) { clearTimeout(this.timer); }
         _yuitest_coverline("build/inputex-url/inputex-url.js", 93);
var that = this;
         _yuitest_coverline("build/inputex-url/inputex-url.js", 94);
this.timer = setTimeout(function(){_yuitest_coverfunc("build/inputex-url/inputex-url.js", "(anonymous 4)", 94);
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

},'3.1.0',{
  requires: ["inputex-string"]
});


}, '@VERSION@');
