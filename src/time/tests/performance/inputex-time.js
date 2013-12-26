var suite = new PerfSuite('time test', {
    assets: ['../../js/time.js'],
    yui: {
        use: ['inputex-time'],
        config: {
            modules: {
               'inputex-time': '../../tiime.js'
            }
        }
    },
    tests: [{
        name: 'inputex time instantiate',
        fn: function() {
            new Y.inputEx.TimeField();
        }
    }]
});