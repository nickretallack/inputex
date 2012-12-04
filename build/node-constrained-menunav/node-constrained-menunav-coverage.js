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
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/node-constrained-menunav/node-constrained-menunav.js",
    code: []
};
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].code=["YUI.add('node-constrained-menunav', function (Y, NAME) {","","","var scrollbarWidth = null,","    getScrollbarWidth;","","","getScrollbarWidth = function () {","   if (scrollbarWidth === null) {","      var scrollDiv = document.createElement(\"div\");","      scrollDiv.style.width = scrollDiv.style.height = \"100px\";","      scrollDiv.style.overflow = \"scroll\";","      scrollDiv.style.position = \"absolute\";","      scrollDiv.style.top = scrollDiv.style.left = \"0\";","      scrollDiv.style.visibility = \"hidden\";","      document.body.appendChild(scrollDiv);","","      scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;","","      document.body.removeChild(scrollDiv);","   }","","   return scrollbarWidth;","};","","","/**"," * Y.Plugin.NodeConstrainedMenuNav is a subclass of Y.Plugin.NodeMenuNav which"," * display scroll bars on menu nodes taller than the viewport."," */","NodeConstrainedMenuNav = function () {","   NodeConstrainedMenuNav.superclass.constructor.apply(this, arguments);","};","","NodeConstrainedMenuNav.NAME = \"nodeConstrainedMenuNav\";","NodeConstrainedMenuNav.NS   = \"menuNav\";","NodeConstrainedMenuNav.ATTRS = {","   viewportPadding: {","      value: 20","   }","};","","Y.extend(NodeConstrainedMenuNav, Y.Plugin.NodeMenuNav, {","","   _showMenu: function (menu) {","      NodeConstrainedMenuNav.superclass._showMenu.call(this, menu);","      this._onWindowResize(null, menu);","      Y.one('win').on('windowresize', this._onWindowResize, this, menu);","   },","","   _hideMenu: function (menu, activateAndFocusLabel) {","      Y.one('win').detach('windowresize', this._onWindowResize);","      this.revertStyle(menu.one('.yui3-menu-content'));","      NodeConstrainedMenuNav.superclass._hideMenu.call(this, menu, activateAndFocusLabel);","   },","","   _onWindowResize: function (e, menu) {","      var viewportHeight  = Y.DOM.winHeight(),","          viewportPadding = this.get('viewportPadding'),","          menuContent     = menu.one('.yui3-menu-content'),","          menuRegion      = menuContent.get('region'),","          maxHeight       = viewportHeight - viewportPadding * 2;","","      if (menuRegion.height >= maxHeight) {","         menuContent.set('isConstrained', true);","","         menuContent.setStyles({","            height: maxHeight,","            overflowY: 'scroll',","            width: menuRegion.width + getScrollbarWidth() + 'px'","         });","","         menu.setY(viewportHeight - viewportPadding - maxHeight);","      }","      else {","         // Reset style only if needed","         if (menuContent.get('isConstrained')) {","            menu.set('isConstrained', false);","            this.revertStyle(menuContent);","","            NodeConstrainedMenuNav.superclass._showMenu.call(this, menu); // Just to reset height/width","         }","","         // Readjust position if needed","         if (menuRegion.bottom > viewportHeight - viewportPadding) {","            menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));","         }","      }","   },","","   revertStyle: function (menuContent) {","      // No need for scrollbars","      menuContent.setStyles({","         overflowY: 'visible',","         height: '',","         width: ''","      });","   }","","});","","Y.namespace('Plugin');","","Y.Plugin.NodeConstrainedMenuNav = NodeConstrainedMenuNav;","","}, '@VERSION@', {\"requires\": [\"event-resize\", \"node-menunav\"]});"];
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].lines = {"1":0,"4":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"18":0,"20":0,"23":0,"31":0,"32":0,"35":0,"36":0,"37":0,"43":0,"46":0,"47":0,"48":0,"52":0,"53":0,"54":0,"58":0,"64":0,"65":0,"67":0,"73":0,"77":0,"78":0,"79":0,"81":0,"85":0,"86":0,"93":0,"102":0,"104":0};
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].functions = {"getScrollbarWidth:8":0,"NodeConstrainedMenuNav:31":0,"_showMenu:45":0,"_hideMenu:51":0,"_onWindowResize:57":0,"revertStyle:91":0,"(anonymous 1):1":0};
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].coveredLines = 40;
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].coveredFunctions = 7;
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 1);
YUI.add('node-constrained-menunav', function (Y, NAME) {


_yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "(anonymous 1)", 1);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 4);
var scrollbarWidth = null,
    getScrollbarWidth;


_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 8);
getScrollbarWidth = function () {
   _yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "getScrollbarWidth", 8);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 9);
if (scrollbarWidth === null) {
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 10);
var scrollDiv = document.createElement("div");
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 11);
scrollDiv.style.width = scrollDiv.style.height = "100px";
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 12);
scrollDiv.style.overflow = "scroll";
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 13);
scrollDiv.style.position = "absolute";
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 14);
scrollDiv.style.top = scrollDiv.style.left = "0";
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 15);
scrollDiv.style.visibility = "hidden";
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 16);
document.body.appendChild(scrollDiv);

      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 18);
scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 20);
document.body.removeChild(scrollDiv);
   }

   _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 23);
return scrollbarWidth;
};


/**
 * Y.Plugin.NodeConstrainedMenuNav is a subclass of Y.Plugin.NodeMenuNav which
 * display scroll bars on menu nodes taller than the viewport.
 */
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 31);
NodeConstrainedMenuNav = function () {
   _yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "NodeConstrainedMenuNav", 31);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 32);
NodeConstrainedMenuNav.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 35);
NodeConstrainedMenuNav.NAME = "nodeConstrainedMenuNav";
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 36);
NodeConstrainedMenuNav.NS   = "menuNav";
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 37);
NodeConstrainedMenuNav.ATTRS = {
   viewportPadding: {
      value: 20
   }
};

_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 43);
Y.extend(NodeConstrainedMenuNav, Y.Plugin.NodeMenuNav, {

   _showMenu: function (menu) {
      _yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "_showMenu", 45);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 46);
NodeConstrainedMenuNav.superclass._showMenu.call(this, menu);
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 47);
this._onWindowResize(null, menu);
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 48);
Y.one('win').on('windowresize', this._onWindowResize, this, menu);
   },

   _hideMenu: function (menu, activateAndFocusLabel) {
      _yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "_hideMenu", 51);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 52);
Y.one('win').detach('windowresize', this._onWindowResize);
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 53);
this.revertStyle(menu.one('.yui3-menu-content'));
      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 54);
NodeConstrainedMenuNav.superclass._hideMenu.call(this, menu, activateAndFocusLabel);
   },

   _onWindowResize: function (e, menu) {
      _yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "_onWindowResize", 57);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 58);
var viewportHeight  = Y.DOM.winHeight(),
          viewportPadding = this.get('viewportPadding'),
          menuContent     = menu.one('.yui3-menu-content'),
          menuRegion      = menuContent.get('region'),
          maxHeight       = viewportHeight - viewportPadding * 2;

      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 64);
if (menuRegion.height >= maxHeight) {
         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 65);
menuContent.set('isConstrained', true);

         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 67);
menuContent.setStyles({
            height: maxHeight,
            overflowY: 'scroll',
            width: menuRegion.width + getScrollbarWidth() + 'px'
         });

         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 73);
menu.setY(viewportHeight - viewportPadding - maxHeight);
      }
      else {
         // Reset style only if needed
         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 77);
if (menuContent.get('isConstrained')) {
            _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 78);
menu.set('isConstrained', false);
            _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 79);
this.revertStyle(menuContent);

            _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 81);
NodeConstrainedMenuNav.superclass._showMenu.call(this, menu); // Just to reset height/width
         }

         // Readjust position if needed
         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 85);
if (menuRegion.bottom > viewportHeight - viewportPadding) {
            _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 86);
menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));
         }
      }
   },

   revertStyle: function (menuContent) {
      // No need for scrollbars
      _yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "revertStyle", 91);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 93);
menuContent.setStyles({
         overflowY: 'visible',
         height: '',
         width: ''
      });
   }

});

_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 102);
Y.namespace('Plugin');

_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 104);
Y.Plugin.NodeConstrainedMenuNav = NodeConstrainedMenuNav;

}, '@VERSION@', {"requires": ["event-resize", "node-menunav"]});
