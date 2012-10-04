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
_yuitest_coverage["build/inputex-button/inputex-button.js"].code=["YUI.add('inputex-button', function (Y, NAME) {","","/**"," * @module inputex-button"," */   ","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a button"," * @class inputEx.widget.Button"," * @constructor"," * @param {Object} options The following options are available for Button :"," * <ul>"," * 	<li><b>id</b>: id of the created A element (default is auto-generated)</li>"," * 	<li><b>className</b>: CSS class added to the button (default is either \"inputEx-Button-Link\" or \"inputEx-Button-Submit-Link\", depending on \"type\")</li>"," * 	<li><b>parentEl</b>: The DOM element where we should append the button</li>"," * 	<li><b>type</b>: \"link\", \"submit-link\" or \"submit\"</li>"," * 	<li><b>value</b>: text displayed inside the button</li>"," * 	<li><b>disabled</b>: Disable the button after creation</li>"," * 	<li><b>onClick</b>: Custom click event handler</li>"," * </ul>"," */","inputEx.widget.Button = function(options) {","   ","   this.setOptions(options || {});","      ","   if (!!this.options.parentEl) {","      this.render(this.options.parentEl);","   }","   ","};","","","Y.mix(inputEx.widget.Button.prototype,{","   ","   /**"," 	 * set the default options"," 	 * @method setOptions"," 	 */","   setOptions: function(options) {","      ","      this.options = {};","      this.options.id = lang.isString(options.id) ? options.id  : Y.guid();","      this.options.className = options.className || \"inputEx-Button\";","      this.options.parentEl = lang.isString(options.parentEl) ? Y.one(\"#\"+options.parentEl) : options.parentEl;","      ","      // default type === \"submit\"","      this.options.type = (options.type === \"link\" || options.type === \"submit-link\") ? options.type : \"submit\";","      ","      // value is the text displayed inside the button (<input type=\"submit\" value=\"Submit\" /> convention...)","      this.options.value = options.value;","      ","      this.options.disabled = !!options.disabled;","      ","      if (lang.isFunction(options.onClick)) {","         this.options.onClick = {fn: options.onClick, scope:this};","         ","      } else if (lang.isObject(options.onClick)) {","         this.options.onClick = {fn: options.onClick.fn, scope: options.onClick.scope || this};","      }","      ","   },","   ","   /**"," 	 * render the button into the parent Element"," 	 * @method render","    * @param {DOMElement} parentEl The DOM element where the button should be rendered","	 * @return {DOMElement} The created button","	 */","   render: function(parentEl) {","      ","      var innerSpan;","      ","      if (this.options.type === \"link\" || this.options.type === \"submit-link\") {","         ","         this.el = inputEx.cn('a', {className: this.options.className, id:this.options.id, href:\"#\"});","         Y.one(this.el).addClass(this.options.type === \"link\" ? \"inputEx-Button-Link\" : \"inputEx-Button-Submit-Link\");","         ","         innerSpan = inputEx.cn('span', null, null, this.options.value);","         ","         this.el.appendChild(innerSpan);","         ","      // default type is \"submit\" input","      } else {","         ","         this.el = inputEx.cn('input', {type: \"submit\", value: this.options.value, className: this.options.className, id:this.options.id});","         Y.one(this.el).addClass(\"inputEx-Button-Submit\");","      }","      ","      parentEl.appendChild(this.el);","      ","      if (this.options.disabled) {","         this.disable();","      }","      ","      this.initEvents();","      ","      return this.el;","   },","   ","   /**"," 	 * attach the listeners on \"click\" event and create the custom events"," 	 * @method initEvents","	 */","   initEvents: function() {","","      /**","		 * Click Event facade (YUI3 published event)"," 		 * @event click","		 */ ","		 this.publish(\"click\")","","      /**","		 * Submit Event facade (YUI3 published event)"," 		 * @event submit","		 */","		 this.publish(\"submit\")","      ","      Y.on(\"click\",function(e) {","         ","         var fireSubmitEvent;","         ","         // stop click event, so :","         //","         //  1. buttons of 'link' or 'submit-link' type don't link to any url","         //  2. buttons of 'submit' type (<input type=\"submit\" />) don't fire a 'submit' event","         e.halt();","         ","         // button disabled : don't fire clickEvent, and stop here","         if (this.disabled) {","            fireSubmitEvent = false;","            ","         // button enabled : fire clickEvent","         } else {","            // submit event will be fired if not prevented by clickEvent","            fireSubmitEvent = this.fire(\"click\");","         }","         ","         // link buttons should NOT fire a submit event","         if (this.options.type === \"link\") {","            fireSubmitEvent = false;","         }","         ","         if (fireSubmitEvent) {","            this.fire(\"submit\");","         }","         ","      },this.el,this)","      ","      // Subscribe onClick handler","      if (this.options.onClick) {","         this.on(\"click\", this.options.onClick.fn,this.options.onClick.scope);","      }","      ","   },","   ","   /**"," 	 * Disable the button"," 	 * @method disable","	 */","   disable: function() {","      ","      this.disabled = true;","      ","      Y.one(this.el).addClass(\"inputEx-Button-disabled\");","      ","      if (this.options.type === \"submit\") {","         this.el.disabled = true;","      }","   },","   ","   /**"," 	 * Enable the button"," 	 * @method enable","	 */","   enable: function() {","      ","      this.disabled = false;","      ","      Y.one(this.el).removeClass(\"inputEx-Button-disabled\");","      ","      if (this.options.type === \"submit\") {","         this.el.disabled = false;","      }","   },","   ","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      // Unsubscribe all listeners to click and submit events","      this.detach(\"submit\");","      this.detach(\"click\");","      ","      // Purge element (remove listeners on el and childNodes recursively)","      Y.Event.purgeElement(this.el);","      ","      // Remove from DOM","      if(Y.one(this.el).inDoc()) {","         this.el.parentNode.removeChild(this.el);","      }","      ","   }","   ","   ","});","","Y.augment(inputEx.widget.Button, Y.EventTarget, null, null, {});","","","}, '@VERSION@', {\"requires\": [\"inputex\"]});"];
_yuitest_coverage["build/inputex-button/inputex-button.js"].lines = {"1":0,"6":0,"24":0,"26":0,"28":0,"29":0,"35":0,"43":0,"44":0,"45":0,"46":0,"49":0,"52":0,"54":0,"56":0,"57":0,"59":0,"60":0,"73":0,"75":0,"77":0,"78":0,"80":0,"82":0,"87":0,"88":0,"91":0,"93":0,"94":0,"97":0,"99":0,"112":0,"118":0,"120":0,"122":0,"128":0,"131":0,"132":0,"137":0,"141":0,"142":0,"145":0,"146":0,"152":0,"153":0,"164":0,"166":0,"168":0,"169":0,"179":0,"181":0,"183":0,"184":0,"196":0,"197":0,"200":0,"203":0,"204":0,"212":0};
_yuitest_coverage["build/inputex-button/inputex-button.js"].functions = {"Button:24":0,"setOptions:41":0,"render:71":0,"(anonymous 2):120":0,"initEvents:106":0,"disable:162":0,"enable:177":0,"destroy:193":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-button/inputex-button.js"].coveredLines = 59;
_yuitest_coverage["build/inputex-button/inputex-button.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-button/inputex-button.js", 1);
YUI.add('inputex-button', function (Y, NAME) {

/**
 * @module inputex-button
 */   
   _yuitest_coverfunc("build/inputex-button/inputex-button.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-button/inputex-button.js", 6);
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
_yuitest_coverline("build/inputex-button/inputex-button.js", 24);
inputEx.widget.Button = function(options) {
   
   _yuitest_coverfunc("build/inputex-button/inputex-button.js", "Button", 24);
_yuitest_coverline("build/inputex-button/inputex-button.js", 26);
this.setOptions(options || {});
      
   _yuitest_coverline("build/inputex-button/inputex-button.js", 28);
if (!!this.options.parentEl) {
      _yuitest_coverline("build/inputex-button/inputex-button.js", 29);
this.render(this.options.parentEl);
   }
   
};


_yuitest_coverline("build/inputex-button/inputex-button.js", 35);
Y.mix(inputEx.widget.Button.prototype,{
   
   /**
 	 * set the default options
 	 * @method setOptions
 	 */
   setOptions: function(options) {
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "setOptions", 41);
_yuitest_coverline("build/inputex-button/inputex-button.js", 43);
this.options = {};
      _yuitest_coverline("build/inputex-button/inputex-button.js", 44);
this.options.id = lang.isString(options.id) ? options.id  : Y.guid();
      _yuitest_coverline("build/inputex-button/inputex-button.js", 45);
this.options.className = options.className || "inputEx-Button";
      _yuitest_coverline("build/inputex-button/inputex-button.js", 46);
this.options.parentEl = lang.isString(options.parentEl) ? Y.one("#"+options.parentEl) : options.parentEl;
      
      // default type === "submit"
      _yuitest_coverline("build/inputex-button/inputex-button.js", 49);
this.options.type = (options.type === "link" || options.type === "submit-link") ? options.type : "submit";
      
      // value is the text displayed inside the button (<input type="submit" value="Submit" /> convention...)
      _yuitest_coverline("build/inputex-button/inputex-button.js", 52);
this.options.value = options.value;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 54);
this.options.disabled = !!options.disabled;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 56);
if (lang.isFunction(options.onClick)) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 57);
this.options.onClick = {fn: options.onClick, scope:this};
         
      } else {_yuitest_coverline("build/inputex-button/inputex-button.js", 59);
if (lang.isObject(options.onClick)) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 60);
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
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "render", 71);
_yuitest_coverline("build/inputex-button/inputex-button.js", 73);
var innerSpan;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 75);
if (this.options.type === "link" || this.options.type === "submit-link") {
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 77);
this.el = inputEx.cn('a', {className: this.options.className, id:this.options.id, href:"#"});
         _yuitest_coverline("build/inputex-button/inputex-button.js", 78);
Y.one(this.el).addClass(this.options.type === "link" ? "inputEx-Button-Link" : "inputEx-Button-Submit-Link");
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 80);
innerSpan = inputEx.cn('span', null, null, this.options.value);
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 82);
this.el.appendChild(innerSpan);
         
      // default type is "submit" input
      } else {
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 87);
this.el = inputEx.cn('input', {type: "submit", value: this.options.value, className: this.options.className, id:this.options.id});
         _yuitest_coverline("build/inputex-button/inputex-button.js", 88);
Y.one(this.el).addClass("inputEx-Button-Submit");
      }
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 91);
parentEl.appendChild(this.el);
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 93);
if (this.options.disabled) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 94);
this.disable();
      }
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 97);
this.initEvents();
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 99);
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
		 _yuitest_coverfunc("build/inputex-button/inputex-button.js", "initEvents", 106);
_yuitest_coverline("build/inputex-button/inputex-button.js", 112);
this.publish("click")

      /**
		 * Submit Event facade (YUI3 published event)
 		 * @event submit
		 */
		 _yuitest_coverline("build/inputex-button/inputex-button.js", 118);
this.publish("submit")
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 120);
Y.on("click",function(e) {
         
         _yuitest_coverfunc("build/inputex-button/inputex-button.js", "(anonymous 2)", 120);
_yuitest_coverline("build/inputex-button/inputex-button.js", 122);
var fireSubmitEvent;
         
         // stop click event, so :
         //
         //  1. buttons of 'link' or 'submit-link' type don't link to any url
         //  2. buttons of 'submit' type (<input type="submit" />) don't fire a 'submit' event
         _yuitest_coverline("build/inputex-button/inputex-button.js", 128);
e.halt();
         
         // button disabled : don't fire clickEvent, and stop here
         _yuitest_coverline("build/inputex-button/inputex-button.js", 131);
if (this.disabled) {
            _yuitest_coverline("build/inputex-button/inputex-button.js", 132);
fireSubmitEvent = false;
            
         // button enabled : fire clickEvent
         } else {
            // submit event will be fired if not prevented by clickEvent
            _yuitest_coverline("build/inputex-button/inputex-button.js", 137);
fireSubmitEvent = this.fire("click");
         }
         
         // link buttons should NOT fire a submit event
         _yuitest_coverline("build/inputex-button/inputex-button.js", 141);
if (this.options.type === "link") {
            _yuitest_coverline("build/inputex-button/inputex-button.js", 142);
fireSubmitEvent = false;
         }
         
         _yuitest_coverline("build/inputex-button/inputex-button.js", 145);
if (fireSubmitEvent) {
            _yuitest_coverline("build/inputex-button/inputex-button.js", 146);
this.fire("submit");
         }
         
      },this.el,this)
      
      // Subscribe onClick handler
      _yuitest_coverline("build/inputex-button/inputex-button.js", 152);
if (this.options.onClick) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 153);
this.on("click", this.options.onClick.fn,this.options.onClick.scope);
      }
      
   },
   
   /**
 	 * Disable the button
 	 * @method disable
	 */
   disable: function() {
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "disable", 162);
_yuitest_coverline("build/inputex-button/inputex-button.js", 164);
this.disabled = true;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 166);
Y.one(this.el).addClass("inputEx-Button-disabled");
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 168);
if (this.options.type === "submit") {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 169);
this.el.disabled = true;
      }
   },
   
   /**
 	 * Enable the button
 	 * @method enable
	 */
   enable: function() {
      
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "enable", 177);
_yuitest_coverline("build/inputex-button/inputex-button.js", 179);
this.disabled = false;
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 181);
Y.one(this.el).removeClass("inputEx-Button-disabled");
      
      _yuitest_coverline("build/inputex-button/inputex-button.js", 183);
if (this.options.type === "submit") {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 184);
this.el.disabled = false;
      }
   },
   
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      // Unsubscribe all listeners to click and submit events
      _yuitest_coverfunc("build/inputex-button/inputex-button.js", "destroy", 193);
_yuitest_coverline("build/inputex-button/inputex-button.js", 196);
this.detach("submit");
      _yuitest_coverline("build/inputex-button/inputex-button.js", 197);
this.detach("click");
      
      // Purge element (remove listeners on el and childNodes recursively)
      _yuitest_coverline("build/inputex-button/inputex-button.js", 200);
Y.Event.purgeElement(this.el);
      
      // Remove from DOM
      _yuitest_coverline("build/inputex-button/inputex-button.js", 203);
if(Y.one(this.el).inDoc()) {
         _yuitest_coverline("build/inputex-button/inputex-button.js", 204);
this.el.parentNode.removeChild(this.el);
      }
      
   }
   
   
});

_yuitest_coverline("build/inputex-button/inputex-button.js", 212);
Y.augment(inputEx.widget.Button, Y.EventTarget, null, null, {});


}, '@VERSION@', {"requires": ["inputex"]});
