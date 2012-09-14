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
_yuitest_coverage["build/inputex-menu/inputex-menu.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-menu/inputex-menu.js",
    code: []
};
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].code=["YUI.add('inputex-menu', function (Y, NAME) {","","/**"," * @module inputex-menu"," */","YUI.add(\"inputex-menu\",function(Y){","","   var inputEx     = Y.inputEx,","       lang        = Y.Lang,","       substitute  = Y.substitute,","       create      = Y.Node.create,","","       VERTICAL    = 'vertical',","       HORIZONTAL  = 'horizontal';","","/**"," * Create a menu field"," * @class inputEx.MenuField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>typeInvite      : text to display when no selection made</li>"," *    <li>menuItems       : contains descriptions of menu items</li>"," *    <li>menuTrigger     : (optional, default: 'click') event to trigger menu show, ex: mouseover</li>"," *    <li>menuOrientation : (optional, default: 'vertical') menu orientation, ex: 'horizontal'</li>"," *    <li>menuConfig      : (optional) object used as a config for the MenuNav node plugin</li>"," * </ul>"," */","inputEx.MenuField = function(options) {","   inputEx.MenuField.superclass.constructor.call(this,options);","};","","inputEx.MenuField.MENU_TEMPLATE = ","   '<div class=\"yui3-menu\" id=\"{menu_id}\">' +","       '<div class=\"yui3-menu-content\">' +","           '<ul>' +","               '{menu_items}' +","           '</ul>' +","       '</div>' +","   '</div>';","","inputEx.MenuField.MENU_ITEM_TEMPLATE = ","   '<li class=\"{item_class}\">' +","      '<a href=\"{href}\" class=\"{label_class}\">{label}</a>' +","      '{submenu}' +","   '</li>';","","Y.extend(inputEx.MenuField, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.MenuField.superclass.setOptions.call(this,options);","","      // Overwrite options:","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-MenuField';","","      // New options","      this.options.typeInvite = options.typeInvite || inputEx.messages.menuTypeInvite;","      this.options.colorInvite = options.colorInvite || \"FFFFFF\";","      this.options.menuTrigger = options.menuTrigger || \"click\";","      this.options.menuOrientation = options.menuOrientation || VERTICAL;","      this.options.menuItems = options.menuItems;","","      // Configuration options for the generated YUI MenuNav node plugin","      this.options.menuConfig = options.menuConfig || {","         autoSubmenuDisplay: (this.options.menuTrigger == 'mouseover')","      };","   },","","   /**","    * Build a menu","    * @method renderComponent","    */","   renderComponent: function() {","      // Keep selected value in a hidden field","      this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});","      this.fieldContainer.appendChild(this.hiddenEl);","      this.renderMenu(this.fieldContainer);","   },","","   /**","    * Parse menuItems option to add ids, listeners, etc.","    * @method renderMenu","    */","   renderMenu: function(container) {","      var that = this;","","      // Keep corresponding text for each value selectable in the menu","      //   -> will be used to display selection after click","      this._textFromValue = {};","","      // This method returns template completed with data.","      var renderMenuRecurs = function (id, conf, level) {","         if (level>5) throw new Error(\"MenuField : too much recursion, menuItems property should be 5 level deep at most.\");","","         var html = '',","             length = conf.length,","             item,","             templateData,","             i;","","         for (i = 0; i < length; i++) {","            item = conf[i];","","            if (lang.isUndefined(item.text) && !lang.isUndefined(item.value)) {","               item.text = item.value;","            }","            if (lang.isUndefined(item.value) && !lang.isUndefined(item.text)) {","               item.value = item.text;","            }","","            templateData = {","               label:         item.text,","               href:          '#'+item.value,","               submenu:       '',","               label_class:   'yui3-menuitem-content',","               item_class:    item.classname","            };","","            // item with submenu","            if (!lang.isUndefined(item.submenu)) {","               templateData.label_class = 'yui3-menu-label';","               templateData.submenu     = renderMenuRecurs(item.value, item.submenu.itemdata, level+1);","            } else {","               templateData.item_class += ' yui3-menuitem';","               that._textFromValue[item.value] = item.text;","            }","","            html += substitute(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData);","         }","","         return substitute(inputEx.MenuField.MENU_TEMPLATE, {","            menu_id:    id,","            menu_items: html","         });","","      };","","      this._menu = create(renderMenuRecurs(Y.guid(), [{","         text: this.options.typeInvite, ","         submenu: {itemdata: this.options.menuItems}","      }], 0));","","      if (this.options.menuOrientation === HORIZONTAL) {","         this._menu.addClass('yui3-menu-horizontal  yui3-menubuttonnav');","      }","","      // Retrieve the first label for later use","      this._rootItemLabel = this._menu.one('.yui3-menu-label');","      if (this.options.menuOrientation === HORIZONTAL) {","         this._rootItemLabel.setContent('<em>'+this.options.typeInvite+'</em>');","         this._rootItemLabel = this._rootItemLabel.one('em');","      }","","      this._menu.plug(Y.Plugin.NodeMenuNav, this.options.menuConfig);","      this._menu.appendTo(container);","   },","","   /**","    * @method initEvents","    */","   initEvents: function() {","      var that = this;","","      this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');","","      if (this.options.menuTrigger == 'click') {","         this._menu.menuNav._rootMenu.on(['mousedown', 'click'], function (e) {","            var menuNav = that._menu.menuNav;","            menuNav._toggleSubmenuDisplay.call(menuNav, e);","         }, this._menu.menuNav); ","      }","   },","   ","   /**","    * @method onItemClick","    */","   onItemClick: function(e) {","      var target = e.currentTarget,","          href;","","      e.preventDefault();","","      if (target.hasClass('yui3-menuitem-content')) {","         // Need to pass \"2\" as a second argument to \"getAttribute\" for","         // IE otherwise IE will return a fully qualified URL for the","         // value of the \"href\" attribute.","         // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx","         href = target.getAttribute(\"href\", 2);","         this.setValue(href.substr(href.indexOf('#') + 1), true);","","         // Hides submenus","         this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);","      }","   },","   ","   /**","    * @method getValue","    */","   getValue: function() {","      return this.hiddenEl.value;","   },","","   /**","    * @method setValue","    */","   setValue: function(value, sendUpdatedEvt) {","      // update text","      this._rootItemLabel.setContent(this._textFromValue[value] || this.options.typeInvite);","","      // set value","      this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';","      inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);","   }","","});","","// Register this class as \"menu\" type","inputEx.registerType(\"menu\", inputEx.MenuField);","","}, '3.1.0',{","requires: ['inputex-field', 'node-event-delegate', 'node-menunav', 'substitute']","});","","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].lines = {"1":0,"6":0,"8":0,"30":0,"31":0,"34":0,"43":0,"49":0,"56":0,"59":0,"62":0,"63":0,"64":0,"65":0,"66":0,"69":0,"80":0,"81":0,"82":0,"90":0,"94":0,"97":0,"98":0,"100":0,"106":0,"107":0,"109":0,"110":0,"112":0,"113":0,"116":0,"125":0,"126":0,"127":0,"129":0,"130":0,"133":0,"136":0,"143":0,"148":0,"149":0,"153":0,"154":0,"155":0,"156":0,"159":0,"160":0,"167":0,"169":0,"171":0,"172":0,"173":0,"174":0,"183":0,"186":0,"188":0,"193":0,"194":0,"197":0,"205":0,"213":0,"216":0,"217":0,"223":0};
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].functions = {"MenuField:30":0,"setOptions:55":0,"renderComponent:78":0,"renderMenuRecurs:97":0,"renderMenu:89":0,"(anonymous 3):172":0,"initEvents:166":0,"onItemClick:182":0,"getValue:204":0,"setValue:211":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].coveredLines = 64;
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 1);
YUI.add('inputex-menu', function (Y, NAME) {

/**
 * @module inputex-menu
 */
_yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 6);
YUI.add("inputex-menu",function(Y){

   _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 8);
var inputEx     = Y.inputEx,
       lang        = Y.Lang,
       substitute  = Y.substitute,
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
 * </ul>
 */
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 30);
inputEx.MenuField = function(options) {
   _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "MenuField", 30);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 31);
inputEx.MenuField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-menu/inputex-menu.js", 34);
inputEx.MenuField.MENU_TEMPLATE = 
   '<div class="yui3-menu" id="{menu_id}">' +
       '<div class="yui3-menu-content">' +
           '<ul>' +
               '{menu_items}' +
           '</ul>' +
       '</div>' +
   '</div>';

_yuitest_coverline("build/inputex-menu/inputex-menu.js", 43);
inputEx.MenuField.MENU_ITEM_TEMPLATE = 
   '<li class="{item_class}">' +
      '<a href="{href}" class="{label_class}">{label}</a>' +
      '{submenu}' +
   '</li>';

_yuitest_coverline("build/inputex-menu/inputex-menu.js", 49);
Y.extend(inputEx.MenuField, inputEx.Field, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "setOptions", 55);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 56);
inputEx.MenuField.superclass.setOptions.call(this,options);

      // Overwrite options:
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 59);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-MenuField';

      // New options
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 62);
this.options.typeInvite = options.typeInvite || inputEx.messages.menuTypeInvite;
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 63);
this.options.colorInvite = options.colorInvite || "FFFFFF";
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 64);
this.options.menuTrigger = options.menuTrigger || "click";
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 65);
this.options.menuOrientation = options.menuOrientation || VERTICAL;
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 66);
this.options.menuItems = options.menuItems;

      // Configuration options for the generated YUI MenuNav node plugin
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 69);
this.options.menuConfig = options.menuConfig || {
         autoSubmenuDisplay: (this.options.menuTrigger == 'mouseover')
      };
   },

   /**
    * Build a menu
    * @method renderComponent
    */
   renderComponent: function() {
      // Keep selected value in a hidden field
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderComponent", 78);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 80);
this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 81);
this.fieldContainer.appendChild(this.hiddenEl);
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 82);
this.renderMenu(this.fieldContainer);
   },

   /**
    * Parse menuItems option to add ids, listeners, etc.
    * @method renderMenu
    */
   renderMenu: function(container) {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderMenu", 89);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 90);
var that = this;

      // Keep corresponding text for each value selectable in the menu
      //   -> will be used to display selection after click
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 94);
this._textFromValue = {};

      // This method returns template completed with data.
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 97);
var renderMenuRecurs = function (id, conf, level) {
         _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderMenuRecurs", 97);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 98);
if (level>5) {throw new Error("MenuField : too much recursion, menuItems property should be 5 level deep at most.");}

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 100);
var html = '',
             length = conf.length,
             item,
             templateData,
             i;

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 106);
for (i = 0; i < length; i++) {
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 107);
item = conf[i];

            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 109);
if (lang.isUndefined(item.text) && !lang.isUndefined(item.value)) {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 110);
item.text = item.value;
            }
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 112);
if (lang.isUndefined(item.value) && !lang.isUndefined(item.text)) {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 113);
item.value = item.text;
            }

            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 116);
templateData = {
               label:         item.text,
               href:          '#'+item.value,
               submenu:       '',
               label_class:   'yui3-menuitem-content',
               item_class:    item.classname
            };

            // item with submenu
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 125);
if (!lang.isUndefined(item.submenu)) {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 126);
templateData.label_class = 'yui3-menu-label';
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 127);
templateData.submenu     = renderMenuRecurs(item.value, item.submenu.itemdata, level+1);
            } else {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 129);
templateData.item_class += ' yui3-menuitem';
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 130);
that._textFromValue[item.value] = item.text;
            }

            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 133);
html += substitute(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData);
         }

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 136);
return substitute(inputEx.MenuField.MENU_TEMPLATE, {
            menu_id:    id,
            menu_items: html
         });

      };

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 143);
this._menu = create(renderMenuRecurs(Y.guid(), [{
         text: this.options.typeInvite, 
         submenu: {itemdata: this.options.menuItems}
      }], 0));

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 148);
if (this.options.menuOrientation === HORIZONTAL) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 149);
this._menu.addClass('yui3-menu-horizontal  yui3-menubuttonnav');
      }

      // Retrieve the first label for later use
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 153);
this._rootItemLabel = this._menu.one('.yui3-menu-label');
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 154);
if (this.options.menuOrientation === HORIZONTAL) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 155);
this._rootItemLabel.setContent('<em>'+this.options.typeInvite+'</em>');
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 156);
this._rootItemLabel = this._rootItemLabel.one('em');
      }

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 159);
this._menu.plug(Y.Plugin.NodeMenuNav, this.options.menuConfig);
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 160);
this._menu.appendTo(container);
   },

   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "initEvents", 166);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 167);
var that = this;

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 169);
this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 171);
if (this.options.menuTrigger == 'click') {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 172);
this._menu.menuNav._rootMenu.on(['mousedown', 'click'], function (e) {
            _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "(anonymous 3)", 172);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 173);
var menuNav = that._menu.menuNav;
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 174);
menuNav._toggleSubmenuDisplay.call(menuNav, e);
         }, this._menu.menuNav); 
      }
   },
   
   /**
    * @method onItemClick
    */
   onItemClick: function(e) {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "onItemClick", 182);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 183);
var target = e.currentTarget,
          href;

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 186);
e.preventDefault();

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 188);
if (target.hasClass('yui3-menuitem-content')) {
         // Need to pass "2" as a second argument to "getAttribute" for
         // IE otherwise IE will return a fully qualified URL for the
         // value of the "href" attribute.
         // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 193);
href = target.getAttribute("href", 2);
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 194);
this.setValue(href.substr(href.indexOf('#') + 1), true);

         // Hides submenus
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 197);
this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);
      }
   },
   
   /**
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "getValue", 204);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 205);
return this.hiddenEl.value;
   },

   /**
    * @method setValue
    */
   setValue: function(value, sendUpdatedEvt) {
      // update text
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "setValue", 211);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 213);
this._rootItemLabel.setContent(this._textFromValue[value] || this.options.typeInvite);

      // set value
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 216);
this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 217);
inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);
   }

});

// Register this class as "menu" type
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 223);
inputEx.registerType("menu", inputEx.MenuField);

}, '3.1.0',{
requires: ['inputex-field', 'node-event-delegate', 'node-menunav', 'substitute']
});



}, '@VERSION@');
