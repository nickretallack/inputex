YUI.add('inputex-datatable', function (Y, NAME) {

/*global confirm:true*/

/**
 * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin.
 * @module inputex-datatable
 */

var inputEx = Y.inputEx;

Y.namespace('inputEx.Plugin');

/**
* Provide add/modify/delete functionalities on a dataTable as a plugin
* @class inputEx.Plugin.InputExDataTable
* @extends Plugin.Base
* @constructor
* @param {Object} configuration object
*/
inputEx.Plugin.InputExDataTable = function (config) {
   inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);
};

inputEx.Plugin.InputExDataTable.NS = "InputExDataTable";

Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {
   
   /**
    * @method initializer
    */
   initializer: function () {

      var host = this.get("host");

      // enrich data (Model instance) with modify and delete attributs
      this.enrichData();
      
      // enrich DataTable with modify and delete columns
      this.enrichColumns();

      // add a button called "add" in order to add record in the DataTable
      if (host.get('render')) {
         this.addAddButton();
      }
      else {
         host.onceAfter('render', function () {
            this.addAddButton();
         }, this);
      }

      host.get("boundingBox").addClass(host.getClassName('inputex'));
        
      if(!this.get("disableModifyFunc")) {
         // handle row modification
         host.delegate("click",this.modifyRecord, "td."+host.getClassName('cell-modify'), this);
      }

      if(!this.get("disableDeleteFunc")) {
         // handle row removal
         host.delegate("click",this.deleteRecord, "td."+host.getClassName('cell-delete'), this);
      }
      

      if(this.get("inplaceedit")) {
         host.get('contentBox').addClass( host.getClassName('inplaceedit') );
         this.setupInplaceEditing();
      }

    },


   setupInplaceEditing: function() {
      var host = this.get('host');

      // Delegate click event to make the inplace editor appear
      this.cellClickHandler = host.delegate("click", this.onCellClick, "."+host.getClassName('cell'), this);

      this.after('editorShow', this._onEditorShow, this);
   },

   _onEditorShow: function() {
      this.get('inplaceOverlay').show();
      this.docKeyListener = Y.one('document').once('key', Y.bind(this.onOverlayCancel, this), 'esc');
   },

   onCellClick: function(e) {

      var findTd = function(n) { return n.get('tagName') === 'TD' && n.hasClass('yui3-datatable-cell'); },
          td = findTd(e.target) ? e.target : e.target.ancestor(findTd), // this might be a DIV because of a formatter (see color)
          host = this.get('host'),
          colIndex = td.get('parentNode').get('children').indexOf(td),
          column = host.getColumn(colIndex),
          record = host.getRecord(td),
          key = column.key,
          value = record.get(key),

          overlay = this.get('inplaceOverlay'),

          // inputEx Field config
          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { return i.name === key; }),
          conf = Y.mix({
            parentEl: this.overlayFieldContainer.getDOMNode()
          }, fieldConf),
          field;

      // When we changed the value of an overlay but click on another cell, it doesn't save automatically
      // since the event is stopped. So we do it manually here.
      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision
      if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
         this.onOverlaySave();
      }

      if( !fieldConf ||
          fieldConf.type === "uneditable" ||
          td.hasClass('yui3-datatable-cell-delete') ||
          td.hasClass('yui3-datatable-cell-modify') ) {
         return;
      }

      e.stopPropagation();

      // Align
      overlay.align(td, ["tl", "tl"]);

      // Render field
      this.overlayFieldContainer.set('innerHTML', '');
      field = new Y.inputEx(conf);
      field.setValue(value);
      
      // Timeout to make the focus work on inplaceEdit
      setTimeout(function(){
         field.focus();
      }, 20);

      this._inplaceeditCell = {
         record: record,
         key: column.key,
         field: field,
         td: td
      };

      // TODO: fire an event editorShow
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

      var o = new Y.Overlay({
            zIndex: 5
          }),
          contentBox = o.get('contentBox'),
          overlayFieldContainer = Y.Node.create("<div />"),
          overlayButtonsContainer = Y.Node.create("<div class='editor-buttons' />"),
          saveButton,
          cancelButton;

      contentBox.appendChild(overlayFieldContainer);
      this.overlayFieldContainer = overlayFieldContainer;

      contentBox.appendChild(overlayButtonsContainer);

      // Overlay save and cancel buttons
      saveButton = Y.Node.create('<button>'+this.get("strings").saveText+'</button>');
      overlayButtonsContainer.appendChild(saveButton);

      saveButton.addClass('yui3-button');
      saveButton.addClass('yui3-button-primary');

      cancelButton = Y.Node.create('<button>'+this.get("strings").cancelText+'</button>');

      cancelButton.addClass('yui3-button');
      cancelButton.addClass('yui3-button-link');


      overlayButtonsContainer.appendChild(cancelButton);
      saveButton.on('mousedown', this.onOverlaySave, this);
      cancelButton.on('mousedown', this.onOverlayCancel, this);

      // Close overlay if click outside of the overlay
      this.docClickHandler = Y.on('click', Y.bind(function(e) {
         var overlay = this.get('inplaceOverlay');

         if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
            this.onOverlaySave();
         }
      }, this), Y.config.doc);

      contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));

      o.hide();
      o.render();
      return o;
   },

   onOverlaySave: function() {

      // Call the updateMethod async method
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

      if(!field.validate()) {
         return;
      }

      // has not changed => don't do anything
      if ((Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime()) ||
          (newValue === oldValue)) {
         this.onOverlayCancel();
         return;
      }

      fieldValues[key] = newValue;

      this._addEditedClass(td);

      updateMethod.call(this, id, fieldValues, Y.bind(function(success) {
         if (success) {
            // on success, update the record in the datatable
            host.get("data").getById(id).setAttrs(fieldValues);
         }
         this._removeEditedClass(td, success);
      },this));

      this.onOverlayCancel();
   },

   onOverlayCancel: function() {
      this.get('inplaceOverlay').hide();
      this.docKeyListener.detach();
   },

   /**
    * add Attributes on the data model depending on the plugin configuration
    *
    * @method enrichData
    */
   enrichData: function () {

      var that = this,
          data = this.get("host").get("data");

      data.each(function (model) {
         if(!this.get("disableModifyFunc")) {
            that.addModifyAttr(model);
         }
         if(!this.get("disableDeleteFunc")){
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

      if(!this.get("disableModifyFunc")) {
         this.addModifyColumn();
      }
      
      if(!this.get("disableDeleteFunc")) {
         this.addDeleteColumn();
      }
   },

   /**
    * Provide the add button in order to add record on the DataTable
    *
    * @method addAddButton
    */
   addAddButton: function() {

      if(!this.get("disableAddFunc")) {
      
         var buttonHtml = "<button class='yui3-button'>"+this.get("strings").addButtonText+"</button>",
             host = this.get("host");

         this.addButtonTop    = Y.Node.create(buttonHtml);
         this.addButtonBottom = Y.Node.create(buttonHtml);

         this.addButtonTop.addClass(host.getClassName('add-button-top'));
         this.addButtonBottom.addClass(host.getClassName('add-button-bottom'));

         this.get("host").get("contentBox").prepend(this.addButtonTop);
         this.get("host").get("contentBox").append(this.addButtonBottom);
         
         this.addButtonTop.on("click",    this._onAddButtonClick, this);
         this.addButtonBottom.on("click", this._onAddButtonClick, this);
      }
   
   },

   _onAddButtonClick: function (e) {
      var panel = this.get("panel");

      e.stopPropagation();

      panel.set("headerContent",this.get("strings").addItemHeader);
      panel.get("field").clear();
      panel.show();
   },

   /**
    *
    * @method modifyRecord
    */
   modifyRecord: function(e) {
      
      e.halt();
      
      var record = this.get("host").getRecord(e.currentTarget),
          panel = this.get("panel");

      panel.set("headerContent",this.get("strings").modifyItemHeader);
      panel.get('field').setValue(record.getAttrs());
      panel.show();
   },

   /**
    * Called when the user clicked on a link to delete a record
    * @method deleteRecord
    */
   deleteRecord: function(e) {
      
      e.halt();

      var deleteMethod,
          host = this.get('host'),
          record = host.getRecord(e.currentTarget);

      if (!this.get("confirmDelete") || confirm(this.get("strings").confirmDeletion)) {

         // Call the deleteMethod async method
         deleteMethod = this.get('deleteMethod');

         this._addEditedClass(record);

         deleteMethod.call(this, record, Y.bind(function(success) {
            if (success) {
               // on success, remove the record from the datatable
               host.get("data").remove(record);
            }
            this._removeEditedClass(record, success);
         },this));

      }
   },

   /**
    *
    * @method deleteExtraColumns
    */
   deleteExtraColumns: function() {
      
      if(!this.get("disableModifyFunc")) {
         this.removeModifyColumn();
      }
      if(!this.get("disableDeleteFunc")) {
         this.removeDeleteColumn();
      }
   },

   /**
    *
    * @method _initPanel
    * @private
    */
   _initPanel: function () {

      var opts = Y.mix({}, this.get('panelOptions') ), panel;

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
      panel.render();
      return panel;
   },

   onPanelCancelButton: function (e) {
      e.preventDefault();
      this.get('panel').hide();
   },

   onPanelSaveButton: function (e) {
      e.preventDefault();

      var field = this.get("panel").get("field"),
         fieldValues = field.getValue(),
         host = this.get("host"),
         record,
         RecordType,
         updateMethod,
         addMethod;
      
      if (!field.validate()) {
         return;
      }
      
      // Disable save button
      this.disableSaveButton(true);
      
      // Modification
      if (fieldValues.id) {

         // Call the updateMethod async method
         updateMethod = this.get('updateMethod');

         record = host.get("data").getById(fieldValues.id);
         this._addEditedClass(record);

         updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {
            if (success) {
               
               // on success, update the record in the datatable
               host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
               this.get('panel').hide();
            }
            
            // Enable save button
            this.disableSaveButton(false);
            
            this._removeEditedClass(record, success);
            
         },this));

      }
      // Creation
      else {

         fieldValues.id = this.generateId(this.get("idSize"));
         RecordType = host.get("recordType");
         record = new RecordType();
         record.setAttrs(fieldValues);
         this.addModifyAttr(record);
         this.addDeleteAttr(record);

         // call the async method to create a record
         addMethod = this.get('addMethod');
         addMethod.call(this, record, Y.bind(function(success) {
            if (success) {
               
               // if success, add the record in the datatable
               host.get("data").add(record);
               this.get('panel').hide();
            }
            
            // Enable save button
            this.disableSaveButton(false);
            
         },this));

      }

   },
   
   disableSaveButton : function(bool) {
      var button = this.get('panel').getButton('panelSave');
      button.set('disabled', bool);
   },
   
   /**
    *
    * @method destructor
    */
   destructor: function() {

      var that = this,
          host = this.get('host'),
          data = host.get("data");

      data.each(function (model) {

         if(!this.get("disableModifyFunc")) {
            that.delModifyAttr(model);
         }
         if(!this.get("disableDeleteFunc")) {
            that.delDeleteAttr(model);
         }

      });
      
      this.deleteExtraColumns();
      
      if(!this.get("disableAddFunc")) {
         this.addButtonTop.remove();
         this.addButtonBottom.remove();
      }

      if(this.get("inplaceedit")) {
         host.get('contentBox').removeClass( host.getClassName('inplaceedit') );
         this.cellClickHandler.detach();

         if (this.docClickHandler) {
            this.docClickHandler.detach();
         }
      }

      this.get("panel").destroy();
   },


   /**
    * Add the modify attribute on the data model
    *
    * @method addModifyAttr
    */
   addModifyAttr: function(model) {
      model.addAttr("modify");
   },

   /**
    * Add the delete attribute on the data model
    *
    * @method addDeleteAttr
    */
   addDeleteAttr: function (model) {
      model.addAttr("delete");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delModifyAttr
    */
   delModifyAttr: function(model) {
      model.removeAttr("modify");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delDeleteAttr
    */
   delDeleteAttr: function (model) {
      model.removeAttr("delete");
   },

   /**
    * Add the modify column on the DataTable
    *
    * @method addModifyColumn
    */
   addModifyColumn: function() {

      var host = this.get('host');
         
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
      
      var host = this.get('host');
         
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
      this.get("host").removeColumn("modify");
   },

   /**
    * Remove the delete column from the DataTable
    *
    * @method removeDeleteColumn
    */
   removeDeleteColumn: function() {
      this.get("host").removeColumn("delete");
   },


   generateId : function(size) {
      var prefixId = this.get("prefixId"),
          s = size ? size : 5;
      prefixId = prefixId ? prefixId : "";
      return prefixId + Math.floor(Math.random()*Math.pow(10,s));
   },

   _addEditedClass: function (record) {
      var host = this.get('host');
      if (record instanceof Y.Node) {
         record.addClass(host.getClassName('cell-edited'));
      }
      else {
         host.getRow(record).addClass(host.getClassName('row-edited'));
      }
   },

   _removeEditedClass: function (record, now) {
      Y.later(now === true ? 0 : (Y.Lang.isNumber(now) ? now : 5000), this, function () {
         var host = this.get('host'), row;
         if (record instanceof Y.Node) {
            record.removeClass(host.getClassName('cell-edited'));
         }
         else {
            row = host.getRow(record);
            if (row) {
               row.removeClass(host.getClassName('row-edited'));
            }
         }
      });
   },
   
   _initStrings : function() {
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
