
YUI.add("radio-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-radio field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = Y.inputEx({
                    type : "radio",
                    parentEl: 'demo',
                    label: 'label',
                    choices: [
                        { value: 'Ajaxian' },
                        { value: 'YUI blog' },
                        { value: 'Other' }
                    ]
                });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-radio"]
});