YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {

var getClassName = Y.ClassNameManager.getClassName;

Y.Plugin.CalendarNavigationPlugin = Y.Base.create("calendarNavigationPlugin", Y.Plugin.Base, [], {

    initializer : function(){
        this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
        console.log("initializer",'debug',"calendarNavigationPlugin");
    },
    /**
         * Prepare the panel
         *
         * @method onHeaderClick
         */
        onHeaderClick: function () {
            console.log("onHeaderClick",'debug',"calendarNavigationPlugin");

            var strings = this.get("string"),
                calendarContentBox;

                if(!this.panel){
                    this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
                    calendarContentBox = this.get("host").get("contentBox");
                    calendarContentBox.append(this.panel_container);
                    //Y.one('body').append(this.panel_container);

                    this.panel_container.append(Y.Node.create('<div class="yui3-widget-bd">' + this._prepareTemplate() + '</div>'));

                    this.panel = new Y.Panel({
                        headerContent: strings.select,
                        //bodyContent : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",// this.template, //"",
                        srcNode : this.panel_container, // this.get("host").get("contentBox"),
                        visible : false,
                        centered: calendarContentBox,
                        modal: true,
                        maskNode : this.panel_container,
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

                    });
                    
                    this.panel.render();

                    // The  position of the mask is setted in javascript
                    // So we can use css to change it's value
                    Y.one(".yui3-widget-mask").setStyle("position", "absolute");
                    //Y.one(".yui3-widget-bd").append(this.template);
                
                    //console.log(Y.one(".yui3-widget-bd"), 'Y.one(".yui3-widget-bd")');
                    //console.log(this.template, 'this.template');

                }
            


            //     var field5 = new Y.inputEx.Group({parentEl: Y.one(".yui3-widget-bd"),
            //         fields: [{
            //             type: "select",
            //             name : "month",
            //             label: strings.month,
            //             choices: this._prepareMonthsData()
            //         }, {
            //             className : "select-year",
            //             name : "year",
            //             label: strings.year,
            //             required : true,
            //             showMsg : true,
            //             regexp : /^[0-9]{4}$/,
            //             value : this.get("host").get("date").getFullYear()
            //         }]
            // });


            
                this.panel.show();

        },_prepareTemplate : function(){
            var template = this.template,
                strings = this.get("string");

                console.log(getClassName("test"));

            return Y.substitute(template, {
                selectContent : this._getMonthsData(),
                label_select : strings.month,
                label_year : strings.year,
                nav_select_id : "yui3-month-selection"
            });
        },
        _getMonthsData : function(){
            var i = 0,
                month,
                listOfMonths = this.get("string").monthsList,
                optionTemplate = '<option value="{value}">{label}</option>',
                result;

            for(i = 0 ; i<12 ; i++){
                month = listOfMonths[i];
             
                result += Y.substitute(optionTemplate, {
                    label : month,
                    value : i
                });

                // monthsField.push({
                //     label : month,
                //     value : i
                // });
            }
            return result;
        },
        /**
         *
         * @method saveAndHidePanel
         */
        saveAndHidePanel : function(e){




            // e.halt(true);

            // if(  this.validateFormInPanel()  ){
            //     // set the choosen values to the calendar
            //     var dateToUpdate = this.get("host").get("date"),
            //         panel = this.get("panel"),
            //         selectedData = panel.get('field').getValue();
                
            //     dateToUpdate.setMonth(selectedData.month);
            //     if(selectedData.year){
            //         dateToUpdate.setFullYear(selectedData.year);
            //     }
            //     this.get("host").set("date",dateToUpdate);
            //     this.hidePanel();
            // }

        },
        /**
         *
         * @method cancelAndHidePanel
         */
        cancelAndHidePanel : function(e){
            
            e.halt(true);
            this.hidePanel();
            
        },
        template : '<div id="nav-form-id">'+
                        '<div>'+
                            '<label for="{nav_select_id}">{label_select}</label>'+
                            '<select id="{nav_select_id}">{selectContent}</select>'+
                        '</div>'+
                        '<div>'+
                            '<label for="{nav_year_id}">{label_year}</label>'+
                            '<input id="{nav_year_id}"></input>'+
                        '</div>'+
                    '</div>'
}, {
    ATTRS : {
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
            }
    },
    NS : "calNavPlug"
});

}, '@VERSION@', {
    "requires": [
        "intl",
        "plugin",
        "inputex-panel",
        "inputex-group",
        "inputex-select",
        "inputex-string",
        "align-plugin",
        "substitute"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr"
    ]
});
