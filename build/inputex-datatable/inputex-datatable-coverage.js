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
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].code=["YUI.add('inputex-datatable', function (Y, NAME) {","","/*global Y:true,confirm:true*/","","/**"," * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin."," * @module inputex-datatable"," */","","var inputEx = Y.inputEx;","","Y.namespace('inputEx.Plugin');","","/**","* Provide add/modify/delete functionalities on a dataTable as a plugin","* @class inputEx.Plugin.InputExDataTable","* @extends Plugin.Base","* @constructor","* @param {Object} configuration object","*/","inputEx.Plugin.InputExDataTable = function (config) {","   inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);","};","","inputEx.Plugin.InputExDataTable.NS = \"InputExDataTable\";","","Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {","   ","   /**","    * @method initializer","    */","   initializer: function () {","","      var host = this.get(\"host\");","","      // enrich data (Model instance) with modify and delete attributs","      this.enrichData();","      ","      // enrich DataTable with modify and delete columns","      this.enrichColumns();","","      // add a button called \"add\" in order to add record in the DataTable","      this.addAddButton();","        ","      if(!this.get(\"disableModifyFunc\")) {","         // handle row modification","         host.delegate(\"click\",this.modifyRecord, \"td.\"+host.getClassName('cell-modify'), this);","      }","","      if(!this.get(\"disableDeleteFunc\")) {","         // handle row removal","         host.delegate(\"click\",this.deleteRecord, \"td.\"+host.getClassName('cell-delete'), this);","      }","      ","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').addClass( host.getClassName('inplaceedit') );","         this.setupInplaceEditing();","      }","","    },","","","   setupInplaceEditing: function() {","      var host = this.get('host');","","      // Delegate click event to make the inplace editor appear","      this.cellClickHandler = host.delegate(\"click\", this.onCellClick, \".\"+host.getClassName('cell'), this);","","      this.after('editorShow', this._onEditorShow, this);","","   },","","   _onEditorShow: function() {","      this.get('inplaceOverlay').show();","   },","","   onCellClick: function(e) {","","      var findTd = function(n) { return n.get('tagName') === 'TD' && n.hasClass('yui3-datatable-cell'); },","          td = findTd(e.target) ? e.target : e.target.ancestor(findTd), // this might be a DIV because of a formatter (see color)","          host = this.get('host'),","          colIndex = td.get('parentNode').get('children').indexOf(td),","          column = host.getColumn(colIndex),","          record = host.getRecord(td),","          key = column.key,","          value = record.get(key),","","          overlay = this.get('inplaceOverlay'),","","          // inputEx Field config","          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { return i.name === key; }),","          conf = Y.mix({","            parentEl: this.overlayFieldContainer.getDOMNode()","          }, fieldConf),","          field;","","      // When we changed the value of an overlay but click on another cell, it doesn't save automatically","      // since the event is stopped. So we do it manually here.","      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision","      if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","         this.onOverlaySave();","      }","","      e.stopPropagation();","","      if( !fieldConf ||","          fieldConf.type === \"uneditable\" ||","          td.hasClass('yui3-datatable-cell-delete') ||","          td.hasClass('yui3-datatable-cell-modify') ) {","         return;","      }","","","      // Align","      overlay.align(td, [\"tl\", \"tl\"]);","","      // Render field","      this.overlayFieldContainer.set('innerHTML', '');","      field = new Y.inputEx(conf);","      field.setValue(value);","      field.focus();","","      this._inplaceeditCell = {","         record: record,","         key: column.key,","         field: field,","         td: td","      };","","      // TODO: fire an event editorShow","      this.fire('editorShow', {","         column: column,","         record: record,","         key: key,","         value: value,","         cell: td,","         field: field","      });","","   },","","","   _initInplaceOverlay: function() {","","      var o = new Y.Overlay({","            zIndex: 5","          }),","          contentBox = o.get('contentBox'),","          overlayFieldContainer = Y.Node.create(\"<div />\"),","          overlayButtonsContainer = Y.Node.create(\"<div class='editor-buttons' />\"),","          saveButton,","          cancelButton;","","      contentBox.appendChild(overlayFieldContainer);","      this.overlayFieldContainer = overlayFieldContainer;","","      contentBox.appendChild(overlayButtonsContainer);","","      // Overlay save and cancel buttons","      saveButton = Y.Node.create('<button>Sauver</button>');","      overlayButtonsContainer.appendChild(saveButton);","","      saveButton.addClass('yui3-button');","      saveButton.addClass('yui3-button-primary');","","      cancelButton = Y.Node.create('<button>Annuler</button>');","","      cancelButton.addClass('yui3-button');","      cancelButton.addClass('yui3-button-link');","","","      overlayButtonsContainer.appendChild(cancelButton);","      saveButton.on('click', this.onOverlaySave, this);","      cancelButton.on('click', this.onOverlayCancel, this);","","      // Close overlay if click outside of the overlay","      this.docClickHandler = Y.on('click', Y.bind(function(e) {","         var overlay = this.get('inplaceOverlay');","","         if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","            this.onOverlaySave();","         }","      }, this), Y.config.doc);","","      contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));","","      o.hide();","      o.render();","      return o;","   },","","   onOverlaySave: function() {","","      // Call the updateMethod async method","      var updateMethod = this.get('updateMethod'),","          field = this._inplaceeditCell.field,","          newValue = field.getValue(),","          record = this._inplaceeditCell.record,","          key = this._inplaceeditCell.key,","          oldValue = record.get(key),","          fieldValues = {},","          id = record.get('id'),","          host = this.get('host'),","          td = this._inplaceeditCell.td;","","      if(!field.validate()) {","         return;","      }","","      // has not changed => don't do anything","      if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||","            (newValue === oldValue) ) {","         this.get('inplaceOverlay').hide();","         return;","      }","","      fieldValues[key] = newValue;","","      td.addClass( host.getClassName('cell-edited') );","","      updateMethod.call(this, id, fieldValues, Y.bind(function(success) {","         if (success) {","            // on success, update the record in the datatable","            host.get(\"data\").getById(id).setAttrs(fieldValues);","            td.removeClass( host.getClassName('cell-edited') );","         }","      },this));","","      this.get('inplaceOverlay').hide();","   },","","   onOverlayCancel: function() {","      this.get('inplaceOverlay').hide();","   },","","   /**","    * add Attributes on the data model depending on the plugin configuration","    *","    * @method enrichData","    */","   enrichData: function () {","","      var that = this,","          data = this.get(\"host\").get(\"data\");","","      data.each(function (model) {","         if(!this.get(\"disableModifyFunc\")) {","            that.addModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")){","            that.addDeleteAttr(model);","         }","      });","","   },","","   /**","    * add Columns on the DataTable depending on the plugin configuration","    *","    * @method enrichColumns","    */","   enrichColumns: function () {","","      if(!this.get(\"disableModifyFunc\")) {","         this.addModifyColumn();","      }","      ","      if(!this.get(\"disableDeleteFunc\")) {","         this.addDeleteColumn();","      }","   },","","   /**","    * Provide the add button in order to add record on the DataTable","    *","    * @method addAddButton","    */","   addAddButton: function() {","","      if(!this.get(\"disableAddFunc\")) {","      ","         var buttonHtml = \"<button class='yui3-button'>\"+this.get(\"strings\").addButtonText+\"</button>\",","             button = Y.Node.create(buttonHtml);","","         this.addButton = button;","","         this.get(\"host\").get(\"contentBox\").append(button);","         ","         button.on(\"click\", this._onAddButtonClick, this);","      }","   ","   },","","   _onAddButtonClick: function (e) {","      var panel = this.get(\"panel\");","","      e.stopPropagation();","","      panel.set(\"headerContent\",this.get(\"strings\").addItemHeader);","      panel.get(\"field\").clear();","      panel.show();","   },","","   /**","    *","    * @method modifyRecord","    */","   modifyRecord: function(e) {","      ","      e.stopPropagation();","      ","      var record = this.get(\"host\").getRecord(e.currentTarget),","          panel = this.get(\"panel\");","","      panel.set(\"headerContent\",this.get(\"strings\").modifyItemHeader);","      panel.get('field').setValue(record.getAttrs());","      panel.show();","   },","","   /**","    * Called when the user clicked on a link to delete a record","    * @method deleteRecord","    */","   deleteRecord: function(e) {","      e.stopPropagation();","      var deleteMethod,","          host = this.get('host'),","          record = host.getRecord(e.currentTarget),","          row;","      if (!this.get(\"confirmDelete\") || confirm(this.get(\"strings\").confirmDeletion)) {","","         // Call the deleteMethod async method","         deleteMethod = this.get('deleteMethod');","","         row = host.getRow(record);","         row.addClass( host.getClassName('row-edited') );","","         deleteMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               // on success, remove the record from the datatable","               host.get(\"data\").remove(record);","            }","         },this));","","      }","   },","","   /**","    *","    * @method deleteExtraColumns","    */","   deleteExtraColumns: function() {","      ","      if(!this.get(\"disableModifyFunc\")) {","         this.removeModifyColumn();","      }","      if(!this.get(\"disableDeleteFunc\")) {","         this.removeDeleteColumn();","      }","   },","","   /**","    *","    * @method _initPanel","    * @private","    */","   _initPanel: function () {","","      var opts = Y.mix({}, this.get('panelOptions') );","","      var panel = new Y.inputEx.Panel( Y.mix(opts, {","         inputEx: this.get(\"inputEx\"),","         buttons: {","            header: ['close'],","","            footer: [","               {","                  value: this.get(\"strings\").saveText,","                  action: Y.bind(this.onPanelSaveButton, this),","                  classNames: 'yui3-button-primary'","               },","               {","                  value: this.get(\"strings\").cancelText,","                  action: Y.bind(this.onPanelCancelButton, this),","                  classNames: 'yui3-button-link'","               }","            ]","         }","      }) );","","      // first the panel needs to be \"render\" then \"show\"","      panel.render();","      return panel;","   },","","   onPanelCancelButton: function (e) {","      e.preventDefault();","      this.get('panel').hide();","   },","","   onPanelSaveButton: function (e) {","      e.preventDefault();","","      var field = this.get(\"panel\").get(\"field\"),","         fieldValues = field.getValue(),","         host = this.get(\"host\"),","         record,","         RecordType,","         updateMethod,","         row,","         addMethod;","","      if (!field.validate()) {","         return;","      }","","      // Modification","      if (fieldValues.id) {","","         // Call the updateMethod async method","         updateMethod = this.get('updateMethod');","","         record = host.get(\"data\").getById(fieldValues.id);","         row = host.getRow(record);","         row.addClass( host.getClassName('row-edited') );","","         updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {","            if (success) {","               // on success, update the record in the datatable","               host.get(\"data\").getById(fieldValues.id).setAttrs(fieldValues);","               this.get('panel').hide();","               row.removeClass( host.getClassName('row-edited') );","            }","         },this));","","      }","      // Creation","      else {","","         fieldValues.id = this.generateId(this.get(\"idSize\"));","         RecordType = host.get(\"recordType\");","         record = new RecordType();","         record.setAttrs(fieldValues);","         this.addModifyAttr(record);","         this.addDeleteAttr(record);","","         // call the async method to create a record","         addMethod = this.get('addMethod');","         addMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               // if success, add the record in the datatable","               host.get(\"data\").add(record);","               this.get('panel').hide();","            }","         },this));","","      }","","   },","","   /**","    *","    * @method destructor","    */","   destructor: function() {","","      var that = this,","          host = this.get('host'),","          data = host.get(\"data\");","","      data.each(function (model) {","","         if(!this.get(\"disableModifyFunc\")) {","            that.delModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")) {","            that.delDeleteAttr(model);","         }","","      });","      ","      this.deleteExtraColumns();","      ","      if(!this.get(\"disableAddFunc\")) {","         this.addButton.remove();","      }","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').removeClass( host.getClassName('inplaceedit') );","         this.cellClickHandler.detach();","","         if (this.docClickHandler) {","            this.docClickHandler.detach();","         }","      }","","      this.get(\"panel\").destroy();","   },","","","   /**","    * Add the modify attribute on the data model","    *","    * @method addModifyAttr","    */","   addModifyAttr: function(model) {","      model.addAttr(\"modify\");","   },","","   /**","    * Add the delete attribute on the data model","    *","    * @method addDeleteAttr","    */","   addDeleteAttr: function (model) {","      model.addAttr(\"delete\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delModifyAttr","    */","   delModifyAttr: function(model) {","      model.removeAttr(\"modify\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delDeleteAttr","    */","   delDeleteAttr: function (model) {","      model.removeAttr(\"delete\");","   },","","   /**","    * Add the modify column on the DataTable","    *","    * @method addModifyColumn","    */","   addModifyColumn: function() {","","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").modifyText,","         className: host.getClassName('cell-modify'),","         formatter: this.get('modifyColumnFormatter'),","         nodeFormatter: this.get('modifyColumnNodeFormatter')","      });","","   },","   ","   /**","    * Add the delete column on the DataTable","    *","    * @method addDeleteColumn","    */","   addDeleteColumn: function() {","      ","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").deleteText,","         className: host.getClassName('cell-delete'),","         formatter: this.get('deleteColumnFormatter'),","         nodeFormatter: this.get('deleteColumnNodeFormatter')","      });","   },","","   /**","    * Remove the modify column from the DataTable","    *","    * @method removeModifyColumn","    */","   removeModifyColumn: function() {","      this.get(\"host\").removeColumn(\"modify\");","   },","","   /**","    * Remove the delete column from the DataTable","    *","    * @method removeDeleteColumn","    */","   removeDeleteColumn: function() {","      this.get(\"host\").removeColumn(\"delete\");","   },","","","   generateId : function(size) {","      var prefixId = this.get(\"prefixId\"),","          s = size ? size : 5;","      prefixId = prefixId ? prefixId : \"\";","      return prefixId + Math.floor(Math.random()*Math.pow(10,s));","   },","   ","   _initStrings : function() {","      return Y.Intl.get(\"inputex-datatable\");","   }","","}, {","","/**"," * Static property used to define the default attribute configuration of"," * the Plugin."," *"," * @property ATTRS"," * @type {Object}"," * @static"," */","ATTRS: {","","   /**","    * This is an inputEx field definition. This is used when a user try to create/modify a record","    *","    * @attribute inputEx","    */","   inputEx: {},","","","   /**","    * This string is inserted before the generated id","    *","    * @attribute prefixId","    * @type String","    * @example prefixId : \"po-\" --> id = po-1342561","    */","   prefixId: {","     value: \"\"","   },","","   /**","    * This represents the number of digits used in the id generation","    *","    * @attribute idSize","    * @type Number","    */","   idSize: {","     value: 5","   },","","   /**","    * If true the add functionality is disabled","    *","    * @attribute disableAddFunc","    * @type boolean","    */","   disableAddFunc: {","     value: false","   },","","   /**","    * If true the modify functionality is disabled","    * @attribute disableModifyFunc","    * @type boolean","    */","   disableModifyFunc: {","     value: false","   },","","   /**","    * If true the delete functionality is disabled","    *","    * @attribute disableDeleteFunc","    * @type boolean","    */","   disableDeleteFunc: {","     value: false","   },","","   /**","    * Labels of the plugin","    *","    * @attribute modifyColumnLabel","    */","   strings : {","     value : null,","     valueFn : '_initStrings'","   },","","   /**","    * If true a confirmation will be asked to the user when a delete attempt appear","    *","    * @attribute confirmDelete","    * @type boolean","    */","   confirmDelete: {","     value: true","   },","","   /**","    * This panel will be displayed on record creation/modication","    * @attribute panel","    * @type Y.inputEx.Panel","    */","   panel: {","     valueFn: '_initPanel',","     lazyAdd: true","   },","","   panelOptions: {","      value: {","         centered: true,","         width: 500,","         modal: true,","         zIndex: 5,","         visible: false","      }","   },","","   /**","    * Set to true if you want to activate in-cell editing (ALPHA)","    * @attribute inplaceedit","    * @atype boolean","    */","   inplaceedit: {","      value: false","   },","","   /**","    * Overlay used for the inplace editing","    * @attribute inplaceOverlay","    * @type Y.Overlay","    */","   inplaceOverlay: {","     valueFn: '_initInplaceOverlay',","     lazyAdd: true","   },","","   /**","    * Function used to confirm the creation of a new record.","    * You can perform validation and/or ajax creation.","    * addMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute addMethod","    * @type function","    */","   addMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the modification of an existing record.","    * You can perform validation and/or ajax update.","    * updateMethod must be a function(id, newValues, cb) which calls 'cb' with success status as first argument","    * @attribute updateMethod","    * @type function","    */","   updateMethod: {","      value: function(id, newValues, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the deletion of an existing record.","    * You can perform validation and/or ajax deletion.","    * deleteMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute deleteMethod","    * @type function","    */","   deleteMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Formatter for the modify column","    * @attribute modifyColumnFormatter","    * @type function","    */","   modifyColumnFormatter: {","      value: null","   },","","   /**","    * Formatter for the delete column","    * @attribute deleteColumnFormatter","    * @type function","    */","   deleteColumnFormatter: {","      value: null","   },","","   /**","    * nodeFormatter for the modify column","    * @attribute modifyColumnNodeFormatter","    * @type function","    */","   modifyColumnNodeFormatter: {","      value: null","   },","","   /**","    * nodeFormatter for the delete column","    * @attribute deleteColumnNodeFormatter","    * @type function","    */","   deleteColumnNodeFormatter: {","      value: null","   }","","}","","});","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-group\",","        \"inputex-panel\",","        \"datatable\",","        \"overlay\",","        \"intl\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].lines = {"1":0,"10":0,"12":0,"21":0,"22":0,"25":0,"27":0,"34":0,"37":0,"40":0,"43":0,"45":0,"47":0,"50":0,"52":0,"56":0,"57":0,"58":0,"65":0,"68":0,"70":0,"75":0,"80":0,"92":0,"101":0,"102":0,"105":0,"107":0,"111":0,"116":0,"119":0,"120":0,"121":0,"122":0,"124":0,"132":0,"146":0,"155":0,"156":0,"158":0,"161":0,"162":0,"164":0,"165":0,"167":0,"169":0,"170":0,"173":0,"174":0,"175":0,"178":0,"179":0,"181":0,"182":0,"186":0,"188":0,"189":0,"190":0,"196":0,"207":0,"208":0,"212":0,"214":0,"215":0,"218":0,"220":0,"222":0,"223":0,"225":0,"226":0,"230":0,"234":0,"244":0,"247":0,"248":0,"249":0,"251":0,"252":0,"265":0,"266":0,"269":0,"270":0,"281":0,"283":0,"286":0,"288":0,"290":0,"296":0,"298":0,"300":0,"301":0,"302":0,"311":0,"313":0,"316":0,"317":0,"318":0,"326":0,"327":0,"331":0,"334":0,"336":0,"337":0,"339":0,"340":0,"342":0,"355":0,"356":0,"358":0,"359":0,"370":0,"372":0,"393":0,"394":0,"398":0,"399":0,"403":0,"405":0,"414":0,"415":0,"419":0,"422":0,"424":0,"425":0,"426":0,"428":0,"429":0,"431":0,"432":0,"433":0,"441":0,"442":0,"443":0,"444":0,"445":0,"446":0,"449":0,"450":0,"451":0,"453":0,"454":0,"468":0,"472":0,"474":0,"475":0,"477":0,"478":0,"483":0,"485":0,"486":0,"489":0,"490":0,"491":0,"493":0,"494":0,"498":0,"508":0,"517":0,"526":0,"535":0,"545":0,"547":0,"564":0,"566":0,"581":0,"590":0,"595":0,"597":0,"598":0,"602":0,"743":0,"756":0,"769":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].functions = {"InputExDataTable:21":0,"initializer:32":0,"setupInplaceEditing:64":0,"_onEditorShow:74":0,"findTd:80":0,"(anonymous 2):92":0,"onCellClick:78":0,"(anonymous 3):178":0,"_initInplaceOverlay:144":0,"(anonymous 4):222":0,"onOverlaySave:193":0,"onOverlayCancel:233":0,"(anonymous 5):247":0,"enrichData:242":0,"enrichColumns:263":0,"addAddButton:279":0,"_onAddButtonClick:295":0,"modifyRecord:309":0,"(anonymous 6):339":0,"deleteRecord:325":0,"deleteExtraColumns:353":0,"_initPanel:368":0,"onPanelCancelButton:397":0,"(anonymous 7):428":0,"(anonymous 8):450":0,"onPanelSaveButton:402":0,"(anonymous 9):472":0,"destructor:466":0,"addModifyAttr:507":0,"addDeleteAttr:516":0,"delModifyAttr:525":0,"delDeleteAttr:534":0,"addModifyColumn:543":0,"addDeleteColumn:562":0,"removeModifyColumn:580":0,"removeDeleteColumn:589":0,"generateId:594":0,"_initStrings:601":0,"value:742":0,"value:755":0,"value:768":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredLines = 173;
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredFunctions = 42;
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

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 70);
this.after('editorShow', this._onEditorShow, this);

   },

   _onEditorShow: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_onEditorShow", 74);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 75);
this.get('inplaceOverlay').show();
   },

   onCellClick: function(e) {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onCellClick", 78);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 80);
var findTd = function(n) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "findTd", 80);
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
          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 2)", 92);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 92);
return i.name === key; }),
          conf = Y.mix({
            parentEl: this.overlayFieldContainer.getDOMNode()
          }, fieldConf),
          field;

      // When we changed the value of an overlay but click on another cell, it doesn't save automatically
      // since the event is stopped. So we do it manually here.
      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 101);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 102);
this.onOverlaySave();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 105);
e.stopPropagation();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 107);
if( !fieldConf ||
          fieldConf.type === "uneditable" ||
          td.hasClass('yui3-datatable-cell-delete') ||
          td.hasClass('yui3-datatable-cell-modify') ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 111);
return;
      }


      // Align
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 116);
overlay.align(td, ["tl", "tl"]);

      // Render field
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 119);
this.overlayFieldContainer.set('innerHTML', '');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 120);
field = new Y.inputEx(conf);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 121);
field.setValue(value);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 122);
field.focus();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 124);
this._inplaceeditCell = {
         record: record,
         key: column.key,
         field: field,
         td: td
      };

      // TODO: fire an event editorShow
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 132);
this.fire('editorShow', {
         column: column,
         record: record,
         key: key,
         value: value,
         cell: td,
         field: field
      });

   },


   _initInplaceOverlay: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initInplaceOverlay", 144);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 146);
var o = new Y.Overlay({
            zIndex: 5
          }),
          contentBox = o.get('contentBox'),
          overlayFieldContainer = Y.Node.create("<div />"),
          overlayButtonsContainer = Y.Node.create("<div class='editor-buttons' />"),
          saveButton,
          cancelButton;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 155);
contentBox.appendChild(overlayFieldContainer);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 156);
this.overlayFieldContainer = overlayFieldContainer;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 158);
contentBox.appendChild(overlayButtonsContainer);

      // Overlay save and cancel buttons
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 161);
saveButton = Y.Node.create('<button>Sauver</button>');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 162);
overlayButtonsContainer.appendChild(saveButton);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 164);
saveButton.addClass('yui3-button');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 165);
saveButton.addClass('yui3-button-primary');

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 167);
cancelButton = Y.Node.create('<button>Annuler</button>');

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 169);
cancelButton.addClass('yui3-button');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 170);
cancelButton.addClass('yui3-button-link');


      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 173);
overlayButtonsContainer.appendChild(cancelButton);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 174);
saveButton.on('click', this.onOverlaySave, this);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 175);
cancelButton.on('click', this.onOverlayCancel, this);

      // Close overlay if click outside of the overlay
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 178);
this.docClickHandler = Y.on('click', Y.bind(function(e) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 3)", 178);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 179);
var overlay = this.get('inplaceOverlay');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 181);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 182);
this.onOverlaySave();
         }
      }, this), Y.config.doc);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 186);
contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 188);
o.hide();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 189);
o.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 190);
return o;
   },

   onOverlaySave: function() {

      // Call the updateMethod async method
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlaySave", 193);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 196);
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

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 207);
if(!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 208);
return;
      }

      // has not changed => don't do anything
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 212);
if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||
            (newValue === oldValue) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 214);
this.get('inplaceOverlay').hide();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 215);
return;
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 218);
fieldValues[key] = newValue;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 220);
td.addClass( host.getClassName('cell-edited') );

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 222);
updateMethod.call(this, id, fieldValues, Y.bind(function(success) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 4)", 222);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 223);
if (success) {
            // on success, update the record in the datatable
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 225);
host.get("data").getById(id).setAttrs(fieldValues);
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 226);
td.removeClass( host.getClassName('cell-edited') );
         }
      },this));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 230);
this.get('inplaceOverlay').hide();
   },

   onOverlayCancel: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlayCancel", 233);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 234);
this.get('inplaceOverlay').hide();
   },

   /**
    * add Attributes on the data model depending on the plugin configuration
    *
    * @method enrichData
    */
   enrichData: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichData", 242);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 244);
var that = this,
          data = this.get("host").get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 247);
data.each(function (model) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 5)", 247);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 248);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 249);
that.addModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 251);
if(!this.get("disableDeleteFunc")){
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 252);
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

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichColumns", 263);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 265);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 266);
this.addModifyColumn();
      }
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 269);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 270);
this.addDeleteColumn();
      }
   },

   /**
    * Provide the add button in order to add record on the DataTable
    *
    * @method addAddButton
    */
   addAddButton: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addAddButton", 279);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 281);
if(!this.get("disableAddFunc")) {
      
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 283);
var buttonHtml = "<button class='yui3-button'>"+this.get("strings").addButtonText+"</button>",
             button = Y.Node.create(buttonHtml);

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 286);
this.addButton = button;

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 288);
this.get("host").get("contentBox").append(button);
         
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 290);
button.on("click", this._onAddButtonClick, this);
      }
   
   },

   _onAddButtonClick: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_onAddButtonClick", 295);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 296);
var panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 298);
e.stopPropagation();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 300);
panel.set("headerContent",this.get("strings").addItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 301);
panel.get("field").clear();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 302);
panel.show();
   },

   /**
    *
    * @method modifyRecord
    */
   modifyRecord: function(e) {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "modifyRecord", 309);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 311);
e.stopPropagation();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 313);
var record = this.get("host").getRecord(e.currentTarget),
          panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 316);
panel.set("headerContent",this.get("strings").modifyItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 317);
panel.get('field').setValue(record.getAttrs());
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 318);
panel.show();
   },

   /**
    * Called when the user clicked on a link to delete a record
    * @method deleteRecord
    */
   deleteRecord: function(e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteRecord", 325);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 326);
e.stopPropagation();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 327);
var deleteMethod,
          host = this.get('host'),
          record = host.getRecord(e.currentTarget),
          row;
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 331);
if (!this.get("confirmDelete") || confirm(this.get("strings").confirmDeletion)) {

         // Call the deleteMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 334);
deleteMethod = this.get('deleteMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 336);
row = host.getRow(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 337);
row.addClass( host.getClassName('row-edited') );

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 339);
deleteMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 6)", 339);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 340);
if (success) {
               // on success, remove the record from the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 342);
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
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteExtraColumns", 353);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 355);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 356);
this.removeModifyColumn();
      }
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 358);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 359);
this.removeDeleteColumn();
      }
   },

   /**
    *
    * @method _initPanel
    * @private
    */
   _initPanel: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initPanel", 368);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 370);
var opts = Y.mix({}, this.get('panelOptions') );

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 372);
var panel = new Y.inputEx.Panel( Y.mix(opts, {
         inputEx: this.get("inputEx"),
         buttons: {
            header: ['close'],

            footer: [
               {
                  value: this.get("strings").saveText,
                  action: Y.bind(this.onPanelSaveButton, this),
                  classNames: 'yui3-button-primary'
               },
               {
                  value: this.get("strings").cancelText,
                  action: Y.bind(this.onPanelCancelButton, this),
                  classNames: 'yui3-button-link'
               }
            ]
         }
      }) );

      // first the panel needs to be "render" then "show"
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 393);
panel.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 394);
return panel;
   },

   onPanelCancelButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelCancelButton", 397);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 398);
e.preventDefault();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 399);
this.get('panel').hide();
   },

   onPanelSaveButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelSaveButton", 402);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 403);
e.preventDefault();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 405);
var field = this.get("panel").get("field"),
         fieldValues = field.getValue(),
         host = this.get("host"),
         record,
         RecordType,
         updateMethod,
         row,
         addMethod;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 414);
if (!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 415);
return;
      }

      // Modification
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 419);
if (fieldValues.id) {

         // Call the updateMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 422);
updateMethod = this.get('updateMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 424);
record = host.get("data").getById(fieldValues.id);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 425);
row = host.getRow(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 426);
row.addClass( host.getClassName('row-edited') );

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 428);
updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 7)", 428);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 429);
if (success) {
               // on success, update the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 431);
host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 432);
this.get('panel').hide();
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 433);
row.removeClass( host.getClassName('row-edited') );
            }
         },this));

      }
      // Creation
      else {

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 441);
fieldValues.id = this.generateId(this.get("idSize"));
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 442);
RecordType = host.get("recordType");
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 443);
record = new RecordType();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 444);
record.setAttrs(fieldValues);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 445);
this.addModifyAttr(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 446);
this.addDeleteAttr(record);

         // call the async method to create a record
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 449);
addMethod = this.get('addMethod');
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 450);
addMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 8)", 450);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 451);
if (success) {
               // if success, add the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 453);
host.get("data").add(record);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 454);
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

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "destructor", 466);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 468);
var that = this,
          host = this.get('host'),
          data = host.get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 472);
data.each(function (model) {

         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 9)", 472);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 474);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 475);
that.delModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 477);
if(!this.get("disableDeleteFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 478);
that.delDeleteAttr(model);
         }

      });
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 483);
this.deleteExtraColumns();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 485);
if(!this.get("disableAddFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 486);
this.addButton.remove();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 489);
if(this.get("inplaceedit")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 490);
host.get('contentBox').removeClass( host.getClassName('inplaceedit') );
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 491);
this.cellClickHandler.detach();

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 493);
if (this.docClickHandler) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 494);
this.docClickHandler.detach();
         }
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 498);
this.get("panel").destroy();
   },


   /**
    * Add the modify attribute on the data model
    *
    * @method addModifyAttr
    */
   addModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyAttr", 507);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 508);
model.addAttr("modify");
   },

   /**
    * Add the delete attribute on the data model
    *
    * @method addDeleteAttr
    */
   addDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteAttr", 516);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 517);
model.addAttr("delete");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delModifyAttr
    */
   delModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delModifyAttr", 525);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 526);
model.removeAttr("modify");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delDeleteAttr
    */
   delDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delDeleteAttr", 534);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 535);
model.removeAttr("delete");
   },

   /**
    * Add the modify column on the DataTable
    *
    * @method addModifyColumn
    */
   addModifyColumn: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyColumn", 543);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 545);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 547);
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
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteColumn", 562);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 564);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 566);
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
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeModifyColumn", 580);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 581);
this.get("host").removeColumn("modify");
   },

   /**
    * Remove the delete column from the DataTable
    *
    * @method removeDeleteColumn
    */
   removeDeleteColumn: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeDeleteColumn", 589);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 590);
this.get("host").removeColumn("delete");
   },


   generateId : function(size) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "generateId", 594);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 595);
var prefixId = this.get("prefixId"),
          s = size ? size : 5;
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 597);
prefixId = prefixId ? prefixId : "";
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 598);
return prefixId + Math.floor(Math.random()*Math.pow(10,s));
   },
   
   _initStrings : function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initStrings", 601);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 602);
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

   panelOptions: {
      value: {
         centered: true,
         width: 500,
         modal: true,
         zIndex: 5,
         visible: false
      }
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
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 742);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 743);
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
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 755);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 756);
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
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 768);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 769);
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

   /**
    * nodeFormatter for the modify column
    * @attribute modifyColumnNodeFormatter
    * @type function
    */
   modifyColumnNodeFormatter: {
      value: null
   },

   /**
    * nodeFormatter for the delete column
    * @attribute deleteColumnNodeFormatter
    * @type function
    */
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
