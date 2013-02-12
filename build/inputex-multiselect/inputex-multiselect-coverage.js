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
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].code=["YUI.add('inputex-multiselect', function (Y, NAME) {","","/**"," * @module inputex-multiselect"," */","   var inputEx = Y.inputEx,","       lang = Y.Lang;","   ","    /**","     * Create a multi select field","     * @class inputEx.MultiSelectField","     * @extends inputEx.SelectField","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}])</li>","     * </ul>","     */","    inputEx.MultiSelectField = function (options) {","        inputEx.MultiSelectField.superclass.constructor.call(this, options);","    };","","    Y.extend(inputEx.MultiSelectField, inputEx.SelectField, {","","        /**","         * Build the DDList","         * @method renderComponent","         */","        renderComponent: function () {","","            inputEx.MultiSelectField.superclass.renderComponent.call(this);","","            this.ddlist = new inputEx.DDListField({","                parentEl: this.fieldContainer","            });","","        },","","        /**","         * Register the \"change\" event","         * @method initEvents","         */","        initEvents: function () {","            Y.on(\"change\", this.onAddNewItem, this.el, this);","            this.ddlist.on(\"itemRemoved\", this.onItemRemoved, this);","            this.ddlist.on(\"updated\", this.fireUpdatedEvt, this);","        },","","        /**","         * Re-enable the option element when an item is removed by the user","         * @method onItemRemoved","         */","        onItemRemoved: function (params) {","","            this.showChoice({","                value: params","            });","            this.el.selectedIndex = 0;","","            this.fireUpdatedEvt();","","        },","","        /**","         * Add an item to the list when the select changed","         * @method onAddNewItem","         */","        onAddNewItem: function () {","","            var value, position, choice;","","            if (this.el.selectedIndex !== 0) {","               ","               // Get the selector value","               value = inputEx.MultiSelectField.superclass.getValue.call(this);","               ","               position = this.getChoicePosition({","                  value: value","               });","               choice = this.choicesList[position];","               ","               this.ddlist.addItem({","                  value: value,","                  label: choice.label","               });","               ","               // hide choice that has just been selected (+ select first choice)","               this.hideChoice({","                  position: position","               });","               this.el.selectedIndex = 0;","               ","               this.fireUpdatedEvt();","               ","            }","        },","","        /**","         * Set the value of the list","         * @method setValue","         * @param {String} value The value to set","         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (value, sendUpdatedEvt) {","","            var i, length, position, choice, ddlistValue = [];","","            if (!lang.isArray(value)) {","                return;","            }","","            // Re-show all choices","            for (i = 0, length = this.choicesList.length; i < length; i += 1) {","                this.showChoice({","                    position: i","                });","            }","","            // Hide selected choices and fill ddlist value","            for (i = 0, length = value.length; i < length; i += 1) {","","                position = this.getChoicePosition({","                    value: value[i]","                });","                choice = this.choicesList[position];","","                ddlistValue.push({","                    value: choice.value,","                    label: choice.label","                });","","                this.hideChoice({","                    position: position","                });","            }","","            // set ddlist value","            this.ddlist.setValue(ddlistValue);","","            // reset select to first choice","            this.el.selectedIndex = 0;","","            if (sendUpdatedEvt !== false) {","                // fire update event","                this.fireUpdatedEvt();","            }","        },","","        clear: function (sendUpdatedEvt) {","           this.setValue(lang.isUndefined(this.options.value) ? [] : this.options.value, sendUpdatedEvt);","        },","","        /**","         * Return the value","         * @method getValue","         * @return {Any} an array of selected values","         */","        getValue: function () {","            return this.ddlist.getValue();","        },","","        isEmpty: function () {","            return this.getValue().length === 0;","        }","","    });","","    // Register this class as \"multiselect\" type","    inputEx.registerType(\"multiselect\", inputEx.MultiSelectField);","","","}, '@VERSION@', {\"requires\": [\"inputex-select\", \"inputex-ddlist\"], \"ix_provides\": \"multiselect\"});"];
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].lines = {"1":0,"6":0,"19":0,"20":0,"23":0,"31":0,"33":0,"44":0,"45":0,"46":0,"55":0,"58":0,"60":0,"70":0,"72":0,"75":0,"77":0,"80":0,"82":0,"88":0,"91":0,"93":0,"106":0,"108":0,"109":0,"113":0,"114":0,"120":0,"122":0,"125":0,"127":0,"132":0,"138":0,"141":0,"143":0,"145":0,"150":0,"159":0,"163":0,"169":0};
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].functions = {"MultiSelectField:19":0,"renderComponent:29":0,"initEvents:43":0,"onItemRemoved:53":0,"onAddNewItem:68":0,"setValue:104":0,"clear:149":0,"getValue:158":0,"isEmpty:162":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].coveredLines = 40;
_yuitest_coverage["build/inputex-multiselect/inputex-multiselect.js"].coveredFunctions = 10;
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 1);
YUI.add('inputex-multiselect', function (Y, NAME) {

/**
 * @module inputex-multiselect
 */
   _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 6);
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
    _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 19);
inputEx.MultiSelectField = function (options) {
        _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "MultiSelectField", 19);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 20);
inputEx.MultiSelectField.superclass.constructor.call(this, options);
    };

    _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 23);
Y.extend(inputEx.MultiSelectField, inputEx.SelectField, {

        /**
         * Build the DDList
         * @method renderComponent
         */
        renderComponent: function () {

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "renderComponent", 29);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 31);
inputEx.MultiSelectField.superclass.renderComponent.call(this);

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 33);
this.ddlist = new inputEx.DDListField({
                parentEl: this.fieldContainer
            });

        },

        /**
         * Register the "change" event
         * @method initEvents
         */
        initEvents: function () {
            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "initEvents", 43);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 44);
Y.on("change", this.onAddNewItem, this.el, this);
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 45);
this.ddlist.on("itemRemoved", this.onItemRemoved, this);
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 46);
this.ddlist.on("updated", this.fireUpdatedEvt, this);
        },

        /**
         * Re-enable the option element when an item is removed by the user
         * @method onItemRemoved
         */
        onItemRemoved: function (params) {

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "onItemRemoved", 53);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 55);
this.showChoice({
                value: params
            });
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 58);
this.el.selectedIndex = 0;

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 60);
this.fireUpdatedEvt();

        },

        /**
         * Add an item to the list when the select changed
         * @method onAddNewItem
         */
        onAddNewItem: function () {

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "onAddNewItem", 68);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 70);
var value, position, choice;

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 72);
if (this.el.selectedIndex !== 0) {
               
               // Get the selector value
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 75);
value = inputEx.MultiSelectField.superclass.getValue.call(this);
               
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 77);
position = this.getChoicePosition({
                  value: value
               });
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 80);
choice = this.choicesList[position];
               
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 82);
this.ddlist.addItem({
                  value: value,
                  label: choice.label
               });
               
               // hide choice that has just been selected (+ select first choice)
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 88);
this.hideChoice({
                  position: position
               });
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 91);
this.el.selectedIndex = 0;
               
               _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 93);
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

            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "setValue", 104);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 106);
var i, length, position, choice, ddlistValue = [];

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 108);
if (!lang.isArray(value)) {
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 109);
return;
            }

            // Re-show all choices
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 113);
for (i = 0, length = this.choicesList.length; i < length; i += 1) {
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 114);
this.showChoice({
                    position: i
                });
            }

            // Hide selected choices and fill ddlist value
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 120);
for (i = 0, length = value.length; i < length; i += 1) {

                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 122);
position = this.getChoicePosition({
                    value: value[i]
                });
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 125);
choice = this.choicesList[position];

                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 127);
ddlistValue.push({
                    value: choice.value,
                    label: choice.label
                });

                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 132);
this.hideChoice({
                    position: position
                });
            }

            // set ddlist value
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 138);
this.ddlist.setValue(ddlistValue);

            // reset select to first choice
            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 141);
this.el.selectedIndex = 0;

            _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 143);
if (sendUpdatedEvt !== false) {
                // fire update event
                _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 145);
this.fireUpdatedEvt();
            }
        },

        clear: function (sendUpdatedEvt) {
           _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "clear", 149);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 150);
this.setValue(lang.isUndefined(this.options.value) ? [] : this.options.value, sendUpdatedEvt);
        },

        /**
         * Return the value
         * @method getValue
         * @return {Any} an array of selected values
         */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "getValue", 158);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 159);
return this.ddlist.getValue();
        },

        isEmpty: function () {
            _yuitest_coverfunc("build/inputex-multiselect/inputex-multiselect.js", "isEmpty", 162);
_yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 163);
return this.getValue().length === 0;
        }

    });

    // Register this class as "multiselect" type
    _yuitest_coverline("build/inputex-multiselect/inputex-multiselect.js", 169);
inputEx.registerType("multiselect", inputEx.MultiSelectField);


}, '@VERSION@', {"requires": ["inputex-select", "inputex-ddlist"], "ix_provides": "multiselect"});
