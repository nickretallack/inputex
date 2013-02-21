YUI.add('inputex-domain-name', function (Y, NAME) {


/**
 * @module inputex-url
 */
   var lang    = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Simple domain name field
 */
inputEx.DomainNameField = function(options) {
   inputEx.DomainNameField.superclass.constructor.call(this,options);
};

Y.extend(inputEx.DomainNameField, inputEx.StringField, {

   setOptions: function(options) {
      inputEx.DomainNameField.superclass.setOptions.call(this, options);

      //I18N
      this.messages = Y.mix(this.messages, Y.Intl.get("inputex-domain-name"));
      this.options.className = options.className ? options.className : "inputEx-Field inputEx-DomainNameField";
      this.options.regexp = /^[a-z0-9]+(\-?[a-z0-9]+)*\.[a-z]{2,5}$/i;
      this.options.description = this.messages.domainNameFieldDescription;

      // TODO, add options :
      //  * unicode support
      //  * subdomain support
   }

});

// Register this class as "url" type
inputEx.registerType("domain-name", inputEx.DomainNameField, []);


}, '@VERSION@', {"requires": ["intl", "inputex-string"], "lang": ["en", "fr"], "ix_provides": "domain-name"});
