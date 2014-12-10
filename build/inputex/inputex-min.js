YUI.add("inputex",function(e,t){var n=e.Lang;e.inputEx=function(t,n){var i=null,s;if(t.type){i=r.getFieldClass(t.type);if(!e.Lang.isFunction(i))throw new Error("Missing inputEx module for type: '"+t.type+"' ?")}else i=t.fieldClass?t.fieldClass:r.StringField;return s=new i(t),n&&s.setParentField(n),s};var r=e.inputEx;e.mix(e.inputEx,{VERSION:"4.0.0",spacerUrl:YUI_config.groups.inputex.base+"inputex/assets/skins/sam/images/space.gif",stateEmpty:"empty",stateRequired:"required",stateValid:"valid",stateInvalid:"invalid",messages:null,widget:{},mixin:{},regexps:{email:/^[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+(?:\.[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i,url:/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(([0-9]{1,5})?\/.*)?$/i},typeClasses:{},browserAutocomplete:"on",registerType:function(e,t,r,i){if(!n.isString(e))throw new Error("inputEx.registerType: first argument must be a string");if(!n.isFunction(t))throw new Error("inputEx.registerType: second argument must be a function");this.typeClasses[e]=t;var s=[];n.isArray(r)&&(s=r),t.superclass&&!i&&n.isArray(t.superclass.constructor.groupOptions)&&(s=t.superclass.constructor.groupOptions.concat(s)),t.groupOptions=s},getFieldClass:function(e){return n.isFunction(this.typeClasses[e])?this.typeClasses[e]:null},getType:function(e){for(var t in this.typeClasses)if(this.typeClasses.hasOwnProperty(t)&&this.typeClasses[t]==e)return t;return null},getRawModulesFromDefinition:function(t){var n=t.type||"string",r=YUI_config.groups.inputex.modulesByType[n],i=[r||n],s=t.fields||t.elementType&&t.elementType.fields;return s&&e.Array.each(s,function(e){i=i.concat(this.getModulesFromDefinition(e))},this),i},getModulesFromDefinition:function(t){var n=this.getRawModulesFromDefinition(t);return e.Object.keys(e.Array.hash(n))},use:function(t,n){var r,i=[];e.Array.test(t)?r=t:r=[t],e.each(r,function(e){i=i.concat(this.getModulesFromDefinition(e))},this),i.push(n),e.use.apply(e,i)},sn:function(e,t,r){if(!e)return;var i;if(t)for(i in t){var s=t[i];if(n.isFunction(s))continue;i=="className"&&(i="class",e.className=s);if(s!==e.getAttribute(i))try{s===!1?e.removeAttribute(i):e.setAttribute(i,s)}catch(o){}}if(r)for(i in r){if(n.isFunction(r[i]))continue;e.style[i]!=r[i]&&(e.style[i]=r[i])}},cn:function(t,n,r,i){if(t=="input"&&e.UA.ie&&e.UA.ie<9){var s="<"+t;if(n!=="undefined")for(var o in n)s+=" "+(o==="className"?"class":o)+'="'+n[o]+'"';return s+="/>",document.createElement(s)}var u=document.createElement(t);return this.sn(u,n,r),i&&(u.innerHTML=i),u},indexOf:function(e,t,r){var i=t.length,s;n.isFunction(r)||(r=function(e,t){return e===t});for(s=0;s<i;s++)if(r.call({},e,t[s]))return s;return-1},compactArray:function(e){var t=[],r=e.length,i;for(i=0;i<r;i++)!n.isNull(e[i])&&!n.isUndefined(e[i])&&t.push(e[i]);return t},removeAccents:function(e){return e.replace(/\u00c0\u00c1\u00c2\u00c3\u0100\u0102\u0226\u1ea2\u01cd\u0200\u0202\u0104\u1ea0\u1e00\u1ea6\u1ea4\u1eaa\u1ea8\u1eb0\u1eae\u1eb4\u1eb2\u01e0\u01de\u01fa\u1eac\u1eb6/g,"A").replace(/\u01fc\u01e2/g,"AE").replace(/\u1e02\u0181\u1e04\u1e06\u0182\u0184/g,"B").replace(/\u0106\u0108\u010a\u010c\u0187\u1e08/g,"C").replace(/\u1e0a\u018a\u1e0c\u1e0e\u1e10\u1e12\u010e\u0110\u0189\u018b/g,"D").replace(/\u00c8\u00ca\u1ebc\u0112\u0114\u0116\u00cb\u1eba\u011a\u0204\u0206\u1eb8\u0228\u0118\u1e18\u1e1a\u1ec0\u1ebe\u1ec4\u1ec2\u1e14\u1e16\u1ec6\u1e1c\u018e\u0190/g,"E").replace(/\u1e1e\u0191/g,"F").replace(/\u01f4\u011c\u1e20\u011e\u0120\u01e6\u0193\u0122\u01e4/g,"G").replace(/\u0124\u1e22\u1e26\u021e\u01f6\u1e24\u1e28\u1e2a\u0126/g,"H").replace(/\u00cc\u00cd\u00ce\u0128\u012a\u012c\u0130\u00cf\u1ec8\u01cf\u1eca\u012e\u0208\u020a\u1e2c\u0197\u1e2e/g,"I").replace(/\u0132/g,"IJ").replace(/\u0134/g,"J").replace(/\u1e30\u01e8\u1e34\u0198\u1e32\u0136/g,"K").replace(/\u0139\u1e3a\u1e36\u013b\u1e3c\u013d\u013f\u0141\u1e38/g,"L").replace(/\u1e3e\u1e40\u1e42\u019c/g,"M").replace(/\u01f8\u0143\u1e44\u0147\u014a\u019d\u1e46\u0145\u1e4a\u1e48\u0220/g,"N").replace(/\u00d2\u00d3\u00d4\u00d5\u014c\u014e\u022e\u1ece\u0150\u01d1\u020c\u020e\u01a0\u01ea\u1ecc\u019f\u1ed2\u1ed0\u1ed6\u1ed4\u0230\u022a\u022c\u1e4c\u1e4e\u1e50\u1e52\u1edc\u1eda\u1ee0\u1ede\u1ee2\u01ec\u1ed8\u01fe\u0186/g,"O").replace(/\u0152/g,"OE").replace(/\u1e54\u1e56\u01a4/g,"P").replace(/\u0154\u1e58\u0158\u0210\u0212\u1e5a\u0156\u1e5e\u1e5c\u01a6/g,"R").replace(/\u015a\u015c\u1e60\u0160\u1e62\u0218\u015e\u1e64\u1e66\u1e68/g,"S").replace(/\u1e6a\u0164\u01ac\u01ae\u1e6c\u021a\u0162\u1e70\u1e6e\u0166/g,"T").replace(/\u00d9\u00da\u00db\u0168\u016a\u016c\u1ee6\u016e\u0170\u01d3\u0214\u0216\u01af\u1ee4\u1e72\u0172\u1e76\u1e74\u1e78\u1e7a\u01db\u01d7\u01d5\u01d9\u1eea\u1ee8\u1eee\u1eec\u1ef0/g,"U").replace(/\u1e7c\u1e7e\u01b2/g,"V").replace(/\u1e80\u1e82\u0174\u1e86\u1e84\u1e88/g,"W").replace(/\u1e8a\u1e8c/g,"X").replace(/\u1ef2\u00dd\u0176\u1ef8\u0232\u1e8e\u0178\u1ef6\u01b3\u1ef4/g,"Y").replace(/\u0179\u1e90\u017b\u017d\u0224\u1e92\u1e94\u01b5/g,"Z").replace(/\u00e1\u00e2\u00e3\u0101\u0103\u0227\u1ea3\u01ce\u0201\u0203\u0105\u1ea1\u1e01\u1e9a\u1ea7\u1ea5\u1eab\u1ea9\u1eb1\u1eaf\u1eb5\u1eb3\u01e1\u01df\u01fb\u1ead\u1eb7/g,"a").replace(/\u01fd\u01e3/g,"ae").replace(/\u1e03\u0253\u1e05\u1e07\u0180\u0183\u0185/g,"b").replace(/\u0107\u0109\u010b\u010d\u0188\u00e7\u1e09/g,"c").replace(/\u1e0b\u0257\u1e0d\u1e0f\u1e11\u1e13\u010f\u0111\u018c\u0221/g,"d").replace(/\u00ea\u1ebd\u0113\u0115\u0117\u00eb\u1ebb\u011b\u0205\u0207\u1eb9\u0229\u0119\u1e19\u1e1b\u1ec1\u1ebf\u1ec5\u1ec3\u1e15\u1e17\u1ec7\u1e1d\u01dd\u025b/g,"e").replace(/\u1e1f\u0192/g,"f").replace(/\u01f5\u011d\u1e21\u011f\u0121\u01e7\u0260\u0123\u01e5/g,"g").replace(/\u0125\u1e23\u1e27\u021f\u0195\u1e25\u1e29\u1e2b\u1e96\u0127/g,"h").replace(/\u00ed\u00ee\u0129\u012b\u012d\u0131\u00ef\u1ec9\u01d0\u1ecb\u012f\u0209\u020b\u1e2d\u0268\u1e2f/g,"i").replace(/\u0133/g,"ij").replace(/\u0135\u01f0/g,"j").replace(/\u1e31\u01e9\u1e35\u0199\u1e33\u0137/g,"k").replace
(/\u013a\u1e3b\u1e37\u013c\u1e3d\u013e\u0140\u0142\u019a\u1e39\u0234/g,"l").replace(/\u1e3f\u1e41\u1e43\u026f/g,"m").replace(/\u01f9\u0144\u1e45\u0148\u014b\u0272\u1e47\u0146\u1e4b\u1e49\u0149\u019e\u0235/g,"n").replace(/\u00f3\u00f4\u00f5\u014d\u014f\u022f\u1ecf\u0151\u01d2\u020d\u020f\u01a1\u01eb\u1ecd\u0275\u1ed3\u1ed1\u1ed7\u1ed5\u0231\u022b\u022d\u1e4d\u1e4f\u1e51\u1e53\u1edd\u1edb\u1ee1\u1edf\u1ee3\u01ed\u1ed9\u01ff\u0254/g,"o").replace(/\u0153/g,"oe").replace(/\u1e55\u1e57\u01a5/g,"p").replace(/\u0155\u1e59\u0159\u0211\u0213\u1e5b\u0157\u1e5f\u1e5d/g,"r").replace(/\u015b\u015d\u1e61\u0161\u1e63\u0219\u015f\u1e65\u1e67\u1e69\u017f\u1e9b/g,"s").replace(/\u1e6b\u1e97\u0165\u01ad\u0288\u01ab\u1e6d\u021b\u0163\u1e71\u1e6f\u0167\u0236/g,"t").replace(/\u00fa\u00fb\u0169\u016b\u016d\u1ee7\u016f\u0171\u01d4\u0215\u0217\u01b0\u1ee5\u1e73\u0173\u1e77\u1e75\u1e79\u1e7b\u01d6\u01dc\u01d8\u01d6\u01da\u1eeb\u1ee9\u1eef\u1eed\u1ef1/g,"u").replace(/\u1e7d\u1e7f/g,"v").replace(/\u1e81\u1e83\u0175\u1e87\u1e85\u1e98\u1e89/g,"w").replace(/\u1e8b\u1e8d/g,"x").replace(/\u1ef3\u00fd\u0177\u1ef9\u0233\u1e8f\u00ff\u1ef7\u1e99\u01b4\u1ef5/g,"y").replace(/\u017a\u1e91\u017c\u017e\u0225\u1e93\u1e95\u01b6/g,"z")},htmlEntities:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}})},"@VERSION@",{requires:["intl","node","plugin","pluginhost-base","pluginhost-config","base-pluginhost","node-pluginhost"],skinnable:!0});
