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
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-ratingstarsform/inputex-ratingstarsform.js",
    code: []
};
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].code=["YUI.add('inputex-ratingstarsform', function (Y, NAME) {","","/**"," * @module inputex-ratingstarsform"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a custom Form that use RatingStars and send it automatically"," * @class inputEx.RatingStarsForm"," * @extends inputEx.Form"," * @constructor"," * @param {Object} options The following options are added for RatingStarsForm :"," * <ul>"," *  <li><b>ratingStarsOptions</b>: see inputEx.RatingStars</li>"," * </ul>"," * <p>The classical Form options may have no sens here</p>"," */","inputEx.RatingStarsForm = function(options) {","   inputEx.RatingStarsForm.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.RatingStarsForm, inputEx.Form,{","   initEvents: function(){","     inputEx.RatingStarsForm.superclass.initEvents.call(this);","","     this.publish(\"asyncForm\");","     this.publish(\"endAsyncForm\");","     ","     this.rateInstance.on('rate', this.onRate, this, true);","     this.on('asyncForm', this.rateInstance.onAsync,this.rateInstance,true);","     this.on('endAsyncForm',this.rateInstance.onEndAsync,this.rateInstance,true);","   },","    /**","   * Set Options change default className and set fields options","   * @method setOptions","   */","  setOptions: function(options){","    inputEx.RatingStarsForm.superclass.setOptions.call(this,options);","        ","    // Overwrite options","    this.options.ratingStarsOptions = options.ratingStarsOptions;","    this.options.fields = options.fields || [];","    this.options.className = options.className ? options.className : 'inputEx-Form inputEx-RatingStarsForm';","    this.options.ajax.callback.success = function(o){","      this.endAsyncEvt.fire();","    };","    this.options.ajax.callback.scope = this;","    this.setFields();","","  },","  /**","   * Set fields option of the form","   * @method setFields","   */","  setFields: function(){","    //we should generalise that for a multi-vote form","    var ratingField = this.options.ratingStarsOptions ;","    ratingField.type = \"ratingstars\";","    this.options.fields.push(ratingField);","  },","  onRate: function(){","    this.asyncRequest();","    this.asyncEvt.fire();","  },","  /**","  * subscribe rateEvt on each Field","  * @method renderStatusEl","  */","  renderField: function(fieldOptions) {","    if(fieldOptions.type != \"ratingstars\"){","      return inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);","    }","    ","    this.rateInstance = inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);","    return this.rateInstance","  }","","});","","","}, '@VERSION@', {\"requires\": [\"inputex-ratingstars\", \"inputex-form\"], \"ix_provides\": \"ratingstarsform\"});"];
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].lines = {"1":0,"6":0,"20":0,"21":0,"24":0,"26":0,"28":0,"29":0,"31":0,"32":0,"33":0,"40":0,"43":0,"44":0,"45":0,"46":0,"47":0,"49":0,"50":0,"59":0,"60":0,"61":0,"64":0,"65":0,"72":0,"73":0,"76":0,"77":0};
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].functions = {"RatingStarsForm:20":0,"initEvents:25":0,"success:46":0,"setOptions:39":0,"setFields:57":0,"onRate:63":0,"renderField:71":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].coveredLines = 28;
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 1);
YUI.add('inputex-ratingstarsform', function (Y, NAME) {

/**
 * @module inputex-ratingstarsform
 */
   _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Create a custom Form that use RatingStars and send it automatically
 * @class inputEx.RatingStarsForm
 * @extends inputEx.Form
 * @constructor
 * @param {Object} options The following options are added for RatingStarsForm :
 * <ul>
 *  <li><b>ratingStarsOptions</b>: see inputEx.RatingStars</li>
 * </ul>
 * <p>The classical Form options may have no sens here</p>
 */
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 20);
inputEx.RatingStarsForm = function(options) {
   _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "RatingStarsForm", 20);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 21);
inputEx.RatingStarsForm.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 24);
Y.extend(inputEx.RatingStarsForm, inputEx.Form,{
   initEvents: function(){
     _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "initEvents", 25);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 26);
inputEx.RatingStarsForm.superclass.initEvents.call(this);

     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 28);
this.publish("asyncForm");
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 29);
this.publish("endAsyncForm");
     
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 31);
this.rateInstance.on('rate', this.onRate, this, true);
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 32);
this.on('asyncForm', this.rateInstance.onAsync,this.rateInstance,true);
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 33);
this.on('endAsyncForm',this.rateInstance.onEndAsync,this.rateInstance,true);
   },
    /**
   * Set Options change default className and set fields options
   * @method setOptions
   */
  setOptions: function(options){
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "setOptions", 39);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 40);
inputEx.RatingStarsForm.superclass.setOptions.call(this,options);
        
    // Overwrite options
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 43);
this.options.ratingStarsOptions = options.ratingStarsOptions;
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 44);
this.options.fields = options.fields || [];
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 45);
this.options.className = options.className ? options.className : 'inputEx-Form inputEx-RatingStarsForm';
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 46);
this.options.ajax.callback.success = function(o){
      _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "success", 46);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 47);
this.endAsyncEvt.fire();
    };
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 49);
this.options.ajax.callback.scope = this;
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 50);
this.setFields();

  },
  /**
   * Set fields option of the form
   * @method setFields
   */
  setFields: function(){
    //we should generalise that for a multi-vote form
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "setFields", 57);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 59);
var ratingField = this.options.ratingStarsOptions ;
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 60);
ratingField.type = "ratingstars";
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 61);
this.options.fields.push(ratingField);
  },
  onRate: function(){
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "onRate", 63);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 64);
this.asyncRequest();
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 65);
this.asyncEvt.fire();
  },
  /**
  * subscribe rateEvt on each Field
  * @method renderStatusEl
  */
  renderField: function(fieldOptions) {
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "renderField", 71);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 72);
if(fieldOptions.type != "ratingstars"){
      _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 73);
return inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);
    }
    
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 76);
this.rateInstance = inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 77);
return this.rateInstance
  }

});


}, '@VERSION@', {"requires": ["inputex-ratingstars", "inputex-form"], "ix_provides": "ratingstarsform"});
