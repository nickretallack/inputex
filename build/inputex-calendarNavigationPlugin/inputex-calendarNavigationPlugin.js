YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {


    /**
     * A plugin class which provides quick access to month/year in the Calendar.
     *
     * @module inputex-calendarNavigationPlugin
     */

    var inputEx = Y.inputEx;

    /**
     * A plugin class which provides quick access to month/year in the Calendar.
     *
     * @class CalendarNavigationPlugin
     * @extends Plugin.Base
     * @namespace Plugin
     */
    function CalendarNavigationPlugin(options) {
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
    CalendarNavigationPlugin.NS = "calNavPlug";

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
            this.options = options;
            this.datepicker = options.datepicker;

            // could be "all" or "content"
            this.options.mask = options.mask ? options.mask : "content";

            var i = 0,
                month,
                listOfMonths = this.get("string").monthsList;
            var monthsField = this.monthsField = [];
            
            for(i = 0 ; i<12 ; i++){
                month = listOfMonths[i];
                monthsField.push({
                    label : month,
                    value : i
                });
            }

            //widget pattern
            this.bindUI();

        },
        /**
         * Bind events to UI
         *
         * @method bindUI
         */
        bindUI : function(){
            var that = this;
            this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
            this._getOverlay().get('boundingBox').on("mousedownoutside", function(e){
                if(that._isPanelVisible()){
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
            var that = this,
                group, inputexOptions,
                strings = this.get("string");



            if(!this.panelField){

                // Y.node preparation
                this.calendarBoundingBox = this.get("host").get("boundingBox");
                this.calendarContentBox = this.get("host").get("contentBox");

                this.selectPanelBoundingBox = Y.Node.create('<div class="inputex-select-panel-boundingbox"></div>');
                this.selectPanelContentBox = Y.Node.create('<div class="inputex-select-panel-contentbox"></div>');

                this.calendarBoundingBox.append(this.selectPanelBoundingBox);

                // setup a inputex group
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

            this.renderComponent(inputexOptions);
            
            }else {
                this.showPanel();
            }
            
            // when the panel is visible the mask take all the screen
            // we want to have the mask only on the calendar's contentbox
            if(this.options.mask === "content"){
                Y.one(".yui3-widget-mask").setStyle("position", "absolute");
            }
            

            // align the panel in the center of the calendar's contentbox
            this.selectPanelBoundingBox.align.center(this.calendarContentBox);
            
            this.calendarBoundingBox.on('keyup',function(e){
                if(that._isPanelVisible()){
                    //enter
                    if(e.keyCode === 13){
                        that.saveAndHidePanel(e);
                    }
                }
            });
            this.set("panel", this.panelField);
        },
        /**
         * Prepare the panel
         *
         * @method _getOverlay
         * @private
         */
        _getOverlay : function(){
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
            var panel = this.get("panel"),
                isPanelVisible;
                if(panel){
                    isPanelVisible = panel.get("visible");
                }
            return isPanelVisible;
        },
        /**
         *
         * @method saveAndHidePanel
         */
        saveAndHidePanel : function(e){

            e.halt(true);

            if(  this.validateFormInPanel()  ){
                // set the choosen values to the calendar
                var dateToUpdate = this.get("host").get("date"),
                    panel = this.get("panel"),
                    selectedData = panel.get('field').getValue();
                
                dateToUpdate.setMonth(selectedData.month);
                if(selectedData.year){
                    dateToUpdate.setFullYear(selectedData.year);
                }
                this.get("host").set("date",dateToUpdate);
                this.hidePanel();
            }
        },
        /**
         *
         * @method cancelAndHidePanel
         */
        cancelAndHidePanel : function(e){
            
            e.halt(true);
            this.hidePanel();
            
        },
        /**
         *
         * @method validateFormInPanel
         */
        validateFormInPanel : function(){
            return this.get("panel").get("field").validate();
        },
        /**
         *
         * @method hidePanel
         */
        hidePanel : function(){
            this.get("panel").hide();
        },
        /**
         *
         * @method showPanel
         */
        showPanel : function(){
            this.get("panel").show();
        },
        /**
         *
         * @method renderComponent
         */
        renderComponent : function(inputexOptions){
            this.panelField = new inputEx.Panel( inputexOptions );
            this.selectPanelBoundingBox.plug(Y.Plugin.Align);
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
