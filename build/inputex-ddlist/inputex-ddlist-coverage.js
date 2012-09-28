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
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-ddlist/inputex-ddlist.js",
    code: []
};
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].code=["YUI.add('inputex-ddlist', function (Y, NAME) {","","/**"," * @module inputex-ddlist"," */","   var lang       = Y.Lang,","       inputEx    = Y.inputEx,","       create     = Y.Node.create,","       substitute = Y.substitute,","       DDListField;","","   /**","    * Create a sortable list field with drag and drop","    *","    * @class inputEx.DDListField","    * @extends inputEx.Field","    * @constructor","    * @param {Object} options Added options:","    * <ul>","    *	   <li>items: list of option elements configurations</li>","    *    <li>name: hidden inputs name</li>","    *    <li>valueKey: value key</li>","    *    <li>labelKey: label key</li>","    * </ul>","    */","   DDListField = function (options) {","      DDListField.superclass.constructor.call(this, options);","   };","","   DDListField.LIST_TEMPLATE = '<ul class=\"inputEx-ddlist\">{items}</ul>';","","   DDListField.LIST_ITEM_CLASS = 'inputEx-ddlist-item';","","   DDListField.LIST_ITEM_TEMPLATE =","      '<li class=\"{class}\">' +","         '<span class=\"inputEx-ddlist-item-label\">{label}</span>' +","         '<input type=\"hidden\" name=\"{name}\" value=\"{value}\" />' +","      '</li>';","","   Y.extend(DDListField, inputEx.Field, {","      /**","       * @method setOptions","       */","      setOptions: function (options) {","         DDListField.superclass.setOptions.call(this, options);","","         this.options.items    = lang.isArray(options.items) ? options.items : [];","         this.options.valueKey = options.valueKey || \"value\";","         this.options.labelKey = options.labelKey || \"label\";","         this.options.name     = options.name || Y.guid();","","         if (this.options.name.substr(-2) !== '[]') {","            this.options.name += '[]';","         }","      },","","      /**","       * @method renderComponent","       */","      renderComponent: function () {","         var html, ul;","","         html = Y.Array.reduce(this.options.items, '', this.renderListItem, this);","         html = substitute(DDListField.LIST_TEMPLATE, {items: html});","","         ul = create(html);","         ul.appendTo(this.fieldContainer);","","         this.sortable = new Y.Sortable({","            container: ul,","            nodes:     '.' + DDListField.LIST_ITEM_CLASS,","            opacity:   '.1'","         });","         ","         this.sortable.delegate.dd.on('drag:end', function(e) {","            this.fireUpdatedEvt();","         }, this);","         ","      },","","      /**","       * @method renderListItem","       */","      renderListItem: function (previousValue, currentValue) {","         return previousValue + substitute(DDListField.LIST_ITEM_TEMPLATE, {","            'class': DDListField.LIST_ITEM_CLASS,","            'value': currentValue[this.options.valueKey],","            'label': currentValue[this.options.labelKey],","            'name':  this.options.name","         });","      },","","      /**","       * @method addItem","       */","      addItem: function (item) {","         var ul = this.sortable.get('container');","         var a = this.renderListItem('', item);","         var newLi = Y.Node.create(a);","         ul.append(newLi);","         this.sortable.sync();","      },","      ","      /**","       * @method removeItem","       */","      removeItem: function (item) {","         // TODO","         ","         this.sortable.sync();","      },","","      /**","       * @method getValue","       */","      getValue: function () {","         return Y.one(this.fieldContainer)","                 .all('.'+DDListField.LIST_ITEM_CLASS+' input')","                 .get('value');","      }","","   });","","   inputEx.DDListField = DDListField;","   inputEx.registerType(\"ddlist\", DDListField);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\", \"array-extras\", \"sortable\", \"substitute\"], \"skinnable\": true});"];
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].lines = {"1":0,"6":0,"26":0,"27":0,"30":0,"32":0,"34":0,"40":0,"45":0,"47":0,"48":0,"49":0,"50":0,"52":0,"53":0,"61":0,"63":0,"64":0,"66":0,"67":0,"69":0,"75":0,"76":0,"85":0,"97":0,"98":0,"99":0,"100":0,"101":0,"110":0,"117":0,"124":0,"125":0};
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].functions = {"DDListField:26":0,"setOptions:44":0,"(anonymous 2):75":0,"renderComponent:60":0,"renderListItem:84":0,"addItem:96":0,"removeItem:107":0,"getValue:116":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].coveredLines = 33;
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].coveredFunctions = 9;
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 1);
YUI.add('inputex-ddlist', function (Y, NAME) {

/**
 * @module inputex-ddlist
 */
   _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 6);
var lang       = Y.Lang,
       inputEx    = Y.inputEx,
       create     = Y.Node.create,
       substitute = Y.substitute,
       DDListField;

   /**
    * Create a sortable list field with drag and drop
    *
    * @class inputEx.DDListField
    * @extends inputEx.Field
    * @constructor
    * @param {Object} options Added options:
    * <ul>
    *	   <li>items: list of option elements configurations</li>
    *    <li>name: hidden inputs name</li>
    *    <li>valueKey: value key</li>
    *    <li>labelKey: label key</li>
    * </ul>
    */
   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 26);
DDListField = function (options) {
      _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "DDListField", 26);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 27);
DDListField.superclass.constructor.call(this, options);
   };

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 30);
DDListField.LIST_TEMPLATE = '<ul class="inputEx-ddlist">{items}</ul>';

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 32);
DDListField.LIST_ITEM_CLASS = 'inputEx-ddlist-item';

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 34);
DDListField.LIST_ITEM_TEMPLATE =
      '<li class="{class}">' +
         '<span class="inputEx-ddlist-item-label">{label}</span>' +
         '<input type="hidden" name="{name}" value="{value}" />' +
      '</li>';

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 40);
Y.extend(DDListField, inputEx.Field, {
      /**
       * @method setOptions
       */
      setOptions: function (options) {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "setOptions", 44);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 45);
DDListField.superclass.setOptions.call(this, options);

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 47);
this.options.items    = lang.isArray(options.items) ? options.items : [];
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 48);
this.options.valueKey = options.valueKey || "value";
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 49);
this.options.labelKey = options.labelKey || "label";
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 50);
this.options.name     = options.name || Y.guid();

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 52);
if (this.options.name.substr(-2) !== '[]') {
            _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 53);
this.options.name += '[]';
         }
      },

      /**
       * @method renderComponent
       */
      renderComponent: function () {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "renderComponent", 60);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 61);
var html, ul;

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 63);
html = Y.Array.reduce(this.options.items, '', this.renderListItem, this);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 64);
html = substitute(DDListField.LIST_TEMPLATE, {items: html});

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 66);
ul = create(html);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 67);
ul.appendTo(this.fieldContainer);

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 69);
this.sortable = new Y.Sortable({
            container: ul,
            nodes:     '.' + DDListField.LIST_ITEM_CLASS,
            opacity:   '.1'
         });
         
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 75);
this.sortable.delegate.dd.on('drag:end', function(e) {
            _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "(anonymous 2)", 75);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 76);
this.fireUpdatedEvt();
         }, this);
         
      },

      /**
       * @method renderListItem
       */
      renderListItem: function (previousValue, currentValue) {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "renderListItem", 84);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 85);
return previousValue + substitute(DDListField.LIST_ITEM_TEMPLATE, {
            'class': DDListField.LIST_ITEM_CLASS,
            'value': currentValue[this.options.valueKey],
            'label': currentValue[this.options.labelKey],
            'name':  this.options.name
         });
      },

      /**
       * @method addItem
       */
      addItem: function (item) {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "addItem", 96);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 97);
var ul = this.sortable.get('container');
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 98);
var a = this.renderListItem('', item);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 99);
var newLi = Y.Node.create(a);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 100);
ul.append(newLi);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 101);
this.sortable.sync();
      },
      
      /**
       * @method removeItem
       */
      removeItem: function (item) {
         // TODO
         
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "removeItem", 107);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 110);
this.sortable.sync();
      },

      /**
       * @method getValue
       */
      getValue: function () {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "getValue", 116);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 117);
return Y.one(this.fieldContainer)
                 .all('.'+DDListField.LIST_ITEM_CLASS+' input')
                 .get('value');
      }

   });

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 124);
inputEx.DDListField = DDListField;
   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 125);
inputEx.registerType("ddlist", DDListField);


}, '@VERSION@', {"requires": ["inputex-field", "array-extras", "sortable", "substitute"], "skinnable": true});
