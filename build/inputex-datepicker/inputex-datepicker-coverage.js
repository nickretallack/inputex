if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-datepicker/inputex-datepicker.js",
    code: []
};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].code=["YUI.add('inputex-datepicker', function (Y, NAME) {","","/**"," * @module inputex-datepicker"," */","   var inputEx = Y.inputEx,","       lang = Y.Lang;","/**"," * A DatePicker Field."," * @class inputEx.DatePickerField"," * @extends inputEx.DateField"," * @constructor"," * @param {Object} options No added option for this field (same as DateField)"," * <ul>"," *   <li>calendar: yui calendar configuration object</li>"," *   <li>zIndex: calendar overlay zIndex</li>"," * </ul>"," */","inputEx.DatePickerField = function(options) {","   inputEx.DatePickerField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DatePickerField, inputEx.DateField, {","   /**","    * Set the default date picker CSS classes","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      inputEx.DatePickerField.superclass.setOptions.call(this, options);","","      // I18N","      this.messages = Y.mix(this.messages,Y.Intl.get(\"inputex-datepicker\"));","","      // Overwrite default options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';","","      this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;","","      // Added options","      this.options.calendar = options.calendar || this.messages.defaultCalendarOpts;","      this.options.zIndex   = options.zIndex || 4;","   },","","   /**","    * @method renderOverlay","    */","   renderOverlay: function() {","","      // Create overlay","      this.oOverlay = new Y.Overlay({","         visible:false,","         zIndex: this.options.zIndex","      });","","      this.oOverlay.render(this.fieldContainer);","","      this.oOverlay.on('visibleChange', function (e) {","","         if (e.newVal) { // show","            this.beforeShowOverlay();","            this.calendar.show();","","            // align","            this.oOverlay.set(\"align\", { node: this.buttonWrapper,  points: [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL] });","","            // Activate outside event handler","            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {","               // if the target is not the button, hide the overlay","              if (e.target !== this.button){","                this.oOverlay.hide();","              }","            }, this);","         }","         else { // hide","            this.calendar.hide();","            ","            if(this.outsideHandler){","              this.outsideHandler.detach();","            }","            ","         }","","      }, this);","   },","","   /**","    * @method _toggleOverlay","    * @private","    */","   _toggleOverlay: function() {","","      // DON'T stop the event since it will be used to close other overlays...","      //e.stopPropagation();","","      if (!this.oOverlay) {","         this.renderOverlay();","         this.renderCalendar();","      }","","      var method = this.oOverlay.get('visible') ? 'hide' : 'show';","      this.oOverlay[method]();","   },","","   /**","    * Render the input field and the minical container","    * @method renderComponent","    */","   renderComponent: function() {","","      inputEx.DatePickerField.superclass.renderComponent.call(this);","","      // create button + wrapper","      this.buttonWrapper = Y.Node.create('<span class=\"inputEx-DatePicker-ButtonWrapper\">'+","                                            '<span class=\"first-child\"> '+","                                               '<button type=\"button\" class=\"inputEx-DatePicker-Button\">'+","                                               '</button>'+","                                            '</span>'+","                                         '</span>');","      ","      this.buttonWrapper.appendTo(this.wrapEl);","      ","      // get a reference to the <button> element","      this.button = this.buttonWrapper.one('.inputEx-DatePicker-Button');","      ","      // toggle overlay if click on the <button> element","      this.button.on('click', this._toggleOverlay, this);","      ","      // toggle overlay if click on the <input> element (only if readonly)","      if (this.options.readonly) {","         Y.one(this.el).on('click', this._toggleOverlay, this);","      }","      ","   },","","","   /**","    * Called ONCE to render the calendar lazily","    * @method renderCalendar","    */","   renderCalendar: function() {","      // if already rendered, ignore call","      if (!!this.calendarRendered) { return; }","","      var localCalendarOptions = {","         showPrevMonth: true,","         showNextMonth: true,","         date: new Date()","      },","","      finalCalendarOptions = Y.mix(this.options.calendar, localCalendarOptions);","","      this.calendar = new Y.Calendar(finalCalendarOptions);","      if(finalCalendarOptions.customRenderer){","        this.calendar.set(\"customRenderer\", finalCalendarOptions.customRenderer);","      }","      this.calendar.render( this.oOverlay.get('contentBox') );","      if(finalCalendarOptions.plugin){","        this.calendar.plug(finalCalendarOptions.plugin.pluginClass, Y.mix(","        /* Inside this plug in we can only control the calendar.","          problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself","          by giving the datepicker we can control the overlay behavior */","          {datepicker : this},","          finalCalendarOptions.plugin.pluginOptions","          )","        );","      }","","      this.calendar.on(\"selectionChange\", function (ev) {","         ","         // Get the date from the list of selected","         // dates returned with the event (since only","         // single selection is enabled by default,","         // we expect there to be only one date)","         var newDate = ev.newSelection[0];","","         this.setValue(newDate);","","         this.oOverlay.hide();","      }, this);","","      this.calendarRendered = true;","   },","","   /**","   * Select the right date and display the right page on calendar, when the field has a value","   * @method beforeShowOverlay","   */","   beforeShowOverlay: function() {","","      if (!!this.calendar) {","","         var date  = this.getValue(true),","             valid = this.validate();","","         // check if valid to exclude invalid dates (that are truthy !)","         // check date to exclude empty values ('')","         if (valid && !!date) {","","            // display the right month","            this.calendar.set('date', date);","","            // there's no way to use deselectDates or selectDates without firing the","            // selectionChange event so we use _clearSelection and _addDateToSelection","            // instead.","            this.calendar._clearSelection(true);        // pass true so that selectionChange event is not fired","            this.calendar._addDateToSelection(date, 1); // pass 1    so that selectionChange event is not fired","            this.calendar._renderSelectedDates();       // need to be called explicitely since selectionChange is had not been fired","         }","      }","   },","    ","   /**","    * Call overlay when field is removed","    * @method close","    */","   close: function() {","      if (this.oOverlay) {","         this.oOverlay.hide();","      }","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      inputEx.DatePickerField.superclass.disable.call(this);","      this.button.set('disabled', true);","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      inputEx.DatePickerField.superclass.enable.call(this);","      this.button.set('disabled', false);","   }","","});","//","// this.messages.defaultCalendarOpts = { navigator: true };","","// Register this class as \"datepicker\" type","inputEx.registerType(\"datepicker\", inputEx.DatePickerField);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-date\",","        \"event-outside\",","        \"node-event-delegate\",","        \"overlay\",","        \"calendar\"","    ],","    \"ix_provides\": \"datepicker\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"31":0,"34":0,"37":0,"39":0,"42":0,"43":0,"52":0,"57":0,"59":0,"61":0,"62":0,"63":0,"66":0,"69":0,"71":0,"72":0,"77":0,"79":0,"80":0,"97":0,"98":0,"99":0,"102":0,"103":0,"112":0,"115":0,"122":0,"125":0,"128":0,"131":0,"132":0,"144":0,"146":0,"154":0,"155":0,"156":0,"158":0,"159":0,"160":0,"170":0,"176":0,"178":0,"180":0,"183":0,"192":0,"194":0,"199":0,"202":0,"207":0,"208":0,"209":0,"219":0,"220":0,"229":0,"230":0,"238":0,"239":0,"247":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].functions = {"DatePickerField:19":0,"setOptions:29":0,"(anonymous 3):69":0,"(anonymous 2):59":0,"renderOverlay:49":0,"_toggleOverlay:92":0,"renderComponent:110":0,"(anonymous 4):170":0,"renderCalendar:142":0,"beforeShowOverlay:190":0,"close:218":0,"disable:228":0,"enable:237":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].coveredLines = 63;
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].coveredFunctions = 14;
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 1);
YUI.add('inputex-datepicker', function (Y, NAME) {

/**
 * @module inputex-datepicker
 */
   _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 6);
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
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 19);
inputEx.DatePickerField = function(options) {
   _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "DatePickerField", 19);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 20);
inputEx.DatePickerField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 23);
Y.extend(inputEx.DatePickerField, inputEx.DateField, {
   /**
    * Set the default date picker CSS classes
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "setOptions", 29);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 31);
inputEx.DatePickerField.superclass.setOptions.call(this, options);

      // I18N
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 34);
this.messages = Y.mix(this.messages,Y.Intl.get("inputex-datepicker"));

      // Overwrite default options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 37);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 39);
this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;

      // Added options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 42);
this.options.calendar = options.calendar || this.messages.defaultCalendarOpts;
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 43);
this.options.zIndex   = options.zIndex || 4;
   },

   /**
    * @method renderOverlay
    */
   renderOverlay: function() {

      // Create overlay
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderOverlay", 49);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 52);
this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 57);
this.oOverlay.render(this.fieldContainer);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 59);
this.oOverlay.on('visibleChange', function (e) {

         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 2)", 59);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 61);
if (e.newVal) { // show
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 62);
this.beforeShowOverlay();
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 63);
this.calendar.show();

            // align
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 66);
this.oOverlay.set("align", { node: this.buttonWrapper,  points: [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL] });

            // Activate outside event handler
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 69);
this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               // if the target is not the button, hide the overlay
              _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 3)", 69);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 71);
if (e.target !== this.button){
                _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 72);
this.oOverlay.hide();
              }
            }, this);
         }
         else { // hide
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 77);
this.calendar.hide();
            
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 79);
if(this.outsideHandler){
              _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 80);
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

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "_toggleOverlay", 92);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 97);
if (!this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 98);
this.renderOverlay();
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 99);
this.renderCalendar();
      }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 102);
var method = this.oOverlay.get('visible') ? 'hide' : 'show';
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 103);
this.oOverlay[method]();
   },

   /**
    * Render the input field and the minical container
    * @method renderComponent
    */
   renderComponent: function() {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderComponent", 110);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 112);
inputEx.DatePickerField.superclass.renderComponent.call(this);

      // create button + wrapper
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 115);
this.buttonWrapper = Y.Node.create('<span class="inputEx-DatePicker-ButtonWrapper">'+
                                            '<span class="first-child"> '+
                                               '<button type="button" class="inputEx-DatePicker-Button">'+
                                               '</button>'+
                                            '</span>'+
                                         '</span>');
      
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 122);
this.buttonWrapper.appendTo(this.wrapEl);
      
      // get a reference to the <button> element
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 125);
this.button = this.buttonWrapper.one('.inputEx-DatePicker-Button');
      
      // toggle overlay if click on the <button> element
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 128);
this.button.on('click', this._toggleOverlay, this);
      
      // toggle overlay if click on the <input> element (only if readonly)
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 131);
if (this.options.readonly) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 132);
Y.one(this.el).on('click', this._toggleOverlay, this);
      }
      
   },


   /**
    * Called ONCE to render the calendar lazily
    * @method renderCalendar
    */
   renderCalendar: function() {
      // if already rendered, ignore call
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderCalendar", 142);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 144);
if (!!this.calendarRendered) { return; }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 146);
var localCalendarOptions = {
         showPrevMonth: true,
         showNextMonth: true,
         date: new Date()
      },

      finalCalendarOptions = Y.mix(this.options.calendar, localCalendarOptions);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 154);
this.calendar = new Y.Calendar(finalCalendarOptions);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 155);
if(finalCalendarOptions.customRenderer){
        _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 156);
this.calendar.set("customRenderer", finalCalendarOptions.customRenderer);
      }
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 158);
this.calendar.render( this.oOverlay.get('contentBox') );
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 159);
if(finalCalendarOptions.plugin){
        _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 160);
this.calendar.plug(finalCalendarOptions.plugin.pluginClass, Y.mix(
        /* Inside this plug in we can only control the calendar.
          problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself
          by giving the datepicker we can control the overlay behavior */
          {datepicker : this},
          finalCalendarOptions.plugin.pluginOptions
          )
        );
      }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 170);
this.calendar.on("selectionChange", function (ev) {
         
         // Get the date from the list of selected
         // dates returned with the event (since only
         // single selection is enabled by default,
         // we expect there to be only one date)
         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 4)", 170);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 176);
var newDate = ev.newSelection[0];

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 178);
this.setValue(newDate);

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 180);
this.oOverlay.hide();
      }, this);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 183);
this.calendarRendered = true;
   },

   /**
   * Select the right date and display the right page on calendar, when the field has a value
   * @method beforeShowOverlay
   */
   beforeShowOverlay: function() {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "beforeShowOverlay", 190);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 192);
if (!!this.calendar) {

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 194);
var date  = this.getValue(true),
             valid = this.validate();

         // check if valid to exclude invalid dates (that are truthy !)
         // check date to exclude empty values ('')
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 199);
if (valid && !!date) {

            // display the right month
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 202);
this.calendar.set('date', date);

            // there's no way to use deselectDates or selectDates without firing the
            // selectionChange event so we use _clearSelection and _addDateToSelection
            // instead.
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 207);
this.calendar._clearSelection(true);        // pass true so that selectionChange event is not fired
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 208);
this.calendar._addDateToSelection(date, 1); // pass 1    so that selectionChange event is not fired
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 209);
this.calendar._renderSelectedDates();       // need to be called explicitely since selectionChange is had not been fired
         }
      }
   },
    
   /**
    * Call overlay when field is removed
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "close", 218);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 219);
if (this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 220);
this.oOverlay.hide();
      }
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "disable", 228);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 229);
inputEx.DatePickerField.superclass.disable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 230);
this.button.set('disabled', true);
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "enable", 237);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 238);
inputEx.DatePickerField.superclass.enable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 239);
this.button.set('disabled', false);
   }

});
//
// this.messages.defaultCalendarOpts = { navigator: true };

// Register this class as "datepicker" type
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 247);
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
    "skinnable": true,
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl"
    ]
});
