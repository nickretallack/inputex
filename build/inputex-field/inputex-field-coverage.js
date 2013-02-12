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
_yuitest_coverage["build/inputex-field/inputex-field.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-field/inputex-field.js",
    code: []
};
_yuitest_coverage["build/inputex-field/inputex-field.js"].code=["YUI.add('inputex-field', function (Y, NAME) {","","/**"," * Provides the base \"field\" abstract class"," * @module inputex-field"," */","var lang = Y.Lang,","   inputEx = Y.inputEx;","","/**"," * An abstract class (never instantiated) that contains the shared features for all fields."," * @class inputEx.Field"," * @constructor"," * @param {Object} options Configuration object"," * <ul>"," *   <li>name: the name of the field</li>"," *   <li>required: boolean, the field cannot be null if true</li>"," *   <li>className: CSS class name for the div wrapper (default 'inputEx-Field')</li>"," *   <li>value: initial value</li>"," *   <li>parentEl: HTMLElement or String id, append the field to this DOM element</li>"," * </ul>"," */","inputEx.Field = function(options) {","","   // I18N","   this.messages = Y.Intl.get(\"inputex-field\");","","   // Set the default values of the options","   this.setOptions(options || {});","","   // Call the render of the dom","   this.render();","","   /**","    * Event fired after the user changed the value of the field.","    * Fired when the field is \"updated\"<br /> subscribe with: myfield.on('updated', function(value) { console.log(\"updated\",value); }, this, true);","    * @event updated","    * @param {Any} value The new value of the field","    */","   this.publish(\"updated\");","","   // initialize behaviour events","   this.initEvents();","","   // Set the initial value","   //   -> no initial value = no style (setClassFromState called by setValue)","   if(!lang.isUndefined(this.options.value)) {","      this.setValue(this.options.value, false);","   }","","   // append it immediatly to the parent DOM element","   if(options.parentEl) {","      if(lang.isString(options.parentEl)) {","         // searching for the id","         Y.one(\"#\" + options.parentEl).appendChild(this.getEl());","      } else {","         options.parentEl.appendChild(this.getEl());","      }","   }","};","","inputEx.Field.prototype = {","","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","","      // Configuration object to set the options for this class and the parent classes. See constructor details for options added by this class.","      this.options = {};","","      // Basic options","      this.options.name = options.name;","      this.options.value = options.value;","      this.options.id = options.id || Y.guid();","      this.options.label = options.label;","      this.options.description = options.description;","      this.options.wrapperClassName = options.wrapperClassName;","","      // Define default messages","      this.messages.required = (options.messages && options.messages.required) ? options.messages.required : this.messages.required;","      this.messages.invalid = (options.messages && options.messages.invalid) ? options.messages.invalid : this.messages.invalid;","","      // Other options","      this.options.className = options.className ? options.className : 'inputEx-Field';","      this.options.required = lang.isUndefined(options.required) ? false : options.required;","      this.options.showMsg = lang.isUndefined(options.showMsg) ? false : options.showMsg;","   },","","","   /**","    * Set the name of the field (or hidden field)","    * @method setFieldName","    */","   setFieldName: function() {},","","   /**","    * Default render of the dom element. Create a divEl that wraps the field.","    * @method render","    */","   render: function() {","","      // Create a DIV element to wrap the editing el and the image","      this.divEl = inputEx.cn('div', {","         className: this.options.wrapperClassName || 'inputEx-fieldWrapper'","      });","      if(this.options.id) {","         this.divEl.id = this.options.id;","      }","      if(this.options.required) {","         Y.one(this.divEl).addClass(\"inputEx-required\");","      }","","      // Label element","      if(lang.isString(this.options.label)) {","         this.labelDiv = inputEx.cn('div', {","            id: this.divEl.id + '-label',","            className: 'inputEx-label'","         });","         this.labelEl = inputEx.cn('label', {","            'for': this.divEl.id + '-field'","         }, null, this.options.label === \"\" ? \"&nbsp;\" : this.options.label);","         this.labelDiv.appendChild(this.labelEl);","         this.divEl.appendChild(this.labelDiv);","      }","","      this.fieldContainer = inputEx.cn('div', {","         className: this.options.className","      }); // for wrapping the field and description","      // Render the component directly","      this.renderComponent();","","      // Description","      if(this.options.description) {","         this.fieldContainer.appendChild(inputEx.cn('div', {","            id: this.divEl.id + '-desc',","            className: 'inputEx-description'","         }, null, this.options.description));","      }","","      this.divEl.appendChild(this.fieldContainer);","","      // Insert a float breaker","      this.divEl.appendChild(inputEx.cn('div', null, {","         clear: 'both'","      }, \" \"));","","   },","","   /**","    * Fire the \"updated\" event (only if the field validated)","    * Escape the stack using a setTimeout","    * @method fireUpdatedEvt","    */","   fireUpdatedEvt: function() {","      // Uses setTimeout to escape the stack (that originiated in an event)","      var that = this;","      setTimeout(function() {","         that.fire(\"updated\", that.getValue(), that);","      }, 50);","   },","","   /**","    * Render the interface component into this.divEl","    * @method renderComponent","    */","   renderComponent: function() {","      // override me","   },","","   /**","    * The default render creates a div to put in the messages","    * @method getEl","    * @return {HTMLElement} divEl The main DIV wrapper","    */","   getEl: function() {","      return this.divEl;","   },","","   /**","    * Initialize events of the Input","    * @method initEvents","    */","   initEvents: function() {","      // override me","   },","","   /**","    * Return the value of the input","    * @method getValue","    * @return {Any} value of the field","    */","   getValue: function() {","      // override me","   },","","   /**","    * Function to set the value","    * @method setValue","    * @param {Any} value The new value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true,","    * pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","      // to be inherited","      // set corresponding style","      this.setClassFromState();","","      if(sendUpdatedEvt !== false) {","         // fire update event","         this.fireUpdatedEvt();","      }","   },","","   /**","    * Set the styles for valid/invalid state.  If a state is not provided, getState will be called.","    * @method setClassFromState","    * @param {String} One of the following states: 'empty', 'required', 'valid' or 'invalid'","    */","   setClassFromState: function(state) {","","      var className;","      // remove previous class","      if(this.previousState) {","         // remove invalid className for both required and invalid fields","         className = 'inputEx-' + ((this.previousState === inputEx.stateRequired) ? inputEx.stateInvalid : this.previousState);","         Y.one(this.divEl).removeClass(className);","      }","","      // add new class","      state = state || this.getState();","      if(!(state === inputEx.stateEmpty && Y.one(this.divEl).hasClass('inputEx-focused'))) {","         // add invalid className for both required and invalid fields","         className = 'inputEx-' + ((state === inputEx.stateRequired) ? inputEx.stateInvalid : state);","         Y.one(this.divEl).addClass(className);","      }","","      if(this.options.showMsg) {","         this.displayMessage(this.getStateString(state));","      }","","      this.previousState = state;","   },","","   /**","    * Get the string for the given state","    * @method getStateString","    */","   getStateString: function(state) {","      if(state === inputEx.stateRequired) {","         return this.messages.required;","      } else if(state === inputEx.stateInvalid) {","         return this.messages.invalid;","      } else {","         return '';","      }","   },","","   /**","    * Returns the current state (given its value)","    * @method getState","    * @return {String} One of the following states: 'empty', 'required', 'valid' or 'invalid'","    */","   getState: function() {","      // if the field is empty :","      if (this.isEmpty()) {","         return this.options.required ? inputEx.stateRequired : inputEx.stateEmpty;","      }","      return this.validate() ? inputEx.stateValid : inputEx.stateInvalid;","   },","","   /**","    * Validation of the field","    * @method validate","    * @return {Boolean} field validation status (true/false)","    */","   validate: function() {","      // empty required field will not validate","      return !this.options.required || !this.isEmpty();","   },","","   /**","    * Function called on the focus event","    * @method onFocus","    * @param {Event} e The original 'focus' event","    */","   onFocus: function() {","      var el = Y.one(this.getEl());","      el.removeClass('inputEx-empty');","      el.addClass('inputEx-focused');","   },","","   /**","    * Function called on the blur event","    * @method onBlur","    * @param {Event} e The original 'blur' event","    */","   onBlur: function() {","      Y.one(this.getEl()).removeClass('inputEx-focused');","","      // Call setClassFromState on Blur","      this.setClassFromState();","   },","","   /**","    * onChange event handler","    * @method onChange","    * @param {Event} e The original 'change' event","    */","   onChange: function() {","      this.fireUpdatedEvt();","   },","","   /**","    * Close the field and eventually opened popups...","    * @method close","    */","   close: function() {},","","   /**","    * Disable the field","    * @method disable","    */","   disable: function() {},","","   /**","    * Enable the field","    * @method enable","    */","   enable: function() {},","","   /**","    * Check if the field is diabled","    * @method isDisabled","    */","   isDisabled: function() {","      return false;","   },","","   /**","    * Focus the field","    * @method focus","    */","   focus: function() {},","","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      var el = this.getEl();","","      // Unsubscribe all listeners on the \"updated\" event","      // this.detachAll( \"updated\" );","      this.detachAll();","","      // Purge element (remove listeners on el and childNodes recursively)","      Y.Event.purgeElement(el, true);","","      // Remove from DOM","      if(Y.one(el).inDoc()) {","         el.parentNode.removeChild(el);","      }","","   },","","   /**","    * Update the message","    * @method displayMessage","    * @param {String} msg Message to display","    */","   displayMessage: function(msg) {","      if(!this.fieldContainer) {","         return;","      }","      if(!this.msgEl) {","         this.msgEl = inputEx.cn('div', {","            className: 'inputEx-message'","         });","         try {","            var divElements = this.divEl.getElementsByTagName('div');","             //insertBefore the clear:both div","            this.divEl.insertBefore(this.msgEl, divElements[(divElements.length - 1 >= 0) ? divElements.length - 1 : 0]);","         } catch(e) {","            alert(e);","         }","      }","      this.msgEl.innerHTML = msg;","   },","","   /**","    * Show the field","    * @method show","    */","   show: function() {","      this.divEl.style.display = '';","   },","","   /**","    * Hide the field","    * @method hide","    */","   hide: function() {","      this.divEl.style.display = 'none';","   },","","   /**","    * Clear the field by setting the field value to this.options.value","    * @method clear","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not","    * (default is true, pass false to NOT send the event)","    */","   clear: function(sendUpdatedEvt) {","      this.setValue(lang.isUndefined(this.options.value) ? '' : this.options.value, sendUpdatedEvt);","   },","","   /**","    * Test if the field is empty","    * @method isEmpty","    * @return {Boolean} field emptiness (true/false)","    */","   isEmpty: function() {","      return this.getValue() === '';","   },","","   /**","    * Set the parentField.","    * Generally use by composable fields (ie. Group,Form,ListField,CombineField,...}","    * @method setParentField","    * @param {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField} parentField The parent field instance","    */","   setParentField: function(parentField) {","      this.parentField = parentField;","   },","","   /**","    * Return the parent field instance","    * @method getParentField","    * @return {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField}","    */","   getParentField: function() {","      return this.parentField;","   }","","};","","Y.augment(inputEx.Field, Y.EventTarget, null, null, {});","","inputEx.Field.groupOptions = [{","   type: \"string\",","   label: \"Name\",","   name: \"name\",","   value: '',","   required: true","}, {","   type: \"string\",","   label: \"Label\",","   name: \"label\",","   value: ''","}, {","   type: \"string\",","   label: \"Description\",","   name: \"description\",","   value: ''","}, {","   type: \"boolean\",","   label: \"Required?\",","   name: \"required\",","   value: false","}, {","   type: \"boolean\",","   label: \"Show messages\",","   name: \"showMsg\",","   value: false","}];","","}, '@VERSION@', {\"requires\": [\"inputex\", \"intl\"], \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"ca\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-field/inputex-field.js"].lines = {"1":0,"7":0,"23":0,"26":0,"29":0,"32":0,"40":0,"43":0,"47":0,"48":0,"52":0,"53":0,"55":0,"57":0,"62":0,"72":0,"75":0,"76":0,"77":0,"78":0,"79":0,"80":0,"83":0,"84":0,"87":0,"88":0,"89":0,"106":0,"109":0,"110":0,"112":0,"113":0,"117":0,"118":0,"122":0,"125":0,"126":0,"129":0,"133":0,"136":0,"137":0,"143":0,"146":0,"159":0,"160":0,"161":0,"179":0,"209":0,"211":0,"213":0,"224":0,"226":0,"228":0,"229":0,"233":0,"234":0,"236":0,"237":0,"240":0,"241":0,"244":0,"252":0,"253":0,"254":0,"255":0,"257":0,"268":0,"269":0,"271":0,"281":0,"290":0,"291":0,"292":0,"301":0,"304":0,"313":0,"339":0,"353":0,"357":0,"360":0,"363":0,"364":0,"375":0,"376":0,"378":0,"379":0,"382":0,"383":0,"385":0,"387":0,"390":0,"398":0,"406":0,"416":0,"425":0,"435":0,"444":0,"449":0,"451":0};
_yuitest_coverage["build/inputex-field/inputex-field.js"].functions = {"Field:23":0,"setOptions:69":0,"render:103":0,"(anonymous 2):160":0,"fireUpdatedEvt:157":0,"getEl:178":0,"setValue:206":0,"setClassFromState:222":0,"getStateString:251":0,"getState:266":0,"validate:279":0,"onFocus:289":0,"onBlur:300":0,"onChange:312":0,"isDisabled:338":0,"destroy:352":0,"displayMessage:374":0,"show:397":0,"hide:405":0,"clear:415":0,"isEmpty:424":0,"setParentField:434":0,"getParentField:443":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-field/inputex-field.js"].coveredLines = 99;
_yuitest_coverage["build/inputex-field/inputex-field.js"].coveredFunctions = 24;
_yuitest_coverline("build/inputex-field/inputex-field.js", 1);
YUI.add('inputex-field', function (Y, NAME) {

/**
 * Provides the base "field" abstract class
 * @module inputex-field
 */
_yuitest_coverfunc("build/inputex-field/inputex-field.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-field/inputex-field.js", 7);
var lang = Y.Lang,
   inputEx = Y.inputEx;

/**
 * An abstract class (never instantiated) that contains the shared features for all fields.
 * @class inputEx.Field
 * @constructor
 * @param {Object} options Configuration object
 * <ul>
 *   <li>name: the name of the field</li>
 *   <li>required: boolean, the field cannot be null if true</li>
 *   <li>className: CSS class name for the div wrapper (default 'inputEx-Field')</li>
 *   <li>value: initial value</li>
 *   <li>parentEl: HTMLElement or String id, append the field to this DOM element</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-field/inputex-field.js", 23);
inputEx.Field = function(options) {

   // I18N
   _yuitest_coverfunc("build/inputex-field/inputex-field.js", "Field", 23);
_yuitest_coverline("build/inputex-field/inputex-field.js", 26);
this.messages = Y.Intl.get("inputex-field");

   // Set the default values of the options
   _yuitest_coverline("build/inputex-field/inputex-field.js", 29);
this.setOptions(options || {});

   // Call the render of the dom
   _yuitest_coverline("build/inputex-field/inputex-field.js", 32);
this.render();

   /**
    * Event fired after the user changed the value of the field.
    * Fired when the field is "updated"<br /> subscribe with: myfield.on('updated', function(value) { console.log("updated",value); }, this, true);
    * @event updated
    * @param {Any} value The new value of the field
    */
   _yuitest_coverline("build/inputex-field/inputex-field.js", 40);
this.publish("updated");

   // initialize behaviour events
   _yuitest_coverline("build/inputex-field/inputex-field.js", 43);
this.initEvents();

   // Set the initial value
   //   -> no initial value = no style (setClassFromState called by setValue)
   _yuitest_coverline("build/inputex-field/inputex-field.js", 47);
if(!lang.isUndefined(this.options.value)) {
      _yuitest_coverline("build/inputex-field/inputex-field.js", 48);
this.setValue(this.options.value, false);
   }

   // append it immediatly to the parent DOM element
   _yuitest_coverline("build/inputex-field/inputex-field.js", 52);
if(options.parentEl) {
      _yuitest_coverline("build/inputex-field/inputex-field.js", 53);
if(lang.isString(options.parentEl)) {
         // searching for the id
         _yuitest_coverline("build/inputex-field/inputex-field.js", 55);
Y.one("#" + options.parentEl).appendChild(this.getEl());
      } else {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 57);
options.parentEl.appendChild(this.getEl());
      }
   }
};

_yuitest_coverline("build/inputex-field/inputex-field.js", 62);
inputEx.Field.prototype = {

   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {

      // Configuration object to set the options for this class and the parent classes. See constructor details for options added by this class.
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "setOptions", 69);
_yuitest_coverline("build/inputex-field/inputex-field.js", 72);
this.options = {};

      // Basic options
      _yuitest_coverline("build/inputex-field/inputex-field.js", 75);
this.options.name = options.name;
      _yuitest_coverline("build/inputex-field/inputex-field.js", 76);
this.options.value = options.value;
      _yuitest_coverline("build/inputex-field/inputex-field.js", 77);
this.options.id = options.id || Y.guid();
      _yuitest_coverline("build/inputex-field/inputex-field.js", 78);
this.options.label = options.label;
      _yuitest_coverline("build/inputex-field/inputex-field.js", 79);
this.options.description = options.description;
      _yuitest_coverline("build/inputex-field/inputex-field.js", 80);
this.options.wrapperClassName = options.wrapperClassName;

      // Define default messages
      _yuitest_coverline("build/inputex-field/inputex-field.js", 83);
this.messages.required = (options.messages && options.messages.required) ? options.messages.required : this.messages.required;
      _yuitest_coverline("build/inputex-field/inputex-field.js", 84);
this.messages.invalid = (options.messages && options.messages.invalid) ? options.messages.invalid : this.messages.invalid;

      // Other options
      _yuitest_coverline("build/inputex-field/inputex-field.js", 87);
this.options.className = options.className ? options.className : 'inputEx-Field';
      _yuitest_coverline("build/inputex-field/inputex-field.js", 88);
this.options.required = lang.isUndefined(options.required) ? false : options.required;
      _yuitest_coverline("build/inputex-field/inputex-field.js", 89);
this.options.showMsg = lang.isUndefined(options.showMsg) ? false : options.showMsg;
   },


   /**
    * Set the name of the field (or hidden field)
    * @method setFieldName
    */
   setFieldName: function() {},

   /**
    * Default render of the dom element. Create a divEl that wraps the field.
    * @method render
    */
   render: function() {

      // Create a DIV element to wrap the editing el and the image
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "render", 103);
_yuitest_coverline("build/inputex-field/inputex-field.js", 106);
this.divEl = inputEx.cn('div', {
         className: this.options.wrapperClassName || 'inputEx-fieldWrapper'
      });
      _yuitest_coverline("build/inputex-field/inputex-field.js", 109);
if(this.options.id) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 110);
this.divEl.id = this.options.id;
      }
      _yuitest_coverline("build/inputex-field/inputex-field.js", 112);
if(this.options.required) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 113);
Y.one(this.divEl).addClass("inputEx-required");
      }

      // Label element
      _yuitest_coverline("build/inputex-field/inputex-field.js", 117);
if(lang.isString(this.options.label)) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 118);
this.labelDiv = inputEx.cn('div', {
            id: this.divEl.id + '-label',
            className: 'inputEx-label'
         });
         _yuitest_coverline("build/inputex-field/inputex-field.js", 122);
this.labelEl = inputEx.cn('label', {
            'for': this.divEl.id + '-field'
         }, null, this.options.label === "" ? "&nbsp;" : this.options.label);
         _yuitest_coverline("build/inputex-field/inputex-field.js", 125);
this.labelDiv.appendChild(this.labelEl);
         _yuitest_coverline("build/inputex-field/inputex-field.js", 126);
this.divEl.appendChild(this.labelDiv);
      }

      _yuitest_coverline("build/inputex-field/inputex-field.js", 129);
this.fieldContainer = inputEx.cn('div', {
         className: this.options.className
      }); // for wrapping the field and description
      // Render the component directly
      _yuitest_coverline("build/inputex-field/inputex-field.js", 133);
this.renderComponent();

      // Description
      _yuitest_coverline("build/inputex-field/inputex-field.js", 136);
if(this.options.description) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 137);
this.fieldContainer.appendChild(inputEx.cn('div', {
            id: this.divEl.id + '-desc',
            className: 'inputEx-description'
         }, null, this.options.description));
      }

      _yuitest_coverline("build/inputex-field/inputex-field.js", 143);
this.divEl.appendChild(this.fieldContainer);

      // Insert a float breaker
      _yuitest_coverline("build/inputex-field/inputex-field.js", 146);
this.divEl.appendChild(inputEx.cn('div', null, {
         clear: 'both'
      }, " "));

   },

   /**
    * Fire the "updated" event (only if the field validated)
    * Escape the stack using a setTimeout
    * @method fireUpdatedEvt
    */
   fireUpdatedEvt: function() {
      // Uses setTimeout to escape the stack (that originiated in an event)
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "fireUpdatedEvt", 157);
_yuitest_coverline("build/inputex-field/inputex-field.js", 159);
var that = this;
      _yuitest_coverline("build/inputex-field/inputex-field.js", 160);
setTimeout(function() {
         _yuitest_coverfunc("build/inputex-field/inputex-field.js", "(anonymous 2)", 160);
_yuitest_coverline("build/inputex-field/inputex-field.js", 161);
that.fire("updated", that.getValue(), that);
      }, 50);
   },

   /**
    * Render the interface component into this.divEl
    * @method renderComponent
    */
   renderComponent: function() {
      // override me
   },

   /**
    * The default render creates a div to put in the messages
    * @method getEl
    * @return {HTMLElement} divEl The main DIV wrapper
    */
   getEl: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "getEl", 178);
_yuitest_coverline("build/inputex-field/inputex-field.js", 179);
return this.divEl;
   },

   /**
    * Initialize events of the Input
    * @method initEvents
    */
   initEvents: function() {
      // override me
   },

   /**
    * Return the value of the input
    * @method getValue
    * @return {Any} value of the field
    */
   getValue: function() {
      // override me
   },

   /**
    * Function to set the value
    * @method setValue
    * @param {Any} value The new value
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true,
    * pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {
      // to be inherited
      // set corresponding style
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "setValue", 206);
_yuitest_coverline("build/inputex-field/inputex-field.js", 209);
this.setClassFromState();

      _yuitest_coverline("build/inputex-field/inputex-field.js", 211);
if(sendUpdatedEvt !== false) {
         // fire update event
         _yuitest_coverline("build/inputex-field/inputex-field.js", 213);
this.fireUpdatedEvt();
      }
   },

   /**
    * Set the styles for valid/invalid state.  If a state is not provided, getState will be called.
    * @method setClassFromState
    * @param {String} One of the following states: 'empty', 'required', 'valid' or 'invalid'
    */
   setClassFromState: function(state) {

      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "setClassFromState", 222);
_yuitest_coverline("build/inputex-field/inputex-field.js", 224);
var className;
      // remove previous class
      _yuitest_coverline("build/inputex-field/inputex-field.js", 226);
if(this.previousState) {
         // remove invalid className for both required and invalid fields
         _yuitest_coverline("build/inputex-field/inputex-field.js", 228);
className = 'inputEx-' + ((this.previousState === inputEx.stateRequired) ? inputEx.stateInvalid : this.previousState);
         _yuitest_coverline("build/inputex-field/inputex-field.js", 229);
Y.one(this.divEl).removeClass(className);
      }

      // add new class
      _yuitest_coverline("build/inputex-field/inputex-field.js", 233);
state = state || this.getState();
      _yuitest_coverline("build/inputex-field/inputex-field.js", 234);
if(!(state === inputEx.stateEmpty && Y.one(this.divEl).hasClass('inputEx-focused'))) {
         // add invalid className for both required and invalid fields
         _yuitest_coverline("build/inputex-field/inputex-field.js", 236);
className = 'inputEx-' + ((state === inputEx.stateRequired) ? inputEx.stateInvalid : state);
         _yuitest_coverline("build/inputex-field/inputex-field.js", 237);
Y.one(this.divEl).addClass(className);
      }

      _yuitest_coverline("build/inputex-field/inputex-field.js", 240);
if(this.options.showMsg) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 241);
this.displayMessage(this.getStateString(state));
      }

      _yuitest_coverline("build/inputex-field/inputex-field.js", 244);
this.previousState = state;
   },

   /**
    * Get the string for the given state
    * @method getStateString
    */
   getStateString: function(state) {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "getStateString", 251);
_yuitest_coverline("build/inputex-field/inputex-field.js", 252);
if(state === inputEx.stateRequired) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 253);
return this.messages.required;
      } else {_yuitest_coverline("build/inputex-field/inputex-field.js", 254);
if(state === inputEx.stateInvalid) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 255);
return this.messages.invalid;
      } else {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 257);
return '';
      }}
   },

   /**
    * Returns the current state (given its value)
    * @method getState
    * @return {String} One of the following states: 'empty', 'required', 'valid' or 'invalid'
    */
   getState: function() {
      // if the field is empty :
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "getState", 266);
_yuitest_coverline("build/inputex-field/inputex-field.js", 268);
if (this.isEmpty()) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 269);
return this.options.required ? inputEx.stateRequired : inputEx.stateEmpty;
      }
      _yuitest_coverline("build/inputex-field/inputex-field.js", 271);
return this.validate() ? inputEx.stateValid : inputEx.stateInvalid;
   },

   /**
    * Validation of the field
    * @method validate
    * @return {Boolean} field validation status (true/false)
    */
   validate: function() {
      // empty required field will not validate
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "validate", 279);
_yuitest_coverline("build/inputex-field/inputex-field.js", 281);
return !this.options.required || !this.isEmpty();
   },

   /**
    * Function called on the focus event
    * @method onFocus
    * @param {Event} e The original 'focus' event
    */
   onFocus: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "onFocus", 289);
_yuitest_coverline("build/inputex-field/inputex-field.js", 290);
var el = Y.one(this.getEl());
      _yuitest_coverline("build/inputex-field/inputex-field.js", 291);
el.removeClass('inputEx-empty');
      _yuitest_coverline("build/inputex-field/inputex-field.js", 292);
el.addClass('inputEx-focused');
   },

   /**
    * Function called on the blur event
    * @method onBlur
    * @param {Event} e The original 'blur' event
    */
   onBlur: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "onBlur", 300);
_yuitest_coverline("build/inputex-field/inputex-field.js", 301);
Y.one(this.getEl()).removeClass('inputEx-focused');

      // Call setClassFromState on Blur
      _yuitest_coverline("build/inputex-field/inputex-field.js", 304);
this.setClassFromState();
   },

   /**
    * onChange event handler
    * @method onChange
    * @param {Event} e The original 'change' event
    */
   onChange: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "onChange", 312);
_yuitest_coverline("build/inputex-field/inputex-field.js", 313);
this.fireUpdatedEvt();
   },

   /**
    * Close the field and eventually opened popups...
    * @method close
    */
   close: function() {},

   /**
    * Disable the field
    * @method disable
    */
   disable: function() {},

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {},

   /**
    * Check if the field is diabled
    * @method isDisabled
    */
   isDisabled: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "isDisabled", 338);
_yuitest_coverline("build/inputex-field/inputex-field.js", 339);
return false;
   },

   /**
    * Focus the field
    * @method focus
    */
   focus: function() {},

   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "destroy", 352);
_yuitest_coverline("build/inputex-field/inputex-field.js", 353);
var el = this.getEl();

      // Unsubscribe all listeners on the "updated" event
      // this.detachAll( "updated" );
      _yuitest_coverline("build/inputex-field/inputex-field.js", 357);
this.detachAll();

      // Purge element (remove listeners on el and childNodes recursively)
      _yuitest_coverline("build/inputex-field/inputex-field.js", 360);
Y.Event.purgeElement(el, true);

      // Remove from DOM
      _yuitest_coverline("build/inputex-field/inputex-field.js", 363);
if(Y.one(el).inDoc()) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 364);
el.parentNode.removeChild(el);
      }

   },

   /**
    * Update the message
    * @method displayMessage
    * @param {String} msg Message to display
    */
   displayMessage: function(msg) {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "displayMessage", 374);
_yuitest_coverline("build/inputex-field/inputex-field.js", 375);
if(!this.fieldContainer) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 376);
return;
      }
      _yuitest_coverline("build/inputex-field/inputex-field.js", 378);
if(!this.msgEl) {
         _yuitest_coverline("build/inputex-field/inputex-field.js", 379);
this.msgEl = inputEx.cn('div', {
            className: 'inputEx-message'
         });
         _yuitest_coverline("build/inputex-field/inputex-field.js", 382);
try {
            _yuitest_coverline("build/inputex-field/inputex-field.js", 383);
var divElements = this.divEl.getElementsByTagName('div');
             //insertBefore the clear:both div
            _yuitest_coverline("build/inputex-field/inputex-field.js", 385);
this.divEl.insertBefore(this.msgEl, divElements[(divElements.length - 1 >= 0) ? divElements.length - 1 : 0]);
         } catch(e) {
            _yuitest_coverline("build/inputex-field/inputex-field.js", 387);
alert(e);
         }
      }
      _yuitest_coverline("build/inputex-field/inputex-field.js", 390);
this.msgEl.innerHTML = msg;
   },

   /**
    * Show the field
    * @method show
    */
   show: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "show", 397);
_yuitest_coverline("build/inputex-field/inputex-field.js", 398);
this.divEl.style.display = '';
   },

   /**
    * Hide the field
    * @method hide
    */
   hide: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "hide", 405);
_yuitest_coverline("build/inputex-field/inputex-field.js", 406);
this.divEl.style.display = 'none';
   },

   /**
    * Clear the field by setting the field value to this.options.value
    * @method clear
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not
    * (default is true, pass false to NOT send the event)
    */
   clear: function(sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "clear", 415);
_yuitest_coverline("build/inputex-field/inputex-field.js", 416);
this.setValue(lang.isUndefined(this.options.value) ? '' : this.options.value, sendUpdatedEvt);
   },

   /**
    * Test if the field is empty
    * @method isEmpty
    * @return {Boolean} field emptiness (true/false)
    */
   isEmpty: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "isEmpty", 424);
_yuitest_coverline("build/inputex-field/inputex-field.js", 425);
return this.getValue() === '';
   },

   /**
    * Set the parentField.
    * Generally use by composable fields (ie. Group,Form,ListField,CombineField,...}
    * @method setParentField
    * @param {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField} parentField The parent field instance
    */
   setParentField: function(parentField) {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "setParentField", 434);
_yuitest_coverline("build/inputex-field/inputex-field.js", 435);
this.parentField = parentField;
   },

   /**
    * Return the parent field instance
    * @method getParentField
    * @return {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField}
    */
   getParentField: function() {
      _yuitest_coverfunc("build/inputex-field/inputex-field.js", "getParentField", 443);
_yuitest_coverline("build/inputex-field/inputex-field.js", 444);
return this.parentField;
   }

};

_yuitest_coverline("build/inputex-field/inputex-field.js", 449);
Y.augment(inputEx.Field, Y.EventTarget, null, null, {});

_yuitest_coverline("build/inputex-field/inputex-field.js", 451);
inputEx.Field.groupOptions = [{
   type: "string",
   label: "Name",
   name: "name",
   value: '',
   required: true
}, {
   type: "string",
   label: "Label",
   name: "label",
   value: ''
}, {
   type: "string",
   label: "Description",
   name: "description",
   value: ''
}, {
   type: "boolean",
   label: "Required?",
   name: "required",
   value: false
}, {
   type: "boolean",
   label: "Show messages",
   name: "showMsg",
   value: false
}];

}, '@VERSION@', {"requires": ["inputex", "intl"], "skinnable": true, "lang": ["en", "fr", "de", "ca", "es", "fr", "it", "nl"]});
