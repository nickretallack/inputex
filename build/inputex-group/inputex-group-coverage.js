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
_yuitest_coverage["build/inputex-group/inputex-group.js"].code=["YUI.add('inputex-group', function (Y, NAME) {","","/**"," * @module inputex-group"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","       ","/**"," * Handle a group of fields"," * @class inputEx.Group"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options The following options are added for Groups and subclasses:"," * <ul>"," *   <li>fields: Array of input fields declared like { label: 'Enter the value:' , type: 'text' or fieldClass: inputEx.Field, optional: true/false, ... }</li>"," *   <li>legend: The legend for the fieldset (default is an empty string)</li>"," *   <li>collapsible: Boolean to make the group collapsible (default is false)</li>"," *   <li>collapsed: If collapsible only, will be collapsed at creation (default is false)</li>"," *   <li>flatten:</li>"," * </ul>"," */","inputEx.Group = function(options) {","   inputEx.Group.superclass.constructor.call(this,options);","   ","   // Run default field interactions (if setValue has not been called before)","   if(!this.options.value) {","      this.runFieldsInteractions();","   }","};","Y.extend(inputEx.Group, inputEx.Field, {","   ","   /**","    * Adds some options: legend, collapsible, fields...","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      ","      inputEx.Group.superclass.setOptions.call(this, options);","      ","      this.options.className = options.className || 'inputEx-Group';","      ","      this.options.fields = options.fields;","      ","      this.options.flatten = options.flatten;","      ","      this.options.legend = options.legend || '';","      ","      this.options.collapsible = lang.isUndefined(options.collapsible) ? false : options.collapsible;","      this.options.collapsed = lang.isUndefined(options.collapsed) ? false : options.collapsed;","      ","      this.options.disabled = lang.isUndefined(options.disabled) ? false : options.disabled;","      ","      // Array containing the list of the field instances","      this.inputs = [];","      this.inputsLength = 0; // cache the length of this.inputs array","","      // Associative array containing the field instances by names","      this.inputsNames = {};","   },","","   /**","    * Render the group","    * @method render","    */","   render: function() {","   ","      // Create the div wrapper for this group","      this.divEl = inputEx.cn('div', {className: this.options.className});","      if(this.options.id) {","         this.divEl.id = this.options.id;","      }","      ","      this.renderFields(this.divEl);","      ","      if(this.options.disabled) {","         this.disable();","      }","   },","   ","   /**","    * Render all the fields.","    * We use the parentEl so that inputEx.Form can append them to the FORM tag","    * @method renderFields","    */","   renderFields: function(parentEl) {","      ","      this.fieldset = inputEx.cn('fieldset');","      this.legend = inputEx.cn('legend', {className: 'inputEx-Group-legend'});","   ","      // Option Collapsible","      if(this.options.collapsible) {","         var collapseImg = inputEx.cn('div', {className: 'inputEx-Group-collapseImg'}, null, ' ');","         this.legend.appendChild(collapseImg);","         inputEx.sn(this.fieldset,{className:'inputEx-Expanded'});","      }","   ","      if(!lang.isUndefined(this.options.legend) && this.options.legend !== ''){","         this.legend.appendChild( inputEx.cn(\"span\", null, null, \" \"+this.options.legend) );","      }","   ","      if( this.options.collapsible || (!lang.isUndefined(this.options.legend) && this.options.legend !== '') ) {","         this.fieldset.appendChild(this.legend);","      }","      ","      if(!this.options.fields){","        throw new Error(\"Missing 'fields' property in options\");","      }","      // Iterate this.createInput on input fields","      for (var i = 0 ; i < this.options.fields.length ; i++) {","         var fieldOptions = this.options.fields[i];","         ","         // Throw Error if input is undefined","         if(!fieldOptions) {","            throw new Error(\"inputEx.Form: One of the provided fields is undefined ! (check trailing comma)\");","         }","         ","         // Render the field","         this.addField(fieldOptions);","      }","      ","      // Collapsed at creation ?","      if(this.options.collapsed) {","         this.toggleCollapse();","      }","      ","      // Append the fieldset","      parentEl.appendChild(this.fieldset);","   },","","   /**","    * Render a field and add it to the field set","    * @method addField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   addField: function(fieldOptions) {","		var field = this.renderField(fieldOptions);","      this.fieldset.appendChild(field.getEl());","	},","","   /**","    * Instanciate one field given its parameters, type or fieldClass","    * @method renderField","    * @param {Object} fieldOptions The field properties as required by the inputEx() method","    */","   renderField: function(fieldOptions) {","","      // Instanciate the field","      var fieldInstance = inputEx(fieldOptions,this);","      ","	   this.inputs.push(fieldInstance);","      this.inputsLength += 1;","      ","      // Create an index to access fields by their name","      if (fieldInstance.options.name) {","         this.inputsNames[fieldInstance.options.name] = fieldInstance;","      }","","      // when the instance is a flatten group, we consider his fields as our fields","      if (fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)) {","        Y.mix(this.inputsNames, fieldInstance.inputsNames);","        this.inputs = this.inputs.concat(fieldInstance.inputs);","        this.inputsLength += fieldInstance.inputs.length;","      }","      ","      // Create the this.hasInteractions to run interactions at startup","      if(!this.hasInteractions && fieldOptions.interactions) {","         this.hasInteractions = true;","      }","      ","      // Subscribe to the field \"updated\" event to send the group \"updated\" event","      fieldInstance.on(\"updated\",this.onChange, this);","      ","      return fieldInstance;","   },","  ","   /**","    * Add a listener for the 'collapsible' option","    * @method initEvents","    */","   initEvents: function() {","      if(this.options.collapsible) {","         Y.on(\"click\", this.toggleCollapse,this.legend, this);","      }","   },","","   /**","    * Toggle the collapse state","    * @method toggleCollapse","    */","   toggleCollapse: function() {","      if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {","        Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');","      }","      else {","         Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');","      }","   },","   ","   /**","    * Validate each field","    * @method validate","    * @return {Boolean} true if all fields validate and required fields are not empty","    */","   validate: function() {","      var response = true;","","      // Validate all the sub fields","      for (var i = 0; i < this.inputsLength; i++) {","         var input = this.inputs[i];","         if (!input.isDisabled()) {","            var state = input.getState();","            input.setClassFromState(state); // update field classes (mark invalid fields...)","            if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {","               response = false; // but keep looping on fields to set classes","            }","         }","      }","      return response;","   },","	","	/**","	 * Alternative method to validate for advanced error handling","	 * @method getFieldsStates","	 * @return {Object} with all Forms's fields state, error message","	 * and validate containing a boolean for the global Form validation","	 */","	getFieldsStates: function() {","		var input, inputName, state, message,","		returnedObj = { fields:{}, validate:true };","      ","      // Loop on all the sub fields","      for (var i = 0 ; i < this.inputsLength; i++) {","         ","         input = this.inputs[i];","         inputName = input.options.name;","         state = input.getState();","         message = input.getStateString(state);","         ","         returnedObj.fields[inputName] = {};","         returnedObj.fields[inputName].valid = true;","         returnedObj.fields[inputName].message = message;","         ","         // check if subfield validates","         if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {","            returnedObj.fields[inputName].valid = false;","            returnedObj.validate = false;","         }","","      }","","      return returnedObj;","	},","   ","   /**","    * Enable all fields in the group","    * @method enable","    */","   enable: function() {","      for (var i = 0 ; i < this.inputsLength; i++) {","         this.inputs[i].enable();","      }","   },","   ","   /**","    * Disable all fields in the group","    * @method disable","    */","   disable: function() {","      for (var i = 0 ; i < this.inputsLength; i++) {","         this.inputs[i].disable();","      }","   },","   ","   /**","    * Set the values of each field from a key/value hash object","    * @method setValue","    * @param {Any} value The group value","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","   setValue: function(oValues, sendUpdatedEvt) {","      if(!oValues) {","         return;","      }","	   for (var i = 0 ; i < this.inputsLength; i++) {","	      var field = this.inputs[i];","	      var name = field.options.name;","	      if(name && !lang.isUndefined(oValues[name]) ) {","	         field.setValue(oValues[name], false); // don't fire the updated event !","	      }","	      else {","	         field.clear(false);","	      }","      }","      ","      this.runFieldsInteractions();","      ","	   if(sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","   },","   ","   /**","    * Return an object with all the values of the fields","    * @method getValue","    */","   getValue: function() {","	   var o = {};","	   for (var i = 0; i < this.inputsLength; i++) {","	      var v = this.inputs[i].getValue();","	      if (this.inputs[i].options.name) {","	         if (this.inputs[i].options.flatten && lang.isObject(v)) {","	            Y.mix(o, v);","	         }","	         else {","		         o[this.inputs[i].options.name] = v;","	         }","	      }","      }","	   return o;","   },","","   /**","    * Test if all sub-fields are empty","    * @method isEmpty","    * @return {Boolean} field emptiness (true/false)","    */","   isEmpty: function () {","","      var empty = true,","          i, n = this.inputsLength;","","      for (i = 0; i < n; i++) {","         empty = empty && this.inputs[i].isEmpty();","      }","","      return empty;","","   },","  ","   /**","    * Close the group (recursively calls \"close\" on each field, does NOT hide the group )","    * Call this function before hidding the group to close any field popup","    * @method close","    */","   close: function() {","      for (var i = 0; i < this.inputsLength; i++) {","         this.inputs[i].close();","      }","   },","","   /**","    * Set the focus to the first input in the group","    * @method focus","    */","   focus: function() {","      if (this.inputsLength > 0) {","         this.inputs[0].focus();","      }","   },","","   /**","    * Return the sub-field instance by its name property","    * @method getFieldByName","    * @param {String} fieldName The name property","    */","   getFieldByName: function(fieldName) {","      if( !this.inputsNames.hasOwnProperty(fieldName) ) {","         return null;","      }","      return this.inputsNames[fieldName];","   },","","   /**","    * Find a field anywhere in the hierarchy this group is a part of.","    * @method findFieldByName","    * @param {String} fieldName The name property","    * @param {Boolean} descendOnly Set true to only look at children of this group","    */","   findFieldByName: function(fieldName, descendOnly) {","      var search = this,","          parent,","          field;","","      if (descendOnly) {","         if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {","            for (var group, inputs = this.inputs, i = 0, len = this.inputsLength; i < len; ++i) {","               group = inputs[i];","               if (lang.isFunction(group.getFieldByName) &&","                     (field = group.getFieldByName(fieldName, true))) {","                  break;","               }","            }","         }","","         return field;","      }","      else {","         while ((parent = search.getParentField()) &&","               lang.isFunction(parent.getFieldByName)) {","            search = parent;","         }","         return search.getFieldByName(fieldName, true);","      }","   },","","","   /**","    * Called when one of the group subfields is updated.","    * @method onChange","    * @param {String} eventName Event name","    * @param {Array} args Array of [fieldValue, fieldInstance] ","    */","   onChange: function(fieldValue, fieldInstance) {","","      // Run interactions","      this.runInteractions(fieldInstance,fieldValue);","      ","      //this.setClassFromState();","      ","      this.fireUpdatedEvt();","   },","","   /**","    * Run an action (for interactions)","    * @method runAction","    * @param {Object} action inputEx action object","    * @param {Any} triggerValue The value that triggered the interaction","    */","   runAction: function(action, triggerValue) {","      var field = this.getFieldByName(action.name);","      if( lang.isFunction(field[action.action]) ) {","         field[action.action].call(field);","      }","      else if( lang.isFunction(action.action) ) {","         action.action.call(field, triggerValue);","      }","      else {","         throw new Error(\"action \"+action.action+\" is not a valid action for field \"+action.name);","      }","   },","   ","   /**","    * Run the interactions for the given field instance","    * @method runInteractions","    * @param {inputEx.Field} fieldInstance Field that just changed","    * @param {Any} fieldValue Field value","    */","   runInteractions: function(fieldInstance,fieldValue) {","      ","      var index = inputEx.indexOf(fieldInstance, this.inputs);","      var fieldConfig = this.options.fields[index];","","      if(lang.isUndefined(fieldConfig) || lang.isUndefined(fieldConfig.interactions) ) return;","      ","      // Let's run the interactions !","      var interactions = fieldConfig.interactions;","      for(var i = 0 ; i < interactions.length ; i++) {","         var interaction = interactions[i];","         if(interaction.valueTrigger === fieldValue) {","            for(var j = 0 ; j < interaction.actions.length ; j++) {","               this.runAction(interaction.actions[j], fieldValue);","            }","         }","      }","      ","   },","   ","   /**","    * Run the interactions for all fields","    * @method runFieldsInteractions","    */","   runFieldsInteractions: function() {","      if (this.hasInteractions) {","         for (var i = 0; i < this.inputsLength; i++) {","            this.runInteractions(this.inputs[i],this.inputs[i].getValue());","         }","      }","   },","   ","	/**","	 * Clear all subfields","	 * @method clear","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	clear: function(sendUpdatedEvt) {","	   for (var i = 0; i < this.inputsLength; i++) {","	      this.inputs[i].clear(false);","	   }","	   if (sendUpdatedEvt !== false) {","	      // fire update event","         this.fireUpdatedEvt();","      }","	},","	","	/**","	 * Write error messages for fields as specified in the hash","	 * @method setErrors","	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ [\"fieldName\", \"Message\"], ...]","	 */","	setErrors: function(errors) {	","		var i,k;","		if(lang.isArray(errors)) {","			for(i = 0 ; i < errors.length ; i++) {","				k = errors[i][0];","				value = errors[i][1];","				if(this.inputsNames[k]) {","					if(this.inputsNames[k].options.showMsg) {","						this.inputsNames[k].displayMessage(value);","						Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","					}","				}","			}","		}","		else if(lang.isObject(errors)) {","			for(k in errors) {","				if(errors.hasOwnProperty(k)) {","					if(this.inputsNames[k]) {","						if(this.inputsNames[k].options.showMsg) {","							this.inputsNames[k].displayMessage(errors[k]);","							Y.one(this.inputsNames[k].divEl).replaceClass(\"inputEx-valid\", \"inputEx-invalid\" );","						}","					}","				}","			}","		}","	},","	","   /**","    * Compatibility with classic forms in listField for instance","    * @method setFieldName","    */","    setFieldName: function(name){","			var l = this.inputsLength;","			for (var i = 0; i < l; i++){","				this.inputs[i].setFieldName(name+\"\"+((this.inputs[i].el && this.inputs[i].el.name )|| \"group-\"+i ));","			}","    },","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, field;","      ","      // Recursively destroy inputs","      for (i = 0, length = this.inputsLength; i < length ; i++) {","         field = this.inputs[i];","         field.destroy();","      }","      ","      // Destroy group itself","      inputEx.Group.superclass.destroy.call(this);","      ","   }","   ","   ","});","","   ","// Register this class as \"group\" type","inputEx.registerType(\"group\", inputEx.Group, [","   { type: \"string\", label: \"Name\", name: \"name\", value: '' },","   { type: 'string', label: 'Legend', name:'legend'},","   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},","   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},","   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }","], true);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"group\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-group/inputex-group.js"].lines = {"1":0,"6":0,"23":0,"24":0,"27":0,"28":0,"31":0,"40":0,"42":0,"44":0,"46":0,"48":0,"50":0,"51":0,"53":0,"56":0,"57":0,"60":0,"70":0,"71":0,"72":0,"75":0,"77":0,"78":0,"89":0,"90":0,"93":0,"94":0,"95":0,"96":0,"99":0,"100":0,"103":0,"104":0,"107":0,"108":0,"111":0,"112":0,"115":0,"116":0,"120":0,"124":0,"125":0,"129":0,"138":0,"139":0,"150":0,"152":0,"153":0,"156":0,"157":0,"161":0,"162":0,"163":0,"164":0,"168":0,"169":0,"173":0,"175":0,"183":0,"184":0,"193":0,"194":0,"197":0,"207":0,"210":0,"211":0,"212":0,"213":0,"214":0,"215":0,"216":0,"220":0,"230":0,"234":0,"236":0,"237":0,"238":0,"239":0,"241":0,"242":0,"243":0,"246":0,"247":0,"248":0,"253":0,"261":0,"262":0,"271":0,"272":0,"283":0,"284":0,"286":0,"287":0,"288":0,"289":0,"290":0,"293":0,"297":0,"299":0,"301":0,"310":0,"311":0,"312":0,"313":0,"314":0,"315":0,"318":0,"322":0,"332":0,"335":0,"336":0,"339":0,"349":0,"350":0,"359":0,"360":0,"370":0,"371":0,"373":0,"383":0,"387":0,"388":0,"389":0,"390":0,"391":0,"393":0,"398":0,"401":0,"403":0,"405":0,"419":0,"423":0,"433":0,"434":0,"435":0,"437":0,"438":0,"441":0,"453":0,"454":0,"456":0,"459":0,"460":0,"461":0,"462":0,"463":0,"464":0,"476":0,"477":0,"478":0,"489":0,"490":0,"492":0,"494":0,"504":0,"505":0,"506":0,"507":0,"508":0,"509":0,"510":0,"511":0,"512":0,"517":0,"518":0,"519":0,"520":0,"521":0,"522":0,"523":0,"536":0,"537":0,"538":0,"548":0,"551":0,"552":0,"553":0,"557":0,"566":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].functions = {"Group:23":0,"setOptions:38":0,"render:67":0,"renderFields:87":0,"addField:137":0,"renderField:147":0,"initEvents:182":0,"toggleCollapse:192":0,"validate:206":0,"getFieldsStates:229":0,"enable:260":0,"disable:270":0,"setValue:282":0,"getValue:309":0,"isEmpty:330":0,"close:348":0,"focus:358":0,"getFieldByName:369":0,"findFieldByName:382":0,"onChange:416":0,"runAction:432":0,"runInteractions:451":0,"runFieldsInteractions:475":0,"clear:488":0,"setErrors:503":0,"setFieldName:535":0,"destroy:546":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-group/inputex-group.js"].coveredLines = 180;
_yuitest_coverage["build/inputex-group/inputex-group.js"].coveredFunctions = 28;
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
      _yuitest_coverline("build/inputex-group/inputex-group.js", 57);
this.inputsLength = 0; // cache the length of this.inputs array

      // Associative array containing the field instances by names
      _yuitest_coverline("build/inputex-group/inputex-group.js", 60);
this.inputsNames = {};
   },

   /**
    * Render the group
    * @method render
    */
   render: function() {
   
      // Create the div wrapper for this group
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "render", 67);
_yuitest_coverline("build/inputex-group/inputex-group.js", 70);
this.divEl = inputEx.cn('div', {className: this.options.className});
      _yuitest_coverline("build/inputex-group/inputex-group.js", 71);
if(this.options.id) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 72);
this.divEl.id = this.options.id;
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 75);
this.renderFields(this.divEl);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 77);
if(this.options.disabled) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 78);
this.disable();
      }
   },
   
   /**
    * Render all the fields.
    * We use the parentEl so that inputEx.Form can append them to the FORM tag
    * @method renderFields
    */
   renderFields: function(parentEl) {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "renderFields", 87);
_yuitest_coverline("build/inputex-group/inputex-group.js", 89);
this.fieldset = inputEx.cn('fieldset');
      _yuitest_coverline("build/inputex-group/inputex-group.js", 90);
this.legend = inputEx.cn('legend', {className: 'inputEx-Group-legend'});
   
      // Option Collapsible
      _yuitest_coverline("build/inputex-group/inputex-group.js", 93);
if(this.options.collapsible) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 94);
var collapseImg = inputEx.cn('div', {className: 'inputEx-Group-collapseImg'}, null, ' ');
         _yuitest_coverline("build/inputex-group/inputex-group.js", 95);
this.legend.appendChild(collapseImg);
         _yuitest_coverline("build/inputex-group/inputex-group.js", 96);
inputEx.sn(this.fieldset,{className:'inputEx-Expanded'});
      }
   
      _yuitest_coverline("build/inputex-group/inputex-group.js", 99);
if(!lang.isUndefined(this.options.legend) && this.options.legend !== ''){
         _yuitest_coverline("build/inputex-group/inputex-group.js", 100);
this.legend.appendChild( inputEx.cn("span", null, null, " "+this.options.legend) );
      }
   
      _yuitest_coverline("build/inputex-group/inputex-group.js", 103);
if( this.options.collapsible || (!lang.isUndefined(this.options.legend) && this.options.legend !== '') ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 104);
this.fieldset.appendChild(this.legend);
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 107);
if(!this.options.fields){
        _yuitest_coverline("build/inputex-group/inputex-group.js", 108);
throw new Error("Missing 'fields' property in options");
      }
      // Iterate this.createInput on input fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 111);
for (var i = 0 ; i < this.options.fields.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 112);
var fieldOptions = this.options.fields[i];
         
         // Throw Error if input is undefined
         _yuitest_coverline("build/inputex-group/inputex-group.js", 115);
if(!fieldOptions) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 116);
throw new Error("inputEx.Form: One of the provided fields is undefined ! (check trailing comma)");
         }
         
         // Render the field
         _yuitest_coverline("build/inputex-group/inputex-group.js", 120);
this.addField(fieldOptions);
      }
      
      // Collapsed at creation ?
      _yuitest_coverline("build/inputex-group/inputex-group.js", 124);
if(this.options.collapsed) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 125);
this.toggleCollapse();
      }
      
      // Append the fieldset
      _yuitest_coverline("build/inputex-group/inputex-group.js", 129);
parentEl.appendChild(this.fieldset);
   },

   /**
    * Render a field and add it to the field set
    * @method addField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   addField: function(fieldOptions) {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "addField", 137);
_yuitest_coverline("build/inputex-group/inputex-group.js", 138);
var field = this.renderField(fieldOptions);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 139);
this.fieldset.appendChild(field.getEl());
	},

   /**
    * Instanciate one field given its parameters, type or fieldClass
    * @method renderField
    * @param {Object} fieldOptions The field properties as required by the inputEx() method
    */
   renderField: function(fieldOptions) {

      // Instanciate the field
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "renderField", 147);
_yuitest_coverline("build/inputex-group/inputex-group.js", 150);
var fieldInstance = inputEx(fieldOptions,this);
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 152);
this.inputs.push(fieldInstance);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 153);
this.inputsLength += 1;
      
      // Create an index to access fields by their name
      _yuitest_coverline("build/inputex-group/inputex-group.js", 156);
if (fieldInstance.options.name) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 157);
this.inputsNames[fieldInstance.options.name] = fieldInstance;
      }

      // when the instance is a flatten group, we consider his fields as our fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 161);
if (fieldInstance.options.flatten && lang.isObject(fieldInstance.inputsNames)) {
        _yuitest_coverline("build/inputex-group/inputex-group.js", 162);
Y.mix(this.inputsNames, fieldInstance.inputsNames);
        _yuitest_coverline("build/inputex-group/inputex-group.js", 163);
this.inputs = this.inputs.concat(fieldInstance.inputs);
        _yuitest_coverline("build/inputex-group/inputex-group.js", 164);
this.inputsLength += fieldInstance.inputs.length;
      }
      
      // Create the this.hasInteractions to run interactions at startup
      _yuitest_coverline("build/inputex-group/inputex-group.js", 168);
if(!this.hasInteractions && fieldOptions.interactions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 169);
this.hasInteractions = true;
      }
      
      // Subscribe to the field "updated" event to send the group "updated" event
      _yuitest_coverline("build/inputex-group/inputex-group.js", 173);
fieldInstance.on("updated",this.onChange, this);
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 175);
return fieldInstance;
   },
  
   /**
    * Add a listener for the 'collapsible' option
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "initEvents", 182);
_yuitest_coverline("build/inputex-group/inputex-group.js", 183);
if(this.options.collapsible) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 184);
Y.on("click", this.toggleCollapse,this.legend, this);
      }
   },

   /**
    * Toggle the collapse state
    * @method toggleCollapse
    */
   toggleCollapse: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "toggleCollapse", 192);
_yuitest_coverline("build/inputex-group/inputex-group.js", 193);
if(Y.one(this.fieldset).hasClass( 'inputEx-Expanded')) {
        _yuitest_coverline("build/inputex-group/inputex-group.js", 194);
Y.one(this.fieldset).replaceClass('inputEx-Expanded', 'inputEx-Collapsed');
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 197);
Y.one(this.fieldset).replaceClass( 'inputEx-Collapsed','inputEx-Expanded');
      }
   },
   
   /**
    * Validate each field
    * @method validate
    * @return {Boolean} true if all fields validate and required fields are not empty
    */
   validate: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "validate", 206);
_yuitest_coverline("build/inputex-group/inputex-group.js", 207);
var response = true;

      // Validate all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 210);
for (var i = 0; i < this.inputsLength; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 211);
var input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 212);
if (!input.isDisabled()) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 213);
var state = input.getState();
            _yuitest_coverline("build/inputex-group/inputex-group.js", 214);
input.setClassFromState(state); // update field classes (mark invalid fields...)
            _yuitest_coverline("build/inputex-group/inputex-group.js", 215);
if (state == inputEx.stateRequired || state == inputEx.stateInvalid) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 216);
response = false; // but keep looping on fields to set classes
            }
         }
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 220);
return response;
   },
	
	/**
	 * Alternative method to validate for advanced error handling
	 * @method getFieldsStates
	 * @return {Object} with all Forms's fields state, error message
	 * and validate containing a boolean for the global Form validation
	 */
	getFieldsStates: function() {
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldsStates", 229);
_yuitest_coverline("build/inputex-group/inputex-group.js", 230);
var input, inputName, state, message,
		returnedObj = { fields:{}, validate:true };
      
      // Loop on all the sub fields
      _yuitest_coverline("build/inputex-group/inputex-group.js", 234);
for (var i = 0 ; i < this.inputsLength; i++) {
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 236);
input = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 237);
inputName = input.options.name;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 238);
state = input.getState();
         _yuitest_coverline("build/inputex-group/inputex-group.js", 239);
message = input.getStateString(state);
         
         _yuitest_coverline("build/inputex-group/inputex-group.js", 241);
returnedObj.fields[inputName] = {};
         _yuitest_coverline("build/inputex-group/inputex-group.js", 242);
returnedObj.fields[inputName].valid = true;
         _yuitest_coverline("build/inputex-group/inputex-group.js", 243);
returnedObj.fields[inputName].message = message;
         
         // check if subfield validates
         _yuitest_coverline("build/inputex-group/inputex-group.js", 246);
if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 247);
returnedObj.fields[inputName].valid = false;
            _yuitest_coverline("build/inputex-group/inputex-group.js", 248);
returnedObj.validate = false;
         }

      }

      _yuitest_coverline("build/inputex-group/inputex-group.js", 253);
return returnedObj;
	},
   
   /**
    * Enable all fields in the group
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "enable", 260);
_yuitest_coverline("build/inputex-group/inputex-group.js", 261);
for (var i = 0 ; i < this.inputsLength; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 262);
this.inputs[i].enable();
      }
   },
   
   /**
    * Disable all fields in the group
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "disable", 270);
_yuitest_coverline("build/inputex-group/inputex-group.js", 271);
for (var i = 0 ; i < this.inputsLength; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 272);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "setValue", 282);
_yuitest_coverline("build/inputex-group/inputex-group.js", 283);
if(!oValues) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 284);
return;
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 286);
for (var i = 0 ; i < this.inputsLength; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 287);
var field = this.inputs[i];
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 288);
var name = field.options.name;
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 289);
if(name && !lang.isUndefined(oValues[name]) ) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 290);
field.setValue(oValues[name], false); // don't fire the updated event !
	      }
	      else {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 293);
field.clear(false);
	      }
      }
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 297);
this.runFieldsInteractions();
      
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 299);
if(sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 301);
this.fireUpdatedEvt();
      }
   },
   
   /**
    * Return an object with all the values of the fields
    * @method getValue
    */
   getValue: function() {
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getValue", 309);
_yuitest_coverline("build/inputex-group/inputex-group.js", 310);
var o = {};
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 311);
for (var i = 0; i < this.inputsLength; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 312);
var v = this.inputs[i].getValue();
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 313);
if (this.inputs[i].options.name) {
	         _yuitest_coverline("build/inputex-group/inputex-group.js", 314);
if (this.inputs[i].options.flatten && lang.isObject(v)) {
	            _yuitest_coverline("build/inputex-group/inputex-group.js", 315);
Y.mix(o, v);
	         }
	         else {
		         _yuitest_coverline("build/inputex-group/inputex-group.js", 318);
o[this.inputs[i].options.name] = v;
	         }
	      }
      }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 322);
return o;
   },

   /**
    * Test if all sub-fields are empty
    * @method isEmpty
    * @return {Boolean} field emptiness (true/false)
    */
   isEmpty: function () {

      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "isEmpty", 330);
_yuitest_coverline("build/inputex-group/inputex-group.js", 332);
var empty = true,
          i, n = this.inputsLength;

      _yuitest_coverline("build/inputex-group/inputex-group.js", 335);
for (i = 0; i < n; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 336);
empty = empty && this.inputs[i].isEmpty();
      }

      _yuitest_coverline("build/inputex-group/inputex-group.js", 339);
return empty;

   },
  
   /**
    * Close the group (recursively calls "close" on each field, does NOT hide the group )
    * Call this function before hidding the group to close any field popup
    * @method close
    */
   close: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "close", 348);
_yuitest_coverline("build/inputex-group/inputex-group.js", 349);
for (var i = 0; i < this.inputsLength; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 350);
this.inputs[i].close();
      }
   },

   /**
    * Set the focus to the first input in the group
    * @method focus
    */
   focus: function() {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "focus", 358);
_yuitest_coverline("build/inputex-group/inputex-group.js", 359);
if (this.inputsLength > 0) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 360);
this.inputs[0].focus();
      }
   },

   /**
    * Return the sub-field instance by its name property
    * @method getFieldByName
    * @param {String} fieldName The name property
    */
   getFieldByName: function(fieldName) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "getFieldByName", 369);
_yuitest_coverline("build/inputex-group/inputex-group.js", 370);
if( !this.inputsNames.hasOwnProperty(fieldName) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 371);
return null;
      }
      _yuitest_coverline("build/inputex-group/inputex-group.js", 373);
return this.inputsNames[fieldName];
   },

   /**
    * Find a field anywhere in the hierarchy this group is a part of.
    * @method findFieldByName
    * @param {String} fieldName The name property
    * @param {Boolean} descendOnly Set true to only look at children of this group
    */
   findFieldByName: function(fieldName, descendOnly) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "findFieldByName", 382);
_yuitest_coverline("build/inputex-group/inputex-group.js", 383);
var search = this,
          parent,
          field;

      _yuitest_coverline("build/inputex-group/inputex-group.js", 387);
if (descendOnly) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 388);
if (this.inputsNames.hasOwnProperty(fieldName) && (field = this.inputsNames[fieldName])) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 389);
for (var group, inputs = this.inputs, i = 0, len = this.inputsLength; i < len; ++i) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 390);
group = inputs[i];
               _yuitest_coverline("build/inputex-group/inputex-group.js", 391);
if (lang.isFunction(group.getFieldByName) &&
                     (field = group.getFieldByName(fieldName, true))) {
                  _yuitest_coverline("build/inputex-group/inputex-group.js", 393);
break;
               }
            }
         }

         _yuitest_coverline("build/inputex-group/inputex-group.js", 398);
return field;
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 401);
while ((parent = search.getParentField()) &&
               lang.isFunction(parent.getFieldByName)) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 403);
search = parent;
         }
         _yuitest_coverline("build/inputex-group/inputex-group.js", 405);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "onChange", 416);
_yuitest_coverline("build/inputex-group/inputex-group.js", 419);
this.runInteractions(fieldInstance,fieldValue);
      
      //this.setClassFromState();
      
      _yuitest_coverline("build/inputex-group/inputex-group.js", 423);
this.fireUpdatedEvt();
   },

   /**
    * Run an action (for interactions)
    * @method runAction
    * @param {Object} action inputEx action object
    * @param {Any} triggerValue The value that triggered the interaction
    */
   runAction: function(action, triggerValue) {
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runAction", 432);
_yuitest_coverline("build/inputex-group/inputex-group.js", 433);
var field = this.getFieldByName(action.name);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 434);
if( lang.isFunction(field[action.action]) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 435);
field[action.action].call(field);
      }
      else {_yuitest_coverline("build/inputex-group/inputex-group.js", 437);
if( lang.isFunction(action.action) ) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 438);
action.action.call(field, triggerValue);
      }
      else {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 441);
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
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runInteractions", 451);
_yuitest_coverline("build/inputex-group/inputex-group.js", 453);
var index = inputEx.indexOf(fieldInstance, this.inputs);
      _yuitest_coverline("build/inputex-group/inputex-group.js", 454);
var fieldConfig = this.options.fields[index];

      _yuitest_coverline("build/inputex-group/inputex-group.js", 456);
if(lang.isUndefined(fieldConfig) || lang.isUndefined(fieldConfig.interactions) ) {return;}
      
      // Let's run the interactions !
      _yuitest_coverline("build/inputex-group/inputex-group.js", 459);
var interactions = fieldConfig.interactions;
      _yuitest_coverline("build/inputex-group/inputex-group.js", 460);
for(var i = 0 ; i < interactions.length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 461);
var interaction = interactions[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 462);
if(interaction.valueTrigger === fieldValue) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 463);
for(var j = 0 ; j < interaction.actions.length ; j++) {
               _yuitest_coverline("build/inputex-group/inputex-group.js", 464);
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
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "runFieldsInteractions", 475);
_yuitest_coverline("build/inputex-group/inputex-group.js", 476);
if (this.hasInteractions) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 477);
for (var i = 0; i < this.inputsLength; i++) {
            _yuitest_coverline("build/inputex-group/inputex-group.js", 478);
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
	   _yuitest_coverfunc("build/inputex-group/inputex-group.js", "clear", 488);
_yuitest_coverline("build/inputex-group/inputex-group.js", 489);
for (var i = 0; i < this.inputsLength; i++) {
	      _yuitest_coverline("build/inputex-group/inputex-group.js", 490);
this.inputs[i].clear(false);
	   }
	   _yuitest_coverline("build/inputex-group/inputex-group.js", 492);
if (sendUpdatedEvt !== false) {
	      // fire update event
         _yuitest_coverline("build/inputex-group/inputex-group.js", 494);
this.fireUpdatedEvt();
      }
	},
	
	/**
	 * Write error messages for fields as specified in the hash
	 * @method setErrors
	 * @param {Object || Array} errors Hash object containing error messages as Strings referenced by the field name, or array [ ["fieldName", "Message"], ...]
	 */
	setErrors: function(errors) {	
		_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setErrors", 503);
_yuitest_coverline("build/inputex-group/inputex-group.js", 504);
var i,k;
		_yuitest_coverline("build/inputex-group/inputex-group.js", 505);
if(lang.isArray(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 506);
for(i = 0 ; i < errors.length ; i++) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 507);
k = errors[i][0];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 508);
value = errors[i][1];
				_yuitest_coverline("build/inputex-group/inputex-group.js", 509);
if(this.inputsNames[k]) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 510);
if(this.inputsNames[k].options.showMsg) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 511);
this.inputsNames[k].displayMessage(value);
						_yuitest_coverline("build/inputex-group/inputex-group.js", 512);
Y.one(this.inputsNames[k].divEl).replaceClass("inputEx-valid", "inputEx-invalid" );
					}
				}
			}
		}
		else {_yuitest_coverline("build/inputex-group/inputex-group.js", 517);
if(lang.isObject(errors)) {
			_yuitest_coverline("build/inputex-group/inputex-group.js", 518);
for(k in errors) {
				_yuitest_coverline("build/inputex-group/inputex-group.js", 519);
if(errors.hasOwnProperty(k)) {
					_yuitest_coverline("build/inputex-group/inputex-group.js", 520);
if(this.inputsNames[k]) {
						_yuitest_coverline("build/inputex-group/inputex-group.js", 521);
if(this.inputsNames[k].options.showMsg) {
							_yuitest_coverline("build/inputex-group/inputex-group.js", 522);
this.inputsNames[k].displayMessage(errors[k]);
							_yuitest_coverline("build/inputex-group/inputex-group.js", 523);
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
			_yuitest_coverfunc("build/inputex-group/inputex-group.js", "setFieldName", 535);
_yuitest_coverline("build/inputex-group/inputex-group.js", 536);
var l = this.inputsLength;
			_yuitest_coverline("build/inputex-group/inputex-group.js", 537);
for (var i = 0; i < l; i++){
				_yuitest_coverline("build/inputex-group/inputex-group.js", 538);
this.inputs[i].setFieldName(name+""+((this.inputs[i].el && this.inputs[i].el.name )|| "group-"+i ));
			}
    },
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-group/inputex-group.js", "destroy", 546);
_yuitest_coverline("build/inputex-group/inputex-group.js", 548);
var i, length, field;
      
      // Recursively destroy inputs
      _yuitest_coverline("build/inputex-group/inputex-group.js", 551);
for (i = 0, length = this.inputsLength; i < length ; i++) {
         _yuitest_coverline("build/inputex-group/inputex-group.js", 552);
field = this.inputs[i];
         _yuitest_coverline("build/inputex-group/inputex-group.js", 553);
field.destroy();
      }
      
      // Destroy group itself
      _yuitest_coverline("build/inputex-group/inputex-group.js", 557);
inputEx.Group.superclass.destroy.call(this);
      
   }
   
   
});

   
// Register this class as "group" type
_yuitest_coverline("build/inputex-group/inputex-group.js", 566);
inputEx.registerType("group", inputEx.Group, [
   { type: "string", label: "Name", name: "name", value: '' },
   { type: 'string', label: 'Legend', name:'legend'},
   { type: 'boolean', label: 'Collapsible', name:'collapsible', value: false},
   { type: 'boolean', label: 'Collapsed', name:'collapsed', value: false},
   { type: 'list', label: 'Fields', name: 'fields', elementType: {type: 'type' } }
], true);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "group", "skinnable": true});
