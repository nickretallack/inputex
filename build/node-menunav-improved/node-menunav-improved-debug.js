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
      value: 20
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
      
      NodeMenuNavImproved.superclass._showMenu.call(this, menu);
      
      if (this.constrained) {
         this._onWindowResize(null, menu);
         Y.one('win').on('windowresize', this._onWindowResize, this, menu);
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

            NodeMenuNavImproved.superclass._showMenu.call(this, menu); // Just to reset height/width
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
