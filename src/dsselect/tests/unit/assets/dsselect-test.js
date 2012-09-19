
YUI.add("dsselect-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-dsselect field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = Y.inputEx({
                    type: "dsselect",
                    parentEl: 'demo',
                    label: 'label',
                     choices: [
                        { value: 'United States of America' },
                        { value: 'France' }
                    ]
                });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-dsselect"]
});