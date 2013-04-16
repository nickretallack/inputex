YUI.add('inputex-calendar-year-navigator-plugin', function (Y, NAME) {

Y.Plugin.CalendarYearNavigator = Y.Base.create("CalendarYearNavigator", Y.Plugin.Base, [], {

    initializer: function () {
        
        if (this.get('host').get('rendered')) {
            this._initHeaders();
        } else {
            this.afterHostMethod('renderUI', this._initHeaders);
        }
        
    },
    
    _initHeaders: function () {
        
        var contentBox = this.get("host").get("contentBox"),
            headers    = contentBox.all('.yui3-calendar-header-label');
        
        // add a class an the months' headers (for styling purpose)
        headers.addClass('yui3-calendar-clickable-header-label');
        
        // intercept every click on the headers to display the panel
        contentBox.delegate("click", Y.bind(this.onHeaderClick, this), '.yui3-calendar-clickable-header-label');
        
    },
    
    /**
     * Prepare the panel
     *
     * @method onHeaderClick
     */
    onHeaderClick: function() {

        var strings = this.get("strings"),
            that = this,
            calendarContentBox, bodyNode, panel, inputexGroup;

        if (!this.panel_container) {
            this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
            calendarContentBox = this.get("host").get("contentBox");
            calendarContentBox.append(this.panel_container);
            bodyNode = Y.Node.create('<div class="yui3-widget-bd"></div>');

            this.panel_container.append(bodyNode);


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


            this.get("host").get("boundingBox").on('keyup', function(e) {
                if(that._isPanelVisible()) {
                    //enter
                    if(e.keyCode === 13) {
                        that.saveAndHidePanel(e);
                    }
                }
            });

            this.set("panel", panel);
            this.set("inputexGroup", inputexGroup);

            // The  position of the mask is setted in javascript
            // So we can use css to change it's value
            Y.one(".yui3-widget-mask").setStyle("position", "absolute");
        }

        this.showPanel();
    },
    /**
     *
     * @method saveAndHidePanel
     */
    saveAndHidePanel: function(e) {

        e.halt(true);

        if(this.validateFormInPanel()) {
            // set the choosen values to the calendar
            var dateToUpdate = this.get("host").get("date"),
                selectedData = this.get("inputexGroup").getValue();

            dateToUpdate.setMonth(selectedData.month);
            if(selectedData.year) {
                dateToUpdate.setFullYear(selectedData.year);
            }
            this.get("host").set("date", dateToUpdate);
            this.hidePanel();
        }
    },
    /**
     *
     * @method cancelAndHidePanel
     */
    cancelAndHidePanel: function(e) {

        e.halt(true);
        this.hidePanel();

    },
    /**
     *
     * @method validateFormInPanel
     */
    validateFormInPanel: function() {
        return this.get("inputexGroup").validate();
    },
    /**
     *
     * @method hidePanel
     */
    hidePanel: function() {
        this.get("panel").hide();
    },
    /**
     *
     * @method showPanel
     */
    showPanel: function() {
        
        // preselect the current month and year
        var date = this.get("host").get("date");
        
        this.get("inputexGroup").setValue({
           month: date.getMonth(),
           year: date.getFullYear()
        });
        
        // and display the panel
        this.get("panel").show();
    },
    
    _prepareMonthsData: function() {
        
        var i = 0,
            month, listOfMonths = this.get("strings").monthsList,
            monthsField = [];
            
        for (i = 0; i < 12; i++) {
            month = listOfMonths[i];
            monthsField.push({
                label: month,
                value: i
            });
        }
        
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
        
        var panel = this.get("panel");
        
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
        "node-base",
        "node-event-delegate",
        "plugin",
        "panel",
        "inputex-group",
        "inputex-select",
        "inputex-string"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr",
        "de"
    ]
});
