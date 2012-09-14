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
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].code=["YUI.add('inputex-datatable', function (Y, NAME) {","","/**"," * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin."," * @module inputex-datatable"," */","","    var inputEx = Y.inputEx,","        MSGS = Y.inputEx.messages;","","    // namespace definition","    Y.namespace('inputEx.Plugin');","","","  /**","   * Provide add/modify/delete functionalities on a dataTable as a plugin","   * @class inputEx.Plugin.InputExDataTable","   * @extends Plugin.Base","   * @constructor","   * @param {Object} configuration object","   */","   inputEx.Plugin.InputExDataTable = function (config) {","      inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);","    };","","   inputEx.Plugin.InputExDataTable.NS = \"InputExDataTable\";","","    Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {","       ","       /**","        * @method initializer","        */","        initializer: function () {","","            var host = this.get(\"host\");","","            // enrich data (Model instance) with modify and delete attributs","            this.enrichData();","            // enrich DataTable with modify and delete columns","            this.enrichColumns();","            // add a button called \"add\" in order to add record in the DataTable","            this.addAddButton();","            ","            if(!this.get(\"disableModifyFunc\")){","                // handle row modification","                host.delegate(\"click\",this.modifyRecord,\"td.inputEx-DataTable-modify\", this);","            }","            if(!this.get(\"disableDeleteFunc\")){","                // handle row removal","                host.delegate(\"click\",this.deleteRecord, \"td.inputEx-DataTable-delete\", this);","            }","        },","        /**","         * add Attributes on the data model depending on the plugin configuration","         *","         * @method enrichData","         * @param {EventFacade} e","         */","        enrichData: function (e) {","","            var that = this,","                data = this.get(\"host\").get(\"data\");","","            data.each(function (model) {","                if(!this.get(\"disableModifyFunc\")){","                    that.addModifyAttr(model);","                }","                if(!this.get(\"disableDeleteFunc\")){","                    that.addDeleteAttr(model);","                }","            });","        },","        /**","         * add Columns on the DataTable depending on the plugin configuration","         *","         * @method enrichColumns","         */","        enrichColumns: function () {","            if(!this.get(\"disableModifyFunc\")){","                this.addModifyColumn();","            }","            if(!this.get(\"disableDeleteFunc\")){","                this.addDeleteColumn();","            }","        },","        /**","         * Provide the add button in order to add record on the DataTable","         *","         * @method addAddButton","         */","        addAddButton : function(){","            if(!this.get(\"disableAddFunc\")){","            var button = Y.Node.create(\"<button id='addButton'>\"+MSGS.addButtonText+\"</button\"),","                panel = this.get(\"panel\");","            this.get(\"host\").get(\"contentBox\").append(button);","            button.on(\"click\",function  (e) {","                panel.set(\"headerContent\",MSGS.addItemHeader);","                panel.get(\"field\").clear();","                panel.show();","            },this);","            }","        },","        /**","         *","         * @method modifyRecord","         */","        modifyRecord : function(e){","                e.stopPropagation();","                var record = this.get(\"host\").getRecord(e.currentTarget),","                    panel = this.get(\"panel\");","                panel.set(\"headerContent\",MSGS.modifyItemHeader);","                panel.get('field').setValue(record.getAttrs());","                panel.show();","        },","        /**","         *","         * @method deleteRecord","         */","        deleteRecord : function(e){","                e.stopPropagation();","                var record = this.get(\"host\").getRecord(e.currentTarget);","                if (!this.get(\"confirmDelete\") || confirm(MSGS.confirmDeletion)) {","                    this.get(\"host\").get(\"data\").remove(record);","                }","        },","         /**","         *","         * @method deleteExtraColumns","         */","        deleteExtraColumns : function(){","            if(!this.get(\"disableModifyFunc\")){","                this.removeModifyColumn();","            }","            if(!this.get(\"disableDeleteFunc\")){","                this.removeDeleteColumn();","            }","        },","         /**","         *","         * @method _initPanel","         * @private","         */","        _initPanel: function () {","","            var that = this;","","            var panel = new Y.inputEx.Panel({","                centered: true,","                width: 500,","                modal: true,","                zIndex: 5,","                visible: false,","                inputEx: that.get(\"inputEx\"),","          ","      buttons: [{","          value: MSGS.cancelText,","          action: function (e) {","              e.preventDefault();","              panel.hide();","          }","      },{","          value: MSGS.saveText,","          action: function (e) {","              e.preventDefault();","","              var field = that.get(\"panel\").get(\"field\"),","                  fieldValues = field.getValue(),","                  host = that.get(\"host\"),","                  model;","","              if (field.validate()) {","","                  if (fieldValues.id) {","                      // modification","                      host.get(\"data\").getById(fieldValues.id).setAttrs(fieldValues);","                  } else {","                      // creation","                      fieldValues.id = that.generateId(that.get(\"idSize\"));","                      var recordType = host.get(\"recordType\");","                      model = new recordType();","                      model.setAttrs(fieldValues);","                      that.addModifyAttr(model);","                      that.addDeleteAttr(model);","                      host.get(\"data\").add(model);","                  }","                  panel.hide();","              }","          }","      }]","            });","","            // first the panel needs to be \"render\" then \"show\"","            panel.render();","            return panel;","","        },","        /**","         *","         * @method destructor","         */","        destructor : function(){","","            var that = this,","                data = this.get(\"host\").get(\"data\");","","            data.each(function (model) {","","                if(!this.get(\"disableModifyFunc\")){","                    that.delModifyAttr(model);","                }","                if(!this.get(\"disableDeleteFunc\")){","                    that.delDeleteAttr(model);","                }","","            });","            this.deleteExtraColumns();","            if(!this.get(\"disableAddFunc\")){","                Y.one(\"#addButton\").remove();","            }","","            this.get(\"panel\").destroy();","        },","        /**","         * Add the modify attribute on the data model","         *","         * @method addModifyAttr","         */","        addModifyAttr : function(model){model.addAttr(\"modify\");},","        /**","         * Add the delete attribute on the data model","         *","         * @method addDeleteAttr","         */","        addDeleteAttr : function(model){model.addAttr(\"delete\");},","        /**","         * Remove the modify attribute from the data model","         *","         * @method delModifyAttr","         */","        delModifyAttr : function(model){model.removeAttr(\"modify\");},","        /**","         * Remove the modify attribute from the data model","         *","         * @method delDeleteAttr","         */","        delDeleteAttr : function(model){model.removeAttr(\"delete\");},","        /**","         * Add the modify column on the DataTable","         *","         * @method addModifyColumn","         */","        addModifyColumn : function(){","                this.get(\"host\").addColumn({","                key: this.get(\"modifyColumnLabel\"),","                className: \"inputEx-DataTable-modify\"","            });","        },","        /**","         * Add the delete column on the DataTable","         *","         * @method addDeleteColumn","         */","        addDeleteColumn : function(){","            this.get(\"host\").addColumn({","                key: this.get(\"deleteColumnLabel\"),","                className: \"inputEx-DataTable-delete\"","            });","        },","        /**","         * Remove the modify column from the DataTable","         *","         * @method removeModifyColumn","         */","        removeModifyColumn : function(){this.get(\"host\").removeColumn(\"modify\");},","        /**","         * Remove the delete column from the DataTable","         *","         * @method removeDeleteColumn","         */","        removeDeleteColumn : function(){this.get(\"host\").removeColumn(\"delete\");},","        generateId : function(size){","            var prefixId = this.get(\"prefixId\"),","                s = size ? size : 5;","            prefixId = prefixId ? prefixId : \"\";","            return prefixId + Math.floor(Math.random()*Math.pow(10,s));","        }","    }, {","/**"," * Static property used to define the default attribute configuration of"," * the Plugin."," *"," * @property ATTRS"," * @type {Object}"," * @static"," */","ATTRS: {","    /**","     * This is an inputEx field definition. This is used when a user try to create/modify a record","     *","     * @attribute inputEx","     */","    inputEx: {},","    /**","     * This string is inserted before the generated id","     *","     * @attribute prefixId","     * @type String","     * @example prefixId : \"po-\" --> id = po-1342561","     */","    prefixId: {","        value: \"\"","    },","    /**","     * This represents the number of digits used in the id generation","     * ","     * @attribute idSize","     * @type Number","     */","    idSize: {","        value: 5","    },","    /**","     * If true the add functionality is disabled","     *","     * @attribute disableAddFunc","     * @type boolean","     */","    disableAddFunc: {","        value: false","    },","","    /**","     * If true the modify functionality is disabled","     * @attribute disableModifyFunc","     * @type boolean","     */","    disableModifyFunc: {","        value: false","    },","    /**","     * If true the delete functionality is disabled","     *","     * @attribute disableDeleteFunc","     * @type boolean","     */","    disableDeleteFunc: {","        value: false","    },","    /**","     * Label of the modify column","     *","     * @attribute modifyColumnLabel","     */","    modifyColumnLabel: {","        value: MSGS.modifyText","    },","    /**","     * Label of the delete column","     *","     * @attribute deleteColumnLabel","     */","    deleteColumnLabel: {","        value: MSGS.deleteText","    },","    /**","     * If true a confirmation will be asked to the user when a delete attempt appear","     *","     * @attribute confirmDelete","     * @type boolean","     */","    confirmDelete: {","        value: true","    },","    /**","     * This panel will be displayed on record creation/modication","     * @attribute panel","     * @type Y.inputEx.Panel","     */","    panel: {","        valueFn: '_initPanel',","        lazyAdd: true","    }","}});","","","}, '@VERSION@', {\"requires\": [\"inputex-group\", \"inputex-panel\", \"datatable\"], \"skinnable\": true});"];
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].lines = {"1":0,"8":0,"12":0,"22":0,"23":0,"26":0,"28":0,"35":0,"38":0,"40":0,"42":0,"44":0,"46":0,"48":0,"50":0,"61":0,"64":0,"65":0,"66":0,"68":0,"69":0,"79":0,"80":0,"82":0,"83":0,"92":0,"93":0,"95":0,"96":0,"97":0,"98":0,"99":0,"108":0,"109":0,"111":0,"112":0,"113":0,"120":0,"121":0,"122":0,"123":0,"131":0,"132":0,"134":0,"135":0,"145":0,"147":0,"158":0,"159":0,"164":0,"166":0,"171":0,"173":0,"175":0,"178":0,"179":0,"180":0,"181":0,"182":0,"183":0,"184":0,"186":0,"193":0,"194":0,"203":0,"206":0,"208":0,"209":0,"211":0,"212":0,"216":0,"217":0,"218":0,"221":0,"228":0,"234":0,"240":0,"246":0,"253":0,"264":0,"274":0,"280":0,"282":0,"284":0,"285":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].functions = {"InputExDataTable:22":0,"initializer:33":0,"(anonymous 2):64":0,"enrichData:59":0,"enrichColumns:78":0,"(anonymous 3):96":0,"addAddButton:91":0,"modifyRecord:107":0,"deleteRecord:119":0,"deleteExtraColumns:130":0,"action:157":0,"action:163":0,"_initPanel:143":0,"(anonymous 4):206":0,"destructor:201":0,"addModifyAttr:228":0,"addDeleteAttr:234":0,"delModifyAttr:240":0,"delDeleteAttr:246":0,"addModifyColumn:252":0,"addDeleteColumn:263":0,"removeModifyColumn:274":0,"removeDeleteColumn:280":0,"generateId:281":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredLines = 85;
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredFunctions = 25;
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 1);
YUI.add('inputex-datatable', function (Y, NAME) {

/**
 * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin.
 * @module inputex-datatable
 */

    _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 8);
var inputEx = Y.inputEx,
        MSGS = Y.inputEx.messages;

    // namespace definition
    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 12);
Y.namespace('inputEx.Plugin');


  /**
   * Provide add/modify/delete functionalities on a dataTable as a plugin
   * @class inputEx.Plugin.InputExDataTable
   * @extends Plugin.Base
   * @constructor
   * @param {Object} configuration object
   */
   _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 22);
inputEx.Plugin.InputExDataTable = function (config) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "InputExDataTable", 22);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 23);
inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);
    };

   _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 26);
inputEx.Plugin.InputExDataTable.NS = "InputExDataTable";

    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 28);
Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {
       
       /**
        * @method initializer
        */
        initializer: function () {

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "initializer", 33);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 35);
var host = this.get("host");

            // enrich data (Model instance) with modify and delete attributs
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 38);
this.enrichData();
            // enrich DataTable with modify and delete columns
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 40);
this.enrichColumns();
            // add a button called "add" in order to add record in the DataTable
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 42);
this.addAddButton();
            
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 44);
if(!this.get("disableModifyFunc")){
                // handle row modification
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 46);
host.delegate("click",this.modifyRecord,"td.inputEx-DataTable-modify", this);
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 48);
if(!this.get("disableDeleteFunc")){
                // handle row removal
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 50);
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

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichData", 59);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 61);
var that = this,
                data = this.get("host").get("data");

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 64);
data.each(function (model) {
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 2)", 64);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 65);
if(!this.get("disableModifyFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 66);
that.addModifyAttr(model);
                }
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 68);
if(!this.get("disableDeleteFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 69);
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
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichColumns", 78);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 79);
if(!this.get("disableModifyFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 80);
this.addModifyColumn();
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 82);
if(!this.get("disableDeleteFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 83);
this.addDeleteColumn();
            }
        },
        /**
         * Provide the add button in order to add record on the DataTable
         *
         * @method addAddButton
         */
        addAddButton : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addAddButton", 91);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 92);
if(!this.get("disableAddFunc")){
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 93);
var button = Y.Node.create("<button id='addButton'>"+MSGS.addButtonText+"</button"),
                panel = this.get("panel");
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 95);
this.get("host").get("contentBox").append(button);
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 96);
button.on("click",function  (e) {
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 3)", 96);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 97);
panel.set("headerContent",MSGS.addItemHeader);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 98);
panel.get("field").clear();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 99);
panel.show();
            },this);
            }
        },
        /**
         *
         * @method modifyRecord
         */
        modifyRecord : function(e){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "modifyRecord", 107);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 108);
e.stopPropagation();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 109);
var record = this.get("host").getRecord(e.currentTarget),
                    panel = this.get("panel");
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 111);
panel.set("headerContent",MSGS.modifyItemHeader);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 112);
panel.get('field').setValue(record.getAttrs());
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 113);
panel.show();
        },
        /**
         *
         * @method deleteRecord
         */
        deleteRecord : function(e){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteRecord", 119);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 120);
e.stopPropagation();
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 121);
var record = this.get("host").getRecord(e.currentTarget);
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 122);
if (!this.get("confirmDelete") || confirm(MSGS.confirmDeletion)) {
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 123);
this.get("host").get("data").remove(record);
                }
        },
         /**
         *
         * @method deleteExtraColumns
         */
        deleteExtraColumns : function(){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteExtraColumns", 130);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 131);
if(!this.get("disableModifyFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 132);
this.removeModifyColumn();
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 134);
if(!this.get("disableDeleteFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 135);
this.removeDeleteColumn();
            }
        },
         /**
         *
         * @method _initPanel
         * @private
         */
        _initPanel: function () {

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initPanel", 143);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 145);
var that = this;

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 147);
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
              _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "action", 157);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 158);
e.preventDefault();
              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 159);
panel.hide();
          }
      },{
          value: MSGS.saveText,
          action: function (e) {
              _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "action", 163);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 164);
e.preventDefault();

              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 166);
var field = that.get("panel").get("field"),
                  fieldValues = field.getValue(),
                  host = that.get("host"),
                  model;

              _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 171);
if (field.validate()) {

                  _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 173);
if (fieldValues.id) {
                      // modification
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 175);
host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
                  } else {
                      // creation
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 178);
fieldValues.id = that.generateId(that.get("idSize"));
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 179);
var recordType = host.get("recordType");
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 180);
model = new recordType();
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 181);
model.setAttrs(fieldValues);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 182);
that.addModifyAttr(model);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 183);
that.addDeleteAttr(model);
                      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 184);
host.get("data").add(model);
                  }
                  _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 186);
panel.hide();
              }
          }
      }]
            });

            // first the panel needs to be "render" then "show"
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 193);
panel.render();
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 194);
return panel;

        },
        /**
         *
         * @method destructor
         */
        destructor : function(){

            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "destructor", 201);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 203);
var that = this,
                data = this.get("host").get("data");

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 206);
data.each(function (model) {

                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 4)", 206);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 208);
if(!this.get("disableModifyFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 209);
that.delModifyAttr(model);
                }
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 211);
if(!this.get("disableDeleteFunc")){
                    _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 212);
that.delDeleteAttr(model);
                }

            });
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 216);
this.deleteExtraColumns();
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 217);
if(!this.get("disableAddFunc")){
                _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 218);
Y.one("#addButton").remove();
            }

            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 221);
this.get("panel").destroy();
        },
        /**
         * Add the modify attribute on the data model
         *
         * @method addModifyAttr
         */
        addModifyAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyAttr", 228);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 228);
model.addAttr("modify");},
        /**
         * Add the delete attribute on the data model
         *
         * @method addDeleteAttr
         */
        addDeleteAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteAttr", 234);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 234);
model.addAttr("delete");},
        /**
         * Remove the modify attribute from the data model
         *
         * @method delModifyAttr
         */
        delModifyAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delModifyAttr", 240);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 240);
model.removeAttr("modify");},
        /**
         * Remove the modify attribute from the data model
         *
         * @method delDeleteAttr
         */
        delDeleteAttr : function(model){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delDeleteAttr", 246);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 246);
model.removeAttr("delete");},
        /**
         * Add the modify column on the DataTable
         *
         * @method addModifyColumn
         */
        addModifyColumn : function(){
                _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyColumn", 252);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 253);
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
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteColumn", 263);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 264);
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
        removeModifyColumn : function(){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeModifyColumn", 274);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 274);
this.get("host").removeColumn("modify");},
        /**
         * Remove the delete column from the DataTable
         *
         * @method removeDeleteColumn
         */
        removeDeleteColumn : function(){_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeDeleteColumn", 280);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 280);
this.get("host").removeColumn("delete");},
        generateId : function(size){
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "generateId", 281);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 282);
var prefixId = this.get("prefixId"),
                s = size ? size : 5;
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 284);
prefixId = prefixId ? prefixId : "";
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 285);
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


}, '@VERSION@', {"requires": ["inputex-group", "inputex-panel", "datatable"], "skinnable": true});
