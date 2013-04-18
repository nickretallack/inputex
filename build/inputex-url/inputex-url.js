YUI.add('inputex-url', function (Y, NAME) {

/**
 * @module inputex-url
 */
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
inputEx.UrlField = function(options) {
   inputEx.UrlField.superclass.constructor.call(this,options);
};

Y.extend(inputEx.UrlField, inputEx.StringField, {

   /**
    * Adds the invalid Url message
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      inputEx.UrlField.superclass.setOptions.call(this, options);

      //I18N
      this.messages = Y.mix(this.messages, Y.Intl.get("inputex-url"));

      this.options.className = options.className ? options.className : "inputEx-Field inputEx-UrlField";
      this.messages.invalid = (options.messages && options.messages.invalid) ? options.messages.invalid : this.messages.invalidUrl;
      this.options.favicon = lang.isUndefined(options.favicon) ? (("https:" === document.location.protocol) ? false : true) : options.favicon;

      // validate with url regexp
      this.options.regexp = options.regexp ? options.regexp : inputEx.regexps.url;
   },

   /**
    * Adds a img tag before the field to display the favicon
    * @method render
    */
   render: function() {
      inputEx.UrlField.superclass.render.call(this);

      if(!this.options.favicon) {
         Y.one(this.el).addClass( 'nofavicon');
      }

      // Create the favicon image tag
      if(this.options.favicon) {
         this.favicon = inputEx.cn('img', {src: inputEx.spacerUrl});
         this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);

         // focus field when clicking on favicon
         Y.on("click",function(){this.focus();},this.favicon,this);
      }
   },

   /**
    * @method setClassFromState
    */
   setClassFromState: function(state) {
      inputEx.UrlField.superclass.setClassFromState.call(this, state);

      if(this.options.favicon) {
         // try to update with url only if valid url (else pass null to display inputEx.spacerUrl)
         this.updateFavicon((this.previousState === inputEx.stateValid) ? this.getValue() : null);
      }
   },

   /**
    * @method updateFavicon
    */
   updateFavicon: function(url) {
      var newSrc = url ? url.match(/https?:\/\/[^\/]*/)+'/favicon.ico' : inputEx.spacerUrl,
          that = this;

      if(newSrc !== this.favicon.src) {

         // Hide the favicon
         inputEx.sn(this.favicon, null, {visibility: 'hidden'});

         // Change the src
         this.favicon.src = newSrc;

         // Set the timer to launch displayFavicon in 1s
         if(this.timer) { clearTimeout(this.timer); }
         this.timer = setTimeout(function(){that.displayFavicon();}, 1000);
      }
   },

   /**
    * Display the favicon if the icon was found (use of the naturalWidth property)
    * @method displayFavicon
    */
   displayFavicon: function() {
      inputEx.sn(this.favicon, null, {visibility: (this.favicon.naturalWidth!==0) ? 'visible' : 'hidden'});
   },
   
   /**
    * Hide the favicon
    * @method hideFavicon
    */
    hideFavicon: function () {
        this.favicon.hide();
    },
    
    /**
     * overriding hide in order to hide the favicon too
     * @method hide
     */
    hide: function () {
        inputEx.UrlField.superclass.hide.call(null, this);
        hideFavicon();
    }
});

// Register this class as "url" type
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
