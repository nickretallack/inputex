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
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].code=["YUI.add('inputex-ddlist', function (Y, NAME) {","","/**"," * @module inputex-ddlist"," */","YUI.add('inputex-ddlist', function (Y) {","","   var lang       = Y.Lang,","       inputEx    = Y.inputEx,","       create     = Y.Node.create,","       substitute = Y.substitute,","       DDListField;","","   /**","    * Create a sortable list field with drag and drop","    *","    * @class inputEx.DDListField","    * @extends inputEx.Field","    * @constructor","    * @param {Object} options Added options:","    * <ul>","    *	   <li>items: list of option elements configurations</li>","    *    <li>name: hidden inputs name</li>","    *    <li>valueKey: value key</li>","    *    <li>labelKey: label key</li>","    * </ul>","    */","   DDListField = function (options) {","      DDListField.superclass.constructor.call(this, options);","   };","","   DDListField.LIST_TEMPLATE = '<ul class=\"inputEx-ddlist\">{items}</ul>';","","   DDListField.LIST_ITEM_CLASS = 'inputEx-ddlist-item';","","   DDListField.LIST_ITEM_TEMPLATE =","      '<li class=\"{class}\">' +","         '<span class=\"inputEx-ddlist-item-label\">{label}</span>' +","         '<input type=\"hidden\" name=\"{name}\" value=\"{value}\" />' +","      '</li>';","","   Y.extend(DDListField, inputEx.Field, {","      /**","       * @method setOptions","       */","      setOptions: function (options) {","         DDListField.superclass.setOptions.call(this, options);","","         this.options.items    = lang.isArray(options.items) ? options.items : [];","         this.options.valueKey = options.valueKey || \"value\";","         this.options.labelKey = options.labelKey || \"label\";","         this.options.name     = options.name || Y.guid();","","         if (this.options.name.substr(-2) !== '[]') {","            this.options.name += '[]';","         }","      },","","      /**","       * @method renderComponent","       */","      renderComponent: function () {","         var html, ul;","","         html = Y.Array.reduce(this.options.items, '', this.renderListItem, this);","         html = substitute(DDListField.LIST_TEMPLATE, {items: html});","","         ul = create(html);","         ul.appendTo(this.fieldContainer);","","         this.sortable = new Y.Sortable({","            container: ul,","            nodes:     '.' + DDListField.LIST_ITEM_CLASS,","            opacity:   '.1'","         });","         ","         this.sortable.delegate.dd.on('drag:end', function(e) {","            this.fireUpdatedEvt();","         }, this);","         ","      },","","      /**","       * @method renderListItem","       */","      renderListItem: function (previousValue, currentValue) {","         return previousValue + substitute(DDListField.LIST_ITEM_TEMPLATE, {","            'class': DDListField.LIST_ITEM_CLASS,","            'value': currentValue[this.options.valueKey],","            'label': currentValue[this.options.labelKey],","            'name':  this.options.name","         });","      },","","      /**","       * @method addItem","       */","      addItem: function (item) {","         var ul = this.sortable.get('container');","         var a = this.renderListItem('', item);","         var newLi = Y.Node.create(a);","         ul.append(newLi);","         this.sortable.sync();","      },","      ","      /**","       * @method removeItem","       */","      removeItem: function (item) {","         // TODO","         ","         this.sortable.sync();","      },","","      /**","       * @method getValue","       */","      getValue: function () {","         return Y.one(this.fieldContainer)","                 .all('.'+DDListField.LIST_ITEM_CLASS+' input')","                 .get('value');","      }","","   });","","   inputEx.DDListField = DDListField;","   inputEx.registerType(\"ddlist\", DDListField);","","}, '3.1.0', {","   requires: ['inputex-field', 'array-extras', 'sortable', 'substitute']","});","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].lines = {"1":0,"6":0,"8":0,"28":0,"29":0,"32":0,"34":0,"36":0,"42":0,"47":0,"49":0,"50":0,"51":0,"52":0,"54":0,"55":0,"63":0,"65":0,"66":0,"68":0,"69":0,"71":0,"77":0,"78":0,"87":0,"99":0,"100":0,"101":0,"102":0,"103":0,"112":0,"119":0,"126":0,"127":0};
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].functions = {"DDListField:28":0,"setOptions:46":0,"(anonymous 3):77":0,"renderComponent:62":0,"renderListItem:86":0,"addItem:98":0,"removeItem:109":0,"getValue:118":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].coveredLines = 34;
_yuitest_coverage["build/inputex-ddlist/inputex-ddlist.js"].coveredFunctions = 10;
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 1);
YUI.add('inputex-ddlist', function (Y, NAME) {

/**
 * @module inputex-ddlist
 */
_yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 6);
YUI.add('inputex-ddlist', function (Y) {

   _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 8);
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
   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 28);
DDListField = function (options) {
      _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "DDListField", 28);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 29);
DDListField.superclass.constructor.call(this, options);
   };

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 32);
DDListField.LIST_TEMPLATE = '<ul class="inputEx-ddlist">{items}</ul>';

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 34);
DDListField.LIST_ITEM_CLASS = 'inputEx-ddlist-item';

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 36);
DDListField.LIST_ITEM_TEMPLATE =
      '<li class="{class}">' +
         '<span class="inputEx-ddlist-item-label">{label}</span>' +
         '<input type="hidden" name="{name}" value="{value}" />' +
      '</li>';

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 42);
Y.extend(DDListField, inputEx.Field, {
      /**
       * @method setOptions
       */
      setOptions: function (options) {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "setOptions", 46);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 47);
DDListField.superclass.setOptions.call(this, options);

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 49);
this.options.items    = lang.isArray(options.items) ? options.items : [];
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 50);
this.options.valueKey = options.valueKey || "value";
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 51);
this.options.labelKey = options.labelKey || "label";
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 52);
this.options.name     = options.name || Y.guid();

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 54);
if (this.options.name.substr(-2) !== '[]') {
            _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 55);
this.options.name += '[]';
         }
      },

      /**
       * @method renderComponent
       */
      renderComponent: function () {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "renderComponent", 62);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 63);
var html, ul;

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 65);
html = Y.Array.reduce(this.options.items, '', this.renderListItem, this);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 66);
html = substitute(DDListField.LIST_TEMPLATE, {items: html});

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 68);
ul = create(html);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 69);
ul.appendTo(this.fieldContainer);

         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 71);
this.sortable = new Y.Sortable({
            container: ul,
            nodes:     '.' + DDListField.LIST_ITEM_CLASS,
            opacity:   '.1'
         });
         
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 77);
this.sortable.delegate.dd.on('drag:end', function(e) {
            _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "(anonymous 3)", 77);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 78);
this.fireUpdatedEvt();
         }, this);
         
      },

      /**
       * @method renderListItem
       */
      renderListItem: function (previousValue, currentValue) {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "renderListItem", 86);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 87);
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
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "addItem", 98);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 99);
var ul = this.sortable.get('container');
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 100);
var a = this.renderListItem('', item);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 101);
var newLi = Y.Node.create(a);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 102);
ul.append(newLi);
         _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 103);
this.sortable.sync();
      },
      
      /**
       * @method removeItem
       */
      removeItem: function (item) {
         // TODO
         
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "removeItem", 109);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 112);
this.sortable.sync();
      },

      /**
       * @method getValue
       */
      getValue: function () {
         _yuitest_coverfunc("build/inputex-ddlist/inputex-ddlist.js", "getValue", 118);
_yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 119);
return Y.one(this.fieldContainer)
                 .all('.'+DDListField.LIST_ITEM_CLASS+' input')
                 .get('value');
      }

   });

   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 126);
inputEx.DDListField = DDListField;
   _yuitest_coverline("build/inputex-ddlist/inputex-ddlist.js", 127);
inputEx.registerType("ddlist", DDListField);

}, '3.1.0', {
   requires: ['inputex-field', 'array-extras', 'sortable', 'substitute']
});

}, '@VERSION@');
