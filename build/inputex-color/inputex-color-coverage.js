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
_yuitest_coverage["build/inputex-color/inputex-color.js"].code=["YUI.add('inputex-color', function (Y, NAME) {","","/**"," * @module inputex-color"," */","YUI.add(\"inputex-color\",function(Y){","	","   var inputEx = Y.inputEx,","       lang = Y.Lang;","	","/**"," * Create a Color picker input field"," * @class inputEx.ColorField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options for ColorField :"," * <ul>"," *   <li>colors: list of colors to load as palette</li>"," *   <li>palette: default palette to be used (if colors option not provided)</li>"," *   <li>cellPerLine: how many colored cells in a row on the palette</li>"," *   <li>ratio: screen-like ratio to display the palette, syntax: [with,height], default: [16,9] (if cellPerLine not provided)</li>"," *   <li>zIndex: zIndex of the overlay</li>"," * </ul>"," */","inputEx.ColorField = function(options) {","	inputEx.ColorField.superclass.constructor.call(this,options);","};","Y.extend(inputEx.ColorField, inputEx.Field, {","   ","	/**","	 * Adds the 'inputEx-ColorField' default className","	 * @method setOptions","	 * @param {Object} options Options object as passed to the constructor","	 */","   setOptions: function(options) {","   	inputEx.ColorField.superclass.setOptions.call(this, options);","   	","   	// Overwrite options","   	this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ColorField inputEx-PickerField';","      this.options.zIndex = options.zIndex || 4;","   	","   	// Added options","   	this.options.palette = options.palette;","   	this.options.colors = options.colors;","   	","   	if (options.ratio) { this.options.ratio = options.ratio;}","   	if (options.cellPerLine) { this.options.cellPerLine = options.cellPerLine;}","   },","   ","   /**","    * @method renderOverlay","    */","   renderOverlay: function() {","      ","	   // Create overlay","      this.oOverlay = new Y.Overlay({","         visible:false,","         zIndex: this.options.zIndex","      });","      this.oOverlay.render(this.fieldContainer);","      ","      this.oOverlay.on('visibleChange', function (e) {","","         if (e.newVal) { // show","            // align","            this.oOverlay.set(\"align\", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});","","            // Activate outside event handler","            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {","               this.oOverlay.hide();","            }, this);","         }","         else { // hide","            this.outsideHandler.detach();","         }","","      }, this);","   },","","   /**","    * @method _toggleOverlay","    * @private","    */","   _toggleOverlay: function(e) {","       // PreventDefault to prevent submit in a form","       e.preventDefault();","","       // palette may not have been rendered yet","       this.renderPalette();","","       this.oOverlay[this.oOverlay.get('visible') ? 'hide' : 'show']();","   },","","	/**","	 * Render the color button and the colorpicker popup","	 * @method renderComponent","	 */","	renderComponent: function() {","	   ","	   // A hidden input field to store the color code ","	   this.el = inputEx.cn('input', {","	      type: 'hidden', ","	      name: this.options.name || '', ","	      value: this.options.value || '#FFFFFF' });","	   	   ","	   // Create a colored area","	   this.colorEl = inputEx.cn('div', {className: 'inputEx-ColorField-button'}, {backgroundColor: this.el.value});","	","      // This element wraps the input node in a float: none div","      this.wrapEl = inputEx.cn('div', {className: 'inputEx-PickerField-wrapper'});","	   this.wrapEl.appendChild(this.el);","	   this.wrapEl.appendChild(this.colorEl);","","      ","      // Create button","      this.button = Y.Node.create(\"<button>&nbsp;</button>\").addClass(\"inputEx-ColorField-button\");","      this.button.appendTo(this.wrapEl);","","      ","      // toggle Menu when clicking on the button","      this.button.on('click',this._toggleOverlay, this, true);","      ","      // toggle Menu when clicking on colorEl","      Y.one(this.colorEl).on('click',this._toggleOverlay,this,true);","      ","	   // Elements are bound to divEl","      this.fieldContainer.appendChild(this.wrapEl);","	},","	","	/**","	 * @method renderPalette","	 */","	renderPalette: function() {","      ","      if(!this.oOverlay) {","         this.renderOverlay();","      }","      ","      // render once !","      if (this.paletteRendered) { return; }","      ","      var defaultPalette, overlayBody;","","      // set default palette to be used","      defaultPalette = this.options.palette || 1;","","      // set colors available","      this.colors = this.options.colors || this.setDefaultColors(defaultPalette);","      this.length = this.colors.length;","","      // set PopUp size ratio (default 16/9 ratio)","      this.ratio = this.options.ratio || [16,9];","","      // set color grid dimensions","      this.cellPerLine = this.options.cellPerLine || Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));","      this.cellPerColumn = Math.ceil(this.length/this.cellPerLine);","","      // Render the color grid","      this.colorGrid = this.renderColorGrid();","      this.oOverlay.set('bodyContent', this.colorGrid);","","      this.paletteRendered = true;","      ","      // Select the square in the created palette from the value","      // This must be done after \"this.paletteRendered = true\".","      this.markSelectedColor();","	},","	","	/**","	 * Set the colors to set in the picker ","	 * @method setDefaultColors","	 * @param {int} index Index of the palette to use","	 * @return {Array} List of colors to choose from","	 */","	setDefaultColors: function(index) {","		return inputEx.ColorField.palettes[index-1];","	},","	      ","	/**","	 * This creates a color grid","	 * @method renderColorGrid","	 */","	renderColorGrid: function() {","	   ","	   var grid, square, i;","	   ","	   // remember squares","	   this.squares = [];","	","	   // container","	   grid = inputEx.cn('div', {className: 'inputEx-ColorField-Grid'});","	   	   ","	   for(i = 0 ; i < this.length ; i++) {","	      ","	      square = inputEx.cn('div', {className: 'inputEx-ColorField-square'},{backgroundColor: this.colors[i] });","	   	grid.appendChild(square);","			","	   	this.squares.push(square);","	   	","	   	// <br clear='both'/> insertion to end a line","	   	// ( + always after the last colored square)","	   	if (i%this.cellPerLine === this.cellPerLine-1 || i === this.length-1) {","            grid.appendChild(inputEx.cn('br',{clear:'both'}));","         }","      }","      ","      var colorGrid = Y.one(grid);","      ","      // click event delegation","      colorGrid.delegate(\"click\",Y.bind(this.onColorClick,this),\"div.inputEx-ColorField-square\");","        ","	   return colorGrid;","	},","	   ","	/**","	 * Handle a color selection","	 * @method onColorClick","	 * @param {Event} e The original click event","	 */","	onColorClick: function(e,square,container) {","		","		// Stop the event to prevent a selection","		e.halt();","	   ","	   // Overlay closure","      this.oOverlay.hide();","       ","	   // SetValue","		var color = e.currentTarget.getStyle('backgroundColor');","		var hexaColor = inputEx.ColorField.ensureHexa(color);","		","	   this.setValue(hexaColor);","	},","	","	/**","	 * Set the value","	 * @method setValue","	 * @param {String} value Color to set","	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)","	 */","	setValue: function(value, sendUpdatedEvt) {","		","	   this.el.value = value;","	","		this.markSelectedColor(value);","","		// Call Field.setValue to set class and fire updated event","		inputEx.ColorField.superclass.setValue.call(this,value, sendUpdatedEvt);","	},","	   ","	/**","	 * Return the color value","	 * @method getValue","	 * @return {String} Color value","	 */","	getValue: function() {","	   return this.el.value;","	},","	","	/**","	 * Call overlay when field is removed","	 * @method close","	 */","	close: function() {","      if (this.oOverlay) {","         this.oOverlay.hide();","      }","	},","	","	/**","    * Purge all event listeners and remove the component from the dom","    * @method destroy","    */","   destroy: function() {","      ","      // colorEl listener","      //Event.purgeElement(this.colorEl);","      ","      // remove squares' mousedown listener(s)","      if (this.colorGrid) {","         //Event.purgeElement(this.colorGrid,true);","      }","      ","      inputEx.ColorField.superclass.destroy.call(this);","      ","   },","","   /**","    * @method markSelectedColor","    */","	markSelectedColor: function(value) {","		","		var i;","		","		value = value || this.getValue();","		","		// mark the colored square in the palette as 'selected'","		if (!!value && this.paletteRendered) {","			","			value = value.toLowerCase(); // normalize case for following test","			","			for (i=0; i<this.length; i++) {","				","				// test color in lower case","				if (this.colors[i].toLowerCase() === value) {","					Y.one(this.squares[i]).addClass('selected');","				} else {","					Y.one(this.squares[i]).removeClass('selected');","				}","				","			}","			","		}","		","		// set background color on colorEl","		Y.one(this.colorEl).setStyle('backgroundColor', this.el.value);","		","	}","	  ","}); ","	","/**"," * Default palettes"," * @property palettes"," */","inputEx.ColorField.palettes = [","   [\"#FFEA99\",\"#FFFF66\",\"#FFCC99\",\"#FFCAB2\",\"#FF99AD\",\"#FFD6FF\",\"#FF6666\",\"#E8EEF7\",\"#ADC2FF\",\"#ADADFF\",\"#CCFFFF\",\"#D6EAAD\",\"#B5EDBC\",\"#CCFF99\"],","   [\"#DEDFDE\",\"#FFFF6B\",\"#EFCB7B\",\"#FFBE94\",\"#FFB6B5\",\"#A5E3FF\",\"#A5CBFF\",\"#99ABEF\",\"#EFB2E7\",\"#FF9AAD\",\"#94E7C6\",\"#A5FFD6\",\"#CEFFA5\",\"#E7EF9C\",\"#FFE38C\"],","   [\"#000000\",\"#993300\",\"#333300\",\"#003300\",\"#003366\",\"#000080\",\"#333399\",\"#333333\",\"#800000\",\"#FF6600\",\"#808000\",\"#008000\",\"#008080\",\"#0000FF\",\"#666699\",\"#808080\",\"#FF0000\",\"#FF9900\",\"#99CC00\",\"#339966\",\"#33CCCC\",\"#3366FF\",\"#800080\",\"#969696\",\"#FF00FF\",\"#FFCC00\",\"#FFFF00\",\"#00FF00\",\"#00FFFF\",\"#00CCFF\",\"#993366\",\"#C0C0C0\",\"#FF99CC\",\"#FFCC99\",\"#FFFF99\",\"#CCFFCC\",\"#CCFFFF\",\"#99CCFF\",\"#CC99FF\",\"#F0F0F0\"],","   [\"#FFFFCC\",\"#FFFF99\",\"#CCFFCC\",\"#CCFF66\",\"#99FFCC\",\"#CCFFFF\",\"#66CCCC\",\"#CCCCFF\",\"#99CCFF\",\"#9999FF\",\"#6666CC\",\"#9966CC\",\"#CC99FF\",\"#FFCCFF\",\"#FF99FF\",\"#CC66CC\",\"#FFCCCC\",\"#FF99CC\",\"#FFCCCC\",\"#CC6699\",\"#FF9999\",\"#FF9966\",\"#FFCC99\",\"#FFFFCC\",\"#FFCC66\",\"#FFFF99\",\"#CCCC66\"],","   [\"#D0D0D0\",\"#31A8FA\",\"#8EC1E5\",\"#58D7CF\",\"#89E2BB\",\"#A7F7F8\",\"#F6B77C\",\"#FE993F\",\"#FE6440\",\"#F56572\",\"#FA9AA3\",\"#F7B1CA\",\"#E584AF\",\"#D1C3EF\",\"#AB77B8\",\"#C69FE7\",\"#90D28A\",\"#C2F175\",\"#EDEA9A\",\"#F3DF70\",\"#F8D1AE\",\"#F98064\",\"#F54F5E\",\"#EC9099\",\"#F0B5BA\",\"#EDA0BB\",\"#D375AC\",\"#BC8DBE\",\"#8C77B8\"],","   // idem in pastel tone (colors above with opacity 0.6 on white background)","   [\"#EEEEEE\",\"#84CBFC\",\"#BCDAF0\",\"#9BE7E3\",\"#B9EED7\",\"#CBFBFB\",\"#FAD4B1\",\"#FFC28C\",\"#FFA28D\",\"#F9A3AB\",\"#FCC3C8\",\"#FBD1E0\",\"#F0B6CF\",\"#E4DBF6\",\"#CDAED5\",\"#DDC6F1\",\"#BDE4B9\",\"#DBF7AD\",\"#F5F3C3\",\"#F8ECAA\",\"#FBE4CF\",\"#FCB3A2\",\"#F9969F\",\"#F4BDC2\",\"#F6D3D6\",\"#F5C6D7\",\"#E5ADCE\",\"#D7BBD8\",\"#BAAED5\"]","];	","","//  -> ensure color has hexadecimal format like \"#FF8E00\"","inputEx.ColorField.ensureHexa = function (color) {","   var rgb, hexaColor;","   ","   // remove spaces","   color = color.replace(/\\s/g, \"\");","   ","   // Firefox, Safari","   //   -> format \"rgb(255,143,28)\"","   if (!!color.match(/^rgb\\((?:\\d{1,3},){2}\\d{1,3}\\)$/)) {","      ","	   // Convert integer (int or string) to hexadecimal (2 chars)","	   //   ex: \"214\" -> \"d6\"","      var DecToHex = function(dec) {","         var r = parseInt(dec,10).toString(16);","         if (r.length == 1) r = \"0\"+r;","         return r;","      };","   ","      rgb = color.split(/([(,)])/);","      hexaColor = '#'+DecToHex(rgb[2])+DecToHex(rgb[4])+DecToHex(rgb[6]);","   ","   // IE, Opera","   //   -> format \"#FE6D34\"","   } else if (!!color.match(/^#[\\da-fA-F]{6}$/)) {","      hexaColor = color;","      ","   } else {","      // defaults to white if invalid color","      hexaColor = \"#FFFFFF\";","   }","   ","   return hexaColor;","};","","// Register this class as \"color\" type","inputEx.registerType(\"color\", inputEx.ColorField, []);","	","},'3.1.0',{","  requires: ['inputex-field','node-event-delegate','event-outside','overlay']","});","","","}, '@VERSION@');"];
_yuitest_coverage["build/inputex-color/inputex-color.js"].lines = {"1":0,"6":0,"8":0,"25":0,"26":0,"28":0,"36":0,"39":0,"40":0,"43":0,"44":0,"46":0,"47":0,"56":0,"60":0,"62":0,"64":0,"66":0,"69":0,"70":0,"74":0,"86":0,"89":0,"91":0,"101":0,"107":0,"110":0,"111":0,"112":0,"116":0,"117":0,"121":0,"124":0,"127":0,"135":0,"136":0,"140":0,"142":0,"145":0,"148":0,"149":0,"152":0,"155":0,"156":0,"159":0,"160":0,"162":0,"166":0,"176":0,"185":0,"188":0,"191":0,"193":0,"195":0,"196":0,"198":0,"202":0,"203":0,"207":0,"210":0,"212":0,"223":0,"226":0,"229":0,"230":0,"232":0,"243":0,"245":0,"248":0,"257":0,"265":0,"266":0,"280":0,"284":0,"293":0,"295":0,"298":0,"300":0,"302":0,"305":0,"306":0,"308":0,"316":0,"326":0,"337":0,"338":0,"341":0,"345":0,"349":0,"350":0,"351":0,"352":0,"355":0,"356":0,"360":0,"361":0,"365":0,"368":0,"372":0};
_yuitest_coverage["build/inputex-color/inputex-color.js"].functions = {"ColorField:25":0,"setOptions:35":0,"(anonymous 4):69":0,"(anonymous 3):62":0,"renderOverlay:53":0,"_toggleOverlay:84":0,"renderComponent:98":0,"renderPalette:133":0,"setDefaultColors:175":0,"renderColorGrid:183":0,"onColorClick:220":0,"setValue:241":0,"getValue:256":0,"close:264":0,"destroy:274":0,"markSelectedColor:291":0,"DecToHex:349":0,"ensureHexa:337":0,"(anonymous 2):6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-color/inputex-color.js"].coveredLines = 99;
_yuitest_coverage["build/inputex-color/inputex-color.js"].coveredFunctions = 20;
_yuitest_coverline("build/inputex-color/inputex-color.js", 1);
YUI.add('inputex-color', function (Y, NAME) {

/**
 * @module inputex-color
 */
_yuitest_coverfunc("build/inputex-color/inputex-color.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-color/inputex-color.js", 6);
YUI.add("inputex-color",function(Y){
	
   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "(anonymous 2)", 6);
_yuitest_coverline("build/inputex-color/inputex-color.js", 8);
var inputEx = Y.inputEx,
       lang = Y.Lang;
	
/**
 * Create a Color picker input field
 * @class inputEx.ColorField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options for ColorField :
 * <ul>
 *   <li>colors: list of colors to load as palette</li>
 *   <li>palette: default palette to be used (if colors option not provided)</li>
 *   <li>cellPerLine: how many colored cells in a row on the palette</li>
 *   <li>ratio: screen-like ratio to display the palette, syntax: [with,height], default: [16,9] (if cellPerLine not provided)</li>
 *   <li>zIndex: zIndex of the overlay</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-color/inputex-color.js", 25);
inputEx.ColorField = function(options) {
	_yuitest_coverfunc("build/inputex-color/inputex-color.js", "ColorField", 25);
_yuitest_coverline("build/inputex-color/inputex-color.js", 26);
inputEx.ColorField.superclass.constructor.call(this,options);
};
_yuitest_coverline("build/inputex-color/inputex-color.js", 28);
Y.extend(inputEx.ColorField, inputEx.Field, {
   
	/**
	 * Adds the 'inputEx-ColorField' default className
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
   setOptions: function(options) {
   	_yuitest_coverfunc("build/inputex-color/inputex-color.js", "setOptions", 35);
_yuitest_coverline("build/inputex-color/inputex-color.js", 36);
inputEx.ColorField.superclass.setOptions.call(this, options);
   	
   	// Overwrite options
   	_yuitest_coverline("build/inputex-color/inputex-color.js", 39);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ColorField inputEx-PickerField';
      _yuitest_coverline("build/inputex-color/inputex-color.js", 40);
this.options.zIndex = options.zIndex || 4;
   	
   	// Added options
   	_yuitest_coverline("build/inputex-color/inputex-color.js", 43);
this.options.palette = options.palette;
   	_yuitest_coverline("build/inputex-color/inputex-color.js", 44);
this.options.colors = options.colors;
   	
   	_yuitest_coverline("build/inputex-color/inputex-color.js", 46);
if (options.ratio) { this.options.ratio = options.ratio;}
   	_yuitest_coverline("build/inputex-color/inputex-color.js", 47);
if (options.cellPerLine) { this.options.cellPerLine = options.cellPerLine;}
   },
   
   /**
    * @method renderOverlay
    */
   renderOverlay: function() {
      
	   // Create overlay
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderOverlay", 53);
_yuitest_coverline("build/inputex-color/inputex-color.js", 56);
this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });
      _yuitest_coverline("build/inputex-color/inputex-color.js", 60);
this.oOverlay.render(this.fieldContainer);
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 62);
this.oOverlay.on('visibleChange', function (e) {

         _yuitest_coverfunc("build/inputex-color/inputex-color.js", "(anonymous 3)", 62);
_yuitest_coverline("build/inputex-color/inputex-color.js", 64);
if (e.newVal) { // show
            // align
            _yuitest_coverline("build/inputex-color/inputex-color.js", 66);
this.oOverlay.set("align", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});

            // Activate outside event handler
            _yuitest_coverline("build/inputex-color/inputex-color.js", 69);
this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               _yuitest_coverfunc("build/inputex-color/inputex-color.js", "(anonymous 4)", 69);
_yuitest_coverline("build/inputex-color/inputex-color.js", 70);
this.oOverlay.hide();
            }, this);
         }
         else { // hide
            _yuitest_coverline("build/inputex-color/inputex-color.js", 74);
this.outsideHandler.detach();
         }

      }, this);
   },

   /**
    * @method _toggleOverlay
    * @private
    */
   _toggleOverlay: function(e) {
       // PreventDefault to prevent submit in a form
       _yuitest_coverfunc("build/inputex-color/inputex-color.js", "_toggleOverlay", 84);
_yuitest_coverline("build/inputex-color/inputex-color.js", 86);
e.preventDefault();

       // palette may not have been rendered yet
       _yuitest_coverline("build/inputex-color/inputex-color.js", 89);
this.renderPalette();

       _yuitest_coverline("build/inputex-color/inputex-color.js", 91);
this.oOverlay[this.oOverlay.get('visible') ? 'hide' : 'show']();
   },

	/**
	 * Render the color button and the colorpicker popup
	 * @method renderComponent
	 */
	renderComponent: function() {
	   
	   // A hidden input field to store the color code 
	   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderComponent", 98);
_yuitest_coverline("build/inputex-color/inputex-color.js", 101);
this.el = inputEx.cn('input', {
	      type: 'hidden', 
	      name: this.options.name || '', 
	      value: this.options.value || '#FFFFFF' });
	   	   
	   // Create a colored area
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 107);
this.colorEl = inputEx.cn('div', {className: 'inputEx-ColorField-button'}, {backgroundColor: this.el.value});
	
      // This element wraps the input node in a float: none div
      _yuitest_coverline("build/inputex-color/inputex-color.js", 110);
this.wrapEl = inputEx.cn('div', {className: 'inputEx-PickerField-wrapper'});
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 111);
this.wrapEl.appendChild(this.el);
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 112);
this.wrapEl.appendChild(this.colorEl);

      
      // Create button
      _yuitest_coverline("build/inputex-color/inputex-color.js", 116);
this.button = Y.Node.create("<button>&nbsp;</button>").addClass("inputEx-ColorField-button");
      _yuitest_coverline("build/inputex-color/inputex-color.js", 117);
this.button.appendTo(this.wrapEl);

      
      // toggle Menu when clicking on the button
      _yuitest_coverline("build/inputex-color/inputex-color.js", 121);
this.button.on('click',this._toggleOverlay, this, true);
      
      // toggle Menu when clicking on colorEl
      _yuitest_coverline("build/inputex-color/inputex-color.js", 124);
Y.one(this.colorEl).on('click',this._toggleOverlay,this,true);
      
	   // Elements are bound to divEl
      _yuitest_coverline("build/inputex-color/inputex-color.js", 127);
this.fieldContainer.appendChild(this.wrapEl);
	},
	
	/**
	 * @method renderPalette
	 */
	renderPalette: function() {
      
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderPalette", 133);
_yuitest_coverline("build/inputex-color/inputex-color.js", 135);
if(!this.oOverlay) {
         _yuitest_coverline("build/inputex-color/inputex-color.js", 136);
this.renderOverlay();
      }
      
      // render once !
      _yuitest_coverline("build/inputex-color/inputex-color.js", 140);
if (this.paletteRendered) { return; }
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 142);
var defaultPalette, overlayBody;

      // set default palette to be used
      _yuitest_coverline("build/inputex-color/inputex-color.js", 145);
defaultPalette = this.options.palette || 1;

      // set colors available
      _yuitest_coverline("build/inputex-color/inputex-color.js", 148);
this.colors = this.options.colors || this.setDefaultColors(defaultPalette);
      _yuitest_coverline("build/inputex-color/inputex-color.js", 149);
this.length = this.colors.length;

      // set PopUp size ratio (default 16/9 ratio)
      _yuitest_coverline("build/inputex-color/inputex-color.js", 152);
this.ratio = this.options.ratio || [16,9];

      // set color grid dimensions
      _yuitest_coverline("build/inputex-color/inputex-color.js", 155);
this.cellPerLine = this.options.cellPerLine || Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));
      _yuitest_coverline("build/inputex-color/inputex-color.js", 156);
this.cellPerColumn = Math.ceil(this.length/this.cellPerLine);

      // Render the color grid
      _yuitest_coverline("build/inputex-color/inputex-color.js", 159);
this.colorGrid = this.renderColorGrid();
      _yuitest_coverline("build/inputex-color/inputex-color.js", 160);
this.oOverlay.set('bodyContent', this.colorGrid);

      _yuitest_coverline("build/inputex-color/inputex-color.js", 162);
this.paletteRendered = true;
      
      // Select the square in the created palette from the value
      // This must be done after "this.paletteRendered = true".
      _yuitest_coverline("build/inputex-color/inputex-color.js", 166);
this.markSelectedColor();
	},
	
	/**
	 * Set the colors to set in the picker 
	 * @method setDefaultColors
	 * @param {int} index Index of the palette to use
	 * @return {Array} List of colors to choose from
	 */
	setDefaultColors: function(index) {
		_yuitest_coverfunc("build/inputex-color/inputex-color.js", "setDefaultColors", 175);
_yuitest_coverline("build/inputex-color/inputex-color.js", 176);
return inputEx.ColorField.palettes[index-1];
	},
	      
	/**
	 * This creates a color grid
	 * @method renderColorGrid
	 */
	renderColorGrid: function() {
	   
	   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "renderColorGrid", 183);
_yuitest_coverline("build/inputex-color/inputex-color.js", 185);
var grid, square, i;
	   
	   // remember squares
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 188);
this.squares = [];
	
	   // container
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 191);
grid = inputEx.cn('div', {className: 'inputEx-ColorField-Grid'});
	   	   
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 193);
for(i = 0 ; i < this.length ; i++) {
	      
	      _yuitest_coverline("build/inputex-color/inputex-color.js", 195);
square = inputEx.cn('div', {className: 'inputEx-ColorField-square'},{backgroundColor: this.colors[i] });
	   	_yuitest_coverline("build/inputex-color/inputex-color.js", 196);
grid.appendChild(square);
			
	   	_yuitest_coverline("build/inputex-color/inputex-color.js", 198);
this.squares.push(square);
	   	
	   	// <br clear='both'/> insertion to end a line
	   	// ( + always after the last colored square)
	   	_yuitest_coverline("build/inputex-color/inputex-color.js", 202);
if (i%this.cellPerLine === this.cellPerLine-1 || i === this.length-1) {
            _yuitest_coverline("build/inputex-color/inputex-color.js", 203);
grid.appendChild(inputEx.cn('br',{clear:'both'}));
         }
      }
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 207);
var colorGrid = Y.one(grid);
      
      // click event delegation
      _yuitest_coverline("build/inputex-color/inputex-color.js", 210);
colorGrid.delegate("click",Y.bind(this.onColorClick,this),"div.inputEx-ColorField-square");
        
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 212);
return colorGrid;
	},
	   
	/**
	 * Handle a color selection
	 * @method onColorClick
	 * @param {Event} e The original click event
	 */
	onColorClick: function(e,square,container) {
		
		// Stop the event to prevent a selection
		_yuitest_coverfunc("build/inputex-color/inputex-color.js", "onColorClick", 220);
_yuitest_coverline("build/inputex-color/inputex-color.js", 223);
e.halt();
	   
	   // Overlay closure
      _yuitest_coverline("build/inputex-color/inputex-color.js", 226);
this.oOverlay.hide();
       
	   // SetValue
		_yuitest_coverline("build/inputex-color/inputex-color.js", 229);
var color = e.currentTarget.getStyle('backgroundColor');
		_yuitest_coverline("build/inputex-color/inputex-color.js", 230);
var hexaColor = inputEx.ColorField.ensureHexa(color);
		
	   _yuitest_coverline("build/inputex-color/inputex-color.js", 232);
this.setValue(hexaColor);
	},
	
	/**
	 * Set the value
	 * @method setValue
	 * @param {String} value Color to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(value, sendUpdatedEvt) {
		
	   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "setValue", 241);
_yuitest_coverline("build/inputex-color/inputex-color.js", 243);
this.el.value = value;
	
		_yuitest_coverline("build/inputex-color/inputex-color.js", 245);
this.markSelectedColor(value);

		// Call Field.setValue to set class and fire updated event
		_yuitest_coverline("build/inputex-color/inputex-color.js", 248);
inputEx.ColorField.superclass.setValue.call(this,value, sendUpdatedEvt);
	},
	   
	/**
	 * Return the color value
	 * @method getValue
	 * @return {String} Color value
	 */
	getValue: function() {
	   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "getValue", 256);
_yuitest_coverline("build/inputex-color/inputex-color.js", 257);
return this.el.value;
	},
	
	/**
	 * Call overlay when field is removed
	 * @method close
	 */
	close: function() {
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "close", 264);
_yuitest_coverline("build/inputex-color/inputex-color.js", 265);
if (this.oOverlay) {
         _yuitest_coverline("build/inputex-color/inputex-color.js", 266);
this.oOverlay.hide();
      }
	},
	
	/**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      // colorEl listener
      //Event.purgeElement(this.colorEl);
      
      // remove squares' mousedown listener(s)
      _yuitest_coverfunc("build/inputex-color/inputex-color.js", "destroy", 274);
_yuitest_coverline("build/inputex-color/inputex-color.js", 280);
if (this.colorGrid) {
         //Event.purgeElement(this.colorGrid,true);
      }
      
      _yuitest_coverline("build/inputex-color/inputex-color.js", 284);
inputEx.ColorField.superclass.destroy.call(this);
      
   },

   /**
    * @method markSelectedColor
    */
	markSelectedColor: function(value) {
		
		_yuitest_coverfunc("build/inputex-color/inputex-color.js", "markSelectedColor", 291);
_yuitest_coverline("build/inputex-color/inputex-color.js", 293);
var i;
		
		_yuitest_coverline("build/inputex-color/inputex-color.js", 295);
value = value || this.getValue();
		
		// mark the colored square in the palette as 'selected'
		_yuitest_coverline("build/inputex-color/inputex-color.js", 298);
if (!!value && this.paletteRendered) {
			
			_yuitest_coverline("build/inputex-color/inputex-color.js", 300);
value = value.toLowerCase(); // normalize case for following test
			
			_yuitest_coverline("build/inputex-color/inputex-color.js", 302);
for (i=0; i<this.length; i++) {
				
				// test color in lower case
				_yuitest_coverline("build/inputex-color/inputex-color.js", 305);
if (this.colors[i].toLowerCase() === value) {
					_yuitest_coverline("build/inputex-color/inputex-color.js", 306);
Y.one(this.squares[i]).addClass('selected');
				} else {
					_yuitest_coverline("build/inputex-color/inputex-color.js", 308);
Y.one(this.squares[i]).removeClass('selected');
				}
				
			}
			
		}
		
		// set background color on colorEl
		_yuitest_coverline("build/inputex-color/inputex-color.js", 316);
Y.one(this.colorEl).setStyle('backgroundColor', this.el.value);
		
	}
	  
}); 
	
/**
 * Default palettes
 * @property palettes
 */
_yuitest_coverline("build/inputex-color/inputex-color.js", 326);
inputEx.ColorField.palettes = [
   ["#FFEA99","#FFFF66","#FFCC99","#FFCAB2","#FF99AD","#FFD6FF","#FF6666","#E8EEF7","#ADC2FF","#ADADFF","#CCFFFF","#D6EAAD","#B5EDBC","#CCFF99"],
   ["#DEDFDE","#FFFF6B","#EFCB7B","#FFBE94","#FFB6B5","#A5E3FF","#A5CBFF","#99ABEF","#EFB2E7","#FF9AAD","#94E7C6","#A5FFD6","#CEFFA5","#E7EF9C","#FFE38C"],
   ["#000000","#993300","#333300","#003300","#003366","#000080","#333399","#333333","#800000","#FF6600","#808000","#008000","#008080","#0000FF","#666699","#808080","#FF0000","#FF9900","#99CC00","#339966","#33CCCC","#3366FF","#800080","#969696","#FF00FF","#FFCC00","#FFFF00","#00FF00","#00FFFF","#00CCFF","#993366","#C0C0C0","#FF99CC","#FFCC99","#FFFF99","#CCFFCC","#CCFFFF","#99CCFF","#CC99FF","#F0F0F0"],
   ["#FFFFCC","#FFFF99","#CCFFCC","#CCFF66","#99FFCC","#CCFFFF","#66CCCC","#CCCCFF","#99CCFF","#9999FF","#6666CC","#9966CC","#CC99FF","#FFCCFF","#FF99FF","#CC66CC","#FFCCCC","#FF99CC","#FFCCCC","#CC6699","#FF9999","#FF9966","#FFCC99","#FFFFCC","#FFCC66","#FFFF99","#CCCC66"],
   ["#D0D0D0","#31A8FA","#8EC1E5","#58D7CF","#89E2BB","#A7F7F8","#F6B77C","#FE993F","#FE6440","#F56572","#FA9AA3","#F7B1CA","#E584AF","#D1C3EF","#AB77B8","#C69FE7","#90D28A","#C2F175","#EDEA9A","#F3DF70","#F8D1AE","#F98064","#F54F5E","#EC9099","#F0B5BA","#EDA0BB","#D375AC","#BC8DBE","#8C77B8"],
   // idem in pastel tone (colors above with opacity 0.6 on white background)
   ["#EEEEEE","#84CBFC","#BCDAF0","#9BE7E3","#B9EED7","#CBFBFB","#FAD4B1","#FFC28C","#FFA28D","#F9A3AB","#FCC3C8","#FBD1E0","#F0B6CF","#E4DBF6","#CDAED5","#DDC6F1","#BDE4B9","#DBF7AD","#F5F3C3","#F8ECAA","#FBE4CF","#FCB3A2","#F9969F","#F4BDC2","#F6D3D6","#F5C6D7","#E5ADCE","#D7BBD8","#BAAED5"]
];	

//  -> ensure color has hexadecimal format like "#FF8E00"
_yuitest_coverline("build/inputex-color/inputex-color.js", 337);
inputEx.ColorField.ensureHexa = function (color) {
   _yuitest_coverfunc("build/inputex-color/inputex-color.js", "ensureHexa", 337);
_yuitest_coverline("build/inputex-color/inputex-color.js", 338);
var rgb, hexaColor;
   
   // remove spaces
   _yuitest_coverline("build/inputex-color/inputex-color.js", 341);
color = color.replace(/\s/g, "");
   
   // Firefox, Safari
   //   -> format "rgb(255,143,28)"
   _yuitest_coverline("build/inputex-color/inputex-color.js", 345);
if (!!color.match(/^rgb\((?:\d{1,3},){2}\d{1,3}\)$/)) {
      
	   // Convert integer (int or string) to hexadecimal (2 chars)
	   //   ex: "214" -> "d6"
      _yuitest_coverline("build/inputex-color/inputex-color.js", 349);
var DecToHex = function(dec) {
         _yuitest_coverfunc("build/inputex-color/inputex-color.js", "DecToHex", 349);
_yuitest_coverline("build/inputex-color/inputex-color.js", 350);
var r = parseInt(dec,10).toString(16);
         _yuitest_coverline("build/inputex-color/inputex-color.js", 351);
if (r.length == 1) {r = "0"+r;}
         _yuitest_coverline("build/inputex-color/inputex-color.js", 352);
return r;
      };
   
      _yuitest_coverline("build/inputex-color/inputex-color.js", 355);
rgb = color.split(/([(,)])/);
      _yuitest_coverline("build/inputex-color/inputex-color.js", 356);
hexaColor = '#'+DecToHex(rgb[2])+DecToHex(rgb[4])+DecToHex(rgb[6]);
   
   // IE, Opera
   //   -> format "#FE6D34"
   } else {_yuitest_coverline("build/inputex-color/inputex-color.js", 360);
if (!!color.match(/^#[\da-fA-F]{6}$/)) {
      _yuitest_coverline("build/inputex-color/inputex-color.js", 361);
hexaColor = color;
      
   } else {
      // defaults to white if invalid color
      _yuitest_coverline("build/inputex-color/inputex-color.js", 365);
hexaColor = "#FFFFFF";
   }}
   
   _yuitest_coverline("build/inputex-color/inputex-color.js", 368);
return hexaColor;
};

// Register this class as "color" type
_yuitest_coverline("build/inputex-color/inputex-color.js", 372);
inputEx.registerType("color", inputEx.ColorField, []);
	
},'3.1.0',{
  requires: ['inputex-field','node-event-delegate','event-outside','overlay']
});


}, '@VERSION@');
