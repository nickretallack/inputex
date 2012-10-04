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
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-tinymce/inputex-tinymce.js",
    code: []
};
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].code=["YUI.add('inputex-tinymce', function (Y, NAME) {","","/**"," * @module inputex-tinymce"," */","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    /**","     * Wrapper for the TinyMCE Editor","     * @class inputEx.TinyMCEField","     * @extends inputEx.Field","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *   <li>opts: the options to be added when calling the TinyMCE constructor</li>","     * </ul>","     */","    inputEx.TinyMCEField = function (options) {","        if (!window.tinymce) {","            alert(\"TinyMCE was not found on this page !\");","        }","        inputEx.TinyMCEField.superclass.constructor.call(this, options);","    };","    Y.extend(inputEx.TinyMCEField, inputEx.Field, {","","        defaultOpts: {","            mode: \"textareas\",","            language: \"en\",","            theme: \"advanced\",","","            plugins: \"paste\", // past plugin for raw text pasting","            paste_auto_cleanup_on_paste: true,","            paste_remove_styles: true,","            paste_remove_styles_if_webkit: true,","            paste_strip_class_attributes: true,","            theme_advanced_buttons1: \"formatselect,fontselect,fontsizeselect,|,bold,italic,underline,strikethrough,|,forecolor,backcolor\",","            theme_advanced_buttons2: \"justifyleft,justifycenter,justifyright,justifyfull,|,outdent,indent,blockquote,hr,|,bullist,numlist,|,link,unlink,image,|,removeformat,code,|,undo,redo\",","            theme_advanced_buttons3: \"\",","            theme_advanced_toolbar_location: \"top\",","            theme_advanced_toolbar_align: \"left\",","            height: \"200\",","            verify_html: true,","            cleanup_on_startup: true,","            cleanup: true","        },","","        /**","         * Set the default values of the options","         * @method setOptions","         * @param {Object} options Options object as passed to the constructor","         */","        setOptions: function (options) {","            inputEx.TinyMCEField.superclass.setOptions.call(this, options);","","            this.options.opts = options.opts || this.defaultOpts;","        },","","        /**","         * Render the field using the YUI Editor widget","         * @method renderComponent","         */","        renderComponent: function () {","            if (!inputEx.TinyMCEfieldsNumber) {","                inputEx.TinyMCEfieldsNumber = 0;","            }","","            var id = \"inputEx-TinyMCEField-\" + inputEx.TinyMCEfieldsNumber;","            this.id = id;","            var attributes = {","                id: id,","                className: \"mceAdvanced\"","            };","            if (this.options.name) {","                attributes.name = this.options.name;","            }","","            this.el = inputEx.cn('textarea', attributes);","","            inputEx.TinyMCEfieldsNumber += 1;","            this.fieldContainer.appendChild(this.el);","","            this.editor = new tinymce.Editor(this.id, this.options.opts);","","            // this place the render phase of the component after","            Y.later(0,this,function(){","                this.editor.render();","            });","        },","","        /**","         * Set the html content","         * @method setValue","         * @param {String} value The html string","         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (value, sendUpdatedEvt) {","","            var editor = tinymce.get(this.id);","","             if (editor && editor.initialized) {","                editor.setContent(value, {","                    format: 'raw'","                });","            } else {","                this.editor.onInit.add(function (ed) {","                    ed.setContent(value, {","                        format: 'raw'","                    });","                });","            }","","            if (sendUpdatedEvt !== false) {","                // fire update event","                this.fireUpdatedEvt();","            }","        },","","        /**","         * Get the html string","         * @method getValue","         * @return {String} the html string","         */","        getValue: function () {","","            var editor = tinymce.get(this.id);","","            if (editor && editor.initialized) {","                return editor.getContent();","            } else {","                return null;","            }","        },","        ","        /**","         * @method getText","         */","        getText: function () {","","            var editor = tinymce.get(this.id);","","            if (editor && editor.initialized) {","                return editor.getContent({format : \"raw\"});","            } else {","                return null;","            }","        }","","","    });","","    // Register this class as \"tinymce\" type","    inputEx.registerType(\"tinymce\", inputEx.TinyMCEField, []);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"tinymce\"});"];
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].lines = {"1":0,"6":0,"19":0,"20":0,"21":0,"23":0,"25":0,"54":0,"56":0,"64":0,"65":0,"68":0,"69":0,"70":0,"74":0,"75":0,"78":0,"80":0,"81":0,"83":0,"86":0,"87":0,"99":0,"101":0,"102":0,"106":0,"107":0,"113":0,"115":0,"126":0,"128":0,"129":0,"131":0,"140":0,"142":0,"143":0,"145":0,"153":0};
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].functions = {"TinyMCEField:19":0,"setOptions:53":0,"(anonymous 2):86":0,"renderComponent:63":0,"(anonymous 3):106":0,"setValue:97":0,"getValue:124":0,"getText:138":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].coveredLines = 38;
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 1);
YUI.add('inputex-tinymce', function (Y, NAME) {

/**
 * @module inputex-tinymce
 */
    _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 6);
var lang = Y.Lang,
        inputEx = Y.inputEx;

    /**
     * Wrapper for the TinyMCE Editor
     * @class inputEx.TinyMCEField
     * @extends inputEx.Field
     * @constructor
     * @param {Object} options Added options:
     * <ul>
     *   <li>opts: the options to be added when calling the TinyMCE constructor</li>
     * </ul>
     */
    _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 19);
inputEx.TinyMCEField = function (options) {
        _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "TinyMCEField", 19);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 20);
if (!window.tinymce) {
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 21);
alert("TinyMCE was not found on this page !");
        }
        _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 23);
inputEx.TinyMCEField.superclass.constructor.call(this, options);
    };
    _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 25);
Y.extend(inputEx.TinyMCEField, inputEx.Field, {

        defaultOpts: {
            mode: "textareas",
            language: "en",
            theme: "advanced",

            plugins: "paste", // past plugin for raw text pasting
            paste_auto_cleanup_on_paste: true,
            paste_remove_styles: true,
            paste_remove_styles_if_webkit: true,
            paste_strip_class_attributes: true,
            theme_advanced_buttons1: "formatselect,fontselect,fontsizeselect,|,bold,italic,underline,strikethrough,|,forecolor,backcolor",
            theme_advanced_buttons2: "justifyleft,justifycenter,justifyright,justifyfull,|,outdent,indent,blockquote,hr,|,bullist,numlist,|,link,unlink,image,|,removeformat,code,|,undo,redo",
            theme_advanced_buttons3: "",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            height: "200",
            verify_html: true,
            cleanup_on_startup: true,
            cleanup: true
        },

        /**
         * Set the default values of the options
         * @method setOptions
         * @param {Object} options Options object as passed to the constructor
         */
        setOptions: function (options) {
            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "setOptions", 53);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 54);
inputEx.TinyMCEField.superclass.setOptions.call(this, options);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 56);
this.options.opts = options.opts || this.defaultOpts;
        },

        /**
         * Render the field using the YUI Editor widget
         * @method renderComponent
         */
        renderComponent: function () {
            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "renderComponent", 63);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 64);
if (!inputEx.TinyMCEfieldsNumber) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 65);
inputEx.TinyMCEfieldsNumber = 0;
            }

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 68);
var id = "inputEx-TinyMCEField-" + inputEx.TinyMCEfieldsNumber;
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 69);
this.id = id;
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 70);
var attributes = {
                id: id,
                className: "mceAdvanced"
            };
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 74);
if (this.options.name) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 75);
attributes.name = this.options.name;
            }

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 78);
this.el = inputEx.cn('textarea', attributes);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 80);
inputEx.TinyMCEfieldsNumber += 1;
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 81);
this.fieldContainer.appendChild(this.el);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 83);
this.editor = new tinymce.Editor(this.id, this.options.opts);

            // this place the render phase of the component after
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 86);
Y.later(0,this,function(){
                _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "(anonymous 2)", 86);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 87);
this.editor.render();
            });
        },

        /**
         * Set the html content
         * @method setValue
         * @param {String} value The html string
         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
         */
        setValue: function (value, sendUpdatedEvt) {

            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "setValue", 97);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 99);
var editor = tinymce.get(this.id);

             _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 101);
if (editor && editor.initialized) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 102);
editor.setContent(value, {
                    format: 'raw'
                });
            } else {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 106);
this.editor.onInit.add(function (ed) {
                    _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "(anonymous 3)", 106);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 107);
ed.setContent(value, {
                        format: 'raw'
                    });
                });
            }

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 113);
if (sendUpdatedEvt !== false) {
                // fire update event
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 115);
this.fireUpdatedEvt();
            }
        },

        /**
         * Get the html string
         * @method getValue
         * @return {String} the html string
         */
        getValue: function () {

            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "getValue", 124);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 126);
var editor = tinymce.get(this.id);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 128);
if (editor && editor.initialized) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 129);
return editor.getContent();
            } else {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 131);
return null;
            }
        },
        
        /**
         * @method getText
         */
        getText: function () {

            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "getText", 138);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 140);
var editor = tinymce.get(this.id);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 142);
if (editor && editor.initialized) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 143);
return editor.getContent({format : "raw"});
            } else {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 145);
return null;
            }
        }


    });

    // Register this class as "tinymce" type
    _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 153);
inputEx.registerType("tinymce", inputEx.TinyMCEField, []);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "tinymce"});
