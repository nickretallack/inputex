YUI.add('inputex-combine', function (Y, NAME) {

/**
 * @module inputex-combine
 */
var lang = Y.Lang,
   inputEx = Y.inputEx;

/**
 * A meta field to put N fields on the same line, separated by separators
 * @class inputEx.CombineField
 * @extends inputEx.Group
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>separators: array of string inserted</li>
 * </ul>
 */
inputEx.CombineField = function(options) {
   inputEx.CombineField.superclass.constructor.call(this, options);
};

Y.extend(inputEx.CombineField, inputEx.Group, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function (options) {
      inputEx.CombineField.superclass.setOptions.call(this, options);

      // Overwrite options
      this.options.className = options.className ? options.className : 'inputEx-CombineField';

      // Added options
      this.options.separators = options.separators;
   },

   // Override Group.render()
   render: function () {
      return inputEx.Field.prototype.render.apply(this, arguments);
   },

   /**
    * @method render
    */
   renderComponent: function() {
      this.renderFields(this.fieldContainer);

      if(this.options.disabled) {
         this.disable();
      }
   },

   /**
    * Render the subfields
    * @method renderFields
    */
   renderFields: function(parentNode) {

      this.appendSeparator(0);

      if(!this.options.fields) {
         return;
      }

      var i, iLength = this.options.fields.length,
          field_config, field, fieldEl, t;

      for (i = 0; i < iLength; i++) {

         field_config = this.options.fields[i];

         field = this.renderField(field_config);

         fieldEl = field.getEl();

         t = field_config.type;

         if (t !== "group" && t !== "form") {
            // remove the line breaker (<div style='clear: both;'>)
            fieldEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length - 1]);
         }
         
         /* This rule should stay in javascript because the cross-browser equivalent in css would be like:
         *      .inputEx-CombineField .inputEx-fieldWrapper { float: left }
         *
         *  That css would need to be overriden later by nested fields inside the combine (ex: datepicker),
         *  and every time we have to do that, a unicorn dies.
         */
         Y.one(fieldEl).setStyle('float', 'left');
         
         parentNode.appendChild(fieldEl);

         this.appendSeparator(i + 1);
      }

      this.setFieldName(this.options.name);


   },

   /**
    * Override to force required option on each subfield
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by inputEx()
    */
   renderField: function(fieldOptions) {

      // Subfields should inherit required property
      if (this.options.required) {
         fieldOptions.required = true;
      }

      return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);
   },

   /**
    * @method setFieldName
    */
   setFieldName: function(name) {
      
      var i, newName;

      if(name) {
         for(i = 0; i < this.inputs.length; i++) {
            newName = "";
            if(this.inputs[i].options.name) {
               newName = name + "[" + this.inputs[i].options.name + "]";
            } else {
               newName = name + "[" + i + "]";
            }
            this.inputs[i].setFieldName(newName);
         }
      }
   },

   /**
    * Add a separator to the fieldContainer
    * @method appendSeparator
    */
   appendSeparator: function(i) {
      if(this.options.separators && this.options.separators[i]) {
         var sep = inputEx.cn('div', {
            className: 'inputEx-CombineField-separator'
         }, null, this.options.separators[i]);
         this.fieldContainer.appendChild(sep);
      }
   },

   /**
    * @method initEvents
    */
   initEvents: function() {
      var me = this,
         blurTimeout,
         divNode;

      inputEx.CombineField.superclass.initEvents.apply(this, arguments);

      divNode = Y.one(this.fieldContainer);

      // TODO: does it work ?
      divNode.on("focusout", function(e) {
         // store local copy of the event to use in setTimeout
         e = lang.merge(e);
         blurTimeout = window.setTimeout(function() {
            blurTimeout = null;
            me.onBlur(e);
         }, 25);
      });

      // TODO: does it work ?
      divNode.on("focusin", function(e) {
         if(blurTimeout !== null) {
            window.clearTimeout(blurTimeout);
            blurTimeout = null;
         } else {
            me.onFocus(e);
         }
      });
   },



   /**
    * Set the value
    * @method setValue
    * @param {Array} values [value1, value2, ...]
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated'
    * event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(values, sendUpdatedEvt) {
      if(!values) {
         return;
      }
      var i, n = this.inputs.length;
      for(i = 0; i < n; i++) {
         this.inputs[i].setValue(values[i], false);
      }

      this.runFieldsInteractions();

      this.setClassFromState();
      
      if(sendUpdatedEvt !== false) {
         // fire update event
         this.fireUpdatedEvt();
      }
   },

   /**
    * Specific getValue
    * @method getValue
    * @return {Array} An array of values [value1, value2, ...]
    */
   getValue: function() {
      var values = [],
         i, n = this.inputs.length;
      for(i = 0; i < n; i++) {
         values.push(this.inputs[i].getValue());
      }
      return values;
   }

});

// Register this class as "combine" type
inputEx.registerType("combine", inputEx.CombineField, [{
   type: 'list',
   name: 'fields',
   label: 'Elements',
   required: true,
   elementType: {
      type: 'type'
   }
}, {
   type: 'list',
   name: 'separators',
   label: 'Separators',
   required: true
}]);

}, '@VERSION@', {"requires": ["inputex-group"], "ix_provides": "combine", "skinnable": true});
