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
_yuitest_coverage["build/inputex-tree/inputex-tree.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-tree/inputex-tree.js",
    code: []
};
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].code=["YUI.add('inputex-tree', function (Y, NAME) {","","/**"," * @module inputex-tree"," */","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    /**","     * Meta field to create trees","     * @class inputEx.TreeField","     * @extends inputEx.ListField","     * @constructor","     * @param {Object} options inputEx.Field options object","     */","    inputEx.TreeField = function (options) {","        inputEx.TreeField.superclass.constructor.call(this, options);","    };","    Y.extend(inputEx.TreeField, inputEx.ListField, {","","        setOptions: function (options) {","            inputEx.TreeField.superclass.setOptions.call(this, options);","            this.options.useButtons = true; // force useButtons options (for onDelete to work)","        },","","        /**","         * Adds a new line to the List Field","         * @method renderSubField","         * @param {Any} value Value of the subelement","         * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)","         */","        renderSubField: function (value) {","","            // Div that wraps the deleteButton + the subField","            var newDiv = inputEx.cn('div');","","            // Delete button","            var delButton = inputEx.cn('img', {","                src: inputEx.spacerUrl,","                className: 'inputEx-ListField-delButton'","            });","            Y.one(delButton).on('click', this.onDelete, this);","            newDiv.appendChild(delButton);","","            var el = new inputEx.TreeField({","                parentNode: this,","                elementType: this.options.elementType,","                value: value","            });","            var subFieldEl = el.getEl();","            Y.one(subFieldEl).setStyle('marginLeft', '4px');","            Y.one(subFieldEl).setStyle('float', 'left');","            newDiv.appendChild(subFieldEl);","","            // Subscribe the onChange event to resend it","            el.on('updated', this.onChange, this);","","            // Line breaker","            newDiv.appendChild(inputEx.cn('div', null, {","                clear: \"both\"","            }));","","            //this.divEl.appendChild(newDiv);","            this.childContainer.appendChild(newDiv);","","            return el;","        },","","","        /**","         * Render the addButton and childContainer","         * @method renderComponent","         */","        renderComponent: function () {","","            // Add element button","            this.addButton = inputEx.cn('img', {","                src: inputEx.spacerUrl,","                className: 'inputEx-ListField-addButton'","            });","            Y.one(this.addButton).setStyle('float', 'left');","            this.fieldContainer.appendChild(this.addButton);","","            // Instanciate the new subField","            this.subField = inputEx(this.options.elementType, this);","","            var subFieldEl = this.subField.getEl();","            Y.one(subFieldEl).setStyle('marginLeft', '4px');","            Y.one(subFieldEl).setStyle('float', 'left');","            this.fieldContainer.appendChild(subFieldEl);","","            // Line breaker","            this.fieldContainer.appendChild(inputEx.cn('div', null, {","                clear: \"both\"","            }, this.options.listLabel));","","","            // Div element to contain the children","            this.childContainer = inputEx.cn('div', {","                className: 'inputEx-ListField-childContainer'","            });","            this.fieldContainer.appendChild(this.childContainer);","        },","","        /**","         * Set the value","         * @method setValue","         * @param {Any} obj The tree object","         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (obj, sendUpdatedEvt) {","            this.subField.setValue(obj.value, false);","            inputEx.TreeField.superclass.setValue.call(this, obj.childValues, sendUpdatedEvt);","        },","","        /**","         * Get the value","         * @method getValue","         * @return {Any} The tree object","         */","        getValue: function () {","            var obj = {","                value: this.subField.getValue(),","                childValues: inputEx.TreeField.superclass.getValue.call(this)","            };","            return obj;","        }","","    });","","    // Register this class as \"tree\" type","    inputEx.registerType(\"tree\", inputEx.TreeField);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\", \"inputex-list\", \"inputex-inplaceedit\"], \"ix_provides\": \"tree\"});"];
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].lines = {"1":0,"6":0,"16":0,"17":0,"19":0,"22":0,"23":0,"35":0,"38":0,"42":0,"43":0,"45":0,"50":0,"51":0,"52":0,"53":0,"56":0,"59":0,"64":0,"66":0,"77":0,"81":0,"82":0,"85":0,"87":0,"88":0,"89":0,"90":0,"93":0,"99":0,"102":0,"112":0,"113":0,"122":0,"126":0,"132":0};
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].functions = {"TreeField:16":0,"setOptions:21":0,"renderSubField:32":0,"renderComponent:74":0,"setValue:111":0,"getValue:121":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].coveredLines = 36;
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 1);
YUI.add('inputex-tree', function (Y, NAME) {

/**
 * @module inputex-tree
 */
    _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 6);
var lang = Y.Lang,
        inputEx = Y.inputEx;

    /**
     * Meta field to create trees
     * @class inputEx.TreeField
     * @extends inputEx.ListField
     * @constructor
     * @param {Object} options inputEx.Field options object
     */
    _yuitest_coverline("build/inputex-tree/inputex-tree.js", 16);
inputEx.TreeField = function (options) {
        _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "TreeField", 16);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 17);
inputEx.TreeField.superclass.constructor.call(this, options);
    };
    _yuitest_coverline("build/inputex-tree/inputex-tree.js", 19);
Y.extend(inputEx.TreeField, inputEx.ListField, {

        setOptions: function (options) {
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "setOptions", 21);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 22);
inputEx.TreeField.superclass.setOptions.call(this, options);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 23);
this.options.useButtons = true; // force useButtons options (for onDelete to work)
        },

        /**
         * Adds a new line to the List Field
         * @method renderSubField
         * @param {Any} value Value of the subelement
         * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)
         */
        renderSubField: function (value) {

            // Div that wraps the deleteButton + the subField
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "renderSubField", 32);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 35);
var newDiv = inputEx.cn('div');

            // Delete button
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 38);
var delButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-delButton'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 42);
Y.one(delButton).on('click', this.onDelete, this);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 43);
newDiv.appendChild(delButton);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 45);
var el = new inputEx.TreeField({
                parentNode: this,
                elementType: this.options.elementType,
                value: value
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 50);
var subFieldEl = el.getEl();
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 51);
Y.one(subFieldEl).setStyle('marginLeft', '4px');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 52);
Y.one(subFieldEl).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 53);
newDiv.appendChild(subFieldEl);

            // Subscribe the onChange event to resend it
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 56);
el.on('updated', this.onChange, this);

            // Line breaker
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 59);
newDiv.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }));

            //this.divEl.appendChild(newDiv);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 64);
this.childContainer.appendChild(newDiv);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 66);
return el;
        },


        /**
         * Render the addButton and childContainer
         * @method renderComponent
         */
        renderComponent: function () {

            // Add element button
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "renderComponent", 74);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 77);
this.addButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-addButton'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 81);
Y.one(this.addButton).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 82);
this.fieldContainer.appendChild(this.addButton);

            // Instanciate the new subField
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 85);
this.subField = inputEx(this.options.elementType, this);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 87);
var subFieldEl = this.subField.getEl();
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 88);
Y.one(subFieldEl).setStyle('marginLeft', '4px');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 89);
Y.one(subFieldEl).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 90);
this.fieldContainer.appendChild(subFieldEl);

            // Line breaker
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 93);
this.fieldContainer.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }, this.options.listLabel));


            // Div element to contain the children
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 99);
this.childContainer = inputEx.cn('div', {
                className: 'inputEx-ListField-childContainer'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 102);
this.fieldContainer.appendChild(this.childContainer);
        },

        /**
         * Set the value
         * @method setValue
         * @param {Any} obj The tree object
         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
         */
        setValue: function (obj, sendUpdatedEvt) {
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "setValue", 111);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 112);
this.subField.setValue(obj.value, false);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 113);
inputEx.TreeField.superclass.setValue.call(this, obj.childValues, sendUpdatedEvt);
        },

        /**
         * Get the value
         * @method getValue
         * @return {Any} The tree object
         */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "getValue", 121);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 122);
var obj = {
                value: this.subField.getValue(),
                childValues: inputEx.TreeField.superclass.getValue.call(this)
            };
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 126);
return obj;
        }

    });

    // Register this class as "tree" type
    _yuitest_coverline("build/inputex-tree/inputex-tree.js", 132);
inputEx.registerType("tree", inputEx.TreeField);


}, '@VERSION@', {"requires": ["inputex-string", "inputex-list", "inputex-inplaceedit"], "ix_provides": "tree"});
