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
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].code=["YUI.add('inputex-datepicker', function (Y, NAME) {","","/**"," * @module inputex-datepicker"," */","   var inputEx = Y.inputEx,","       lang = Y.Lang;","/**"," * A DatePicker Field."," * @class inputEx.DatePickerField"," * @extends inputEx.DateField"," * @constructor"," * @param {Object} options No added option for this field (same as DateField)"," * <ul>"," *   <li>calendarOpts: yui calendar configuration object</li>"," *   <li>zIndex: calendar overlay zIndex</li>"," * </ul>"," */","inputEx.DatePickerField = function(options) {","   inputEx.DatePickerField.superclass.constructor.call(this,options);","};","","","Y.extend(inputEx.DatePickerField, inputEx.DateField, {","   ","   // in the prototype so that it can be overridden at the \"class\" level","   defaultCalendarOpts: {},","   ","   /**","    * Set the default date picker CSS classes","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      inputEx.DatePickerField.superclass.setOptions.call(this, options);","","      // Overwrite default options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';","","      this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;","","      // Added options","      this.options.calendarOpts = options.calendarOpts || this.defaultCalendarOpts;","      this.options.zIndex       = options.zIndex || 4;","   },","","   /**","    * @method renderOverlay","    */","   renderOverlay: function() {","","      // Create overlay","      this.oOverlay = new Y.Overlay({","         visible:false,","         zIndex: this.options.zIndex","      });","","      this.oOverlay.render(this.fieldContainer);","","      this.oOverlay.on('visibleChange', function (e) {","","         if (e.newVal) { // show","            this.beforeShowOverlay();","            ","            // required for IE 7 (see hide below)","            this.calendar.show();","","            // align","            this.oOverlay.set(\"align\", { node: this.buttonWrapper,  points: [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL] });","","            // Activate outside event handler","            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {","               // hide the overlay if","               //   - the target is not the button, and","               //   - the target is not the readonly input node","               if (e.target !== this.button && !(this.options.readonly && e.target._node === this.el)) {","                  this.oOverlay.hide();","               }","            }, this);","         }","         else { // hide","            ","            // required for IE 7, else borders of cells will be displayed","            // even if the overlay isn't shown...","            this.calendar.hide();","            ","            if (this.outsideHandler) {","               this.outsideHandler.detach();","            }","            ","         }","","      }, this);","   },","","   /**","    * @method _toggleOverlay","    * @private","    */","   _toggleOverlay: function() {","","      // DON'T stop the event since it will be used to close other overlays...","      //e.stopPropagation();","","      if (!this.oOverlay) {","         this.renderOverlay();","         this.renderCalendar();","      }","","      var method = this.oOverlay.get('visible') ? 'hide' : 'show';","      this.oOverlay[method]();","   },","","   /**","    * Render the input field and the minical container","    * @method renderComponent","    */","   renderComponent: function() {","","      inputEx.DatePickerField.superclass.renderComponent.call(this);","","      // create button + wrapper","      this.buttonWrapper = Y.Node.create('<span class=\"inputEx-DatePicker-ButtonWrapper\">'+","                                             '<button type=\"button\" class=\"inputEx-DatePicker-Button\">'+","                                             '</button>'+","                                         '</span>');","      ","      this.buttonWrapper.appendTo(this.wrapEl);","      ","      // get a reference to the <button> element","      this.button = this.buttonWrapper.one('.inputEx-DatePicker-Button');","      ","      // toggle overlay if click on the <button> element","      this.button.on('click', this._toggleOverlay, this);","      ","      // toggle overlay if click on the <input> element (only if readonly)","      if (this.options.readonly) {","         Y.one(this.el).on('click', this._toggleOverlay, this);","      }","      ","   },","","","   /**","    * Called ONCE to render the calendar lazily","    * @method renderCalendar","    */","   renderCalendar: function() {","      // if already rendered, ignore call","      if (!!this.calendarRendered) { return; }","","      var localCalendarOptions = {","         showPrevMonth: true,","         showNextMonth: true,","         date: new Date()","      },","","      finalCalendarOptions = Y.mix(this.options.calendarOpts, localCalendarOptions);","","      this.calendar = new Y.Calendar(finalCalendarOptions);","      if(finalCalendarOptions.customRenderer){","        this.calendar.set(\"customRenderer\", finalCalendarOptions.customRenderer);","      }","      this.calendar.render( this.oOverlay.get('contentBox') );","      if(finalCalendarOptions.plugin){","        this.calendar.plug(finalCalendarOptions.plugin.pluginClass, Y.mix(","        /* Inside this plug in we can only control the calendar.","          problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself","          by giving the datepicker we can control the overlay behavior */","          {datepicker : this},","          finalCalendarOptions.plugin.pluginOptions","          )","        );","      }","","      this.calendar.on(\"dateClick\", function (ev) {","         ","         // skip disabled cells","         if (ev.cell.hasClass('yui3-calendar-selection-disabled')) {","            return;","         }","         ","         // Get the date from the list of selected","         // dates returned with the event (since only","         // single selection is enabled by default,","         // we expect there to be only one date)","         var newDate = ev.date;","","         this.setValue(newDate);","","         this.oOverlay.hide();","         ","      }, this);","      ","      this.calendarRendered = true;","   },","","   /**","   * Select the right date and display the right page on calendar, when the field has a value","   * @method beforeShowOverlay","   */","   beforeShowOverlay: function() {","","      if (!!this.calendar) {","","         var date  = this.getValue(true),","             valid = this.validate();","","         // check if valid to exclude invalid dates (that are truthy !)","         // check date to exclude empty values ('')","         if (valid && !!date) {","","            // display the right month","            this.calendar.set('date', date);","","            // there's no way to use deselectDates or selectDates without firing the","            // selectionChange event so we use _clearSelection and _addDateToSelection","            // instead.","            this.calendar._clearSelection(true);        // pass true so that selectionChange event is not fired","            this.calendar._addDateToSelection(date, 1); // pass 1    so that selectionChange event is not fired","            this.calendar._renderSelectedDates();       // need to be called explicitely since selectionChange is had not been fired","         }","      }","   },","    ","   /**","    * Call overlay when field is removed","    * @method close","    */","   close: function() {","      if (this.oOverlay) {","         this.oOverlay.hide();","      }","   },","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {","      inputEx.DatePickerField.superclass.disable.call(this);","      this.button.set('disabled', true);","   },","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {","      inputEx.DatePickerField.superclass.enable.call(this);","      this.button.set('disabled', false);","   }","","});","","// Register this class as \"datepicker\" type","inputEx.registerType(\"datepicker\", inputEx.DatePickerField);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-date\",","        \"event-outside\",","        \"node-event-delegate\",","        \"overlay\",","        \"calendar\"","    ],","    \"ix_provides\": \"datepicker\",","    \"skinnable\": true","});"];
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].lines = {"1":0,"6":0,"19":0,"20":0,"24":0,"36":0,"39":0,"41":0,"44":0,"45":0,"54":0,"59":0,"61":0,"63":0,"64":0,"67":0,"70":0,"73":0,"77":0,"78":0,"86":0,"88":0,"89":0,"106":0,"107":0,"108":0,"111":0,"112":0,"121":0,"124":0,"129":0,"132":0,"135":0,"138":0,"139":0,"151":0,"153":0,"161":0,"162":0,"163":0,"165":0,"166":0,"167":0,"177":0,"180":0,"181":0,"188":0,"190":0,"192":0,"196":0,"205":0,"207":0,"212":0,"215":0,"220":0,"221":0,"222":0,"232":0,"233":0,"242":0,"243":0,"251":0,"252":0,"258":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].functions = {"DatePickerField:19":0,"setOptions:34":0,"(anonymous 3):73":0,"(anonymous 2):61":0,"renderOverlay:51":0,"_toggleOverlay:101":0,"renderComponent:119":0,"(anonymous 4):177":0,"renderCalendar:149":0,"beforeShowOverlay:203":0,"close:231":0,"disable:241":0,"enable:250":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datepicker/inputex-datepicker.js"].coveredLines = 64;
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
 *   <li>calendarOpts: yui calendar configuration object</li>
 *   <li>zIndex: calendar overlay zIndex</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 19);
inputEx.DatePickerField = function(options) {
   _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "DatePickerField", 19);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 20);
inputEx.DatePickerField.superclass.constructor.call(this,options);
};


_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 24);
Y.extend(inputEx.DatePickerField, inputEx.DateField, {
   
   // in the prototype so that it can be overridden at the "class" level
   defaultCalendarOpts: {},
   
   /**
    * Set the default date picker CSS classes
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "setOptions", 34);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 36);
inputEx.DatePickerField.superclass.setOptions.call(this, options);

      // Overwrite default options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 39);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField';

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 41);
this.options.readonly = lang.isUndefined(options.readonly) ? true : options.readonly;

      // Added options
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 44);
this.options.calendarOpts = options.calendarOpts || this.defaultCalendarOpts;
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 45);
this.options.zIndex       = options.zIndex || 4;
   },

   /**
    * @method renderOverlay
    */
   renderOverlay: function() {

      // Create overlay
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderOverlay", 51);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 54);
this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 59);
this.oOverlay.render(this.fieldContainer);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 61);
this.oOverlay.on('visibleChange', function (e) {

         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 2)", 61);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 63);
if (e.newVal) { // show
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 64);
this.beforeShowOverlay();
            
            // required for IE 7 (see hide below)
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 67);
this.calendar.show();

            // align
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 70);
this.oOverlay.set("align", { node: this.buttonWrapper,  points: [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL] });

            // Activate outside event handler
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 73);
this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               // hide the overlay if
               //   - the target is not the button, and
               //   - the target is not the readonly input node
               _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 3)", 73);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 77);
if (e.target !== this.button && !(this.options.readonly && e.target._node === this.el)) {
                  _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 78);
this.oOverlay.hide();
               }
            }, this);
         }
         else { // hide
            
            // required for IE 7, else borders of cells will be displayed
            // even if the overlay isn't shown...
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 86);
this.calendar.hide();
            
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 88);
if (this.outsideHandler) {
               _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 89);
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

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "_toggleOverlay", 101);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 106);
if (!this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 107);
this.renderOverlay();
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 108);
this.renderCalendar();
      }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 111);
var method = this.oOverlay.get('visible') ? 'hide' : 'show';
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 112);
this.oOverlay[method]();
   },

   /**
    * Render the input field and the minical container
    * @method renderComponent
    */
   renderComponent: function() {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderComponent", 119);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 121);
inputEx.DatePickerField.superclass.renderComponent.call(this);

      // create button + wrapper
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 124);
this.buttonWrapper = Y.Node.create('<span class="inputEx-DatePicker-ButtonWrapper">'+
                                             '<button type="button" class="inputEx-DatePicker-Button">'+
                                             '</button>'+
                                         '</span>');
      
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 129);
this.buttonWrapper.appendTo(this.wrapEl);
      
      // get a reference to the <button> element
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 132);
this.button = this.buttonWrapper.one('.inputEx-DatePicker-Button');
      
      // toggle overlay if click on the <button> element
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 135);
this.button.on('click', this._toggleOverlay, this);
      
      // toggle overlay if click on the <input> element (only if readonly)
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 138);
if (this.options.readonly) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 139);
Y.one(this.el).on('click', this._toggleOverlay, this);
      }
      
   },


   /**
    * Called ONCE to render the calendar lazily
    * @method renderCalendar
    */
   renderCalendar: function() {
      // if already rendered, ignore call
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "renderCalendar", 149);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 151);
if (!!this.calendarRendered) { return; }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 153);
var localCalendarOptions = {
         showPrevMonth: true,
         showNextMonth: true,
         date: new Date()
      },

      finalCalendarOptions = Y.mix(this.options.calendarOpts, localCalendarOptions);

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 161);
this.calendar = new Y.Calendar(finalCalendarOptions);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 162);
if(finalCalendarOptions.customRenderer){
        _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 163);
this.calendar.set("customRenderer", finalCalendarOptions.customRenderer);
      }
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 165);
this.calendar.render( this.oOverlay.get('contentBox') );
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 166);
if(finalCalendarOptions.plugin){
        _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 167);
this.calendar.plug(finalCalendarOptions.plugin.pluginClass, Y.mix(
        /* Inside this plug in we can only control the calendar.
          problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself
          by giving the datepicker we can control the overlay behavior */
          {datepicker : this},
          finalCalendarOptions.plugin.pluginOptions
          )
        );
      }

      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 177);
this.calendar.on("dateClick", function (ev) {
         
         // skip disabled cells
         _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "(anonymous 4)", 177);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 180);
if (ev.cell.hasClass('yui3-calendar-selection-disabled')) {
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 181);
return;
         }
         
         // Get the date from the list of selected
         // dates returned with the event (since only
         // single selection is enabled by default,
         // we expect there to be only one date)
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 188);
var newDate = ev.date;

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 190);
this.setValue(newDate);

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 192);
this.oOverlay.hide();
         
      }, this);
      
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 196);
this.calendarRendered = true;
   },

   /**
   * Select the right date and display the right page on calendar, when the field has a value
   * @method beforeShowOverlay
   */
   beforeShowOverlay: function() {

      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "beforeShowOverlay", 203);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 205);
if (!!this.calendar) {

         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 207);
var date  = this.getValue(true),
             valid = this.validate();

         // check if valid to exclude invalid dates (that are truthy !)
         // check date to exclude empty values ('')
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 212);
if (valid && !!date) {

            // display the right month
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 215);
this.calendar.set('date', date);

            // there's no way to use deselectDates or selectDates without firing the
            // selectionChange event so we use _clearSelection and _addDateToSelection
            // instead.
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 220);
this.calendar._clearSelection(true);        // pass true so that selectionChange event is not fired
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 221);
this.calendar._addDateToSelection(date, 1); // pass 1    so that selectionChange event is not fired
            _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 222);
this.calendar._renderSelectedDates();       // need to be called explicitely since selectionChange is had not been fired
         }
      }
   },
    
   /**
    * Call overlay when field is removed
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "close", 231);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 232);
if (this.oOverlay) {
         _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 233);
this.oOverlay.hide();
      }
   },

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "disable", 241);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 242);
inputEx.DatePickerField.superclass.disable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 243);
this.button.set('disabled', true);
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-datepicker/inputex-datepicker.js", "enable", 250);
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 251);
inputEx.DatePickerField.superclass.enable.call(this);
      _yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 252);
this.button.set('disabled', false);
   }

});

// Register this class as "datepicker" type
_yuitest_coverline("build/inputex-datepicker/inputex-datepicker.js", 258);
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
