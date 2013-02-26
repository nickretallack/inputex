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
_yuitest_coverage["build/inputex-list/inputex-list.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-list/inputex-list.js",
    code: []
};
_yuitest_coverage["build/inputex-list/inputex-list.js"].code=["YUI.add('inputex-list', function (Y, NAME) {","","/**"," * @module inputex-list"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","	","/**"," * Meta field to create a list of other fields"," * @class inputEx.ListField"," * @extends inputEx.Field"," * @constructor"," * @param options Added options:"," * <ul>"," *   <li>sortable: Add arrows to sort the items if true (default false)</li>"," *   <li>elementType: an element type definition (default is {type: 'string'})</li>"," *   <li>useButtons: use buttons instead of links (default false)</li>"," *   <li>unique: require values to be unique (default false)</li>"," *   <li>listAddLabel: if useButtons is false, text to add an item</li>"," *   <li>listRemoveLabel: if useButtons is false, text to remove an item</li>"," *   <li>maxItems: maximum number of items (leave undefined if no maximum, default)</li>"," *   <li>minItems: minimum number of items to validate (leave undefined if no minimum, default)</li>"," * </ul>"," */","inputEx.ListField = function(options) {","	   ","   /**","    * List of all the subField instances","    * @property subFields","    */","   this.subFields = [];","	   ","   inputEx.ListField.superclass.constructor.call(this, options);","};","Y.extend(inputEx.ListField,inputEx.Field, {","","	/**","	 * Colors for the animation","	 * @property arrowAnimColors","	 */","	arrowAnimColors: {","		from: \"#FFFF99\",","		to: \"#FFFFFF\"","	},","	   ","	/**","	 * Set the ListField classname","	 * @method setOptions","	 * @param {Object} options Options object as passed to the constructor","	 */","	setOptions: function(options) {","	   inputEx.ListField.superclass.setOptions.call(this, options);","","	   this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-list\"));","	   ","	   this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ListField';","	   ","	   this.options.sortable = lang.isUndefined(options.sortable) ? false : options.sortable;","	   this.options.elementType = options.elementType || {type: 'string'};","	   this.options.useButtons = lang.isUndefined(options.useButtons) ? false : options.useButtons;","	   this.options.unique = lang.isUndefined(options.unique) ? false : options.unique;","	   ","	   this.options.listAddLabel = options.listAddLabel || this.messages.listAddLink;","	   this.options.listRemoveLabel = options.listRemoveLabel || this.messages.listRemoveLink;","	   ","	   this.options.maxItems = options.maxItems;","	   this.options.minItems = options.minItems;","	},","	   ","	/**","	 * Render the addButton ","	 * @method renderComponent","	 */","	renderComponent: function() {","	      ","	   // Add element button","	   if(this.options.useButtons) {","	      this.addButton = inputEx.cn('img', {src: inputEx.spacerUrl, className: 'inputEx-ListField-addButton'});","	      this.fieldContainer.appendChild(this.addButton);","      }","	      ","	   // List label","	   this.fieldContainer.appendChild( inputEx.cn('span', null, {marginLeft: \"4px\"}, this.options.listLabel) );","	      ","	   // Div element to contain the children","	   this.childContainer = inputEx.cn('div', {className: 'inputEx-ListField-childContainer'});","	   this.fieldContainer.appendChild(this.childContainer);","	   ","	   // Add link","	   if(!this.options.useButtons) {","	      this.addButton = inputEx.cn('a', {className: 'inputEx-ListField-addLink'}, null, this.options.listAddLabel);","	      this.fieldContainer.appendChild(this.addButton);","      }","	},","	   ","	/**","	 * Handle the click event on the add button","	 * @method initEvents","	 */","	initEvents: function() {","	   Y.one(this.addButton).on('click', this.onAddButton, this, true);","	},","	","	/**","    * Validate each field","    * @method validate","    * @return {Boolean} true if all fields validate, required fields are not empty and unique constraint (if specified) is not violated","    */","   validate: function() {","","      var response = true;","      ","      var uniques = {}; // Hash for unique values option","      var l = this.subFields.length;","","      // Validate maxItems / minItems","      if( lang.isNumber(this.options.minItems) && l < this.options.minItems  ) {","         response = false;","      }","      if( lang.isNumber(this.options.maxItems) && l > this.options.maxItems  ) {","         response = false;","      }","","      // Validate all the sub fields","      for (var i = 0 ; i < l && response; i++) {","         var input = this.subFields[i];","         var state = input.getState();","         input.setClassFromState(state); // update field classes (mark invalid fields...)","         if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {","            response = false; // but keep looping on fields to set classes","         }","         if(this.options.unique) {","            var hash = lang.dump(input.getValue());","            if(uniques[hash]) {","               response = false;    // not unique","            } else {","               uniques[hash] = true;","            }","          }","      }","      return response;","   },","	   ","	/**","	 * Set the value of all the subfields","	 * @method setValue","	 * @param {Array} value The list of values to set","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	setValue: function(value, sendUpdatedEvt) {","	   ","	   if(!lang.isArray(value) ) {","	      throw new Error(\"inputEx.ListField.setValue expected an array, got \"+(typeof value));","	   }","	      ","	   // Set the values (and add the lines if necessary)","	   for(var i = 0 ; i < value.length ; i++) {","	      if(i == this.subFields.length) {","	         this.addElement(value[i]);","	      }","	      else {","	         this.subFields[i].setValue(value[i], false);","	      }","	   }","	      ","	   // Remove additional subFields","	   var additionalElements = this.subFields.length-value.length;","	   if(additionalElements > 0) {","	      for(i = 0 ; i < additionalElements ; i++) { ","	         this.removeElement(value.length);","	      }","	   }","	   ","	   inputEx.ListField.superclass.setValue.call(this, value, sendUpdatedEvt);","	},","	   ","	/**","	 * Return the array of values","	 * @method getValue","	 * @return {Array} The array","	 */","	getValue: function() {","	   var values = [];","	   for(var i = 0 ; i < this.subFields.length ; i++) {","	      values[i] = this.subFields[i].getValue();","	   }","	   return values;","	},","	   ","	/**","	 * Adds an element","	 * @method addElement","	 * @param {Any} The initial value of the subfield to create","	 * @return {inputEx.Field} SubField added instance","	 */","	addElement: function(value) {","	","	   // Render the subField","	   var subFieldEl = this.renderSubField(value);","	","		if(this.options.name) {","	   	subFieldEl.setFieldName(this.options.name+\"[\"+this.subFields.length+\"]\");","		}","	","	   // Adds it to the local list","	   this.subFields.push(subFieldEl);","	   ","	   return subFieldEl;","	},","	","	/**","	 * Re-set the name of all the fields (when we remove an element)","	 * @method resetAllNames","	 */","	resetAllNames: function() {","		if(this.options.name) {","			for(var i = 0 ; i < this.subFields.length ; i++) {","				var subFieldEl = this.subFields[i];","				subFieldEl.setFieldName(this.options.name+\"[\"+i+\"]\");","			}","		}","	},","	","	/**","	 * Add a new element to the list and fire updated event","	 * @method onAddButton","	 * @param {Event} e The original click event","	 */","	onAddButton: function(e) {","	   e.halt();","	   ","	   // Prevent adding a new field if already at maxItems","	   if( lang.isNumber(this.options.maxItems) && this.subFields.length >= this.options.maxItems ) {","	      return;","	   }","	   ","	   // Add a field with no value: ","	   var subFieldEl = this.addElement();","	   ","	   // Focus on this field","	   subFieldEl.focus();","	   ","	   // Fire updated !","	   this.fireUpdatedEvt();","	},","	   ","	/**","	 * Adds a new line to the List Field","	 * @method renderSubField"," 	 * @param {Any} The initial value of the subfield to create","	 * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)","	 */","	renderSubField: function(value) {","	      ","	   // Div that wraps the deleteButton + the subField","	   var newDiv = inputEx.cn('div'), delButton;","	      ","	   // Delete button","	   if(this.options.useButtons) {","	      delButton = inputEx.cn('img', {src: inputEx.spacerUrl, className: 'inputEx-ListField-delButton'});","	      Y.one(delButton).on('click', this.onDelete, this);","	      newDiv.appendChild( delButton );","      }","	      ","	   // Instantiate the new subField","	   var opts = Y.merge({}, this.options.elementType);","	   ","      // New prefered way to set options of a field","      if (!lang.isUndefined(value)) {","         opts.value = value;","      }","	   ","	   var el = inputEx(opts,this);","	   ","	   var subFieldEl = el.getEl();","		 Y.one(subFieldEl).addClass('inputEx-ListField-subFieldEl');","	   newDiv.appendChild( subFieldEl );","	   ","	   // Subscribe the onChange event to resend it ","	   el.on(\"updated\",this.onChange, this, true);","	","	   // Arrows to order:","	   if(this.options.sortable) {","	      var arrowUp = inputEx.cn('div', {className: 'inputEx-ListField-Arrow inputEx-ListField-ArrowUp'});","	      Y.one(arrowUp).on('click', this.onArrowUp, this);","	      var arrowDown = inputEx.cn('div', {className: 'inputEx-ListField-Arrow inputEx-ListField-ArrowDown'});","	      Y.one(arrowDown).on('click', this.onArrowDown, this, true);","	      newDiv.appendChild( arrowUp );","	      newDiv.appendChild( arrowDown );","	   }","	   ","	   // Delete link","	   if(!this.options.useButtons) {","	      delButton = inputEx.cn('a', {className: 'inputEx-ListField-delLink'}, null, this.options.listRemoveLabel);","	      Y.one(delButton).on('click', this.onDelete, this);","	      newDiv.appendChild( delButton );","      }","	","	   // Line breaker","	   newDiv.appendChild( inputEx.cn('div', null, {clear: \"both\"}) );","	","	   this.childContainer.appendChild(newDiv);","	      ","	   return el;","	},","	   ","	/**","	 * Switch a subField with its previous one","	 * Called when the user clicked on the up arrow of a sortable list","	 * @method onArrowUp","	 * @param {Event} e Original click event","	 */","	onArrowUp: function(e) {","	   var childElement = e.target._node.parentNode;","	   ","	   var previousChildNode = null;","	   var nodeIndex = -1;","	   for(var i = 1 ; i < childElement.parentNode.childNodes.length ; i++) {","	      var el=childElement.parentNode.childNodes[i];","	      if(el == childElement) {","	         previousChildNode = childElement.parentNode.childNodes[i-1];","	         nodeIndex = i;","	         break;","	      }","	   }","	   ","	   if(previousChildNode) {","	      // Remove the line","	      var elToMove = this.childContainer.removeChild(childElement);","	      ","	      // Adds it before the previousChildNode","	      this.childContainer.insertBefore(elToMove, previousChildNode);","	      ","	      // Swap this.subFields elements (i,i-1)","	      var temp = this.subFields[nodeIndex];","	      this.subFields[nodeIndex] = this.subFields[nodeIndex-1];","	      this.subFields[nodeIndex-1] = temp;","	","			// Note: not very efficient, we could just swap the names","			this.resetAllNames();","	","	      // Color Animation","	      if(this.arrowAnim) {","	         this.arrowAnim.stop(true);","	      }","	      ","	      this.arrowAnim = new Y.Anim({node:elToMove, from: {backgroundColor: this.arrowAnimColors.from}, to : {backgroundColor: this.arrowAnimColors.to },duration: 0.4});","	      this.arrowAnim.on(\"end\",function() { Y.one(elToMove).setStyle('backgroundColor', ''); });","	      this.arrowAnim.run();","	      ","	      // Fire updated !","	      this.fireUpdatedEvt();","	   }","	},","	","	/**","	 * Switch a subField with its next one","	 * Called when the user clicked on the down arrow of a sortable list","	 * @method onArrowDown","	 * @param {Event} e Original click event","	 */","	onArrowDown: function(e) {","	   var childElement = e.target._node.parentNode;","	   ","	   var nodeIndex = -1;","	   var nextChildNode = null;","	   for(var i = 0 ; i < childElement.parentNode.childNodes.length ; i++) {","	      var el=childElement.parentNode.childNodes[i];","	      if(el == childElement) {","	         nextChildNode = childElement.parentNode.childNodes[i+1];","	         nodeIndex = i;","	         break;","	      }","	   }","	   ","	   if(nextChildNode) {","	      // Remove the line","	      var elToMove = this.childContainer.removeChild(childElement);","	      ","	      // Adds it after the nextChildNode","	      Y.one(nextChildNode).insert(elToMove, \"after\");","	      ","	      // Swap this.subFields elements (i,i+1)","	      var temp = this.subFields[nodeIndex];","	      this.subFields[nodeIndex] = this.subFields[nodeIndex+1];","	      this.subFields[nodeIndex+1] = temp;","	","			// Note: not very efficient, we could just swap the names","			this.resetAllNames();      ","	","	      // Color Animation","	      if(this.arrowAnim) {","	         this.arrowAnim.stop(true);","	      }","	      this.arrowAnim = new Y.Anim({node: elToMove, from: {backgroundColor: this.arrowAnimColors.from}, to : {backgroundColor: this.arrowAnimColors.to }, duration: 1});","	      this.arrowAnim.on(\"end\",function() { Y.one(elToMove).setStyle( 'backgroundColor', ''); });","	      this.arrowAnim.run();","	      ","	      // Fire updated !","	      this.fireUpdatedEvt();","	   }","	},","	   ","	/**","	 * Called when the user clicked on a delete button.","	 * @method onDelete","	 * @param {Event} e The original click event","	 */","	onDelete: function(e) {","	      ","	   e.halt();","	   ","	   // Prevent removing a field if already at minItems","	   if( lang.isNumber(this.options.minItems) && this.subFields.length <= this.options.minItems ) {","	      return;","	   }","	      ","	   // Get the wrapping div element","	   var elementDiv = e.target._node.parentNode;","	   ","	   // Get the index of the subField","	   var index = -1;","	   ","	   var subFieldEl = elementDiv.childNodes[this.options.useButtons ? 1 : 0];","	   for(var i = 0 ; i < this.subFields.length ; i++) {","	      if(this.subFields[i].getEl() == subFieldEl) {","	         index = i;","	         break;","	      }","	   }","	      ","	   // Remove it","	   if(index != -1) {","	      this.removeElement(index);","	   }","		","		// Note: not very efficient","		this.resetAllNames();      ","	","	   // Fire the updated event","	   this.fireUpdatedEvt();","	},","	   ","	/**","	 * Remove the line from the dom and the subField from the list.","	 * @method removeElement","	 * @param {integer} index The index of the element to remove","	 */","	removeElement: function(index) {","	   var elementDiv = this.subFields[index].getEl().parentNode;","	      ","	   this.subFields[index] = undefined;","	   this.subFields = inputEx.compactArray(this.subFields);","	      ","	   // Remove the element","	   elementDiv.parentNode.removeChild(elementDiv);","	},","	","	/**","    * Clear the field by setting the field value to this.options.value","    * @method clear","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)","    */","    clear: function(sendUpdatedEvt) {","        this.setValue(lang.isUndefined(this.options.value) ? [] : this.options.value, sendUpdatedEvt);","    }","	","});","	","// Register this class as \"list\" type","inputEx.registerType(\"list\", inputEx.ListField, [","   { type: 'string', label: 'List label', name: 'listLabel', value: ''},","   { type: 'type', label: 'List element type', required: true, name: 'elementType' }","]);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"anim-base\",","        \"anim-color\"","    ],","    \"skinnable\": true,","    \"ix_provides\": \"list\",","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-list/inputex-list.js"].lines = {"1":0,"6":0,"26":0,"32":0,"34":0,"36":0,"53":0,"55":0,"57":0,"59":0,"60":0,"61":0,"62":0,"64":0,"65":0,"67":0,"68":0,"78":0,"79":0,"80":0,"84":0,"87":0,"88":0,"91":0,"92":0,"93":0,"102":0,"112":0,"114":0,"115":0,"118":0,"119":0,"121":0,"122":0,"126":0,"127":0,"128":0,"129":0,"130":0,"131":0,"133":0,"134":0,"135":0,"136":0,"138":0,"142":0,"153":0,"154":0,"158":0,"159":0,"160":0,"163":0,"168":0,"169":0,"170":0,"171":0,"175":0,"184":0,"185":0,"186":0,"188":0,"200":0,"202":0,"203":0,"207":0,"209":0,"217":0,"218":0,"219":0,"220":0,"231":0,"234":0,"235":0,"239":0,"242":0,"245":0,"257":0,"260":0,"261":0,"262":0,"263":0,"267":0,"270":0,"271":0,"274":0,"276":0,"277":0,"278":0,"281":0,"284":0,"285":0,"286":0,"287":0,"288":0,"289":0,"290":0,"294":0,"295":0,"296":0,"297":0,"301":0,"303":0,"305":0,"315":0,"317":0,"318":0,"319":0,"320":0,"321":0,"322":0,"323":0,"324":0,"328":0,"330":0,"333":0,"336":0,"337":0,"338":0,"341":0,"344":0,"345":0,"348":0,"349":0,"350":0,"353":0,"364":0,"366":0,"367":0,"368":0,"369":0,"370":0,"371":0,"372":0,"373":0,"377":0,"379":0,"382":0,"385":0,"386":0,"387":0,"390":0,"393":0,"394":0,"396":0,"397":0,"398":0,"401":0,"412":0,"415":0,"416":0,"420":0,"423":0,"425":0,"426":0,"427":0,"428":0,"429":0,"434":0,"435":0,"439":0,"442":0,"451":0,"453":0,"454":0,"457":0,"466":0,"472":0};
_yuitest_coverage["build/inputex-list/inputex-list.js"].functions = {"ListField:26":0,"setOptions:52":0,"renderComponent:75":0,"initEvents:101":0,"validate:110":0,"setValue:151":0,"getValue:183":0,"addElement:197":0,"resetAllNames:216":0,"onAddButton:230":0,"renderSubField:254":0,"(anonymous 2):349":0,"onArrowUp:314":0,"(anonymous 3):397":0,"onArrowDown:363":0,"onDelete:410":0,"removeElement:450":0,"clear:465":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-list/inputex-list.js"].coveredLines = 167;
_yuitest_coverage["build/inputex-list/inputex-list.js"].coveredFunctions = 19;
_yuitest_coverline("build/inputex-list/inputex-list.js", 1);
YUI.add('inputex-list', function (Y, NAME) {

/**
 * @module inputex-list
 */
   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-list/inputex-list.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;
	
/**
 * Meta field to create a list of other fields
 * @class inputEx.ListField
 * @extends inputEx.Field
 * @constructor
 * @param options Added options:
 * <ul>
 *   <li>sortable: Add arrows to sort the items if true (default false)</li>
 *   <li>elementType: an element type definition (default is {type: 'string'})</li>
 *   <li>useButtons: use buttons instead of links (default false)</li>
 *   <li>unique: require values to be unique (default false)</li>
 *   <li>listAddLabel: if useButtons is false, text to add an item</li>
 *   <li>listRemoveLabel: if useButtons is false, text to remove an item</li>
 *   <li>maxItems: maximum number of items (leave undefined if no maximum, default)</li>
 *   <li>minItems: minimum number of items to validate (leave undefined if no minimum, default)</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-list/inputex-list.js", 26);
inputEx.ListField = function(options) {
	   
   /**
    * List of all the subField instances
    * @property subFields
    */
   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "ListField", 26);
_yuitest_coverline("build/inputex-list/inputex-list.js", 32);
this.subFields = [];
	   
   _yuitest_coverline("build/inputex-list/inputex-list.js", 34);
inputEx.ListField.superclass.constructor.call(this, options);
};
_yuitest_coverline("build/inputex-list/inputex-list.js", 36);
Y.extend(inputEx.ListField,inputEx.Field, {

	/**
	 * Colors for the animation
	 * @property arrowAnimColors
	 */
	arrowAnimColors: {
		from: "#FFFF99",
		to: "#FFFFFF"
	},
	   
	/**
	 * Set the ListField classname
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
	setOptions: function(options) {
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "setOptions", 52);
_yuitest_coverline("build/inputex-list/inputex-list.js", 53);
inputEx.ListField.superclass.setOptions.call(this, options);

	   _yuitest_coverline("build/inputex-list/inputex-list.js", 55);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-list"));
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 57);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ListField';
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 59);
this.options.sortable = lang.isUndefined(options.sortable) ? false : options.sortable;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 60);
this.options.elementType = options.elementType || {type: 'string'};
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 61);
this.options.useButtons = lang.isUndefined(options.useButtons) ? false : options.useButtons;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 62);
this.options.unique = lang.isUndefined(options.unique) ? false : options.unique;
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 64);
this.options.listAddLabel = options.listAddLabel || this.messages.listAddLink;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 65);
this.options.listRemoveLabel = options.listRemoveLabel || this.messages.listRemoveLink;
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 67);
this.options.maxItems = options.maxItems;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 68);
this.options.minItems = options.minItems;
	},
	   
	/**
	 * Render the addButton 
	 * @method renderComponent
	 */
	renderComponent: function() {
	      
	   // Add element button
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "renderComponent", 75);
_yuitest_coverline("build/inputex-list/inputex-list.js", 78);
if(this.options.useButtons) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 79);
this.addButton = inputEx.cn('img', {src: inputEx.spacerUrl, className: 'inputEx-ListField-addButton'});
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 80);
this.fieldContainer.appendChild(this.addButton);
      }
	      
	   // List label
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 84);
this.fieldContainer.appendChild( inputEx.cn('span', null, {marginLeft: "4px"}, this.options.listLabel) );
	      
	   // Div element to contain the children
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 87);
this.childContainer = inputEx.cn('div', {className: 'inputEx-ListField-childContainer'});
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 88);
this.fieldContainer.appendChild(this.childContainer);
	   
	   // Add link
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 91);
if(!this.options.useButtons) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 92);
this.addButton = inputEx.cn('a', {className: 'inputEx-ListField-addLink'}, null, this.options.listAddLabel);
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 93);
this.fieldContainer.appendChild(this.addButton);
      }
	},
	   
	/**
	 * Handle the click event on the add button
	 * @method initEvents
	 */
	initEvents: function() {
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "initEvents", 101);
_yuitest_coverline("build/inputex-list/inputex-list.js", 102);
Y.one(this.addButton).on('click', this.onAddButton, this, true);
	},
	
	/**
    * Validate each field
    * @method validate
    * @return {Boolean} true if all fields validate, required fields are not empty and unique constraint (if specified) is not violated
    */
   validate: function() {

      _yuitest_coverfunc("build/inputex-list/inputex-list.js", "validate", 110);
_yuitest_coverline("build/inputex-list/inputex-list.js", 112);
var response = true;
      
      _yuitest_coverline("build/inputex-list/inputex-list.js", 114);
var uniques = {}; // Hash for unique values option
      _yuitest_coverline("build/inputex-list/inputex-list.js", 115);
var l = this.subFields.length;

      // Validate maxItems / minItems
      _yuitest_coverline("build/inputex-list/inputex-list.js", 118);
if( lang.isNumber(this.options.minItems) && l < this.options.minItems  ) {
         _yuitest_coverline("build/inputex-list/inputex-list.js", 119);
response = false;
      }
      _yuitest_coverline("build/inputex-list/inputex-list.js", 121);
if( lang.isNumber(this.options.maxItems) && l > this.options.maxItems  ) {
         _yuitest_coverline("build/inputex-list/inputex-list.js", 122);
response = false;
      }

      // Validate all the sub fields
      _yuitest_coverline("build/inputex-list/inputex-list.js", 126);
for (var i = 0 ; i < l && response; i++) {
         _yuitest_coverline("build/inputex-list/inputex-list.js", 127);
var input = this.subFields[i];
         _yuitest_coverline("build/inputex-list/inputex-list.js", 128);
var state = input.getState();
         _yuitest_coverline("build/inputex-list/inputex-list.js", 129);
input.setClassFromState(state); // update field classes (mark invalid fields...)
         _yuitest_coverline("build/inputex-list/inputex-list.js", 130);
if( state == inputEx.stateRequired || state == inputEx.stateInvalid ) {
            _yuitest_coverline("build/inputex-list/inputex-list.js", 131);
response = false; // but keep looping on fields to set classes
         }
         _yuitest_coverline("build/inputex-list/inputex-list.js", 133);
if(this.options.unique) {
            _yuitest_coverline("build/inputex-list/inputex-list.js", 134);
var hash = lang.dump(input.getValue());
            _yuitest_coverline("build/inputex-list/inputex-list.js", 135);
if(uniques[hash]) {
               _yuitest_coverline("build/inputex-list/inputex-list.js", 136);
response = false;    // not unique
            } else {
               _yuitest_coverline("build/inputex-list/inputex-list.js", 138);
uniques[hash] = true;
            }
          }
      }
      _yuitest_coverline("build/inputex-list/inputex-list.js", 142);
return response;
   },
	   
	/**
	 * Set the value of all the subfields
	 * @method setValue
	 * @param {Array} value The list of values to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(value, sendUpdatedEvt) {
	   
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "setValue", 151);
_yuitest_coverline("build/inputex-list/inputex-list.js", 153);
if(!lang.isArray(value) ) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 154);
throw new Error("inputEx.ListField.setValue expected an array, got "+(typeof value));
	   }
	      
	   // Set the values (and add the lines if necessary)
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 158);
for(var i = 0 ; i < value.length ; i++) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 159);
if(i == this.subFields.length) {
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 160);
this.addElement(value[i]);
	      }
	      else {
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 163);
this.subFields[i].setValue(value[i], false);
	      }
	   }
	      
	   // Remove additional subFields
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 168);
var additionalElements = this.subFields.length-value.length;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 169);
if(additionalElements > 0) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 170);
for(i = 0 ; i < additionalElements ; i++) { 
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 171);
this.removeElement(value.length);
	      }
	   }
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 175);
inputEx.ListField.superclass.setValue.call(this, value, sendUpdatedEvt);
	},
	   
	/**
	 * Return the array of values
	 * @method getValue
	 * @return {Array} The array
	 */
	getValue: function() {
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "getValue", 183);
_yuitest_coverline("build/inputex-list/inputex-list.js", 184);
var values = [];
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 185);
for(var i = 0 ; i < this.subFields.length ; i++) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 186);
values[i] = this.subFields[i].getValue();
	   }
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 188);
return values;
	},
	   
	/**
	 * Adds an element
	 * @method addElement
	 * @param {Any} The initial value of the subfield to create
	 * @return {inputEx.Field} SubField added instance
	 */
	addElement: function(value) {
	
	   // Render the subField
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "addElement", 197);
_yuitest_coverline("build/inputex-list/inputex-list.js", 200);
var subFieldEl = this.renderSubField(value);
	
		_yuitest_coverline("build/inputex-list/inputex-list.js", 202);
if(this.options.name) {
	   	_yuitest_coverline("build/inputex-list/inputex-list.js", 203);
subFieldEl.setFieldName(this.options.name+"["+this.subFields.length+"]");
		}
	
	   // Adds it to the local list
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 207);
this.subFields.push(subFieldEl);
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 209);
return subFieldEl;
	},
	
	/**
	 * Re-set the name of all the fields (when we remove an element)
	 * @method resetAllNames
	 */
	resetAllNames: function() {
		_yuitest_coverfunc("build/inputex-list/inputex-list.js", "resetAllNames", 216);
_yuitest_coverline("build/inputex-list/inputex-list.js", 217);
if(this.options.name) {
			_yuitest_coverline("build/inputex-list/inputex-list.js", 218);
for(var i = 0 ; i < this.subFields.length ; i++) {
				_yuitest_coverline("build/inputex-list/inputex-list.js", 219);
var subFieldEl = this.subFields[i];
				_yuitest_coverline("build/inputex-list/inputex-list.js", 220);
subFieldEl.setFieldName(this.options.name+"["+i+"]");
			}
		}
	},
	
	/**
	 * Add a new element to the list and fire updated event
	 * @method onAddButton
	 * @param {Event} e The original click event
	 */
	onAddButton: function(e) {
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "onAddButton", 230);
_yuitest_coverline("build/inputex-list/inputex-list.js", 231);
e.halt();
	   
	   // Prevent adding a new field if already at maxItems
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 234);
if( lang.isNumber(this.options.maxItems) && this.subFields.length >= this.options.maxItems ) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 235);
return;
	   }
	   
	   // Add a field with no value: 
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 239);
var subFieldEl = this.addElement();
	   
	   // Focus on this field
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 242);
subFieldEl.focus();
	   
	   // Fire updated !
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 245);
this.fireUpdatedEvt();
	},
	   
	/**
	 * Adds a new line to the List Field
	 * @method renderSubField
 	 * @param {Any} The initial value of the subfield to create
	 * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)
	 */
	renderSubField: function(value) {
	      
	   // Div that wraps the deleteButton + the subField
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "renderSubField", 254);
_yuitest_coverline("build/inputex-list/inputex-list.js", 257);
var newDiv = inputEx.cn('div'), delButton;
	      
	   // Delete button
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 260);
if(this.options.useButtons) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 261);
delButton = inputEx.cn('img', {src: inputEx.spacerUrl, className: 'inputEx-ListField-delButton'});
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 262);
Y.one(delButton).on('click', this.onDelete, this);
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 263);
newDiv.appendChild( delButton );
      }
	      
	   // Instantiate the new subField
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 267);
var opts = Y.merge({}, this.options.elementType);
	   
      // New prefered way to set options of a field
      _yuitest_coverline("build/inputex-list/inputex-list.js", 270);
if (!lang.isUndefined(value)) {
         _yuitest_coverline("build/inputex-list/inputex-list.js", 271);
opts.value = value;
      }
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 274);
var el = inputEx(opts,this);
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 276);
var subFieldEl = el.getEl();
		 _yuitest_coverline("build/inputex-list/inputex-list.js", 277);
Y.one(subFieldEl).addClass('inputEx-ListField-subFieldEl');
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 278);
newDiv.appendChild( subFieldEl );
	   
	   // Subscribe the onChange event to resend it 
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 281);
el.on("updated",this.onChange, this, true);
	
	   // Arrows to order:
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 284);
if(this.options.sortable) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 285);
var arrowUp = inputEx.cn('div', {className: 'inputEx-ListField-Arrow inputEx-ListField-ArrowUp'});
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 286);
Y.one(arrowUp).on('click', this.onArrowUp, this);
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 287);
var arrowDown = inputEx.cn('div', {className: 'inputEx-ListField-Arrow inputEx-ListField-ArrowDown'});
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 288);
Y.one(arrowDown).on('click', this.onArrowDown, this, true);
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 289);
newDiv.appendChild( arrowUp );
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 290);
newDiv.appendChild( arrowDown );
	   }
	   
	   // Delete link
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 294);
if(!this.options.useButtons) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 295);
delButton = inputEx.cn('a', {className: 'inputEx-ListField-delLink'}, null, this.options.listRemoveLabel);
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 296);
Y.one(delButton).on('click', this.onDelete, this);
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 297);
newDiv.appendChild( delButton );
      }
	
	   // Line breaker
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 301);
newDiv.appendChild( inputEx.cn('div', null, {clear: "both"}) );
	
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 303);
this.childContainer.appendChild(newDiv);
	      
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 305);
return el;
	},
	   
	/**
	 * Switch a subField with its previous one
	 * Called when the user clicked on the up arrow of a sortable list
	 * @method onArrowUp
	 * @param {Event} e Original click event
	 */
	onArrowUp: function(e) {
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "onArrowUp", 314);
_yuitest_coverline("build/inputex-list/inputex-list.js", 315);
var childElement = e.target._node.parentNode;
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 317);
var previousChildNode = null;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 318);
var nodeIndex = -1;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 319);
for(var i = 1 ; i < childElement.parentNode.childNodes.length ; i++) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 320);
var el=childElement.parentNode.childNodes[i];
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 321);
if(el == childElement) {
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 322);
previousChildNode = childElement.parentNode.childNodes[i-1];
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 323);
nodeIndex = i;
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 324);
break;
	      }
	   }
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 328);
if(previousChildNode) {
	      // Remove the line
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 330);
var elToMove = this.childContainer.removeChild(childElement);
	      
	      // Adds it before the previousChildNode
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 333);
this.childContainer.insertBefore(elToMove, previousChildNode);
	      
	      // Swap this.subFields elements (i,i-1)
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 336);
var temp = this.subFields[nodeIndex];
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 337);
this.subFields[nodeIndex] = this.subFields[nodeIndex-1];
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 338);
this.subFields[nodeIndex-1] = temp;
	
			// Note: not very efficient, we could just swap the names
			_yuitest_coverline("build/inputex-list/inputex-list.js", 341);
this.resetAllNames();
	
	      // Color Animation
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 344);
if(this.arrowAnim) {
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 345);
this.arrowAnim.stop(true);
	      }
	      
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 348);
this.arrowAnim = new Y.Anim({node:elToMove, from: {backgroundColor: this.arrowAnimColors.from}, to : {backgroundColor: this.arrowAnimColors.to },duration: 0.4});
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 349);
this.arrowAnim.on("end",function() { _yuitest_coverfunc("build/inputex-list/inputex-list.js", "(anonymous 2)", 349);
Y.one(elToMove).setStyle('backgroundColor', ''); });
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 350);
this.arrowAnim.run();
	      
	      // Fire updated !
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 353);
this.fireUpdatedEvt();
	   }
	},
	
	/**
	 * Switch a subField with its next one
	 * Called when the user clicked on the down arrow of a sortable list
	 * @method onArrowDown
	 * @param {Event} e Original click event
	 */
	onArrowDown: function(e) {
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "onArrowDown", 363);
_yuitest_coverline("build/inputex-list/inputex-list.js", 364);
var childElement = e.target._node.parentNode;
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 366);
var nodeIndex = -1;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 367);
var nextChildNode = null;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 368);
for(var i = 0 ; i < childElement.parentNode.childNodes.length ; i++) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 369);
var el=childElement.parentNode.childNodes[i];
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 370);
if(el == childElement) {
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 371);
nextChildNode = childElement.parentNode.childNodes[i+1];
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 372);
nodeIndex = i;
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 373);
break;
	      }
	   }
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 377);
if(nextChildNode) {
	      // Remove the line
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 379);
var elToMove = this.childContainer.removeChild(childElement);
	      
	      // Adds it after the nextChildNode
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 382);
Y.one(nextChildNode).insert(elToMove, "after");
	      
	      // Swap this.subFields elements (i,i+1)
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 385);
var temp = this.subFields[nodeIndex];
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 386);
this.subFields[nodeIndex] = this.subFields[nodeIndex+1];
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 387);
this.subFields[nodeIndex+1] = temp;
	
			// Note: not very efficient, we could just swap the names
			_yuitest_coverline("build/inputex-list/inputex-list.js", 390);
this.resetAllNames();      
	
	      // Color Animation
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 393);
if(this.arrowAnim) {
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 394);
this.arrowAnim.stop(true);
	      }
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 396);
this.arrowAnim = new Y.Anim({node: elToMove, from: {backgroundColor: this.arrowAnimColors.from}, to : {backgroundColor: this.arrowAnimColors.to }, duration: 1});
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 397);
this.arrowAnim.on("end",function() { _yuitest_coverfunc("build/inputex-list/inputex-list.js", "(anonymous 3)", 397);
Y.one(elToMove).setStyle( 'backgroundColor', ''); });
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 398);
this.arrowAnim.run();
	      
	      // Fire updated !
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 401);
this.fireUpdatedEvt();
	   }
	},
	   
	/**
	 * Called when the user clicked on a delete button.
	 * @method onDelete
	 * @param {Event} e The original click event
	 */
	onDelete: function(e) {
	      
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "onDelete", 410);
_yuitest_coverline("build/inputex-list/inputex-list.js", 412);
e.halt();
	   
	   // Prevent removing a field if already at minItems
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 415);
if( lang.isNumber(this.options.minItems) && this.subFields.length <= this.options.minItems ) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 416);
return;
	   }
	      
	   // Get the wrapping div element
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 420);
var elementDiv = e.target._node.parentNode;
	   
	   // Get the index of the subField
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 423);
var index = -1;
	   
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 425);
var subFieldEl = elementDiv.childNodes[this.options.useButtons ? 1 : 0];
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 426);
for(var i = 0 ; i < this.subFields.length ; i++) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 427);
if(this.subFields[i].getEl() == subFieldEl) {
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 428);
index = i;
	         _yuitest_coverline("build/inputex-list/inputex-list.js", 429);
break;
	      }
	   }
	      
	   // Remove it
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 434);
if(index != -1) {
	      _yuitest_coverline("build/inputex-list/inputex-list.js", 435);
this.removeElement(index);
	   }
		
		// Note: not very efficient
		_yuitest_coverline("build/inputex-list/inputex-list.js", 439);
this.resetAllNames();      
	
	   // Fire the updated event
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 442);
this.fireUpdatedEvt();
	},
	   
	/**
	 * Remove the line from the dom and the subField from the list.
	 * @method removeElement
	 * @param {integer} index The index of the element to remove
	 */
	removeElement: function(index) {
	   _yuitest_coverfunc("build/inputex-list/inputex-list.js", "removeElement", 450);
_yuitest_coverline("build/inputex-list/inputex-list.js", 451);
var elementDiv = this.subFields[index].getEl().parentNode;
	      
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 453);
this.subFields[index] = undefined;
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 454);
this.subFields = inputEx.compactArray(this.subFields);
	      
	   // Remove the element
	   _yuitest_coverline("build/inputex-list/inputex-list.js", 457);
elementDiv.parentNode.removeChild(elementDiv);
	},
	
	/**
    * Clear the field by setting the field value to this.options.value
    * @method clear
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
    clear: function(sendUpdatedEvt) {
        _yuitest_coverfunc("build/inputex-list/inputex-list.js", "clear", 465);
_yuitest_coverline("build/inputex-list/inputex-list.js", 466);
this.setValue(lang.isUndefined(this.options.value) ? [] : this.options.value, sendUpdatedEvt);
    }
	
});
	
// Register this class as "list" type
_yuitest_coverline("build/inputex-list/inputex-list.js", 472);
inputEx.registerType("list", inputEx.ListField, [
   { type: 'string', label: 'List label', name: 'listLabel', value: ''},
   { type: 'type', label: 'List element type', required: true, name: 'elementType' }
]);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "anim-base",
        "anim-color"
    ],
    "skinnable": true,
    "ix_provides": "list",
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl"
    ]
});
