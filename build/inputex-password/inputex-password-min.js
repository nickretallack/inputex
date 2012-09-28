YUI.add("inputex-password",function(e,t){var n=e.inputEx,r=e.Lang;n.PasswordField=function(e){n.PasswordField.superclass.constructor.call(this,e)},n.PasswordField.byId={},e.extend(n.PasswordField,n.StringField,{setOptions:function(e){n.PasswordField.superclass.setOptions.call(this,e),this.options.className=e.className?e.className:"inputEx-Field inputEx-PasswordField",this.options.regexp=e.regexp||n.regexps.password,this.options.strengthIndicator=r.isUndefined(e.strengthIndicator)?!1:e.strengthIndicator,this.options.capsLockWarning=r.isUndefined(e.capsLockWarning)?!1:e.capsLockWarning,n.PasswordField.byId[e.id]=this;var t;e.confirm&&(t=n.PasswordField.byId[e.confirm])&&this.setConfirmationField(t)},renderComponent:function(){this.wrapEl=n.cn("div",{className:"inputEx-StringField-wrapper"});var t={};t.type="password",t.size=this.options.size,this.options.name&&(t.name=this.options.name),this.el=n.cn("input",t),this.wrapEl.appendChild(this.el),this.fieldContainer.appendChild(this.wrapEl),this.options.capsLockWarning&&(this.capsLockWarning=n.cn("div",{className:"capsLockWarning"},{display:"none"},n.messages.capslockWarning),this.wrapEl.appendChild(this.capsLockWarning));if(this.options.strengthIndicator){this.strengthEl=n.cn("div",{className:"inputEx-Password-StrengthIndicator"},null,n.messages.passwordStrength),this.strengthBlocks=[];for(var r=0;r<4;r++){var i=n.cn("div",{className:"inputEx-Password-StrengthIndicatorBlock"});this.strengthEl.appendChild(i),this.strengthBlocks[r]=e.one(i)}this.wrapEl.appendChild(this.strengthEl)}},setConfirmationField:function(e){this.options.confirmPasswordField=e,this.options.messages.invalid=n.messages.invalidPasswordConfirmation,this.options.confirmPasswordField.options.confirmationPasswordField=this},validate:function(){return this.options.confirmPasswordField&&this.options.confirmPasswordField.getValue()!=this.getValue()?!1:n.PasswordField.superclass.validate.call(this)},getStateString:function(e){return e==n.stateInvalid&&this.options.minLength&&this.el.value.length<this.options.minLength?n.messages.invalidPassword[0]+this.options.minLength+n.messages.invalidPassword[1]:n.StringField.superclass.getStateString.call(this,e)},onInput:function(e){n.PasswordField.superclass.onInput.call(this,e),this.options.confirmationPasswordField&&this.options.confirmationPasswordField.setClassFromState()},onKeyPress:function(e){n.PasswordField.superclass.onKeyPress.call(this,e);if(this.options.capsLockWarning){var t=e?e:window.event;if(!t)return;var r=t.target?t.target:t.srcElement,i=-1;t.which?i=t.which:t.keyCode&&(i=t.keyCode);var s=!1;t.shiftKey?s=t.shiftKey:t.modifiers&&(s=!!(t.modifiers&4));var o=i>=65&&i<=90&&!s||i>=97&&i<=122&&s;this.setCapsLockWarning(o)}},onKeyUp:function(e){n.PasswordField.superclass.onKeyUp.call(this,e),this.options.strengthIndicator&&r.later(0,this,this.updateStrengthIndicator)},setCapsLockWarning:function(e){this.capsLockWarning.style.display=e?"":"none"},updateStrengthIndicator:function(){var e=n.PasswordField.getPasswordStrength(this.getValue()),t,r,i;for(t=0;t<4;t++)r=e>=t*25&&e>0,i=r?"#4AE817":"#FFFFFF",this.strengthBlocks[t].setStyle("backgroundColor",i)}}),n.PasswordField.getPasswordStrength=function(e){var t=e.length;t>7&&(t=7);var n=e.replace(/[0-9]/g,""),r=e.length-n.length;r>3&&(r=3);var i=e.replace(/\W/g,""),s=e.length-i.length;s>3&&(s=3);var o=e.replace(/[A-Z]/g,""),u=e.length-o.length;u>3&&(u=3);var a=t*10-20+r*10+s*20+u*10;return a<0&&(a=0),a>100&&(a=100),a},n.registerType("password",n.PasswordField,[{type:"boolean",label:"Strength indicator",name:"strengthIndicator",value:!1},{type:"boolean",label:"CapsLock warning",name:"capsLockWarning",value:!1}])},"@VERSION@",{requires:["inputex-string"],ix_provides:"password"});