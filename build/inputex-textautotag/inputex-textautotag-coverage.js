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
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].code=["YUI.add('inputex-textautotag', function (Y, NAME) {","","/**"," * @module inputex-textautotag"," */"," var inputEx = Y.inputEx;","/**"," * Create a textarea input"," * @class inputEx.TextAutoTag"," * @extends inputEx.Textarea"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *	   <li>rows: rows attribute</li>"," *	   <li>cols: cols attribute</li>"," * </ul>"," */"," inputEx.TextAutoTag = function(options) {","  inputEx.TextAutoTag.superclass.constructor.call(this,options);","  this.on('updated', this.handleUpdate,this,true);","};","  Y.extend(inputEx.TextAutoTag, inputEx.Textarea, {","                    ","      /**","      * Set the specific options (autotagservice)","      * @method setOptions","      * @param {Object} options Options object as passed to the constructor","      */","      setOptions: function(options) {","                    inputEx.TextAutoTag.superclass.setOptions.call(this, options);","                    ","                    // options textKey, define the key of the text, in the api request (see getTags)","                    this.textKey = options.textKey || \"context\";","                    ","                    // we cache values to avoid to much request (see doWeRequest)","                    this.tmpWordsCount = 0;","                    this.service = new inputEx.RPC.Service(options.smd || \"yuiExtractor.smd\",{ success: this.initAutoTag, scope:this });","                    this.autoTagMethodName = options.autoTagMethodName || \"requestTags\";","                    this.tagEl = typeof(options.tagEl) == \"string\" ? document.getElementById(options.tagEl): options.tagEl;","      },","      /**","      * @method initAutoTag","      */","      initAutoTag: function(){","        this.serviceReady = true;","      },","      /**","      * @method addTags","      */","      addTags: function(results){","        this.tagEl.appendChild(inputEx.cn(\"span\",null,null,results.ResultSet.Result.join(\",\")));","      },","      /**","      * Set the specific options (autotagservice)","      * @method getTags","      * @param {Object} options Options object as passed to the constructor","      */      ","      getTags: function(text,callback){","        if(this.serviceReady){","              this.service[this.autoTagMethodName]({context: this.getValue()},callback);","        }","","      ","      },","     /**","      * handleUpadte","      * @method handleUpdate","      */                    ","      handleUpdate: function() {","         // TODO : cache function to not call api every time","        var value = this.getValue();","        if (this.doWeRequest(value)){","          var callback = {","            success: function(results) {","                this.addTags(results);","              },","            failure: function(o) {","                    // log or try to understand error","              },","              scope: this","              };          ","          this.getTags(value,callback);","        }","        ","      },","      /**","      * @method handleResponse","      */     ","      handleResponse: function(a,b,c,d){","        console.log(this,\"callback\",a,b,c,d);","      },","      /**","      * Decide wether or not we request","      * @method doWeRequest","      * @param {string} updated text ","      * @return {boolean}","      */       ","      doWeRequest : function(value){","        // count words in value","        var wordsCount = value.split(' ').length;","        if (true){ // five should be changed or passed as parameter","          this.tmpWordsCount = wordsCount;","          return true;","        }","        return false;","      }","});"," ","// Register this class as \"text\" type","inputEx.registerType(\"autotag\", inputEx.Textarea);","  ","","}, '@VERSION@', {\"requires\": [\"inputex-textarea\"], \"ix_provides\": \"autotag\"});"];
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].lines = {"1":0,"6":0,"18":0,"19":0,"20":0,"22":0,"30":0,"33":0,"36":0,"37":0,"38":0,"39":0,"45":0,"51":0,"59":0,"60":0,"71":0,"72":0,"73":0,"75":0,"82":0,"90":0,"100":0,"101":0,"102":0,"103":0,"105":0,"110":0};
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].functions = {"TextAutoTag:18":0,"setOptions:29":0,"initAutoTag:44":0,"addTags:50":0,"getTags:58":0,"success:74":0,"handleUpdate:69":0,"handleResponse:89":0,"doWeRequest:98":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].coveredLines = 28;
_yuitest_coverage["build/inputex-textautotag/inputex-textautotag.js"].coveredFunctions = 10;
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 1);
YUI.add('inputex-textautotag', function (Y, NAME) {

/**
 * @module inputex-textautotag
 */
 _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 6);
var inputEx = Y.inputEx;
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
 _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 18);
inputEx.TextAutoTag = function(options) {
  _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "TextAutoTag", 18);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 19);
inputEx.TextAutoTag.superclass.constructor.call(this,options);
  _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 20);
this.on('updated', this.handleUpdate,this,true);
};
  _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 22);
Y.extend(inputEx.TextAutoTag, inputEx.Textarea, {
                    
      /**
      * Set the specific options (autotagservice)
      * @method setOptions
      * @param {Object} options Options object as passed to the constructor
      */
      setOptions: function(options) {
                    _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "setOptions", 29);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 30);
inputEx.TextAutoTag.superclass.setOptions.call(this, options);
                    
                    // options textKey, define the key of the text, in the api request (see getTags)
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 33);
this.textKey = options.textKey || "context";
                    
                    // we cache values to avoid to much request (see doWeRequest)
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 36);
this.tmpWordsCount = 0;
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 37);
this.service = new inputEx.RPC.Service(options.smd || "yuiExtractor.smd",{ success: this.initAutoTag, scope:this });
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 38);
this.autoTagMethodName = options.autoTagMethodName || "requestTags";
                    _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 39);
this.tagEl = typeof(options.tagEl) == "string" ? document.getElementById(options.tagEl): options.tagEl;
      },
      /**
      * @method initAutoTag
      */
      initAutoTag: function(){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "initAutoTag", 44);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 45);
this.serviceReady = true;
      },
      /**
      * @method addTags
      */
      addTags: function(results){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "addTags", 50);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 51);
this.tagEl.appendChild(inputEx.cn("span",null,null,results.ResultSet.Result.join(",")));
      },
      /**
      * Set the specific options (autotagservice)
      * @method getTags
      * @param {Object} options Options object as passed to the constructor
      */      
      getTags: function(text,callback){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "getTags", 58);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 59);
if(this.serviceReady){
              _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 60);
this.service[this.autoTagMethodName]({context: this.getValue()},callback);
        }

      
      },
     /**
      * handleUpadte
      * @method handleUpdate
      */                    
      handleUpdate: function() {
         // TODO : cache function to not call api every time
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "handleUpdate", 69);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 71);
var value = this.getValue();
        _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 72);
if (this.doWeRequest(value)){
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 73);
var callback = {
            success: function(results) {
                _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "success", 74);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 75);
this.addTags(results);
              },
            failure: function(o) {
                    // log or try to understand error
              },
              scope: this
              };          
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 82);
this.getTags(value,callback);
        }
        
      },
      /**
      * @method handleResponse
      */     
      handleResponse: function(a,b,c,d){
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "handleResponse", 89);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 90);
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
        _yuitest_coverfunc("build/inputex-textautotag/inputex-textautotag.js", "doWeRequest", 98);
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 100);
var wordsCount = value.split(' ').length;
        _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 101);
if (true){ // five should be changed or passed as parameter
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 102);
this.tmpWordsCount = wordsCount;
          _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 103);
return true;
        }
        _yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 105);
return false;
      }
});
 
// Register this class as "text" type
_yuitest_coverline("build/inputex-textautotag/inputex-textautotag.js", 110);
inputEx.registerType("autotag", inputEx.Textarea);
  

}, '@VERSION@', {"requires": ["inputex-textarea"], "ix_provides": "autotag"});
