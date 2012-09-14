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
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].code=["YUI.add('inputex-tinymce', function (Y, NAME) {","","/**"," * @module inputex-tinymce"," */","YUI.add(\"inputex-tinymce\", function (Y) {","","    var lang = Y.Lang,","        inputEx = Y.inputEx;","","    /**","     * Wrapper for the TinyMCE Editor","     * @class inputEx.TinyMCEField","     * @extends inputEx.Field","     * @constructor","     * @param {Object} options Added options:","     * <ul>","     *   <li>opts: the options to be added when calling the TinyMCE constructor</li>","     * </ul>","     */","    inputEx.TinyMCEField = function (options) {","        if (!window.tinymce) {","            alert(\"TinyMCE was not found on this page !\");","        }","        inputEx.TinyMCEField.superclass.constructor.call(this, options);","    };","    Y.extend(inputEx.TinyMCEField, inputEx.Field, {","","        defaultOpts: {","            mode: \"textareas\",","            language: \"en\",","            theme: \"advanced\",","","            plugins: \"paste\", // past plugin for raw text pasting","            paste_auto_cleanup_on_paste: true,","            paste_remove_styles: true,","            paste_remove_styles_if_webkit: true,","            paste_strip_class_attributes: true,","            theme_advanced_buttons1: \"formatselect,fontselect,fontsizeselect,|,bold,italic,underline,strikethrough,|,forecolor,backcolor\",","            theme_advanced_buttons2: \"justifyleft,justifycenter,justifyright,justifyfull,|,outdent,indent,blockquote,hr,|,bullist,numlist,|,link,unlink,image,|,removeformat,code,|,undo,redo\",","            theme_advanced_buttons3: \"\",","            theme_advanced_toolbar_location: \"top\",","            theme_advanced_toolbar_align: \"left\",","            height: \"200\",","            verify_html: true,","            cleanup_on_startup: true,","            cleanup: true","        },","","        /**","         * Set the default values of the options","         * @method setOptions","         * @param {Object} options Options object as passed to the constructor","         */","        setOptions: function (options) {","            inputEx.TinyMCEField.superclass.setOptions.call(this, options);","","            this.options.opts = options.opts || this.defaultOpts;","        },","","        /**","         * Render the field using the YUI Editor widget","         * @method renderComponent","         */","        renderComponent: function () {","            if (!inputEx.TinyMCEfieldsNumber) {","                inputEx.TinyMCEfieldsNumber = 0;","            }","","            var id = \"inputEx-TinyMCEField-\" + inputEx.TinyMCEfieldsNumber;","            this.id = id;","            var attributes = {","                id: id,","                className: \"mceAdvanced\"","            };","            if (this.options.name) {","                attributes.name = this.options.name;","            }","","            this.el = inputEx.cn('textarea', attributes);","","            inputEx.TinyMCEfieldsNumber += 1;","            this.fieldContainer.appendChild(this.el);","","            this.editor = new tinymce.Editor(this.id, this.options.opts);","","            // this place the render phase of the component after","            Y.later(0,this,function(){","                this.editor.render();","            });","        },","","        /**","         * Set the html content","         * @method setValue","         * @param {String} value The html string","         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","         */","        setValue: function (value, sendUpdatedEvt) {","","            var editor = tinymce.get(this.id);","","             if (editor && editor.initialized) {","                editor.setContent(value, {","                    format: 'raw'","                });","            } else {","                this.editor.onInit.add(function (ed) {","                    ed.setContent(value, {","                        format: 'raw'","                    });","                });","            }","","            if (sendUpdatedEvt !== false) {","                // fire update event","                this.fireUpdatedEvt();","            }","        },","","        /**","         * Get the html string","         * @method getValue","         * @return {String} the html string","         */","        getValue: function () {","","            var editor = tinymce.get(this.id);","","            if (editor && editor.initialized) {","                return editor.getContent();","            } else {","                return null;","            }","        },","        ","        /**","         * @method getText","         */","        getText: function () {","","            var editor = tinymce.get(this.id);","","            if (editor && editor.initialized) {","                return editor.getContent({format : \"raw\"});","            } else {","                return null;","            }","        }","","","    });","","    // Register this class as \"tinymce\" type","    inputEx.registerType(\"tinymce\", inputEx.TinyMCEField, []);","","}, '3.1.0', {","    requires: [\"inputex-field\"]","});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].lines = {"1":0,"6":0,"8":0,"21":0,"22":0,"23":0,"25":0,"27":0,"56":0,"58":0,"66":0,"67":0,"70":0,"71":0,"72":0,"76":0,"77":0,"80":0,"82":0,"83":0,"85":0,"88":0,"89":0,"101":0,"103":0,"104":0,"108":0,"109":0,"115":0,"117":0,"128":0,"130":0,"131":0,"133":0,"142":0,"144":0,"145":0,"147":0,"155":0};
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].functions = {"TinyMCEField:21":0,"setOptions:55":0,"(anonymous 3):88":0,"renderComponent:65":0,"(anonymous 4):108":0,"setValue:99":0,"getValue:126":0,"getText:140":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].coveredLines = 39;
_yuitest_coverage["build/inputex-tinymce/inputex-tinymce.js"].coveredFunctions = 10;
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 1);
YUI.add('inputex-tinymce', function (Y, NAME) {

/**
 * @module inputex-tinymce
 */
_yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 6);
YUI.add("inputex-tinymce", function (Y) {

    _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 8);
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
    _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 21);
inputEx.TinyMCEField = function (options) {
        _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "TinyMCEField", 21);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 22);
if (!window.tinymce) {
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 23);
alert("TinyMCE was not found on this page !");
        }
        _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 25);
inputEx.TinyMCEField.superclass.constructor.call(this, options);
    };
    _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 27);
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
            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "setOptions", 55);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 56);
inputEx.TinyMCEField.superclass.setOptions.call(this, options);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 58);
this.options.opts = options.opts || this.defaultOpts;
        },

        /**
         * Render the field using the YUI Editor widget
         * @method renderComponent
         */
        renderComponent: function () {
            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "renderComponent", 65);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 66);
if (!inputEx.TinyMCEfieldsNumber) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 67);
inputEx.TinyMCEfieldsNumber = 0;
            }

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 70);
var id = "inputEx-TinyMCEField-" + inputEx.TinyMCEfieldsNumber;
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 71);
this.id = id;
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 72);
var attributes = {
                id: id,
                className: "mceAdvanced"
            };
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 76);
if (this.options.name) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 77);
attributes.name = this.options.name;
            }

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 80);
this.el = inputEx.cn('textarea', attributes);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 82);
inputEx.TinyMCEfieldsNumber += 1;
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 83);
this.fieldContainer.appendChild(this.el);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 85);
this.editor = new tinymce.Editor(this.id, this.options.opts);

            // this place the render phase of the component after
            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 88);
Y.later(0,this,function(){
                _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "(anonymous 3)", 88);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 89);
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

            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "setValue", 99);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 101);
var editor = tinymce.get(this.id);

             _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 103);
if (editor && editor.initialized) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 104);
editor.setContent(value, {
                    format: 'raw'
                });
            } else {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 108);
this.editor.onInit.add(function (ed) {
                    _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "(anonymous 4)", 108);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 109);
ed.setContent(value, {
                        format: 'raw'
                    });
                });
            }

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 115);
if (sendUpdatedEvt !== false) {
                // fire update event
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 117);
this.fireUpdatedEvt();
            }
        },

        /**
         * Get the html string
         * @method getValue
         * @return {String} the html string
         */
        getValue: function () {

            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "getValue", 126);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 128);
var editor = tinymce.get(this.id);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 130);
if (editor && editor.initialized) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 131);
return editor.getContent();
            } else {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 133);
return null;
            }
        },
        
        /**
         * @method getText
         */
        getText: function () {

            _yuitest_coverfunc("build/inputex-tinymce/inputex-tinymce.js", "getText", 140);
_yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 142);
var editor = tinymce.get(this.id);

            _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 144);
if (editor && editor.initialized) {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 145);
return editor.getContent({format : "raw"});
            } else {
                _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 147);
return null;
            }
        }


    });

    // Register this class as "tinymce" type
    _yuitest_coverline("build/inputex-tinymce/inputex-tinymce.js", 155);
inputEx.registerType("tinymce", inputEx.TinyMCEField, []);

}, '3.1.0', {
    requires: ["inputex-field"]
});

}, '@VERSION@');
