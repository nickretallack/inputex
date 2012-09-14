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
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].code=["YUI.add('inputex-datepicker', function (Y, NAME) {","","/**"," * @module inputex-datepicker"," */","YUI.add(\"inputex-datepicker\",function(Y){","","   var inputEx = Y.inputEx,","       lang = Y.Lang;","/**"," * A DatePicker Field."," * @class inputEx.DatePickerField"," * @extends inputEx.DateField"," * @constructor"," * @param {Object} options No added option for this field (same as DateField)"," * <ul>"," *   <li>calendar: yui calendar configuration object</li>"," *   <li>zIndex: calendar overlay zIndex</li>"," * </ul>"," */","inputEx.DatePickerField = function(options) {","   inputEx.DatePickerField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DatePickerField, inputEx.DateField, {","   /**","    * Set the default date picker CSS classes","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.DatePickerField.superclass.setOptions.call(this, options);","","      // Overwrite default options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';","","      this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;","","      // Added options","      this.options.calendar = options.calendar || inputEx.messages.defaultCalendarOpts;","      this.options.zIndex   = options.zIndex || 4;","   },","","   /**","    * @method renderOverlay","    */","   renderOverlay: function() {","","      // Create overlay","      this.oOverlay = new Y.Overlay({","         visible:false,","         zIndex: this.options.zIndex","      });","","      this.oOverlay.render(this.fieldContainer);","","      this.oOverlay.on('visibleChange', function (e) {","","         if (e.newVal) { // show","            this.beforeShowOverlay();","            this.calendar.show();","","            // align","            this.oOverlay.set(\"align\", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});","","            // Activate outside event handler","            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {","               this.oOverlay.hide();","            }, this);","         }","         else { // hide","            this.calendar.hide();","            ","            if(this.outsideHandler){","              this.outsideHandler.detach();","            }","            ","         }","","      }, this);","   },","","   /**","    * @method _toggleOverlay","    * @private","    */","   _toggleOverlay: function(e) {","","      // DON'T stop the event since it will be used to close other overlays...","      //e.stopPropagation();","","      if(!this.oOverlay) {","         this.renderOverlay();","         this.renderCalendar();","      }","","      var method = this.oOverlay.get('visible') ? 'hide' : 'show';","      this.oOverlay[method] ();","   },","","   /**","    * Render the input field and the minical container","    * @method renderComponent","    */","   renderComponent: function() {","","      inputEx.DatePickerField.superclass.renderComponent.call(this);","","      // Create button","      this.button = Y.Node.create(\"<button>&nbsp;</button>\").addClass(\"inputEx-DatePicker-button\");","      this.button.appendTo(this.wrapEl);","","","      // Subscribe the click handler on the field only if readonly","      if(this.options.readonly) {","         Y.one(this.el).on('click', this._toggleOverlay, this);","      }","","      // Subscribe to the first click","      this.button.on('click', this._toggleOverlay, this);","   },","","","   /**","    * Called ONCE to render the calendar lazily","    * @method renderCalendar","    */","   renderCalendar: function() {","      // if already rendered, ignore call","      if (!!this.calendarRendered) return;","","      this.calendar = new Y.Calendar({","         width:'250px',","         showPrevMonth: true,","         showNextMonth: true,","         date: new Date()","      });","","      this.calendar.setAttrs(this.options.calendar);","","      this.calendar.render( this.oOverlay.get('contentBox') );","","      this.calendar.on(\"selectionChange\", function (ev) {","","         // Get the date from the list of selected","         // dates returned with the event (since only","         // single selection is enabled by default,","         // we expect there to be only one date)","         var newDate = ev.newSelection[0];","","         this.setValue(newDate);","","         this.oOverlay.hide();","      }, this);","","      this.calendarRendered = true;","   },","","   /**","    * Select the right date and display the right page on calendar, when the field has a value","    * @method beforeShowOverlay","    */","   beforeShowOverlay: function(e) {","","      if (!!this.calendar) {","","         var date = this.getValue(true), valid = this.validate();","","         // check if valid to exclude invalid dates (that are truthy !)","         // check date to exclude empty values ('')","         if (valid && !!date) {","            this.calendar.set('date', date);","            this.calendar.deselectDates();","            this.calendar.selectDates(date);","         }","      }","   },","","   /**","    * Call overlay when field is removed","    * @method close","    */","   close: function() {","      console.log(\"DATEPICKER CLOSE\", this.oOverlay);","      if (this.oOverlay) {","         this.oOverlay.hide();","      }","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      inputEx.DatePickerField.superclass.disable.call(this);","      this.button.set('disabled', true);","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      inputEx.DatePickerField.superclass.enable.call(this);","      this.button.set('disabled', false);","   }","","});","","inputEx.messages.defaultCalendarOpts = { navigator: true };","","// Register this class as \"datepicker\" type","inputEx.registerType(\"datepicker\", inputEx.DatePickerField);","","}, '3.1.0',{","requires: ['inputex-date', 'event-outside', 'node-event-delegate','overlay','calendar']","});","","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"25":0,"32":0,"35":0,"37":0,"40":0,"41":0,"50":0,"55":0,"57":0,"59":0,"60":0,"61":0,"64":0,"67":0,"68":0,"72":0,"74":0,"75":0,"92":0,"93":0,"94":0,"97":0,"98":0,"107":0,"110":0,"111":0,"115":0,"116":0,"120":0,"130":0,"132":0,"139":0,"141":0,"143":0,"149":0,"151":0,"153":0,"156":0,"165":0,"167":0,"171":0,"172":0,"173":0,"174":0,"184":0,"185":0,"186":0,"195":0,"196":0,"204":0,"205":0,"210":0,"213":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].functions = {"DatePickerField:21":0,"setOptions:31":0,"(anonymous 4):67":0,"(anonymous 3):57":0,"renderOverlay:47":0,"_toggleOverlay:87":0,"renderComponent:105":0,"(anonymous 5):143":0,"renderCalendar:128":0,"beforeShowOverlay:163":0,"close:183":0,"disable:194":0,"enable:203":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].coveredLines = 58;
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].coveredFunctions = 15;
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 1);
YUI.add('inputex-datepicker', function (Y, NAME) {

/**
 * @module inputex-datepicker
 */
_yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 6);
YUI.add("inputex-datepicker",function(Y){

   _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 8);
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
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 21);
inputEx.DatePickerField = function(options) {
   _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "DatePickerField", 21);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 22);
inputEx.DatePickerField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 25);
Y.extend(inputEx.DatePickerField, inputEx.DateField, {
   /**
    * Set the default date picker CSS classes
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "setOptions", 31);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 32);
inputEx.DatePickerField.superclass.setOptions.call(this, options);

      // Overwrite default options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 35);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 37);
this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;

      // Added options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 40);
this.options.calendar = options.calendar || inputEx.messages.defaultCalendarOpts;
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 41);
this.options.zIndex   = options.zIndex || 4;
   },

   /**
    * @method renderOverlay
    */
   renderOverlay: function() {

      // Create overlay
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderOverlay", 47);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 50);
this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 55);
this.oOverlay.render(this.fieldContainer);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 57);
this.oOverlay.on('visibleChange', function (e) {

         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 3)", 57);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 59);
if (e.newVal) { // show
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 60);
this.beforeShowOverlay();
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 61);
this.calendar.show();

            // align
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 64);
this.oOverlay.set("align", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});

            // Activate outside event handler
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 67);
this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 4)", 67);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 68);
this.oOverlay.hide();
            }, this);
         }
         else { // hide
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 72);
this.calendar.hide();
            
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 74);
if(this.outsideHandler){
              _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 75);
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

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "_toggleOverlay", 87);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 92);
if(!this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 93);
this.renderOverlay();
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 94);
this.renderCalendar();
      }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 97);
var method = this.oOverlay.get('visible') ? 'hide' : 'show';
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 98);
this.oOverlay[method] ();
   },

   /**
    * Render the input field and the minical container
    * @method renderComponent
    */
   renderComponent: function() {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderComponent", 105);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 107);
inputEx.DatePickerField.superclass.renderComponent.call(this);

      // Create button
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 110);
this.button = Y.Node.create("<button>&nbsp;</button>").addClass("inputEx-DatePicker-button");
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 111);
this.button.appendTo(this.wrapEl);


      // Subscribe the click handler on the field only if readonly
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 115);
if(this.options.readonly) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 116);
Y.one(this.el).on('click', this._toggleOverlay, this);
      }

      // Subscribe to the first click
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 120);
this.button.on('click', this._toggleOverlay, this);
   },


   /**
    * Called ONCE to render the calendar lazily
    * @method renderCalendar
    */
   renderCalendar: function() {
      // if already rendered, ignore call
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderCalendar", 128);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 130);
if (!!this.calendarRendered) {return;}

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 132);
this.calendar = new Y.Calendar({
         width:'250px',
         showPrevMonth: true,
         showNextMonth: true,
         date: new Date()
      });

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 139);
this.calendar.setAttrs(this.options.calendar);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 141);
this.calendar.render( this.oOverlay.get('contentBox') );

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 143);
this.calendar.on("selectionChange", function (ev) {

         // Get the date from the list of selected
         // dates returned with the event (since only
         // single selection is enabled by default,
         // we expect there to be only one date)
         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 5)", 143);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 149);
var newDate = ev.newSelection[0];

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 151);
this.setValue(newDate);

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 153);
this.oOverlay.hide();
      }, this);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 156);
this.calendarRendered = true;
   },

   /**
    * Select the right date and display the right page on calendar, when the field has a value
    * @method beforeShowOverlay
    */
   beforeShowOverlay: function(e) {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "beforeShowOverlay", 163);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 165);
if (!!this.calendar) {

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 167);
var date = this.getValue(true), valid = this.validate();

         // check if valid to exclude invalid dates (that are truthy !)
         // check date to exclude empty values ('')
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 171);
if (valid && !!date) {
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 172);
this.calendar.set('date', date);
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 173);
this.calendar.deselectDates();
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 174);
this.calendar.selectDates(date);
         }
      }
   },

   /**
    * Call overlay when field is removed
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "close", 183);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 184);
console.log("DATEPICKER CLOSE", this.oOverlay);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 185);
if (this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 186);
this.oOverlay.hide();
      }
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "disable", 194);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 195);
inputEx.DatePickerField.superclass.disable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 196);
this.button.set('disabled', true);
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "enable", 203);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 204);
inputEx.DatePickerField.superclass.enable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 205);
this.button.set('disabled', false);
   }

});

_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 210);
inputEx.messages.defaultCalendarOpts = { navigator: true };

// Register this class as "datepicker" type
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 213);
inputEx.registerType("datepicker", inputEx.DatePickerField);

}, '3.1.0',{
requires: ['inputex-date', 'event-outside', 'node-event-delegate','overlay','calendar']
});



}, '@VERSION@');
