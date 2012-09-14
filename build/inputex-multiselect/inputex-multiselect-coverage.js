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
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-multiselect/inputex-multiselect.js",
    code: []
};
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].code=["YUI.add('inputex-multiselect', function (Y, NAME) {","","/**"," * @module inputex-multiselect"," */","YUI.add(\"inputex-multiselect\", function (Y) {","   ","   var inputEx = Y.inputEx,","       lang = Y.Lang;","   ","    /**","     * Create a multi select field","     * @class inputEx.MultiSelectField","     * @extends inputEx.SelectField","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}])</li>","     * </ul>","     */","    inputEx.MultiSelectField = function (options) {","        inputEx.MultiSelectField.superclass.constructor.call(this, options);","    };","","    Y.extend(inputEx.MultiSelectField, inputEx.SelectField, {","","        /**","         * Build the DDList","         * @method renderComponent","         */","        renderComponent: function () {","","            inputEx.MultiSelectField.superclass.renderComponent.call(this);","","            this.ddlist = new inputEx.DDListField({","                parentEl: this.fieldContainer","            });","","        },","","        /**","         * Register the \"change\" event","         * @method initEvents","         */","        initEvents: function () {","            Y.on(\"change\", this.onAddNewItem, this.el, this);","            this.ddlist.on(\"itemRemoved\", this.onItemRemoved, this);","            this.ddlist.on(\"updated\", this.fireUpdatedEvt, this);","        },","","        /**","         * Re-enable the option element when an item is removed by the user","         * @method onItemRemoved","         */","        onItemRemoved: function (params) {","","            this.showChoice({","                value: params","            });","            this.el.selectedIndex = 0;","","            this.fireUpdatedEvt();","","        },","","        /**","         * Add an item to the list when the select changed","         * @method onAddNewItem","         */","        onAddNewItem: function () {","","            var value, position, choice;","","            if (this.el.selectedIndex !== 0) {","               ","               // Get the selector value","               value = inputEx.MultiSelectField.superclass.getValue.call(this);","               ","               position = this.getChoicePosition({","                  value: value","               });","               choice = this.choicesList[position];","               ","               this.ddlist.addItem({","                  value: value,","                  label: choice.label","               });","               ","               // hide choice that has just been selected (+ select first choice)","               this.hideChoice({","                  position: position","               });","               this.el.selectedIndex = 0;","               ","               this.fireUpdatedEvt();","               ","            }","        },","","        /**","         * Set the value of the list","         * @method setValue","         * @param {String} value The value to set","         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (value, sendUpdatedEvt) {","","            var i, length, position, choice, ddlistValue = [];","","            if (!lang.isArray(value)) {","                return;","            }","","            // Re-show all choices","            for (i = 0, length = this.choicesList.length; i < length; i += 1) {","                this.showChoice({","                    position: i","                });","            }","","            // Hide selected choices and fill ddlist value","            for (i = 0, length = value.length; i < length; i += 1) {","","                position = this.getChoicePosition({","                    value: value[i]","                });","                choice = this.choicesList[position];","","                ddlistValue.push({","                    value: choice.value,","                    label: choice.label","                });","","                this.hideChoice({","                    position: position","                });","            }","","            // set ddlist value","            this.ddlist.setValue(ddlistValue);","","            // reset select to first choice","            this.el.selectedIndex = 0;","","            if (sendUpdatedEvt !== false) {","                // fire update event","                this.fireUpdatedEvt();","            }","        },","","        /**","         * Return the value","         * @method getValue","         * @return {Any} an array of selected values","         */","        getValue: function () {","            return this.ddlist.getValue();","        }","","    });","","    // Register this class as \"multiselect\" type","    inputEx.registerType(\"multiselect\", inputEx.MultiSelectField);","","}, '3.1.0', {","    requires: [\"inputex-select\", \"inputex-ddlist\"]","});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"25":0,"33":0,"35":0,"46":0,"47":0,"48":0,"57":0,"60":0,"62":0,"72":0,"74":0,"77":0,"79":0,"82":0,"84":0,"90":0,"93":0,"95":0,"108":0,"110":0,"111":0,"115":0,"116":0,"122":0,"124":0,"127":0,"129":0,"134":0,"140":0,"143":0,"145":0,"147":0,"157":0,"163":0};
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].functions = {"MultiSelectField:21":0,"renderComponent:31":0,"initEvents:45":0,"onItemRemoved:55":0,"onAddNewItem:70":0,"setValue:106":0,"getValue:156":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].coveredLines = 39;
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 1);
YUI.add('inputex-multiselect', function (Y, NAME) {

/**
 * @module inputex-multiselect
 */
_yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 6);
YUI.add("inputex-multiselect", function (Y) {
   
   _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 8);
var inputEx = Y.inputEx,
       lang = Y.Lang;
   
    /**
     * Create a multi select field
     * @class inputEx.MultiSelectField
     * @extends inputEx.SelectField
     * @constructor
     * @param {Object} options Added options:
     * <ul>
     *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}])</li>
     * </ul>
     */
    _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 21);
inputEx.MultiSelectField = function (options) {
        _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "MultiSelectField", 21);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 22);
inputEx.MultiSelectField.superclass.constructor.call(this, options);
    };

    _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 25);
Y.extend(inputEx.MultiSelectField, inputEx.SelectField, {

        /**
         * Build the DDList
         * @method renderComponent
         */
        renderComponent: function () {

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "renderComponent", 31);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 33);
inputEx.MultiSelectField.superclass.renderComponent.call(this);

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 35);
this.ddlist = new inputEx.DDListField({
                parentEl: this.fieldContainer
            });

        },

        /**
         * Register the "change" event
         * @method initEvents
         */
        initEvents: function () {
            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "initEvents", 45);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 46);
Y.on("change", this.onAddNewItem, this.el, this);
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 47);
this.ddlist.on("itemRemoved", this.onItemRemoved, this);
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 48);
this.ddlist.on("updated", this.fireUpdatedEvt, this);
        },

        /**
         * Re-enable the option element when an item is removed by the user
         * @method onItemRemoved
         */
        onItemRemoved: function (params) {

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "onItemRemoved", 55);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 57);
this.showChoice({
                value: params
            });
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 60);
this.el.selectedIndex = 0;

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 62);
this.fireUpdatedEvt();

        },

        /**
         * Add an item to the list when the select changed
         * @method onAddNewItem
         */
        onAddNewItem: function () {

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "onAddNewItem", 70);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 72);
var value, position, choice;

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 74);
if (this.el.selectedIndex !== 0) {
               
               // Get the selector value
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 77);
value = inputEx.MultiSelectField.superclass.getValue.call(this);
               
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 79);
position = this.getChoicePosition({
                  value: value
               });
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 82);
choice = this.choicesList[position];
               
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 84);
this.ddlist.addItem({
                  value: value,
                  label: choice.label
               });
               
               // hide choice that has just been selected (+ select first choice)
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 90);
this.hideChoice({
                  position: position
               });
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 93);
this.el.selectedIndex = 0;
               
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 95);
this.fireUpdatedEvt();
               
            }
        },

        /**
         * Set the value of the list
         * @method setValue
         * @param {String} value The value to set
         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
         */
        setValue: function (value, sendUpdatedEvt) {

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "setValue", 106);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 108);
var i, length, position, choice, ddlistValue = [];

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 110);
if (!lang.isArray(value)) {
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 111);
return;
            }

            // Re-show all choices
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 115);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 116);
this.showChoice({
                    position: i
                });
            }

            // Hide selected choices and fill ddlist value
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 122);
for (i = 0, length = value.length; i < length; i += 1) {

                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 124);
position = this.getChoicePosition({
                    value: value[i]
                });
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 127);
choice = this.choicesList[position];

                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 129);
ddlistValue.push({
                    value: choice.value,
                    label: choice.label
                });

                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 134);
this.hideChoice({
                    position: position
                });
            }

            // set ddlist value
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 140);
this.ddlist.setValue(ddlistValue);

            // reset select to first choice
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 143);
this.el.selectedIndex = 0;

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 145);
if (sendUpdatedEvt !== false) {
                // fire update event
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 147);
this.fireUpdatedEvt();
            }
        },

        /**
         * Return the value
         * @method getValue
         * @return {Any} an array of selected values
         */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "getValue", 156);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 157);
return this.ddlist.getValue();
        }

    });

    // Register this class as "multiselect" type
    _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 163);
inputEx.registerType("multiselect", inputEx.MultiSelectField);

}, '3.1.0', {
    requires: ["inputex-select", "inputex-ddlist"]
});

}, '@VERSION@');
