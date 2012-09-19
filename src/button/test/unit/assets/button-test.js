
YUI.add("button-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-button field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = new Y.inputEx.widget.Button({
                    type: "submit",
                    parentEl: 'demo',
                    value: 'label'
                });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-button"]
});