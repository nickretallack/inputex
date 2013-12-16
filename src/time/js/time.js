/**
 * @module inputex-time
 */
   var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.TimeField
 * @extends inputEx.CombineField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
inputEx.TimeField = function(options) {
   
   this.showHours   = options.showHours    === false ? false : true;
   this.showMinutes = options.showMinutes  === false ? false : true;
   this.showSeconds = options.showSeconds  === false ? false : true;

   this.gapHours    = options.gapHours    || 1;
   this.gapMinutes  = options.gapMinutes  || 1;
   this.gapSeconds  = options.gapSeconds  || 1;

   var h = [],i, m = [],secs = [],s, separators = [];
   options.fields = [];

   if (this.showHours) {
      for (i = 0; i < 24; i =  i + this.gapHours) {
         s = "";
         if (i < 10) {
            s = "0";
         }
         s += i;
         h.push({
            value: s
         });
      }
   }

   if (this.showMinutes) {

      for (i = 0; i < 60; i = i + this.gapMinutes) {
         s = "";
         if (i < 10) {
            s = "0";
         }
         s += i;
         m.push({
            value: s
         });
      }
   }

   if (this.showSeconds) {

      for (i = 0; i < 60; i = i + this.gapSeconds) {
         s = "";
         if (i < 10) {
            s = "0";
         }
         s += i;
         secs.push({
            value: s
         });
      }
   }


   if(this.showHours){ options.fields.push({type: 'select', choices: h })}
   if(this.showMinutes){ options.fields.push({type: 'select', choices: m })}
   if(this.showSeconds){ options.fields.push({type: 'select', choices: secs })}

   var i, iLength, item;
   separators.push(false);
   for(i = 0, iLength = options.fields.length - 1; i < iLength; i++){
      separators.push(":");
   }
   separators.push(false);

   options.separators = options.separators || separators;

   inputEx.TimeField.superclass.constructor.call(this,options);
};

Y.extend(inputEx.TimeField, inputEx.CombineField, {   
   /**
    * Returns a string like HH:MM:SS
    * @method getValue
    * @return {String} Hour string
    */
   getValue: function() {
      var values = inputEx.TimeField.superclass.getValue.call(this);
      return values.join(':');
   },

   /**
    * Set the value 
    * @method setValue
    * @param {String} str Hour string (format HH:MM:SS)
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(str, sendUpdatedEvt) {
      inputEx.TimeField.superclass.setValue.call(this, str.split(':'), sendUpdatedEvt);
   }

});

// Register this class as "time" type
inputEx.registerType("time", inputEx.TimeField);
