YUI.add('inputex-base', function (Y, NAME) {

/**
 * A widget-stdmod-level extension that provides ability to render a form within the body
 *
 * @module inputex-base
 */

/**
 * The inputExBase class provides the hideOn attribute which can
 * be used to hide the widget when certain events occur.
 *
 * @class inputEx.Base
 * @param {Object} config User configuration object
 */
function inputExBase(config) {
    Y.after(this._renderUIInputEx, this, 'renderUI');

    Y.after(this._bindUIInputEx, this, 'bindUI');

    if (this.get("rendered")) {
        this._renderUIInputEx();
    }
}

inputExBase.ATTRS = {
   
   /**
    * inputEx json configuration
    *
    * @attribute inputEx
    * @type Object
    */
   inputEx: {
   },
   
   
   /**
    * Instantiated inputEx field (any type)
    *
    * @attribute field
    * @type inputEx.Field
    */
   field: {
   }
};

inputExBase.prototype = {

   /**
    * @method _renderUIInputEx
    * @private
    */
   _renderUIInputEx: function() {
      var field = Y.inputEx(this.get('inputEx') || {});
      this.setStdModContent('body', field.getEl(), 'after');
      this.set('field',field);
   },
   
   /**
    * @method _bindUIInputEx
    * @private
    */
   _bindUIInputEx: function() {
      // Closing all fields when the widget is hidden
      this.on('visibleChange', function(e) {
        if(e.newVal === false) {
          this.get('field').close();
        }
      }, this);
   }

};


Y.inputEx.Base = inputExBase;


}, '@VERSION@', {"requires": ["inputex", "widget", "widget-stdmod"]});
