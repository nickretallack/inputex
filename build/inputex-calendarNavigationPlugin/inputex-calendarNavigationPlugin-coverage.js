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
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","","    /**","     * A plugin class which provides quick access to month/year in the Calendar.","     *","     * @module inputex-calendarNavigationPlugin","     */","","    var inputEx = Y.inputEx;","","    /**","     * A plugin class which provides quick access to month/year in the Calendar.","     *","     * @class CalendarNavigationPlugin","     * @extends Plugin.Base","     * @namespace Plugin","     */","    function CalendarNavigationPlugin(options) {","        CalendarNavigationPlugin.superclass.constructor.call(this, options);","    }","","    /**","     * The NAME of the CalendarNavigationPlugin class. Used to prefix events generated","     * by the plugin class.","     *","     * @property NAME","     * @static","     * @type String","     * @default \"calendarNavigationPlugin\"","     */","    CalendarNavigationPlugin.NAME = \"calendarNavigationPlugin\";","","    /**","     * The namespace for the plugin. This will be the property on the widget, which will","     * reference the plugin instance, when it's plugged in.","     *","     * @property NS","     * @static","     * @type String","     * @default \"calNavPlug\"","     */","    CalendarNavigationPlugin.NS = \"calNavPlug\";","","    inputEx.CalendarNavigationPlugin = Y.extend(CalendarNavigationPlugin, Y.Plugin.Base, {","         /**","         * The initializer lifecycle implementation. Setup the data and invoke bindUI","         *","         *","         * @method initializer","         * @param {Object} config The user configuration for the plugin","         */","        initializer: function (options) {","            /* Inside this plug in we can only control the calendar.","            problem is when we click on the month selector (in the panel plugin) the overlay automatically hide itself","            by giving the datepickerID we can control the overlay behavior */","            this.panelOptions = options;","            this.datepicker = options.datepicker;","            var i = 0,","                month,","                listOfMonths = this.get(\"string\").monthsList;","            var monthsField = this.monthsField = [];","            ","            for(i = 0 ; i<12 ; i++){","                month = listOfMonths[i];","                monthsField.push({","                    label : month,","                    value : i","                });","            }","","            //widget pattern","            this.bindUI();","","        },","        /**","         * Bind events to UI","         *","         * @method bindUI","         */","        bindUI : function(){","            var that = this;","            this.get(\"host\").get(\"boundingBox\").delegate(\"click\", Y.bind(this.onHeaderClick, this), \".yui3-calendar-header-label\");","            this._getOverlay().get('boundingBox').on(\"mousedownoutside\", function(e){","                if(that._isPanelVisible()){","                    e.stopImmediatePropagation();","                }","            });","        },","        /**","         * Prepare the panel","         *","         * @method onHeaderClick","         */","        onHeaderClick: function () {","            var that = this,","                group, inputexOptions,","                strings = this.get(\"string\");","","","","            if(!this.panelField){","","                // Y.node preparation","                this.calendarBoundingBox = this.get(\"host\").get(\"boundingBox\");","                this.calendarContentBox = this.get(\"host\").get(\"contentBox\");","            ","                this.calendarBoundingBox.addClass(\"calendarBoundingBox\");","                this.calendarContentBox.addClass(\"calendarContentBox\");","","                this.selectPanelBoundingBox = Y.Node.create('<div class=\"inputex-select-panel-boundingbox\"></div>');","                this.selectPanelContentBox = Y.Node.create('<div class=\"inputex-select-panel-contentbox\"></div>');","","                this.calendarBoundingBox.append(this.selectPanelBoundingBox);","","                // setup a inputex group","                group = {","                    type: \"group\",","                    fields: [{","                        type: \"select\",","                        name : \"month\",","                        label: strings.month,","                        choices: this.monthsField","                    }, {","                        className : \"select-year\",","                        name : \"year\",","                        label: strings.year,","                        required : true,","                        showMsg : true,","                        regexp : /^[0-9]{4}$/,","                        value : this.get(\"host\").get(\"date\").getFullYear()","                    }]","                };","","                // inputex-panel options","                inputexOptions = {","                    boundingBox : this.selectPanelBoundingBox,","                    contentBox : this.selectPanelContentBox,","                    centered : this.calendarContentBox,","                    headerContent: strings.select,","                    width : this.panelOptions.width,","                    height : this.panelOptions.height,","                    inputEx: group,","                    label: 'label',","                    modal: true,","                    zIndex : 5,","                    // override the default behavior which is to hide the panel with the esc key","                    // because some problem on ie","                    hideOn : [{}],","                    buttons: [{","                        value: strings.ok,","                        section: Y.WidgetStdMod.FOOTER,","                        classNames : \"ok-button\",","                        action : Y.bind(this.saveAndHidePanel, this)","                    }, {","                        value: strings.cancel,","                        section: Y.WidgetStdMod.FOOTER,","                        action : function(){","                            that.hidePanel();","                        }","                    }]","                };","","            this.renderComponent(inputexOptions);","            ","            }else {","                this.showPanel();","            }","","","            this.selectPanelBoundingBox.align.center(this.calendarContentBox);","            this.calendarBoundingBox.on('keyup',function(e){","                if(that._isPanelVisible()){","                    //enter","                    if(e.keyCode === 13){","                        that.saveAndHidePanel();","                    }","                }","            });","","            this.set(\"panel\", this.panelField);","","        },","        /**","         * Prepare the panel","         *","         * @method _getOverlay","         * @private","         */","        _getOverlay : function(){","           return this.datepicker.oOverlay;","        },","        /**","         * Is the Panel visible ?","         *","         * @method _isPanelVisible","         * @private","         * return isPanelVisible","         */","        _isPanelVisible : function(){","            var panel = this.get(\"panel\"),","                isPanelVisible;","                if(panel){","                    isPanelVisible = panel.get(\"visible\");","                }","            return isPanelVisible;","        },","        /**","         *","         * @method saveAndHidePanel","         */","        saveAndHidePanel : function(){","            if(  this.validateFormInPanel()  ){","                // set the choosen values to the calendar","                var dateToUpdate = this.get(\"host\").get(\"date\"),","                    panel = this.get(\"panel\"),","                    selectedData = panel.get('field').getValue();","                ","                dateToUpdate.setMonth(selectedData.month);","                if(selectedData.year){","                    dateToUpdate.setFullYear(selectedData.year);","                }","                this.get(\"host\").set(\"date\",dateToUpdate);","                this.hidePanel();","            }","        },","        /**","         *","         * @method validateFormInPanel","         */","        validateFormInPanel : function(){","            return this.get(\"panel\").get(\"field\").validate();","        },","        /**","         *","         * @method hidePanel","         */","        hidePanel : function(){","            this.get(\"panel\").hide();","        },","        /**","         *","         * @method showPanel","         */","        showPanel : function(){","            this.get(\"panel\").show();","        },","        /**","         *","         * @method renderComponent","         */","        renderComponent : function(inputexOptions){","            this.panelField = new inputEx.Panel( inputexOptions );","            this.selectPanelBoundingBox.plug(Y.Plugin.Align);","            this.panelField.render();","        }","    }, {","        /**","         * Static property used to define the default attribute","         * configuration for the plugin.","         *","         * @property ATTRS","         * @type Object","         * @static","         */","        ATTRS: {","            /**","             * I18N","             *","             * @attribute string","             * @type Object","             */","            string: {","                valueFn: function () {","                    return Y.Intl.get(\"inputex-calendarNavigationPlugin\");","                }","            },","            /**","             * Panel which display select month and an input for teh year","             *","             * @attribute panel","             * @type Object","             */","            panel : {}","        }","    });","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"inputex-panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"align-plugin\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"10":0,"19":0,"20":0,"32":0,"43":0,"45":0,"57":0,"58":0,"59":0,"62":0,"64":0,"65":0,"66":0,"73":0,"82":0,"83":0,"84":0,"85":0,"86":0,"96":0,"102":0,"105":0,"106":0,"108":0,"109":0,"111":0,"112":0,"114":0,"117":0,"136":0,"159":0,"164":0,"167":0,"171":0,"172":0,"173":0,"175":0,"176":0,"181":0,"191":0,"201":0,"203":0,"204":0,"206":0,"213":0,"215":0,"219":0,"220":0,"221":0,"223":0,"224":0,"232":0,"239":0,"246":0,"253":0,"254":0,"255":0,"275":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"CalendarNavigationPlugin:19":0,"initializer:53":0,"(anonymous 2):84":0,"bindUI:81":0,"action:158":0,"(anonymous 3):172":0,"onHeaderClick:95":0,"_getOverlay:190":0,"_isPanelVisible:200":0,"saveAndHidePanel:212":0,"validateFormInPanel:231":0,"hidePanel:238":0,"showPanel:245":0,"renderComponent:252":0,"valueFn:274":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 59;
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
this.panelOptions = options;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 58);
this.datepicker = options.datepicker;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 59);
var i = 0,
                month,
                listOfMonths = this.get("string").monthsList;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 62);
var monthsField = this.monthsField = [];
            
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 64);
for(i = 0 ; i<12 ; i++){
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 65);
month = listOfMonths[i];
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 66);
monthsField.push({
                    label : month,
                    value : i
                });
            }

            //widget pattern
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 73);
this.bindUI();

        },
        /**
         * Bind events to UI
         *
         * @method bindUI
         */
        bindUI : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "bindUI", 81);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 82);
var that = this;
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 83);
this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 84);
this._getOverlay().get('boundingBox').on("mousedownoutside", function(e){
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 2)", 84);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 85);
if(that._isPanelVisible()){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 86);
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
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 95);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 96);
var that = this,
                group, inputexOptions,
                strings = this.get("string");



            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 102);
if(!this.panelField){

                // Y.node preparation
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 105);
this.calendarBoundingBox = this.get("host").get("boundingBox");
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 106);
this.calendarContentBox = this.get("host").get("contentBox");
            
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 108);
this.calendarBoundingBox.addClass("calendarBoundingBox");
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 109);
this.calendarContentBox.addClass("calendarContentBox");

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 111);
this.selectPanelBoundingBox = Y.Node.create('<div class="inputex-select-panel-boundingbox"></div>');
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 112);
this.selectPanelContentBox = Y.Node.create('<div class="inputex-select-panel-contentbox"></div>');

                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 114);
this.calendarBoundingBox.append(this.selectPanelBoundingBox);

                // setup a inputex group
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 117);
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
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 136);
inputexOptions = {
                    boundingBox : this.selectPanelBoundingBox,
                    contentBox : this.selectPanelContentBox,
                    centered : this.calendarContentBox,
                    headerContent: strings.select,
                    width : this.panelOptions.width,
                    height : this.panelOptions.height,
                    inputEx: group,
                    label: 'label',
                    modal: true,
                    zIndex : 5,
                    // override the default behavior which is to hide the panel with the esc key
                    // because some problem on ie
                    hideOn : [{}],
                    buttons: [{
                        value: strings.ok,
                        section: Y.WidgetStdMod.FOOTER,
                        classNames : "ok-button",
                        action : Y.bind(this.saveAndHidePanel, this)
                    }, {
                        value: strings.cancel,
                        section: Y.WidgetStdMod.FOOTER,
                        action : function(){
                            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "action", 158);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 159);
that.hidePanel();
                        }
                    }]
                };

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 164);
this.renderComponent(inputexOptions);
            
            }else {
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 167);
this.showPanel();
            }


            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 171);
this.selectPanelBoundingBox.align.center(this.calendarContentBox);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 172);
this.calendarBoundingBox.on('keyup',function(e){
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 3)", 172);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 173);
if(that._isPanelVisible()){
                    //enter
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 175);
if(e.keyCode === 13){
                        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 176);
that.saveAndHidePanel();
                    }
                }
            });

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 181);
this.set("panel", this.panelField);

        },
        /**
         * Prepare the panel
         *
         * @method _getOverlay
         * @private
         */
        _getOverlay : function(){
           _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_getOverlay", 190);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 191);
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
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_isPanelVisible", 200);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 201);
var panel = this.get("panel"),
                isPanelVisible;
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 203);
if(panel){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 204);
isPanelVisible = panel.get("visible");
                }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 206);
return isPanelVisible;
        },
        /**
         *
         * @method saveAndHidePanel
         */
        saveAndHidePanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "saveAndHidePanel", 212);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 213);
if(  this.validateFormInPanel()  ){
                // set the choosen values to the calendar
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 215);
var dateToUpdate = this.get("host").get("date"),
                    panel = this.get("panel"),
                    selectedData = panel.get('field').getValue();
                
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 219);
dateToUpdate.setMonth(selectedData.month);
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 220);
if(selectedData.year){
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 221);
dateToUpdate.setFullYear(selectedData.year);
                }
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 223);
this.get("host").set("date",dateToUpdate);
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 224);
this.hidePanel();
            }
        },
        /**
         *
         * @method validateFormInPanel
         */
        validateFormInPanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "validateFormInPanel", 231);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 232);
return this.get("panel").get("field").validate();
        },
        /**
         *
         * @method hidePanel
         */
        hidePanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "hidePanel", 238);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 239);
this.get("panel").hide();
        },
        /**
         *
         * @method showPanel
         */
        showPanel : function(){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "showPanel", 245);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 246);
this.get("panel").show();
        },
        /**
         *
         * @method renderComponent
         */
        renderComponent : function(inputexOptions){
            _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "renderComponent", 252);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 253);
this.panelField = new inputEx.Panel( inputexOptions );
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 254);
this.selectPanelBoundingBox.plug(Y.Plugin.Align);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 255);
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
                    _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 274);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 275);
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
        "align-plugin"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr"
    ]
});
