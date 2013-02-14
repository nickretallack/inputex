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
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].code=["YUI.add('inputex-rpc', function (Y, NAME) {","","/**"," * @module inputex-rpc"," */","  var lang = Y.Lang,","      inputEx = Y.inputEx;","","/**"," * inputEx RPC utility functions"," * Implements SMD and create forms directly from services"," * @class inputEx.RPC"," * @static"," */","inputEx.RPC = {","   ","   /**","    * Build a form to run a service !","    * @method generateServiceForm","    * @static","    * @param {function} method A method created through inputEx.RPC.Service","    * @param {Object} formOpts","    */","   generateServiceForm: function(method, formOpts, callback) {","   ","      var options = null;","      if(lang.isObject(formOpts) && lang.isArray(formOpts.fields) ) {","         options = formOpts;","      }","      // create the form directly from the method params","      else {","         options = inputEx.RPC.formForMethod(method);","         // Add user options from formOpts","         Y.mix(options, formOpts, true);","      }","   ","      // Add buttons to launch the service","      var methodName = method._methodName || method.name;","      options.type = \"form\";","      if(!options.buttons) {","         options.buttons = [","            {type: 'submit', value: methodName, onClick: function() {","               ","               form.showMask();","               method(form.getValue(), {","                  success: function(results) {","                     form.hideMask();","                     if(lang.isObject(callback) && lang.isFunction(callback.success)) {","                        callback.success.call(callback.scope || this, results);","                     }","                  },","                  failure: function() {","                     form.hideMask();","                  }","               });","               return false; // do NOT send the browser submit event","            }}","         ];","      }","   ","      var form = inputEx(options);","   ","      return form;","   },","","   /**","    * Return the inputEx form options from a method","    * @method formForMethod","    * @static","    * @param {function} method A method created through inputEx.RPC.Service","    */","   formForMethod: function(method) {","   ","      // convert the method parameters into a json-schema :","      var schemaIdentifierMap = {};","      var methodName = method._methodName || method.name;","      schemaIdentifierMap[methodName] = {","          id: methodName,","          type:'object',","          properties:{}","      };","      for(var i = 0 ; i < method._parameters.length ; i++) {","         var p = method._parameters[i];","         schemaIdentifierMap[methodName].properties[p.name] = p;","      }","   ","      // Use the builder to build an inputEx form from the json-schema","      var builder = new inputEx.JsonSchema.Builder({","        'schemaIdentifierMap': schemaIdentifierMap,","        'defaultOptions':{","           'showMsg':true","        }","      });","      var options = builder.schemaToInputEx(schemaIdentifierMap[methodName]);","   ","      return options;","   }","   ","};","","   var rpc = inputEx.RPC;","","/**"," * Provide SMD support "," * http://groups.google.com/group/json-schema/web/service-mapping-description-proposal"," * Not implemented: REST envelope, TCP/IP transport"," * Take a string as a url to retrieve an smd or an object that is an smd or partial smd to use "," * as a definition for the service"," * @class inputEx.RPC.Service"," * @constructor"," */","inputEx.RPC.Service = function(smd, callback) {","","   if( lang.isString(smd) ) {","      this.smdUrl = smd;","      this.fetch(smd, callback);","   }","   else if( lang.isObject(smd) ) {","      this._smd = smd;","      this.process(callback);","   }","   else {","      throw new Error(\"smd should be an object or an url\");","   }","   ","};","","","inputEx.RPC.Service.prototype = {","   ","   /**","    * Generate the function from a service definition","    * @method _generateService","    * @param {String} serviceName","    * @param {Method definition} method","    */","   _generateService: function(serviceName, method) {","      ","      if(this[method]){","         throw new Error(\"WARNING: \"+ serviceName+ \" already exists for service. Unable to generate function\");","      }","      method.name = serviceName;","      method._methodName = serviceName;","   ","      var self = this;","      var func = function(data, opts) {","         var envelope = rpc.Envelope[method.envelope || self._smd.envelope];","         var callback = {","            success: function(o) {","               var results = envelope.deserialize(o);","               opts.success.call(opts.scope || self, results);","            },","            failure: function(o) {","               if(lang.isFunction(opts.failure) ) {","                  var results = envelope.deserialize(o);","                  opts.failure.call(opts.scope || self, results);","               }","            },","            scope: self","         };","         ","         ","         var params = {};","         if(self._smd.additionalParameters && lang.isArray(self._smd.parameters) ) {","            for(var i = 0 ; i < self._smd.parameters.length ; i++) {","               var p = self._smd.parameters[i];","               params[p.name] = p[\"default\"];","            }","         }","         Y.mix(params, data, true);","         ","         var url = method.target || self._smd.target;","         var urlRegexp = /^(http|https):\\/\\/[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(([0-9]{1,5})?\\/.*)?$/i;","         if(!url.match(urlRegexp) && url != self._smd.target) {","            url = self._smd.target+url;","         }","         ","         if( !!this.smdUrl && !url.match(urlRegexp) ) {","            // URL is still relative !","            var a=this.smdUrl.split('/');","            a[a.length-1]=\"\";","            url = a.join(\"/\")+url;","         }","         ","         ","         var r = {","            target: url,","            callback: callback,","            data: params,","            origData: data,","            opts: opts,","            callbackParamName: method.callbackParamName || self._smd.callbackParamName,","            transport: method.transport || self._smd.transport","         };","         var serialized = envelope.serialize(self._smd, method, params);","         Y.mix(r, serialized, true);","         ","         rpc.Transport[r.transport].call(self, r ); ","      };","      ","      func.name = serviceName;","      func._methodName = serviceName;","      func.description = method.description;","      func._parameters = method.parameters;","      ","      return func;","   },","   ","   /**","    * Process the SMD definition","    * @method process","    */","   process: function(callback) {","      ","      var serviceDefs = this._smd.services;","      ","      // Generate the methods to this object","      for(var serviceName in serviceDefs){","         if( serviceDefs.hasOwnProperty(serviceName) ) {","            ","            // Get the object that will contain the method.","            // handles \"namespaced\" services by breaking apart by '.'","            var current = this;","            var pieces = serviceName.split(\".\"); ","            for(var i=0; i< pieces.length-1; i++){","               current = current[pieces[i]] || (current[pieces[i]] = {});","            }","            ","            current[pieces[pieces.length-1]] =   this._generateService(serviceName, serviceDefs[serviceName]);","         }","      }","      ","      // call the success handler","      if(lang.isObject(callback) && lang.isFunction(callback.success)) {","         callback.success.call(callback.scope || this);","      }","      ","   },","   ","   /**","    * Download the SMD at the given url","    * @method fetch","    * @param {String} Absolute or relative url","    */","   fetch: function(url, callback) {","      ","      // TODO: if url is not in the same domain, we should use jsonp, or swf","      ","      var cfg = {","         method: 'GET',","         on: {","            success: function(req,o) {","               try {","                  this._smd = Y.JSON.parse(o.responseText);","                  this.process(callback);","               }","               catch(ex) {","                  if(lang.isObject(console) && lang.isFunction(console.log))","                     console.log(ex);","                  if( lang.isFunction(callback.failure) ) {","                     callback.failure.call(callback.scope || this, {error: ex});","                  }","               }","            }, ","            failure: function(req,o) {","               if( lang.isFunction(callback.failure) ) {","                  callback.failure.call(callback.scope || this, {error: \"unable to fetch url \"+url});","               }","            }","         },","         context: this","      };","      ","      Y.io(url, cfg);","      ","   }","   ","    ","};","","","","","inputEx.RPC.Service._requestId = 1;","","","/**"," * inputEx.RPC.Transport"," * @class inputEx.RPC.Transport"," * @static"," */","inputEx.RPC.Transport = {","   ","   /**","    * Build a ajax request using 'POST' method","    * @method POST","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"POST\": function(r) {","      return Y.io(r.target, {","         method: 'POST', ","         on: {","            succes: r.callback","         },","         data: r.data ","      });","   },","   ","   /**","    * Build a ajax request using 'GET' method","    * @method GET","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"GET\": function(r) {","      return Y.io(r.target + (r.data ? '?'+  r.data : ''), {","         method: 'GET',","         on: {","            success: r.callback","         }","      });","   },","   ","   /**","    * Build an ajax request using the right HTTP method","    * @method REST","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"REST\": function(r) {","      // TODO","   },","   ","   /**","    * Receive data through JSONP (insert a script tag within the page)","    * @method JSONP","    * @param {Object} r Object specifying target, callback and data attributes","    */","   \"JSONP\": function(r) {","      ","      var url =  r.target + ((r.target.indexOf(\"?\") == -1) ? '?' : '&') + r.data + \"&\"+r.callbackParamName+\"={callback}\";","","      Y.jsonp(url, function (response) {","          ","          if(lang.isObject(r.callback) && lang.isFunction(r.callback.success)) {","             r.callback.success.call(r.callback.scope || this, response);","          }","          ","      });","   },","   ","   /**","    * NOT implemented","    * @method TCP/IP","    */","   \"TCP/IP\": function(r) {","      throw new Error(\"TCP/IP transport not implemented !\");","   }","   ","};","","","/**"," * inputEx.RPC.Envelope"," * @class inputEx.RPC.Envelope"," * @static"," */","inputEx.RPC.Envelope = {","   ","   /**","    * URL envelope","    * @class inputEx.RPC.Envelope.URL","    * @static","    */","   \"URL\":  {","   ","         /**","          * Serialize data into URI encoded parameters","          * @method serialize","          */","         serialize: function(smd, method, data) {","            var eURI = encodeURIComponent;","            var params = [];","            for(var name in data){","               if(data.hasOwnProperty(name)){","                  var value = data[name];","                  if(lang.isArray(value)){","                     for(var i=0; i < value.length; i++){","                        params.push(eURI(name)+\"=\"+eURI(value[i]));","                     }","                  }else{","                     params.push(eURI(name)+\"=\"+eURI(value));","                  }","               }","            }","            return {","               data: params.join(\"&\")","            };   ","         },","         /**","          * Deserialize","           * @method deserialize","          */","         deserialize: function(results) {","            return results;","         }","   },","","   /**","    * PATH envelope","    * @class inputEx.RPC.Envelope.PATH","    * @static","    */","   \"PATH\": {","        /**","          * serialize","         * @method serialize","         */","        serialize: function(smd, method, data) {","              var target = method.target || smd.target, i;","              if(lang.isArray(data)){","                 for(i = 0; i < data.length;i++){","                    target += '/' + data[i];","                 }","              }else{","                 for(i in data){","                    if(data.hasOwnProperty(i)) {","                       target += '/' + i + '/' + data[i];","                    }","                 }","              }","           return {","              data: '',","              target: target","           };   ","        },","        /**","          * deserialize","         * @method deserialize","         */","        deserialize: function(results) {","           return results;","        }","    },","    ","   /**","    * JSON envelope","    * @class inputEx.RPC.Envelope.JSON","    * @static","    */","   \"JSON\": {","       /**","        * serialize","        * @method serialize","        */","       serialize: function(smd, method, data) {","          return {","             data: Y.JSON.stringify(data)","          };   ","       },","        /**","        * deserialize","        * @method deserialize","        */","       deserialize: function(results) {","          return results;","       }","    },","   ","   /**","    * JSON-RPC-1.0 envelope","    * @class inputEx.RPC.Envelope.JSON-RPC-1.0","    * @static","    */","   \"JSON-RPC-1.0\":  {","       /**","        * serialize","        * @method serialize","        */","       serialize: function(smd, method, data) {","         var methodName = method.name || method._methodName;","          return {","             data: Y.JSON.stringify({","                \"id\": rpc.Service._requestId++,","                \"method\": methodName,","                \"params\": data","             })","          };   ","       },","        /**","        * deserialize","        * @method deserialize","        */","       deserialize: function(results) {","          return Y.JSON.parse(results.responseText);","       }","    },","","   /**","    * JSON-RPC-2.0 envelope","    * @class inputEx.RPC.Envelope.JSON-RPC-2.0","    * @static","    */","   \"JSON-RPC-2.0\": {","      /**","           * serialize","           * @method serialize","       */","      serialize: function(smd, method, data) {","        var methodName = method.name || method._methodName;","         return {","            data: Y.JSON.stringify({","               \"id\": rpc.Service._requestId++,","               \"method\": methodName,","               \"version\": \"json-rpc-2.0\",","               \"params\": data","            })","         };   ","      },","      /**","         * serialize","         * @method deserialize","       */","      deserialize: function(results) {","         return Y.JSON.parse(results.responseText);","      }","   }","   ","};","","","}, '@VERSION@', {\"requires\": [\"json\", \"inputex\", \"io-base\", \"inputex-jsonschema\", \"jsonp\"]});"];
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].lines = {"1":0,"6":0,"15":0,"26":0,"27":0,"28":0,"32":0,"34":0,"38":0,"39":0,"40":0,"41":0,"44":0,"45":0,"47":0,"48":0,"49":0,"53":0,"56":0,"61":0,"63":0,"75":0,"76":0,"77":0,"82":0,"83":0,"84":0,"88":0,"94":0,"96":0,"101":0,"112":0,"114":0,"115":0,"116":0,"118":0,"119":0,"120":0,"123":0,"129":0,"139":0,"140":0,"142":0,"143":0,"145":0,"146":0,"147":0,"148":0,"150":0,"151":0,"154":0,"155":0,"156":0,"163":0,"164":0,"165":0,"166":0,"167":0,"170":0,"172":0,"173":0,"174":0,"175":0,"178":0,"180":0,"181":0,"182":0,"186":0,"195":0,"196":0,"198":0,"201":0,"202":0,"203":0,"204":0,"206":0,"215":0,"218":0,"219":0,"223":0,"224":0,"225":0,"226":0,"229":0,"234":0,"235":0,"249":0,"253":0,"254":0,"255":0,"258":0,"259":0,"260":0,"261":0,"266":0,"267":0,"274":0,"284":0,"292":0,"300":0,"315":0,"339":0,"341":0,"343":0,"344":0,"355":0,"366":0,"380":0,"381":0,"382":0,"383":0,"384":0,"385":0,"386":0,"387":0,"390":0,"394":0,"403":0,"418":0,"419":0,"420":0,"421":0,"424":0,"425":0,"426":0,"430":0,"440":0,"455":0,"464":0,"479":0,"480":0,"493":0,"508":0,"509":0,"523":0};
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].functions = {"success:46":0,"failure:52":0,"onClick:42":0,"generateServiceForm:24":0,"formForMethod:72":0,"Service:112":0,"success:149":0,"failure:153":0,"func:146":0,"_generateService:137":0,"process:213":0,"success:252":0,"failure:265":0,"fetch:245":0,"\"POST\":299":0,"\"GET\":314":0,"(anonymous 2):341":0,"\"JSONP\":337":0,"\"TCP/IP\":354":0,"serialize:379":0,"deserialize:402":0,"serialize:417":0,"deserialize:439":0,"serialize:454":0,"deserialize:463":0,"serialize:478":0,"deserialize:492":0,"serialize:507":0,"deserialize:522":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].coveredLines = 135;
_yuitest_coverage["build/inputex-rpc/inputex-rpc.js"].coveredFunctions = 30;
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 1);
YUI.add('inputex-rpc', function (Y, NAME) {

/**
 * @module inputex-rpc
 */
  _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 6);
var lang = Y.Lang,
      inputEx = Y.inputEx;

/**
 * inputEx RPC utility functions
 * Implements SMD and create forms directly from services
 * @class inputEx.RPC
 * @static
 */
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 15);
inputEx.RPC = {
   
   /**
    * Build a form to run a service !
    * @method generateServiceForm
    * @static
    * @param {function} method A method created through inputEx.RPC.Service
    * @param {Object} formOpts
    */
   generateServiceForm: function(method, formOpts, callback) {
   
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "generateServiceForm", 24);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 26);
var options = null;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 27);
if(lang.isObject(formOpts) && lang.isArray(formOpts.fields) ) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 28);
options = formOpts;
      }
      // create the form directly from the method params
      else {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 32);
options = inputEx.RPC.formForMethod(method);
         // Add user options from formOpts
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 34);
Y.mix(options, formOpts, true);
      }
   
      // Add buttons to launch the service
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 38);
var methodName = method._methodName || method.name;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 39);
options.type = "form";
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 40);
if(!options.buttons) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 41);
options.buttons = [
            {type: 'submit', value: methodName, onClick: function() {
               
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "onClick", 42);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 44);
form.showMask();
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 45);
method(form.getValue(), {
                  success: function(results) {
                     _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "success", 46);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 47);
form.hideMask();
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 48);
if(lang.isObject(callback) && lang.isFunction(callback.success)) {
                        _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 49);
callback.success.call(callback.scope || this, results);
                     }
                  },
                  failure: function() {
                     _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "failure", 52);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 53);
form.hideMask();
                  }
               });
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 56);
return false; // do NOT send the browser submit event
            }}
         ];
      }
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 61);
var form = inputEx(options);
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 63);
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
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "formForMethod", 72);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 75);
var schemaIdentifierMap = {};
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 76);
var methodName = method._methodName || method.name;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 77);
schemaIdentifierMap[methodName] = {
          id: methodName,
          type:'object',
          properties:{}
      };
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 82);
for(var i = 0 ; i < method._parameters.length ; i++) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 83);
var p = method._parameters[i];
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 84);
schemaIdentifierMap[methodName].properties[p.name] = p;
      }
   
      // Use the builder to build an inputEx form from the json-schema
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 88);
var builder = new inputEx.JsonSchema.Builder({
        'schemaIdentifierMap': schemaIdentifierMap,
        'defaultOptions':{
           'showMsg':true
        }
      });
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 94);
var options = builder.schemaToInputEx(schemaIdentifierMap[methodName]);
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 96);
return options;
   }
   
};

   _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 101);
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
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 112);
inputEx.RPC.Service = function(smd, callback) {

   _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "Service", 112);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 114);
if( lang.isString(smd) ) {
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 115);
this.smdUrl = smd;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 116);
this.fetch(smd, callback);
   }
   else {_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 118);
if( lang.isObject(smd) ) {
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 119);
this._smd = smd;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 120);
this.process(callback);
   }
   else {
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 123);
throw new Error("smd should be an object or an url");
   }}
   
};


_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 129);
inputEx.RPC.Service.prototype = {
   
   /**
    * Generate the function from a service definition
    * @method _generateService
    * @param {String} serviceName
    * @param {Method definition} method
    */
   _generateService: function(serviceName, method) {
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "_generateService", 137);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 139);
if(this[method]){
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 140);
throw new Error("WARNING: "+ serviceName+ " already exists for service. Unable to generate function");
      }
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 142);
method.name = serviceName;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 143);
method._methodName = serviceName;
   
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 145);
var self = this;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 146);
var func = function(data, opts) {
         _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "func", 146);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 147);
var envelope = rpc.Envelope[method.envelope || self._smd.envelope];
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 148);
var callback = {
            success: function(o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "success", 149);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 150);
var results = envelope.deserialize(o);
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 151);
opts.success.call(opts.scope || self, results);
            },
            failure: function(o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "failure", 153);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 154);
if(lang.isFunction(opts.failure) ) {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 155);
var results = envelope.deserialize(o);
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 156);
opts.failure.call(opts.scope || self, results);
               }
            },
            scope: self
         };
         
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 163);
var params = {};
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 164);
if(self._smd.additionalParameters && lang.isArray(self._smd.parameters) ) {
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 165);
for(var i = 0 ; i < self._smd.parameters.length ; i++) {
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 166);
var p = self._smd.parameters[i];
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 167);
params[p.name] = p["default"];
            }
         }
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 170);
Y.mix(params, data, true);
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 172);
var url = method.target || self._smd.target;
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 173);
var urlRegexp = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/i;
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 174);
if(!url.match(urlRegexp) && url != self._smd.target) {
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 175);
url = self._smd.target+url;
         }
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 178);
if( !!this.smdUrl && !url.match(urlRegexp) ) {
            // URL is still relative !
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 180);
var a=this.smdUrl.split('/');
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 181);
a[a.length-1]="";
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 182);
url = a.join("/")+url;
         }
         
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 186);
var r = {
            target: url,
            callback: callback,
            data: params,
            origData: data,
            opts: opts,
            callbackParamName: method.callbackParamName || self._smd.callbackParamName,
            transport: method.transport || self._smd.transport
         };
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 195);
var serialized = envelope.serialize(self._smd, method, params);
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 196);
Y.mix(r, serialized, true);
         
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 198);
rpc.Transport[r.transport].call(self, r ); 
      };
      
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 201);
func.name = serviceName;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 202);
func._methodName = serviceName;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 203);
func.description = method.description;
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 204);
func._parameters = method.parameters;
      
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 206);
return func;
   },
   
   /**
    * Process the SMD definition
    * @method process
    */
   process: function(callback) {
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "process", 213);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 215);
var serviceDefs = this._smd.services;
      
      // Generate the methods to this object
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 218);
for(var serviceName in serviceDefs){
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 219);
if( serviceDefs.hasOwnProperty(serviceName) ) {
            
            // Get the object that will contain the method.
            // handles "namespaced" services by breaking apart by '.'
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 223);
var current = this;
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 224);
var pieces = serviceName.split("."); 
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 225);
for(var i=0; i< pieces.length-1; i++){
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 226);
current = current[pieces[i]] || (current[pieces[i]] = {});
            }
            
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 229);
current[pieces[pieces.length-1]] =   this._generateService(serviceName, serviceDefs[serviceName]);
         }
      }
      
      // call the success handler
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 234);
if(lang.isObject(callback) && lang.isFunction(callback.success)) {
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 235);
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
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "fetch", 245);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 249);
var cfg = {
         method: 'GET',
         on: {
            success: function(req,o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "success", 252);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 253);
try {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 254);
this._smd = Y.JSON.parse(o.responseText);
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 255);
this.process(callback);
               }
               catch(ex) {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 258);
if(lang.isObject(console) && lang.isFunction(console.log))
                     {_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 259);
console.log(ex);}
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 260);
if( lang.isFunction(callback.failure) ) {
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 261);
callback.failure.call(callback.scope || this, {error: ex});
                  }
               }
            }, 
            failure: function(req,o) {
               _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "failure", 265);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 266);
if( lang.isFunction(callback.failure) ) {
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 267);
callback.failure.call(callback.scope || this, {error: "unable to fetch url "+url});
               }
            }
         },
         context: this
      };
      
      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 274);
Y.io(url, cfg);
      
   }
   
    
};




_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 284);
inputEx.RPC.Service._requestId = 1;


/**
 * inputEx.RPC.Transport
 * @class inputEx.RPC.Transport
 * @static
 */
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 292);
inputEx.RPC.Transport = {
   
   /**
    * Build a ajax request using 'POST' method
    * @method POST
    * @param {Object} r Object specifying target, callback and data attributes
    */
   "POST": function(r) {
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"POST\"", 299);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 300);
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
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"GET\"", 314);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 315);
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
      
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"JSONP\"", 337);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 339);
var url =  r.target + ((r.target.indexOf("?") == -1) ? '?' : '&') + r.data + "&"+r.callbackParamName+"={callback}";

      _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 341);
Y.jsonp(url, function (response) {
          
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "(anonymous 2)", 341);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 343);
if(lang.isObject(r.callback) && lang.isFunction(r.callback.success)) {
             _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 344);
r.callback.success.call(r.callback.scope || this, response);
          }
          
      });
   },
   
   /**
    * NOT implemented
    * @method TCP/IP
    */
   "TCP/IP": function(r) {
      _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "\"TCP/IP\"", 354);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 355);
throw new Error("TCP/IP transport not implemented !");
   }
   
};


/**
 * inputEx.RPC.Envelope
 * @class inputEx.RPC.Envelope
 * @static
 */
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 366);
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
            _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 379);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 380);
var eURI = encodeURIComponent;
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 381);
var params = [];
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 382);
for(var name in data){
               _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 383);
if(data.hasOwnProperty(name)){
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 384);
var value = data[name];
                  _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 385);
if(lang.isArray(value)){
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 386);
for(var i=0; i < value.length; i++){
                        _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 387);
params.push(eURI(name)+"="+eURI(value[i]));
                     }
                  }else{
                     _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 390);
params.push(eURI(name)+"="+eURI(value));
                  }
               }
            }
            _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 394);
return {
               data: params.join("&")
            };   
         },
         /**
          * Deserialize
           * @method deserialize
          */
         deserialize: function(results) {
            _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 402);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 403);
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
              _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 417);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 418);
var target = method.target || smd.target, i;
              _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 419);
if(lang.isArray(data)){
                 _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 420);
for(i = 0; i < data.length;i++){
                    _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 421);
target += '/' + data[i];
                 }
              }else{
                 _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 424);
for(i in data){
                    _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 425);
if(data.hasOwnProperty(i)) {
                       _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 426);
target += '/' + i + '/' + data[i];
                    }
                 }
              }
           _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 430);
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
           _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 439);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 440);
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
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 454);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 455);
return {
             data: Y.JSON.stringify(data)
          };   
       },
        /**
        * deserialize
        * @method deserialize
        */
       deserialize: function(results) {
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 463);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 464);
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
         _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 478);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 479);
var methodName = method.name || method._methodName;
          _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 480);
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
          _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 492);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 493);
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
        _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "serialize", 507);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 508);
var methodName = method.name || method._methodName;
         _yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 509);
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
         _yuitest_coverfunc("build/inputex-rpc/inputex-rpc.js", "deserialize", 522);
_yuitest_coverline("build/inputex-rpc/inputex-rpc.js", 523);
return Y.JSON.parse(results.responseText);
      }
   }
   
};


}, '@VERSION@', {"requires": ["json", "inputex", "io-base", "inputex-jsonschema", "jsonp"]});
