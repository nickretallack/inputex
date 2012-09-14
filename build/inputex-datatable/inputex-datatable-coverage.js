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
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].code=["YUI.add('inputex-datatable', function (Y, NAME) {","","YUI.add(\"inputex-datatable\", function (Y) {","/**"," * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin."," * @module inputex-datatable"," */","","    var inputEx = Y.inputEx,","        MSGS = Y.inputEx.messages;","","    // namespace definition","    Y.namespace('inputEx.Plugin');","","","  /**","   * Provide add/modify/delete functionalities on a dataTable as a plugin","   * @class inputEx.Plugin.InputExDataTable","   * @extends Plugin.Base","   * @constructor","   * @param {Object} configuration object","   */","   inputEx.Plugin.InputExDataTable = function (config) {","      inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);","    };","","   inputEx.Plugin.InputExDataTable.NS = \"InputExDataTable\";","","    Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {","       ","       /**","        * @method initializer","        */","        initializer: function () {","","            var host = this.get(\"host\");","","            // enrich data (Model instance) with modify and delete attributs","            this.enrichData();","            // enrich DataTable with modify and delete columns","            this.enrichColumns();","            // add a button called \"add\" in order to add record in the DataTable","            this.addAddButton();","            ","            if(!this.get(\"disableModifyFunc\")){","                // handle row modification","                host.delegate(\"click\",this.modifyRecord,\"td.inputEx-DataTable-modify\", this);","            }","            if(!this.get(\"disableDeleteFunc\")){","                // handle row removal","                host.delegate(\"click\",this.deleteRecord, \"td.inputEx-DataTable-delete\", this);","            }","        },","        /**","         * add Attributes on the data model depending on the plugin configuration","         *","         * @method enrichData","         * @param {EventFacade} e","         */","        enrichData: function (e) {","","            var that = this,","                data = this.get(\"host\").get(\"data\");","","            data.each(function (model) {","                if(!this.get(\"disableModifyFunc\")){","                    that.addModifyAttr(model);","                }","                if(!this.get(\"disableDeleteFunc\")){","                    that.addDeleteAttr(model);","                }","            });","        },","        /**","         * add Columns on the DataTable depending on the plugin configuration","         *","         * @method enrichColumns","         */","        enrichColumns: function () {","            if(!this.get(\"disableModifyFunc\")){","                this.addModifyColumn();","            }","            if(!this.get(\"disableDeleteFunc\")){","                this.addDeleteColumn();","            }","        },","        /**","         * Provide the add button in order to add record on the DataTable","         *","         * @method addAddButton","         */","        addAddButton : function(){","            if(!this.get(\"disableAddFunc\")){","            var button = Y.Node.create(\"<button id='addButton'>\"+MSGS.addButtonText+\"</button\"),","                panel = this.get(\"panel\");","            this.get(\"host\").get(\"contentBox\").append(button);","            button.on(\"click\",function  (e) {","                panel.set(\"headerContent\",MSGS.addItemHeader);","                panel.get(\"field\").clear();","                panel.show();","            },this);","            }","        },","        /**","         *","         * @method modifyRecord","         */","        modifyRecord : function(e){","                e.stopPropagation();","                var record = this.get(\"host\").getRecord(e.currentTarget),","                    panel = this.get(\"panel\");","                panel.set(\"headerContent\",MSGS.modifyItemHeader);","                panel.get('field').setValue(record.getAttrs());","                panel.show();","        },","        /**","         *","         * @method deleteRecord","         */","        deleteRecord : function(e){","                e.stopPropagation();","                var record = this.get(\"host\").getRecord(e.currentTarget);","                if (!this.get(\"confirmDelete\") || confirm(MSGS.confirmDeletion)) {","                    this.get(\"host\").get(\"data\").remove(record);","                }","        },","         /**","         *","         * @method deleteExtraColumns","         */","        deleteExtraColumns : function(){","            if(!this.get(\"disableModifyFunc\")){","                this.removeModifyColumn();","            }","            if(!this.get(\"disableDeleteFunc\")){","                this.removeDeleteColumn();","            }","        },","         /**","         *","         * @method _initPanel","         * @private","         */","        _initPanel: function () {","","            var that = this;","","            var panel = new Y.inputEx.Panel({","                centered: true,","                width: 500,","                modal: true,","                zIndex: 5,","                visible: false,","                inputEx: that.get(\"inputEx\"),","          ","      buttons: [{","          value: MSGS.cancelText,","          action: function (e) {","              e.preventDefault();","              panel.hide();","          }","      },{","          value: MSGS.saveText,","          action: function (e) {","              e.preventDefault();","","              var field = that.get(\"panel\").get(\"field\"),","                  fieldValues = field.getValue(),","                  host = that.get(\"host\"),","                  model;","","              if (field.validate()) {","","                  if (fieldValues.id) {","                      // modification","                      host.get(\"data\").getById(fieldValues.id).setAttrs(fieldValues);","                  } else {","                      // creation","                      fieldValues.id = that.generateId(that.get(\"idSize\"));","                      var recordType = host.get(\"recordType\");","                      model = new recordType();","                      model.setAttrs(fieldValues);","                      that.addModifyAttr(model);","                      that.addDeleteAttr(model);","                      host.get(\"data\").add(model);","                  }","                  panel.hide();","              }","          }","      }]","            });","","            // first the panel needs to be \"render\" then \"show\"","            panel.render();","            return panel;","","        },","        /**","         *","         * @method destructor","         */","        destructor : function(){","","            var that = this,","                data = this.get(\"host\").get(\"data\");","","            data.each(function (model) {","","                if(!this.get(\"disableModifyFunc\")){","                    that.delModifyAttr(model);","                }","                if(!this.get(\"disableDeleteFunc\")){","                    that.delDeleteAttr(model);","                }","","            });","            this.deleteExtraColumns();","            if(!this.get(\"disableAddFunc\")){","                Y.one(\"#addButton\").remove();","            }","","            this.get(\"panel\").destroy();","        },","        /**","         * Add the modify attribute on the data model","         *","         * @method addModifyAttr","         */","        addModifyAttr : function(model){model.addAttr(\"modify\");},","        /**","         * Add the delete attribute on the data model","         *","         * @method addDeleteAttr","         */","        addDeleteAttr : function(model){model.addAttr(\"delete\");},","        /**","         * Remove the modify attribute from the data model","         *","         * @method delModifyAttr","         */","        delModifyAttr : function(model){model.removeAttr(\"modify\");},","        /**","         * Remove the modify attribute from the data model","         *","         * @method delDeleteAttr","         */","        delDeleteAttr : function(model){model.removeAttr(\"delete\");},","        /**","         * Add the modify column on the DataTable","         *","         * @method addModifyColumn","         */","        addModifyColumn : function(){","                this.get(\"host\").addColumn({","                key: this.get(\"modifyColumnLabel\"),","                className: \"inputEx-DataTable-modify\"","            });","        },","        /**","         * Add the delete column on the DataTable","         *","         * @method addDeleteColumn","         */","        addDeleteColumn : function(){","            this.get(\"host\").addColumn({","                key: this.get(\"deleteColumnLabel\"),","                className: \"inputEx-DataTable-delete\"","            });","        },","        /**","         * Remove the modify column from the DataTable","         *","         * @method removeModifyColumn","         */","        removeModifyColumn : function(){this.get(\"host\").removeColumn(\"modify\");},","        /**","         * Remove the delete column from the DataTable","         *","         * @method removeDeleteColumn","         */","        removeDeleteColumn : function(){this.get(\"host\").removeColumn(\"delete\");},","        generateId : function(size){","            var prefixId = this.get(\"prefixId\"),","                s = size ? size : 5;","            prefixId = prefixId ? prefixId : \"\";","            return prefixId + Math.floor(Math.random()*Math.pow(10,s));","        }","    }, {","/**"," * Static property used to define the default attribute configuration of"," * the Plugin."," *"," * @property ATTRS"," * @type {Object}"," * @static"," */","ATTRS: {","    /**","     * This is an inputEx field definition. This is used when a user try to create/modify a record","     *","     * @attribute inputEx","     */","    inputEx: {},","    /**","     * This string is inserted before the generated id","     *","     * @attribute prefixId","     * @type String","     * @example prefixId : \"po-\" --> id = po-1342561","     */","    prefixId: {","        value: \"\"","    },","    /**","     * This represents the number of digits used in the id generation","     * ","     * @attribute idSize","     * @type Number","     */","    idSize: {","        value: 5","    },","    /**","     * If true the add functionality is disabled","     *","     * @attribute disableAddFunc","     * @type boolean","     */","    disableAddFunc: {","        value: false","    },","","    /**","     * If true the modify functionality is disabled","     * @attribute disableModifyFunc","     * @type boolean","     */","    disableModifyFunc: {","        value: false","    },","    /**","     * If true the delete functionality is disabled","     *","     * @attribute disableDeleteFunc","     * @type boolean","     */","    disableDeleteFunc: {","        value: false","    },","    /**","     * Label of the modify column","     *","     * @attribute modifyColumnLabel","     */","    modifyColumnLabel: {","        value: MSGS.modifyText","    },","    /**","     * Label of the delete column","     *","     * @attribute deleteColumnLabel","     */","    deleteColumnLabel: {","        value: MSGS.deleteText","    },","    /**","     * If true a confirmation will be asked to the user when a delete attempt appear","     *","     * @attribute confirmDelete","     * @type boolean","     */","    confirmDelete: {","        value: true","    },","    /**","     * This panel will be displayed on record creation/modication","     * @attribute panel","     * @type Y.inputEx.Panel","     */","    panel: {","        valueFn: '_initPanel',","        lazyAdd: true","    }","}});","","}, \"\", {requires: ['inputex-group', 'inputex-panel','datatable']});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].lines = {"1":0,"3":0,"9":0,"13":0,"23":0,"24":0,"27":0,"29":0,"36":0,"39":0,"41":0,"43":0,"45":0,"47":0,"49":0,"51":0,"62":0,"65":0,"66":0,"67":0,"69":0,"70":0,"80":0,"81":0,"83":0,"84":0,"93":0,"94":0,"96":0,"97":0,"98":0,"99":0,"100":0,"109":0,"110":0,"112":0,"113":0,"114":0,"121":0,"122":0,"123":0,"124":0,"132":0,"133":0,"135":0,"136":0,"146":0,"148":0,"159":0,"160":0,"165":0,"167":0,"172":0,"174":0,"176":0,"179":0,"180":0,"181":0,"182":0,"183":0,"184":0,"185":0,"187":0,"194":0,"195":0,"204":0,"207":0,"209":0,"210":0,"212":0,"213":0,"217":0,"218":0,"219":0,"222":0,"229":0,"235":0,"241":0,"247":0,"254":0,"265":0,"275":0,"281":0,"283":0,"285":0,"286":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].functions = {"InputExDataTable:23":0,"initializer:34":0,"(anonymous 3):65":0,"enrichData:60":0,"enrichColumns:79":0,"(anonymous 4):97":0,"addAddButton:92":0,"modifyRecord:108":0,"deleteRecord:120":0,"deleteExtraColumns:131":0,"action:158":0,"action:164":0,"_initPanel:144":0,"(anonymous 5):207":0,"destructor:202":0,"addModifyAttr:229":0,"addDeleteAttr:235":0,"delModifyAttr:241":0,"delDeleteAttr:247":0,"addModifyColumn:253":0,"addDeleteColumn:264":0,"removeModifyColumn:275":0,"removeDeleteColumn:281":0,"generateId:282":0,"(anonymous 2):3":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredLines = 86;
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredFunctions = 26;
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 1);
YUI.add('inputex-datatable', function (Y, NAME) {

_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 3);
YUI.add("inputex-datatable", function (Y) {
/**
 * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin.
 * @module inputex-datatable
 */

    _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 2)", 3);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 9);
var inputEx = Y.inputEx,
        MSGS = Y.inputEx.messages;

    // namespace definition
    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 13);
Y.namespace('inputEx.Plugin');


  /**
   * Provide add/modify/delete functionalities on a dataTable as a plugin
   * @class inputEx.Plugin.InputExDataTable
   * @extends Plugin.Base
   * @constructor
   * @param {Object} configuration object
   */
   _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 23);
inputEx.Plugin.InputExDataTable = function (config) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "InputExDataTable", 23);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 24);
inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);
    };

   _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 27);
inputEx.Plugin.InputExDataTable.NS = "InputExDataTable";

    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 29);
Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {
       
       /**
        * @method initializer
        */
        initializer: function () {

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "initializer", 34);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 36);
var host = this.get("host");

            // enrich data (Model instance) with modify and delete attributs
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 39);
this.enrichData();
            // enrich DataTable with modify and delete columns
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 41);
this.enrichColumns();
            // add a button called "add" in order to add record in the DataTable
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 43);
this.addAddButton();
            
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 45);
if(!this.get("disableModifyFunc")){
                // handle row modification
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 47);
host.delegate("click",this.modifyRecord,"td.inputEx-DataTable-modify", this);
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 49);
if(!this.get("disableDeleteFunc")){
                // handle row removal
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 51);
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

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichData", 60);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 62);
var that = this,
                data = this.get("host").get("data");

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 65);
data.each(function (model) {
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 3)", 65);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 66);
if(!this.get("disableModifyFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 67);
that.addModifyAttr(model);
                }
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 69);
if(!this.get("disableDeleteFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 70);
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
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichColumns", 79);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 80);
if(!this.get("disableModifyFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 81);
this.addModifyColumn();
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 83);
if(!this.get("disableDeleteFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 84);
this.addDeleteColumn();
            }
        },
        /**
         * Provide the add button in order to add record on the DataTable
         *
         * @method addAddButton
         */
        addAddButton : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addAddButton", 92);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 93);
if(!this.get("disableAddFunc")){
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 94);
var button = Y.Node.create("<button id='addButton'>"+MSGS.addButtonText+"</button"),
                panel = this.get("panel");
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 96);
this.get("host").get("contentBox").append(button);
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 97);
button.on("click",function  (e) {
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 4)", 97);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 98);
panel.set("headerContent",MSGS.addItemHeader);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 99);
panel.get("field").clear();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 100);
panel.show();
            },this);
            }
        },
        /**
         *
         * @method modifyRecord
         */
        modifyRecord : function(e){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "modifyRecord", 108);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 109);
e.stopPropagation();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 110);
var record = this.get("host").getRecord(e.currentTarget),
                    panel = this.get("panel");
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 112);
panel.set("headerContent",MSGS.modifyItemHeader);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 113);
panel.get('field').setValue(record.getAttrs());
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 114);
panel.show();
        },
        /**
         *
         * @method deleteRecord
         */
        deleteRecord : function(e){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteRecord", 120);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 121);
e.stopPropagation();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 122);
var record = this.get("host").getRecord(e.currentTarget);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 123);
if (!this.get("confirmDelete") || confirm(MSGS.confirmDeletion)) {
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 124);
this.get("host").get("data").remove(record);
                }
        },
         /**
         *
         * @method deleteExtraColumns
         */
        deleteExtraColumns : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteExtraColumns", 131);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 132);
if(!this.get("disableModifyFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 133);
this.removeModifyColumn();
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 135);
if(!this.get("disableDeleteFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 136);
this.removeDeleteColumn();
            }
        },
         /**
         *
         * @method _initPanel
         * @private
         */
        _initPanel: function () {

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initPanel", 144);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 146);
var that = this;

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 148);
var panel = new Y.inputEx.Panel({
                centered: true,
                width: 500,
                modal: true,
                zIndex: 5,
                visible: false,
                inputEx: that.get("inputEx"),
          
      buttons: [{
          value: MSGS.cancelText,
          action: function (e) {
              _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "action", 158);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 159);
e.preventDefault();
              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 160);
panel.hide();
          }
      },{
          value: MSGS.saveText,
          action: function (e) {
              _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "action", 164);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 165);
e.preventDefault();

              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 167);
var field = that.get("panel").get("field"),
                  fieldValues = field.getValue(),
                  host = that.get("host"),
                  model;

              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 172);
if (field.validate()) {

                  _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 174);
if (fieldValues.id) {
                      // modification
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 176);
host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
                  } else {
                      // creation
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 179);
fieldValues.id = that.generateId(that.get("idSize"));
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 180);
var recordType = host.get("recordType");
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 181);
model = new recordType();
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 182);
model.setAttrs(fieldValues);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 183);
that.addModifyAttr(model);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 184);
that.addDeleteAttr(model);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 185);
host.get("data").add(model);
                  }
                  _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 187);
panel.hide();
              }
          }
      }]
            });

            // first the panel needs to be "render" then "show"
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 194);
panel.render();
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 195);
return panel;

        },
        /**
         *
         * @method destructor
         */
        destructor : function(){

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "destructor", 202);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 204);
var that = this,
                data = this.get("host").get("data");

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 207);
data.each(function (model) {

                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 5)", 207);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 209);
if(!this.get("disableModifyFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 210);
that.delModifyAttr(model);
                }
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 212);
if(!this.get("disableDeleteFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 213);
that.delDeleteAttr(model);
                }

            });
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 217);
this.deleteExtraColumns();
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 218);
if(!this.get("disableAddFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 219);
Y.one("#addButton").remove();
            }

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 222);
this.get("panel").destroy();
        },
        /**
         * Add the modify attribute on the data model
         *
         * @method addModifyAttr
         */
        addModifyAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyAttr", 229);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 229);
model.addAttr("modify");},
        /**
         * Add the delete attribute on the data model
         *
         * @method addDeleteAttr
         */
        addDeleteAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteAttr", 235);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 235);
model.addAttr("delete");},
        /**
         * Remove the modify attribute from the data model
         *
         * @method delModifyAttr
         */
        delModifyAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delModifyAttr", 241);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 241);
model.removeAttr("modify");},
        /**
         * Remove the modify attribute from the data model
         *
         * @method delDeleteAttr
         */
        delDeleteAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delDeleteAttr", 247);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 247);
model.removeAttr("delete");},
        /**
         * Add the modify column on the DataTable
         *
         * @method addModifyColumn
         */
        addModifyColumn : function(){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyColumn", 253);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 254);
this.get("host").addColumn({
                key: this.get("modifyColumnLabel"),
                className: "inputEx-DataTable-modify"
            });
        },
        /**
         * Add the delete column on the DataTable
         *
         * @method addDeleteColumn
         */
        addDeleteColumn : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteColumn", 264);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 265);
this.get("host").addColumn({
                key: this.get("deleteColumnLabel"),
                className: "inputEx-DataTable-delete"
            });
        },
        /**
         * Remove the modify column from the DataTable
         *
         * @method removeModifyColumn
         */
        removeModifyColumn : function(){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeModifyColumn", 275);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 275);
this.get("host").removeColumn("modify");},
        /**
         * Remove the delete column from the DataTable
         *
         * @method removeDeleteColumn
         */
        removeDeleteColumn : function(){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeDeleteColumn", 281);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 281);
this.get("host").removeColumn("delete");},
        generateId : function(size){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "generateId", 282);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 283);
var prefixId = this.get("prefixId"),
                s = size ? size : 5;
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 285);
prefixId = prefixId ? prefixId : "";
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 286);
return prefixId + Math.floor(Math.random()*Math.pow(10,s));
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
     * Label of the modify column
     *
     * @attribute modifyColumnLabel
     */
    modifyColumnLabel: {
        value: MSGS.modifyText
    },
    /**
     * Label of the delete column
     *
     * @attribute deleteColumnLabel
     */
    deleteColumnLabel: {
        value: MSGS.deleteText
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

}, "", {requires: ['inputex-group', 'inputex-panel','datatable']});

}, '@VERSION@');
