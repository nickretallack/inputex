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
_yuitest_coverage["build/inputex-form/inputex-form.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-form/inputex-form.js",
    code: []
};
_yuitest_coverage["build/inputex-form/inputex-form.js"].code=["YUI.add('inputex-form', function (Y, NAME) {","","/**"," * @module inputex-form"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Create a group of fields within a FORM tag and adds buttons"," * @class inputEx.Form"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options The following options are added for Forms:"," * <ul>"," *   <li>buttons: list of button definition objects {value: 'Click Me', type: 'submit'}</li>"," *   <li>ajax: send the form through an ajax request (submit button should be present): {method: 'POST', uri: 'myScript.php', callback: same as Y.io callback}</li>"," *   <li>showMask: adds a mask over the form while the request is running (default is false)</li>"," * </ul>"," */","inputEx.Form = function(options) {","   inputEx.Form.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.Form, inputEx.Group, {","","   /**","    * Adds buttons and set ajax default parameters","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.Form.superclass.setOptions.call(this, options);","","      this.buttons = [];","","      this.options.buttons = options.buttons || [];","","      this.options.action = options.action;","   	this.options.method = options.method;","","		this.options.className =  options.className || 'inputEx-Group';","	   this.options.autocomplete = lang.isUndefined(options.autocomplete) ?","	                                  inputEx.browserAutocomplete :","	                                  (options.autocomplete === false || options.autocomplete === \"off\") ? false : true;","		","		this.options.enctype = options.enctype;","","      if(options.ajax) {","         this.options.ajax = {};","         this.options.ajax.method = options.ajax.method || 'POST';","         this.options.ajax.uri = options.ajax.uri || 'default.php';","         this.options.ajax.callback = options.ajax.callback || {};","         this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;","         this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;","","			this.options.ajax.contentType = options.ajax.contentType || \"application/json\";","			this.options.ajax.wrapObject = options.ajax.wrapObject;","      }","      ","      if (lang.isFunction(options.onSubmit)) {","         this.options.onSubmit = options.onSubmit;","      }","   },","","","   /**","    * Render the group","    * @method render","    */","   render: function() {","      // Create the div wrapper for this group","  	   this.divEl = inputEx.cn('div', {className: this.options.className});","	   if(this.options.id) {","   	   this.divEl.id = this.options.id;","   	}","   	  	   ","  	   // Create the FORM element","      this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '', className: this.options.className || 'inputEx-Form'});","      this.divEl.appendChild(this.form);","","		// set the enctype","		if(this.options.enctype) {","			this.form.setAttribute('enctype',this.options.enctype);","		}","","	   // Set the autocomplete attribute to off to disable browser autocompletion","		this.form.setAttribute('autocomplete', this.options.autocomplete ? 'on' : 'off');","   	","      // Set the name of the form","      if(this.options.formName) { this.form.name = this.options.formName; }","  	   ","  	   this.renderFields(this.form);","","      this.renderButtons();","      ","      if(this.options.disabled) {","  	      this.disable();","  	   }	  ","   },","","","   /**","    * Render the buttons","    * @method renderButtons","    */","   renderButtons: function() {","       ","      var buttonConf, button, i, buttonsNb = this.options.buttons.length;","      ","      this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});","","      for(i = 0 ; i < buttonsNb ; i++ ) {","         buttonConf = this.options.buttons[i];","   ","         // Throw Error if button is undefined","         if(!buttonConf) {","            throw new Error(\"inputEx.Form: One of the provided button is undefined ! (check trailing comma)\");","         }","         ","         button = new inputEx.widget.Button(buttonConf);","         button.render(this.buttonDiv);","         ","         this.buttons.push(button);","         ","      }","      ","      // useful for link buttons re-styling (float required on <a>'s ... )","      this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));","      ","      this.form.appendChild(this.buttonDiv);","   },","","","   /**","    * Init the events","    * @method initEvents","    */","   initEvents: function() {","      ","      var i, length;","      ","      inputEx.Form.superclass.initEvents.call(this);","      ","      ","      // Custom event to normalize form submits","      this.publish(\"submit\")","      ","      //CustomEvent to provide additionnal features afterValidation","      this.publish(\"afterValidation\")","      ","      // Two ways to trigger the form submitEvent firing","      //","      //","      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)","      //","      Y.on(\"submit\",function(e) {","         ","            // always stop event","            e.halt();","         ","            // replace with custom event","            this.fire(\"submit\");","         ","      },this.form,this);","      ","      ","      //","      // 2. click on a 'submit' or 'submit-link' button","      //","         for(i=0, length=this.buttons.length; i<length; i++) {","            ","            this.buttons[i].on(\"submit\",function() { this.fire(\"submit\"); }, this);","         ","         }","      ","      ","      // When form submitEvent is fired, call onSubmit","      this.on(\"submit\", this.options.onSubmit || this.onSubmit,this)","   },","","   /**","    * Intercept the 'onsubmit' event and stop it if !validate","    * If the ajax option object is set, use YUI async Request to send the form","    * @method onSubmit","    * @param {Event} e The original onSubmit event","    */","   onSubmit: function(e) {","	   ","      // do nothing if does not validate","	   if ( !this.validate() ) {","		   return; // no submit","	   }","	   this.fire(\"afterValidation\");","	   ","	   if(this.options.ajax) {","	      this.asyncRequest(); // send ajax request","	      return;","	   }","	   ","	   // normal submit finally","	   // (won't fire a dom \"submit\" event, so no risk to loop)","	   this.form.submit();","   },","","   /**","    * Send the form value in JSON through an ajax request","    * @method asyncRequest","    */","   asyncRequest: function() {","","      if(this.options.ajax.showMask) { this.showMask(); }","","      var formValue = this.getValue();","","      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form","      var uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;","      var method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;","","      var postData = null;","      ","      var headers = {};","","      // Classic application/x-www-form-urlencoded (like html forms)","      if(this.options.ajax.contentType == \"application/x-www-form-urlencoded\" && method != \"PUT\") {","         ","         headers[\"Content-Type\"] = \"application/x-www-form-urlencoded\";","         ","        var params = [];","        for(var key in formValue) {","          if(formValue.hasOwnProperty(key)) {","            var pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');","            params.push( pName+\"=\"+window.encodeURIComponent(formValue[key]));","          }","        }","        postData = params.join('&');","      }","      // The only other contentType available is \"application/json\"","      else {","        headers[\"Content-Type\"] = 'application/json';","","        // method PUT don't send as x-www-form-urlencoded but in JSON","        if(method == \"PUT\") {","          var formVal = this.getValue();","          var p;","          if(this.options.ajax.wrapObject) {","            p = {};","            p[this.options.ajax.wrapObject] = formVal;","          }","          else {","            p = formVal;","          }","          postData = Y.JSON.stringify(p);","        }","        else {","          // We keep this case for backward compatibility, but should not be used","          // Used when we send in JSON in POST or GET","          postData = \"value=\"+window.encodeURIComponent(Y.JSON.stringify(this.getValue()));","        }","      }","      var onSuccess = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.success) ) {","               this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      var onFailure = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.failure) ) {","               this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      Y.io(uri,{","        method:method,","        data: postData,","        headers: headers,","        on : {","          success: onSuccess,","          failure: onFailure","        },","        context: this","      });","   },","","   /**","    * Create a Mask over the form","    * @method renderMask","    */","   renderMask: function() {","      if(this.maskRendered) return;","","      // position as \"relative\" to position formMask inside as \"absolute\"","      Y.one(this.divEl).setStyle( \"position\", \"relative\");","","      // set zoom = 1 to fix hasLayout issue with IE6/7","      if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle(\"zoom\", 1); }","","      // Render mask over the divEl","      this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},","         {","            display: 'none',","            // Use offsetWidth instead of Dom.getStyle(this.divEl,\"width\") because","            // would return \"auto\" with IE instead of size in px","            width: this.divEl.offsetWidth+\"px\",","            height: this.divEl.offsetHeight+\"px\"","         },","         \"<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>\"+inputEx.messages.ajaxWait+\"</span></div>\");","      this.divEl.appendChild(this.formMask);","      this.maskRendered = true;","   },","","   /**","    * Show the form mask","    * @method showMask","    */","   showMask: function() {","      this.renderMask();","","      // Hide selects in IE 6","      this.toggleSelectsInIE(false);","","      this.formMask.style.display = '';","   },","","   /**","    * Hide the form mask","    * @method hideMask","    */","   hideMask: function() {","","      // Show selects back in IE 6","      this.toggleSelectsInIE(true);","","      this.formMask.style.display = 'none';","   },","","   /**","    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)","    * @method toggleSelectsInIE","    */","   toggleSelectsInIE: function(show) {","      // IE 6 only","      if (!!Y.UA.ie && Y.UA.ie < 7) {","         var methodName = !!show ? \"removeClass\" : \"addClass\";","         var that = this;","         Y.one(this.divEl).all(\"select\").each(function(e){","           e[methodName](\"inputEx-hidden\")","         });","      }","   },","","","   /**","    * Enable all fields and buttons in the form","    * @method enable","    */","   enable: function() {","      inputEx.Form.superclass.enable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {"," 	      this.buttons[i].enable();","      }","   },","","   /**","    * Disable all fields and buttons in the form","    * @method disable","    */","   disable: function() {","      inputEx.Form.superclass.disable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {","         this.buttons[i].disable();","      }","   },","   ","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, button;","      ","      // Unsubscribe all listeners to submit event","      Y.Event.purgeElement(this.form);","      ","      // Recursively destroy buttons","      for (i = 0, length = this.buttons.length ; i < length ; i++) {","         button = this.buttons[i];","         button.destroy();","      }","      ","      // destroy Form itself (+ inputs)","      inputEx.Form.superclass.destroy.call(this);","      ","   }","","});","","// Register this class as \"form\" type","inputEx.registerType(\"form\", inputEx.Form, [","   {  ","      type: 'list', ","      label: 'Buttons', ","      name: 'buttons', ","      elementType: {","         type: 'group', ","         fields: [","            { label: 'Label', name: 'value'},","            { type: 'select', label: 'Type', name: 'type', choices:[{ value: \"button\" }, { value: \"submit\" }] }","         ]","      }","   }","]);","","","}, '@VERSION@', {\"requires\": [\"io-base\", \"inputex-group\", \"json\", \"inputex-button\"], \"ix_provides\": \"form\"});"];
_yuitest_coverage["build/inputex-form/inputex-form.js"].lines = {"1":0,"6":0,"21":0,"22":0,"25":0,"33":0,"35":0,"37":0,"39":0,"40":0,"42":0,"43":0,"47":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"57":0,"58":0,"61":0,"62":0,"73":0,"74":0,"75":0,"79":0,"80":0,"83":0,"84":0,"88":0,"91":0,"93":0,"95":0,"97":0,"98":0,"109":0,"111":0,"113":0,"114":0,"117":0,"118":0,"121":0,"122":0,"124":0,"129":0,"131":0,"141":0,"143":0,"147":0,"150":0,"157":0,"160":0,"163":0,"171":0,"173":0,"179":0,"191":0,"192":0,"194":0,"196":0,"197":0,"198":0,"203":0,"212":0,"214":0,"217":0,"218":0,"220":0,"222":0,"225":0,"227":0,"229":0,"230":0,"231":0,"232":0,"233":0,"236":0,"240":0,"243":0,"244":0,"245":0,"246":0,"247":0,"248":0,"251":0,"253":0,"258":0,"261":0,"262":0,"263":0,"264":0,"267":0,"268":0,"269":0,"270":0,"273":0,"290":0,"293":0,"296":0,"299":0,"308":0,"309":0,"317":0,"320":0,"322":0,"332":0,"334":0,"343":0,"344":0,"345":0,"346":0,"347":0,"358":0,"360":0,"361":0,"370":0,"372":0,"373":0,"384":0,"387":0,"390":0,"391":0,"392":0,"396":0,"403":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].functions = {"Form:21":0,"setOptions:32":0,"render:71":0,"renderButtons:107":0,"(anonymous 2):157":0,"(anonymous 3):173":0,"initEvents:139":0,"onSubmit:188":0,"onSuccess:261":0,"onFailure:267":0,"asyncRequest:210":0,"renderMask:289":0,"showMask:316":0,"hideMask:329":0,"(anonymous 4):346":0,"toggleSelectsInIE:341":0,"enable:357":0,"disable:369":0,"destroy:382":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].coveredLines = 127;
_yuitest_coverage["build/inputex-form/inputex-form.js"].coveredFunctions = 20;
_yuitest_coverline("build/inputex-form/inputex-form.js", 1);
YUI.add('inputex-form', function (Y, NAME) {

/**
 * @module inputex-form
 */
  _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-form/inputex-form.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * Create a group of fields within a FORM tag and adds buttons
 * @class inputEx.Form
 * @extends inputEx.Group
 * @constructor
 * @param {Object} options The following options are added for Forms:
 * <ul>
 *   <li>buttons: list of button definition objects {value: 'Click Me', type: 'submit'}</li>
 *   <li>ajax: send the form through an ajax request (submit button should be present): {method: 'POST', uri: 'myScript.php', callback: same as Y.io callback}</li>
 *   <li>showMask: adds a mask over the form while the request is running (default is false)</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-form/inputex-form.js", 21);
inputEx.Form = function(options) {
   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "Form", 21);
_yuitest_coverline("build/inputex-form/inputex-form.js", 22);
inputEx.Form.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-form/inputex-form.js", 25);
Y.extend(inputEx.Form, inputEx.Group, {

   /**
    * Adds buttons and set ajax default parameters
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "setOptions", 32);
_yuitest_coverline("build/inputex-form/inputex-form.js", 33);
inputEx.Form.superclass.setOptions.call(this, options);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 35);
this.buttons = [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 37);
this.options.buttons = options.buttons || [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 39);
this.options.action = options.action;
   	_yuitest_coverline("build/inputex-form/inputex-form.js", 40);
this.options.method = options.method;

		_yuitest_coverline("build/inputex-form/inputex-form.js", 42);
this.options.className =  options.className || 'inputEx-Group';
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 43);
this.options.autocomplete = lang.isUndefined(options.autocomplete) ?
	                                  inputEx.browserAutocomplete :
	                                  (options.autocomplete === false || options.autocomplete === "off") ? false : true;
		
		_yuitest_coverline("build/inputex-form/inputex-form.js", 47);
this.options.enctype = options.enctype;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 49);
if(options.ajax) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 50);
this.options.ajax = {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 51);
this.options.ajax.method = options.ajax.method || 'POST';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 52);
this.options.ajax.uri = options.ajax.uri || 'default.php';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 53);
this.options.ajax.callback = options.ajax.callback || {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 54);
this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;
         _yuitest_coverline("build/inputex-form/inputex-form.js", 55);
this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;

			_yuitest_coverline("build/inputex-form/inputex-form.js", 57);
this.options.ajax.contentType = options.ajax.contentType || "application/json";
			_yuitest_coverline("build/inputex-form/inputex-form.js", 58);
this.options.ajax.wrapObject = options.ajax.wrapObject;
      }
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 61);
if (lang.isFunction(options.onSubmit)) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 62);
this.options.onSubmit = options.onSubmit;
      }
   },


   /**
    * Render the group
    * @method render
    */
   render: function() {
      // Create the div wrapper for this group
  	   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "render", 71);
_yuitest_coverline("build/inputex-form/inputex-form.js", 73);
this.divEl = inputEx.cn('div', {className: this.options.className});
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 74);
if(this.options.id) {
   	   _yuitest_coverline("build/inputex-form/inputex-form.js", 75);
this.divEl.id = this.options.id;
   	}
   	  	   
  	   // Create the FORM element
      _yuitest_coverline("build/inputex-form/inputex-form.js", 79);
this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '', className: this.options.className || 'inputEx-Form'});
      _yuitest_coverline("build/inputex-form/inputex-form.js", 80);
this.divEl.appendChild(this.form);

		// set the enctype
		_yuitest_coverline("build/inputex-form/inputex-form.js", 83);
if(this.options.enctype) {
			_yuitest_coverline("build/inputex-form/inputex-form.js", 84);
this.form.setAttribute('enctype',this.options.enctype);
		}

	   // Set the autocomplete attribute to off to disable browser autocompletion
		_yuitest_coverline("build/inputex-form/inputex-form.js", 88);
this.form.setAttribute('autocomplete', this.options.autocomplete ? 'on' : 'off');
   	
      // Set the name of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 91);
if(this.options.formName) { this.form.name = this.options.formName; }
  	   
  	   _yuitest_coverline("build/inputex-form/inputex-form.js", 93);
this.renderFields(this.form);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 95);
this.renderButtons();
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 97);
if(this.options.disabled) {
  	      _yuitest_coverline("build/inputex-form/inputex-form.js", 98);
this.disable();
  	   }	  
   },


   /**
    * Render the buttons
    * @method renderButtons
    */
   renderButtons: function() {
       
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderButtons", 107);
_yuitest_coverline("build/inputex-form/inputex-form.js", 109);
var buttonConf, button, i, buttonsNb = this.options.buttons.length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 111);
this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});

      _yuitest_coverline("build/inputex-form/inputex-form.js", 113);
for(i = 0 ; i < buttonsNb ; i++ ) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 114);
buttonConf = this.options.buttons[i];
   
         // Throw Error if button is undefined
         _yuitest_coverline("build/inputex-form/inputex-form.js", 117);
if(!buttonConf) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 118);
throw new Error("inputEx.Form: One of the provided button is undefined ! (check trailing comma)");
         }
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 121);
button = new inputEx.widget.Button(buttonConf);
         _yuitest_coverline("build/inputex-form/inputex-form.js", 122);
button.render(this.buttonDiv);
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 124);
this.buttons.push(button);
         
      }
      
      // useful for link buttons re-styling (float required on <a>'s ... )
      _yuitest_coverline("build/inputex-form/inputex-form.js", 129);
this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 131);
this.form.appendChild(this.buttonDiv);
   },


   /**
    * Init the events
    * @method initEvents
    */
   initEvents: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "initEvents", 139);
_yuitest_coverline("build/inputex-form/inputex-form.js", 141);
var i, length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 143);
inputEx.Form.superclass.initEvents.call(this);
      
      
      // Custom event to normalize form submits
      _yuitest_coverline("build/inputex-form/inputex-form.js", 147);
this.publish("submit")
      
      //CustomEvent to provide additionnal features afterValidation
      _yuitest_coverline("build/inputex-form/inputex-form.js", 150);
this.publish("afterValidation")
      
      // Two ways to trigger the form submitEvent firing
      //
      //
      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)
      //
      _yuitest_coverline("build/inputex-form/inputex-form.js", 157);
Y.on("submit",function(e) {
         
            // always stop event
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 2)", 157);
_yuitest_coverline("build/inputex-form/inputex-form.js", 160);
e.halt();
         
            // replace with custom event
            _yuitest_coverline("build/inputex-form/inputex-form.js", 163);
this.fire("submit");
         
      },this.form,this);
      
      
      //
      // 2. click on a 'submit' or 'submit-link' button
      //
         _yuitest_coverline("build/inputex-form/inputex-form.js", 171);
for(i=0, length=this.buttons.length; i<length; i++) {
            
            _yuitest_coverline("build/inputex-form/inputex-form.js", 173);
this.buttons[i].on("submit",function() { _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 3)", 173);
this.fire("submit"); }, this);
         
         }
      
      
      // When form submitEvent is fired, call onSubmit
      _yuitest_coverline("build/inputex-form/inputex-form.js", 179);
this.on("submit", this.options.onSubmit || this.onSubmit,this)
   },

   /**
    * Intercept the 'onsubmit' event and stop it if !validate
    * If the ajax option object is set, use YUI async Request to send the form
    * @method onSubmit
    * @param {Event} e The original onSubmit event
    */
   onSubmit: function(e) {
	   
      // do nothing if does not validate
	   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSubmit", 188);
_yuitest_coverline("build/inputex-form/inputex-form.js", 191);
if ( !this.validate() ) {
		   _yuitest_coverline("build/inputex-form/inputex-form.js", 192);
return; // no submit
	   }
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 194);
this.fire("afterValidation");
	   
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 196);
if(this.options.ajax) {
	      _yuitest_coverline("build/inputex-form/inputex-form.js", 197);
this.asyncRequest(); // send ajax request
	      _yuitest_coverline("build/inputex-form/inputex-form.js", 198);
return;
	   }
	   
	   // normal submit finally
	   // (won't fire a dom "submit" event, so no risk to loop)
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 203);
this.form.submit();
   },

   /**
    * Send the form value in JSON through an ajax request
    * @method asyncRequest
    */
   asyncRequest: function() {

      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "asyncRequest", 210);
_yuitest_coverline("build/inputex-form/inputex-form.js", 212);
if(this.options.ajax.showMask) { this.showMask(); }

      _yuitest_coverline("build/inputex-form/inputex-form.js", 214);
var formValue = this.getValue();

      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 217);
var uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;
      _yuitest_coverline("build/inputex-form/inputex-form.js", 218);
var method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 220);
var postData = null;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 222);
var headers = {};

      // Classic application/x-www-form-urlencoded (like html forms)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 225);
if(this.options.ajax.contentType == "application/x-www-form-urlencoded" && method != "PUT") {
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 227);
headers["Content-Type"] = "application/x-www-form-urlencoded";
         
        _yuitest_coverline("build/inputex-form/inputex-form.js", 229);
var params = [];
        _yuitest_coverline("build/inputex-form/inputex-form.js", 230);
for(var key in formValue) {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 231);
if(formValue.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 232);
var pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');
            _yuitest_coverline("build/inputex-form/inputex-form.js", 233);
params.push( pName+"="+window.encodeURIComponent(formValue[key]));
          }
        }
        _yuitest_coverline("build/inputex-form/inputex-form.js", 236);
postData = params.join('&');
      }
      // The only other contentType available is "application/json"
      else {
        _yuitest_coverline("build/inputex-form/inputex-form.js", 240);
headers["Content-Type"] = 'application/json';

        // method PUT don't send as x-www-form-urlencoded but in JSON
        _yuitest_coverline("build/inputex-form/inputex-form.js", 243);
if(method == "PUT") {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 244);
var formVal = this.getValue();
          _yuitest_coverline("build/inputex-form/inputex-form.js", 245);
var p;
          _yuitest_coverline("build/inputex-form/inputex-form.js", 246);
if(this.options.ajax.wrapObject) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 247);
p = {};
            _yuitest_coverline("build/inputex-form/inputex-form.js", 248);
p[this.options.ajax.wrapObject] = formVal;
          }
          else {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 251);
p = formVal;
          }
          _yuitest_coverline("build/inputex-form/inputex-form.js", 253);
postData = Y.JSON.stringify(p);
        }
        else {
          // We keep this case for backward compatibility, but should not be used
          // Used when we send in JSON in POST or GET
          _yuitest_coverline("build/inputex-form/inputex-form.js", 258);
postData = "value="+window.encodeURIComponent(Y.JSON.stringify(this.getValue()));
        }
      }
      _yuitest_coverline("build/inputex-form/inputex-form.js", 261);
var onSuccess = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSuccess", 261);
_yuitest_coverline("build/inputex-form/inputex-form.js", 262);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 263);
if( lang.isFunction(this.options.ajax.callback.success) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 264);
this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 267);
var onFailure = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onFailure", 267);
_yuitest_coverline("build/inputex-form/inputex-form.js", 268);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 269);
if( lang.isFunction(this.options.ajax.callback.failure) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 270);
this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 273);
Y.io(uri,{
        method:method,
        data: postData,
        headers: headers,
        on : {
          success: onSuccess,
          failure: onFailure
        },
        context: this
      });
   },

   /**
    * Create a Mask over the form
    * @method renderMask
    */
   renderMask: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderMask", 289);
_yuitest_coverline("build/inputex-form/inputex-form.js", 290);
if(this.maskRendered) {return;}

      // position as "relative" to position formMask inside as "absolute"
      _yuitest_coverline("build/inputex-form/inputex-form.js", 293);
Y.one(this.divEl).setStyle( "position", "relative");

      // set zoom = 1 to fix hasLayout issue with IE6/7
      _yuitest_coverline("build/inputex-form/inputex-form.js", 296);
if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle("zoom", 1); }

      // Render mask over the divEl
      _yuitest_coverline("build/inputex-form/inputex-form.js", 299);
this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},
         {
            display: 'none',
            // Use offsetWidth instead of Dom.getStyle(this.divEl,"width") because
            // would return "auto" with IE instead of size in px
            width: this.divEl.offsetWidth+"px",
            height: this.divEl.offsetHeight+"px"
         },
         "<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>"+inputEx.messages.ajaxWait+"</span></div>");
      _yuitest_coverline("build/inputex-form/inputex-form.js", 308);
this.divEl.appendChild(this.formMask);
      _yuitest_coverline("build/inputex-form/inputex-form.js", 309);
this.maskRendered = true;
   },

   /**
    * Show the form mask
    * @method showMask
    */
   showMask: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "showMask", 316);
_yuitest_coverline("build/inputex-form/inputex-form.js", 317);
this.renderMask();

      // Hide selects in IE 6
      _yuitest_coverline("build/inputex-form/inputex-form.js", 320);
this.toggleSelectsInIE(false);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 322);
this.formMask.style.display = '';
   },

   /**
    * Hide the form mask
    * @method hideMask
    */
   hideMask: function() {

      // Show selects back in IE 6
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "hideMask", 329);
_yuitest_coverline("build/inputex-form/inputex-form.js", 332);
this.toggleSelectsInIE(true);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 334);
this.formMask.style.display = 'none';
   },

   /**
    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)
    * @method toggleSelectsInIE
    */
   toggleSelectsInIE: function(show) {
      // IE 6 only
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "toggleSelectsInIE", 341);
_yuitest_coverline("build/inputex-form/inputex-form.js", 343);
if (!!Y.UA.ie && Y.UA.ie < 7) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 344);
var methodName = !!show ? "removeClass" : "addClass";
         _yuitest_coverline("build/inputex-form/inputex-form.js", 345);
var that = this;
         _yuitest_coverline("build/inputex-form/inputex-form.js", 346);
Y.one(this.divEl).all("select").each(function(e){
           _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 4)", 346);
_yuitest_coverline("build/inputex-form/inputex-form.js", 347);
e[methodName]("inputEx-hidden")
         });
      }
   },


   /**
    * Enable all fields and buttons in the form
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "enable", 357);
_yuitest_coverline("build/inputex-form/inputex-form.js", 358);
inputEx.Form.superclass.enable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 360);
for (var i = 0 ; i < this.buttons.length ; i++) {
 	      _yuitest_coverline("build/inputex-form/inputex-form.js", 361);
this.buttons[i].enable();
      }
   },

   /**
    * Disable all fields and buttons in the form
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "disable", 369);
_yuitest_coverline("build/inputex-form/inputex-form.js", 370);
inputEx.Form.superclass.disable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 372);
for (var i = 0 ; i < this.buttons.length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 373);
this.buttons[i].disable();
      }
   },
   
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "destroy", 382);
_yuitest_coverline("build/inputex-form/inputex-form.js", 384);
var i, length, button;
      
      // Unsubscribe all listeners to submit event
      _yuitest_coverline("build/inputex-form/inputex-form.js", 387);
Y.Event.purgeElement(this.form);
      
      // Recursively destroy buttons
      _yuitest_coverline("build/inputex-form/inputex-form.js", 390);
for (i = 0, length = this.buttons.length ; i < length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 391);
button = this.buttons[i];
         _yuitest_coverline("build/inputex-form/inputex-form.js", 392);
button.destroy();
      }
      
      // destroy Form itself (+ inputs)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 396);
inputEx.Form.superclass.destroy.call(this);
      
   }

});

// Register this class as "form" type
_yuitest_coverline("build/inputex-form/inputex-form.js", 403);
inputEx.registerType("form", inputEx.Form, [
   {  
      type: 'list', 
      label: 'Buttons', 
      name: 'buttons', 
      elementType: {
         type: 'group', 
         fields: [
            { label: 'Label', name: 'value'},
            { type: 'select', label: 'Type', name: 'type', choices:[{ value: "button" }, { value: "submit" }] }
         ]
      }
   }
]);


}, '@VERSION@', {"requires": ["io-base", "inputex-group", "json", "inputex-button"], "ix_provides": "form"});
