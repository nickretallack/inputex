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
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js",
    code: []
};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","Y.Plugin.CalendarNavigationPlugin = Y.Base.create(\"calendarNavigationPlugin\", Y.Plugin.Base, [], {","","    initializer : function(){","        this.get(\"host\").get(\"boundingBox\").delegate(\"click\", Y.bind(this.onHeaderClick, this), \".yui3-calendar-header-label\");","        console.log(\"initializer\",'debug',\"calendarNavigationPlugin\");","    },","    /**","         * Prepare the panel","         *","         * @method onHeaderClick","         */","        onHeaderClick: function () {","            console.log(\"onHeaderClick\",'debug',\"calendarNavigationPlugin\");","","            var strings = this.get(\"string\"),","                calendarContentBox;","","                if(!this.panel){","                    this.panel_container = Y.Node.create('<div class=\"yui3-calendar-navplugin-widget\"></div>');","                    this.panel_container.setStyle(\"border\", \"5px solid green\");","                    calendarContentBox = this.get(\"host\").get(\"contentBox\");","                    calendarContentBox.append(this.panel_container);","                    //Y.one('body').append(this.panel_container);","","                    this.panel_container.append(Y.Node.create('<div class=\"yui3-widget-bd\">' + this.template + '</div>'));","","                    this.panel = new Y.Panel({","                        headerContent : \"header\",","                        footerContent : \"footer\",","                        //bodyContent : \"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",// this.template, //\"\",","                        srcNode : this.panel_container, // this.get(\"host\").get(\"contentBox\"),","                        visible : false,","                        centered: calendarContentBox,","                        modal: true","                    });","                    ","                    this.panel.render();","                     this.panel.set(\"maskNode\",this.panel_container);","","                    Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","                    //Y.one(\".yui3-widget-bd\").append(this.template);","                ","                    //console.log(Y.one(\".yui3-widget-bd\"), 'Y.one(\".yui3-widget-bd\")');","                    //console.log(this.template, 'this.template');","","                }","            ","","","            //     var field5 = new Y.inputEx.Group({parentEl: Y.one(\".yui3-widget-bd\"),","            //         fields: [{","            //             type: \"select\",","            //             name : \"month\",","            //             label: strings.month,","            //             choices: this._prepareMonthsData()","            //         }, {","            //             className : \"select-year\",","            //             name : \"year\",","            //             label: strings.year,","            //             required : true,","            //             showMsg : true,","            //             regexp : /^[0-9]{4}$/,","            //             value : this.get(\"host\").get(\"date\").getFullYear()","            //         }]","            // });","","","            ","                this.panel.show();","","        },","        _prepareMonthsData : function(){","            var i = 0,","                month,","                listOfMonths = this.get(\"string\").monthsList;","            var monthsField = this.monthsField = [];","            ","            for(i = 0 ; i<12 ; i++){","                month = listOfMonths[i];","                monthsField.push({","                    label : month,","                    value : i","                });","            }","            return monthsField;","        },","        template : '<div id=\"nav-form-id\">'+","                        '<div>'+","                            '<label for=\"{nav-select-id}\"></label>'+","                            '<select id=\"{nav-select-id}\" ></select>'+","                        '</div>'+","                        '<div>'+","                            '<label for=\"{nav-year-id}\"></label>'+","                            '<input id=\"{nav-year-id}\"></input>'+","                        '</div>'+","                    '</div>'","}, {","    ATTRS : {","        /**","             * I18N","             *","             * @attribute string","             * @type Object","             */","            string: {","                valueFn: function () {","                    return Y.Intl.get(\"inputex-calendarNavigationPlugin\");","                }","            }","    },","    NS : \"calNavPlug\"","});","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"inputex-panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\",","        \"align-plugin\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"3":0,"6":0,"7":0,"15":0,"17":0,"20":0,"21":0,"22":0,"23":0,"24":0,"27":0,"29":0,"39":0,"40":0,"42":0,"71":0,"75":0,"78":0,"80":0,"81":0,"82":0,"87":0,"109":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"initializer:5":0,"onHeaderClick:14":0,"_prepareMonthsData:74":0,"valueFn:108":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 24;
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredFunctions = 5;
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 1);
YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {

_yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 3);
Y.Plugin.CalendarNavigationPlugin = Y.Base.create("calendarNavigationPlugin", Y.Plugin.Base, [], {

    initializer : function(){
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "initializer", 5);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 6);
this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 7);
console.log("initializer",'debug',"calendarNavigationPlugin");
    },
    /**
         * Prepare the panel
         *
         * @method onHeaderClick
         */
        onHeaderClick: function () {
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 14);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 15);
console.log("onHeaderClick",'debug',"calendarNavigationPlugin");

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 17);
var strings = this.get("string"),
                calendarContentBox;

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 20);
if(!this.panel){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 21);
this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 22);
this.panel_container.setStyle("border", "5px solid green");
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 23);
calendarContentBox = this.get("host").get("contentBox");
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 24);
calendarContentBox.append(this.panel_container);
                    //Y.one('body').append(this.panel_container);

                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 27);
this.panel_container.append(Y.Node.create('<div class="yui3-widget-bd">' + this.template + '</div>'));

                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 29);
this.panel = new Y.Panel({
                        headerContent : "header",
                        footerContent : "footer",
                        //bodyContent : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",// this.template, //"",
                        srcNode : this.panel_container, // this.get("host").get("contentBox"),
                        visible : false,
                        centered: calendarContentBox,
                        modal: true
                    });
                    
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 39);
this.panel.render();
                     _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 40);
this.panel.set("maskNode",this.panel_container);

                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 42);
Y.one(".yui3-widget-mask").setStyle("position", "absolute");
                    //Y.one(".yui3-widget-bd").append(this.template);
                
                    //console.log(Y.one(".yui3-widget-bd"), 'Y.one(".yui3-widget-bd")');
                    //console.log(this.template, 'this.template');

                }
            


            //     var field5 = new Y.inputEx.Group({parentEl: Y.one(".yui3-widget-bd"),
            //         fields: [{
            //             type: "select",
            //             name : "month",
            //             label: strings.month,
            //             choices: this._prepareMonthsData()
            //         }, {
            //             className : "select-year",
            //             name : "year",
            //             label: strings.year,
            //             required : true,
            //             showMsg : true,
            //             regexp : /^[0-9]{4}$/,
            //             value : this.get("host").get("date").getFullYear()
            //         }]
            // });


            
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 71);
this.panel.show();

        },
        _prepareMonthsData : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_prepareMonthsData", 74);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 75);
var i = 0,
                month,
                listOfMonths = this.get("string").monthsList;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 78);
var monthsField = this.monthsField = [];
            
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 80);
for(i = 0 ; i<12 ; i++){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 81);
month = listOfMonths[i];
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 82);
monthsField.push({
                    label : month,
                    value : i
                });
            }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 87);
return monthsField;
        },
        template : '<div id="nav-form-id">'+
                        '<div>'+
                            '<label for="{nav-select-id}"></label>'+
                            '<select id="{nav-select-id}" ></select>'+
                        '</div>'+
                        '<div>'+
                            '<label for="{nav-year-id}"></label>'+
                            '<input id="{nav-year-id}"></input>'+
                        '</div>'+
                    '</div>'
}, {
    ATTRS : {
        /**
             * I18N
             *
             * @attribute string
             * @type Object
             */
            string: {
                valueFn: function () {
                    _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 108);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 109);
return Y.Intl.get("inputex-calendarNavigationPlugin");
                }
            }
    },
    NS : "calNavPlug"
});

}, '@VERSION@', {
    "requires": [
        "intl",
        "plugin",
        "inputex-panel",
        "inputex-group",
        "inputex-select",
        "inputex-string",
        "align-plugin"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr"
    ]
});
