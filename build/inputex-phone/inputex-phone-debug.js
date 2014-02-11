YUI.add('inputex-phone', function (Y, NAME) {

/**
 * @module inputex-phone
 */
var inputEx = Y.inputEx,
   i18n = Y.Intl.get(NAME);
/**
 * Create a phone input field
 * @class inputEx.PhoneField
 * @extends inputEx.Field
 * @constructor
 */
inputEx.PhoneField = function(options) {
   inputEx.PhoneField.superclass.constructor.call(this, options);
};
Y.extend(inputEx.PhoneField, inputEx.Field, {

   /**
    * Adds the 'inputEx-PhoneField' default className
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      inputEx.PhoneField.superclass.setOptions.call(this, options);

      options.button = options.button ? options.button : {};

      // Overwrite options
      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-phoneField';

      // button label
      this.options.button           = options.button;
      this.options.button.label     = options.button.label ? options.button.label : i18n.call;
      this.options.button.className = options.button.className ? options.button.className : "inputEx-phoneField-button";
   
   },
   /**
    * Render the color button and the colorpicker popup
    * @method renderComponent
    */
   renderComponent: function() {

      // This element wraps the input node in a float: none div
      this.wrapEl = inputEx.cn('div', {
         className: 'inputEx-phoneField-wrapper'
      });

      // Create a colored area
      this.phoneElWrapper = inputEx.cn('div', {
         className: 'inputEx-phoneField-numberWrapper'
      });
      this.phoneEl = inputEx.cn('input', {
         type : "tel",
         className: 'inputEx-phoneField-number'
      });

      this.phoneElWrapper.appendChild(this.phoneEl);

      this.buttonWrapper = Y.Node.create('' +
         '<span class="inputEx-phoneField-buttonWrapper">' +
           '<button type="button" class="'+this.options.button.className+'">' +
              this.options.button.label +
           '</button>' +
         '</span>');

      this.wrapEl.appendChild(this.phoneElWrapper);
      this.buttonWrapper.appendTo(this.wrapEl);

      // get a reference to the <button> element
      this.button = this.buttonWrapper.one('.inputEx-phoneField-button');

      this.button.on('click', this._onPhoneClick, this);

      // Elements are bound to divEl
      this.fieldContainer.appendChild(this.wrapEl);
   },
   /**
    * @method getValue
    *
    */
   getValue: function() {
      return this.phoneEl.value;
   },
   /**
    * @method setValue
    *
    */
   setValue: function(value, sendUpdatedEvt) {
      this.phoneEl.value = value;
      inputEx.PhoneField.superclass.setValue.call(this, value, sendUpdatedEvt);
   },
   // ---------------------------------------------------------------------------------------
   // private
   /**
    * @method _onPhoneClick
    * @private
    *
    */
   _onPhoneClick: function(e) {
      window.location.href = "tel:"+this.phoneEl.value;
   },

});

// Register this class as "color" type
inputEx.registerType("phone", inputEx.PhoneField, []);

}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "intl"
    ],
    "skinnable": true,
    "ix_provides": "phone",
    "lang": [
        "fr",
        "en",
        "es",
        "de",
        "ca",
        "it",
        "nl",
        "pt-BR"
    ]
});
