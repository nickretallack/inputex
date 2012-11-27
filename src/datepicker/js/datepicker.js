/**
 * @module inputex-datepicker
 */
   var inputEx = Y.inputEx,
       lang = Y.Lang;
/**
 * A DatePicker Field.
 * @class inputEx.DatePickerField
 * @extends inputEx.DateField
 * @constructor
 * @param {Object} options No added option for this field (same as DateField)
 * <ul>
 *   <li>calendar: yui calendar configuration object</li>
 *   <li>zIndex: calendar overlay zIndex</li>
 * </ul>
 */
inputEx.DatePickerField = function(options) {
   inputEx.DatePickerField.superclass.constructor.call(this,options);
};

Y.extend(inputEx.DatePickerField, inputEx.DateField, {
   /**
    * Set the default date picker CSS classes
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {

      inputEx.DatePickerField.superclass.setOptions.call(this, options);

      // I18N
      this.messages = Y.mix(this.messages,Y.Intl.get("inputex-datepicker"));

      // Overwrite default options
      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';

      this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;

      // Added options
      this.options.calendar = options.calendar || this.messages.defaultCalendarOpts;
      this.options.zIndex   = options.zIndex || 4;
   },

   /**
    * @method renderOverlay
    */
   renderOverlay: function() {

      // Create overlay
      this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });

      this.oOverlay.render(this.fieldContainer);

      this.oOverlay.on('visibleChange', function (e) {

         if (e.newVal) { // show
            this.beforeShowOverlay();
            this.calendar.show();

            // align
            this.oOverlay.set("align", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});

            // Activate outside event handler
            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               // if the target is not the button do not hide the overlay
              if(!this.isDatePickerButton(e.target)){
                this.oOverlay.hide();
              }
            }, this);
         }
         else { // hide
            this.calendar.hide();
            
            if(this.outsideHandler){
              this.outsideHandler.detach();
            }
            
         }

      }, this);
   },

   /**
    * @method _toggleOverlay
    * @private
    */
   _toggleOverlay: function() {

      // DON'T stop the event since it will be used to close other overlays...
      //e.stopPropagation();

      if(!this.oOverlay) {
         this.renderOverlay();
         this.renderCalendar();
      }

      var method = this.oOverlay.get('visible') ? 'hide' : 'show';
      this.oOverlay[method] ();
   },

   /**
    * Render the input field and the minical container
    * @method renderComponent
    */
   renderComponent: function() {

      inputEx.DatePickerField.superclass.renderComponent.call(this);

      // Create button
      this.button = Y.Node.create('<span class="inputEx-DatePicker-ButtonWrapper">'+
                                    '<span class="first-child"> '+
                                      '<button type="button" class="inputEx-DatePicker-Button">'+
                                      '</button>'+
                                    '</span>'+
                                  '</span>');
      
      this.button.appendTo(this.wrapEl);

      // Subscribe the click handler on the field only if readonly
      if(this.options.readonly) {
         Y.one(this.el).on('click', this._toggleOverlay, this);
      }

      // Subscribe to the first click
      this.button.on('click', this._toggleOverlay, this);
   },


   /**
    * Called ONCE to render the calendar lazily
    * @method renderCalendar
    */
   renderCalendar: function() {
      // if already rendered, ignore call
      if (!!this.calendarRendered) { return; }

      var localCalendarOptions = {
         showPrevMonth: true,
         showNextMonth: true,
         date: new Date()
      },

      finalCalendarOptions = Y.mix(this.options.calendar, localCalendarOptions);

      this.calendar = new Y.Calendar(finalCalendarOptions);
      if(finalCalendarOptions.customRenderer){
        this.calendar.set("customRenderer", finalCalendarOptions.customRenderer);
      }
      this.calendar.render( this.oOverlay.get('contentBox') );
      if(finalCalendarOptions.plugin){
        this.calendar.plug(finalCalendarOptions.plugin.pluginClass, Y.mix(
        /* Inside this plug in we can only control the calendar.
          problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself
          by giving the datepicker we can control the overlay behavior */
          {datepicker : this},
          finalCalendarOptions.plugin.pluginOptions
          )
        );
      }

      this.calendar.on("selectionChange", function (ev) {

         // Get the date from the list of selected
         // dates returned with the event (since only
         // single selection is enabled by default,
         // we expect there to be only one date)
         var newDate = ev.newSelection[0];

         this.setValue(newDate);

         this.oOverlay.hide();
      }, this);

      this.calendarRendered = true;
   },

   /**
    * Select the right date and display the right page on calendar, when the field has a value
    * @method beforeShowOverlay
    */
   beforeShowOverlay: function() {

      if (!!this.calendar) {

         var date = this.getValue(true), valid = this.validate();

         // check if valid to exclude invalid dates (that are truthy !)
         // check date to exclude empty values ('')
         if (valid && !!date) {
            this.calendar.set('date', date);
            this.calendar.deselectDates();
            this.calendar.selectDates(date);
         }
      }
   },

   /**
    * Call overlay when field is removed
    * @method close
    */
   close: function() {
      if (this.oOverlay) {
         this.oOverlay.hide();
      }
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      inputEx.DatePickerField.superclass.disable.call(this);
      this.button.set('disabled', true);
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      inputEx.DatePickerField.superclass.enable.call(this);
      this.button.set('disabled', false);
   },
   /**
    *
    * @method isDatePickerButton
    * @return true if this is the toggle button of the datepicker
    */
   isDatePickerButton : function(Ynode){
      return Ynode.hasClass("inputEx-DatePicker-Button");
   }

});
//
// this.messages.defaultCalendarOpts = { navigator: true };

// Register this class as "datepicker" type
inputEx.registerType("datepicker", inputEx.DatePickerField);
