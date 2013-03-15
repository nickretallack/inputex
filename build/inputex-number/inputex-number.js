YUI.add('inputex-number', function (Y, NAME) {

/**
 * @module inputex-number
 */
  var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.NumberField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
inputEx.NumberField = function(options) {
   inputEx.NumberField.superclass.constructor.call(this,options);
};

Y.extend(inputEx.NumberField, inputEx.StringField, {
   /**
    * Adds the min, and max options
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {
      inputEx.NumberField.superclass.setOptions.call(this, options);
      
      this.options.min = lang.isUndefined(options.min) ? -Infinity : parseFloat(options.min);
      this.options.max = lang.isUndefined(options.max) ? Infinity : parseFloat(options.max);
   },
   /**
    * Return a parsed float (javascript type number)
    * @method getValue
    * @return {Number} The parsed float
    */
   getValue: function() {
	
      var str_value;
      
      // StringField getValue (handles typeInvite and trim options)
      str_value = inputEx.NumberField.superclass.getValue.call(this);
      
      // don't return NaN if empty field
      if (str_value === '') {
         return '';
      }
      
      return parseFloat(str_value);
   },
   
   /**
    * Validate  if is a number
    * @method validate
    */
   validate: function() {
      
      var str_valid = inputEx.NumberField.superclass.validate.call(this),
          str_value = inputEx.NumberField.superclass.getValue.call(this),
          value = this.getValue();

      // superclass validation will handle inherited options (required, trim, minLength, a.s.o)
      if (!str_valid) {
         return false;
      }
      
      // if non-required field is empty, no other validation to perform
      if (!this.options.required && this.isEmpty()) {
         return true;
      }

      // also check the string has a valid format to describe a float number
      // (otherwise "0.03a" could be cast to a valid number 0.03)
      if (!str_value.match(/^([\+\-]?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+\-]?[0-9]+)?))$/)) {
         return false;
      }
      
      // finally, check the value could be cast as a float number and matches the restrictions
      return !isNaN(value) && value >= this.options.min && value <= this.options.max;

   }

});

// Register this class as "number" type
inputEx.registerType("number", inputEx.NumberField, []);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "number"});
