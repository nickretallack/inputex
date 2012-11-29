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
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","var pluginName = \"calendarNavigationPlugin\";","","Y.Plugin.CalendarNavigationPlugin = Y.Base.create(pluginName, Y.Plugin.Base, [], {","","    initializer: function() {","        this.get(\"host\").get(\"boundingBox\").delegate(\"click\", Y.bind(this.onHeaderClick, this), \".yui3-calendar-header-label\");","    },","    /**","     * Prepare the panel","     *","     * @method onHeaderClick","     */","    onHeaderClick: function() {","","        var strings = this.get(\"string\"),","            that = this,","            calendarContentBox, bodyNode, panel, inputexGroup;","","        if(!this.panel_container) {","            this.panel_container = Y.Node.create('<div class=\"yui3-calendar-navplugin-widget\"></div>');","            calendarContentBox = this.get(\"host\").get(\"contentBox\");","            calendarContentBox.append(this.panel_container);","            bodyNode = Y.Node.create('<div class=\"yui3-widget-bd\"></div>');","","            this.panel_container.append(bodyNode);","","","            panel = new Y.Panel({","                headerContent: strings.select,","                srcNode: this.panel_container,","                visible: false,","                centered: calendarContentBox,","                modal: true,","                // strict policy of panel hiding because the panel's mask can't","                // be shared between several instances of Calendar (due to the","                // way WidgetModality extension is implemented).","                hideOn: [","                    // hide on 'esc' key","                    {","                       node: Y.one('document'),","                       eventName: 'key',","                       keyCode: 'esc'","                    },","                    // hide when mousedown or mouseup on anything outside the calendar","                    {","                       node: this.get(\"host\").get(\"boundingBox\"), // (default is panel's boundingBox if node not provided)","                       ","                       eventName: [","                          'mousedownoutside',","                          // sometimes redundant with 'mousedownoutside', but useful when","                          // 'mousedown' is caught and default behavior is prevented...","                          'mouseupoutside'","                       ]","                    }","                ],","                buttons: [{","                    value: strings.ok,","                    section: Y.WidgetStdMod.FOOTER,","                    classNames: \"ok-button\",","                    action: Y.bind(this.saveAndHidePanel, this)","                }, {","                    value: strings.cancel,","                    section: Y.WidgetStdMod.FOOTER,","                    action: Y.bind(this.cancelAndHidePanel, this)","                }]","","            }).render();","","            inputexGroup = new Y.inputEx.Group({","                parentEl: bodyNode,","                fields: [{","                    type: \"select\",","                    name: \"month\",","                    label: strings.month,","                    choices: this._prepareMonthsData()","                }, {","                    className: \"select-year\",","                    name: \"year\",","                    label: strings.year,","                    required: true,","                    showMsg: true,","                    regexp: /^[0-9]{4}$/","                }]","            });","","","            this.get(\"host\").get(\"boundingBox\").on('keyup', function(e) {","                if(that._isPanelVisible()) {","                    //enter","                    if(e.keyCode === 13) {","                        that.saveAndHidePanel(e);","                    }","                }","            });","","            this.set(\"panel\", panel);","            this.set(\"inputexGroup\", inputexGroup);","","            // The  position of the mask is setted in javascript","            // So we can use css to change it's value","            Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","        }","","        this.showPanel();","    },","    /**","     *","     * @method saveAndHidePanel","     */","    saveAndHidePanel: function(e) {","","        e.halt(true);","","        if(this.validateFormInPanel()) {","            // set the choosen values to the calendar","            var dateToUpdate = this.get(\"host\").get(\"date\"),","                selectedData = this.get(\"inputexGroup\").getValue();","","            dateToUpdate.setMonth(selectedData.month);","            if(selectedData.year) {","                dateToUpdate.setFullYear(selectedData.year);","            }","            this.get(\"host\").set(\"date\", dateToUpdate);","            this.hidePanel();","        }","    },","    /**","     *","     * @method cancelAndHidePanel","     */","    cancelAndHidePanel: function(e) {","","        e.halt(true);","        this.hidePanel();","","    },","    /**","     *","     * @method validateFormInPanel","     */","    validateFormInPanel: function() {","        return this.get(\"inputexGroup\").validate();","    },","    /**","     *","     * @method hidePanel","     */","    hidePanel: function() {","        this.get(\"panel\").hide();","    },","    /**","     *","     * @method showPanel","     */","    showPanel: function() {","        ","        // preselect the current month and year","        var date = this.get(\"host\").get(\"date\");","        ","        this.get(\"inputexGroup\").setValue({","           month: date.getMonth(),","           year: date.getFullYear()","        });","        ","        // and display the panel","        this.get(\"panel\").show();","    },","    ","    _prepareMonthsData: function() {","        ","        var i = 0,","            month, listOfMonths = this.get(\"string\").monthsList,","            monthsField = [];","            ","        for (i = 0; i < 12; i++) {","            month = listOfMonths[i];","            monthsField.push({","                label: month,","                value: i","            });","        }","        ","        return monthsField;","    },","    /**","     * Is the Panel visible ?","     *","     * @method _isPanelVisible","     * @private","     * return isPanelVisible","     */","    _isPanelVisible: function() {","        ","        var panel = this.get(\"panel\");","        ","        return panel ? panel.get(\"visible\") : false;","    }","","}, {","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    ATTRS: {","        /**","         * I18N","         *","         * @attribute string","         * @type Object","         */","        string: {","            valueFn: function() {","                return Y.Intl.get(\"inputex-\" + pluginName);","            }","        },","        /**","         *","         * @attribute panel","         * @type Object","         */","        panel: {},","        /**","         * represents the inputex group inside the panel","         *","         * @attribute string","         * @type Object","         */","        inputexGroup: {}","    },","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    NS: \"calNavPlug\"","});","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"3":0,"5":0,"8":0,"17":0,"21":0,"22":0,"23":0,"24":0,"25":0,"27":0,"30":0,"71":0,"89":0,"90":0,"92":0,"93":0,"98":0,"99":0,"103":0,"106":0,"114":0,"116":0,"118":0,"121":0,"122":0,"123":0,"125":0,"126":0,"135":0,"136":0,"144":0,"151":0,"160":0,"162":0,"168":0,"173":0,"177":0,"178":0,"179":0,"185":0,"196":0,"198":0,"218":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"initializer:7":0,"(anonymous 2):89":0,"onHeaderClick:15":0,"saveAndHidePanel:112":0,"cancelAndHidePanel:133":0,"validateFormInPanel:143":0,"hidePanel:150":0,"showPanel:157":0,"_prepareMonthsData:171":0,"_isPanelVisible:194":0,"valueFn:217":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 44;
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 1);
YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {

_yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 3);
var pluginName = "calendarNavigationPlugin";

_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 5);
Y.Plugin.CalendarNavigationPlugin = Y.Base.create(pluginName, Y.Plugin.Base, [], {

    initializer: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "initializer", 7);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 8);
this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
    },
    /**
     * Prepare the panel
     *
     * @method onHeaderClick
     */
    onHeaderClick: function() {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 15);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 17);
var strings = this.get("string"),
            that = this,
            calendarContentBox, bodyNode, panel, inputexGroup;

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 21);
if(!this.panel_container) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 22);
this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 23);
calendarContentBox = this.get("host").get("contentBox");
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 24);
calendarContentBox.append(this.panel_container);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 25);
bodyNode = Y.Node.create('<div class="yui3-widget-bd"></div>');

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 27);
this.panel_container.append(bodyNode);


            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 30);
panel = new Y.Panel({
                headerContent: strings.select,
                srcNode: this.panel_container,
                visible: false,
                centered: calendarContentBox,
                modal: true,
                // strict policy of panel hiding because the panel's mask can't
                // be shared between several instances of Calendar (due to the
                // way WidgetModality extension is implemented).
                hideOn: [
                    // hide on 'esc' key
                    {
                       node: Y.one('document'),
                       eventName: 'key',
                       keyCode: 'esc'
                    },
                    // hide when mousedown or mouseup on anything outside the calendar
                    {
                       node: this.get("host").get("boundingBox"), // (default is panel's boundingBox if node not provided)
                       
                       eventName: [
                          'mousedownoutside',
                          // sometimes redundant with 'mousedownoutside', but useful when
                          // 'mousedown' is caught and default behavior is prevented...
                          'mouseupoutside'
                       ]
                    }
                ],
                buttons: [{
                    value: strings.ok,
                    section: Y.WidgetStdMod.FOOTER,
                    classNames: "ok-button",
                    action: Y.bind(this.saveAndHidePanel, this)
                }, {
                    value: strings.cancel,
                    section: Y.WidgetStdMod.FOOTER,
                    action: Y.bind(this.cancelAndHidePanel, this)
                }]

            }).render();

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 71);
inputexGroup = new Y.inputEx.Group({
                parentEl: bodyNode,
                fields: [{
                    type: "select",
                    name: "month",
                    label: strings.month,
                    choices: this._prepareMonthsData()
                }, {
                    className: "select-year",
                    name: "year",
                    label: strings.year,
                    required: true,
                    showMsg: true,
                    regexp: /^[0-9]{4}$/
                }]
            });


            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 89);
this.get("host").get("boundingBox").on('keyup', function(e) {
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 2)", 89);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 90);
if(that._isPanelVisible()) {
                    //enter
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 92);
if(e.keyCode === 13) {
                        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 93);
that.saveAndHidePanel(e);
                    }
                }
            });

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 98);
this.set("panel", panel);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 99);
this.set("inputexGroup", inputexGroup);

            // The  position of the mask is setted in javascript
            // So we can use css to change it's value
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 103);
Y.one(".yui3-widget-mask").setStyle("position", "absolute");
        }

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 106);
this.showPanel();
    },
    /**
     *
     * @method saveAndHidePanel
     */
    saveAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "saveAndHidePanel", 112);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 114);
e.halt(true);

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 116);
if(this.validateFormInPanel()) {
            // set the choosen values to the calendar
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 118);
var dateToUpdate = this.get("host").get("date"),
                selectedData = this.get("inputexGroup").getValue();

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 121);
dateToUpdate.setMonth(selectedData.month);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 122);
if(selectedData.year) {
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 123);
dateToUpdate.setFullYear(selectedData.year);
            }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 125);
this.get("host").set("date", dateToUpdate);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 126);
this.hidePanel();
        }
    },
    /**
     *
     * @method cancelAndHidePanel
     */
    cancelAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "cancelAndHidePanel", 133);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 135);
e.halt(true);
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 136);
this.hidePanel();

    },
    /**
     *
     * @method validateFormInPanel
     */
    validateFormInPanel: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "validateFormInPanel", 143);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 144);
return this.get("inputexGroup").validate();
    },
    /**
     *
     * @method hidePanel
     */
    hidePanel: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "hidePanel", 150);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 151);
this.get("panel").hide();
    },
    /**
     *
     * @method showPanel
     */
    showPanel: function() {
        
        // preselect the current month and year
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "showPanel", 157);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 160);
var date = this.get("host").get("date");
        
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 162);
this.get("inputexGroup").setValue({
           month: date.getMonth(),
           year: date.getFullYear()
        });
        
        // and display the panel
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 168);
this.get("panel").show();
    },
    
    _prepareMonthsData: function() {
        
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_prepareMonthsData", 171);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 173);
var i = 0,
            month, listOfMonths = this.get("string").monthsList,
            monthsField = [];
            
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 177);
for (i = 0; i < 12; i++) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 178);
month = listOfMonths[i];
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 179);
monthsField.push({
                label: month,
                value: i
            });
        }
        
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 185);
return monthsField;
    },
    /**
     * Is the Panel visible ?
     *
     * @method _isPanelVisible
     * @private
     * return isPanelVisible
     */
    _isPanelVisible: function() {
        
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_isPanelVisible", 194);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 196);
var panel = this.get("panel");
        
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 198);
return panel ? panel.get("visible") : false;
    }

}, {
    /**
     * Namespace of this component.
     *
     * @property NS
     * @type String
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
            valueFn: function() {
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 217);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 218);
return Y.Intl.get("inputex-" + pluginName);
            }
        },
        /**
         *
         * @attribute panel
         * @type Object
         */
        panel: {},
        /**
         * represents the inputex group inside the panel
         *
         * @attribute string
         * @type Object
         */
        inputexGroup: {}
    },
    /**
     * Namespace of this component.
     *
     * @property NS
     * @type String
     * @static
     */
    NS: "calNavPlug"
});

}, '@VERSION@', {
    "requires": [
        "intl",
        "plugin",
        "panel",
        "inputex-group",
        "inputex-select",
        "inputex-string"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr"
    ]
});
