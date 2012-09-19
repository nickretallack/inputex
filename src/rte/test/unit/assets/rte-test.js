
YUI.add("rte-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-rte field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = new Y.inputEx.RTEField({parentEl: 'demo', name: 'rteField',value:"I'm the default value. I've been set through the value option."});

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-rte"]
});