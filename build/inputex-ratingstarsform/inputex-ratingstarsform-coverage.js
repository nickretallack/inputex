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
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].code=["YUI.add('inputex-ratingstarsform', function (Y, NAME) {","","/**"," * @module inputex-ratingstarsform"," */","YUI.add(\"inputex-ratingstarsform\",function(Y){","","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a custom Form that use RatingStars and send it automatically"," * @class inputEx.RatingStarsForm"," * @extends inputEx.Form"," * @constructor"," * @param {Object} options The following options are added for RatingStarsForm :"," * <ul>"," *  <li><b>ratingStarsOptions</b>: see inputEx.RatingStars</li>"," * </ul>"," * <p>The classical Form options may have no sens here</p>"," */","inputEx.RatingStarsForm = function(options) {","   inputEx.RatingStarsForm.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.RatingStarsForm, inputEx.Form,{","   initEvents: function(){","     inputEx.RatingStarsForm.superclass.initEvents.call(this);","","     this.publish(\"asyncForm\");","     this.publish(\"endAsyncForm\");","     ","     this.rateInstance.on('rate', this.onRate, this, true);","     this.on('asyncForm', this.rateInstance.onAsync,this.rateInstance,true);","     this.on('endAsyncForm',this.rateInstance.onEndAsync,this.rateInstance,true);","   },","    /**","   * Set Options change default className and set fields options","   * @method setOptions","   */","  setOptions: function(options){","    inputEx.RatingStarsForm.superclass.setOptions.call(this,options);","        ","    // Overwrite options","    this.options.ratingStarsOptions = options.ratingStarsOptions;","    this.options.fields = options.fields || [];","    this.options.className = options.className ? options.className : 'inputEx-Form inputEx-RatingStarsForm';","    this.options.ajax.callback.success = function(o){","      this.endAsyncEvt.fire();","    };","    this.options.ajax.callback.scope = this;","    this.setFields();","","  },","  /**","   * Set fields option of the form","   * @method setFields","   */","  setFields: function(){","    //we should generalise that for a multi-vote form","    var ratingField = this.options.ratingStarsOptions ;","    ratingField.type = \"ratingstars\";","    this.options.fields.push(ratingField);","  },","  onRate: function(){","    this.asyncRequest();","    this.asyncEvt.fire();","  },","  /**","  * subscribe rateEvt on each Field","  * @method renderStatusEl","  */","  renderField: function(fieldOptions) {","    if(fieldOptions.type != \"ratingstars\"){","      return inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);","    }","    ","    this.rateInstance = inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);","    return this.rateInstance","  }","","});","","},'3.1.0',{","  requires: ['inputex-ratingstars','inputex-form']","});","","","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].lines = {"1":0,"6":0,"8":0,"22":0,"23":0,"26":0,"28":0,"30":0,"31":0,"33":0,"34":0,"35":0,"42":0,"45":0,"46":0,"47":0,"48":0,"49":0,"51":0,"52":0,"61":0,"62":0,"63":0,"66":0,"67":0,"74":0,"75":0,"78":0,"79":0};
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].functions = {"RatingStarsForm:22":0,"initEvents:27":0,"success:48":0,"setOptions:41":0,"setFields:59":0,"onRate:65":0,"renderField:73":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].coveredLines = 29;
_yuitest_coverage["build/inputex-ratingstarsform/inputex-ratingstarsform.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 1);
YUI.add('inputex-ratingstarsform', function (Y, NAME) {

/**
 * @module inputex-ratingstarsform
 */
_yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 6);
YUI.add("inputex-ratingstarsform",function(Y){

   _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 8);
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
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 22);
inputEx.RatingStarsForm = function(options) {
   _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "RatingStarsForm", 22);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 23);
inputEx.RatingStarsForm.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 26);
Y.extend(inputEx.RatingStarsForm, inputEx.Form,{
   initEvents: function(){
     _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "initEvents", 27);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 28);
inputEx.RatingStarsForm.superclass.initEvents.call(this);

     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 30);
this.publish("asyncForm");
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 31);
this.publish("endAsyncForm");
     
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 33);
this.rateInstance.on('rate', this.onRate, this, true);
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 34);
this.on('asyncForm', this.rateInstance.onAsync,this.rateInstance,true);
     _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 35);
this.on('endAsyncForm',this.rateInstance.onEndAsync,this.rateInstance,true);
   },
    /**
   * Set Options change default className and set fields options
   * @method setOptions
   */
  setOptions: function(options){
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "setOptions", 41);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 42);
inputEx.RatingStarsForm.superclass.setOptions.call(this,options);
        
    // Overwrite options
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 45);
this.options.ratingStarsOptions = options.ratingStarsOptions;
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 46);
this.options.fields = options.fields || [];
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 47);
this.options.className = options.className ? options.className : 'inputEx-Form inputEx-RatingStarsForm';
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 48);
this.options.ajax.callback.success = function(o){
      _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "success", 48);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 49);
this.endAsyncEvt.fire();
    };
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 51);
this.options.ajax.callback.scope = this;
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 52);
this.setFields();

  },
  /**
   * Set fields option of the form
   * @method setFields
   */
  setFields: function(){
    //we should generalise that for a multi-vote form
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "setFields", 59);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 61);
var ratingField = this.options.ratingStarsOptions ;
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 62);
ratingField.type = "ratingstars";
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 63);
this.options.fields.push(ratingField);
  },
  onRate: function(){
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "onRate", 65);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 66);
this.asyncRequest();
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 67);
this.asyncEvt.fire();
  },
  /**
  * subscribe rateEvt on each Field
  * @method renderStatusEl
  */
  renderField: function(fieldOptions) {
    _yuitest_coverfunc("build/inputex-ratingstarsform/inputex-ratingstarsform.js", "renderField", 73);
_yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 74);
if(fieldOptions.type != "ratingstars"){
      _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 75);
return inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);
    }
    
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 78);
this.rateInstance = inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);
    _yuitest_coverline("build/inputex-ratingstarsform/inputex-ratingstarsform.js", 79);
return this.rateInstance
  }

});

},'3.1.0',{
  requires: ['inputex-ratingstars','inputex-form']
});




}, '@VERSION@');
