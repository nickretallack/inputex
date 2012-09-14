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
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-textautotag/inputex-textautotag.js",
    code: []
};
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].code=["YUI.add('inputex-textautotag', function (Y, NAME) {","","/**"," * @module inputex-textautotag"," */"," (function() {","  ","/**"," * Create a textarea input"," * @class inputEx.TextAutoTag"," * @extends inputEx.Textarea"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *	   <li>rows: rows attribute</li>"," *	   <li>cols: cols attribute</li>"," * </ul>"," */"," inputEx.TextAutoTag = function(options) {","  inputEx.TextAutoTag.superclass.constructor.call(this,options);","  this.on('updated', this.handleUpdate,this,true);","};","  Y.extend(inputEx.TextAutoTag, inputEx.Textarea, {","                    ","      /**","      * Set the specific options (autotagservice)","      * @method setOptions","      * @param {Object} options Options object as passed to the constructor","      */","      setOptions: function(options) {","                    inputEx.TextAutoTag.superclass.setOptions.call(this, options);","                    ","                    // options textKey, define the key of the text, in the api request (see getTags)","                    this.textKey = options.textKey || \"context\";","                    ","                    // we cache values to avoid to much request (see doWeRequest)","                    this.tmpWordsCount = 0;","                    this.service = new inputEx.RPC.Service(options.smd || \"yuiExtractor.smd\",{ success: this.initAutoTag, scope:this });","                    this.autoTagMethodName = options.autoTagMethodName || \"requestTags\";","                    this.tagEl = typeof(options.tagEl) == \"string\" ? document.getElementById(options.tagEl): options.tagEl;","      },","      /**","      * @method initAutoTag","      */","      initAutoTag: function(){","        this.serviceReady = true;","      },","      /**","      * @method addTags","      */","      addTags: function(results){","        this.tagEl.appendChild(inputEx.cn(\"span\",null,null,results.ResultSet.Result.join(\",\")));","      },","      /**","      * Set the specific options (autotagservice)","      * @method getTags","      * @param {Object} options Options object as passed to the constructor","      */      ","      getTags: function(text,callback){","        if(this.serviceReady){","              this.service[this.autoTagMethodName]({context: this.getValue()},callback);","        }","","      ","      },","     /**","      * handleUpadte","      * @method handleUpdate","      */                    ","      handleUpdate: function() {","         // TODO : cache function to not call api every time","        var value = this.getValue();","        if (this.doWeRequest(value)){","          var callback = {","            success: function(results) {","                this.addTags(results);","              },","            failure: function(o) {","                    // log or try to understand error","              },","              scope: this","              };          ","          this.getTags(value,callback);","        }","        ","      },","      /**","      * @method handleResponse","      */     ","      handleResponse: function(a,b,c,d){","        console.log(this,\"callback\",a,b,c,d);","      },","      /**","      * Decide wether or not we request","      * @method doWeRequest","      * @param {string} updated text ","      * @return {boolean}","      */       ","      doWeRequest : function(value){","        // count words in value","        var wordsCount = value.split(' ').length;","        if (true){ // five should be changed or passed as parameter","          this.tmpWordsCount = wordsCount;","          return true;","        }","        return false;","      }","});","  ","  // Register this class as \"text\" type","  inputEx.registerType(\"autotag\", inputEx.Textarea);","  ","  })();","","}, '@VERSION@', {\"requires\": [\"inputex-textautotag\"], \"ix_provides\": \"autotag\"});"];
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].lines = {"1":0,"6":0,"19":0,"20":0,"21":0,"23":0,"31":0,"34":0,"37":0,"38":0,"39":0,"40":0,"46":0,"52":0,"60":0,"61":0,"72":0,"73":0,"74":0,"76":0,"83":0,"91":0,"101":0,"102":0,"103":0,"104":0,"106":0,"111":0};
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].functions = {"TextAutoTag:19":0,"setOptions:30":0,"initAutoTag:45":0,"addTags:51":0,"getTags:59":0,"success:75":0,"handleUpdate:70":0,"handleResponse:90":0,"doWeRequest:99":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].coveredLines = 28;
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].coveredFunctions = 11;
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 1);
YUI.add('inputex-textautotag', function (Y, NAME) {

/**
 * @module inputex-textautotag
 */
 _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 6);
(function() {
  
/**
 * Create a textarea input
 * @class inputEx.TextAutoTag
 * @extends inputEx.Textarea
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *	   <li>rows: rows attribute</li>
 *	   <li>cols: cols attribute</li>
 * </ul>
 */
 _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 19);
inputEx.TextAutoTag = function(options) {
  _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "TextAutoTag", 19);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 20);
inputEx.TextAutoTag.superclass.constructor.call(this,options);
  _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 21);
this.on('updated', this.handleUpdate,this,true);
};
  _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 23);
Y.extend(inputEx.TextAutoTag, inputEx.Textarea, {
                    
      /**
      * Set the specific options (autotagservice)
      * @method setOptions
      * @param {Object} options Options object as passed to the constructor
      */
      setOptions: function(options) {
                    _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "setOptions", 30);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 31);
inputEx.TextAutoTag.superclass.setOptions.call(this, options);
                    
                    // options textKey, define the key of the text, in the api request (see getTags)
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 34);
this.textKey = options.textKey || "context";
                    
                    // we cache values to avoid to much request (see doWeRequest)
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 37);
this.tmpWordsCount = 0;
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 38);
this.service = new inputEx.RPC.Service(options.smd || "yuiExtractor.smd",{ success: this.initAutoTag, scope:this });
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 39);
this.autoTagMethodName = options.autoTagMethodName || "requestTags";
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 40);
this.tagEl = typeof(options.tagEl) == "string" ? document.getElementById(options.tagEl): options.tagEl;
      },
      /**
      * @method initAutoTag
      */
      initAutoTag: function(){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "initAutoTag", 45);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 46);
this.serviceReady = true;
      },
      /**
      * @method addTags
      */
      addTags: function(results){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "addTags", 51);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 52);
this.tagEl.appendChild(inputEx.cn("span",null,null,results.ResultSet.Result.join(",")));
      },
      /**
      * Set the specific options (autotagservice)
      * @method getTags
      * @param {Object} options Options object as passed to the constructor
      */      
      getTags: function(text,callback){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "getTags", 59);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 60);
if(this.serviceReady){
              _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 61);
this.service[this.autoTagMethodName]({context: this.getValue()},callback);
        }

      
      },
     /**
      * handleUpadte
      * @method handleUpdate
      */                    
      handleUpdate: function() {
         // TODO : cache function to not call api every time
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "handleUpdate", 70);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 72);
var value = this.getValue();
        _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 73);
if (this.doWeRequest(value)){
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 74);
var callback = {
            success: function(results) {
                _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "success", 75);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 76);
this.addTags(results);
              },
            failure: function(o) {
                    // log or try to understand error
              },
              scope: this
              };          
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 83);
this.getTags(value,callback);
        }
        
      },
      /**
      * @method handleResponse
      */     
      handleResponse: function(a,b,c,d){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "handleResponse", 90);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 91);
console.log(this,"callback",a,b,c,d);
      },
      /**
      * Decide wether or not we request
      * @method doWeRequest
      * @param {string} updated text 
      * @return {boolean}
      */       
      doWeRequest : function(value){
        // count words in value
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "doWeRequest", 99);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 101);
var wordsCount = value.split(' ').length;
        _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 102);
if (true){ // five should be changed or passed as parameter
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 103);
this.tmpWordsCount = wordsCount;
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 104);
return true;
        }
        _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 106);
return false;
      }
});
  
  // Register this class as "text" type
  _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 111);
inputEx.registerType("autotag", inputEx.Textarea);
  
  })();

}, '@VERSION@', {"requires": ["inputex-textautotag"], "ix_provides": "autotag"});
