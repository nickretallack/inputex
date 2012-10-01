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
_yuitest_coverage["build/inputex-form/inputex-form.js"].code=["YUI.add('inputex-form', function (Y, NAME) {","","/**"," * @module inputex-form"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Create a group of fields within a FORM tag and adds buttons"," * @class inputEx.Form"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options The following options are added for Forms:"," * <ul>"," *   <li>buttons: list of button definition objects {value: 'Click Me', type: 'submit'}</li>"," *   <li>ajax: send the form through an ajax request (submit button should be present): {method: 'POST', uri: 'myScript.php', callback: same as Y.io callback}</li>"," *   <li>showMask: adds a mask over the form while the request is running (default is false)</li>"," * </ul>"," */","inputEx.Form = function(options) {","   inputEx.Form.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.Form, inputEx.Group, {","","   /**","    * Adds buttons and set ajax default parameters","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.Form.superclass.setOptions.call(this, options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-form\"));","","      this.buttons = [];","","      this.options.buttons = options.buttons || [];","","      this.options.action = options.action;","   	this.options.method = options.method;","","		this.options.className =  options.className || 'inputEx-Group';","	   this.options.autocomplete = lang.isUndefined(options.autocomplete) ?","	                                  inputEx.browserAutocomplete :","	                                  (options.autocomplete === false || options.autocomplete === \"off\") ? false : true;","		","		this.options.enctype = options.enctype;","","      if(options.ajax) {","         this.options.ajax = {};","         this.options.ajax.method = options.ajax.method || 'POST';","         this.options.ajax.uri = options.ajax.uri || 'default.php';","         this.options.ajax.callback = options.ajax.callback || {};","         this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;","         this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;","","			this.options.ajax.contentType = options.ajax.contentType || \"application/json\";","			this.options.ajax.wrapObject = options.ajax.wrapObject;","      }","      ","      if (lang.isFunction(options.onSubmit)) {","         this.options.onSubmit = options.onSubmit;","      }","   },","","","   /**","    * Render the group","    * @method render","    */","   render: function() {","      // Create the div wrapper for this group","  	   this.divEl = inputEx.cn('div', {className: this.options.className});","	   if(this.options.id) {","   	   this.divEl.id = this.options.id;","   	}","   	  	   ","  	   // Create the FORM element","      this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '', className: this.options.className || 'inputEx-Form'});","      this.divEl.appendChild(this.form);","","		// set the enctype","		if(this.options.enctype) {","			this.form.setAttribute('enctype',this.options.enctype);","		}","","	   // Set the autocomplete attribute to off to disable browser autocompletion","		this.form.setAttribute('autocomplete', this.options.autocomplete ? 'on' : 'off');","   	","      // Set the name of the form","      if(this.options.formName) { this.form.name = this.options.formName; }","  	   ","  	   this.renderFields(this.form);","","      this.renderButtons();","      ","      if(this.options.disabled) {","  	      this.disable();","  	   }	  ","   },","","","   /**","    * Render the buttons","    * @method renderButtons","    */","   renderButtons: function() {","       ","      var buttonConf, button, i, buttonsNb = this.options.buttons.length;","      ","      this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});","","      for(i = 0 ; i < buttonsNb ; i++ ) {","         buttonConf = this.options.buttons[i];","   ","         // Throw Error if button is undefined","         if(!buttonConf) {","            throw new Error(\"inputEx.Form: One of the provided button is undefined ! (check trailing comma)\");","         }","         ","         button = new inputEx.widget.Button(buttonConf);","         button.render(this.buttonDiv);","         ","         this.buttons.push(button);","         ","      }","      ","      // useful for link buttons re-styling (float required on <a>'s ... )","      this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));","      ","      this.form.appendChild(this.buttonDiv);","   },","","","   /**","    * Init the events","    * @method initEvents","    */","   initEvents: function() {","      ","      var i, length;","      ","      inputEx.Form.superclass.initEvents.call(this);","      ","      ","      // Custom event to normalize form submits","      this.publish(\"submit\")","      ","      //CustomEvent to provide additionnal features afterValidation","      this.publish(\"afterValidation\")","      ","      // Two ways to trigger the form submitEvent firing","      //","      //","      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)","      //","      Y.on(\"submit\",function(e) {","         ","            // always stop event","            e.halt();","         ","            // replace with custom event","            this.fire(\"submit\");","         ","      },this.form,this);","      ","      ","      //","      // 2. click on a 'submit' or 'submit-link' button","      //","         for(i=0, length=this.buttons.length; i<length; i++) {","            ","            this.buttons[i].on(\"submit\",function() { this.fire(\"submit\"); }, this);","         ","         }","      ","      ","      // When form submitEvent is fired, call onSubmit","      this.on(\"submit\", this.options.onSubmit || this.onSubmit,this)","   },","","   /**","    * Intercept the 'onsubmit' event and stop it if !validate","    * If the ajax option object is set, use YUI async Request to send the form","    * @method onSubmit","    * @param {Event} e The original onSubmit event","    */","   onSubmit: function(e) {","	   ","      // do nothing if does not validate","	   if ( !this.validate() ) {","		   return; // no submit","	   }","	   this.fire(\"afterValidation\");","	   ","	   if(this.options.ajax) {","	      this.asyncRequest(); // send ajax request","	      return;","	   }","	   ","	   // normal submit finally","	   // (won't fire a dom \"submit\" event, so no risk to loop)","	   this.form.submit();","   },","","   /**","    * Send the form value in JSON through an ajax request","    * @method asyncRequest","    */","   asyncRequest: function() {","","      if(this.options.ajax.showMask) { this.showMask(); }","","      var formValue = this.getValue();","","      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form","      var uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;","      var method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;","","      var postData = null;","      ","      var headers = {};","","      // Classic application/x-www-form-urlencoded (like html forms)","      if(this.options.ajax.contentType == \"application/x-www-form-urlencoded\" && method != \"PUT\") {","         ","         headers[\"Content-Type\"] = \"application/x-www-form-urlencoded\";","         ","        var params = [];","        for(var key in formValue) {","          if(formValue.hasOwnProperty(key)) {","            var pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');","            params.push( pName+\"=\"+window.encodeURIComponent(formValue[key]));","          }","        }","        postData = params.join('&');","      }","      // The only other contentType available is \"application/json\"","      else {","        headers[\"Content-Type\"] = 'application/json';","","        // method PUT don't send as x-www-form-urlencoded but in JSON","        if(method == \"PUT\") {","          var formVal = this.getValue();","          var p;","          if(this.options.ajax.wrapObject) {","            p = {};","            p[this.options.ajax.wrapObject] = formVal;","          }","          else {","            p = formVal;","          }","          postData = Y.JSON.stringify(p);","        }","        else {","          // We keep this case for backward compatibility, but should not be used","          // Used when we send in JSON in POST or GET","          postData = \"value=\"+window.encodeURIComponent(Y.JSON.stringify(this.getValue()));","        }","      }","      var onSuccess = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.success) ) {","               this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      var onFailure = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.failure) ) {","               this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      Y.io(uri,{","        method:method,","        data: postData,","        headers: headers,","        on : {","          success: onSuccess,","          failure: onFailure","        },","        context: this","      });","   },","","   /**","    * Create a Mask over the form","    * @method renderMask","    */","   renderMask: function() {","      if(this.maskRendered) return;","","      // position as \"relative\" to position formMask inside as \"absolute\"","      Y.one(this.divEl).setStyle( \"position\", \"relative\");","","      // set zoom = 1 to fix hasLayout issue with IE6/7","      if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle(\"zoom\", 1); }","","      // Render mask over the divEl","      this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},","         {","            display: 'none',","            // Use offsetWidth instead of Dom.getStyle(this.divEl,\"width\") because","            // would return \"auto\" with IE instead of size in px","            width: this.divEl.offsetWidth+\"px\",","            height: this.divEl.offsetHeight+\"px\"","         },","         \"<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>\"+this.messages.ajaxWait+\"</span></div>\");","      this.divEl.appendChild(this.formMask);","      this.maskRendered = true;","   },","","   /**","    * Show the form mask","    * @method showMask","    */","   showMask: function() {","      this.renderMask();","","      // Hide selects in IE 6","      this.toggleSelectsInIE(false);","","      this.formMask.style.display = '';","   },","","   /**","    * Hide the form mask","    * @method hideMask","    */","   hideMask: function() {","","      // Show selects back in IE 6","      this.toggleSelectsInIE(true);","","      this.formMask.style.display = 'none';","   },","","   /**","    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)","    * @method toggleSelectsInIE","    */","   toggleSelectsInIE: function(show) {","      // IE 6 only","      if (!!Y.UA.ie && Y.UA.ie < 7) {","         var methodName = !!show ? \"removeClass\" : \"addClass\";","         var that = this;","         Y.one(this.divEl).all(\"select\").each(function(e){","           e[methodName](\"inputEx-hidden\")","         });","      }","   },","","","   /**","    * Enable all fields and buttons in the form","    * @method enable","    */","   enable: function() {","      inputEx.Form.superclass.enable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {"," 	      this.buttons[i].enable();","      }","   },","","   /**","    * Disable all fields and buttons in the form","    * @method disable","    */","   disable: function() {","      inputEx.Form.superclass.disable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {","         this.buttons[i].disable();","      }","   },","   ","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, button;","      ","      // Unsubscribe all listeners to submit event","      Y.Event.purgeElement(this.form);","      ","      // Recursively destroy buttons","      for (i = 0, length = this.buttons.length ; i < length ; i++) {","         button = this.buttons[i];","         button.destroy();","      }","      ","      // destroy Form itself (+ inputs)","      inputEx.Form.superclass.destroy.call(this);","      ","   }","","});","","// Register this class as \"form\" type","inputEx.registerType(\"form\", inputEx.Form, [","   {  ","      type: 'list', ","      label: 'Buttons', ","      name: 'buttons', ","      elementType: {","         type: 'group', ","         fields: [","            { label: 'Label', name: 'value'},","            { type: 'select', label: 'Type', name: 'type', choices:[{ value: \"button\" }, { value: \"submit\" }] }","         ]","      }","   }","]);","","","}, '@VERSION@', {\"requires\": [\"io-base\", \"inputex-group\", \"json\", \"inputex-button\"], \"ix_provides\": \"form\", \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-form/inputex-form.js"].lines = {"1":0,"6":0,"21":0,"22":0,"25":0,"33":0,"36":0,"38":0,"40":0,"42":0,"43":0,"45":0,"46":0,"50":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":0,"60":0,"61":0,"64":0,"65":0,"76":0,"77":0,"78":0,"82":0,"83":0,"86":0,"87":0,"91":0,"94":0,"96":0,"98":0,"100":0,"101":0,"112":0,"114":0,"116":0,"117":0,"120":0,"121":0,"124":0,"125":0,"127":0,"132":0,"134":0,"144":0,"146":0,"150":0,"153":0,"160":0,"163":0,"166":0,"174":0,"176":0,"182":0,"194":0,"195":0,"197":0,"199":0,"200":0,"201":0,"206":0,"215":0,"217":0,"220":0,"221":0,"223":0,"225":0,"228":0,"230":0,"232":0,"233":0,"234":0,"235":0,"236":0,"239":0,"243":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"254":0,"256":0,"261":0,"264":0,"265":0,"266":0,"267":0,"270":0,"271":0,"272":0,"273":0,"276":0,"293":0,"296":0,"299":0,"302":0,"311":0,"312":0,"320":0,"323":0,"325":0,"335":0,"337":0,"346":0,"347":0,"348":0,"349":0,"350":0,"361":0,"363":0,"364":0,"373":0,"375":0,"376":0,"387":0,"390":0,"393":0,"394":0,"395":0,"399":0,"406":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].functions = {"Form:21":0,"setOptions:32":0,"render:74":0,"renderButtons:110":0,"(anonymous 2):160":0,"(anonymous 3):176":0,"initEvents:142":0,"onSubmit:191":0,"onSuccess:264":0,"onFailure:270":0,"asyncRequest:213":0,"renderMask:292":0,"showMask:319":0,"hideMask:332":0,"(anonymous 4):349":0,"toggleSelectsInIE:344":0,"enable:360":0,"disable:372":0,"destroy:385":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].coveredLines = 128;
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

      //I18N
      _yuitest_coverline("build/inputex-form/inputex-form.js", 36);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-form"));

      _yuitest_coverline("build/inputex-form/inputex-form.js", 38);
this.buttons = [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 40);
this.options.buttons = options.buttons || [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 42);
this.options.action = options.action;
   	_yuitest_coverline("build/inputex-form/inputex-form.js", 43);
this.options.method = options.method;

		_yuitest_coverline("build/inputex-form/inputex-form.js", 45);
this.options.className =  options.className || 'inputEx-Group';
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 46);
this.options.autocomplete = lang.isUndefined(options.autocomplete) ?
	                                  inputEx.browserAutocomplete :
	                                  (options.autocomplete === false || options.autocomplete === "off") ? false : true;
		
		_yuitest_coverline("build/inputex-form/inputex-form.js", 50);
this.options.enctype = options.enctype;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 52);
if(options.ajax) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 53);
this.options.ajax = {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 54);
this.options.ajax.method = options.ajax.method || 'POST';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 55);
this.options.ajax.uri = options.ajax.uri || 'default.php';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 56);
this.options.ajax.callback = options.ajax.callback || {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 57);
this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;
         _yuitest_coverline("build/inputex-form/inputex-form.js", 58);
this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;

			_yuitest_coverline("build/inputex-form/inputex-form.js", 60);
this.options.ajax.contentType = options.ajax.contentType || "application/json";
			_yuitest_coverline("build/inputex-form/inputex-form.js", 61);
this.options.ajax.wrapObject = options.ajax.wrapObject;
      }
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 64);
if (lang.isFunction(options.onSubmit)) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 65);
this.options.onSubmit = options.onSubmit;
      }
   },


   /**
    * Render the group
    * @method render
    */
   render: function() {
      // Create the div wrapper for this group
  	   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "render", 74);
_yuitest_coverline("build/inputex-form/inputex-form.js", 76);
this.divEl = inputEx.cn('div', {className: this.options.className});
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 77);
if(this.options.id) {
   	   _yuitest_coverline("build/inputex-form/inputex-form.js", 78);
this.divEl.id = this.options.id;
   	}
   	  	   
  	   // Create the FORM element
      _yuitest_coverline("build/inputex-form/inputex-form.js", 82);
this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '', className: this.options.className || 'inputEx-Form'});
      _yuitest_coverline("build/inputex-form/inputex-form.js", 83);
this.divEl.appendChild(this.form);

		// set the enctype
		_yuitest_coverline("build/inputex-form/inputex-form.js", 86);
if(this.options.enctype) {
			_yuitest_coverline("build/inputex-form/inputex-form.js", 87);
this.form.setAttribute('enctype',this.options.enctype);
		}

	   // Set the autocomplete attribute to off to disable browser autocompletion
		_yuitest_coverline("build/inputex-form/inputex-form.js", 91);
this.form.setAttribute('autocomplete', this.options.autocomplete ? 'on' : 'off');
   	
      // Set the name of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 94);
if(this.options.formName) { this.form.name = this.options.formName; }
  	   
  	   _yuitest_coverline("build/inputex-form/inputex-form.js", 96);
this.renderFields(this.form);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 98);
this.renderButtons();
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 100);
if(this.options.disabled) {
  	      _yuitest_coverline("build/inputex-form/inputex-form.js", 101);
this.disable();
  	   }	  
   },


   /**
    * Render the buttons
    * @method renderButtons
    */
   renderButtons: function() {
       
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderButtons", 110);
_yuitest_coverline("build/inputex-form/inputex-form.js", 112);
var buttonConf, button, i, buttonsNb = this.options.buttons.length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 114);
this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});

      _yuitest_coverline("build/inputex-form/inputex-form.js", 116);
for(i = 0 ; i < buttonsNb ; i++ ) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 117);
buttonConf = this.options.buttons[i];
   
         // Throw Error if button is undefined
         _yuitest_coverline("build/inputex-form/inputex-form.js", 120);
if(!buttonConf) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 121);
throw new Error("inputEx.Form: One of the provided button is undefined ! (check trailing comma)");
         }
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 124);
button = new inputEx.widget.Button(buttonConf);
         _yuitest_coverline("build/inputex-form/inputex-form.js", 125);
button.render(this.buttonDiv);
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 127);
this.buttons.push(button);
         
      }
      
      // useful for link buttons re-styling (float required on <a>'s ... )
      _yuitest_coverline("build/inputex-form/inputex-form.js", 132);
this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 134);
this.form.appendChild(this.buttonDiv);
   },


   /**
    * Init the events
    * @method initEvents
    */
   initEvents: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "initEvents", 142);
_yuitest_coverline("build/inputex-form/inputex-form.js", 144);
var i, length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 146);
inputEx.Form.superclass.initEvents.call(this);
      
      
      // Custom event to normalize form submits
      _yuitest_coverline("build/inputex-form/inputex-form.js", 150);
this.publish("submit")
      
      //CustomEvent to provide additionnal features afterValidation
      _yuitest_coverline("build/inputex-form/inputex-form.js", 153);
this.publish("afterValidation")
      
      // Two ways to trigger the form submitEvent firing
      //
      //
      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)
      //
      _yuitest_coverline("build/inputex-form/inputex-form.js", 160);
Y.on("submit",function(e) {
         
            // always stop event
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 2)", 160);
_yuitest_coverline("build/inputex-form/inputex-form.js", 163);
e.halt();
         
            // replace with custom event
            _yuitest_coverline("build/inputex-form/inputex-form.js", 166);
this.fire("submit");
         
      },this.form,this);
      
      
      //
      // 2. click on a 'submit' or 'submit-link' button
      //
         _yuitest_coverline("build/inputex-form/inputex-form.js", 174);
for(i=0, length=this.buttons.length; i<length; i++) {
            
            _yuitest_coverline("build/inputex-form/inputex-form.js", 176);
this.buttons[i].on("submit",function() { _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 3)", 176);
this.fire("submit"); }, this);
         
         }
      
      
      // When form submitEvent is fired, call onSubmit
      _yuitest_coverline("build/inputex-form/inputex-form.js", 182);
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
	   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSubmit", 191);
_yuitest_coverline("build/inputex-form/inputex-form.js", 194);
if ( !this.validate() ) {
		   _yuitest_coverline("build/inputex-form/inputex-form.js", 195);
return; // no submit
	   }
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 197);
this.fire("afterValidation");
	   
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 199);
if(this.options.ajax) {
	      _yuitest_coverline("build/inputex-form/inputex-form.js", 200);
this.asyncRequest(); // send ajax request
	      _yuitest_coverline("build/inputex-form/inputex-form.js", 201);
return;
	   }
	   
	   // normal submit finally
	   // (won't fire a dom "submit" event, so no risk to loop)
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 206);
this.form.submit();
   },

   /**
    * Send the form value in JSON through an ajax request
    * @method asyncRequest
    */
   asyncRequest: function() {

      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "asyncRequest", 213);
_yuitest_coverline("build/inputex-form/inputex-form.js", 215);
if(this.options.ajax.showMask) { this.showMask(); }

      _yuitest_coverline("build/inputex-form/inputex-form.js", 217);
var formValue = this.getValue();

      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 220);
var uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;
      _yuitest_coverline("build/inputex-form/inputex-form.js", 221);
var method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 223);
var postData = null;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 225);
var headers = {};

      // Classic application/x-www-form-urlencoded (like html forms)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 228);
if(this.options.ajax.contentType == "application/x-www-form-urlencoded" && method != "PUT") {
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 230);
headers["Content-Type"] = "application/x-www-form-urlencoded";
         
        _yuitest_coverline("build/inputex-form/inputex-form.js", 232);
var params = [];
        _yuitest_coverline("build/inputex-form/inputex-form.js", 233);
for(var key in formValue) {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 234);
if(formValue.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 235);
var pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');
            _yuitest_coverline("build/inputex-form/inputex-form.js", 236);
params.push( pName+"="+window.encodeURIComponent(formValue[key]));
          }
        }
        _yuitest_coverline("build/inputex-form/inputex-form.js", 239);
postData = params.join('&');
      }
      // The only other contentType available is "application/json"
      else {
        _yuitest_coverline("build/inputex-form/inputex-form.js", 243);
headers["Content-Type"] = 'application/json';

        // method PUT don't send as x-www-form-urlencoded but in JSON
        _yuitest_coverline("build/inputex-form/inputex-form.js", 246);
if(method == "PUT") {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 247);
var formVal = this.getValue();
          _yuitest_coverline("build/inputex-form/inputex-form.js", 248);
var p;
          _yuitest_coverline("build/inputex-form/inputex-form.js", 249);
if(this.options.ajax.wrapObject) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 250);
p = {};
            _yuitest_coverline("build/inputex-form/inputex-form.js", 251);
p[this.options.ajax.wrapObject] = formVal;
          }
          else {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 254);
p = formVal;
          }
          _yuitest_coverline("build/inputex-form/inputex-form.js", 256);
postData = Y.JSON.stringify(p);
        }
        else {
          // We keep this case for backward compatibility, but should not be used
          // Used when we send in JSON in POST or GET
          _yuitest_coverline("build/inputex-form/inputex-form.js", 261);
postData = "value="+window.encodeURIComponent(Y.JSON.stringify(this.getValue()));
        }
      }
      _yuitest_coverline("build/inputex-form/inputex-form.js", 264);
var onSuccess = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSuccess", 264);
_yuitest_coverline("build/inputex-form/inputex-form.js", 265);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 266);
if( lang.isFunction(this.options.ajax.callback.success) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 267);
this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 270);
var onFailure = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onFailure", 270);
_yuitest_coverline("build/inputex-form/inputex-form.js", 271);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 272);
if( lang.isFunction(this.options.ajax.callback.failure) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 273);
this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 276);
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
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderMask", 292);
_yuitest_coverline("build/inputex-form/inputex-form.js", 293);
if(this.maskRendered) {return;}

      // position as "relative" to position formMask inside as "absolute"
      _yuitest_coverline("build/inputex-form/inputex-form.js", 296);
Y.one(this.divEl).setStyle( "position", "relative");

      // set zoom = 1 to fix hasLayout issue with IE6/7
      _yuitest_coverline("build/inputex-form/inputex-form.js", 299);
if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle("zoom", 1); }

      // Render mask over the divEl
      _yuitest_coverline("build/inputex-form/inputex-form.js", 302);
this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},
         {
            display: 'none',
            // Use offsetWidth instead of Dom.getStyle(this.divEl,"width") because
            // would return "auto" with IE instead of size in px
            width: this.divEl.offsetWidth+"px",
            height: this.divEl.offsetHeight+"px"
         },
         "<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>"+this.messages.ajaxWait+"</span></div>");
      _yuitest_coverline("build/inputex-form/inputex-form.js", 311);
this.divEl.appendChild(this.formMask);
      _yuitest_coverline("build/inputex-form/inputex-form.js", 312);
this.maskRendered = true;
   },

   /**
    * Show the form mask
    * @method showMask
    */
   showMask: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "showMask", 319);
_yuitest_coverline("build/inputex-form/inputex-form.js", 320);
this.renderMask();

      // Hide selects in IE 6
      _yuitest_coverline("build/inputex-form/inputex-form.js", 323);
this.toggleSelectsInIE(false);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 325);
this.formMask.style.display = '';
   },

   /**
    * Hide the form mask
    * @method hideMask
    */
   hideMask: function() {

      // Show selects back in IE 6
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "hideMask", 332);
_yuitest_coverline("build/inputex-form/inputex-form.js", 335);
this.toggleSelectsInIE(true);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 337);
this.formMask.style.display = 'none';
   },

   /**
    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)
    * @method toggleSelectsInIE
    */
   toggleSelectsInIE: function(show) {
      // IE 6 only
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "toggleSelectsInIE", 344);
_yuitest_coverline("build/inputex-form/inputex-form.js", 346);
if (!!Y.UA.ie && Y.UA.ie < 7) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 347);
var methodName = !!show ? "removeClass" : "addClass";
         _yuitest_coverline("build/inputex-form/inputex-form.js", 348);
var that = this;
         _yuitest_coverline("build/inputex-form/inputex-form.js", 349);
Y.one(this.divEl).all("select").each(function(e){
           _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 4)", 349);
_yuitest_coverline("build/inputex-form/inputex-form.js", 350);
e[methodName]("inputEx-hidden")
         });
      }
   },


   /**
    * Enable all fields and buttons in the form
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "enable", 360);
_yuitest_coverline("build/inputex-form/inputex-form.js", 361);
inputEx.Form.superclass.enable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 363);
for (var i = 0 ; i < this.buttons.length ; i++) {
 	      _yuitest_coverline("build/inputex-form/inputex-form.js", 364);
this.buttons[i].enable();
      }
   },

   /**
    * Disable all fields and buttons in the form
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "disable", 372);
_yuitest_coverline("build/inputex-form/inputex-form.js", 373);
inputEx.Form.superclass.disable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 375);
for (var i = 0 ; i < this.buttons.length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 376);
this.buttons[i].disable();
      }
   },
   
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "destroy", 385);
_yuitest_coverline("build/inputex-form/inputex-form.js", 387);
var i, length, button;
      
      // Unsubscribe all listeners to submit event
      _yuitest_coverline("build/inputex-form/inputex-form.js", 390);
Y.Event.purgeElement(this.form);
      
      // Recursively destroy buttons
      _yuitest_coverline("build/inputex-form/inputex-form.js", 393);
for (i = 0, length = this.buttons.length ; i < length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 394);
button = this.buttons[i];
         _yuitest_coverline("build/inputex-form/inputex-form.js", 395);
button.destroy();
      }
      
      // destroy Form itself (+ inputs)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 399);
inputEx.Form.superclass.destroy.call(this);
      
   }

});

// Register this class as "form" type
_yuitest_coverline("build/inputex-form/inputex-form.js", 406);
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


}, '@VERSION@', {"requires": ["io-base", "inputex-group", "json", "inputex-button"], "ix_provides": "form", "skinnable": true, "lang": ["en", "fr", "de", "es", "fr", "it", "nl"]});
