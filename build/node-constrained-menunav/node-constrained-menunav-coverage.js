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
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].code=["YUI.add('node-constrained-menunav', function (Y, NAME) {","","","var scrollbarWidth = null,","    getScrollbarWidth;","","","getScrollbarWidth = function () {","   if (scrollbarWidth === null) {","      var scrollDiv = document.createElement(\"div\");","      scrollDiv.style.width = scrollDiv.style.height = \"100px\";","      scrollDiv.style.overflow = \"scroll\";","      scrollDiv.style.position = \"absolute\";","      scrollDiv.style.top = scrollDiv.style.left = \"0\";","      scrollDiv.style.visibility = \"hidden\";","      document.body.appendChild(scrollDiv);","","      scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;","","      document.body.removeChild(scrollDiv);","   }","","   return scrollbarWidth;","};","","","/**"," * Y.Plugin.NodeConstrainedMenuNav is a subclass of Y.Plugin.NodeMenuNav which"," * display scroll bars on menu nodes taller than the viewport."," */","NodeConstrainedMenuNav = function () {","   NodeConstrainedMenuNav.superclass.constructor.apply(this, arguments);","};","","NodeConstrainedMenuNav.NAME = \"nodeConstrainedMenuNav\";","NodeConstrainedMenuNav.NS   = \"menuNav\";","NodeConstrainedMenuNav.ATTRS = {","   viewportPadding: {","      value: 20","   }","};","","Y.extend(NodeConstrainedMenuNav, Y.Plugin.NodeMenuNav, {","","   _showMenu: function (menu) {","      NodeConstrainedMenuNav.superclass._showMenu.call(this, menu);","      this._onWindowResize(null, menu);","      Y.one('win').on('windowresize', this._onWindowResize, this, menu);","   },","","   _hideMenu: function (menu, activateAndFocusLabel) {","      Y.one('win').detach('windowresize', this._onWindowResize);","      NodeConstrainedMenuNav.superclass._hideMenu.call(this, menu, activateAndFocusLabel);","   },","","   _onWindowResize: function (e, menu) {","      var viewportHeight  = Y.DOM.winHeight(),","          viewportPadding = this.get('viewportPadding'),","          menuContent     = menu.one('.yui3-menu-content'),","          menuRegion      = menuContent.get('region'),","          maxHeight       = viewportHeight - viewportPadding * 2;","","      if (menu.get('offsetHeight') >= maxHeight) {","         // Only update width if the style hasn't been applied yet","         if (menuContent.getStyle('overflowY') !== 'scroll') {","            menu.setStyle('width', menuContent.get('offsetWidth') + getScrollbarWidth());","         }","","         menuContent.setStyles({","            height: maxHeight,","            overflowY: 'scroll'","         });","","         menu.setStyle('height', maxHeight);","         menu.setY(viewportHeight - viewportPadding - maxHeight);","      }","      else {","         // No need for scrollbars","         menuContent.setStyles({","            overflowY: 'visible',","            height: ''","         });","","         menu.setStyles({height: '', width: ''});","","         NodeConstrainedMenuNav.superclass._showMenu.call(this, menu); // Just to reset height/width","","         // Readjust position if needed","         if (menuRegion.bottom > viewportHeight - viewportPadding) {","            menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));","         }","      }","   }","","});","","Y.namespace('Plugin');","","Y.Plugin.NodeConstrainedMenuNav = NodeConstrainedMenuNav;","","}, '@VERSION@', {\"requires\": [\"event-resize\", \"node-menunav\"]});"];
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].lines = {"1":0,"4":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"18":0,"20":0,"23":0,"31":0,"32":0,"35":0,"36":0,"37":0,"43":0,"46":0,"47":0,"48":0,"52":0,"53":0,"57":0,"63":0,"65":0,"66":0,"69":0,"74":0,"75":0,"79":0,"84":0,"86":0,"89":0,"90":0,"97":0,"99":0};
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].functions = {"getScrollbarWidth:8":0,"NodeConstrainedMenuNav:31":0,"_showMenu:45":0,"_hideMenu:51":0,"_onWindowResize:56":0,"(anonymous 1):1":0};
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].coveredLines = 39;
_yuitest_coverage["build/node-constrained-menunav/node-constrained-menunav.js"].coveredFunctions = 6;
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
NodeConstrainedMenuNav.superclass._hideMenu.call(this, menu, activateAndFocusLabel);
   },

   _onWindowResize: function (e, menu) {
      _yuitest_coverfunc("build/node-constrained-menunav/node-constrained-menunav.js", "_onWindowResize", 56);
_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 57);
var viewportHeight  = Y.DOM.winHeight(),
          viewportPadding = this.get('viewportPadding'),
          menuContent     = menu.one('.yui3-menu-content'),
          menuRegion      = menuContent.get('region'),
          maxHeight       = viewportHeight - viewportPadding * 2;

      _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 63);
if (menu.get('offsetHeight') >= maxHeight) {
         // Only update width if the style hasn't been applied yet
         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 65);
if (menuContent.getStyle('overflowY') !== 'scroll') {
            _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 66);
menu.setStyle('width', menuContent.get('offsetWidth') + getScrollbarWidth());
         }

         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 69);
menuContent.setStyles({
            height: maxHeight,
            overflowY: 'scroll'
         });

         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 74);
menu.setStyle('height', maxHeight);
         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 75);
menu.setY(viewportHeight - viewportPadding - maxHeight);
      }
      else {
         // No need for scrollbars
         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 79);
menuContent.setStyles({
            overflowY: 'visible',
            height: ''
         });

         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 84);
menu.setStyles({height: '', width: ''});

         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 86);
NodeConstrainedMenuNav.superclass._showMenu.call(this, menu); // Just to reset height/width

         // Readjust position if needed
         _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 89);
if (menuRegion.bottom > viewportHeight - viewportPadding) {
            _yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 90);
menu.setY(menu.getY() - ((menuRegion.bottom - viewportHeight) + viewportPadding));
         }
      }
   }

});

_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 97);
Y.namespace('Plugin');

_yuitest_coverline("build/node-constrained-menunav/node-constrained-menunav.js", 99);
Y.Plugin.NodeConstrainedMenuNav = NodeConstrainedMenuNav;

}, '@VERSION@', {"requires": ["event-resize", "node-menunav"]});
