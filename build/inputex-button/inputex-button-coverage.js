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
_yuitest_coverage["build/inputex-button/inputex-button.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-button/inputex-button.js",
    code: []
};
_yuitest_coverage["build/inputex-button/inputex-button.js"].code=["YUI.add('inputex-button', function (Y, NAME) {","","/**"," * @module inputex-button"," */","YUI.add(\"inputex-button\",function(Y){","   ","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a button"," * @class inputEx.widget.Button"," * @constructor"," * @param {Object} options The following options are available for Button :"," * <ul>"," * 	<li><b>id</b>: id of the created A element (default is auto-generated)</li>"," * 	<li><b>className</b>: CSS class added to the button (default is either \"inputEx-Button-Link\" or \"inputEx-Button-Submit-Link\", depending on \"type\")</li>"," * 	<li><b>parentEl</b>: The DOM element where we should append the button</li>"," * 	<li><b>type</b>: \"link\", \"submit-link\" or \"submit\"</li>"," * 	<li><b>value</b>: text displayed inside the button</li>"," * 	<li><b>disabled</b>: Disable the button after creation</li>"," * 	<li><b>onClick</b>: Custom click event handler</li>"," * </ul>"," */","inputEx.widget.Button = function(options) {","   ","   this.setOptions(options || {});","      ","   if (!!this.options.parentEl) {","      this.render(this.options.parentEl);","   }","   ","};","","","Y.mix(inputEx.widget.Button.prototype,{","   ","   /**"," 	 * set the default options"," 	 * @method setOptions"," 	 */","   setOptions: function(options) {","      ","      this.options = {};","      this.options.id = lang.isString(options.id) ? options.id  : Y.guid();","      this.options.className = options.className || \"inputEx-Button\";","      this.options.parentEl = lang.isString(options.parentEl) ? Y.one(\"#\"+options.parentEl) : options.parentEl;","      ","      // default type === \"submit\"","      this.options.type = (options.type === \"link\" || options.type === \"submit-link\") ? options.type : \"submit\";","      ","      // value is the text displayed inside the button (<input type=\"submit\" value=\"Submit\" /> convention...)","      this.options.value = options.value;","      ","      this.options.disabled = !!options.disabled;","      ","      if (lang.isFunction(options.onClick)) {","         this.options.onClick = {fn: options.onClick, scope:this};","         ","      } else if (lang.isObject(options.onClick)) {","         this.options.onClick = {fn: options.onClick.fn, scope: options.onClick.scope || this};","      }","      ","   },","   ","   /**"," 	 * render the button into the parent Element"," 	 * @method render","    * @param {DOMElement} parentEl The DOM element where the button should be rendered","	 * @return {DOMElement} The created button","	 */","   render: function(parentEl) {","      ","      var innerSpan;","      ","      if (this.options.type === \"link\" || this.options.type === \"submit-link\") {","         ","         this.el = inputEx.cn('a', {className: this.options.className, id:this.options.id, href:\"#\"});","         Y.one(this.el).addClass(this.options.type === \"link\" ? \"inputEx-Button-Link\" : \"inputEx-Button-Submit-Link\");","         ","         innerSpan = inputEx.cn('span', null, null, this.options.value);","         ","         this.el.appendChild(innerSpan);","         ","      // default type is \"submit\" input","      } else {","         ","         this.el = inputEx.cn('input', {type: \"submit\", value: this.options.value, className: this.options.className, id:this.options.id});","         Y.one(this.el).addClass(\"inputEx-Button-Submit\");","      }","      ","      parentEl.appendChild(this.el);","      ","      if (this.options.disabled) {","         this.disable();","      }","      ","      this.initEvents();","      ","      return this.el;","   },","   ","   /**"," 	 * attach the listeners on \"click\" event and create the custom events"," 	 * @method initEvents","	 */","   initEvents: function() {","","      /**","		 * Click Event facade (YUI3 published event)"," 		 * @event click","		 */ ","		 this.publish(\"click\")","","      /**","		 * Submit Event facade (YUI3 published event)"," 		 * @event submit","		 */","		 this.publish(\"submit\")","      ","      Y.on(\"click\",function(e) {","         ","         var fireSubmitEvent;","         ","         // stop click event, so :","         //","         //  1. buttons of 'link' or 'submit-link' type don't link to any url","         //  2. buttons of 'submit' type (<input type=\"submit\" />) don't fire a 'submit' event","         e.halt();","         ","         // button disabled : don't fire clickEvent, and stop here","         if (this.disabled) {","            fireSubmitEvent = false;","            ","         // button enabled : fire clickEvent","         } else {","            // submit event will be fired if not prevented by clickEvent","            fireSubmitEvent = this.fire(\"click\");","         }","         ","         // link buttons should NOT fire a submit event","         if (this.options.type === \"link\") {","            fireSubmitEvent = false;","         }","         ","         if (fireSubmitEvent) {","            this.fire(\"submit\");","         }","         ","      },this.el,this)","      ","      // Subscribe onClick handler","      if (this.options.onClick) {","         this.on(\"click\", this.options.onClick.fn,this.options.onClick.scope);","      }","      ","   },","   ","   /**"," 	 * Disable the button"," 	 * @method disable","	 */","   disable: function() {","      ","      this.disabled = true;","      ","      Y.one(this.el).addClass(\"inputEx-Button-disabled\");","      ","      if (this.options.type === \"submit\") {","         this.el.disabled = true;","      }","   },","   ","   /**"," 	 * Enable the button"," 	 * @method enable","	 */","   enable: function() {","      ","      this.disabled = false;","      ","      Y.one(this.el).removeClass(\"inputEx-Button-disabled\");","      ","      if (this.options.type === \"submit\") {","         this.el.disabled = false;","      }","   },","   ","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      // Unsubscribe all listeners to click and submit events","      this.detach(\"submit\");","      this.detach(\"click\");","      ","      // Purge element (remove listeners on el and childNodes recursively)","      Y.Event.purgeElement(this.el);","      ","      // Remove from DOM","      if(Y.one(this.el).inDoc()) {","         this.el.parentNode.removeChild(this.el);","      }","      ","   }","   ","   ","});","  Y.augment(inputEx.widget.Button, Y.EventTarget, null, null, {});","},'3.1.0',{","  requires:[\"inputex\"]","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-button/inputex-button.js"].lines = {"1":0,"6":0,"8":0,"26":0,"28":0,"30":0,"31":0,"37":0,"45":0,"46":0,"47":0,"48":0,"51":0,"54":0,"56":0,"58":0,"59":0,"61":0,"62":0,"75":0,"77":0,"79":0,"80":0,"82":0,"84":0,"89":0,"90":0,"93":0,"95":0,"96":0,"99":0,"101":0,"114":0,"120":0,"122":0,"124":0,"130":0,"133":0,"134":0,"139":0,"143":0,"144":0,"147":0,"148":0,"154":0,"155":0,"166":0,"168":0,"170":0,"171":0,"181":0,"183":0,"185":0,"186":0,"198":0,"199":0,"202":0,"205":0,"206":0,"213":0};
_yuitest_coverage["build/inputex-button/inputex-button.js"].functions = {"Button:26":0,"setOptions:43":0,"render:73":0,"(anonymous 3):122":0,"initEvents:108":0,"disable:164":0,"enable:179":0,"destroy:195":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-button/inputex-button.js"].coveredLines = 60;
_yuitest_coverage["build/inputex-button/inputex-button.js"].coveredFunctions = 10;
_yuitest_coverline("build/inputex-button/inputex-button.js", 1);
YUI.add('inputex-button', function (Y, NAME) {

/**
 * @module inputex-button
 */
_yuitest_coverfunc("build/inputex-button/inputex-button.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-button/inputex-button.js", 6);
YUI.add("inputex-button",function(Y){
   
   _yuitest_coverfunc("build/inputex-button/inputex-button.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-button/inputex-button.js", 8);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Create a button
 * @class inputEx.widget.Button
 * @constructor
 * @param {Object} options The following options are available for Button :
 * <ul>
 * 	<li><b>id</b>: id of the created A element (default is auto-generated)</li>
 * 	<li><b>className</b>: CSS class added to the button (default is either "inputEx-Button-Link" or "inputEx-Button-Submit-Link", depending on "type")</li>
 * 	<li><b>parentEl</b>: The DOM element where we should append the button</li>
 * 	<li><b>type</b>: "link", "submit-link" or "submit"</li>
 * 	<li><b>value</b>: text displayed inside the button</li>
 * 	<li><b>disabled</b>: Disable the button after creation</li>
 * 	<li><b>onClick</b>: Custom click event handler</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-button/inputex-button.js", 26);
inputEx.widget.Button = function(options) {
   
   _yuitest_coverfunc("build/inputex-button/inputex-button.js", "Button", 26);
_yuitest_coverline("build/inputex-button/inputex-button.js", 28);
this.setOptions(options || {});
      
   _yuitest_coverline("build/inputex-button/inputex-button.js", 30);
if (!!this.options.parentEl) {
      _yuitest_coverline("build/inputex-button/inputex-button.js", 31);
this.render(this.options.parentEl);
   }
   
};


_yuitest_coverline("build/inputex-button/inputex-button.js", 37);
Y.mix(inputEx.widget.Button.prototype,{
   
   /**
 	 * set the default options
 	 * @method setOptions
 	 */
   setOptions: function(options) {
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "setOptions", 43);
_yuitest_coverline("build/inputex-button/inputex-button.js", 45);
this.options = {};
      _yuitest_coverline("build/inputex-button/inputex-button.js", 46);
this.options.id = lang.isString(options.id) ? options.id  : Y.guid();
      _yuitest_coverline("build/inputex-button/inputex-button.js", 47);
this.options.className = options.className || "inputEx-Button";
      _yuitest_coverline("build/inputex-button/inputex-button.js", 48);
this.options.parentEl = lang.isString(options.parentEl) ? Y.one("#"+options.parentEl) : options.parentEl;
      
      // default type === "submit"
      _yuitest_coverline("build/inputex-button/inputex-button.js", 51);
this.options.type = (options.type === "link" || options.type === "submit-link") ? options.type : "submit";
      
      // value is the text displayed inside the button (<input type="submit" value="Submit" /> convention...)
      _yuitest_coverline("build/inputex-button/inputex-button.js", 54);
this.options.value = options.value;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 56);
this.options.disabled = !!options.disabled;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 58);
if (lang.isFunction(options.onClick)) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 59);
this.options.onClick = {fn: options.onClick, scope:this};
         
      } else {_yuitest_coverline("build/inputex-button/inputex-button.js", 61);
if (lang.isObject(options.onClick)) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 62);
this.options.onClick = {fn: options.onClick.fn, scope: options.onClick.scope || this};
      }}
      
   },
   
   /**
 	 * render the button into the parent Element
 	 * @method render
    * @param {DOMElement} parentEl The DOM element where the button should be rendered
	 * @return {DOMElement} The created button
	 */
   render: function(parentEl) {
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "render", 73);
_yuitest_coverline("build/inputex-button/inputex-button.js", 75);
var innerSpan;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 77);
if (this.options.type === "link" || this.options.type === "submit-link") {
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 79);
this.el = inputEx.cn('a', {className: this.options.className, id:this.options.id, href:"#"});
         _yuitest_coverline("build/inputex-button/inputex-button.js", 80);
Y.one(this.el).addClass(this.options.type === "link" ? "inputEx-Button-Link" : "inputEx-Button-Submit-Link");
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 82);
innerSpan = inputEx.cn('span', null, null, this.options.value);
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 84);
this.el.appendChild(innerSpan);
         
      // default type is "submit" input
      } else {
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 89);
this.el = inputEx.cn('input', {type: "submit", value: this.options.value, className: this.options.className, id:this.options.id});
         _yuitest_coverline("build/inputex-button/inputex-button.js", 90);
Y.one(this.el).addClass("inputEx-Button-Submit");
      }
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 93);
parentEl.appendChild(this.el);
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 95);
if (this.options.disabled) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 96);
this.disable();
      }
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 99);
this.initEvents();
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 101);
return this.el;
   },
   
   /**
 	 * attach the listeners on "click" event and create the custom events
 	 * @method initEvents
	 */
   initEvents: function() {

      /**
		 * Click Event facade (YUI3 published event)
 		 * @event click
		 */ 
		 _yuitest_coverfunc("build/inputex-button/inputex-button.js", "initEvents", 108);
_yuitest_coverline("build/inputex-button/inputex-button.js", 114);
this.publish("click")

      /**
		 * Submit Event facade (YUI3 published event)
 		 * @event submit
		 */
		 _yuitest_coverline("build/inputex-button/inputex-button.js", 120);
this.publish("submit")
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 122);
Y.on("click",function(e) {
         
         _yuitest_coverfunc("build/inputex-button/inputex-button.js", "(anonymous 3)", 122);
_yuitest_coverline("build/inputex-button/inputex-button.js", 124);
var fireSubmitEvent;
         
         // stop click event, so :
         //
         //  1. buttons of 'link' or 'submit-link' type don't link to any url
         //  2. buttons of 'submit' type (<input type="submit" />) don't fire a 'submit' event
         _yuitest_coverline("build/inputex-button/inputex-button.js", 130);
e.halt();
         
         // button disabled : don't fire clickEvent, and stop here
         _yuitest_coverline("build/inputex-button/inputex-button.js", 133);
if (this.disabled) {
            _yuitest_coverline("build/inputex-button/inputex-button.js", 134);
fireSubmitEvent = false;
            
         // button enabled : fire clickEvent
         } else {
            // submit event will be fired if not prevented by clickEvent
            _yuitest_coverline("build/inputex-button/inputex-button.js", 139);
fireSubmitEvent = this.fire("click");
         }
         
         // link buttons should NOT fire a submit event
         _yuitest_coverline("build/inputex-button/inputex-button.js", 143);
if (this.options.type === "link") {
            _yuitest_coverline("build/inputex-button/inputex-button.js", 144);
fireSubmitEvent = false;
         }
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 147);
if (fireSubmitEvent) {
            _yuitest_coverline("build/inputex-button/inputex-button.js", 148);
this.fire("submit");
         }
         
      },this.el,this)
      
      // Subscribe onClick handler
      _yuitest_coverline("build/inputex-button/inputex-button.js", 154);
if (this.options.onClick) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 155);
this.on("click", this.options.onClick.fn,this.options.onClick.scope);
      }
      
   },
   
   /**
 	 * Disable the button
 	 * @method disable
	 */
   disable: function() {
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "disable", 164);
_yuitest_coverline("build/inputex-button/inputex-button.js", 166);
this.disabled = true;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 168);
Y.one(this.el).addClass("inputEx-Button-disabled");
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 170);
if (this.options.type === "submit") {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 171);
this.el.disabled = true;
      }
   },
   
   /**
 	 * Enable the button
 	 * @method enable
	 */
   enable: function() {
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "enable", 179);
_yuitest_coverline("build/inputex-button/inputex-button.js", 181);
this.disabled = false;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 183);
Y.one(this.el).removeClass("inputEx-Button-disabled");
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 185);
if (this.options.type === "submit") {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 186);
this.el.disabled = false;
      }
   },
   
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      // Unsubscribe all listeners to click and submit events
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "destroy", 195);
_yuitest_coverline("build/inputex-button/inputex-button.js", 198);
this.detach("submit");
      _yuitest_coverline("build/inputex-button/inputex-button.js", 199);
this.detach("click");
      
      // Purge element (remove listeners on el and childNodes recursively)
      _yuitest_coverline("build/inputex-button/inputex-button.js", 202);
Y.Event.purgeElement(this.el);
      
      // Remove from DOM
      _yuitest_coverline("build/inputex-button/inputex-button.js", 205);
if(Y.one(this.el).inDoc()) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 206);
this.el.parentNode.removeChild(this.el);
      }
      
   }
   
   
});
  _yuitest_coverline("build/inputex-button/inputex-button.js", 213);
Y.augment(inputEx.widget.Button, Y.EventTarget, null, null, {});
},'3.1.0',{
  requires:["inputex"]
});


}, '@VERSION@');
