YUI.add('node-menunav-improved', function (Y, NAME) {


var scrollbarWidth = null,
    getScrollbarWidth,
    NodeMenuNavImproved;


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
 * Y.Plugin.NodeMenuNavImproved is a subclass of Y.Plugin.NodeMenuNav which
 * display scroll bars on menu nodes taller than the viewport.
 */
NodeMenuNavImproved = function () {
   NodeMenuNavImproved.superclass.constructor.apply(this, arguments);
};

NodeMenuNavImproved.NAME = "nodeMenuNavImproved";
NodeMenuNavImproved.NS   = "menuNav";
NodeMenuNavImproved.ATTRS = {
   viewportPadding: {
      value: 10
   }
};

Y.extend(NodeMenuNavImproved, Y.Plugin.NodeMenuNav, {
   
   /***************************
   * 1. Viewport constraining
   ***************************/
   initializer: function () {
      this.constrained = this.get('host').hasClass('yui3-menu-constrained');
   },
   
   _showMenu: function (menu) {
      var host = this.get('host'),
          width;

      NodeMenuNavImproved.superclass._showMenu.call(this, menu);
      
      if (this.constrained) {
         this._onWindowResize(null, menu);
         Y.one('win').on('windowresize', this._onWindowResize, this, menu);
      }

      // Adjust the menu min-width to match the parent
      if (menu.ancestor('.yui3-menu').hasClass('yui3-menu-horizontal')) {
         width = host.get('region').width;
         menu.get('children').item(0).setStyle('minWidth', width - 2); // apply min width on first child
      }
   },

   _hideMenu: function (menu, activateAndFocusLabel) {
      
      if (this.constrained) {
         Y.one('win').detach('windowresize', this._onWindowResize);
         this.revertStyle(menu.one('.yui3-menu-content'));
      }
      
      NodeMenuNavImproved.superclass._hideMenu.call(this, menu, activateAndFocusLabel);
      
   },

   _onWindowResize: function (e, menu) {
      var viewportRegion  = Y.DOM.viewportRegion(),
          viewportHeight  = viewportRegion.height,
          viewportWidth   = viewportRegion.width,
          viewportPadding = this.get('viewportPadding'),
          menuContent     = menu.one('.yui3-menu-content'),
          menuRegion      = menuContent.get('region'),
          maxHeight       = viewportHeight - viewportPadding * 2,
          maxWidth        = viewportWidth  - viewportPadding * 2,
          menuWidth       = Math.min(menuRegion.width, maxWidth);

      if (menuRegion.height >= maxHeight) {
         menuWidth = Math.min(menuWidth + getScrollbarWidth(), maxWidth);
         menuContent.set('isConstrained', true);
         menuContent.setStyles({
            height: maxHeight,
            overflowY: 'scroll'
         });

         menu.setY(viewportRegion.bottom - viewportPadding - maxHeight);
      }
      else {
         // Reset style only if needed
         if (menuContent.get('isConstrained')) {
            menu.set('isConstrained', false);
            this.revertStyle(menuContent);

            NodeMenuNavImproved.superclass._showMenu.call(this, menu); // Just to reset height/width
         }

         // Readjust position if needed
         if (menuRegion.bottom - viewportRegion.top > viewportHeight - viewportPadding) {
            menu.setY(viewportRegion.bottom - viewportPadding - menuRegion.height);
         }
      }

      if (menuWidth !== menuRegion.width) {
         menuContent.setStyles({
            width: menuWidth + 'px'
         });
      }

      if (menuRegion.left < 0) {
         menu.setX(viewportPadding);
      }

      if (menuRegion.right > (viewportWidth - viewportPadding)) {
         menu.setX(viewportWidth - viewportPadding - menuWidth);
      }
   },

   revertStyle: function (menuContent) {
      // No need for scrollbars
      menuContent.setStyles({
         overflowY: 'visible',
         height: '',
         width: ''
      });
   },
   
   
   
   /***************************
   * 2. Fix submenu hiding
   ***************************/
   _onActiveDescendantChange: function () {
      /* a lot of stuff removed here... */
      return false;
   },
   
   _onMenuLabelMouseOut: function () {
      
      var menuNav = this,
          hoverTimer = menuNav._hoverTimer;
          
      if (hoverTimer) {
         hoverTimer.cancel();
      }
        
      menuNav._clearActiveItem();
      
      /* a lot of stuff removed here... */
   }

});

Y.namespace('Plugin');

Y.Plugin.NodeMenuNavImproved = NodeMenuNavImproved;

}, '@VERSION@', {"requires": ["event-resize", "node-menunav"]});
