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
_yuitest_coverage["build/inputex-map/inputex-map.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-map/inputex-map.js",
    code: []
};
_yuitest_coverage["build/inputex-map/inputex-map.js"].code=["YUI.add('inputex-map', function (Y, NAME) {","","","/**"," * @module inputex-map"," */","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    inputEx.MapFieldGlobals = {","        yahoo_preloader_error: 1,","","        lat: 43.648565,","        lon: -79.385329,","        uzoom: -13,","        api: 'google',","        api_key: ''","    };","","    /**","     * Wrapper for Google Maps APIs","     * @class inputEx.MapField","     * @extends inputEx.Field","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *    <li>lat</li>","     *    <li>lon</li>","     *    <li>uzoom</li>","     * </ul>","     */","    inputEx.MapField = function (options) {","        inputEx.MapField.superclass.constructor.call(this, options);","    };","","    Y.extend(inputEx.MapField, inputEx.Field, {","       ","       /**","        * @method setOptions","        */","        setOptions: function (options) {","            inputEx.MapField.superclass.setOptions.call(this, options);","            this.options.className = options.className || 'inputEx-Field inputEx-MapField';","","            this.options.width = options.width || '400px';","            this.options.height = options.height || '400px';","            this.options.loading = options.loading || 'loading....';","","            this.options.lat = options.lat || inputEx.MapFieldGlobals.lat;","            this.options.lon = options.lon || inputEx.MapFieldGlobals.lon;","            this.options.uzoom = options.uzoom || inputEx.MapFieldGlobals.uzoom;","            this.options.api = options.api || inputEx.MapFieldGlobals.api;","            this.options.api_key = options.api_key || inputEx.MapFieldGlobals.api_key;","            this.options.mapType = options.mapType || inputEx.MapFieldGlobals.mapType;","","        },","","        /**","         * Render the field using the appropriate mapping function","         * @method renderComponent","         */","        renderComponent: function () {","            if (!inputEx.MapFieldsNumber) {","                inputEx.MapFieldsNumber = 0;","            } else {","                inputEx.MapFieldsNumber++;","            }","","            this.options.api = \"google\";","","            var id = \"inputEx-MapField-\" + inputEx.MapFieldsNumber;","            var idWrapper = \"inputEx-MapFieldWrapper-\" + inputEx.MapFieldsNumber;","            var idLat = \"inputEx-MapFieldLat-\" + inputEx.MapFieldsNumber;","            var idLon = \"inputEx-MapFieldLon-\" + inputEx.MapFieldsNumber;","            var idZoom = \"inputEx-MapFieldUZoom-\" + inputEx.MapFieldsNumber;","            ","            this.elWrapper = inputEx.cn('div', {","                id: idWrapper,","                style: \"width: \" + this.options.width + \"; height: \" + this.options.height","            },","            null,","            null);","            this.fieldContainer.appendChild(this.elWrapper);","","            this.el = inputEx.cn('div', {","                id: id,","                style: \"position: relative; width: \" + this.options.width + \"; height: \" + this.options.height","            },","            null,","            this.options.loading);","            this.elWrapper.appendChild(this.el);","","            this.elLat = inputEx.cn('input', {","                id: idLat,","                type: \"hidden\",","                value: this.options.lat","            });","            this.fieldContainer.appendChild(this.elLat);","","            this.elLon = inputEx.cn('input', {","                id: idLon,","                type: \"hidden\",","                value: this.options.lon","            });","            this.fieldContainer.appendChild(this.elLon);","","            this.elZoom = inputEx.cn('input', {","                id: idZoom,","                type: \"hidden\",","                value: this.options.uzoom","            });","            this.fieldContainer.appendChild(this.elZoom);","","            // map creation","            var mapOptions = {","                center: new google.maps.LatLng(this.options.lat, this.options.lon),","                zoom: this.options.uzoom,","                mapTypeId: google.maps.MapTypeId[this.options.mapType]","            };","            this.map = new google.maps.Map(this.el, mapOptions);","","        },","        ","        /**","          * @method initEvents","          */","        initEvents: function () {","            var that = this;","","            // on click we instanciate a marker with the data related to the click position","            google.maps.event.addListener(this.map, \"click\", function (e) {","                that.setValue({","                    lat: e.latLng.Xa,","                    lon: e.latLng.Ya,","                    uzoom: that.map.getZoom()","                });","","                // in this example only one marker is allowed","                if (this.marker) {","                    this.marker.setPosition(e.latLng);","                } else {","                    this.marker = new google.maps.Marker({","                        position: e.latLng,","                        map: that.map,","                        title: 'Hello World!'","                    });","                }","","            });","        },","        ","        /**","          * @method setValue","          */","        setValue: function (value) {","","            if (value.uzoom) {","                this.elZoom.value = value.uzoom;","            }","","            if (value.lat) {","                this.elLat.value = value.lat;","            }","","            if (value.lon) {","                this.elLon.value = value.lon;","            }","        },","        /**","          * @method getValue","          */","        getValue: function () {","            if (!this.elLat) return {};","            return {","                lat: this.elLat.value,","                lon: this.elLon.value,","                uzoom: this.elZoom.value","            };","        }","    });","","    // Register this class as \"map\" type","    inputEx.registerType(\"map\", inputEx.MapField);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"map\"});"];
_yuitest_coverage["build/inputex-map/inputex-map.js"].lines = {"1":0,"7":0,"10":0,"32":0,"33":0,"36":0,"42":0,"43":0,"45":0,"46":0,"47":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"63":0,"64":0,"66":0,"69":0,"71":0,"72":0,"73":0,"74":0,"75":0,"77":0,"83":0,"85":0,"91":0,"93":0,"98":0,"100":0,"105":0,"107":0,"112":0,"115":0,"120":0,"128":0,"131":0,"132":0,"139":0,"140":0,"142":0,"157":0,"158":0,"161":0,"162":0,"165":0,"166":0,"173":0,"174":0,"183":0};
_yuitest_coverage["build/inputex-map/inputex-map.js"].functions = {"MapField:32":0,"setOptions:41":0,"renderComponent:62":0,"(anonymous 2):131":0,"initEvents:127":0,"setValue:155":0,"getValue:172":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-map/inputex-map.js"].coveredLines = 53;
_yuitest_coverage["build/inputex-map/inputex-map.js"].coveredFunctions = 8;
_yuitest_coverline("build/inputex-map/inputex-map.js", 1);
YUI.add('inputex-map', function (Y, NAME) {


/**
 * @module inputex-map
 */
    _yuitest_coverfunc("build/inputex-map/inputex-map.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-map/inputex-map.js", 7);
var lang = Y.Lang,
        inputEx = Y.inputEx;

    _yuitest_coverline("build/inputex-map/inputex-map.js", 10);
inputEx.MapFieldGlobals = {
        yahoo_preloader_error: 1,

        lat: 43.648565,
        lon: -79.385329,
        uzoom: -13,
        api: 'google',
        api_key: ''
    };

    /**
     * Wrapper for Google Maps APIs
     * @class inputEx.MapField
     * @extends inputEx.Field
     * @constructor
     * @param {Object} options Added options:
     * <ul>
     *    <li>lat</li>
     *    <li>lon</li>
     *    <li>uzoom</li>
     * </ul>
     */
    _yuitest_coverline("build/inputex-map/inputex-map.js", 32);
inputEx.MapField = function (options) {
        _yuitest_coverfunc("build/inputex-map/inputex-map.js", "MapField", 32);
_yuitest_coverline("build/inputex-map/inputex-map.js", 33);
inputEx.MapField.superclass.constructor.call(this, options);
    };

    _yuitest_coverline("build/inputex-map/inputex-map.js", 36);
Y.extend(inputEx.MapField, inputEx.Field, {
       
       /**
        * @method setOptions
        */
        setOptions: function (options) {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "setOptions", 41);
_yuitest_coverline("build/inputex-map/inputex-map.js", 42);
inputEx.MapField.superclass.setOptions.call(this, options);
            _yuitest_coverline("build/inputex-map/inputex-map.js", 43);
this.options.className = options.className || 'inputEx-Field inputEx-MapField';

            _yuitest_coverline("build/inputex-map/inputex-map.js", 45);
this.options.width = options.width || '400px';
            _yuitest_coverline("build/inputex-map/inputex-map.js", 46);
this.options.height = options.height || '400px';
            _yuitest_coverline("build/inputex-map/inputex-map.js", 47);
this.options.loading = options.loading || 'loading....';

            _yuitest_coverline("build/inputex-map/inputex-map.js", 49);
this.options.lat = options.lat || inputEx.MapFieldGlobals.lat;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 50);
this.options.lon = options.lon || inputEx.MapFieldGlobals.lon;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 51);
this.options.uzoom = options.uzoom || inputEx.MapFieldGlobals.uzoom;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 52);
this.options.api = options.api || inputEx.MapFieldGlobals.api;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 53);
this.options.api_key = options.api_key || inputEx.MapFieldGlobals.api_key;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 54);
this.options.mapType = options.mapType || inputEx.MapFieldGlobals.mapType;

        },

        /**
         * Render the field using the appropriate mapping function
         * @method renderComponent
         */
        renderComponent: function () {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "renderComponent", 62);
_yuitest_coverline("build/inputex-map/inputex-map.js", 63);
if (!inputEx.MapFieldsNumber) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 64);
inputEx.MapFieldsNumber = 0;
            } else {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 66);
inputEx.MapFieldsNumber++;
            }

            _yuitest_coverline("build/inputex-map/inputex-map.js", 69);
this.options.api = "google";

            _yuitest_coverline("build/inputex-map/inputex-map.js", 71);
var id = "inputEx-MapField-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 72);
var idWrapper = "inputEx-MapFieldWrapper-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 73);
var idLat = "inputEx-MapFieldLat-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 74);
var idLon = "inputEx-MapFieldLon-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 75);
var idZoom = "inputEx-MapFieldUZoom-" + inputEx.MapFieldsNumber;
            
            _yuitest_coverline("build/inputex-map/inputex-map.js", 77);
this.elWrapper = inputEx.cn('div', {
                id: idWrapper,
                style: "width: " + this.options.width + "; height: " + this.options.height
            },
            null,
            null);
            _yuitest_coverline("build/inputex-map/inputex-map.js", 83);
this.fieldContainer.appendChild(this.elWrapper);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 85);
this.el = inputEx.cn('div', {
                id: id,
                style: "position: relative; width: " + this.options.width + "; height: " + this.options.height
            },
            null,
            this.options.loading);
            _yuitest_coverline("build/inputex-map/inputex-map.js", 91);
this.elWrapper.appendChild(this.el);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 93);
this.elLat = inputEx.cn('input', {
                id: idLat,
                type: "hidden",
                value: this.options.lat
            });
            _yuitest_coverline("build/inputex-map/inputex-map.js", 98);
this.fieldContainer.appendChild(this.elLat);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 100);
this.elLon = inputEx.cn('input', {
                id: idLon,
                type: "hidden",
                value: this.options.lon
            });
            _yuitest_coverline("build/inputex-map/inputex-map.js", 105);
this.fieldContainer.appendChild(this.elLon);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 107);
this.elZoom = inputEx.cn('input', {
                id: idZoom,
                type: "hidden",
                value: this.options.uzoom
            });
            _yuitest_coverline("build/inputex-map/inputex-map.js", 112);
this.fieldContainer.appendChild(this.elZoom);

            // map creation
            _yuitest_coverline("build/inputex-map/inputex-map.js", 115);
var mapOptions = {
                center: new google.maps.LatLng(this.options.lat, this.options.lon),
                zoom: this.options.uzoom,
                mapTypeId: google.maps.MapTypeId[this.options.mapType]
            };
            _yuitest_coverline("build/inputex-map/inputex-map.js", 120);
this.map = new google.maps.Map(this.el, mapOptions);

        },
        
        /**
          * @method initEvents
          */
        initEvents: function () {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "initEvents", 127);
_yuitest_coverline("build/inputex-map/inputex-map.js", 128);
var that = this;

            // on click we instanciate a marker with the data related to the click position
            _yuitest_coverline("build/inputex-map/inputex-map.js", 131);
google.maps.event.addListener(this.map, "click", function (e) {
                _yuitest_coverfunc("build/inputex-map/inputex-map.js", "(anonymous 2)", 131);
_yuitest_coverline("build/inputex-map/inputex-map.js", 132);
that.setValue({
                    lat: e.latLng.Xa,
                    lon: e.latLng.Ya,
                    uzoom: that.map.getZoom()
                });

                // in this example only one marker is allowed
                _yuitest_coverline("build/inputex-map/inputex-map.js", 139);
if (this.marker) {
                    _yuitest_coverline("build/inputex-map/inputex-map.js", 140);
this.marker.setPosition(e.latLng);
                } else {
                    _yuitest_coverline("build/inputex-map/inputex-map.js", 142);
this.marker = new google.maps.Marker({
                        position: e.latLng,
                        map: that.map,
                        title: 'Hello World!'
                    });
                }

            });
        },
        
        /**
          * @method setValue
          */
        setValue: function (value) {

            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "setValue", 155);
_yuitest_coverline("build/inputex-map/inputex-map.js", 157);
if (value.uzoom) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 158);
this.elZoom.value = value.uzoom;
            }

            _yuitest_coverline("build/inputex-map/inputex-map.js", 161);
if (value.lat) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 162);
this.elLat.value = value.lat;
            }

            _yuitest_coverline("build/inputex-map/inputex-map.js", 165);
if (value.lon) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 166);
this.elLon.value = value.lon;
            }
        },
        /**
          * @method getValue
          */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "getValue", 172);
_yuitest_coverline("build/inputex-map/inputex-map.js", 173);
if (!this.elLat) {return {};}
            _yuitest_coverline("build/inputex-map/inputex-map.js", 174);
return {
                lat: this.elLat.value,
                lon: this.elLon.value,
                uzoom: this.elZoom.value
            };
        }
    });

    // Register this class as "map" type
    _yuitest_coverline("build/inputex-map/inputex-map.js", 183);
inputEx.registerType("map", inputEx.MapField);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "map"});
