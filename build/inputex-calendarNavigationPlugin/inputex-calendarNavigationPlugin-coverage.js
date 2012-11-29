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
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","var getClassName = Y.ClassNameManager.getClassName;","","Y.Plugin.CalendarNavigationPlugin = Y.Base.create(\"calendarNavigationPlugin\", Y.Plugin.Base, [], {","","    initializer : function(){","        this.get(\"host\").get(\"boundingBox\").delegate(\"click\", Y.bind(this.onHeaderClick, this), \".yui3-calendar-header-label\");","        console.log(\"initializer\",'debug',\"calendarNavigationPlugin\");","    },","    /**","         * Prepare the panel","         *","         * @method onHeaderClick","         */","        onHeaderClick: function () {","            console.log(\"onHeaderClick\",'debug',\"calendarNavigationPlugin\");","","            var strings = this.get(\"string\"),","                calendarContentBox;","","                if(!this.panel){","                    this.panel_container = Y.Node.create('<div class=\"yui3-calendar-navplugin-widget\"></div>');","                    calendarContentBox = this.get(\"host\").get(\"contentBox\");","                    calendarContentBox.append(this.panel_container);","                    //Y.one('body').append(this.panel_container);","","                    this.panel_container.append(Y.Node.create('<div class=\"yui3-widget-bd\">' + this._prepareTemplate() + '</div>'));","","                    this.panel = new Y.Panel({","                        headerContent: strings.select,","                        //bodyContent : \"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",// this.template, //\"\",","                        srcNode : this.panel_container, // this.get(\"host\").get(\"contentBox\"),","                        visible : false,","                        centered: calendarContentBox,","                        modal: true,","                        maskNode : this.panel_container,","                    // override the default behavior which is to hide the panel with the esc key","                    // because some problem on ie7","                    hideOn : [{}],","                    buttons: [{","                        value: strings.ok,","                        section: Y.WidgetStdMod.FOOTER,","                        classNames : \"ok-button\",","                        action : Y.bind(this.saveAndHidePanel, this)","                    }, {","                        value: strings.cancel,","                        section: Y.WidgetStdMod.FOOTER,","                        action : Y.bind(this.cancelAndHidePanel, this)","                    }]","","                    });","                    ","                    this.panel.render();","","                    // The  position of the mask is setted in javascript","                    // So we can use css to change it's value","                    Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","                    //Y.one(\".yui3-widget-bd\").append(this.template);","                ","                    //console.log(Y.one(\".yui3-widget-bd\"), 'Y.one(\".yui3-widget-bd\")');","                    //console.log(this.template, 'this.template');","","                }","            ","","","            //     var field5 = new Y.inputEx.Group({parentEl: Y.one(\".yui3-widget-bd\"),","            //         fields: [{","            //             type: \"select\",","            //             name : \"month\",","            //             label: strings.month,","            //             choices: this._prepareMonthsData()","            //         }, {","            //             className : \"select-year\",","            //             name : \"year\",","            //             label: strings.year,","            //             required : true,","            //             showMsg : true,","            //             regexp : /^[0-9]{4}$/,","            //             value : this.get(\"host\").get(\"date\").getFullYear()","            //         }]","            // });","","","            ","                this.panel.show();","","        },_prepareTemplate : function(){","            var template = this.template,","                strings = this.get(\"string\");","","                console.log(getClassName(\"test\"));","","            return Y.substitute(template, {","                selectContent : this._getMonthsData(),","                label_select : strings.month,","                label_year : strings.year,","                nav_select_id : \"yui3-month-selection\"","            });","        },","        _getMonthsData : function(){","            var i = 0,","                month,","                listOfMonths = this.get(\"string\").monthsList,","                optionTemplate = '<option value=\"{value}\">{label}</option>',","                result;","","            for(i = 0 ; i<12 ; i++){","                month = listOfMonths[i];","             ","                result += Y.substitute(optionTemplate, {","                    label : month,","                    value : i","                });","","                // monthsField.push({","                //     label : month,","                //     value : i","                // });","            }","            return result;","        },","        /**","         *","         * @method saveAndHidePanel","         */","        saveAndHidePanel : function(e){","","","","","            // e.halt(true);","","            // if(  this.validateFormInPanel()  ){","            //     // set the choosen values to the calendar","            //     var dateToUpdate = this.get(\"host\").get(\"date\"),","            //         panel = this.get(\"panel\"),","            //         selectedData = panel.get('field').getValue();","                ","            //     dateToUpdate.setMonth(selectedData.month);","            //     if(selectedData.year){","            //         dateToUpdate.setFullYear(selectedData.year);","            //     }","            //     this.get(\"host\").set(\"date\",dateToUpdate);","            //     this.hidePanel();","            // }","","        },","        /**","         *","         * @method cancelAndHidePanel","         */","        cancelAndHidePanel : function(e){","            ","            e.halt(true);","            this.hidePanel();","            ","        },","        template : '<div id=\"nav-form-id\">'+","                        '<div>'+","                            '<label for=\"{nav_select_id}\">{label_select}</label>'+","                            '<select id=\"{nav_select_id}\">{selectContent}</select>'+","                        '</div>'+","                        '<div>'+","                            '<label for=\"{nav_year_id}\">{label_year}</label>'+","                            '<input id=\"{nav_year_id}\"></input>'+","                        '</div>'+","                    '</div>'","}, {","    ATTRS : {","        /**","             * I18N","             *","             * @attribute string","             * @type Object","             */","            string: {","                valueFn: function () {","                    return Y.Intl.get(\"inputex-calendarNavigationPlugin\");","                }","            }","    },","    NS : \"calNavPlug\"","});","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"inputex-panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\",","        \"align-plugin\",","        \"substitute\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"17":0,"19":0,"22":0,"23":0,"24":0,"25":0,"28":0,"30":0,"54":0,"58":0,"87":0,"90":0,"93":0,"95":0,"103":0,"109":0,"110":0,"112":0,"122":0,"156":0,"157":0,"180":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"initializer:7":0,"onHeaderClick:16":0,"_prepareTemplate:89":0,"_getMonthsData:102":0,"cancelAndHidePanel:154":0,"valueFn:179":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 27;
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 1);
YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {

_yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 3);
var getClassName = Y.ClassNameManager.getClassName;

_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 5);
Y.Plugin.CalendarNavigationPlugin = Y.Base.create("calendarNavigationPlugin", Y.Plugin.Base, [], {

    initializer : function(){
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "initializer", 7);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 8);
this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 9);
console.log("initializer",'debug',"calendarNavigationPlugin");
    },
    /**
         * Prepare the panel
         *
         * @method onHeaderClick
         */
        onHeaderClick: function () {
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 16);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 17);
console.log("onHeaderClick",'debug',"calendarNavigationPlugin");

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 19);
var strings = this.get("string"),
                calendarContentBox;

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 22);
if(!this.panel){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 23);
this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 24);
calendarContentBox = this.get("host").get("contentBox");
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 25);
calendarContentBox.append(this.panel_container);
                    //Y.one('body').append(this.panel_container);

                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 28);
this.panel_container.append(Y.Node.create('<div class="yui3-widget-bd">' + this._prepareTemplate() + '</div>'));

                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 30);
this.panel = new Y.Panel({
                        headerContent: strings.select,
                        //bodyContent : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",// this.template, //"",
                        srcNode : this.panel_container, // this.get("host").get("contentBox"),
                        visible : false,
                        centered: calendarContentBox,
                        modal: true,
                        maskNode : this.panel_container,
                    // override the default behavior which is to hide the panel with the esc key
                    // because some problem on ie7
                    hideOn : [{}],
                    buttons: [{
                        value: strings.ok,
                        section: Y.WidgetStdMod.FOOTER,
                        classNames : "ok-button",
                        action : Y.bind(this.saveAndHidePanel, this)
                    }, {
                        value: strings.cancel,
                        section: Y.WidgetStdMod.FOOTER,
                        action : Y.bind(this.cancelAndHidePanel, this)
                    }]

                    });
                    
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 54);
this.panel.render();

                    // The  position of the mask is setted in javascript
                    // So we can use css to change it's value
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 58);
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


            
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 87);
this.panel.show();

        },_prepareTemplate : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_prepareTemplate", 89);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 90);
var template = this.template,
                strings = this.get("string");

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 93);
console.log(getClassName("test"));

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 95);
return Y.substitute(template, {
                selectContent : this._getMonthsData(),
                label_select : strings.month,
                label_year : strings.year,
                nav_select_id : "yui3-month-selection"
            });
        },
        _getMonthsData : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_getMonthsData", 102);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 103);
var i = 0,
                month,
                listOfMonths = this.get("string").monthsList,
                optionTemplate = '<option value="{value}">{label}</option>',
                result;

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 109);
for(i = 0 ; i<12 ; i++){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 110);
month = listOfMonths[i];
             
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 112);
result += Y.substitute(optionTemplate, {
                    label : month,
                    value : i
                });

                // monthsField.push({
                //     label : month,
                //     value : i
                // });
            }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 122);
return result;
        },
        /**
         *
         * @method saveAndHidePanel
         */
        saveAndHidePanel : function(e){




            // e.halt(true);

            // if(  this.validateFormInPanel()  ){
            //     // set the choosen values to the calendar
            //     var dateToUpdate = this.get("host").get("date"),
            //         panel = this.get("panel"),
            //         selectedData = panel.get('field').getValue();
                
            //     dateToUpdate.setMonth(selectedData.month);
            //     if(selectedData.year){
            //         dateToUpdate.setFullYear(selectedData.year);
            //     }
            //     this.get("host").set("date",dateToUpdate);
            //     this.hidePanel();
            // }

        },
        /**
         *
         * @method cancelAndHidePanel
         */
        cancelAndHidePanel : function(e){
            
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "cancelAndHidePanel", 154);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 156);
e.halt(true);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 157);
this.hidePanel();
            
        },
        template : '<div id="nav-form-id">'+
                        '<div>'+
                            '<label for="{nav_select_id}">{label_select}</label>'+
                            '<select id="{nav_select_id}">{selectContent}</select>'+
                        '</div>'+
                        '<div>'+
                            '<label for="{nav_year_id}">{label_year}</label>'+
                            '<input id="{nav_year_id}"></input>'+
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
                    _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 179);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 180);
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
        "align-plugin",
        "substitute"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr"
    ]
});
