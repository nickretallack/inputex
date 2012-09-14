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
_yuitest_coverage["build/inputex-dsselect/inputex-dsselect.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-dsselect/inputex-dsselect.js",
    code: []
};
_yuitest_coverage["build/inputex-dsselect/inputex-dsselect.js"].code=["YUI.add('inputex-dsselect', function (Y, NAME) {","","/**"," * @module inputex-dsselect"," */","YUI.add(\"inputex-dsselect\", function(Y) {","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","	","	/**","	 * Create a select field from a datasource","	 * @class inputEx.DSSelectField","	 * @extends inputEx.SelectField","	 * @constructor","	 * @param {Object} options Added options:","	 * <ul>","	 *	   <li>options: list of option elements configurations</li>","	 *    <li>datasource: the datasource</li>","	 *    <li>valueKey: value key</li>","	 *    <li>labelKey: label key</li>","	 * </ul>","	 */","	inputEx.DSSelectField = function (options) {","		inputEx.DSSelectField.superclass.constructor.call(this, options);","	};","	","	Y.extend(inputEx.DSSelectField, inputEx.SelectField, {","		/**","		 * Setup the additional options for selectfield","		 * @method setValue","		 * @param {Object} options Options object as passed to the constructor","		 */","		setOptions: function (options) {","		","			inputEx.DSSelectField.superclass.setOptions.call(this, options);","		","			this.options.valueKey = options.valueKey || \"value\";","			this.options.labelKey = options.labelKey || \"label\";","		","			this.options.datasource = options.datasource;","		","		},","		","		/**","		 * Build a select tag with options","		 * @method renderComponent","		 */","		renderComponent: function () {","		","			inputEx.DSSelectField.superclass.renderComponent.call(this);","		","			// Send the data request","			this.sendDataRequest(\"?all=true\"); // TODO: configurable default request ?","		},","		","		/**","		 * Send the datasource request","		 * @method sendDataRequest","		 */","		sendDataRequest: function (oRequest) {","			if (!!this.options.datasource) {","			   ","				//this.options.datasource.sendRequest(oRequest, {success: this.onDatasourceSuccess, failure: this.onDatasourceFailure, scope: this});","				","				this.options.datasource.sendRequest({","                request: oRequest,","                callback: {","                   success: Y.bind(this.onDatasourceSuccess, this),","                   failure: Y.bind(this.onDatasourceFailure, this)","                }","                ","            });","			}","			","		},","		","		/**","		 * Insert the options","		 * @method populateSelect","		 */","		populateSelect: function (items) {","		","			var i, length;","		","			// remove previous <option>s nodes","			while (this.el.childNodes.length > 0) {","				this.el.removeChild(this.el.childNodes[0]);","			}","		","			// add new options","			for (i = 0, length = items.length; i < length ; i += 1) {","				this.addChoice({ value: items[i][this.options.valueKey], label: items[i][this.options.labelKey] });","			}","		},","		","		/**","		 * Callback for request success ","		 * @method onDatasourceSuccess","		 */","		onDatasourceSuccess: function (e) {","			this.populateSelect(e.response.results);","		},","		","		/**","		 * Callback for request failure ","		 * @method onDatasourceFailure","		 */","		onDatasourceFailure: function (e) { ","			this.el.innerHTML = \"<option>error</option>\";","		}","		","	});","	","	// Register this class as \"dsselect\" type","	inputEx.registerType(\"dsselect\", inputEx.DSSelectField);","","}, '3.1.0',{","   requires: ['inputex-select','datasource']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-dsselect/inputex-dsselect.js"].lines = {"1":0,"6":0,"8":0,"24":0,"25":0,"28":0,"36":0,"38":0,"39":0,"41":0,"51":0,"54":0,"62":0,"66":0,"84":0,"87":0,"88":0,"92":0,"93":0,"102":0,"110":0,"116":0};
_yuitest_coverage["build/inputex-dsselect/inputex-dsselect.js"].functions = {"DSSelectField:24":0,"setOptions:34":0,"renderComponent:49":0,"sendDataRequest:61":0,"populateSelect:82":0,"onDatasourceSuccess:101":0,"onDatasourceFailure:109":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-dsselect/inputex-dsselect.js"].coveredLines = 22;
_yuitest_coverage["build/inputex-dsselect/inputex-dsselect.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 1);
YUI.add('inputex-dsselect', function (Y, NAME) {

/**
 * @module inputex-dsselect
 */
_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 6);
YUI.add("inputex-dsselect", function(Y) {

  _yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;
	
	/**
	 * Create a select field from a datasource
	 * @class inputEx.DSSelectField
	 * @extends inputEx.SelectField
	 * @constructor
	 * @param {Object} options Added options:
	 * <ul>
	 *	   <li>options: list of option elements configurations</li>
	 *    <li>datasource: the datasource</li>
	 *    <li>valueKey: value key</li>
	 *    <li>labelKey: label key</li>
	 * </ul>
	 */
	_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 24);
inputEx.DSSelectField = function (options) {
		_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "DSSelectField", 24);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 25);
inputEx.DSSelectField.superclass.constructor.call(this, options);
	};
	
	_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 28);
Y.extend(inputEx.DSSelectField, inputEx.SelectField, {
		/**
		 * Setup the additional options for selectfield
		 * @method setValue
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
		
			_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "setOptions", 34);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 36);
inputEx.DSSelectField.superclass.setOptions.call(this, options);
		
			_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 38);
this.options.valueKey = options.valueKey || "value";
			_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 39);
this.options.labelKey = options.labelKey || "label";
		
			_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 41);
this.options.datasource = options.datasource;
		
		},
		
		/**
		 * Build a select tag with options
		 * @method renderComponent
		 */
		renderComponent: function () {
		
			_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "renderComponent", 49);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 51);
inputEx.DSSelectField.superclass.renderComponent.call(this);
		
			// Send the data request
			_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 54);
this.sendDataRequest("?all=true"); // TODO: configurable default request ?
		},
		
		/**
		 * Send the datasource request
		 * @method sendDataRequest
		 */
		sendDataRequest: function (oRequest) {
			_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "sendDataRequest", 61);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 62);
if (!!this.options.datasource) {
			   
				//this.options.datasource.sendRequest(oRequest, {success: this.onDatasourceSuccess, failure: this.onDatasourceFailure, scope: this});
				
				_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 66);
this.options.datasource.sendRequest({
                request: oRequest,
                callback: {
                   success: Y.bind(this.onDatasourceSuccess, this),
                   failure: Y.bind(this.onDatasourceFailure, this)
                }
                
            });
			}
			
		},
		
		/**
		 * Insert the options
		 * @method populateSelect
		 */
		populateSelect: function (items) {
		
			_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "populateSelect", 82);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 84);
var i, length;
		
			// remove previous <option>s nodes
			_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 87);
while (this.el.childNodes.length > 0) {
				_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 88);
this.el.removeChild(this.el.childNodes[0]);
			}
		
			// add new options
			_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 92);
for (i = 0, length = items.length; i < length ; i += 1) {
				_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 93);
this.addChoice({ value: items[i][this.options.valueKey], label: items[i][this.options.labelKey] });
			}
		},
		
		/**
		 * Callback for request success 
		 * @method onDatasourceSuccess
		 */
		onDatasourceSuccess: function (e) {
			_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "onDatasourceSuccess", 101);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 102);
this.populateSelect(e.response.results);
		},
		
		/**
		 * Callback for request failure 
		 * @method onDatasourceFailure
		 */
		onDatasourceFailure: function (e) { 
			_yuitest_coverfunc("build/inputex-dsselect/inputex-dsselect.js", "onDatasourceFailure", 109);
_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 110);
this.el.innerHTML = "<option>error</option>";
		}
		
	});
	
	// Register this class as "dsselect" type
	_yuitest_coverline("build/inputex-dsselect/inputex-dsselect.js", 116);
inputEx.registerType("dsselect", inputEx.DSSelectField);

}, '3.1.0',{
   requires: ['inputex-select','datasource']
});


}, '@VERSION@');
