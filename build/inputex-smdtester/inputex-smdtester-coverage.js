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
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].code=["YUI.add('inputex-smdtester', function (Y, NAME) {","","/**"," * @module inputex-smdtester"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * Creates a form to test various SMD files"," * @class inputEx.RPC.SMDTester"," */","inputEx.RPC.SMDTester = function(parentEl, smdList) {","	","	this.el = document.getElementById(parentEl);","	","	var selectStr = 'select smd';","	inputEx({","		type: 'select',","		label: \"SMD\",","		parentEl: this.el,","		choices: [{ value: selectStr }].concat((function() {","			var arr = [], i, length;","			for (i = 0, length = smdList.length; i < length; i += 1) {","				arr.push({ value: smdList[i] });","			}","			return arr;","		}())),","		description: \"Select the Service Mapping Description file\"","	}).on('updated', function(value) {","			var smdFile = value;","			if(smdFile != selectStr) {","				this.loadSMD(smdFile);","			}","			/*else {","				// TODO: clear the form ?","			}*/","	}, this, true);","	","	this.smdDescriptionEl = inputEx.cn('p');","	this.el.appendChild( this.smdDescriptionEl );","	","	this.serviceMethodEl = inputEx.cn('div');","	this.el.appendChild( this.serviceMethodEl );","	","	this.methodDescriptionEl = inputEx.cn('p');","	this.el.appendChild( this.methodDescriptionEl );","	","	this.formContainerEl = inputEx.cn('div');","	this.el.appendChild( this.formContainerEl );","	","	","	this.treeContainerEl = inputEx.cn('div');","	this.treeContainerEl.appendChild( inputEx.cn('p', null, null, 'Results :') );","	this.el.appendChild( this.treeContainerEl );","};","	","inputEx.RPC.SMDTester.prototype = {","	","	/**","	 * When the user select a SMD in the select","	 * @method loadSMD","	 */","	loadSMD: function(smdFile) {","","      this.serviceMethodEl.innerHTML = \"\";","		this.formContainerEl.innerHTML = \"\";","		","		this.service = new inputEx.RPC.Service(smdFile,{ success: this.onServiceLoaded,	scope: this});","	},","	","	/**","	 * When the SMD has been loaded","	 * @method onServiceLoaded","	 */","	onServiceLoaded: function() {","		","		// Set SMD Description :","		this.smdDescriptionEl.innerHTML = (Y.Lang.isString(this.service._smd.description)) ? this.service._smd.description : \"\";","		","		// Method Select","		var selectStr = 'select a method';","		var genMethods = [selectStr];","		for(var key in this.service) {","			if(this.service.hasOwnProperty(key) && Y.Lang.isFunction(this.service[key])) {","				genMethods.push({ value: key });","			}","		}	","		var select = inputEx({","				type: 'select',","				parentEl: this.serviceMethodEl,","				choices: genMethods,","				label: 'Method',","				description: \"Select the method\"","		});","		","		select.on('updated', function(value) {","			var methodName = value;","			if(methodName != selectStr) this.onServiceMethod(methodName);","		}, this, true);","		","		if(genMethods.length == 2) {","			select.setValue(genMethods[1]);","		}","		","	},","	","	/**","	 * When a method has been selected :","	 * @method onServiceMethod","	 */","	onServiceMethod: function(methodName) {","		","		// Set Method Description :","		this.methodDescriptionEl.innerHTML = (Y.Lang.isString(this.service[methodName].description)) ? this.service[methodName].description : \"\";","		","		// generate the form for the given method","		this.formContainerEl.innerHTML = \"\";","		inputEx.RPC.generateServiceForm(this.service[methodName], { parentEl: this.formContainerEl }, {","			success: function(results) {","					this.treeContainerEl.innerHTML = \"\";","					new inputEx.widget.JsonTreeInspector(this.treeContainerEl, results);","			},","			scope: this","		});","	}","	","};","","","}, '@VERSION@', {\"requires\": [\"inputex-rpc\", \"inputex-jsontreeinspector\"]});"];
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].lines = {"1":0,"6":0,"13":0,"15":0,"17":0,"18":0,"23":0,"24":0,"25":0,"27":0,"31":0,"32":0,"33":0,"40":0,"41":0,"43":0,"44":0,"46":0,"47":0,"49":0,"50":0,"53":0,"54":0,"55":0,"58":0,"66":0,"67":0,"69":0,"79":0,"82":0,"83":0,"84":0,"85":0,"86":0,"89":0,"97":0,"98":0,"99":0,"102":0,"103":0,"115":0,"118":0,"119":0,"121":0,"122":0};
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].functions = {"(anonymous 2):22":0,"(anonymous 3):30":0,"SMDTester:13":0,"loadSMD:64":0,"(anonymous 4):97":0,"onServiceLoaded:76":0,"success:120":0,"onServiceMethod:112":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-smdtester/inputex-smdtester.js"].coveredLines = 45;
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
for (i = 0, length = smdList.length; i < length; i += 1) {
				_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 25);
arr.push({ value: smdList[i] });
			}
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 27);
return arr;
		}())),
		description: "Select the Service Mapping Description file"
	}).on('updated', function(value) {
			_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "(anonymous 3)", 30);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 31);
var smdFile = value;
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 32);
if(smdFile != selectStr) {
				_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 33);
this.loadSMD(smdFile);
			}
			/*else {
				// TODO: clear the form ?
			}*/
	}, this, true);
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 40);
this.smdDescriptionEl = inputEx.cn('p');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 41);
this.el.appendChild( this.smdDescriptionEl );
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 43);
this.serviceMethodEl = inputEx.cn('div');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 44);
this.el.appendChild( this.serviceMethodEl );
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 46);
this.methodDescriptionEl = inputEx.cn('p');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 47);
this.el.appendChild( this.methodDescriptionEl );
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 49);
this.formContainerEl = inputEx.cn('div');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 50);
this.el.appendChild( this.formContainerEl );
	
	
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 53);
this.treeContainerEl = inputEx.cn('div');
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 54);
this.treeContainerEl.appendChild( inputEx.cn('p', null, null, 'Results :') );
	_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 55);
this.el.appendChild( this.treeContainerEl );
};
	
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 58);
inputEx.RPC.SMDTester.prototype = {
	
	/**
	 * When the user select a SMD in the select
	 * @method loadSMD
	 */
	loadSMD: function(smdFile) {

      _yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "loadSMD", 64);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 66);
this.serviceMethodEl.innerHTML = "";
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 67);
this.formContainerEl.innerHTML = "";
		
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 69);
this.service = new inputEx.RPC.Service(smdFile,{ success: this.onServiceLoaded,	scope: this});
	},
	
	/**
	 * When the SMD has been loaded
	 * @method onServiceLoaded
	 */
	onServiceLoaded: function() {
		
		// Set SMD Description :
		_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "onServiceLoaded", 76);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 79);
this.smdDescriptionEl.innerHTML = (Y.Lang.isString(this.service._smd.description)) ? this.service._smd.description : "";
		
		// Method Select
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 82);
var selectStr = 'select a method';
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 83);
var genMethods = [selectStr];
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 84);
for(var key in this.service) {
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 85);
if(this.service.hasOwnProperty(key) && Y.Lang.isFunction(this.service[key])) {
				_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 86);
genMethods.push({ value: key });
			}
		}	
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 89);
var select = inputEx({
				type: 'select',
				parentEl: this.serviceMethodEl,
				choices: genMethods,
				label: 'Method',
				description: "Select the method"
		});
		
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 97);
select.on('updated', function(value) {
			_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "(anonymous 4)", 97);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 98);
var methodName = value;
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 99);
if(methodName != selectStr) {this.onServiceMethod(methodName);}
		}, this, true);
		
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 102);
if(genMethods.length == 2) {
			_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 103);
select.setValue(genMethods[1]);
		}
		
	},
	
	/**
	 * When a method has been selected :
	 * @method onServiceMethod
	 */
	onServiceMethod: function(methodName) {
		
		// Set Method Description :
		_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "onServiceMethod", 112);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 115);
this.methodDescriptionEl.innerHTML = (Y.Lang.isString(this.service[methodName].description)) ? this.service[methodName].description : "";
		
		// generate the form for the given method
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 118);
this.formContainerEl.innerHTML = "";
		_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 119);
inputEx.RPC.generateServiceForm(this.service[methodName], { parentEl: this.formContainerEl }, {
			success: function(results) {
					_yuitest_coverfunc("build/inputex-smdtester/inputex-smdtester.js", "success", 120);
_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 121);
this.treeContainerEl.innerHTML = "";
					_yuitest_coverline("build/inputex-smdtester/inputex-smdtester.js", 122);
new inputEx.widget.JsonTreeInspector(this.treeContainerEl, results);
			},
			scope: this
		});
	}
	
};


}, '@VERSION@', {"requires": ["inputex-rpc", "inputex-jsontreeinspector"]});
