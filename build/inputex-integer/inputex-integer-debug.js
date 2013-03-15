YUI.add('inputex-integer', function (Y, NAME) {

/**
 * @module inputex-integer
 */
   var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * A field limited to number inputs
 * @class inputEx.IntegerField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>negative: boolean indicating if we accept negative numbers</li>
 * </ul>
 */
inputEx.IntegerField = function(options) {
   inputEx.IntegerField.superclass.constructor.call(this,options);
};

Y.extend(inputEx.IntegerField, inputEx.StringField, {
   /**
    * Adds the negative, min, and max options
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {
      inputEx.IntegerField.superclass.setOptions.call(this, options);
      
      this.options.negative = lang.isUndefined(options.negative) ? false : options.negative;
      this.options.min = lang.isUndefined(options.min) ? (this.options.negative ? -Infinity : 0) : parseInt(options.min,10);
      this.options.max = lang.isUndefined(options.max) ? Infinity : parseInt(options.max,10);
   },
   
   /**
    * Get the value
    * @method getValue
    * @return {int} The integer value
    */
   getValue: function() {
      
      var str_value;
      
      // StringField getValue (handles typeInvite and trim options)
      str_value = inputEx.IntegerField.superclass.getValue.call(this);
      
      // don't return NaN if empty field
      if (str_value === '') {
         return '';
      }
      
      return parseInt(str_value, 10);
   },
   
   /**
    * Validate if the value is an integer
    * @method validate
    */
   validate: function() {
      
      var str_valid = inputEx.IntegerField.superclass.validate.call(this),
          str_value = inputEx.IntegerField.superclass.getValue.call(this),
          value = this.getValue();

      // superclass validation will handle inherited options (required, trim, minLength, a.s.o)
      if (!str_valid) {
         return false;
      }

      // if non-required field is empty, no other validation to perform
      if (!this.options.required && this.isEmpty()) {
         return true;
      }
      
      // also check the string has a valid format to describe an integer
      if (!str_value.match(/^[\+\-]?[0-9]+$/)) {
         return false;
      }
      
      // finally, check the value could be cast as an integer and matches the restrictions
      return !isNaN(value) &&
             (this.options.negative ? true : value >= 0) &&
             value >= this.options.min && value <= this.options.max;
      
   }
   
});

// Register this class as "integer" type
inputEx.registerType("integer", inputEx.IntegerField, [
   //{ type: 'integer', label: 'Radix', name: 'radix', value: 10},
   {type: 'boolean', label: 'Accept negative', name: 'negative', value: false }
]);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "integer"});
