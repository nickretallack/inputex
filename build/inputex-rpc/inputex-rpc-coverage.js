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
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-rpc/inputex-rpc.js",
    code: []
};
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].code=["YUI.add('inputex-rpc', function (Y, NAME) {","","/**"," * @module inputex-rpc"," */","YUI.add(\"inputex-rpc\", function(Y){","","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * inputEx RPC utility functions"," * Implements SMD and create forms directly from services"," * @class inputEx.RPC"," * @static"," */","inputEx.RPC = {","   ","   /**","    * Build a form to run a service !","    * @method generateServiceForm","    * @static","    * @param {function} method A method created through inputEx.RPC.Service","    * @param {Object} formOpts","    */","   generateServiceForm: function(method, formOpts, callback) {","   ","      var options = null;","      if(lang.isObject(formOpts) && lang.isArray(formOpts.fields) ) {","         options = formOpts;","      }","      // create the form directly from the method params","      else {","         options = inputEx.RPC.formForMethod(method);","         // Add user options from formOpts","         Y.mix(options, formOpts, true);","      }","   ","      // Add buttons to launch the service","      var methodName = method._methodName || method.name;","      options.type = \"form\";","      if(!options.buttons) {","         options.buttons = [","            {type: 'submit', value: methodName, onClick: function() {","               ","               form.showMask();","               method(form.getValue(), {","                  success: function(results) {","                     form.hideMask();","                     if(lang.isObject(callback) && lang.isFunction(callback.success)) {","                        callback.success.call(callback.scope || this, results);","                     }","                  },","                  failure: function() {","                     form.hideMask();","                  }","               });","               return false; // do NOT send the browser submit event","            }}","         ];","      }","   ","      var form = inputEx(options);","   ","      return form;","   },","","   /**","    * Return the inputEx form options from a method","    * @method formForMethod","    * @static","    * @param {function} method A method created through inputEx.RPC.Service","    */","   formForMethod: function(method) {","   ","      // convert the method parameters into a json-schema :","      var schemaIdentifierMap = {};","      var methodName = method._methodName || method.name;","      schemaIdentifierMap[methodName] = {","          id: methodName,","          type:'object',","          properties:{}","      };","      for(var i = 0 ; i < method._parameters.length ; i++) {","         var p = method._parameters[i];","         schemaIdentifierMap[methodName].properties[p.name] = p;","      }","   ","      // Use the builder to build an inputEx form from the json-schema","      var builder = new inputEx.JsonSchema.Builder({","        'schemaIdentifierMap': schemaIdentifierMap,","        'defaultOptions':{","           'showMsg':true","        }","      });","      var options = builder.schemaToInputEx(schemaIdentifierMap[methodName]);","   ","      return options;","   }","   ","};","","   var rpc = inputEx.RPC;","","/**"," * Provide SMD support "," * http://groups.google.com/group/json-schema/web/service-mapping-description-proposal"," * Not implemented: REST envelope, TCP/IP transport"," * Take a string as a url to retrieve an smd or an object that is an smd or partial smd to use "," * as a definition for the service"," * @class inputEx.RPC.Service"," * @constructor"," */","inputEx.RPC.Service = function(smd, callback) {","","   if( lang.isString(smd) ) {","      this.smdUrl = smd;","      this.fetch(smd, callback);","   }","   else if( lang.isObject(smd) ) {","      this._smd = smd;","      this.process(callback);","   }","   else {","      throw new Error(\"smd should be an object or an url\");","   }","   ","};","","","inputEx.RPC.Service.prototype = {","   ","   /**","    * Generate the function from a service definition","    * @method _generateService","    * @param {String} serviceName","    * @param {Method definition} method","    */","   _generateService: function(serviceName, method) {","      ","      if(this[method]){","         throw new Error(\"WARNING: \"+ serviceName+ \" already exists for service. Unable to generate function\");","      }","      method.name = serviceName;","      method._methodName = serviceName;","   ","      var self = this;","      var func = function(data, opts) {","         var envelope = rpc.Envelope[method.envelope || self._smd.envelope];","         var callback = {","            success: function(o) {","               var results = envelope.deserialize(o);","               opts.success.call(opts.scope || self, results);","            },","            failure: function(o) {","               if(lang.isFunction(opts.failure) ) {","                  var results = envelope.deserialize(o);","                  opts.failure.call(opts.scope || self, results);","               }","            },","            scope: self","         };","         ","         ","         var params = {};","         if(self._smd.additionalParameters && lang.isArray(self._smd.parameters) ) {","            for(var i = 0 ; i < self._smd.parameters.length ; i++) {","               var p = self._smd.parameters[i];","               params[p.name] = p[\"default\"];","            }","         }","         Y.mix(params, data, true);","         ","         var url = method.target || self._smd.target;","         var urlRegexp = /^(http|https):\\/\\/[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(([0-9]{1,5})?\\/.*)?$/i;","         if(!url.match(urlRegexp) && url != self._smd.target) {","            url = self._smd.target+url;","         }","         ","         if( !!this.smdUrl && !url.match(urlRegexp) ) {","            // URL is still relative !","            var a=this.smdUrl.split('/');","            a[a.length-1]=\"\";","            url = a.join(\"/\")+url;","         }","         ","         ","         var r = {","            target: url,","            callback: callback,","            data: params,","            origData: data,","            opts: opts,","            callbackParamName: method.callbackParamName || self._smd.callbackParamName,","            transport: method.transport || self._smd.transport","         };","         var serialized = envelope.serialize(self._smd, method, params);","         Y.mix(r, serialized, true);","         ","         rpc.Transport[r.transport].call(self, r ); ","      };","      ","      func.name = serviceName;","      func._methodName = serviceName;","      func.description = method.description;","      func._parameters = method.parameters;","      ","      return func;","   },","   ","   /**","    * Process the SMD definition","    * @method process","    */","   process: function(callback) {","      ","      var serviceDefs = this._smd.services;","      ","      // Generate the methods to this object","      for(var serviceName in serviceDefs){","         if( serviceDefs.hasOwnProperty(serviceName) ) {","            ","            // Get the object that will contain the method.","            // handles \"namespaced\" services by breaking apart by '.'","            var current = this;","            var pieces = serviceName.split(\".\"); ","            for(var i=0; i< pieces.length-1; i++){","               current = current[pieces[i]] || (current[pieces[i]] = {});","            }","            ","            current[pieces[pieces.length-1]] =   this._generateService(serviceName, serviceDefs[serviceName]);","         }","      }","      ","      // call the success handler","      if(lang.isObject(callback) && lang.isFunction(callback.success)) {","         callback.success.call(callback.scope || this);","      }","      ","   },","   ","   /**","    * Download the SMD at the given url","    * @method fetch","    * @param {String} Absolute or relative url","    */","   fetch: function(url, callback) {","      ","      // TODO: if url is not in the same domain, we should use jsonp, or swf","      ","      var cfg = {","         method: 'GET',","         on: {","            success: function(req,o) {","               try {","                  this._smd = Y.JSON.parse(o.responseText);","                  this.process(callback);","               }","               catch(ex) {","                  if(lang.isObject(console) && lang.isFunction(console.log))","                     console.log(ex);","                  if( lang.isFunction(callback.failure) ) {","                     callback.failure.call(callback.scope || this, {error: ex});","                  }","               }","            }, ","            failure: function(req,o) {","               if( lang.isFunction(callback.failure) ) {","                  callback.failure.call(callback.scope || this, {error: \"unable to fetch url \"+url});","               }","            }","         },","         context: this","      };","      ","      Y.io(url, cfg);","      ","   }","   ","    ","};","","","","","inputEx.RPC.Service._requestId = 1;","","","/**"," * inputEx.RPC.Transport"," * @class inputEx.RPC.Transport"," * @static"," */","inputEx.RPC.Transport = {","   ","   /**","    * Build a ajax request using 'POST' method","    * @method POST","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"POST\": function(r) {","      return Y.io(r.target, {","         method: 'POST', ","         on: {","            succes: r.callback","         },","         data: r.data ","      });","   },","   ","   /**","    * Build a ajax request using 'GET' method","    * @method GET","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"GET\": function(r) {","      return Y.io(r.target + (r.data ? '?'+  r.data : ''), {","         method: 'GET',","         on: {","            success: r.callback","         }","      });","   },","   ","   /**","    * Build an ajax request using the right HTTP method","    * @method REST","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"REST\": function(r) {","      // TODO","   },","   ","   /**","    * Receive data through JSONP (insert a script tag within the page)","    * @method JSONP","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"JSONP\": function(r) {","      ","      var url =  r.target + ((r.target.indexOf(\"?\") == -1) ? '?' : '&') + r.data + \"&\"+r.callbackParamName+\"={callback}\";","","      Y.jsonp(url, function (response) {","          ","          if(lang.isObject(r.callback) && lang.isFunction(r.callback.success)) {","             r.callback.success.call(r.callback.scope || this, response);","          }","          ","      });","   },","   ","   /**","    * NOT implemented","    * @method TCP/IP","    */","   \"TCP/IP\": function(r) {","      throw new Error(\"TCP/IP transport not implemented !\");","   }","   ","};","","","/**"," * inputEx.RPC.Envelope"," * @class inputEx.RPC.Envelope"," * @static"," */","inputEx.RPC.Envelope = {","   ","   /**","    * URL envelope","    * @class inputEx.RPC.Envelope.URL","    * @static","    */","   \"URL\":  {","   ","         /**","          * Serialize data into URI encoded parameters","          * @method serialize","          */","         serialize: function(smd, method, data) {","            var eURI = encodeURIComponent;","            var params = [];","            for(var name in data){","               if(data.hasOwnProperty(name)){","                  var value = data[name];","                  if(lang.isArray(value)){","                     for(var i=0; i < value.length; i++){","                        params.push(eURI(name)+\"=\"+eURI(value[i]));","                     }","                  }else{","                     params.push(eURI(name)+\"=\"+eURI(value));","                  }","               }","            }","            return {","               data: params.join(\"&\")","            };   ","         },","         /**","          * Deserialize","           * @method deserialize","          */","         deserialize: function(results) {","            return results;","         }","   },","","   /**","    * PATH envelope","    * @class inputEx.RPC.Envelope.PATH","    * @static","    */","   \"PATH\": {","        /**","          * serialize","         * @method serialize","         */","        serialize: function(smd, method, data) {","              var target = method.target || smd.target, i;","              if(lang.isArray(data)){","                 for(i = 0; i < data.length;i++){","                    target += '/' + data[i];","                 }","              }else{","                 for(i in data){","                    if(data.hasOwnProperty(i)) {","                       target += '/' + i + '/' + data[i];","                    }","                 }","              }","           return {","              data: '',","              target: target","           };   ","        },","        /**","          * deserialize","         * @method deserialize","         */","        deserialize: function(results) {","           return results;","        }","    },","    ","   /**","    * JSON envelope","    * @class inputEx.RPC.Envelope.JSON","    * @static","    */","   \"JSON\": {","       /**","        * serialize","        * @method serialize","        */","       serialize: function(smd, method, data) {","          return {","             data: Y.JSON.stringify(data)","          };   ","       },","        /**","        * deserialize","        * @method deserialize","        */","       deserialize: function(results) {","          return results;","       }","    },","   ","   /**","    * JSON-RPC-1.0 envelope","    * @class inputEx.RPC.Envelope.JSON-RPC-1.0","    * @static","    */","   \"JSON-RPC-1.0\":  {","       /**","        * serialize","        * @method serialize","        */","       serialize: function(smd, method, data) {","         var methodName = method.name || method._methodName;","          return {","             data: Y.JSON.stringify({","                \"id\": rpc.Service._requestId++,","                \"method\": methodName,","                \"params\": data","             })","          };   ","       },","        /**","        * deserialize","        * @method deserialize","        */","       deserialize: function(results) {","          return Y.JSON.parse(results.responseText);","       }","    },","","   /**","    * JSON-RPC-2.0 envelope","    * @class inputEx.RPC.Envelope.JSON-RPC-2.0","    * @static","    */","   \"JSON-RPC-2.0\": {","      /**","           * serialize","           * @method serialize","       */","      serialize: function(smd, method, data) {","        var methodName = method.name || method._methodName;","         return {","            data: Y.JSON.stringify({","               \"id\": rpc.Service._requestId++,","               \"method\": methodName,","               \"version\": \"json-rpc-2.0\",","               \"params\": data","            })","         };   ","      },","      /**","         * serialize","         * @method deserialize","       */","      deserialize: function(results) {","         return Y.JSON.parse(results.responseText);","      }","   }","   ","};","","}, '3.1.0',{","  requires: ['json','inputex','io','inputex-jsonschema','jsonp']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].lines = {"1":0,"6":0,"8":0,"17":0,"28":0,"29":0,"30":0,"34":0,"36":0,"40":0,"41":0,"42":0,"43":0,"46":0,"47":0,"49":0,"50":0,"51":0,"55":0,"58":0,"63":0,"65":0,"77":0,"78":0,"79":0,"84":0,"85":0,"86":0,"90":0,"96":0,"98":0,"103":0,"114":0,"116":0,"117":0,"118":0,"120":0,"121":0,"122":0,"125":0,"131":0,"141":0,"142":0,"144":0,"145":0,"147":0,"148":0,"149":0,"150":0,"152":0,"153":0,"156":0,"157":0,"158":0,"165":0,"166":0,"167":0,"168":0,"169":0,"172":0,"174":0,"175":0,"176":0,"177":0,"180":0,"182":0,"183":0,"184":0,"188":0,"197":0,"198":0,"200":0,"203":0,"204":0,"205":0,"206":0,"208":0,"217":0,"220":0,"221":0,"225":0,"226":0,"227":0,"228":0,"231":0,"236":0,"237":0,"251":0,"255":0,"256":0,"257":0,"260":0,"261":0,"262":0,"263":0,"268":0,"269":0,"276":0,"286":0,"294":0,"302":0,"317":0,"341":0,"343":0,"345":0,"346":0,"357":0,"368":0,"382":0,"383":0,"384":0,"385":0,"386":0,"387":0,"388":0,"389":0,"392":0,"396":0,"405":0,"420":0,"421":0,"422":0,"423":0,"426":0,"427":0,"428":0,"432":0,"442":0,"457":0,"466":0,"481":0,"482":0,"495":0,"510":0,"511":0,"525":0};
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].functions = {"success:48":0,"failure:54":0,"onClick:44":0,"generateServiceForm:26":0,"formForMethod:74":0,"Service:114":0,"success:151":0,"failure:155":0,"func:148":0,"_generateService:139":0,"process:215":0,"success:254":0,"failure:267":0,"fetch:247":0,"\"POST\":301":0,"\"GET\":316":0,"(anonymous 3):343":0,"\"JSONP\":339":0,"\"TCP/IP\":356":0,"serialize:381":0,"deserialize:404":0,"serialize:419":0,"deserialize:441":0,"serialize:456":0,"deserialize:465":0,"serialize:480":0,"deserialize:494":0,"serialize:509":0,"deserialize:524":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].coveredLines = 136;
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].coveredFunctions = 31;
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 1);
YUI.add('inputex-rpc', function (Y, NAME) {

/**
 * @module inputex-rpc
 */
_yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 6);
YUI.add("inputex-rpc", function(Y){

  _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 8);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * inputEx RPC utility functions
 * Implements SMD and create forms directly from services
 * @class inputEx.RPC
 * @static
 */
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 17);
inputEx.RPC = {
   
   /**
    * Build a form to run a service !
    * @method generateServiceForm
    * @static
    * @param {function} method A method created through inputEx.RPC.Service
    * @param {Object} formOpts
    */
   generateServiceForm: function(method, formOpts, callback) {
   
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "generateServiceForm", 26);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 28);
var options = null;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 29);
if(lang.isObject(formOpts) && lang.isArray(formOpts.fields) ) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 30);
options = formOpts;
      }
      // create the form directly from the method params
      else {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 34);
options = inputEx.RPC.formForMethod(method);
         // Add user options from formOpts
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 36);
Y.mix(options, formOpts, true);
      }
   
      // Add buttons to launch the service
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 40);
var methodName = method._methodName || method.name;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 41);
options.type = "form";
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 42);
if(!options.buttons) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 43);
options.buttons = [
            {type: 'submit', value: methodName, onClick: function() {
               
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "onClick", 44);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 46);
form.showMask();
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 47);
method(form.getValue(), {
                  success: function(results) {
                     _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "success", 48);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 49);
form.hideMask();
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 50);
if(lang.isObject(callback) && lang.isFunction(callback.success)) {
                        _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 51);
callback.success.call(callback.scope || this, results);
                     }
                  },
                  failure: function() {
                     _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "failure", 54);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 55);
form.hideMask();
                  }
               });
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 58);
return false; // do NOT send the browser submit event
            }}
         ];
      }
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 63);
var form = inputEx(options);
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 65);
return form;
   },

   /**
    * Return the inputEx form options from a method
    * @method formForMethod
    * @static
    * @param {function} method A method created through inputEx.RPC.Service
    */
   formForMethod: function(method) {
   
      // convert the method parameters into a json-schema :
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "formForMethod", 74);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 77);
var schemaIdentifierMap = {};
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 78);
var methodName = method._methodName || method.name;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 79);
schemaIdentifierMap[methodName] = {
          id: methodName,
          type:'object',
          properties:{}
      };
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 84);
for(var i = 0 ; i < method._parameters.length ; i++) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 85);
var p = method._parameters[i];
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 86);
schemaIdentifierMap[methodName].properties[p.name] = p;
      }
   
      // Use the builder to build an inputEx form from the json-schema
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 90);
var builder = new inputEx.JsonSchema.Builder({
        'schemaIdentifierMap': schemaIdentifierMap,
        'defaultOptions':{
           'showMsg':true
        }
      });
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 96);
var options = builder.schemaToInputEx(schemaIdentifierMap[methodName]);
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 98);
return options;
   }
   
};

   _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 103);
var rpc = inputEx.RPC;

/**
 * Provide SMD support 
 * http://groups.google.com/group/json-schema/web/service-mapping-description-proposal
 * Not implemented: REST envelope, TCP/IP transport
 * Take a string as a url to retrieve an smd or an object that is an smd or partial smd to use 
 * as a definition for the service
 * @class inputEx.RPC.Service
 * @constructor
 */
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 114);
inputEx.RPC.Service = function(smd, callback) {

   _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "Service", 114);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 116);
if( lang.isString(smd) ) {
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 117);
this.smdUrl = smd;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 118);
this.fetch(smd, callback);
   }
   else {_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 120);
if( lang.isObject(smd) ) {
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 121);
this._smd = smd;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 122);
this.process(callback);
   }
   else {
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 125);
throw new Error("smd should be an object or an url");
   }}
   
};


_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 131);
inputEx.RPC.Service.prototype = {
   
   /**
    * Generate the function from a service definition
    * @method _generateService
    * @param {String} serviceName
    * @param {Method definition} method
    */
   _generateService: function(serviceName, method) {
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "_generateService", 139);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 141);
if(this[method]){
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 142);
throw new Error("WARNING: "+ serviceName+ " already exists for service. Unable to generate function");
      }
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 144);
method.name = serviceName;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 145);
method._methodName = serviceName;
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 147);
var self = this;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 148);
var func = function(data, opts) {
         _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "func", 148);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 149);
var envelope = rpc.Envelope[method.envelope || self._smd.envelope];
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 150);
var callback = {
            success: function(o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "success", 151);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 152);
var results = envelope.deserialize(o);
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 153);
opts.success.call(opts.scope || self, results);
            },
            failure: function(o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "failure", 155);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 156);
if(lang.isFunction(opts.failure) ) {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 157);
var results = envelope.deserialize(o);
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 158);
opts.failure.call(opts.scope || self, results);
               }
            },
            scope: self
         };
         
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 165);
var params = {};
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 166);
if(self._smd.additionalParameters && lang.isArray(self._smd.parameters) ) {
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 167);
for(var i = 0 ; i < self._smd.parameters.length ; i++) {
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 168);
var p = self._smd.parameters[i];
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 169);
params[p.name] = p["default"];
            }
         }
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 172);
Y.mix(params, data, true);
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 174);
var url = method.target || self._smd.target;
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 175);
var urlRegexp = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/i;
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 176);
if(!url.match(urlRegexp) && url != self._smd.target) {
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 177);
url = self._smd.target+url;
         }
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 180);
if( !!this.smdUrl && !url.match(urlRegexp) ) {
            // URL is still relative !
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 182);
var a=this.smdUrl.split('/');
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 183);
a[a.length-1]="";
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 184);
url = a.join("/")+url;
         }
         
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 188);
var r = {
            target: url,
            callback: callback,
            data: params,
            origData: data,
            opts: opts,
            callbackParamName: method.callbackParamName || self._smd.callbackParamName,
            transport: method.transport || self._smd.transport
         };
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 197);
var serialized = envelope.serialize(self._smd, method, params);
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 198);
Y.mix(r, serialized, true);
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 200);
rpc.Transport[r.transport].call(self, r ); 
      };
      
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 203);
func.name = serviceName;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 204);
func._methodName = serviceName;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 205);
func.description = method.description;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 206);
func._parameters = method.parameters;
      
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 208);
return func;
   },
   
   /**
    * Process the SMD definition
    * @method process
    */
   process: function(callback) {
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "process", 215);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 217);
var serviceDefs = this._smd.services;
      
      // Generate the methods to this object
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 220);
for(var serviceName in serviceDefs){
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 221);
if( serviceDefs.hasOwnProperty(serviceName) ) {
            
            // Get the object that will contain the method.
            // handles "namespaced" services by breaking apart by '.'
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 225);
var current = this;
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 226);
var pieces = serviceName.split("."); 
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 227);
for(var i=0; i< pieces.length-1; i++){
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 228);
current = current[pieces[i]] || (current[pieces[i]] = {});
            }
            
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 231);
current[pieces[pieces.length-1]] =   this._generateService(serviceName, serviceDefs[serviceName]);
         }
      }
      
      // call the success handler
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 236);
if(lang.isObject(callback) && lang.isFunction(callback.success)) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 237);
callback.success.call(callback.scope || this);
      }
      
   },
   
   /**
    * Download the SMD at the given url
    * @method fetch
    * @param {String} Absolute or relative url
    */
   fetch: function(url, callback) {
      
      // TODO: if url is not in the same domain, we should use jsonp, or swf
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "fetch", 247);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 251);
var cfg = {
         method: 'GET',
         on: {
            success: function(req,o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "success", 254);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 255);
try {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 256);
this._smd = Y.JSON.parse(o.responseText);
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 257);
this.process(callback);
               }
               catch(ex) {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 260);
if(lang.isObject(console) && lang.isFunction(console.log))
                     {_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 261);
console.log(ex);}
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 262);
if( lang.isFunction(callback.failure) ) {
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 263);
callback.failure.call(callback.scope || this, {error: ex});
                  }
               }
            }, 
            failure: function(req,o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "failure", 267);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 268);
if( lang.isFunction(callback.failure) ) {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 269);
callback.failure.call(callback.scope || this, {error: "unable to fetch url "+url});
               }
            }
         },
         context: this
      };
      
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 276);
Y.io(url, cfg);
      
   }
   
    
};




_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 286);
inputEx.RPC.Service._requestId = 1;


/**
 * inputEx.RPC.Transport
 * @class inputEx.RPC.Transport
 * @static
 */
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 294);
inputEx.RPC.Transport = {
   
   /**
    * Build a ajax request using 'POST' method
    * @method POST
    * @param {Object} r Object specifying target, callback and data attributes
    */
   "POST": function(r) {
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"POST\"", 301);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 302);
return Y.io(r.target, {
         method: 'POST', 
         on: {
            succes: r.callback
         },
         data: r.data 
      });
   },
   
   /**
    * Build a ajax request using 'GET' method
    * @method GET
    * @param {Object} r Object specifying target, callback and data attributes
    */
   "GET": function(r) {
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"GET\"", 316);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 317);
return Y.io(r.target + (r.data ? '?'+  r.data : ''), {
         method: 'GET',
         on: {
            success: r.callback
         }
      });
   },
   
   /**
    * Build an ajax request using the right HTTP method
    * @method REST
    * @param {Object} r Object specifying target, callback and data attributes
    */
   "REST": function(r) {
      // TODO
   },
   
   /**
    * Receive data through JSONP (insert a script tag within the page)
    * @method JSONP
    * @param {Object} r Object specifying target, callback and data attributes
    */
   "JSONP": function(r) {
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"JSONP\"", 339);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 341);
var url =  r.target + ((r.target.indexOf("?") == -1) ? '?' : '&') + r.data + "&"+r.callbackParamName+"={callback}";

      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 343);
Y.jsonp(url, function (response) {
          
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "(anonymous 3)", 343);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 345);
if(lang.isObject(r.callback) && lang.isFunction(r.callback.success)) {
             _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 346);
r.callback.success.call(r.callback.scope || this, response);
          }
          
      });
   },
   
   /**
    * NOT implemented
    * @method TCP/IP
    */
   "TCP/IP": function(r) {
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"TCP/IP\"", 356);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 357);
throw new Error("TCP/IP transport not implemented !");
   }
   
};


/**
 * inputEx.RPC.Envelope
 * @class inputEx.RPC.Envelope
 * @static
 */
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 368);
inputEx.RPC.Envelope = {
   
   /**
    * URL envelope
    * @class inputEx.RPC.Envelope.URL
    * @static
    */
   "URL":  {
   
         /**
          * Serialize data into URI encoded parameters
          * @method serialize
          */
         serialize: function(smd, method, data) {
            _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 381);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 382);
var eURI = encodeURIComponent;
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 383);
var params = [];
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 384);
for(var name in data){
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 385);
if(data.hasOwnProperty(name)){
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 386);
var value = data[name];
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 387);
if(lang.isArray(value)){
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 388);
for(var i=0; i < value.length; i++){
                        _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 389);
params.push(eURI(name)+"="+eURI(value[i]));
                     }
                  }else{
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 392);
params.push(eURI(name)+"="+eURI(value));
                  }
               }
            }
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 396);
return {
               data: params.join("&")
            };   
         },
         /**
          * Deserialize
           * @method deserialize
          */
         deserialize: function(results) {
            _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 404);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 405);
return results;
         }
   },

   /**
    * PATH envelope
    * @class inputEx.RPC.Envelope.PATH
    * @static
    */
   "PATH": {
        /**
          * serialize
         * @method serialize
         */
        serialize: function(smd, method, data) {
              _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 419);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 420);
var target = method.target || smd.target, i;
              _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 421);
if(lang.isArray(data)){
                 _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 422);
for(i = 0; i < data.length;i++){
                    _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 423);
target += '/' + data[i];
                 }
              }else{
                 _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 426);
for(i in data){
                    _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 427);
if(data.hasOwnProperty(i)) {
                       _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 428);
target += '/' + i + '/' + data[i];
                    }
                 }
              }
           _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 432);
return {
              data: '',
              target: target
           };   
        },
        /**
          * deserialize
         * @method deserialize
         */
        deserialize: function(results) {
           _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 441);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 442);
return results;
        }
    },
    
   /**
    * JSON envelope
    * @class inputEx.RPC.Envelope.JSON
    * @static
    */
   "JSON": {
       /**
        * serialize
        * @method serialize
        */
       serialize: function(smd, method, data) {
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 456);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 457);
return {
             data: Y.JSON.stringify(data)
          };   
       },
        /**
        * deserialize
        * @method deserialize
        */
       deserialize: function(results) {
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 465);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 466);
return results;
       }
    },
   
   /**
    * JSON-RPC-1.0 envelope
    * @class inputEx.RPC.Envelope.JSON-RPC-1.0
    * @static
    */
   "JSON-RPC-1.0":  {
       /**
        * serialize
        * @method serialize
        */
       serialize: function(smd, method, data) {
         _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 480);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 481);
var methodName = method.name || method._methodName;
          _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 482);
return {
             data: Y.JSON.stringify({
                "id": rpc.Service._requestId++,
                "method": methodName,
                "params": data
             })
          };   
       },
        /**
        * deserialize
        * @method deserialize
        */
       deserialize: function(results) {
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 494);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 495);
return Y.JSON.parse(results.responseText);
       }
    },

   /**
    * JSON-RPC-2.0 envelope
    * @class inputEx.RPC.Envelope.JSON-RPC-2.0
    * @static
    */
   "JSON-RPC-2.0": {
      /**
           * serialize
           * @method serialize
       */
      serialize: function(smd, method, data) {
        _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 509);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 510);
var methodName = method.name || method._methodName;
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 511);
return {
            data: Y.JSON.stringify({
               "id": rpc.Service._requestId++,
               "method": methodName,
               "version": "json-rpc-2.0",
               "params": data
            })
         };   
      },
      /**
         * serialize
         * @method deserialize
       */
      deserialize: function(results) {
         _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 524);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 525);
return Y.JSON.parse(results.responseText);
      }
   }
   
};

}, '3.1.0',{
  requires: ['json','inputex','io','inputex-jsonschema','jsonp']
});


}, '@VERSION@');
