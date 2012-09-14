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
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].code=["YUI.add('inputex-imagecropper', function (Y, NAME) {","","/**"," * @module inputex-imagecropper"," */","   var lang    = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Basic image cropper field."," * Returns an object with the following properties :"," *   - origin <array> [x,y]"," *   - size   <array> [width, height]"," *"," * @class inputEx.ImageCropperField"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options Added options:"," * <ul>"," *   <li>url: image url</li>"," *   <li>ratio: null or array like [width, height]</li>"," *   <li>minSize: null or array like [width, height]</li>"," *   <li>value: object, initial value. See returned value</li>"," *   <li>padding: integer, padding </li>"," * </ul>"," */","inputEx.ImageCropperField = function(options) {","   inputEx.ImageCropperField.superclass.constructor.call(this, options);","};","","Y.extend(inputEx.ImageCropperField, inputEx.Field, {","   ","   /**","    * Set the default values of the options","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","   setOptions: function(options) {","      inputEx.ImageCropperField.superclass.setOptions.call(this, options);","      this.options.url   = options.url;","      this.options.ratio = lang.isArray(options.ratio) ? (options.ratio[0] / options.ratio[1]) : null;","      this.options.padding = options.padding || 10;","      this.options.minSize = lang.isArray(options.minSize) ? options.minSize : [0,0];","   },","","   /**","    * Render","    * @method renderComponent","    */","   renderComponent: function() {","      this.wrapEl = Y.Node.create('<div class=\"inputEx-ImageCropperField-wrapper\" style=\"padding: '+this.options.padding+'px;\" />');","      this.wrapEl.appendTo(this.fieldContainer);","      this.el = Y.Node.create('<img src=\"'+this.options.url+'\" />');","      this.el.appendTo(this.wrapEl);","","      this.mask = {};","      this.mask.n       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-n\" style=\"top: 0; left: 0;\"></div>').appendTo(this.wrapEl);","      this.mask.s       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-s\" style=\"bottom: 0; left: 0;\"></div>').appendTo(this.wrapEl);","      this.mask.e       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-e\" style=\"right: 0; \"></div>').appendTo(this.wrapEl);","      this.mask.w       = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-w\" style=\"left: 0;  \"></div>').appendTo(this.wrapEl);","      this.mask.border  = Y.Node.create('<div class=\"inputEx-ImageCropperField-mask-border\" style=\"left: 0;\"></div>').appendTo(this.wrapEl);","","      // Wait for the image to be downloaded, then retrieve its size","      this.el.on('load', function () {","         var region = this.el.get('region');","         this.imageSize = [region.width, region.height];","         this.setValue(this.options.value ? this.options.value : {origin: [0,0], size: this.imageSize}, false);","      }, this);","   },","","   /**","    * Set the value","    * @method setValue","    */","   setValue: function (value, sendUpdatedEvt) {","","      if (!this.imageSize) {","         return;","      }","","      var cleanValue = this._constrain(Y.clone(value));","","      var padding = this.options.padding,","          n = padding + cleanValue.origin[1],","          s = padding + cleanValue.origin[1] + cleanValue.size[1],","          e = padding + cleanValue.origin[0] + cleanValue.size[0],","          w = padding + cleanValue.origin[0],","          width  = (padding * 2) + this.imageSize[0],","          height = (padding * 2) + this.imageSize[1];","","      this.value = cleanValue;","","      this.mask.n.setStyles ({width: width, height: n});","      this.mask.s.setStyles ({width: width, height: height - s});","      this.mask.e.setStyles ({top: n, height: s - n, width: width - e});","      this.mask.w.setStyles ({top: n, height: s - n, width: w});","      this.mask.border.setStyles({top: n - 1, left: w - 1, width: cleanValue.size[0], height: cleanValue.size[1]});","","      if(sendUpdatedEvt !== false) {","         this.fireUpdatedEvt();","      }","   },","","   /**","    * @method getValue","    */","   getValue: function () {","      return this.value;","   },","","   /**","    * @method initEvents","    */","   initEvents: function () {","      this.mask.border.on('mousedown', this._onMouseDown, this);","      this.wrapEl.on('mousedown', this._onMouseDown, this);","   },","","   /**","    * @method _onMouseDown","    * @private","    */","   _onMouseDown: function (e) {","      e.halt(true);","      this.dragging    = (e.target === this.mask.border);","      this.imageOrigin = this.el.getXY();","","      var clicOrigin = [e.pageX - this.imageOrigin[0],","                        e.pageY - this.imageOrigin[1]];","","      if (!this.dragging) {","         this.firstOrigin = null;","         this.setValue({origin: clicOrigin, size: [1,1]}, false);","      }","      else {","         this.firstOrigin = clicOrigin;","      }","","      Y.one(document).on('mousemove', this._onMouseMove, this);","","      Y.one(document).once('mouseup', function (e) {","         Y.one(document).detach('mousemove', this._onMouseMove);","         this._onMouseMove(e); // setValue one last time","         this.fireUpdatedEvt();","      }, this);","   },","","   /**","    * @method _onMouseMove","    * @private","    */","   _onMouseMove: function (e) {","      e.halt(true); // prevent text selection","      var imageOrigin = this.imageOrigin,","          oldOrigin = this.firstOrigin,","          relX = Math.min(this.imageSize[0], Math.max(0, e.pageX - imageOrigin[0])),","          relY = Math.min(this.imageSize[1], Math.max(0, e.pageY - imageOrigin[1])),","          dX = relX - oldOrigin[0],","          dY = relY - oldOrigin[1],","          newSize = [],","          newOrigin = [];","","      if (this.dragging) {","         newSize = this.value.size;","         newOrigin[0] = this.value.origin[0] + dX;","         newOrigin[1] = this.value.origin[1] + dY;","         this.firstOrigin = [relX, relY];","      }","      else {","         newSize = [Math.abs(dX), Math.abs(dY)];","         newOrigin[0] = (dX < 0 ? relX : oldOrigin[0]);","         newOrigin[1] = (dY < 0 ? relY : oldOrigin[1]);","      }","","      this.setValue({origin: newOrigin, size: newSize}, false);","   },","   ","   /**","    * @method _contrain","    * @private","    */","   _constrain: function (value) {","      var r = this.options.ratio,","          i = this.imageSize,","          m = this.options.minSize,","          o = value.origin,","          s = value.size;","","      // Match minSize if needed","      if (m) {","         s = [Math.min(i[0], Math.max(m[0], s[0])),","              Math.min(i[1], Math.max(m[1], s[1]))];","      }","","      // Adjust size to match the ratio","      if (r) {","        if ((s[0] / s[1]) < r) {","           s[1] = Math.round(s[0] / r);","        }","        else {","           s[0] = Math.round(s[1] * r);","        }","      }","","      // Adjust origin in case the size changed","      if (!this.dragging) {","         if (!this.firstOrigin) {","            // firstOrigin refers to the original clic position","            this.firstOrigin = [Math.max(0, Math.min(i[0], o[0])),","                                Math.max(0, Math.min(i[1], o[1]))];","         }","         else {","            if (o[0] < this.firstOrigin[0]) {","               o[0] = this.firstOrigin[0] - s[0];","            }","            if (o[1] < this.firstOrigin[1]) {","               o[1] = this.firstOrigin[1] - s[1];","            }","         }","      }","","      // The real crop area origin isn't always equal to firstOrigin","      o[0] = Math.max(0, Math.min(i[0] - s[0], o[0]));","      o[1] = Math.max(0, Math.min(i[1] - s[1], o[1]));","","      return {origin: o, size: s};","   }","","});","","// Register this class as \"imagecropper\" type","inputEx.registerType(\"imagecropper\", inputEx.ImageCropperField);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"ix_provides\": \"imagecropper\"});"];
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].lines = {"1":0,"6":0,"27":0,"28":0,"31":0,"39":0,"40":0,"41":0,"42":0,"43":0,"51":0,"52":0,"53":0,"54":0,"56":0,"57":0,"58":0,"59":0,"60":0,"61":0,"64":0,"65":0,"66":0,"67":0,"77":0,"78":0,"81":0,"83":0,"91":0,"93":0,"94":0,"95":0,"96":0,"97":0,"99":0,"100":0,"108":0,"115":0,"116":0,"124":0,"125":0,"126":0,"128":0,"131":0,"132":0,"133":0,"136":0,"139":0,"141":0,"142":0,"143":0,"144":0,"153":0,"154":0,"163":0,"164":0,"165":0,"166":0,"167":0,"170":0,"171":0,"172":0,"175":0,"183":0,"190":0,"191":0,"196":0,"197":0,"198":0,"201":0,"206":0,"207":0,"209":0,"213":0,"214":0,"216":0,"217":0,"223":0,"224":0,"226":0,"232":0};
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].functions = {"ImageCropperField:27":0,"setOptions:38":0,"(anonymous 2):64":0,"renderComponent:50":0,"setValue:75":0,"getValue:107":0,"initEvents:114":0,"(anonymous 3):141":0,"_onMouseDown:123":0,"_onMouseMove:152":0,"_constrain:182":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-imagecropper/inputex-imagecropper.js"].coveredLines = 81;
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
this.options.url   = options.url;
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 41);
this.options.ratio = lang.isArray(options.ratio) ? (options.ratio[0] / options.ratio[1]) : null;
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 42);
this.options.padding = options.padding || 10;
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 43);
this.options.minSize = lang.isArray(options.minSize) ? options.minSize : [0,0];
   },

   /**
    * Render
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "renderComponent", 50);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 51);
this.wrapEl = Y.Node.create('<div class="inputEx-ImageCropperField-wrapper" style="padding: '+this.options.padding+'px;" />');
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 52);
this.wrapEl.appendTo(this.fieldContainer);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 53);
this.el = Y.Node.create('<img src="'+this.options.url+'" />');
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 54);
this.el.appendTo(this.wrapEl);

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 56);
this.mask = {};
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 57);
this.mask.n       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-n" style="top: 0; left: 0;"></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 58);
this.mask.s       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-s" style="bottom: 0; left: 0;"></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 59);
this.mask.e       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-e" style="right: 0; "></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 60);
this.mask.w       = Y.Node.create('<div class="inputEx-ImageCropperField-mask inputEx-ImageCropperField-mask-w" style="left: 0;  "></div>').appendTo(this.wrapEl);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 61);
this.mask.border  = Y.Node.create('<div class="inputEx-ImageCropperField-mask-border" style="left: 0;"></div>').appendTo(this.wrapEl);

      // Wait for the image to be downloaded, then retrieve its size
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 64);
this.el.on('load', function () {
         _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "(anonymous 2)", 64);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 65);
var region = this.el.get('region');
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 66);
this.imageSize = [region.width, region.height];
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 67);
this.setValue(this.options.value ? this.options.value : {origin: [0,0], size: this.imageSize}, false);
      }, this);
   },

   /**
    * Set the value
    * @method setValue
    */
   setValue: function (value, sendUpdatedEvt) {

      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "setValue", 75);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 77);
if (!this.imageSize) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 78);
return;
      }

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 81);
var cleanValue = this._constrain(Y.clone(value));

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 83);
var padding = this.options.padding,
          n = padding + cleanValue.origin[1],
          s = padding + cleanValue.origin[1] + cleanValue.size[1],
          e = padding + cleanValue.origin[0] + cleanValue.size[0],
          w = padding + cleanValue.origin[0],
          width  = (padding * 2) + this.imageSize[0],
          height = (padding * 2) + this.imageSize[1];

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 91);
this.value = cleanValue;

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 93);
this.mask.n.setStyles ({width: width, height: n});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 94);
this.mask.s.setStyles ({width: width, height: height - s});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 95);
this.mask.e.setStyles ({top: n, height: s - n, width: width - e});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 96);
this.mask.w.setStyles ({top: n, height: s - n, width: w});
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 97);
this.mask.border.setStyles({top: n - 1, left: w - 1, width: cleanValue.size[0], height: cleanValue.size[1]});

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 99);
if(sendUpdatedEvt !== false) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 100);
this.fireUpdatedEvt();
      }
   },

   /**
    * @method getValue
    */
   getValue: function () {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "getValue", 107);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 108);
return this.value;
   },

   /**
    * @method initEvents
    */
   initEvents: function () {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "initEvents", 114);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 115);
this.mask.border.on('mousedown', this._onMouseDown, this);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 116);
this.wrapEl.on('mousedown', this._onMouseDown, this);
   },

   /**
    * @method _onMouseDown
    * @private
    */
   _onMouseDown: function (e) {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "_onMouseDown", 123);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 124);
e.halt(true);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 125);
this.dragging    = (e.target === this.mask.border);
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 126);
this.imageOrigin = this.el.getXY();

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 128);
var clicOrigin = [e.pageX - this.imageOrigin[0],
                        e.pageY - this.imageOrigin[1]];

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 131);
if (!this.dragging) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 132);
this.firstOrigin = null;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 133);
this.setValue({origin: clicOrigin, size: [1,1]}, false);
      }
      else {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 136);
this.firstOrigin = clicOrigin;
      }

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 139);
Y.one(document).on('mousemove', this._onMouseMove, this);

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 141);
Y.one(document).once('mouseup', function (e) {
         _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "(anonymous 3)", 141);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 142);
Y.one(document).detach('mousemove', this._onMouseMove);
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 143);
this._onMouseMove(e); // setValue one last time
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 144);
this.fireUpdatedEvt();
      }, this);
   },

   /**
    * @method _onMouseMove
    * @private
    */
   _onMouseMove: function (e) {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "_onMouseMove", 152);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 153);
e.halt(true); // prevent text selection
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 154);
var imageOrigin = this.imageOrigin,
          oldOrigin = this.firstOrigin,
          relX = Math.min(this.imageSize[0], Math.max(0, e.pageX - imageOrigin[0])),
          relY = Math.min(this.imageSize[1], Math.max(0, e.pageY - imageOrigin[1])),
          dX = relX - oldOrigin[0],
          dY = relY - oldOrigin[1],
          newSize = [],
          newOrigin = [];

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 163);
if (this.dragging) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 164);
newSize = this.value.size;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 165);
newOrigin[0] = this.value.origin[0] + dX;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 166);
newOrigin[1] = this.value.origin[1] + dY;
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 167);
this.firstOrigin = [relX, relY];
      }
      else {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 170);
newSize = [Math.abs(dX), Math.abs(dY)];
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 171);
newOrigin[0] = (dX < 0 ? relX : oldOrigin[0]);
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 172);
newOrigin[1] = (dY < 0 ? relY : oldOrigin[1]);
      }

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 175);
this.setValue({origin: newOrigin, size: newSize}, false);
   },
   
   /**
    * @method _contrain
    * @private
    */
   _constrain: function (value) {
      _yuitest_coverfunc("build/inputex-imagecropper/inputex-imagecropper.js", "_constrain", 182);
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 183);
var r = this.options.ratio,
          i = this.imageSize,
          m = this.options.minSize,
          o = value.origin,
          s = value.size;

      // Match minSize if needed
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 190);
if (m) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 191);
s = [Math.min(i[0], Math.max(m[0], s[0])),
              Math.min(i[1], Math.max(m[1], s[1]))];
      }

      // Adjust size to match the ratio
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 196);
if (r) {
        _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 197);
if ((s[0] / s[1]) < r) {
           _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 198);
s[1] = Math.round(s[0] / r);
        }
        else {
           _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 201);
s[0] = Math.round(s[1] * r);
        }
      }

      // Adjust origin in case the size changed
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 206);
if (!this.dragging) {
         _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 207);
if (!this.firstOrigin) {
            // firstOrigin refers to the original clic position
            _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 209);
this.firstOrigin = [Math.max(0, Math.min(i[0], o[0])),
                                Math.max(0, Math.min(i[1], o[1]))];
         }
         else {
            _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 213);
if (o[0] < this.firstOrigin[0]) {
               _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 214);
o[0] = this.firstOrigin[0] - s[0];
            }
            _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 216);
if (o[1] < this.firstOrigin[1]) {
               _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 217);
o[1] = this.firstOrigin[1] - s[1];
            }
         }
      }

      // The real crop area origin isn't always equal to firstOrigin
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 223);
o[0] = Math.max(0, Math.min(i[0] - s[0], o[0]));
      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 224);
o[1] = Math.max(0, Math.min(i[1] - s[1], o[1]));

      _yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 226);
return {origin: o, size: s};
   }

});

// Register this class as "imagecropper" type
_yuitest_coverline("build/inputex-imagecropper/inputex-imagecropper.js", 232);
inputEx.registerType("imagecropper", inputEx.ImageCropperField);


}, '@VERSION@', {"requires": ["inputex-field"], "ix_provides": "imagecropper"});
