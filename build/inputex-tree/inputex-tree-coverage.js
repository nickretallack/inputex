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
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].code=["YUI.add('inputex-tree', function (Y, NAME) {","","","/**"," * @module inputex-tree"," */","YUI.add(\"inputex-tree\", function (Y) {","","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    /**","     * Meta field to create trees","     * @class inputEx.TreeField","     * @extends inputEx.ListField","     * @constructor","     * @param {Object} options inputEx.Field options object","     */","    inputEx.TreeField = function (options) {","        inputEx.TreeField.superclass.constructor.call(this, options);","    };","    Y.extend(inputEx.TreeField, inputEx.ListField, {","        /**","         * Adds a new line to the List Field","         * @method renderSubField","         * @param {Any} value Value of the subelement","         * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)","         */","        renderSubField: function (value) {","","            // Div that wraps the deleteButton + the subField","            var newDiv = inputEx.cn('div');","","            // Delete button","            var delButton = inputEx.cn('img', {","                src: inputEx.spacerUrl,","                className: 'inputEx-ListField-delButton'","            });","            Y.one(delButton).on('click', this.onDelete, this, true);","            newDiv.appendChild(delButton);","","            var el = new inputEx.TreeField({","                parentNode: this,","                elementType: this.options.elementType,","                value: value","            });","            var subFieldEl = el.getEl();","            Y.one(subFieldEl).setStyle('marginLeft', '4px');","            Y.one(subFieldEl).setStyle('float', 'left');","            newDiv.appendChild(subFieldEl);","","            // Subscribe the onChange event to resend it","            el.on('updated', this.onChange, this, true);","","            // Line breaker","            newDiv.appendChild(inputEx.cn('div', null, {","                clear: \"both\"","            }));","","            //this.divEl.appendChild(newDiv);","            this.childContainer.appendChild(newDiv);","","            return el;","        },","","","        /**","         * Render the addButton and childContainer","         * @method renderComponent","         */","        renderComponent: function () {","","            // Add element button","            this.addButton = inputEx.cn('img', {","                src: inputEx.spacerUrl,","                className: 'inputEx-ListField-addButton'","            });","            Y.one(this.addButton).setStyle('float', 'left');","            this.fieldContainer.appendChild(this.addButton);","","            // Instanciate the new subField","            this.subField = inputEx(this.options.elementType, this);","","            var subFieldEl = this.subField.getEl();","            Y.one(subFieldEl).setStyle('marginLeft', '4px');","            Y.one(subFieldEl).setStyle('float', 'left');","            this.fieldContainer.appendChild(subFieldEl);","","            // Line breaker","            this.fieldContainer.appendChild(inputEx.cn('div', null, {","                clear: \"both\"","            }, this.options.listLabel));","","","            // Div element to contain the children","            this.childContainer = inputEx.cn('div', {","                className: 'inputEx-ListField-childContainer'","            });","            this.fieldContainer.appendChild(this.childContainer);","        },","","        /**","         * Set the value","         * @method setValue","         * @param {Any} obj The tree object","         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (obj, sendUpdatedEvt) {","            this.subField.setValue(obj.value, false);","            inputEx.TreeField.superclass.setValue.call(this, obj.childValues, sendUpdatedEvt);","        },","","        /**","         * Get the value","         * @method getValue","         * @return {Any} The tree object","         */","        getValue: function () {","            var obj = {","                value: this.subField.getValue(),","                childValues: inputEx.TreeField.superclass.getValue.call(this)","            };","            return obj;","        }","","    });","","    // Register this class as \"tree\" type","    inputEx.registerType(\"tree\", inputEx.TreeField);","","}, '3.1.0', {","    requires: ['inputex-string', 'inputex-list', 'inputex-inplaceedit']","});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].lines = {"1":0,"7":0,"9":0,"19":0,"20":0,"22":0,"32":0,"35":0,"39":0,"40":0,"42":0,"47":0,"48":0,"49":0,"50":0,"53":0,"56":0,"61":0,"63":0,"74":0,"78":0,"79":0,"82":0,"84":0,"85":0,"86":0,"87":0,"90":0,"96":0,"99":0,"109":0,"110":0,"119":0,"123":0,"129":0};
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].functions = {"TreeField:19":0,"renderSubField:29":0,"renderComponent:71":0,"setValue:108":0,"getValue:118":0,"(anonymous 2):7":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].coveredLines = 35;
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].coveredFunctions = 7;
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 1);
YUI.add('inputex-tree', function (Y, NAME) {


/**
 * @module inputex-tree
 */
_yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 7);
YUI.add("inputex-tree", function (Y) {

    _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "(anonymous 2)", 7);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 9);
var lang = Y.Lang,
        inputEx = Y.inputEx;

    /**
     * Meta field to create trees
     * @class inputEx.TreeField
     * @extends inputEx.ListField
     * @constructor
     * @param {Object} options inputEx.Field options object
     */
    _yuitest_coverline("build/inputex-tree/inputex-tree.js", 19);
inputEx.TreeField = function (options) {
        _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "TreeField", 19);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 20);
inputEx.TreeField.superclass.constructor.call(this, options);
    };
    _yuitest_coverline("build/inputex-tree/inputex-tree.js", 22);
Y.extend(inputEx.TreeField, inputEx.ListField, {
        /**
         * Adds a new line to the List Field
         * @method renderSubField
         * @param {Any} value Value of the subelement
         * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)
         */
        renderSubField: function (value) {

            // Div that wraps the deleteButton + the subField
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "renderSubField", 29);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 32);
var newDiv = inputEx.cn('div');

            // Delete button
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 35);
var delButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-delButton'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 39);
Y.one(delButton).on('click', this.onDelete, this, true);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 40);
newDiv.appendChild(delButton);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 42);
var el = new inputEx.TreeField({
                parentNode: this,
                elementType: this.options.elementType,
                value: value
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 47);
var subFieldEl = el.getEl();
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 48);
Y.one(subFieldEl).setStyle('marginLeft', '4px');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 49);
Y.one(subFieldEl).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 50);
newDiv.appendChild(subFieldEl);

            // Subscribe the onChange event to resend it
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 53);
el.on('updated', this.onChange, this, true);

            // Line breaker
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 56);
newDiv.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }));

            //this.divEl.appendChild(newDiv);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 61);
this.childContainer.appendChild(newDiv);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 63);
return el;
        },


        /**
         * Render the addButton and childContainer
         * @method renderComponent
         */
        renderComponent: function () {

            // Add element button
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "renderComponent", 71);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 74);
this.addButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-addButton'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 78);
Y.one(this.addButton).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 79);
this.fieldContainer.appendChild(this.addButton);

            // Instanciate the new subField
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 82);
this.subField = inputEx(this.options.elementType, this);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 84);
var subFieldEl = this.subField.getEl();
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 85);
Y.one(subFieldEl).setStyle('marginLeft', '4px');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 86);
Y.one(subFieldEl).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 87);
this.fieldContainer.appendChild(subFieldEl);

            // Line breaker
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 90);
this.fieldContainer.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }, this.options.listLabel));


            // Div element to contain the children
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 96);
this.childContainer = inputEx.cn('div', {
                className: 'inputEx-ListField-childContainer'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 99);
this.fieldContainer.appendChild(this.childContainer);
        },

        /**
         * Set the value
         * @method setValue
         * @param {Any} obj The tree object
         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
         */
        setValue: function (obj, sendUpdatedEvt) {
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "setValue", 108);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 109);
this.subField.setValue(obj.value, false);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 110);
inputEx.TreeField.superclass.setValue.call(this, obj.childValues, sendUpdatedEvt);
        },

        /**
         * Get the value
         * @method getValue
         * @return {Any} The tree object
         */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "getValue", 118);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 119);
var obj = {
                value: this.subField.getValue(),
                childValues: inputEx.TreeField.superclass.getValue.call(this)
            };
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 123);
return obj;
        }

    });

    // Register this class as "tree" type
    _yuitest_coverline("build/inputex-tree/inputex-tree.js", 129);
inputEx.registerType("tree", inputEx.TreeField);

}, '3.1.0', {
    requires: ['inputex-string', 'inputex-list', 'inputex-inplaceedit']
});

}, '@VERSION@');
