
var scrollbarWidth = null,
    getScrollbarWidth;


getScrollbarWidth = function () {
   if (scrollbarWidth === null) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.width = scrollDiv.style.height = "100px";
      scrollDiv.style.overflow = "scroll";
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = scrollDiv.style.left = "0";
      scrollDiv.style.visibility = "hidden";
      document.body.appendChild(scrollDiv);

      scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

      document.body.removeChild(scrollDiv);
   }

   return scrollbarWidth;
};


/**
 * Y.Plugin.NodeConstrainedMenuNav is a subclass of Y.Plugin.NodeMenuNav which
 * display scroll bars on menu nodes taller than the viewport.
 */
NodeConstrainedMenuNav = function () {
   NodeConstrainedMenuNav.superclass.constructor.apply(this, arguments);
};

NodeConstrainedMenuNav.NAME = "nodeConstrainedMenuNav";
NodeConstrainedMenuNav.NS   = "menuNav";
NodeConstrainedMenuNav.ATTRS = {
   viewportPadding: {
      value: 20
   }
};

Y.extend(NodeConstrainedMenuNav, Y.Plugin.NodeMenuNav, {

   _showMenu: function (menu) {
      NodeConstrainedMenuNav.superclass._showMenu.call(this, menu);
      this._onWindowResize(null, menu);
      Y.one('win').on('windowresize', this._onWindowResize, this, menu);
   },

   _hideMenu: function (menu, activateAndFocusLabel) {
      Y.one('win').detach('windowresize', this._onWindowResize);
      this.revertStyle(menu.one('.yui3-menu-content'));
      NodeConstrainedMenuNav.superclass._hideMenu.call(this, menu, activateAndFocusLabel);
   },

   _onWindowResize: function (e, menu) {
      var viewportHeight  = Y.DOM.winHeight(),
          viewportPadding = this.get('viewportPadding'),
          menuContent     = menu.one('.yui3-menu-content'),
          menuRegion      = menuContent.get('region'),
          maxHeight       = viewportHeight - viewportPadding * 2;

      if (menuRegion.height >= maxHeight) {
         menuContent.set('isConstrained', true);

         menuContent.setStyles({
            height: maxHeight,
            overflowY: 'scroll',
            width: menuRegion.width + getScrollbarWidth() + 'px'
         });

         menu.setY(viewportHeight - viewportPadding - maxHeight);
      }
      else {
         // Reset style only if needed
         if (menuContent.get('isConstrained')) {
            menu.set('isConstrained', false);
            this.revertStyle(menuContent);

            NodeConstrainedMenuNav.superclass._showMenu.call(this, menu); // Just to reset height/width
         }

         // Readjust position if needed
         if (menuRegion.bottom > viewportHeight - viewportPadding) {
            menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));
         }
      }
   },

   revertStyle: function (menuContent) {
      // No need for scrollbars
      menuContent.setStyles({
         overflowY: 'visible',
         height: '',
         width: ''
      });
   }

});

Y.namespace('Plugin');

Y.Plugin.NodeConstrainedMenuNav = NodeConstrainedMenuNav;