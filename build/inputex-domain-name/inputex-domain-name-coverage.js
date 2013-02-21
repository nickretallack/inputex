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
_yuitest_coverage["build/inputex-domain-name/inputex-domain-name.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-domain-name/inputex-domain-name.js",
    code: []
};
_yuitest_coverage["build/inputex-domain-name/inputex-domain-name.js"].code=["YUI.add('inputex-domain-name', function (Y, NAME) {","","","/**"," * @module inputex-url"," */","   var lang    = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Simple domain name field"," */","inputEx.DomainNameField = function(options) {","   inputEx.DomainNameField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DomainNameField, inputEx.StringField, {","","   setOptions: function(options) {","      inputEx.DomainNameField.superclass.setOptions.call(this, options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-domain-name\"));","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-DomainNameField\";","      this.options.regexp = /^[a-z0-9]+(\\-?[a-z0-9]+)*\\.[a-z]{2,5}$/i;","      this.options.description = this.messages.domainNameFieldDescription;","","      // TODO, add options :","      //  * unicode support","      //  * subdomain support","   }","","});","","// Register this class as \"url\" type","inputEx.registerType(\"domain-name\", inputEx.DomainNameField, []);","","","}, '@VERSION@', {\"requires\": [\"intl\", \"inputex-string\"], \"lang\": [\"en\", \"fr\"], \"ix_provides\": \"domain-name\"});"];
_yuitest_coverage["build/inputex-domain-name/inputex-domain-name.js"].lines = {"1":0,"7":0,"13":0,"14":0,"17":0,"20":0,"23":0,"24":0,"25":0,"26":0,"36":0};
_yuitest_coverage["build/inputex-domain-name/inputex-domain-name.js"].functions = {"DomainNameField:13":0,"setOptions:19":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-domain-name/inputex-domain-name.js"].coveredLines = 11;
_yuitest_coverage["build/inputex-domain-name/inputex-domain-name.js"].coveredFunctions = 3;
_yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 1);
YUI.add('inputex-domain-name', function (Y, NAME) {


/**
 * @module inputex-url
 */
   _yuitest_coverfunc("build/inputex-domain-name/inputex-domain-name.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 7);
var lang    = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Simple domain name field
 */
_yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 13);
inputEx.DomainNameField = function(options) {
   _yuitest_coverfunc("build/inputex-domain-name/inputex-domain-name.js", "DomainNameField", 13);
_yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 14);
inputEx.DomainNameField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 17);
Y.extend(inputEx.DomainNameField, inputEx.StringField, {

   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-domain-name/inputex-domain-name.js", "setOptions", 19);
_yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 20);
inputEx.DomainNameField.superclass.setOptions.call(this, options);

      //I18N
      _yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 23);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-domain-name"));
      _yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 24);
this.options.className = options.className ? options.className : "inputEx-Field inputEx-DomainNameField";
      _yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 25);
this.options.regexp = /^[a-z0-9]+(\-?[a-z0-9]+)*\.[a-z]{2,5}$/i;
      _yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 26);
this.options.description = this.messages.domainNameFieldDescription;

      // TODO, add options :
      //  * unicode support
      //  * subdomain support
   }

});

// Register this class as "url" type
_yuitest_coverline("build/inputex-domain-name/inputex-domain-name.js", 36);
inputEx.registerType("domain-name", inputEx.DomainNameField, []);


}, '@VERSION@', {"requires": ["intl", "inputex-string"], "lang": ["en", "fr"], "ix_provides": "domain-name"});
