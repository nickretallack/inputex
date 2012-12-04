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
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].code=["YUI.add('inputex-menu', function (Y, NAME) {","","/**"," * @module inputex-menu"," */","   var inputEx     = Y.inputEx,","       lang        = Y.Lang,","       substitute  = Y.substitute,","       create      = Y.Node.create,","","       VERTICAL    = 'vertical',","       HORIZONTAL  = 'horizontal';","","/**"," * Create a menu field"," * @class inputEx.MenuField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>typeInvite      : text to display when no selection made</li>"," *    <li>menuItems       : contains descriptions of menu items</li>"," *    <li>menuTrigger     : (optional, default: 'click') event to trigger menu show, ex: mouseover</li>"," *    <li>menuOrientation : (optional, default: 'vertical') menu orientation, ex: 'horizontal'</li>"," *    <li>menuConfig      : (optional) object used as a config for the MenuNav node plugin</li>"," *    <li>constrained     : (optional) boolean to specify if menu panels should be constrained to the viewport</li>"," * </ul>"," */","inputEx.MenuField = function(options) {","   inputEx.MenuField.superclass.constructor.call(this,options);","};","","inputEx.MenuField.MENU_TEMPLATE =","   '<div class=\"yui3-menu\" id=\"{menu_id}\">' +","       '<div class=\"yui3-menu-content\">' +","           '<ul>' +","               '{menu_items}' +","           '</ul>' +","       '</div>' +","   '</div>';","","inputEx.MenuField.MENU_ITEM_TEMPLATE =","   '<li class=\"{item_class}\">' +","      '<a href=\"{href}\" class=\"{label_class}\">{label}</a>' +","      '{submenu}' +","   '</li>';","","Y.extend(inputEx.MenuField, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.MenuField.superclass.setOptions.call(this,options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-menu\"));","","      // Overwrite options:","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-MenuField';","","      // New options","      this.options.typeInvite = options.typeInvite || this.messages.menuTypeInvite;","      this.options.colorInvite = options.colorInvite || \"FFFFFF\";","      this.options.menuTrigger = options.menuTrigger || \"click\";","      this.options.menuOrientation = options.menuOrientation || VERTICAL;","      this.options.menuItems = options.menuItems;","      this.options.constrained = options.constrained || false;","","      // Configuration options for the generated YUI MenuNav node plugin","      this.options.menuConfig = options.menuConfig || {","         autoSubmenuDisplay: (this.options.menuTrigger === 'mouseover')","      };","   },","","   /**","    * Build a menu","    * @method renderComponent","    */","   renderComponent: function() {","      // Keep selected value in a hidden field","      this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});","      this.fieldContainer.appendChild(this.hiddenEl);","      this.renderMenu(this.fieldContainer);","","      this.setBackgroundColorOfRootLabel(this.options.colorInvite);","","   },","","   /**","    * Parse menuItems option to add ids, listeners, etc.","    * @method renderMenu","    */","   renderMenu: function(container) {","","      // Keep corresponding text for each value selectable in the menu","      //   -> will be used to display selection after click","      this._textFromValue = {};","      this._valueFromHref = {};","","","      var that = this, pluginClass,","      ","      // This method returns template completed with data.","      renderMenuRecurs = function (parent_id, conf, level) {","","         if (level>5) {","            throw new Error(\"MenuField : too much recursion, menuItems property should be 5 level deep at most.\");","         }","","         var html = '',","             length = conf.length,","             item,","             templateData,","             id,","             i;","","         for (i = 0; i < length; i++) {","            item = conf[i];","            id = Y.guid();","","            templateData = {","               label:         item.text,","               href:          '#' + id,","               submenu:       '',","               label_class:   'yui3-menuitem-content',","               item_class:    item.classname || ''","            };","","            // item with submenu","            if (!lang.isUndefined(item.submenu)) {","               templateData.label_class = 'yui3-menu-label';","               templateData.submenu     = renderMenuRecurs(id, item.submenu.itemdata, level+1);","               templateData.item_class += ' yui3-submenu';","            } else {","               templateData.item_class += ' yui3-menuitem';","               that._textFromValue[item.value] = item.text;","               that._valueFromHref['#' + id] = item.value;","            }","","            html += substitute(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData);","         }","","         return substitute(inputEx.MenuField.MENU_TEMPLATE, {","            menu_id:    parent_id,","            menu_items: html","         });","","      };","","","        if(!this.options.menuItems){","          throw new Error(\"Missing 'menuItems' property in options\");","        }","","      this._menu = create(renderMenuRecurs(Y.guid(), [{","         text: this.options.typeInvite,","         submenu: {itemdata: this.options.menuItems}","      }], 0));","","      if (Y.UA.ie === 7) {","         a_tags = this._menu.all('a');","         a_tags.each(function (a) {","            var href = a.get('href');","            a.set('href', '#' + href.split('#')[1]);","         });","      }","","      if (this.options.menuOrientation === HORIZONTAL) {","         this._menu.addClass('yui3-menu-horizontal  yui3-menubuttonnav');","      }","","      // Retrieve the first label for later use","      this._rootItemLabel = this._menu.one('.yui3-menu-label');","      if (this.options.menuOrientation === HORIZONTAL) {","         this._rootItemLabel.setContent('<em>'+this.options.typeInvite+'</em>');","         this._rootItemLabel = this._rootItemLabel.one('em');","      }","","      pluginClass = this.options.constrained ? 'NodeConstrainedMenuNav' : 'NodeMenuNav';","      this._menu.plug(Y.Plugin[pluginClass], this.options.menuConfig);","      this._menu.appendTo(container);","   },","","   /**","    * @method initEvents","    */","   initEvents: function() {","      this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');","   },","","   /**","    * This function will set the background color of the root label node (which is the first node with class=\"yui3-menu-label\" of our component)","    * Just after the render phase, this node display : \"Cliquez ici pour choisir la prestation\"","    *","    * @param color if undefined white is setted.","    */","   setBackgroundColorOfRootLabel: function (color) {","      this._menu.one(\".yui3-menu-label\").setStyle(\"backgroundColor\",color);","   },","   /**","    * @method onItemClick","    */","   onItemClick: function(e) {","      var target = e.currentTarget,","          href;","","      e.preventDefault();","","      if (target.hasClass('yui3-menuitem-content')) {","         // Need to pass \"2\" as a second argument to \"getAttribute\" for","         // IE otherwise IE will return a fully qualified URL for the","         // value of the \"href\" attribute.","         // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx","         href = target.getAttribute(\"href\", 2);","         this.setValue(this._valueFromHref[href], true);","","         // Hides submenus","         this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);","      }","   },","   ","   /**","    * @method getValue","    */","   getValue: function() {","      return this.hiddenEl.value;","   },","","   /**","    * @method setValue","    */","   setValue: function(value, sendUpdatedEvt) {","      // update text","      this._rootItemLabel.setContent(this._textFromValue[value] || this.options.typeInvite);","","      // set value","      this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';","      inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);","   }","","});","","// Register this class as \"menu\" type","inputEx.registerType(\"menu\", inputEx.MenuField);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"node-event-delegate\",","        \"node-constrained-menunav\",","        \"substitute\"","    ],","    \"skinnable\": true,","    \"ix_provides\": \"menu\",","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].lines = {"1":0,"6":0,"29":0,"30":0,"33":0,"42":0,"48":0,"55":0,"58":0,"61":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"72":0,"83":0,"84":0,"85":0,"87":0,"99":0,"100":0,"103":0,"108":0,"109":0,"112":0,"119":0,"120":0,"121":0,"123":0,"132":0,"133":0,"134":0,"135":0,"137":0,"138":0,"139":0,"142":0,"145":0,"153":0,"154":0,"157":0,"162":0,"163":0,"164":0,"165":0,"166":0,"170":0,"171":0,"175":0,"176":0,"177":0,"178":0,"181":0,"182":0,"183":0,"190":0,"200":0,"206":0,"209":0,"211":0,"216":0,"217":0,"220":0,"228":0,"236":0,"239":0,"240":0,"246":0};
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].functions = {"MenuField:29":0,"setOptions:54":0,"renderComponent:81":0,"renderMenuRecurs:106":0,"(anonymous 2):164":0,"renderMenu:95":0,"initEvents:189":0,"setBackgroundColorOfRootLabel:199":0,"onItemClick:205":0,"getValue:227":0,"setValue:234":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].coveredLines = 70;
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 1);
YUI.add('inputex-menu', function (Y, NAME) {

/**
 * @module inputex-menu
 */
   _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 6);
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
 *    <li>constrained     : (optional) boolean to specify if menu panels should be constrained to the viewport</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 29);
inputEx.MenuField = function(options) {
   _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "MenuField", 29);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 30);
inputEx.MenuField.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-menu/inputex-menu.js", 33);
inputEx.MenuField.MENU_TEMPLATE =
   '<div class="yui3-menu" id="{menu_id}">' +
       '<div class="yui3-menu-content">' +
           '<ul>' +
               '{menu_items}' +
           '</ul>' +
       '</div>' +
   '</div>';

_yuitest_coverline("build/inputex-menu/inputex-menu.js", 42);
inputEx.MenuField.MENU_ITEM_TEMPLATE =
   '<li class="{item_class}">' +
      '<a href="{href}" class="{label_class}">{label}</a>' +
      '{submenu}' +
   '</li>';

_yuitest_coverline("build/inputex-menu/inputex-menu.js", 48);
Y.extend(inputEx.MenuField, inputEx.Field, {
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "setOptions", 54);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 55);
inputEx.MenuField.superclass.setOptions.call(this,options);

      //I18N
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 58);
this.messages = Y.mix(this.messages, Y.Intl.get("inputex-menu"));

      // Overwrite options:
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 61);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-MenuField';

      // New options
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 64);
this.options.typeInvite = options.typeInvite || this.messages.menuTypeInvite;
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 65);
this.options.colorInvite = options.colorInvite || "FFFFFF";
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 66);
this.options.menuTrigger = options.menuTrigger || "click";
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 67);
this.options.menuOrientation = options.menuOrientation || VERTICAL;
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 68);
this.options.menuItems = options.menuItems;
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 69);
this.options.constrained = options.constrained || false;

      // Configuration options for the generated YUI MenuNav node plugin
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 72);
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
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderComponent", 81);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 83);
this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 84);
this.fieldContainer.appendChild(this.hiddenEl);
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 85);
this.renderMenu(this.fieldContainer);

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 87);
this.setBackgroundColorOfRootLabel(this.options.colorInvite);

   },

   /**
    * Parse menuItems option to add ids, listeners, etc.
    * @method renderMenu
    */
   renderMenu: function(container) {

      // Keep corresponding text for each value selectable in the menu
      //   -> will be used to display selection after click
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderMenu", 95);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 99);
this._textFromValue = {};
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 100);
this._valueFromHref = {};


      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 103);
var that = this, pluginClass,
      
      // This method returns template completed with data.
      renderMenuRecurs = function (parent_id, conf, level) {

         _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderMenuRecurs", 106);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 108);
if (level>5) {
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 109);
throw new Error("MenuField : too much recursion, menuItems property should be 5 level deep at most.");
         }

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 112);
var html = '',
             length = conf.length,
             item,
             templateData,
             id,
             i;

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 119);
for (i = 0; i < length; i++) {
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 120);
item = conf[i];
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 121);
id = Y.guid();

            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 123);
templateData = {
               label:         item.text,
               href:          '#' + id,
               submenu:       '',
               label_class:   'yui3-menuitem-content',
               item_class:    item.classname || ''
            };

            // item with submenu
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 132);
if (!lang.isUndefined(item.submenu)) {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 133);
templateData.label_class = 'yui3-menu-label';
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 134);
templateData.submenu     = renderMenuRecurs(id, item.submenu.itemdata, level+1);
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 135);
templateData.item_class += ' yui3-submenu';
            } else {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 137);
templateData.item_class += ' yui3-menuitem';
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 138);
that._textFromValue[item.value] = item.text;
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 139);
that._valueFromHref['#' + id] = item.value;
            }

            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 142);
html += substitute(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData);
         }

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 145);
return substitute(inputEx.MenuField.MENU_TEMPLATE, {
            menu_id:    parent_id,
            menu_items: html
         });

      };


        _yuitest_coverline("build/inputex-menu/inputex-menu.js", 153);
if(!this.options.menuItems){
          _yuitest_coverline("build/inputex-menu/inputex-menu.js", 154);
throw new Error("Missing 'menuItems' property in options");
        }

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 157);
this._menu = create(renderMenuRecurs(Y.guid(), [{
         text: this.options.typeInvite,
         submenu: {itemdata: this.options.menuItems}
      }], 0));

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 162);
if (Y.UA.ie === 7) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 163);
a_tags = this._menu.all('a');
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 164);
a_tags.each(function (a) {
            _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "(anonymous 2)", 164);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 165);
var href = a.get('href');
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 166);
a.set('href', '#' + href.split('#')[1]);
         });
      }

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 170);
if (this.options.menuOrientation === HORIZONTAL) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 171);
this._menu.addClass('yui3-menu-horizontal  yui3-menubuttonnav');
      }

      // Retrieve the first label for later use
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 175);
this._rootItemLabel = this._menu.one('.yui3-menu-label');
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 176);
if (this.options.menuOrientation === HORIZONTAL) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 177);
this._rootItemLabel.setContent('<em>'+this.options.typeInvite+'</em>');
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 178);
this._rootItemLabel = this._rootItemLabel.one('em');
      }

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 181);
pluginClass = this.options.constrained ? 'NodeConstrainedMenuNav' : 'NodeMenuNav';
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 182);
this._menu.plug(Y.Plugin[pluginClass], this.options.menuConfig);
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 183);
this._menu.appendTo(container);
   },

   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "initEvents", 189);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 190);
this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');
   },

   /**
    * This function will set the background color of the root label node (which is the first node with class="yui3-menu-label" of our component)
    * Just after the render phase, this node display : "Cliquez ici pour choisir la prestation"
    *
    * @param color if undefined white is setted.
    */
   setBackgroundColorOfRootLabel: function (color) {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "setBackgroundColorOfRootLabel", 199);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 200);
this._menu.one(".yui3-menu-label").setStyle("backgroundColor",color);
   },
   /**
    * @method onItemClick
    */
   onItemClick: function(e) {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "onItemClick", 205);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 206);
var target = e.currentTarget,
          href;

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 209);
e.preventDefault();

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 211);
if (target.hasClass('yui3-menuitem-content')) {
         // Need to pass "2" as a second argument to "getAttribute" for
         // IE otherwise IE will return a fully qualified URL for the
         // value of the "href" attribute.
         // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 216);
href = target.getAttribute("href", 2);
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 217);
this.setValue(this._valueFromHref[href], true);

         // Hides submenus
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 220);
this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);
      }
   },
   
   /**
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "getValue", 227);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 228);
return this.hiddenEl.value;
   },

   /**
    * @method setValue
    */
   setValue: function(value, sendUpdatedEvt) {
      // update text
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "setValue", 234);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 236);
this._rootItemLabel.setContent(this._textFromValue[value] || this.options.typeInvite);

      // set value
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 239);
this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 240);
inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);
   }

});

// Register this class as "menu" type
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 246);
inputEx.registerType("menu", inputEx.MenuField);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "node-event-delegate",
        "node-constrained-menunav",
        "substitute"
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
