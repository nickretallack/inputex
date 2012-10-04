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
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-smdtester/inputex-smdtester.js",
    code: []
};
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].code=["YUI.add('inputex-smdtester', function (Y, NAME) {","","/**"," * @module inputex-smdtester"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Creates a form to test various SMD files"," * @class inputEx.RPC.SMDTester"," */","inputEx.RPC.SMDTester = function(parentEl, smdList) {","	","	this.el = document.getElementById(parentEl);","	","	var selectStr = 'select smd';","	inputEx({","		type: 'select',","		label: \"SMD\",","		parentEl: this.el,","		choices: [{ value: selectStr }].concat((function() {","			var arr = [], i, length;","			if(!smdList){","				throw new Error(\"Missing 'smdList' property in options\");","			}","			for (i = 0, length = smdList.length; i < length; i += 1) {","				arr.push({ value: smdList[i] });","			}","			return arr;","		}())),","		description: \"Select the Service Mapping Description file\"","	}).on('updated', function(value) {","			var smdFile = value;","			if(smdFile != selectStr) {","				this.loadSMD(smdFile);","			}","			/*else {","				// TODO: clear the form ?","			}*/","	}, this, true);","	","	this.smdDescriptionEl = inputEx.cn('p');","	this.el.appendChild( this.smdDescriptionEl );","	","	this.serviceMethodEl = inputEx.cn('div');","	this.el.appendChild( this.serviceMethodEl );","	","	this.methodDescriptionEl = inputEx.cn('p');","	this.el.appendChild( this.methodDescriptionEl );","	","	this.formContainerEl = inputEx.cn('div');","	this.el.appendChild( this.formContainerEl );","	","	","	this.treeContainerEl = inputEx.cn('div');","	this.treeContainerEl.appendChild( inputEx.cn('p', null, null, 'Results :') );","	this.el.appendChild( this.treeContainerEl );","};","	","inputEx.RPC.SMDTester.prototype = {","	","	/**","	 * When the user select a SMD in the select","	 * @method loadSMD","	 */","	loadSMD: function(smdFile) {","","      this.serviceMethodEl.innerHTML = \"\";","		this.formContainerEl.innerHTML = \"\";","		","		this.service = new inputEx.RPC.Service(smdFile,{ success: this.onServiceLoaded,	scope: this});","	},","	","	/**","	 * When the SMD has been loaded","	 * @method onServiceLoaded","	 */","	onServiceLoaded: function() {","		","		// Set SMD Description :","		this.smdDescriptionEl.innerHTML = (Y.Lang.isString(this.service._smd.description)) ? this.service._smd.description : \"\";","		","		// Method Select","		var selectStr = 'select a method';","		var genMethods = [selectStr];","		for(var key in this.service) {","			if(this.service.hasOwnProperty(key) && Y.Lang.isFunction(this.service[key])) {","				genMethods.push({ value: key });","			}","		}	","		var select = inputEx({","				type: 'select',","				parentEl: this.serviceMethodEl,","				choices: genMethods,","				label: 'Method',","				description: \"Select the method\"","		});","		","		select.on('updated', function(value) {","			var methodName = value;","			if(methodName != selectStr) this.onServiceMethod(methodName);","		}, this, true);","		","		if(genMethods.length == 2) {","			select.setValue(genMethods[1]);","		}","		","	},","	","	/**","	 * When a method has been selected :","	 * @method onServiceMethod","	 */","	onServiceMethod: function(methodName) {","		","		// Set Method Description :","		this.methodDescriptionEl.innerHTML = (Y.Lang.isString(this.service[methodName].description)) ? this.service[methodName].description : \"\";","		","		// generate the form for the given method","		this.formContainerEl.innerHTML = \"\";","		inputEx.RPC.generateServiceForm(this.service[methodName], { parentEl: this.formContainerEl }, {","			success: function(results) {","					this.treeContainerEl.innerHTML = \"\";","					new inputEx.widget.JsonTreeInspector(this.treeContainerEl, results);","			},","			scope: this","		});","	}","	","};","","","}, '@VERSION@', {\"requires\": [\"inputex-rpc\", \"inputex-jsontreeinspector\"]});"];
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].lines = {"1":0,"6":0,"13":0,"15":0,"17":0,"18":0,"23":0,"24":0,"25":0,"27":0,"28":0,"30":0,"34":0,"35":0,"36":0,"43":0,"44":0,"46":0,"47":0,"49":0,"50":0,"52":0,"53":0,"56":0,"57":0,"58":0,"61":0,"69":0,"70":0,"72":0,"82":0,"85":0,"86":0,"87":0,"88":0,"89":0,"92":0,"100":0,"101":0,"102":0,"105":0,"106":0,"118":0,"121":0,"122":0,"124":0,"125":0};
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].functions = {"(anonymous 2):22":0,"(anonymous 3):33":0,"SMDTester:13":0,"loadSMD:67":0,"(anonymous 4):100":0,"onServiceLoaded:79":0,"success:123":0,"onServiceMethod:115":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].coveredLines = 47;
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 1);
YUI.add('inputex-smdtester', function (Y, NAME) {

/**
 * @module inputex-smdtester
 */
  _yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * Creates a form to test various SMD files
 * @class inputEx.RPC.SMDTester
 */
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 13);
inputEx.RPC.SMDTester = function(parentEl, smdList) {
	
	_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "SMDTester", 13);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 15);
this.el = document.getElementById(parentEl);
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 17);
var selectStr = 'select smd';
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 18);
inputEx({
		type: 'select',
		label: "SMD",
		parentEl: this.el,
		choices: [{ value: selectStr }].concat((function() {
			_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "(anonymous 2)", 22);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 23);
var arr = [], i, length;
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 24);
if(!smdList){
				_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 25);
throw new Error("Missing 'smdList' property in options");
			}
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 27);
for (i = 0, length = smdList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 28);
arr.push({ value: smdList[i] });
			}
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 30);
return arr;
		}())),
		description: "Select the Service Mapping Description file"
	}).on('updated', function(value) {
			_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "(anonymous 3)", 33);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 34);
var smdFile = value;
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 35);
if(smdFile != selectStr) {
				_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 36);
this.loadSMD(smdFile);
			}
			/*else {
				// TODO: clear the form ?
			}*/
	}, this, true);
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 43);
this.smdDescriptionEl = inputEx.cn('p');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 44);
this.el.appendChild( this.smdDescriptionEl );
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 46);
this.serviceMethodEl = inputEx.cn('div');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 47);
this.el.appendChild( this.serviceMethodEl );
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 49);
this.methodDescriptionEl = inputEx.cn('p');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 50);
this.el.appendChild( this.methodDescriptionEl );
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 52);
this.formContainerEl = inputEx.cn('div');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 53);
this.el.appendChild( this.formContainerEl );
	
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 56);
this.treeContainerEl = inputEx.cn('div');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 57);
this.treeContainerEl.appendChild( inputEx.cn('p', null, null, 'Results :') );
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 58);
this.el.appendChild( this.treeContainerEl );
};
	
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 61);
inputEx.RPC.SMDTester.prototype = {
	
	/**
	 * When the user select a SMD in the select
	 * @method loadSMD
	 */
	loadSMD: function(smdFile) {

      _yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "loadSMD", 67);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 69);
this.serviceMethodEl.innerHTML = "";
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 70);
this.formContainerEl.innerHTML = "";
		
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 72);
this.service = new inputEx.RPC.Service(smdFile,{ success: this.onServiceLoaded,	scope: this});
	},
	
	/**
	 * When the SMD has been loaded
	 * @method onServiceLoaded
	 */
	onServiceLoaded: function() {
		
		// Set SMD Description :
		_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "onServiceLoaded", 79);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 82);
this.smdDescriptionEl.innerHTML = (Y.Lang.isString(this.service._smd.description)) ? this.service._smd.description : "";
		
		// Method Select
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 85);
var selectStr = 'select a method';
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 86);
var genMethods = [selectStr];
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 87);
for(var key in this.service) {
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 88);
if(this.service.hasOwnProperty(key) && Y.Lang.isFunction(this.service[key])) {
				_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 89);
genMethods.push({ value: key });
			}
		}	
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 92);
var select = inputEx({
				type: 'select',
				parentEl: this.serviceMethodEl,
				choices: genMethods,
				label: 'Method',
				description: "Select the method"
		});
		
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 100);
select.on('updated', function(value) {
			_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "(anonymous 4)", 100);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 101);
var methodName = value;
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 102);
if(methodName != selectStr) {this.onServiceMethod(methodName);}
		}, this, true);
		
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 105);
if(genMethods.length == 2) {
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 106);
select.setValue(genMethods[1]);
		}
		
	},
	
	/**
	 * When a method has been selected :
	 * @method onServiceMethod
	 */
	onServiceMethod: function(methodName) {
		
		// Set Method Description :
		_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "onServiceMethod", 115);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 118);
this.methodDescriptionEl.innerHTML = (Y.Lang.isString(this.service[methodName].description)) ? this.service[methodName].description : "";
		
		// generate the form for the given method
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 121);
this.formContainerEl.innerHTML = "";
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 122);
inputEx.RPC.generateServiceForm(this.service[methodName], { parentEl: this.formContainerEl }, {
			success: function(results) {
					_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "success", 123);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 124);
this.treeContainerEl.innerHTML = "";
					_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 125);
new inputEx.widget.JsonTreeInspector(this.treeContainerEl, results);
			},
			scope: this
		});
	}
	
};


}, '@VERSION@', {"requires": ["inputex-rpc", "inputex-jsontreeinspector"]});
