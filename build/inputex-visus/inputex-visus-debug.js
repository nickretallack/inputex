YUI.add('inputex-visus', function (Y, NAME) {

/**
 * Used by InPlaceEdit and Uneditable fields
 * @module inputex-visus
 */
   var lang = Y.Lang,
       inputEx = Y.inputEx;
/**
 * Contains the various visualization methods
 * @class inputEx.visus
 * @static
 */
inputEx.visus = {
  
  /**
   * Use a rendering function
   * options = {visuType: 'func', func: function(data) { ...code here...} }
   * @method func
   */
  "func": function(options, data) {
     return options.func(data);
  },
  
  /**
   * Use Y.Lang.dump
   * options = {visuType: 'dump'}
   * @method dump
   */
  dump: function(options, data) {
     return Y.dump(data);
  }
   
};

/**
 * Render 'data' using a visualization function described by 'visuOptions'
 * @method renderVisu
 * @static
 * @param {Object} visuOptions The visu parameters object with: visuType: 'myType', ...args...
 * @param {Object} data The input data to send to the template
 * @param {HTMLElement || String} parentEl optional Set the result as content of parentEl
 * @return {HTMLElement || String} Either the inserted HTMLElement or the String set to parentEl.innerHTML
 */
inputEx.renderVisu = function(visuOptions,data, parentEl) {
   
   var opts = visuOptions || {};
   var visuType = opts.visuType || 'dump';
   
   if( !inputEx.visus.hasOwnProperty(visuType) ) {
      throw new Error("inputEx: no visu for visuType: "+visuType);
   }
   
   var f = inputEx.visus[visuType];
   if( !lang.isFunction(f) ) {
      throw new Error("inputEx: no visu for visuType: "+visuType);
   }
   
   var v = null;
   try {
      v = f(opts,data);
   }
   catch(ex) {
      throw new Error("inputEx: error while running visu "+visuType+" : "+ex.message);
   }
   
   // Get the node
   var node = null;
   if(parentEl) {
      if(lang.isString(parentEl)) {
         node = Y.one(parentEl);
      }
      else {
         node = parentEl;
      }
   }
   
   // Insert it
   if(node) {
      if(Y.Lang.isObject(v) && v.tagName ) {
         node.innerHTML = "";
         node.appendChild(v);
      }
      else {
         node.innerHTML = v;
      }
   }
   
   return v;
};


}, '@VERSION@', {"requires": ["inputex", "dump"]});
