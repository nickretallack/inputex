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
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].code=["YUI.add('inputex-datatable', function (Y, NAME) {","","/*global confirm:true*/","","/**"," * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin."," * @module inputex-datatable"," */","","var inputEx = Y.inputEx;","","Y.namespace('inputEx.Plugin');","","/**","* Provide add/modify/delete functionalities on a dataTable as a plugin","* @class inputEx.Plugin.InputExDataTable","* @extends Plugin.Base","* @constructor","* @param {Object} configuration object","*/","inputEx.Plugin.InputExDataTable = function (config) {","   inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);","};","","inputEx.Plugin.InputExDataTable.NS = \"InputExDataTable\";","","Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {","   ","   /**","    * @method initializer","    */","   initializer: function () {","","      var host = this.get(\"host\");","","      // enrich data (Model instance) with modify and delete attributs","      this.enrichData();","      ","      // enrich DataTable with modify and delete columns","      this.enrichColumns();","","      // add a button called \"add\" in order to add record in the DataTable","      if (host.get('render')) {","         this.addAddButton();","      }","      else {","         host.onceAfter('render', function () {","            this.addAddButton();","         }, this);","      }","","      host.get(\"boundingBox\").addClass(host.getClassName('inputex'));","        ","      if(!this.get(\"disableModifyFunc\")) {","         // handle row modification","         host.delegate(\"click\",this.modifyRecord, \"td.\"+host.getClassName('cell-modify'), this);","      }","","      if(!this.get(\"disableDeleteFunc\")) {","         // handle row removal","         host.delegate(\"click\",this.deleteRecord, \"td.\"+host.getClassName('cell-delete'), this);","      }","      ","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').addClass( host.getClassName('inplaceedit') );","         this.setupInplaceEditing();","      }","","    },","","","   setupInplaceEditing: function() {","      var host = this.get('host');","","      // Delegate click event to make the inplace editor appear","      this.cellClickHandler = host.delegate(\"click\", this.onCellClick, \".\"+host.getClassName('cell'), this);","","      this.after('editorShow', this._onEditorShow, this);","   },","","   _onEditorShow: function() {","      this.get('inplaceOverlay').show();","      this.docKeyListener = Y.one('document').on('key', Y.bind(this.onOverlayCancel, this), 'esc');","   },","","   onCellClick: function(e) {","","      var findTd = function(n) { return n.get('tagName') === 'TD' && n.hasClass('yui3-datatable-cell'); },","          td = findTd(e.target) ? e.target : e.target.ancestor(findTd), // this might be a DIV because of a formatter (see color)","          host = this.get('host'),","          colIndex = td.get('parentNode').get('children').indexOf(td),","          column = host.getColumn(colIndex),","          record = host.getRecord(td),","          key = column.key,","          value = record.get(key),","","          overlay = this.get('inplaceOverlay'),","","          // inputEx Field config","          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { return i.name === key; }),","          conf = Y.mix({","            parentEl: this.overlayFieldContainer.getDOMNode()","          }, fieldConf),","          field;","","      // When we changed the value of an overlay but click on another cell, it doesn't save automatically","      // since the event is stopped. So we do it manually here.","      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision","      if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","         this.onOverlaySave();","      }","","      if( !fieldConf ||","          fieldConf.type === \"uneditable\" ||","          td.hasClass('yui3-datatable-cell-delete') ||","          td.hasClass('yui3-datatable-cell-modify') ) {","         return;","      }","","      e.stopPropagation();","","      // Align","      overlay.align(td, [\"tl\", \"tl\"]);","","      // Render field","      this.overlayFieldContainer.set('innerHTML', '');","      field = new Y.inputEx(conf);","      field.setValue(value);","      ","      // Timeout to make the focus work on inplaceEdit","      setTimeout(function(){","         field.focus();","      }, 20);","","      this._inplaceeditCell = {","         record: record,","         key: column.key,","         field: field,","         td: td","      };","","      // TODO: fire an event editorShow","      this.fire('editorShow', {","         column: column,","         record: record,","         key: key,","         value: value,","         cell: td,","         field: field","      });","","   },","","","   _initInplaceOverlay: function() {","","      var o = new Y.Overlay({","            zIndex: 5","          }),","          contentBox = o.get('contentBox'),","          overlayFieldContainer = Y.Node.create(\"<div />\"),","          overlayButtonsContainer = Y.Node.create(\"<div class='editor-buttons' />\"),","          saveButton,","          cancelButton;","","      contentBox.appendChild(overlayFieldContainer);","      this.overlayFieldContainer = overlayFieldContainer;","","      contentBox.appendChild(overlayButtonsContainer);","","      // Overlay save and cancel buttons","      saveButton = Y.Node.create('<button>Sauver</button>');","      overlayButtonsContainer.appendChild(saveButton);","","      saveButton.addClass('yui3-button');","      saveButton.addClass('yui3-button-primary');","","      cancelButton = Y.Node.create('<button>Annuler</button>');","","      cancelButton.addClass('yui3-button');","      cancelButton.addClass('yui3-button-link');","","","      overlayButtonsContainer.appendChild(cancelButton);","      saveButton.on('click', this.onOverlaySave, this);","      cancelButton.on('click', this.onOverlayCancel, this);","","      // Close overlay if click outside of the overlay","      this.docClickHandler = Y.on('click', Y.bind(function(e) {","         var overlay = this.get('inplaceOverlay');","","         if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","            this.onOverlaySave();","         }","      }, this), Y.config.doc);","","      contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));","","      o.hide();","      o.render();","      return o;","   },","","   onOverlaySave: function() {","","      // Call the updateMethod async method","      var updateMethod = this.get('updateMethod'),","          field = this._inplaceeditCell.field,","          newValue = field.getValue(),","          record = this._inplaceeditCell.record,","          key = this._inplaceeditCell.key,","          oldValue = record.get(key),","          fieldValues = {},","          id = record.get('id'),","          host = this.get('host'),","          td = this._inplaceeditCell.td;","","      if(!field.validate()) {","         return;","      }","","      // has not changed => don't do anything","      if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||","            (newValue === oldValue) ) {","         this.get('inplaceOverlay').hide();","         return;","      }","","      fieldValues[key] = newValue;","","      this._addEditedClass(td);","","      updateMethod.call(this, id, fieldValues, Y.bind(function(success) {","         if (success) {","            // on success, update the record in the datatable","            host.get(\"data\").getById(id).setAttrs(fieldValues);","         }","         this._removeEditedClass(td, success);","      },this));","","      this.get('inplaceOverlay').hide();","      this.docKeyListener.detach();","   },","","   onOverlayCancel: function() {","      this.get('inplaceOverlay').hide();","      this.docKeyListener.detach();","   },","","   /**","    * add Attributes on the data model depending on the plugin configuration","    *","    * @method enrichData","    */","   enrichData: function () {","","      var that = this,","          data = this.get(\"host\").get(\"data\");","","      data.each(function (model) {","         if(!this.get(\"disableModifyFunc\")) {","            that.addModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")){","            that.addDeleteAttr(model);","         }","      });","","   },","","   /**","    * add Columns on the DataTable depending on the plugin configuration","    *","    * @method enrichColumns","    */","   enrichColumns: function () {","","      if(!this.get(\"disableModifyFunc\")) {","         this.addModifyColumn();","      }","      ","      if(!this.get(\"disableDeleteFunc\")) {","         this.addDeleteColumn();","      }","   },","","   /**","    * Provide the add button in order to add record on the DataTable","    *","    * @method addAddButton","    */","   addAddButton: function() {","","      if(!this.get(\"disableAddFunc\")) {","      ","         var buttonHtml = \"<button class='yui3-button'>\"+this.get(\"strings\").addButtonText+\"</button>\",","             host = this.get(\"host\");","","         this.addButtonTop    = Y.Node.create(buttonHtml);","         this.addButtonBottom = Y.Node.create(buttonHtml);","","         this.addButtonTop.addClass(host.getClassName('add-button-top'));","         this.addButtonBottom.addClass(host.getClassName('add-button-bottom'));","","         this.get(\"host\").get(\"contentBox\").prepend(this.addButtonTop);","         this.get(\"host\").get(\"contentBox\").append(this.addButtonBottom);","         ","         this.addButtonTop.on(\"click\",    this._onAddButtonClick, this);","         this.addButtonBottom.on(\"click\", this._onAddButtonClick, this);","      }","   ","   },","","   _onAddButtonClick: function (e) {","      var panel = this.get(\"panel\");","","      e.stopPropagation();","","      panel.set(\"headerContent\",this.get(\"strings\").addItemHeader);","      panel.get(\"field\").clear();","      panel.show();","   },","","   /**","    *","    * @method modifyRecord","    */","   modifyRecord: function(e) {","      ","      e.stopPropagation();","      ","      var record = this.get(\"host\").getRecord(e.currentTarget),","          panel = this.get(\"panel\");","","      panel.set(\"headerContent\",this.get(\"strings\").modifyItemHeader);","      panel.get('field').setValue(record.getAttrs());","      panel.show();","   },","","   /**","    * Called when the user clicked on a link to delete a record","    * @method deleteRecord","    */","   deleteRecord: function(e) {","      e.stopPropagation();","      var deleteMethod,","          host = this.get('host'),","          record = host.getRecord(e.currentTarget);","","      if (!this.get(\"confirmDelete\") || confirm(this.get(\"strings\").confirmDeletion)) {","","         // Call the deleteMethod async method","         deleteMethod = this.get('deleteMethod');","","         this._addEditedClass(record);","","         deleteMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               // on success, remove the record from the datatable","               host.get(\"data\").remove(record);","            }","            this._removeEditedClass(record, success);","         },this));","","      }","   },","","   /**","    *","    * @method deleteExtraColumns","    */","   deleteExtraColumns: function() {","      ","      if(!this.get(\"disableModifyFunc\")) {","         this.removeModifyColumn();","      }","      if(!this.get(\"disableDeleteFunc\")) {","         this.removeDeleteColumn();","      }","   },","","   /**","    *","    * @method _initPanel","    * @private","    */","   _initPanel: function () {","","      var opts = Y.mix({}, this.get('panelOptions') ), panel;","","      panel = new Y.inputEx.Panel( Y.mix(opts, {","         inputEx: this.get(\"inputEx\"),","         buttons: {","            header: ['close'],","","            footer: [","               {  ","                  name: 'panelSave',","                  value: this.get(\"strings\").saveText,","                  action: Y.bind(this.onPanelSaveButton, this),","                  classNames: 'yui3-button-primary'","               },","               {  ","                  name: 'panelCancel',","                  value: this.get(\"strings\").cancelText,","                  action: Y.bind(this.onPanelCancelButton, this),","                  classNames: 'yui3-button-link'","               }","            ]","         }","      }) );","","      // first the panel needs to be \"render\" then \"show\"","      panel.render();","      return panel;","   },","","   onPanelCancelButton: function (e) {","      e.preventDefault();","      this.get('panel').hide();","   },","","   onPanelSaveButton: function (e) {","      e.preventDefault();","","      var field = this.get(\"panel\").get(\"field\"),","         fieldValues = field.getValue(),","         host = this.get(\"host\"),","         record,","         RecordType,","         updateMethod,","         addMethod;","      ","      if (!field.validate()) {","         return;","      }","      ","      // Disable save button","      this.disableSaveButton(true);","      ","      // Modification","      if (fieldValues.id) {","","         // Call the updateMethod async method","         updateMethod = this.get('updateMethod');","","         record = host.get(\"data\").getById(fieldValues.id);","         this._addEditedClass(record);","","         updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {","            if (success) {","               ","               // on success, update the record in the datatable","               host.get(\"data\").getById(fieldValues.id).setAttrs(fieldValues);","               this.get('panel').hide();","            }","            ","            // Enable save button","            this.disableSaveButton(false);","            ","            this._removeEditedClass(record, success);","            ","         },this));","","      }","      // Creation","      else {","","         fieldValues.id = this.generateId(this.get(\"idSize\"));","         RecordType = host.get(\"recordType\");","         record = new RecordType();","         record.setAttrs(fieldValues);","         this.addModifyAttr(record);","         this.addDeleteAttr(record);","","         // call the async method to create a record","         addMethod = this.get('addMethod');","         addMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               ","               // if success, add the record in the datatable","               host.get(\"data\").add(record);","               this.get('panel').hide();","            }","            ","            // Enable save button","            this.disableSaveButton(false);","            ","         },this));","","      }","","   },","   ","   disableSaveButton : function(bool) {","      var button = this.get('panel').getButton('panelSave');","      button.set('disabled', bool);","   },","   ","   /**","    *","    * @method destructor","    */","   destructor: function() {","","      var that = this,","          host = this.get('host'),","          data = host.get(\"data\");","","      data.each(function (model) {","","         if(!this.get(\"disableModifyFunc\")) {","            that.delModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")) {","            that.delDeleteAttr(model);","         }","","      });","      ","      this.deleteExtraColumns();","      ","      if(!this.get(\"disableAddFunc\")) {","         this.addButtonTop.remove();","         this.addButtonBottom.remove();","      }","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').removeClass( host.getClassName('inplaceedit') );","         this.cellClickHandler.detach();","","         if (this.docClickHandler) {","            this.docClickHandler.detach();","         }","      }","","      this.get(\"panel\").destroy();","   },","","","   /**","    * Add the modify attribute on the data model","    *","    * @method addModifyAttr","    */","   addModifyAttr: function(model) {","      model.addAttr(\"modify\");","   },","","   /**","    * Add the delete attribute on the data model","    *","    * @method addDeleteAttr","    */","   addDeleteAttr: function (model) {","      model.addAttr(\"delete\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delModifyAttr","    */","   delModifyAttr: function(model) {","      model.removeAttr(\"modify\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delDeleteAttr","    */","   delDeleteAttr: function (model) {","      model.removeAttr(\"delete\");","   },","","   /**","    * Add the modify column on the DataTable","    *","    * @method addModifyColumn","    */","   addModifyColumn: function() {","","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").modifyText,","         className: host.getClassName('cell-modify'),","         formatter: this.get('modifyColumnFormatter'),","         nodeFormatter: this.get('modifyColumnNodeFormatter')","      });","","   },","   ","   /**","    * Add the delete column on the DataTable","    *","    * @method addDeleteColumn","    */","   addDeleteColumn: function() {","      ","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").deleteText,","         className: host.getClassName('cell-delete'),","         formatter: this.get('deleteColumnFormatter'),","         nodeFormatter: this.get('deleteColumnNodeFormatter')","      });","   },","","   /**","    * Remove the modify column from the DataTable","    *","    * @method removeModifyColumn","    */","   removeModifyColumn: function() {","      this.get(\"host\").removeColumn(\"modify\");","   },","","   /**","    * Remove the delete column from the DataTable","    *","    * @method removeDeleteColumn","    */","   removeDeleteColumn: function() {","      this.get(\"host\").removeColumn(\"delete\");","   },","","","   generateId : function(size) {","      var prefixId = this.get(\"prefixId\"),","          s = size ? size : 5;","      prefixId = prefixId ? prefixId : \"\";","      return prefixId + Math.floor(Math.random()*Math.pow(10,s));","   },","","   _addEditedClass: function (record) {","      var host = this.get('host');","      if (record instanceof Y.Node) {","         record.addClass(host.getClassName('cell-edited'));","      }","      else {","         host.getRow(record).addClass(host.getClassName('row-edited'));","      }","   },","","   _removeEditedClass: function (record, now) {","      Y.later(now === true ? 0 : (Y.Lang.isNumber(now) ? now : 5000), this, function () {","         var host = this.get('host'), row;","         if (record instanceof Y.Node) {","            record.removeClass(host.getClassName('cell-edited'));","         }","         else {","            row = host.getRow(record);","            if (row) {","               row.removeClass(host.getClassName('row-edited'));","            }","         }","      });","   },","   ","   _initStrings : function() {","      return Y.Intl.get(\"inputex-datatable\");","   }","","}, {","","/**"," * Static property used to define the default attribute configuration of"," * the Plugin."," *"," * @property ATTRS"," * @type {Object}"," * @static"," */","ATTRS: {","","   /**","    * This is an inputEx field definition. This is used when a user try to create/modify a record","    *","    * @attribute inputEx","    */","   inputEx: {},","","","   /**","    * This string is inserted before the generated id","    *","    * @attribute prefixId","    * @type String","    * @example prefixId : \"po-\" --> id = po-1342561","    */","   prefixId: {","     value: \"\"","   },","","   /**","    * This represents the number of digits used in the id generation","    *","    * @attribute idSize","    * @type Number","    */","   idSize: {","     value: 5","   },","","   /**","    * If true the add functionality is disabled","    *","    * @attribute disableAddFunc","    * @type boolean","    */","   disableAddFunc: {","     value: false","   },","","   /**","    * If true the modify functionality is disabled","    * @attribute disableModifyFunc","    * @type boolean","    */","   disableModifyFunc: {","     value: false","   },","","   /**","    * If true the delete functionality is disabled","    *","    * @attribute disableDeleteFunc","    * @type boolean","    */","   disableDeleteFunc: {","     value: false","   },","","   /**","    * Labels of the plugin","    *","    * @attribute modifyColumnLabel","    */","   strings : {","     value : null,","     valueFn : '_initStrings'","   },","","   /**","    * If true a confirmation will be asked to the user when a delete attempt appear","    *","    * @attribute confirmDelete","    * @type boolean","    */","   confirmDelete: {","     value: true","   },","","   /**","    * This panel will be displayed on record creation/modication","    * @attribute panel","    * @type Y.inputEx.Panel","    */","   panel: {","     valueFn: '_initPanel',","     lazyAdd: true","   },","","   panelOptions: {","      value: {","         centered: true,","         width: 500,","         modal: true,","         zIndex: 5,","         visible: false","      }","   },","","   /**","    * Set to true if you want to activate in-cell editing (ALPHA)","    * @attribute inplaceedit","    * @atype boolean","    */","   inplaceedit: {","      value: false","   },","","   /**","    * Overlay used for the inplace editing","    * @attribute inplaceOverlay","    * @type Y.Overlay","    */","   inplaceOverlay: {","     valueFn: '_initInplaceOverlay',","     lazyAdd: true","   },","","   /**","    * Function used to confirm the creation of a new record.","    * You can perform validation and/or ajax creation.","    * addMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute addMethod","    * @type function","    */","   addMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the modification of an existing record.","    * You can perform validation and/or ajax update.","    * updateMethod must be a function(id, newValues, cb) which calls 'cb' with success status as first argument","    * @attribute updateMethod","    * @type function","    */","   updateMethod: {","      value: function(id, newValues, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the deletion of an existing record.","    * You can perform validation and/or ajax deletion.","    * deleteMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute deleteMethod","    * @type function","    */","   deleteMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Formatter for the modify column","    * @attribute modifyColumnFormatter","    * @type function","    */","   modifyColumnFormatter: {","      value: null","   },","","   /**","    * Formatter for the delete column","    * @attribute deleteColumnFormatter","    * @type function","    */","   deleteColumnFormatter: {","      value: null","   },","","   /**","    * nodeFormatter for the modify column","    * @attribute modifyColumnNodeFormatter","    * @type function","    */","   modifyColumnNodeFormatter: {","      value: null","   },","","   /**","    * nodeFormatter for the delete column","    * @attribute deleteColumnNodeFormatter","    * @type function","    */","   deleteColumnNodeFormatter: {","      value: null","   }","","}","","});","","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"node-event-delegate\",","        \"inputex-group\",","        \"inputex-panel\",","        \"datatable\",","        \"overlay\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].lines = {"1":0,"10":0,"12":0,"21":0,"22":0,"25":0,"27":0,"34":0,"37":0,"40":0,"43":0,"44":0,"47":0,"48":0,"52":0,"54":0,"56":0,"59":0,"61":0,"65":0,"66":0,"67":0,"74":0,"77":0,"79":0,"83":0,"84":0,"89":0,"101":0,"110":0,"111":0,"114":0,"118":0,"121":0,"124":0,"127":0,"128":0,"129":0,"132":0,"133":0,"136":0,"144":0,"158":0,"167":0,"168":0,"170":0,"173":0,"174":0,"176":0,"177":0,"179":0,"181":0,"182":0,"185":0,"186":0,"187":0,"190":0,"191":0,"193":0,"194":0,"198":0,"200":0,"201":0,"202":0,"208":0,"219":0,"220":0,"224":0,"226":0,"227":0,"230":0,"232":0,"234":0,"235":0,"237":0,"239":0,"242":0,"243":0,"247":0,"248":0,"258":0,"261":0,"262":0,"263":0,"265":0,"266":0,"279":0,"280":0,"283":0,"284":0,"295":0,"297":0,"300":0,"301":0,"303":0,"304":0,"306":0,"307":0,"309":0,"310":0,"316":0,"318":0,"320":0,"321":0,"322":0,"331":0,"333":0,"336":0,"337":0,"338":0,"346":0,"347":0,"351":0,"354":0,"356":0,"358":0,"359":0,"361":0,"363":0,"375":0,"376":0,"378":0,"379":0,"390":0,"392":0,"415":0,"416":0,"420":0,"421":0,"425":0,"427":0,"435":0,"436":0,"440":0,"443":0,"446":0,"448":0,"449":0,"451":0,"452":0,"455":0,"456":0,"460":0,"462":0,"470":0,"471":0,"472":0,"473":0,"474":0,"475":0,"478":0,"479":0,"480":0,"483":0,"484":0,"488":0,"497":0,"498":0,"507":0,"511":0,"513":0,"514":0,"516":0,"517":0,"522":0,"524":0,"525":0,"526":0,"529":0,"530":0,"531":0,"533":0,"534":0,"538":0,"548":0,"557":0,"566":0,"575":0,"585":0,"587":0,"604":0,"606":0,"621":0,"630":0,"635":0,"637":0,"638":0,"642":0,"643":0,"644":0,"647":0,"652":0,"653":0,"654":0,"655":0,"658":0,"659":0,"660":0,"667":0,"808":0,"821":0,"834":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].functions = {"InputExDataTable:21":0,"(anonymous 2):47":0,"initializer:32":0,"setupInplaceEditing:73":0,"_onEditorShow:82":0,"findTd:89":0,"(anonymous 3):101":0,"(anonymous 4):132":0,"onCellClick:87":0,"(anonymous 5):190":0,"_initInplaceOverlay:156":0,"(anonymous 6):234":0,"onOverlaySave:205":0,"onOverlayCancel:246":0,"(anonymous 7):261":0,"enrichData:256":0,"enrichColumns:277":0,"addAddButton:293":0,"_onAddButtonClick:315":0,"modifyRecord:329":0,"(anonymous 8):358":0,"deleteRecord:345":0,"deleteExtraColumns:373":0,"_initPanel:388":0,"onPanelCancelButton:419":0,"(anonymous 9):451":0,"(anonymous 10):479":0,"onPanelSaveButton:424":0,"disableSaveButton:496":0,"(anonymous 11):511":0,"destructor:505":0,"addModifyAttr:547":0,"addDeleteAttr:556":0,"delModifyAttr:565":0,"delDeleteAttr:574":0,"addModifyColumn:583":0,"addDeleteColumn:602":0,"removeModifyColumn:620":0,"removeDeleteColumn:629":0,"generateId:634":0,"_addEditedClass:641":0,"(anonymous 12):652":0,"_removeEditedClass:651":0,"_initStrings:666":0,"value:807":0,"value:820":0,"value:833":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredLines = 202;
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredFunctions = 48;
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 1);
YUI.add('inputex-datatable', function (Y, NAME) {

/*global confirm:true*/

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
if (host.get('render')) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 44);
this.addAddButton();
      }
      else {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 47);
host.onceAfter('render', function () {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 2)", 47);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 48);
this.addAddButton();
         }, this);
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 52);
host.get("boundingBox").addClass(host.getClassName('inputex'));
        
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 54);
if(!this.get("disableModifyFunc")) {
         // handle row modification
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 56);
host.delegate("click",this.modifyRecord, "td."+host.getClassName('cell-modify'), this);
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 59);
if(!this.get("disableDeleteFunc")) {
         // handle row removal
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 61);
host.delegate("click",this.deleteRecord, "td."+host.getClassName('cell-delete'), this);
      }
      

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 65);
if(this.get("inplaceedit")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 66);
host.get('contentBox').addClass( host.getClassName('inplaceedit') );
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 67);
this.setupInplaceEditing();
      }

    },


   setupInplaceEditing: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "setupInplaceEditing", 73);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 74);
var host = this.get('host');

      // Delegate click event to make the inplace editor appear
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 77);
this.cellClickHandler = host.delegate("click", this.onCellClick, "."+host.getClassName('cell'), this);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 79);
this.after('editorShow', this._onEditorShow, this);
   },

   _onEditorShow: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_onEditorShow", 82);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 83);
this.get('inplaceOverlay').show();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 84);
this.docKeyListener = Y.one('document').on('key', Y.bind(this.onOverlayCancel, this), 'esc');
   },

   onCellClick: function(e) {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onCellClick", 87);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 89);
var findTd = function(n) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "findTd", 89);
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
          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 3)", 101);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 101);
return i.name === key; }),
          conf = Y.mix({
            parentEl: this.overlayFieldContainer.getDOMNode()
          }, fieldConf),
          field;

      // When we changed the value of an overlay but click on another cell, it doesn't save automatically
      // since the event is stopped. So we do it manually here.
      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 110);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 111);
this.onOverlaySave();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 114);
if( !fieldConf ||
          fieldConf.type === "uneditable" ||
          td.hasClass('yui3-datatable-cell-delete') ||
          td.hasClass('yui3-datatable-cell-modify') ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 118);
return;
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 121);
e.stopPropagation();

      // Align
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 124);
overlay.align(td, ["tl", "tl"]);

      // Render field
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 127);
this.overlayFieldContainer.set('innerHTML', '');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 128);
field = new Y.inputEx(conf);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 129);
field.setValue(value);
      
      // Timeout to make the focus work on inplaceEdit
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 132);
setTimeout(function(){
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 4)", 132);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 133);
field.focus();
      }, 20);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 136);
this._inplaceeditCell = {
         record: record,
         key: column.key,
         field: field,
         td: td
      };

      // TODO: fire an event editorShow
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 144);
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

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initInplaceOverlay", 156);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 158);
var o = new Y.Overlay({
            zIndex: 5
          }),
          contentBox = o.get('contentBox'),
          overlayFieldContainer = Y.Node.create("<div />"),
          overlayButtonsContainer = Y.Node.create("<div class='editor-buttons' />"),
          saveButton,
          cancelButton;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 167);
contentBox.appendChild(overlayFieldContainer);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 168);
this.overlayFieldContainer = overlayFieldContainer;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 170);
contentBox.appendChild(overlayButtonsContainer);

      // Overlay save and cancel buttons
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 173);
saveButton = Y.Node.create('<button>Sauver</button>');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 174);
overlayButtonsContainer.appendChild(saveButton);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 176);
saveButton.addClass('yui3-button');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 177);
saveButton.addClass('yui3-button-primary');

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 179);
cancelButton = Y.Node.create('<button>Annuler</button>');

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 181);
cancelButton.addClass('yui3-button');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 182);
cancelButton.addClass('yui3-button-link');


      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 185);
overlayButtonsContainer.appendChild(cancelButton);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 186);
saveButton.on('click', this.onOverlaySave, this);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 187);
cancelButton.on('click', this.onOverlayCancel, this);

      // Close overlay if click outside of the overlay
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 190);
this.docClickHandler = Y.on('click', Y.bind(function(e) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 5)", 190);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 191);
var overlay = this.get('inplaceOverlay');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 193);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 194);
this.onOverlaySave();
         }
      }, this), Y.config.doc);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 198);
contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 200);
o.hide();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 201);
o.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 202);
return o;
   },

   onOverlaySave: function() {

      // Call the updateMethod async method
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlaySave", 205);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 208);
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

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 219);
if(!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 220);
return;
      }

      // has not changed => don't do anything
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 224);
if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||
            (newValue === oldValue) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 226);
this.get('inplaceOverlay').hide();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 227);
return;
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 230);
fieldValues[key] = newValue;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 232);
this._addEditedClass(td);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 234);
updateMethod.call(this, id, fieldValues, Y.bind(function(success) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 6)", 234);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 235);
if (success) {
            // on success, update the record in the datatable
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 237);
host.get("data").getById(id).setAttrs(fieldValues);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 239);
this._removeEditedClass(td, success);
      },this));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 242);
this.get('inplaceOverlay').hide();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 243);
this.docKeyListener.detach();
   },

   onOverlayCancel: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlayCancel", 246);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 247);
this.get('inplaceOverlay').hide();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 248);
this.docKeyListener.detach();
   },

   /**
    * add Attributes on the data model depending on the plugin configuration
    *
    * @method enrichData
    */
   enrichData: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichData", 256);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 258);
var that = this,
          data = this.get("host").get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 261);
data.each(function (model) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 7)", 261);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 262);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 263);
that.addModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 265);
if(!this.get("disableDeleteFunc")){
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 266);
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

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichColumns", 277);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 279);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 280);
this.addModifyColumn();
      }
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 283);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 284);
this.addDeleteColumn();
      }
   },

   /**
    * Provide the add button in order to add record on the DataTable
    *
    * @method addAddButton
    */
   addAddButton: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addAddButton", 293);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 295);
if(!this.get("disableAddFunc")) {
      
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 297);
var buttonHtml = "<button class='yui3-button'>"+this.get("strings").addButtonText+"</button>",
             host = this.get("host");

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 300);
this.addButtonTop    = Y.Node.create(buttonHtml);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 301);
this.addButtonBottom = Y.Node.create(buttonHtml);

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 303);
this.addButtonTop.addClass(host.getClassName('add-button-top'));
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 304);
this.addButtonBottom.addClass(host.getClassName('add-button-bottom'));

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 306);
this.get("host").get("contentBox").prepend(this.addButtonTop);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 307);
this.get("host").get("contentBox").append(this.addButtonBottom);
         
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 309);
this.addButtonTop.on("click",    this._onAddButtonClick, this);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 310);
this.addButtonBottom.on("click", this._onAddButtonClick, this);
      }
   
   },

   _onAddButtonClick: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_onAddButtonClick", 315);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 316);
var panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 318);
e.stopPropagation();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 320);
panel.set("headerContent",this.get("strings").addItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 321);
panel.get("field").clear();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 322);
panel.show();
   },

   /**
    *
    * @method modifyRecord
    */
   modifyRecord: function(e) {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "modifyRecord", 329);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 331);
e.stopPropagation();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 333);
var record = this.get("host").getRecord(e.currentTarget),
          panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 336);
panel.set("headerContent",this.get("strings").modifyItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 337);
panel.get('field').setValue(record.getAttrs());
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 338);
panel.show();
   },

   /**
    * Called when the user clicked on a link to delete a record
    * @method deleteRecord
    */
   deleteRecord: function(e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteRecord", 345);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 346);
e.stopPropagation();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 347);
var deleteMethod,
          host = this.get('host'),
          record = host.getRecord(e.currentTarget);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 351);
if (!this.get("confirmDelete") || confirm(this.get("strings").confirmDeletion)) {

         // Call the deleteMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 354);
deleteMethod = this.get('deleteMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 356);
this._addEditedClass(record);

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 358);
deleteMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 8)", 358);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 359);
if (success) {
               // on success, remove the record from the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 361);
host.get("data").remove(record);
            }
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 363);
this._removeEditedClass(record, success);
         },this));

      }
   },

   /**
    *
    * @method deleteExtraColumns
    */
   deleteExtraColumns: function() {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteExtraColumns", 373);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 375);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 376);
this.removeModifyColumn();
      }
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 378);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 379);
this.removeDeleteColumn();
      }
   },

   /**
    *
    * @method _initPanel
    * @private
    */
   _initPanel: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initPanel", 388);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 390);
var opts = Y.mix({}, this.get('panelOptions') ), panel;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 392);
panel = new Y.inputEx.Panel( Y.mix(opts, {
         inputEx: this.get("inputEx"),
         buttons: {
            header: ['close'],

            footer: [
               {  
                  name: 'panelSave',
                  value: this.get("strings").saveText,
                  action: Y.bind(this.onPanelSaveButton, this),
                  classNames: 'yui3-button-primary'
               },
               {  
                  name: 'panelCancel',
                  value: this.get("strings").cancelText,
                  action: Y.bind(this.onPanelCancelButton, this),
                  classNames: 'yui3-button-link'
               }
            ]
         }
      }) );

      // first the panel needs to be "render" then "show"
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 415);
panel.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 416);
return panel;
   },

   onPanelCancelButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelCancelButton", 419);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 420);
e.preventDefault();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 421);
this.get('panel').hide();
   },

   onPanelSaveButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelSaveButton", 424);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 425);
e.preventDefault();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 427);
var field = this.get("panel").get("field"),
         fieldValues = field.getValue(),
         host = this.get("host"),
         record,
         RecordType,
         updateMethod,
         addMethod;
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 435);
if (!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 436);
return;
      }
      
      // Disable save button
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 440);
this.disableSaveButton(true);
      
      // Modification
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 443);
if (fieldValues.id) {

         // Call the updateMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 446);
updateMethod = this.get('updateMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 448);
record = host.get("data").getById(fieldValues.id);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 449);
this._addEditedClass(record);

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 451);
updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 9)", 451);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 452);
if (success) {
               
               // on success, update the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 455);
host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 456);
this.get('panel').hide();
            }
            
            // Enable save button
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 460);
this.disableSaveButton(false);
            
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 462);
this._removeEditedClass(record, success);
            
         },this));

      }
      // Creation
      else {

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 470);
fieldValues.id = this.generateId(this.get("idSize"));
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 471);
RecordType = host.get("recordType");
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 472);
record = new RecordType();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 473);
record.setAttrs(fieldValues);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 474);
this.addModifyAttr(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 475);
this.addDeleteAttr(record);

         // call the async method to create a record
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 478);
addMethod = this.get('addMethod');
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 479);
addMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 10)", 479);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 480);
if (success) {
               
               // if success, add the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 483);
host.get("data").add(record);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 484);
this.get('panel').hide();
            }
            
            // Enable save button
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 488);
this.disableSaveButton(false);
            
         },this));

      }

   },
   
   disableSaveButton : function(bool) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "disableSaveButton", 496);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 497);
var button = this.get('panel').getButton('panelSave');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 498);
button.set('disabled', bool);
   },
   
   /**
    *
    * @method destructor
    */
   destructor: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "destructor", 505);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 507);
var that = this,
          host = this.get('host'),
          data = host.get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 511);
data.each(function (model) {

         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 11)", 511);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 513);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 514);
that.delModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 516);
if(!this.get("disableDeleteFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 517);
that.delDeleteAttr(model);
         }

      });
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 522);
this.deleteExtraColumns();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 524);
if(!this.get("disableAddFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 525);
this.addButtonTop.remove();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 526);
this.addButtonBottom.remove();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 529);
if(this.get("inplaceedit")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 530);
host.get('contentBox').removeClass( host.getClassName('inplaceedit') );
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 531);
this.cellClickHandler.detach();

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 533);
if (this.docClickHandler) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 534);
this.docClickHandler.detach();
         }
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 538);
this.get("panel").destroy();
   },


   /**
    * Add the modify attribute on the data model
    *
    * @method addModifyAttr
    */
   addModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyAttr", 547);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 548);
model.addAttr("modify");
   },

   /**
    * Add the delete attribute on the data model
    *
    * @method addDeleteAttr
    */
   addDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteAttr", 556);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 557);
model.addAttr("delete");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delModifyAttr
    */
   delModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delModifyAttr", 565);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 566);
model.removeAttr("modify");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delDeleteAttr
    */
   delDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delDeleteAttr", 574);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 575);
model.removeAttr("delete");
   },

   /**
    * Add the modify column on the DataTable
    *
    * @method addModifyColumn
    */
   addModifyColumn: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyColumn", 583);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 585);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 587);
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
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteColumn", 602);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 604);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 606);
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
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeModifyColumn", 620);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 621);
this.get("host").removeColumn("modify");
   },

   /**
    * Remove the delete column from the DataTable
    *
    * @method removeDeleteColumn
    */
   removeDeleteColumn: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeDeleteColumn", 629);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 630);
this.get("host").removeColumn("delete");
   },


   generateId : function(size) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "generateId", 634);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 635);
var prefixId = this.get("prefixId"),
          s = size ? size : 5;
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 637);
prefixId = prefixId ? prefixId : "";
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 638);
return prefixId + Math.floor(Math.random()*Math.pow(10,s));
   },

   _addEditedClass: function (record) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_addEditedClass", 641);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 642);
var host = this.get('host');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 643);
if (record instanceof Y.Node) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 644);
record.addClass(host.getClassName('cell-edited'));
      }
      else {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 647);
host.getRow(record).addClass(host.getClassName('row-edited'));
      }
   },

   _removeEditedClass: function (record, now) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_removeEditedClass", 651);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 652);
Y.later(now === true ? 0 : (Y.Lang.isNumber(now) ? now : 5000), this, function () {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 12)", 652);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 653);
var host = this.get('host'), row;
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 654);
if (record instanceof Y.Node) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 655);
record.removeClass(host.getClassName('cell-edited'));
         }
         else {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 658);
row = host.getRow(record);
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 659);
if (row) {
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 660);
row.removeClass(host.getClassName('row-edited'));
            }
         }
      });
   },
   
   _initStrings : function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initStrings", 666);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 667);
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
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 807);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 808);
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
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 820);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 821);
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
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 833);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 834);
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
        "intl",
        "node-event-delegate",
        "inputex-group",
        "inputex-panel",
        "datatable",
        "overlay"
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
