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
_yuitest_coverage["build/inputex-slider/inputex-slider.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-slider/inputex-slider.js",
    code: []
};
_yuitest_coverage["build/inputex-slider/inputex-slider.js"].code=["YUI.add('inputex-slider', function (Y, NAME) {","","/**"," * @module inputex-slider"," */","   var inputEx = Y.inputEx,","       lang = Y.Lang;     ","/**"," * Create a slider using YUI widgets"," * @class inputEx.SliderField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.SliderField = function(options) {","   inputEx.SliderField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.SliderField, inputEx.Field, {","   /**","    * Set the classname to 'inputEx-SliderField'","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.SliderField.superclass.setOptions.call(this, options);","      ","      this.options.className = options.className ? options.className : 'inputEx-SliderField';","      this.options.pixelEnd  = lang.isUndefined(options.pixelEnd) ? 100 : options.pixelEnd;","      ","      this.options.minValue = lang.isUndefined(options.minValue) ? 0 : options.minValue;","      this.options.maxValue = lang.isUndefined(options.maxValue) ? 100 : options.maxValue;","      this.options.displayValue = lang.isUndefined(options.displayValue) ? true : options.displayValue;","   },","      ","   /**","    * render a slider widget","    * @method renderComponent","    */","   renderComponent: function() {","            ","      this.sliderbg = inputEx.cn('div', {className: 'inputEx-SliderField-bg'});","      this.fieldContainer.appendChild(this.sliderbg);","      ","      if(this.options.displayValue) {","         this.valueDisplay = inputEx.cn('div', {className: 'inputEx-SliderField-value'}, null, String(this.options.minValue) );","         this.fieldContainer.appendChild(this.valueDisplay);","      }","      ","      this.fieldContainer.appendChild( inputEx.cn('div',null,{clear: 'both'}) );","            ","      this.slider = new Y.Slider({","             axis        : 'x',","             min         : this.options.minValue,","             max         : this.options.maxValue,","             value       : this.options.value","         });","         this.slider.render(this.sliderbg);","         ","   },","   ","   /**","    * @method initEvents","    */","   initEvents: function() {","      ","      // Fire the updated event when we released the slider","      // the slider 'change' event would generate too much events (if used in a group, it gets validated too many times)","      this.slider.on('slideEnd', this.fireUpdatedEvt, this, true);","      ","      // Update the displayed value","      if(this.options.displayValue) {","         this.on('updated', function(val) {","            this.valueDisplay.innerHTML = val;","         }, this, true);","      }","   },","   ","   /**","    * Function to set the value","    * @method setValue","    * @param {Any} value The new value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */  ","   setValue: function(val, sendUpdatedEvt) {","      ","      var v = val;","      if(v < this.options.minValue) {","         v = this.options.minValue;","      }","      if(v > this.options.maxValue ) {","         v = this.options.maxValue;","      }","      ","      var percent = Math.floor(v-this.options.minValue)*this.options.pixelEnd/this.options.maxValue;","      ","      this.slider.setValue(percent);","      ","      inputEx.SliderField.superclass.setValue.call(this, val, sendUpdatedEvt);","   },","","   /**","    * Get the value from the slider","    * @method getValue","    * @return {int} The integer value","    */","   getValue: function() {","      var val = Math.floor(this.options.minValue+(this.options.maxValue-this.options.minValue)*this.slider.getValue()/this.options.pixelEnd);","      return val;","   }","    ","});","","// Register this class as \"slider\" type","inputEx.registerType(\"slider\", inputEx.SliderField, [","   { type: 'integer', label: 'Min. value',  name: 'minValue', value: 0 },","   { type: 'integer', label: 'Max. value', name: 'maxValue', value: 100 }","]);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"slider\"], \"ix_provides\": \"slider\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-slider/inputex-slider.js"].lines = {"1":0,"6":0,"15":0,"16":0,"19":0,"26":0,"28":0,"29":0,"31":0,"32":0,"33":0,"42":0,"43":0,"45":0,"46":0,"47":0,"50":0,"52":0,"58":0,"69":0,"72":0,"73":0,"74":0,"87":0,"88":0,"89":0,"91":0,"92":0,"95":0,"97":0,"99":0,"108":0,"109":0,"115":0};
_yuitest_coverage["build/inputex-slider/inputex-slider.js"].functions = {"SliderField:15":0,"setOptions:25":0,"renderComponent:40":0,"(anonymous 2):73":0,"initEvents:65":0,"setValue:85":0,"getValue:107":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-slider/inputex-slider.js"].coveredLines = 34;
_yuitest_coverage["build/inputex-slider/inputex-slider.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 1);
YUI.add('inputex-slider', function (Y, NAME) {

/**
 * @module inputex-slider
 */
   _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 6);
var inputEx = Y.inputEx,
       lang = Y.Lang;     
/**
 * Create a slider using YUI widgets
 * @class inputEx.SliderField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 15);
inputEx.SliderField = function(options) {
   _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "SliderField", 15);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 16);
inputEx.SliderField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-slider/inputex-slider.js", 19);
Y.extend(inputEx.SliderField, inputEx.Field, {
   /**
    * Set the classname to 'inputEx-SliderField'
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "setOptions", 25);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 26);
inputEx.SliderField.superclass.setOptions.call(this, options);
      
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 28);
this.options.className = options.className ? options.className : 'inputEx-SliderField';
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 29);
this.options.pixelEnd  = lang.isUndefined(options.pixelEnd) ? 100 : options.pixelEnd;
      
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 31);
this.options.minValue = lang.isUndefined(options.minValue) ? 0 : options.minValue;
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 32);
this.options.maxValue = lang.isUndefined(options.maxValue) ? 100 : options.maxValue;
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 33);
this.options.displayValue = lang.isUndefined(options.displayValue) ? true : options.displayValue;
   },
      
   /**
    * render a slider widget
    * @method renderComponent
    */
   renderComponent: function() {
            
      _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "renderComponent", 40);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 42);
this.sliderbg = inputEx.cn('div', {className: 'inputEx-SliderField-bg'});
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 43);
this.fieldContainer.appendChild(this.sliderbg);
      
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 45);
if(this.options.displayValue) {
         _yuitest_coverline("build/inputex-slider/inputex-slider.js", 46);
this.valueDisplay = inputEx.cn('div', {className: 'inputEx-SliderField-value'}, null, String(this.options.minValue) );
         _yuitest_coverline("build/inputex-slider/inputex-slider.js", 47);
this.fieldContainer.appendChild(this.valueDisplay);
      }
      
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 50);
this.fieldContainer.appendChild( inputEx.cn('div',null,{clear: 'both'}) );
            
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 52);
this.slider = new Y.Slider({
             axis        : 'x',
             min         : this.options.minValue,
             max         : this.options.maxValue,
             value       : this.options.value
         });
         _yuitest_coverline("build/inputex-slider/inputex-slider.js", 58);
this.slider.render(this.sliderbg);
         
   },
   
   /**
    * @method initEvents
    */
   initEvents: function() {
      
      // Fire the updated event when we released the slider
      // the slider 'change' event would generate too much events (if used in a group, it gets validated too many times)
      _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "initEvents", 65);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 69);
this.slider.on('slideEnd', this.fireUpdatedEvt, this, true);
      
      // Update the displayed value
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 72);
if(this.options.displayValue) {
         _yuitest_coverline("build/inputex-slider/inputex-slider.js", 73);
this.on('updated', function(val) {
            _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "(anonymous 2)", 73);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 74);
this.valueDisplay.innerHTML = val;
         }, this, true);
      }
   },
   
   /**
    * Function to set the value
    * @method setValue
    * @param {Any} value The new value
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */  
   setValue: function(val, sendUpdatedEvt) {
      
      _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "setValue", 85);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 87);
var v = val;
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 88);
if(v < this.options.minValue) {
         _yuitest_coverline("build/inputex-slider/inputex-slider.js", 89);
v = this.options.minValue;
      }
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 91);
if(v > this.options.maxValue ) {
         _yuitest_coverline("build/inputex-slider/inputex-slider.js", 92);
v = this.options.maxValue;
      }
      
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 95);
var percent = Math.floor(v-this.options.minValue)*this.options.pixelEnd/this.options.maxValue;
      
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 97);
this.slider.setValue(percent);
      
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 99);
inputEx.SliderField.superclass.setValue.call(this, val, sendUpdatedEvt);
   },

   /**
    * Get the value from the slider
    * @method getValue
    * @return {int} The integer value
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-slider/inputex-slider.js", "getValue", 107);
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 108);
var val = Math.floor(this.options.minValue+(this.options.maxValue-this.options.minValue)*this.slider.getValue()/this.options.pixelEnd);
      _yuitest_coverline("build/inputex-slider/inputex-slider.js", 109);
return val;
   }
    
});

// Register this class as "slider" type
_yuitest_coverline("build/inputex-slider/inputex-slider.js", 115);
inputEx.registerType("slider", inputEx.SliderField, [
   { type: 'integer', label: 'Min. value',  name: 'minValue', value: 0 },
   { type: 'integer', label: 'Max. value', name: 'maxValue', value: 100 }
]);


}, '@VERSION@', {"requires": ["inputex-field", "slider"], "ix_provides": "slider", "skinnable": true});
