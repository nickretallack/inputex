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
_yuitest_coverage["build/inputex-group/inputex-group.js"].code=["YUI.add('inputex-group', function (Y, NAME) {","","/**"," * @module inputex-group"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","       ","/**"," * Handle a group of fields"," * @class inputEx.Group"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options The following options are added for Groups and subclasses:"," * <ul>"," *   <li>fields: Array of input fields declared like { label: 'Enter the value:' , type: 'text' or fieldClass: inputEx.Field, optional: true/false, ... }</li>"," *   <li>legend: The legend for the fieldset (default is an empty string)</li>"," *   <li>collapsible: Boolean to make the group collapsible (default is false)</li>"," *   <li>collapsed: If collapsible only, will be collapsed at creation (default is false)</li>"," *   <li>flatten:</li>"," * </ul>"," */","inputEx.Group = function(options) {","   inputEx.Group.superclass.constructor.call(this,options);","   ","   // Run default field interactions (if setValue has not been called before)","   if(!this.options.value) {","      this.runFieldsInteractions();","   }","};","Y.extend(inputEx.Group, inputEx.Field, {","   ","   /**","    * Adds some options: legend, collapsible, fields...","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      ","      inputEx.Group.superclass.setOptions.call(this, options);","      ","      this.options.className = options.className || 'inputEx-Group';","      ","      this.options.fields = options.fields;","      ","      this.options.flatten = options.flatten;","      ","      this.options.legend = options.legend || '';","      ","      this.options.collapsible = lang.isUndefined(options.collapsible) ? false : options.collapsible;","      this.options.collapsed = lang.isUndefined(options.collapsed) ? false : options.collapsed;","      ","      this.options.disabled = lang.isUndefined(options.disabled) ? false : options.disabled;","      ","      // Array containing the list of the field instances","      this.inputs = [];","","      // Associative array containing the field instances by names","      this.inputsNames = {};","   },","","   /**","    * Render the group","    * @method render","    */","   render: function() {","   ","      // Create the div wrapper for this group","      this.divEl = inputEx.cn('div', {className: this.options.className});","      if(this.options.id) {","         this.divEl.id = this.options.id;","      }","      ","      this.renderFields(this.divEl);","      ","      if(this.options.disabled) {","         this.disable();","      }","   },","   ","   /**","    * Render all the fields.","    * We use the parentEl so that inputEx.Form can append them to the FORM tag","    * @method renderFields","    */","   renderFields: function(parentEl) {","      ","      this.fieldset = inputEx.cn('fieldset');","      this.legend = inputEx.cn('legend', {className: 'inputEx-Group-legend'});","   ","      // Option Collapsible","      if(this.options.collapsible) {","         var collapseImg = inputEx.cn('div', {className: 'inputEx-Group-collapseImg'}, null, ' ');","         this.legend.appendChild(collapseImg);","         inputEx.sn(this.fieldset,{className:'inputEx-Expanded'});","      }","   ","      if(!lang.isUndefined(this.options.legend) && this.options.legend !== ''){","         this.legend.appendChild( inputEx.cn(\"span\", null, null, \" \"+this.options.legend) );","      }","   ","      if( this.options.collapsible || (!lang.isUndefined(this.options.legend) && this.options.legend !== '') ) {","         this.fieldset.appendChild(this.legend);","      }","      ","      // Iterate this.createInput on input fields","      for (var i = 0 ; i < this.options.fields.length ; i++) {","         var fieldOptions = this.options.fields[i];","         ","         // Throw Error if input is undefined","         if(!fieldOptions) {","            throw new Error(\"inputEx.Form: One of the provided fields is undefined ! (check trailing comma)\");","         }","         ","         // Render the field","         this.addField(fieldOptions);","      }","      ","      // Collapsed at creation ?","      if(this.options.collapsed) {","         this.toggleCollapse();","      }","      ","      // Append the fieldset","      parentEl.appendChild(this.fieldset);","   },","","   /**","    * Render a field and add it to the field set","    * @method addField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   addField: function(fieldOptions) {","		var field = this.renderField(fieldOptions);","      this.fieldset.appendChild(field.getEl() );","	},","","   /**","    * Instanciate one field given its parameters, type or fieldClass","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   renderField: function(fieldOptions) {","","      // Instanciate the field","      var fieldInstance = inputEx(fieldOptions,this);","      ","	   this.inputs.push(fieldInstance);","      ","      // Create an index to access fields by their name","      if(fieldInstance.options.name) {","         this.inputsNames[fieldInstance.options.name] = fieldInstance;","      } ","      // when the instance is a flatten group, we consider his fields as our fields","      if(fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)){","        Y.mix(this.inputsNames,fieldInstance.inputsNames);","        this.inputs = this.inputs.concat(fieldInstance.inputs);","      }","      ","      // Create the this.hasInteractions to run interactions at startup","      if(!this.hasInteractions && fieldOptions.interactions) {","         this.hasInteractions = true;","      }","      ","      // Subscribe to the field \"updated\" event to send the group \"updated\" event","      fieldInstance.on(\"updated\",this.onChange, this);","      ","      return fieldInstance;","   },","  ","   /**","    * Add a listener for the 'collapsible' option","    * @method initEvents","    */","   initEvents: function() {","      if(this.options.collapsible) {","         Y.on(\"click\", this.toggleCollapse,this.legend, this);","      }","   },","","   /**","    * Toggle the collapse state","    * @method toggleCollapse","    */","   toggleCollapse: function() {","      if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {","        Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');","      }","      else {","         Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');","      }","   },","   ","   /**","    * Validate each field","    * @method validate","    * @return {Boolean} true if all fields validate and required fields are not empty","    */","   validate: function() {","      var response = true;","","      // Validate all the sub fields","      for (var i = 0; i < this.inputs.length; i++) {","         var input = this.inputs[i];","         if (!input.isDisabled()) {","            var state = input.getState();","            input.setClassFromState(state); // update field classes (mark invalid fields...)","            if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {","               response = false; // but keep looping on fields to set classes","            }","         }","      }","      return response;","   },","	","	/**","	 * Alternative method to validate for advanced error handling","	 * @method getFieldsStates","	 * @return {Object} with all Forms's fields state, error message","	 * and validate containing a boolean for the global Form validation","	 */","	getFieldsStates: function() {","		var input, inputName, state, message,","		returnedObj = { fields:{}, validate:true };","      ","      // Loop on all the sub fields","      for (var i = 0 ; i < this.inputs.length ; i++) {","         ","         input = this.inputs[i];","         inputName = input.options.name;","         state = input.getState();","         message = input.getStateString(state);","         ","         returnedObj.fields[inputName] = {};","         returnedObj.fields[inputName].valid = true;","         returnedObj.fields[inputName].message = message;","         ","         // check if subfield validates","         if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {","            returnedObj.fields[inputName].valid = false;","            returnedObj.validate = false;","         }","","      }","","      return returnedObj;","	},","   ","   /**","    * Enable all fields in the group","    * @method enable","    */","   enable: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].enable();","      }","   },","   ","   /**","    * Disable all fields in the group","    * @method disable","    */","   disable: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].disable();","      }","   },","   ","   /**","    * Set the values of each field from a key/value hash object","    * @method setValue","    * @param {Any} value The group value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(oValues, sendUpdatedEvt) {","      if(!oValues) {","         return;","      }","	   for (var i = 0 ; i < this.inputs.length ; i++) {","	      var field = this.inputs[i];","	      var name = field.options.name;","	      if(name && !lang.isUndefined(oValues[name]) ) {","	         field.setValue(oValues[name], false); // don't fire the updated event !","	      }","	      else {","	         field.clear(false);","	      }","      }","      ","      this.runFieldsInteractions();","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   /**","    * Return an object with all the values of the fields","    * @method getValue","    */","   getValue: function() {","	   var o = {};","	   for (var i = 0 ; i < this.inputs.length ; i++) {","	      var v = this.inputs[i].getValue();","	      if(this.inputs[i].options.name) {","	         if(this.inputs[i].options.flatten && lang.isObject(v) ) {","	            Y.mix( o, v);","	         }","	         else {","		         o[this.inputs[i].options.name] = v;","	         }","	      }","      }","	   return o;","   },","  ","   /**","    * Close the group (recursively calls \"close\" on each field, does NOT hide the group )","    * Call this function before hidding the group to close any field popup","    * @method close","    */","   close: function() {","      for (var i = 0 ; i < this.inputs.length ; i++) {","         this.inputs[i].close();","      }","   },","","   /**","    * Set the focus to the first input in the group","    * @method focus","    */","   focus: function() {","      if( this.inputs.length > 0 ) {","         this.inputs[0].focus();","      }","   },","","   /**","    * Return the sub-field instance by its name property","    * @method getFieldByName","    * @param {String} fieldName The name property","    */","   getFieldByName: function(fieldName) {","      if( !this.inputsNames.hasOwnProperty(fieldName) ) {","         return null;","      }","      return this.inputsNames[fieldName];","   },","","   /**","    * Find a field anywhere in the hierarchy this group is a part of.","    * @method findFieldByName","    * @param {String} fieldName The name property","    * @param {Boolean} descendOnly Set true to only look at children of this group","    */","   findFieldByName: function(fieldName, descendOnly) {","      var search = this,","          parent,","          field;","","      if (descendOnly) {","         if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {","            for (var group, inputs = this.inputs, i = 0, len = inputs.length; i < len; ++i) {","               group = inputs[i];","               if (lang.isFunction(group.getFieldByName) &&","                     (field = group.getFieldByName(fieldName, true))) {","                  break;","               }","            }","         }","","         return field;","      }","      else {","         while ((parent = search.getParentField()) &&","               lang.isFunction(parent.getFieldByName)) {","            search = parent;","         }","         return search.getFieldByName(fieldName, true);","      }","   },","","","   /**","    * Called when one of the group subfields is updated.","    * @method onChange","    * @param {String} eventName Event name","    * @param {Array} args Array of [fieldValue, fieldInstance] ","    */","   onChange: function(fieldValue, fieldInstance) {","","      // Run interactions","      this.runInteractions(fieldInstance,fieldValue);","      ","      //this.setClassFromState();","      ","      this.fireUpdatedEvt();","   },","","   /**","    * Run an action (for interactions)","    * @method runAction","    * @param {Object} action inputEx action object","    * @param {Any} triggerValue The value that triggered the interaction","    */","   runAction: function(action, triggerValue) {","      var field = this.getFieldByName(action.name);","      if( lang.isFunction(field[action.action]) ) {","         field[action.action].call(field);","      }","      else if( lang.isFunction(action.action) ) {","         action.action.call(field, triggerValue);","      }","      else {","         throw new Error(\"action \"+action.action+\" is not a valid action for field \"+action.name);","      }","   },","   ","   /**","    * Run the interactions for the given field instance","    * @method runInteractions","    * @param {inputEx.Field} fieldInstance Field that just changed","    * @param {Any} fieldValue Field value","    */","   runInteractions: function(fieldInstance,fieldValue) {","      ","      var index = inputEx.indexOf(fieldInstance, this.inputs);","      var fieldConfig = this.options.fields[index];","      if(lang.isUndefined(fieldConfig.interactions) ) return;","      ","      // Let's run the interactions !","      var interactions = fieldConfig.interactions;","      for(var i = 0 ; i < interactions.length ; i++) {","         var interaction = interactions[i];","         if(interaction.valueTrigger === fieldValue) {","            for(var j = 0 ; j < interaction.actions.length ; j++) {","               this.runAction(interaction.actions[j], fieldValue);","            }","         }","      }","      ","   },","   ","   /**","    * Run the interactions for all fields","    * @method runFieldsInteractions","    */","   runFieldsInteractions: function() {","      if(this.hasInteractions) {","         for(var i = 0 ; i < this.inputs.length ; i++) {","            this.runInteractions(this.inputs[i],this.inputs[i].getValue());","         }","      }","   },","   ","	/**","	 * Clear all subfields","	 * @method clear","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	clear: function(sendUpdatedEvt) {","	   for(var i = 0 ; i < this.inputs.length ; i++) {","	      this.inputs[i].clear(false);","	   }","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","	},","	","	/**","	 * Write error messages for fields as specified in the hash","	 * @method setErrors","	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ [\"fieldName\", \"Message\"], ...]","	 */","	setErrors: function(errors) {	","		var i,k;","		if(lang.isArray(errors)) {","			for(i = 0 ; i < errors.length ; i++) {","				k = errors[i][0];","				value = errors[i][1];","				if(this.inputsNames[k]) {","					if(this.inputsNames[k].options.showMsg) {","						this.inputsNames[k].displayMessage(value);","						Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","					}","				}","			}","		}","		else if(lang.isObject(errors)) {","			for(k in errors) {","				if(errors.hasOwnProperty(k)) {","					if(this.inputsNames[k]) {","						if(this.inputsNames[k].options.showMsg) {","							this.inputsNames[k].displayMessage(errors[k]);","							Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","						}","					}","				}","			}","		}","	},","	","   /**","    * Compatibility with classic forms in listField for instance","    * @method setFieldName","    */","    setFieldName: function(name){","			var l = this.inputs.length;","			for (var i = 0; i < l; i++){","				this.inputs[i].setFieldName(name+\"\"+((this.inputs[i].el && this.inputs[i].el.name )|| \"group-\"+i ));","			}","    },","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, field;","      ","      // Recursively destroy inputs","      for (i = 0, length = this.inputs.length ; i < length ; i++) {","         field = this.inputs[i];","         field.destroy();","      }","      ","      // Destroy group itself","      inputEx.Group.superclass.destroy.call(this);","      ","   }","   ","   ","});","","   ","// Register this class as \"group\" type","inputEx.registerType(\"group\", inputEx.Group, [","   { type: \"string\", label: \"Name\", name: \"name\", value: '' },","   { type: 'string', label: 'Legend', name:'legend'},","   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},","   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},","   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }","], true);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"group\"});"];
_yuitest_coverage["build/inputex-group/inputex-group.js"].lines = {"1":0,"6":0,"23":0,"24":0,"27":0,"28":0,"31":0,"40":0,"42":0,"44":0,"46":0,"48":0,"50":0,"51":0,"53":0,"56":0,"59":0,"69":0,"70":0,"71":0,"74":0,"76":0,"77":0,"88":0,"89":0,"92":0,"93":0,"94":0,"95":0,"98":0,"99":0,"102":0,"103":0,"107":0,"108":0,"111":0,"112":0,"116":0,"120":0,"121":0,"125":0,"134":0,"135":0,"146":0,"148":0,"151":0,"152":0,"155":0,"156":0,"157":0,"161":0,"162":0,"166":0,"168":0,"176":0,"177":0,"186":0,"187":0,"190":0,"200":0,"203":0,"204":0,"205":0,"206":0,"207":0,"208":0,"209":0,"213":0,"223":0,"227":0,"229":0,"230":0,"231":0,"232":0,"234":0,"235":0,"236":0,"239":0,"240":0,"241":0,"246":0,"254":0,"255":0,"264":0,"265":0,"276":0,"277":0,"279":0,"280":0,"281":0,"282":0,"283":0,"286":0,"290":0,"292":0,"294":0,"303":0,"304":0,"305":0,"306":0,"307":0,"308":0,"311":0,"315":0,"324":0,"325":0,"334":0,"335":0,"345":0,"346":0,"348":0,"358":0,"362":0,"363":0,"364":0,"365":0,"366":0,"368":0,"373":0,"376":0,"378":0,"380":0,"394":0,"398":0,"408":0,"409":0,"410":0,"412":0,"413":0,"416":0,"428":0,"429":0,"430":0,"433":0,"434":0,"435":0,"436":0,"437":0,"438":0,"450":0,"451":0,"452":0,"463":0,"464":0,"466":0,"468":0,"478":0,"479":0,"480":0,"481":0,"482":0,"483":0,"484":0,"485":0,"486":0,"491":0,"492":0,"493":0,"494":0,"495":0,"496":0,"497":0,"510":0,"511":0,"512":0,"522":0,"525":0,"526":0,"527":0,"531":0,"540":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].functions = {"Group:23":0,"setOptions:38":0,"render:66":0,"renderFields:86":0,"addField:133":0,"renderField:143":0,"initEvents:175":0,"toggleCollapse:185":0,"validate:199":0,"getFieldsStates:222":0,"enable:253":0,"disable:263":0,"setValue:275":0,"getValue:302":0,"close:323":0,"focus:333":0,"getFieldByName:344":0,"findFieldByName:357":0,"onChange:391":0,"runAction:407":0,"runInteractions:426":0,"runFieldsInteractions:449":0,"clear:462":0,"setErrors:477":0,"setFieldName:509":0,"destroy:520":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].coveredLines = 171;
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
      
      // Iterate this.createInput on input fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 107);
for (var i = 0 ; i < this.options.fields.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 108);
var fieldOptions = this.options.fields[i];
         
         // Throw Error if input is undefined
         _yuitest_coverline("build/inputex-group/inputex-group.js", 111);
if(!fieldOptions) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 112);
throw new Error("inputEx.Form: One of the provided fields is undefined ! (check trailing comma)");
         }
         
         // Render the field
         _yuitest_coverline("build/inputex-group/inputex-group.js", 116);
this.addField(fieldOptions);
      }
      
      // Collapsed at creation ?
      _yuitest_coverline("build/inputex-group/inputex-group.js", 120);
if(this.options.collapsed) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 121);
this.toggleCollapse();
      }
      
      // Append the fieldset
      _yuitest_coverline("build/inputex-group/inputex-group.js", 125);
parentEl.appendChild(this.fieldset);
   },

   /**
    * Render a field and add it to the field set
    * @method addField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   addField: function(fieldOptions) {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "addField", 133);
_yuitest_coverline("build/inputex-group/inputex-group.js", 134);
var field = this.renderField(fieldOptions);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 135);
this.fieldset.appendChild(field.getEl() );
	},

   /**
    * Instanciate one field given its parameters, type or fieldClass
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   renderField: function(fieldOptions) {

      // Instanciate the field
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "renderField", 143);
_yuitest_coverline("build/inputex-group/inputex-group.js", 146);
var fieldInstance = inputEx(fieldOptions,this);
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 148);
this.inputs.push(fieldInstance);
      
      // Create an index to access fields by their name
      _yuitest_coverline("build/inputex-group/inputex-group.js", 151);
if(fieldInstance.options.name) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 152);
this.inputsNames[fieldInstance.options.name] = fieldInstance;
      } 
      // when the instance is a flatten group, we consider his fields as our fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 155);
if(fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)){
        _yuitest_coverline("build/inputex-group/inputex-group.js", 156);
Y.mix(this.inputsNames,fieldInstance.inputsNames);
        _yuitest_coverline("build/inputex-group/inputex-group.js", 157);
this.inputs = this.inputs.concat(fieldInstance.inputs);
      }
      
      // Create the this.hasInteractions to run interactions at startup
      _yuitest_coverline("build/inputex-group/inputex-group.js", 161);
if(!this.hasInteractions && fieldOptions.interactions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 162);
this.hasInteractions = true;
      }
      
      // Subscribe to the field "updated" event to send the group "updated" event
      _yuitest_coverline("build/inputex-group/inputex-group.js", 166);
fieldInstance.on("updated",this.onChange, this);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 168);
return fieldInstance;
   },
  
   /**
    * Add a listener for the 'collapsible' option
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "initEvents", 175);
_yuitest_coverline("build/inputex-group/inputex-group.js", 176);
if(this.options.collapsible) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 177);
Y.on("click", this.toggleCollapse,this.legend, this);
      }
   },

   /**
    * Toggle the collapse state
    * @method toggleCollapse
    */
   toggleCollapse: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "toggleCollapse", 185);
_yuitest_coverline("build/inputex-group/inputex-group.js", 186);
if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {
        _yuitest_coverline("build/inputex-group/inputex-group.js", 187);
Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 190);
Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');
      }
   },
   
   /**
    * Validate each field
    * @method validate
    * @return {Boolean} true if all fields validate and required fields are not empty
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "validate", 199);
_yuitest_coverline("build/inputex-group/inputex-group.js", 200);
var response = true;

      // Validate all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 203);
for (var i = 0; i < this.inputs.length; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 204);
var input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 205);
if (!input.isDisabled()) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 206);
var state = input.getState();
            _yuitest_coverline("build/inputex-group/inputex-group.js", 207);
input.setClassFromState(state); // update field classes (mark invalid fields...)
            _yuitest_coverline("build/inputex-group/inputex-group.js", 208);
if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 209);
response = false; // but keep looping on fields to set classes
            }
         }
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 213);
return response;
   },
	
	/**
	 * Alternative method to validate for advanced error handling
	 * @method getFieldsStates
	 * @return {Object} with all Forms's fields state, error message
	 * and validate containing a boolean for the global Form validation
	 */
	getFieldsStates: function() {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldsStates", 222);
_yuitest_coverline("build/inputex-group/inputex-group.js", 223);
var input, inputName, state, message,
		returnedObj = { fields:{}, validate:true };
      
      // Loop on all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 227);
for (var i = 0 ; i < this.inputs.length ; i++) {
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 229);
input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 230);
inputName = input.options.name;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 231);
state = input.getState();
         _yuitest_coverline("build/inputex-group/inputex-group.js", 232);
message = input.getStateString(state);
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 234);
returnedObj.fields[inputName] = {};
         _yuitest_coverline("build/inputex-group/inputex-group.js", 235);
returnedObj.fields[inputName].valid = true;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 236);
returnedObj.fields[inputName].message = message;
         
         // check if subfield validates
         _yuitest_coverline("build/inputex-group/inputex-group.js", 239);
if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 240);
returnedObj.fields[inputName].valid = false;
            _yuitest_coverline("build/inputex-group/inputex-group.js", 241);
returnedObj.validate = false;
         }

      }

      _yuitest_coverline("build/inputex-group/inputex-group.js", 246);
return returnedObj;
	},
   
   /**
    * Enable all fields in the group
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "enable", 253);
_yuitest_coverline("build/inputex-group/inputex-group.js", 254);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 255);
this.inputs[i].enable();
      }
   },
   
   /**
    * Disable all fields in the group
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "disable", 263);
_yuitest_coverline("build/inputex-group/inputex-group.js", 264);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 265);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "setValue", 275);
_yuitest_coverline("build/inputex-group/inputex-group.js", 276);
if(!oValues) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 277);
return;
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 279);
for (var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 280);
var field = this.inputs[i];
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 281);
var name = field.options.name;
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 282);
if(name && !lang.isUndefined(oValues[name]) ) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 283);
field.setValue(oValues[name], false); // don't fire the updated event !
	      }
	      else {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 286);
field.clear(false);
	      }
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 290);
this.runFieldsInteractions();
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 292);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 294);
this.fireUpdatedEvt();
      }
   },
   
   /**
    * Return an object with all the values of the fields
    * @method getValue
    */
   getValue: function() {
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getValue", 302);
_yuitest_coverline("build/inputex-group/inputex-group.js", 303);
var o = {};
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 304);
for (var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 305);
var v = this.inputs[i].getValue();
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 306);
if(this.inputs[i].options.name) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 307);
if(this.inputs[i].options.flatten && lang.isObject(v) ) {
	            _yuitest_coverline("build/inputex-group/inputex-group.js", 308);
Y.mix( o, v);
	         }
	         else {
		         _yuitest_coverline("build/inputex-group/inputex-group.js", 311);
o[this.inputs[i].options.name] = v;
	         }
	      }
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 315);
return o;
   },
  
   /**
    * Close the group (recursively calls "close" on each field, does NOT hide the group )
    * Call this function before hidding the group to close any field popup
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "close", 323);
_yuitest_coverline("build/inputex-group/inputex-group.js", 324);
for (var i = 0 ; i < this.inputs.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 325);
this.inputs[i].close();
      }
   },

   /**
    * Set the focus to the first input in the group
    * @method focus
    */
   focus: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "focus", 333);
_yuitest_coverline("build/inputex-group/inputex-group.js", 334);
if( this.inputs.length > 0 ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 335);
this.inputs[0].focus();
      }
   },

   /**
    * Return the sub-field instance by its name property
    * @method getFieldByName
    * @param {String} fieldName The name property
    */
   getFieldByName: function(fieldName) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldByName", 344);
_yuitest_coverline("build/inputex-group/inputex-group.js", 345);
if( !this.inputsNames.hasOwnProperty(fieldName) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 346);
return null;
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 348);
return this.inputsNames[fieldName];
   },

   /**
    * Find a field anywhere in the hierarchy this group is a part of.
    * @method findFieldByName
    * @param {String} fieldName The name property
    * @param {Boolean} descendOnly Set true to only look at children of this group
    */
   findFieldByName: function(fieldName, descendOnly) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "findFieldByName", 357);
_yuitest_coverline("build/inputex-group/inputex-group.js", 358);
var search = this,
          parent,
          field;

      _yuitest_coverline("build/inputex-group/inputex-group.js", 362);
if (descendOnly) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 363);
if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 364);
for (var group, inputs = this.inputs, i = 0, len = inputs.length; i < len; ++i) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 365);
group = inputs[i];
               _yuitest_coverline("build/inputex-group/inputex-group.js", 366);
if (lang.isFunction(group.getFieldByName) &&
                     (field = group.getFieldByName(fieldName, true))) {
                  _yuitest_coverline("build/inputex-group/inputex-group.js", 368);
break;
               }
            }
         }

         _yuitest_coverline("build/inputex-group/inputex-group.js", 373);
return field;
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 376);
while ((parent = search.getParentField()) &&
               lang.isFunction(parent.getFieldByName)) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 378);
search = parent;
         }
         _yuitest_coverline("build/inputex-group/inputex-group.js", 380);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "onChange", 391);
_yuitest_coverline("build/inputex-group/inputex-group.js", 394);
this.runInteractions(fieldInstance,fieldValue);
      
      //this.setClassFromState();
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 398);
this.fireUpdatedEvt();
   },

   /**
    * Run an action (for interactions)
    * @method runAction
    * @param {Object} action inputEx action object
    * @param {Any} triggerValue The value that triggered the interaction
    */
   runAction: function(action, triggerValue) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runAction", 407);
_yuitest_coverline("build/inputex-group/inputex-group.js", 408);
var field = this.getFieldByName(action.name);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 409);
if( lang.isFunction(field[action.action]) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 410);
field[action.action].call(field);
      }
      else {_yuitest_coverline("build/inputex-group/inputex-group.js", 412);
if( lang.isFunction(action.action) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 413);
action.action.call(field, triggerValue);
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 416);
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
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runInteractions", 426);
_yuitest_coverline("build/inputex-group/inputex-group.js", 428);
var index = inputEx.indexOf(fieldInstance, this.inputs);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 429);
var fieldConfig = this.options.fields[index];
      _yuitest_coverline("build/inputex-group/inputex-group.js", 430);
if(lang.isUndefined(fieldConfig.interactions) ) {return;}
      
      // Let's run the interactions !
      _yuitest_coverline("build/inputex-group/inputex-group.js", 433);
var interactions = fieldConfig.interactions;
      _yuitest_coverline("build/inputex-group/inputex-group.js", 434);
for(var i = 0 ; i < interactions.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 435);
var interaction = interactions[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 436);
if(interaction.valueTrigger === fieldValue) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 437);
for(var j = 0 ; j < interaction.actions.length ; j++) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 438);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runFieldsInteractions", 449);
_yuitest_coverline("build/inputex-group/inputex-group.js", 450);
if(this.hasInteractions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 451);
for(var i = 0 ; i < this.inputs.length ; i++) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 452);
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
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "clear", 462);
_yuitest_coverline("build/inputex-group/inputex-group.js", 463);
for(var i = 0 ; i < this.inputs.length ; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 464);
this.inputs[i].clear(false);
	   }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 466);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 468);
this.fireUpdatedEvt();
      }
	},
	
	/**
	 * Write error messages for fields as specified in the hash
	 * @method setErrors
	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ ["fieldName", "Message"], ...]
	 */
	setErrors: function(errors) {	
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setErrors", 477);
_yuitest_coverline("build/inputex-group/inputex-group.js", 478);
var i,k;
		_yuitest_coverline("build/inputex-group/inputex-group.js", 479);
if(lang.isArray(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 480);
for(i = 0 ; i < errors.length ; i++) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 481);
k = errors[i][0];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 482);
value = errors[i][1];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 483);
if(this.inputsNames[k]) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 484);
if(this.inputsNames[k].options.showMsg) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 485);
this.inputsNames[k].displayMessage(value);
						_yuitest_coverline("build/inputex-group/inputex-group.js", 486);
Y.one(this.inputsNames[k].divEl).replaceClass("inputEx-valid", "inputEx-invalid" );
					}
				}
			}
		}
		else {_yuitest_coverline("build/inputex-group/inputex-group.js", 491);
if(lang.isObject(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 492);
for(k in errors) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 493);
if(errors.hasOwnProperty(k)) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 494);
if(this.inputsNames[k]) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 495);
if(this.inputsNames[k].options.showMsg) {
							_yuitest_coverline("build/inputex-group/inputex-group.js", 496);
this.inputsNames[k].displayMessage(errors[k]);
							_yuitest_coverline("build/inputex-group/inputex-group.js", 497);
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
			_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setFieldName", 509);
_yuitest_coverline("build/inputex-group/inputex-group.js", 510);
var l = this.inputs.length;
			_yuitest_coverline("build/inputex-group/inputex-group.js", 511);
for (var i = 0; i < l; i++){
				_yuitest_coverline("build/inputex-group/inputex-group.js", 512);
this.inputs[i].setFieldName(name+""+((this.inputs[i].el && this.inputs[i].el.name )|| "group-"+i ));
			}
    },
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "destroy", 520);
_yuitest_coverline("build/inputex-group/inputex-group.js", 522);
var i, length, field;
      
      // Recursively destroy inputs
      _yuitest_coverline("build/inputex-group/inputex-group.js", 525);
for (i = 0, length = this.inputs.length ; i < length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 526);
field = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 527);
field.destroy();
      }
      
      // Destroy group itself
      _yuitest_coverline("build/inputex-group/inputex-group.js", 531);
inputEx.Group.superclass.destroy.call(this);
      
   }
   
   
});

   
// Register this class as "group" type
_yuitest_coverline("build/inputex-group/inputex-group.js", 540);
inputEx.registerType("group", inputEx.Group, [
   { type: "string", label: "Name", name: "name", value: '' },
   { type: 'string', label: 'Legend', name:'legend'},
   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},
   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},
   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }
], true);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "group"});
