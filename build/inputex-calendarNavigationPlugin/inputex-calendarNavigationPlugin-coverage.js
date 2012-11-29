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
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","var pluginName = \"calendarNavigationPlugin\";","","Y.Plugin.CalendarNavigationPlugin = Y.Base.create(pluginName, Y.Plugin.Base, [], {","","    initializer: function () {","        ","        if (this.get('host').get('rendered')) {","            this._initHeaders();","        } else {","            this.afterHostMethod('renderUI', this._initHeaders);","        }","        ","    },","    ","    _initHeaders: function () {","        ","        var contentBox = this.get(\"host\").get(\"contentBox\"),","            headers    = contentBox.all('.yui3-calendar-header-label');","        ","        // add a class an the months' headers (for styling purpose)","        headers.addClass('yui3-calendar-clickable-header-label');","        ","        // intercept every click on the headers to display the panel","        contentBox.delegate(\"click\", Y.bind(this.onHeaderClick, this), '.yui3-calendar-clickable-header-label');","        ","    },","    ","    /**","     * Prepare the panel","     *","     * @method onHeaderClick","     */","    onHeaderClick: function() {","","        var strings = this.get(\"strings\"),","            that = this,","            calendarContentBox, bodyNode, panel, inputexGroup;","","        if (!this.panel_container) {","            this.panel_container = Y.Node.create('<div class=\"yui3-calendar-navplugin-widget\"></div>');","            calendarContentBox = this.get(\"host\").get(\"contentBox\");","            calendarContentBox.append(this.panel_container);","            bodyNode = Y.Node.create('<div class=\"yui3-widget-bd\"></div>');","","            this.panel_container.append(bodyNode);","","","            panel = new Y.Panel({","                headerContent: strings.select,","                srcNode: this.panel_container,","                visible: false,","                centered: calendarContentBox,","                modal: true,","                // strict policy of panel hiding because the panel's mask can't","                // be shared between several instances of Calendar (due to the","                // way WidgetModality extension is implemented).","                hideOn: [","                    // hide on 'esc' key","                    {","                       node: Y.one('document'),","                       eventName: 'key',","                       keyCode: 'esc'","                    },","                    // hide when mousedown or mouseup on anything outside the calendar","                    {","                       node: this.get(\"host\").get(\"boundingBox\"), // (default is panel's boundingBox if node not provided)","                       ","                       eventName: [","                          'mousedownoutside',","                          // sometimes redundant with 'mousedownoutside', but useful when","                          // 'mousedown' is caught and default behavior is prevented...","                          'mouseupoutside'","                       ]","                    }","                ],","                buttons: [{","                    value: strings.ok,","                    section: Y.WidgetStdMod.FOOTER,","                    classNames: \"ok-button\",","                    action: Y.bind(this.saveAndHidePanel, this)","                }, {","                    value: strings.cancel,","                    section: Y.WidgetStdMod.FOOTER,","                    action: Y.bind(this.cancelAndHidePanel, this)","                }]","","            }).render();","","            inputexGroup = new Y.inputEx.Group({","                parentEl: bodyNode,","                fields: [{","                    type: \"select\",","                    name: \"month\",","                    label: strings.month,","                    choices: this._prepareMonthsData()","                }, {","                    className: \"select-year\",","                    name: \"year\",","                    label: strings.year,","                    required: true,","                    showMsg: true,","                    maxLength: 4,","                    size: 4,","                    regexp: /^[0-9]{4}$/","                }]","            });","","","            this.get(\"host\").get(\"boundingBox\").on('keyup', function(e) {","                if(that._isPanelVisible()) {","                    //enter","                    if(e.keyCode === 13) {","                        that.saveAndHidePanel(e);","                    }","                }","            });","","            this.set(\"panel\", panel);","            this.set(\"inputexGroup\", inputexGroup);","","            // The  position of the mask is setted in javascript","            // So we can use css to change it's value","            Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","        }","","        this.showPanel();","    },","    /**","     *","     * @method saveAndHidePanel","     */","    saveAndHidePanel: function(e) {","","        e.halt(true);","","        if(this.validateFormInPanel()) {","            // set the choosen values to the calendar","            var dateToUpdate = this.get(\"host\").get(\"date\"),","                selectedData = this.get(\"inputexGroup\").getValue();","","            dateToUpdate.setMonth(selectedData.month);","            if(selectedData.year) {","                dateToUpdate.setFullYear(selectedData.year);","            }","            this.get(\"host\").set(\"date\", dateToUpdate);","            this.hidePanel();","        }","    },","    /**","     *","     * @method cancelAndHidePanel","     */","    cancelAndHidePanel: function(e) {","","        e.halt(true);","        this.hidePanel();","","    },","    /**","     *","     * @method validateFormInPanel","     */","    validateFormInPanel: function() {","        return this.get(\"inputexGroup\").validate();","    },","    /**","     *","     * @method hidePanel","     */","    hidePanel: function() {","        this.get(\"panel\").hide();","    },","    /**","     *","     * @method showPanel","     */","    showPanel: function() {","        ","        // preselect the current month and year","        var date = this.get(\"host\").get(\"date\");","        ","        this.get(\"inputexGroup\").setValue({","           month: date.getMonth(),","           year: date.getFullYear()","        });","        ","        // and display the panel","        this.get(\"panel\").show();","    },","    ","    _prepareMonthsData: function() {","        ","        var i = 0,","            month, listOfMonths = this.get(\"strings\").monthsList,","            monthsField = [];","            ","        for (i = 0; i < 12; i++) {","            month = listOfMonths[i];","            monthsField.push({","                label: month,","                value: i","            });","        }","        ","        return monthsField;","    },","    /**","     * Is the Panel visible ?","     *","     * @method _isPanelVisible","     * @private","     * return isPanelVisible","     */","    _isPanelVisible: function() {","        ","        var panel = this.get(\"panel\");","        ","        return panel ? panel.get(\"visible\") : false;","    }","","}, {","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    ATTRS: {","        /**","         * I18N","         *","         * @attribute strings","         * @type Object","         */","        strings: {","            valueFn: function() {","                return Y.Intl.get(\"inputex-\" + pluginName);","            }","        },","        /**","         *","         * @attribute panel","         * @type Object","         */","        panel: {},","        /**","         * represents the inputex group inside the panel","         *","         * @attribute inputexGroup","         * @type Object","         */","        inputexGroup: {}","    },","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    NS: \"calNavPlug\"","});","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"3":0,"5":0,"9":0,"10":0,"12":0,"19":0,"23":0,"26":0,"37":0,"41":0,"42":0,"43":0,"44":0,"45":0,"47":0,"50":0,"91":0,"111":0,"112":0,"114":0,"115":0,"120":0,"121":0,"125":0,"128":0,"136":0,"138":0,"140":0,"143":0,"144":0,"145":0,"147":0,"148":0,"157":0,"158":0,"166":0,"173":0,"182":0,"184":0,"190":0,"195":0,"199":0,"200":0,"201":0,"207":0,"218":0,"220":0,"240":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"initializer:7":0,"_initHeaders:17":0,"(anonymous 2):111":0,"onHeaderClick:35":0,"saveAndHidePanel:134":0,"cancelAndHidePanel:155":0,"validateFormInPanel:165":0,"hidePanel:172":0,"showPanel:179":0,"_prepareMonthsData:193":0,"_isPanelVisible:216":0,"valueFn:239":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 49;
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 1);
YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {

_yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 3);
var pluginName = "calendarNavigationPlugin";

_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 5);
Y.Plugin.CalendarNavigationPlugin = Y.Base.create(pluginName, Y.Plugin.Base, [], {

    initializer: function () {
        
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "initializer", 7);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 9);
if (this.get('host').get('rendered')) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 10);
this._initHeaders();
        } else {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 12);
this.afterHostMethod('renderUI', this._initHeaders);
        }
        
    },
    
    _initHeaders: function () {
        
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_initHeaders", 17);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 19);
var contentBox = this.get("host").get("contentBox"),
            headers    = contentBox.all('.yui3-calendar-header-label');
        
        // add a class an the months' headers (for styling purpose)
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 23);
headers.addClass('yui3-calendar-clickable-header-label');
        
        // intercept every click on the headers to display the panel
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 26);
contentBox.delegate("click", Y.bind(this.onHeaderClick, this), '.yui3-calendar-clickable-header-label');
        
    },
    
    /**
     * Prepare the panel
     *
     * @method onHeaderClick
     */
    onHeaderClick: function() {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 35);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 37);
var strings = this.get("strings"),
            that = this,
            calendarContentBox, bodyNode, panel, inputexGroup;

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 41);
if (!this.panel_container) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 42);
this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 43);
calendarContentBox = this.get("host").get("contentBox");
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 44);
calendarContentBox.append(this.panel_container);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 45);
bodyNode = Y.Node.create('<div class="yui3-widget-bd"></div>');

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 47);
this.panel_container.append(bodyNode);


            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 50);
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

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 91);
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
                    maxLength: 4,
                    size: 4,
                    regexp: /^[0-9]{4}$/
                }]
            });


            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 111);
this.get("host").get("boundingBox").on('keyup', function(e) {
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 2)", 111);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 112);
if(that._isPanelVisible()) {
                    //enter
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 114);
if(e.keyCode === 13) {
                        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 115);
that.saveAndHidePanel(e);
                    }
                }
            });

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 120);
this.set("panel", panel);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 121);
this.set("inputexGroup", inputexGroup);

            // The  position of the mask is setted in javascript
            // So we can use css to change it's value
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 125);
Y.one(".yui3-widget-mask").setStyle("position", "absolute");
        }

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 128);
this.showPanel();
    },
    /**
     *
     * @method saveAndHidePanel
     */
    saveAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "saveAndHidePanel", 134);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 136);
e.halt(true);

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 138);
if(this.validateFormInPanel()) {
            // set the choosen values to the calendar
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 140);
var dateToUpdate = this.get("host").get("date"),
                selectedData = this.get("inputexGroup").getValue();

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 143);
dateToUpdate.setMonth(selectedData.month);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 144);
if(selectedData.year) {
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 145);
dateToUpdate.setFullYear(selectedData.year);
            }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 147);
this.get("host").set("date", dateToUpdate);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 148);
this.hidePanel();
        }
    },
    /**
     *
     * @method cancelAndHidePanel
     */
    cancelAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "cancelAndHidePanel", 155);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 157);
e.halt(true);
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 158);
this.hidePanel();

    },
    /**
     *
     * @method validateFormInPanel
     */
    validateFormInPanel: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "validateFormInPanel", 165);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 166);
return this.get("inputexGroup").validate();
    },
    /**
     *
     * @method hidePanel
     */
    hidePanel: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "hidePanel", 172);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 173);
this.get("panel").hide();
    },
    /**
     *
     * @method showPanel
     */
    showPanel: function() {
        
        // preselect the current month and year
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "showPanel", 179);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 182);
var date = this.get("host").get("date");
        
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 184);
this.get("inputexGroup").setValue({
           month: date.getMonth(),
           year: date.getFullYear()
        });
        
        // and display the panel
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 190);
this.get("panel").show();
    },
    
    _prepareMonthsData: function() {
        
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_prepareMonthsData", 193);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 195);
var i = 0,
            month, listOfMonths = this.get("strings").monthsList,
            monthsField = [];
            
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 199);
for (i = 0; i < 12; i++) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 200);
month = listOfMonths[i];
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 201);
monthsField.push({
                label: month,
                value: i
            });
        }
        
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 207);
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
        
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_isPanelVisible", 216);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 218);
var panel = this.get("panel");
        
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 220);
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
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 239);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 240);
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
