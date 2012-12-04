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
_yuitest_coverage["build/inputex-color/inputex-color.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-color/inputex-color.js",
    code: []
};
_yuitest_coverage["build/inputex-color/inputex-color.js"].code=["YUI.add('inputex-color', function (Y, NAME) {","","/**"," * @module inputex-color"," */","   var inputEx = Y.inputEx;","   ","/**"," * Create a Color picker input field"," * @class inputEx.ColorField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options for ColorField:"," * <ul>"," *   <li>colors: list of colors to load as palette</li>"," *   <li>palette: default palette to be used (if colors option not provided)</li>"," *   <li>cellPerLine: how many colored cells in a row on the palette</li>"," *   <li>ratio: screen-like ratio to display the palette, syntax: [with,height], default: [16,9] (if cellPerLine not provided)</li>"," *   <li>zIndex: zIndex of the overlay</li>"," * </ul>"," */","inputEx.ColorField = function (options) {","   inputEx.ColorField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.ColorField, inputEx.Field, {","   ","   /**","    * Adds the 'inputEx-ColorField' default className","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function (options) {","      inputEx.ColorField.superclass.setOptions.call(this, options);","      ","      // Overwrite options","      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ColorField';","      this.options.zIndex = options.zIndex || 4;","      ","      // Added options","      this.options.palette = options.palette;","      this.options.colors = options.colors;","      ","      if (options.ratio) { this.options.ratio = options.ratio;}","      if (options.cellPerLine) { this.options.cellPerLine = options.cellPerLine;}","   },","   ","   /**","    * @method renderOverlay","    */","   renderOverlay: function () {","      ","      // Create overlay","      this.oOverlay = new Y.Overlay({","         visible:false,","         zIndex: this.options.zIndex","      });","      this.oOverlay.render(this.fieldContainer);","      ","      this.oOverlay.on('visibleChange', function (e) {","         ","         if (e.newVal) { // show","            // align","            this.oOverlay.set(\"align\", {node:this.buttonWrapper,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});","            ","            // Activate outside event handler","            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {","               // hide the overlay if","               //   - the target is not the button, and","               //   - the target is not the colorEl","               if (e.target !== this.button && e.target._node !== this.colorEl){","                  this.oOverlay.hide();","               }","            }, this);","         }","         else { // hide","            this.outsideHandler.detach();","         }","         ","      }, this);","   },","   ","   /**","    * @method _toggleOverlay","    * @private","    */","   _toggleOverlay: function (e) {","       // PreventDefault to prevent submit in a form","       e.preventDefault();","       ","       // palette may not have been rendered yet","       this.renderPalette();","       ","       this.oOverlay[this.oOverlay.get('visible') ? 'hide' : 'show']();","   },","   ","   /**","    * Render the color button and the colorpicker popup","    * @method renderComponent","    */","   renderComponent: function () {","      ","      // A hidden input field to store the color code","      this.el = inputEx.cn('input', {","         type: 'hidden',","         name: this.options.name || '',","         value: this.options.value || '#FFFFFF'","      });","      ","      // Create a colored area","      this.colorEl = inputEx.cn('div', {className: 'inputEx-ColorField-colorArea'}, {backgroundColor: this.el.value});","      ","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-ColorField-Wrapper'});","      this.wrapEl.appendChild(this.el);","      this.wrapEl.appendChild(this.colorEl);","      ","      ","      // Create button + wrapper","      this.buttonWrapper = Y.Node.create('<span class=\"inputEx-ColorField-ButtonWrapper\">' +","                                            '<button type=\"button\" class=\"inputEx-ColorField-Button\">' +","                                            '</button>' +","                                         '</span>');","      ","      this.buttonWrapper.appendTo(this.wrapEl);","      ","      // get a reference to the <button> element","      this.button = this.buttonWrapper.one('.inputEx-ColorField-Button');","      ","      // toggle Menu when clicking on the button","      this.button.on('click',this._toggleOverlay, this, true);","      ","      // toggle Menu when clicking on colorEl","      Y.one(this.colorEl).on('click',this._toggleOverlay,this,true);","      ","      // Elements are bound to divEl","      this.fieldContainer.appendChild(this.wrapEl);","   },","   ","   /**","    * @method renderPalette","    */","   renderPalette: function () {","      ","      if (!this.oOverlay) {","         this.renderOverlay();","      }","      ","      // render once !","      if (this.paletteRendered) { return; }","      ","      var defaultPalette;","","      // set default palette to be used","      defaultPalette = this.options.palette || 1;","","      // set colors available","      this.colors = this.options.colors || this.setDefaultColors(defaultPalette);","      this.length = this.colors.length;","","      // set PopUp size ratio (default 16/9 ratio)","      this.ratio = this.options.ratio || [16,9];","","      // set color grid dimensions","      this.cellPerLine = this.options.cellPerLine || Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));","      this.cellPerColumn = Math.ceil(this.length/this.cellPerLine);","","      // Render the color grid","      this.colorGrid = this.renderColorGrid();","      this.oOverlay.set('bodyContent', this.colorGrid);","","      this.paletteRendered = true;","      ","      // Select the square in the created palette from the value","      // This must be done after \"this.paletteRendered = true\".","      this.markSelectedColor();","   },","   ","   /**","    * Set the colors to set in the picker","    * @method setDefaultColors","    * @param {int} index Index of the palette to use","    * @return {Array} List of colors to choose from","    */","   setDefaultColors: function (index) {","      return inputEx.ColorField.palettes[index-1];","   },","         ","   /**","    * This creates a color grid","    * @method renderColorGrid","    */","   renderColorGrid: function () {","      ","      var gridEl, gridNode, square, i;","      ","      // remember squares","      this.squares = [];","   ","      // container","      gridEl = inputEx.cn('div', {className: 'inputEx-ColorField-Grid'});","            ","      for (i = 0 ; i < this.length ; i++) {","         ","         square = inputEx.cn('div', {className: 'inputEx-ColorField-square'},{backgroundColor: this.colors[i] });","         gridEl.appendChild(square);","         ","         this.squares.push(square);","         ","         // <br clear='both'/> insertion to end a line","         // ( + always after the last colored square)","         if (i % this.cellPerLine === this.cellPerLine - 1 || i === this.length - 1) {","            gridEl.appendChild(inputEx.cn('br',{clear:'both'}));","         }","      }","      ","      gridNode = Y.one(gridEl);","      ","      // click event delegation","      gridNode.delegate(\"click\", Y.bind(this.onColorClick, this), \"div.inputEx-ColorField-square\");","        ","      return gridNode;","   },","      ","   /**","    * Handle a color selection","    * @method onColorClick","    * @param {Event} e The original click event","    */","   onColorClick: function (e) {","      ","      var color, hexaColor;","      ","      // Stop the event to prevent a selection","      e.halt();","      ","      // Overlay closure","      this.oOverlay.hide();","       ","      // SetValue","      color     = e.currentTarget.getStyle('backgroundColor');","      hexaColor = inputEx.ColorField.ensureHexa(color);","      ","      this.setValue(hexaColor);","   },","   ","   /**","    * Set the value","    * @method setValue","    * @param {String} value Color to set","    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not","    *                                             (default is true, pass false to NOT send the event)","    */","   setValue: function (value, sendUpdatedEvt) {","      ","      this.el.value = value;","   ","      this.markSelectedColor(value);","","      // Call Field.setValue to set class and fire updated event","      inputEx.ColorField.superclass.setValue.call(this,value, sendUpdatedEvt);","   },","      ","   /**","    * Return the color value","    * @method getValue","    * @return {String} Color value","    */","   getValue: function () {","      return this.el.value;","   },","   ","   /**","    * Call overlay when field is removed","    * @method close","    */","   close: function () {","      if (this.oOverlay) {","         this.oOverlay.hide();","      }","   },","   ","   /**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function () {","      ","      this.button.purge();","      ","      Y.one(this.colorEl).purge();","      ","      if (this.colorGrid) {","         this.colorGrid.purge();","      }","      ","      inputEx.ColorField.superclass.destroy.call(this);","      ","   },","   ","   /**","    * @method markSelectedColor","    */","   markSelectedColor: function (value) {","      ","      var i;","      ","      value = value || this.getValue();","      ","      // mark the colored square in the palette as 'selected'","      if (!!value && this.paletteRendered) {","         ","         value = value.toLowerCase(); // normalize case for following test","         ","         for (i=0; i<this.length; i++) {","            ","            // test color in lower case","            if (this.colors[i].toLowerCase() === value) {","               Y.one(this.squares[i]).addClass('selected');","            } else {","               Y.one(this.squares[i]).removeClass('selected');","            }","            ","         }","         ","      }","      ","      // set background color on colorEl","      Y.one(this.colorEl).setStyle('backgroundColor', this.el.value);","      ","   }","   ","});","","/**"," * Default palettes"," * @property palettes"," */","inputEx.ColorField.palettes = [","   [\"#FFEA99\",\"#FFFF66\",\"#FFCC99\",\"#FFCAB2\",\"#FF99AD\",\"#FFD6FF\",\"#FF6666\",\"#E8EEF7\",","    \"#ADC2FF\",\"#ADADFF\",\"#CCFFFF\",\"#D6EAAD\",\"#B5EDBC\",\"#CCFF99\"],","   [\"#DEDFDE\",\"#FFFF6B\",\"#EFCB7B\",\"#FFBE94\",\"#FFB6B5\",\"#A5E3FF\",\"#A5CBFF\",\"#99ABEF\",","   \"#EFB2E7\",\"#FF9AAD\",\"#94E7C6\",\"#A5FFD6\",\"#CEFFA5\",\"#E7EF9C\",\"#FFE38C\"],","   [\"#000000\",\"#993300\",\"#333300\",\"#003300\",\"#003366\",\"#000080\",\"#333399\",\"#333333\",","    \"#800000\",\"#FF6600\",\"#808000\",\"#008000\",\"#008080\",\"#0000FF\",\"#666699\",\"#808080\",","    \"#FF0000\",\"#FF9900\",\"#99CC00\",\"#339966\",\"#33CCCC\",\"#3366FF\",\"#800080\",\"#969696\",","    \"#FF00FF\",\"#FFCC00\",\"#FFFF00\",\"#00FF00\",\"#00FFFF\",\"#00CCFF\",\"#993366\",\"#C0C0C0\",","    \"#FF99CC\",\"#FFCC99\",\"#FFFF99\",\"#CCFFCC\",\"#CCFFFF\",\"#99CCFF\",\"#CC99FF\",\"#F0F0F0\"],","   [\"#FFFFCC\",\"#FFFF99\",\"#CCFFCC\",\"#CCFF66\",\"#99FFCC\",\"#CCFFFF\",\"#66CCCC\",\"#CCCCFF\",","    \"#99CCFF\",\"#9999FF\",\"#6666CC\",\"#9966CC\",\"#CC99FF\",\"#FFCCFF\",\"#FF99FF\",\"#CC66CC\",","    \"#FFCCCC\",\"#FF99CC\",\"#FFCCCC\",\"#CC6699\",\"#FF9999\",\"#FF9966\",\"#FFCC99\",\"#FFFFCC\",","    \"#FFCC66\",\"#FFFF99\",\"#CCCC66\"],","   [\"#D0D0D0\",\"#31A8FA\",\"#8EC1E5\",\"#58D7CF\",\"#89E2BB\",\"#A7F7F8\",\"#F6B77C\",\"#FE993F\",","    \"#FE6440\",\"#F56572\",\"#FA9AA3\",\"#F7B1CA\",\"#E584AF\",\"#D1C3EF\",\"#AB77B8\",\"#C69FE7\",","    \"#90D28A\",\"#C2F175\",\"#EDEA9A\",\"#F3DF70\",\"#F8D1AE\",\"#F98064\",\"#F54F5E\",\"#EC9099\",","    \"#F0B5BA\",\"#EDA0BB\",\"#D375AC\",\"#BC8DBE\",\"#8C77B8\"],","   // idem in pastel tone (colors above with opacity 0.6 on white background)","   [\"#EEEEEE\",\"#84CBFC\",\"#BCDAF0\",\"#9BE7E3\",\"#B9EED7\",\"#CBFBFB\",\"#FAD4B1\",\"#FFC28C\",","    \"#FFA28D\",\"#F9A3AB\",\"#FCC3C8\",\"#FBD1E0\",\"#F0B6CF\",\"#E4DBF6\",\"#CDAED5\",\"#DDC6F1\",","    \"#BDE4B9\",\"#DBF7AD\",\"#F5F3C3\",\"#F8ECAA\",\"#FBE4CF\",\"#FCB3A2\",\"#F9969F\",\"#F4BDC2\",","    \"#F6D3D6\",\"#F5C6D7\",\"#E5ADCE\",\"#D7BBD8\",\"#BAAED5\"]","];","","//  -> ensure color has hexadecimal format like \"#FF8E00\"","inputEx.ColorField.ensureHexa = function (color) {","   ","   var rgb, hexaColor, decToHex;","   ","   // remove spaces","   color = color.replace(/\\s/g, \"\");","   ","   // Firefox, Safari","   //   -> format \"rgb(255,143,28)\"","   if (!!color.match(/^rgb\\((?:\\d{1,3},){2}\\d{1,3}\\)$/)) {","      ","      // Convert integer (int or string) to hexadecimal (2 chars)","      //   ex: \"214\" -> \"d6\"","      decToHex = function (dec) {","         var r = parseInt(dec, 10).toString(16);","         if (r.length === 1) { r = \"0\" + r; }","         return r;","      };","      ","      rgb = color.split(/([(,)])/);","      hexaColor = '#' + decToHex(rgb[2]) + decToHex(rgb[4]) + decToHex(rgb[6]);","      ","   // IE, Opera","   //   -> format \"#FE6D34\"","   } else if (!!color.match(/^#[\\da-fA-F]{6}$/)) {","      hexaColor = color;","      ","   } else {","      // defaults to white if invalid color","      hexaColor = \"#FFFFFF\";","   }","   ","   return hexaColor;","};","","// Register this class as \"color\" type","inputEx.registerType(\"color\", inputEx.ColorField, []);","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-field\",","        \"node-event-delegate\",","        \"event-outside\",","        \"overlay\"","    ],","    \"skinnable\": true,","    \"ix_provides\": \"color\"","});"];
_yuitest_coverage["build/inputex-color/inputex-color.js"].lines = {"1":0,"6":0,"22":0,"23":0,"25":0,"33":0,"36":0,"37":0,"40":0,"41":0,"43":0,"44":0,"53":0,"57":0,"59":0,"61":0,"63":0,"66":0,"70":0,"71":0,"76":0,"88":0,"91":0,"93":0,"103":0,"110":0,"113":0,"114":0,"115":0,"119":0,"124":0,"127":0,"130":0,"133":0,"136":0,"144":0,"145":0,"149":0,"151":0,"154":0,"157":0,"158":0,"161":0,"164":0,"165":0,"168":0,"169":0,"171":0,"175":0,"185":0,"194":0,"197":0,"200":0,"202":0,"204":0,"205":0,"207":0,"211":0,"212":0,"216":0,"219":0,"221":0,"231":0,"234":0,"237":0,"240":0,"241":0,"243":0,"255":0,"257":0,"260":0,"269":0,"277":0,"278":0,"288":0,"290":0,"292":0,"293":0,"296":0,"305":0,"307":0,"310":0,"312":0,"314":0,"317":0,"318":0,"320":0,"328":0,"338":0,"364":0,"366":0,"369":0,"373":0,"377":0,"378":0,"379":0,"380":0,"383":0,"384":0,"388":0,"389":0,"393":0,"396":0,"400":0};
_yuitest_coverage["build/inputex-color/inputex-color.js"].functions = {"ColorField:22":0,"setOptions:32":0,"(anonymous 3):66":0,"(anonymous 2):59":0,"renderOverlay:50":0,"_toggleOverlay:86":0,"renderComponent:100":0,"renderPalette:142":0,"setDefaultColors:184":0,"renderColorGrid:192":0,"onColorClick:229":0,"setValue:253":0,"getValue:268":0,"close:276":0,"destroy:286":0,"markSelectedColor:303":0,"decToHex:377":0,"ensureHexa:364":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-color/inputex-color.js"].coveredLines = 104;
_yuitest_coverage["build/inputex-color/inputex-color.js"].coveredFunctions = 19;
_yuitest_coverline("build/inputex-color/inputex-color.js", 1);
YUI.add('inputex-color', function (Y, NAME) {

/**
 * @module inputex-color
 */
   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-color/inputex-color.js", 6);
var inputEx = Y.inputEx;
   
/**
 * Create a Color picker input field
 * @class inputEx.ColorField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options for ColorField:
 * <ul>
 *   <li>colors: list of colors to load as palette</li>
 *   <li>palette: default palette to be used (if colors option not provided)</li>
 *   <li>cellPerLine: how many colored cells in a row on the palette</li>
 *   <li>ratio: screen-like ratio to display the palette, syntax: [with,height], default: [16,9] (if cellPerLine not provided)</li>
 *   <li>zIndex: zIndex of the overlay</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-color/inputex-color.js", 22);
inputEx.ColorField = function (options) {
   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "ColorField", 22);
_yuitest_coverline("build/inputex-color/inputex-color.js", 23);
inputEx.ColorField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-color/inputex-color.js", 25);
Y.extend(inputEx.ColorField, inputEx.Field, {
   
   /**
    * Adds the 'inputEx-ColorField' default className
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function (options) {
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "setOptions", 32);
_yuitest_coverline("build/inputex-color/inputex-color.js", 33);
inputEx.ColorField.superclass.setOptions.call(this, options);
      
      // Overwrite options
      _yuitest_coverline("build/inputex-color/inputex-color.js", 36);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ColorField';
      _yuitest_coverline("build/inputex-color/inputex-color.js", 37);
this.options.zIndex = options.zIndex || 4;
      
      // Added options
      _yuitest_coverline("build/inputex-color/inputex-color.js", 40);
this.options.palette = options.palette;
      _yuitest_coverline("build/inputex-color/inputex-color.js", 41);
this.options.colors = options.colors;
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 43);
if (options.ratio) { this.options.ratio = options.ratio;}
      _yuitest_coverline("build/inputex-color/inputex-color.js", 44);
if (options.cellPerLine) { this.options.cellPerLine = options.cellPerLine;}
   },
   
   /**
    * @method renderOverlay
    */
   renderOverlay: function () {
      
      // Create overlay
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderOverlay", 50);
_yuitest_coverline("build/inputex-color/inputex-color.js", 53);
this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });
      _yuitest_coverline("build/inputex-color/inputex-color.js", 57);
this.oOverlay.render(this.fieldContainer);
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 59);
this.oOverlay.on('visibleChange', function (e) {
         
         _yuitest_coverfunc("build/inputex-color/inputex-color.js", "(anonymous 2)", 59);
_yuitest_coverline("build/inputex-color/inputex-color.js", 61);
if (e.newVal) { // show
            // align
            _yuitest_coverline("build/inputex-color/inputex-color.js", 63);
this.oOverlay.set("align", {node:this.buttonWrapper,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});
            
            // Activate outside event handler
            _yuitest_coverline("build/inputex-color/inputex-color.js", 66);
this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               // hide the overlay if
               //   - the target is not the button, and
               //   - the target is not the colorEl
               _yuitest_coverfunc("build/inputex-color/inputex-color.js", "(anonymous 3)", 66);
_yuitest_coverline("build/inputex-color/inputex-color.js", 70);
if (e.target !== this.button && e.target._node !== this.colorEl){
                  _yuitest_coverline("build/inputex-color/inputex-color.js", 71);
this.oOverlay.hide();
               }
            }, this);
         }
         else { // hide
            _yuitest_coverline("build/inputex-color/inputex-color.js", 76);
this.outsideHandler.detach();
         }
         
      }, this);
   },
   
   /**
    * @method _toggleOverlay
    * @private
    */
   _toggleOverlay: function (e) {
       // PreventDefault to prevent submit in a form
       _yuitest_coverfunc("build/inputex-color/inputex-color.js", "_toggleOverlay", 86);
_yuitest_coverline("build/inputex-color/inputex-color.js", 88);
e.preventDefault();
       
       // palette may not have been rendered yet
       _yuitest_coverline("build/inputex-color/inputex-color.js", 91);
this.renderPalette();
       
       _yuitest_coverline("build/inputex-color/inputex-color.js", 93);
this.oOverlay[this.oOverlay.get('visible') ? 'hide' : 'show']();
   },
   
   /**
    * Render the color button and the colorpicker popup
    * @method renderComponent
    */
   renderComponent: function () {
      
      // A hidden input field to store the color code
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderComponent", 100);
_yuitest_coverline("build/inputex-color/inputex-color.js", 103);
this.el = inputEx.cn('input', {
         type: 'hidden',
         name: this.options.name || '',
         value: this.options.value || '#FFFFFF'
      });
      
      // Create a colored area
      _yuitest_coverline("build/inputex-color/inputex-color.js", 110);
this.colorEl = inputEx.cn('div', {className: 'inputEx-ColorField-colorArea'}, {backgroundColor: this.el.value});
      
      // This element wraps the input node in a float: none div
      _yuitest_coverline("build/inputex-color/inputex-color.js", 113);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-ColorField-Wrapper'});
      _yuitest_coverline("build/inputex-color/inputex-color.js", 114);
this.wrapEl.appendChild(this.el);
      _yuitest_coverline("build/inputex-color/inputex-color.js", 115);
this.wrapEl.appendChild(this.colorEl);
      
      
      // Create button + wrapper
      _yuitest_coverline("build/inputex-color/inputex-color.js", 119);
this.buttonWrapper = Y.Node.create('<span class="inputEx-ColorField-ButtonWrapper">' +
                                            '<button type="button" class="inputEx-ColorField-Button">' +
                                            '</button>' +
                                         '</span>');
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 124);
this.buttonWrapper.appendTo(this.wrapEl);
      
      // get a reference to the <button> element
      _yuitest_coverline("build/inputex-color/inputex-color.js", 127);
this.button = this.buttonWrapper.one('.inputEx-ColorField-Button');
      
      // toggle Menu when clicking on the button
      _yuitest_coverline("build/inputex-color/inputex-color.js", 130);
this.button.on('click',this._toggleOverlay, this, true);
      
      // toggle Menu when clicking on colorEl
      _yuitest_coverline("build/inputex-color/inputex-color.js", 133);
Y.one(this.colorEl).on('click',this._toggleOverlay,this,true);
      
      // Elements are bound to divEl
      _yuitest_coverline("build/inputex-color/inputex-color.js", 136);
this.fieldContainer.appendChild(this.wrapEl);
   },
   
   /**
    * @method renderPalette
    */
   renderPalette: function () {
      
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderPalette", 142);
_yuitest_coverline("build/inputex-color/inputex-color.js", 144);
if (!this.oOverlay) {
         _yuitest_coverline("build/inputex-color/inputex-color.js", 145);
this.renderOverlay();
      }
      
      // render once !
      _yuitest_coverline("build/inputex-color/inputex-color.js", 149);
if (this.paletteRendered) { return; }
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 151);
var defaultPalette;

      // set default palette to be used
      _yuitest_coverline("build/inputex-color/inputex-color.js", 154);
defaultPalette = this.options.palette || 1;

      // set colors available
      _yuitest_coverline("build/inputex-color/inputex-color.js", 157);
this.colors = this.options.colors || this.setDefaultColors(defaultPalette);
      _yuitest_coverline("build/inputex-color/inputex-color.js", 158);
this.length = this.colors.length;

      // set PopUp size ratio (default 16/9 ratio)
      _yuitest_coverline("build/inputex-color/inputex-color.js", 161);
this.ratio = this.options.ratio || [16,9];

      // set color grid dimensions
      _yuitest_coverline("build/inputex-color/inputex-color.js", 164);
this.cellPerLine = this.options.cellPerLine || Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));
      _yuitest_coverline("build/inputex-color/inputex-color.js", 165);
this.cellPerColumn = Math.ceil(this.length/this.cellPerLine);

      // Render the color grid
      _yuitest_coverline("build/inputex-color/inputex-color.js", 168);
this.colorGrid = this.renderColorGrid();
      _yuitest_coverline("build/inputex-color/inputex-color.js", 169);
this.oOverlay.set('bodyContent', this.colorGrid);

      _yuitest_coverline("build/inputex-color/inputex-color.js", 171);
this.paletteRendered = true;
      
      // Select the square in the created palette from the value
      // This must be done after "this.paletteRendered = true".
      _yuitest_coverline("build/inputex-color/inputex-color.js", 175);
this.markSelectedColor();
   },
   
   /**
    * Set the colors to set in the picker
    * @method setDefaultColors
    * @param {int} index Index of the palette to use
    * @return {Array} List of colors to choose from
    */
   setDefaultColors: function (index) {
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "setDefaultColors", 184);
_yuitest_coverline("build/inputex-color/inputex-color.js", 185);
return inputEx.ColorField.palettes[index-1];
   },
         
   /**
    * This creates a color grid
    * @method renderColorGrid
    */
   renderColorGrid: function () {
      
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderColorGrid", 192);
_yuitest_coverline("build/inputex-color/inputex-color.js", 194);
var gridEl, gridNode, square, i;
      
      // remember squares
      _yuitest_coverline("build/inputex-color/inputex-color.js", 197);
this.squares = [];
   
      // container
      _yuitest_coverline("build/inputex-color/inputex-color.js", 200);
gridEl = inputEx.cn('div', {className: 'inputEx-ColorField-Grid'});
            
      _yuitest_coverline("build/inputex-color/inputex-color.js", 202);
for (i = 0 ; i < this.length ; i++) {
         
         _yuitest_coverline("build/inputex-color/inputex-color.js", 204);
square = inputEx.cn('div', {className: 'inputEx-ColorField-square'},{backgroundColor: this.colors[i] });
         _yuitest_coverline("build/inputex-color/inputex-color.js", 205);
gridEl.appendChild(square);
         
         _yuitest_coverline("build/inputex-color/inputex-color.js", 207);
this.squares.push(square);
         
         // <br clear='both'/> insertion to end a line
         // ( + always after the last colored square)
         _yuitest_coverline("build/inputex-color/inputex-color.js", 211);
if (i % this.cellPerLine === this.cellPerLine - 1 || i === this.length - 1) {
            _yuitest_coverline("build/inputex-color/inputex-color.js", 212);
gridEl.appendChild(inputEx.cn('br',{clear:'both'}));
         }
      }
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 216);
gridNode = Y.one(gridEl);
      
      // click event delegation
      _yuitest_coverline("build/inputex-color/inputex-color.js", 219);
gridNode.delegate("click", Y.bind(this.onColorClick, this), "div.inputEx-ColorField-square");
        
      _yuitest_coverline("build/inputex-color/inputex-color.js", 221);
return gridNode;
   },
      
   /**
    * Handle a color selection
    * @method onColorClick
    * @param {Event} e The original click event
    */
   onColorClick: function (e) {
      
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "onColorClick", 229);
_yuitest_coverline("build/inputex-color/inputex-color.js", 231);
var color, hexaColor;
      
      // Stop the event to prevent a selection
      _yuitest_coverline("build/inputex-color/inputex-color.js", 234);
e.halt();
      
      // Overlay closure
      _yuitest_coverline("build/inputex-color/inputex-color.js", 237);
this.oOverlay.hide();
       
      // SetValue
      _yuitest_coverline("build/inputex-color/inputex-color.js", 240);
color     = e.currentTarget.getStyle('backgroundColor');
      _yuitest_coverline("build/inputex-color/inputex-color.js", 241);
hexaColor = inputEx.ColorField.ensureHexa(color);
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 243);
this.setValue(hexaColor);
   },
   
   /**
    * Set the value
    * @method setValue
    * @param {String} value Color to set
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not
    *                                             (default is true, pass false to NOT send the event)
    */
   setValue: function (value, sendUpdatedEvt) {
      
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "setValue", 253);
_yuitest_coverline("build/inputex-color/inputex-color.js", 255);
this.el.value = value;
   
      _yuitest_coverline("build/inputex-color/inputex-color.js", 257);
this.markSelectedColor(value);

      // Call Field.setValue to set class and fire updated event
      _yuitest_coverline("build/inputex-color/inputex-color.js", 260);
inputEx.ColorField.superclass.setValue.call(this,value, sendUpdatedEvt);
   },
      
   /**
    * Return the color value
    * @method getValue
    * @return {String} Color value
    */
   getValue: function () {
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "getValue", 268);
_yuitest_coverline("build/inputex-color/inputex-color.js", 269);
return this.el.value;
   },
   
   /**
    * Call overlay when field is removed
    * @method close
    */
   close: function () {
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "close", 276);
_yuitest_coverline("build/inputex-color/inputex-color.js", 277);
if (this.oOverlay) {
         _yuitest_coverline("build/inputex-color/inputex-color.js", 278);
this.oOverlay.hide();
      }
   },
   
   /**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function () {
      
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "destroy", 286);
_yuitest_coverline("build/inputex-color/inputex-color.js", 288);
this.button.purge();
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 290);
Y.one(this.colorEl).purge();
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 292);
if (this.colorGrid) {
         _yuitest_coverline("build/inputex-color/inputex-color.js", 293);
this.colorGrid.purge();
      }
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 296);
inputEx.ColorField.superclass.destroy.call(this);
      
   },
   
   /**
    * @method markSelectedColor
    */
   markSelectedColor: function (value) {
      
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "markSelectedColor", 303);
_yuitest_coverline("build/inputex-color/inputex-color.js", 305);
var i;
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 307);
value = value || this.getValue();
      
      // mark the colored square in the palette as 'selected'
      _yuitest_coverline("build/inputex-color/inputex-color.js", 310);
if (!!value && this.paletteRendered) {
         
         _yuitest_coverline("build/inputex-color/inputex-color.js", 312);
value = value.toLowerCase(); // normalize case for following test
         
         _yuitest_coverline("build/inputex-color/inputex-color.js", 314);
for (i=0; i<this.length; i++) {
            
            // test color in lower case
            _yuitest_coverline("build/inputex-color/inputex-color.js", 317);
if (this.colors[i].toLowerCase() === value) {
               _yuitest_coverline("build/inputex-color/inputex-color.js", 318);
Y.one(this.squares[i]).addClass('selected');
            } else {
               _yuitest_coverline("build/inputex-color/inputex-color.js", 320);
Y.one(this.squares[i]).removeClass('selected');
            }
            
         }
         
      }
      
      // set background color on colorEl
      _yuitest_coverline("build/inputex-color/inputex-color.js", 328);
Y.one(this.colorEl).setStyle('backgroundColor', this.el.value);
      
   }
   
});

/**
 * Default palettes
 * @property palettes
 */
_yuitest_coverline("build/inputex-color/inputex-color.js", 338);
inputEx.ColorField.palettes = [
   ["#FFEA99","#FFFF66","#FFCC99","#FFCAB2","#FF99AD","#FFD6FF","#FF6666","#E8EEF7",
    "#ADC2FF","#ADADFF","#CCFFFF","#D6EAAD","#B5EDBC","#CCFF99"],
   ["#DEDFDE","#FFFF6B","#EFCB7B","#FFBE94","#FFB6B5","#A5E3FF","#A5CBFF","#99ABEF",
   "#EFB2E7","#FF9AAD","#94E7C6","#A5FFD6","#CEFFA5","#E7EF9C","#FFE38C"],
   ["#000000","#993300","#333300","#003300","#003366","#000080","#333399","#333333",
    "#800000","#FF6600","#808000","#008000","#008080","#0000FF","#666699","#808080",
    "#FF0000","#FF9900","#99CC00","#339966","#33CCCC","#3366FF","#800080","#969696",
    "#FF00FF","#FFCC00","#FFFF00","#00FF00","#00FFFF","#00CCFF","#993366","#C0C0C0",
    "#FF99CC","#FFCC99","#FFFF99","#CCFFCC","#CCFFFF","#99CCFF","#CC99FF","#F0F0F0"],
   ["#FFFFCC","#FFFF99","#CCFFCC","#CCFF66","#99FFCC","#CCFFFF","#66CCCC","#CCCCFF",
    "#99CCFF","#9999FF","#6666CC","#9966CC","#CC99FF","#FFCCFF","#FF99FF","#CC66CC",
    "#FFCCCC","#FF99CC","#FFCCCC","#CC6699","#FF9999","#FF9966","#FFCC99","#FFFFCC",
    "#FFCC66","#FFFF99","#CCCC66"],
   ["#D0D0D0","#31A8FA","#8EC1E5","#58D7CF","#89E2BB","#A7F7F8","#F6B77C","#FE993F",
    "#FE6440","#F56572","#FA9AA3","#F7B1CA","#E584AF","#D1C3EF","#AB77B8","#C69FE7",
    "#90D28A","#C2F175","#EDEA9A","#F3DF70","#F8D1AE","#F98064","#F54F5E","#EC9099",
    "#F0B5BA","#EDA0BB","#D375AC","#BC8DBE","#8C77B8"],
   // idem in pastel tone (colors above with opacity 0.6 on white background)
   ["#EEEEEE","#84CBFC","#BCDAF0","#9BE7E3","#B9EED7","#CBFBFB","#FAD4B1","#FFC28C",
    "#FFA28D","#F9A3AB","#FCC3C8","#FBD1E0","#F0B6CF","#E4DBF6","#CDAED5","#DDC6F1",
    "#BDE4B9","#DBF7AD","#F5F3C3","#F8ECAA","#FBE4CF","#FCB3A2","#F9969F","#F4BDC2",
    "#F6D3D6","#F5C6D7","#E5ADCE","#D7BBD8","#BAAED5"]
];

//  -> ensure color has hexadecimal format like "#FF8E00"
_yuitest_coverline("build/inputex-color/inputex-color.js", 364);
inputEx.ColorField.ensureHexa = function (color) {
   
   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "ensureHexa", 364);
_yuitest_coverline("build/inputex-color/inputex-color.js", 366);
var rgb, hexaColor, decToHex;
   
   // remove spaces
   _yuitest_coverline("build/inputex-color/inputex-color.js", 369);
color = color.replace(/\s/g, "");
   
   // Firefox, Safari
   //   -> format "rgb(255,143,28)"
   _yuitest_coverline("build/inputex-color/inputex-color.js", 373);
if (!!color.match(/^rgb\((?:\d{1,3},){2}\d{1,3}\)$/)) {
      
      // Convert integer (int or string) to hexadecimal (2 chars)
      //   ex: "214" -> "d6"
      _yuitest_coverline("build/inputex-color/inputex-color.js", 377);
decToHex = function (dec) {
         _yuitest_coverfunc("build/inputex-color/inputex-color.js", "decToHex", 377);
_yuitest_coverline("build/inputex-color/inputex-color.js", 378);
var r = parseInt(dec, 10).toString(16);
         _yuitest_coverline("build/inputex-color/inputex-color.js", 379);
if (r.length === 1) { r = "0" + r; }
         _yuitest_coverline("build/inputex-color/inputex-color.js", 380);
return r;
      };
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 383);
rgb = color.split(/([(,)])/);
      _yuitest_coverline("build/inputex-color/inputex-color.js", 384);
hexaColor = '#' + decToHex(rgb[2]) + decToHex(rgb[4]) + decToHex(rgb[6]);
      
   // IE, Opera
   //   -> format "#FE6D34"
   } else {_yuitest_coverline("build/inputex-color/inputex-color.js", 388);
if (!!color.match(/^#[\da-fA-F]{6}$/)) {
      _yuitest_coverline("build/inputex-color/inputex-color.js", 389);
hexaColor = color;
      
   } else {
      // defaults to white if invalid color
      _yuitest_coverline("build/inputex-color/inputex-color.js", 393);
hexaColor = "#FFFFFF";
   }}
   
   _yuitest_coverline("build/inputex-color/inputex-color.js", 396);
return hexaColor;
};

// Register this class as "color" type
_yuitest_coverline("build/inputex-color/inputex-color.js", 400);
inputEx.registerType("color", inputEx.ColorField, []);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "node-event-delegate",
        "event-outside",
        "overlay"
    ],
    "skinnable": true,
    "ix_provides": "color"
});
