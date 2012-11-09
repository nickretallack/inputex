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
_yuitest_coverage["build/inputex-type/inputex-type.js"].code=["YUI.add('inputex-type', function (Y, NAME) {","","/**"," * @module inputex-type"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * TypeField is a field to create fields. The user can create any value he wants by switching fields."," * @class inputEx.TypeField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options  Standard inputEx options definition"," */","inputEx.TypeField = function(options) {","   inputEx.TypeField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.TypeField, inputEx.Field, {","   ","   /**","    * Render the TypeField: create a button with a property panel that contains the field options","    * @method renderComponent","    */","   renderComponent: function() {","      // DIV element to wrap the Field \"default value\"","      this.fieldValueWrapper = inputEx.cn('div', {className: \"inputEx-TypeField-FieldValueWrapper\"});","      this.fieldContainer.appendChild( this.fieldValueWrapper );","      ","      // Render the popup that will contain the property form","      this.propertyPanel = inputEx.cn('div', {className: \"inputEx-TypeField-PropertiesPanel\"}, {display: 'none'});","      ","      // The list of all inputEx declared types to be used in the \"type\" selector","      var selectOptions = [];","      for(var key in inputEx.typeClasses) {","         if(inputEx.typeClasses.hasOwnProperty(key)) {","            selectOptions.push( { value : key } );","         }","      }","      this.typeSelect = new inputEx.SelectField({label: \"Type\", choices: selectOptions, parentEl: this.propertyPanel});","","      // DIV element to wrap the options group","      this.groupOptionsWrapper = inputEx.cn('div');","      this.propertyPanel.appendChild( this.groupOptionsWrapper );","      ","      // Button to switch the panel","      this.button = inputEx.cn('div', {className: \"inputEx-TypeField-EditButton\"});","      this.button.appendChild(this.propertyPanel);","      this.fieldContainer.appendChild(this.button);","      ","      // Build the groupOptions","      this.rebuildGroupOptions();","   },","   ","   /**","    * Adds 2 event listeners: ","    *  - on the button to toggel the propertiesPanel","    * @method initEvents","    */","   initEvents: function() {","      inputEx.TypeField.superclass.initEvents.call(this); ","      ","      // \"Toggle the properties panel\" button :","      Y.one(this.button).on('click', this.onTogglePropertiesPanel, this, true);","      ","      // Prevent the button to receive a \"click\" event if the propertyPanel doesn't catch it","      Y.one(this.propertyPanel).on('click', function(e) { e.stopPropagation();}, this, true);","      ","      // Listen the \"type\" selector to update the groupOptions","      // Hack the type selector to rebuild the group option","      this.typeSelect.on('updated', this.rebuildGroupOptions, this, true);","   },","   ","   /**","    * Regenerate the property form","    * @method rebuildGroupOptions","    */","   rebuildGroupOptions: function() {","      try {","         ","         // Save the previous value:","         var previousVal = null;","         ","         // Close a previously created group","         if(this.group) {","            previousVal = this.group.getValue();","            this.group.close();","            this.group.destroy();","            this.groupOptionsWrapper.innerHTML = \"\";","         }","      ","         // Get value is directly the class !!","         var classO = inputEx.getFieldClass(this.typeSelect.getValue());","         ","         // Instanciate the group","         var groupParams = {fields: classO.groupOptions, parentEl: this.groupOptionsWrapper};","         this.group = new inputEx.Group(groupParams);","         ","         // Set the previous name/label","         if(previousVal) {","            this.group.setValue({","               name: previousVal.name,","               label: previousVal.label","            });","         }","         ","         // Register the updated event","         this.group.on('updated', this.onChangeGroupOptions, this, true);","            ","         // Create the value field","         this.updateFieldValue();","         ","      } catch(ex) {","         if(Y.Lang.isObject(window[\"console\"]) && Y.Lang.isFunction(window[\"console\"][\"log\"]) ) {","            console.log(\"inputEx.TypeField.rebuildGroupOptions: \", ex);","         }","      }","         ","   },","   ","   /**","    * Toggle the property panel","    * @method onTogglePropertiesPanel","    */","   onTogglePropertiesPanel: function() {","      if (this.propertyPanel.style.display == 'none') {","         this.propertyPanel.style.display = '';","         Y.one(this.button).addClass(this.button, \"opened\");","      } else {","         this.propertyPanel.style.display = 'none';","         Y.one(this.button).removeClass(\"opened\");","      }","   },","   ","   /**","    * Update the fieldValue with the changed properties","    * @method onChangeGroupOptions","    */","   onChangeGroupOptions: function() {","      ","      // Update the field value ","      this.updateFieldValue();","      ","      // Fire \"updated\" event","      this.fireUpdatedEvt();","   },","   ","   /**","    * Update the fieldValue","    * @method updateFieldValue","    */","   updateFieldValue: function() {","      try {","         // Close previous field","         if(this.fieldValue) {","            this.fieldValue.close();","            this.fieldValue.destroy();","            delete this.fieldValue;","            this.fieldValueWrapper.innerHTML = '';","         }","      ","         // Re-build the fieldValue","         var fieldOptions = this.group.getValue();","         ","         fieldOptions.type = this.getValue().type;","         fieldOptions.parentEl = this.fieldValueWrapper;","         ","         this.fieldValue = inputEx(fieldOptions,this);","      ","         // Refire the event when the fieldValue is updated","         this.fieldValue.on('updated', this.fireUpdatedEvt, this, true);","      }","      catch(ex) {	","         if(Y.Lang.isObject(window[\"console\"]) && Y.Lang.isFunction(window[\"console\"][\"log\"]) ) {","         	console.log(\"Error while updateFieldValue\", ex.message);","			}","      }","   },","   ","   ","   /**","    * Set the value of the label, typeProperties and group","    * @method setValue","    * @param {Object} value Type object configuration","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(value, sendUpdatedEvt) {","","      // Set type in property panel","      this.typeSelect.setValue(value.type, false);","      ","      // Rebuild the panel propertues","      this.rebuildGroupOptions();","      ","      // Set the parameters value","      this.group.setValue(value, false);","      ","      // Rebuild the fieldValue","      this.updateFieldValue();","      ","      // Set field value :","		// fix it for default value (because updateFieldValue is called after first setValue)"," 		var that = this;      ","","      // New prefered way to describe a field","      if (!lang.isUndefined(value.value)) {","			setTimeout(function(){","				that.fieldValue.setValue(value.value, false);","			}, 50);","      }","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt(false);","      }","   },","   ","   /**","    * Return the config for a entry in an Group","    * @method getValue","    * @return {Object} Type object configuration","    */","   getValue: function() {","      ","      var getDefaultValueForField = function (classObj, paramName) {","         var i, length = classObj.groupOptions.length, f;","         ","         for(i = 0 ; i < length ; i++) {","            f = classObj.groupOptions[i];","            ","            // New prefered way to use field options","            if (f.name == paramName) {","               return f.value;","            }","         }","         return undefined;","      };","      ","      ","      // The field parameters","      var fieldParams = this.group.getValue();","      var classObj = inputEx.getFieldClass(this.typeSelect.getValue());","      ","      // + default values","      for(var key in fieldParams) {","         if( fieldParams.hasOwnProperty(key) ) {","            var value1 = getDefaultValueForField(classObj, key);","            var value2 = fieldParams[key];","            if(value1 == value2) {","               fieldParams[key] = undefined;","            }","         }","      }","      ","      // The field type","      fieldParams.type = this.typeSelect.getValue();","      ","      // The value defined by the fieldValue","      if(this.fieldValue) fieldParams.value = this.fieldValue.getValue();","      ","      return fieldParams;","   }","   ","});","","","// Register this class as \"type\" type","inputEx.registerType(\"type\", inputEx.TypeField, []);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-list\",","        \"inputex-string\",","        \"inputex-checkbox\",","        \"inputex-integer\"","    ],","    \"skinnable\": true,","    \"ix_provides\": \"type\"","});"];
_yuitest_coverage["build/inputex-type/inputex-type.js"].lines = {"1":0,"6":0,"16":0,"17":0,"20":0,"28":0,"29":0,"32":0,"35":0,"36":0,"37":0,"38":0,"41":0,"44":0,"45":0,"48":0,"49":0,"50":0,"53":0,"62":0,"65":0,"68":0,"72":0,"80":0,"83":0,"86":0,"87":0,"88":0,"89":0,"90":0,"94":0,"97":0,"98":0,"101":0,"102":0,"109":0,"112":0,"115":0,"116":0,"127":0,"128":0,"129":0,"131":0,"132":0,"143":0,"146":0,"154":0,"156":0,"157":0,"158":0,"159":0,"160":0,"164":0,"166":0,"167":0,"169":0,"172":0,"175":0,"176":0,"191":0,"194":0,"197":0,"200":0,"204":0,"207":0,"208":0,"209":0,"213":0,"215":0,"226":0,"227":0,"229":0,"230":0,"233":0,"234":0,"237":0,"242":0,"243":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"257":0,"260":0,"262":0,"269":0};
_yuitest_coverage["build/inputex-type/inputex-type.js"].functions = {"TypeField:16":0,"renderComponent:26":0,"(anonymous 2):68":0,"initEvents:61":0,"rebuildGroupOptions:79":0,"onTogglePropertiesPanel:126":0,"onChangeGroupOptions:140":0,"updateFieldValue:153":0,"(anonymous 3):208":0,"setValue:188":0,"getDefaultValueForField:226":0,"getValue:224":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-type/inputex-type.js"].coveredLines = 88;
_yuitest_coverage["build/inputex-type/inputex-type.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-type/inputex-type.js", 1);
YUI.add('inputex-type', function (Y, NAME) {

/**
 * @module inputex-type
 */
   _yuitest_coverfunc("build/inputex-type/inputex-type.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-type/inputex-type.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * TypeField is a field to create fields. The user can create any value he wants by switching fields.
 * @class inputEx.TypeField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options  Standard inputEx options definition
 */
_yuitest_coverline("build/inputex-type/inputex-type.js", 16);
inputEx.TypeField = function(options) {
   _yuitest_coverfunc("build/inputex-type/inputex-type.js", "TypeField", 16);
_yuitest_coverline("build/inputex-type/inputex-type.js", 17);
inputEx.TypeField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-type/inputex-type.js", 20);
Y.extend(inputEx.TypeField, inputEx.Field, {
   
   /**
    * Render the TypeField: create a button with a property panel that contains the field options
    * @method renderComponent
    */
   renderComponent: function() {
      // DIV element to wrap the Field "default value"
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "renderComponent", 26);
_yuitest_coverline("build/inputex-type/inputex-type.js", 28);
this.fieldValueWrapper = inputEx.cn('div', {className: "inputEx-TypeField-FieldValueWrapper"});
      _yuitest_coverline("build/inputex-type/inputex-type.js", 29);
this.fieldContainer.appendChild( this.fieldValueWrapper );
      
      // Render the popup that will contain the property form
      _yuitest_coverline("build/inputex-type/inputex-type.js", 32);
this.propertyPanel = inputEx.cn('div', {className: "inputEx-TypeField-PropertiesPanel"}, {display: 'none'});
      
      // The list of all inputEx declared types to be used in the "type" selector
      _yuitest_coverline("build/inputex-type/inputex-type.js", 35);
var selectOptions = [];
      _yuitest_coverline("build/inputex-type/inputex-type.js", 36);
for(var key in inputEx.typeClasses) {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 37);
if(inputEx.typeClasses.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 38);
selectOptions.push( { value : key } );
         }
      }
      _yuitest_coverline("build/inputex-type/inputex-type.js", 41);
this.typeSelect = new inputEx.SelectField({label: "Type", choices: selectOptions, parentEl: this.propertyPanel});

      // DIV element to wrap the options group
      _yuitest_coverline("build/inputex-type/inputex-type.js", 44);
this.groupOptionsWrapper = inputEx.cn('div');
      _yuitest_coverline("build/inputex-type/inputex-type.js", 45);
this.propertyPanel.appendChild( this.groupOptionsWrapper );
      
      // Button to switch the panel
      _yuitest_coverline("build/inputex-type/inputex-type.js", 48);
this.button = inputEx.cn('div', {className: "inputEx-TypeField-EditButton"});
      _yuitest_coverline("build/inputex-type/inputex-type.js", 49);
this.button.appendChild(this.propertyPanel);
      _yuitest_coverline("build/inputex-type/inputex-type.js", 50);
this.fieldContainer.appendChild(this.button);
      
      // Build the groupOptions
      _yuitest_coverline("build/inputex-type/inputex-type.js", 53);
this.rebuildGroupOptions();
   },
   
   /**
    * Adds 2 event listeners: 
    *  - on the button to toggel the propertiesPanel
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "initEvents", 61);
_yuitest_coverline("build/inputex-type/inputex-type.js", 62);
inputEx.TypeField.superclass.initEvents.call(this); 
      
      // "Toggle the properties panel" button :
      _yuitest_coverline("build/inputex-type/inputex-type.js", 65);
Y.one(this.button).on('click', this.onTogglePropertiesPanel, this, true);
      
      // Prevent the button to receive a "click" event if the propertyPanel doesn't catch it
      _yuitest_coverline("build/inputex-type/inputex-type.js", 68);
Y.one(this.propertyPanel).on('click', function(e) { _yuitest_coverfunc("build/inputex-type/inputex-type.js", "(anonymous 2)", 68);
e.stopPropagation();}, this, true);
      
      // Listen the "type" selector to update the groupOptions
      // Hack the type selector to rebuild the group option
      _yuitest_coverline("build/inputex-type/inputex-type.js", 72);
this.typeSelect.on('updated', this.rebuildGroupOptions, this, true);
   },
   
   /**
    * Regenerate the property form
    * @method rebuildGroupOptions
    */
   rebuildGroupOptions: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "rebuildGroupOptions", 79);
_yuitest_coverline("build/inputex-type/inputex-type.js", 80);
try {
         
         // Save the previous value:
         _yuitest_coverline("build/inputex-type/inputex-type.js", 83);
var previousVal = null;
         
         // Close a previously created group
         _yuitest_coverline("build/inputex-type/inputex-type.js", 86);
if(this.group) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 87);
previousVal = this.group.getValue();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 88);
this.group.close();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 89);
this.group.destroy();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 90);
this.groupOptionsWrapper.innerHTML = "";
         }
      
         // Get value is directly the class !!
         _yuitest_coverline("build/inputex-type/inputex-type.js", 94);
var classO = inputEx.getFieldClass(this.typeSelect.getValue());
         
         // Instanciate the group
         _yuitest_coverline("build/inputex-type/inputex-type.js", 97);
var groupParams = {fields: classO.groupOptions, parentEl: this.groupOptionsWrapper};
         _yuitest_coverline("build/inputex-type/inputex-type.js", 98);
this.group = new inputEx.Group(groupParams);
         
         // Set the previous name/label
         _yuitest_coverline("build/inputex-type/inputex-type.js", 101);
if(previousVal) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 102);
this.group.setValue({
               name: previousVal.name,
               label: previousVal.label
            });
         }
         
         // Register the updated event
         _yuitest_coverline("build/inputex-type/inputex-type.js", 109);
this.group.on('updated', this.onChangeGroupOptions, this, true);
            
         // Create the value field
         _yuitest_coverline("build/inputex-type/inputex-type.js", 112);
this.updateFieldValue();
         
      } catch(ex) {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 115);
if(Y.Lang.isObject(window["console"]) && Y.Lang.isFunction(window["console"]["log"]) ) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 116);
console.log("inputEx.TypeField.rebuildGroupOptions: ", ex);
         }
      }
         
   },
   
   /**
    * Toggle the property panel
    * @method onTogglePropertiesPanel
    */
   onTogglePropertiesPanel: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "onTogglePropertiesPanel", 126);
_yuitest_coverline("build/inputex-type/inputex-type.js", 127);
if (this.propertyPanel.style.display == 'none') {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 128);
this.propertyPanel.style.display = '';
         _yuitest_coverline("build/inputex-type/inputex-type.js", 129);
Y.one(this.button).addClass(this.button, "opened");
      } else {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 131);
this.propertyPanel.style.display = 'none';
         _yuitest_coverline("build/inputex-type/inputex-type.js", 132);
Y.one(this.button).removeClass("opened");
      }
   },
   
   /**
    * Update the fieldValue with the changed properties
    * @method onChangeGroupOptions
    */
   onChangeGroupOptions: function() {
      
      // Update the field value 
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "onChangeGroupOptions", 140);
_yuitest_coverline("build/inputex-type/inputex-type.js", 143);
this.updateFieldValue();
      
      // Fire "updated" event
      _yuitest_coverline("build/inputex-type/inputex-type.js", 146);
this.fireUpdatedEvt();
   },
   
   /**
    * Update the fieldValue
    * @method updateFieldValue
    */
   updateFieldValue: function() {
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "updateFieldValue", 153);
_yuitest_coverline("build/inputex-type/inputex-type.js", 154);
try {
         // Close previous field
         _yuitest_coverline("build/inputex-type/inputex-type.js", 156);
if(this.fieldValue) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 157);
this.fieldValue.close();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 158);
this.fieldValue.destroy();
            _yuitest_coverline("build/inputex-type/inputex-type.js", 159);
delete this.fieldValue;
            _yuitest_coverline("build/inputex-type/inputex-type.js", 160);
this.fieldValueWrapper.innerHTML = '';
         }
      
         // Re-build the fieldValue
         _yuitest_coverline("build/inputex-type/inputex-type.js", 164);
var fieldOptions = this.group.getValue();
         
         _yuitest_coverline("build/inputex-type/inputex-type.js", 166);
fieldOptions.type = this.getValue().type;
         _yuitest_coverline("build/inputex-type/inputex-type.js", 167);
fieldOptions.parentEl = this.fieldValueWrapper;
         
         _yuitest_coverline("build/inputex-type/inputex-type.js", 169);
this.fieldValue = inputEx(fieldOptions,this);
      
         // Refire the event when the fieldValue is updated
         _yuitest_coverline("build/inputex-type/inputex-type.js", 172);
this.fieldValue.on('updated', this.fireUpdatedEvt, this, true);
      }
      catch(ex) {	
         _yuitest_coverline("build/inputex-type/inputex-type.js", 175);
if(Y.Lang.isObject(window["console"]) && Y.Lang.isFunction(window["console"]["log"]) ) {
         	_yuitest_coverline("build/inputex-type/inputex-type.js", 176);
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
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "setValue", 188);
_yuitest_coverline("build/inputex-type/inputex-type.js", 191);
this.typeSelect.setValue(value.type, false);
      
      // Rebuild the panel propertues
      _yuitest_coverline("build/inputex-type/inputex-type.js", 194);
this.rebuildGroupOptions();
      
      // Set the parameters value
      _yuitest_coverline("build/inputex-type/inputex-type.js", 197);
this.group.setValue(value, false);
      
      // Rebuild the fieldValue
      _yuitest_coverline("build/inputex-type/inputex-type.js", 200);
this.updateFieldValue();
      
      // Set field value :
		// fix it for default value (because updateFieldValue is called after first setValue)
 		_yuitest_coverline("build/inputex-type/inputex-type.js", 204);
var that = this;      

      // New prefered way to describe a field
      _yuitest_coverline("build/inputex-type/inputex-type.js", 207);
if (!lang.isUndefined(value.value)) {
			_yuitest_coverline("build/inputex-type/inputex-type.js", 208);
setTimeout(function(){
				_yuitest_coverfunc("build/inputex-type/inputex-type.js", "(anonymous 3)", 208);
_yuitest_coverline("build/inputex-type/inputex-type.js", 209);
that.fieldValue.setValue(value.value, false);
			}, 50);
      }
      
	   _yuitest_coverline("build/inputex-type/inputex-type.js", 213);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-type/inputex-type.js", 215);
this.fireUpdatedEvt(false);
      }
   },
   
   /**
    * Return the config for a entry in an Group
    * @method getValue
    * @return {Object} Type object configuration
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-type/inputex-type.js", "getValue", 224);
_yuitest_coverline("build/inputex-type/inputex-type.js", 226);
var getDefaultValueForField = function (classObj, paramName) {
         _yuitest_coverfunc("build/inputex-type/inputex-type.js", "getDefaultValueForField", 226);
_yuitest_coverline("build/inputex-type/inputex-type.js", 227);
var i, length = classObj.groupOptions.length, f;
         
         _yuitest_coverline("build/inputex-type/inputex-type.js", 229);
for(i = 0 ; i < length ; i++) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 230);
f = classObj.groupOptions[i];
            
            // New prefered way to use field options
            _yuitest_coverline("build/inputex-type/inputex-type.js", 233);
if (f.name == paramName) {
               _yuitest_coverline("build/inputex-type/inputex-type.js", 234);
return f.value;
            }
         }
         _yuitest_coverline("build/inputex-type/inputex-type.js", 237);
return undefined;
      };
      
      
      // The field parameters
      _yuitest_coverline("build/inputex-type/inputex-type.js", 242);
var fieldParams = this.group.getValue();
      _yuitest_coverline("build/inputex-type/inputex-type.js", 243);
var classObj = inputEx.getFieldClass(this.typeSelect.getValue());
      
      // + default values
      _yuitest_coverline("build/inputex-type/inputex-type.js", 246);
for(var key in fieldParams) {
         _yuitest_coverline("build/inputex-type/inputex-type.js", 247);
if( fieldParams.hasOwnProperty(key) ) {
            _yuitest_coverline("build/inputex-type/inputex-type.js", 248);
var value1 = getDefaultValueForField(classObj, key);
            _yuitest_coverline("build/inputex-type/inputex-type.js", 249);
var value2 = fieldParams[key];
            _yuitest_coverline("build/inputex-type/inputex-type.js", 250);
if(value1 == value2) {
               _yuitest_coverline("build/inputex-type/inputex-type.js", 251);
fieldParams[key] = undefined;
            }
         }
      }
      
      // The field type
      _yuitest_coverline("build/inputex-type/inputex-type.js", 257);
fieldParams.type = this.typeSelect.getValue();
      
      // The value defined by the fieldValue
      _yuitest_coverline("build/inputex-type/inputex-type.js", 260);
if(this.fieldValue) {fieldParams.value = this.fieldValue.getValue();}
      
      _yuitest_coverline("build/inputex-type/inputex-type.js", 262);
return fieldParams;
   }
   
});


// Register this class as "type" type
_yuitest_coverline("build/inputex-type/inputex-type.js", 269);
inputEx.registerType("type", inputEx.TypeField, []);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "inputex-group",
        "inputex-select",
        "inputex-list",
        "inputex-string",
        "inputex-checkbox",
        "inputex-integer"
    ],
    "skinnable": true,
    "ix_provides": "type"
});
