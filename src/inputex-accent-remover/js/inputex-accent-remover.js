/**
 * @module inputex-accent-remover
 *
 * As you may guess, this module will help you on the way you will handle your accent.
 * There is a by instance configuration and you can easilly change it. see the example below
 *
 * ex:
 *
 var myAccentRemover1 = new Y.inputEx.AccentRemover(); // check the default configuration for 'e' below
 var myAccentRemover2 = new Y.inputEx.AccentRemover();
 myAccentRemover2.conf.e.regexp = /[èêẽēĕėëẻěȅȇẹȩęḙḛềếễểḕḗệḝǝɛ]/gi; // we remove the é in the regexp

 myAccentRemover1.removeAccents("treétreè"); // treetree
 myAccentRemover2.removeAccents("treétreè"); // treétree
 *
 *
 */

var inputEx = Y.inputEx;

/**
 * Inputex-accent-remover
 *
 * @class InputexAccentRemover
 * @namespace  Y
 */

var AccentRemover = function (locale) {
    if (locale === "fr") {
        this.conf = {
            'a': {
                regexp: /[àäåáâãāăȧảǎȁȃąạḁẚầấẫẩằắẵẳǡǟǻậặ]/gi,
                replacer: this.replacer('a')
            },
            'ae': {
                regexp: /[ǽǣ]/gi,
                replacer: this.replacer('ae')
            },
            'b': {
                regexp: /[ḃɓḅḇƀƃƅ]/gi,
                replacer: this.replacer('b')
            },
            'c': {
                regexp: /[ćĉċčƈçḉ]/gi,
                replacer: this.replacer('c')
            },
            'd': {
                regexp: /[ḋɗḍḏḑḓďđƌȡ]/gi,
                replacer: this.replacer('d')
            },
            'e': {
                regexp: /[èéêẽēĕėëẻěȅȇẹȩęḙḛềếễểḕḗệḝǝɛ]/gi,
                replacer: this.replacer('e')
            },
            'f': {
                regexp: /[ḟƒ]/gi,
                replacer: this.replacer('f')
            },
            'g': {
                regexp: /[ǵĝḡğġǧɠģǥ]/gi,
                replacer: this.replacer('g')
            },
            'h': {
                regexp: /[ĥḣḧȟƕḥḩḫẖħ]/gi,
                replacer: this.replacer('h')
            },
            'i': {
                regexp: /[ìíîĩīĭıïỉǐịįȉȋḭɨḯ]/gi,
                replacer: this.replacer('i')
            },
            'ij': {
                regexp: /[ĳ]/gi,
                replacer: this.replacer('ij')
            },
            'j': {
                regexp: /[ĵǰ]/gi,
                replacer: this.replacer('j')
            },
            'k': {
                regexp: /[ḱǩḵƙḳķ]/gi,
                replacer: this.replacer('k')
            },
            'l': {
                regexp: /[ĺḻḷļḽľŀłƚḹȴ]/gi,
                replacer: this.replacer('l')
            },
            'm': {
                regexp: /[ḿṁṃɯ]/gi,
                replacer: this.replacer('m')
            },
            'n': {
                regexp: /[ñǹńṅňŋɲṇņṋṉŉƞȵ]/gi,
                replacer: this.replacer('n')
            },
            'o': {
                regexp: /[öòóôõōŏȯỏőǒȍȏơǫọɵồốỗổȱȫȭṍṏṑṓờớỡởợǭộǿɔ]/gi,
                replacer: this.replacer('o')
            },
            'oe': {
                regexp: /[œ]/gi,
                replacer: this.replacer('oe')
            },
            'p': {
                regexp: /[ṕṗƥ]/gi,
                replacer: this.replacer('p')
            },
            'r': {
                regexp: /[ŕṙřȑȓṛŗṟṝ]/gi,
                replacer: this.replacer('r')
            },
            's': {
                regexp: /[śŝṡšṣșşṥṧṩſẛ]/gi,
                replacer: this.replacer('s')
            },
            't': {
                regexp: /[ṫẗťƭʈƫṭțţṱṯŧȶ]/gi,
                replacer: this.replacer('t')
            },
            'u': {
                regexp: /[ùüúûũūŭủůűǔȕȗưụṳųṷṵṹṻǖǜǘǖǚừứữửự]/gi,
                replacer: this.replacer('u')
            },
            'v': {
                regexp: /[ṽṿ]/gi,
                replacer: this.replacer('v')
            },
            'w': {
                regexp: /[ẁẃŵẇẅẘẉ]/gi,
                replacer: this.replacer('w')
            },
            'x': {
                regexp: /[ẋẍ]/gi,
                replacer: this.replacer('x')
            },
            'y': {
                regexp: /[ỳýŷỹȳẏÿỷẙƴỵ]/gi,
                replacer: this.replacer('y')
            },
            'z': {
                regexp: /[źẑżžȥẓẕƶ]/gi,
                replacer: this.replacer('z')
            }
        }

    }
    else if (locale === "de") {
        this.conf = {
            "ü": {
                regexp: /[ü]/gi,
                replacer: this.replacer('ue')
            },
            "ö": {
                regexp: /[ö]/gi,
                replacer: this.replacer('oe')
            },
            "ä": {
                regexp: /[ä]/gi,
                replacer: this.replacer('ae')
            },
            "ß": {
                regexp: /[ß]/gi,
                replacer: this.replacer('ss')
            }
        }
    } else if (locale === "pl") {
        this.conf = {
            "ę": {
                regexp: /[ę]/gi,
                replacer: this.replacer('e')
            },
            "ą": {
                regexp: /[ą]/gi,
                replacer: this.replacer('a')
            },
            "ł": {
                regexp: /[ł]/gi,
                replacer: this.replacer('l')
            },
            "ó": {
                regexp: /[ó]/gi,
                replacer: this.replacer('o')
            },
            "ń": {
                regexp: /[ń]/gi,
                replacer: this.replacer('n')
            },
            "ś": {
                regexp: /[ś]/gi,
                replacer: this.replacer('s')
            },
            "ć": {
                regexp: /[ć]/gi,
                replacer: this.replacer('c')
            },
            "ż": {
                regexp: /[ż]/gi,
                replacer: this.replacer('z')
            },
            "ź": {
                regexp: /[ź]/gi,
                replacer: this.replacer('z')
            }
        };
    } else {

    }

};

AccentRemover.prototype.replacer = function (c) {
    var upperCaseChar = c.toUpperCase();
    return function (match) {
        if (match.toUpperCase() === match) {
            return upperCaseChar;
        } else {
            return c;
        }
    }
};

AccentRemover.prototype.strip = function (str) {
    var conf = this.conf;
    for (var c in conf) {
        if (conf.hasOwnProperty(c)) {
            str = str.replace(conf[c].regexp, conf[c].replacer);
        }
    }
    return str;
};

inputEx.AccentRemover = AccentRemover;
