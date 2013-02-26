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
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].code=["YUI.add('inputex-linkedcombo', function (Y, NAME) {","","/**"," * @module inputex-linkedcombo"," */","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    /**","     * Create a select field","     * @class inputEx.LinkedComboField","     * @extends inputEx.Field","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *    <li>choices: contains the list of nested choices ([{ value: \"\", choices: [\"\"] }, { value: \"BMW Z Series\", choices: [\"Z1\", \"Z3\", \"Z4\", \"Z8\"] }, ...])</li>","     *    <li>valueSeperator: </li>","     * </ul>","     */","    inputEx.LinkedComboField = function (options) {","        inputEx.LinkedComboField.superclass.constructor.call(this, options);","","        // Hack to init choices in second select (when no default value is provided)","        if (lang.isUndefined(this.options.value)) {","            this.setValue(this.getValue(), false);","        }","    };","","    Y.extend(inputEx.LinkedComboField, inputEx.Field, {","","        /**","         * Set the default values of the options","         * @method setOptions","         * @param {Object} options Options object as passed to the constructor","         */","        setOptions: function (options) {","            inputEx.LinkedComboField.superclass.setOptions.call(this, options);","            this.options.choices = lang.isArray(options.choices) ? options.choices : [];","            this.options.valueSeparator = options.valueSeparator || \"_\";","        },","","        /**","         * Build two select fields","         * @method renderComponent","         */","        renderComponent: function () {","","            var i, j, ilength, jlength, currentSubChoices, currentSubChoice, currentValue,","            testValue, isDuplicateChoice, secondSelectChoices;","","            // object used in updateSecondSelectChoices","            //","            //   * key   : string representing a value in 1st select","            //   * value : array of values available in 2nd select when key is selected in first select","            //","            this.valuesMatching = {};","","            // helper to filter 2nd select choices to find duplicates","            isDuplicateChoice = function (elt, arrElt) {","                elt = lang.isObject(elt) ? elt.value : elt;","                arrElt = lang.isObject(arrElt) ? arrElt.value : arrElt;","                return elt === arrElt;","            };","","            // collect 2nd level choices + ensure uniqueness of values","            secondSelectChoices = [];","","            for (i = 0, ilength = this.options.choices.length; i < ilength; i += 1) {","","                currentValue = lang.isObject(this.options.choices[i]) ? this.options.choices[i].value : this.options.choices[i];","                currentSubChoices = this.options.choices[i].choices;","","                this.valuesMatching[currentValue] = [];","","                // maybe no sub choices ???","                if (currentSubChoices) {","                    for (j = 0, jlength = currentSubChoices.length; j < jlength; j += 1) {","","                        currentSubChoice = currentSubChoices[j];","","                        testValue = lang.isObject(currentSubChoice) ? currentSubChoice.value : currentSubChoice;","","                        this.valuesMatching[currentValue].push(testValue);","","                        if (inputEx.indexOf(testValue, secondSelectChoices, isDuplicateChoice) === -1) {","                            secondSelectChoices.push(currentSubChoices[j]);","                        }","                    }","                }","            }","","","            // create and store selects","            this.selects = [];","            this.selects.push(new inputEx.SelectField({","                choices: this.options.choices,","                required: this.options.required","            }));","            this.selects.push(new inputEx.SelectField({","                choices: secondSelectChoices,","                required: this.options.required","            }));","","            // append <select>s to DOM tree","            this.fieldContainer.appendChild(this.selects[0].getEl());","            this.fieldContainer.appendChild(this.selects[1].getEl());","","        },","","        /**","         * @method initEvents","         */","        initEvents: function () {","","            inputEx.LinkedComboField.superclass.initEvents.call(this);","","","            // when first select is modified","            this.selects[0].on('updated', function () {","","                this.updateSecondSelectChoices(); // refresh list of choices in second select","                this.selects[1].fireUpdatedEvt(); // trigger global field update (see below)","","            }, this, true);","","","            // when second select is modified","            this.selects[1].on('updated', function () {","","                // set field style","                this.setClassFromState();","                // fire field \"updated\" event","                this.fireUpdatedEvt();","","            }, this, true);","","        },","","","        /**","         * adapt choices of 2nd select relatively to 1st select value","         * @method updateSecondSelectChoices","         */","        updateSecondSelectChoices: function () {","","            var i, length, choicesList, secondSelectValues, testValue;","","            // allowed values in second select","            secondSelectValues = this.valuesMatching[this.selects[0].getValue()];","","            // all choices in second select","            choicesList = this.selects[1].choicesList;","","            for (i = 0, length = choicesList.length; i < length; i += 1) {","","                testValue = choicesList[i].value;","","                if (inputEx.indexOf(testValue, secondSelectValues) === -1) {","                    this.selects[1].hideChoice({","                        position: i","                    }, false); // no \"updated\" event in case of clear (because multiple clear could happen...)","                } else {","                    this.selects[1].showChoice({","                        position: i","                    });","                }","            }","        },","","        /**","         * Set the value","         * @method setValue","         * @param {String} value The value to set","         * @param {boolean} [sendUpdatedEvt] (optional) Whether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (value, sendUpdatedEvt) {","","            var a;","","            a = value.split(this.options.valueSeparator);","","            this.selects[0].setValue(a[0], false);","            this.updateSecondSelectChoices();","            this.selects[1].setValue(a[1], false);","","            // Call Field.setValue to set class and fire updated event","            inputEx.LinkedComboField.superclass.setValue.call(this, value, sendUpdatedEvt);","        },","","","        /**","         * Return the value","         * @method getValue","         * @return {Any} the selected value","         */","        getValue: function () {","            return this.selects[0].getValue() + this.options.valueSeparator + this.selects[1].getValue();","        },","","","        /**","         * Custom way of detecting the emptiness of the field","         * @method isEmpty","         * @return {Boolean} field emptiness (true/false)","         */","        isEmpty: function () {","            return this.selects[0].isEmpty() && this.selects[1].isEmpty();","        },","","        /**","         * Validation of the field","         * @method validate","         * @return {Boolean} field validation status (true/false)","         */","        validate: function() {","","           // superclass validation (e.g. required + empty)","           if (!inputEx.LinkedComboField.superclass.validate.call(this)) {","              return false;","           }","","           // both selects should be valid (e.g. ensure both selects are filled)","           return this.selects[0].validate() && this.selects[1].validate();","        }","","    });","","    Y.augment(inputEx.LinkedComboField,inputEx.mixin.choice);","","    // Register this class as \"select\" type","    inputEx.registerType(\"linkedcombo\", inputEx.LinkedComboField, [{","        type: 'list',","        name: 'choices',","        label: 'Choices',","        elementType: {","            type: 'group',","            fields: [{","                label: 'Value',","                name: 'value',","                value: ''","            }, // not required to allow '' value (which is default)","            {","                label: 'Label',","                name: 'label'","            }, // optional : if left empty, label is same as value","            {","                type: 'list',","                name: 'choices',","                label: 'Choices',","                elementType: {","                    type: 'group',","                    fields: [{","                        label: 'Value',","                        name: 'value',","                        value: ''","                    }, // not required to allow '' value (which is default)","                    {","                        label: 'Label',","                        name: 'label'","                    } // optional : if left empty, label is same as value","                    ]","                },","                value: [],","                required: true","            }]","        },","        value: [],","        required: true","    }]);","","","}, '@VERSION@', {\"requires\": [\"inputex-select\", \"inputex-choice\"]});"];
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].lines = {"1":0,"6":0,"20":0,"21":0,"24":0,"25":0,"29":0,"37":0,"38":0,"39":0,"48":0,"56":0,"59":0,"60":0,"61":0,"62":0,"66":0,"68":0,"70":0,"71":0,"73":0,"76":0,"77":0,"79":0,"81":0,"83":0,"85":0,"86":0,"94":0,"95":0,"99":0,"105":0,"106":0,"115":0,"119":0,"121":0,"122":0,"128":0,"131":0,"133":0,"146":0,"149":0,"152":0,"154":0,"156":0,"158":0,"159":0,"163":0,"178":0,"180":0,"182":0,"183":0,"184":0,"187":0,"197":0,"207":0,"218":0,"219":0,"223":0,"228":0,"231":0};
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].functions = {"LinkedComboField:20":0,"setOptions:36":0,"isDuplicateChoice:59":0,"renderComponent:46":0,"(anonymous 2):119":0,"(anonymous 3):128":0,"initEvents:113":0,"updateSecondSelectChoices:144":0,"setValue:176":0,"getValue:196":0,"isEmpty:206":0,"validate:215":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].coveredLines = 61;
_yuitest_coverage["build/inputex-linkedcombo/inputex-linkedcombo.js"].coveredFunctions = 13;
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 1);
YUI.add('inputex-linkedcombo', function (Y, NAME) {

/**
 * @module inputex-linkedcombo
 */
    _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 6);
var lang = Y.Lang,
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
    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 20);
inputEx.LinkedComboField = function (options) {
        _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "LinkedComboField", 20);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 21);
inputEx.LinkedComboField.superclass.constructor.call(this, options);

        // Hack to init choices in second select (when no default value is provided)
        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 24);
if (lang.isUndefined(this.options.value)) {
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 25);
this.setValue(this.getValue(), false);
        }
    };

    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 29);
Y.extend(inputEx.LinkedComboField, inputEx.Field, {

        /**
         * Set the default values of the options
         * @method setOptions
         * @param {Object} options Options object as passed to the constructor
         */
        setOptions: function (options) {
            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "setOptions", 36);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 37);
inputEx.LinkedComboField.superclass.setOptions.call(this, options);
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 38);
this.options.choices = lang.isArray(options.choices) ? options.choices : [];
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 39);
this.options.valueSeparator = options.valueSeparator || "_";
        },

        /**
         * Build two select fields
         * @method renderComponent
         */
        renderComponent: function () {

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "renderComponent", 46);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 48);
var i, j, ilength, jlength, currentSubChoices, currentSubChoice, currentValue,
            testValue, isDuplicateChoice, secondSelectChoices;

            // object used in updateSecondSelectChoices
            //
            //   * key   : string representing a value in 1st select
            //   * value : array of values available in 2nd select when key is selected in first select
            //
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 56);
this.valuesMatching = {};

            // helper to filter 2nd select choices to find duplicates
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 59);
isDuplicateChoice = function (elt, arrElt) {
                _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "isDuplicateChoice", 59);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 60);
elt = lang.isObject(elt) ? elt.value : elt;
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 61);
arrElt = lang.isObject(arrElt) ? arrElt.value : arrElt;
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 62);
return elt === arrElt;
            };

            // collect 2nd level choices + ensure uniqueness of values
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 66);
secondSelectChoices = [];

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 68);
for (i = 0, ilength = this.options.choices.length; i < ilength; i += 1) {

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 70);
currentValue = lang.isObject(this.options.choices[i]) ? this.options.choices[i].value : this.options.choices[i];
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 71);
currentSubChoices = this.options.choices[i].choices;

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 73);
this.valuesMatching[currentValue] = [];

                // maybe no sub choices ???
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 76);
if (currentSubChoices) {
                    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 77);
for (j = 0, jlength = currentSubChoices.length; j < jlength; j += 1) {

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 79);
currentSubChoice = currentSubChoices[j];

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 81);
testValue = lang.isObject(currentSubChoice) ? currentSubChoice.value : currentSubChoice;

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 83);
this.valuesMatching[currentValue].push(testValue);

                        _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 85);
if (inputEx.indexOf(testValue, secondSelectChoices, isDuplicateChoice) === -1) {
                            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 86);
secondSelectChoices.push(currentSubChoices[j]);
                        }
                    }
                }
            }


            // create and store selects
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 94);
this.selects = [];
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 95);
this.selects.push(new inputEx.SelectField({
                choices: this.options.choices,
                required: this.options.required
            }));
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 99);
this.selects.push(new inputEx.SelectField({
                choices: secondSelectChoices,
                required: this.options.required
            }));

            // append <select>s to DOM tree
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 105);
this.fieldContainer.appendChild(this.selects[0].getEl());
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 106);
this.fieldContainer.appendChild(this.selects[1].getEl());

        },

        /**
         * @method initEvents
         */
        initEvents: function () {

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "initEvents", 113);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 115);
inputEx.LinkedComboField.superclass.initEvents.call(this);


            // when first select is modified
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 119);
this.selects[0].on('updated', function () {

                _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "(anonymous 2)", 119);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 121);
this.updateSecondSelectChoices(); // refresh list of choices in second select
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 122);
this.selects[1].fireUpdatedEvt(); // trigger global field update (see below)

            }, this, true);


            // when second select is modified
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 128);
this.selects[1].on('updated', function () {

                // set field style
                _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "(anonymous 3)", 128);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 131);
this.setClassFromState();
                // fire field "updated" event
                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 133);
this.fireUpdatedEvt();

            }, this, true);

        },


        /**
         * adapt choices of 2nd select relatively to 1st select value
         * @method updateSecondSelectChoices
         */
        updateSecondSelectChoices: function () {

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "updateSecondSelectChoices", 144);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 146);
var i, length, choicesList, secondSelectValues, testValue;

            // allowed values in second select
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 149);
secondSelectValues = this.valuesMatching[this.selects[0].getValue()];

            // all choices in second select
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 152);
choicesList = this.selects[1].choicesList;

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 154);
for (i = 0, length = choicesList.length; i < length; i += 1) {

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 156);
testValue = choicesList[i].value;

                _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 158);
if (inputEx.indexOf(testValue, secondSelectValues) === -1) {
                    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 159);
this.selects[1].hideChoice({
                        position: i
                    }, false); // no "updated" event in case of clear (because multiple clear could happen...)
                } else {
                    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 163);
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

            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "setValue", 176);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 178);
var a;

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 180);
a = value.split(this.options.valueSeparator);

            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 182);
this.selects[0].setValue(a[0], false);
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 183);
this.updateSecondSelectChoices();
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 184);
this.selects[1].setValue(a[1], false);

            // Call Field.setValue to set class and fire updated event
            _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 187);
inputEx.LinkedComboField.superclass.setValue.call(this, value, sendUpdatedEvt);
        },


        /**
         * Return the value
         * @method getValue
         * @return {Any} the selected value
         */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "getValue", 196);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 197);
return this.selects[0].getValue() + this.options.valueSeparator + this.selects[1].getValue();
        },


        /**
         * Custom way of detecting the emptiness of the field
         * @method isEmpty
         * @return {Boolean} field emptiness (true/false)
         */
        isEmpty: function () {
            _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "isEmpty", 206);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 207);
return this.selects[0].isEmpty() && this.selects[1].isEmpty();
        },

        /**
         * Validation of the field
         * @method validate
         * @return {Boolean} field validation status (true/false)
         */
        validate: function() {

           // superclass validation (e.g. required + empty)
           _yuitest_coverfunc("build/inputex-linkedcombo/inputex-linkedcombo.js", "validate", 215);
_yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 218);
if (!inputEx.LinkedComboField.superclass.validate.call(this)) {
              _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 219);
return false;
           }

           // both selects should be valid (e.g. ensure both selects are filled)
           _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 223);
return this.selects[0].validate() && this.selects[1].validate();
        }

    });

    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 228);
Y.augment(inputEx.LinkedComboField,inputEx.mixin.choice);

    // Register this class as "select" type
    _yuitest_coverline("build/inputex-linkedcombo/inputex-linkedcombo.js", 231);
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


}, '@VERSION@', {"requires": ["inputex-select", "inputex-choice"]});
