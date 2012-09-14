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
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].code=["YUI.add('inputex-stringavailability', function (Y, NAME) {","","/**"," * @module inputex-stringavailability"," */",""," YUI.add(\"inputex-stringavailability\",function(Y){","","","  var lang=Y.Lang,","      inputEx = Y.inputEx;","","/**"," * String field that sends an Ajax request to check if it is available"," * it can be useful for email availability for example"," * @class inputEx.StringAvailability"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options "," */","inputEx.StringAvailability = function(options) {","   inputEx.StringAvailability.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.StringAvailability, inputEx.StringField, {","","   /**","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","    setOptions: function(options) {","      inputEx.StringAvailability.superclass.setOptions.call(this, options);","      ","      // Server URI","      this.options.uri = options.uri;","","      // Messages","      this.options.messages.stringLoading = (options.messages && options.messages.stringLoading) ? options.messages.stringLoading : inputEx.messages.stringLoading;","      this.options.messages.stringAvailable = (options.messages && options.messages.stringAvailable) ? options.messages.stringAvailable : inputEx.messages.stringAvailable;","      this.options.messages.stringUnAvailable = (options.messages && options.messages.stringUnAvailable) ? options.messages.stringUnAvailable : inputEx.messages.stringUnAvailable;","      this.options.messages.errorDataText = (options.messages && options.messages.errorDataText) ? options.messages.errorDataText : inputEx.messages.errorDataText;","      ","      // Must hide default Msg to do it custom","      this.options.showMsg = false;","      ","      // Status of AJAX","      this.isRequesting = false;","   },","   ","   /**","    * @method render","    */","   render: function() {","      inputEx.StringAvailability.superclass.render.call(this);","      ","      // Must do it after renderComponent else this.fieldContainer isn't attached to a DOM element","      // DOM.insertAfter(this.availabilityDiv, this.fieldContainer);","","      Y.one(this.fieldContainer).insert(this.availabilityDiv,'after');","","      ","","   },","   ","   /**","    * @method renderComponent","    */","   renderComponent: function() {","      inputEx.StringAvailability.superclass.renderComponent.call(this);    ","      ","      this.availabilityDiv = inputEx.cn('div', {'className':'availabilityDiv'});","      this.availabilityDivIcon = inputEx.cn('div', {'className':'icon'});","      this.availabilityDivText = inputEx.cn('div', {'className':'text'});","      ","      this.availabilityDiv.appendChild(this.availabilityDivIcon);","      this.availabilityDiv.appendChild(this.availabilityDivText);","      this.availabilityDiv.appendChild(inputEx.cn('div', {'className':'clear'}));","      ","   },","   ","   /**","    * @method initEvents","    */","   initEvents: function() {","      inputEx.StringAvailability.superclass.initEvents.call(this);","   },","","   /**","    * @method onKeyPress","    */","   onKeyPress: function(e) {","      // Dont listen for TAB key","      if ( e.keyCode === 9 ) { return; }","      ","      this.isRequesting = true;","      ","      // Must do this to wait that value is updated (for the getValue())","      lang.later(0, this, function(){","","      // If field is empty","      if(this.getValue() === ''){","         this.stopTimer();","         this.setAvailabilityState(this.options.required ? \"required\" : \"none\");","         return;","      }","","      this.resetTimer();","      this.setAvailabilityState(\"loading\");","      ","   });","   },","   ","   /**","    * @method resetTimer","    */","   resetTimer: function() {","      this.stopTimer();","      this.startTimer();","   },","   ","   /**","    * @method startTimer","    */","   startTimer: function() {","      var that = this;","      this.timerId = setTimeout(function(){","         that.getAvailability(that.getValue());","      },500);","   },","   ","   /**","    * @method stopTimer","    */","   stopTimer: function() {","      if(this.timerId){","         clearTimeout(this.timerId);","         delete this.timerId;","      }","   },","   ","   /**","    * What to do when the string is available","    * @method onAvailable","    */","    onAvailable: function(){","      this.setAvailabilityState(\"available\");","      this.isAvailable = true;","      this.isRequesting = false;","   },","   ","   /**","    * What to do when the string is NOT available","    * @method onUnavailable","    */","    onUnavailable: function(){","      this.setAvailabilityState(\"unavailable\");","      this.isAvailable = false;","      this.isRequesting = false;","   },","   /**","    * Problem during the request","    * @method onFailure","    */","   onFailure : function(){","      this.setAvailabilityState(\"fail\");","      this.isAvailable = false;","      this.isRequesting = false;","   },","","   /**","    * @method setAvailabilityState","    */","   setAvailabilityState: function(state) {","","      if(state === \"none\"){","         this.availabilityDivText.innerHTML = '';","         Y.one(this.availabilityDiv).set('className','availabilityDiv');","         this.availabilityDiv.style.display = 'none';","         return;","      }","      else if(state === \"loading\"){","         this.availabilityDivText.innerHTML = this.options.messages.stringLoading;","      }","      else if(state === \"available\"){","         this.availabilityDivText.innerHTML = this.options.messages.stringAvailable;","      }","      else if(state === \"unavailable\"){","         this.availabilityDivText.innerHTML = this.options.messages.stringUnAvailable;","      }","      else if(state === \"required\"){","         this.availabilityDivText.innerHTML = this.options.messages.required;","      }","      else if(state === \"fail\"){","         this.availabilityDivText.innerHTML = this.options.messages.errorDataText;","      }","      ","      // DOM.setAttribute(this.availabilityDiv, 'class', 'availabilityDiv '+state);","      Y.one(this.availabilityDiv).set('className','availabilityDiv'+' '+state);","      this.availabilityDiv.style.display = 'block';","      ","   },","   ","   /**","    * @method setClassFromState","    */","   setClassFromState: function(){","      inputEx.StringAvailability.superclass.setClassFromState.call(this);","      ","      var state = this.getState();","      ","      if(state === \"required\"){","         this.setAvailabilityState(state);","      }","   },","   ","   /**","    * @method validate","    */","   validate: function() {","","      // If AJAX request running","      if ( !!this.isRequesting ) { return false; }","      ","      var valid = inputEx.StringAvailability.superclass.validate.call(this);","      if(!lang.isUndefined(this.isAvailable)){","         valid = this.isAvailable && valid;","      }","      ","      return valid;","   },","   ","   /**","    * Perform the Ajax request","    * @method getAvailability","    */","    getAvailability: function(string) {","","var   that = this,","      requestConfiguration = {","         data : {","            \"availabilityRequest\" : string","         },","         on : {","             success: function(id, o) {   ","","            var obj = Y.JSON.parse(o.responseText);","            ","            if(obj === \"true\" || !!obj){","               that.onAvailable();","            }","            else if(obj === \"false\" || !obj){","               that.onUnavailable();","            }","         },","         failure: function(id, o) {","            // TODO ?","            that.onFailure(o);","         }","         }","      };","","      Y.io(this.options.uri,requestConfiguration);","","   }","});","","// Register this class as \"string-availability\" type","inputEx.registerType(\"string-availability\", inputEx.StringAvailability);   ","","","},'3.1.0',{requires : [\"inputex-string\",\"event-key\",\"io\",\"json-parse\"]});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].lines = {"1":0,"7":0,"10":0,"21":0,"22":0,"25":0,"32":0,"35":0,"38":0,"39":0,"40":0,"41":0,"44":0,"47":0,"54":0,"59":0,"69":0,"71":0,"72":0,"73":0,"75":0,"76":0,"77":0,"85":0,"93":0,"95":0,"98":0,"101":0,"102":0,"103":0,"104":0,"107":0,"108":0,"117":0,"118":0,"125":0,"126":0,"127":0,"135":0,"136":0,"137":0,"146":0,"147":0,"148":0,"156":0,"157":0,"158":0,"165":0,"166":0,"167":0,"175":0,"176":0,"177":0,"178":0,"179":0,"181":0,"182":0,"184":0,"185":0,"187":0,"188":0,"190":0,"191":0,"193":0,"194":0,"198":0,"199":0,"207":0,"209":0,"211":0,"212":0,"222":0,"224":0,"225":0,"226":0,"229":0,"238":0,"246":0,"248":0,"249":0,"251":0,"252":0,"257":0,"262":0,"268":0};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].functions = {"StringAvailability:21":0,"setOptions:31":0,"render:53":0,"renderComponent:68":0,"initEvents:84":0,"(anonymous 3):98":0,"onKeyPress:91":0,"resetTimer:116":0,"(anonymous 4):126":0,"startTimer:124":0,"stopTimer:134":0,"onAvailable:145":0,"onUnavailable:155":0,"onFailure:164":0,"setAvailabilityState:173":0,"setClassFromState:206":0,"validate:219":0,"success:244":0,"failure:255":0,"getAvailability:236":0,"(anonymous 2):7":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].coveredLines = 85;
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].coveredFunctions = 22;
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 1);
YUI.add('inputex-stringavailability', function (Y, NAME) {

/**
 * @module inputex-stringavailability
 */

 _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 7);
YUI.add("inputex-stringavailability",function(Y){


  _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 2)", 7);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 10);
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
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 21);
inputEx.StringAvailability = function(options) {
   _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "StringAvailability", 21);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 22);
inputEx.StringAvailability.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 25);
Y.extend(inputEx.StringAvailability, inputEx.StringField, {

   /**
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
    setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setOptions", 31);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 32);
inputEx.StringAvailability.superclass.setOptions.call(this, options);
      
      // Server URI
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 35);
this.options.uri = options.uri;

      // Messages
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 38);
this.options.messages.stringLoading = (options.messages && options.messages.stringLoading) ? options.messages.stringLoading : inputEx.messages.stringLoading;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 39);
this.options.messages.stringAvailable = (options.messages && options.messages.stringAvailable) ? options.messages.stringAvailable : inputEx.messages.stringAvailable;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 40);
this.options.messages.stringUnAvailable = (options.messages && options.messages.stringUnAvailable) ? options.messages.stringUnAvailable : inputEx.messages.stringUnAvailable;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 41);
this.options.messages.errorDataText = (options.messages && options.messages.errorDataText) ? options.messages.errorDataText : inputEx.messages.errorDataText;
      
      // Must hide default Msg to do it custom
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 44);
this.options.showMsg = false;
      
      // Status of AJAX
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 47);
this.isRequesting = false;
   },
   
   /**
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "render", 53);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 54);
inputEx.StringAvailability.superclass.render.call(this);
      
      // Must do it after renderComponent else this.fieldContainer isn't attached to a DOM element
      // DOM.insertAfter(this.availabilityDiv, this.fieldContainer);

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 59);
Y.one(this.fieldContainer).insert(this.availabilityDiv,'after');

      

   },
   
   /**
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "renderComponent", 68);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 69);
inputEx.StringAvailability.superclass.renderComponent.call(this);    
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 71);
this.availabilityDiv = inputEx.cn('div', {'className':'availabilityDiv'});
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 72);
this.availabilityDivIcon = inputEx.cn('div', {'className':'icon'});
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 73);
this.availabilityDivText = inputEx.cn('div', {'className':'text'});
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 75);
this.availabilityDiv.appendChild(this.availabilityDivIcon);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 76);
this.availabilityDiv.appendChild(this.availabilityDivText);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 77);
this.availabilityDiv.appendChild(inputEx.cn('div', {'className':'clear'}));
      
   },
   
   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "initEvents", 84);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 85);
inputEx.StringAvailability.superclass.initEvents.call(this);
   },

   /**
    * @method onKeyPress
    */
   onKeyPress: function(e) {
      // Dont listen for TAB key
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onKeyPress", 91);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 93);
if ( e.keyCode === 9 ) { return; }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 95);
this.isRequesting = true;
      
      // Must do this to wait that value is updated (for the getValue())
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 98);
lang.later(0, this, function(){

      // If field is empty
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 3)", 98);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 101);
if(this.getValue() === ''){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 102);
this.stopTimer();
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 103);
this.setAvailabilityState(this.options.required ? "required" : "none");
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 104);
return;
      }

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 107);
this.resetTimer();
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 108);
this.setAvailabilityState("loading");
      
   });
   },
   
   /**
    * @method resetTimer
    */
   resetTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "resetTimer", 116);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 117);
this.stopTimer();
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 118);
this.startTimer();
   },
   
   /**
    * @method startTimer
    */
   startTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "startTimer", 124);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 125);
var that = this;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 126);
this.timerId = setTimeout(function(){
         _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 4)", 126);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 127);
that.getAvailability(that.getValue());
      },500);
   },
   
   /**
    * @method stopTimer
    */
   stopTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "stopTimer", 134);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 135);
if(this.timerId){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 136);
clearTimeout(this.timerId);
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 137);
delete this.timerId;
      }
   },
   
   /**
    * What to do when the string is available
    * @method onAvailable
    */
    onAvailable: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onAvailable", 145);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 146);
this.setAvailabilityState("available");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 147);
this.isAvailable = true;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 148);
this.isRequesting = false;
   },
   
   /**
    * What to do when the string is NOT available
    * @method onUnavailable
    */
    onUnavailable: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onUnavailable", 155);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 156);
this.setAvailabilityState("unavailable");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 157);
this.isAvailable = false;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 158);
this.isRequesting = false;
   },
   /**
    * Problem during the request
    * @method onFailure
    */
   onFailure : function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onFailure", 164);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 165);
this.setAvailabilityState("fail");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 166);
this.isAvailable = false;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 167);
this.isRequesting = false;
   },

   /**
    * @method setAvailabilityState
    */
   setAvailabilityState: function(state) {

      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setAvailabilityState", 173);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 175);
if(state === "none"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 176);
this.availabilityDivText.innerHTML = '';
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 177);
Y.one(this.availabilityDiv).set('className','availabilityDiv');
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 178);
this.availabilityDiv.style.display = 'none';
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 179);
return;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 181);
if(state === "loading"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 182);
this.availabilityDivText.innerHTML = this.options.messages.stringLoading;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 184);
if(state === "available"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 185);
this.availabilityDivText.innerHTML = this.options.messages.stringAvailable;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 187);
if(state === "unavailable"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 188);
this.availabilityDivText.innerHTML = this.options.messages.stringUnAvailable;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 190);
if(state === "required"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 191);
this.availabilityDivText.innerHTML = this.options.messages.required;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 193);
if(state === "fail"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 194);
this.availabilityDivText.innerHTML = this.options.messages.errorDataText;
      }}}}}}
      
      // DOM.setAttribute(this.availabilityDiv, 'class', 'availabilityDiv '+state);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 198);
Y.one(this.availabilityDiv).set('className','availabilityDiv'+' '+state);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 199);
this.availabilityDiv.style.display = 'block';
      
   },
   
   /**
    * @method setClassFromState
    */
   setClassFromState: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setClassFromState", 206);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 207);
inputEx.StringAvailability.superclass.setClassFromState.call(this);
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 209);
var state = this.getState();
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 211);
if(state === "required"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 212);
this.setAvailabilityState(state);
      }
   },
   
   /**
    * @method validate
    */
   validate: function() {

      // If AJAX request running
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "validate", 219);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 222);
if ( !!this.isRequesting ) { return false; }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 224);
var valid = inputEx.StringAvailability.superclass.validate.call(this);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 225);
if(!lang.isUndefined(this.isAvailable)){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 226);
valid = this.isAvailable && valid;
      }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 229);
return valid;
   },
   
   /**
    * Perform the Ajax request
    * @method getAvailability
    */
    getAvailability: function(string) {

_yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "getAvailability", 236);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 238);
var   that = this,
      requestConfiguration = {
         data : {
            "availabilityRequest" : string
         },
         on : {
             success: function(id, o) {   

            _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "success", 244);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 246);
var obj = Y.JSON.parse(o.responseText);
            
            _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 248);
if(obj === "true" || !!obj){
               _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 249);
that.onAvailable();
            }
            else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 251);
if(obj === "false" || !obj){
               _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 252);
that.onUnavailable();
            }}
         },
         failure: function(id, o) {
            // TODO ?
            _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "failure", 255);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 257);
that.onFailure(o);
         }
         }
      };

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 262);
Y.io(this.options.uri,requestConfiguration);

   }
});

// Register this class as "string-availability" type
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 268);
inputEx.registerType("string-availability", inputEx.StringAvailability);   


},'3.1.0',{requires : ["inputex-string","event-key","io","json-parse"]});

}, '@VERSION@');
