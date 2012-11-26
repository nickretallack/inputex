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
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","","    /**","     * A plugin class which provides quick access to month/year in the Calendar.","     *","     * @module inputex-calendarNavigationPlugin","     */","","    var inputEx = Y.inputEx;","","    /**","     * A plugin class which provides quick access to month/year in the Calendar.","     *","     * @class CalendarNavigationPlugin","     * @extends Plugin.Base","     * @namespace Plugin","     */","    function CalendarNavigationPlugin(options) {","        CalendarNavigationPlugin.superclass.constructor.call(this, options);","    }","","    /**","     * The NAME of the CalendarNavigationPlugin class. Used to prefix events generated","     * by the plugin class.","     *","     * @property NAME","     * @static","     * @type String","     * @default \"calendarNavigationPlugin\"","     */","    CalendarNavigationPlugin.NAME = \"calendarNavigationPlugin\";","","    /**","     * The namespace for the plugin. This will be the property on the widget, which will","     * reference the plugin instance, when it's plugged in.","     *","     * @property NS","     * @static","     * @type String","     * @default \"calNavPlug\"","     */","    CalendarNavigationPlugin.NS = \"calNavPlug\";","","    inputEx.CalendarNavigationPlugin = Y.extend(CalendarNavigationPlugin, Y.Plugin.Base, {","         /**","         * The initializer lifecycle implementation. Setup the data and invoke bindUI","         *","         *","         * @method initializer","         * @param {Object} config The user configuration for the plugin","         */","        initializer: function (options) {","            /* Inside this plug in we can only control the calendar.","            problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself","            by giving the datepickerID we can control the overlay behavior */","            this.options = options;","            this.datepicker = options.datepicker;","","            // could be \"all\" or \"content\"","            this.options.mask = options.mask ? options.mask : \"content\";","","            var i = 0,","                month,","                listOfMonths = this.get(\"string\").monthsList;","            var monthsField = this.monthsField = [];","            ","            for(i = 0 ; i<12 ; i++){","                month = listOfMonths[i];","                monthsField.push({","                    label : month,","                    value : i","                });","            }","","            //widget pattern","            this.bindUI();","","        },","        /**","         * Bind events to UI","         *","         * @method bindUI","         */","        bindUI : function(){","            var that = this;","            this.get(\"host\").get(\"boundingBox\").delegate(\"click\", Y.bind(this.onHeaderClick, this), \".yui3-calendar-header-label\");","            this._getOverlay().get('boundingBox').on(\"mousedownoutside\", function(e){","                if(that._isPanelVisible()){","                    e.stopImmediatePropagation();","                }","            });","        },","        /**","         * Prepare the panel","         *","         * @method onHeaderClick","         */","        onHeaderClick: function () {","            var that = this,","                group, inputexOptions,","                strings = this.get(\"string\");","","","","            if(!this.panelField){","","                // Y.node preparation","                this.calendarBoundingBox = this.get(\"host\").get(\"boundingBox\");","                this.calendarContentBox = this.get(\"host\").get(\"contentBox\");","","                this.selectPanelBoundingBox = Y.Node.create('<div class=\"inputex-select-panel-boundingbox\"></div>');","                this.selectPanelContentBox = Y.Node.create('<div class=\"inputex-select-panel-contentbox\"></div>');","","                this.calendarBoundingBox.append(this.selectPanelBoundingBox);","","                // setup a inputex group","                group = {","                    type: \"group\",","                    fields: [{","                        type: \"select\",","                        name : \"month\",","                        label: strings.month,","                        choices: this.monthsField","                    }, {","                        className : \"select-year\",","                        name : \"year\",","                        label: strings.year,","                        required : true,","                        showMsg : true,","                        regexp : /^[0-9]{4}$/,","                        value : this.get(\"host\").get(\"date\").getFullYear()","                    }]","                };","","                // inputex-panel options","                inputexOptions = {","                    boundingBox : this.selectPanelBoundingBox,","                    contentBox : this.selectPanelContentBox,","                    centered : this.calendarContentBox,","                    headerContent: strings.select,","                    inputEx: group,","                    label: 'label',","                    modal: true,","                    zIndex : 5,","                    // override the default behavior which is to hide the panel with the esc key","                    // because some problem on ie7","                    hideOn : [{}],","                    buttons: [{","                        value: strings.ok,","                        section: Y.WidgetStdMod.FOOTER,","                        classNames : \"ok-button\",","                        action : Y.bind(this.saveAndHidePanel, this)","                    }, {","                        value: strings.cancel,","                        section: Y.WidgetStdMod.FOOTER,","                        action : Y.bind(this.cancelAndHidePanel, this)","                    }]","                };","","            this.renderComponent(inputexOptions);","            ","            }else {","                this.showPanel();","            }","            ","            // when the panel is visible the mask take all the screen","            // we want to have the mask only on the calendar's contentbox","            if(this.options.mask === \"content\"){","                Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","            }","            ","","            // align the panel in the center of the calendar's contentbox","            this.selectPanelBoundingBox.align.center(this.calendarContentBox);","            ","            this.calendarBoundingBox.on('keyup',function(e){","                if(that._isPanelVisible()){","                    //enter","                    if(e.keyCode === 13){","                        that.saveAndHidePanel(e);","                    }","                }","            });","            this.set(\"panel\", this.panelField);","        },","        /**","         * Prepare the panel","         *","         * @method _getOverlay","         * @private","         */","        _getOverlay : function(){","           return this.datepicker.oOverlay;","        },","        /**","         * Is the Panel visible ?","         *","         * @method _isPanelVisible","         * @private","         * return isPanelVisible","         */","        _isPanelVisible : function(){","            var panel = this.get(\"panel\"),","                isPanelVisible;","                if(panel){","                    isPanelVisible = panel.get(\"visible\");","                }","            return isPanelVisible;","        },","        /**","         *","         * @method saveAndHidePanel","         */","        saveAndHidePanel : function(e){","","            e.halt(true);","","            if(  this.validateFormInPanel()  ){","                // set the choosen values to the calendar","                var dateToUpdate = this.get(\"host\").get(\"date\"),","                    panel = this.get(\"panel\"),","                    selectedData = panel.get('field').getValue();","                ","                dateToUpdate.setMonth(selectedData.month);","                if(selectedData.year){","                    dateToUpdate.setFullYear(selectedData.year);","                }","                this.get(\"host\").set(\"date\",dateToUpdate);","                this.hidePanel();","            }","        },","        /**","         *","         * @method cancelAndHidePanel","         */","        cancelAndHidePanel : function(e){","            ","            e.halt(true);","            this.hidePanel();","            ","        },","        /**","         *","         * @method validateFormInPanel","         */","        validateFormInPanel : function(){","            return this.get(\"panel\").get(\"field\").validate();","        },","        /**","         *","         * @method hidePanel","         */","        hidePanel : function(){","            this.get(\"panel\").hide();","        },","        /**","         *","         * @method showPanel","         */","        showPanel : function(){","            this.get(\"panel\").show();","        },","        /**","         *","         * @method renderComponent","         */","        renderComponent : function(inputexOptions){","            this.panelField = new inputEx.Panel( inputexOptions );","            this.selectPanelBoundingBox.plug(Y.Plugin.Align);","            this.panelField.render();","        }","    }, {","        /**","         * Static property used to define the default attribute","         * configuration for the plugin.","         *","         * @property ATTRS","         * @type Object","         * @static","         */","        ATTRS: {","            /**","             * I18N","             *","             * @attribute string","             * @type Object","             */","            string: {","                valueFn: function () {","                    return Y.Intl.get(\"inputex-calendarNavigationPlugin\");","                }","            },","            /**","             * Panel which display select month and an input for teh year","             *","             * @attribute panel","             * @type Object","             */","            panel : {}","        }","    });","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"inputex-panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\",","        \"align-plugin\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"10":0,"19":0,"20":0,"32":0,"43":0,"45":0,"57":0,"58":0,"61":0,"63":0,"66":0,"68":0,"69":0,"70":0,"77":0,"86":0,"87":0,"88":0,"89":0,"90":0,"100":0,"106":0,"109":0,"110":0,"112":0,"113":0,"115":0,"118":0,"137":0,"161":0,"164":0,"169":0,"170":0,"175":0,"177":0,"178":0,"180":0,"181":0,"185":0,"194":0,"204":0,"206":0,"207":0,"209":0,"217":0,"219":0,"221":0,"225":0,"226":0,"227":0,"229":0,"230":0,"239":0,"240":0,"248":0,"255":0,"262":0,"269":0,"270":0,"271":0,"291":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"CalendarNavigationPlugin:19":0,"initializer:53":0,"(anonymous 2):88":0,"bindUI:85":0,"(anonymous 3):177":0,"onHeaderClick:99":0,"_getOverlay:193":0,"_isPanelVisible:203":0,"saveAndHidePanel:215":0,"cancelAndHidePanel:237":0,"validateFormInPanel:247":0,"hidePanel:254":0,"showPanel:261":0,"renderComponent:268":0,"valueFn:290":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 62;
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
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 61);
this.options.mask = options.mask ? options.mask : "content";

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 63);
var i = 0,
                month,
                listOfMonths = this.get("string").monthsList;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 66);
var monthsField = this.monthsField = [];
            
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 68);
for(i = 0 ; i<12 ; i++){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 69);
month = listOfMonths[i];
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 70);
monthsField.push({
                    label : month,
                    value : i
                });
            }

            //widget pattern
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 77);
this.bindUI();

        },
        /**
         * Bind events to UI
         *
         * @method bindUI
         */
        bindUI : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "bindUI", 85);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 86);
var that = this;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 87);
this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 88);
this._getOverlay().get('boundingBox').on("mousedownoutside", function(e){
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 2)", 88);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 89);
if(that._isPanelVisible()){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 90);
e.stopImmediatePropagation();
                }
            });
        },
        /**
         * Prepare the panel
         *
         * @method onHeaderClick
         */
        onHeaderClick: function () {
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 99);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 100);
var that = this,
                group, inputexOptions,
                strings = this.get("string");



            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 106);
if(!this.panelField){

                // Y.node preparation
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 109);
this.calendarBoundingBox = this.get("host").get("boundingBox");
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 110);
this.calendarContentBox = this.get("host").get("contentBox");

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 112);
this.selectPanelBoundingBox = Y.Node.create('<div class="inputex-select-panel-boundingbox"></div>');
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 113);
this.selectPanelContentBox = Y.Node.create('<div class="inputex-select-panel-contentbox"></div>');

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 115);
this.calendarBoundingBox.append(this.selectPanelBoundingBox);

                // setup a inputex group
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 118);
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
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 137);
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

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 161);
this.renderComponent(inputexOptions);
            
            }else {
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 164);
this.showPanel();
            }
            
            // when the panel is visible the mask take all the screen
            // we want to have the mask only on the calendar's contentbox
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 169);
if(this.options.mask === "content"){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 170);
Y.one(".yui3-widget-mask").setStyle("position", "absolute");
            }
            

            // align the panel in the center of the calendar's contentbox
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 175);
this.selectPanelBoundingBox.align.center(this.calendarContentBox);
            
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 177);
this.calendarBoundingBox.on('keyup',function(e){
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 3)", 177);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 178);
if(that._isPanelVisible()){
                    //enter
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 180);
if(e.keyCode === 13){
                        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 181);
that.saveAndHidePanel(e);
                    }
                }
            });
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 185);
this.set("panel", this.panelField);
        },
        /**
         * Prepare the panel
         *
         * @method _getOverlay
         * @private
         */
        _getOverlay : function(){
           _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_getOverlay", 193);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 194);
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
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_isPanelVisible", 203);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 204);
var panel = this.get("panel"),
                isPanelVisible;
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 206);
if(panel){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 207);
isPanelVisible = panel.get("visible");
                }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 209);
return isPanelVisible;
        },
        /**
         *
         * @method saveAndHidePanel
         */
        saveAndHidePanel : function(e){

            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "saveAndHidePanel", 215);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 217);
e.halt(true);

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 219);
if(  this.validateFormInPanel()  ){
                // set the choosen values to the calendar
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 221);
var dateToUpdate = this.get("host").get("date"),
                    panel = this.get("panel"),
                    selectedData = panel.get('field').getValue();
                
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 225);
dateToUpdate.setMonth(selectedData.month);
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 226);
if(selectedData.year){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 227);
dateToUpdate.setFullYear(selectedData.year);
                }
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 229);
this.get("host").set("date",dateToUpdate);
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 230);
this.hidePanel();
            }
        },
        /**
         *
         * @method cancelAndHidePanel
         */
        cancelAndHidePanel : function(e){
            
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "cancelAndHidePanel", 237);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 239);
e.halt(true);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 240);
this.hidePanel();
            
        },
        /**
         *
         * @method validateFormInPanel
         */
        validateFormInPanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "validateFormInPanel", 247);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 248);
return this.get("panel").get("field").validate();
        },
        /**
         *
         * @method hidePanel
         */
        hidePanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "hidePanel", 254);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 255);
this.get("panel").hide();
        },
        /**
         *
         * @method showPanel
         */
        showPanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "showPanel", 261);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 262);
this.get("panel").show();
        },
        /**
         *
         * @method renderComponent
         */
        renderComponent : function(inputexOptions){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "renderComponent", 268);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 269);
this.panelField = new inputEx.Panel( inputexOptions );
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 270);
this.selectPanelBoundingBox.plug(Y.Plugin.Align);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 271);
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
                    _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 290);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 291);
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
