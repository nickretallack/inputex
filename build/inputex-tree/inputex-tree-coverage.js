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
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].code=["YUI.add('inputex-tree', function (Y, NAME) {","","/**"," * @module inputex-tree"," */","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    /**","     * Meta field to create trees","     * @class inputEx.TreeField","     * @extends inputEx.ListField","     * @constructor","     * @param {Object} options inputEx.Field options object","     */","    inputEx.TreeField = function (options) {","        inputEx.TreeField.superclass.constructor.call(this, options);","    };","    Y.extend(inputEx.TreeField, inputEx.ListField, {","        /**","         * Adds a new line to the List Field","         * @method renderSubField","         * @param {Any} value Value of the subelement","         * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)","         */","        renderSubField: function (value) {","","            // Div that wraps the deleteButton + the subField","            var newDiv = inputEx.cn('div');","","            // Delete button","            var delButton = inputEx.cn('img', {","                src: inputEx.spacerUrl,","                className: 'inputEx-ListField-delButton'","            });","            Y.one(delButton).on('click', this.onDelete, this, true);","            newDiv.appendChild(delButton);","","            var el = new inputEx.TreeField({","                parentNode: this,","                elementType: this.options.elementType,","                value: value","            });","            var subFieldEl = el.getEl();","            Y.one(subFieldEl).setStyle('marginLeft', '4px');","            Y.one(subFieldEl).setStyle('float', 'left');","            newDiv.appendChild(subFieldEl);","","            // Subscribe the onChange event to resend it","            el.on('updated', this.onChange, this, true);","","            // Line breaker","            newDiv.appendChild(inputEx.cn('div', null, {","                clear: \"both\"","            }));","","            //this.divEl.appendChild(newDiv);","            this.childContainer.appendChild(newDiv);","","            return el;","        },","","","        /**","         * Render the addButton and childContainer","         * @method renderComponent","         */","        renderComponent: function () {","","            // Add element button","            this.addButton = inputEx.cn('img', {","                src: inputEx.spacerUrl,","                className: 'inputEx-ListField-addButton'","            });","            Y.one(this.addButton).setStyle('float', 'left');","            this.fieldContainer.appendChild(this.addButton);","","            // Instanciate the new subField","            this.subField = inputEx(this.options.elementType, this);","","            var subFieldEl = this.subField.getEl();","            Y.one(subFieldEl).setStyle('marginLeft', '4px');","            Y.one(subFieldEl).setStyle('float', 'left');","            this.fieldContainer.appendChild(subFieldEl);","","            // Line breaker","            this.fieldContainer.appendChild(inputEx.cn('div', null, {","                clear: \"both\"","            }, this.options.listLabel));","","","            // Div element to contain the children","            this.childContainer = inputEx.cn('div', {","                className: 'inputEx-ListField-childContainer'","            });","            this.fieldContainer.appendChild(this.childContainer);","        },","","        /**","         * Set the value","         * @method setValue","         * @param {Any} obj The tree object","         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (obj, sendUpdatedEvt) {","            this.subField.setValue(obj.value, false);","            inputEx.TreeField.superclass.setValue.call(this, obj.childValues, sendUpdatedEvt);","        },","","        /**","         * Get the value","         * @method getValue","         * @return {Any} The tree object","         */","        getValue: function () {","            var obj = {","                value: this.subField.getValue(),","                childValues: inputEx.TreeField.superclass.getValue.call(this)","            };","            return obj;","        }","","    });","","    // Register this class as \"tree\" type","    inputEx.registerType(\"tree\", inputEx.TreeField);","","","}, '@VERSION@', {\"requires\": [\"inputex-string\", \"inputex-list\", \"inputex-inplaceedit\"], \"ix_provides\": \"tree\"});"];
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].lines = {"1":0,"6":0,"16":0,"17":0,"19":0,"29":0,"32":0,"36":0,"37":0,"39":0,"44":0,"45":0,"46":0,"47":0,"50":0,"53":0,"58":0,"60":0,"71":0,"75":0,"76":0,"79":0,"81":0,"82":0,"83":0,"84":0,"87":0,"93":0,"96":0,"106":0,"107":0,"116":0,"120":0,"126":0};
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].functions = {"TreeField:16":0,"renderSubField:26":0,"renderComponent:68":0,"setValue:105":0,"getValue:115":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].coveredLines = 34;
_yuitest_coverage["build/inputex-tree/inputex-tree.js"].coveredFunctions = 6;
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
        /**
         * Adds a new line to the List Field
         * @method renderSubField
         * @param {Any} value Value of the subelement
         * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)
         */
        renderSubField: function (value) {

            // Div that wraps the deleteButton + the subField
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "renderSubField", 26);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 29);
var newDiv = inputEx.cn('div');

            // Delete button
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 32);
var delButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-delButton'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 36);
Y.one(delButton).on('click', this.onDelete, this, true);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 37);
newDiv.appendChild(delButton);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 39);
var el = new inputEx.TreeField({
                parentNode: this,
                elementType: this.options.elementType,
                value: value
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 44);
var subFieldEl = el.getEl();
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 45);
Y.one(subFieldEl).setStyle('marginLeft', '4px');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 46);
Y.one(subFieldEl).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 47);
newDiv.appendChild(subFieldEl);

            // Subscribe the onChange event to resend it
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 50);
el.on('updated', this.onChange, this, true);

            // Line breaker
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 53);
newDiv.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }));

            //this.divEl.appendChild(newDiv);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 58);
this.childContainer.appendChild(newDiv);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 60);
return el;
        },


        /**
         * Render the addButton and childContainer
         * @method renderComponent
         */
        renderComponent: function () {

            // Add element button
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "renderComponent", 68);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 71);
this.addButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-addButton'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 75);
Y.one(this.addButton).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 76);
this.fieldContainer.appendChild(this.addButton);

            // Instanciate the new subField
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 79);
this.subField = inputEx(this.options.elementType, this);

            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 81);
var subFieldEl = this.subField.getEl();
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 82);
Y.one(subFieldEl).setStyle('marginLeft', '4px');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 83);
Y.one(subFieldEl).setStyle('float', 'left');
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 84);
this.fieldContainer.appendChild(subFieldEl);

            // Line breaker
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 87);
this.fieldContainer.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }, this.options.listLabel));


            // Div element to contain the children
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 93);
this.childContainer = inputEx.cn('div', {
                className: 'inputEx-ListField-childContainer'
            });
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 96);
this.fieldContainer.appendChild(this.childContainer);
        },

        /**
         * Set the value
         * @method setValue
         * @param {Any} obj The tree object
         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
         */
        setValue: function (obj, sendUpdatedEvt) {
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "setValue", 105);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 106);
this.subField.setValue(obj.value, false);
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 107);
inputEx.TreeField.superclass.setValue.call(this, obj.childValues, sendUpdatedEvt);
        },

        /**
         * Get the value
         * @method getValue
         * @return {Any} The tree object
         */
        getValue: function () {
            _yuitest_coverfunc("build/inputex-tree/inputex-tree.js", "getValue", 115);
_yuitest_coverline("build/inputex-tree/inputex-tree.js", 116);
var obj = {
                value: this.subField.getValue(),
                childValues: inputEx.TreeField.superclass.getValue.call(this)
            };
            _yuitest_coverline("build/inputex-tree/inputex-tree.js", 120);
return obj;
        }

    });

    // Register this class as "tree" type
    _yuitest_coverline("build/inputex-tree/inputex-tree.js", 126);
inputEx.registerType("tree", inputEx.TreeField);


}, '@VERSION@', {"requires": ["inputex-string", "inputex-list", "inputex-inplaceedit"], "ix_provides": "tree"});
