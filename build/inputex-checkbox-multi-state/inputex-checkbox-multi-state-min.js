YUI.add("inputex-checkbox-multi-state",function(e,t){var n=new e.Base.create("checkbox-multi-state",e.inputEx.Field,[],{setOptions:function(t){e.inputEx.CheckboxMultiState.superclass.setOptions.call(this,t),this.options.checkboxState=t.checkboxState},renderComponent:function(){this.nextState={},this.nextState.checked="unchecked",this.nextState.unchecked="checked",this.nextState.middle="unchecked",this.state=this.options.checkboxState||"unchecked";var t=e.Lang.sub(e.inputEx.CheckboxMultiState.TEMPLATE,{checkboxState:this.state});this.markupNode=e.Node.create(t),this.el=this.markupNode.getDOMNode(),this.fieldContainer.appendChild(this.el),this._bindUIComponent()},_bindUIComponent:function(){this.markupNode.on("click",this._changeState,this)},_changeState:function(e){var t=e.currentTarget.one("img").get("src").match(/images\/(.+).gif/)[1],n=this.nextState[t];this.setValue(n)},getValue:function(){return this.state},setValue:function(t,n){var r=e.Object.keys(this.nextState);if(r.indexOf(t)===-1){console.log("please provide an existing state : ",r);return}var i=this.markupNode.one("img"),s=i.get("src"),o=s.replace(/([^\/]+).gif/,t+".gif");i.set("src",o),this.state=t,e.inputEx.CheckboxMultiState.superclass.setValue.call(this,t,n)},getEl:function(){return this.el},getNode:function(){return this.markupNode}},{TEMPLATE:'<div class="checkbox"><img src="/images/{checkboxState}.gif" alt=""></div>'});e.inputEx.CheckboxMultiState=n},"@VERSION@",{requires:["base","inputex-field"]});