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
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-imagecropper/inputex-imagecropper.js",
    code: []
};
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].code=["YUI.add('inputex-imagecropper', function (Y, NAME) {","","/**"," * @module inputex-imagecropper"," */","   var lang    = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Basic image cropper field."," * Returns an object with the following properties :"," *   - origin <array> [x,y]"," *   - size   <array> [width, height]"," *"," * @class inputEx.ImageCropperField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *   <li>url: image url</li>"," *   <li>ratio: null or array like [width, height]</li>"," *   <li>minSize: null or array like [width, height]</li>"," *   <li>value: object, initial value. See returned value</li>"," *   <li>padding: integer, padding </li>"," * </ul>"," */","inputEx.ImageCropperField = function(options) {","   inputEx.ImageCropperField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.ImageCropperField, inputEx.Field, {","   ","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.ImageCropperField.superclass.setOptions.call(this, options);","      if(!options.url){","          throw new Error(\"'url' has to be provided in options for 'imagecropper' type\");","      }","      this.options.url   = options.url;","      this.options.ratio = lang.isArray(options.ratio) ? (options.ratio[0] / options.ratio[1]) : null;","      this.options.padding = options.padding || 10;","      this.options.minSize = lang.isArray(options.minSize) ? options.minSize : [0,0];","   },","","   /**","    * Render","    * @method renderComponent","    */","   renderComponent: function() {","      this.wrapEl = Y.Node.create('<div class=\"inputEx-ImageCropperField-wrapper\" style=\"padding: '+this.options.padding+'px;\" />');","      this.wrapEl.appendTo(this.fieldContainer);","      this.el = Y.Node.create('<img src=\"'+this.options.url+'\" />');","      this.el.appendTo(this.wrapEl);","","      this.mask = {};","      this.mask.n       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-n\" style=\"top: 0; left: 0;\"></div>').appendTo(this.wrapEl);","      this.mask.s       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-s\" style=\"bottom: 0; left: 0;\"></div>').appendTo(this.wrapEl);","      this.mask.e       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-e\" style=\"right: 0; \"></div>').appendTo(this.wrapEl);","      this.mask.w       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-w\" style=\"left: 0;  \"></div>').appendTo(this.wrapEl);","      this.mask.border  = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask-border\" style=\"left: 0;\"></div>').appendTo(this.wrapEl);","","      // Wait for the image to be downloaded, then retrieve its size","      this.el.on('load', function () {","         var region = this.el.get('region');","         this.imageSize = [region.width, region.height];","         this.setValue(this.options.value ? this.options.value : {origin: [0,0], size: this.imageSize}, false);","      }, this);","   },","","   /**","    * Set the value","    * @method setValue","    */","   setValue: function (value, sendUpdatedEvt) {","","      if (!this.imageSize) {","         return;","      }","","      var cleanValue = this._constrain(Y.clone(value));","","      var padding = this.options.padding,","          n = padding + cleanValue.origin[1],","          s = padding + cleanValue.origin[1] + cleanValue.size[1],","          e = padding + cleanValue.origin[0] + cleanValue.size[0],","          w = padding + cleanValue.origin[0],","          width  = (padding * 2) + this.imageSize[0],","          height = (padding * 2) + this.imageSize[1];","","      this.value = cleanValue;","","      this.mask.n.setStyles ({width: width, height: n});","      this.mask.s.setStyles ({width: width, height: height - s});","      this.mask.e.setStyles ({top: n, height: s - n, width: width - e});","      this.mask.w.setStyles ({top: n, height: s - n, width: w});","      this.mask.border.setStyles({top: n - 1, left: w - 1, width: cleanValue.size[0], height: cleanValue.size[1]});","","      if(sendUpdatedEvt !== false) {","         this.fireUpdatedEvt();","      }","   },","","   /**","    * @method getValue","    */","   getValue: function () {","      return this.value;","   },","","   /**","    * @method initEvents","    */","   initEvents: function () {","      this.mask.border.on('mousedown', this._onMouseDown, this);","      this.wrapEl.on('mousedown', this._onMouseDown, this);","   },","","   /**","    * @method _onMouseDown","    * @private","    */","   _onMouseDown: function (e) {","      e.halt(true);","      this.dragging    = (e.target === this.mask.border);","      this.imageOrigin = this.el.getXY();","","      var clicOrigin = [e.pageX - this.imageOrigin[0],","                        e.pageY - this.imageOrigin[1]];","","      if (!this.dragging) {","         this.firstOrigin = null;","         this.setValue({origin: clicOrigin, size: [1,1]}, false);","      }","      else {","         this.firstOrigin = clicOrigin;","      }","","      Y.one(document).on('mousemove', this._onMouseMove, this);","","      Y.one(document).once('mouseup', function (e) {","         Y.one(document).detach('mousemove', this._onMouseMove);","         this._onMouseMove(e); // setValue one last time","         this.fireUpdatedEvt();","      }, this);","   },","","   /**","    * @method _onMouseMove","    * @private","    */","   _onMouseMove: function (e) {","      e.halt(true); // prevent text selection","      var imageOrigin = this.imageOrigin,","          oldOrigin = this.firstOrigin,","          relX = Math.min(this.imageSize[0], Math.max(0, e.pageX - imageOrigin[0])),","          relY = Math.min(this.imageSize[1], Math.max(0, e.pageY - imageOrigin[1])),","          dX = relX - oldOrigin[0],","          dY = relY - oldOrigin[1],","          newSize = [],","          newOrigin = [];","","      if (this.dragging) {","         newSize = this.value.size;","         newOrigin[0] = this.value.origin[0] + dX;","         newOrigin[1] = this.value.origin[1] + dY;","         this.firstOrigin = [relX, relY];","      }","      else {","         newSize = [Math.abs(dX), Math.abs(dY)];","         newOrigin[0] = (dX < 0 ? relX : oldOrigin[0]);","         newOrigin[1] = (dY < 0 ? relY : oldOrigin[1]);","      }","","      this.setValue({origin: newOrigin, size: newSize}, false);","   },","   ","   /**","    * @method _contrain","    * @private","    */","   _constrain: function (value) {","      var r = this.options.ratio,","          i = this.imageSize,","          m = this.options.minSize,","          o = value.origin,","          s = value.size;","","      // Match minSize if needed","      if (m) {","         s = [Math.min(i[0], Math.max(m[0], s[0])),","              Math.min(i[1], Math.max(m[1], s[1]))];","      }","","      // Adjust size to match the ratio","      if (r) {","        if ((s[0] / s[1]) < r) {","           s[1] = Math.round(s[0] / r);","        }","        else {","           s[0] = Math.round(s[1] * r);","        }","      }","","      // Adjust origin in case the size changed","      if (!this.dragging) {","         if (!this.firstOrigin) {","            // firstOrigin refers to the original clic position","            this.firstOrigin = [Math.max(0, Math.min(i[0], o[0])),","                                Math.max(0, Math.min(i[1], o[1]))];","         }","         else {","            if (o[0] < this.firstOrigin[0]) {","               o[0] = this.firstOrigin[0] - s[0];","            }","            if (o[1] < this.firstOrigin[1]) {","               o[1] = this.firstOrigin[1] - s[1];","            }","         }","      }","","      // The real crop area origin isn't always equal to firstOrigin","      o[0] = Math.max(0, Math.min(i[0] - s[0], o[0]));","      o[1] = Math.max(0, Math.min(i[1] - s[1], o[1]));","","      return {origin: o, size: s};","   }","","});","","// Register this class as \"imagecropper\" type","inputEx.registerType(\"imagecropper\", inputEx.ImageCropperField);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"imagecropper\", \"skinnable\": true});"];
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].lines = {"1":0,"6":0,"27":0,"28":0,"31":0,"39":0,"40":0,"41":0,"43":0,"44":0,"45":0,"46":0,"54":0,"55":0,"56":0,"57":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"67":0,"68":0,"69":0,"70":0,"80":0,"81":0,"84":0,"86":0,"94":0,"96":0,"97":0,"98":0,"99":0,"100":0,"102":0,"103":0,"111":0,"118":0,"119":0,"127":0,"128":0,"129":0,"131":0,"134":0,"135":0,"136":0,"139":0,"142":0,"144":0,"145":0,"146":0,"147":0,"156":0,"157":0,"166":0,"167":0,"168":0,"169":0,"170":0,"173":0,"174":0,"175":0,"178":0,"186":0,"193":0,"194":0,"199":0,"200":0,"201":0,"204":0,"209":0,"210":0,"212":0,"216":0,"217":0,"219":0,"220":0,"226":0,"227":0,"229":0,"235":0};
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].functions = {"ImageCropperField:27":0,"setOptions:38":0,"(anonymous 2):67":0,"renderComponent:53":0,"setValue:78":0,"getValue:110":0,"initEvents:117":0,"(anonymous 3):144":0,"_onMouseDown:126":0,"_onMouseMove:155":0,"_constrain:185":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].coveredLines = 83;
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 1);
YUI.add('inputex-imagecropper', function (Y, NAME) {

/**
 * @module inputex-imagecropper
 */
   _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 6);
var lang    = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Basic image cropper field.
 * Returns an object with the following properties :
 *   - origin <array> [x,y]
 *   - size   <array> [width, height]
 *
 * @class inputEx.ImageCropperField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *   <li>url: image url</li>
 *   <li>ratio: null or array like [width, height]</li>
 *   <li>minSize: null or array like [width, height]</li>
 *   <li>value: object, initial value. See returned value</li>
 *   <li>padding: integer, padding </li>
 * </ul>
 */
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 27);
inputEx.ImageCropperField = function(options) {
   _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "ImageCropperField", 27);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 28);
inputEx.ImageCropperField.superclass.constructor.call(this, options);
};

_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 31);
Y.extend(inputEx.ImageCropperField, inputEx.Field, {
   
   /**
    * Set the default values of the options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "setOptions", 38);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 39);
inputEx.ImageCropperField.superclass.setOptions.call(this, options);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 40);
if(!options.url){
          _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 41);
throw new Error("'url' has to be provided in options for 'imagecropper' type");
      }
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 43);
this.options.url   = options.url;
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 44);
this.options.ratio = lang.isArray(options.ratio) ? (options.ratio[0] / options.ratio[1]) : null;
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 45);
this.options.padding = options.padding || 10;
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 46);
this.options.minSize = lang.isArray(options.minSize) ? options.minSize : [0,0];
   },

   /**
    * Render
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "renderComponent", 53);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 54);
this.wrapEl = Y.Node.create('<div class="inputEx-ImageCropperField-wrapper" style="padding: '+this.options.padding+'px;" />');
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 55);
this.wrapEl.appendTo(this.fieldContainer);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 56);
this.el = Y.Node.create('<img src="'+this.options.url+'" />');
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 57);
this.el.appendTo(this.wrapEl);

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 59);
this.mask = {};
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 60);
this.mask.n       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-n" style="top: 0; left: 0;"></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 61);
this.mask.s       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-s" style="bottom: 0; left: 0;"></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 62);
this.mask.e       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-e" style="right: 0; "></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 63);
this.mask.w       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-w" style="left: 0;  "></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 64);
this.mask.border  = Y.Node.create('<div class="inputEx-ImageCropperField-mask-border" style="left: 0;"></div>').appendTo(this.wrapEl);

      // Wait for the image to be downloaded, then retrieve its size
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 67);
this.el.on('load', function () {
         _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "(anonymous 2)", 67);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 68);
var region = this.el.get('region');
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 69);
this.imageSize = [region.width, region.height];
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 70);
this.setValue(this.options.value ? this.options.value : {origin: [0,0], size: this.imageSize}, false);
      }, this);
   },

   /**
    * Set the value
    * @method setValue
    */
   setValue: function (value, sendUpdatedEvt) {

      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "setValue", 78);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 80);
if (!this.imageSize) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 81);
return;
      }

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 84);
var cleanValue = this._constrain(Y.clone(value));

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 86);
var padding = this.options.padding,
          n = padding + cleanValue.origin[1],
          s = padding + cleanValue.origin[1] + cleanValue.size[1],
          e = padding + cleanValue.origin[0] + cleanValue.size[0],
          w = padding + cleanValue.origin[0],
          width  = (padding * 2) + this.imageSize[0],
          height = (padding * 2) + this.imageSize[1];

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 94);
this.value = cleanValue;

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 96);
this.mask.n.setStyles ({width: width, height: n});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 97);
this.mask.s.setStyles ({width: width, height: height - s});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 98);
this.mask.e.setStyles ({top: n, height: s - n, width: width - e});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 99);
this.mask.w.setStyles ({top: n, height: s - n, width: w});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 100);
this.mask.border.setStyles({top: n - 1, left: w - 1, width: cleanValue.size[0], height: cleanValue.size[1]});

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 102);
if(sendUpdatedEvt !== false) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 103);
this.fireUpdatedEvt();
      }
   },

   /**
    * @method getValue
    */
   getValue: function () {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "getValue", 110);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 111);
return this.value;
   },

   /**
    * @method initEvents
    */
   initEvents: function () {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "initEvents", 117);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 118);
this.mask.border.on('mousedown', this._onMouseDown, this);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 119);
this.wrapEl.on('mousedown', this._onMouseDown, this);
   },

   /**
    * @method _onMouseDown
    * @private
    */
   _onMouseDown: function (e) {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "_onMouseDown", 126);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 127);
e.halt(true);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 128);
this.dragging    = (e.target === this.mask.border);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 129);
this.imageOrigin = this.el.getXY();

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 131);
var clicOrigin = [e.pageX - this.imageOrigin[0],
                        e.pageY - this.imageOrigin[1]];

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 134);
if (!this.dragging) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 135);
this.firstOrigin = null;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 136);
this.setValue({origin: clicOrigin, size: [1,1]}, false);
      }
      else {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 139);
this.firstOrigin = clicOrigin;
      }

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 142);
Y.one(document).on('mousemove', this._onMouseMove, this);

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 144);
Y.one(document).once('mouseup', function (e) {
         _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "(anonymous 3)", 144);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 145);
Y.one(document).detach('mousemove', this._onMouseMove);
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 146);
this._onMouseMove(e); // setValue one last time
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 147);
this.fireUpdatedEvt();
      }, this);
   },

   /**
    * @method _onMouseMove
    * @private
    */
   _onMouseMove: function (e) {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "_onMouseMove", 155);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 156);
e.halt(true); // prevent text selection
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 157);
var imageOrigin = this.imageOrigin,
          oldOrigin = this.firstOrigin,
          relX = Math.min(this.imageSize[0], Math.max(0, e.pageX - imageOrigin[0])),
          relY = Math.min(this.imageSize[1], Math.max(0, e.pageY - imageOrigin[1])),
          dX = relX - oldOrigin[0],
          dY = relY - oldOrigin[1],
          newSize = [],
          newOrigin = [];

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 166);
if (this.dragging) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 167);
newSize = this.value.size;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 168);
newOrigin[0] = this.value.origin[0] + dX;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 169);
newOrigin[1] = this.value.origin[1] + dY;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 170);
this.firstOrigin = [relX, relY];
      }
      else {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 173);
newSize = [Math.abs(dX), Math.abs(dY)];
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 174);
newOrigin[0] = (dX < 0 ? relX : oldOrigin[0]);
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 175);
newOrigin[1] = (dY < 0 ? relY : oldOrigin[1]);
      }

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 178);
this.setValue({origin: newOrigin, size: newSize}, false);
   },
   
   /**
    * @method _contrain
    * @private
    */
   _constrain: function (value) {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "_constrain", 185);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 186);
var r = this.options.ratio,
          i = this.imageSize,
          m = this.options.minSize,
          o = value.origin,
          s = value.size;

      // Match minSize if needed
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 193);
if (m) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 194);
s = [Math.min(i[0], Math.max(m[0], s[0])),
              Math.min(i[1], Math.max(m[1], s[1]))];
      }

      // Adjust size to match the ratio
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 199);
if (r) {
        _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 200);
if ((s[0] / s[1]) < r) {
           _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 201);
s[1] = Math.round(s[0] / r);
        }
        else {
           _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 204);
s[0] = Math.round(s[1] * r);
        }
      }

      // Adjust origin in case the size changed
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 209);
if (!this.dragging) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 210);
if (!this.firstOrigin) {
            // firstOrigin refers to the original clic position
            _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 212);
this.firstOrigin = [Math.max(0, Math.min(i[0], o[0])),
                                Math.max(0, Math.min(i[1], o[1]))];
         }
         else {
            _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 216);
if (o[0] < this.firstOrigin[0]) {
               _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 217);
o[0] = this.firstOrigin[0] - s[0];
            }
            _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 219);
if (o[1] < this.firstOrigin[1]) {
               _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 220);
o[1] = this.firstOrigin[1] - s[1];
            }
         }
      }

      // The real crop area origin isn't always equal to firstOrigin
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 226);
o[0] = Math.max(0, Math.min(i[0] - s[0], o[0]));
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 227);
o[1] = Math.max(0, Math.min(i[1] - s[1], o[1]));

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 229);
return {origin: o, size: s};
   }

});

// Register this class as "imagecropper" type
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 235);
inputEx.registerType("imagecropper", inputEx.ImageCropperField);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "imagecropper", "skinnable": true});
