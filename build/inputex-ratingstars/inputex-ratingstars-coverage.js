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
_yuitest_coverage["build/inputex-ratingstars/inputex-ratingstars.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-ratingstars/inputex-ratingstars.js",
    code: []
};
_yuitest_coverage["build/inputex-ratingstars/inputex-ratingstars.js"].code=["YUI.add('inputex-ratingstars', function (Y, NAME) {","","/**"," * @module inputex-ratingstars"," */","   var lang = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Create a star rating Field"," * This field has been made by integrating script from http://www.unessa.net/en/hoyci/projects/yui-star-rating/"," * To use it with auto data sending, use RatingStars"," * @class inputEx.RatingStars"," * @extends inputEx.Field"," * @constructor"," * @param {Object} options The following options are added for RatingStars :"," * <ul>"," *  <li><b>averageValue</b>: average value before clicking, must be a float number</li>"," *  <li><b>nRates</b>: numbers of vote</li>"," *  <li><b>disableRate</b>: Disable the rate but show stars</li>"," *  <li><b>nStars</b>: <i>integer</i> number of stars (default : 5) </li>"," *  <li><b>disabled</b>: disable voting  </li>"," *  <li><b>message</b>: <i>string</i> C-like with % convention string for display Message (default 'Rating: % (% votes cast)') </li>"," *  <li><b>disableMessage</b>: <i>string</i> String to show when mouse pass hover the stars and stars are disabled</li>"," * </ul>"," */","inputEx.RatingStars = function(options) {","   inputEx.RatingStars.superclass.constructor.call(this,options);","   this.resetStars();","};","","Y.extend(inputEx.RatingStars, inputEx.Field,{","  setOptions: function(options){","    inputEx.RatingStars.superclass.setOptions.call(this,options);","    ","    // Added options","    if(lang.isArray(options.nStars) && options.nStars[0] && lang.isString(options.nStars[0])){","      this.options.nStars = options.nStars.length;","      this.options.starsMessages = options.nStars;","    } else {","      this.options.nStars = options.nStars || 5;","    }","    this.options.averageValue = lang.isNumber(options.averageValue) ? Math.round((options.averageValue)*10)/10 : null;","    this.options.disableRate = options.disableRate || false;","    this.options.nRates = options.nRates;","    this.options.name = options.name || \"stars\";","    ","    this.dontReset = false ;// => used when the form is ajax submitted, then we pass true to this param","    this.disabled = options.disabled || false;","    ","    // Overwrite options","    this.options.message = options.message || inputEx.messages.ratingMsg;","    this.options.disableMessage = options.disableMessage;","    this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RatingStars';","    this.setMessage();","","  },","  /**","   * Set message options of the selectField","   * @method setMessage","   */","  setMessage: function(){","    var messageArray = this.options.message.split(\"%\");","    ","    this.options.message = \"\";","    if (this.options.averageValue){","      this.options.message = this.options.message + messageArray[0] + this.options.averageValue + \"/\" + this.options.nStars ","    }","    if(this.options.nRates){","      this.options.message = this.options.message + messageArray[1] + this.options.nRates + messageArray[2]","    }","  },  ","  /**","   * render stars","   * @method render","   */","  renderComponent: function(){","    this.starsEls = [];","    this.el = inputEx.cn('div');","    for (var i = 0 ; i < this.options.nStars; i++) {","      // first, make a div and then an a-element in it","      var star = inputEx.cn('div',{id:'star-' + i, className: \"inputEx-star\"});","      var that = this;","      star.index = i;","      star.onHover = function(){","        that.onHoverStar(this.index);","      }","      star.onClick = function(){","        //by convention the value of the field goes from 1 to 5, as the number of stars. It's weird because there's no 0, but this is it.","        that.onClickRating(this.index+1);","      }","      this.starsEls.push(star);","      var a = inputEx.cn('a',{href:'#' + i},null,i);","      star.appendChild(a);","      this.el.appendChild(star);","","      // add needed listeners to every star","      Y.one(star).on('mouseover', star.onHover, star, true);","      Y.one(star).on('click', star.onClick, star, true);","    } ","    Y.one(this.el).on('mouseout', this.resetStars, this, true);","    this.fieldContainer.appendChild(this.el);","    this.divMess = this.fieldContainer.appendChild(inputEx.cn('div', {id: this.divEl.id+'-mess', className: 'inputEx-message'}, null, this.options.message ));","","  },","  /**","   * When mouse is over a star","   * @method onHoverStar","   */","  onHoverStar: function(whichStar) {","      if(!this.disabled){","        /* hovers the selected star plus every star before it */","        if(!this.value){","          for (var i=0; i < this.options.nStars; i++) {","            var star = this.starsEls[i],","                a = star.firstChild;","            if(i < whichStar+1 ){","              Y.one(star).addClass('hover');","              Y.one(a).setStyle('width', '100%');            ","            } else {","              Y.one(star).removeClass('on');","              Y.one(star).removeClass('hover');","            }",""," ","          }","        }","      ","        if(this.options.starsMessages){","          this.showMessage(\"<span class=\\\"inputEx-starMess\\\">\"+this.options.starsMessages[whichStar]+\"</span>\");","        }","      } else {","        if(this.options.disableMessage){","          this.showMessage(\"<span class=\\\"inputEx-disableMessage\\\">\"+this.options.disableMessage+\"</span>\")","        }","      }","    },  ","  /**","   * InitEvents","   * @method initEvents","   */","    initEvents: function(e, whichStar) {","      this.publish(\"rateEvt\");","    },  ","  /**","   * reset Stars and note","   * @method resetStars","   */","    resetStars: function(inValue) {","        /* Resets the status of each star */","        ","        // if form is not submitted, the number of stars on depends on the ","        // given average value","        if (this.dontReset) {","          return","        }","        var value = lang.isNumber(inValue) ? inValue : this.options.averageValue ;","        var starsOn = Math.floor(value),","            rest = Math.floor((this.options.averageValue - starsOn)*10),","            lastStarWidth;","            ","        if (rest > 0){","           starsOn = starsOn + 1;","           lastStarWidth = rest + '0%';","        }","        for (var i=0; i < this.options.nStars ; i++) {","            var star = this.starsEls[i],","                a = star.firstChild;","            Y.one(star).removeClass('hover');","            if(i < starsOn){","              Y.one(star).addClass('on');","            }  else {","              Y.one(star).removeClass('on');","            }","          ","            // and for the last one, set width if needed","            if (i == starsOn - 1 && lastStarWidth){","              Y.one(a).setStyle('width', lastStarWidth);","            }","        }","        this.showMessage();","    },","    /**","     * Tell something under the stars","     * @method showMessage","     */","    showMessage: function(text){","      if(!text){","        //default message","        var text = this.options.message","      }","      this.divMess.innerHTML = text;","    },","    /**","     * onAsync is called by the containing form when request is Send","     * @method onAsync","     */","    onAsync : function(){","      this.showMessage(\"<span class=\\\"thanks\\\">\"+inputEx.messages.sendingRate+\"</span>\");","    },","    onEndAsync : function(){","       this.afterRating();","    },","    /**","    * ","    * @method onClickRating","    */","    onClickRating: function(value){","      if(this.disabled){","        return","      }","      this.setValue(value);","      this.dontReset = true;","      this.disable();","      this.fire(\"rate\",value);  ","      ","    },","    afterRating: function(){","      this.showMessage(\"<span class=\\\"thanks\\\">\"+inputEx.messages.thanksRate+\"</span>\");      ","    },","    disable: function(){","      this.disabled = true;  ","    },","    enable: function(){","      this.disabled = false;","    },","    setValue: function(value){","      inputEx.RatingStars.superclass.setValue.call(this,value);","      this.value = value;","    },","    getValue: function(){","      return this.value;  ","    }","});",""," "," // Register this class as \"url\" type"," inputEx.registerType(\"ratingstars\", inputEx.RatingStars);","","","}, '@VERSION@', {\"requires\": [\"inputex-field\"], \"skinnable\": true, \"ix_provides\": \"ratingstars\"});"];
_yuitest_coverage["build/inputex-ratingstars/inputex-ratingstars.js"].lines = {"1":0,"6":0,"27":0,"28":0,"29":0,"32":0,"34":0,"37":0,"38":0,"39":0,"41":0,"43":0,"44":0,"45":0,"46":0,"48":0,"49":0,"52":0,"53":0,"54":0,"55":0,"63":0,"65":0,"66":0,"67":0,"69":0,"70":0,"78":0,"79":0,"80":0,"82":0,"83":0,"84":0,"85":0,"86":0,"88":0,"90":0,"92":0,"93":0,"94":0,"95":0,"98":0,"99":0,"101":0,"102":0,"103":0,"111":0,"113":0,"114":0,"115":0,"117":0,"118":0,"119":0,"121":0,"122":0,"129":0,"130":0,"133":0,"134":0,"143":0,"154":0,"155":0,"157":0,"158":0,"162":0,"163":0,"164":0,"166":0,"167":0,"169":0,"170":0,"171":0,"173":0,"177":0,"178":0,"181":0,"188":0,"190":0,"192":0,"199":0,"202":0,"209":0,"210":0,"212":0,"213":0,"214":0,"215":0,"219":0,"222":0,"225":0,"228":0,"229":0,"232":0,"238":0};
_yuitest_coverage["build/inputex-ratingstars/inputex-ratingstars.js"].functions = {"RatingStars:27":0,"setOptions:33":0,"setMessage:62":0,"onHover:85":0,"onClick:88":0,"renderComponent:77":0,"onHoverStar:110":0,"initEvents:142":0,"resetStars:149":0,"showMessage:187":0,"onAsync:198":0,"onEndAsync:201":0,"onClickRating:208":0,"afterRating:218":0,"disable:221":0,"enable:224":0,"setValue:227":0,"getValue:231":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-ratingstars/inputex-ratingstars.js"].coveredLines = 94;
_yuitest_coverage["build/inputex-ratingstars/inputex-ratingstars.js"].coveredFunctions = 19;
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 1);
YUI.add('inputex-ratingstars', function (Y, NAME) {

/**
 * @module inputex-ratingstars
 */
   _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 6);
var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Create a star rating Field
 * This field has been made by integrating script from http://www.unessa.net/en/hoyci/projects/yui-star-rating/
 * To use it with auto data sending, use RatingStars
 * @class inputEx.RatingStars
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options The following options are added for RatingStars :
 * <ul>
 *  <li><b>averageValue</b>: average value before clicking, must be a float number</li>
 *  <li><b>nRates</b>: numbers of vote</li>
 *  <li><b>disableRate</b>: Disable the rate but show stars</li>
 *  <li><b>nStars</b>: <i>integer</i> number of stars (default : 5) </li>
 *  <li><b>disabled</b>: disable voting  </li>
 *  <li><b>message</b>: <i>string</i> C-like with % convention string for display Message (default 'Rating: % (% votes cast)') </li>
 *  <li><b>disableMessage</b>: <i>string</i> String to show when mouse pass hover the stars and stars are disabled</li>
 * </ul>
 */
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 27);
inputEx.RatingStars = function(options) {
   _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "RatingStars", 27);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 28);
inputEx.RatingStars.superclass.constructor.call(this,options);
   _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 29);
this.resetStars();
};

_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 32);
Y.extend(inputEx.RatingStars, inputEx.Field,{
  setOptions: function(options){
    _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "setOptions", 33);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 34);
inputEx.RatingStars.superclass.setOptions.call(this,options);
    
    // Added options
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 37);
if(lang.isArray(options.nStars) && options.nStars[0] && lang.isString(options.nStars[0])){
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 38);
this.options.nStars = options.nStars.length;
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 39);
this.options.starsMessages = options.nStars;
    } else {
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 41);
this.options.nStars = options.nStars || 5;
    }
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 43);
this.options.averageValue = lang.isNumber(options.averageValue) ? Math.round((options.averageValue)*10)/10 : null;
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 44);
this.options.disableRate = options.disableRate || false;
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 45);
this.options.nRates = options.nRates;
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 46);
this.options.name = options.name || "stars";
    
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 48);
this.dontReset = false ;// => used when the form is ajax submitted, then we pass true to this param
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 49);
this.disabled = options.disabled || false;
    
    // Overwrite options
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 52);
this.options.message = options.message || inputEx.messages.ratingMsg;
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 53);
this.options.disableMessage = options.disableMessage;
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 54);
this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RatingStars';
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 55);
this.setMessage();

  },
  /**
   * Set message options of the selectField
   * @method setMessage
   */
  setMessage: function(){
    _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "setMessage", 62);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 63);
var messageArray = this.options.message.split("%");
    
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 65);
this.options.message = "";
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 66);
if (this.options.averageValue){
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 67);
this.options.message = this.options.message + messageArray[0] + this.options.averageValue + "/" + this.options.nStars 
    }
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 69);
if(this.options.nRates){
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 70);
this.options.message = this.options.message + messageArray[1] + this.options.nRates + messageArray[2]
    }
  },  
  /**
   * render stars
   * @method render
   */
  renderComponent: function(){
    _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "renderComponent", 77);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 78);
this.starsEls = [];
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 79);
this.el = inputEx.cn('div');
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 80);
for (var i = 0 ; i < this.options.nStars; i++) {
      // first, make a div and then an a-element in it
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 82);
var star = inputEx.cn('div',{id:'star-' + i, className: "inputEx-star"});
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 83);
var that = this;
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 84);
star.index = i;
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 85);
star.onHover = function(){
        _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "onHover", 85);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 86);
that.onHoverStar(this.index);
      }
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 88);
star.onClick = function(){
        //by convention the value of the field goes from 1 to 5, as the number of stars. It's weird because there's no 0, but this is it.
        _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "onClick", 88);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 90);
that.onClickRating(this.index+1);
      }
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 92);
this.starsEls.push(star);
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 93);
var a = inputEx.cn('a',{href:'#' + i},null,i);
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 94);
star.appendChild(a);
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 95);
this.el.appendChild(star);

      // add needed listeners to every star
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 98);
Y.one(star).on('mouseover', star.onHover, star, true);
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 99);
Y.one(star).on('click', star.onClick, star, true);
    } 
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 101);
Y.one(this.el).on('mouseout', this.resetStars, this, true);
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 102);
this.fieldContainer.appendChild(this.el);
    _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 103);
this.divMess = this.fieldContainer.appendChild(inputEx.cn('div', {id: this.divEl.id+'-mess', className: 'inputEx-message'}, null, this.options.message ));

  },
  /**
   * When mouse is over a star
   * @method onHoverStar
   */
  onHoverStar: function(whichStar) {
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "onHoverStar", 110);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 111);
if(!this.disabled){
        /* hovers the selected star plus every star before it */
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 113);
if(!this.value){
          _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 114);
for (var i=0; i < this.options.nStars; i++) {
            _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 115);
var star = this.starsEls[i],
                a = star.firstChild;
            _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 117);
if(i < whichStar+1 ){
              _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 118);
Y.one(star).addClass('hover');
              _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 119);
Y.one(a).setStyle('width', '100%');            
            } else {
              _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 121);
Y.one(star).removeClass('on');
              _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 122);
Y.one(star).removeClass('hover');
            }

 
          }
        }
      
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 129);
if(this.options.starsMessages){
          _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 130);
this.showMessage("<span class=\"inputEx-starMess\">"+this.options.starsMessages[whichStar]+"</span>");
        }
      } else {
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 133);
if(this.options.disableMessage){
          _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 134);
this.showMessage("<span class=\"inputEx-disableMessage\">"+this.options.disableMessage+"</span>")
        }
      }
    },  
  /**
   * InitEvents
   * @method initEvents
   */
    initEvents: function(e, whichStar) {
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "initEvents", 142);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 143);
this.publish("rateEvt");
    },  
  /**
   * reset Stars and note
   * @method resetStars
   */
    resetStars: function(inValue) {
        /* Resets the status of each star */
        
        // if form is not submitted, the number of stars on depends on the 
        // given average value
        _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "resetStars", 149);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 154);
if (this.dontReset) {
          _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 155);
return
        }
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 157);
var value = lang.isNumber(inValue) ? inValue : this.options.averageValue ;
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 158);
var starsOn = Math.floor(value),
            rest = Math.floor((this.options.averageValue - starsOn)*10),
            lastStarWidth;
            
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 162);
if (rest > 0){
           _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 163);
starsOn = starsOn + 1;
           _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 164);
lastStarWidth = rest + '0%';
        }
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 166);
for (var i=0; i < this.options.nStars ; i++) {
            _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 167);
var star = this.starsEls[i],
                a = star.firstChild;
            _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 169);
Y.one(star).removeClass('hover');
            _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 170);
if(i < starsOn){
              _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 171);
Y.one(star).addClass('on');
            }  else {
              _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 173);
Y.one(star).removeClass('on');
            }
          
            // and for the last one, set width if needed
            _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 177);
if (i == starsOn - 1 && lastStarWidth){
              _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 178);
Y.one(a).setStyle('width', lastStarWidth);
            }
        }
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 181);
this.showMessage();
    },
    /**
     * Tell something under the stars
     * @method showMessage
     */
    showMessage: function(text){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "showMessage", 187);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 188);
if(!text){
        //default message
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 190);
var text = this.options.message
      }
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 192);
this.divMess.innerHTML = text;
    },
    /**
     * onAsync is called by the containing form when request is Send
     * @method onAsync
     */
    onAsync : function(){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "onAsync", 198);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 199);
this.showMessage("<span class=\"thanks\">"+inputEx.messages.sendingRate+"</span>");
    },
    onEndAsync : function(){
       _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "onEndAsync", 201);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 202);
this.afterRating();
    },
    /**
    * 
    * @method onClickRating
    */
    onClickRating: function(value){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "onClickRating", 208);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 209);
if(this.disabled){
        _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 210);
return
      }
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 212);
this.setValue(value);
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 213);
this.dontReset = true;
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 214);
this.disable();
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 215);
this.fire("rate",value);  
      
    },
    afterRating: function(){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "afterRating", 218);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 219);
this.showMessage("<span class=\"thanks\">"+inputEx.messages.thanksRate+"</span>");      
    },
    disable: function(){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "disable", 221);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 222);
this.disabled = true;  
    },
    enable: function(){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "enable", 224);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 225);
this.disabled = false;
    },
    setValue: function(value){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "setValue", 227);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 228);
inputEx.RatingStars.superclass.setValue.call(this,value);
      _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 229);
this.value = value;
    },
    getValue: function(){
      _yuitest_coverfunc("build/inputex-ratingstars/inputex-ratingstars.js", "getValue", 231);
_yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 232);
return this.value;  
    }
});

 
 // Register this class as "url" type
 _yuitest_coverline("build/inputex-ratingstars/inputex-ratingstars.js", 238);
inputEx.registerType("ratingstars", inputEx.RatingStars);


}, '@VERSION@', {"requires": ["inputex-field"], "skinnable": true, "ix_provides": "ratingstars"});
