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
_yuitest_coverage["build/inputex-form/inputex-form.js"].code=["YUI.add('inputex-form', function (Y, NAME) {","","/**"," * @module inputex-form"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Create a group of fields within a FORM tag and adds buttons"," * @class inputEx.Form"," * @extends inputEx.Group"," * @constructor"," * @param {Object} options The following options are added for Forms:"," * <ul>"," *   <li>buttons: list of button definition objects {value: 'Click Me', type: 'submit'}</li>"," *   <li>ajax: send the form through an ajax request (submit button should be present):"," *       {method: 'POST', uri: 'myScript.php', callback: same as Y.io callback}</li>"," *   <li>showMask: adds a mask over the form while the request is running (default is false)</li>"," * </ul>"," */","inputEx.Form = function(options) {","   inputEx.Form.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.Form, inputEx.Group, {","","   /**","    * Adds buttons and set ajax default parameters","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.Form.superclass.setOptions.call(this, options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-form\"));","","      this.buttons = [];","","      this.options.buttons = options.buttons || [];","","      this.options.action = options.action;","      this.options.method = options.method;","","      this.options.className =  options.className || 'inputEx-Group';","","      // possible values: \"on\", \"off\"","      this.options.autocomplete = !lang.isUndefined(options.autocomplete) ? options.autocomplete : inputEx.browserAutocomplete;","      ","      this.options.enctype = options.enctype;","","      if(options.ajax) {","         this.options.ajax = {};","         this.options.ajax.method = options.ajax.method || 'POST';","         this.options.ajax.uri = options.ajax.uri || 'default.php';","         this.options.ajax.callback = options.ajax.callback || {};","         this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;","         this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;","","         this.options.ajax.contentType = options.ajax.contentType || \"application/json\";","         this.options.ajax.wrapObject = options.ajax.wrapObject;","      }","      ","      if (lang.isFunction(options.onSubmit)) {","         this.options.onSubmit = options.onSubmit;","      }","   },","","","   /**","    * Render the group","    * @method render","    */","   render: function() {","      // Create the div wrapper for this group","      this.divEl = inputEx.cn('div', {className: this.options.className});","      if(this.options.id) {","         this.divEl.id = this.options.id;","      }","            ","      // Create the FORM element","      this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '',","                     className: this.options.className || 'inputEx-Form'});","      this.divEl.appendChild(this.form);","","      // set the enctype","      if(this.options.enctype) {","         this.form.setAttribute('enctype',this.options.enctype);","      }","","      // Set the autocomplete attribute to off to disable browser autocompletion","      this.form.setAttribute('autocomplete', this.options.autocomplete);","      ","      // Set the name of the form","      if(this.options.formName) { this.form.name = this.options.formName; }","      ","      this.renderFields(this.form);","","      this.renderButtons();","      ","      if(this.options.disabled) {","         this.disable();","      }","   },","","","   /**","    * Render the buttons","    * @method renderButtons","    */","   renderButtons: function() {","       ","      var buttonConf, button, i, buttonsNb = this.options.buttons.length;","      ","      this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});","","      for(i = 0 ; i < buttonsNb ; i++ ) {","         buttonConf = this.options.buttons[i];","   ","         // Throw Error if button is undefined","         if(!buttonConf) {","            throw new Error(\"inputEx.Form: One of the provided button is undefined ! (check trailing comma)\");","         }","         ","         button = new inputEx.widget.Button(buttonConf);","         button.render(this.buttonDiv);","         ","         this.buttons.push(button);","         ","      }","      ","      // useful for link buttons re-styling (float required on <a>'s ... )","      this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));","      ","      this.form.appendChild(this.buttonDiv);","   },","","","   /**","    * Init the events","    * @method initEvents","    */","   initEvents: function() {","      ","      var i, length;","      ","      inputEx.Form.superclass.initEvents.call(this);","      ","      ","      // Custom event to normalize form submits","      this.publish(\"submit\");","      ","      //CustomEvent to provide additionnal features afterValidation","      this.publish(\"afterValidation\");","      ","      // Two ways to trigger the form submitEvent firing","      //","      //","      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)","      //","      Y.on(\"submit\",function(e) {","         ","            // always stop event","            e.halt();","         ","            // replace with custom event","            this.fire(\"submit\");","         ","      },this.form,this);","      ","      ","      //","      // 2. click on a 'submit' or 'submit-link' button","      //","         for(i=0, length=this.buttons.length; i<length; i++) {","            ","            this.buttons[i].on(\"submit\",function() { this.fire(\"submit\"); }, this);","         ","         }","      ","      ","      // When form submitEvent is fired, call onSubmit","      this.on(\"submit\", this.options.onSubmit || this.onSubmit,this);","   },","","   /**","    * Intercept the 'onsubmit' event and stop it if !validate","    * If the ajax option object is set, use YUI async Request to send the form","    * @method onSubmit","    * @param {Event} e The original onSubmit event","    */","   onSubmit: function() {","      ","      // do nothing if does not validate","      if ( !this.validate() ) {","         return; // no submit","      }","      this.fire(\"afterValidation\");","      ","      if(this.options.ajax) {","         this.asyncRequest(); // send ajax request","         return;","      }","      ","      // normal submit finally","      // (won't fire a dom \"submit\" event, so no risk to loop)","      this.form.submit();","   },","","   /**","    * Send the form value in JSON through an ajax request","    * @method asyncRequest","    */","   asyncRequest: function() {","","      if(this.options.ajax.showMask) { this.showMask(); }","","      var formValue = this.getValue(),","      uri, method, postData, headers, params, key, pName, formVal, p,onSuccess, onFailure;","","      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form","      uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;","      method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;","","      postData = null;","      ","      headers = {};","","      // Classic application/x-www-form-urlencoded (like html forms)","      if(this.options.ajax.contentType === \"application/x-www-form-urlencoded\" && method !== \"PUT\") {","         ","         headers[\"Content-Type\"] = \"application/x-www-form-urlencoded\";","         ","        params = [];","        for(key in formValue) {","          if(formValue.hasOwnProperty(key)) {","            pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');","            params.push( pName+\"=\"+window.encodeURIComponent(formValue[key]));","          }","        }","        postData = params.join('&');","      }","      // The only other contentType available is \"application/json\"","      else {","        headers[\"Content-Type\"] = 'application/json';","","        // method PUT don't send as x-www-form-urlencoded but in JSON","        if(method === \"PUT\") {","          formVal = this.getValue();","","          if(this.options.ajax.wrapObject) {","            p = {};","            p[this.options.ajax.wrapObject] = formVal;","          }","          else {","            p = formVal;","          }","          postData = Y.JSON.stringify(p);","        }","        else {","          // We keep this case for backward compatibility, but should not be used","          // Used when we send in JSON in POST or GET","          postData = Y.JSON.stringify(this.getValue());","        }","      }","      onSuccess = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.success) ) {","               this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      onFailure = function() {","            if(this.options.ajax.showMask) { this.hideMask(); }","            if( lang.isFunction(this.options.ajax.callback.failure) ) {","               this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);","            }","      };","      Y.io(uri,{","        method:method,","        data: postData,","        headers: headers,","        on : {","          success: onSuccess,","          failure: onFailure","        },","        context: this","      });","   },","","   /**","    * Create a Mask over the form","    * @method renderMask","    */","   renderMask: function() {","      if(this.maskRendered) {return;}","","      // position as \"relative\" to position formMask inside as \"absolute\"","      Y.one(this.divEl).setStyle( \"position\", \"relative\");","","      // set zoom = 1 to fix hasLayout issue with IE6/7","      if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle(\"zoom\", 1); }","","      // Render mask over the divEl","      this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},","         {","            display: 'none',","            // Use offsetWidth instead of Dom.getStyle(this.divEl,\"width\") because","            // would return \"auto\" with IE instead of size in px","            width: this.divEl.offsetWidth+\"px\",","            height: this.divEl.offsetHeight+\"px\"","         },","         \"<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>\"+","                  this.messages.ajaxWait+\"</span></div>\");","      this.divEl.appendChild(this.formMask);","      this.maskRendered = true;","   },","","   /**","    * Show the form mask","    * @method showMask","    */","   showMask: function() {","      this.renderMask();","","      // Hide selects in IE 6","      this.toggleSelectsInIE(false);","","      this.formMask.style.display = '';","   },","","   /**","    * Hide the form mask","    * @method hideMask","    */","   hideMask: function() {","","      // Show selects back in IE 6","      this.toggleSelectsInIE(true);","","      this.formMask.style.display = 'none';","   },","","   /**","    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)","    * @method toggleSelectsInIE","    */","   toggleSelectsInIE: function(show) {","      // IE 6 only","      if (!!Y.UA.ie && Y.UA.ie < 7) {","         var methodName = !!show ? \"removeClass\" : \"addClass\";","         Y.one(this.divEl).all(\"select\").each(function(e){","           e[methodName](\"inputEx-hidden\");","         });","      }","   },","","","   /**","    * Enable all fields and buttons in the form","    * @method enable","    */","   enable: function() {","      inputEx.Form.superclass.enable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {","         this.buttons[i].enable();","      }","   },","","   /**","    * Disable all fields and buttons in the form","    * @method disable","    */","   disable: function() {","      inputEx.Form.superclass.disable.call(this);","      ","      for (var i = 0 ; i < this.buttons.length ; i++) {","         this.buttons[i].disable();","      }","   },","   ","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      var i, length, button;","      ","      // Unsubscribe all listeners to submit event","      Y.Event.purgeElement(this.form);","      ","      // Recursively destroy buttons","      for (i = 0, length = this.buttons.length ; i < length ; i++) {","         button = this.buttons[i];","         button.destroy();","      }","      ","      // destroy Form itself (+ inputs)","      inputEx.Form.superclass.destroy.call(this);","      ","   }","","});","","// Register this class as \"form\" type","inputEx.registerType(\"form\", inputEx.Form, [","   {","      type: 'list',","      label: 'Buttons',","      name: 'buttons',","      elementType: {","         type: 'group',","         fields: [","            { label: 'Label', name: 'value'},","            { type: 'select', label: 'Type', name: 'type', choices:[{ value: \"button\" }, { value: \"submit\" }] }","         ]","      }","   }","]);","","","}, '@VERSION@', {","    \"requires\": [","        \"io-base\",","        \"json-stringify\",","        \"inputex-group\",","        \"inputex-button\"","    ],","    \"ix_provides\": \"form\",","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-form/inputex-form.js"].lines = {"1":0,"6":0,"22":0,"23":0,"26":0,"34":0,"37":0,"39":0,"41":0,"43":0,"44":0,"46":0,"49":0,"51":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":0,"59":0,"61":0,"62":0,"65":0,"66":0,"77":0,"78":0,"79":0,"83":0,"85":0,"88":0,"89":0,"93":0,"96":0,"98":0,"100":0,"102":0,"103":0,"114":0,"116":0,"118":0,"119":0,"122":0,"123":0,"126":0,"127":0,"129":0,"134":0,"136":0,"146":0,"148":0,"152":0,"155":0,"162":0,"165":0,"168":0,"176":0,"178":0,"184":0,"196":0,"197":0,"199":0,"201":0,"202":0,"203":0,"208":0,"217":0,"219":0,"223":0,"224":0,"226":0,"228":0,"231":0,"233":0,"235":0,"236":0,"237":0,"238":0,"239":0,"242":0,"246":0,"249":0,"250":0,"252":0,"253":0,"254":0,"257":0,"259":0,"264":0,"267":0,"268":0,"269":0,"270":0,"273":0,"274":0,"275":0,"276":0,"279":0,"296":0,"299":0,"302":0,"305":0,"315":0,"316":0,"324":0,"327":0,"329":0,"339":0,"341":0,"350":0,"351":0,"352":0,"353":0,"364":0,"366":0,"367":0,"376":0,"378":0,"379":0,"390":0,"393":0,"396":0,"397":0,"398":0,"402":0,"409":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].functions = {"Form:22":0,"setOptions:33":0,"render:75":0,"renderButtons:112":0,"(anonymous 2):162":0,"(anonymous 3):178":0,"initEvents:144":0,"onSubmit:193":0,"onSuccess:267":0,"onFailure:273":0,"asyncRequest:215":0,"renderMask:295":0,"showMask:323":0,"hideMask:336":0,"(anonymous 4):352":0,"toggleSelectsInIE:348":0,"enable:363":0,"disable:375":0,"destroy:388":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-form/inputex-form.js"].coveredLines = 126;
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
 *   <li>ajax: send the form through an ajax request (submit button should be present):
 *       {method: 'POST', uri: 'myScript.php', callback: same as Y.io callback}</li>
 *   <li>showMask: adds a mask over the form while the request is running (default is false)</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-form/inputex-form.js", 22);
inputEx.Form = function(options) {
   _yuitest_coverfunc("build/inputex-form/inputex-form.js", "Form", 22);
_yuitest_coverline("build/inputex-form/inputex-form.js", 23);
inputEx.Form.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-form/inputex-form.js", 26);
Y.extend(inputEx.Form, inputEx.Group, {

   /**
    * Adds buttons and set ajax default parameters
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "setOptions", 33);
_yuitest_coverline("build/inputex-form/inputex-form.js", 34);
inputEx.Form.superclass.setOptions.call(this, options);

      //I18N
      _yuitest_coverline("build/inputex-form/inputex-form.js", 37);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-form"));

      _yuitest_coverline("build/inputex-form/inputex-form.js", 39);
this.buttons = [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 41);
this.options.buttons = options.buttons || [];

      _yuitest_coverline("build/inputex-form/inputex-form.js", 43);
this.options.action = options.action;
      _yuitest_coverline("build/inputex-form/inputex-form.js", 44);
this.options.method = options.method;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 46);
this.options.className =  options.className || 'inputEx-Group';

      // possible values: "on", "off"
      _yuitest_coverline("build/inputex-form/inputex-form.js", 49);
this.options.autocomplete = !lang.isUndefined(options.autocomplete) ? options.autocomplete : inputEx.browserAutocomplete;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 51);
this.options.enctype = options.enctype;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 53);
if(options.ajax) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 54);
this.options.ajax = {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 55);
this.options.ajax.method = options.ajax.method || 'POST';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 56);
this.options.ajax.uri = options.ajax.uri || 'default.php';
         _yuitest_coverline("build/inputex-form/inputex-form.js", 57);
this.options.ajax.callback = options.ajax.callback || {};
         _yuitest_coverline("build/inputex-form/inputex-form.js", 58);
this.options.ajax.callback.scope = (options.ajax.callback && options.ajax.callback.scope) || this;
         _yuitest_coverline("build/inputex-form/inputex-form.js", 59);
this.options.ajax.showMask = lang.isUndefined(options.ajax.showMask) ? false : options.ajax.showMask;

         _yuitest_coverline("build/inputex-form/inputex-form.js", 61);
this.options.ajax.contentType = options.ajax.contentType || "application/json";
         _yuitest_coverline("build/inputex-form/inputex-form.js", 62);
this.options.ajax.wrapObject = options.ajax.wrapObject;
      }
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 65);
if (lang.isFunction(options.onSubmit)) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 66);
this.options.onSubmit = options.onSubmit;
      }
   },


   /**
    * Render the group
    * @method render
    */
   render: function() {
      // Create the div wrapper for this group
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "render", 75);
_yuitest_coverline("build/inputex-form/inputex-form.js", 77);
this.divEl = inputEx.cn('div', {className: this.options.className});
      _yuitest_coverline("build/inputex-form/inputex-form.js", 78);
if(this.options.id) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 79);
this.divEl.id = this.options.id;
      }
            
      // Create the FORM element
      _yuitest_coverline("build/inputex-form/inputex-form.js", 83);
this.form = inputEx.cn('form', {method: this.options.method || 'POST', action: this.options.action || '',
                     className: this.options.className || 'inputEx-Form'});
      _yuitest_coverline("build/inputex-form/inputex-form.js", 85);
this.divEl.appendChild(this.form);

      // set the enctype
      _yuitest_coverline("build/inputex-form/inputex-form.js", 88);
if(this.options.enctype) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 89);
this.form.setAttribute('enctype',this.options.enctype);
      }

      // Set the autocomplete attribute to off to disable browser autocompletion
      _yuitest_coverline("build/inputex-form/inputex-form.js", 93);
this.form.setAttribute('autocomplete', this.options.autocomplete);
      
      // Set the name of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 96);
if(this.options.formName) { this.form.name = this.options.formName; }
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 98);
this.renderFields(this.form);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 100);
this.renderButtons();
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 102);
if(this.options.disabled) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 103);
this.disable();
      }
   },


   /**
    * Render the buttons
    * @method renderButtons
    */
   renderButtons: function() {
       
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderButtons", 112);
_yuitest_coverline("build/inputex-form/inputex-form.js", 114);
var buttonConf, button, i, buttonsNb = this.options.buttons.length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 116);
this.buttonDiv = inputEx.cn('div', {className: 'inputEx-Form-buttonBar'});

      _yuitest_coverline("build/inputex-form/inputex-form.js", 118);
for(i = 0 ; i < buttonsNb ; i++ ) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 119);
buttonConf = this.options.buttons[i];
   
         // Throw Error if button is undefined
         _yuitest_coverline("build/inputex-form/inputex-form.js", 122);
if(!buttonConf) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 123);
throw new Error("inputEx.Form: One of the provided button is undefined ! (check trailing comma)");
         }
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 126);
button = new inputEx.widget.Button(buttonConf);
         _yuitest_coverline("build/inputex-form/inputex-form.js", 127);
button.render(this.buttonDiv);
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 129);
this.buttons.push(button);
         
      }
      
      // useful for link buttons re-styling (float required on <a>'s ... )
      _yuitest_coverline("build/inputex-form/inputex-form.js", 134);
this.buttonDiv.appendChild(inputEx.cn('div',null,{clear:'both'}));
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 136);
this.form.appendChild(this.buttonDiv);
   },


   /**
    * Init the events
    * @method initEvents
    */
   initEvents: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "initEvents", 144);
_yuitest_coverline("build/inputex-form/inputex-form.js", 146);
var i, length;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 148);
inputEx.Form.superclass.initEvents.call(this);
      
      
      // Custom event to normalize form submits
      _yuitest_coverline("build/inputex-form/inputex-form.js", 152);
this.publish("submit");
      
      //CustomEvent to provide additionnal features afterValidation
      _yuitest_coverline("build/inputex-form/inputex-form.js", 155);
this.publish("afterValidation");
      
      // Two ways to trigger the form submitEvent firing
      //
      //
      // 1. catch a 'submit' event on form (say a user pressed <Enter> in a field)
      //
      _yuitest_coverline("build/inputex-form/inputex-form.js", 162);
Y.on("submit",function(e) {
         
            // always stop event
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 2)", 162);
_yuitest_coverline("build/inputex-form/inputex-form.js", 165);
e.halt();
         
            // replace with custom event
            _yuitest_coverline("build/inputex-form/inputex-form.js", 168);
this.fire("submit");
         
      },this.form,this);
      
      
      //
      // 2. click on a 'submit' or 'submit-link' button
      //
         _yuitest_coverline("build/inputex-form/inputex-form.js", 176);
for(i=0, length=this.buttons.length; i<length; i++) {
            
            _yuitest_coverline("build/inputex-form/inputex-form.js", 178);
this.buttons[i].on("submit",function() { _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 3)", 178);
this.fire("submit"); }, this);
         
         }
      
      
      // When form submitEvent is fired, call onSubmit
      _yuitest_coverline("build/inputex-form/inputex-form.js", 184);
this.on("submit", this.options.onSubmit || this.onSubmit,this);
   },

   /**
    * Intercept the 'onsubmit' event and stop it if !validate
    * If the ajax option object is set, use YUI async Request to send the form
    * @method onSubmit
    * @param {Event} e The original onSubmit event
    */
   onSubmit: function() {
      
      // do nothing if does not validate
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSubmit", 193);
_yuitest_coverline("build/inputex-form/inputex-form.js", 196);
if ( !this.validate() ) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 197);
return; // no submit
      }
      _yuitest_coverline("build/inputex-form/inputex-form.js", 199);
this.fire("afterValidation");
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 201);
if(this.options.ajax) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 202);
this.asyncRequest(); // send ajax request
         _yuitest_coverline("build/inputex-form/inputex-form.js", 203);
return;
      }
      
      // normal submit finally
      // (won't fire a dom "submit" event, so no risk to loop)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 208);
this.form.submit();
   },

   /**
    * Send the form value in JSON through an ajax request
    * @method asyncRequest
    */
   asyncRequest: function() {

      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "asyncRequest", 215);
_yuitest_coverline("build/inputex-form/inputex-form.js", 217);
if(this.options.ajax.showMask) { this.showMask(); }

      _yuitest_coverline("build/inputex-form/inputex-form.js", 219);
var formValue = this.getValue(),
      uri, method, postData, headers, params, key, pName, formVal, p,onSuccess, onFailure;

      // options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form
      _yuitest_coverline("build/inputex-form/inputex-form.js", 223);
uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;
      _yuitest_coverline("build/inputex-form/inputex-form.js", 224);
method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;

      _yuitest_coverline("build/inputex-form/inputex-form.js", 226);
postData = null;
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 228);
headers = {};

      // Classic application/x-www-form-urlencoded (like html forms)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 231);
if(this.options.ajax.contentType === "application/x-www-form-urlencoded" && method !== "PUT") {
         
         _yuitest_coverline("build/inputex-form/inputex-form.js", 233);
headers["Content-Type"] = "application/x-www-form-urlencoded";
         
        _yuitest_coverline("build/inputex-form/inputex-form.js", 235);
params = [];
        _yuitest_coverline("build/inputex-form/inputex-form.js", 236);
for(key in formValue) {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 237);
if(formValue.hasOwnProperty(key)) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 238);
pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');
            _yuitest_coverline("build/inputex-form/inputex-form.js", 239);
params.push( pName+"="+window.encodeURIComponent(formValue[key]));
          }
        }
        _yuitest_coverline("build/inputex-form/inputex-form.js", 242);
postData = params.join('&');
      }
      // The only other contentType available is "application/json"
      else {
        _yuitest_coverline("build/inputex-form/inputex-form.js", 246);
headers["Content-Type"] = 'application/json';

        // method PUT don't send as x-www-form-urlencoded but in JSON
        _yuitest_coverline("build/inputex-form/inputex-form.js", 249);
if(method === "PUT") {
          _yuitest_coverline("build/inputex-form/inputex-form.js", 250);
formVal = this.getValue();

          _yuitest_coverline("build/inputex-form/inputex-form.js", 252);
if(this.options.ajax.wrapObject) {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 253);
p = {};
            _yuitest_coverline("build/inputex-form/inputex-form.js", 254);
p[this.options.ajax.wrapObject] = formVal;
          }
          else {
            _yuitest_coverline("build/inputex-form/inputex-form.js", 257);
p = formVal;
          }
          _yuitest_coverline("build/inputex-form/inputex-form.js", 259);
postData = Y.JSON.stringify(p);
        }
        else {
          // We keep this case for backward compatibility, but should not be used
          // Used when we send in JSON in POST or GET
          _yuitest_coverline("build/inputex-form/inputex-form.js", 264);
postData = Y.JSON.stringify(this.getValue());
        }
      }
      _yuitest_coverline("build/inputex-form/inputex-form.js", 267);
onSuccess = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onSuccess", 267);
_yuitest_coverline("build/inputex-form/inputex-form.js", 268);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 269);
if( lang.isFunction(this.options.ajax.callback.success) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 270);
this.options.ajax.callback.success.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 273);
onFailure = function() {
            _yuitest_coverfunc("build/inputex-form/inputex-form.js", "onFailure", 273);
_yuitest_coverline("build/inputex-form/inputex-form.js", 274);
if(this.options.ajax.showMask) { this.hideMask(); }
            _yuitest_coverline("build/inputex-form/inputex-form.js", 275);
if( lang.isFunction(this.options.ajax.callback.failure) ) {
               _yuitest_coverline("build/inputex-form/inputex-form.js", 276);
this.options.ajax.callback.failure.apply(this.options.ajax.callback.scope,arguments);
            }
      };
      _yuitest_coverline("build/inputex-form/inputex-form.js", 279);
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
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "renderMask", 295);
_yuitest_coverline("build/inputex-form/inputex-form.js", 296);
if(this.maskRendered) {return;}

      // position as "relative" to position formMask inside as "absolute"
      _yuitest_coverline("build/inputex-form/inputex-form.js", 299);
Y.one(this.divEl).setStyle( "position", "relative");

      // set zoom = 1 to fix hasLayout issue with IE6/7
      _yuitest_coverline("build/inputex-form/inputex-form.js", 302);
if (Y.UA.ie > 0) { Y.one(this.divEl).setStyle("zoom", 1); }

      // Render mask over the divEl
      _yuitest_coverline("build/inputex-form/inputex-form.js", 305);
this.formMask = inputEx.cn('div', {className: 'inputEx-Form-Mask'},
         {
            display: 'none',
            // Use offsetWidth instead of Dom.getStyle(this.divEl,"width") because
            // would return "auto" with IE instead of size in px
            width: this.divEl.offsetWidth+"px",
            height: this.divEl.offsetHeight+"px"
         },
         "<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>"+
                  this.messages.ajaxWait+"</span></div>");
      _yuitest_coverline("build/inputex-form/inputex-form.js", 315);
this.divEl.appendChild(this.formMask);
      _yuitest_coverline("build/inputex-form/inputex-form.js", 316);
this.maskRendered = true;
   },

   /**
    * Show the form mask
    * @method showMask
    */
   showMask: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "showMask", 323);
_yuitest_coverline("build/inputex-form/inputex-form.js", 324);
this.renderMask();

      // Hide selects in IE 6
      _yuitest_coverline("build/inputex-form/inputex-form.js", 327);
this.toggleSelectsInIE(false);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 329);
this.formMask.style.display = '';
   },

   /**
    * Hide the form mask
    * @method hideMask
    */
   hideMask: function() {

      // Show selects back in IE 6
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "hideMask", 336);
_yuitest_coverline("build/inputex-form/inputex-form.js", 339);
this.toggleSelectsInIE(true);

      _yuitest_coverline("build/inputex-form/inputex-form.js", 341);
this.formMask.style.display = 'none';
   },

   /**
    * Method to hide selects in IE 6 when masking the form (else they would appear over the mask)
    * @method toggleSelectsInIE
    */
   toggleSelectsInIE: function(show) {
      // IE 6 only
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "toggleSelectsInIE", 348);
_yuitest_coverline("build/inputex-form/inputex-form.js", 350);
if (!!Y.UA.ie && Y.UA.ie < 7) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 351);
var methodName = !!show ? "removeClass" : "addClass";
         _yuitest_coverline("build/inputex-form/inputex-form.js", 352);
Y.one(this.divEl).all("select").each(function(e){
           _yuitest_coverfunc("build/inputex-form/inputex-form.js", "(anonymous 4)", 352);
_yuitest_coverline("build/inputex-form/inputex-form.js", 353);
e[methodName]("inputEx-hidden");
         });
      }
   },


   /**
    * Enable all fields and buttons in the form
    * @method enable
    */
   enable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "enable", 363);
_yuitest_coverline("build/inputex-form/inputex-form.js", 364);
inputEx.Form.superclass.enable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 366);
for (var i = 0 ; i < this.buttons.length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 367);
this.buttons[i].enable();
      }
   },

   /**
    * Disable all fields and buttons in the form
    * @method disable
    */
   disable: function() {
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "disable", 375);
_yuitest_coverline("build/inputex-form/inputex-form.js", 376);
inputEx.Form.superclass.disable.call(this);
      
      _yuitest_coverline("build/inputex-form/inputex-form.js", 378);
for (var i = 0 ; i < this.buttons.length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 379);
this.buttons[i].disable();
      }
   },
   
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      _yuitest_coverfunc("build/inputex-form/inputex-form.js", "destroy", 388);
_yuitest_coverline("build/inputex-form/inputex-form.js", 390);
var i, length, button;
      
      // Unsubscribe all listeners to submit event
      _yuitest_coverline("build/inputex-form/inputex-form.js", 393);
Y.Event.purgeElement(this.form);
      
      // Recursively destroy buttons
      _yuitest_coverline("build/inputex-form/inputex-form.js", 396);
for (i = 0, length = this.buttons.length ; i < length ; i++) {
         _yuitest_coverline("build/inputex-form/inputex-form.js", 397);
button = this.buttons[i];
         _yuitest_coverline("build/inputex-form/inputex-form.js", 398);
button.destroy();
      }
      
      // destroy Form itself (+ inputs)
      _yuitest_coverline("build/inputex-form/inputex-form.js", 402);
inputEx.Form.superclass.destroy.call(this);
      
   }

});

// Register this class as "form" type
_yuitest_coverline("build/inputex-form/inputex-form.js", 409);
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


}, '@VERSION@', {
    "requires": [
        "io-base",
        "json-stringify",
        "inputex-group",
        "inputex-button"
    ],
    "ix_provides": "form",
    "skinnable": true,
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
