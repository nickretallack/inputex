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
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].code=["YUI.add('inputex-datepicker', function (Y, NAME) {","","/**"," * @module inputex-datepicker"," */","   var inputEx = Y.inputEx,","       lang = Y.Lang;","/**"," * A DatePicker Field."," * @class inputEx.DatePickerField"," * @extends inputEx.DateField"," * @constructor"," * @param {Object} options No added option for this field (same as DateField)"," * <ul>"," *   <li>calendar: yui calendar configuration object</li>"," *   <li>zIndex: calendar overlay zIndex</li>"," * </ul>"," */","inputEx.DatePickerField = function(options) {","   inputEx.DatePickerField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DatePickerField, inputEx.DateField, {","   /**","    * Set the default date picker CSS classes","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.DatePickerField.superclass.setOptions.call(this, options);","","      // Overwrite default options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';","","      this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;","","      // Added options","      this.options.calendar = options.calendar || inputEx.messages.defaultCalendarOpts;","      this.options.zIndex   = options.zIndex || 4;","   },","","   /**","    * @method renderOverlay","    */","   renderOverlay: function() {","","      // Create overlay","      this.oOverlay = new Y.Overlay({","         visible:false,","         zIndex: this.options.zIndex","      });","","      this.oOverlay.render(this.fieldContainer);","","      this.oOverlay.on('visibleChange', function (e) {","","         if (e.newVal) { // show","            this.beforeShowOverlay();","            this.calendar.show();","","            // align","            this.oOverlay.set(\"align\", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});","","            // Activate outside event handler","            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {","               this.oOverlay.hide();","            }, this);","         }","         else { // hide","            this.calendar.hide();","            ","            if(this.outsideHandler){","              this.outsideHandler.detach();","            }","            ","         }","","      }, this);","   },","","   /**","    * @method _toggleOverlay","    * @private","    */","   _toggleOverlay: function(e) {","","      // DON'T stop the event since it will be used to close other overlays...","      //e.stopPropagation();","","      if(!this.oOverlay) {","         this.renderOverlay();","         this.renderCalendar();","      }","","      var method = this.oOverlay.get('visible') ? 'hide' : 'show';","      this.oOverlay[method] ();","   },","","   /**","    * Render the input field and the minical container","    * @method renderComponent","    */","   renderComponent: function() {","","      inputEx.DatePickerField.superclass.renderComponent.call(this);","","      // Create button","      this.button = Y.Node.create(\"<button>&nbsp;</button>\").addClass(\"inputEx-DatePicker-button\");","      this.button.appendTo(this.wrapEl);","","","      // Subscribe the click handler on the field only if readonly","      if(this.options.readonly) {","         Y.one(this.el).on('click', this._toggleOverlay, this);","      }","","      // Subscribe to the first click","      this.button.on('click', this._toggleOverlay, this);","   },","","","   /**","    * Called ONCE to render the calendar lazily","    * @method renderCalendar","    */","   renderCalendar: function() {","      // if already rendered, ignore call","      if (!!this.calendarRendered) return;","","      this.calendar = new Y.Calendar({","         width:'250px',","         showPrevMonth: true,","         showNextMonth: true,","         date: new Date()","      });","","      this.calendar.setAttrs(this.options.calendar);","","      this.calendar.render( this.oOverlay.get('contentBox') );","","      this.calendar.on(\"selectionChange\", function (ev) {","","         // Get the date from the list of selected","         // dates returned with the event (since only","         // single selection is enabled by default,","         // we expect there to be only one date)","         var newDate = ev.newSelection[0];","","         this.setValue(newDate);","","         this.oOverlay.hide();","      }, this);","","      this.calendarRendered = true;","   },","","   /**","    * Select the right date and display the right page on calendar, when the field has a value","    * @method beforeShowOverlay","    */","   beforeShowOverlay: function(e) {","","      if (!!this.calendar) {","","         var date = this.getValue(true), valid = this.validate();","","         // check if valid to exclude invalid dates (that are truthy !)","         // check date to exclude empty values ('')","         if (valid && !!date) {","            this.calendar.set('date', date);","            this.calendar.deselectDates();","            this.calendar.selectDates(date);","         }","      }","   },","","   /**","    * Call overlay when field is removed","    * @method close","    */","   close: function() {","      console.log(\"DATEPICKER CLOSE\", this.oOverlay);","      if (this.oOverlay) {","         this.oOverlay.hide();","      }","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      inputEx.DatePickerField.superclass.disable.call(this);","      this.button.set('disabled', true);","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      inputEx.DatePickerField.superclass.enable.call(this);","      this.button.set('disabled', false);","   }","","});","","inputEx.messages.defaultCalendarOpts = { navigator: true };","","// Register this class as \"datepicker\" type","inputEx.registerType(\"datepicker\", inputEx.DatePickerField);","","","}, '@VERSION@', {\"requires\": [\"inputex-date\", \"event-outside\", \"node-event-delegate\", \"overlay\", \"calendar\"], \"ix_provides\": \"datepicker\"});"];
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"30":0,"33":0,"35":0,"38":0,"39":0,"48":0,"53":0,"55":0,"57":0,"58":0,"59":0,"62":0,"65":0,"66":0,"70":0,"72":0,"73":0,"90":0,"91":0,"92":0,"95":0,"96":0,"105":0,"108":0,"109":0,"113":0,"114":0,"118":0,"128":0,"130":0,"137":0,"139":0,"141":0,"147":0,"149":0,"151":0,"154":0,"163":0,"165":0,"169":0,"170":0,"171":0,"172":0,"182":0,"183":0,"184":0,"193":0,"194":0,"202":0,"203":0,"208":0,"211":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].functions = {"DatePickerField:19":0,"setOptions:29":0,"(anonymous 3):65":0,"(anonymous 2):55":0,"renderOverlay:45":0,"_toggleOverlay:85":0,"renderComponent:103":0,"(anonymous 4):141":0,"renderCalendar:126":0,"beforeShowOverlay:161":0,"close:181":0,"disable:192":0,"enable:201":0,"(anonymous 1):1":0};
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
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 30);
inputEx.DatePickerField.superclass.setOptions.call(this, options);

      // Overwrite default options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 33);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 35);
this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;

      // Added options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 38);
this.options.calendar = options.calendar || inputEx.messages.defaultCalendarOpts;
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 39);
this.options.zIndex   = options.zIndex || 4;
   },

   /**
    * @method renderOverlay
    */
   renderOverlay: function() {

      // Create overlay
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderOverlay", 45);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 48);
this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 53);
this.oOverlay.render(this.fieldContainer);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 55);
this.oOverlay.on('visibleChange', function (e) {

         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 2)", 55);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 57);
if (e.newVal) { // show
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 58);
this.beforeShowOverlay();
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 59);
this.calendar.show();

            // align
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 62);
this.oOverlay.set("align", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});

            // Activate outside event handler
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 65);
this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 3)", 65);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 66);
this.oOverlay.hide();
            }, this);
         }
         else { // hide
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 70);
this.calendar.hide();
            
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 72);
if(this.outsideHandler){
              _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 73);
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

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "_toggleOverlay", 85);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 90);
if(!this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 91);
this.renderOverlay();
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 92);
this.renderCalendar();
      }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 95);
var method = this.oOverlay.get('visible') ? 'hide' : 'show';
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 96);
this.oOverlay[method] ();
   },

   /**
    * Render the input field and the minical container
    * @method renderComponent
    */
   renderComponent: function() {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderComponent", 103);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 105);
inputEx.DatePickerField.superclass.renderComponent.call(this);

      // Create button
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 108);
this.button = Y.Node.create("<button>&nbsp;</button>").addClass("inputEx-DatePicker-button");
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 109);
this.button.appendTo(this.wrapEl);


      // Subscribe the click handler on the field only if readonly
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 113);
if(this.options.readonly) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 114);
Y.one(this.el).on('click', this._toggleOverlay, this);
      }

      // Subscribe to the first click
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 118);
this.button.on('click', this._toggleOverlay, this);
   },


   /**
    * Called ONCE to render the calendar lazily
    * @method renderCalendar
    */
   renderCalendar: function() {
      // if already rendered, ignore call
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderCalendar", 126);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 128);
if (!!this.calendarRendered) {return;}

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 130);
this.calendar = new Y.Calendar({
         width:'250px',
         showPrevMonth: true,
         showNextMonth: true,
         date: new Date()
      });

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 137);
this.calendar.setAttrs(this.options.calendar);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 139);
this.calendar.render( this.oOverlay.get('contentBox') );

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 141);
this.calendar.on("selectionChange", function (ev) {

         // Get the date from the list of selected
         // dates returned with the event (since only
         // single selection is enabled by default,
         // we expect there to be only one date)
         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 4)", 141);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 147);
var newDate = ev.newSelection[0];

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 149);
this.setValue(newDate);

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 151);
this.oOverlay.hide();
      }, this);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 154);
this.calendarRendered = true;
   },

   /**
    * Select the right date and display the right page on calendar, when the field has a value
    * @method beforeShowOverlay
    */
   beforeShowOverlay: function(e) {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "beforeShowOverlay", 161);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 163);
if (!!this.calendar) {

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 165);
var date = this.getValue(true), valid = this.validate();

         // check if valid to exclude invalid dates (that are truthy !)
         // check date to exclude empty values ('')
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 169);
if (valid && !!date) {
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 170);
this.calendar.set('date', date);
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 171);
this.calendar.deselectDates();
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 172);
this.calendar.selectDates(date);
         }
      }
   },

   /**
    * Call overlay when field is removed
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "close", 181);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 182);
console.log("DATEPICKER CLOSE", this.oOverlay);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 183);
if (this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 184);
this.oOverlay.hide();
      }
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "disable", 192);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 193);
inputEx.DatePickerField.superclass.disable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 194);
this.button.set('disabled', true);
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "enable", 201);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 202);
inputEx.DatePickerField.superclass.enable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 203);
this.button.set('disabled', false);
   }

});

_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 208);
inputEx.messages.defaultCalendarOpts = { navigator: true };

// Register this class as "datepicker" type
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 211);
inputEx.registerType("datepicker", inputEx.DatePickerField);


}, '@VERSION@', {"requires": ["inputex-date", "event-outside", "node-event-delegate", "overlay", "calendar"], "ix_provides": "datepicker"});
