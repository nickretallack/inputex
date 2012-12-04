YUI.add('node-constrained-menunav', function (Y, NAME) {


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
      NodeConstrainedMenuNav.superclass._hideMenu.call(this, menu, activateAndFocusLabel);
   },

   _onWindowResize: function (e, menu) {
      var viewportHeight  = Y.DOM.winHeight(),
          viewportPadding = this.get('viewportPadding'),
          menuContent     = menu.one('.yui3-menu-content'),
          menuRegion      = menuContent.get('region'),
          maxHeight       = viewportHeight - viewportPadding * 2;

      if (menu.get('offsetHeight') >= maxHeight) {
         // Only update width if the style hasn't been applied yet
         if (menuContent.getStyle('overflowY') !== 'scroll') {
            menu.setStyle('width', menuContent.get('offsetWidth') + getScrollbarWidth());
         }

         menuContent.setStyles({
            height: maxHeight,
            overflowY: 'scroll'
         });

         menu.setStyle('height', maxHeight);
         menu.setY(viewportHeight - viewportPadding - maxHeight);
      }
      else {
         // No need for scrollbars
         menuContent.setStyles({
            overflowY: 'visible',
            height: ''
         });

         menu.setStyles({height: '', width: ''});

         NodeConstrainedMenuNav.superclass._showMenu.call(this, menu); // Just to reset height/width

         // Readjust position if needed
         if (menuRegion.bottom > viewportHeight - viewportPadding) {
            menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));
         }
      }
   }

});

Y.namespace('Plugin');

Y.Plugin.NodeConstrainedMenuNav = NodeConstrainedMenuNav;

}, '@VERSION@', {"requires": ["event-resize", "node-menunav"]});
