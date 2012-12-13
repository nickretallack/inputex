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
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].code=["YUI.add('inputex-menu', function (Y, NAME) {","","/**"," * @module inputex-menu"," */","   var inputEx     = Y.inputEx,","       lang        = Y.Lang,","       substitute  = Y.substitute,","       create      = Y.Node.create,","","       VERTICAL    = 'vertical',","       HORIZONTAL  = 'horizontal';","","/**"," * Create a menu field"," * @class inputEx.MenuField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *    <li>typeInvite      : text to display when no selection made</li>"," *    <li>menuItems       : contains descriptions of menu items</li>"," *    <li>menuTrigger     : (optional, default: 'click') event to trigger menu show, ex: mouseover</li>"," *    <li>menuOrientation : (optional, default: 'vertical') menu orientation, ex: 'horizontal'</li>"," *    <li>menuConfig      : (optional) object used as a config for the MenuNav node plugin</li>"," *    <li>constrained     : (optional) boolean to specify if menu panels should be constrained to the viewport</li>"," * </ul>"," */","inputEx.MenuField = function(options) {","   inputEx.MenuField.superclass.constructor.call(this,options);","};","","inputEx.MenuField.MENU_TEMPLATE =","   '<div class=\"yui3-menu\" id=\"{menu_id}\">' +","       '<div class=\"yui3-menu-content\">' +","           '<ul>' +","               '{menu_items}' +","           '</ul>' +","       '</div>' +","   '</div>';","","inputEx.MenuField.MENU_ITEM_TEMPLATE =","   '<li class=\"{item_class}\">' +","      '<a href=\"{href}\" class=\"{label_class}\">{label}</a>' +","      '{submenu}' +","   '</li>';","","Y.extend(inputEx.MenuField, inputEx.Field, {","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.MenuField.superclass.setOptions.call(this,options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-menu\"));","","      // Overwrite options:","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-MenuField';","","      // New options","      this.options.typeInvite = options.typeInvite || this.messages.menuTypeInvite;","      this.options.menuTrigger = options.menuTrigger || \"click\";","      this.options.menuOrientation = options.menuOrientation || VERTICAL;","      this.options.menuItems = options.menuItems;","      this.options.constrained = options.constrained || false;","","      // Configuration options for the generated YUI MenuNav node plugin","      this.options.menuConfig = options.menuConfig || {","         autoSubmenuDisplay: (this.options.menuTrigger === 'mouseover')","      };","   },","","   /**","    * Build a menu","    * @method renderComponent","    */","   renderComponent: function() {","      // Keep selected value in a hidden field","      this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});","      this.fieldContainer.appendChild(this.hiddenEl);","      this.renderMenu(this.fieldContainer);","   },","","   /**","    * Parse menuItems option to add ids, listeners, etc.","    * @method renderMenu","    */","   renderMenu: function(container) {","","      // Keep corresponding text for each value selectable in the menu","      //   -> will be used to display selection after click","      this._textFromValue = {};","      this._valueFromHref = {};","","","      var that = this, a_tags, pluginClass,","      ","      // This method returns template completed with data.","      renderMenuRecurs = function (parent_id, conf, level) {","","         if (level>5) {","            throw new Error(\"MenuField : too much recursion, menuItems property should be 5 level deep at most.\");","         }","","         var html = '',","             length = conf.length,","             item,","             templateData,","             id,","             i;","","         for (i = 0; i < length; i++) {","            item = conf[i];","            id = Y.guid();","","            templateData = {","               label:         item.text,","               href:          '#' + id,","               submenu:       '',","               label_class:   'yui3-menuitem-content',","               item_class:    item.classname || ''","            };","","            // item with submenu","            if (!lang.isUndefined(item.submenu)) {","               templateData.label_class = 'yui3-menu-label';","               templateData.submenu     = renderMenuRecurs(id, item.submenu.itemdata, level+1);","               templateData.item_class += ' yui3-submenu';","            } else {","               templateData.item_class += ' yui3-menuitem';","               that._textFromValue[item.value] = item.text;","               that._valueFromHref['#' + id] = item.value;","            }","","            html += substitute(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData);","         }","","         return substitute(inputEx.MenuField.MENU_TEMPLATE, {","            menu_id:    parent_id,","            menu_items: html","         });","","      };","","","      if (!this.options.menuItems) {","         throw new Error(\"Missing 'menuItems' property in options\");","      }","","      this._menu = create(renderMenuRecurs(Y.guid(), [{","         text: this.options.typeInvite,","         submenu: {itemdata: this.options.menuItems}","      }], 0));","","      if (Y.UA.ie === 7) {","         a_tags = this._menu.all('a');","         a_tags.each(function (a) {","            var href = a.get('href');","            a.set('href', '#' + href.split('#')[1]);","         });","      }","      ","      if (this.options.menuOrientation === HORIZONTAL) {","         this._menu.addClass('yui3-menu-horizontal yui3-menubuttonnav');","      }","","      // Retrieve the first label for later use","      this._rootItemLabel = this._menu.one('.yui3-menu-label').setContent('<em>'+this.options.typeInvite+'</em>').one('em');","","      pluginClass = this.options.constrained ? 'NodeConstrainedMenuNav' : 'NodeMenuNav';","      this._menu.plug(Y.Plugin[pluginClass], this.options.menuConfig);","      this._menu.appendTo(container);","   },","","   /**","    * @method initEvents","    */","   initEvents: function() {","      this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');","   },","","   /**","    * @method onItemClick","    */","   onItemClick: function(e) {","      var target = e.currentTarget,","          href;","","      e.preventDefault();","","      if (target.hasClass('yui3-menuitem-content')) {","         // Need to pass \"2\" as a second argument to \"getAttribute\" for","         // IE otherwise IE will return a fully qualified URL for the","         // value of the \"href\" attribute.","         // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx","         href = target.getAttribute(\"href\", 2);","         this.setValue(this._valueFromHref[href], true);","","         // Hides submenus","         this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);","      }","   },","   ","   /**","    * @method getValue","    */","   getValue: function() {","      return this.hiddenEl.value;","   },","","   /**","    * @method setValue","    */","   setValue: function(value, sendUpdatedEvt) {","      // update text","      this._rootItemLabel.setContent(this._textFromValue[value] || this.options.typeInvite);","","      // set value","      this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';","      inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);","   }","","});","","// Register this class as \"menu\" type","inputEx.registerType(\"menu\", inputEx.MenuField);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"node-event-delegate\",","        \"node-constrained-menunav\",","        \"substitute\"","    ],","    \"skinnable\": true,","    \"ix_provides\": \"menu\",","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].lines = {"1":0,"6":0,"29":0,"30":0,"33":0,"42":0,"48":0,"55":0,"58":0,"61":0,"64":0,"65":0,"66":0,"67":0,"68":0,"71":0,"82":0,"83":0,"84":0,"95":0,"96":0,"99":0,"104":0,"105":0,"108":0,"115":0,"116":0,"117":0,"119":0,"128":0,"129":0,"130":0,"131":0,"133":0,"134":0,"135":0,"138":0,"141":0,"149":0,"150":0,"153":0,"158":0,"159":0,"160":0,"161":0,"162":0,"166":0,"167":0,"171":0,"173":0,"174":0,"175":0,"182":0,"189":0,"192":0,"194":0,"199":0,"200":0,"203":0,"211":0,"219":0,"222":0,"223":0,"229":0};
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].functions = {"MenuField:29":0,"setOptions:54":0,"renderComponent:80":0,"renderMenuRecurs:102":0,"(anonymous 2):160":0,"renderMenu:91":0,"initEvents:181":0,"onItemClick:188":0,"getValue:210":0,"setValue:217":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].coveredLines = 64;
_yuitest_coverage["build/inputex-menu/inputex-menu.js"].coveredFunctions = 11;
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
this.options.menuTrigger = options.menuTrigger || "click";
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 66);
this.options.menuOrientation = options.menuOrientation || VERTICAL;
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 67);
this.options.menuItems = options.menuItems;
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 68);
this.options.constrained = options.constrained || false;

      // Configuration options for the generated YUI MenuNav node plugin
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 71);
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
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderComponent", 80);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 82);
this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.options.value || ''});
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 83);
this.fieldContainer.appendChild(this.hiddenEl);
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 84);
this.renderMenu(this.fieldContainer);
   },

   /**
    * Parse menuItems option to add ids, listeners, etc.
    * @method renderMenu
    */
   renderMenu: function(container) {

      // Keep corresponding text for each value selectable in the menu
      //   -> will be used to display selection after click
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderMenu", 91);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 95);
this._textFromValue = {};
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 96);
this._valueFromHref = {};


      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 99);
var that = this, a_tags, pluginClass,
      
      // This method returns template completed with data.
      renderMenuRecurs = function (parent_id, conf, level) {

         _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "renderMenuRecurs", 102);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 104);
if (level>5) {
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 105);
throw new Error("MenuField : too much recursion, menuItems property should be 5 level deep at most.");
         }

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 108);
var html = '',
             length = conf.length,
             item,
             templateData,
             id,
             i;

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 115);
for (i = 0; i < length; i++) {
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 116);
item = conf[i];
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 117);
id = Y.guid();

            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 119);
templateData = {
               label:         item.text,
               href:          '#' + id,
               submenu:       '',
               label_class:   'yui3-menuitem-content',
               item_class:    item.classname || ''
            };

            // item with submenu
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 128);
if (!lang.isUndefined(item.submenu)) {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 129);
templateData.label_class = 'yui3-menu-label';
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 130);
templateData.submenu     = renderMenuRecurs(id, item.submenu.itemdata, level+1);
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 131);
templateData.item_class += ' yui3-submenu';
            } else {
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 133);
templateData.item_class += ' yui3-menuitem';
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 134);
that._textFromValue[item.value] = item.text;
               _yuitest_coverline("build/inputex-menu/inputex-menu.js", 135);
that._valueFromHref['#' + id] = item.value;
            }

            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 138);
html += substitute(inputEx.MenuField.MENU_ITEM_TEMPLATE, templateData);
         }

         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 141);
return substitute(inputEx.MenuField.MENU_TEMPLATE, {
            menu_id:    parent_id,
            menu_items: html
         });

      };


      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 149);
if (!this.options.menuItems) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 150);
throw new Error("Missing 'menuItems' property in options");
      }

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 153);
this._menu = create(renderMenuRecurs(Y.guid(), [{
         text: this.options.typeInvite,
         submenu: {itemdata: this.options.menuItems}
      }], 0));

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 158);
if (Y.UA.ie === 7) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 159);
a_tags = this._menu.all('a');
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 160);
a_tags.each(function (a) {
            _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "(anonymous 2)", 160);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 161);
var href = a.get('href');
            _yuitest_coverline("build/inputex-menu/inputex-menu.js", 162);
a.set('href', '#' + href.split('#')[1]);
         });
      }
      
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 166);
if (this.options.menuOrientation === HORIZONTAL) {
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 167);
this._menu.addClass('yui3-menu-horizontal yui3-menubuttonnav');
      }

      // Retrieve the first label for later use
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 171);
this._rootItemLabel = this._menu.one('.yui3-menu-label').setContent('<em>'+this.options.typeInvite+'</em>').one('em');

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 173);
pluginClass = this.options.constrained ? 'NodeConstrainedMenuNav' : 'NodeMenuNav';
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 174);
this._menu.plug(Y.Plugin[pluginClass], this.options.menuConfig);
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 175);
this._menu.appendTo(container);
   },

   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "initEvents", 181);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 182);
this._menu.delegate('click', Y.bind(this.onItemClick, this), 'a');
   },

   /**
    * @method onItemClick
    */
   onItemClick: function(e) {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "onItemClick", 188);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 189);
var target = e.currentTarget,
          href;

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 192);
e.preventDefault();

      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 194);
if (target.hasClass('yui3-menuitem-content')) {
         // Need to pass "2" as a second argument to "getAttribute" for
         // IE otherwise IE will return a fully qualified URL for the
         // value of the "href" attribute.
         // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 199);
href = target.getAttribute("href", 2);
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 200);
this.setValue(this._valueFromHref[href], true);

         // Hides submenus
         _yuitest_coverline("build/inputex-menu/inputex-menu.js", 203);
this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu);
      }
   },
   
   /**
    * @method getValue
    */
   getValue: function() {
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "getValue", 210);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 211);
return this.hiddenEl.value;
   },

   /**
    * @method setValue
    */
   setValue: function(value, sendUpdatedEvt) {
      // update text
      _yuitest_coverfunc("build/inputex-menu/inputex-menu.js", "setValue", 217);
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 219);
this._rootItemLabel.setContent(this._textFromValue[value] || this.options.typeInvite);

      // set value
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 222);
this.hiddenEl.value = (!!this._textFromValue[value]) ? value : '';
      _yuitest_coverline("build/inputex-menu/inputex-menu.js", 223);
inputEx.MenuField.superclass.setValue.call(this, value, sendUpdatedEvt);
   }

});

// Register this class as "menu" type
_yuitest_coverline("build/inputex-menu/inputex-menu.js", 229);
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
