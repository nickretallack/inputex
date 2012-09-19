
YUI.add("autocomplete-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-autocomplete field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = Y.inputEx({
                    type: "autocomplete",
                    parentEl: 'demo',
                    label: 'Search US state',

                    // Format the hidden value (value returned by the form)
                    returnValue: function (oResultItem) {
                        return oResultItem.value;
                    },
                    autoComp: { // options of the YUI3 autocompleter (see http://developer.yahoo.com/yui/3/autocomplete/#config)
                        minQueryLength: 2,
                        maxResults: 50,
                        resultTextLocator: 'label',
                        source: [{
                            label: "Massachusets",
                            value: "MA"
                        }, {
                            label: "state2",
                            value: 2
                        }, {
                            label: "state3",
                            value: 3
                        }]

                    }
                });


        Y.Assert.isObject(instanceField);
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-autocomplete"]
});