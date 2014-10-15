/**
 * @module inputex-multiselect
 */
 var inputEx = Y.inputEx,
 lang = Y.Lang;

/**
 * Create a multi select field
 * @class inputEx.MultiSelectField
 * @extends inputEx.DDListField
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}])</li>
 * </ul>
 */
inputEx.MultiSelectField = function (options) {
    this.choices = options.choices;
    inputEx.MultiSelectField.superclass.constructor.call(this, options);
};

Y.extend(inputEx.MultiSelectField, inputEx.DDListField, {

    /**
     * Build the DDList
     * @method renderComponent
     */
    renderComponent: function () {

        this.select = new inputEx.SelectField({
            parentEl  : this.fieldContainer,
            choices   : this.choices
        });

        // render DDList
        inputEx.MultiSelectField.superclass.renderComponent.call(this);

    },

    /**
     * Register the "change" event
     * @method initEvents
     */
    initEvents: function () {
        this.select.on("updated", this.onAddNewItem, this);
        this.on("itemRemoved", this.onItemRemoved, this);
    },

    /**
     * Re-enable the option element when an item is removed by the user
     * @method onItemRemoved
     */
    onItemRemoved: function (params) {
        this.select.showChoice({
            value: params
        });
        this.select.el.selectedIndex = 0;
        this.fireUpdatedEvt();
    },

    /**
     * Add an item to the list when the select changed
     * @method onAddNewItem
     */
     onAddNewItem: function () {

        var value, position, choice;

        if (this.select.el.selectedIndex !== 0) {

            // Get the selector value
            value = this.select.getValue();

            position = this.select.getChoicePosition({
                value: value
            });
            choice = this.select.choicesList[position];

            inputEx.MultiSelectField.superclass.addItem.call(this, {
                value: value,
                label: choice.label
            });

            // hide choice that has just been selected (+ select first choice)
            this.select.hideChoice({
                position: position
            });
            this.select.el.selectedIndex = 0;

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

        var i, length, position, choice, ddlistValue = [];

        if (!lang.isArray(value)) {
            return;
        }

        // Re-show all choices
        for (i = 0, length = this.select.choicesList.length; i < length; i += 1) {
            this.select.showChoice({
                position: i
            });
        }

        // Hide selected choices and fill ddlist value
        for (i = 0, length = value.length; i < length; i += 1) {
            position = this.select.getChoicePosition({
                value: value[i]
            });
            choice = this.select.choicesList[position];

            ddlistValue.push({
                value: choice.value,
                label: choice.label
            });

            this.select.hideChoice({
                position: position
            });
        }

        // set ddlist value
        inputEx.MultiSelectField.superclass.setValue.call(this, ddlistValue);

        // reset select to first choice
        this.select.el.selectedIndex = 0;

        if (sendUpdatedEvt !== false) {
            // fire update event
            this.fireUpdatedEvt();
        }
    },

    clear: function (sendUpdatedEvt) {
        inputEx.MultiSelectField.superclass.clear.call(this, sendUpdatedEvt);
        this.select.clear(sendUpdatedEvt);
    },

    enable: function() {
        this.select.enable();
        return inputEx.MultiSelectField.superclass.enable.call(this);
    },

    disable: function() {
        this.select.disable();
        return inputEx.MultiSelectField.superclass.disable.call(this);
    },

    isEmpty: function () {
        return this.getValue().length === 0;
    }

});

// Register this class as "multiselect" type
inputEx.registerType("multiselect", inputEx.MultiSelectField);
