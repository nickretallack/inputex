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
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].code=["YUI.add('inputex-combine', function (Y, NAME) {","","/**"," * @module inputex-combine"," */","var lang = Y.Lang,","   inputEx = Y.inputEx;","","/**"," * A meta field to put N fields on the same line, separated by separators"," * @class inputEx.CombineField"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>separators: array of string inserted</li>"," * </ul>"," */","inputEx.CombineField = function(options) {","   inputEx.CombineField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.CombineField, inputEx.Group, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.CombineField.superclass.setOptions.call(this, options);","","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-CombineField';","","      // Added options","      this.options.separators = options.separators;","   },","","   /**","    * @method render","    */","   render: function() {","","      // Create the div wrapper for this group","      this.divEl = inputEx.cn('div', {","         className: this.options.className","      });","      if(this.options.id) {","         this.divEl.id = this.options.id;","      }","","      // Label element","      if(lang.isString(this.options.label)) {","         this.labelDiv = inputEx.cn('div', {","            id: this.divEl.id + '-label',","            className: 'inputEx-label',","            'for': this.divEl.id + '-field'","         });","         this.labelEl = inputEx.cn('label', null, null, this.options.label === \"\" ? \"&nbsp;\" : this.options.label);","         this.labelDiv.appendChild(this.labelEl);","         this.divEl.appendChild(this.labelDiv);","      }","","      this.renderFields(this.divEl);","","      if(this.options.disabled) {","         this.disable();","      }","","      // Insert a float breaker","      this.divEl.appendChild(inputEx.cn('div', {","         className: \"inputEx-clear-div\"","      }, null, \" \"));","   },","","   /**","    * Render the subfields","    * @method renderFields","    */","   renderFields: function() {","","      this.appendSeparator(0);","","      if(!this.options.fields) {","         return;","      }","","      var i, n = this.options.fields.length,","         f, field, fieldEl, t;","","      for(i = 0; i < n; i++) {","         f = this.options.fields[i];","         if(this.options.required) {","            f.required = true;","         }","         field = this.renderField(f);","         fieldEl = field.getEl();","         t = f.type;","         if(t !== \"group\" && t !== \"form\") {","            // remove the line breaker (<div style='clear: both;'>)","            field.divEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length - 1]);","         }","         ","         /* This rule should stay in javascript because the cross-browser equivalent in css would be like:","         *      .inputEx-CombineField .inputEx-fieldWrapper { float: left }","         *","         *  That css would need to be overriden later by nested fields inside the combine (ex: datepicker),","         *  and every time we have to do that, a unicorn dies.","         */","         Y.one(fieldEl).setStyle('float', 'left');","         ","         this.divEl.appendChild(fieldEl);","","         this.appendSeparator(i + 1);","      }","","      this.setFieldName(this.options.name);","","","   },","","   /**","    * Override to force required option on each subfield","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by inputEx()","    */","   renderField: function(fieldOptions) {","","      // Subfields should inherit required property","      if(this.options.required) {","         fieldOptions.required = true;","      }","","      return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);","   },","","   /**","    * @method setFieldName","    */","   setFieldName: function(name) {","      ","      var i, newName;","","      if(name) {","         for(i = 0; i < this.inputs.length; i++) {","            newName = \"\";","            if(this.inputs[i].options.name) {","               newName = name + \"[\" + this.inputs[i].options.name + \"]\";","            } else {","               newName = name + \"[\" + i + \"]\";","            }","            this.inputs[i].setFieldName(newName);","         }","      }","   },","","   /**","    * Add a separator to the divEl","    * @method appendSeparator","    */","   appendSeparator: function(i) {","      if(this.options.separators && this.options.separators[i]) {","         var sep = inputEx.cn('div', {","            className: 'inputEx-CombineField-separator'","         }, null, this.options.separators[i]);","         this.divEl.appendChild(sep);","      }","   },","","   /**","    * @method initEvents","    */","   initEvents: function() {","      var me = this,","         blurTimeout,","         divNode;","","      inputEx.CombineField.superclass.initEvents.apply(this, arguments);","","      divNode = Y.one(this.divEl);","","      // TODO: does it work ?","      divNode.on(\"focusout\", function(e) {","         // store local copy of the event to use in setTimeout","         e = lang.merge(e);","         blurTimeout = window.setTimeout(function() {","            blurTimeout = null;","            me.onBlur(e);","         }, 25);","      });","","      // TODO: does it work ?","      divNode.on(\"focusin\", function(e) {","         if(blurTimeout !== null) {","            window.clearTimeout(blurTimeout);","            blurTimeout = null;","         } else {","            me.onFocus(e);","         }","      });","   },","","","","   /**","    * Set the value","    * @method setValue","    * @param {Array} values [value1, value2, ...]","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated'","    * event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(values, sendUpdatedEvt) {","      if(!values) {","         return;","      }","      var i, n = this.inputs.length;","      for(i = 0; i < n; i++) {","         this.inputs[i].setValue(values[i], false);","      }","","      this.runFieldsInteractions();","","      if(sendUpdatedEvt !== false) {","         // fire update event","         this.fireUpdatedEvt();","      }","   },","","   /**","    * Specific getValue","    * @method getValue","    * @return {Array} An array of values [value1, value2, ...]","    */","   getValue: function() {","      var values = [],","         i, n = this.inputs.length;","      for(i = 0; i < n; i++) {","         values.push(this.inputs[i].getValue());","      }","      return values;","   }","","});","","// Register this class as \"combine\" type","inputEx.registerType(\"combine\", inputEx.CombineField, [{","   type: 'list',","   name: 'fields',","   label: 'Elements',","   required: true,","   elementType: {","      type: 'type'","   }","}, {","   type: 'list',","   name: 'separators',","   label: 'Separators',","   required: true","}]);","","}, '@VERSION@', {\"requires\": [\"inputex-group\"], \"ix_provides\": \"combine\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"30":0,"33":0,"36":0,"45":0,"48":0,"49":0,"53":0,"54":0,"59":0,"60":0,"61":0,"64":0,"66":0,"67":0,"71":0,"82":0,"84":0,"85":0,"88":0,"91":0,"92":0,"93":0,"94":0,"96":0,"97":0,"98":0,"99":0,"101":0,"110":0,"112":0,"114":0,"117":0,"130":0,"131":0,"134":0,"142":0,"144":0,"145":0,"146":0,"147":0,"148":0,"150":0,"152":0,"162":0,"163":0,"166":0,"174":0,"178":0,"180":0,"183":0,"185":0,"186":0,"187":0,"188":0,"193":0,"194":0,"195":0,"196":0,"198":0,"213":0,"214":0,"216":0,"217":0,"218":0,"221":0,"223":0,"225":0,"235":0,"237":0,"238":0,"240":0,"246":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].functions = {"CombineField:19":0,"setOptions:29":0,"render:42":0,"renderFields:80":0,"renderField:127":0,"setFieldName:140":0,"appendSeparator:161":0,"(anonymous 3):186":0,"(anonymous 2):183":0,"(anonymous 4):193":0,"initEvents:173":0,"setValue:212":0,"getValue:234":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredLines = 77;
_yuitest_coverage["build/inputex-combine/inputex-combine.js"].coveredFunctions = 14;
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
   setOptions: function(options) {
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

   /**
    * @method render
    */
   render: function() {

      // Create the div wrapper for this group
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "render", 42);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 45);
this.divEl = inputEx.cn('div', {
         className: this.options.className
      });
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 48);
if(this.options.id) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 49);
this.divEl.id = this.options.id;
      }

      // Label element
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 53);
if(lang.isString(this.options.label)) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 54);
this.labelDiv = inputEx.cn('div', {
            id: this.divEl.id + '-label',
            className: 'inputEx-label',
            'for': this.divEl.id + '-field'
         });
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 59);
this.labelEl = inputEx.cn('label', null, null, this.options.label === "" ? "&nbsp;" : this.options.label);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 60);
this.labelDiv.appendChild(this.labelEl);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 61);
this.divEl.appendChild(this.labelDiv);
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 64);
this.renderFields(this.divEl);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 66);
if(this.options.disabled) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 67);
this.disable();
      }

      // Insert a float breaker
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 71);
this.divEl.appendChild(inputEx.cn('div', {
         className: "inputEx-clear-div"
      }, null, " "));
   },

   /**
    * Render the subfields
    * @method renderFields
    */
   renderFields: function() {

      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderFields", 80);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 82);
this.appendSeparator(0);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 84);
if(!this.options.fields) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 85);
return;
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 88);
var i, n = this.options.fields.length,
         f, field, fieldEl, t;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 91);
for(i = 0; i < n; i++) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 92);
f = this.options.fields[i];
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 93);
if(this.options.required) {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 94);
f.required = true;
         }
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 96);
field = this.renderField(f);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 97);
fieldEl = field.getEl();
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 98);
t = f.type;
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 99);
if(t !== "group" && t !== "form") {
            // remove the line breaker (<div style='clear: both;'>)
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 101);
field.divEl.removeChild(fieldEl.childNodes[fieldEl.childNodes.length - 1]);
         }
         
         /* This rule should stay in javascript because the cross-browser equivalent in css would be like:
         *      .inputEx-CombineField .inputEx-fieldWrapper { float: left }
         *
         *  That css would need to be overriden later by nested fields inside the combine (ex: datepicker),
         *  and every time we have to do that, a unicorn dies.
         */
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 110);
Y.one(fieldEl).setStyle('float', 'left');
         
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 112);
this.divEl.appendChild(fieldEl);

         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 114);
this.appendSeparator(i + 1);
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 117);
this.setFieldName(this.options.name);


   },

   /**
    * Override to force required option on each subfield
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by inputEx()
    */
   renderField: function(fieldOptions) {

      // Subfields should inherit required property
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "renderField", 127);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 130);
if(this.options.required) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 131);
fieldOptions.required = true;
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 134);
return inputEx.CombineField.superclass.renderField.call(this, fieldOptions);
   },

   /**
    * @method setFieldName
    */
   setFieldName: function(name) {
      
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setFieldName", 140);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 142);
var i, newName;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 144);
if(name) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 145);
for(i = 0; i < this.inputs.length; i++) {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 146);
newName = "";
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 147);
if(this.inputs[i].options.name) {
               _yuitest_coverline("build/inputex-combine/inputex-combine.js", 148);
newName = name + "[" + this.inputs[i].options.name + "]";
            } else {
               _yuitest_coverline("build/inputex-combine/inputex-combine.js", 150);
newName = name + "[" + i + "]";
            }
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 152);
this.inputs[i].setFieldName(newName);
         }
      }
   },

   /**
    * Add a separator to the divEl
    * @method appendSeparator
    */
   appendSeparator: function(i) {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "appendSeparator", 161);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 162);
if(this.options.separators && this.options.separators[i]) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 163);
var sep = inputEx.cn('div', {
            className: 'inputEx-CombineField-separator'
         }, null, this.options.separators[i]);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 166);
this.divEl.appendChild(sep);
      }
   },

   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "initEvents", 173);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 174);
var me = this,
         blurTimeout,
         divNode;

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 178);
inputEx.CombineField.superclass.initEvents.apply(this, arguments);

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 180);
divNode = Y.one(this.divEl);

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 183);
divNode.on("focusout", function(e) {
         // store local copy of the event to use in setTimeout
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 2)", 183);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 185);
e = lang.merge(e);
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 186);
blurTimeout = window.setTimeout(function() {
            _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 3)", 186);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 187);
blurTimeout = null;
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 188);
me.onBlur(e);
         }, 25);
      });

      // TODO: does it work ?
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 193);
divNode.on("focusin", function(e) {
         _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "(anonymous 4)", 193);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 194);
if(blurTimeout !== null) {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 195);
window.clearTimeout(blurTimeout);
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 196);
blurTimeout = null;
         } else {
            _yuitest_coverline("build/inputex-combine/inputex-combine.js", 198);
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
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "setValue", 212);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 213);
if(!values) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 214);
return;
      }
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 216);
var i, n = this.inputs.length;
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 217);
for(i = 0; i < n; i++) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 218);
this.inputs[i].setValue(values[i], false);
      }

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 221);
this.runFieldsInteractions();

      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 223);
if(sendUpdatedEvt !== false) {
         // fire update event
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 225);
this.fireUpdatedEvt();
      }
   },

   /**
    * Specific getValue
    * @method getValue
    * @return {Array} An array of values [value1, value2, ...]
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-combine/inputex-combine.js", "getValue", 234);
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 235);
var values = [],
         i, n = this.inputs.length;
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 237);
for(i = 0; i < n; i++) {
         _yuitest_coverline("build/inputex-combine/inputex-combine.js", 238);
values.push(this.inputs[i].getValue());
      }
      _yuitest_coverline("build/inputex-combine/inputex-combine.js", 240);
return values;
   }

});

// Register this class as "combine" type
_yuitest_coverline("build/inputex-combine/inputex-combine.js", 246);
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
