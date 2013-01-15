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
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].code=["YUI.add('inputex-datatable', function (Y, NAME) {","","/*global Y:true,confirm:true*/","","/**"," * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin."," * @module inputex-datatable"," */","","var inputEx = Y.inputEx;","","Y.namespace('inputEx.Plugin');","","/**","* Provide add/modify/delete functionalities on a dataTable as a plugin","* @class inputEx.Plugin.InputExDataTable","* @extends Plugin.Base","* @constructor","* @param {Object} configuration object","*/","inputEx.Plugin.InputExDataTable = function (config) {","   inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);","};","","inputEx.Plugin.InputExDataTable.NS = \"InputExDataTable\";","","Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {","   ","   /**","    * @method initializer","    */","   initializer: function () {","","      var host = this.get(\"host\");","","      // enrich data (Model instance) with modify and delete attributs","      this.enrichData();","      ","      // enrich DataTable with modify and delete columns","      this.enrichColumns();","","      // add a button called \"add\" in order to add record in the DataTable","      this.addAddButton();","        ","      if(!this.get(\"disableModifyFunc\")) {","         // handle row modification","         host.delegate(\"click\",this.modifyRecord, \"td.\"+host.getClassName('cell-modify'), this);","      }","","      if(!this.get(\"disableDeleteFunc\")) {","         // handle row removal","         host.delegate(\"click\",this.deleteRecord, \"td.\"+host.getClassName('cell-delete'), this);","      }","      ","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').addClass( host.getClassName('inplaceedit') );","         this.setupInplaceEditing();","      }","","    },","","","   setupInplaceEditing: function() {","      var host = this.get('host');","","      // Delegate click event to make the inplace editor appear","      this.cellClickHandler = host.delegate(\"click\", this.onCellClick, \".\"+host.getClassName('cell'), this);","","   },","","   onCellClick: function(e) {","","      var findTd = function(n) { return n.get('tagName') === 'TD' && n.hasClass('yui3-datatable-cell'); },","          td = findTd(e.target) ? e.target : e.target.ancestor(findTd), // this might be a DIV because of a formatter (see color)","          host = this.get('host'),","          colIndex = td.get('parentNode').get('children').indexOf(td),","          column = host.getColumn(colIndex),","          record = host.getRecord(td),","          key = column.key,","          value = record.get(key),","","          overlay = this.get('inplaceOverlay'),","","          // inputEx Field config","          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { return i.name === key; }),","          conf = Y.mix({","            parentEl: this.overlayFieldContainer.getDOMNode()","          }, fieldConf),","          field;","","      // When we changed the value of an overlay but click on another cell, it doesn't save automatically","      // since the event is stopped. So we do it manually here.","      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision","      if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","         this.onOverlaySave();","      }","","      e.stopPropagation();","","      if( !fieldConf ||","          fieldConf.type === \"uneditable\" ||","          td.hasClass('yui3-datatable-cell-delete') ||","          td.hasClass('yui3-datatable-cell-modify') ) {","         return;","      }","","      // Align","      overlay.align(td, [\"tl\", \"tl\"]);","      overlay.show();","","      // Render field","      this.overlayFieldContainer.set('innerHTML', '');","      field = new Y.inputEx(conf);","      field.setValue(value);","      field.focus();","","      this._inplaceeditCell = {","         record: record,","         key: column.key,","         field: field,","         td: td","      };","   },","","","   _initInplaceOverlay: function() {","","      var o = new Y.Overlay({","            zIndex: 5","          }),","          contentBox = o.get('contentBox'),","          overlayFieldContainer = Y.Node.create(\"<div />\"),","          saveButton,","          cancelButton;","","      contentBox.appendChild(overlayFieldContainer);","      this.overlayFieldContainer = overlayFieldContainer;","","      // Overlay save and cancel buttons","      saveButton = Y.Node.create('<button>Sauver</button>');","      contentBox.appendChild(saveButton);","      cancelButton = Y.Node.create('<button>Annuler</button>');","      contentBox.appendChild(cancelButton);","      saveButton.on('click', this.onOverlaySave, this);","      cancelButton.on('click', this.onOverlayCancel, this);","","      // Close overlay if click outside of the overlay","      this.docClickHandler = Y.on('click', Y.bind(function(e) {","         var overlay = this.get('inplaceOverlay');","","         if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","            this.onOverlaySave();","         }","      }, this), Y.config.doc);","","      contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));","","      o.hide();","      o.render();","      return o;","   },","","   onOverlaySave: function() {","","      // Call the updateMethod async method","      var updateMethod = this.get('updateMethod'),","          field = this._inplaceeditCell.field,","          newValue = field.getValue(),","          record = this._inplaceeditCell.record,","          key = this._inplaceeditCell.key,","          oldValue = record.get(key),","          fieldValues = {},","          id = record.get('id'),","          host = this.get('host'),","          td = this._inplaceeditCell.td;","","      if(!field.validate()) {","         return;","      }","","      // has not changed => don't do anything","      if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||","            (newValue === oldValue) ) {","         this.get('inplaceOverlay').hide();","         return;","      }","","      fieldValues[key] = newValue;","","      td.addClass( host.getClassName('cell-edited') );","","      updateMethod.call(this, id, fieldValues, Y.bind(function(success) {","         if (success) {","            // on success, update the record in the datatable","            host.get(\"data\").getById(id).setAttrs(fieldValues);","            td.removeClass( host.getClassName('cell-edited') );","         }","      },this));","","      this.get('inplaceOverlay').hide();","   },","","   onOverlayCancel: function() {","      this.get('inplaceOverlay').hide();","   },","","   /**","    * add Attributes on the data model depending on the plugin configuration","    *","    * @method enrichData","    */","   enrichData: function () {","","      var that = this,","          data = this.get(\"host\").get(\"data\");","","      data.each(function (model) {","         if(!this.get(\"disableModifyFunc\")) {","            that.addModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")){","            that.addDeleteAttr(model);","         }","      });","","   },","","   /**","    * add Columns on the DataTable depending on the plugin configuration","    *","    * @method enrichColumns","    */","   enrichColumns: function () {","","      if(!this.get(\"disableModifyFunc\")) {","         this.addModifyColumn();","      }","      ","      if(!this.get(\"disableDeleteFunc\")) {","         this.addDeleteColumn();","      }","   },","","   /**","    * Provide the add button in order to add record on the DataTable","    *","    * @method addAddButton","    */","   addAddButton: function() {","","      if(!this.get(\"disableAddFunc\")) {","      ","         var buttonHtml = \"<button>\"+this.get(\"strings\").addButtonText+\"</button>\",","             button = Y.Node.create(buttonHtml);","","         this.addButton = button;","","         this.get(\"host\").get(\"contentBox\").append(button);","         ","         button.on(\"click\", this._onAddButtonClick, this);","      }","   ","   },","","   _onAddButtonClick: function (e) {","      var panel = this.get(\"panel\");","","      e.stopPropagation();","","      panel.set(\"headerContent\",this.get(\"strings\").addItemHeader);","      panel.get(\"field\").clear();","      panel.show();","   },","","   /**","    *","    * @method modifyRecord","    */","   modifyRecord: function(e) {","      ","      e.stopPropagation();","      ","      var record = this.get(\"host\").getRecord(e.currentTarget),","          panel = this.get(\"panel\");","","      panel.set(\"headerContent\",this.get(\"strings\").modifyItemHeader);","      panel.get('field').setValue(record.getAttrs());","      panel.show();","   },","","   /**","    * Called when the user clicked on a link to delete a record","    * @method deleteRecord","    */","   deleteRecord: function(e) {","      e.stopPropagation();","      var deleteMethod,","          host = this.get('host'),","          record = host.getRecord(e.currentTarget),","          row;","      if (!this.get(\"confirmDelete\") || confirm(this.get(\"strings\").confirmDeletion)) {","","         // Call the deleteMethod async method","         deleteMethod = this.get('deleteMethod');","","         row = host.getRow(record);","         row.addClass( host.getClassName('row-edited') );","","         deleteMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               // on success, remove the record from the datatable","               host.get(\"data\").remove(record);","            }","         },this));","","      }","   },","","   /**","    *","    * @method deleteExtraColumns","    */","   deleteExtraColumns: function() {","      ","      if(!this.get(\"disableModifyFunc\")) {","         this.removeModifyColumn();","      }","      if(!this.get(\"disableDeleteFunc\")) {","         this.removeDeleteColumn();","      }","   },","","   /**","    *","    * @method _initPanel","    * @private","    */","   _initPanel: function () {","","      var panel = new Y.inputEx.Panel({","         centered: true,","         width: 500,","         modal: true,","         zIndex: 5,","         visible: false,","         inputEx: this.get(\"inputEx\"),","         buttons: [","            {","               value: this.get(\"strings\").cancelText,","               action: Y.bind(this.onPanelCancelButton, this)","            },","            {","               value: this.get(\"strings\").saveText,","               action: Y.bind(this.onPanelSaveButton, this)","            }","         ]","      });","","      // first the panel needs to be \"render\" then \"show\"","      panel.render();","      return panel;","   },","","   onPanelCancelButton: function (e) {","      e.preventDefault();","      this.get('panel').hide();","   },","","   onPanelSaveButton: function (e) {","      e.preventDefault();","","      var field = this.get(\"panel\").get(\"field\"),","         fieldValues = field.getValue(),","         host = this.get(\"host\"),","         record,","         RecordType,","         updateMethod,","         row,","         addMethod;","","      if (!field.validate()) {","         return;","      }","","      // Modification","      if (fieldValues.id) {","","         // Call the updateMethod async method","         updateMethod = this.get('updateMethod');","","         record = host.get(\"data\").getById(fieldValues.id);","         row = host.getRow(record);","         row.addClass( host.getClassName('row-edited') );","","         updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {","            if (success) {","               // on success, update the record in the datatable","               host.get(\"data\").getById(fieldValues.id).setAttrs(fieldValues);","               this.get('panel').hide();","               row.removeClass( host.getClassName('row-edited') );","            }","         },this));","","      }","      // Creation","      else {","","         fieldValues.id = this.generateId(this.get(\"idSize\"));","         RecordType = host.get(\"recordType\");","         record = new RecordType();","         record.setAttrs(fieldValues);","         this.addModifyAttr(record);","         this.addDeleteAttr(record);","","         // call the async method to create a record","         addMethod = this.get('addMethod');","         addMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               // if success, add the record in the datatable","               host.get(\"data\").add(record);","               this.get('panel').hide();","            }","         },this));","","      }","","   },","","   /**","    *","    * @method destructor","    */","   destructor: function() {","","      var that = this,","          host = this.get('host'),","          data = host.get(\"data\");","","      data.each(function (model) {","","         if(!this.get(\"disableModifyFunc\")) {","            that.delModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")) {","            that.delDeleteAttr(model);","         }","","      });","      ","      this.deleteExtraColumns();","      ","      if(!this.get(\"disableAddFunc\")) {","         this.addButton.remove();","      }","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').removeClass( host.getClassName('inplaceedit') );","         this.cellClickHandler.detach();","","         if (this.docClickHandler) {","            this.docClickHandler.detach();","         }","      }","","      this.get(\"panel\").destroy();","   },","","","   /**","    * Add the modify attribute on the data model","    *","    * @method addModifyAttr","    */","   addModifyAttr: function(model) {","      model.addAttr(\"modify\");","   },","","   /**","    * Add the delete attribute on the data model","    *","    * @method addDeleteAttr","    */","   addDeleteAttr: function (model) {","      model.addAttr(\"delete\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delModifyAttr","    */","   delModifyAttr: function(model) {","      model.removeAttr(\"modify\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delDeleteAttr","    */","   delDeleteAttr: function (model) {","      model.removeAttr(\"delete\");","   },","","   /**","    * Add the modify column on the DataTable","    *","    * @method addModifyColumn","    */","   addModifyColumn: function() {","","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").modifyText,","         className: host.getClassName('cell-modify'),","         formatter: this.get('modifyColumnFormatter'),","         nodeFormatter: this.get('modifyColumnNodeFormatter')","      });","","   },","   ","   /**","    * Add the delete column on the DataTable","    *","    * @method addDeleteColumn","    */","   addDeleteColumn: function() {","      ","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").deleteText,","         className: host.getClassName('cell-delete'),","         formatter: this.get('deleteColumnFormatter'),","         nodeFormatter: this.get('deleteColumnNodeFormatter')","      });","   },","","   /**","    * Remove the modify column from the DataTable","    *","    * @method removeModifyColumn","    */","   removeModifyColumn: function() {","      this.get(\"host\").removeColumn(\"modify\");","   },","","   /**","    * Remove the delete column from the DataTable","    *","    * @method removeDeleteColumn","    */","   removeDeleteColumn: function() {","      this.get(\"host\").removeColumn(\"delete\");","   },","","","   generateId : function(size) {","      var prefixId = this.get(\"prefixId\"),","          s = size ? size : 5;","      prefixId = prefixId ? prefixId : \"\";","      return prefixId + Math.floor(Math.random()*Math.pow(10,s));","   },","   ","   _initStrings : function() {","      return Y.Intl.get(\"inputex-datatable\");","   }","","}, {","","/**"," * Static property used to define the default attribute configuration of"," * the Plugin."," *"," * @property ATTRS"," * @type {Object}"," * @static"," */","ATTRS: {","","   /**","    * This is an inputEx field definition. This is used when a user try to create/modify a record","    *","    * @attribute inputEx","    */","   inputEx: {},","","","   /**","    * This string is inserted before the generated id","    *","    * @attribute prefixId","    * @type String","    * @example prefixId : \"po-\" --> id = po-1342561","    */","   prefixId: {","     value: \"\"","   },","","   /**","    * This represents the number of digits used in the id generation","    *","    * @attribute idSize","    * @type Number","    */","   idSize: {","     value: 5","   },","","   /**","    * If true the add functionality is disabled","    *","    * @attribute disableAddFunc","    * @type boolean","    */","   disableAddFunc: {","     value: false","   },","","   /**","    * If true the modify functionality is disabled","    * @attribute disableModifyFunc","    * @type boolean","    */","   disableModifyFunc: {","     value: false","   },","","   /**","    * If true the delete functionality is disabled","    *","    * @attribute disableDeleteFunc","    * @type boolean","    */","   disableDeleteFunc: {","     value: false","   },","","   /**","    * Labels of the plugin","    *","    * @attribute modifyColumnLabel","    */","   strings : {","     value : null,","     valueFn : '_initStrings'","   },","","   /**","    * If true a confirmation will be asked to the user when a delete attempt appear","    *","    * @attribute confirmDelete","    * @type boolean","    */","   confirmDelete: {","     value: true","   },","","   /**","    * This panel will be displayed on record creation/modication","    * @attribute panel","    * @type Y.inputEx.Panel","    */","   panel: {","     valueFn: '_initPanel',","     lazyAdd: true","   },","","","   /**","    * Set to true if you want to activate in-cell editing (ALPHA)","    * @attribute inplaceedit","    * @atype boolean","    */","   inplaceedit: {","      value: false","   },","","   /**","    * Overlay used for the inplace editing","    * @attribute inplaceOverlay","    * @type Y.Overlay","    */","   inplaceOverlay: {","     valueFn: '_initInplaceOverlay',","     lazyAdd: true","   },","","   /**","    * Function used to confirm the creation of a new record.","    * You can perform validation and/or ajax creation.","    * addMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute addMethod","    * @type function","    */","   addMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the modification of an existing record.","    * You can perform validation and/or ajax update.","    * updateMethod must be a function(id, newValues, cb) which calls 'cb' with success status as first argument","    * @attribute updateMethod","    * @type function","    */","   updateMethod: {","      value: function(id, newValues, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the deletion of an existing record.","    * You can perform validation and/or ajax deletion.","    * deleteMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute deleteMethod","    * @type function","    */","   deleteMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Formatter for the modify column","    * @attribute modifyColumnFormatter","    * @type function","    */","   modifyColumnFormatter: {","      value: null","   },","","   /**","    * Formatter for the delete column","    * @attribute deleteColumnFormatter","    * @type function","    */","   deleteColumnFormatter: {","      value: null","   },","","   modifyColumnNodeFormatter: {","      value: null","   },","","   deleteColumnNodeFormatter: {","      value: null","   }","","}","","});","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-group\",","        \"inputex-panel\",","        \"datatable\",","        \"overlay\",","        \"intl\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].lines = {"1":0,"10":0,"12":0,"21":0,"22":0,"25":0,"27":0,"34":0,"37":0,"40":0,"43":0,"45":0,"47":0,"50":0,"52":0,"56":0,"57":0,"58":0,"65":0,"68":0,"74":0,"86":0,"95":0,"96":0,"99":0,"101":0,"105":0,"109":0,"110":0,"113":0,"114":0,"115":0,"116":0,"118":0,"129":0,"137":0,"138":0,"141":0,"142":0,"143":0,"144":0,"145":0,"146":0,"149":0,"150":0,"152":0,"153":0,"157":0,"159":0,"160":0,"161":0,"167":0,"178":0,"179":0,"183":0,"185":0,"186":0,"189":0,"191":0,"193":0,"194":0,"196":0,"197":0,"201":0,"205":0,"215":0,"218":0,"219":0,"220":0,"222":0,"223":0,"236":0,"237":0,"240":0,"241":0,"252":0,"254":0,"257":0,"259":0,"261":0,"267":0,"269":0,"271":0,"272":0,"273":0,"282":0,"284":0,"287":0,"288":0,"289":0,"297":0,"298":0,"302":0,"305":0,"307":0,"308":0,"310":0,"311":0,"313":0,"326":0,"327":0,"329":0,"330":0,"341":0,"361":0,"362":0,"366":0,"367":0,"371":0,"373":0,"382":0,"383":0,"387":0,"390":0,"392":0,"393":0,"394":0,"396":0,"397":0,"399":0,"400":0,"401":0,"409":0,"410":0,"411":0,"412":0,"413":0,"414":0,"417":0,"418":0,"419":0,"421":0,"422":0,"436":0,"440":0,"442":0,"443":0,"445":0,"446":0,"451":0,"453":0,"454":0,"457":0,"458":0,"459":0,"461":0,"462":0,"466":0,"476":0,"485":0,"494":0,"503":0,"513":0,"515":0,"532":0,"534":0,"549":0,"558":0,"563":0,"565":0,"566":0,"570":0,"702":0,"715":0,"728":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].functions = {"InputExDataTable:21":0,"initializer:32":0,"setupInplaceEditing:64":0,"findTd:74":0,"(anonymous 2):86":0,"onCellClick:72":0,"(anonymous 3):149":0,"_initInplaceOverlay:127":0,"(anonymous 4):193":0,"onOverlaySave:164":0,"onOverlayCancel:204":0,"(anonymous 5):218":0,"enrichData:213":0,"enrichColumns:234":0,"addAddButton:250":0,"_onAddButtonClick:266":0,"modifyRecord:280":0,"(anonymous 6):310":0,"deleteRecord:296":0,"deleteExtraColumns:324":0,"_initPanel:339":0,"onPanelCancelButton:365":0,"(anonymous 7):396":0,"(anonymous 8):418":0,"onPanelSaveButton:370":0,"(anonymous 9):440":0,"destructor:434":0,"addModifyAttr:475":0,"addDeleteAttr:484":0,"delModifyAttr:493":0,"delDeleteAttr:502":0,"addModifyColumn:511":0,"addDeleteColumn:530":0,"removeModifyColumn:548":0,"removeDeleteColumn:557":0,"generateId:562":0,"_initStrings:569":0,"value:701":0,"value:714":0,"value:727":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredLines = 165;
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredFunctions = 41;
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 1);
YUI.add('inputex-datatable', function (Y, NAME) {

/*global Y:true,confirm:true*/

/**
 * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin.
 * @module inputex-datatable
 */

_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 10);
var inputEx = Y.inputEx;

_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 12);
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
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 40);
this.enrichColumns();

      // add a button called "add" in order to add record in the DataTable
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 43);
this.addAddButton();
        
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 45);
if(!this.get("disableModifyFunc")) {
         // handle row modification
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 47);
host.delegate("click",this.modifyRecord, "td."+host.getClassName('cell-modify'), this);
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 50);
if(!this.get("disableDeleteFunc")) {
         // handle row removal
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 52);
host.delegate("click",this.deleteRecord, "td."+host.getClassName('cell-delete'), this);
      }
      

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 56);
if(this.get("inplaceedit")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 57);
host.get('contentBox').addClass( host.getClassName('inplaceedit') );
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 58);
this.setupInplaceEditing();
      }

    },


   setupInplaceEditing: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "setupInplaceEditing", 64);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 65);
var host = this.get('host');

      // Delegate click event to make the inplace editor appear
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 68);
this.cellClickHandler = host.delegate("click", this.onCellClick, "."+host.getClassName('cell'), this);

   },

   onCellClick: function(e) {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onCellClick", 72);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 74);
var findTd = function(n) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "findTd", 74);
return n.get('tagName') === 'TD' && n.hasClass('yui3-datatable-cell'); },
          td = findTd(e.target) ? e.target : e.target.ancestor(findTd), // this might be a DIV because of a formatter (see color)
          host = this.get('host'),
          colIndex = td.get('parentNode').get('children').indexOf(td),
          column = host.getColumn(colIndex),
          record = host.getRecord(td),
          key = column.key,
          value = record.get(key),

          overlay = this.get('inplaceOverlay'),

          // inputEx Field config
          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 2)", 86);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 86);
return i.name === key; }),
          conf = Y.mix({
            parentEl: this.overlayFieldContainer.getDOMNode()
          }, fieldConf),
          field;

      // When we changed the value of an overlay but click on another cell, it doesn't save automatically
      // since the event is stopped. So we do it manually here.
      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 95);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 96);
this.onOverlaySave();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 99);
e.stopPropagation();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 101);
if( !fieldConf ||
          fieldConf.type === "uneditable" ||
          td.hasClass('yui3-datatable-cell-delete') ||
          td.hasClass('yui3-datatable-cell-modify') ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 105);
return;
      }

      // Align
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 109);
overlay.align(td, ["tl", "tl"]);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 110);
overlay.show();

      // Render field
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 113);
this.overlayFieldContainer.set('innerHTML', '');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 114);
field = new Y.inputEx(conf);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 115);
field.setValue(value);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 116);
field.focus();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 118);
this._inplaceeditCell = {
         record: record,
         key: column.key,
         field: field,
         td: td
      };
   },


   _initInplaceOverlay: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initInplaceOverlay", 127);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 129);
var o = new Y.Overlay({
            zIndex: 5
          }),
          contentBox = o.get('contentBox'),
          overlayFieldContainer = Y.Node.create("<div />"),
          saveButton,
          cancelButton;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 137);
contentBox.appendChild(overlayFieldContainer);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 138);
this.overlayFieldContainer = overlayFieldContainer;

      // Overlay save and cancel buttons
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 141);
saveButton = Y.Node.create('<button>Sauver</button>');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 142);
contentBox.appendChild(saveButton);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 143);
cancelButton = Y.Node.create('<button>Annuler</button>');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 144);
contentBox.appendChild(cancelButton);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 145);
saveButton.on('click', this.onOverlaySave, this);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 146);
cancelButton.on('click', this.onOverlayCancel, this);

      // Close overlay if click outside of the overlay
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 149);
this.docClickHandler = Y.on('click', Y.bind(function(e) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 3)", 149);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 150);
var overlay = this.get('inplaceOverlay');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 152);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 153);
this.onOverlaySave();
         }
      }, this), Y.config.doc);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 157);
contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 159);
o.hide();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 160);
o.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 161);
return o;
   },

   onOverlaySave: function() {

      // Call the updateMethod async method
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlaySave", 164);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 167);
var updateMethod = this.get('updateMethod'),
          field = this._inplaceeditCell.field,
          newValue = field.getValue(),
          record = this._inplaceeditCell.record,
          key = this._inplaceeditCell.key,
          oldValue = record.get(key),
          fieldValues = {},
          id = record.get('id'),
          host = this.get('host'),
          td = this._inplaceeditCell.td;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 178);
if(!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 179);
return;
      }

      // has not changed => don't do anything
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 183);
if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||
            (newValue === oldValue) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 185);
this.get('inplaceOverlay').hide();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 186);
return;
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 189);
fieldValues[key] = newValue;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 191);
td.addClass( host.getClassName('cell-edited') );

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 193);
updateMethod.call(this, id, fieldValues, Y.bind(function(success) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 4)", 193);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 194);
if (success) {
            // on success, update the record in the datatable
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 196);
host.get("data").getById(id).setAttrs(fieldValues);
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 197);
td.removeClass( host.getClassName('cell-edited') );
         }
      },this));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 201);
this.get('inplaceOverlay').hide();
   },

   onOverlayCancel: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlayCancel", 204);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 205);
this.get('inplaceOverlay').hide();
   },

   /**
    * add Attributes on the data model depending on the plugin configuration
    *
    * @method enrichData
    */
   enrichData: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichData", 213);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 215);
var that = this,
          data = this.get("host").get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 218);
data.each(function (model) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 5)", 218);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 219);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 220);
that.addModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 222);
if(!this.get("disableDeleteFunc")){
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 223);
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

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichColumns", 234);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 236);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 237);
this.addModifyColumn();
      }
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 240);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 241);
this.addDeleteColumn();
      }
   },

   /**
    * Provide the add button in order to add record on the DataTable
    *
    * @method addAddButton
    */
   addAddButton: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addAddButton", 250);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 252);
if(!this.get("disableAddFunc")) {
      
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 254);
var buttonHtml = "<button>"+this.get("strings").addButtonText+"</button>",
             button = Y.Node.create(buttonHtml);

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 257);
this.addButton = button;

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 259);
this.get("host").get("contentBox").append(button);
         
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 261);
button.on("click", this._onAddButtonClick, this);
      }
   
   },

   _onAddButtonClick: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_onAddButtonClick", 266);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 267);
var panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 269);
e.stopPropagation();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 271);
panel.set("headerContent",this.get("strings").addItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 272);
panel.get("field").clear();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 273);
panel.show();
   },

   /**
    *
    * @method modifyRecord
    */
   modifyRecord: function(e) {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "modifyRecord", 280);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 282);
e.stopPropagation();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 284);
var record = this.get("host").getRecord(e.currentTarget),
          panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 287);
panel.set("headerContent",this.get("strings").modifyItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 288);
panel.get('field').setValue(record.getAttrs());
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 289);
panel.show();
   },

   /**
    * Called when the user clicked on a link to delete a record
    * @method deleteRecord
    */
   deleteRecord: function(e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteRecord", 296);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 297);
e.stopPropagation();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 298);
var deleteMethod,
          host = this.get('host'),
          record = host.getRecord(e.currentTarget),
          row;
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 302);
if (!this.get("confirmDelete") || confirm(this.get("strings").confirmDeletion)) {

         // Call the deleteMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 305);
deleteMethod = this.get('deleteMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 307);
row = host.getRow(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 308);
row.addClass( host.getClassName('row-edited') );

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 310);
deleteMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 6)", 310);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 311);
if (success) {
               // on success, remove the record from the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 313);
host.get("data").remove(record);
            }
         },this));

      }
   },

   /**
    *
    * @method deleteExtraColumns
    */
   deleteExtraColumns: function() {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteExtraColumns", 324);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 326);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 327);
this.removeModifyColumn();
      }
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 329);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 330);
this.removeDeleteColumn();
      }
   },

   /**
    *
    * @method _initPanel
    * @private
    */
   _initPanel: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initPanel", 339);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 341);
var panel = new Y.inputEx.Panel({
         centered: true,
         width: 500,
         modal: true,
         zIndex: 5,
         visible: false,
         inputEx: this.get("inputEx"),
         buttons: [
            {
               value: this.get("strings").cancelText,
               action: Y.bind(this.onPanelCancelButton, this)
            },
            {
               value: this.get("strings").saveText,
               action: Y.bind(this.onPanelSaveButton, this)
            }
         ]
      });

      // first the panel needs to be "render" then "show"
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 361);
panel.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 362);
return panel;
   },

   onPanelCancelButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelCancelButton", 365);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 366);
e.preventDefault();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 367);
this.get('panel').hide();
   },

   onPanelSaveButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelSaveButton", 370);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 371);
e.preventDefault();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 373);
var field = this.get("panel").get("field"),
         fieldValues = field.getValue(),
         host = this.get("host"),
         record,
         RecordType,
         updateMethod,
         row,
         addMethod;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 382);
if (!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 383);
return;
      }

      // Modification
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 387);
if (fieldValues.id) {

         // Call the updateMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 390);
updateMethod = this.get('updateMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 392);
record = host.get("data").getById(fieldValues.id);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 393);
row = host.getRow(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 394);
row.addClass( host.getClassName('row-edited') );

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 396);
updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 7)", 396);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 397);
if (success) {
               // on success, update the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 399);
host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 400);
this.get('panel').hide();
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 401);
row.removeClass( host.getClassName('row-edited') );
            }
         },this));

      }
      // Creation
      else {

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 409);
fieldValues.id = this.generateId(this.get("idSize"));
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 410);
RecordType = host.get("recordType");
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 411);
record = new RecordType();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 412);
record.setAttrs(fieldValues);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 413);
this.addModifyAttr(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 414);
this.addDeleteAttr(record);

         // call the async method to create a record
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 417);
addMethod = this.get('addMethod');
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 418);
addMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 8)", 418);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 419);
if (success) {
               // if success, add the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 421);
host.get("data").add(record);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 422);
this.get('panel').hide();
            }
         },this));

      }

   },

   /**
    *
    * @method destructor
    */
   destructor: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "destructor", 434);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 436);
var that = this,
          host = this.get('host'),
          data = host.get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 440);
data.each(function (model) {

         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 9)", 440);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 442);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 443);
that.delModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 445);
if(!this.get("disableDeleteFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 446);
that.delDeleteAttr(model);
         }

      });
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 451);
this.deleteExtraColumns();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 453);
if(!this.get("disableAddFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 454);
this.addButton.remove();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 457);
if(this.get("inplaceedit")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 458);
host.get('contentBox').removeClass( host.getClassName('inplaceedit') );
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 459);
this.cellClickHandler.detach();

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 461);
if (this.docClickHandler) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 462);
this.docClickHandler.detach();
         }
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 466);
this.get("panel").destroy();
   },


   /**
    * Add the modify attribute on the data model
    *
    * @method addModifyAttr
    */
   addModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyAttr", 475);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 476);
model.addAttr("modify");
   },

   /**
    * Add the delete attribute on the data model
    *
    * @method addDeleteAttr
    */
   addDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteAttr", 484);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 485);
model.addAttr("delete");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delModifyAttr
    */
   delModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delModifyAttr", 493);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 494);
model.removeAttr("modify");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delDeleteAttr
    */
   delDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delDeleteAttr", 502);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 503);
model.removeAttr("delete");
   },

   /**
    * Add the modify column on the DataTable
    *
    * @method addModifyColumn
    */
   addModifyColumn: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyColumn", 511);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 513);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 515);
host.addColumn({
         label: ' ',
         key: this.get("strings").modifyText,
         className: host.getClassName('cell-modify'),
         formatter: this.get('modifyColumnFormatter'),
         nodeFormatter: this.get('modifyColumnNodeFormatter')
      });

   },
   
   /**
    * Add the delete column on the DataTable
    *
    * @method addDeleteColumn
    */
   addDeleteColumn: function() {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteColumn", 530);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 532);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 534);
host.addColumn({
         label: ' ',
         key: this.get("strings").deleteText,
         className: host.getClassName('cell-delete'),
         formatter: this.get('deleteColumnFormatter'),
         nodeFormatter: this.get('deleteColumnNodeFormatter')
      });
   },

   /**
    * Remove the modify column from the DataTable
    *
    * @method removeModifyColumn
    */
   removeModifyColumn: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeModifyColumn", 548);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 549);
this.get("host").removeColumn("modify");
   },

   /**
    * Remove the delete column from the DataTable
    *
    * @method removeDeleteColumn
    */
   removeDeleteColumn: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeDeleteColumn", 557);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 558);
this.get("host").removeColumn("delete");
   },


   generateId : function(size) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "generateId", 562);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 563);
var prefixId = this.get("prefixId"),
          s = size ? size : 5;
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 565);
prefixId = prefixId ? prefixId : "";
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 566);
return prefixId + Math.floor(Math.random()*Math.pow(10,s));
   },
   
   _initStrings : function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initStrings", 569);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 570);
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
   },


   /**
    * Set to true if you want to activate in-cell editing (ALPHA)
    * @attribute inplaceedit
    * @atype boolean
    */
   inplaceedit: {
      value: false
   },

   /**
    * Overlay used for the inplace editing
    * @attribute inplaceOverlay
    * @type Y.Overlay
    */
   inplaceOverlay: {
     valueFn: '_initInplaceOverlay',
     lazyAdd: true
   },

   /**
    * Function used to confirm the creation of a new record.
    * You can perform validation and/or ajax creation.
    * addMethod must be a function(record, cb) which calls 'cb' with success status as first argument
    * @attribute addMethod
    * @type function
    */
   addMethod: {
      value: function(record, cb) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 701);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 702);
cb(true);
      }
   },

   /**
    * Function used to confirm the modification of an existing record.
    * You can perform validation and/or ajax update.
    * updateMethod must be a function(id, newValues, cb) which calls 'cb' with success status as first argument
    * @attribute updateMethod
    * @type function
    */
   updateMethod: {
      value: function(id, newValues, cb) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 714);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 715);
cb(true);
      }
   },

   /**
    * Function used to confirm the deletion of an existing record.
    * You can perform validation and/or ajax deletion.
    * deleteMethod must be a function(record, cb) which calls 'cb' with success status as first argument
    * @attribute deleteMethod
    * @type function
    */
   deleteMethod: {
      value: function(record, cb) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 727);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 728);
cb(true);
      }
   },

   /**
    * Formatter for the modify column
    * @attribute modifyColumnFormatter
    * @type function
    */
   modifyColumnFormatter: {
      value: null
   },

   /**
    * Formatter for the delete column
    * @attribute deleteColumnFormatter
    * @type function
    */
   deleteColumnFormatter: {
      value: null
   },

   modifyColumnNodeFormatter: {
      value: null
   },

   deleteColumnNodeFormatter: {
      value: null
   }

}

});


}, '@VERSION@', {
    "requires": [
        "inputex-group",
        "inputex-panel",
        "datatable",
        "overlay",
        "intl"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl"
    ]
});
