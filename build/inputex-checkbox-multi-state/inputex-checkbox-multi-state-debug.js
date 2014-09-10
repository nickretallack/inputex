YUI.add('inputex-checkbox-multi-state', function (Y, NAME) {

/**
 *
 * @module checkbox-multi-state
 */

/**
 * Create a checkbox with 3 states (checked, unchecked, middle)
 *
 * @class inputEx.CheckboxMultiState
 * @extends inputEx.Field
 * @constructor
 */
var CheckboxMultiState = new Y.Base.create("checkbox-multi-state", Y.inputEx.Field, [], {
   /*
    * @method setOptions
    *
    */
   setOptions: function(options) {
      Y.inputEx.CheckboxMultiState.superclass.setOptions.call(this, options);

      // specific options
      this.options.checkboxState = options.checkboxState;

   },
   /*
    * @method renderComponent
    *
    */
   renderComponent: function() {

      this.nextState = {};
      this.nextState["checked"] = "unchecked";
      this.nextState["unchecked"] = "checked";
      this.nextState["middle"] = "unchecked";

      /**
       * state of the check box
       *
       * @property state
       * @type {String}
       * @default "unchecked"
       */
      this.state = this.options.checkboxState || "unchecked"

      var markup = Y.Lang.sub(Y.inputEx.CheckboxMultiState.TEMPLATE, {
         checkboxState: this.state
      });

      this.markupNode = Y.Node.create(markup);
      this.el = this.markupNode.getDOMNode();
      this.fieldContainer.appendChild(this.el);

      this.imgNode = this.markupNode.one("img");

      this._bindUIComponent();

   },
   /*
    * @method _bindUIComponent
    * @private
    *
    */
   _bindUIComponent: function() {
      this.markupNode.on("click", this._changeState, this);
   },
   /*
    * @method _changeState
    * @private
    *
    */
   _changeState: function(e) {
      var oldState = e.currentTarget.one("img").get("src").match(/images\/(.+).gif/)[1],
         newState = this.nextState[oldState];

      this.setValue(newState);

   },
   /*
    * @method getState
    *
    */
   getValue: function() {
      return this.state;
   },
   /*
    * @method setValue
    *
    */
   setValue: function(state, sendUpdatedEvt) {

      if (!this.nextState[state]) {
         console.log("please provide an existing state : ", keys);
         return;
      }

      // nom des gifs : check0, check1, check2 
      var oldSrc = this.imgNode.get("src"),
          newSrc = oldSrc.replace(/([^\/]+).gif/, state + ".gif");

      this.imgNode.set("src", newSrc);

      this.state = state;

      Y.inputEx.CheckboxMultiState.superclass.setValue.call(this,state, sendUpdatedEvt);
   },
   /*
    * Return a DOM element
    * @method getEl
    * 
    */
   getEl: function() {
      return this.el;
   },
   /*
    * Return a Y.Node
    * @method getNode
    *
    */
   getNode: function() {
      return this.markupNode;
   }
}, {
   TEMPLATE: '' + '<div class="checkbox">' + '<img src="/images/{checkboxState}.gif" alt="">' + '</div>'
});

Y.inputEx.CheckboxMultiState = CheckboxMultiState;

}, '@VERSION@', {"requires": ["base", "inputex-field"]});
