
YUI.add("map-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-map field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField =   Y.inputEx({
                    type: "map",
                    api : 'google',
                    parentEl: 'demo',
                    label: 'label',
                    mapType : "ROADMAP"
                });

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-map"]
});