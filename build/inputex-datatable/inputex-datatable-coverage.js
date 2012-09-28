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
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-datatable/inputex-datatable.js",
    code: []
};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].code=["YUI.add('inputex-datatable', function (Y, NAME) {","","/**"," * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin."," * @module inputex-datatable"," */","","    var inputEx = Y.inputEx;","","    // namespace definition","    Y.namespace('inputEx.Plugin');","","","  /**","   * Provide add/modify/delete functionalities on a dataTable as a plugin","   * @class inputEx.Plugin.InputExDataTable","   * @extends Plugin.Base","   * @constructor","   * @param {Object} configuration object","   */","   inputEx.Plugin.InputExDataTable = function (config) {","      inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);","    };","","   inputEx.Plugin.InputExDataTable.NS = \"InputExDataTable\";","","    Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {","       ","       /**","        * @method initializer","        */","        initializer: function () {","","            var host = this.get(\"host\");","","            // enrich data (Model instance) with modify and delete attributs","            this.enrichData();","            // enrich DataTable with modify and delete columns","            this.enrichColumns();","            // add a button called \"add\" in order to add record in the DataTable","            this.addAddButton();","            ","            if(!this.get(\"disableModifyFunc\")){","                // handle row modification","                host.delegate(\"click\",this.modifyRecord,\"td.inputEx-DataTable-modify\", this);","            }","            if(!this.get(\"disableDeleteFunc\")){","                // handle row removal","                host.delegate(\"click\",this.deleteRecord, \"td.inputEx-DataTable-delete\", this);","            }","        },","        /**","         * add Attributes on the data model depending on the plugin configuration","         *","         * @method enrichData","         * @param {EventFacade} e","         */","        enrichData: function (e) {","","            var that = this,","                data = this.get(\"host\").get(\"data\");","","            data.each(function (model) {","                if(!this.get(\"disableModifyFunc\")){","                    that.addModifyAttr(model);","                }","                if(!this.get(\"disableDeleteFunc\")){","                    that.addDeleteAttr(model);","                }","            });","        },","        /**","         * add Columns on the DataTable depending on the plugin configuration","         *","         * @method enrichColumns","         */","        enrichColumns: function () {","            if(!this.get(\"disableModifyFunc\")){","                this.addModifyColumn();","            }","            if(!this.get(\"disableDeleteFunc\")){","                this.addDeleteColumn();","            }","        },","        /**","         * Provide the add button in order to add record on the DataTable","         *","         * @method addAddButton","         */","        addAddButton : function(){","            if(!this.get(\"disableAddFunc\")){","            var button = Y.Node.create(\"<button id='addButton'>\"+this.get(\"strings\").addButtonText+\"</button\"),","                panel = this.get(\"panel\");","            this.get(\"host\").get(\"contentBox\").append(button);","            button.on(\"click\",function  (e) {","                panel.set(\"headerContent\",this.get(\"strings\").addItemHeader);","                panel.get(\"field\").clear();","                panel.show();","            },this);","            }","        },","        /**","         *","         * @method modifyRecord","         */","        modifyRecord : function(e){","                e.stopPropagation();","                var record = this.get(\"host\").getRecord(e.currentTarget),","                    panel = this.get(\"panel\");","                panel.set(\"headerContent\",this.get(\"strings\").modifyItemHeader);","                panel.get('field').setValue(record.getAttrs());","                panel.show();","        },","        /**","         *","         * @method deleteRecord","         */","        deleteRecord : function(e){","                e.stopPropagation();","                var record = this.get(\"host\").getRecord(e.currentTarget);","                if (!this.get(\"confirmDelete\") || confirm(this.get(\"strings\").confirmDeletion)) {","                    this.get(\"host\").get(\"data\").remove(record);","                }","        },","         /**","         *","         * @method deleteExtraColumns","         */","        deleteExtraColumns : function(){","            if(!this.get(\"disableModifyFunc\")){","                this.removeModifyColumn();","            }","            if(!this.get(\"disableDeleteFunc\")){","                this.removeDeleteColumn();","            }","        },","         /**","         *","         * @method _initPanel","         * @private","         */","        _initPanel: function () {","","            var that = this;","","            var panel = new Y.inputEx.Panel({","                centered: true,","                width: 500,","                modal: true,","                zIndex: 5,","                visible: false,","                inputEx: that.get(\"inputEx\"),","          ","      buttons: [{","          value: this.get(\"strings\").cancelText,","          action: function (e) {","              e.preventDefault();","              panel.hide();","          }","      },{","          value: this.get(\"strings\").saveText,","          action: function (e) {","              e.preventDefault();","","              var field = that.get(\"panel\").get(\"field\"),","                  fieldValues = field.getValue(),","                  host = that.get(\"host\"),","                  model;","","              if (field.validate()) {","","                  if (fieldValues.id) {","                      // modification","                      host.get(\"data\").getById(fieldValues.id).setAttrs(fieldValues);","                  } else {","                      // creation","                      fieldValues.id = that.generateId(that.get(\"idSize\"));","                      var recordType = host.get(\"recordType\");","                      model = new recordType();","                      model.setAttrs(fieldValues);","                      that.addModifyAttr(model);","                      that.addDeleteAttr(model);","                      host.get(\"data\").add(model);","                  }","                  panel.hide();","              }","          }","      }]","            });","","            // first the panel needs to be \"render\" then \"show\"","            panel.render();","            return panel;","","        },","        /**","         *","         * @method destructor","         */","        destructor : function(){","","            var that = this,","                data = this.get(\"host\").get(\"data\");","","            data.each(function (model) {","","                if(!this.get(\"disableModifyFunc\")){","                    that.delModifyAttr(model);","                }","                if(!this.get(\"disableDeleteFunc\")){","                    that.delDeleteAttr(model);","                }","","            });","            this.deleteExtraColumns();","            if(!this.get(\"disableAddFunc\")){","                Y.one(\"#addButton\").remove();","            }","","            this.get(\"panel\").destroy();","        },","        /**","         * Add the modify attribute on the data model","         *","         * @method addModifyAttr","         */","        addModifyAttr : function(model){model.addAttr(\"modify\");},","        /**","         * Add the delete attribute on the data model","         *","         * @method addDeleteAttr","         */","        addDeleteAttr : function(model){model.addAttr(\"delete\");},","        /**","         * Remove the modify attribute from the data model","         *","         * @method delModifyAttr","         */","        delModifyAttr : function(model){model.removeAttr(\"modify\");},","        /**","         * Remove the modify attribute from the data model","         *","         * @method delDeleteAttr","         */","        delDeleteAttr : function(model){model.removeAttr(\"delete\");},","        /**","         * Add the modify column on the DataTable","         *","         * @method addModifyColumn","         */","        addModifyColumn : function(){","                this.get(\"host\").addColumn({","                key: this.get(\"strings\").modifyText,","                className: \"inputEx-DataTable-modify\"","            });","        },","        /**","         * Add the delete column on the DataTable","         *","         * @method addDeleteColumn","         */","        addDeleteColumn : function(){","            this.get(\"host\").addColumn({","                key: this.get(\"strings\").deleteText,","                className: \"inputEx-DataTable-delete\"","            });","        },","        /**","         * Remove the modify column from the DataTable","         *","         * @method removeModifyColumn","         */","        removeModifyColumn : function(){this.get(\"host\").removeColumn(\"modify\");},","        /**","         * Remove the delete column from the DataTable","         *","         * @method removeDeleteColumn","         */","        removeDeleteColumn : function(){this.get(\"host\").removeColumn(\"delete\");},","        generateId : function(size){","            var prefixId = this.get(\"prefixId\"),","                s = size ? size : 5;","            prefixId = prefixId ? prefixId : \"\";","            return prefixId + Math.floor(Math.random()*Math.pow(10,s));","        },","        _initStrings : function(){","            return Y.Intl.get(\"inputex-datatable\");","        }","    }, {","/**"," * Static property used to define the default attribute configuration of"," * the Plugin."," *"," * @property ATTRS"," * @type {Object}"," * @static"," */","ATTRS: {","    /**","     * This is an inputEx field definition. This is used when a user try to create/modify a record","     *","     * @attribute inputEx","     */","    inputEx: {},","    /**","     * This string is inserted before the generated id","     *","     * @attribute prefixId","     * @type String","     * @example prefixId : \"po-\" --> id = po-1342561","     */","    prefixId: {","        value: \"\"","    },","    /**","     * This represents the number of digits used in the id generation","     * ","     * @attribute idSize","     * @type Number","     */","    idSize: {","        value: 5","    },","    /**","     * If true the add functionality is disabled","     *","     * @attribute disableAddFunc","     * @type boolean","     */","    disableAddFunc: {","        value: false","    },","","    /**","     * If true the modify functionality is disabled","     * @attribute disableModifyFunc","     * @type boolean","     */","    disableModifyFunc: {","        value: false","    },","    /**","     * If true the delete functionality is disabled","     *","     * @attribute disableDeleteFunc","     * @type boolean","     */","    disableDeleteFunc: {","        value: false","    },","    /**","     * Labels of the plugin","     *","     * @attribute modifyColumnLabel","     */","     strings : {","        value : null,","        valueFn : '_initStrings'","     },","    /**","     * If true a confirmation will be asked to the user when a delete attempt appear","     *","     * @attribute confirmDelete","     * @type boolean","     */","    confirmDelete: {","        value: true","    },","    /**","     * This panel will be displayed on record creation/modication","     * @attribute panel","     * @type Y.inputEx.Panel","     */","    panel: {","        valueFn: '_initPanel',","        lazyAdd: true","    }","}});","","","}, '@VERSION@', {\"requires\": [\"inputex-group\", \"inputex-panel\", \"datatable\"], \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].lines = {"1":0,"8":0,"11":0,"21":0,"22":0,"25":0,"27":0,"34":0,"37":0,"39":0,"41":0,"43":0,"45":0,"47":0,"49":0,"60":0,"63":0,"64":0,"65":0,"67":0,"68":0,"78":0,"79":0,"81":0,"82":0,"91":0,"92":0,"94":0,"95":0,"96":0,"97":0,"98":0,"107":0,"108":0,"110":0,"111":0,"112":0,"119":0,"120":0,"121":0,"122":0,"130":0,"131":0,"133":0,"134":0,"144":0,"146":0,"157":0,"158":0,"163":0,"165":0,"170":0,"172":0,"174":0,"177":0,"178":0,"179":0,"180":0,"181":0,"182":0,"183":0,"185":0,"192":0,"193":0,"202":0,"205":0,"207":0,"208":0,"210":0,"211":0,"215":0,"216":0,"217":0,"220":0,"227":0,"233":0,"239":0,"245":0,"252":0,"263":0,"273":0,"279":0,"281":0,"283":0,"284":0,"287":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].functions = {"InputExDataTable:21":0,"initializer:32":0,"(anonymous 2):63":0,"enrichData:58":0,"enrichColumns:77":0,"(anonymous 3):95":0,"addAddButton:90":0,"modifyRecord:106":0,"deleteRecord:118":0,"deleteExtraColumns:129":0,"action:156":0,"action:162":0,"_initPanel:142":0,"(anonymous 4):205":0,"destructor:200":0,"addModifyAttr:227":0,"addDeleteAttr:233":0,"delModifyAttr:239":0,"delDeleteAttr:245":0,"addModifyColumn:251":0,"addDeleteColumn:262":0,"removeModifyColumn:273":0,"removeDeleteColumn:279":0,"generateId:280":0,"_initStrings:286":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredLines = 86;
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredFunctions = 26;
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 1);
YUI.add('inputex-datatable', function (Y, NAME) {

/**
 * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin.
 * @module inputex-datatable
 */

    _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 8);
var inputEx = Y.inputEx;

    // namespace definition
    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 11);
Y.namespace('inputEx.Plugin');


  /**
   * Provide add/modify/delete functionalities on a dataTable as a plugin
   * @class inputEx.Plugin.InputExDataTable
   * @extends Plugin.Base
   * @constructor
   * @param {Object} configuration object
   */
   _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 21);
inputEx.Plugin.InputExDataTable = function (config) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "InputExDataTable", 21);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 22);
inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);
    };

   _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 25);
inputEx.Plugin.InputExDataTable.NS = "InputExDataTable";

    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 27);
Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {
       
       /**
        * @method initializer
        */
        initializer: function () {

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "initializer", 32);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 34);
var host = this.get("host");

            // enrich data (Model instance) with modify and delete attributs
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 37);
this.enrichData();
            // enrich DataTable with modify and delete columns
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 39);
this.enrichColumns();
            // add a button called "add" in order to add record in the DataTable
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 41);
this.addAddButton();
            
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 43);
if(!this.get("disableModifyFunc")){
                // handle row modification
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 45);
host.delegate("click",this.modifyRecord,"td.inputEx-DataTable-modify", this);
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 47);
if(!this.get("disableDeleteFunc")){
                // handle row removal
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 49);
host.delegate("click",this.deleteRecord, "td.inputEx-DataTable-delete", this);
            }
        },
        /**
         * add Attributes on the data model depending on the plugin configuration
         *
         * @method enrichData
         * @param {EventFacade} e
         */
        enrichData: function (e) {

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichData", 58);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 60);
var that = this,
                data = this.get("host").get("data");

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 63);
data.each(function (model) {
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 2)", 63);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 64);
if(!this.get("disableModifyFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 65);
that.addModifyAttr(model);
                }
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 67);
if(!this.get("disableDeleteFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 68);
that.addDeleteAttr(model);
                }
            });
        },
        /**
         * add Columns on the DataTable depending on the plugin configuration
         *
         * @method enrichColumns
         */
        enrichColumns: function () {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichColumns", 77);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 78);
if(!this.get("disableModifyFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 79);
this.addModifyColumn();
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 81);
if(!this.get("disableDeleteFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 82);
this.addDeleteColumn();
            }
        },
        /**
         * Provide the add button in order to add record on the DataTable
         *
         * @method addAddButton
         */
        addAddButton : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addAddButton", 90);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 91);
if(!this.get("disableAddFunc")){
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 92);
var button = Y.Node.create("<button id='addButton'>"+this.get("strings").addButtonText+"</button"),
                panel = this.get("panel");
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 94);
this.get("host").get("contentBox").append(button);
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 95);
button.on("click",function  (e) {
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 3)", 95);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 96);
panel.set("headerContent",this.get("strings").addItemHeader);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 97);
panel.get("field").clear();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 98);
panel.show();
            },this);
            }
        },
        /**
         *
         * @method modifyRecord
         */
        modifyRecord : function(e){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "modifyRecord", 106);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 107);
e.stopPropagation();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 108);
var record = this.get("host").getRecord(e.currentTarget),
                    panel = this.get("panel");
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 110);
panel.set("headerContent",this.get("strings").modifyItemHeader);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 111);
panel.get('field').setValue(record.getAttrs());
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 112);
panel.show();
        },
        /**
         *
         * @method deleteRecord
         */
        deleteRecord : function(e){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteRecord", 118);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 119);
e.stopPropagation();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 120);
var record = this.get("host").getRecord(e.currentTarget);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 121);
if (!this.get("confirmDelete") || confirm(this.get("strings").confirmDeletion)) {
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 122);
this.get("host").get("data").remove(record);
                }
        },
         /**
         *
         * @method deleteExtraColumns
         */
        deleteExtraColumns : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteExtraColumns", 129);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 130);
if(!this.get("disableModifyFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 131);
this.removeModifyColumn();
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 133);
if(!this.get("disableDeleteFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 134);
this.removeDeleteColumn();
            }
        },
         /**
         *
         * @method _initPanel
         * @private
         */
        _initPanel: function () {

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initPanel", 142);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 144);
var that = this;

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 146);
var panel = new Y.inputEx.Panel({
                centered: true,
                width: 500,
                modal: true,
                zIndex: 5,
                visible: false,
                inputEx: that.get("inputEx"),
          
      buttons: [{
          value: this.get("strings").cancelText,
          action: function (e) {
              _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "action", 156);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 157);
e.preventDefault();
              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 158);
panel.hide();
          }
      },{
          value: this.get("strings").saveText,
          action: function (e) {
              _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "action", 162);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 163);
e.preventDefault();

              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 165);
var field = that.get("panel").get("field"),
                  fieldValues = field.getValue(),
                  host = that.get("host"),
                  model;

              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 170);
if (field.validate()) {

                  _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 172);
if (fieldValues.id) {
                      // modification
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 174);
host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
                  } else {
                      // creation
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 177);
fieldValues.id = that.generateId(that.get("idSize"));
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 178);
var recordType = host.get("recordType");
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 179);
model = new recordType();
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 180);
model.setAttrs(fieldValues);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 181);
that.addModifyAttr(model);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 182);
that.addDeleteAttr(model);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 183);
host.get("data").add(model);
                  }
                  _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 185);
panel.hide();
              }
          }
      }]
            });

            // first the panel needs to be "render" then "show"
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 192);
panel.render();
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 193);
return panel;

        },
        /**
         *
         * @method destructor
         */
        destructor : function(){

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "destructor", 200);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 202);
var that = this,
                data = this.get("host").get("data");

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 205);
data.each(function (model) {

                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 4)", 205);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 207);
if(!this.get("disableModifyFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 208);
that.delModifyAttr(model);
                }
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 210);
if(!this.get("disableDeleteFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 211);
that.delDeleteAttr(model);
                }

            });
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 215);
this.deleteExtraColumns();
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 216);
if(!this.get("disableAddFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 217);
Y.one("#addButton").remove();
            }

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 220);
this.get("panel").destroy();
        },
        /**
         * Add the modify attribute on the data model
         *
         * @method addModifyAttr
         */
        addModifyAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyAttr", 227);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 227);
model.addAttr("modify");},
        /**
         * Add the delete attribute on the data model
         *
         * @method addDeleteAttr
         */
        addDeleteAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteAttr", 233);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 233);
model.addAttr("delete");},
        /**
         * Remove the modify attribute from the data model
         *
         * @method delModifyAttr
         */
        delModifyAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delModifyAttr", 239);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 239);
model.removeAttr("modify");},
        /**
         * Remove the modify attribute from the data model
         *
         * @method delDeleteAttr
         */
        delDeleteAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delDeleteAttr", 245);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 245);
model.removeAttr("delete");},
        /**
         * Add the modify column on the DataTable
         *
         * @method addModifyColumn
         */
        addModifyColumn : function(){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyColumn", 251);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 252);
this.get("host").addColumn({
                key: this.get("strings").modifyText,
                className: "inputEx-DataTable-modify"
            });
        },
        /**
         * Add the delete column on the DataTable
         *
         * @method addDeleteColumn
         */
        addDeleteColumn : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteColumn", 262);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 263);
this.get("host").addColumn({
                key: this.get("strings").deleteText,
                className: "inputEx-DataTable-delete"
            });
        },
        /**
         * Remove the modify column from the DataTable
         *
         * @method removeModifyColumn
         */
        removeModifyColumn : function(){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeModifyColumn", 273);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 273);
this.get("host").removeColumn("modify");},
        /**
         * Remove the delete column from the DataTable
         *
         * @method removeDeleteColumn
         */
        removeDeleteColumn : function(){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeDeleteColumn", 279);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 279);
this.get("host").removeColumn("delete");},
        generateId : function(size){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "generateId", 280);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 281);
var prefixId = this.get("prefixId"),
                s = size ? size : 5;
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 283);
prefixId = prefixId ? prefixId : "";
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 284);
return prefixId + Math.floor(Math.random()*Math.pow(10,s));
        },
        _initStrings : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initStrings", 286);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 287);
return Y.Intl.get("inputex-datatable");
        }
    }, {
/**
 * Static property used to define the default attribute configuration of
 * the Plugin.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
ATTRS: {
    /**
     * This is an inputEx field definition. This is used when a user try to create/modify a record
     *
     * @attribute inputEx
     */
    inputEx: {},
    /**
     * This string is inserted before the generated id
     *
     * @attribute prefixId
     * @type String
     * @example prefixId : "po-" --> id = po-1342561
     */
    prefixId: {
        value: ""
    },
    /**
     * This represents the number of digits used in the id generation
     * 
     * @attribute idSize
     * @type Number
     */
    idSize: {
        value: 5
    },
    /**
     * If true the add functionality is disabled
     *
     * @attribute disableAddFunc
     * @type boolean
     */
    disableAddFunc: {
        value: false
    },

    /**
     * If true the modify functionality is disabled
     * @attribute disableModifyFunc
     * @type boolean
     */
    disableModifyFunc: {
        value: false
    },
    /**
     * If true the delete functionality is disabled
     *
     * @attribute disableDeleteFunc
     * @type boolean
     */
    disableDeleteFunc: {
        value: false
    },
    /**
     * Labels of the plugin
     *
     * @attribute modifyColumnLabel
     */
     strings : {
        value : null,
        valueFn : '_initStrings'
     },
    /**
     * If true a confirmation will be asked to the user when a delete attempt appear
     *
     * @attribute confirmDelete
     * @type boolean
     */
    confirmDelete: {
        value: true
    },
    /**
     * This panel will be displayed on record creation/modication
     * @attribute panel
     * @type Y.inputEx.Panel
     */
    panel: {
        valueFn: '_initPanel',
        lazyAdd: true
    }
}});


}, '@VERSION@', {"requires": ["inputex-group", "inputex-panel", "datatable"], "skinnable": true, "lang": ["en", "fr", "de", "es", "fr", "it", "nl"]});
