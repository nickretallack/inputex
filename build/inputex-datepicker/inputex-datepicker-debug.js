YUI.add('inputex-datepicker', function (Y, NAME) {

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
 *   <li>calendarOpts: yui calendar configuration object</li>
 *   <li>zIndex: calendar overlay zIndex</li>
 * </ul>
 */
inputEx.DatePickerField = function(options) {
   inputEx.DatePickerField.superclass.constructor.call(this,options);
};


Y.extend(inputEx.DatePickerField, inputEx.DateField, {
   
   // in the prototype so that it can be overridden at the "class" level
   defaultCalendarOpts: {},
   
   /**
    * Set the default date picker CSS classes
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {

      inputEx.DatePickerField.superclass.setOptions.call(this, options);

      // Overwrite default options
      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';

      this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;

      // Added options
      this.options.calendarOpts = options.calendarOpts || this.defaultCalendarOpts;
      this.options.zIndex       = options.zIndex || 4;
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
            
            // required for IE 7 (see hide below)
            this.calendar.show();

            // align
            this.oOverlay.set("align", { node: this.buttonWrapper,  points: [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL] });

            // Activate outside event handler
            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               // hide the overlay if
               //   - the target is not the button, and
               //   - the target is not the readonly input node
               if (e.target !== this.button && !(this.options.readonly && e.target._node === this.el)) {
                  this.oOverlay.hide();
               }
            }, this);
         }
         else { // hide
            
            // required for IE 7, else borders of cells will be displayed
            // even if the overlay isn't shown...
            this.calendar.hide();
            
            if (this.outsideHandler) {
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

      if (!this.oOverlay) {
         this.renderOverlay();
         this.renderCalendar();
      }

      var method = this.oOverlay.get('visible') ? 'hide' : 'show';
      this.oOverlay[method]();
   },

   /**
    * Render the input field and the minical container
    * @method renderComponent
    */
   renderComponent: function() {

      inputEx.DatePickerField.superclass.renderComponent.call(this);

      // create button + wrapper
      this.buttonWrapper = Y.Node.create('<span class="inputEx-DatePicker-ButtonWrapper">'+
                                             '<button type="button" class="inputEx-DatePicker-Button">'+
                                             '</button>'+
                                         '</span>');
      
      this.buttonWrapper.appendTo(this.wrapEl);
      
      // get a reference to the <button> element
      this.button = this.buttonWrapper.one('.inputEx-DatePicker-Button');
      
      // toggle overlay if click on the <button> element
      this.button.on('click', this._toggleOverlay, this);
      
      // toggle overlay if click on the <input> element (only if readonly)
      if (this.options.readonly) {
         Y.one(this.el).on('click', this._toggleOverlay, this);
      }
      
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

      finalCalendarOptions = Y.mix(this.options.calendarOpts, localCalendarOptions);

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

      this.calendar.on("dateClick", function (ev) {
         
         // skip disabled cells
         if (ev.cell.hasClass('yui3-calendar-selection-disabled')) {
            return;
         }
         
         // Get the date from the list of selected
         // dates returned with the event (since only
         // single selection is enabled by default,
         // we expect there to be only one date)
         var newDate = ev.date;

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

         var date  = this.getValue(true),
             valid = this.validate();

         // check if valid to exclude invalid dates (that are truthy !)
         // check date to exclude empty values ('')
         if (valid && !!date) {

            // display the right month
            this.calendar.set('date', date);

            // there's no way to use deselectDates or selectDates without firing the
            // selectionChange event so we use _clearSelection and _addDateToSelection
            // instead.
            this.calendar._clearSelection(true);        // pass true so that selectionChange event is not fired
            this.calendar._addDateToSelection(date, 1); // pass 1    so that selectionChange event is not fired
            this.calendar._renderSelectedDates();       // need to be called explicitely since selectionChange is had not been fired
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
   }

});

// Register this class as "datepicker" type
inputEx.registerType("datepicker", inputEx.DatePickerField);


}, '@VERSION@', {
    "requires": [
        "inputex-date",
        "event-outside",
        "node-event-delegate",
        "overlay",
        "calendar"
    ],
    "ix_provides": "datepicker",
    "skinnable": true
});
