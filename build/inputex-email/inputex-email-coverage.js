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
_yuitest_coverage["build/inputex-email/inputex-email.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-email/inputex-email.js",
    code: []
};
_yuitest_coverage["build/inputex-email/inputex-email.js"].code=["YUI.add('inputex-email', function (Y, NAME) {","","/**"," * @module inputex-email"," */","  var inputEx = Y.inputEx;","/**"," * Field that adds the email regexp for validation. Result is always lower case."," * @class inputEx.EmailField"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options inputEx.Field options object"," */","inputEx.EmailField = function(options) {","   inputEx.EmailField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.EmailField, inputEx.StringField, {","   ","   /**","    * Set the email regexp and invalid message","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.EmailField.superclass.setOptions.call(this, options);","","      // Overwrite options","      this.options.messages.invalid = inputEx.messages.invalidEmail;","      this.options.regexp = inputEx.regexps.email;","      ","      // Validate the domain name ( false by default )","      this.options.fixdomain = (Y.Lang.isUndefined(options.fixdomain) ? false : !!options.fixdomain);","      ","      // Validate email is not disposable","      this.options.disallowDisposable = (Y.Lang.isUndefined(options.disallowDisposable) ? false : !!options.disallowDisposable);","      ","   },","   ","   /**","    * @method validateDomain","    */","	validateDomain : function() {","		","		var i, j, val, domain, domainList, domainListLength, groupDomain, groupDomainLength;","		","		val = this.getValue();","		domain = val.split('@')[1];","		","		// List of bad emails (only the first one in each array is the valid one)","		domainList = [","		","			// gmail.com","			[\"gmail.com\",\"gmail.com.br\",\"_gmail.com\",\"g-mail.com\",\"g.mail.com\",\"g_mail.com\",\"gamail.com\",\"gamil.com\",\"gemail.com\",\"ggmail.com\",\"gimail.com\",\"gmai.com\",\"gmail.cim\",\"gmail.co\",\"gmaill.com\",\"gmain.com\",\"gmaio.com\",\"gmal.com\",\"gmali.com\",\"gmeil.com\",\"gmial.com\",\"gmil.com\",\"gtmail.com\",\"igmail.com\",\"gmail.fr\"],","		","			// hotmail.co.uk","			[\"hotmail.co.uk\",\"hotmail.com.uk\"],","		","			// hotmail.com","			[\"hotmail.com\",\"hotmail.com.br\",\"hotmail.br\",\"0hotmail.com\",\"8hotmail.com\",\"_hotmail.com\",\"ahotmail.com\",\"ghotmail.com\",\"gotmail.com\",\"hatmail.com\",\"hhotmail.com\",\"ho0tmail.com\",\"hogmail.com\",\"hoimail.com\",\"hoitmail.com\",\"homail.com\",\"homtail.com\",\"hootmail.com\",\"hopmail.com\",\"hoptmail.com\",\"hormail.com\",\"hot.mail.com\",\"hot_mail.com\",\"hotail.com\",\"hotamail.com\",\"hotamil.com\",\"hotemail.com\",\"hotimail.com\",\"hotlmail.com\",\"hotmaail.com\",\"hotmael.com\",\"hotmai.com\",\"hotmaial.com\",\"hotmaiil.com\",\"hotmail.acom\",\"hotmail.bom\",\"hotmail.ccom\",\"hotmail.cm\",\"hotmail.co\",\"hotmail.coml\",\"hotmail.comm\",\"hotmail.con\",\"hotmail.coom\",\"hotmail.copm\",\"hotmail.cpm\",\"hotmail.lcom\",\"hotmail.ocm\",\"hotmail.om\",\"hotmail.xom\",\"hotmail2.com\",\"hotmail_.com\",\"hotmailc.com\",\"hotmaill.com\",\"hotmailo.com\",\"hotmaio.com\",\"hotmaiol.com\",\"hotmais.com\",\"hotmal.com\",\"hotmall.com\",\"hotmamil.com\",\"hotmaol.com\",\"hotmayl.com\",\"hotmeil.com\",\"hotmial.com\",\"hotmil.com\",\"hotmmail.com\",\"hotmnail.com\",\"hotmsil.com\",\"hotnail.com\",\"hotomail.com\",\"hottmail.com\",\"hotymail.com\",\"hoymail.com\",\"hptmail.com\",\"htmail.com\",\"htomail.com\",\"ohotmail.com\",\"otmail.com\",\"rotmail.com\",\"shotmail.com\",\"hotmain.com\"],","		","			// hotmail.fr","			[\"hotmail.fr\",\"hotmail.ffr\",\"hotmail.frr\",\"hotmail.fr.br\",\"hotmail.br\",\"0hotmail.fr\",\"8hotmail.fr\",\"_hotmail.fr\",\"ahotmail.fr\",\"ghotmail.fr\",\"gotmail.fr\",\"hatmail.fr\",\"hhotmail.fr\",\"ho0tmail.fr\",\"hogmail.fr\",\"hoimail.fr\",\"hoitmail.fr\",\"homail.fr\",\"homtail.fr\",\"hootmail.fr\",\"hopmail.fr\",\"hoptmail.fr\",\"hormail.fr\",\"hot.mail.fr\",\"hot_mail.fr\",\"hotail.fr\",\"hotamail.fr\",\"hotamil.fr\",\"hotemail.fr\",\"hotimail.fr\",\"hotlmail.fr\",\"hotmaail.fr\",\"hotmael.fr\",\"hotmai.fr\",\"hotmaial.fr\",\"hotmaiil.fr\",\"hotmail.frl\",\"hotmail.frm\",\"hotmail2.fr\",\"hotmail_.fr\",\"hotmailc.fr\",\"hotmaill.fr\",\"hotmailo.fr\",\"hotmaio.fr\",\"hotmaiol.fr\",\"hotmais.fr\",\"hotmal.fr\",\"hotmall.fr\",\"hotmamil.fr\",\"hotmaol.fr\",\"hotmayl.fr\",\"hotmeil.fr\",\"hotmial.fr\",\"hotmil.fr\",\"hotmmail.fr\",\"hotmnail.fr\",\"hotmsil.fr\",\"hotnail.fr\",\"hotomail.fr\",\"hottmail.fr\",\"hotymail.fr\",\"hoymail.fr\",\"hptmail.fr\",\"htmail.fr\",\"htomail.fr\",\"ohotmail.fr\",\"otmail.fr\",\"rotmail.fr\",\"shotmail.fr\",\"hotmain.fr\"],","		","			// yahoo.co.in","			[\"yahoo.co.in\",\"yaho.co.in\",\"yahoo.co.cn\",\"yahoo.co.n\",\"yahoo.co.on\",\"yahoo.coin\",\"yahoo.com.in\",\"yahoo.cos.in\",\"yahoo.oc.in\",\"yaoo.co.in\",\"yhoo.co.in\"],","		","			// yahoo.com.br","			[\"yahoo.com.br\",\"1yahoo.com.br\",\"5yahoo.com.br\",\"_yahoo.com.br\",\"ayhoo.com.br\",\"tahoo.com.br\",\"uahoo.com.br\",\"yagoo.com.br\",\"yahho.com.br\",\"yaho.com.br\",\"yahoo.cm.br\",\"yahoo.co.br\",\"yahoo.com.ar\",\"yahoo.com.b\",\"yahoo.com.be\",\"yahoo.com.ber\",\"yahoo.com.bl\",\"yahoo.com.brr\",\"yahoo.com.brv\",\"yahoo.com.bt\",\"yahoo.com.nr\",\"yahoo.coml.br\",\"yahoo.con.br\",\"yahoo.om.br\",\"yahool.com.br\",\"yahooo.com.br\",\"yahoou.com.br\",\"yaoo.com.br\",\"yaroo.com.br\",\"yhaoo.com.br\",\"yhoo.com.br\",\"yuhoo.com.br\"],","		","			// yahoo.com","			[\"yahoo.com\",\"yahoomail.com\",\"_yahoo.com\",\"ahoo.com\",\"ayhoo.com\",\"eyahoo.com\",\"hahoo.com\",\"sahoo.com\",\"yahho.com\",\"yaho.com\",\"yahol.com\",\"yahoo.co\",\"yahoo.con\",\"yahoo.vom\",\"yahoo0.com\",\"yahoo1.com\",\"yahool.com\",\"yahooo.com\",\"yahoou.com\",\"yahoow.com\",\"yahopo.com\",\"yaloo.com\",\"yaoo.com\",\"yaroo.com\",\"yayoo.com\",\"yhaoo.com\",\"yhoo.com\",\"yohoo.com\"],","		","			// yahoo.fr","			[\"yahoo.fr\",\"yahoomail.fr\",\"_yahoo.fr\",\"ahoo.fr\",\"ayhoo.fr\",\"eyahoo.fr\",\"hahoo.fr\",\"sahoo.fr\",\"yahho.fr\",\"yaho.fr\",\"yahol.fr\",\"yahoo.co\",\"yahoo.con\",\"yahoo.vom\",\"yahoo0.fr\",\"yahoo1.fr\",\"yahool.fr\",\"yahooo.fr\",\"yahoou.fr\",\"yahoow.fr\",\"yahopo.fr\",\"yaloo.fr\",\"yaoo.fr\",\"yaroo.fr\",\"yayoo.fr\",\"yhaoo.fr\",\"yhoo.fr\",\"yohoo.fr\"],","		","			// wanadoo.fr","			[\"wanadoo.fr\",\"wanadoo.frr\",\"wanadoo.ffr\",\"wanado.fr\",\"wanadou.fr\",\"wanadop.fr\",\"wandoo.fr\",\"wanaoo.fr\",\"wannadoo.fr\",\"wanadoo.com\",\"wananadoo.fr\",\"wanadoo.fe\",\"wanaddo.fr\",\"wanadoo.orange\",\"waqnadoo.fr\",\"wandaoo.fr\",\"wannado.fr\"],","			","			// msn.com","			[\"msn.com\",\"mns.com\",\"msn.co\"],","			","			// aol.com","			[\"aol.com\",\"aoel.com\",\"aol.co\"]","		];","		","		// Loop 1","		for(i=0, domainListLength = domainList.length; i<domainListLength; i++ ) {","			groupDomain = domainList[i];","			","			// Loop 2","			for(j=0, groupDomainLength = groupDomain.length; j<groupDomainLength; j++ ) {","","				// First domain of array","				if (inputEx.indexOf(domain, groupDomain) === 0) {","					","					// If domain matches the first value of the array it means it's valid","					if ( domain === groupDomain[j] ) {","						return true;","					}","				}","				else if ( domain === groupDomain[j] ) {","					var linkId = Y.guid();","					var that = this;","					","					// Add a listener to the link to allow the user to replace his bad email by clicking the link","					Y.on(\"click\",  function(e){","						e.halt();","						var reg = new RegExp(domain, \"i\");","						var fixedVal = val.replace(reg, groupDomain[0]);","						that.setValue( fixedVal );","					}, '#' + linkId, this);","					","					// Display the message with the link","					this.options.messages.invalid = inputEx.messages.didYouMean+\"<a href='' id='\"+linkId+\"' style='color:blue;'>@\"+groupDomain[0]+\" ?</a>\";","					","					// field isnt valid","					return false;","				}","			}","		}","		","		// field is valid","		return true;","	},","   ","   /**","    * @method validateNotDisposable","    */","   validateNotDisposable: function () {","      ","      var email = this.getValue(),","          result,","          disposableRegex = /@yopmail|@jetable\\.org|@mail-temporaire\\.fr|@ephemail\\.com|@trashmail\\.net|@kasmail\\.com|@spamgourmet\\.com|@tempomail\\.com|@guerrillamail\\.com|@mytempemail\\.com|@saynotospams\\.com|@tempemail\\.co\\.za|@mailinator\\.com|@mytrashmail\\.com|@mailexpire\\.com|@maileater\\.com|@spambox\\.us|@guerrillamail\\.com|@10minutemail\\.com|@dontreg\\.com|@filzmail\\.com|@spamfree24\\.org|@brefmail\\.com|@0-mail\\.com|@link2mail\\.com|@DodgeIt\\.com|@dontreg\\.com|@e4ward\\.com|@gishpuppy|@guerrillamail\\.com|@haltospam\\.com|@kasmail\\.com|@mailexpire\\.com|@mailEater\\.com|@mailinator\\.com|@mailNull\\.com|@mytrashMail|@nobulk\\.com|@nospamfor\\.us|@PookMail\\.com|@shortmail\\.net|@sneakemail\\.com|@spam\\.la|@spambob\\.com|@spambox\\.us|@spamDay\\.com|@spamh0le\\.com|@spaml\\.com|@tempInbox\\.com|@temporaryinbox\\.com|@willhackforfood\\.biz|@willSelfdestruct\\.com|@wuzupmail\\.net|@cool\\.fr\\.nf|@jetable\\.fr\\.nf|@nospam\\.ze\\.tc|@nomail\\.xl\\.cx|@mega\\.zik\\.dj|@speed\\.1s\\.fr|@courriel\\.fr\\.nf|@moncourrier\\.fr\\.nf|@monemail\\.fr\\.nf|@monmail\\.fr\\.nf|@Get2mail\\.fr|@fakemail\\.fr/i;","      ","      result = !email.match(disposableRegex);","      ","      // change invalid message","      if (!result) {","         this.options.messages.invalid = inputEx.messages.disposableEmail + email.match(disposableRegex)[0];","      }","      ","      return result;","   },","   ","   /**","    * @method validate","    */","   validate: function() {","      ","      var result = inputEx.EmailField.superclass.validate.call(this);","      ","      // reset message (useful if changed in previous validation process)","      this.options.messages.invalid = inputEx.messages.invalidEmail;","      ","      // if we want the domain validation","      if (result && !!this.options.fixdomain) {","         result = this.validateDomain();","      }","      ","      // if we want to disallow disposable e-mail addresses","      if (result && !!this.options.disallowDisposable) {","         result = this.validateNotDisposable();","      }","      ","      return result;","      ","   },","   ","   /**","    * Set the value to lower case since email have no case","    * @method getValue","    * @return {String} The email string","    */","   getValue: function() {","      ","      var value;","      ","      value = inputEx.EmailField.superclass.getValue.call(this);","      ","      return inputEx.removeAccents(value.toLowerCase());","   }","","});","   ","// Register this class as \"email\" type","inputEx.registerType(\"email\", inputEx.EmailField, []);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\"], \"ix_provides\": \"email\"});"];
_yuitest_coverage["build/inputex-email/inputex-email.js"].lines = {"1":0,"6":0,"14":0,"15":0,"17":0,"25":0,"28":0,"29":0,"32":0,"35":0,"44":0,"46":0,"47":0,"50":0,"87":0,"88":0,"91":0,"94":0,"97":0,"98":0,"101":0,"102":0,"103":0,"106":0,"107":0,"108":0,"109":0,"110":0,"114":0,"117":0,"123":0,"131":0,"135":0,"138":0,"139":0,"142":0,"150":0,"153":0,"156":0,"157":0,"161":0,"162":0,"165":0,"176":0,"178":0,"180":0,"186":0};
_yuitest_coverage["build/inputex-email/inputex-email.js"].functions = {"EmailField:14":0,"setOptions:24":0,"(anonymous 2):106":0,"validateDomain:42":0,"validateNotDisposable:129":0,"validate:148":0,"getValue:174":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-email/inputex-email.js"].coveredLines = 47;
_yuitest_coverage["build/inputex-email/inputex-email.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-email/inputex-email.js", 1);
YUI.add('inputex-email', function (Y, NAME) {

/**
 * @module inputex-email
 */
  _yuitest_coverfunc("build/inputex-email/inputex-email.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-email/inputex-email.js", 6);
var inputEx = Y.inputEx;
/**
 * Field that adds the email regexp for validation. Result is always lower case.
 * @class inputEx.EmailField
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
_yuitest_coverline("build/inputex-email/inputex-email.js", 14);
inputEx.EmailField = function(options) {
   _yuitest_coverfunc("build/inputex-email/inputex-email.js", "EmailField", 14);
_yuitest_coverline("build/inputex-email/inputex-email.js", 15);
inputEx.EmailField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-email/inputex-email.js", 17);
Y.extend(inputEx.EmailField, inputEx.StringField, {
   
   /**
    * Set the email regexp and invalid message
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-email/inputex-email.js", "setOptions", 24);
_yuitest_coverline("build/inputex-email/inputex-email.js", 25);
inputEx.EmailField.superclass.setOptions.call(this, options);

      // Overwrite options
      _yuitest_coverline("build/inputex-email/inputex-email.js", 28);
this.options.messages.invalid = inputEx.messages.invalidEmail;
      _yuitest_coverline("build/inputex-email/inputex-email.js", 29);
this.options.regexp = inputEx.regexps.email;
      
      // Validate the domain name ( false by default )
      _yuitest_coverline("build/inputex-email/inputex-email.js", 32);
this.options.fixdomain = (Y.Lang.isUndefined(options.fixdomain) ? false : !!options.fixdomain);
      
      // Validate email is not disposable
      _yuitest_coverline("build/inputex-email/inputex-email.js", 35);
this.options.disallowDisposable = (Y.Lang.isUndefined(options.disallowDisposable) ? false : !!options.disallowDisposable);
      
   },
   
   /**
    * @method validateDomain
    */
	validateDomain : function() {
		
		_yuitest_coverfunc("build/inputex-email/inputex-email.js", "validateDomain", 42);
_yuitest_coverline("build/inputex-email/inputex-email.js", 44);
var i, j, val, domain, domainList, domainListLength, groupDomain, groupDomainLength;
		
		_yuitest_coverline("build/inputex-email/inputex-email.js", 46);
val = this.getValue();
		_yuitest_coverline("build/inputex-email/inputex-email.js", 47);
domain = val.split('@')[1];
		
		// List of bad emails (only the first one in each array is the valid one)
		_yuitest_coverline("build/inputex-email/inputex-email.js", 50);
domainList = [
		
			// gmail.com
			["gmail.com","gmail.com.br","_gmail.com","g-mail.com","g.mail.com","g_mail.com","gamail.com","gamil.com","gemail.com","ggmail.com","gimail.com","gmai.com","gmail.cim","gmail.co","gmaill.com","gmain.com","gmaio.com","gmal.com","gmali.com","gmeil.com","gmial.com","gmil.com","gtmail.com","igmail.com","gmail.fr"],
		
			// hotmail.co.uk
			["hotmail.co.uk","hotmail.com.uk"],
		
			// hotmail.com
			["hotmail.com","hotmail.com.br","hotmail.br","0hotmail.com","8hotmail.com","_hotmail.com","ahotmail.com","ghotmail.com","gotmail.com","hatmail.com","hhotmail.com","ho0tmail.com","hogmail.com","hoimail.com","hoitmail.com","homail.com","homtail.com","hootmail.com","hopmail.com","hoptmail.com","hormail.com","hot.mail.com","hot_mail.com","hotail.com","hotamail.com","hotamil.com","hotemail.com","hotimail.com","hotlmail.com","hotmaail.com","hotmael.com","hotmai.com","hotmaial.com","hotmaiil.com","hotmail.acom","hotmail.bom","hotmail.ccom","hotmail.cm","hotmail.co","hotmail.coml","hotmail.comm","hotmail.con","hotmail.coom","hotmail.copm","hotmail.cpm","hotmail.lcom","hotmail.ocm","hotmail.om","hotmail.xom","hotmail2.com","hotmail_.com","hotmailc.com","hotmaill.com","hotmailo.com","hotmaio.com","hotmaiol.com","hotmais.com","hotmal.com","hotmall.com","hotmamil.com","hotmaol.com","hotmayl.com","hotmeil.com","hotmial.com","hotmil.com","hotmmail.com","hotmnail.com","hotmsil.com","hotnail.com","hotomail.com","hottmail.com","hotymail.com","hoymail.com","hptmail.com","htmail.com","htomail.com","ohotmail.com","otmail.com","rotmail.com","shotmail.com","hotmain.com"],
		
			// hotmail.fr
			["hotmail.fr","hotmail.ffr","hotmail.frr","hotmail.fr.br","hotmail.br","0hotmail.fr","8hotmail.fr","_hotmail.fr","ahotmail.fr","ghotmail.fr","gotmail.fr","hatmail.fr","hhotmail.fr","ho0tmail.fr","hogmail.fr","hoimail.fr","hoitmail.fr","homail.fr","homtail.fr","hootmail.fr","hopmail.fr","hoptmail.fr","hormail.fr","hot.mail.fr","hot_mail.fr","hotail.fr","hotamail.fr","hotamil.fr","hotemail.fr","hotimail.fr","hotlmail.fr","hotmaail.fr","hotmael.fr","hotmai.fr","hotmaial.fr","hotmaiil.fr","hotmail.frl","hotmail.frm","hotmail2.fr","hotmail_.fr","hotmailc.fr","hotmaill.fr","hotmailo.fr","hotmaio.fr","hotmaiol.fr","hotmais.fr","hotmal.fr","hotmall.fr","hotmamil.fr","hotmaol.fr","hotmayl.fr","hotmeil.fr","hotmial.fr","hotmil.fr","hotmmail.fr","hotmnail.fr","hotmsil.fr","hotnail.fr","hotomail.fr","hottmail.fr","hotymail.fr","hoymail.fr","hptmail.fr","htmail.fr","htomail.fr","ohotmail.fr","otmail.fr","rotmail.fr","shotmail.fr","hotmain.fr"],
		
			// yahoo.co.in
			["yahoo.co.in","yaho.co.in","yahoo.co.cn","yahoo.co.n","yahoo.co.on","yahoo.coin","yahoo.com.in","yahoo.cos.in","yahoo.oc.in","yaoo.co.in","yhoo.co.in"],
		
			// yahoo.com.br
			["yahoo.com.br","1yahoo.com.br","5yahoo.com.br","_yahoo.com.br","ayhoo.com.br","tahoo.com.br","uahoo.com.br","yagoo.com.br","yahho.com.br","yaho.com.br","yahoo.cm.br","yahoo.co.br","yahoo.com.ar","yahoo.com.b","yahoo.com.be","yahoo.com.ber","yahoo.com.bl","yahoo.com.brr","yahoo.com.brv","yahoo.com.bt","yahoo.com.nr","yahoo.coml.br","yahoo.con.br","yahoo.om.br","yahool.com.br","yahooo.com.br","yahoou.com.br","yaoo.com.br","yaroo.com.br","yhaoo.com.br","yhoo.com.br","yuhoo.com.br"],
		
			// yahoo.com
			["yahoo.com","yahoomail.com","_yahoo.com","ahoo.com","ayhoo.com","eyahoo.com","hahoo.com","sahoo.com","yahho.com","yaho.com","yahol.com","yahoo.co","yahoo.con","yahoo.vom","yahoo0.com","yahoo1.com","yahool.com","yahooo.com","yahoou.com","yahoow.com","yahopo.com","yaloo.com","yaoo.com","yaroo.com","yayoo.com","yhaoo.com","yhoo.com","yohoo.com"],
		
			// yahoo.fr
			["yahoo.fr","yahoomail.fr","_yahoo.fr","ahoo.fr","ayhoo.fr","eyahoo.fr","hahoo.fr","sahoo.fr","yahho.fr","yaho.fr","yahol.fr","yahoo.co","yahoo.con","yahoo.vom","yahoo0.fr","yahoo1.fr","yahool.fr","yahooo.fr","yahoou.fr","yahoow.fr","yahopo.fr","yaloo.fr","yaoo.fr","yaroo.fr","yayoo.fr","yhaoo.fr","yhoo.fr","yohoo.fr"],
		
			// wanadoo.fr
			["wanadoo.fr","wanadoo.frr","wanadoo.ffr","wanado.fr","wanadou.fr","wanadop.fr","wandoo.fr","wanaoo.fr","wannadoo.fr","wanadoo.com","wananadoo.fr","wanadoo.fe","wanaddo.fr","wanadoo.orange","waqnadoo.fr","wandaoo.fr","wannado.fr"],
			
			// msn.com
			["msn.com","mns.com","msn.co"],
			
			// aol.com
			["aol.com","aoel.com","aol.co"]
		];
		
		// Loop 1
		_yuitest_coverline("build/inputex-email/inputex-email.js", 87);
for(i=0, domainListLength = domainList.length; i<domainListLength; i++ ) {
			_yuitest_coverline("build/inputex-email/inputex-email.js", 88);
groupDomain = domainList[i];
			
			// Loop 2
			_yuitest_coverline("build/inputex-email/inputex-email.js", 91);
for(j=0, groupDomainLength = groupDomain.length; j<groupDomainLength; j++ ) {

				// First domain of array
				_yuitest_coverline("build/inputex-email/inputex-email.js", 94);
if (inputEx.indexOf(domain, groupDomain) === 0) {
					
					// If domain matches the first value of the array it means it's valid
					_yuitest_coverline("build/inputex-email/inputex-email.js", 97);
if ( domain === groupDomain[j] ) {
						_yuitest_coverline("build/inputex-email/inputex-email.js", 98);
return true;
					}
				}
				else {_yuitest_coverline("build/inputex-email/inputex-email.js", 101);
if ( domain === groupDomain[j] ) {
					_yuitest_coverline("build/inputex-email/inputex-email.js", 102);
var linkId = Y.guid();
					_yuitest_coverline("build/inputex-email/inputex-email.js", 103);
var that = this;
					
					// Add a listener to the link to allow the user to replace his bad email by clicking the link
					_yuitest_coverline("build/inputex-email/inputex-email.js", 106);
Y.on("click",  function(e){
						_yuitest_coverfunc("build/inputex-email/inputex-email.js", "(anonymous 2)", 106);
_yuitest_coverline("build/inputex-email/inputex-email.js", 107);
e.halt();
						_yuitest_coverline("build/inputex-email/inputex-email.js", 108);
var reg = new RegExp(domain, "i");
						_yuitest_coverline("build/inputex-email/inputex-email.js", 109);
var fixedVal = val.replace(reg, groupDomain[0]);
						_yuitest_coverline("build/inputex-email/inputex-email.js", 110);
that.setValue( fixedVal );
					}, '#' + linkId, this);
					
					// Display the message with the link
					_yuitest_coverline("build/inputex-email/inputex-email.js", 114);
this.options.messages.invalid = inputEx.messages.didYouMean+"<a href='' id='"+linkId+"' style='color:blue;'>@"+groupDomain[0]+" ?</a>";
					
					// field isnt valid
					_yuitest_coverline("build/inputex-email/inputex-email.js", 117);
return false;
				}}
			}
		}
		
		// field is valid
		_yuitest_coverline("build/inputex-email/inputex-email.js", 123);
return true;
	},
   
   /**
    * @method validateNotDisposable
    */
   validateNotDisposable: function () {
      
      _yuitest_coverfunc("build/inputex-email/inputex-email.js", "validateNotDisposable", 129);
_yuitest_coverline("build/inputex-email/inputex-email.js", 131);
var email = this.getValue(),
          result,
          disposableRegex = /@yopmail|@jetable\.org|@mail-temporaire\.fr|@ephemail\.com|@trashmail\.net|@kasmail\.com|@spamgourmet\.com|@tempomail\.com|@guerrillamail\.com|@mytempemail\.com|@saynotospams\.com|@tempemail\.co\.za|@mailinator\.com|@mytrashmail\.com|@mailexpire\.com|@maileater\.com|@spambox\.us|@guerrillamail\.com|@10minutemail\.com|@dontreg\.com|@filzmail\.com|@spamfree24\.org|@brefmail\.com|@0-mail\.com|@link2mail\.com|@DodgeIt\.com|@dontreg\.com|@e4ward\.com|@gishpuppy|@guerrillamail\.com|@haltospam\.com|@kasmail\.com|@mailexpire\.com|@mailEater\.com|@mailinator\.com|@mailNull\.com|@mytrashMail|@nobulk\.com|@nospamfor\.us|@PookMail\.com|@shortmail\.net|@sneakemail\.com|@spam\.la|@spambob\.com|@spambox\.us|@spamDay\.com|@spamh0le\.com|@spaml\.com|@tempInbox\.com|@temporaryinbox\.com|@willhackforfood\.biz|@willSelfdestruct\.com|@wuzupmail\.net|@cool\.fr\.nf|@jetable\.fr\.nf|@nospam\.ze\.tc|@nomail\.xl\.cx|@mega\.zik\.dj|@speed\.1s\.fr|@courriel\.fr\.nf|@moncourrier\.fr\.nf|@monemail\.fr\.nf|@monmail\.fr\.nf|@Get2mail\.fr|@fakemail\.fr/i;
      
      _yuitest_coverline("build/inputex-email/inputex-email.js", 135);
result = !email.match(disposableRegex);
      
      // change invalid message
      _yuitest_coverline("build/inputex-email/inputex-email.js", 138);
if (!result) {
         _yuitest_coverline("build/inputex-email/inputex-email.js", 139);
this.options.messages.invalid = inputEx.messages.disposableEmail + email.match(disposableRegex)[0];
      }
      
      _yuitest_coverline("build/inputex-email/inputex-email.js", 142);
return result;
   },
   
   /**
    * @method validate
    */
   validate: function() {
      
      _yuitest_coverfunc("build/inputex-email/inputex-email.js", "validate", 148);
_yuitest_coverline("build/inputex-email/inputex-email.js", 150);
var result = inputEx.EmailField.superclass.validate.call(this);
      
      // reset message (useful if changed in previous validation process)
      _yuitest_coverline("build/inputex-email/inputex-email.js", 153);
this.options.messages.invalid = inputEx.messages.invalidEmail;
      
      // if we want the domain validation
      _yuitest_coverline("build/inputex-email/inputex-email.js", 156);
if (result && !!this.options.fixdomain) {
         _yuitest_coverline("build/inputex-email/inputex-email.js", 157);
result = this.validateDomain();
      }
      
      // if we want to disallow disposable e-mail addresses
      _yuitest_coverline("build/inputex-email/inputex-email.js", 161);
if (result && !!this.options.disallowDisposable) {
         _yuitest_coverline("build/inputex-email/inputex-email.js", 162);
result = this.validateNotDisposable();
      }
      
      _yuitest_coverline("build/inputex-email/inputex-email.js", 165);
return result;
      
   },
   
   /**
    * Set the value to lower case since email have no case
    * @method getValue
    * @return {String} The email string
    */
   getValue: function() {
      
      _yuitest_coverfunc("build/inputex-email/inputex-email.js", "getValue", 174);
_yuitest_coverline("build/inputex-email/inputex-email.js", 176);
var value;
      
      _yuitest_coverline("build/inputex-email/inputex-email.js", 178);
value = inputEx.EmailField.superclass.getValue.call(this);
      
      _yuitest_coverline("build/inputex-email/inputex-email.js", 180);
return inputEx.removeAccents(value.toLowerCase());
   }

});
   
// Register this class as "email" type
_yuitest_coverline("build/inputex-email/inputex-email.js", 186);
inputEx.registerType("email", inputEx.EmailField, []);


}, '@VERSION@', {"requires": ["inputex-string"], "ix_provides": "email"});
