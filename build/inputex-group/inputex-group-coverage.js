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
_yuitest_coverage["build/inputex-group/inputex-group.js"].code=["YUI.add('inputex-group', function (Y, NAME) {","","/**"," * @module inputex-group"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","       ","/**"," * Handle a group of fields"," * @class inputEx.Group"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options The following options are added for Groups and subclasses:"," * <ul>"," *   <li>fields: Array of input fields declared like { label: 'Enter the value:' , type: 'text' or fieldClass: inputEx.Field, optional: true/false, ... }</li>"," *   <li>legend: The legend for the fieldset (default is an empty string)</li>"," *   <li>collapsible: Boolean to make the group collapsible (default is false)</li>"," *   <li>collapsed: If collapsible only, will be collapsed at creation (default is false)</li>"," *   <li>flatten:</li>"," * </ul>"," */","inputEx.Group = function(options) {","   inputEx.Group.superclass.constructor.call(this,options);","   ","   // Run default field interactions (if setValue has not been called before)","   if(!this.options.value) {","      this.runFieldsInteractions();","   }","};","Y.extend(inputEx.Group, inputEx.Field, {","   ","   /**","    * Adds some options: legend, collapsible, fields...","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      ","      inputEx.Group.superclass.setOptions.call(this, options);","      ","      this.options.className = options.className || 'inputEx-Group';","      ","      this.options.fields = options.fields;","      ","      this.options.flatten = options.flatten;","      ","      this.options.legend = options.legend || '';","      ","      this.options.collapsible = lang.isUndefined(options.collapsible) ? false : options.collapsible;","      this.options.collapsed = lang.isUndefined(options.collapsed) ? false : options.collapsed;","      ","      this.options.disabled = lang.isUndefined(options.disabled) ? false : options.disabled;","      ","      // Array containing the list of the field instances","      this.inputs = [];","","      // Associative array containing the field instances by names","      this.inputsNames = {};","   },","","   /**","    * Render the group","    * @method render","    */","   render: function() {","   ","      // Create the div wrapper for this group","      this.divEl = inputEx.cn('div', {className: this.options.className});","      if(this.options.id) {","         this.divEl.id = this.options.id;","      }","      ","      this.renderFields(this.divEl);","      ","      if(this.options.disabled) {","         this.disable();","      }","   },","   ","   /**","    * Render all the fields.","    * We use the parentEl so that inputEx.Form can append them to the FORM tag","    * @method renderFields","    */","   renderFields: function(parentEl) {","      ","      this.fieldset = inputEx.cn('fieldset');","      this.legend = inputEx.cn('legend', {className: 'inputEx-Group-legend'});","   ","      // Option Collapsible","      if(this.options.collapsible) {","         var collapseImg = inputEx.cn('div', {className: 'inputEx-Group-collapseImg'}, null, ' ');","         this.legend.appendChild(collapseImg);","         inputEx.sn(this.fieldset,{className:'inputEx-Expanded'});","      }","   ","      if(!lang.isUndefined(this.options.legend) && this.options.legend !== ''){","         this.legend.appendChild( inputEx.cn(\"span\", null, null, \" \"+this.options.legend) );","      }","   ","      if( this.options.collapsible || (!lang.isUndefined(this.options.legend) && this.options.legend !== '') ) {","         this.fieldset.appendChild(this.legend);","      }","      ","      if(!this.options.fields){","        throw new Error(\"Missing 'fields' property in options\");","      }","      // Iterate this.createInput on input fields","      for (var i = 0 ; i < this.options.fields.length ; i++) {","         var fieldOptions = this.options.fields[i];","         ","         // Throw Error if input is undefined","         if(!fieldOptions) {","            throw new Error(\"inputEx.Form: One of the provided fields is undefined ! (check trailing comma)\");","         }","         ","         // Render the field","         this.addField(fieldOptions);","      }","      ","      // Collapsed at creation ?","      if(this.options.collapsed) {","         this.toggleCollapse();","      }","      ","      // Append the fieldset","      parentEl.appendChild(this.fieldset);","   },","","   /**","    * Render a field and add it to the field set","    * @method addField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   addField: function(fieldOptions) {","		var field = this.renderField(fieldOptions);","      this.fieldset.appendChild(field.getEl() );","	},","","   /**","    * Instanciate one field given its parameters, type or fieldClass","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   renderField: function(fieldOptions) {","","      // Instanciate the field","      var fieldInstance = inputEx(fieldOptions,this);","      ","	   this.inputs.push(fieldInstance);","      ","      // Create an index to access fields by their name","      if(fieldInstance.options.name) {","         this.inputsNames[fieldInstance.options.name] = fieldInstance;","      } ","      // when the instance is a flatten group, we consider his fields as our fields","      if(fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)){","        Y.mix(this.inputsNames,fieldInstance.inputsNames);","        this.inputs = this.inputs.concat(fieldInstance.inputs);","      }","      ","      // Create the this.hasInteractions to run interactions at startup","      if(!this.hasInteractions && fieldOptions.interactions) {","         this.hasInteractions = true;","      }","      ","      // Subscribe to the field \"updated\" event to send the group \"updated\" event","      fieldInstance.on(\"updated\",this.onChange, this);","      ","      return fieldInstance;","   },","  ","   /**","    * Add a listener for the 'collapsible' option","    * @method initEvents","    */","   initEvents: function() {","      if(this.options.collapsible) {","         Y.on(\"click\", this.toggleCollapse,this.legend, this);","      }","   },","","   /**","    * Toggle the collapse state","    * @method toggleCollapse","    */","   toggleCollapse: function() {","      if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {","        Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');","      }","      else {","         Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');","      }","   },","   ","   /**","    * Validate each field","    * @method validate","    * @return {Boolean} true if all fields validate and required fields are not empty","    */","   validate: function() {","      var response = true;","","      // Validate all the sub fields","      for (var i = 0; i < this.inputs.length; i++) {","         var input = this.inputs[i];","         if (!input.isDisabled()) {","            var state = input.getState();","            input.setClassFromState(state); // update field classes (mark invalid fields...)","            if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {","               response = false; // but keep looping on fields to set classes","            }","         }","      }","      return response;","   },","	","	/**","	 * Alternative method to validate for advanced error handling","	 * @method getFieldsStates","	 * @return {Object} with all Forms's fields state, error message","	 * and validate containing a boolean for the global Form validation","	 */","	getFieldsStates: function() {","		var input, inputName, state, message,","		returnedObj = { fields:{}, validate:true };","      ","      // Loop on all the sub fields","      for (var i = 0 ; i < this.inputs.length ; i++) {","         ","         input = this.inputs[i];","         inputName = input.options.name;","         state = input.getState();","         message = input.getStateString(state);","         ","         returnedObj.fields[inputName] = {};","         returnedObj.fields[inputName].valid = true;","         returnedObj.fields[inputName].message = message;","         ","         // check if subfield validates","         if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {","            returnedObj.fields[inputName].valid = false;","            returnedObj.validate = false;","         }","","      }","","      return returnedObj;","	},","   ","   /**","    * Enable all fields in the group","    * @method enable","    */","   enable: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].enable();","      }","   },","   ","   /**","    * Disable all fields in the group","    * @method disable","    */","   disable: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].disable();","      }","   },","   ","   /**","    * Set the values of each field from a key/value hash object","    * @method setValue","    * @param {Any} value The group value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(oValues, sendUpdatedEvt) {","      if(!oValues) {","         return;","      }","	   for (var i = 0 ; i < this.inputs.length ; i++) {","	      var field = this.inputs[i];","	      var name = field.options.name;","	      if(name && !lang.isUndefined(oValues[name]) ) {","	         field.setValue(oValues[name], false); // don't fire the updated event !","	      }","	      else {","	         field.clear(false);","	      }","      }","      ","      this.runFieldsInteractions();","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   /**","    * Return an object with all the values of the fields","    * @method getValue","    */","   getValue: function() {","	   var o = {};","	   for (var i = 0 ; i < this.inputs.length ; i++) {","	      var v = this.inputs[i].getValue();","	      if(this.inputs[i].options.name) {","	         if(this.inputs[i].options.flatten && lang.isObject(v) ) {","	            Y.mix( o, v);","	         }","	         else {","		         o[this.inputs[i].options.name] = v;","	         }","	      }","      }","	   return o;","   },","  ","   /**","    * Close the group (recursively calls \"close\" on each field, does NOT hide the group )","    * Call this function before hidding the group to close any field popup","    * @method close","    */","   close: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].close();","      }","   },","","   /**","    * Set the focus to the first input in the group","    * @method focus","    */","   focus: function() {","      if( this.inputs.length > 0 ) {","         this.inputs[0].focus();","      }","   },","","   /**","    * Return the sub-field instance by its name property","    * @method getFieldByName","    * @param {String} fieldName The name property","    */","   getFieldByName: function(fieldName) {","      if( !this.inputsNames.hasOwnProperty(fieldName) ) {","         return null;","      }","      return this.inputsNames[fieldName];","   },","","   /**","    * Find a field anywhere in the hierarchy this group is a part of.","    * @method findFieldByName","    * @param {String} fieldName The name property","    * @param {Boolean} descendOnly Set true to only look at children of this group","    */","   findFieldByName: function(fieldName, descendOnly) {","      var search = this,","          parent,","          field;","","      if (descendOnly) {","         if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {","            for (var group, inputs = this.inputs, i = 0, len = inputs.length; i < len; ++i) {","               group = inputs[i];","               if (lang.isFunction(group.getFieldByName) &&","                     (field = group.getFieldByName(fieldName, true))) {","                  break;","               }","            }","         }","","         return field;","      }","      else {","         while ((parent = search.getParentField()) &&","               lang.isFunction(parent.getFieldByName)) {","            search = parent;","         }","         return search.getFieldByName(fieldName, true);","      }","   },","","","   /**","    * Called when one of the group subfields is updated.","    * @method onChange","    * @param {String} eventName Event name","    * @param {Array} args Array of [fieldValue, fieldInstance] ","    */","   onChange: function(fieldValue, fieldInstance) {","","      // Run interactions","      this.runInteractions(fieldInstance,fieldValue);","      ","      //this.setClassFromState();","      ","      this.fireUpdatedEvt();","   },","","   /**","    * Run an action (for interactions)","    * @method runAction","    * @param {Object} action inputEx action object","    * @param {Any} triggerValue The value that triggered the interaction","    */","   runAction: function(action, triggerValue) {","      var field = this.getFieldByName(action.name);","      if( lang.isFunction(field[action.action]) ) {","         field[action.action].call(field);","      }","      else if( lang.isFunction(action.action) ) {","         action.action.call(field, triggerValue);","      }","      else {","         throw new Error(\"action \"+action.action+\" is not a valid action for field \"+action.name);","      }","   },","   ","   /**","    * Run the interactions for the given field instance","    * @method runInteractions","    * @param {inputEx.Field} fieldInstance Field that just changed","    * @param {Any} fieldValue Field value","    */","   runInteractions: function(fieldInstance,fieldValue) {","      ","      var index = inputEx.indexOf(fieldInstance, this.inputs);","      var fieldConfig = this.options.fields[index];","      if(lang.isUndefined(fieldConfig.interactions) ) return;","      ","      // Let's run the interactions !","      var interactions = fieldConfig.interactions;","      for(var i = 0 ; i < interactions.length ; i++) {","         var interaction = interactions[i];","         if(interaction.valueTrigger === fieldValue) {","            for(var j = 0 ; j < interaction.actions.length ; j++) {","               this.runAction(interaction.actions[j], fieldValue);","            }","         }","      }","      ","   },","   ","   /**","    * Run the interactions for all fields","    * @method runFieldsInteractions","    */","   runFieldsInteractions: function() {","      if(this.hasInteractions) {","         for(var i = 0 ; i < this.inputs.length ; i++) {","            this.runInteractions(this.inputs[i],this.inputs[i].getValue());","         }","      }","   },","   ","	/**","	 * Clear all subfields","	 * @method clear","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	clear: function(sendUpdatedEvt) {","	   for(var i = 0 ; i < this.inputs.length ; i++) {","	      this.inputs[i].clear(false);","	   }","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","	},","	","	/**","	 * Write error messages for fields as specified in the hash","	 * @method setErrors","	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ [\"fieldName\", \"Message\"], ...]","	 */","	setErrors: function(errors) {	","		var i,k;","		if(lang.isArray(errors)) {","			for(i = 0 ; i < errors.length ; i++) {","				k = errors[i][0];","				value = errors[i][1];","				if(this.inputsNames[k]) {","					if(this.inputsNames[k].options.showMsg) {","						this.inputsNames[k].displayMessage(value);","						Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","					}","				}","			}","		}","		else if(lang.isObject(errors)) {","			for(k in errors) {","				if(errors.hasOwnProperty(k)) {","					if(this.inputsNames[k]) {","						if(this.inputsNames[k].options.showMsg) {","							this.inputsNames[k].displayMessage(errors[k]);","							Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","						}","					}","				}","			}","		}","	},","	","   /**","    * Compatibility with classic forms in listField for instance","    * @method setFieldName","    */","    setFieldName: function(name){","			var l = this.inputs.length;","			for (var i = 0; i < l; i++){","				this.inputs[i].setFieldName(name+\"\"+((this.inputs[i].el && this.inputs[i].el.name )|| \"group-\"+i ));","			}","    },","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, field;","      ","      // Recursively destroy inputs","      for (i = 0, length = this.inputs.length ; i < length ; i++) {","         field = this.inputs[i];","         field.destroy();","      }","      ","      // Destroy group itself","      inputEx.Group.superclass.destroy.call(this);","      ","   }","   ","   ","});","","   ","// Register this class as \"group\" type","inputEx.registerType(\"group\", inputEx.Group, [","   { type: \"string\", label: \"Name\", name: \"name\", value: '' },","   { type: 'string', label: 'Legend', name:'legend'},","   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},","   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},","   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }","], true);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"group\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-group/inputex-group.js"].lines = {"1":0,"6":0,"23":0,"24":0,"27":0,"28":0,"31":0,"40":0,"42":0,"44":0,"46":0,"48":0,"50":0,"51":0,"53":0,"56":0,"59":0,"69":0,"70":0,"71":0,"74":0,"76":0,"77":0,"88":0,"89":0,"92":0,"93":0,"94":0,"95":0,"98":0,"99":0,"102":0,"103":0,"106":0,"107":0,"110":0,"111":0,"114":0,"115":0,"119":0,"123":0,"124":0,"128":0,"137":0,"138":0,"149":0,"151":0,"154":0,"155":0,"158":0,"159":0,"160":0,"164":0,"165":0,"169":0,"171":0,"179":0,"180":0,"189":0,"190":0,"193":0,"203":0,"206":0,"207":0,"208":0,"209":0,"210":0,"211":0,"212":0,"216":0,"226":0,"230":0,"232":0,"233":0,"234":0,"235":0,"237":0,"238":0,"239":0,"242":0,"243":0,"244":0,"249":0,"257":0,"258":0,"267":0,"268":0,"279":0,"280":0,"282":0,"283":0,"284":0,"285":0,"286":0,"289":0,"293":0,"295":0,"297":0,"306":0,"307":0,"308":0,"309":0,"310":0,"311":0,"314":0,"318":0,"327":0,"328":0,"337":0,"338":0,"348":0,"349":0,"351":0,"361":0,"365":0,"366":0,"367":0,"368":0,"369":0,"371":0,"376":0,"379":0,"381":0,"383":0,"397":0,"401":0,"411":0,"412":0,"413":0,"415":0,"416":0,"419":0,"431":0,"432":0,"433":0,"436":0,"437":0,"438":0,"439":0,"440":0,"441":0,"453":0,"454":0,"455":0,"466":0,"467":0,"469":0,"471":0,"481":0,"482":0,"483":0,"484":0,"485":0,"486":0,"487":0,"488":0,"489":0,"494":0,"495":0,"496":0,"497":0,"498":0,"499":0,"500":0,"513":0,"514":0,"515":0,"525":0,"528":0,"529":0,"530":0,"534":0,"543":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].functions = {"Group:23":0,"setOptions:38":0,"render:66":0,"renderFields:86":0,"addField:136":0,"renderField:146":0,"initEvents:178":0,"toggleCollapse:188":0,"validate:202":0,"getFieldsStates:225":0,"enable:256":0,"disable:266":0,"setValue:278":0,"getValue:305":0,"close:326":0,"focus:336":0,"getFieldByName:347":0,"findFieldByName:360":0,"onChange:394":0,"runAction:410":0,"runInteractions:429":0,"runFieldsInteractions:452":0,"clear:465":0,"setErrors:480":0,"setFieldName:512":0,"destroy:523":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].coveredLines = 173;
_yuitest_coverage["build/inputex-group/inputex-group.js"].coveredFunctions = 27;
_yuitest_coverline("build/inputex-group/inputex-group.js", 1);
YUI.add('inputex-group', function (Y, NAME) {

/**
 * @module inputex-group
 */
   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-group/inputex-group.js", 6);
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
_yuitest_coverline("build/inputex-group/inputex-group.js", 23);
inputEx.Group = function(options) {
   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "Group", 23);
_yuitest_coverline("build/inputex-group/inputex-group.js", 24);
inputEx.Group.superclass.constructor.call(this,options);
   
   // Run default field interactions (if setValue has not been called before)
   _yuitest_coverline("build/inputex-group/inputex-group.js", 27);
if(!this.options.value) {
      _yuitest_coverline("build/inputex-group/inputex-group.js", 28);
this.runFieldsInteractions();
   }
};
_yuitest_coverline("build/inputex-group/inputex-group.js", 31);
Y.extend(inputEx.Group, inputEx.Field, {
   
   /**
    * Adds some options: legend, collapsible, fields...
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "setOptions", 38);
_yuitest_coverline("build/inputex-group/inputex-group.js", 40);
inputEx.Group.superclass.setOptions.call(this, options);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 42);
this.options.className = options.className || 'inputEx-Group';
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 44);
this.options.fields = options.fields;
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 46);
this.options.flatten = options.flatten;
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 48);
this.options.legend = options.legend || '';
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 50);
this.options.collapsible = lang.isUndefined(options.collapsible) ? false : options.collapsible;
      _yuitest_coverline("build/inputex-group/inputex-group.js", 51);
this.options.collapsed = lang.isUndefined(options.collapsed) ? false : options.collapsed;
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 53);
this.options.disabled = lang.isUndefined(options.disabled) ? false : options.disabled;
      
      // Array containing the list of the field instances
      _yuitest_coverline("build/inputex-group/inputex-group.js", 56);
this.inputs = [];

      // Associative array containing the field instances by names
      _yuitest_coverline("build/inputex-group/inputex-group.js", 59);
this.inputsNames = {};
   },

   /**
    * Render the group
    * @method render
    */
   render: function() {
   
      // Create the div wrapper for this group
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "render", 66);
_yuitest_coverline("build/inputex-group/inputex-group.js", 69);
this.divEl = inputEx.cn('div', {className: this.options.className});
      _yuitest_coverline("build/inputex-group/inputex-group.js", 70);
if(this.options.id) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 71);
this.divEl.id = this.options.id;
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 74);
this.renderFields(this.divEl);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 76);
if(this.options.disabled) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 77);
this.disable();
      }
   },
   
   /**
    * Render all the fields.
    * We use the parentEl so that inputEx.Form can append them to the FORM tag
    * @method renderFields
    */
   renderFields: function(parentEl) {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "renderFields", 86);
_yuitest_coverline("build/inputex-group/inputex-group.js", 88);
this.fieldset = inputEx.cn('fieldset');
      _yuitest_coverline("build/inputex-group/inputex-group.js", 89);
this.legend = inputEx.cn('legend', {className: 'inputEx-Group-legend'});
   
      // Option Collapsible
      _yuitest_coverline("build/inputex-group/inputex-group.js", 92);
if(this.options.collapsible) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 93);
var collapseImg = inputEx.cn('div', {className: 'inputEx-Group-collapseImg'}, null, ' ');
         _yuitest_coverline("build/inputex-group/inputex-group.js", 94);
this.legend.appendChild(collapseImg);
         _yuitest_coverline("build/inputex-group/inputex-group.js", 95);
inputEx.sn(this.fieldset,{className:'inputEx-Expanded'});
      }
   
      _yuitest_coverline("build/inputex-group/inputex-group.js", 98);
if(!lang.isUndefined(this.options.legend) && this.options.legend !== ''){
         _yuitest_coverline("build/inputex-group/inputex-group.js", 99);
this.legend.appendChild( inputEx.cn("span", null, null, " "+this.options.legend) );
      }
   
      _yuitest_coverline("build/inputex-group/inputex-group.js", 102);
if( this.options.collapsible || (!lang.isUndefined(this.options.legend) && this.options.legend !== '') ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 103);
this.fieldset.appendChild(this.legend);
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 106);
if(!this.options.fields){
        _yuitest_coverline("build/inputex-group/inputex-group.js", 107);
throw new Error("Missing 'fields' property in options");
      }
      // Iterate this.createInput on input fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 110);
for (var i = 0 ; i < this.options.fields.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 111);
var fieldOptions = this.options.fields[i];
         
         // Throw Error if input is undefined
         _yuitest_coverline("build/inputex-group/inputex-group.js", 114);
if(!fieldOptions) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 115);
throw new Error("inputEx.Form: One of the provided fields is undefined ! (check trailing comma)");
         }
         
         // Render the field
         _yuitest_coverline("build/inputex-group/inputex-group.js", 119);
this.addField(fieldOptions);
      }
      
      // Collapsed at creation ?
      _yuitest_coverline("build/inputex-group/inputex-group.js", 123);
if(this.options.collapsed) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 124);
this.toggleCollapse();
      }
      
      // Append the fieldset
      _yuitest_coverline("build/inputex-group/inputex-group.js", 128);
parentEl.appendChild(this.fieldset);
   },

   /**
    * Render a field and add it to the field set
    * @method addField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   addField: function(fieldOptions) {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "addField", 136);
_yuitest_coverline("build/inputex-group/inputex-group.js", 137);
var field = this.renderField(fieldOptions);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 138);
this.fieldset.appendChild(field.getEl() );
	},

   /**
    * Instanciate one field given its parameters, type or fieldClass
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   renderField: function(fieldOptions) {

      // Instanciate the field
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "renderField", 146);
_yuitest_coverline("build/inputex-group/inputex-group.js", 149);
var fieldInstance = inputEx(fieldOptions,this);
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 151);
this.inputs.push(fieldInstance);
      
      // Create an index to access fields by their name
      _yuitest_coverline("build/inputex-group/inputex-group.js", 154);
if(fieldInstance.options.name) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 155);
this.inputsNames[fieldInstance.options.name] = fieldInstance;
      } 
      // when the instance is a flatten group, we consider his fields as our fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 158);
if(fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)){
        _yuitest_coverline("build/inputex-group/inputex-group.js", 159);
Y.mix(this.inputsNames,fieldInstance.inputsNames);
        _yuitest_coverline("build/inputex-group/inputex-group.js", 160);
this.inputs = this.inputs.concat(fieldInstance.inputs);
      }
      
      // Create the this.hasInteractions to run interactions at startup
      _yuitest_coverline("build/inputex-group/inputex-group.js", 164);
if(!this.hasInteractions && fieldOptions.interactions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 165);
this.hasInteractions = true;
      }
      
      // Subscribe to the field "updated" event to send the group "updated" event
      _yuitest_coverline("build/inputex-group/inputex-group.js", 169);
fieldInstance.on("updated",this.onChange, this);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 171);
return fieldInstance;
   },
  
   /**
    * Add a listener for the 'collapsible' option
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "initEvents", 178);
_yuitest_coverline("build/inputex-group/inputex-group.js", 179);
if(this.options.collapsible) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 180);
Y.on("click", this.toggleCollapse,this.legend, this);
      }
   },

   /**
    * Toggle the collapse state
    * @method toggleCollapse
    */
   toggleCollapse: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "toggleCollapse", 188);
_yuitest_coverline("build/inputex-group/inputex-group.js", 189);
if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {
        _yuitest_coverline("build/inputex-group/inputex-group.js", 190);
Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 193);
Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');
      }
   },
   
   /**
    * Validate each field
    * @method validate
    * @return {Boolean} true if all fields validate and required fields are not empty
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "validate", 202);
_yuitest_coverline("build/inputex-group/inputex-group.js", 203);
var response = true;

      // Validate all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 206);
for (var i = 0; i < this.inputs.length; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 207);
var input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 208);
if (!input.isDisabled()) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 209);
var state = input.getState();
            _yuitest_coverline("build/inputex-group/inputex-group.js", 210);
input.setClassFromState(state); // update field classes (mark invalid fields...)
            _yuitest_coverline("build/inputex-group/inputex-group.js", 211);
if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 212);
response = false; // but keep looping on fields to set classes
            }
         }
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 216);
return response;
   },
	
	/**
	 * Alternative method to validate for advanced error handling
	 * @method getFieldsStates
	 * @return {Object} with all Forms's fields state, error message
	 * and validate containing a boolean for the global Form validation
	 */
	getFieldsStates: function() {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldsStates", 225);
_yuitest_coverline("build/inputex-group/inputex-group.js", 226);
var input, inputName, state, message,
		returnedObj = { fields:{}, validate:true };
      
      // Loop on all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 230);
for (var i = 0 ; i < this.inputs.length ; i++) {
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 232);
input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 233);
inputName = input.options.name;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 234);
state = input.getState();
         _yuitest_coverline("build/inputex-group/inputex-group.js", 235);
message = input.getStateString(state);
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 237);
returnedObj.fields[inputName] = {};
         _yuitest_coverline("build/inputex-group/inputex-group.js", 238);
returnedObj.fields[inputName].valid = true;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 239);
returnedObj.fields[inputName].message = message;
         
         // check if subfield validates
         _yuitest_coverline("build/inputex-group/inputex-group.js", 242);
if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 243);
returnedObj.fields[inputName].valid = false;
            _yuitest_coverline("build/inputex-group/inputex-group.js", 244);
returnedObj.validate = false;
         }

      }

      _yuitest_coverline("build/inputex-group/inputex-group.js", 249);
return returnedObj;
	},
   
   /**
    * Enable all fields in the group
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "enable", 256);
_yuitest_coverline("build/inputex-group/inputex-group.js", 257);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 258);
this.inputs[i].enable();
      }
   },
   
   /**
    * Disable all fields in the group
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "disable", 266);
_yuitest_coverline("build/inputex-group/inputex-group.js", 267);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 268);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "setValue", 278);
_yuitest_coverline("build/inputex-group/inputex-group.js", 279);
if(!oValues) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 280);
return;
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 282);
for (var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 283);
var field = this.inputs[i];
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 284);
var name = field.options.name;
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 285);
if(name && !lang.isUndefined(oValues[name]) ) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 286);
field.setValue(oValues[name], false); // don't fire the updated event !
	      }
	      else {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 289);
field.clear(false);
	      }
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 293);
this.runFieldsInteractions();
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 295);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 297);
this.fireUpdatedEvt();
      }
   },
   
   /**
    * Return an object with all the values of the fields
    * @method getValue
    */
   getValue: function() {
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getValue", 305);
_yuitest_coverline("build/inputex-group/inputex-group.js", 306);
var o = {};
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 307);
for (var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 308);
var v = this.inputs[i].getValue();
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 309);
if(this.inputs[i].options.name) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 310);
if(this.inputs[i].options.flatten && lang.isObject(v) ) {
	            _yuitest_coverline("build/inputex-group/inputex-group.js", 311);
Y.mix( o, v);
	         }
	         else {
		         _yuitest_coverline("build/inputex-group/inputex-group.js", 314);
o[this.inputs[i].options.name] = v;
	         }
	      }
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 318);
return o;
   },
  
   /**
    * Close the group (recursively calls "close" on each field, does NOT hide the group )
    * Call this function before hidding the group to close any field popup
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "close", 326);
_yuitest_coverline("build/inputex-group/inputex-group.js", 327);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 328);
this.inputs[i].close();
      }
   },

   /**
    * Set the focus to the first input in the group
    * @method focus
    */
   focus: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "focus", 336);
_yuitest_coverline("build/inputex-group/inputex-group.js", 337);
if( this.inputs.length > 0 ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 338);
this.inputs[0].focus();
      }
   },

   /**
    * Return the sub-field instance by its name property
    * @method getFieldByName
    * @param {String} fieldName The name property
    */
   getFieldByName: function(fieldName) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldByName", 347);
_yuitest_coverline("build/inputex-group/inputex-group.js", 348);
if( !this.inputsNames.hasOwnProperty(fieldName) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 349);
return null;
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 351);
return this.inputsNames[fieldName];
   },

   /**
    * Find a field anywhere in the hierarchy this group is a part of.
    * @method findFieldByName
    * @param {String} fieldName The name property
    * @param {Boolean} descendOnly Set true to only look at children of this group
    */
   findFieldByName: function(fieldName, descendOnly) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "findFieldByName", 360);
_yuitest_coverline("build/inputex-group/inputex-group.js", 361);
var search = this,
          parent,
          field;

      _yuitest_coverline("build/inputex-group/inputex-group.js", 365);
if (descendOnly) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 366);
if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 367);
for (var group, inputs = this.inputs, i = 0, len = inputs.length; i < len; ++i) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 368);
group = inputs[i];
               _yuitest_coverline("build/inputex-group/inputex-group.js", 369);
if (lang.isFunction(group.getFieldByName) &&
                     (field = group.getFieldByName(fieldName, true))) {
                  _yuitest_coverline("build/inputex-group/inputex-group.js", 371);
break;
               }
            }
         }

         _yuitest_coverline("build/inputex-group/inputex-group.js", 376);
return field;
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 379);
while ((parent = search.getParentField()) &&
               lang.isFunction(parent.getFieldByName)) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 381);
search = parent;
         }
         _yuitest_coverline("build/inputex-group/inputex-group.js", 383);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "onChange", 394);
_yuitest_coverline("build/inputex-group/inputex-group.js", 397);
this.runInteractions(fieldInstance,fieldValue);
      
      //this.setClassFromState();
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 401);
this.fireUpdatedEvt();
   },

   /**
    * Run an action (for interactions)
    * @method runAction
    * @param {Object} action inputEx action object
    * @param {Any} triggerValue The value that triggered the interaction
    */
   runAction: function(action, triggerValue) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runAction", 410);
_yuitest_coverline("build/inputex-group/inputex-group.js", 411);
var field = this.getFieldByName(action.name);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 412);
if( lang.isFunction(field[action.action]) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 413);
field[action.action].call(field);
      }
      else {_yuitest_coverline("build/inputex-group/inputex-group.js", 415);
if( lang.isFunction(action.action) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 416);
action.action.call(field, triggerValue);
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 419);
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
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runInteractions", 429);
_yuitest_coverline("build/inputex-group/inputex-group.js", 431);
var index = inputEx.indexOf(fieldInstance, this.inputs);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 432);
var fieldConfig = this.options.fields[index];
      _yuitest_coverline("build/inputex-group/inputex-group.js", 433);
if(lang.isUndefined(fieldConfig.interactions) ) {return;}
      
      // Let's run the interactions !
      _yuitest_coverline("build/inputex-group/inputex-group.js", 436);
var interactions = fieldConfig.interactions;
      _yuitest_coverline("build/inputex-group/inputex-group.js", 437);
for(var i = 0 ; i < interactions.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 438);
var interaction = interactions[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 439);
if(interaction.valueTrigger === fieldValue) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 440);
for(var j = 0 ; j < interaction.actions.length ; j++) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 441);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runFieldsInteractions", 452);
_yuitest_coverline("build/inputex-group/inputex-group.js", 453);
if(this.hasInteractions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 454);
for(var i = 0 ; i < this.inputs.length ; i++) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 455);
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
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "clear", 465);
_yuitest_coverline("build/inputex-group/inputex-group.js", 466);
for(var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 467);
this.inputs[i].clear(false);
	   }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 469);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 471);
this.fireUpdatedEvt();
      }
	},
	
	/**
	 * Write error messages for fields as specified in the hash
	 * @method setErrors
	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ ["fieldName", "Message"], ...]
	 */
	setErrors: function(errors) {	
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setErrors", 480);
_yuitest_coverline("build/inputex-group/inputex-group.js", 481);
var i,k;
		_yuitest_coverline("build/inputex-group/inputex-group.js", 482);
if(lang.isArray(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 483);
for(i = 0 ; i < errors.length ; i++) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 484);
k = errors[i][0];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 485);
value = errors[i][1];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 486);
if(this.inputsNames[k]) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 487);
if(this.inputsNames[k].options.showMsg) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 488);
this.inputsNames[k].displayMessage(value);
						_yuitest_coverline("build/inputex-group/inputex-group.js", 489);
Y.one(this.inputsNames[k].divEl).replaceClass("inputEx-valid", "inputEx-invalid" );
					}
				}
			}
		}
		else {_yuitest_coverline("build/inputex-group/inputex-group.js", 494);
if(lang.isObject(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 495);
for(k in errors) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 496);
if(errors.hasOwnProperty(k)) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 497);
if(this.inputsNames[k]) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 498);
if(this.inputsNames[k].options.showMsg) {
							_yuitest_coverline("build/inputex-group/inputex-group.js", 499);
this.inputsNames[k].displayMessage(errors[k]);
							_yuitest_coverline("build/inputex-group/inputex-group.js", 500);
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
			_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setFieldName", 512);
_yuitest_coverline("build/inputex-group/inputex-group.js", 513);
var l = this.inputs.length;
			_yuitest_coverline("build/inputex-group/inputex-group.js", 514);
for (var i = 0; i < l; i++){
				_yuitest_coverline("build/inputex-group/inputex-group.js", 515);
this.inputs[i].setFieldName(name+""+((this.inputs[i].el && this.inputs[i].el.name )|| "group-"+i ));
			}
    },
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "destroy", 523);
_yuitest_coverline("build/inputex-group/inputex-group.js", 525);
var i, length, field;
      
      // Recursively destroy inputs
      _yuitest_coverline("build/inputex-group/inputex-group.js", 528);
for (i = 0, length = this.inputs.length ; i < length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 529);
field = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 530);
field.destroy();
      }
      
      // Destroy group itself
      _yuitest_coverline("build/inputex-group/inputex-group.js", 534);
inputEx.Group.superclass.destroy.call(this);
      
   }
   
   
});

   
// Register this class as "group" type
_yuitest_coverline("build/inputex-group/inputex-group.js", 543);
inputEx.registerType("group", inputEx.Group, [
   { type: "string", label: "Name", name: "name", value: '' },
   { type: 'string', label: 'Legend', name:'legend'},
   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},
   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},
   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }
], true);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "group", "skinnable": true});
