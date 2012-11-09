
    var inputEx = Y.inputEx;

    function CalendarNavigationPlugin() {
        CalendarNavigationPlugin.superclass.constructor.apply(this, arguments);
    }

    CalendarNavigationPlugin.NAME = "calendarNavigationPlugin";
    CalendarNavigationPlugin.NS = "calNavPlug";

    inputEx.CalendarNavigationPlugin = Y.extend(CalendarNavigationPlugin, Y.Plugin.Base, {
        initializer: function () {
            var i = 0;

            console.log("edede");

            this.monthsField = this.get("string").monthsList.map(
                        function(item){
                            return {label : item, value : i++};
                        });
            window.calendarPlugin = this;
            window.Y = Y;
            //widget pattern
            this.bindUI();
        },
        bindUI : function(){
            this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
            Y.one("#demo").oOverlay.get('boundingBox').on("mousedownoutside", function(){
                console.log("mousedownoutside in plugin");
            });
        },
        onHeaderClick: function () {
            var strings = this.get("string"), 
            j = 0;
            
            var panelField = this.panelField = new inputEx.Panel({
                headerContent: strings.select,
                inputEx: {
                    type: "group",
                    fields: [{
                        type: "select",
                        name : "month",
                        label: strings.month,
                        choices: this.monthsField
                    }, {
                        name : "year",
                        label: strings.year
                    }]
                },
                label: 'label',
                modal: true,
                zIndex : 5,
                centered : this.get("host").get("contentBox"),
                buttons: [{
                    value: strings.ok,
                    section: Y.WidgetStdMod.FOOTER,
                    action : function(){
                        console.log(JSON.stringify(panelField.get('field').getValue()));
                        panelField.hide();
                    }
                }, {
                    value: strings.cancel,
                    section: Y.WidgetStdMod.FOOTER,
                    action : function(){
                        panelField.hide();
                    }
                }]
            });

            panelField.render(this.get("host").fieldContainer);
            panelField.show();

        }
    }, {
        ATTRS: {
            string: {
                valueFn: function () {
                    return Y.Intl.get("inputex-calendarNavigationPlugin");
                }
            }
        }
    });