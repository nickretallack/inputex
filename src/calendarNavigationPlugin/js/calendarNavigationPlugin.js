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
                    this.panel_container.setStyle("border", "5px solid green");
                    calendarContentBox = this.get("host").get("contentBox");
                    calendarContentBox.append(this.panel_container);
                    //Y.one('body').append(this.panel_container);

                    this.panel_container.append(Y.Node.create('<div class="yui3-widget-bd">' + this.template + '</div>'));

                    this.panel = new Y.Panel({
                        headerContent : "header",
                        footerContent : "footer",
                        //bodyContent : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",// this.template, //"",
                        srcNode : this.panel_container, // this.get("host").get("contentBox"),
                        visible : false,
                        centered: calendarContentBox,
                        modal: true
                    });
                    
                    this.panel.render();
                     this.panel.set("maskNode",this.panel_container);

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

        },
        _prepareMonthsData : function(){
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
            return monthsField;
        },
        template : '<div id="nav-form-id">'+
                        '<div>'+
                            '<label for="{nav-select-id}"></label>'+
                            '<select id="{nav-select-id}" ></select>'+
                        '</div>'+
                        '<div>'+
                            '<label for="{nav-year-id}"></label>'+
                            '<input id="{nav-year-id}"></input>'+
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