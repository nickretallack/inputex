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
_yuitest_coverage["build/inputex-map/inputex-map.js"].code=["YUI.add('inputex-map', function (Y, NAME) {","","","/**"," * @module inputex-map"," */","","YUI.add(\"inputex-map\", function (Y) {","","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    inputEx.MapFieldGlobals = {","        yahoo_preloader_error: 1,","","        lat: 43.648565,","        lon: -79.385329,","        uzoom: -13,","        api: 'google',","        api_key: ''","    };","","    /**","     * Wrapper for Google Maps APIs","     * @class inputEx.MapField","     * @extends inputEx.Field","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *    <li>lat</li>","     *    <li>lon</li>","     *    <li>uzoom</li>","     * </ul>","     */","    inputEx.MapField = function (options) {","        inputEx.MapField.superclass.constructor.call(this, options);","    };","","    Y.extend(inputEx.MapField, inputEx.Field, {","       ","       /**","        * @method setOptions","        */","        setOptions: function (options) {","            inputEx.MapField.superclass.setOptions.call(this, options);","            this.options.className = options.className || 'inputEx-Field inputEx-MapField';","","            this.options.width = options.width || '400px';","            this.options.height = options.height || '400px';","            this.options.loading = options.loading || 'loading....';","","            this.options.lat = options.lat || inputEx.MapFieldGlobals.lat;","            this.options.lon = options.lon || inputEx.MapFieldGlobals.lon;","            this.options.uzoom = options.uzoom || inputEx.MapFieldGlobals.uzoom;","            this.options.api = options.api || inputEx.MapFieldGlobals.api;","            this.options.api_key = options.api_key || inputEx.MapFieldGlobals.api_key;","            this.options.mapType = options.mapType || inputEx.MapFieldGlobals.mapType;","","        },","","        /**","         * Render the field using the appropriate mapping function","         * @method renderComponent","         */","        renderComponent: function () {","            if (!inputEx.MapFieldsNumber) {","                inputEx.MapFieldsNumber = 0;","            } else {","                inputEx.MapFieldsNumber++;","            }","","            this.options.api = \"google\";","","            var id = \"inputEx-MapField-\" + inputEx.MapFieldsNumber;","            var idWrapper = \"inputEx-MapFieldWrapper-\" + inputEx.MapFieldsNumber;","            var idLat = \"inputEx-MapFieldLat-\" + inputEx.MapFieldsNumber;","            var idLon = \"inputEx-MapFieldLon-\" + inputEx.MapFieldsNumber;","            var idZoom = \"inputEx-MapFieldUZoom-\" + inputEx.MapFieldsNumber;","            ","            this.elWrapper = inputEx.cn('div', {","                id: idWrapper,","                style: \"width: \" + this.options.width + \"; height: \" + this.options.height","            },","            null,","            null);","            this.fieldContainer.appendChild(this.elWrapper);","","            this.el = inputEx.cn('div', {","                id: id,","                style: \"position: relative; width: \" + this.options.width + \"; height: \" + this.options.height","            },","            null,","            this.options.loading);","            this.elWrapper.appendChild(this.el);","","            this.elLat = inputEx.cn('input', {","                id: idLat,","                type: \"hidden\",","                value: this.options.lat","            });","            this.fieldContainer.appendChild(this.elLat);","","            this.elLon = inputEx.cn('input', {","                id: idLon,","                type: \"hidden\",","                value: this.options.lon","            });","            this.fieldContainer.appendChild(this.elLon);","","            this.elZoom = inputEx.cn('input', {","                id: idZoom,","                type: \"hidden\",","                value: this.options.uzoom","            });","            this.fieldContainer.appendChild(this.elZoom);","","            // map creation","            var mapOptions = {","                center: new google.maps.LatLng(this.options.lat, this.options.lon),","                zoom: this.options.uzoom,","                mapTypeId: google.maps.MapTypeId[this.options.mapType]","            };","            this.map = new google.maps.Map(this.el, mapOptions);","","        },","        ","        /**","          * @method initEvents","          */","        initEvents: function () {","            var that = this;","","            // on click we instanciate a marker with the data related to the click position","            google.maps.event.addListener(this.map, \"click\", function (e) {","                that.setValue({","                    lat: e.latLng.Xa,","                    lon: e.latLng.Ya,","                    uzoom: that.map.getZoom()","                });","","                // in this example only one marker is allowed","                if (this.marker) {","                    this.marker.setPosition(e.latLng);","                } else {","                    this.marker = new google.maps.Marker({","                        position: e.latLng,","                        map: that.map,","                        title: 'Hello World!'","                    });","                }","","            });","        },","        ","        /**","          * @method setValue","          */","        setValue: function (value) {","","            if (value.uzoom) {","                this.elZoom.value = value.uzoom;","            }","","            if (value.lat) {","                this.elLat.value = value.lat;","            }","","            if (value.lon) {","                this.elLon.value = value.lon;","            }","        },","        /**","          * @method getValue","          */","        getValue: function () {","            if (!this.elLat) return {};","            return {","                lat: this.elLat.value,","                lon: this.elLon.value,","                uzoom: this.elZoom.value","            };","        }","    });","","    // Register this class as \"map\" type","    inputEx.registerType(\"map\", inputEx.MapField);","","}, '3.1.0', {","    requires: ['inputex-field']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-map/inputex-map.js"].lines = {"1":0,"8":0,"10":0,"13":0,"35":0,"36":0,"39":0,"45":0,"46":0,"48":0,"49":0,"50":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"66":0,"67":0,"69":0,"72":0,"74":0,"75":0,"76":0,"77":0,"78":0,"80":0,"86":0,"88":0,"94":0,"96":0,"101":0,"103":0,"108":0,"110":0,"115":0,"118":0,"123":0,"131":0,"134":0,"135":0,"142":0,"143":0,"145":0,"160":0,"161":0,"164":0,"165":0,"168":0,"169":0,"176":0,"177":0,"186":0};
_yuitest_coverage["build/inputex-map/inputex-map.js"].functions = {"MapField:35":0,"setOptions:44":0,"renderComponent:65":0,"(anonymous 3):134":0,"initEvents:130":0,"setValue:158":0,"getValue:175":0,"(anonymous 2):8":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-map/inputex-map.js"].coveredLines = 54;
_yuitest_coverage["build/inputex-map/inputex-map.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-map/inputex-map.js", 1);
YUI.add('inputex-map', function (Y, NAME) {


/**
 * @module inputex-map
 */

_yuitest_coverfunc("build/inputex-map/inputex-map.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-map/inputex-map.js", 8);
YUI.add("inputex-map", function (Y) {

    _yuitest_coverfunc("build/inputex-map/inputex-map.js", "(anonymous 2)", 8);
_yuitest_coverline("build/inputex-map/inputex-map.js", 10);
var lang = Y.Lang,
        inputEx = Y.inputEx;

    _yuitest_coverline("build/inputex-map/inputex-map.js", 13);
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
    _yuitest_coverline("build/inputex-map/inputex-map.js", 35);
inputEx.MapField = function (options) {
        _yuitest_coverfunc("build/inputex-map/inputex-map.js", "MapField", 35);
_yuitest_coverline("build/inputex-map/inputex-map.js", 36);
inputEx.MapField.superclass.constructor.call(this, options);
    };

    _yuitest_coverline("build/inputex-map/inputex-map.js", 39);
Y.extend(inputEx.MapField, inputEx.Field, {
       
       /**
        * @method setOptions
        */
        setOptions: function (options) {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "setOptions", 44);
_yuitest_coverline("build/inputex-map/inputex-map.js", 45);
inputEx.MapField.superclass.setOptions.call(this, options);
            _yuitest_coverline("build/inputex-map/inputex-map.js", 46);
this.options.className = options.className || 'inputEx-Field inputEx-MapField';

            _yuitest_coverline("build/inputex-map/inputex-map.js", 48);
this.options.width = options.width || '400px';
            _yuitest_coverline("build/inputex-map/inputex-map.js", 49);
this.options.height = options.height || '400px';
            _yuitest_coverline("build/inputex-map/inputex-map.js", 50);
this.options.loading = options.loading || 'loading....';

            _yuitest_coverline("build/inputex-map/inputex-map.js", 52);
this.options.lat = options.lat || inputEx.MapFieldGlobals.lat;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 53);
this.options.lon = options.lon || inputEx.MapFieldGlobals.lon;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 54);
this.options.uzoom = options.uzoom || inputEx.MapFieldGlobals.uzoom;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 55);
this.options.api = options.api || inputEx.MapFieldGlobals.api;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 56);
this.options.api_key = options.api_key || inputEx.MapFieldGlobals.api_key;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 57);
this.options.mapType = options.mapType || inputEx.MapFieldGlobals.mapType;

        },

        /**
         * Render the field using the appropriate mapping function
         * @method renderComponent
         */
        renderComponent: function () {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "renderComponent", 65);
_yuitest_coverline("build/inputex-map/inputex-map.js", 66);
if (!inputEx.MapFieldsNumber) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 67);
inputEx.MapFieldsNumber = 0;
            } else {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 69);
inputEx.MapFieldsNumber++;
            }

            _yuitest_coverline("build/inputex-map/inputex-map.js", 72);
this.options.api = "google";

            _yuitest_coverline("build/inputex-map/inputex-map.js", 74);
var id = "inputEx-MapField-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 75);
var idWrapper = "inputEx-MapFieldWrapper-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 76);
var idLat = "inputEx-MapFieldLat-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 77);
var idLon = "inputEx-MapFieldLon-" + inputEx.MapFieldsNumber;
            _yuitest_coverline("build/inputex-map/inputex-map.js", 78);
var idZoom = "inputEx-MapFieldUZoom-" + inputEx.MapFieldsNumber;
            
            _yuitest_coverline("build/inputex-map/inputex-map.js", 80);
this.elWrapper = inputEx.cn('div', {
                id: idWrapper,
                style: "width: " + this.options.width + "; height: " + this.options.height
            },
            null,
            null);
            _yuitest_coverline("build/inputex-map/inputex-map.js", 86);
this.fieldContainer.appendChild(this.elWrapper);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 88);
this.el = inputEx.cn('div', {
                id: id,
                style: "position: relative; width: " + this.options.width + "; height: " + this.options.height
            },
            null,
            this.options.loading);
            _yuitest_coverline("build/inputex-map/inputex-map.js", 94);
this.elWrapper.appendChild(this.el);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 96);
this.elLat = inputEx.cn('input', {
                id: idLat,
                type: "hidden",
                value: this.options.lat
            });
            _yuitest_coverline("build/inputex-map/inputex-map.js", 101);
this.fieldContainer.appendChild(this.elLat);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 103);
this.elLon = inputEx.cn('input', {
                id: idLon,
                type: "hidden",
                value: this.options.lon
            });
            _yuitest_coverline("build/inputex-map/inputex-map.js", 108);
this.fieldContainer.appendChild(this.elLon);

            _yuitest_coverline("build/inputex-map/inputex-map.js", 110);
this.elZoom = inputEx.cn('input', {
                id: idZoom,
                type: "hidden",
                value: this.options.uzoom
            });
            _yuitest_coverline("build/inputex-map/inputex-map.js", 115);
this.fieldContainer.appendChild(this.elZoom);

            // map creation
            _yuitest_coverline("build/inputex-map/inputex-map.js", 118);
var mapOptions = {
                center: new google.maps.LatLng(this.options.lat, this.options.lon),
                zoom: this.options.uzoom,
                mapTypeId: google.maps.MapTypeId[this.options.mapType]
            };
            _yuitest_coverline("build/inputex-map/inputex-map.js", 123);
this.map = new google.maps.Map(this.el, mapOptions);

        },
        
        /**
          * @method initEvents
          */
        initEvents: function () {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "initEvents", 130);
_yuitest_coverline("build/inputex-map/inputex-map.js", 131);
var that = this;

            // on click we instanciate a marker with the data related to the click position
            _yuitest_coverline("build/inputex-map/inputex-map.js", 134);
google.maps.event.addListener(this.map, "click", function (e) {
                _yuitest_coverfunc("build/inputex-map/inputex-map.js", "(anonymous 3)", 134);
_yuitest_coverline("build/inputex-map/inputex-map.js", 135);
that.setValue({
                    lat: e.latLng.Xa,
                    lon: e.latLng.Ya,
                    uzoom: that.map.getZoom()
                });

                // in this example only one marker is allowed
                _yuitest_coverline("build/inputex-map/inputex-map.js", 142);
if (this.marker) {
                    _yuitest_coverline("build/inputex-map/inputex-map.js", 143);
this.marker.setPosition(e.latLng);
                } else {
                    _yuitest_coverline("build/inputex-map/inputex-map.js", 145);
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

            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "setValue", 158);
_yuitest_coverline("build/inputex-map/inputex-map.js", 160);
if (value.uzoom) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 161);
this.elZoom.value = value.uzoom;
            }

            _yuitest_coverline("build/inputex-map/inputex-map.js", 164);
if (value.lat) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 165);
this.elLat.value = value.lat;
            }

            _yuitest_coverline("build/inputex-map/inputex-map.js", 168);
if (value.lon) {
                _yuitest_coverline("build/inputex-map/inputex-map.js", 169);
this.elLon.value = value.lon;
            }
        },
        /**
          * @method getValue
          */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-map/inputex-map.js", "getValue", 175);
_yuitest_coverline("build/inputex-map/inputex-map.js", 176);
if (!this.elLat) {return {};}
            _yuitest_coverline("build/inputex-map/inputex-map.js", 177);
return {
                lat: this.elLat.value,
                lon: this.elLon.value,
                uzoom: this.elZoom.value
            };
        }
    });

    // Register this class as "map" type
    _yuitest_coverline("build/inputex-map/inputex-map.js", 186);
inputEx.registerType("map", inputEx.MapField);

}, '3.1.0', {
    requires: ['inputex-field']
});


}, '@VERSION@');
