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
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-linkedcombo/inputex-linkedcombo.js",
    code: []
};
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].code=["YUI.add('inputex-linkedcombo', function (Y, NAME) {","","","/**"," * @module inputex-linkedcombo"," */","YUI.add(\"inputex-linkedcombo\", function (Y) {","","    var lang = Y.Lang;","    inputEx = Y.inputEx;","","    /**","     * Create a select field","     * @class inputEx.LinkedComboField","     * @extends inputEx.Field","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *    <li>choices: contains the list of nested choices ([{ value: \"\", choices: [\"\"] }, { value: \"BMW Z Series\", choices: [\"Z1\", \"Z3\", \"Z4\", \"Z8\"] }, ...])</li>","     *    <li>valueSeperator: </li>","     * </ul>","     */","    inputEx.LinkedComboField = function (options) {","        inputEx.LinkedComboField.superclass.constructor.call(this, options);","","        // Hack to init choices in second select (when no default value is provided)","        if (lang.isUndefined(this.options.value)) {","            this.setValue(this.getValue(), false);","        }","    };","","    Y.extend(inputEx.LinkedComboField, inputEx.Field, {","","        /**","         * Set the default values of the options","         * @method setOptions","         * @param {Object} options Options object as passed to the constructor","         */","        setOptions: function (options) {","            inputEx.LinkedComboField.superclass.setOptions.call(this, options);","            this.options.choices = lang.isArray(options.choices) ? options.choices : [];","            this.options.valueSeparator = options.valueSeparator || \"_\";","        },","","        /**","         * Build two select fields","         * @method renderComponent","         */","        renderComponent: function () {","","            var i, j, ilength, jlength, currentSubChoices, currentSubChoice, currentValue,","            testValue, isDuplicateChoice, secondSelectChoices;","","            // object used in updateSecondSelectChoices","            //","            //   * key   : string representing a value in 1st select","            //   * value : array of values available in 2nd select when key is selected in first select","            //","            this.valuesMatching = {};","","            // helper to filter 2nd select choices to find duplicates","            isDuplicateChoice = function (elt, arrElt) {","                elt = lang.isObject(elt) ? elt.value : elt;","                arrElt = lang.isObject(arrElt) ? arrElt.value : arrElt;","                return elt === arrElt;","            };","","            // collect 2nd level choices + ensure uniqueness of values","            secondSelectChoices = [];","","            for (i = 0, ilength = this.options.choices.length; i < ilength; i += 1) {","","                currentValue = lang.isObject(this.options.choices[i]) ? this.options.choices[i].value : this.options.choices[i];","                currentSubChoices = this.options.choices[i].choices;","","                this.valuesMatching[currentValue] = [];","","                // maybe no sub choices ???","                if (currentSubChoices) {","                    for (j = 0, jlength = currentSubChoices.length; j < jlength; j += 1) {","","                        currentSubChoice = currentSubChoices[j];","","                        testValue = lang.isObject(currentSubChoice) ? currentSubChoice.value : currentSubChoice;","","                        this.valuesMatching[currentValue].push(testValue);","","                        if (inputEx.indexOf(testValue, secondSelectChoices, isDuplicateChoice) === -1) {","                            secondSelectChoices.push(currentSubChoices[j]);","                        }","                    }","                }","            }","","","            // create and store selects","            this.selects = [];","            this.selects.push(new inputEx.SelectField({","                choices: this.options.choices","            }));","            this.selects.push(new inputEx.SelectField({","                choices: secondSelectChoices","            }));","","            // append <select>s to DOM tree","            this.fieldContainer.appendChild(this.selects[0].getEl());","            this.fieldContainer.appendChild(this.selects[1].getEl());","","        },","","        /**","         * @method initEvents","         */","        initEvents: function () {","","            inputEx.LinkedComboField.superclass.initEvents.call(this);","","","            // when first select is modified","            this.selects[0].on('updated', function (value) {","","                this.updateSecondSelectChoices(); // refresh list of choices in second select","                this.selects[1].fireUpdatedEvt(); // trigger global field update (see below)","","            }, this, true);","","","            // when second select is modified","            this.selects[1].on('updated', function (value) {","","                // set field style","                this.setClassFromState();","                // fire field \"updated\" event","                this.fireUpdatedEvt();","","            }, this, true);","","        },","","","        /**","         * adapt choices of 2nd select relatively to 1st select value","         * @method updateSecondSelectChoices","         */","        updateSecondSelectChoices: function () {","","            var i, length, choicesList, secondSelectValues, testValue;","","            // allowed values in second select","            secondSelectValues = this.valuesMatching[this.selects[0].getValue()];","","            // all choices in second select","            choicesList = this.selects[1].choicesList;","","            for (i = 0, length = choicesList.length; i < length; i += 1) {","","                testValue = choicesList[i].value;","","                if (inputEx.indexOf(testValue, secondSelectValues) === -1) {","                    this.selects[1].hideChoice({","                        position: i","                    }, false); // no \"updated\" event in case of clear (because multiple clear could happen...)","                } else {","                    this.selects[1].showChoice({","                        position: i","                    });","                }","            }","        },","","        /**","         * Set the value","         * @method setValue","         * @param {String} value The value to set","         * @param {boolean} [sendUpdatedEvt] (optional) Whether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (value, sendUpdatedEvt) {","","            var a, firstVal, secondVal, i;","","            a = value.split(this.options.valueSeparator);","","            this.selects[0].setValue(a[0], false);","            this.updateSecondSelectChoices();","            this.selects[1].setValue(a[1], false);","","            // Call Field.setValue to set class and fire updated event","            inputEx.LinkedComboField.superclass.setValue.call(this, value, sendUpdatedEvt);","        },","","","        /**","         * Return the value","         * @method getValue","         * @return {Any} the selected value","         */","        getValue: function () {","            return this.selects[0].getValue() + this.options.valueSeparator + this.selects[1].getValue();","        },","","","        /**","         * HACK because empty state value is this.options.valueSeparator","         * @method getState","         */","        getState: function () {","            // if the field is empty :","            if (this.getValue() === this.options.valueSeparator) {","                return this.options.required ? inputEx.stateRequired : inputEx.stateEmpty;","            }","            return this.validate() ? inputEx.stateValid : inputEx.stateInvalid;","        }","","    });","","    Y.augment(inputEx.LinkedComboField,inputEx.mixin.choice);","","    // Register this class as \"select\" type","    inputEx.registerType(\"linkedcombo\", inputEx.LinkedComboField, [{","        type: 'list',","        name: 'choices',","        label: 'Choices',","        elementType: {","            type: 'group',","            fields: [{","                label: 'Value',","                name: 'value',","                value: ''","            }, // not required to allow '' value (which is default)","            {","                label: 'Label',","                name: 'label'","            }, // optional : if left empty, label is same as value","            {","                type: 'list',","                name: 'choices',","                label: 'Choices',","                elementType: {","                    type: 'group',","                    fields: [{","                        label: 'Value',","                        name: 'value',","                        value: ''","                    }, // not required to allow '' value (which is default)","                    {","                        label: 'Label',","                        name: 'label'","                    } // optional : if left empty, label is same as value","                    ]","                },","                value: [],","                required: true","            }]","        },","        value: [],","        required: true","    }]);","","}, \"3.1.0\", {","    requires: [\"inputex-select\",\"inputex-choice\"]","});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].lines = {"1":0,"7":0,"9":0,"10":0,"23":0,"24":0,"27":0,"28":0,"32":0,"40":0,"41":0,"42":0,"51":0,"59":0,"62":0,"63":0,"64":0,"65":0,"69":0,"71":0,"73":0,"74":0,"76":0,"79":0,"80":0,"82":0,"84":0,"86":0,"88":0,"89":0,"97":0,"98":0,"101":0,"106":0,"107":0,"116":0,"120":0,"122":0,"123":0,"129":0,"132":0,"134":0,"147":0,"150":0,"153":0,"155":0,"157":0,"159":0,"160":0,"164":0,"179":0,"181":0,"183":0,"184":0,"185":0,"188":0,"198":0,"208":0,"209":0,"211":0,"216":0,"219":0};
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].functions = {"LinkedComboField:23":0,"setOptions:39":0,"isDuplicateChoice:62":0,"renderComponent:49":0,"(anonymous 3):120":0,"(anonymous 4):129":0,"initEvents:114":0,"updateSecondSelectChoices:145":0,"setValue:177":0,"getValue:197":0,"getState:206":0,"(anonymous 2):7":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].coveredLines = 62;
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 1);
YUI.add('inputex-linkedcombo', function (Y, NAME) {


/**
 * @module inputex-linkedcombo
 */
_yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 7);
YUI.add("inputex-linkedcombo", function (Y) {

    _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "(anonymous 2)", 7);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 9);
var lang = Y.Lang;
    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 10);
inputEx = Y.inputEx;

    /**
     * Create a select field
     * @class inputEx.LinkedComboField
     * @extends inputEx.Field
     * @constructor
     * @param {Object} options Added options:
     * <ul>
     *    <li>choices: contains the list of nested choices ([{ value: "", choices: [""] }, { value: "BMW Z Series", choices: ["Z1", "Z3", "Z4", "Z8"] }, ...])</li>
     *    <li>valueSeperator: </li>
     * </ul>
     */
    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 23);
inputEx.LinkedComboField = function (options) {
        _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "LinkedComboField", 23);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 24);
inputEx.LinkedComboField.superclass.constructor.call(this, options);

        // Hack to init choices in second select (when no default value is provided)
        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 27);
if (lang.isUndefined(this.options.value)) {
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 28);
this.setValue(this.getValue(), false);
        }
    };

    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 32);
Y.extend(inputEx.LinkedComboField, inputEx.Field, {

        /**
         * Set the default values of the options
         * @method setOptions
         * @param {Object} options Options object as passed to the constructor
         */
        setOptions: function (options) {
            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "setOptions", 39);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 40);
inputEx.LinkedComboField.superclass.setOptions.call(this, options);
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 41);
this.options.choices = lang.isArray(options.choices) ? options.choices : [];
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 42);
this.options.valueSeparator = options.valueSeparator || "_";
        },

        /**
         * Build two select fields
         * @method renderComponent
         */
        renderComponent: function () {

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "renderComponent", 49);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 51);
var i, j, ilength, jlength, currentSubChoices, currentSubChoice, currentValue,
            testValue, isDuplicateChoice, secondSelectChoices;

            // object used in updateSecondSelectChoices
            //
            //   * key   : string representing a value in 1st select
            //   * value : array of values available in 2nd select when key is selected in first select
            //
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 59);
this.valuesMatching = {};

            // helper to filter 2nd select choices to find duplicates
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 62);
isDuplicateChoice = function (elt, arrElt) {
                _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "isDuplicateChoice", 62);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 63);
elt = lang.isObject(elt) ? elt.value : elt;
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 64);
arrElt = lang.isObject(arrElt) ? arrElt.value : arrElt;
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 65);
return elt === arrElt;
            };

            // collect 2nd level choices + ensure uniqueness of values
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 69);
secondSelectChoices = [];

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 71);
for (i = 0, ilength = this.options.choices.length; i < ilength; i += 1) {

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 73);
currentValue = lang.isObject(this.options.choices[i]) ? this.options.choices[i].value : this.options.choices[i];
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 74);
currentSubChoices = this.options.choices[i].choices;

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 76);
this.valuesMatching[currentValue] = [];

                // maybe no sub choices ???
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 79);
if (currentSubChoices) {
                    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 80);
for (j = 0, jlength = currentSubChoices.length; j < jlength; j += 1) {

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 82);
currentSubChoice = currentSubChoices[j];

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 84);
testValue = lang.isObject(currentSubChoice) ? currentSubChoice.value : currentSubChoice;

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 86);
this.valuesMatching[currentValue].push(testValue);

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 88);
if (inputEx.indexOf(testValue, secondSelectChoices, isDuplicateChoice) === -1) {
                            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 89);
secondSelectChoices.push(currentSubChoices[j]);
                        }
                    }
                }
            }


            // create and store selects
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 97);
this.selects = [];
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 98);
this.selects.push(new inputEx.SelectField({
                choices: this.options.choices
            }));
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 101);
this.selects.push(new inputEx.SelectField({
                choices: secondSelectChoices
            }));

            // append <select>s to DOM tree
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 106);
this.fieldContainer.appendChild(this.selects[0].getEl());
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 107);
this.fieldContainer.appendChild(this.selects[1].getEl());

        },

        /**
         * @method initEvents
         */
        initEvents: function () {

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "initEvents", 114);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 116);
inputEx.LinkedComboField.superclass.initEvents.call(this);


            // when first select is modified
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 120);
this.selects[0].on('updated', function (value) {

                _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "(anonymous 3)", 120);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 122);
this.updateSecondSelectChoices(); // refresh list of choices in second select
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 123);
this.selects[1].fireUpdatedEvt(); // trigger global field update (see below)

            }, this, true);


            // when second select is modified
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 129);
this.selects[1].on('updated', function (value) {

                // set field style
                _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "(anonymous 4)", 129);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 132);
this.setClassFromState();
                // fire field "updated" event
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 134);
this.fireUpdatedEvt();

            }, this, true);

        },


        /**
         * adapt choices of 2nd select relatively to 1st select value
         * @method updateSecondSelectChoices
         */
        updateSecondSelectChoices: function () {

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "updateSecondSelectChoices", 145);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 147);
var i, length, choicesList, secondSelectValues, testValue;

            // allowed values in second select
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 150);
secondSelectValues = this.valuesMatching[this.selects[0].getValue()];

            // all choices in second select
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 153);
choicesList = this.selects[1].choicesList;

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 155);
for (i = 0, length = choicesList.length; i < length; i += 1) {

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 157);
testValue = choicesList[i].value;

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 159);
if (inputEx.indexOf(testValue, secondSelectValues) === -1) {
                    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 160);
this.selects[1].hideChoice({
                        position: i
                    }, false); // no "updated" event in case of clear (because multiple clear could happen...)
                } else {
                    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 164);
this.selects[1].showChoice({
                        position: i
                    });
                }
            }
        },

        /**
         * Set the value
         * @method setValue
         * @param {String} value The value to set
         * @param {boolean} [sendUpdatedEvt] (optional) Whether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
         */
        setValue: function (value, sendUpdatedEvt) {

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "setValue", 177);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 179);
var a, firstVal, secondVal, i;

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 181);
a = value.split(this.options.valueSeparator);

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 183);
this.selects[0].setValue(a[0], false);
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 184);
this.updateSecondSelectChoices();
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 185);
this.selects[1].setValue(a[1], false);

            // Call Field.setValue to set class and fire updated event
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 188);
inputEx.LinkedComboField.superclass.setValue.call(this, value, sendUpdatedEvt);
        },


        /**
         * Return the value
         * @method getValue
         * @return {Any} the selected value
         */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "getValue", 197);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 198);
return this.selects[0].getValue() + this.options.valueSeparator + this.selects[1].getValue();
        },


        /**
         * HACK because empty state value is this.options.valueSeparator
         * @method getState
         */
        getState: function () {
            // if the field is empty :
            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "getState", 206);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 208);
if (this.getValue() === this.options.valueSeparator) {
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 209);
return this.options.required ? inputEx.stateRequired : inputEx.stateEmpty;
            }
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 211);
return this.validate() ? inputEx.stateValid : inputEx.stateInvalid;
        }

    });

    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 216);
Y.augment(inputEx.LinkedComboField,inputEx.mixin.choice);

    // Register this class as "select" type
    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 219);
inputEx.registerType("linkedcombo", inputEx.LinkedComboField, [{
        type: 'list',
        name: 'choices',
        label: 'Choices',
        elementType: {
            type: 'group',
            fields: [{
                label: 'Value',
                name: 'value',
                value: ''
            }, // not required to allow '' value (which is default)
            {
                label: 'Label',
                name: 'label'
            }, // optional : if left empty, label is same as value
            {
                type: 'list',
                name: 'choices',
                label: 'Choices',
                elementType: {
                    type: 'group',
                    fields: [{
                        label: 'Value',
                        name: 'value',
                        value: ''
                    }, // not required to allow '' value (which is default)
                    {
                        label: 'Label',
                        name: 'label'
                    } // optional : if left empty, label is same as value
                    ]
                },
                value: [],
                required: true
            }]
        },
        value: [],
        required: true
    }]);

}, "3.1.0", {
    requires: ["inputex-select","inputex-choice"]
});

}, '@VERSION@');
