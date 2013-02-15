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
_yuitest_coverage["build/inputex-combine/inputex-combine.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-combine/inputex-combine.js",
    code: []
};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].code=["YUI.add('inputex-combine', function (Y, NAME) {","","/**"," * @module inputex-combine"," */","var lang = Y.Lang,","   inputEx = Y.inputEx;","","/**"," * A meta field to put N fields on the same line, separated by separators"," * @class inputEx.CombineField"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>separators: array of string inserted</li>"," * </ul>"," */","inputEx.CombineField = function(options) {","   inputEx.CombineField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.CombineField, inputEx.Group, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function (options) {","      inputEx.CombineField.superclass.setOptions.call(this, options);","","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-CombineField';","","      // Added options","      this.options.separators = options.separators;","   },","","   // Override Group.render()","   render: function () {","      return inputEx.Field.prototype.render.apply(this, arguments);","   },","","   /**","    * @method render","    */","   renderComponent: function() {","      this.renderFields(this.fieldContainer);","","      if(this.options.disabled) {","         this.disable();","      }","   },","","   /**","    * Render the subfields","    * @method renderFields","    */","   renderFields: function(parentNode) {","","      this.appendSeparator(0);","","      if(!this.options.fields) {","         return;","      }","","      var i, iLength = this.options.fields.length,","          field_config, field, fieldEl, t;","","      for (i = 0; i < iLength; i++) {","","         field_config = this.options.fields[i];","","         field = this.renderField(field_config);","","         fieldEl = field.getEl();","","         t = field_config.type;","","         if (t !== \"group\" && t !== \"form\") {","            // remove the line breaker (<div style='clear: both;'>)","            fieldEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length - 1]);","         }","         ","         /* This rule should stay in javascript because the cross-browser equivalent in css would be like:","         *      .inputEx-CombineField .inputEx-fieldWrapper { float: left }","         *","         *  That css would need to be overriden later by nested fields inside the combine (ex: datepicker),","         *  and every time we have to do that, a unicorn dies.","         */","         Y.one(fieldEl).setStyle('float', 'left');","         ","         parentNode.appendChild(fieldEl);","","         this.appendSeparator(i + 1);","      }","","      this.setFieldName(this.options.name);","","","   },","","   /**","    * Override to force required option on each subfield","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by inputEx()","    */","   renderField: function(fieldOptions) {","","      // Subfields should inherit required property","      if (this.options.required) {","         fieldOptions.required = true;","      }","","      return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);","   },","","   /**","    * @method setFieldName","    */","   setFieldName: function(name) {","      ","      var i, newName;","","      if(name) {","         for(i = 0; i < this.inputs.length; i++) {","            newName = \"\";","            if(this.inputs[i].options.name) {","               newName = name + \"[\" + this.inputs[i].options.name + \"]\";","            } else {","               newName = name + \"[\" + i + \"]\";","            }","            this.inputs[i].setFieldName(newName);","         }","      }","   },","","   /**","    * Add a separator to the fieldContainer","    * @method appendSeparator","    */","   appendSeparator: function(i) {","      if(this.options.separators && this.options.separators[i]) {","         var sep = inputEx.cn('div', {","            className: 'inputEx-CombineField-separator'","         }, null, this.options.separators[i]);","         this.fieldContainer.appendChild(sep);","      }","   },","","   /**","    * @method initEvents","    */","   initEvents: function() {","      var me = this,","         blurTimeout,","         divNode;","","      inputEx.CombineField.superclass.initEvents.apply(this, arguments);","","      divNode = Y.one(this.fieldContainer);","","      // TODO: does it work ?","      divNode.on(\"focusout\", function(e) {","         // store local copy of the event to use in setTimeout","         e = lang.merge(e);","         blurTimeout = window.setTimeout(function() {","            blurTimeout = null;","            me.onBlur(e);","         }, 25);","      });","","      // TODO: does it work ?","      divNode.on(\"focusin\", function(e) {","         if(blurTimeout !== null) {","            window.clearTimeout(blurTimeout);","            blurTimeout = null;","         } else {","            me.onFocus(e);","         }","      });","   },","","","","   /**","    * Set the value","    * @method setValue","    * @param {Array} values [value1, value2, ...]","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated'","    * event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(values, sendUpdatedEvt) {","      if(!values) {","         return;","      }","      var i, n = this.inputs.length;","      for(i = 0; i < n; i++) {","         this.inputs[i].setValue(values[i], false);","      }","","      this.runFieldsInteractions();","","      this.setClassFromState();","      ","      if(sendUpdatedEvt !== false) {","         // fire update event","         this.fireUpdatedEvt();","      }","   },","","   /**","    * Specific getValue","    * @method getValue","    * @return {Array} An array of values [value1, value2, ...]","    */","   getValue: function() {","      var values = [],","         i, n = this.inputs.length;","      for(i = 0; i < n; i++) {","         values.push(this.inputs[i].getValue());","      }","      return values;","   }","","});","","// Register this class as \"combine\" type","inputEx.registerType(\"combine\", inputEx.CombineField, [{","   type: 'list',","   name: 'fields',","   label: 'Elements',","   required: true,","   elementType: {","      type: 'type'","   }","}, {","   type: 'list',","   name: 'separators',","   label: 'Separators',","   required: true","}]);","","}, '@VERSION@', {\"requires\": [\"inputex-group\"], \"ix_provides\": \"combine\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"30":0,"33":0,"36":0,"41":0,"48":0,"50":0,"51":0,"61":0,"63":0,"64":0,"67":0,"70":0,"72":0,"74":0,"76":0,"78":0,"80":0,"82":0,"91":0,"93":0,"95":0,"98":0,"111":0,"112":0,"115":0,"123":0,"125":0,"126":0,"127":0,"128":0,"129":0,"131":0,"133":0,"143":0,"144":0,"147":0,"155":0,"159":0,"161":0,"164":0,"166":0,"167":0,"168":0,"169":0,"174":0,"175":0,"176":0,"177":0,"179":0,"194":0,"195":0,"197":0,"198":0,"199":0,"202":0,"204":0,"206":0,"208":0,"218":0,"220":0,"221":0,"223":0,"229":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].functions = {"CombineField:19":0,"setOptions:29":0,"render:40":0,"renderComponent:47":0,"renderFields:59":0,"renderField:108":0,"setFieldName:121":0,"appendSeparator:142":0,"(anonymous 3):167":0,"(anonymous 2):164":0,"(anonymous 4):174":0,"initEvents:154":0,"setValue:193":0,"getValue:217":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredLines = 68;
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredFunctions = 15;
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 1);
YUI.add('inputex-combine', function (Y, NAME) {

/**
 * @module inputex-combine
 */
_yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 6);
var lang = Y.Lang,
   inputEx = Y.inputEx;

/**
 * A meta field to put N fields on the same line, separated by separators
 * @class inputEx.CombineField
 * @extends inputEx.Group
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>separators: array of string inserted</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 19);
inputEx.CombineField = function(options) {
   _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "CombineField", 19);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 20);
inputEx.CombineField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-combine/inputex-combine.js", 23);
Y.extend(inputEx.CombineField, inputEx.Group, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function (options) {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setOptions", 29);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 30);
inputEx.CombineField.superclass.setOptions.call(this, options);

      // Overwrite options
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 33);
this.options.className = options.className ? options.className : 'inputEx-CombineField';

      // Added options
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 36);
this.options.separators = options.separators;
   },

   // Override Group.render()
   render: function () {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "render", 40);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 41);
return inputEx.Field.prototype.render.apply(this, arguments);
   },

   /**
    * @method render
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderComponent", 47);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 48);
this.renderFields(this.fieldContainer);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 50);
if(this.options.disabled) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 51);
this.disable();
      }
   },

   /**
    * Render the subfields
    * @method renderFields
    */
   renderFields: function(parentNode) {

      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderFields", 59);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 61);
this.appendSeparator(0);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 63);
if(!this.options.fields) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 64);
return;
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 67);
var i, iLength = this.options.fields.length,
          field_config, field, fieldEl, t;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 70);
for (i = 0; i < iLength; i++) {

         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 72);
field_config = this.options.fields[i];

         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 74);
field = this.renderField(field_config);

         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 76);
fieldEl = field.getEl();

         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 78);
t = field_config.type;

         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 80);
if (t !== "group" && t !== "form") {
            // remove the line breaker (<div style='clear: both;'>)
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 82);
fieldEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length - 1]);
         }
         
         /* This rule should stay in javascript because the cross-browser equivalent in css would be like:
         *      .inputEx-CombineField .inputEx-fieldWrapper { float: left }
         *
         *  That css would need to be overriden later by nested fields inside the combine (ex: datepicker),
         *  and every time we have to do that, a unicorn dies.
         */
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 91);
Y.one(fieldEl).setStyle('float', 'left');
         
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 93);
parentNode.appendChild(fieldEl);

         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 95);
this.appendSeparator(i + 1);
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 98);
this.setFieldName(this.options.name);


   },

   /**
    * Override to force required option on each subfield
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by inputEx()
    */
   renderField: function(fieldOptions) {

      // Subfields should inherit required property
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderField", 108);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 111);
if (this.options.required) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 112);
fieldOptions.required = true;
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 115);
return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);
   },

   /**
    * @method setFieldName
    */
   setFieldName: function(name) {
      
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setFieldName", 121);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 123);
var i, newName;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 125);
if(name) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 126);
for(i = 0; i < this.inputs.length; i++) {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 127);
newName = "";
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 128);
if(this.inputs[i].options.name) {
               _yuitest_coverline("build/inputex-combine/inputex-combine.js", 129);
newName = name + "[" + this.inputs[i].options.name + "]";
            } else {
               _yuitest_coverline("build/inputex-combine/inputex-combine.js", 131);
newName = name + "[" + i + "]";
            }
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 133);
this.inputs[i].setFieldName(newName);
         }
      }
   },

   /**
    * Add a separator to the fieldContainer
    * @method appendSeparator
    */
   appendSeparator: function(i) {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "appendSeparator", 142);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 143);
if(this.options.separators && this.options.separators[i]) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 144);
var sep = inputEx.cn('div', {
            className: 'inputEx-CombineField-separator'
         }, null, this.options.separators[i]);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 147);
this.fieldContainer.appendChild(sep);
      }
   },

   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "initEvents", 154);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 155);
var me = this,
         blurTimeout,
         divNode;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 159);
inputEx.CombineField.superclass.initEvents.apply(this, arguments);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 161);
divNode = Y.one(this.fieldContainer);

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 164);
divNode.on("focusout", function(e) {
         // store local copy of the event to use in setTimeout
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 2)", 164);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 166);
e = lang.merge(e);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 167);
blurTimeout = window.setTimeout(function() {
            _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 3)", 167);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 168);
blurTimeout = null;
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 169);
me.onBlur(e);
         }, 25);
      });

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 174);
divNode.on("focusin", function(e) {
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 4)", 174);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 175);
if(blurTimeout !== null) {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 176);
window.clearTimeout(blurTimeout);
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 177);
blurTimeout = null;
         } else {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 179);
me.onFocus(e);
         }
      });
   },



   /**
    * Set the value
    * @method setValue
    * @param {Array} values [value1, value2, ...]
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated'
    * event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(values, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setValue", 193);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 194);
if(!values) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 195);
return;
      }
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 197);
var i, n = this.inputs.length;
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 198);
for(i = 0; i < n; i++) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 199);
this.inputs[i].setValue(values[i], false);
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 202);
this.runFieldsInteractions();

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 204);
this.setClassFromState();
      
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 206);
if(sendUpdatedEvt !== false) {
         // fire update event
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 208);
this.fireUpdatedEvt();
      }
   },

   /**
    * Specific getValue
    * @method getValue
    * @return {Array} An array of values [value1, value2, ...]
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "getValue", 217);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 218);
var values = [],
         i, n = this.inputs.length;
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 220);
for(i = 0; i < n; i++) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 221);
values.push(this.inputs[i].getValue());
      }
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 223);
return values;
   }

});

// Register this class as "combine" type
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 229);
inputEx.registerType("combine", inputEx.CombineField, [{
   type: 'list',
   name: 'fields',
   label: 'Elements',
   required: true,
   elementType: {
      type: 'type'
   }
}, {
   type: 'list',
   name: 'separators',
   label: 'Separators',
   required: true
}]);

}, '@VERSION@', {"requires": ["inputex-group"], "ix_provides": "combine", "skinnable": true});
