YUI.add('inputex-ddlist', function (Y, NAME) {

/**
 * @module inputex-ddlist
 */
   var lang       = Y.Lang,
       inputEx    = Y.inputEx,
       create     = Y.Node.create,
       DDListField;

   /**
    * Create a sortable list field with drag and drop
    *
    * @class inputEx.DDListField
    * @extends inputEx.Field
    * @constructor
    * @param {Object} options Added options:
    * <ul>
    *    <li>items: list of option elements configurations</li>
    *    <li>name: hidden inputs name</li>
    *    <li>valueKey: value key</li>
    *    <li>labelKey: label key</li>
    * </ul>
    */
   DDListField = function (options) {
      DDListField.superclass.constructor.call(this, options);
   };

   DDListField.LIST_TEMPLATE = '<ul class="inputEx-ddlist">{items}</ul>';

   DDListField.LIST_ITEM_CLASS = 'inputEx-ddlist-item';

   DDListField.LIST_ITEM_TEMPLATE =
      '<li class="{class}">' +
         '<span class="inputEx-ddlist-item-label">{label}</span>' +
         '<input type="hidden" name="{name}" value="{value}" />' +
         '<button class="unselect" style="display: {removable}">x</button>'+
      '</li>';

   Y.extend(DDListField, inputEx.Field, {
      /**
       * @method setOptions
       */
      setOptions: function (options) {
         DDListField.superclass.setOptions.call(this, options);

         this.options.items    = lang.isArray(options.items) ? options.items : [];
         this.options.valueKey = options.valueKey || "value";
         this.options.labelKey = options.labelKey || "label";
         this.options.name     = options.name || Y.guid();
         this.options.removable = options.removable || false;

         if (this.options.name.substr(-2) !== '[]') {
            this.options.name += '[]';
         }
      },

      /**
       * @method renderComponent
       */
      renderComponent: function () {
         var html, ul;

         html = Y.Array.reduce(this.options.items, '', this.renderListItem, this);
         html = Y.Lang.sub(DDListField.LIST_TEMPLATE, {items: html});

         ul = create(html);
         ul.appendTo(this.fieldContainer);

         this.sortable = new Y.Sortable({
            container: ul,
            nodes:     '.' + DDListField.LIST_ITEM_CLASS,
            opacity:   '.1'
         });

         this.sortable.delegate.dd.on('drag:end', function(e) {
            this.fireUpdatedEvt();
         }, this);

      },

      /**
       * @method renderListItem
       */
      renderListItem: function (previousValue, currentValue) {
         var remove = this.options.removable ? '' : 'none';
         return previousValue + Y.Lang.sub(DDListField.LIST_ITEM_TEMPLATE, {
            'class': DDListField.LIST_ITEM_CLASS,
            'value': currentValue[this.options.valueKey],
            'label': currentValue[this.options.labelKey],
            'name':  this.options.name,
            'removable': remove
         });
      },

      /**
       * @method addItem
       */
      addItem: function (item) {
         var ul = this.sortable.get('container');
         var a = this.renderListItem('', item);
         var newLi = Y.Node.create(a);
         newLi.one('.unselect').on('click', this.removeItemCallback, this);
         ul.append(newLi);
         this.sortable.sync();
      },

      /**
       * @method removeItem
       */
      removeItem: function (item) {
         // TODO

         this.sortable.sync();
      },

      /**
       * @method removeItemCallback
       * @param event
       */
      removeItemCallback: function (event) {
         var wrapper = event.target.ancestor('li'), item;

         if (wrapper) {
            item = wrapper.one('input').getAttribute('value');
            wrapper.remove();
            this.fire('itemRemoved', item, this);
         }

         this.sortable.sync();
      },

      enable: function() {
         var ul = this.sortable.get('container');
         ul.all('.unselect').each(function (i) {
            i.show();
         });
         DDListField.superclass.enable.call(this);
      },

      disable: function() {
         var ul = this.sortable.get('container');
         ul.all('.unselect').each(function (i) {
            i.hide();
         });
         DDListField.superclass.disable.call(this);
      },

      /**
       * @method clear
       */
      clear: function () {
         var ul = this.sortable.get('container');

         ul.empty();

         this.sortable.sync();
      },

      /**
       * @method getValue
       */
      getValue: function () {
         return Y.one(this.fieldContainer)
            .all('.'+DDListField.LIST_ITEM_CLASS+' input')
            .get('value');
      },

      /**
       * Set the value of the DDList
       * @method setValue
       * @param {String} value The value to set
       * @param {boolean} [sendUpdatedEvt] Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
       */
      setValue: function (value, sendUpdatedEvt) {
         this.clear();

         if (Y.Array.test(value) === 1) {
            Y.Array.each(value, function(item) {
               this.addItem(item);
            }, this);
         } else {
            this.addItem(value);
         }

         // Call Field.setValue to set class and fire updated event
         DDListField.superclass.setValue.call(this, value, sendUpdatedEvt);
      }

   });

   inputEx.DDListField = DDListField;
   inputEx.registerType("ddlist", DDListField);


}, '@VERSION@', {"requires": ["inputex-field", "array-extras", "sortable"], "skinnable": true});
