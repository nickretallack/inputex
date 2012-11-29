var pluginName = "calendarNavigationPlugin";

Y.Plugin.CalendarNavigationPlugin = Y.Base.create(pluginName, Y.Plugin.Base, [], {

    initializer: function() {
        this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
    },
    /**
     * Prepare the panel
     *
     * @method onHeaderClick
     */
    onHeaderClick: function() {

        var strings = this.get("string"),
            that = this,
            calendarContentBox, bodyNode, panel, inputexGroup;

        if(!this.panel_container) {
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
                maskNode: this.panel_container,
                // hideOn
                // override the default behavior which is to hide the panel with the esc key
                // because some problem on ie7
                hideOn: [{}],
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
                    className: "select-year",
                    name: "year",
                    label: strings.year,
                    required: true,
                    showMsg: true,
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
            month, listOfMonths = this.get("string").monthsList,
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
         * @attribute string
         * @type Object
         */
        string: {
            valueFn: function() {
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