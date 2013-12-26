
YUI.add("node-menunav-improved-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "node-menunav-improved Test Suite"
    }),
        testCase = new Y.Test.Case({

            name: "node-menunav-improved first test case",
            testGeneration: function () {
                Y.one("#pim").plug(   (Y.namespace('Plugin')).NodeMenuNavImproved);
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "node-menunav-improved"]
});