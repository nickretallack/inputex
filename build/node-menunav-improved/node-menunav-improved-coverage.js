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
_yuitest_coverage["build/node-menunav-improved/node-menunav-improved.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/node-menunav-improved/node-menunav-improved.js",
    code: []
};
_yuitest_coverage["build/node-menunav-improved/node-menunav-improved.js"].code=["YUI.add('node-menunav-improved', function (Y, NAME) {","","","var scrollbarWidth = null,","    getScrollbarWidth,","    NodeMenuNavImproved;","","","getScrollbarWidth = function () {","   if (scrollbarWidth === null) {","      var scrollDiv = document.createElement(\"div\");","      scrollDiv.style.width = scrollDiv.style.height = \"100px\";","      scrollDiv.style.overflow = \"scroll\";","      scrollDiv.style.position = \"absolute\";","      scrollDiv.style.top = scrollDiv.style.left = \"0\";","      scrollDiv.style.visibility = \"hidden\";","      document.body.appendChild(scrollDiv);","","      scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;","","      document.body.removeChild(scrollDiv);","   }","","   return scrollbarWidth;","};","","","/**"," * Y.Plugin.NodeMenuNavImproved is a subclass of Y.Plugin.NodeMenuNav which"," * display scroll bars on menu nodes taller than the viewport."," */","NodeMenuNavImproved = function () {","   NodeMenuNavImproved.superclass.constructor.apply(this, arguments);","};","","NodeMenuNavImproved.NAME = \"nodeMenuNavImproved\";","NodeMenuNavImproved.NS   = \"menuNav\";","NodeMenuNavImproved.ATTRS = {","   viewportPadding: {","      value: 20","   }","};","","Y.extend(NodeMenuNavImproved, Y.Plugin.NodeMenuNav, {","   ","   /***************************","   * 1. Viewport constraining","   ***************************/","   initializer: function () {","      this.constrained = this.get('host').hasClass('yui3-menu-constrained');","   },","   ","   _showMenu: function (menu) {","      ","      NodeMenuNavImproved.superclass._showMenu.call(this, menu);","      ","      if (this.constrained) {","         this._onWindowResize(null, menu);","         Y.one('win').on('windowresize', this._onWindowResize, this, menu);","      }","   },","","   _hideMenu: function (menu, activateAndFocusLabel) {","      ","      if (this.constrained) {","         Y.one('win').detach('windowresize', this._onWindowResize);","         this.revertStyle(menu.one('.yui3-menu-content'));","      }","      ","      NodeMenuNavImproved.superclass._hideMenu.call(this, menu, activateAndFocusLabel);","      ","   },","","   _onWindowResize: function (e, menu) {","      var viewportHeight  = Y.DOM.winHeight(),","          viewportPadding = this.get('viewportPadding'),","          menuContent     = menu.one('.yui3-menu-content'),","          menuRegion      = menuContent.get('region'),","          maxHeight       = viewportHeight - viewportPadding * 2;","","      if (menuRegion.height >= maxHeight) {","         menuContent.set('isConstrained', true);","","         menuContent.setStyles({","            height: maxHeight,","            overflowY: 'scroll',","            width: menuRegion.width + getScrollbarWidth() + 'px'","         });","","         menu.setY(viewportHeight - viewportPadding - maxHeight);","      }","      else {","         // Reset style only if needed","         if (menuContent.get('isConstrained')) {","            menu.set('isConstrained', false);","            this.revertStyle(menuContent);","","            NodeMenuNavImproved.superclass._showMenu.call(this, menu); // Just to reset height/width","         }","","         // Readjust position if needed","         if (menuRegion.bottom > viewportHeight - viewportPadding) {","            menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));","         }","      }","   },","","   revertStyle: function (menuContent) {","      // No need for scrollbars","      menuContent.setStyles({","         overflowY: 'visible',","         height: '',","         width: ''","      });","   },","   ","   ","   ","   /***************************","   * 2. Fix submenu hiding","   ***************************/","   _onActiveDescendantChange: function () {","      /* a lot of stuff removed here... */","      return false;","   },","   ","   _onMenuLabelMouseOut: function () {","      ","      var menuNav = this,","          hoverTimer = menuNav._hoverTimer;","          ","      if (hoverTimer) {","         hoverTimer.cancel();","      }","        ","      menuNav._clearActiveItem();","      ","      /* a lot of stuff removed here... */","   }","","});","","Y.namespace('Plugin');","","Y.Plugin.NodeMenuNavImproved = NodeMenuNavImproved;","","}, '@VERSION@', {\"requires\": [\"event-resize\", \"node-menunav\"]});"];
_yuitest_coverage["build/node-menunav-improved/node-menunav-improved.js"].lines = {"1":0,"4":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"19":0,"21":0,"24":0,"32":0,"33":0,"36":0,"37":0,"38":0,"44":0,"50":0,"55":0,"57":0,"58":0,"59":0,"65":0,"66":0,"67":0,"70":0,"75":0,"81":0,"82":0,"84":0,"90":0,"94":0,"95":0,"96":0,"98":0,"102":0,"103":0,"110":0,"124":0,"129":0,"132":0,"133":0,"136":0,"143":0,"145":0};
_yuitest_coverage["build/node-menunav-improved/node-menunav-improved.js"].functions = {"getScrollbarWidth:9":0,"NodeMenuNavImproved:32":0,"initializer:49":0,"_showMenu:53":0,"_hideMenu:63":0,"_onWindowResize:74":0,"revertStyle:108":0,"_onActiveDescendantChange:122":0,"_onMenuLabelMouseOut:127":0,"(anonymous 1):1":0};
_yuitest_coverage["build/node-menunav-improved/node-menunav-improved.js"].coveredLines = 48;
_yuitest_coverage["build/node-menunav-improved/node-menunav-improved.js"].coveredFunctions = 10;
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 1);
YUI.add('node-menunav-improved', function (Y, NAME) {


_yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "(anonymous 1)", 1);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 4);
var scrollbarWidth = null,
    getScrollbarWidth,
    NodeMenuNavImproved;


_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 9);
getScrollbarWidth = function () {
   _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "getScrollbarWidth", 9);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 10);
if (scrollbarWidth === null) {
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 11);
var scrollDiv = document.createElement("div");
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 12);
scrollDiv.style.width = scrollDiv.style.height = "100px";
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 13);
scrollDiv.style.overflow = "scroll";
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 14);
scrollDiv.style.position = "absolute";
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 15);
scrollDiv.style.top = scrollDiv.style.left = "0";
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 16);
scrollDiv.style.visibility = "hidden";
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 17);
document.body.appendChild(scrollDiv);

      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 19);
scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 21);
document.body.removeChild(scrollDiv);
   }

   _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 24);
return scrollbarWidth;
};


/**
 * Y.Plugin.NodeMenuNavImproved is a subclass of Y.Plugin.NodeMenuNav which
 * display scroll bars on menu nodes taller than the viewport.
 */
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 32);
NodeMenuNavImproved = function () {
   _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "NodeMenuNavImproved", 32);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 33);
NodeMenuNavImproved.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 36);
NodeMenuNavImproved.NAME = "nodeMenuNavImproved";
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 37);
NodeMenuNavImproved.NS   = "menuNav";
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 38);
NodeMenuNavImproved.ATTRS = {
   viewportPadding: {
      value: 20
   }
};

_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 44);
Y.extend(NodeMenuNavImproved, Y.Plugin.NodeMenuNav, {
   
   /***************************
   * 1. Viewport constraining
   ***************************/
   initializer: function () {
      _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "initializer", 49);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 50);
this.constrained = this.get('host').hasClass('yui3-menu-constrained');
   },
   
   _showMenu: function (menu) {
      
      _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "_showMenu", 53);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 55);
NodeMenuNavImproved.superclass._showMenu.call(this, menu);
      
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 57);
if (this.constrained) {
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 58);
this._onWindowResize(null, menu);
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 59);
Y.one('win').on('windowresize', this._onWindowResize, this, menu);
      }
   },

   _hideMenu: function (menu, activateAndFocusLabel) {
      
      _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "_hideMenu", 63);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 65);
if (this.constrained) {
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 66);
Y.one('win').detach('windowresize', this._onWindowResize);
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 67);
this.revertStyle(menu.one('.yui3-menu-content'));
      }
      
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 70);
NodeMenuNavImproved.superclass._hideMenu.call(this, menu, activateAndFocusLabel);
      
   },

   _onWindowResize: function (e, menu) {
      _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "_onWindowResize", 74);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 75);
var viewportHeight  = Y.DOM.winHeight(),
          viewportPadding = this.get('viewportPadding'),
          menuContent     = menu.one('.yui3-menu-content'),
          menuRegion      = menuContent.get('region'),
          maxHeight       = viewportHeight - viewportPadding * 2;

      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 81);
if (menuRegion.height >= maxHeight) {
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 82);
menuContent.set('isConstrained', true);

         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 84);
menuContent.setStyles({
            height: maxHeight,
            overflowY: 'scroll',
            width: menuRegion.width + getScrollbarWidth() + 'px'
         });

         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 90);
menu.setY(viewportHeight - viewportPadding - maxHeight);
      }
      else {
         // Reset style only if needed
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 94);
if (menuContent.get('isConstrained')) {
            _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 95);
menu.set('isConstrained', false);
            _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 96);
this.revertStyle(menuContent);

            _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 98);
NodeMenuNavImproved.superclass._showMenu.call(this, menu); // Just to reset height/width
         }

         // Readjust position if needed
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 102);
if (menuRegion.bottom > viewportHeight - viewportPadding) {
            _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 103);
menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));
         }
      }
   },

   revertStyle: function (menuContent) {
      // No need for scrollbars
      _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "revertStyle", 108);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 110);
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
      _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "_onActiveDescendantChange", 122);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 124);
return false;
   },
   
   _onMenuLabelMouseOut: function () {
      
      _yuitest_coverfunc("build/node-menunav-improved/node-menunav-improved.js", "_onMenuLabelMouseOut", 127);
_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 129);
var menuNav = this,
          hoverTimer = menuNav._hoverTimer;
          
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 132);
if (hoverTimer) {
         _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 133);
hoverTimer.cancel();
      }
        
      _yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 136);
menuNav._clearActiveItem();
      
      /* a lot of stuff removed here... */
   }

});

_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 143);
Y.namespace('Plugin');

_yuitest_coverline("build/node-menunav-improved/node-menunav-improved.js", 145);
Y.Plugin.NodeMenuNavImproved = NodeMenuNavImproved;

}, '@VERSION@', {"requires": ["event-resize", "node-menunav"]});
