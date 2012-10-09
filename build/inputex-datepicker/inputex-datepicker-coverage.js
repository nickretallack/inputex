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
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].code=["YUI.add('inputex-datepicker', function (Y, NAME) {","","/**"," * @module inputex-datepicker"," */","   var inputEx = Y.inputEx,","       lang = Y.Lang;","/**"," * A DatePicker Field."," * @class inputEx.DatePickerField"," * @extends inputEx.DateField"," * @constructor"," * @param {Object} options No added option for this field (same as DateField)"," * <ul>"," *   <li>calendar: yui calendar configuration object</li>"," *   <li>zIndex: calendar overlay zIndex</li>"," * </ul>"," */","inputEx.DatePickerField = function(options) {","   inputEx.DatePickerField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DatePickerField, inputEx.DateField, {","   /**","    * Set the default date picker CSS classes","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      inputEx.DatePickerField.superclass.setOptions.call(this, options);","","      // I18N","      this.messages = Y.mix(this.messages,Y.Intl.get(\"inputex-datepicker\"));","","      // Overwrite default options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';","","      this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;","","      // Added options","      this.options.calendar = options.calendar || this.messages.defaultCalendarOpts;","      this.options.zIndex   = options.zIndex || 4;","   },","","   /**","    * @method renderOverlay","    */","   renderOverlay: function() {","","      // Create overlay","      this.oOverlay = new Y.Overlay({","         visible:false,","         zIndex: this.options.zIndex","      });","","      this.oOverlay.render(this.fieldContainer);","","      this.oOverlay.on('visibleChange', function (e) {","","         if (e.newVal) { // show","            this.beforeShowOverlay();","            this.calendar.show();","","            // align","            this.oOverlay.set(\"align\", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});","","            // Activate outside event handler","            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {","               this.oOverlay.hide();","            }, this);","         }","         else { // hide","            this.calendar.hide();","            ","            if(this.outsideHandler){","              this.outsideHandler.detach();","            }","            ","         }","","      }, this);","   },","","   /**","    * @method _toggleOverlay","    * @private","    */","   _toggleOverlay: function(e) {","","      // DON'T stop the event since it will be used to close other overlays...","      //e.stopPropagation();","","      if(!this.oOverlay) {","         this.renderOverlay();","         this.renderCalendar();","      }","","      var method = this.oOverlay.get('visible') ? 'hide' : 'show';","      this.oOverlay[method] ();","   },","","   /**","    * Render the input field and the minical container","    * @method renderComponent","    */","   renderComponent: function() {","","      inputEx.DatePickerField.superclass.renderComponent.call(this);","","      // Create button","      this.button = Y.Node.create('<span class=\"inputEx-DatePicker-ButtonWrapper\"><span class=\"first-child\"><button type=\"button\" class=\"inputEx-DatePicker-Button\"></button></span></span>');","      this.button.appendTo(this.wrapEl);","","","      // Subscribe the click handler on the field only if readonly","      if(this.options.readonly) {","         Y.one(this.el).on('click', this._toggleOverlay, this);","      }","","      // Subscribe to the first click","      this.button.on('click', this._toggleOverlay, this);","   },","","","   /**","    * Called ONCE to render the calendar lazily","    * @method renderCalendar","    */","   renderCalendar: function() {","      // if already rendered, ignore call","      if (!!this.calendarRendered) { return; }","","      this.calendar = new Y.Calendar({","         width:'250px',","         showPrevMonth: true,","         showNextMonth: true,","         date: new Date()","      });","","      this.calendar.setAttrs(this.options.calendar);","","      this.calendar.render( this.oOverlay.get('contentBox') );","","      this.calendar.on(\"selectionChange\", function (ev) {","","         // Get the date from the list of selected","         // dates returned with the event (since only","         // single selection is enabled by default,","         // we expect there to be only one date)","         var newDate = ev.newSelection[0];","","         this.setValue(newDate);","","         this.oOverlay.hide();","      }, this);","","      this.calendarRendered = true;","   },","","   /**","    * Select the right date and display the right page on calendar, when the field has a value","    * @method beforeShowOverlay","    */","   beforeShowOverlay: function(e) {","","      if (!!this.calendar) {","","         var date = this.getValue(true), valid = this.validate();","","         // check if valid to exclude invalid dates (that are truthy !)","         // check date to exclude empty values ('')","         if (valid && !!date) {","            this.calendar.set('date', date);","            this.calendar.deselectDates();","            this.calendar.selectDates(date);","         }","      }","   },","","   /**","    * Call overlay when field is removed","    * @method close","    */","   close: function() {","      console.log(\"DATEPICKER CLOSE\", this.oOverlay);","      if (this.oOverlay) {","         this.oOverlay.hide();","      }","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      inputEx.DatePickerField.superclass.disable.call(this);","      this.button.set('disabled', true);","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      inputEx.DatePickerField.superclass.enable.call(this);","      this.button.set('disabled', false);","   }","","});","//","// this.messages.defaultCalendarOpts = { navigator: true };","","// Register this class as \"datepicker\" type","inputEx.registerType(\"datepicker\", inputEx.DatePickerField);","","","}, '@VERSION@', {\"requires\": [\"inputex-date\", \"event-outside\", \"node-event-delegate\", \"overlay\", \"calendar\"], \"ix_provides\": \"datepicker\", \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"ca\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"31":0,"34":0,"37":0,"39":0,"42":0,"43":0,"52":0,"57":0,"59":0,"61":0,"62":0,"63":0,"66":0,"69":0,"70":0,"74":0,"76":0,"77":0,"94":0,"95":0,"96":0,"99":0,"100":0,"109":0,"112":0,"113":0,"117":0,"118":0,"122":0,"132":0,"134":0,"141":0,"143":0,"145":0,"151":0,"153":0,"155":0,"158":0,"167":0,"169":0,"173":0,"174":0,"175":0,"176":0,"186":0,"187":0,"188":0,"197":0,"198":0,"206":0,"207":0,"215":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].functions = {"DatePickerField:19":0,"setOptions:29":0,"(anonymous 3):69":0,"(anonymous 2):59":0,"renderOverlay:49":0,"_toggleOverlay:89":0,"renderComponent:107":0,"(anonymous 4):145":0,"renderCalendar:130":0,"beforeShowOverlay:165":0,"close:185":0,"disable:196":0,"enable:205":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].coveredLines = 57;
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
this.oOverlay.set("align", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});

            // Activate outside event handler
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 69);
this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 3)", 69);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 70);
this.oOverlay.hide();
            }, this);
         }
         else { // hide
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 74);
this.calendar.hide();
            
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 76);
if(this.outsideHandler){
              _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 77);
this.outsideHandler.detach();
            }
            
         }

      }, this);
   },

   /**
    * @method _toggleOverlay
    * @private
    */
   _toggleOverlay: function(e) {

      // DON'T stop the event since it will be used to close other overlays...
      //e.stopPropagation();

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "_toggleOverlay", 89);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 94);
if(!this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 95);
this.renderOverlay();
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 96);
this.renderCalendar();
      }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 99);
var method = this.oOverlay.get('visible') ? 'hide' : 'show';
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 100);
this.oOverlay[method] ();
   },

   /**
    * Render the input field and the minical container
    * @method renderComponent
    */
   renderComponent: function() {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderComponent", 107);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 109);
inputEx.DatePickerField.superclass.renderComponent.call(this);

      // Create button
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 112);
this.button = Y.Node.create('<span class="inputEx-DatePicker-ButtonWrapper"><span class="first-child"><button type="button" class="inputEx-DatePicker-Button"></button></span></span>');
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 113);
this.button.appendTo(this.wrapEl);


      // Subscribe the click handler on the field only if readonly
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 117);
if(this.options.readonly) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 118);
Y.one(this.el).on('click', this._toggleOverlay, this);
      }

      // Subscribe to the first click
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 122);
this.button.on('click', this._toggleOverlay, this);
   },


   /**
    * Called ONCE to render the calendar lazily
    * @method renderCalendar
    */
   renderCalendar: function() {
      // if already rendered, ignore call
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderCalendar", 130);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 132);
if (!!this.calendarRendered) { return; }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 134);
this.calendar = new Y.Calendar({
         width:'250px',
         showPrevMonth: true,
         showNextMonth: true,
         date: new Date()
      });

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 141);
this.calendar.setAttrs(this.options.calendar);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 143);
this.calendar.render( this.oOverlay.get('contentBox') );

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 145);
this.calendar.on("selectionChange", function (ev) {

         // Get the date from the list of selected
         // dates returned with the event (since only
         // single selection is enabled by default,
         // we expect there to be only one date)
         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 4)", 145);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 151);
var newDate = ev.newSelection[0];

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 153);
this.setValue(newDate);

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 155);
this.oOverlay.hide();
      }, this);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 158);
this.calendarRendered = true;
   },

   /**
    * Select the right date and display the right page on calendar, when the field has a value
    * @method beforeShowOverlay
    */
   beforeShowOverlay: function(e) {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "beforeShowOverlay", 165);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 167);
if (!!this.calendar) {

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 169);
var date = this.getValue(true), valid = this.validate();

         // check if valid to exclude invalid dates (that are truthy !)
         // check date to exclude empty values ('')
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 173);
if (valid && !!date) {
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 174);
this.calendar.set('date', date);
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 175);
this.calendar.deselectDates();
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 176);
this.calendar.selectDates(date);
         }
      }
   },

   /**
    * Call overlay when field is removed
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "close", 185);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 186);
console.log("DATEPICKER CLOSE", this.oOverlay);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 187);
if (this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 188);
this.oOverlay.hide();
      }
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "disable", 196);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 197);
inputEx.DatePickerField.superclass.disable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 198);
this.button.set('disabled', true);
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "enable", 205);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 206);
inputEx.DatePickerField.superclass.enable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 207);
this.button.set('disabled', false);
   }

});
//
// this.messages.defaultCalendarOpts = { navigator: true };

// Register this class as "datepicker" type
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 215);
inputEx.registerType("datepicker", inputEx.DatePickerField);


}, '@VERSION@', {"requires": ["inputex-date", "event-outside", "node-event-delegate", "overlay", "calendar"], "ix_provides": "datepicker", "skinnable": true, "lang": ["en", "fr", "de", "ca", "es", "fr", "it", "nl"]});
