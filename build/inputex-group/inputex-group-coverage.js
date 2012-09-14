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
_yuitest_coverage["build/inputex-group/inputex-group.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-group/inputex-group.js",
    code: []
};
_yuitest_coverage["build/inputex-group/inputex-group.js"].code=["YUI.add('inputex-group', function (Y, NAME) {","","/**"," * @module inputex-group"," */","YUI.add(\"inputex-group\", function(Y){","   ","   var lang = Y.Lang,","       inputEx = Y.inputEx;","       ","/**"," * Handle a group of fields"," * @class inputEx.Group"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options The following options are added for Groups and subclasses:"," * <ul>"," *   <li>fields: Array of input fields declared like { label: 'Enter the value:' , type: 'text' or fieldClass: inputEx.Field, optional: true/false, ... }</li>"," *   <li>legend: The legend for the fieldset (default is an empty string)</li>"," *   <li>collapsible: Boolean to make the group collapsible (default is false)</li>"," *   <li>collapsed: If collapsible only, will be collapsed at creation (default is false)</li>"," *   <li>flatten:</li>"," * </ul>"," */","inputEx.Group = function(options) {","   inputEx.Group.superclass.constructor.call(this,options);","   ","   // Run default field interactions (if setValue has not been called before)","   if(!this.options.value) {","      this.runFieldsInteractions();","   }","};","Y.extend(inputEx.Group, inputEx.Field, {","   ","   /**","    * Adds some options: legend, collapsible, fields...","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      ","      inputEx.Group.superclass.setOptions.call(this, options);","      ","      this.options.className = options.className || 'inputEx-Group';","      ","      this.options.fields = options.fields;","      ","      this.options.flatten = options.flatten;","      ","      this.options.legend = options.legend || '';","      ","      this.options.collapsible = lang.isUndefined(options.collapsible) ? false : options.collapsible;","      this.options.collapsed = lang.isUndefined(options.collapsed) ? false : options.collapsed;","      ","      this.options.disabled = lang.isUndefined(options.disabled) ? false : options.disabled;","      ","      // Array containing the list of the field instances","      this.inputs = [];","","      // Associative array containing the field instances by names","      this.inputsNames = {};","   },","","   /**","    * Render the group","    * @method render","    */","   render: function() {","   ","      // Create the div wrapper for this group","      this.divEl = inputEx.cn('div', {className: this.options.className});","      if(this.options.id) {","         this.divEl.id = this.options.id;","      }","      ","      this.renderFields(this.divEl);","      ","      if(this.options.disabled) {","         this.disable();","      }","   },","   ","   /**","    * Render all the fields.","    * We use the parentEl so that inputEx.Form can append them to the FORM tag","    * @method renderFields","    */","   renderFields: function(parentEl) {","      ","      this.fieldset = inputEx.cn('fieldset');","      this.legend = inputEx.cn('legend', {className: 'inputEx-Group-legend'});","   ","      // Option Collapsible","      if(this.options.collapsible) {","         var collapseImg = inputEx.cn('div', {className: 'inputEx-Group-collapseImg'}, null, ' ');","         this.legend.appendChild(collapseImg);","         inputEx.sn(this.fieldset,{className:'inputEx-Expanded'});","      }","   ","      if(!lang.isUndefined(this.options.legend) && this.options.legend !== ''){","         this.legend.appendChild( inputEx.cn(\"span\", null, null, \" \"+this.options.legend) );","      }","   ","      if( this.options.collapsible || (!lang.isUndefined(this.options.legend) && this.options.legend !== '') ) {","         this.fieldset.appendChild(this.legend);","      }","      ","      // Iterate this.createInput on input fields","      for (var i = 0 ; i < this.options.fields.length ; i++) {","         var fieldOptions = this.options.fields[i];","         ","         // Throw Error if input is undefined","         if(!fieldOptions) {","            throw new Error(\"inputEx.Form: One of the provided fields is undefined ! (check trailing comma)\");","         }","         ","         // Render the field","         this.addField(fieldOptions);","      }","      ","      // Collapsed at creation ?","      if(this.options.collapsed) {","         this.toggleCollapse();","      }","      ","      // Append the fieldset","      parentEl.appendChild(this.fieldset);","   },","","   /**","    * Render a field and add it to the field set","    * @method addField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   addField: function(fieldOptions) {","		var field = this.renderField(fieldOptions);","      this.fieldset.appendChild(field.getEl() );","	},","","   /**","    * Instanciate one field given its parameters, type or fieldClass","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   renderField: function(fieldOptions) {","","      // Instanciate the field","      var fieldInstance = inputEx(fieldOptions,this);","      ","	   this.inputs.push(fieldInstance);","      ","      // Create an index to access fields by their name","      if(fieldInstance.options.name) {","         this.inputsNames[fieldInstance.options.name] = fieldInstance;","      } ","      // when the instance is a flatten group, we consider his fields as our fields","      if(fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)){","        Y.mix(this.inputsNames,fieldInstance.inputsNames);","        this.inputs = this.inputs.concat(fieldInstance.inputs);","      }","      ","      // Create the this.hasInteractions to run interactions at startup","      if(!this.hasInteractions && fieldOptions.interactions) {","         this.hasInteractions = true;","      }","      ","      // Subscribe to the field \"updated\" event to send the group \"updated\" event","      fieldInstance.on(\"updated\",this.onChange, this);","      ","      return fieldInstance;","   },","  ","   /**","    * Add a listener for the 'collapsible' option","    * @method initEvents","    */","   initEvents: function() {","      if(this.options.collapsible) {","         Y.on(\"click\", this.toggleCollapse,this.legend, this);","      }","   },","","   /**","    * Toggle the collapse state","    * @method toggleCollapse","    */","   toggleCollapse: function() {","      if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {","        Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');","      }","      else {","         Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');","      }","   },","   ","   /**","    * Validate each field","    * @method validate","    * @return {Boolean} true if all fields validate and required fields are not empty","    */","   validate: function() {","      var response = true;","","      // Validate all the sub fields","      for (var i = 0; i < this.inputs.length; i++) {","         var input = this.inputs[i];","         if (!input.isDisabled()) {","            var state = input.getState();","            input.setClassFromState(state); // update field classes (mark invalid fields...)","            if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {","               response = false; // but keep looping on fields to set classes","            }","         }","      }","      return response;","   },","	","	/**","	 * Alternative method to validate for advanced error handling","	 * @method getFieldsStates","	 * @return {Object} with all Forms's fields state, error message","	 * and validate containing a boolean for the global Form validation","	 */","	getFieldsStates: function() {","		var input, inputName, state, message,","		returnedObj = { fields:{}, validate:true };","      ","      // Loop on all the sub fields","      for (var i = 0 ; i < this.inputs.length ; i++) {","         ","         input = this.inputs[i];","         inputName = input.options.name;","         state = input.getState();","         message = input.getStateString(state);","         ","         returnedObj.fields[inputName] = {};","         returnedObj.fields[inputName].valid = true;","         returnedObj.fields[inputName].message = message;","         ","         // check if subfield validates","         if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {","            returnedObj.fields[inputName].valid = false;","            returnedObj.validate = false;","         }","","      }","","      return returnedObj;","	},","   ","   /**","    * Enable all fields in the group","    * @method enable","    */","   enable: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].enable();","      }","   },","   ","   /**","    * Disable all fields in the group","    * @method disable","    */","   disable: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].disable();","      }","   },","   ","   /**","    * Set the values of each field from a key/value hash object","    * @method setValue","    * @param {Any} value The group value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(oValues, sendUpdatedEvt) {","      if(!oValues) {","         return;","      }","	   for (var i = 0 ; i < this.inputs.length ; i++) {","	      var field = this.inputs[i];","	      var name = field.options.name;","	      if(name && !lang.isUndefined(oValues[name]) ) {","	         field.setValue(oValues[name], false); // don't fire the updated event !","	      }","	      else {","	         field.clear(false);","	      }","      }","      ","      this.runFieldsInteractions();","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   /**","    * Return an object with all the values of the fields","    * @method getValue","    */","   getValue: function() {","	   var o = {};","	   for (var i = 0 ; i < this.inputs.length ; i++) {","	      var v = this.inputs[i].getValue();","	      if(this.inputs[i].options.name) {","	         if(this.inputs[i].options.flatten && lang.isObject(v) ) {","	            Y.mix( o, v);","	         }","	         else {","		         o[this.inputs[i].options.name] = v;","	         }","	      }","      }","	   return o;","   },","  ","   /**","    * Close the group (recursively calls \"close\" on each field, does NOT hide the group )","    * Call this function before hidding the group to close any field popup","    * @method close","    */","   close: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].close();","      }","   },","","   /**","    * Set the focus to the first input in the group","    * @method focus","    */","   focus: function() {","      if( this.inputs.length > 0 ) {","         this.inputs[0].focus();","      }","   },","","   /**","    * Return the sub-field instance by its name property","    * @method getFieldByName","    * @param {String} fieldName The name property","    */","   getFieldByName: function(fieldName) {","      if( !this.inputsNames.hasOwnProperty(fieldName) ) {","         return null;","      }","      return this.inputsNames[fieldName];","   },","","   /**","    * Find a field anywhere in the hierarchy this group is a part of.","    * @method findFieldByName","    * @param {String} fieldName The name property","    * @param {Boolean} descendOnly Set true to only look at children of this group","    */","   findFieldByName: function(fieldName, descendOnly) {","      var search = this,","          parent,","          field;","","      if (descendOnly) {","         if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {","            for (var group, inputs = this.inputs, i = 0, len = inputs.length; i < len; ++i) {","               group = inputs[i];","               if (lang.isFunction(group.getFieldByName) &&","                     (field = group.getFieldByName(fieldName, true))) {","                  break;","               }","            }","         }","","         return field;","      }","      else {","         while ((parent = search.getParentField()) &&","               lang.isFunction(parent.getFieldByName)) {","            search = parent;","         }","         return search.getFieldByName(fieldName, true);","      }","   },","","","   /**","    * Called when one of the group subfields is updated.","    * @method onChange","    * @param {String} eventName Event name","    * @param {Array} args Array of [fieldValue, fieldInstance] ","    */","   onChange: function(fieldValue, fieldInstance) {","","      // Run interactions","      this.runInteractions(fieldInstance,fieldValue);","      ","      //this.setClassFromState();","      ","      this.fireUpdatedEvt();","   },","","   /**","    * Run an action (for interactions)","    * @method runAction","    * @param {Object} action inputEx action object","    * @param {Any} triggerValue The value that triggered the interaction","    */","   runAction: function(action, triggerValue) {","      var field = this.getFieldByName(action.name);","      if( lang.isFunction(field[action.action]) ) {","         field[action.action].call(field);","      }","      else if( lang.isFunction(action.action) ) {","         action.action.call(field, triggerValue);","      }","      else {","         throw new Error(\"action \"+action.action+\" is not a valid action for field \"+action.name);","      }","   },","   ","   /**","    * Run the interactions for the given field instance","    * @method runInteractions","    * @param {inputEx.Field} fieldInstance Field that just changed","    * @param {Any} fieldValue Field value","    */","   runInteractions: function(fieldInstance,fieldValue) {","      ","      var index = inputEx.indexOf(fieldInstance, this.inputs);","      var fieldConfig = this.options.fields[index];","      if(lang.isUndefined(fieldConfig.interactions) ) return;","      ","      // Let's run the interactions !","      var interactions = fieldConfig.interactions;","      for(var i = 0 ; i < interactions.length ; i++) {","         var interaction = interactions[i];","         if(interaction.valueTrigger === fieldValue) {","            for(var j = 0 ; j < interaction.actions.length ; j++) {","               this.runAction(interaction.actions[j], fieldValue);","            }","         }","      }","      ","   },","   ","   /**","    * Run the interactions for all fields","    * @method runFieldsInteractions","    */","   runFieldsInteractions: function() {","      if(this.hasInteractions) {","         for(var i = 0 ; i < this.inputs.length ; i++) {","            this.runInteractions(this.inputs[i],this.inputs[i].getValue());","         }","      }","   },","   ","	/**","	 * Clear all subfields","	 * @method clear","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	clear: function(sendUpdatedEvt) {","	   for(var i = 0 ; i < this.inputs.length ; i++) {","	      this.inputs[i].clear(false);","	   }","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","	},","	","	/**","	 * Write error messages for fields as specified in the hash","	 * @method setErrors","	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ [\"fieldName\", \"Message\"], ...]","	 */","	setErrors: function(errors) {	","		var i,k;","		if(lang.isArray(errors)) {","			for(i = 0 ; i < errors.length ; i++) {","				k = errors[i][0];","				value = errors[i][1];","				if(this.inputsNames[k]) {","					if(this.inputsNames[k].options.showMsg) {","						this.inputsNames[k].displayMessage(value);","						Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","					}","				}","			}","		}","		else if(lang.isObject(errors)) {","			for(k in errors) {","				if(errors.hasOwnProperty(k)) {","					if(this.inputsNames[k]) {","						if(this.inputsNames[k].options.showMsg) {","							this.inputsNames[k].displayMessage(errors[k]);","							Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","						}","					}","				}","			}","		}","	},","	","   /**","    * Compatibility with classic forms in listField for instance","    * @method setFieldName","    */","    setFieldName: function(name){","			var l = this.inputs.length;","			for (var i = 0; i < l; i++){","				this.inputs[i].setFieldName(name+\"\"+((this.inputs[i].el && this.inputs[i].el.name )|| \"group-\"+i ));","			}","    },","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, field;","      ","      // Recursively destroy inputs","      for (i = 0, length = this.inputs.length ; i < length ; i++) {","         field = this.inputs[i];","         field.destroy();","      }","      ","      // Destroy group itself","      inputEx.Group.superclass.destroy.call(this);","      ","   }","   ","   ","});","","   ","// Register this class as \"group\" type","inputEx.registerType(\"group\", inputEx.Group, [","   { type: \"string\", label: \"Name\", name: \"name\", value: '' },","   { type: 'string', label: 'Legend', name:'legend'},","   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},","   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},","   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }","], true);","","","}, '3.1.0',{","  requires: [\"inputex-field\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-group/inputex-group.js"].lines = {"1":0,"6":0,"8":0,"25":0,"26":0,"29":0,"30":0,"33":0,"42":0,"44":0,"46":0,"48":0,"50":0,"52":0,"53":0,"55":0,"58":0,"61":0,"71":0,"72":0,"73":0,"76":0,"78":0,"79":0,"90":0,"91":0,"94":0,"95":0,"96":0,"97":0,"100":0,"101":0,"104":0,"105":0,"109":0,"110":0,"113":0,"114":0,"118":0,"122":0,"123":0,"127":0,"136":0,"137":0,"148":0,"150":0,"153":0,"154":0,"157":0,"158":0,"159":0,"163":0,"164":0,"168":0,"170":0,"178":0,"179":0,"188":0,"189":0,"192":0,"202":0,"205":0,"206":0,"207":0,"208":0,"209":0,"210":0,"211":0,"215":0,"225":0,"229":0,"231":0,"232":0,"233":0,"234":0,"236":0,"237":0,"238":0,"241":0,"242":0,"243":0,"248":0,"256":0,"257":0,"266":0,"267":0,"278":0,"279":0,"281":0,"282":0,"283":0,"284":0,"285":0,"288":0,"292":0,"294":0,"296":0,"305":0,"306":0,"307":0,"308":0,"309":0,"310":0,"313":0,"317":0,"326":0,"327":0,"336":0,"337":0,"347":0,"348":0,"350":0,"360":0,"364":0,"365":0,"366":0,"367":0,"368":0,"370":0,"375":0,"378":0,"380":0,"382":0,"396":0,"400":0,"410":0,"411":0,"412":0,"414":0,"415":0,"418":0,"430":0,"431":0,"432":0,"435":0,"436":0,"437":0,"438":0,"439":0,"440":0,"452":0,"453":0,"454":0,"465":0,"466":0,"468":0,"470":0,"480":0,"481":0,"482":0,"483":0,"484":0,"485":0,"486":0,"487":0,"488":0,"493":0,"494":0,"495":0,"496":0,"497":0,"498":0,"499":0,"512":0,"513":0,"514":0,"524":0,"527":0,"528":0,"529":0,"533":0,"542":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].functions = {"Group:25":0,"setOptions:40":0,"render:68":0,"renderFields:88":0,"addField:135":0,"renderField:145":0,"initEvents:177":0,"toggleCollapse:187":0,"validate:201":0,"getFieldsStates:224":0,"enable:255":0,"disable:265":0,"setValue:277":0,"getValue:304":0,"close:325":0,"focus:335":0,"getFieldByName:346":0,"findFieldByName:359":0,"onChange:393":0,"runAction:409":0,"runInteractions:428":0,"runFieldsInteractions:451":0,"clear:464":0,"setErrors:479":0,"setFieldName:511":0,"destroy:522":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].coveredLines = 172;
_yuitest_coverage["build/inputex-group/inputex-group.js"].coveredFunctions = 28;
_yuitest_coverline("build/inputex-group/inputex-group.js", 1);
YUI.add('inputex-group', function (Y, NAME) {

/**
 * @module inputex-group
 */
_yuitest_coverfunc("build/inputex-group/inputex-group.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-group/inputex-group.js", 6);
YUI.add("inputex-group", function(Y){
   
   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-group/inputex-group.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;
       
/**
 * Handle a group of fields
 * @class inputEx.Group
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options The following options are added for Groups and subclasses:
 * <ul>
 *   <li>fields: Array of input fields declared like { label: 'Enter the value:' , type: 'text' or fieldClass: inputEx.Field, optional: true/false, ... }</li>
 *   <li>legend: The legend for the fieldset (default is an empty string)</li>
 *   <li>collapsible: Boolean to make the group collapsible (default is false)</li>
 *   <li>collapsed: If collapsible only, will be collapsed at creation (default is false)</li>
 *   <li>flatten:</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-group/inputex-group.js", 25);
inputEx.Group = function(options) {
   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "Group", 25);
_yuitest_coverline("build/inputex-group/inputex-group.js", 26);
inputEx.Group.superclass.constructor.call(this,options);
   
   // Run default field interactions (if setValue has not been called before)
   _yuitest_coverline("build/inputex-group/inputex-group.js", 29);
if(!this.options.value) {
      _yuitest_coverline("build/inputex-group/inputex-group.js", 30);
this.runFieldsInteractions();
   }
};
_yuitest_coverline("build/inputex-group/inputex-group.js", 33);
Y.extend(inputEx.Group, inputEx.Field, {
   
   /**
    * Adds some options: legend, collapsible, fields...
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "setOptions", 40);
_yuitest_coverline("build/inputex-group/inputex-group.js", 42);
inputEx.Group.superclass.setOptions.call(this, options);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 44);
this.options.className = options.className || 'inputEx-Group';
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 46);
this.options.fields = options.fields;
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 48);
this.options.flatten = options.flatten;
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 50);
this.options.legend = options.legend || '';
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 52);
this.options.collapsible = lang.isUndefined(options.collapsible) ? false : options.collapsible;
      _yuitest_coverline("build/inputex-group/inputex-group.js", 53);
this.options.collapsed = lang.isUndefined(options.collapsed) ? false : options.collapsed;
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 55);
this.options.disabled = lang.isUndefined(options.disabled) ? false : options.disabled;
      
      // Array containing the list of the field instances
      _yuitest_coverline("build/inputex-group/inputex-group.js", 58);
this.inputs = [];

      // Associative array containing the field instances by names
      _yuitest_coverline("build/inputex-group/inputex-group.js", 61);
this.inputsNames = {};
   },

   /**
    * Render the group
    * @method render
    */
   render: function() {
   
      // Create the div wrapper for this group
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "render", 68);
_yuitest_coverline("build/inputex-group/inputex-group.js", 71);
this.divEl = inputEx.cn('div', {className: this.options.className});
      _yuitest_coverline("build/inputex-group/inputex-group.js", 72);
if(this.options.id) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 73);
this.divEl.id = this.options.id;
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 76);
this.renderFields(this.divEl);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 78);
if(this.options.disabled) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 79);
this.disable();
      }
   },
   
   /**
    * Render all the fields.
    * We use the parentEl so that inputEx.Form can append them to the FORM tag
    * @method renderFields
    */
   renderFields: function(parentEl) {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "renderFields", 88);
_yuitest_coverline("build/inputex-group/inputex-group.js", 90);
this.fieldset = inputEx.cn('fieldset');
      _yuitest_coverline("build/inputex-group/inputex-group.js", 91);
this.legend = inputEx.cn('legend', {className: 'inputEx-Group-legend'});
   
      // Option Collapsible
      _yuitest_coverline("build/inputex-group/inputex-group.js", 94);
if(this.options.collapsible) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 95);
var collapseImg = inputEx.cn('div', {className: 'inputEx-Group-collapseImg'}, null, ' ');
         _yuitest_coverline("build/inputex-group/inputex-group.js", 96);
this.legend.appendChild(collapseImg);
         _yuitest_coverline("build/inputex-group/inputex-group.js", 97);
inputEx.sn(this.fieldset,{className:'inputEx-Expanded'});
      }
   
      _yuitest_coverline("build/inputex-group/inputex-group.js", 100);
if(!lang.isUndefined(this.options.legend) && this.options.legend !== ''){
         _yuitest_coverline("build/inputex-group/inputex-group.js", 101);
this.legend.appendChild( inputEx.cn("span", null, null, " "+this.options.legend) );
      }
   
      _yuitest_coverline("build/inputex-group/inputex-group.js", 104);
if( this.options.collapsible || (!lang.isUndefined(this.options.legend) && this.options.legend !== '') ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 105);
this.fieldset.appendChild(this.legend);
      }
      
      // Iterate this.createInput on input fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 109);
for (var i = 0 ; i < this.options.fields.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 110);
var fieldOptions = this.options.fields[i];
         
         // Throw Error if input is undefined
         _yuitest_coverline("build/inputex-group/inputex-group.js", 113);
if(!fieldOptions) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 114);
throw new Error("inputEx.Form: One of the provided fields is undefined ! (check trailing comma)");
         }
         
         // Render the field
         _yuitest_coverline("build/inputex-group/inputex-group.js", 118);
this.addField(fieldOptions);
      }
      
      // Collapsed at creation ?
      _yuitest_coverline("build/inputex-group/inputex-group.js", 122);
if(this.options.collapsed) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 123);
this.toggleCollapse();
      }
      
      // Append the fieldset
      _yuitest_coverline("build/inputex-group/inputex-group.js", 127);
parentEl.appendChild(this.fieldset);
   },

   /**
    * Render a field and add it to the field set
    * @method addField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   addField: function(fieldOptions) {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "addField", 135);
_yuitest_coverline("build/inputex-group/inputex-group.js", 136);
var field = this.renderField(fieldOptions);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 137);
this.fieldset.appendChild(field.getEl() );
	},

   /**
    * Instanciate one field given its parameters, type or fieldClass
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   renderField: function(fieldOptions) {

      // Instanciate the field
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "renderField", 145);
_yuitest_coverline("build/inputex-group/inputex-group.js", 148);
var fieldInstance = inputEx(fieldOptions,this);
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 150);
this.inputs.push(fieldInstance);
      
      // Create an index to access fields by their name
      _yuitest_coverline("build/inputex-group/inputex-group.js", 153);
if(fieldInstance.options.name) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 154);
this.inputsNames[fieldInstance.options.name] = fieldInstance;
      } 
      // when the instance is a flatten group, we consider his fields as our fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 157);
if(fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)){
        _yuitest_coverline("build/inputex-group/inputex-group.js", 158);
Y.mix(this.inputsNames,fieldInstance.inputsNames);
        _yuitest_coverline("build/inputex-group/inputex-group.js", 159);
this.inputs = this.inputs.concat(fieldInstance.inputs);
      }
      
      // Create the this.hasInteractions to run interactions at startup
      _yuitest_coverline("build/inputex-group/inputex-group.js", 163);
if(!this.hasInteractions && fieldOptions.interactions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 164);
this.hasInteractions = true;
      }
      
      // Subscribe to the field "updated" event to send the group "updated" event
      _yuitest_coverline("build/inputex-group/inputex-group.js", 168);
fieldInstance.on("updated",this.onChange, this);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 170);
return fieldInstance;
   },
  
   /**
    * Add a listener for the 'collapsible' option
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "initEvents", 177);
_yuitest_coverline("build/inputex-group/inputex-group.js", 178);
if(this.options.collapsible) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 179);
Y.on("click", this.toggleCollapse,this.legend, this);
      }
   },

   /**
    * Toggle the collapse state
    * @method toggleCollapse
    */
   toggleCollapse: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "toggleCollapse", 187);
_yuitest_coverline("build/inputex-group/inputex-group.js", 188);
if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {
        _yuitest_coverline("build/inputex-group/inputex-group.js", 189);
Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 192);
Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');
      }
   },
   
   /**
    * Validate each field
    * @method validate
    * @return {Boolean} true if all fields validate and required fields are not empty
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "validate", 201);
_yuitest_coverline("build/inputex-group/inputex-group.js", 202);
var response = true;

      // Validate all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 205);
for (var i = 0; i < this.inputs.length; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 206);
var input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 207);
if (!input.isDisabled()) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 208);
var state = input.getState();
            _yuitest_coverline("build/inputex-group/inputex-group.js", 209);
input.setClassFromState(state); // update field classes (mark invalid fields...)
            _yuitest_coverline("build/inputex-group/inputex-group.js", 210);
if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 211);
response = false; // but keep looping on fields to set classes
            }
         }
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 215);
return response;
   },
	
	/**
	 * Alternative method to validate for advanced error handling
	 * @method getFieldsStates
	 * @return {Object} with all Forms's fields state, error message
	 * and validate containing a boolean for the global Form validation
	 */
	getFieldsStates: function() {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldsStates", 224);
_yuitest_coverline("build/inputex-group/inputex-group.js", 225);
var input, inputName, state, message,
		returnedObj = { fields:{}, validate:true };
      
      // Loop on all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 229);
for (var i = 0 ; i < this.inputs.length ; i++) {
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 231);
input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 232);
inputName = input.options.name;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 233);
state = input.getState();
         _yuitest_coverline("build/inputex-group/inputex-group.js", 234);
message = input.getStateString(state);
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 236);
returnedObj.fields[inputName] = {};
         _yuitest_coverline("build/inputex-group/inputex-group.js", 237);
returnedObj.fields[inputName].valid = true;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 238);
returnedObj.fields[inputName].message = message;
         
         // check if subfield validates
         _yuitest_coverline("build/inputex-group/inputex-group.js", 241);
if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 242);
returnedObj.fields[inputName].valid = false;
            _yuitest_coverline("build/inputex-group/inputex-group.js", 243);
returnedObj.validate = false;
         }

      }

      _yuitest_coverline("build/inputex-group/inputex-group.js", 248);
return returnedObj;
	},
   
   /**
    * Enable all fields in the group
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "enable", 255);
_yuitest_coverline("build/inputex-group/inputex-group.js", 256);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 257);
this.inputs[i].enable();
      }
   },
   
   /**
    * Disable all fields in the group
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "disable", 265);
_yuitest_coverline("build/inputex-group/inputex-group.js", 266);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 267);
this.inputs[i].disable();
      }
   },
   
   /**
    * Set the values of each field from a key/value hash object
    * @method setValue
    * @param {Any} value The group value
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(oValues, sendUpdatedEvt) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "setValue", 277);
_yuitest_coverline("build/inputex-group/inputex-group.js", 278);
if(!oValues) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 279);
return;
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 281);
for (var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 282);
var field = this.inputs[i];
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 283);
var name = field.options.name;
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 284);
if(name && !lang.isUndefined(oValues[name]) ) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 285);
field.setValue(oValues[name], false); // don't fire the updated event !
	      }
	      else {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 288);
field.clear(false);
	      }
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 292);
this.runFieldsInteractions();
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 294);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 296);
this.fireUpdatedEvt();
      }
   },
   
   /**
    * Return an object with all the values of the fields
    * @method getValue
    */
   getValue: function() {
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getValue", 304);
_yuitest_coverline("build/inputex-group/inputex-group.js", 305);
var o = {};
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 306);
for (var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 307);
var v = this.inputs[i].getValue();
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 308);
if(this.inputs[i].options.name) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 309);
if(this.inputs[i].options.flatten && lang.isObject(v) ) {
	            _yuitest_coverline("build/inputex-group/inputex-group.js", 310);
Y.mix( o, v);
	         }
	         else {
		         _yuitest_coverline("build/inputex-group/inputex-group.js", 313);
o[this.inputs[i].options.name] = v;
	         }
	      }
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 317);
return o;
   },
  
   /**
    * Close the group (recursively calls "close" on each field, does NOT hide the group )
    * Call this function before hidding the group to close any field popup
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "close", 325);
_yuitest_coverline("build/inputex-group/inputex-group.js", 326);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 327);
this.inputs[i].close();
      }
   },

   /**
    * Set the focus to the first input in the group
    * @method focus
    */
   focus: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "focus", 335);
_yuitest_coverline("build/inputex-group/inputex-group.js", 336);
if( this.inputs.length > 0 ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 337);
this.inputs[0].focus();
      }
   },

   /**
    * Return the sub-field instance by its name property
    * @method getFieldByName
    * @param {String} fieldName The name property
    */
   getFieldByName: function(fieldName) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldByName", 346);
_yuitest_coverline("build/inputex-group/inputex-group.js", 347);
if( !this.inputsNames.hasOwnProperty(fieldName) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 348);
return null;
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 350);
return this.inputsNames[fieldName];
   },

   /**
    * Find a field anywhere in the hierarchy this group is a part of.
    * @method findFieldByName
    * @param {String} fieldName The name property
    * @param {Boolean} descendOnly Set true to only look at children of this group
    */
   findFieldByName: function(fieldName, descendOnly) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "findFieldByName", 359);
_yuitest_coverline("build/inputex-group/inputex-group.js", 360);
var search = this,
          parent,
          field;

      _yuitest_coverline("build/inputex-group/inputex-group.js", 364);
if (descendOnly) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 365);
if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 366);
for (var group, inputs = this.inputs, i = 0, len = inputs.length; i < len; ++i) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 367);
group = inputs[i];
               _yuitest_coverline("build/inputex-group/inputex-group.js", 368);
if (lang.isFunction(group.getFieldByName) &&
                     (field = group.getFieldByName(fieldName, true))) {
                  _yuitest_coverline("build/inputex-group/inputex-group.js", 370);
break;
               }
            }
         }

         _yuitest_coverline("build/inputex-group/inputex-group.js", 375);
return field;
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 378);
while ((parent = search.getParentField()) &&
               lang.isFunction(parent.getFieldByName)) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 380);
search = parent;
         }
         _yuitest_coverline("build/inputex-group/inputex-group.js", 382);
return search.getFieldByName(fieldName, true);
      }
   },


   /**
    * Called when one of the group subfields is updated.
    * @method onChange
    * @param {String} eventName Event name
    * @param {Array} args Array of [fieldValue, fieldInstance] 
    */
   onChange: function(fieldValue, fieldInstance) {

      // Run interactions
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "onChange", 393);
_yuitest_coverline("build/inputex-group/inputex-group.js", 396);
this.runInteractions(fieldInstance,fieldValue);
      
      //this.setClassFromState();
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 400);
this.fireUpdatedEvt();
   },

   /**
    * Run an action (for interactions)
    * @method runAction
    * @param {Object} action inputEx action object
    * @param {Any} triggerValue The value that triggered the interaction
    */
   runAction: function(action, triggerValue) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runAction", 409);
_yuitest_coverline("build/inputex-group/inputex-group.js", 410);
var field = this.getFieldByName(action.name);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 411);
if( lang.isFunction(field[action.action]) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 412);
field[action.action].call(field);
      }
      else {_yuitest_coverline("build/inputex-group/inputex-group.js", 414);
if( lang.isFunction(action.action) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 415);
action.action.call(field, triggerValue);
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 418);
throw new Error("action "+action.action+" is not a valid action for field "+action.name);
      }}
   },
   
   /**
    * Run the interactions for the given field instance
    * @method runInteractions
    * @param {inputEx.Field} fieldInstance Field that just changed
    * @param {Any} fieldValue Field value
    */
   runInteractions: function(fieldInstance,fieldValue) {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runInteractions", 428);
_yuitest_coverline("build/inputex-group/inputex-group.js", 430);
var index = inputEx.indexOf(fieldInstance, this.inputs);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 431);
var fieldConfig = this.options.fields[index];
      _yuitest_coverline("build/inputex-group/inputex-group.js", 432);
if(lang.isUndefined(fieldConfig.interactions) ) {return;}
      
      // Let's run the interactions !
      _yuitest_coverline("build/inputex-group/inputex-group.js", 435);
var interactions = fieldConfig.interactions;
      _yuitest_coverline("build/inputex-group/inputex-group.js", 436);
for(var i = 0 ; i < interactions.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 437);
var interaction = interactions[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 438);
if(interaction.valueTrigger === fieldValue) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 439);
for(var j = 0 ; j < interaction.actions.length ; j++) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 440);
this.runAction(interaction.actions[j], fieldValue);
            }
         }
      }
      
   },
   
   /**
    * Run the interactions for all fields
    * @method runFieldsInteractions
    */
   runFieldsInteractions: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runFieldsInteractions", 451);
_yuitest_coverline("build/inputex-group/inputex-group.js", 452);
if(this.hasInteractions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 453);
for(var i = 0 ; i < this.inputs.length ; i++) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 454);
this.runInteractions(this.inputs[i],this.inputs[i].getValue());
         }
      }
   },
   
	/**
	 * Clear all subfields
	 * @method clear
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	clear: function(sendUpdatedEvt) {
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "clear", 464);
_yuitest_coverline("build/inputex-group/inputex-group.js", 465);
for(var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 466);
this.inputs[i].clear(false);
	   }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 468);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 470);
this.fireUpdatedEvt();
      }
	},
	
	/**
	 * Write error messages for fields as specified in the hash
	 * @method setErrors
	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ ["fieldName", "Message"], ...]
	 */
	setErrors: function(errors) {	
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setErrors", 479);
_yuitest_coverline("build/inputex-group/inputex-group.js", 480);
var i,k;
		_yuitest_coverline("build/inputex-group/inputex-group.js", 481);
if(lang.isArray(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 482);
for(i = 0 ; i < errors.length ; i++) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 483);
k = errors[i][0];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 484);
value = errors[i][1];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 485);
if(this.inputsNames[k]) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 486);
if(this.inputsNames[k].options.showMsg) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 487);
this.inputsNames[k].displayMessage(value);
						_yuitest_coverline("build/inputex-group/inputex-group.js", 488);
Y.one(this.inputsNames[k].divEl).replaceClass("inputEx-valid", "inputEx-invalid" );
					}
				}
			}
		}
		else {_yuitest_coverline("build/inputex-group/inputex-group.js", 493);
if(lang.isObject(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 494);
for(k in errors) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 495);
if(errors.hasOwnProperty(k)) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 496);
if(this.inputsNames[k]) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 497);
if(this.inputsNames[k].options.showMsg) {
							_yuitest_coverline("build/inputex-group/inputex-group.js", 498);
this.inputsNames[k].displayMessage(errors[k]);
							_yuitest_coverline("build/inputex-group/inputex-group.js", 499);
Y.one(this.inputsNames[k].divEl).replaceClass("inputEx-valid", "inputEx-invalid" );
						}
					}
				}
			}
		}}
	},
	
   /**
    * Compatibility with classic forms in listField for instance
    * @method setFieldName
    */
    setFieldName: function(name){
			_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setFieldName", 511);
_yuitest_coverline("build/inputex-group/inputex-group.js", 512);
var l = this.inputs.length;
			_yuitest_coverline("build/inputex-group/inputex-group.js", 513);
for (var i = 0; i < l; i++){
				_yuitest_coverline("build/inputex-group/inputex-group.js", 514);
this.inputs[i].setFieldName(name+""+((this.inputs[i].el && this.inputs[i].el.name )|| "group-"+i ));
			}
    },
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "destroy", 522);
_yuitest_coverline("build/inputex-group/inputex-group.js", 524);
var i, length, field;
      
      // Recursively destroy inputs
      _yuitest_coverline("build/inputex-group/inputex-group.js", 527);
for (i = 0, length = this.inputs.length ; i < length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 528);
field = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 529);
field.destroy();
      }
      
      // Destroy group itself
      _yuitest_coverline("build/inputex-group/inputex-group.js", 533);
inputEx.Group.superclass.destroy.call(this);
      
   }
   
   
});

   
// Register this class as "group" type
_yuitest_coverline("build/inputex-group/inputex-group.js", 542);
inputEx.registerType("group", inputEx.Group, [
   { type: "string", label: "Name", name: "name", value: '' },
   { type: 'string', label: 'Legend', name:'legend'},
   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},
   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},
   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }
], true);


}, '3.1.0',{
  requires: ["inputex-field"]
});


}, '@VERSION@');
