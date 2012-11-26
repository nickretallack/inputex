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
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","","    /**","     * A plugin class which provides quick access to month/year in the Calendar.","     *","     * @module inputex-calendarNavigationPlugin","     */","","    var inputEx = Y.inputEx;","","    /**","     * A plugin class which provides quick access to month/year in the Calendar.","     *","     * @class CalendarNavigationPlugin","     * @extends Plugin.Base","     * @namespace Plugin","     */","    function CalendarNavigationPlugin(options) {","        CalendarNavigationPlugin.superclass.constructor.call(this, options);","    }","","    /**","     * The NAME of the CalendarNavigationPlugin class. Used to prefix events generated","     * by the plugin class.","     *","     * @property NAME","     * @static","     * @type String","     * @default \"calendarNavigationPlugin\"","     */","    CalendarNavigationPlugin.NAME = \"calendarNavigationPlugin\";","","    /**","     * The namespace for the plugin. This will be the property on the widget, which will","     * reference the plugin instance, when it's plugged in.","     *","     * @property NS","     * @static","     * @type String","     * @default \"calNavPlug\"","     */","    CalendarNavigationPlugin.NS = \"calNavPlug\";","","    inputEx.CalendarNavigationPlugin = Y.extend(CalendarNavigationPlugin, Y.Plugin.Base, {","         /**","         * The initializer lifecycle implementation. Setup the data and invoke bindUI","         *","         *","         * @method initializer","         * @param {Object} config The user configuration for the plugin","         */","        initializer: function (options) {","            /* Inside this plug in we can only control the calendar.","            problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself","            by giving the datepickerID we can control the overlay behavior */","            this.options = options;","            this.datepicker = options.datepicker;","","","","            // could be \"all\" or \"content\"","            this.options.mask = options.mask ? options.mask : \"content\";","","            var i = 0,","                month,","                listOfMonths = this.get(\"string\").monthsList;","            var monthsField = this.monthsField = [];","            ","            for(i = 0 ; i<12 ; i++){","                month = listOfMonths[i];","                monthsField.push({","                    label : month,","                    value : i","                });","            }","","            //widget pattern","            this.bindUI();","","        },","        /**","         * Bind events to UI","         *","         * @method bindUI","         */","        bindUI : function(){","            var that = this;","            this.get(\"host\").get(\"boundingBox\").delegate(\"click\", Y.bind(this.onHeaderClick, this), \".yui3-calendar-header-label\");","            ","            if(this.datepicker){","                this._getOverlay().get('boundingBox').on(\"mousedownoutside\", function(e){","                    if(that._isPanelVisible()){","                        e.stopImmediatePropagation();","                    }","                });","            }","","        },","        /**","         * Prepare the panel","         *","         * @method onHeaderClick","         */","        onHeaderClick: function () {","            var that = this,","                group, inputexOptions,","                strings = this.get(\"string\");","","","","            if(!this.panelField){","","                // Y.node preparation","                this.calendarBoundingBox = this.get(\"host\").get(\"boundingBox\");","                this.calendarContentBox = this.get(\"host\").get(\"contentBox\");","","                this.selectPanelBoundingBox = Y.Node.create('<div class=\"inputex-select-panel-boundingbox\"></div>');","                this.selectPanelContentBox = Y.Node.create('<div class=\"inputex-select-panel-contentbox\"></div>');","","                this.calendarBoundingBox.append(this.selectPanelBoundingBox);","","                // setup a inputex group","                group = {","                    type: \"group\",","                    fields: [{","                        type: \"select\",","                        name : \"month\",","                        label: strings.month,","                        choices: this.monthsField","                    }, {","                        className : \"select-year\",","                        name : \"year\",","                        label: strings.year,","                        required : true,","                        showMsg : true,","                        regexp : /^[0-9]{4}$/,","                        value : this.get(\"host\").get(\"date\").getFullYear()","                    }]","                };","","                // inputex-panel options","                inputexOptions = {","                    boundingBox : this.selectPanelBoundingBox,","                    contentBox : this.selectPanelContentBox,","                    centered : this.calendarContentBox,","                    headerContent: strings.select,","                    inputEx: group,","                    label: 'label',","                    modal: true,","                    zIndex : 5,","                    // override the default behavior which is to hide the panel with the esc key","                    // because some problem on ie7","                    hideOn : [{}],","                    buttons: [{","                        value: strings.ok,","                        section: Y.WidgetStdMod.FOOTER,","                        classNames : \"ok-button\",","                        action : Y.bind(this.saveAndHidePanel, this)","                    }, {","                        value: strings.cancel,","                        section: Y.WidgetStdMod.FOOTER,","                        action : Y.bind(this.cancelAndHidePanel, this)","                    }]","                };","","            this.renderComponent(inputexOptions);","            ","            }else {","                this.showPanel();","            }","            ","            // when the panel is visible the mask take all the screen","            // we want to have the mask only on the calendar's contentbox","            if(this.options.mask === \"content\"){","                Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","            }","            ","","            // align the panel in the center of the calendar's contentbox","            this.selectPanelBoundingBox.align.center(this.calendarContentBox);","            ","            this.calendarBoundingBox.on('keyup',function(e){","                if(that._isPanelVisible()){","                    //enter","                    if(e.keyCode === 13){","                        that.saveAndHidePanel(e);","                    }","                }","            });","            this.set(\"panel\", this.panelField);","        },","        /**","         * Prepare the panel","         *","         * @method _getOverlay","         * @private","         */","        _getOverlay : function(){","           return this.datepicker.oOverlay;","        },","        /**","         * Is the Panel visible ?","         *","         * @method _isPanelVisible","         * @private","         * return isPanelVisible","         */","        _isPanelVisible : function(){","            var panel = this.get(\"panel\"),","                isPanelVisible;","                if(panel){","                    isPanelVisible = panel.get(\"visible\");","                }","            return isPanelVisible;","        },","        /**","         *","         * @method saveAndHidePanel","         */","        saveAndHidePanel : function(e){","","            e.halt(true);","","            if(  this.validateFormInPanel()  ){","                // set the choosen values to the calendar","                var dateToUpdate = this.get(\"host\").get(\"date\"),","                    panel = this.get(\"panel\"),","                    selectedData = panel.get('field').getValue();","                ","                dateToUpdate.setMonth(selectedData.month);","                if(selectedData.year){","                    dateToUpdate.setFullYear(selectedData.year);","                }","                this.get(\"host\").set(\"date\",dateToUpdate);","                this.hidePanel();","            }","        },","        /**","         *","         * @method cancelAndHidePanel","         */","        cancelAndHidePanel : function(e){","            ","            e.halt(true);","            this.hidePanel();","            ","        },","        /**","         *","         * @method validateFormInPanel","         */","        validateFormInPanel : function(){","            return this.get(\"panel\").get(\"field\").validate();","        },","        /**","         *","         * @method hidePanel","         */","        hidePanel : function(){","            this.get(\"panel\").hide();","        },","        /**","         *","         * @method showPanel","         */","        showPanel : function(){","            this.get(\"panel\").show();","        },","        /**","         *","         * @method renderComponent","         */","        renderComponent : function(inputexOptions){","            this.panelField = new inputEx.Panel( inputexOptions );","            this.selectPanelBoundingBox.plug(Y.Plugin.Align);","            this.panelField.render();","        }","    }, {","        /**","         * Static property used to define the default attribute","         * configuration for the plugin.","         *","         * @property ATTRS","         * @type Object","         * @static","         */","        ATTRS: {","            /**","             * I18N","             *","             * @attribute string","             * @type Object","             */","            string: {","                valueFn: function () {","                    return Y.Intl.get(\"inputex-calendarNavigationPlugin\");","                }","            },","            /**","             * Panel which display select month and an input for teh year","             *","             * @attribute panel","             * @type Object","             */","            panel : {}","        }","    });","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"inputex-panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\",","        \"align-plugin\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"10":0,"19":0,"20":0,"32":0,"43":0,"45":0,"57":0,"58":0,"63":0,"65":0,"68":0,"70":0,"71":0,"72":0,"79":0,"88":0,"89":0,"91":0,"92":0,"93":0,"94":0,"106":0,"112":0,"115":0,"116":0,"118":0,"119":0,"121":0,"124":0,"143":0,"167":0,"170":0,"175":0,"176":0,"181":0,"183":0,"184":0,"186":0,"187":0,"191":0,"200":0,"210":0,"212":0,"213":0,"215":0,"223":0,"225":0,"227":0,"231":0,"232":0,"233":0,"235":0,"236":0,"245":0,"246":0,"254":0,"261":0,"268":0,"275":0,"276":0,"277":0,"297":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"CalendarNavigationPlugin:19":0,"initializer:53":0,"(anonymous 2):92":0,"bindUI:87":0,"(anonymous 3):183":0,"onHeaderClick:105":0,"_getOverlay:199":0,"_isPanelVisible:209":0,"saveAndHidePanel:221":0,"cancelAndHidePanel:243":0,"validateFormInPanel:253":0,"hidePanel:260":0,"showPanel:267":0,"renderComponent:274":0,"valueFn:296":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 63;
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredFunctions = 16;
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 1);
YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {


    /**
     * A plugin class which provides quick access to month/year in the Calendar.
     *
     * @module inputex-calendarNavigationPlugin
     */

    _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 10);
var inputEx = Y.inputEx;

    /**
     * A plugin class which provides quick access to month/year in the Calendar.
     *
     * @class CalendarNavigationPlugin
     * @extends Plugin.Base
     * @namespace Plugin
     */
    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 19);
function CalendarNavigationPlugin(options) {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "CalendarNavigationPlugin", 19);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 20);
CalendarNavigationPlugin.superclass.constructor.call(this, options);
    }

    /**
     * The NAME of the CalendarNavigationPlugin class. Used to prefix events generated
     * by the plugin class.
     *
     * @property NAME
     * @static
     * @type String
     * @default "calendarNavigationPlugin"
     */
    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 32);
CalendarNavigationPlugin.NAME = "calendarNavigationPlugin";

    /**
     * The namespace for the plugin. This will be the property on the widget, which will
     * reference the plugin instance, when it's plugged in.
     *
     * @property NS
     * @static
     * @type String
     * @default "calNavPlug"
     */
    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 43);
CalendarNavigationPlugin.NS = "calNavPlug";

    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 45);
inputEx.CalendarNavigationPlugin = Y.extend(CalendarNavigationPlugin, Y.Plugin.Base, {
         /**
         * The initializer lifecycle implementation. Setup the data and invoke bindUI
         *
         *
         * @method initializer
         * @param {Object} config The user configuration for the plugin
         */
        initializer: function (options) {
            /* Inside this plug in we can only control the calendar.
            problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself
            by giving the datepickerID we can control the overlay behavior */
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "initializer", 53);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 57);
this.options = options;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 58);
this.datepicker = options.datepicker;



            // could be "all" or "content"
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 63);
this.options.mask = options.mask ? options.mask : "content";

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 65);
var i = 0,
                month,
                listOfMonths = this.get("string").monthsList;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 68);
var monthsField = this.monthsField = [];
            
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 70);
for(i = 0 ; i<12 ; i++){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 71);
month = listOfMonths[i];
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 72);
monthsField.push({
                    label : month,
                    value : i
                });
            }

            //widget pattern
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 79);
this.bindUI();

        },
        /**
         * Bind events to UI
         *
         * @method bindUI
         */
        bindUI : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "bindUI", 87);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 88);
var that = this;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 89);
this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
            
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 91);
if(this.datepicker){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 92);
this._getOverlay().get('boundingBox').on("mousedownoutside", function(e){
                    _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 2)", 92);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 93);
if(that._isPanelVisible()){
                        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 94);
e.stopImmediatePropagation();
                    }
                });
            }

        },
        /**
         * Prepare the panel
         *
         * @method onHeaderClick
         */
        onHeaderClick: function () {
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 105);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 106);
var that = this,
                group, inputexOptions,
                strings = this.get("string");



            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 112);
if(!this.panelField){

                // Y.node preparation
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 115);
this.calendarBoundingBox = this.get("host").get("boundingBox");
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 116);
this.calendarContentBox = this.get("host").get("contentBox");

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 118);
this.selectPanelBoundingBox = Y.Node.create('<div class="inputex-select-panel-boundingbox"></div>');
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 119);
this.selectPanelContentBox = Y.Node.create('<div class="inputex-select-panel-contentbox"></div>');

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 121);
this.calendarBoundingBox.append(this.selectPanelBoundingBox);

                // setup a inputex group
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 124);
group = {
                    type: "group",
                    fields: [{
                        type: "select",
                        name : "month",
                        label: strings.month,
                        choices: this.monthsField
                    }, {
                        className : "select-year",
                        name : "year",
                        label: strings.year,
                        required : true,
                        showMsg : true,
                        regexp : /^[0-9]{4}$/,
                        value : this.get("host").get("date").getFullYear()
                    }]
                };

                // inputex-panel options
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 143);
inputexOptions = {
                    boundingBox : this.selectPanelBoundingBox,
                    contentBox : this.selectPanelContentBox,
                    centered : this.calendarContentBox,
                    headerContent: strings.select,
                    inputEx: group,
                    label: 'label',
                    modal: true,
                    zIndex : 5,
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
                };

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 167);
this.renderComponent(inputexOptions);
            
            }else {
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 170);
this.showPanel();
            }
            
            // when the panel is visible the mask take all the screen
            // we want to have the mask only on the calendar's contentbox
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 175);
if(this.options.mask === "content"){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 176);
Y.one(".yui3-widget-mask").setStyle("position", "absolute");
            }
            

            // align the panel in the center of the calendar's contentbox
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 181);
this.selectPanelBoundingBox.align.center(this.calendarContentBox);
            
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 183);
this.calendarBoundingBox.on('keyup',function(e){
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 3)", 183);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 184);
if(that._isPanelVisible()){
                    //enter
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 186);
if(e.keyCode === 13){
                        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 187);
that.saveAndHidePanel(e);
                    }
                }
            });
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 191);
this.set("panel", this.panelField);
        },
        /**
         * Prepare the panel
         *
         * @method _getOverlay
         * @private
         */
        _getOverlay : function(){
           _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_getOverlay", 199);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 200);
return this.datepicker.oOverlay;
        },
        /**
         * Is the Panel visible ?
         *
         * @method _isPanelVisible
         * @private
         * return isPanelVisible
         */
        _isPanelVisible : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_isPanelVisible", 209);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 210);
var panel = this.get("panel"),
                isPanelVisible;
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 212);
if(panel){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 213);
isPanelVisible = panel.get("visible");
                }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 215);
return isPanelVisible;
        },
        /**
         *
         * @method saveAndHidePanel
         */
        saveAndHidePanel : function(e){

            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "saveAndHidePanel", 221);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 223);
e.halt(true);

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 225);
if(  this.validateFormInPanel()  ){
                // set the choosen values to the calendar
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 227);
var dateToUpdate = this.get("host").get("date"),
                    panel = this.get("panel"),
                    selectedData = panel.get('field').getValue();
                
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 231);
dateToUpdate.setMonth(selectedData.month);
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 232);
if(selectedData.year){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 233);
dateToUpdate.setFullYear(selectedData.year);
                }
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 235);
this.get("host").set("date",dateToUpdate);
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 236);
this.hidePanel();
            }
        },
        /**
         *
         * @method cancelAndHidePanel
         */
        cancelAndHidePanel : function(e){
            
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "cancelAndHidePanel", 243);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 245);
e.halt(true);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 246);
this.hidePanel();
            
        },
        /**
         *
         * @method validateFormInPanel
         */
        validateFormInPanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "validateFormInPanel", 253);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 254);
return this.get("panel").get("field").validate();
        },
        /**
         *
         * @method hidePanel
         */
        hidePanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "hidePanel", 260);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 261);
this.get("panel").hide();
        },
        /**
         *
         * @method showPanel
         */
        showPanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "showPanel", 267);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 268);
this.get("panel").show();
        },
        /**
         *
         * @method renderComponent
         */
        renderComponent : function(inputexOptions){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "renderComponent", 274);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 275);
this.panelField = new inputEx.Panel( inputexOptions );
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 276);
this.selectPanelBoundingBox.plug(Y.Plugin.Align);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 277);
this.panelField.render();
        }
    }, {
        /**
         * Static property used to define the default attribute
         * configuration for the plugin.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {
            /**
             * I18N
             *
             * @attribute string
             * @type Object
             */
            string: {
                valueFn: function () {
                    _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 296);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 297);
return Y.Intl.get("inputex-calendarNavigationPlugin");
                }
            },
            /**
             * Panel which display select month and an input for teh year
             *
             * @attribute panel
             * @type Object
             */
            panel : {}
        }
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
