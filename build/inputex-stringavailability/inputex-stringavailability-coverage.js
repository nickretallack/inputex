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
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-stringavailability/inputex-stringavailability.js",
    code: []
};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].code=["YUI.add('inputex-stringavailability', function (Y, NAME) {","","/**"," * @module inputex-stringavailability"," */","  var lang=Y.Lang,","      inputEx = Y.inputEx;","","/**"," * String field that sends an Ajax request to check if it is available"," * it can be useful for email availability for example"," * @class inputEx.StringAvailability"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options "," */","inputEx.StringAvailability = function(options) {","   inputEx.StringAvailability.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.StringAvailability, inputEx.StringField, {","","   /**","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","    setOptions: function(options) {","      inputEx.StringAvailability.superclass.setOptions.call(this, options);","      ","      // Server URI","      this.options.uri = options.uri;","","      // Messages","      this.options.messages.stringLoading = (options.messages && options.messages.stringLoading) ? options.messages.stringLoading : inputEx.messages.stringLoading;","      this.options.messages.stringAvailable = (options.messages && options.messages.stringAvailable) ? options.messages.stringAvailable : inputEx.messages.stringAvailable;","      this.options.messages.stringUnAvailable = (options.messages && options.messages.stringUnAvailable) ? options.messages.stringUnAvailable : inputEx.messages.stringUnAvailable;","      this.options.messages.errorDataText = (options.messages && options.messages.errorDataText) ? options.messages.errorDataText : inputEx.messages.errorDataText;","      ","      // Must hide default Msg to do it custom","      this.options.showMsg = false;","      ","      // Status of AJAX","      this.isRequesting = false;","   },","   ","   /**","    * @method render","    */","   render: function() {","      inputEx.StringAvailability.superclass.render.call(this);","      ","      // Must do it after renderComponent else this.fieldContainer isn't attached to a DOM element","      // DOM.insertAfter(this.availabilityDiv, this.fieldContainer);","","      Y.one(this.fieldContainer).insert(this.availabilityDiv,'after');","","      ","","   },","   ","   /**","    * @method renderComponent","    */","   renderComponent: function() {","      inputEx.StringAvailability.superclass.renderComponent.call(this);    ","      ","      this.availabilityDiv = inputEx.cn('div', {'className':'availabilityDiv'});","      this.availabilityDivIcon = inputEx.cn('div', {'className':'icon'});","      this.availabilityDivText = inputEx.cn('div', {'className':'text'});","      ","      this.availabilityDiv.appendChild(this.availabilityDivIcon);","      this.availabilityDiv.appendChild(this.availabilityDivText);","      this.availabilityDiv.appendChild(inputEx.cn('div', {'className':'clear'}));","      ","   },","   ","   /**","    * @method initEvents","    */","   initEvents: function() {","      inputEx.StringAvailability.superclass.initEvents.call(this);","   },","","   /**","    * @method onKeyPress","    */","   onKeyPress: function(e) {","      // Dont listen for TAB key","      if ( e.keyCode === 9 ) { return; }","      ","      this.isRequesting = true;","      ","      // Must do this to wait that value is updated (for the getValue())","      lang.later(0, this, function(){","","      // If field is empty","      if(this.getValue() === ''){","         this.stopTimer();","         this.setAvailabilityState(this.options.required ? \"required\" : \"none\");","         return;","      }","","      this.resetTimer();","      this.setAvailabilityState(\"loading\");","      ","   });","   },","   ","   /**","    * @method resetTimer","    */","   resetTimer: function() {","      this.stopTimer();","      this.startTimer();","   },","   ","   /**","    * @method startTimer","    */","   startTimer: function() {","      var that = this;","      this.timerId = setTimeout(function(){","         that.getAvailability(that.getValue());","      },500);","   },","   ","   /**","    * @method stopTimer","    */","   stopTimer: function() {","      if(this.timerId){","         clearTimeout(this.timerId);","         delete this.timerId;","      }","   },","   ","   /**","    * What to do when the string is available","    * @method onAvailable","    */","    onAvailable: function(){","      this.setAvailabilityState(\"available\");","      this.isAvailable = true;","      this.isRequesting = false;","   },","   ","   /**","    * What to do when the string is NOT available","    * @method onUnavailable","    */","    onUnavailable: function(){","      this.setAvailabilityState(\"unavailable\");","      this.isAvailable = false;","      this.isRequesting = false;","   },","   /**","    * Problem during the request","    * @method onFailure","    */","   onFailure : function(){","      this.setAvailabilityState(\"fail\");","      this.isAvailable = false;","      this.isRequesting = false;","   },","","   /**","    * @method setAvailabilityState","    */","   setAvailabilityState: function(state) {","","      if(state === \"none\"){","         this.availabilityDivText.innerHTML = '';","         Y.one(this.availabilityDiv).set('className','availabilityDiv');","         this.availabilityDiv.style.display = 'none';","         return;","      }","      else if(state === \"loading\"){","         this.availabilityDivText.innerHTML = this.options.messages.stringLoading;","      }","      else if(state === \"available\"){","         this.availabilityDivText.innerHTML = this.options.messages.stringAvailable;","      }","      else if(state === \"unavailable\"){","         this.availabilityDivText.innerHTML = this.options.messages.stringUnAvailable;","      }","      else if(state === \"required\"){","         this.availabilityDivText.innerHTML = this.options.messages.required;","      }","      else if(state === \"fail\"){","         this.availabilityDivText.innerHTML = this.options.messages.errorDataText;","      }","      ","      // DOM.setAttribute(this.availabilityDiv, 'class', 'availabilityDiv '+state);","      Y.one(this.availabilityDiv).set('className','availabilityDiv'+' '+state);","      this.availabilityDiv.style.display = 'block';","      ","   },","   ","   /**","    * @method setClassFromState","    */","   setClassFromState: function(){","      inputEx.StringAvailability.superclass.setClassFromState.call(this);","      ","      var state = this.getState();","      ","      if(state === \"required\"){","         this.setAvailabilityState(state);","      }","   },","   ","   /**","    * @method validate","    */","   validate: function() {","","      // If AJAX request running","      if ( !!this.isRequesting ) { return false; }","      ","      var valid = inputEx.StringAvailability.superclass.validate.call(this);","      if(!lang.isUndefined(this.isAvailable)){","         valid = this.isAvailable && valid;","      }","      ","      return valid;","   },","   ","   /**","    * Perform the Ajax request","    * @method getAvailability","    */","    getAvailability: function(string) {","","var   that = this,","      requestConfiguration = {","         data : {","            \"availabilityRequest\" : string","         },","         on : {","             success: function(id, o) {   ","","            var obj = Y.JSON.parse(o.responseText);","            ","            if(obj === \"true\" || !!obj){","               that.onAvailable();","            }","            else if(obj === \"false\" || !obj){","               that.onUnavailable();","            }","         },","         failure: function(id, o) {","            // TODO ?","            that.onFailure(o);","         }","         }","      };","","      Y.io(this.options.uri,requestConfiguration);","","   }","});","","// Register this class as \"string-availability\" type","inputEx.registerType(\"string-availability\", inputEx.StringAvailability);   ","","","}, '@VERSION@', {\"requires\": [\"inputex-string\", \"event-key\", \"io\", \"json-parse\"], \"skinnable\": true});"];
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].lines = {"1":0,"6":0,"17":0,"18":0,"21":0,"28":0,"31":0,"34":0,"35":0,"36":0,"37":0,"40":0,"43":0,"50":0,"55":0,"65":0,"67":0,"68":0,"69":0,"71":0,"72":0,"73":0,"81":0,"89":0,"91":0,"94":0,"97":0,"98":0,"99":0,"100":0,"103":0,"104":0,"113":0,"114":0,"121":0,"122":0,"123":0,"131":0,"132":0,"133":0,"142":0,"143":0,"144":0,"152":0,"153":0,"154":0,"161":0,"162":0,"163":0,"171":0,"172":0,"173":0,"174":0,"175":0,"177":0,"178":0,"180":0,"181":0,"183":0,"184":0,"186":0,"187":0,"189":0,"190":0,"194":0,"195":0,"203":0,"205":0,"207":0,"208":0,"218":0,"220":0,"221":0,"222":0,"225":0,"234":0,"242":0,"244":0,"245":0,"247":0,"248":0,"253":0,"258":0,"264":0};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].functions = {"StringAvailability:17":0,"setOptions:27":0,"render:49":0,"renderComponent:64":0,"initEvents:80":0,"(anonymous 2):94":0,"onKeyPress:87":0,"resetTimer:112":0,"(anonymous 3):122":0,"startTimer:120":0,"stopTimer:130":0,"onAvailable:141":0,"onUnavailable:151":0,"onFailure:160":0,"setAvailabilityState:169":0,"setClassFromState:202":0,"validate:215":0,"success:240":0,"failure:251":0,"getAvailability:232":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].coveredLines = 84;
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].coveredFunctions = 21;
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 1);
YUI.add('inputex-stringavailability', function (Y, NAME) {

/**
 * @module inputex-stringavailability
 */
  _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 6);
var lang=Y.Lang,
      inputEx = Y.inputEx;

/**
 * String field that sends an Ajax request to check if it is available
 * it can be useful for email availability for example
 * @class inputEx.StringAvailability
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options 
 */
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 17);
inputEx.StringAvailability = function(options) {
   _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "StringAvailability", 17);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 18);
inputEx.StringAvailability.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 21);
Y.extend(inputEx.StringAvailability, inputEx.StringField, {

   /**
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
    setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setOptions", 27);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 28);
inputEx.StringAvailability.superclass.setOptions.call(this, options);
      
      // Server URI
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 31);
this.options.uri = options.uri;

      // Messages
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 34);
this.options.messages.stringLoading = (options.messages && options.messages.stringLoading) ? options.messages.stringLoading : inputEx.messages.stringLoading;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 35);
this.options.messages.stringAvailable = (options.messages && options.messages.stringAvailable) ? options.messages.stringAvailable : inputEx.messages.stringAvailable;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 36);
this.options.messages.stringUnAvailable = (options.messages && options.messages.stringUnAvailable) ? options.messages.stringUnAvailable : inputEx.messages.stringUnAvailable;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 37);
this.options.messages.errorDataText = (options.messages && options.messages.errorDataText) ? options.messages.errorDataText : inputEx.messages.errorDataText;
      
      // Must hide default Msg to do it custom
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 40);
this.options.showMsg = false;
      
      // Status of AJAX
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 43);
this.isRequesting = false;
   },
   
   /**
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "render", 49);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 50);
inputEx.StringAvailability.superclass.render.call(this);
      
      // Must do it after renderComponent else this.fieldContainer isn't attached to a DOM element
      // DOM.insertAfter(this.availabilityDiv, this.fieldContainer);

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 55);
Y.one(this.fieldContainer).insert(this.availabilityDiv,'after');

      

   },
   
   /**
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "renderComponent", 64);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 65);
inputEx.StringAvailability.superclass.renderComponent.call(this);    
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 67);
this.availabilityDiv = inputEx.cn('div', {'className':'availabilityDiv'});
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 68);
this.availabilityDivIcon = inputEx.cn('div', {'className':'icon'});
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 69);
this.availabilityDivText = inputEx.cn('div', {'className':'text'});
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 71);
this.availabilityDiv.appendChild(this.availabilityDivIcon);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 72);
this.availabilityDiv.appendChild(this.availabilityDivText);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 73);
this.availabilityDiv.appendChild(inputEx.cn('div', {'className':'clear'}));
      
   },
   
   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "initEvents", 80);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 81);
inputEx.StringAvailability.superclass.initEvents.call(this);
   },

   /**
    * @method onKeyPress
    */
   onKeyPress: function(e) {
      // Dont listen for TAB key
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onKeyPress", 87);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 89);
if ( e.keyCode === 9 ) { return; }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 91);
this.isRequesting = true;
      
      // Must do this to wait that value is updated (for the getValue())
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 94);
lang.later(0, this, function(){

      // If field is empty
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 2)", 94);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 97);
if(this.getValue() === ''){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 98);
this.stopTimer();
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 99);
this.setAvailabilityState(this.options.required ? "required" : "none");
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 100);
return;
      }

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 103);
this.resetTimer();
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 104);
this.setAvailabilityState("loading");
      
   });
   },
   
   /**
    * @method resetTimer
    */
   resetTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "resetTimer", 112);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 113);
this.stopTimer();
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 114);
this.startTimer();
   },
   
   /**
    * @method startTimer
    */
   startTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "startTimer", 120);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 121);
var that = this;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 122);
this.timerId = setTimeout(function(){
         _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 3)", 122);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 123);
that.getAvailability(that.getValue());
      },500);
   },
   
   /**
    * @method stopTimer
    */
   stopTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "stopTimer", 130);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 131);
if(this.timerId){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 132);
clearTimeout(this.timerId);
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 133);
delete this.timerId;
      }
   },
   
   /**
    * What to do when the string is available
    * @method onAvailable
    */
    onAvailable: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onAvailable", 141);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 142);
this.setAvailabilityState("available");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 143);
this.isAvailable = true;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 144);
this.isRequesting = false;
   },
   
   /**
    * What to do when the string is NOT available
    * @method onUnavailable
    */
    onUnavailable: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onUnavailable", 151);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 152);
this.setAvailabilityState("unavailable");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 153);
this.isAvailable = false;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 154);
this.isRequesting = false;
   },
   /**
    * Problem during the request
    * @method onFailure
    */
   onFailure : function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onFailure", 160);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 161);
this.setAvailabilityState("fail");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 162);
this.isAvailable = false;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 163);
this.isRequesting = false;
   },

   /**
    * @method setAvailabilityState
    */
   setAvailabilityState: function(state) {

      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setAvailabilityState", 169);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 171);
if(state === "none"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 172);
this.availabilityDivText.innerHTML = '';
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 173);
Y.one(this.availabilityDiv).set('className','availabilityDiv');
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 174);
this.availabilityDiv.style.display = 'none';
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 175);
return;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 177);
if(state === "loading"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 178);
this.availabilityDivText.innerHTML = this.options.messages.stringLoading;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 180);
if(state === "available"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 181);
this.availabilityDivText.innerHTML = this.options.messages.stringAvailable;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 183);
if(state === "unavailable"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 184);
this.availabilityDivText.innerHTML = this.options.messages.stringUnAvailable;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 186);
if(state === "required"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 187);
this.availabilityDivText.innerHTML = this.options.messages.required;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 189);
if(state === "fail"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 190);
this.availabilityDivText.innerHTML = this.options.messages.errorDataText;
      }}}}}}
      
      // DOM.setAttribute(this.availabilityDiv, 'class', 'availabilityDiv '+state);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 194);
Y.one(this.availabilityDiv).set('className','availabilityDiv'+' '+state);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 195);
this.availabilityDiv.style.display = 'block';
      
   },
   
   /**
    * @method setClassFromState
    */
   setClassFromState: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setClassFromState", 202);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 203);
inputEx.StringAvailability.superclass.setClassFromState.call(this);
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 205);
var state = this.getState();
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 207);
if(state === "required"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 208);
this.setAvailabilityState(state);
      }
   },
   
   /**
    * @method validate
    */
   validate: function() {

      // If AJAX request running
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "validate", 215);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 218);
if ( !!this.isRequesting ) { return false; }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 220);
var valid = inputEx.StringAvailability.superclass.validate.call(this);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 221);
if(!lang.isUndefined(this.isAvailable)){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 222);
valid = this.isAvailable && valid;
      }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 225);
return valid;
   },
   
   /**
    * Perform the Ajax request
    * @method getAvailability
    */
    getAvailability: function(string) {

_yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "getAvailability", 232);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 234);
var   that = this,
      requestConfiguration = {
         data : {
            "availabilityRequest" : string
         },
         on : {
             success: function(id, o) {   

            _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "success", 240);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 242);
var obj = Y.JSON.parse(o.responseText);
            
            _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 244);
if(obj === "true" || !!obj){
               _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 245);
that.onAvailable();
            }
            else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 247);
if(obj === "false" || !obj){
               _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 248);
that.onUnavailable();
            }}
         },
         failure: function(id, o) {
            // TODO ?
            _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "failure", 251);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 253);
that.onFailure(o);
         }
         }
      };

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 258);
Y.io(this.options.uri,requestConfiguration);

   }
});

// Register this class as "string-availability" type
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 264);
inputEx.registerType("string-availability", inputEx.StringAvailability);   


}, '@VERSION@', {"requires": ["inputex-string", "event-key", "io", "json-parse"], "skinnable": true});
