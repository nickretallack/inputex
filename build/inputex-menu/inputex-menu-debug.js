YUI.add('inputex-menu', function (Y, NAME) {

/**
 * @module inputex-menu
 */
   var inputEx     = Y.inputEx,
       lang        = Y.Lang,
       create      = Y.Node.create,

       VERTICAL    = 'vertical',
       HORIZONTAL  = 'horizontal';

/**
 * Create a menu field
 * @class inputEx.MenuField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>typeInvite      : text to display when no selection made</li>
 *    <li>menuItems       : contains descriptions of menu items</li>
 *    <li>menuTrigger     : (optional, default: 'click') event to trigger menu show, ex: mouseover</li>
 *    <li>menuOrientation : (optional, default: 'vertical') menu orientation, ex: 'horizontal'</li>
 *    <li>menuConfig      : (optional) object used as a config for the MenuNav node plugin</li>
 *    <li>constrained     : (optional) boolean to specify if menu panels should be constrained to the viewport</li>
 * </ul>
 */
inputEx.MenuField = function(options) {
   inputEx.MenuField.superclass.constructor.call(this,options);
};

inputEx.MenuField.MENU_TEMPLATE =
   '<div class="yui3-menu" id="{menu_id}">' +
       '<div class="yui3-menu-content">' +
           '<ul>' +
               '{menu_items}' +
           '</ul>' +
       '</div>' +
   '</div>';

inputEx.MenuField.MENU_ITEM_TEMPLATE =
   '<li class="{item_class}">' +
      '<a href="{href}" class="{label_class}">{label}</a>' +
      '{submenu}' +
   '</li>';

Y.extend(inputEx.MenuField, inputEx.Field, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      inputEx.MenuField.superclass.setOptions.call(this,options);

      //I18N
      this.messages = Y.mix(this.messages, Y.Intl.get("inputex-menu"));

      // Overwrite options:
      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-MenuField';

      // New options
      this.options.typeInvite = options.typeInvite || this.messages.menuTypeInvite;
      this.options.menuTrigger = options.menuTrigger || "click";
      this.options.menuOrientation = options.menuOrientation || VERTICAL;
      this.options.menuItems = options.menuItems;
      this.options.constrained = options.constrained || false;

      // Configuration options for the generated YUI MenuNav node plugin
      this.options.menuConfig = options.menuConfig || {
         autoSubmenuDisplay: (this.options.menuTrigger === 'mouseover')
      };
   },

   /**
    * Build a menu
    * @method renderComponent
    */
   renderComponent: function() {
      // Keep selected value in a hidden field
      this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});
      this.fieldContainer.appendChild(this.hiddenEl);
      this.renderMenu(this.fieldContainer);
   },

   /**
    * Parse menuItems option to add ids, listeners, etc.
    * @method renderMenu
    */
   renderMenu: function(container) {

      // Keep corresponding text for each value selectable in the menu
      //   -> will be used to display selection after click
      this._textFromValue = {};
      this._valueFromHref = {};


      var that = this, a_tags,
      
      // This method returns template completed with data.
      renderMenuRecurs = function (parent_id, conf, level) {

         if (level>5) {
            throw new Error("MenuField : too much recursion, menuItems property should be 5 level deep at most.");
         }

         var html = '',
             length = conf.length,
             item,
             templateData,
             id,
             i;

         for (i = 0; i < length; i++) {
            item = conf[i];
            id = Y.guid();

            templateData = {
               label:         item.text,
               href:          '#' + id,
               submenu:       '',
               label_class:   'yui3-menuitem-content',
               item_class:    item.classname || ''
            };

            // item with submenu
            if (!lang.isUndefined(item.submenu)) {
               templateData.label_class = 'yui3-menu-label';
               templateData.submenu     = renderMenuRecurs(id, item.submenu.itemdata, level+1);
               templateData.item_class += ' yui3-submenu';
            } else {
               templateData.item_class += ' yui3-menuitem';
               that._textFromValue[item.value] = item.text;
               that._valueFromHref['#' + id] = item.value;
            }

            html += Y.Lang.sub(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData);
         }

         return Y.Lang.sub(inputEx.MenuField.MENU_TEMPLATE, {
            menu_id:    parent_id,
            menu_items: html
         });

      };


      if (!this.options.menuItems) {
         throw new Error("Missing 'menuItems' property in options");
      }

      this._menu = create(renderMenuRecurs(Y.guid(), [{
         text: this.options.typeInvite,
         submenu: {itemdata: this.options.menuItems}
      }], 0));

      // Add CSS classes to the first menu item (= button) to make it easier to style
      this._menu.one('.yui3-menu-content').addClass('yui3-menu-content-root');
      this._menu.one('.yui3-submenu').addClass('yui3-menu-button');
      this._menu.one('.yui3-menu-label').addClass('yui3-menu-button-label');

      if (Y.UA.ie === 7) {
         a_tags = this._menu.all('a');
         a_tags.each(function (a) {
            var href = a.get('href');
            a.set('href', '#' + href.split('#')[1]);
         });
      }
      
      if (this.options.menuOrientation === HORIZONTAL) {
         this._menu.addClass('yui3-menu-horizontal yui3-menubuttonnav');
      }

      if (this.options.constrained) {
         this._menu.addClass('yui3-menu-constrained');
      }
      
      // Retrieve the first label for later use
      this._rootItemLabel = Y.Node.create('<em class="placeholder"></em>').set('text', this.options.typeInvite);
      this._menu.one('.yui3-menu-label').setHTML(this._rootItemLabel);

      this._menu.plug(Y.Plugin.NodeMenuNavImproved, this.options.menuConfig);
      this._menu.appendTo(container);
   },

   /**
    * @method initEvents
    */
   initEvents: function() {
      this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');
   },

   /**
    * @method onItemClick
    */
   onItemClick: function(e) {
      var target = e.currentTarget,
          href;

      e.preventDefault();

      if (target.hasClass('yui3-menuitem-content')) {
         // Need to pass "2" as a second argument to "getAttribute" for
         // IE otherwise IE will return a fully qualified URL for the
         // value of the "href" attribute.
         // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
         href = target.getAttribute("href", 2);
         this.setValue(this._valueFromHref[href], true);

         // WARNING: hiding submenus via:
         //
         //       this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);
         //
         //    is not enough, because next call to _onDocFocus will try set the focus
         //    again on the _rootItemLabel, which will occur later when the doc gains
         //    focus.
         //
         // Instead we explicitely set the focus like this:
         this._menu.menuNav._hideAndFocusLabel();
         //
         // NOTE 1: keeping the focus on the label is useful to maintain accessibility,
         //         because the user can still navigate to the next field when hitting tab.
         //
         // NOTE 2: alternatively it's also possible to remove all focus, via this little trick:
         //
         //       this._menu.menuNav._onDocFocus({ target: document.body });
      }
   },
   
   /**
    * @method getValue
    */
   getValue: function() {
      return this.hiddenEl.value;
   },

   /**
    * @method setValue
    */
   setValue: function(value, sendUpdatedEvt) {
      var text = this._textFromValue[value];

      // update text
      if (text) {
         this._rootItemLabel.set('text', text);
         this._rootItemLabel.removeClass('placeholder');
      }
      else {
         this._rootItemLabel.set('text', this.options.typeInvite);
         this._rootItemLabel.addClass('placeholder');
      }

      // set value
      this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';
      inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);
   }

});

// Register this class as "menu" type
inputEx.registerType("menu", inputEx.MenuField);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "node-event-delegate",
        "node-menunav-improved"
    ],
    "skinnable": true,
    "ix_provides": "menu",
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
