
YUI.add("node-menunav-improved-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "node-menunav-improved Test Suite"
    }),
        testCase = new Y.Test.Case({

            name: "node-menunav-improved first test case",
            testGeneration: function () {

                Y.log("test",'debug');

                var instance = new Y.NodeMenunavImproved({
                });

                Y.Assert.isObject(instance);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "node-menunav-improved"]
});