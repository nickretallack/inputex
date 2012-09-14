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
_yuitest_coverage["build/inputex-form/inputex-form.js"].code=["YUI.add('inputex-form', function (Y, NAME) {","","/**"," * @module inputex-form"," */","YUI.add(\"inputex-form\", function(Y){","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Create a group of fields within a FORM tag and adds buttons"," * @class inputEx.Form"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options The following options are added for Forms:"," * <ul>"," *   <li>buttons: list of button definition objects {value: 'Click Me', type: 'submit'}</li>"," *   <li>ajax: send the form through an ajax request (submit button should be present): {method: 'POST', uri: 'myScript.php', callback: same as Y.io callback}</li>"," *   <li>showMask: adds a mask over the form while the request is running (default is false)</li>"," * </ul>"," */","inputEx.Form = function(options) {","   inputEx.Form.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.Form, inputEx.Group, {","","   /**","    * Adds buttons and set ajax default parameters","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.Form.superclass.setOptions.call(this, options);","","      this.buttons = [];","","      this.options.buttons = options.buttons || [];","","      this.options.action = options.action;","   	this.options.method = options.method;","","		this.options.className =  options.className || 'inputEx-Group';","	   this.options.autocomplete = lang.isUndefined(options.autocomplete) ?","	                                  inputEx.browserAutocomplete :","	                                  (options.autocomplete === false || options.autocomplete === \"off\") ? false : true;","		","		this.options.enctype = options.enctype;","","      if(options.ajax) {","         this.options.ajax = {};","         this.options.ajax.method = options.ajax.method || 'POST';","         this.options.ajax.uri = options.ajax.uri || 'default.php';","         this.options.ajax.callback = options.ajax.callback || {};","         this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;","         this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;","","			this.options.ajax.contentType = options.ajax.contentType || \"application/json\";","			this.options.ajax.wrapObject = options.ajax.wrapObject;","      }","      ","      if (lang.isFunction(options.onSubmit)) {","         this.options.onSubmit = options.onSubmit;","      }","   },","","","   /**","    * Render the group","    * @method render","    */","   render: function() {","      // Create the div wrapper for this group","  	   this.divEl = inputEx.cn('div', {className: this.options.className});","	   if(this.options.id) {","   	   this.divEl.id = this.options.id;","   	}","   	  	   ","  	   // Create the FORM element","      this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '', className: this.options.className || 'inputEx-Form'});","      this.divEl.appendChild(this.form);","","		// set the enctype","		if(this.options.enctype) {","			this.form.setAttribute('enctype',this.options.enctype);","		}","","	   // Set the autocomplete attribute to off to disable browser autocompletion","		this.form.setAttribute('autocomplete', this.options.autocomplete ? 'on' : 'off');","   	","      // Set the name of the form","      if(this.options.formName) { this.form.name = this.options.formName; }","  	   ","  	   this.renderFields(this.form);","","      this.renderButtons();","      ","      if(this.options.disabled) {","  	      this.disable();","  	   }	  ","   },","","","   /**","    * Render the buttons","    * @method renderButtons","    */","   renderButtons: function() {","       ","      var buttonConf, button, i, buttonsNb = this.options.buttons.length;","      ","      this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});","","      for(i = 0 ; i < buttonsNb ; i++ ) {","         buttonConf = this.options.buttons[i];","   ","         // Throw Error if button is undefined","         if(!buttonConf) {","            throw new Error(\"inputEx.Form: One of the provided button is undefined ! (check trailing comma)\");","         }","         ","         button = new inputEx.widget.Button(buttonConf);","         button.render(this.buttonDiv);","         ","         this.buttons.push(button);","         ","      }","      ","      // useful for link buttons re-styling (float required on <a>'s ... )","      this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));","      ","      this.form.appendChild(this.buttonDiv);","   },","","","   /**","    * Init the events","    * @method initEvents","    */","   initEvents: function() {","      ","      var i, length;","      ","      inputEx.Form.superclass.initEvents.call(this);","      ","      ","      // Custom event to normalize form submits","      this.publish(\"submit\")","      ","      //CustomEvent to provide additionnal features afterValidation","      this.publish(\"afterValidation\")","      ","      // Two ways to trigger the form submitEvent firing","      //","      //","      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)","      //","      Y.on(\"submit\",function(e) {","         ","            // always stop event","            e.halt();","         ","            // replace with custom event","            this.fire(\"submit\");","         ","      },this.form,this);","      ","      ","      //","      // 2. click on a 'submit' or 'submit-link' button","      //","         for(i=0, length=this.buttons.length; i<length; i++) {","            ","            this.buttons[i].on(\"submit\",function() { this.fire(\"submit\"); }, this);","         ","         }","      ","      ","      // When form submitEvent is fired, call onSubmit","      this.on(\"submit\", this.options.onSubmit || this.onSubmit,this)","   },","","   /**","    * Intercept the 'onsubmit' event and stop it if !validate","    * If the ajax option object is set, use YUI async Request to send the form","    * @method onSubmit","    * @param {Event} e The original onSubmit event","    */","   onSubmit: function(e) {","	   ","      // do nothing if does not validate","	   if ( !this.validate() ) {","		   return; // no submit","	   }","	   this.fire(\"afterValidation\");","	   ","	   if(this.options.ajax) {","	      this.asyncRequest(); // send ajax request","	      return;","	   }","	   ","	   // normal submit finally","	   // (won't fire a dom \"submit\" event, so no risk to loop)","	   this.form.submit();","   },","","   /**","    * Send the form value in JSON through an ajax request","    * @method asyncRequest","    */","   asyncRequest: function() {","","      if(this.options.ajax.showMask) { this.showMask(); }","","      var formValue = this.getValue();","","      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form","      var uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;","      var method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;","","      var postData = null;","      ","      var headers = {};","","      // Classic application/x-www-form-urlencoded (like html forms)","      if(this.options.ajax.contentType == \"application/x-www-form-urlencoded\" && method != \"PUT\") {","         ","         headers[\"Content-Type\"] = \"application/x-www-form-urlencoded\";","         ","        var params = [];","        for(var key in formValue) {","          if(formValue.hasOwnProperty(key)) {","            var pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');","            params.push( pName+\"=\"+window.encodeURIComponent(formValue[key]));","          }","        }","        postData = params.join('&');","      }","      // The only other contentType available is \"application/json\"","      else {","        headers[\"Content-Type\"] = 'application/json';","","        // method PUT don't send as x-www-form-urlencoded but in JSON","        if(method == \"PUT\") {","          var formVal = this.getValue();","          var p;","          if(this.options.ajax.wrapObject) {","            p = {};","            p[this.options.ajax.wrapObject] = formVal;","          }","          else {","            p = formVal;","          }","          postData = Y.JSON.stringify(p);","        }","        else {","          // We keep this case for backward compatibility, but should not be used","          // Used when we send in JSON in POST or GET","          postData = \"value=\"+window.encodeURIComponent(Y.JSON.stringify(this.getValue()));","        }","      }","      var onSuccess = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.success) ) {","               this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      var onFailure = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.failure) ) {","               this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      Y.io(uri,{","        method:method,","        data: postData,","        headers: headers,","        on : {","          success: onSuccess,","          failure: onFailure","        },","        context: this","      });","   },","","   /**","    * Create a Mask over the form","    * @method renderMask","    */","   renderMask: function() {","      if(this.maskRendered) return;","","      // position as \"relative\" to position formMask inside as \"absolute\"","      Y.one(this.divEl).setStyle( \"position\", \"relative\");","","      // set zoom = 1 to fix hasLayout issue with IE6/7","      if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle(\"zoom\", 1); }","","      // Render mask over the divEl","      this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},","         {","            display: 'none',","            // Use offsetWidth instead of Dom.getStyle(this.divEl,\"width\") because","            // would return \"auto\" with IE instead of size in px","            width: this.divEl.offsetWidth+\"px\",","            height: this.divEl.offsetHeight+\"px\"","         },","         \"<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>\"+inputEx.messages.ajaxWait+\"</span></div>\");","      this.divEl.appendChild(this.formMask);","      this.maskRendered = true;","   },","","   /**","    * Show the form mask","    * @method showMask","    */","   showMask: function() {","      this.renderMask();","","      // Hide selects in IE 6","      this.toggleSelectsInIE(false);","","      this.formMask.style.display = '';","   },","","   /**","    * Hide the form mask","    * @method hideMask","    */","   hideMask: function() {","","      // Show selects back in IE 6","      this.toggleSelectsInIE(true);","","      this.formMask.style.display = 'none';","   },","","   /**","    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)","    * @method toggleSelectsInIE","    */","   toggleSelectsInIE: function(show) {","      // IE 6 only","      if (!!Y.UA.ie && Y.UA.ie < 7) {","         var methodName = !!show ? \"removeClass\" : \"addClass\";","         var that = this;","         Y.one(this.divEl).all(\"select\").each(function(e){","           e[methodName](\"inputEx-hidden\")","         });","      }","   },","","","   /**","    * Enable all fields and buttons in the form","    * @method enable","    */","   enable: function() {","      inputEx.Form.superclass.enable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {"," 	      this.buttons[i].enable();","      }","   },","","   /**","    * Disable all fields and buttons in the form","    * @method disable","    */","   disable: function() {","      inputEx.Form.superclass.disable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {","         this.buttons[i].disable();","      }","   },","   ","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, button;","      ","      // Unsubscribe all listeners to submit event","      Y.Event.purgeElement(this.form);","      ","      // Recursively destroy buttons","      for (i = 0, length = this.buttons.length ; i < length ; i++) {","         button = this.buttons[i];","         button.destroy();","      }","      ","      // destroy Form itself (+ inputs)","      inputEx.Form.superclass.destroy.call(this);","      ","   }","","});","","// Register this class as \"form\" type","inputEx.registerType(\"form\", inputEx.Form, [","   {  ","      type: 'list', ","      label: 'Buttons', ","      name: 'buttons', ","      elementType: {","         type: 'group', ","         fields: [","            { label: 'Label', name: 'value'},","            { type: 'select', label: 'Type', name: 'type', choices:[{ value: \"button\" }, { value: \"submit\" }] }","         ]","      }","   }","]);","","","},'3.1.0',{","  requires: ['io-base','inputex-group','json','inputex-button']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-form/inputex-form.js"].lines = {"1":0,"6":0,"8":0,"23":0,"24":0,"27":0,"35":0,"37":0,"39":0,"41":0,"42":0,"44":0,"45":0,"49":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"59":0,"60":0,"63":0,"64":0,"75":0,"76":0,"77":0,"81":0,"82":0,"85":0,"86":0,"90":0,"93":0,"95":0,"97":0,"99":0,"100":0,"111":0,"113":0,"115":0,"116":0,"119":0,"120":0,"123":0,"124":0,"126":0,"131":0,"133":0,"143":0,"145":0,"149":0,"152":0,"159":0,"162":0,"165":0,"173":0,"175":0,"181":0,"193":0,"194":0,"196":0,"198":0,"199":0,"200":0,"205":0,"214":0,"216":0,"219":0,"220":0,"222":0,"224":0,"227":0,"229":0,"231":0,"232":0,"233":0,"234":0,"235":0,"238":0,"242":0,"245":0,"246":0,"247":0,"248":0,"249":0,"250":0,"253":0,"255":0,"260":0,"263":0,"264":0,"265":0,"266":0,"269":0,"270":0,"271":0,"272":0,"275":0,"292":0,"295":0,"298":0,"301":0,"310":0,"311":0,"319":0,"322":0,"324":0,"334":0,"336":0,"345":0,"346":0,"347":0,"348":0,"349":0,"360":0,"362":0,"363":0,"372":0,"374":0,"375":0,"386":0,"389":0,"392":0,"393":0,"394":0,"398":0,"405":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].functions = {"Form:23":0,"setOptions:34":0,"render:73":0,"renderButtons:109":0,"(anonymous 3):159":0,"(anonymous 4):175":0,"initEvents:141":0,"onSubmit:190":0,"onSuccess:263":0,"onFailure:269":0,"asyncRequest:212":0,"renderMask:291":0,"showMask:318":0,"hideMask:331":0,"(anonymous 5):348":0,"toggleSelectsInIE:343":0,"enable:359":0,"disable:371":0,"destroy:384":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].coveredLines = 128;
_yuitest_coverage["build/inputex-form/inputex-form.js"].coveredFunctions = 21;
_yuitest_coverline("build/inputex-form/inputex-form.js", 1);
YUI.add('inputex-form', function (Y, NAME) {

/**
 * @module inputex-form
 */
_yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-form/inputex-form.js", 6);
YUI.add("inputex-form", function(Y){

  _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-form/inputex-form.js", 8);
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
_yuitest_coverline("build/inputex-form/inputex-form.js", 23);
inputEx.Form = function(options) {
   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "Form", 23);
_yuitest_coverline("build/inputex-form/inputex-form.js", 24);
inputEx.Form.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-form/inputex-form.js", 27);
Y.extend(inputEx.Form, inputEx.Group, {

   /**
    * Adds buttons and set ajax default parameters
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "setOptions", 34);
_yuitest_coverline("build/inputex-form/inputex-form.js", 35);
inputEx.Form.superclass.setOptions.call(this, options);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 37);
this.buttons = [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 39);
this.options.buttons = options.buttons || [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 41);
this.options.action = options.action;
   	_yuitest_coverline("build/inputex-form/inputex-form.js", 42);
this.options.method = options.method;

		_yuitest_coverline("build/inputex-form/inputex-form.js", 44);
this.options.className =  options.className || 'inputEx-Group';
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 45);
this.options.autocomplete = lang.isUndefined(options.autocomplete) ?
	                                  inputEx.browserAutocomplete :
	                                  (options.autocomplete === false || options.autocomplete === "off") ? false : true;
		
		_yuitest_coverline("build/inputex-form/inputex-form.js", 49);
this.options.enctype = options.enctype;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 51);
if(options.ajax) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 52);
this.options.ajax = {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 53);
this.options.ajax.method = options.ajax.method || 'POST';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 54);
this.options.ajax.uri = options.ajax.uri || 'default.php';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 55);
this.options.ajax.callback = options.ajax.callback || {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 56);
this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;
         _yuitest_coverline("build/inputex-form/inputex-form.js", 57);
this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;

			_yuitest_coverline("build/inputex-form/inputex-form.js", 59);
this.options.ajax.contentType = options.ajax.contentType || "application/json";
			_yuitest_coverline("build/inputex-form/inputex-form.js", 60);
this.options.ajax.wrapObject = options.ajax.wrapObject;
      }
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 63);
if (lang.isFunction(options.onSubmit)) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 64);
this.options.onSubmit = options.onSubmit;
      }
   },


   /**
    * Render the group
    * @method render
    */
   render: function() {
      // Create the div wrapper for this group
  	   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "render", 73);
_yuitest_coverline("build/inputex-form/inputex-form.js", 75);
this.divEl = inputEx.cn('div', {className: this.options.className});
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 76);
if(this.options.id) {
   	   _yuitest_coverline("build/inputex-form/inputex-form.js", 77);
this.divEl.id = this.options.id;
   	}
   	  	   
  	   // Create the FORM element
      _yuitest_coverline("build/inputex-form/inputex-form.js", 81);
this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '', className: this.options.className || 'inputEx-Form'});
      _yuitest_coverline("build/inputex-form/inputex-form.js", 82);
this.divEl.appendChild(this.form);

		// set the enctype
		_yuitest_coverline("build/inputex-form/inputex-form.js", 85);
if(this.options.enctype) {
			_yuitest_coverline("build/inputex-form/inputex-form.js", 86);
this.form.setAttribute('enctype',this.options.enctype);
		}

	   // Set the autocomplete attribute to off to disable browser autocompletion
		_yuitest_coverline("build/inputex-form/inputex-form.js", 90);
this.form.setAttribute('autocomplete', this.options.autocomplete ? 'on' : 'off');
   	
      // Set the name of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 93);
if(this.options.formName) { this.form.name = this.options.formName; }
  	   
  	   _yuitest_coverline("build/inputex-form/inputex-form.js", 95);
this.renderFields(this.form);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 97);
this.renderButtons();
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 99);
if(this.options.disabled) {
  	      _yuitest_coverline("build/inputex-form/inputex-form.js", 100);
this.disable();
  	   }	  
   },


   /**
    * Render the buttons
    * @method renderButtons
    */
   renderButtons: function() {
       
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderButtons", 109);
_yuitest_coverline("build/inputex-form/inputex-form.js", 111);
var buttonConf, button, i, buttonsNb = this.options.buttons.length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 113);
this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});

      _yuitest_coverline("build/inputex-form/inputex-form.js", 115);
for(i = 0 ; i < buttonsNb ; i++ ) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 116);
buttonConf = this.options.buttons[i];
   
         // Throw Error if button is undefined
         _yuitest_coverline("build/inputex-form/inputex-form.js", 119);
if(!buttonConf) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 120);
throw new Error("inputEx.Form: One of the provided button is undefined ! (check trailing comma)");
         }
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 123);
button = new inputEx.widget.Button(buttonConf);
         _yuitest_coverline("build/inputex-form/inputex-form.js", 124);
button.render(this.buttonDiv);
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 126);
this.buttons.push(button);
         
      }
      
      // useful for link buttons re-styling (float required on <a>'s ... )
      _yuitest_coverline("build/inputex-form/inputex-form.js", 131);
this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 133);
this.form.appendChild(this.buttonDiv);
   },


   /**
    * Init the events
    * @method initEvents
    */
   initEvents: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "initEvents", 141);
_yuitest_coverline("build/inputex-form/inputex-form.js", 143);
var i, length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 145);
inputEx.Form.superclass.initEvents.call(this);
      
      
      // Custom event to normalize form submits
      _yuitest_coverline("build/inputex-form/inputex-form.js", 149);
this.publish("submit")
      
      //CustomEvent to provide additionnal features afterValidation
      _yuitest_coverline("build/inputex-form/inputex-form.js", 152);
this.publish("afterValidation")
      
      // Two ways to trigger the form submitEvent firing
      //
      //
      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)
      //
      _yuitest_coverline("build/inputex-form/inputex-form.js", 159);
Y.on("submit",function(e) {
         
            // always stop event
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 3)", 159);
_yuitest_coverline("build/inputex-form/inputex-form.js", 162);
e.halt();
         
            // replace with custom event
            _yuitest_coverline("build/inputex-form/inputex-form.js", 165);
this.fire("submit");
         
      },this.form,this);
      
      
      //
      // 2. click on a 'submit' or 'submit-link' button
      //
         _yuitest_coverline("build/inputex-form/inputex-form.js", 173);
for(i=0, length=this.buttons.length; i<length; i++) {
            
            _yuitest_coverline("build/inputex-form/inputex-form.js", 175);
this.buttons[i].on("submit",function() { _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 4)", 175);
this.fire("submit"); }, this);
         
         }
      
      
      // When form submitEvent is fired, call onSubmit
      _yuitest_coverline("build/inputex-form/inputex-form.js", 181);
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
	   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSubmit", 190);
_yuitest_coverline("build/inputex-form/inputex-form.js", 193);
if ( !this.validate() ) {
		   _yuitest_coverline("build/inputex-form/inputex-form.js", 194);
return; // no submit
	   }
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 196);
this.fire("afterValidation");
	   
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 198);
if(this.options.ajax) {
	      _yuitest_coverline("build/inputex-form/inputex-form.js", 199);
this.asyncRequest(); // send ajax request
	      _yuitest_coverline("build/inputex-form/inputex-form.js", 200);
return;
	   }
	   
	   // normal submit finally
	   // (won't fire a dom "submit" event, so no risk to loop)
	   _yuitest_coverline("build/inputex-form/inputex-form.js", 205);
this.form.submit();
   },

   /**
    * Send the form value in JSON through an ajax request
    * @method asyncRequest
    */
   asyncRequest: function() {

      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "asyncRequest", 212);
_yuitest_coverline("build/inputex-form/inputex-form.js", 214);
if(this.options.ajax.showMask) { this.showMask(); }

      _yuitest_coverline("build/inputex-form/inputex-form.js", 216);
var formValue = this.getValue();

      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 219);
var uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;
      _yuitest_coverline("build/inputex-form/inputex-form.js", 220);
var method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 222);
var postData = null;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 224);
var headers = {};

      // Classic application/x-www-form-urlencoded (like html forms)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 227);
if(this.options.ajax.contentType == "application/x-www-form-urlencoded" && method != "PUT") {
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 229);
headers["Content-Type"] = "application/x-www-form-urlencoded";
         
        _yuitest_coverline("build/inputex-form/inputex-form.js", 231);
var params = [];
        _yuitest_coverline("build/inputex-form/inputex-form.js", 232);
for(var key in formValue) {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 233);
if(formValue.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 234);
var pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');
            _yuitest_coverline("build/inputex-form/inputex-form.js", 235);
params.push( pName+"="+window.encodeURIComponent(formValue[key]));
          }
        }
        _yuitest_coverline("build/inputex-form/inputex-form.js", 238);
postData = params.join('&');
      }
      // The only other contentType available is "application/json"
      else {
        _yuitest_coverline("build/inputex-form/inputex-form.js", 242);
headers["Content-Type"] = 'application/json';

        // method PUT don't send as x-www-form-urlencoded but in JSON
        _yuitest_coverline("build/inputex-form/inputex-form.js", 245);
if(method == "PUT") {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 246);
var formVal = this.getValue();
          _yuitest_coverline("build/inputex-form/inputex-form.js", 247);
var p;
          _yuitest_coverline("build/inputex-form/inputex-form.js", 248);
if(this.options.ajax.wrapObject) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 249);
p = {};
            _yuitest_coverline("build/inputex-form/inputex-form.js", 250);
p[this.options.ajax.wrapObject] = formVal;
          }
          else {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 253);
p = formVal;
          }
          _yuitest_coverline("build/inputex-form/inputex-form.js", 255);
postData = Y.JSON.stringify(p);
        }
        else {
          // We keep this case for backward compatibility, but should not be used
          // Used when we send in JSON in POST or GET
          _yuitest_coverline("build/inputex-form/inputex-form.js", 260);
postData = "value="+window.encodeURIComponent(Y.JSON.stringify(this.getValue()));
        }
      }
      _yuitest_coverline("build/inputex-form/inputex-form.js", 263);
var onSuccess = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSuccess", 263);
_yuitest_coverline("build/inputex-form/inputex-form.js", 264);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 265);
if( lang.isFunction(this.options.ajax.callback.success) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 266);
this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 269);
var onFailure = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onFailure", 269);
_yuitest_coverline("build/inputex-form/inputex-form.js", 270);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 271);
if( lang.isFunction(this.options.ajax.callback.failure) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 272);
this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 275);
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
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderMask", 291);
_yuitest_coverline("build/inputex-form/inputex-form.js", 292);
if(this.maskRendered) {return;}

      // position as "relative" to position formMask inside as "absolute"
      _yuitest_coverline("build/inputex-form/inputex-form.js", 295);
Y.one(this.divEl).setStyle( "position", "relative");

      // set zoom = 1 to fix hasLayout issue with IE6/7
      _yuitest_coverline("build/inputex-form/inputex-form.js", 298);
if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle("zoom", 1); }

      // Render mask over the divEl
      _yuitest_coverline("build/inputex-form/inputex-form.js", 301);
this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},
         {
            display: 'none',
            // Use offsetWidth instead of Dom.getStyle(this.divEl,"width") because
            // would return "auto" with IE instead of size in px
            width: this.divEl.offsetWidth+"px",
            height: this.divEl.offsetHeight+"px"
         },
         "<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>"+inputEx.messages.ajaxWait+"</span></div>");
      _yuitest_coverline("build/inputex-form/inputex-form.js", 310);
this.divEl.appendChild(this.formMask);
      _yuitest_coverline("build/inputex-form/inputex-form.js", 311);
this.maskRendered = true;
   },

   /**
    * Show the form mask
    * @method showMask
    */
   showMask: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "showMask", 318);
_yuitest_coverline("build/inputex-form/inputex-form.js", 319);
this.renderMask();

      // Hide selects in IE 6
      _yuitest_coverline("build/inputex-form/inputex-form.js", 322);
this.toggleSelectsInIE(false);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 324);
this.formMask.style.display = '';
   },

   /**
    * Hide the form mask
    * @method hideMask
    */
   hideMask: function() {

      // Show selects back in IE 6
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "hideMask", 331);
_yuitest_coverline("build/inputex-form/inputex-form.js", 334);
this.toggleSelectsInIE(true);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 336);
this.formMask.style.display = 'none';
   },

   /**
    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)
    * @method toggleSelectsInIE
    */
   toggleSelectsInIE: function(show) {
      // IE 6 only
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "toggleSelectsInIE", 343);
_yuitest_coverline("build/inputex-form/inputex-form.js", 345);
if (!!Y.UA.ie && Y.UA.ie < 7) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 346);
var methodName = !!show ? "removeClass" : "addClass";
         _yuitest_coverline("build/inputex-form/inputex-form.js", 347);
var that = this;
         _yuitest_coverline("build/inputex-form/inputex-form.js", 348);
Y.one(this.divEl).all("select").each(function(e){
           _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 5)", 348);
_yuitest_coverline("build/inputex-form/inputex-form.js", 349);
e[methodName]("inputEx-hidden")
         });
      }
   },


   /**
    * Enable all fields and buttons in the form
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "enable", 359);
_yuitest_coverline("build/inputex-form/inputex-form.js", 360);
inputEx.Form.superclass.enable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 362);
for (var i = 0 ; i < this.buttons.length ; i++) {
 	      _yuitest_coverline("build/inputex-form/inputex-form.js", 363);
this.buttons[i].enable();
      }
   },

   /**
    * Disable all fields and buttons in the form
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "disable", 371);
_yuitest_coverline("build/inputex-form/inputex-form.js", 372);
inputEx.Form.superclass.disable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 374);
for (var i = 0 ; i < this.buttons.length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 375);
this.buttons[i].disable();
      }
   },
   
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "destroy", 384);
_yuitest_coverline("build/inputex-form/inputex-form.js", 386);
var i, length, button;
      
      // Unsubscribe all listeners to submit event
      _yuitest_coverline("build/inputex-form/inputex-form.js", 389);
Y.Event.purgeElement(this.form);
      
      // Recursively destroy buttons
      _yuitest_coverline("build/inputex-form/inputex-form.js", 392);
for (i = 0, length = this.buttons.length ; i < length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 393);
button = this.buttons[i];
         _yuitest_coverline("build/inputex-form/inputex-form.js", 394);
button.destroy();
      }
      
      // destroy Form itself (+ inputs)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 398);
inputEx.Form.superclass.destroy.call(this);
      
   }

});

// Register this class as "form" type
_yuitest_coverline("build/inputex-form/inputex-form.js", 405);
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


},'3.1.0',{
  requires: ['io-base','inputex-group','json','inputex-button']
});


}, '@VERSION@');
