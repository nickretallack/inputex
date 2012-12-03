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
_yuitest_coverage["build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js",
    code: []
};
_yuitest_coverage["build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js"].code=["YUI.add('inputex-calendar-year-navigator-plugin', function (Y, NAME) {","","Y.Plugin.CalendarYearNavigator = Y.Base.create(\"CalendarYearNavigator\", Y.Plugin.Base, [], {","","    initializer: function () {","        ","        if (this.get('host').get('rendered')) {","            this._initHeaders();","        } else {","            this.afterHostMethod('renderUI', this._initHeaders);","        }","        ","    },","    ","    _initHeaders: function () {","        ","        var contentBox = this.get(\"host\").get(\"contentBox\"),","            headers    = contentBox.all('.yui3-calendar-header-label');","        ","        // add a class an the months' headers (for styling purpose)","        headers.addClass('yui3-calendar-clickable-header-label');","        ","        // intercept every click on the headers to display the panel","        contentBox.delegate(\"click\", Y.bind(this.onHeaderClick, this), '.yui3-calendar-clickable-header-label');","        ","    },","    ","    /**","     * Prepare the panel","     *","     * @method onHeaderClick","     */","    onHeaderClick: function() {","","        var strings = this.get(\"strings\"),","            that = this,","            calendarContentBox, bodyNode, panel, inputexGroup;","","        if (!this.panel_container) {","            this.panel_container = Y.Node.create('<div class=\"yui3-calendar-navplugin-widget\"></div>');","            calendarContentBox = this.get(\"host\").get(\"contentBox\");","            calendarContentBox.append(this.panel_container);","            bodyNode = Y.Node.create('<div class=\"yui3-widget-bd\"></div>');","","            this.panel_container.append(bodyNode);","","","            panel = new Y.Panel({","                headerContent: strings.select,","                srcNode: this.panel_container,","                visible: false,","                centered: calendarContentBox,","                modal: true,","                // strict policy of panel hiding because the panel's mask can't","                // be shared between several instances of Calendar (due to the","                // way WidgetModality extension is implemented).","                hideOn: [","                    // hide on 'esc' key","                    {","                       node: Y.one('document'),","                       eventName: 'key',","                       keyCode: 'esc'","                    },","                    // hide when mousedown or mouseup on anything outside the calendar","                    {","                       node: this.get(\"host\").get(\"boundingBox\"), // (default is panel's boundingBox if node not provided)","                       ","                       eventName: [","                          'mousedownoutside',","                          // sometimes redundant with 'mousedownoutside', but useful when","                          // 'mousedown' is caught and default behavior is prevented...","                          'mouseupoutside'","                       ]","                    }","                ],","                buttons: [{","                    value: strings.ok,","                    section: Y.WidgetStdMod.FOOTER,","                    classNames: \"ok-button\",","                    action: Y.bind(this.saveAndHidePanel, this)","                }, {","                    value: strings.cancel,","                    section: Y.WidgetStdMod.FOOTER,","                    action: Y.bind(this.cancelAndHidePanel, this)","                }]","","            }).render();","","            inputexGroup = new Y.inputEx.Group({","                parentEl: bodyNode,","                fields: [{","                    type: \"select\",","                    name: \"month\",","                    label: strings.month,","                    choices: this._prepareMonthsData()","                }, {","                    name: \"year\",","                    label: strings.year,","                    required: true,","                    showMsg: true,","                    maxLength: 4,","                    size: 4,","                    regexp: /^[0-9]{4}$/","                }]","            });","","","            this.get(\"host\").get(\"boundingBox\").on('keyup', function(e) {","                if(that._isPanelVisible()) {","                    //enter","                    if(e.keyCode === 13) {","                        that.saveAndHidePanel(e);","                    }","                }","            });","","            this.set(\"panel\", panel);","            this.set(\"inputexGroup\", inputexGroup);","","            // The  position of the mask is setted in javascript","            // So we can use css to change it's value","            Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","        }","","        this.showPanel();","    },","    /**","     *","     * @method saveAndHidePanel","     */","    saveAndHidePanel: function(e) {","","        e.halt(true);","","        if(this.validateFormInPanel()) {","            // set the choosen values to the calendar","            var dateToUpdate = this.get(\"host\").get(\"date\"),","                selectedData = this.get(\"inputexGroup\").getValue();","","            dateToUpdate.setMonth(selectedData.month);","            if(selectedData.year) {","                dateToUpdate.setFullYear(selectedData.year);","            }","            this.get(\"host\").set(\"date\", dateToUpdate);","            this.hidePanel();","        }","    },","    /**","     *","     * @method cancelAndHidePanel","     */","    cancelAndHidePanel: function(e) {","","        e.halt(true);","        this.hidePanel();","","    },","    /**","     *","     * @method validateFormInPanel","     */","    validateFormInPanel: function() {","        return this.get(\"inputexGroup\").validate();","    },","    /**","     *","     * @method hidePanel","     */","    hidePanel: function() {","        this.get(\"panel\").hide();","    },","    /**","     *","     * @method showPanel","     */","    showPanel: function() {","        ","        // preselect the current month and year","        var date = this.get(\"host\").get(\"date\");","        ","        this.get(\"inputexGroup\").setValue({","           month: date.getMonth(),","           year: date.getFullYear()","        });","        ","        // and display the panel","        this.get(\"panel\").show();","    },","    ","    _prepareMonthsData: function() {","        ","        var i = 0,","            month, listOfMonths = this.get(\"strings\").monthsList,","            monthsField = [];","            ","        for (i = 0; i < 12; i++) {","            month = listOfMonths[i];","            monthsField.push({","                label: month,","                value: i","            });","        }","        ","        return monthsField;","    },","    /**","     * Is the Panel visible ?","     *","     * @method _isPanelVisible","     * @private","     * return isPanelVisible","     */","    _isPanelVisible: function() {","        ","        var panel = this.get(\"panel\");","        ","        return panel ? panel.get(\"visible\") : false;","    }","","}, {","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    ATTRS: {","        /**","         * I18N","         *","         * @attribute strings","         * @type Object","         */","        strings: {","            valueFn: function() {","                return Y.Intl.get(\"inputex-calendar-year-navigator-plugin\");","            }","        },","        /**","         *","         * @attribute panel","         * @type Object","         */","        panel: {},","        /**","         * represents the inputex group inside the panel","         *","         * @attribute inputexGroup","         * @type Object","         */","        inputexGroup: {}","    },","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    NS: \"yearNavigator\"","});","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js"].lines = {"1":0,"3":0,"7":0,"8":0,"10":0,"17":0,"21":0,"24":0,"35":0,"39":0,"40":0,"41":0,"42":0,"43":0,"45":0,"48":0,"89":0,"108":0,"109":0,"111":0,"112":0,"117":0,"118":0,"122":0,"125":0,"133":0,"135":0,"137":0,"140":0,"141":0,"142":0,"144":0,"145":0,"154":0,"155":0,"163":0,"170":0,"179":0,"181":0,"187":0,"192":0,"196":0,"197":0,"198":0,"204":0,"215":0,"217":0,"237":0};
_yuitest_coverage["build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js"].functions = {"initializer:5":0,"_initHeaders:15":0,"(anonymous 2):108":0,"onHeaderClick:33":0,"saveAndHidePanel:131":0,"cancelAndHidePanel:152":0,"validateFormInPanel:162":0,"hidePanel:169":0,"showPanel:176":0,"_prepareMonthsData:190":0,"_isPanelVisible:213":0,"valueFn:236":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js"].coveredLines = 48;
_yuitest_coverage["build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 1);
YUI.add('inputex-calendar-year-navigator-plugin', function (Y, NAME) {

_yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 3);
Y.Plugin.CalendarYearNavigator = Y.Base.create("CalendarYearNavigator", Y.Plugin.Base, [], {

    initializer: function () {
        
        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "initializer", 5);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 7);
if (this.get('host').get('rendered')) {
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 8);
this._initHeaders();
        } else {
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 10);
this.afterHostMethod('renderUI', this._initHeaders);
        }
        
    },
    
    _initHeaders: function () {
        
        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "_initHeaders", 15);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 17);
var contentBox = this.get("host").get("contentBox"),
            headers    = contentBox.all('.yui3-calendar-header-label');
        
        // add a class an the months' headers (for styling purpose)
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 21);
headers.addClass('yui3-calendar-clickable-header-label');
        
        // intercept every click on the headers to display the panel
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 24);
contentBox.delegate("click", Y.bind(this.onHeaderClick, this), '.yui3-calendar-clickable-header-label');
        
    },
    
    /**
     * Prepare the panel
     *
     * @method onHeaderClick
     */
    onHeaderClick: function() {

        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "onHeaderClick", 33);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 35);
var strings = this.get("strings"),
            that = this,
            calendarContentBox, bodyNode, panel, inputexGroup;

        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 39);
if (!this.panel_container) {
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 40);
this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 41);
calendarContentBox = this.get("host").get("contentBox");
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 42);
calendarContentBox.append(this.panel_container);
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 43);
bodyNode = Y.Node.create('<div class="yui3-widget-bd"></div>');

            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 45);
this.panel_container.append(bodyNode);


            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 48);
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

            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 89);
inputexGroup = new Y.inputEx.Group({
                parentEl: bodyNode,
                fields: [{
                    type: "select",
                    name: "month",
                    label: strings.month,
                    choices: this._prepareMonthsData()
                }, {
                    name: "year",
                    label: strings.year,
                    required: true,
                    showMsg: true,
                    maxLength: 4,
                    size: 4,
                    regexp: /^[0-9]{4}$/
                }]
            });


            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 108);
this.get("host").get("boundingBox").on('keyup', function(e) {
                _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "(anonymous 2)", 108);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 109);
if(that._isPanelVisible()) {
                    //enter
                    _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 111);
if(e.keyCode === 13) {
                        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 112);
that.saveAndHidePanel(e);
                    }
                }
            });

            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 117);
this.set("panel", panel);
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 118);
this.set("inputexGroup", inputexGroup);

            // The  position of the mask is setted in javascript
            // So we can use css to change it's value
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 122);
Y.one(".yui3-widget-mask").setStyle("position", "absolute");
        }

        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 125);
this.showPanel();
    },
    /**
     *
     * @method saveAndHidePanel
     */
    saveAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "saveAndHidePanel", 131);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 133);
e.halt(true);

        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 135);
if(this.validateFormInPanel()) {
            // set the choosen values to the calendar
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 137);
var dateToUpdate = this.get("host").get("date"),
                selectedData = this.get("inputexGroup").getValue();

            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 140);
dateToUpdate.setMonth(selectedData.month);
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 141);
if(selectedData.year) {
                _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 142);
dateToUpdate.setFullYear(selectedData.year);
            }
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 144);
this.get("host").set("date", dateToUpdate);
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 145);
this.hidePanel();
        }
    },
    /**
     *
     * @method cancelAndHidePanel
     */
    cancelAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "cancelAndHidePanel", 152);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 154);
e.halt(true);
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 155);
this.hidePanel();

    },
    /**
     *
     * @method validateFormInPanel
     */
    validateFormInPanel: function() {
        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "validateFormInPanel", 162);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 163);
return this.get("inputexGroup").validate();
    },
    /**
     *
     * @method hidePanel
     */
    hidePanel: function() {
        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "hidePanel", 169);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 170);
this.get("panel").hide();
    },
    /**
     *
     * @method showPanel
     */
    showPanel: function() {
        
        // preselect the current month and year
        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "showPanel", 176);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 179);
var date = this.get("host").get("date");
        
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 181);
this.get("inputexGroup").setValue({
           month: date.getMonth(),
           year: date.getFullYear()
        });
        
        // and display the panel
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 187);
this.get("panel").show();
    },
    
    _prepareMonthsData: function() {
        
        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "_prepareMonthsData", 190);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 192);
var i = 0,
            month, listOfMonths = this.get("strings").monthsList,
            monthsField = [];
            
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 196);
for (i = 0; i < 12; i++) {
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 197);
month = listOfMonths[i];
            _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 198);
monthsField.push({
                label: month,
                value: i
            });
        }
        
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 204);
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
        
        _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "_isPanelVisible", 213);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 215);
var panel = this.get("panel");
        
        _yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 217);
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
         * @attribute strings
         * @type Object
         */
        strings: {
            valueFn: function() {
                _yuitest_coverfunc("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", "valueFn", 236);
_yuitest_coverline("build/inputex-calendar-year-navigator-plugin/inputex-calendar-year-navigator-plugin.js", 237);
return Y.Intl.get("inputex-calendar-year-navigator-plugin");
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
         * @attribute inputexGroup
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
    NS: "yearNavigator"
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
