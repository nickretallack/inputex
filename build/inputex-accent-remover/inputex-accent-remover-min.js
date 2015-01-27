YUI.add("inputex-accent-remover",function(e,t){var n=e.inputEx,r=function(e){e==="fr"?this.conf={a:{regexp:/[\u00e0\u00e4\u00e5\u00e1\u00e2\u00e3\u0101\u0103\u0227\u1ea3\u01ce\u0201\u0203\u0105\u1ea1\u1e01\u1e9a\u1ea7\u1ea5\u1eab\u1ea9\u1eb1\u1eaf\u1eb5\u1eb3\u01e1\u01df\u01fb\u1ead\u1eb7]/gi,replacer:this.replacer("a")},ae:{regexp:/[\u01fd\u01e3]/gi,replacer:this.replacer("ae")},b:{regexp:/[\u1e03\u0253\u1e05\u1e07\u0180\u0183\u0185]/gi,replacer:this.replacer("b")},c:{regexp:/[\u0107\u0109\u010b\u010d\u0188\u00e7\u1e09]/gi,replacer:this.replacer("c")},d:{regexp:/[\u1e0b\u0257\u1e0d\u1e0f\u1e11\u1e13\u010f\u0111\u018c\u0221]/gi,replacer:this.replacer("d")},e:{regexp:/[\u00e8\u00e9\u00ea\u1ebd\u0113\u0115\u0117\u00eb\u1ebb\u011b\u0205\u0207\u1eb9\u0229\u0119\u1e19\u1e1b\u1ec1\u1ebf\u1ec5\u1ec3\u1e15\u1e17\u1ec7\u1e1d\u01dd\u025b]/gi,replacer:this.replacer("e")},f:{regexp:/[\u1e1f\u0192]/gi,replacer:this.replacer("f")},g:{regexp:/[\u01f5\u011d\u1e21\u011f\u0121\u01e7\u0260\u0123\u01e5]/gi,replacer:this.replacer("g")},h:{regexp:/[\u0125\u1e23\u1e27\u021f\u0195\u1e25\u1e29\u1e2b\u1e96\u0127]/gi,replacer:this.replacer("h")},i:{regexp:/[\u00ec\u00ed\u00ee\u0129\u012b\u012d\u0131\u00ef\u1ec9\u01d0\u1ecb\u012f\u0209\u020b\u1e2d\u0268\u1e2f]/gi,replacer:this.replacer("i")},ij:{regexp:/[\u0133]/gi,replacer:this.replacer("ij")},j:{regexp:/[\u0135\u01f0]/gi,replacer:this.replacer("j")},k:{regexp:/[\u1e31\u01e9\u1e35\u0199\u1e33\u0137]/gi,replacer:this.replacer("k")},l:{regexp:/[\u013a\u1e3b\u1e37\u013c\u1e3d\u013e\u0140\u0142\u019a\u1e39\u0234]/gi,replacer:this.replacer("l")},m:{regexp:/[\u1e3f\u1e41\u1e43\u026f]/gi,replacer:this.replacer("m")},n:{regexp:/[\u00f1\u01f9\u0144\u1e45\u0148\u014b\u0272\u1e47\u0146\u1e4b\u1e49\u0149\u019e\u0235]/gi,replacer:this.replacer("n")},o:{regexp:/[\u00f6\u00f2\u00f3\u00f4\u00f5\u014d\u014f\u022f\u1ecf\u0151\u01d2\u020d\u020f\u01a1\u01eb\u1ecd\u0275\u1ed3\u1ed1\u1ed7\u1ed5\u0231\u022b\u022d\u1e4d\u1e4f\u1e51\u1e53\u1edd\u1edb\u1ee1\u1edf\u1ee3\u01ed\u1ed9\u01ff\u0254]/gi,replacer:this.replacer("o")},oe:{regexp:/[\u0153]/gi,replacer:this.replacer("oe")},p:{regexp:/[\u1e55\u1e57\u01a5]/gi,replacer:this.replacer("p")},r:{regexp:/[\u0155\u1e59\u0159\u0211\u0213\u1e5b\u0157\u1e5f\u1e5d]/gi,replacer:this.replacer("r")},s:{regexp:/[\u015b\u015d\u1e61\u0161\u1e63\u0219\u015f\u1e65\u1e67\u1e69\u017f\u1e9b]/gi,replacer:this.replacer("s")},t:{regexp:/[\u1e6b\u1e97\u0165\u01ad\u0288\u01ab\u1e6d\u021b\u0163\u1e71\u1e6f\u0167\u0236]/gi,replacer:this.replacer("t")},u:{regexp:/[\u00f9\u00fc\u00fa\u00fb\u0169\u016b\u016d\u1ee7\u016f\u0171\u01d4\u0215\u0217\u01b0\u1ee5\u1e73\u0173\u1e77\u1e75\u1e79\u1e7b\u01d6\u01dc\u01d8\u01d6\u01da\u1eeb\u1ee9\u1eef\u1eed\u1ef1]/gi,replacer:this.replacer("u")},v:{regexp:/[\u1e7d\u1e7f]/gi,replacer:this.replacer("v")},w:{regexp:/[\u1e81\u1e83\u0175\u1e87\u1e85\u1e98\u1e89]/gi,replacer:this.replacer("w")},x:{regexp:/[\u1e8b\u1e8d]/gi,replacer:this.replacer("x")},y:{regexp:/[\u1ef3\u00fd\u0177\u1ef9\u0233\u1e8f\u00ff\u1ef7\u1e99\u01b4\u1ef5]/gi,replacer:this.replacer("y")},z:{regexp:/[\u017a\u1e91\u017c\u017e\u0225\u1e93\u1e95\u01b6]/gi,replacer:this.replacer("z")}}:e==="de"?this.conf={"\u00fc":{regexp:/[\u00fc]/gi,replacer:this.replacer("ue")},"\u00f6":{regexp:/[\u00f6]/gi,replacer:this.replacer("oe")},"\u00e4":{regexp:/[\u00e4]/gi,replacer:this.replacer("ae")},"\u00df":{regexp:/[\u00df]/gi,replacer:this.replacer("ss")}}:e==="pl"&&(this.conf={"\u0119":{regexp:/[\u0119]/gi,replacer:this.replacer("e")},"\u0105":{regexp:/[\u0105]/gi,replacer:this.replacer("a")},"\u0142":{regexp:/[\u0142]/gi,replacer:this.replacer("l")},"\u00f3":{regexp:/[\u00f3]/gi,replacer:this.replacer("o")},"\u0144":{regexp:/[\u0144]/gi,replacer:this.replacer("n")},"\u015b":{regexp:/[\u015b]/gi,replacer:this.replacer("s")},"\u0107":{regexp:/[\u0107]/gi,replacer:this.replacer("c")},"\u017c":{regexp:/[\u017c]/gi,replacer:this.replacer("z")},"\u017a":{regexp:/[\u017a]/gi,replacer:this.replacer("z")}})};r.prototype.replacer=function(e){var t=e.toUpperCase();return function(n){return n.toUpperCase()===n?t:e}},r.prototype.strip=function(e){var t=this.conf;for(var n in t)t.hasOwnProperty(n)&&(e=e.replace(t[n].regexp,t[n].replacer));return e},n.AccentRemover=r},"@VERSION@");
