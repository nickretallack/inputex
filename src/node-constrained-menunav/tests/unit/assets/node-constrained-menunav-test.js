
YUI.add("node-constrained-menunav-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "node-constrained-menunav Test Suite"
    }),
        testCase = new Y.Test.Case({

            name: "node-constrained-menunav first test case",
            testGeneration: function () {

                Y.log("test",'debug');

                var instance = new Y.NodeConstrainedMenunav({
                });

                Y.Assert.isObject(instance);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "node-constrained-menunav"]
});