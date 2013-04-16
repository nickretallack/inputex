YUI.add('inputex-autocomplete', function (Y, NAME) {

/**
 * @module inputex-autocomplete
 */
  var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * An autocomplete field that wraps the YUI autocompleter
 * @class inputEx.AutoComplete
 * @constructor
 * @extends inputEx.StringField
 * @param {Object} options Added options for Autocompleter
 * <ul>
 *  <li>source: the datasource</li>
 *  <li>autoComp: autocompleter options</li>
 *   <li>returnValue: function to format the returned value (optional)</li>
 * </ul>
 */
inputEx.AutoComplete = function(options) {
   inputEx.AutoComplete.superclass.constructor.call(this, options);
};

Y.extend(inputEx.AutoComplete, inputEx.StringField, {

   /**
    * Adds autocomplete options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      inputEx.AutoComplete.superclass.setOptions.call(this, options);

      // Overwrite options
      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-AutoComplete';

      // Added options
      this.options.autoComp    = options.autoComp;
      this.options.returnValue = options.returnValue;
   },

   /**
    * Custom event init
    * <ul>
    *   <li>listen to autocompleter textboxBlurEvent instead of this.el "blur" event</li>
    *   <li>listener to autocompleter textboxBlurEvent added in buildAutocomplete method</li>
    * </ul>
    * @method initEvents
    */
   initEvents: function() {

      inputEx.AutoComplete.superclass.initEvents.call(this);

      if (Y.UA.ie > 0){
         // Restore "enter" key support for selecting items (prevented in inputex-string)
         Y.Event.detach('key', undefined, this.el);
      }

      // remove standard blur listener
      // TODO: ?
   },

   /**
    * Render the hidden list element
    * @method renderComponent
    */
   renderComponent: function() {

      var attributes, hiddenAttrs, listId;

      // This element wraps the input node in a float: none div
      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});

      // Attributes of the input field
      attributes = {
         type: 'text',
         id: Y.guid()
      };
      if(this.options.size) attributes.size = this.options.size;
      if(this.options.readonly) attributes.readonly = 'readonly';
      if(this.options.maxLength) attributes.maxLength = this.options.maxLength;

      // Create the node
      this.el = inputEx.cn('input', attributes);

      // Create the hidden input
      hiddenAttrs = {
         type: 'hidden',
         value: ''
      };
      if(this.options.name) hiddenAttrs.name = this.options.name;
      this.hiddenEl = inputEx.cn('input', hiddenAttrs);

      // Append it to the main element
      this.wrapEl.appendChild(this.el);
      this.wrapEl.appendChild(this.hiddenEl);
      this.fieldContainer.appendChild(this.wrapEl);

      // Render the list :
      listId = Y.guid();
      this.listEl = inputEx.cn('div', {id: listId });
      this.fieldContainer.appendChild(this.listEl);

      Y.on('available', this.buildAutocomplete, "#"+attributes.id, this);
      Y.on('available', this.buildAutocomplete, "#"+listId, this);
      //Y.on("domready", function(e){alert(e+"domready");});
   },

   /**
    * Build the YUI autocompleter
    * @method buildAutocomplete
    */
   buildAutocomplete: function() {
      // Call this function only when this.el AND this.listEl are available
      if(!this._nElementsReady) { this._nElementsReady = 0; }
      this._nElementsReady++;
      if(this._nElementsReady != 2) return;

      this.yEl = Y.one(this.el);
      this.yEl.plug(Y.Plugin.AutoComplete, this.options.autoComp);

      // Instantiate AutoComplete
      this.yEl.ac.on("select",this.itemSelectHandler, this);
      this.yEl.on("blur", this.onBlur, this);
   },

   /**
    * itemSelect handler
    * @method itemSelectHandler
    * @param {} sType
    * @param {} aArgs
    */
   itemSelectHandler: function(o) {
      var aData = o.result.raw;
      this.setValue( this.options.returnValue ? this.options.returnValue(aData) : aData.label );
   },

   /**
    * @method onBlur
    */
   onBlur: function(e){

      inputEx.AutoComplete.superclass.onBlur.call(this);

      if (this.el.value === '' && this.options.typeInvite) {
         Y.one(this.divEl).addClass("inputEx-typeInvite");
         this.el.value = this.options.typeInvite;
      }
   },
   onChange: function(e) {

      this.setClassFromState();

      // Clear the field when no value
      if (this.hiddenEl.value != this.el.value) {
         this.hiddenEl.value = this.el.value;
      }

      Y.later(50, this, function() {
         if (this.el.value === "") {
            this.setValue("");
         }
      });
   },

   /**
    * Set the value
    * @method setValue
    * @param {Any} value Value to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
    */
   setValue: function (value, sendUpdatedEvt) {

      this.hiddenEl.value = value || "";

      inputEx.AutoComplete.superclass.setValue.call(this, value, sendUpdatedEvt);
   },

   /**
    * Return the hidden value (stored in a hidden input)
    * @method getValue
    */
   getValue: function() {
      return this.hiddenEl.value;
   }

});


// Register this class as "autocomplete" type
inputEx.registerType("autocomplete", inputEx.AutoComplete);

}, '@VERSION@', {"requires": ["inputex-string", "autocomplete"], "ix_provides": "autocomplete", "skinnable": true});
