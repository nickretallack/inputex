/**
 * @module inputex-lens
 */
var lang = Y.Lang,
    inputEx = Y.inputEx;

/**
 * Display a group with inplace edit and custom template
 * @class inputEx.Lens
 * @extends inputEx.Group
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>lens: html code for the lens. Fields will be displayed in the div elements that has the classname named "field-(field name)"</li>
 *    <li>visus: list of visualization for each field</li>
 * </ul>
 */
inputEx.Lens = function(options) {
   inputEx.Lens.superclass.constructor.call(this, options);
};

Y.extend(inputEx.Lens, inputEx.Group, {
   
   /**
    * Set additional options
    * @method setOptions
    */
   setOptions: function(options) {

      var i, iLength, lens = "";

      inputEx.Lens.superclass.setOptions.call(this, options);

      if (!this.options.fields) {
         throw new Error("Missing 'fields' property in options");
      }
      
      if (!lang.isString(options.lens)) {
         for (i = 0, iLength = this.options.fields.length; i < iLength; i++) {
            lens += "<div class='field-"+this.options.fields[i].name+"'></div>";
         }
      }

      this.options.lens  = lang.isString(options.lens) ? options.lens : lens;
      this.options.visus = options.visus;
   },
   
   /**
    * Render each the fields in each div which class attribute is "field-"+fieldName
    * @method renderFields
    */
   renderFields: function(parentEl) {
      
      var i, iLength, els, el, params, field;

      parentEl.innerHTML = this.options.lens;
      
      for (i = 0, iLength = this.options.fields.length; i < iLength; i++) {

         els = Y.one(parentEl).all("."+"field-"+this.options.fields[i].name+" , div .field-"+this.options.fields[i].name);
         el  = els.item(0);

         params = { parentEl: el._node, editorField: this.options.fields[i], name: this.options.fields[i].name };
         if(this.options.visus) {
            params.visu = this.options.visus[i];
         }
         field = new inputEx.InPlaceEdit(params);
         
         this.inputs.push(field);
         if (field.options.name) {
            this.inputsNames[field.options.name] = field;
         }
         // Subscribe to the field "updated" event to send the group "updated" event
         field.on('updated', this.onChange, this, true);
   
      }

   }
   
});

// Register this class as "list" type
inputEx.registerType("lens", inputEx.Lens, []);
