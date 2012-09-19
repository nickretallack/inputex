
YUI.add("jsontreeinspector-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "components Generation Suite"
    }),
        testCase = new Y.Test.Case({

            name: "inputex-jsontreeinspector field generation test",
            testGeneration: function () {

                Y.log("testGeneration",'debug');

                var instanceField = new Y.inputEx.widget.JsonTreeInspector('demo', {inputEx: Y.inputEx, Global: window});

        Y.Assert.isObject(instanceField);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "inputex-jsontreeinspector"]
});