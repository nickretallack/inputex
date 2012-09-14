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
_yuitest_coverage["build/inputex-type/inputex-type.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-type/inputex-type.js",
    code: []
};
_yuitest_coverage["build/inputex-type/inputex-type.js"].code=["YUI.add('inputex-type', function (Y, NAME) {","","/**"," * @module inputex-type"," */","YUI.add(\"inputex-type\", function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * TypeField is a field to create fields. The user can create any value he wants by switching fields."," * @class inputEx.TypeField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options  Standard inputEx options definition"," */","inputEx.TypeField = function(options) {","   inputEx.TypeField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.TypeField, inputEx.Field, {","   ","   /**","    * Render the TypeField: create a button with a property panel that contains the field options","    * @method renderComponent","    */","   renderComponent: function() {","      // DIV element to wrap the Field \"default value\"","      this.fieldValueWrapper = inputEx.cn('div', {className: \"inputEx-TypeField-FieldValueWrapper\"});","      this.fieldContainer.appendChild( this.fieldValueWrapper );","      ","      // Render the popup that will contain the property form","      this.propertyPanel = inputEx.cn('div', {className: \"inputEx-TypeField-PropertiesPanel\"}, {display: 'none'});","      ","      // The list of all inputEx declared types to be used in the \"type\" selector","      var selectOptions = [];","      for(var key in inputEx.typeClasses) {","         if(inputEx.typeClasses.hasOwnProperty(key)) {","            selectOptions.push( { value : key } );","         }","      }","      this.typeSelect = new inputEx.SelectField({label: \"Type\", choices: selectOptions, parentEl: this.propertyPanel});","","      // DIV element to wrap the options group","      this.groupOptionsWrapper = inputEx.cn('div');","      this.propertyPanel.appendChild( this.groupOptionsWrapper );","      ","      // Button to switch the panel","      this.button = inputEx.cn('div', {className: \"inputEx-TypeField-EditButton\"});","      this.button.appendChild(this.propertyPanel);","      this.fieldContainer.appendChild(this.button);","      ","      // Build the groupOptions","      this.rebuildGroupOptions();","   },","   ","   /**","    * Adds 2 event listeners: ","    *  - on the button to toggel the propertiesPanel","    * @method initEvents","    */","   initEvents: function() {","      inputEx.TypeField.superclass.initEvents.call(this); ","      ","      // \"Toggle the properties panel\" button :","      Y.one(this.button).on('click', this.onTogglePropertiesPanel, this, true);","      ","      // Prevent the button to receive a \"click\" event if the propertyPanel doesn't catch it","      Y.one(this.propertyPanel).on('click', function(e) { e.stopPropagation();}, this, true);","      ","      // Listen the \"type\" selector to update the groupOptions","      // Hack the type selector to rebuild the group option","      this.typeSelect.on('updated', this.rebuildGroupOptions, this, true);","   },","   ","   /**","    * Regenerate the property form","    * @method rebuildGroupOptions","    */","   rebuildGroupOptions: function() {","      try {","         ","         // Save the previous value:","         var previousVal = null;","         ","         // Close a previously created group","         if(this.group) {","            previousVal = this.group.getValue();","            this.group.close();","            this.group.destroy();","            this.groupOptionsWrapper.innerHTML = \"\";","         }","      ","         // Get value is directly the class !!","         var classO = inputEx.getFieldClass(this.typeSelect.getValue());","         ","         // Instanciate the group","         var groupParams = {fields: classO.groupOptions, parentEl: this.groupOptionsWrapper};","         this.group = new inputEx.Group(groupParams);","         ","         // Set the previous name/label","         if(previousVal) {","            this.group.setValue({","               name: previousVal.name,","               label: previousVal.label","            });","         }","         ","         // Register the updated event","         this.group.on('updated', this.onChangeGroupOptions, this, true);","            ","         // Create the value field","         this.updateFieldValue();","         ","      } catch(ex) {","         if(Y.Lang.isObject(window[\"console\"]) && Y.Lang.isFunction(window[\"console\"][\"log\"]) ) {","            console.log(\"inputEx.TypeField.rebuildGroupOptions: \", ex);","         }","      }","         ","   },","   ","   /**","    * Toggle the property panel","    * @method onTogglePropertiesPanel","    */","   onTogglePropertiesPanel: function() {","      if (this.propertyPanel.style.display == 'none') {","         this.propertyPanel.style.display = '';","         Y.one(this.button).addClass(this.button, \"opened\");","      } else {","         this.propertyPanel.style.display = 'none';","         Y.one(this.button).removeClass(\"opened\");","      }","   },","   ","   /**","    * Update the fieldValue with the changed properties","    * @method onChangeGroupOptions","    */","   onChangeGroupOptions: function() {","      ","      // Update the field value ","      this.updateFieldValue();","      ","      // Fire \"updated\" event","      this.fireUpdatedEvt();","   },","   ","   /**","    * Update the fieldValue","    * @method updateFieldValue","    */","   updateFieldValue: function() {","      try {","         // Close previous field","         if(this.fieldValue) {","            this.fieldValue.close();","            this.fieldValue.destroy();","            delete this.fieldValue;","            this.fieldValueWrapper.innerHTML = '';","         }","      ","         // Re-build the fieldValue","         var fieldOptions = this.group.getValue();","         ","         fieldOptions.type = this.getValue().type;","         fieldOptions.parentEl = this.fieldValueWrapper;","         ","         this.fieldValue = inputEx(fieldOptions,this);","      ","         // Refire the event when the fieldValue is updated","         this.fieldValue.on('updated', this.fireUpdatedEvt, this, true);","      }","      catch(ex) {	","         if(Y.Lang.isObject(window[\"console\"]) && Y.Lang.isFunction(window[\"console\"][\"log\"]) ) {","         	console.log(\"Error while updateFieldValue\", ex.message);","			}","      }","   },","   ","   ","   /**","    * Set the value of the label, typeProperties and group","    * @method setValue","    * @param {Object} value Type object configuration","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","","      // Set type in property panel","      this.typeSelect.setValue(value.type, false);","      ","      // Rebuild the panel propertues","      this.rebuildGroupOptions();","      ","      // Set the parameters value","      this.group.setValue(value, false);","      ","      // Rebuild the fieldValue","      this.updateFieldValue();","      ","      // Set field value :","		// fix it for default value (because updateFieldValue is called after first setValue)"," 		var that = this;      ","","      // New prefered way to describe a field","      if (!lang.isUndefined(value.value)) {","			setTimeout(function(){","				that.fieldValue.setValue(value.value, false);","			}, 50);","      }","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt(false);","      }","   },","   ","   /**","    * Return the config for a entry in an Group","    * @method getValue","    * @return {Object} Type object configuration","    */","   getValue: function() {","      ","      var getDefaultValueForField = function (classObj, paramName) {","         var i, length = classObj.groupOptions.length, f;","         ","         for(i = 0 ; i < length ; i++) {","            f = classObj.groupOptions[i];","            ","            // New prefered way to use field options","            if (f.name == paramName) {","               return f.value;","            }","         }","         return undefined;","      };","      ","      ","      // The field parameters","      var fieldParams = this.group.getValue();","      var classObj = inputEx.getFieldClass(this.typeSelect.getValue());","      ","      // + default values","      for(var key in fieldParams) {","         if( fieldParams.hasOwnProperty(key) ) {","            var value1 = getDefaultValueForField(classObj, key);","            var value2 = fieldParams[key];","            if(value1 == value2) {","               fieldParams[key] = undefined;","            }","         }","      }","      ","      // The field type","      fieldParams.type = this.typeSelect.getValue();","      ","      // The value defined by the fieldValue","      if(this.fieldValue) fieldParams.value = this.fieldValue.getValue();","      ","      return fieldParams;","   }","   ","});","","","// Register this class as \"type\" type","inputEx.registerType(\"type\", inputEx.TypeField, []);","","}, '3.1.0',{","requires: ['inputex-field','inputex-group','inputex-select', 'inputex-list','inputex-string','inputex-checkbox','inputex-integer']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-type/inputex-type.js"].lines = {"1":0,"6":0,"8":0,"18":0,"19":0,"22":0,"30":0,"31":0,"34":0,"37":0,"38":0,"39":0,"40":0,"43":0,"46":0,"47":0,"50":0,"51":0,"52":0,"55":0,"64":0,"67":0,"70":0,"74":0,"82":0,"85":0,"88":0,"89":0,"90":0,"91":0,"92":0,"96":0,"99":0,"100":0,"103":0,"104":0,"111":0,"114":0,"117":0,"118":0,"129":0,"130":0,"131":0,"133":0,"134":0,"145":0,"148":0,"156":0,"158":0,"159":0,"160":0,"161":0,"162":0,"166":0,"168":0,"169":0,"171":0,"174":0,"177":0,"178":0,"193":0,"196":0,"199":0,"202":0,"206":0,"209":0,"210":0,"211":0,"215":0,"217":0,"228":0,"229":0,"231":0,"232":0,"235":0,"236":0,"239":0,"244":0,"245":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"259":0,"262":0,"264":0,"271":0};
_yuitest_coverage["build/inputex-type/inputex-type.js"].functions = {"TypeField:18":0,"renderComponent:28":0,"(anonymous 3):70":0,"initEvents:63":0,"rebuildGroupOptions:81":0,"onTogglePropertiesPanel:128":0,"onChangeGroupOptions:142":0,"updateFieldValue:155":0,"(anonymous 4):210":0,"setValue:190":0,"getDefaultValueForField:228":0,"getValue:226":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-type/inputex-type.js"].coveredLines = 89;
_yuitest_coverage["build/inputex-type/inputex-type.js"].coveredFunctions = 14;
_yuitest_coverline("build/inputex-type/inputex-type.js", 1);
YUI.add('inputex-type', function (Y, NAME) {

/**
 * @module inputex-type
 */
_yuitest_coverfunc("build/inputex-type/inputex-type.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-type/inputex-type.js", 6);
YUI.add("inputex-type", function(Y){

   _yuitest_coverfunc("build/inputex-type/inputex-type.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-type/inputex-type.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * TypeField is a field to create fields. The user can create any value he wants by switching fields.
 * @class inputEx.TypeField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options  Standard inputEx options definition
 */
_yuitest_coverline("build/inputex-type/inputex-type.js", 18);
inputEx.TypeField = function(options) {
   _yuitest_coverfunc("build/inputex-type/inputex-type.js", "TypeField", 18);
_yuitest_coverline("build/inputex-type/inputex-type.js", 19);
inputEx.TypeField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-type/inputex-type.js", 22);
Y.extend(inputEx.TypeField, inputEx.Field, {
   
   /**
    * Render the TypeField: create a button with a property panel that contains the field options
    * @method renderComponent
    */
   renderComponent: function() {
      // DIV element to wrap the Field "default value"
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "renderComponent", 28);
_yuitest_coverline("build/inputex-type/inputex-type.js", 30);
this.fieldValueWrapper = inputEx.cn('div', {className: "inputEx-TypeField-FieldValueWrapper"});
      _yuitest_coverline("build/inputex-type/inputex-type.js", 31);
this.fieldContainer.appendChild( this.fieldValueWrapper );
      
      // Render the popup that will contain the property form
      _yuitest_coverline("build/inputex-type/inputex-type.js", 34);
this.propertyPanel = inputEx.cn('div', {className: "inputEx-TypeField-PropertiesPanel"}, {display: 'none'});
      
      // The list of all inputEx declared types to be used in the "type" selector
      _yuitest_coverline("build/inputex-type/inputex-type.js", 37);
var selectOptions = [];
      _yuitest_coverline("build/inputex-type/inputex-type.js", 38);
for(var key in inputEx.typeClasses) {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 39);
if(inputEx.typeClasses.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 40);
selectOptions.push( { value : key } );
         }
      }
      _yuitest_coverline("build/inputex-type/inputex-type.js", 43);
this.typeSelect = new inputEx.SelectField({label: "Type", choices: selectOptions, parentEl: this.propertyPanel});

      // DIV element to wrap the options group
      _yuitest_coverline("build/inputex-type/inputex-type.js", 46);
this.groupOptionsWrapper = inputEx.cn('div');
      _yuitest_coverline("build/inputex-type/inputex-type.js", 47);
this.propertyPanel.appendChild( this.groupOptionsWrapper );
      
      // Button to switch the panel
      _yuitest_coverline("build/inputex-type/inputex-type.js", 50);
this.button = inputEx.cn('div', {className: "inputEx-TypeField-EditButton"});
      _yuitest_coverline("build/inputex-type/inputex-type.js", 51);
this.button.appendChild(this.propertyPanel);
      _yuitest_coverline("build/inputex-type/inputex-type.js", 52);
this.fieldContainer.appendChild(this.button);
      
      // Build the groupOptions
      _yuitest_coverline("build/inputex-type/inputex-type.js", 55);
this.rebuildGroupOptions();
   },
   
   /**
    * Adds 2 event listeners: 
    *  - on the button to toggel the propertiesPanel
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "initEvents", 63);
_yuitest_coverline("build/inputex-type/inputex-type.js", 64);
inputEx.TypeField.superclass.initEvents.call(this); 
      
      // "Toggle the properties panel" button :
      _yuitest_coverline("build/inputex-type/inputex-type.js", 67);
Y.one(this.button).on('click', this.onTogglePropertiesPanel, this, true);
      
      // Prevent the button to receive a "click" event if the propertyPanel doesn't catch it
      _yuitest_coverline("build/inputex-type/inputex-type.js", 70);
Y.one(this.propertyPanel).on('click', function(e) { _yuitest_coverfunc("build/inputex-type/inputex-type.js", "(anonymous 3)", 70);
e.stopPropagation();}, this, true);
      
      // Listen the "type" selector to update the groupOptions
      // Hack the type selector to rebuild the group option
      _yuitest_coverline("build/inputex-type/inputex-type.js", 74);
this.typeSelect.on('updated', this.rebuildGroupOptions, this, true);
   },
   
   /**
    * Regenerate the property form
    * @method rebuildGroupOptions
    */
   rebuildGroupOptions: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "rebuildGroupOptions", 81);
_yuitest_coverline("build/inputex-type/inputex-type.js", 82);
try {
         
         // Save the previous value:
         _yuitest_coverline("build/inputex-type/inputex-type.js", 85);
var previousVal = null;
         
         // Close a previously created group
         _yuitest_coverline("build/inputex-type/inputex-type.js", 88);
if(this.group) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 89);
previousVal = this.group.getValue();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 90);
this.group.close();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 91);
this.group.destroy();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 92);
this.groupOptionsWrapper.innerHTML = "";
         }
      
         // Get value is directly the class !!
         _yuitest_coverline("build/inputex-type/inputex-type.js", 96);
var classO = inputEx.getFieldClass(this.typeSelect.getValue());
         
         // Instanciate the group
         _yuitest_coverline("build/inputex-type/inputex-type.js", 99);
var groupParams = {fields: classO.groupOptions, parentEl: this.groupOptionsWrapper};
         _yuitest_coverline("build/inputex-type/inputex-type.js", 100);
this.group = new inputEx.Group(groupParams);
         
         // Set the previous name/label
         _yuitest_coverline("build/inputex-type/inputex-type.js", 103);
if(previousVal) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 104);
this.group.setValue({
               name: previousVal.name,
               label: previousVal.label
            });
         }
         
         // Register the updated event
         _yuitest_coverline("build/inputex-type/inputex-type.js", 111);
this.group.on('updated', this.onChangeGroupOptions, this, true);
            
         // Create the value field
         _yuitest_coverline("build/inputex-type/inputex-type.js", 114);
this.updateFieldValue();
         
      } catch(ex) {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 117);
if(Y.Lang.isObject(window["console"]) && Y.Lang.isFunction(window["console"]["log"]) ) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 118);
console.log("inputEx.TypeField.rebuildGroupOptions: ", ex);
         }
      }
         
   },
   
   /**
    * Toggle the property panel
    * @method onTogglePropertiesPanel
    */
   onTogglePropertiesPanel: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "onTogglePropertiesPanel", 128);
_yuitest_coverline("build/inputex-type/inputex-type.js", 129);
if (this.propertyPanel.style.display == 'none') {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 130);
this.propertyPanel.style.display = '';
         _yuitest_coverline("build/inputex-type/inputex-type.js", 131);
Y.one(this.button).addClass(this.button, "opened");
      } else {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 133);
this.propertyPanel.style.display = 'none';
         _yuitest_coverline("build/inputex-type/inputex-type.js", 134);
Y.one(this.button).removeClass("opened");
      }
   },
   
   /**
    * Update the fieldValue with the changed properties
    * @method onChangeGroupOptions
    */
   onChangeGroupOptions: function() {
      
      // Update the field value 
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "onChangeGroupOptions", 142);
_yuitest_coverline("build/inputex-type/inputex-type.js", 145);
this.updateFieldValue();
      
      // Fire "updated" event
      _yuitest_coverline("build/inputex-type/inputex-type.js", 148);
this.fireUpdatedEvt();
   },
   
   /**
    * Update the fieldValue
    * @method updateFieldValue
    */
   updateFieldValue: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "updateFieldValue", 155);
_yuitest_coverline("build/inputex-type/inputex-type.js", 156);
try {
         // Close previous field
         _yuitest_coverline("build/inputex-type/inputex-type.js", 158);
if(this.fieldValue) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 159);
this.fieldValue.close();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 160);
this.fieldValue.destroy();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 161);
delete this.fieldValue;
            _yuitest_coverline("build/inputex-type/inputex-type.js", 162);
this.fieldValueWrapper.innerHTML = '';
         }
      
         // Re-build the fieldValue
         _yuitest_coverline("build/inputex-type/inputex-type.js", 166);
var fieldOptions = this.group.getValue();
         
         _yuitest_coverline("build/inputex-type/inputex-type.js", 168);
fieldOptions.type = this.getValue().type;
         _yuitest_coverline("build/inputex-type/inputex-type.js", 169);
fieldOptions.parentEl = this.fieldValueWrapper;
         
         _yuitest_coverline("build/inputex-type/inputex-type.js", 171);
this.fieldValue = inputEx(fieldOptions,this);
      
         // Refire the event when the fieldValue is updated
         _yuitest_coverline("build/inputex-type/inputex-type.js", 174);
this.fieldValue.on('updated', this.fireUpdatedEvt, this, true);
      }
      catch(ex) {	
         _yuitest_coverline("build/inputex-type/inputex-type.js", 177);
if(Y.Lang.isObject(window["console"]) && Y.Lang.isFunction(window["console"]["log"]) ) {
         	_yuitest_coverline("build/inputex-type/inputex-type.js", 178);
console.log("Error while updateFieldValue", ex.message);
			}
      }
   },
   
   
   /**
    * Set the value of the label, typeProperties and group
    * @method setValue
    * @param {Object} value Type object configuration
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {

      // Set type in property panel
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "setValue", 190);
_yuitest_coverline("build/inputex-type/inputex-type.js", 193);
this.typeSelect.setValue(value.type, false);
      
      // Rebuild the panel propertues
      _yuitest_coverline("build/inputex-type/inputex-type.js", 196);
this.rebuildGroupOptions();
      
      // Set the parameters value
      _yuitest_coverline("build/inputex-type/inputex-type.js", 199);
this.group.setValue(value, false);
      
      // Rebuild the fieldValue
      _yuitest_coverline("build/inputex-type/inputex-type.js", 202);
this.updateFieldValue();
      
      // Set field value :
		// fix it for default value (because updateFieldValue is called after first setValue)
 		_yuitest_coverline("build/inputex-type/inputex-type.js", 206);
var that = this;      

      // New prefered way to describe a field
      _yuitest_coverline("build/inputex-type/inputex-type.js", 209);
if (!lang.isUndefined(value.value)) {
			_yuitest_coverline("build/inputex-type/inputex-type.js", 210);
setTimeout(function(){
				_yuitest_coverfunc("build/inputex-type/inputex-type.js", "(anonymous 4)", 210);
_yuitest_coverline("build/inputex-type/inputex-type.js", 211);
that.fieldValue.setValue(value.value, false);
			}, 50);
      }
      
	   _yuitest_coverline("build/inputex-type/inputex-type.js", 215);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-type/inputex-type.js", 217);
this.fireUpdatedEvt(false);
      }
   },
   
   /**
    * Return the config for a entry in an Group
    * @method getValue
    * @return {Object} Type object configuration
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "getValue", 226);
_yuitest_coverline("build/inputex-type/inputex-type.js", 228);
var getDefaultValueForField = function (classObj, paramName) {
         _yuitest_coverfunc("build/inputex-type/inputex-type.js", "getDefaultValueForField", 228);
_yuitest_coverline("build/inputex-type/inputex-type.js", 229);
var i, length = classObj.groupOptions.length, f;
         
         _yuitest_coverline("build/inputex-type/inputex-type.js", 231);
for(i = 0 ; i < length ; i++) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 232);
f = classObj.groupOptions[i];
            
            // New prefered way to use field options
            _yuitest_coverline("build/inputex-type/inputex-type.js", 235);
if (f.name == paramName) {
               _yuitest_coverline("build/inputex-type/inputex-type.js", 236);
return f.value;
            }
         }
         _yuitest_coverline("build/inputex-type/inputex-type.js", 239);
return undefined;
      };
      
      
      // The field parameters
      _yuitest_coverline("build/inputex-type/inputex-type.js", 244);
var fieldParams = this.group.getValue();
      _yuitest_coverline("build/inputex-type/inputex-type.js", 245);
var classObj = inputEx.getFieldClass(this.typeSelect.getValue());
      
      // + default values
      _yuitest_coverline("build/inputex-type/inputex-type.js", 248);
for(var key in fieldParams) {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 249);
if( fieldParams.hasOwnProperty(key) ) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 250);
var value1 = getDefaultValueForField(classObj, key);
            _yuitest_coverline("build/inputex-type/inputex-type.js", 251);
var value2 = fieldParams[key];
            _yuitest_coverline("build/inputex-type/inputex-type.js", 252);
if(value1 == value2) {
               _yuitest_coverline("build/inputex-type/inputex-type.js", 253);
fieldParams[key] = undefined;
            }
         }
      }
      
      // The field type
      _yuitest_coverline("build/inputex-type/inputex-type.js", 259);
fieldParams.type = this.typeSelect.getValue();
      
      // The value defined by the fieldValue
      _yuitest_coverline("build/inputex-type/inputex-type.js", 262);
if(this.fieldValue) {fieldParams.value = this.fieldValue.getValue();}
      
      _yuitest_coverline("build/inputex-type/inputex-type.js", 264);
return fieldParams;
   }
   
});


// Register this class as "type" type
_yuitest_coverline("build/inputex-type/inputex-type.js", 271);
inputEx.registerType("type", inputEx.TypeField, []);

}, '3.1.0',{
requires: ['inputex-field','inputex-group','inputex-select', 'inputex-list','inputex-string','inputex-checkbox','inputex-integer']
});


}, '@VERSION@');
